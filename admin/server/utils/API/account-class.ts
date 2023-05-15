import { LanBillingApi } from './lanbilling-api-class'

export class Account extends LanBillingApi {
  /**
   * Get an account.
   *
   * @param {number} uid - Unique identifier for the user.
   *
   * @returns {Promise<any>} SOAP response result.
   */
  public async getAccount(uid: number): Promise<any> {
    const args = {
      uid: uid,
    };

    return this.makeSoapRequest('getAccount', args);
  }

  /**
   * Get a list of accounts.
   *
   * @param {SoapFilter[]} filters - Array of account filters.
   * @param {SoapOrderBy[]} order - Array of account order by fields.
   * 
   * @returns {Promise<any>} SOAP response result.
   */
  public async getAccounts(filters?: SoapFilter[], order?: SoapOrderBy[]): Promise<any> {
    const args: any = {};

    if (filters?.length) {
      args.filter = filters;
    }

    if (order && order.length > 0) {
      args.order = order;
    }

    return this.makeSoapRequest('getAccounts', args);
  }

  /**
   * Add an account.
   *
   * @param {AccountData} accountData - Account data.
   * 
   * @returns {Promise<number>} SOAP response result.
   */
  public async addAccount(accountData: AccountData): Promise<number> {
    const args = {
      val: {
        account: accountData,
      },
      isInsert: 1,
    };

    return this.makeSoapRequest('insupdAccount', args);
  }

  /**
   * Update or insert user group.
   *
   * @param {UserGroupData} userGroupData - User group data.
   * 
   * @returns {Promise<number>} SOAP response result.
   */
  public async insupdUserGroup(userGroupData: UserGroupData): Promise<number> {
    const args = {
      val: {
        usergroup: userGroupData,
      },
      isInsert: userGroupData.isInsert ? 1 : 0,
    };

    return this.makeSoapRequest('insupdUserGroup', args);
  }
}
