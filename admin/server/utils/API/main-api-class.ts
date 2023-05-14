// import { ofetch } from 'ofetch'
import { parseString, parseStringPromise, Parser } from 'xml2js'

// const myFetch: HttpClient = {
//   post: (url: string, body: any, options?: any) => ofetch(url, {
//     method: 'POST',
//     body,
//     headers: { 'Content-Type': 'text/xml;charset=UTF-8' },
//     redirect: 'follow',
//     ...options
//   })
// }

export class LanBillingApi {
  protected httpClient: HttpClient;
  protected url: string;
  protected soapHeader: string
  protected sessnum: string

  constructor(url: string, httpClient: HttpClient) {
    this.url = url;
    this.httpClient = httpClient;
    this.soapHeader = ''
    this.sessnum = ''
  }

  protected extractSessnum(cookies: string[]) {
    let sessnum = '';
    const sessnumRegex = /sessnum=([^;]+)/;

    for (let cookie of cookies) {
      const match = cookie.match(sessnumRegex);
      if (match) {
        sessnum = match[1];
        break;
      }
    }

    return sessnum;
  }

  protected async parse(xmlResponse: string) {
    try {
      const parser = new Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlResponse);
      return result['lbapi:LoginResponse'].ret.manager;
    } catch (error) {
      console.error('Ошибка при преобразовании XML в JSON:', error);
      throw error;
    }
  }

  protected async makeSoapRequest(bodyContent: string): Promise<any> {
    try {
      const body = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:api3">
      <soap:Header />
      <soap:Body>
        ${bodyContent}
      </soap:Body>
    </soap:Envelope>`;

      console.log('body: ', body);

      const response = await this.httpClient.post(this.url, body, {
        headers: {
          'Cookie': this.sessnum
        }
      });

      return response.data;
    } catch (error) {
      throw error
    }
  }

  protected setSoapHeader(sessionId: string) {
    this.soapHeader = `<SessionHeader xmlns="urn:api3">
      <sessionid>${sessionId}</sessionid>
    </SessionHeader>`
  }

  public async login(username: string, password: string): Promise<void> {
    try {
      const bodyContent = `<Login xmlns="urn:api3">
        <login>${username}</login>
        <pass>${password}</pass>
      </Login>`

      const response = await this.httpClient.post(this.url, bodyContent);
      const parsedResponse = await this.parse(response.data);

      const sessnum = this.extractSessnum(response.cookies)
      this.sessnum = 'sessnum=' + sessnum

      // this.setSoapHeader(sessnum)

      return parsedResponse
    } catch (error) {
      throw error;
    }
  }
}
