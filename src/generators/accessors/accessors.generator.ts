import fs from 'node:fs';
import { formatJsAccessors, formatTsAccessors } from './accessors.formatter.js';
import { parseJSFields, parseTSAccessors } from './accessors.parser.js';

const handleClassFile = (splitFile: string[], fileExtension: '.ts' | '.js') => {
  if (fileExtension === '.js') {
    const accessors = parseJSFields(splitFile);
    formatJsAccessors(accessors, splitFile);
  }

  if (fileExtension === '.ts') {
    const accessors = parseTSAccessors(splitFile);
    formatTsAccessors(accessors, splitFile);
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
