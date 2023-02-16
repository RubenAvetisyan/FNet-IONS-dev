import type { CredentialType, DefaultCredentialKey } from '~~/nuxt'

export class Credential {
  private readonly _credentials: Map<DefaultCredentialKey | string, CredentialType>

  constructor() {
    this._credentials = new Map([
      ['easyPay', {
        user: 'onediller',
        password: '2VzWASS9',
      }],
      ['idram', {
        user: 'twodiller',
        password: '2VzWASS9',
      }],
      ['tellcell', {
        user: 'threediller',
        password: '2VzWASS9',
      }],
    ])
  }

  add(key: string, value: CredentialType): void {
    this._credentials.set(key, value)
  }

  get credentials(): Map<DefaultCredentialKey | string, CredentialType> {
    return this._credentials
  }

  getCredKeyTypes(): { keys: IterableIterator<string> } {
    const cred = this._credentials.keys()
    return { keys: cred }
  }
}
