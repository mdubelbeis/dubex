import {
  insertPrefixFieldTemplate,
  insertPrivateFieldTemplate,
  insertStaticFieldTemplate,
  insertStaticPrivateFieldTemplate,
} from './accessors.templates.js';
import type { ClassFields, FieldAndType } from './accessors.types.js';

export const formatTsAccessors = (tsAccessors: FieldAndType[], splitFile: string[]) => {
  const insertLine = splitFile.lastIndexOf('}');
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

export const checkAccessors = (splitFile: string[]) => {
  const hasGetAccessors = splitFile.filter((line) => line.includes('get'));
  const hasSetAccessors = splitFile.filter((line) => line.includes('set'));

  const currentFieldGetAccessors = [];
  const currentFieldSetAccessors = [];

  if (hasGetAccessors) {
    for (const accessor of hasGetAccessors) {
      const getAccessorLine = accessor.trim().split(' ');

      if (getAccessorLine.includes('static')) {
        currentFieldGetAccessors.push(getAccessorLine[2]?.split('()')[0]);
      } else {
        currentFieldGetAccessors.push(getAccessorLine[1]?.split('()')[0]);
      }
    }
  }

  if (hasSetAccessors) {
    for (const accessor of hasSetAccessors) {
      const setAccessorLine = accessor.trim().split(' ');

      if (setAccessorLine.includes('static')) {
        currentFieldSetAccessors.push(setAccessorLine[2]?.split('(')[0]);
      } else {
        currentFieldSetAccessors.push(setAccessorLine[1]?.split('(')[0]);
      }
    }
  }

  return {
    currentFieldGetAccessors,
    currentFieldSetAccessors,
  };
};

export const hasAccessors = (splitFile: string[]): boolean => {
  return splitFile.some((line) => line.includes('get') || line.includes('set'));
};

// TODO: rename
// returns new or existing fields based off file
export const writeAccessorsToFile = (fields: ClassFields, splitFile: string[]) => {
  for (const privateField of fields.private) {
    const prefix = privateField.slice(0, 1);
    const field = privateField.slice(1);

    insertPrivateFieldTemplate(splitFile, prefix, field);
  }

  for (const prefixField of fields.prefixed) {
    const prefix = prefixField.slice(0, 1);
    const field = prefixField.slice(1);

    insertPrefixFieldTemplate(splitFile, prefix, field);
  }

  for (const staticField of fields.static) {
    insertStaticFieldTemplate(splitFile, staticField);
  }

  for (const staticPrivateField of fields.staticPrivate) {
    const prefix = staticPrivateField.slice(0, 1);
    const field = staticPrivateField.slice(1);

    insertStaticPrivateFieldTemplate(splitFile, prefix, field);
  }
};
