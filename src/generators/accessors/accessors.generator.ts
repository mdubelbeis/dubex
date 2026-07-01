import fs from 'node:fs';
import { hasAccessors, writeAccessorsToFile } from './accessors.formatter.js';
import {
  filterTsClassFields,
  parseJsClassFields,
  parseTsClassFieldsTemp,
} from './accessors.parser.js';
import type {
  FilteredTsFields,
  GenerateAccessorsOptions,
  ParsedTsFieldsTemp,
} from './accessors.types.js';

const handleClassFile = (
  splitFile: string[],
  fields: string[],
  source: string,
  options: GenerateAccessorsOptions
) => {
  const classname = source.split('/').at(-1)?.split('.')[0];

  if (source.includes('.ts')) {
    const filteredFields: FilteredTsFields = filterTsClassFields(fields);
    const parsedFields: ParsedTsFieldsTemp = parseTsClassFieldsTemp(filteredFields);

    writeAccessorsToFile(parsedFields, splitFile, classname!);
  }
  if (source.includes('.js'))
    writeAccessorsToFile(parseJsClassFields(splitFile), splitFile, source);
};

export const generateAccessors = (source: string, options: GenerateAccessorsOptions) => {
  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');

  const fields = splitFile.filter(
    (line) =>
      (line.includes('$') && line.includes('private')) ||
      line.includes('public') ||
      line.includes('protected') ||
      line.includes('static') ||
      line.includes('readonly')
  );

  if (fields.length === 0) {
    console.log('No fields found. Please provide a field and try and again.');
    return;
  }

  if (hasAccessors(splitFile)) {
    console.log('Accessors detected: Please remove them and try again.');
    return;
  }

  handleClassFile(splitFile, fields, source, options);

  fs.writeFileSync(source, splitFile.join('\n'));
};
