import type { ParsedOnlyJsField, ParsedTsField } from './accessors.types.js';

export const insertOnlyJsField = (splitFile: string[], fieldObj: ParsedOnlyJsField) => {
  const insertLine = splitFile.lastIndexOf('}');
  const { unfilteredField } = fieldObj;

  const prefix = unfilteredField.slice(0, 1);
  const field = unfilteredField.slice(1);

  splitFile.splice(insertLine, 0, `\n\tget ${field}() {\n\t\treturn this.${prefix}${field};\n\t}`);
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertStaticJsField = (
  splitFile: string[],
  fieldObj: { staticModifier: string; unfilteredField: string },
  classname: string
) => {
  const insertLine = splitFile.lastIndexOf('}');
  const { staticModifier, unfilteredField } = fieldObj;

  const prefix = unfilteredField.slice(0, 1);
  const field = unfilteredField.slice(1);

  splitFile.splice(
    insertLine,
    0,
    `\n\tget ${field}() {\n\t\treturn ${classname}.${prefix}${field};\n\t}`
  );
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}) {\n\t\t${classname}.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertOnlyFieldsTemplate = (splitFile: string[], fieldLine: ParsedTsField) => {
  const insertLine = splitFile.lastIndexOf('}');

  const { modifier, prefix, field, type } = fieldLine;

  splitFile.splice(
    insertLine,
    0,
    `\n\tget ${field}(): ${type} {\n\t\treturn this.${prefix}${field};\n\t}`
  );
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}: ${type}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertReadOnlyTsTemplate = (splitFile: string[], fieldLine: ParsedTsField) => {
  const insertLine = splitFile.lastIndexOf('}');

  const { modifier, readonlyModifier, prefix, field, type } = fieldLine;

  splitFile.splice(
    insertLine,
    0,
    `\n\tget ${field}(): ${type} {\n\t\treturn this.${prefix}${field};\n\t}`
  );
};

export const insertStaticFieldTsTemplate = (
  splitFile: string[],
  fieldLine: ParsedTsField,
  classname: string
) => {
  const insertLine = splitFile.lastIndexOf('}');

  const { modifier, readonlyModifier, prefix, field, type } = fieldLine;

  splitFile.splice(
    insertLine,
    0,
    `\n\tstatic get ${field}(): ${type} {\n\t\treturn ${classname}.${prefix}${field};\n\t}`
  );
  splitFile.splice(
    insertLine,
    0,
    `\n\tstatic set ${field}(${field}: ${type}) {\n\t\t${classname}.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertStaticReadonlyFieldTsTemplate = (
  splitFile: string[],
  fieldLine: ParsedTsField,
  classname: string
) => {
  const insertLine = splitFile.lastIndexOf('}');

  const { modifier, staticModifier, readonlyModifier, prefix, field, type } = fieldLine;

  splitFile.splice(
    insertLine,
    0,
    `\n\tstatic get ${field}(): ${type} {\n\t\treturn ${classname}.${prefix}${field};\n\t}`
  );
};
