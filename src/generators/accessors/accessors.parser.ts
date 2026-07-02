import type {
  FilteredJsFields,
  FilteredTsFields,
  ParsedJsFields,
  ParsedTsField,
  ParsedTsFields,
} from './accessors.types.js';

// TYPESCRIPT PARSER
export const parseTsClassFields = (filteredFields: FilteredTsFields): ParsedTsFields => {
  const { privateFields, publicFields, protectedFields } = filteredFields;

  return {
    language: 'ts',
    privateFields: {
      privateOnlyFields: parseModifierOnlyTsFields(privateFields.privateOnlyFields),
      privateStaticFields: parseStaticTsFields(privateFields.privateStaticFields),
      privateReadonlyFields: parseReadonlyTsFields(privateFields.privateReadonlyFields),
      privateStaticReadonlyFields: parseStaticReadonlyTsFields(
        privateFields.privateStaticReadonlyFields
      ),
    },

    publicFields: {
      publicOnlyFields: parseModifierOnlyTsFields(publicFields.publicOnlyFields),
      publicStaticFields: parseStaticTsFields(publicFields.publicStaticFields),
      publicReadonlyFields: parseReadonlyTsFields(publicFields.publicReadonlyFields),
      publicStaticReadonlyFields: parseStaticReadonlyTsFields(
        publicFields.publicStaticReadonlyFields
      ),
    },

    protectedFields: {
      protectedOnlyFields: parseModifierOnlyTsFields(protectedFields.protectedOnlyFields),
      protectedStaticFields: parseStaticTsFields(protectedFields.protectedStaticFields),
      protectedReadonlyFields: parseReadonlyTsFields(protectedFields.protectedReadonlyFields),
      protectedStaticReadonlyFields: parseStaticReadonlyTsFields(
        protectedFields.protectedStaticReadonlyFields
      ),
    },
  };
};

export const parseModifierOnlyTsFields = (fieldsArr: string[]) => {
  const fields: ParsedTsField[] = [];
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

export const parseStaticTsFields = (fieldLine: string[]) => {
  const staticFields: ParsedTsField[] = [];

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

export const parseReadonlyTsFields = (fieldsArr: string[]) => {
  const readonlyFields: ParsedTsField[] = [];

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

export const parseStaticReadonlyTsFields = (fieldsArr: string[]) => {
  const staticReadonlyFields: ParsedTsField[] = [];
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

// JAVASCRIPT PARSER

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
