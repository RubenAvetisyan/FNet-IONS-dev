export class Credential {
  private readonly _credentials: Map<DefaultCredentialKey | string, CredentialType>
  constructor() {
    this._credentials = new Map([
      ['easyPay', {
        user: 'onediller',
        passowrd: '2VzWASS9',
      }],
      ['idram', {
        user: 'twodiller',
        passowrd: '2VzWASS9',
      }],
      ['tellcell', {
        user: 'threediller',
        passowrd: '2VzWASS9',
      }],
    ])
  }

  add(key: string, value: CredentialType) {
    this._credentials.set(key, value)
  }

  get credentials() {
    return this._credentials
  }

  getCredKeyTypes() {
    const cred = this._credentials.keys()
    return class Cred {
      keys: IterableIterator<string>
      constructor() {
        this.keys = cred
      }
    }
  }
}
