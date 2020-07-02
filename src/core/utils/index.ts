export * from './schema'
export * from './common'
export * from './common-renderer-props'

var SINGLE_QUOTE = /'|\\/g
function escapeQuotes(str: string) {
  return str
    .replace(SINGLE_QUOTE, '\\$&')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\f/g, '\\f')
    .replace(/\t/g, '\\t')
}

function toQuotedString(str: string) {
  return "'" + escapeQuotes(str) + "'"
}

export function escapeJsonPointer(str: string) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1')
}

function joinPaths(a: any, b: any) {
  if (a == '""') return b
  return (a + ' + ' + b).replace(/' \+ '/g, '')
}

export function getJsonPointerPath(currentPath: string, prop: string) {
  var path = toQuotedString('/' + escapeJsonPointer(prop))
  return joinPaths(currentPath, path)
}
