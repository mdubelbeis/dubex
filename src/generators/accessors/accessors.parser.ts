import type {
  FilteredJsFields,
  FilteredTsFields,
  ParsedJsFields,
  ParsedTsFields,
  ParsedTsFieldsTemp,
} from './accessors.types.js';

export const filterTsClassFields = (fields: string[], prefix: '$' = '$'): FilteredTsFields => {
  const privateFields = fields.filter((line) => line.includes('private'));

  const privateOnlyFields = privateFields.filter(
    (line) => !line.includes('readonly') && !line.includes('static')
  );
  const privateStaticFields = privateFields.filter(
    (line) => line.includes('static') && !line.includes('readonly')
  );
  const privateReadonlyFields = privateFields.filter(
    (line) => line.includes('readonly') && !line.includes('static')
  );
  const privateStaticReadonlyFields = privateFields.filter(
    (line) => line.includes('static') && line.includes('readonly')
  );

  const publicFields = fields.filter(
    (line) =>
      line.includes('public') ||
      line.trim().startsWith('static') ||
      line.trim().startsWith('readonly')
  );

  const publicOnlyFields = publicFields.filter(
    (line) => !line.includes('readonly') && !line.includes('static')
  );
  const publicStaticFields = publicFields.filter(
    (line) => line.includes('static') && !line.includes('readonly')
  );
  const publicReadonlyFields = publicFields.filter(
    (line) => line.includes('readonly') && !line.includes('static')
  );
  const publicStaticReadonlyFields = publicFields.filter(
    (line) => line.includes('static') && line.includes('readonly')
  );

  const protectedFields = fields.filter((line) => line.includes('protected'));
  const protectedOnlyFields = protectedFields.filter(
    (line) => !line.includes('readonly') && !line.includes('static')
  );
  const protectedStaticFields = protectedFields.filter(
    (line) => line.includes('static') && !line.includes('readonly')
  );
  const protectedReadonlyFields = protectedFields.filter(
    (line) => line.includes('readonly') && !line.includes('static')
  );
  const protectedStaticReadonlyFields = protectedFields.filter(
    (line) => line.includes('static') && line.includes('readonly')
  );

  return {
    privateFields: {
      privateOnlyFields,
      privateStaticFields,
      privateReadonlyFields,
      privateStaticReadonlyFields,
    },
    publicFields: {
      publicOnlyFields,
      publicStaticFields,
      publicReadonlyFields,
      publicStaticReadonlyFields,
    },
    protectedFields: {
      protectedOnlyFields,
      protectedStaticFields,
      protectedReadonlyFields,
      protectedStaticReadonlyFields,
    },
  };
};

export const parseTsClassFieldsTemp = (filteredFields: FilteredTsFields): ParsedTsFieldsTemp => {
  const { privateFields, publicFields, protectedFields } = filteredFields;

  // Parse Single Modifier (Private, Public, Protected)
  const parsedPrivateOnlyFields = parseModifierOnlyFields(privateFields.privateOnlyFields);
  const parsedPublicOnlyFields = parseModifierOnlyFields(publicFields.publicOnlyFields);
  const parsedProtectedOnlyFields = parseModifierOnlyFields(protectedFields.protectedOnlyFields);

  // Parse Static Fields
  const parsedPrivateStaticFields = parseStaticFields(privateFields.privateStaticFields);
  const parsedPublicStaticFields = parseStaticFields(publicFields.publicStaticFields);
  const parsedProtectedStaticFields = parseStaticFields(protectedFields.protectedStaticFields);

  // Parse Readonly Fields
  const parsedPrivateReadonlyFields = parseReadonlyFields(privateFields.privateReadonlyFields);
  const parsedPublicReadonlyFields = parseReadonlyFields(publicFields.publicReadonlyFields);
  const parsedProtectedReadonlyFields = parseReadonlyFields(
    protectedFields.protectedReadonlyFields
  );

  // Parse Static Readonly Fields
  const parsedPrivateStaticReadonlyFields = parseStaticReadonlyFields(
    privateFields.privateStaticReadonlyFields
  );
  const parsedPublicStaticReadonlyFields = parseStaticReadonlyFields(
    publicFields.publicStaticReadonlyFields
  );
  const parsedProtectedStaticReadonlyFields = parseStaticReadonlyFields(
    protectedFields.protectedStaticReadonlyFields
  );

  return {
    language: 'ts',
    privateFields: {
      privateOnlyFields: parsedPrivateOnlyFields,
      privateStaticFields: parsedPrivateStaticFields,
      privateReadonlyFields: parsedPrivateReadonlyFields,
      privateStaticReadonlyFields: parsedPrivateStaticReadonlyFields,
    },

    publicFields: {
      publicOnlyFields: parsedPublicOnlyFields,
      publicStaticFields: parsedPublicStaticFields,
      publicReadonlyFields: parsedPublicReadonlyFields,
      publicStaticReadonlyFields: parsedPublicStaticReadonlyFields,
    },

    protectedFields: {
      protectedOnlyFields: parsedProtectedOnlyFields,
      protectedStaticFields: parsedProtectedStaticFields,
      protectedReadonlyFields: parsedProtectedReadonlyFields,
      protectedStaticReadonlyFields: parsedProtectedStaticReadonlyFields,
    },
  };
};

