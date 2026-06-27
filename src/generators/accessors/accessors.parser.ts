import type { JsClassFields, ParsedTsFields, TsClassFields } from './accessors.types.js';

export const parseTsClassFields = (splitFile: string[]): TsClassFields => {
  const privateFields = parseTsPrivateFields(splitFile);
  const publicFields = parseTsPublicFields(splitFile);
  const protectedFields = parseTsProtectedFields(splitFile);

  return { language: 'ts', privateFields, publicFields, protectedFields };
};

export const parseStaticFields = (fieldsArr: string[]) => {
  const privateStaticFields: ParsedTsFields[] = [];

  fieldsArr
    .filter((line) => line.includes('static') && !line.includes('readonly'))
    .forEach((line) => {
      const [modifier, classModifier, field, type] = line.trim().split(' ');
      if (modifier && classModifier && field && type) {
        privateStaticFields.push({ modifier, classModifier, field, type });
      }
    });

  return privateStaticFields;
};

export const parseReadonlyFields = (fieldsArr: string[]) => {
  const privateReadonlyFields: ParsedTsFields[] = [];

  fieldsArr
    .filter((line) => line.includes('readonly') && !line.includes('static'))
    .forEach((line) => {
      const [modifier, classModifier, field, type] = line.trim().split(' ');
      if (modifier && classModifier && field && type) {
        privateReadonlyFields.push({ modifier, classModifier, field, type });
      }
    });
  return privateReadonlyFields;
};

export const parseStaticReadonlyFields = (fieldsArr: string[]) => {
  const privateStaticReadonlyFields: ParsedTsFields[] = [];
  fieldsArr
    .filter((line) => line.includes('static') && line.includes('readonly'))
    .forEach((line) => {
      const [modifier, classModifier, readonly, field, type] = line.trim().split(' ');

      if (modifier && classModifier && readonly && field && type) {
        privateStaticReadonlyFields.push({ modifier, classModifier, readonly, field, type });
      }
    });
  return privateStaticReadonlyFields;
};

export const parseOnlyFields = (fieldsArr: string[]) => {
  const fields: ParsedTsFields[] = [];
  fieldsArr
    .filter((line) => !line.includes('readonly') && !line.includes('static'))
    .forEach((line) => {
      const [modifier, field, type] = line.trim().split(' ');
      if (modifier && field && type) {
        fields.push({ modifier, field, type });
      }
    });
  return fields;
};

export const parseTsPrivateFields = (splitFile: string[]) => {
  const privateFields = splitFile.filter((line) => line.includes('private'));

  return {
    private: parseOnlyFields(privateFields),
    privateStatic: parseStaticFields(privateFields),
    privateReadonly: parseReadonlyFields(privateFields),
    privateStaticReadonly: parseStaticReadonlyFields(privateFields),
  };
};

export const parseTsPublicFields = (splitFile: string[]) => {
  const publicFields = splitFile.filter((line) => line.includes('public'));

  return {
    public: parseOnlyFields(publicFields),
    publicStatic: parseStaticFields(publicFields),
    publicReadonly: parseReadonlyFields(publicFields),
    publicStaticReadonly: parseStaticReadonlyFields(publicFields),
  };
};

export const parseTsProtectedFields = (splitFile: string[]) => {
  const protectedFields = splitFile.filter((line) => line.includes('protected'));

  return {
    protected: parseOnlyFields(protectedFields),
    protectedStatic: parseStaticFields(protectedFields),
    protectedReadonly: parseReadonlyFields(protectedFields),
    protectedStaticReadonly: parseStaticReadonlyFields(protectedFields),
  };
};

export const parseJsClassFields = (splitFile: string[]): JsClassFields => {
  return {
    language: 'js',
    private: parseJsPrivateFields(splitFile),
    prefixed: parseJsPrefixFields(splitFile, '_'),
    static: parseJsStaticFields(splitFile),
    staticPrivate: parseJsPrivateStaticFields(splitFile),
  };
};

export const parseJsPrivateStaticFields = (splitFile: string[]): string[] => {
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

export const parseJsStaticFields = (splitFile: string[]): string[] => {
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

export const parseJsPrivateFields = (splitFile: string[]): string[] => {
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

export const parseJsPrefixFields = (splitFile: string[], prefix: string): string[] => {
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
