import { findAllFiles } from '@src/util/file.js';
import { Font, woff2 } from 'fonteditor-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

import type { FontEditor } from 'fonteditor-core';

type CompressTypographyParameters = {
  directory?: string;
  formats?: string[];
  outputDirectory?: string;
  options?: FontEditor.FontReadOptions;
  compressFormats?: FontEditor.FontType[];
};

const compressTypography = async ({
  directory = 'dist',
  options,
  outputDirectory = 'dist',
  formats = ['ttf'],
  compressFormats = ['woff', 'woff2']
}: CompressTypographyParameters = {}) => {
  const fonts = formats.flatMap((format) => { return findAllFiles(`.${format}`, directory); });

  if (compressFormats.includes('woff2')) { await woff2.init(); }

  fonts.forEach((fontFile) => {
    const fontBuffer = readFileSync(fontFile);
    const fontExtension = extname(fontFile).slice(1) as FontEditor.FontType;
    const fileName = basename(fontFile, extname(fontFile));

    const font = Font.create(fontBuffer, {
      type: fontExtension,
      ...options
    });

    compressFormats.forEach((outputFormat) => {
      const outputFont = font.write({
        type: outputFormat,
        hinting: true,
        ...options
      });
      const outputPath = join(outputDirectory, `${fileName}.${outputFormat}`);

      writeFileSync(outputPath, outputFont as Buffer);
    });
  });
};

export { compressTypography };