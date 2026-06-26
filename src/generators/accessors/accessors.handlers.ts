import { formatJsAccessors } from './accessors.formatter.js';
import type { ClassFields } from './accessors.types.js';

export const writeAccessorsToFile = (fields: ClassFields, splitFile: string[]) => {
  const { newFields, existingFields } = formatJsAccessors(fields, splitFile);
  console.log(`New Fields: ${newFields}`);
  console.log(`Existing Fields: ${existingFields}`);
  //
};
