import fs from 'node:fs';
import { hasAccessors, writeAccessorsToFile } from './accessors.formatter.js';
import { parseJsClassFields, parseTsClassFields } from './accessors.parser.js';
import type { GenerateAccessorsOptions } from './accessors.types.js';

const handleClassFile = (
  splitFile: string[],
  source: string,
  options: GenerateAccessorsOptions
) => {
  if (source.includes('.ts')) writeAccessorsToFile(parseTsClassFields(splitFile), splitFile);
  if (source.includes('.js')) writeAccessorsToFile(parseJsClassFields(splitFile), splitFile);
};

export const generateAccessors = (source: string, options: GenerateAccessorsOptions) => {
  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');

  if (hasAccessors(splitFile)) {
    console.log('Accessors detected: Please remove them and try again.');
    return;
  }

  handleClassFile(splitFile, source, options);

  fs.writeFileSync(source, splitFile.join('\n'));
};
