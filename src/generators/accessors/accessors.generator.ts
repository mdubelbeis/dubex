import fs from 'node:fs';
import { hasAccessors, writeAccessorsToFile } from './accessors.formatter.js';
import {
  filterJsClassFields,
  filterTsClassFields,
  parseJsClassFields,
  parseTsClassFieldsTemp,
} from './accessors.parser.js';
import type {
  FilteredJsFields,
  FilteredTsFields,
  GenerateAccessorsOptions,
  ParsedJsFields,
  ParsedTsFieldsTemp,
} from './accessors.types.js';

const handleClassFile = (
  JsFields: string[],
  Tsfields: string[],
  source: string,
  options: GenerateAccessorsOptions
) => {
  if (source.includes('.ts')) {
    return parseTsClassFieldsTemp(
      filterTsClassFields(Tsfields) as FilteredTsFields
    ) as ParsedTsFieldsTemp;
  }
  if (source.includes('.js')) {
    return parseJsClassFields(filterJsClassFields(JsFields) as FilteredJsFields) as ParsedJsFields;
  }
};

export const generateAccessors = (source: string, options: GenerateAccessorsOptions) => {
  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');
  const classname = source.split('/').at(-1)?.split('.')[0];

  const Tsfields = splitFile.filter(
    (line) =>
      (line.includes('$') && line.includes('private')) ||
      line.includes('public') ||
      line.includes('protected') ||
      line.includes('static') ||
      line.includes('readonly')
  );

  const AllJsFields = splitFile.filter(
    (line) =>
      line.includes('$') || line.includes('#') || line.includes('_') || line.includes('static')
  );
  const JsFields = AllJsFields.filter((line) => !line.includes('='));

  if (Tsfields.length === 0 || AllJsFields.length === 0) {
    console.log('No fields found. Please provide a field and try and again.');
    return;
  }

  if (hasAccessors(splitFile)) {
    console.log('Accessors detected: Please remove them and try again.');
    return;
  }

  const parsedFields = handleClassFile(JsFields, Tsfields, source, options);

  if (parsedFields) {
    writeAccessorsToFile(parsedFields, splitFile, classname!);
  }

  fs.writeFileSync(source, splitFile.join('\n'));
};
