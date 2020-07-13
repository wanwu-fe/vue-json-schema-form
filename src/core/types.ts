import { AjvFormat, AjvKeyword } from './validator/types'
import { Schema } from './utils/schema'

interface CustomFormat extends AjvFormat {
  component: String // jsf-text-input || your-custom-component
}

interface CustomKeyword extends AjvKeyword {
  transformSchema?: (originSchema: Schema) => Schema
}

export interface JsonSchemFormPlugin {
  customFormats?: CustomFormat[]
  customKeywords?: CustomKeyword[]
}
