import * as soap from 'soap';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosHttpClient implements soap.IHttpClient {
  private axiosInstance = axios;

  request(
    url: string,
    data: any,
    callback: (error: any, response: any, body?: any) => any,
    exheaders?: soap.IHeaders,
    exoptions?: soap.IExOptions,
  ): any {
    const axiosConfig: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      headers: exheaders,
      ...exoptions,
    };

    return this.axiosInstance.request(axiosConfig)
      .then((response: AxiosResponse) => {
        callback(null, response, response.data);
      })
      .catch((error: any) => {
        callback(error, null, null);
      });
  }
}

export class LanBillingApi {
  protected url: string;
  protected soapClient: soap.Client | undefined;
  protected soapHeader: any;
  protected sessnum: string;

  constructor(url: string) {
    this.url = url;
    this.soapHeader = undefined;
    this.sessnum = '';
  }

  protected extractSessnum(cookies: string[]): string {
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

  protected async makeSoapRequest(method: string, args: object): Promise<any> {
    if (!this.soapClient) {
      throw new Error('SOAP client not initialized');
    }

    try {
      return await this.soapClient[method](args)
    } catch (error) {
      throw error
    }
  }

  protected setSoapHeader(sessionId: string) {
    this.soapHeader = {
      'SessionHeader': {
        'sessionid': sessionId
      }
    };
    if (this.soapClient) {
      this.soapClient.addSoapHeader(this.soapHeader);
    }
  }

  public async init() {
    const wsdlOptions: soap.IOptions = {
      httpClient: new AxiosHttpClient()
    };
    this.soapClient = await soap.createClientAsync(this.url, wsdlOptions);
    return
  }

  public async login(username: string, password: string): Promise<any> {
    const args = {
      login: username,
      pass: password
    };

    const response = await this.makeSoapRequest('Login', args);

    const cookies = response.response.headers['set-cookie'];
    if (cookies) {
      this.sessnum = this.extractSessnum(cookies);
      this.setSoapHeader(this.sessnum);
    } else {
      throw new Error("Failed to retrieve session cookie");
    }

    return response;
  }
}
