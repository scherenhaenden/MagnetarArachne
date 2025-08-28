import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecretsService {
  public constructor() {}
  public getSecret(ref: string): Promise<string | null> { return Promise.resolve(null); }
  public setSecret(ref: string, value: string): Promise<void> { return Promise.resolve(); }
  public deleteSecret(ref: string): Promise<void> { return Promise.resolve(); }
}
