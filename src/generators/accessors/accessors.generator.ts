import fs from 'node:fs';
import { checkJsFields, formatTsAccessors } from './accessors.formatter.js';
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
    const fields = parseJsClassFields(splitFile);
    // Should I check for accessors here,
    const { newFields, existingFields } = checkJsFields(fields, splitFile);
    console.log(`New fields: ${newFields}`);
    console.log(`Existing fields: ${existingFields}`);

    // writeAccessorsToFile(fields, splitFile);
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
