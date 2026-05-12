import { findAllFiles } from '@src/util/file.js';
import { loggerLoader } from '@src/util/logger.js';
import { minify } from 'html-minifier-terser';
import { readFileSync, writeFileSync } from 'node:fs';

import type { Options } from 'html-minifier-terser';

type CompressHtmlParameters = {
  options?: Options;
  directory?: string;
};

const compressHtml = ({ directory = 'dist', options }: CompressHtmlParameters = {}) => {
  const htmlFiles = findAllFiles('.html', directory);
  const loader = loggerLoader('Compressing HTML files...');

  loader.start();

  htmlFiles.forEach(async (file) => {
    const fileContent = readFileSync(file, 'utf-8');
    const minifiedContent = await minify(fileContent, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      collapseBooleanAttributes: true,
      minifyJS: true,
      processScripts: ['application/ld+json'],
      ...options
    });
    writeFileSync(file, minifiedContent);
  });

  loader.stop();
};

export { compressHtml };