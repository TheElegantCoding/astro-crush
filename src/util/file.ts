import fs from 'node:fs';
import { join, resolve } from 'node:path';

const findAllFiles = (extension: string, directory = 'public') => {
  const distributionPath = resolve(process.cwd(), directory);
  const resultFiles = fs.readdirSync(distributionPath, { recursive: true });
  const filterFiles = resultFiles.filter((element) => { return element.includes(extension.toLowerCase()); });
  const result = filterFiles.map((element) => { return join(directory, element.toString()); });

  return result;
};

export { findAllFiles };