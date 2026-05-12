import { findAllFiles } from '@src/util/file.js';
import { loggerLoader } from '@src/util/logger.js';
import { readFileSync, writeFileSync } from 'node:fs';
import { minify } from 'terser';

import type { MinifyOptions } from 'terser';

type CompressJavascriptParameters = {
  directory?: string;
  options?: MinifyOptions;
};

const compressJavascript = ({ directory = 'dist', options }: CompressJavascriptParameters = {}) => {
  const jsFiles = findAllFiles('.js', directory);
  const loader = loggerLoader('Compressing JavaScript files...');
  loader.start();

  jsFiles.forEach(async (file) => {
    const fileContent = readFileSync(file, 'utf-8');
    const minifiedContent = await minify(fileContent, options);
    writeFileSync(file, minifiedContent.code ?? '');
  });

  loader.stop();
};

export { compressJavascript };