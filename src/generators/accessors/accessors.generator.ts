import fs from 'node:fs';
import { hasAccessors } from './accessors.formatter.js';
import { filterTsClassFields, parseTsClassFieldsTemp } from './accessors.parser.js';
import type {
  FilteredTsFields,
  GenerateAccessorsOptions,
  ParsedTsFieldsTemp,
} from './accessors.types.js';

const handleClassFile = (
  splitFile: string[],
  Tsfields: string[],
  source: string,
  options: GenerateAccessorsOptions
) => {
  const classname = source.split('/').at(-1)?.split('.')[0];

  if (source.includes('.ts')) {
    const filteredFields: FilteredTsFields = filterTsClassFields(Tsfields);
    const parsedFields: ParsedTsFieldsTemp = parseTsClassFieldsTemp(filteredFields);

    // writeAccessorsToFile(parsedFields, splitFile, classname!);
  }
  if (source.includes('.js')) {
    const filteredFields: FilteredJsFields = filterJsClassFields(JsFields);
    // writeAccessorsToFile(parseJsClassFields(splitFile), splitFile, source);
  }
};

export const generateAccessors = (source: string, options: GenerateAccessorsOptions) => {
  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');
  console.log(options);

  const Tsfields = splitFile.filter(
    (line) =>
      (line.includes('$') && line.includes('private')) ||
      line.includes('public') ||
      line.includes('protected') ||
      line.includes('static') ||
      line.includes('readonly')
  );

  const JsFields = splitFile.filter((line) => {
    (line.includes('$') && line.includes('#')) || line.includes('_') || line.includes('static');
  });
  console.log(JsFields);

  if (Tsfields.length === 0) {
    console.log('No fields found. Please provide a field and try and again.');
    return;
  }

  if (hasAccessors(splitFile)) {
    console.log('Accessors detected: Please remove them and try again.');
    return;
  }

  handleClassFile(splitFile, Tsfields, source, options);

  fs.writeFileSync(source, splitFile.join('\n'));
};
