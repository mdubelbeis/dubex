import type { FieldAndType, JsField } from './accessors.types.js';

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

export const formatJsAccessors = (jsAccessors: JsField[], splitFile: string[]) => {
  const insertLine = splitFile.lastIndexOf('}');

  for (const accessor of jsAccessors) {
    const { field } = accessor;

    const capitalizedField = field.substring(0, 1).toUpperCase() + field.substring(1);

    splitFile.splice(
      insertLine,
      0,
      `\n\tget ${capitalizedField}() {\n\t\treturn this._${field};\n\t}`
    );
    splitFile.splice(
      insertLine + 1,
      0,
      `\n\tset ${capitalizedField}(${field}) {\n\t\tthis._${field} = ${field};\n\t}`
    );
  }
};
