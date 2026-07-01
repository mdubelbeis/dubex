export interface ParsedTsFields {
  modifier?: string;
  classModifier?: string;
  staticModifier?: string;
  readonlyModifier?: string;
  prefix?: string;
  field: string;
  type: string;
  value?: string;
}

export interface ParsedTsFieldsTemp {
  language: 'ts';
  privateFields: PrivateFieldsTemp;
  publicFields: PublicFieldsTemp;
  protectedFields: ProtectedFieldsTemp;
}

export interface PrivateFieldsTemp {
  privateOnlyFields: ParsedTsFields[];
  privateStaticFields: ParsedTsFields[];
  privateReadonlyFields: ParsedTsFields[];
  privateStaticReadonlyFields: ParsedTsFields[];
}
export interface PublicFieldsTemp {
  publicOnlyFields: ParsedTsFields[];
  publicStaticFields: ParsedTsFields[];
  publicReadonlyFields: ParsedTsFields[];
  publicStaticReadonlyFields: ParsedTsFields[];
}
export interface ProtectedFieldsTemp {
  protectedOnlyFields: ParsedTsFields[];
  protectedStaticFields: ParsedTsFields[];
  protectedReadonlyFields: ParsedTsFields[];
  protectedStaticReadonlyFields: ParsedTsFields[];
}

export interface FilteredTsFields {
  privateFields: PrivateFields;
  publicFields: PublicFields;
  protectedFields: ProtectedFields;
}

export interface PrivateFields {
  privateOnlyFields: string[] | [];
  privateStaticFields: string[] | [];
  privateReadonlyFields: string[] | [];
  privateStaticReadonlyFields: string[] | [];
}

export interface PublicFields {
  publicOnlyFields: string[] | [];
  publicStaticFields: string[] | [];
  publicReadonlyFields: string[] | [];
  publicStaticReadonlyFields: string[] | [];
}

export interface ProtectedFields {
  protectedOnlyFields: string[] | [];
  protectedStaticFields: string[] | [];
  protectedReadonlyFields: string[] | [];
  protectedStaticReadonlyFields: string[] | [];
}

export interface JsClassFields {
  language: 'js';
  private: string[] | [];
  prefixed: string[] | [];
  static: string[] | [];
  staticPrivate: string[] | [];
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
