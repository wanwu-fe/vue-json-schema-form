import { AjvFormat } from './validator/types'

interface CustomFormat extends AjvFormat {
  component: String // jsf-text-input || your-custom-component
}

export interface JsonSchemFormPlugin {
  customFormats: CustomFormat[]
}
