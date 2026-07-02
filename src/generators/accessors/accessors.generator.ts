import fs from 'node:fs';
import { filterJsClassFields, filterTsClassFields } from './accessors.filters.js';
import { hasAccessors, writeAccessorsToFile } from './accessors.formatter.js';
import { parseJsClassFields, parseTsClassFields } from './accessors.parser.js';
import type { GenerateAccessorsOptions } from './accessors.types.js';

export const generateAccessors = (source: string, options: GenerateAccessorsOptions) => {
  const isCorrectFile = source.endsWith('.js') || source.endsWith('.ts');
  const classname = source.split('/').at(-1)?.split('.')[0];

  if (!isCorrectFile) {
    return console.error('Wrong file input. Please provide a .js or .ts file.');
  }

  const splitFile: string[] = fs.readFileSync(source, 'utf-8').split('\n');

  if (splitFile.length === 0) {
    return console.error('A JavaScript/TypeScript class file is required. Please try again.');
  }

  splitFile
    .filter((line) => line.includes('='))
    .forEach((fieldLine) => {
      if (fieldLine.includes('=')) {
        return console.error(
          'Found invalid format. No assignment operations. Please remove and try again.'
        );
      }
    });

  if (hasAccessors(splitFile)) {
    return console.error('Accessors detected: Please remove them and try again.');
  }

  if (source.endsWith('.ts')) {
    const TsFields = splitFile.filter(
      (line) =>
        (line.includes('$') && line.includes('private')) ||
        line.includes('public') ||
        line.includes('protected') ||
        line.includes('static') ||
        line.includes('readonly')
    );

    if (TsFields.length === 0) {
      return console.error(
        'No fields found or wrong format. Please provide a field and try and again.'
      );
    }

    const filteredTsFields = filterTsClassFields(TsFields);
    const parsedTsFields = parseTsClassFields(filteredTsFields);
    writeAccessorsToFile(parsedTsFields, splitFile, classname!);
    fs.writeFileSync(source, splitFile.join('\n'));
    return;
  }

  if (source.endsWith('.js')) {
    const allJsFields = splitFile.filter(
      (line) =>
        line.includes('$') || line.includes('#') || line.includes('_') || line.includes('static')
    );

    if (allJsFields.indexOf('=')) {
      console.log('Found =');
    }
    const JsFields = allJsFields.filter((line) => !line.includes('='));

    if (allJsFields.length === 0) {
      return console.error(
        'No fields found or wrong format. Please provide a field and try and again.'
      );
    }

    const filteredJsFields = filterJsClassFields(JsFields);
    const parsedJsFields = parseJsClassFields(filteredJsFields);
    writeAccessorsToFile(parsedJsFields, splitFile, classname!);
    fs.writeFileSync(source, splitFile.join('\n'));
    return;
  }
};