export const parseStaticFields = (fieldLine: string[]) => {
  const staticFields: ParsedTsFields[] = [];

  fieldLine.forEach((line) => {
    const splitLine = line.trim().split(' ');

    if (splitLine.length === 4) {
      const [modifier, staticModifier, unfilteredField, unfilteredType] = splitLine;
      const prefix = unfilteredField?.slice(0, 1);
      const field = unfilteredField?.slice(1, -1);
      const type = unfilteredType?.slice(0, -1);

      if (modifier && staticModifier && prefix && field && type)
        staticFields.push({ modifier, staticModifier, prefix, field, type });
    }
    if (splitLine.length === 3) {
      const [staticModifier, unfilteredField, unfilteredType] = splitLine;
      const prefix = unfilteredField?.slice(0, 1);
      const field = unfilteredField?.slice(1, -1);
      let type = unfilteredType;

      if (unfilteredType?.includes(';') || unfilteredType?.includes(',')) {
        type = unfilteredType?.slice(0, -1);
      }

      if (staticModifier && prefix && field && type)
        staticFields.push({
          staticModifier,
          prefix,
          field,
          type,
        });
    }
  });

  return staticFields;
};

export const parseReadonlyFields = (fieldsArr: string[]) => {
  const readonlyFields: ParsedTsFields[] = [];

  fieldsArr
    .filter((line) => line.includes('readonly') && !line.includes('static'))
    .forEach((line) => {
      const splitLine = line.trim().split(' ');

      const [modifier, readonlyModifier, unfilteredField, unfilteredType] = splitLine;
      const prefix = unfilteredField?.slice(0, 1);
      const field = unfilteredField?.slice(1, -1);
      let type = unfilteredType;

      if (unfilteredType?.includes(';') || unfilteredType?.includes(',')) {
        type = unfilteredType?.slice(0, -1);
      }

      if (modifier && readonlyModifier && prefix && field && type)
        readonlyFields.push({ modifier, readonlyModifier, prefix, field, type });
    });

  return readonlyFields;
};

export const parseStaticReadonlyFields = (fieldsArr: string[]) => {
  const staticReadonlyFields: ParsedTsFields[] = [];
  fieldsArr
    .filter((line) => line.includes('static') && line.includes('readonly'))
    .forEach((line) => {
      const splitLine = line.trim().split(' ');

      const [modifier, staticModifier, readonlyModifier, unfilteredField, unfilteredType] =
        splitLine;
      const prefix = unfilteredField?.slice(0, 1);
      const field = unfilteredField?.slice(1, -1);
      let type = unfilteredType;

      if (unfilteredType?.includes(';') || unfilteredType?.includes(',')) {
        type = unfilteredType?.slice(0, -1);
      }

      if (modifier && staticModifier && readonlyModifier && prefix && field && type)
        staticReadonlyFields.push({
          modifier,
          staticModifier,
          readonlyModifier,
          prefix,
          field,
          type,
        });
    });

  return staticReadonlyFields;
};

export const parseModifierOnlyFields = (fieldsArr: string[]) => {
  const fields: ParsedTsFields[] = [];
  fieldsArr
    .filter((line) => !line.includes('static') && !line.includes('readonly'))
    .forEach((line) => {
      const splitLine = line.trim().split(' ');

      const [modifier, unfilteredField, unfilteredType] = splitLine;
      const prefix = unfilteredField?.slice(0, 1);
      const field = unfilteredField?.slice(1, -1);
      let type = unfilteredType;

      if (unfilteredType?.includes(';') || unfilteredType?.includes(',')) {
        type = unfilteredType?.slice(0, -1);
      }

      if (modifier && prefix && field && type)
        fields.push({
          modifier,
          prefix,
          field,
          type,
        });
    });
  return fields;
};

export const filterJsClassFields = (fields: string[]): FilteredJsFields => {
  const privateFields = fields.filter((line) => line.includes('#'));
  const publicFields = fields.filter((line) => !line.includes('#'));

  return {
    privateFields: {
      privateOnlyFields: privateFields.filter((line) => !line.includes('static')),
      privateStaticFields: privateFields.filter((line) => line.includes('static')),
    },
    publicFields: {
      publicOnlyFields: publicFields.filter((line) => !line.includes('static')),
      publicStaticFields: publicFields.filter((line) => line.includes('static')),
    },
  };
};

export const parseJsClassFields = (fields: FilteredJsFields): ParsedJsFields => {
  const data: ParsedJsFields = {
    language: 'js',
    privateFields: {
      privateOnlyFields: [],
      privateStaticFields: [],
    },
    publicFields: {
      publicOnlyFields: [],
      publicStaticFields: [],
    },
  };

  for (const unfilteredField of fields.privateFields.privateOnlyFields) {
    data.privateFields.privateOnlyFields.push({
      unfilteredField: unfilteredField.trim().slice(0, -1),
    });
  }

  for (const unfilteredField of fields.publicFields.publicOnlyFields) {
    data.publicFields.publicOnlyFields.push({
      unfilteredField: unfilteredField.trim().slice(0, -1),
    });
  }

  for (const unfilteredField of fields.privateFields.privateStaticFields) {
    const [staticModifier, field] = unfilteredField.trim().split(' ');

    if (staticModifier && field)
      data.privateFields.privateStaticFields.push({
        staticModifier,
        unfilteredField: field.slice(0, -1),
      });
  }

  for (const unfilteredField of fields.publicFields.publicStaticFields) {
    const [staticModifier, field] = unfilteredField.trim().split(' ');

    if (staticModifier && field)
      data.publicFields.publicStaticFields.push({
        staticModifier,
        unfilteredField: field.slice(0, -1),
      });
  }

  return data;
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
