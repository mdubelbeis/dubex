export const insertPrivateFieldTemplate = (splitFile: string[], prefix: string, field: string) => {
  const insertLine = splitFile.lastIndexOf('}');

  splitFile.splice(insertLine, 0, `\n\tget ${field}() {\n\t\treturn this.${prefix}${field};\n\t}`);
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertPrefixFieldTemplate = (splitFile: string[], prefix: string, field: string) => {
  const insertLine = splitFile.lastIndexOf('}');

  splitFile.splice(insertLine, 0, `\n\tget ${field}() {\n\t\treturn this.${prefix}${field};\n\t}`);
  splitFile.splice(
    insertLine + 1,
    0,
    `\n\tset ${field}(${field}) {\n\t\tthis.${prefix}${field} = ${field};\n\t}`
  );
};

export const insertStaticFieldTemplate = (splitFile: string[], staticField: string) => {
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

export const insertStaticPrivateFieldTemplate = (
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
