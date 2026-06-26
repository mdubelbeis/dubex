export interface FieldAndType {
  field: string;
  type: string;
}

export interface ClassFields {
  private: string[];
  prefixed: string[];
  static: string[];
  staticPrivate: string[];
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
