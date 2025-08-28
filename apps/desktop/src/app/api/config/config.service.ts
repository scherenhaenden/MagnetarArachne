import { Injectable } from '@angular/core';

export interface RuntimeConfig {
  readonly apiBaseUrl: string;
  readonly httpAllowlist?: readonly string[];
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly _config: RuntimeConfig = { apiBaseUrl: '/api' };
  public constructor() {}
  public get value(): RuntimeConfig { return this._config; }
}
