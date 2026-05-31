import type { FieldAndType, JsField } from './accessors.types.js';

export const parseJsClassFields = (splitFile: string[]) => {
  const jsAccessors: JsField[] = [];

  const fieldLine = splitFile.filter((line) => line.includes('_') && !line.includes('this._'));

  for (const field of fieldLine) {
    const startIndex = field.indexOf('_');
    const endIndex = field.indexOf(';');

    const fieldName = field.slice(startIndex + 1, endIndex);

    jsAccessors.push({ field: fieldName });
  }

  return jsAccessors;
};

export const parseTsClassFields = (splitFile: string[]) => {
  const tsAccessors: FieldAndType[] = [];

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

  return tsAccessors;
};
