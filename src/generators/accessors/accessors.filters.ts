import type { FilteredJsFields, FilteredTsFields } from './accessors.types.js';

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
