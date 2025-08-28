import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MappingService {
  public constructor() {}
  public resolve(path: string, context: unknown): unknown { return undefined; }
}
