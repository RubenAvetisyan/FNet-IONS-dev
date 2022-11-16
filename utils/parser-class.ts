import type { convertableToString } from 'xml2js'
import { Parser } from 'xml2js'

export class XmlParser {
  parser = new Parser()
  constructor() { }

  async parseThe(xml: convertableToString) {
    const data = await this.parser.parseStringPromise(xml)
    return data
  }
}
