import type { ParsedTsFields } from './accessors.types.js';

export const insertPrivateFieldJsTemplate = (
  splitFile: string[],
  prefix: string,
  field: string
) => {
  const insertLine = splitFile.lastIndexOf('}');

  splitFile.splice(insertLine, 0, `\n\tget ${field}() {\n\t\treturn this.${prefix}${field};\n\t}`);
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertPrefixFieldJsTemplate = (splitFile: string[], prefix: string, field: string) => {
  const insertLine = splitFile.lastIndexOf('}');

  splitFile.splice(insertLine, 0, `\n\tget ${field}() {\n\t\treturn this.${prefix}${field};\n\t}`);
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertStaticFieldJsTemplate = (splitFile: string[], staticField: string) => {
  const insertLine = splitFile.lastIndexOf('}');
  splitFile.splice(
    insertLine,
    0,
    `\n\tstatic get ${staticField}() {\n\t\treturn this.${staticField};\n\t}`
  );
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tstatic set ${staticField}(${staticField}) {\n\t\tthis.${staticField} = ${staticField};\n\t}`
  );
};

export const insertPrivateStaticFieldJsTemplate = (
  // TODO: Should receive class name to allow for <className>.field = field
  splitFile: string[],
  prefix: string,
  field: string
) => {
  const insertLine = splitFile.lastIndexOf('}');

  splitFile.splice(
    insertLine,
    0,
    `\n\tstatic get ${field}() {\n\t\treturn this.${prefix}${field};\n\t}`
  );
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tstatic set ${field}(${field}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertOnlyFieldsTemplate = (splitFile: string[], fieldLine: ParsedTsFields) => {
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

export const insertReadOnlyTsTemplate = (splitFile: string[], fieldLine: ParsedTsFields) => {
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
  fieldLine: ParsedTsFields,
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
  fieldLine: ParsedTsFields,
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
