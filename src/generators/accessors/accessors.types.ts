export interface ParsedTsFields {
  modifier: string;
  classModifier?: string;
  readonly?: string;
  field: string;
  type: string;
}

export interface PrivateFields {
  private: ParsedTsFields[] | [];
  privateStatic: ParsedTsFields[] | [];
  privateReadonly: ParsedTsFields[] | [];
  privateStaticReadonly: ParsedTsFields[] | [];
}

export interface PublicFields {
  public: ParsedTsFields[] | [];
  publicStatic: ParsedTsFields[] | [];
  publicReadonly: ParsedTsFields[] | [];
  publicStaticReadonly: ParsedTsFields[] | [];
}

export interface ProtectedFields {
  protected: ParsedTsFields[] | [];
  protectedStatic: ParsedTsFields[] | [];
  protectedReadonly: ParsedTsFields[] | [];
  protectedStaticReadonly: ParsedTsFields[] | [];
}

export interface JsClassFields {
  language: 'js';
  private: string[] | [];
  prefixed: string[] | [];
  static: string[] | [];
  staticPrivate: string[] | [];
}

export interface TsClassFields {
  language: 'ts';
  privateFields: PrivateFields;
  publicFields: PublicFields;
  protectedFields: ProtectedFields;
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
