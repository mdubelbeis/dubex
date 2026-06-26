import fs from 'node:fs';
import { formatJsAccessors, formatTsAccessors } from './accessors.formatter.js';
import { parseJsClassFields, parseTsClassFields } from './accessors.parser.js';
import type { GenerateAccessorsOptions } from './accessors.types.js';

const handleClassFile = (
  splitFile: string[],
  fileExtension: '.ts' | '.js',
  options: GenerateAccessorsOptions
) => {
  if (fileExtension === '.ts') {
    const accessors = parseTsClassFields(splitFile);
    formatTsAccessors(accessors, splitFile);
  }

  if (fileExtension === '.js') {
    // switch for options?
    const accessors = parseJsClassFields(splitFile, options);

    if (accessors.length === 0) {
      console.log('Invalid class structure. No class fields detected.');
      process.exit(1);
    }

    formatJsAccessors(accessors, splitFile);
  }
};

export const generateAccessors = (source: string, options: GenerateAccessorsOptions) => {
  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');

  source.includes('.ts')
    ? handleClassFile(splitFile, '.ts', options)
    : handleClassFile(splitFile, '.js', options);

  const writeString = splitFile.join('\n');

  fs.writeFileSync(source, writeString);
};
