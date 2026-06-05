import fs from 'node:fs';
import { formatJsAccessors, formatTsAccessors } from './accessors.formatter.js';
import { parseJsClassFields, parseTsClassFields } from './accessors.parser.js';

const handleClassFile = (splitFile: string[], fileExtension: '.ts' | '.js') => {
  if (fileExtension === '.ts') {
    const accessors = parseTsClassFields(splitFile);
    formatTsAccessors(accessors, splitFile);
  }

  if (fileExtension === '.js') {
    const accessors = parseJsClassFields(splitFile);
    formatJsAccessors(accessors, splitFile);
  }
};

export const generateAccessors = (source: string) => {
  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');

  if (source.includes('.ts')) {
    handleClassFile(splitFile, '.ts');
  }

  if (source.includes('.js')) {
    handleClassFile(splitFile, '.js');
  }

  const writeString = splitFile.join('\n');

  fs.writeFileSync(source, writeString);
};
