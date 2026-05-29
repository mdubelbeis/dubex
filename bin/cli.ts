#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';

interface FieldAndType {
  field: string;
  type: string;
}

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
  .description('Generate getters and setters from a TypeScript class file')
  .action((source: string) => {
    try {
      const classFile: string = fs.readFileSync(source, 'utf-8');
      const accessors: FieldAndType[] = [];

      const splitFile = classFile.split('\n');

      const fieldLine = splitFile.filter(
        (line) => line.includes('private') || line.includes('public')
      );

      for (const field of fieldLine) {
        const startIndex = field.indexOf('_');
        const endIndex = field.indexOf(':');
        const endOfLine = field.indexOf(';');

        const fieldName = field.slice(startIndex + 1, endIndex);
        const type = field.slice(endIndex + 2, endOfLine);

        accessors.push({ field: fieldName, type: type });
      }

      const insertLine = splitFile.lastIndexOf('}');

      for (const accessor of accessors) {
        const { field, type } = accessor;
        splitFile.splice(
          insertLine,
          0,
          `\tget ${field}(): ${type} {\n\t\treturn this._${field};\n\t}`
        );
        splitFile.splice(
          insertLine + 1,
          0,
          `\tset ${field}(${field}: ${type}) {\n\t\tthis._${field} = ${field};\n\t}`
        );
      }

      const writeString = splitFile.join('\n');

      fs.writeFileSync(source, writeString);
    } catch (error) {
      program.error(`Invalid File: ${source}\n`);
    }
  });

program.parse();
