import {
  Options,
  FormatDefinition,
  FormatValidator,
  KeywordDefinition,
} from 'ajv'

export interface AjvFormat {
  name: string
  definition: FormatValidator | FormatDefinition
}

export interface AjvKeyword {
  name: string
  definition: KeywordDefinition
}

export interface CreateInstanceOptions {
  // locale?: string
  options?: Options
  formats?: AjvFormat | AjvFormat[]
  keywords?: AjvKeyword | AjvKeyword[]
}

export interface ConstantCreateInstanceOptions extends CreateInstanceOptions {
  // locale: string
  options: Options
  formats: AjvFormat[]
  keywords: AjvKeyword[]
}

export interface EnumKeyValueItem<V> {
  key: string
  value: V
}
