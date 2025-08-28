import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NodeConfigService {
  public constructor() {}
  public validateConfig(schema: unknown, value: unknown): boolean { return true; }
}
