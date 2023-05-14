// account-class.ts
import { parseStringPromise, Parser } from 'xml2js';
import { LanBillingApi } from './lanbilling-api-class'

type IsInsert = boolean | 0 | 1

type AccountData = {
  uid: Pick<SoapAccount, 'uid'>,
  login: Pick<SoapAccount, 'login'>,
  pass: string,
  block: number,
  balance: number,
  agrmnum: string
}

export class Account extends LanBillingApi {
  protected async parseAccount(xmlResponse: string) {
    try {
      const parser = new Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlResponse);
      const accountsData = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['lbapi:getAccountsResponse'].ret;
      const accounts = Array.isArray(accountsData) ? accountsData : [accountsData]; // Ensure accounts is an array

      const parsedAccounts = accounts.map(accountData => ({
        application: accountData.application,
        account: {
          soleproprietor: accountData.account.soleproprietor === 'true',
          uid: Number(accountData.account.uid),
          vgcnt: Number(accountData.account.vgcnt),
          type: Number(accountData.account.type),
          category: Number(accountData.account.category),
          def: Number(accountData.account.def),
          templ: Number(accountData.account.templ),
          login: accountData.account.login,
          name: accountData.account.name,
          descr: accountData.account.descr,
          email: accountData.account.email,
          phone: accountData.account.phone,
          mobile: accountData.account.mobile,
        },
      }));

      return parsedAccounts;
    } catch (error) {
      console.error('Error parsing XML:', error);
      throw error;
    }
  }

  /**
   * Получение учетной записи.
   *
   * @param {string} login - Логин клиента.
   *
   * @returns {Promise<any>} Результат SOAP запроса.
   */
  public async getAccount(uid: number): Promise<any> {
    const bodyContent = `<getAccount xmlns="urn:api3">
      <uid xsi:type="xsd:int">${uid}</uid>
    </getAccount>`;

    const response = await this.makeSoapRequest(bodyContent);
    return this.parseAccount(response)
  }

  /**
   * Получение списка учетных записей.
   *
   * @param {SoapFilter[]} filters - Массив фильтров для учетных записей.
   * @param {SoapOrderBy[]} order - Массив полей сортировки для учетных записей.
   * 
   * @returns {Promise<any>} Результат SOAP запроса.
   */
  public async getAccounts(filters?: SoapFilter[], order?: SoapOrderBy[]): Promise<any> {
    let bodyContent = `<getAccounts xmlns="urn:api3">`;

    if (filters && filters.length > 0) {
      bodyContent += `<filter>`;
      filters.forEach(filter => {
        bodyContent += `<item>`;
        Object.entries(filter).forEach(([key, value]) => {
          bodyContent += `<${key}>${value}</${key}>`;
        });
        bodyContent += `</item>`;
      });
      bodyContent += `</filter>`;
    }

    if (order && order.length > 0) {
      bodyContent += `<order>`;
      order.forEach(orderBy => {
        bodyContent += `<item>`;
        Object.entries(orderBy).forEach(([key, value]) => {
          bodyContent += `<${key}>${value}</${key}>`;
        });
        bodyContent += `</item>`;
      });
      bodyContent += `</order>`;
    }

    bodyContent += `</getAccounts>`;

    const reponse = await this.makeSoapRequest(bodyContent)
    return this.parseAccount(reponse);
  }

  /**
   * @typedef {Object} AccountData
   * @property {number} uid - Уникальный идентификатор пользователя.
   * @property {string} login - Логин клиента, используемый для входа в его личный кабинет.
   * @property {string} pass - Пароль клиента.
   * @property {number} block - Индикатор блокировки (0 - активен, 1 - заблокирован).
   * @property {number} balance - Баланс клиента.
   * @property {string} agrmnum - Номер договора.
   * 
   * @returns {Promise<number>} Результат SOAP запроса.
   */
  public async addAccount(accountData: AccountData): Promise<number> {
    const bodyContent = `<insupdAccount xmlns="urn:api3">
      <val>
        <account>
          <uid xsi:type="xsd:int">${accountData.uid}</uid>
          <login xsi:type="xsd:string">${accountData.login}</login>
          <pass xsi:type="xsd:string">${accountData.pass}</pass>
          <block xsi:type="xsd:int">${accountData.block}</block>
          <balance xsi:type="xsd:double">${accountData.balance}</balance>
          <agrmnum xsi:type="xsd:string">${accountData.agrmnum}</agrmnum>
          // ...добавьте здесь другие поля
        </account>
      </val>
      <isInsert xsi:type="xsd:int">1</isInsert>
    </insupdAccount>`;
    return this.makeSoapRequest(bodyContent);
  }

  public async insupdUserGroup(userGroupData: UserGroupData): Promise<number> {
    const bodyContent = `<insupdUserGroup xmlns="urn:api3">
      <val>
        <usergroup>
          <unloadtosorm>${userGroupData.unloadtosorm}</unloadtosorm>
          <sormid>${userGroupData.sormid}</sormid>
          <groupid>${userGroupData.groupid}</groupid>
          <promiseallow>${userGroupData.promiseallow}</promiseallow>
          // ...добавьте здесь другие поля...
        </usergroup>
      </val>
      <isInsert>${userGroupData.isInsert ? 1 : 0}</isInsert>
    </insupdUserGroup>`;
    return this.makeSoapRequest(bodyContent);
  }
}
