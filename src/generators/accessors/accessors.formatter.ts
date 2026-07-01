import {
  insertOnlyFieldsTemplate,
  insertPrefixFieldJsTemplate,
  insertPrivateFieldJsTemplate,
  insertPrivateStaticFieldJsTemplate,
  insertReadOnlyTsTemplate,
  insertStaticFieldJsTemplate,
  insertStaticFieldTsTemplate,
  insertStaticReadonlyFieldTsTemplate,
} from './accessors.templates.js';
import type { JsClassFields, ParsedTsFieldsTemp } from './accessors.types.js';

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
  return splitFile.some((line) => line.includes('get ') || line.includes('set '));
};

// TODO: rename
// returns new or existing fields based off file
export const writeAccessorsToFile = (
  fields: JsClassFields | ParsedTsFieldsTemp,
  splitFile: string[],
  classname: string
) => {
  if (fields.language === 'js') {
    for (const privateField of fields.private) {
      const prefix = privateField.slice(0, 1);
      const field = privateField.slice(1);

      insertPrivateFieldJsTemplate(splitFile, prefix, field);
    }

    for (const prefixField of fields.prefixed) {
      const prefix = prefixField.slice(0, 1);
      const field = prefixField.slice(1);

      insertPrefixFieldJsTemplate(splitFile, prefix, field);
    }

    for (const staticField of fields.static) {
      insertStaticFieldJsTemplate(splitFile, staticField);
    }

    for (const staticPrivateField of fields.staticPrivate) {
      const prefix = staticPrivateField.slice(0, 1);
      const field = staticPrivateField.slice(1);

      insertPrivateStaticFieldJsTemplate(splitFile, prefix, field);
    }
  }

  if (fields.language === 'ts') {
    const { privateFields, publicFields, protectedFields } = fields;

    // Field Only
    for (const privateOnlyField of privateFields.privateOnlyFields) {
      insertOnlyFieldsTemplate(splitFile, privateOnlyField);
    }
    for (const publicOnlyField of publicFields.publicOnlyFields) {
      insertOnlyFieldsTemplate(splitFile, publicOnlyField);
    }
    for (const protectedOnlyField of protectedFields.protectedOnlyFields) {
      insertOnlyFieldsTemplate(splitFile, protectedOnlyField);
    }

    // Readonly Fields
    for (const privateReadonlyField of privateFields.privateReadonlyFields) {
      insertReadOnlyTsTemplate(splitFile, privateReadonlyField);
    }
    for (const publicReadonlyField of publicFields.publicReadonlyFields) {
      insertReadOnlyTsTemplate(splitFile, publicReadonlyField);
    }
    for (const protectedReadonlyField of protectedFields.protectedReadonlyFields) {
      insertReadOnlyTsTemplate(splitFile, protectedReadonlyField);
    }

    // Static Fields

    for (const privateStaticField of privateFields.privateStaticFields) {
      insertStaticFieldTsTemplate(splitFile, privateStaticField, classname);
    }
    for (const publicStaticField of publicFields.publicStaticFields) {
      insertStaticFieldTsTemplate(splitFile, publicStaticField, classname);
    }
    for (const protectedStaticField of protectedFields.protectedStaticFields) {
      insertStaticFieldTsTemplate(splitFile, protectedStaticField, classname);
    }

    // Static Readonly Fields
    for (const privateStaticReadonly of privateFields.privateStaticReadonlyFields) {
      insertStaticReadonlyFieldTsTemplate(splitFile, privateStaticReadonly, classname);
    }
    for (const publicStaticReadonly of publicFields.publicStaticReadonlyFields) {
      insertStaticReadonlyFieldTsTemplate(splitFile, publicStaticReadonly, classname);
    }
    for (const protectedStaticReadonly of protectedFields.protectedStaticReadonlyFields) {
      insertStaticReadonlyFieldTsTemplate(splitFile, protectedStaticReadonly, classname);
    }
  }
};
