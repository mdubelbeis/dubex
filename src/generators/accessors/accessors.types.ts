export interface FilteredTsFields {
  privateFields: FilteredPrivateTsFields;
  publicFields: FilteredPublicTsFields;
  protectedFields: FilteredProtectedTsFields;
}

export interface FilteredJsFields {
  privateFields: {
    privateOnlyFields: string[] | [];
    privateStaticFields: string[] | [];
  };
  publicFields: {
    publicOnlyFields: string[] | [];
    publicStaticFields: string[] | [];
  };
}

export interface ParsedTsFields {
  language: 'ts';
  privateFields: PrivateTsFields;
  publicFields: PublicTsFields;
  protectedFields: ProtectedTsFields;
}

export interface ParsedJsFields {
  language: 'js';
  privateFields: ParsedPrivateJsFields;
  publicFields: ParsedPublicJsFields;
}

export interface ParsedTsField {
  modifier?: string;
  classModifier?: string;
  staticModifier?: string;
  readonlyModifier?: string;
  prefix?: string;
  field: string;
  type: string;
  value?: string;
}

export interface PrivateTsFields {
  privateOnlyFields: ParsedTsField[];
  privateStaticFields: ParsedTsField[];
  privateReadonlyFields: ParsedTsField[];
  privateStaticReadonlyFields: ParsedTsField[];
}
export interface PublicTsFields {
  publicOnlyFields: ParsedTsField[];
  publicStaticFields: ParsedTsField[];
  publicReadonlyFields: ParsedTsField[];
  publicStaticReadonlyFields: ParsedTsField[];
}
export interface ProtectedTsFields {
  protectedOnlyFields: ParsedTsField[];
  protectedStaticFields: ParsedTsField[];
  protectedReadonlyFields: ParsedTsField[];
  protectedStaticReadonlyFields: ParsedTsField[];
}

export interface ParsedPrivateJsFields {
  privateOnlyFields: ParsedOnlyJsField[];
  privateStaticFields: ParsedStaticJsField[];
}

export interface ParsedOnlyJsField {
  unfilteredField: string;
}

export interface ParsedStaticJsField {
  staticModifier: string;
  unfilteredField: string;
}

export interface ParsedPublicJsFields {
  publicOnlyFields: ParsedOnlyJsField[];
  publicStaticFields: ParsedStaticJsField[];
}

export interface FilteredPrivateTsFields {
  privateOnlyFields: string[] | [];
  privateStaticFields: string[] | [];
  privateReadonlyFields: string[] | [];
  privateStaticReadonlyFields: string[] | [];
}

export interface FilteredPublicTsFields {
  publicOnlyFields: string[] | [];
  publicStaticFields: string[] | [];
  publicReadonlyFields: string[] | [];
  publicStaticReadonlyFields: string[] | [];
}

export interface FilteredProtectedTsFields {
  protectedOnlyFields: string[] | [];
  protectedStaticFields: string[] | [];
  protectedReadonlyFields: string[] | [];
  protectedStaticReadonlyFields: string[] | [];
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
