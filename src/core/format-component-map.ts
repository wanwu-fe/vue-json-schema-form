interface StringMap {
  [key: string]: string
}

export const stringFormatComponentMap: StringMap = {
  default: 'jsf-text-input',
  color: 'jsf-color-picker',
  date: 'jsf-date-picker',
  'date-time': 'jsf-date-time-picker',
  time: 'jsf-time-picker',
}

export const numberFormatComponentMap: StringMap = {
  default: 'jsf-number-input',
  date: 'jsf-date-picker',
  'date-time': 'jsf-date-time-picker',
  time: 'jsf-time-picker',
}
