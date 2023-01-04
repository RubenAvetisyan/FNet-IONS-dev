import fs from 'node:fs'

export function readSql(filePath: string) {
    const fileBuffer = fs.readFileSync(filePath).toString()
    const fileString = fileBuffer
        .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
        .replace(/\s+/g, ' ') // excess white space
        .split(";") // split into all statements
        .map(Function.prototype.call, String.prototype.trim)
        .filter(function (el) { return el.length !== 0 }).join('; ')
    return fileString
}