export const normalizeMessage = (msg: string) => {
  return msg
    .replaceAll('_', '\\_')
    .replaceAll('|', '\\|')
    .replaceAll('.', '\\.')
    .replaceAll('{', '\\{')
    .replaceAll('+', '\\+')
    .replaceAll('}', '\\}')
    .replaceAll('=', '\\=')
    .replaceAll('>', '\\>')
    .replaceAll('<', '\\<')
    .replaceAll('-', '\\-')
    .replaceAll('!', '\\!')
}

export default {
  normalizeMessage
}