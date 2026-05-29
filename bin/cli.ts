#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';

interface TsFieldAndType {
  field: string;
  type: string;
}

interface JsField {
  field: string;
}

const handleJSClassFile = (splitFile: string[], insertLine: number) => {
  const fieldLine = splitFile.filter((line) => line.includes('_') && !line.includes('this._'));

  const jsAccessors: JsField[] = [];

  for (const field of fieldLine) {
    const startIndex = field.indexOf('_');
    const endOfLine = field.indexOf(';');

    const fieldName = field.slice(startIndex + 1, endOfLine);

    jsAccessors.push({ field: fieldName });
  }

  for (const accessor of jsAccessors) {
    const { field } = accessor;

    const capitalizedField = field.substring(0, 1).toUpperCase() + field.substring(1);

    splitFile.splice(
      insertLine,
      0,
      `\n\tget${capitalizedField}() {\n\t\treturn this._${field};\n\t}`
    );
    splitFile.splice(
      insertLine + 1,
      0,
      `\n\tset${capitalizedField}(${field}) {\n\t\tthis._${field} = ${field};\n\t}`
    );
  }
};

const handleTSClassFile = (splitFile: string[], insertLine: number) => {
  const tsAccessors: TsFieldAndType[] = [];

  const fieldLine = splitFile.filter(
    (line) =>
      line.includes('private') ||
      line.includes('public') ||
      line.includes('protected') ||
      line.includes('static')
  );

  for (const field of fieldLine) {
    const startIndex = field.indexOf('_');
    const endIndex = field.indexOf(':');
    const endOfLine = field.indexOf(';');

    const fieldName = field.slice(startIndex + 1, endIndex);
    const type = field.slice(endIndex + 2, endOfLine);

    tsAccessors.push({ field: fieldName, type: type });
  }

  // TODO: Refactor into function (.ts file)
  for (const accessor of tsAccessors) {
    const { field, type } = accessor;
    splitFile.splice(
      insertLine,
      0,
      `\n\tget ${field}(): ${type} {\n\t\treturn this._${field};\n\t}`
    );
    splitFile.splice(
      insertLine + 1,
      0,
      `\n\tset ${field}(${field}: ${type}) {\n\t\tthis._${field} = ${field};\n\t}`
    );
  }
};

const program = new Command();

program
  .name('dbx')
  .description(
    'A JavaScript and TypeScript CLI toolkit for generating boilerplate, accessors, and backend resources.'
  )
  .version('0.1.0');

const gen = program.command('gen').description('Generate project code');

gen
  .command('accessors <source>')
  .description('Generate getters and setters from class fields in a JS/TS file.')
  .action((source: string) => {
    try {
      const classFile: string = fs.readFileSync(source, 'utf-8');

      const splitFile = classFile.split('\n');
      const insertLine = splitFile.lastIndexOf('}');

      if (source.includes('.ts')) {
        handleTSClassFile(splitFile, insertLine);
      }

      if (source.includes('.js')) {
        handleJSClassFile(splitFile, insertLine);
      }

      const writeString = splitFile.join('\n');

      fs.writeFileSync(source, writeString);
    } catch (error) {
      program.error(`Invalid File: ${source}\n`);
    }
  });

program.parse();
