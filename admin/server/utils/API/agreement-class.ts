// agreements-class.ts

import { Parser } from 'xml2js';
import { LanBillingApi } from './main-api-class';

export class Agreements extends LanBillingApi {

  constructor(url: string, httpClient: HttpClient) {
    super(url, httpClient);
  }

  private async parseAgreements(xmlResponse: string): Promise<any> {
    try {
      const parser = new Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlResponse);
      const agreementsData = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['lbapi:getAgreementsResponse'].ret;

      // Ensure agreementsData is an array
      const agreements = Array.isArray(agreementsData) ? agreementsData : [agreementsData];

      const parsedAgreements = agreements.map(agrData => ({
        // You can add more fields here based on the response structure
        uid: Number(agrData.uid),
        agreement: agrData.agrmnum,
        account: agrData.accountid,
        created: agrData.created,
        expires: agrData.expires,
      }));

      return parsedAgreements;
    } catch (error) {
      console.error('Error parsing XML:', error);
      throw error;
    }
  }

  public async getAgreements(): Promise<any> {
    try {
      const bodyContent = `
        <getAgreements xmlns="urn:api3">
          <flt />
        </getAgreements>
      `;

      const response = await this.makeSoapRequest(bodyContent);
      const parsedResponse = await this.parseAgreements(response);
      return parsedResponse;
    } catch (error) {
      throw error;
    }
  }
}
