import { compressCss } from '@src/module/css.js';
import { compressHtml } from '@src/module/html.js';
import { compressJavascript } from '@src/module/javascript.js';
import { logger } from '@src/util/logger.js';
import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import type { Options } from 'html-minifier-terser';
import type { CustomAtRules, TransformOptions } from 'lightningcss';
import type { MinifyOptions } from 'terser';

type CompressParameters = {
  disableCss?: boolean;
  htmlOptions?: Options;
  disableHtml?: boolean;
  disableJavascript?: boolean;
  javascriptOptions?: MinifyOptions;
  cssOptions?: TransformOptions<CustomAtRules>;
};

const compress = ({
  disableHtml = false,
  disableJavascript = false,
  disableCss = false,
  htmlOptions,
  javascriptOptions,
  cssOptions
}: CompressParameters = {}): AstroIntegration => {
  return {
    name: 'compress',
    hooks: {
      'astro:build:done': ({ dir: directory }) => {
        try {
          const distributionPath = fileURLToPath(directory);

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