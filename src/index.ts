/* eslint-disable max-statements */
import { compressCss } from '@src/module/css.js';
import { compressHtml } from '@src/module/html.js';
import { compressImage } from '@src/module/image.js';
import { compressJavascript } from '@src/module/javascript.js';
import { logger } from '@src/util/logger.js';
import { fileURLToPath } from 'node:url';

import type { CompressImageOption } from '@src/module/image.js';
import type { AstroIntegration } from 'astro';
import type { Options } from 'html-minifier-terser';
import type { CustomAtRules, TransformOptions } from 'lightningcss';
import type { MinifyOptions } from 'terser';

type CompressParameters = {
  disableCss?: boolean;
  htmlOptions?: Options;
  disableHtml?: boolean;
  disableImage?: boolean;
  disableJavascript?: boolean;
  javascriptOptions?: MinifyOptions;
  imageOptions?: CompressImageOption;
  cssOptions?: TransformOptions<CustomAtRules>;
};

const compress = ({
  disableHtml = false,
  disableJavascript = false,
  disableCss = false,
  disableImage = false,
  htmlOptions,
  javascriptOptions,
  imageOptions,
  cssOptions
}: CompressParameters = {}): AstroIntegration => {
  return {
    name: 'compress',
    hooks: {
      'astro:build:done': async ({ dir: directory }) => {
        try {
          const distributionPath = fileURLToPath(directory);

          if (!disableImage) {
            await compressImage({ directory: distributionPath, options: imageOptions });
          }

          if (!disableCss) {
            compressCss({ directory: distributionPath, options: cssOptions });
          }

          if (!disableHtml) {
            compressHtml({ directory: distributionPath, options: htmlOptions });
          }

          if (!disableJavascript) {
            compressJavascript({ directory: distributionPath, options: javascriptOptions });
          }
        } catch (error) {
          logger.error(`Error during compress: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }
  };
};

export { compress };