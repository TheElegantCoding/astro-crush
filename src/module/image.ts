/* eslint-disable max-statements */
import { findAllFiles } from '@src/util/file.js';
import { isLocalImage } from '@src/util/is_local_image.js';
import { loggerLoader } from '@src/util/logger.js';
import { replaceExtension } from '@src/util/replace_extension.js';
import { transformImage } from '@src/util/transform_image.js';
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export type CompressImageOption = {
  formats?: string[];
  compressFormats?: string[];
  excludedKeywords?: string[];
};

type CompressImageParameters = {
  directory?: string;
  options?: CompressImageOption;
};

const compressImage = async ({
  directory = 'dist',
  options = {
    excludedKeywords: [
      'pwa',
      'web-app-manifest',
      'apple-touch',
      'opg',
      'favicon'
    ],
    formats: [
      'jpg',
      'jpeg',
      'png'
    ],
    compressFormats: ['webp', 'avif']
  }
}: CompressImageParameters = {}) => {
  const htmlFiles = findAllFiles('.html', directory);
  const loader = loggerLoader('Compressing image files...');
  loader.start();
  const htmlImageSources = htmlFiles.flatMap((file) => {
    const rawHtml = readFileSync(file, 'utf-8');
    const parseHtml = parse(rawHtml);
    const imgTags = parseHtml.querySelectorAll('picture img');
    const sources = imgTags.map((img) => { return img.getAttribute('src') as string; });
    return sources;
  });
  const imageSources = options.formats?.flatMap((format) => { return findAllFiles(`.${format}`, directory); }) ?? [];
  const resultCompress: { image: string; width: null | number; height: null | number }[] = [];

  for (const htmlImageSource of htmlImageSources) {
    if (isLocalImage(htmlImageSource, imageSources, directory)) {
      let htmlImagePath = htmlImageSource;

      if (htmlImageSource.startsWith('http://') || htmlImageSource.startsWith('https://')) {
        htmlImagePath = new URL(htmlImageSource).pathname;
      }

      htmlImagePath = path.join(directory, htmlImagePath);
      const { image, width, height } = await transformImage({
        image: htmlImagePath,
        ...options
      });
      resultCompress.push({ image, width, height });
    }
  }

  htmlFiles.forEach((file) => {
    const rawHtml = readFileSync(file, 'utf-8');
    const parseHtml = parse(rawHtml);
    const imgTags = parseHtml.querySelectorAll('picture img');

    imgTags.forEach((img) => {
      const source = img.getAttribute('src') as string;

      if (isLocalImage(source, imageSources, directory)) {
        let htmlImagePath = source;

        if (source.startsWith('http://') || source.startsWith('https://')) {
          htmlImagePath = new URL(source).pathname;
        }
        htmlImagePath = path.join(directory, htmlImagePath);

        options.compressFormats?.forEach((format) => {
          if (img.parentNode.querySelectorAll(`source[type="image/${format}"]`).length === 0) {
            const tag = parse(`<source srcset="${replaceExtension(source, format)}" type="image/${format}">`);
            img.before(tag);
          }
        });

        resultCompress.forEach(({ image, width, height }) => {
          if (image === htmlImagePath) {
            img.setAttribute('width', width ? width.toString() : '');
            img.setAttribute('height', height ? height.toString() : '');
          }
        });
      }
    });

    writeFileSync(file, parseHtml.toString());
  });

  loader.stop();
};

export { compressImage };