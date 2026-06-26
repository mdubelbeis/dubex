export interface FieldAndType {
  field: string;
  type: string;
}

export interface JsFields {
  privateFields: string[];
  preFixedFields: string[];
  fields: string[];
}

export interface GenerateAccessorsOptions {
  dryRun?: boolean;
  private?: boolean;
  force?: boolean;
  typescript?: boolean;
  skipAppFile?: boolean;
  underScore?: boolean;
  static?: boolean;
}
