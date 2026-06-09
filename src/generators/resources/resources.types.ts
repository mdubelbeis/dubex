export type DubexResourceConfig = {
  resources: ResourceDefinition[];
};

export type ResourceDefinition = {
  name: string;
  fields?: ResourceField[];
};

export type ResourceField = {
  name: string;
  type: 'String' | 'Number' | 'Boolean' | 'Date' | 'ObjectId' | 'Mixed';
  required?: boolean;
  unique?: boolean;
  select?: boolean;
  default?: string | number | boolean;
  enum?: string[];
  ref?: string;
};
