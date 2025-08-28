import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token: string | null = null;
  public constructor() {}
  public get token(): string | null { return this._token; }
  public setToken(token: string | null): void { this._token = token; }
}
