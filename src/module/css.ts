import { findAllFiles } from '@src/util/file.js';
import { loggerLoader } from '@src/util/logger.js';
import { transform } from 'lightningcss';
import { readFileSync, writeFileSync } from 'node:fs';

import type { CustomAtRules, TransformOptions } from 'lightningcss';

type CompressCssParameters = {
  directory?: string;
  options?: TransformOptions<CustomAtRules>;
};

const compressCss = ({ options, directory = 'dist' }: CompressCssParameters = {}) => {
  const cssFiles = findAllFiles('.css', directory);
  const loader = loggerLoader('Compressing CSS files...');

  loader.start();

  cssFiles.forEach((file) => {
    const fileBuffer = readFileSync(file);

    const cssContent = transform({
      code: fileBuffer,
      filename: file,
      minify: true,
      ...options
    });

    writeFileSync(file, cssContent.code);
  });

  loader.stop();
};

export { compressCss };