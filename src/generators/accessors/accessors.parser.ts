import type { FieldAndType } from './accessors.types.js';

export const parseTsClassFields = (splitFile: string[]) => {
  const tsAccessors: FieldAndType[] = [];

  // const readOnlyLines = splitFile.filter((line) => line.includes('readonly') && !line.includes('static'));
  // console.log(`Read Only Lines: ${readOnlyLines}`);

  const privateFieldsLines = splitFile.filter((line) => line.includes('private'));
  const publicFieldsLines = splitFile.filter((line) => line.includes('public'));
  const protectedFieldsLines = splitFile.filter((line) => line.includes('protected'));

  // Check for readonly/static in each fieldLines array and output getters only

  const privateStaticFields = privateFieldsLines.filter(
    (line) => line.includes('static') && !line.includes('readonly')
  );
  const privateReadonlyFields = privateFieldsLines.filter(
    (line) => line.includes('readonly') && !line.includes('static')
  );
  const privateStaticReadonlyFields = privateFieldsLines.filter(
    (line) => line.includes('static') && line.includes('readonly')
  );

  console.log(privateStaticFields);
  console.log(privateReadonlyFields);
  console.log(privateStaticReadonlyFields);

  // for (const field of fieldLine) {
  //   const startIndex = field.indexOf('_');
  //   const endIndex = field.indexOf(':');
  //   const endOfLine = field.indexOf(';');

  //   const fieldName = field.slice(startIndex + 1, endIndex);
  //   const type = field.slice(endIndex + 2, endOfLine);

  //   tsAccessors.push({ field: fieldName, type: type });
  // }

  // return tsAccessors;
  return [];
};

export const parseJsClassFields = (splitFile: string[]) => {
  return {
    private: parsePrivateFields(splitFile),
    prefixed: parsePrefixFields(splitFile, '_'),
    static: parseStaticFields(splitFile),
    staticPrivate: parseStaticPrivateFields(splitFile),
  };
};

export const parseStaticPrivateFields = (splitFile: string[]): string[] => {
  const filteredStaticPrivateFields = splitFile.filter(
    (line) => line.includes('static') && line.includes('#')
  );

  const staticPrivateFields: string[] = [];

  if (filteredStaticPrivateFields.length > 0) {
    for (const staticPrivateField of filteredStaticPrivateFields) {
      const [keyword, field] = staticPrivateField.trim().split(' ');

      if (field) {
        if (field.includes(';')) {
          staticPrivateFields.push(`${field.slice(0, -1)}`);
        } else {
          staticPrivateFields.push(`${field.slice(0)}`);
        }
      }
    }
  }

  return staticPrivateFields;
};

export const parseStaticFields = (splitFile: string[]): string[] => {
  const filteredStaticFields = splitFile.filter(
    (line) => line.includes('static') && !line.includes('#')
  );

  const staticFields: string[] = [];

  if (filteredStaticFields.length > 0) {
    for (const staticField of filteredStaticFields) {
      const [keyword, field] = staticField.trim().split(' ');

      if (field) {
        if (field.includes(';')) {
          staticFields.push(`${field.slice(0, -1)}`);
        } else {
          staticFields.push(`${field.slice(0)}`);
        }
      }
    }
  }
  return staticFields;
};

export const parsePrivateFields = (splitFile: string[]): string[] => {
  let privateFields: string[] = [];

  const privateHeaderFields = splitFile.filter(
    (line) =>
      line.includes('#') &&
      !line.includes('=') &&
      !line.includes('static') &&
      !line.includes('return')
  );
  const privateConstructorFields = splitFile.filter(
    (line) => line.includes('this.#') && line.includes('=')
  );

  if (privateHeaderFields.length > 0) {
    for (const privateField of privateHeaderFields) {
      const field = privateField.trim().slice(0, -1);

      if (privateFields.includes(field)) {
        continue;
      }
      privateFields.push(field);
    }
  }

  if (privateConstructorFields.length > 0) {
    for (const privateField of privateConstructorFields) {
      const startIndex = privateField.indexOf('#');
      const endIndex = privateField.indexOf('=') - 1;
      const field = privateField.slice(startIndex, endIndex);

      if (privateFields.includes(field)) {
        continue;
      }

      privateFields.push(field);
    }
  }

  return privateFields;
};

export const parsePrefixFields = (splitFile: string[], prefix: string): string[] => {
  const prefixFields: string[] = [];

  const prefixdHeaderFields = splitFile.filter(
    (line) => line.includes(prefix) && !line.includes('=') && !line.includes('static')
  );
  const prefixConstructorFields = splitFile.filter(
    (line) => line.includes(prefix) && line.includes('=')
  );

  for (const prefixField of prefixdHeaderFields) {
    const startIndex = prefixField.trim().indexOf(prefix);
    const endIndex = prefixField.indexOf(';') - 2;
    const field = prefixField.trim().slice(startIndex, endIndex);

    if (prefixFields.includes(field)) {
      continue;
    }

    prefixFields.push(field);
  }

  for (const prefixField of prefixConstructorFields) {
    const startIndex = prefixField.indexOf(prefix);
    const endIndex = prefixField.indexOf('=') - 1;
    const field = prefixField.slice(startIndex, endIndex);

    if (prefixFields.includes(field)) {
      continue;
    }
    prefixFields.push(field);
  }
  return prefixFields;
};
