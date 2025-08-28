import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogsService {
  private readonly _buffer: string[] = [];
  public constructor() {}
  public get lines(): readonly string[] { return this._buffer; }
  public append(line: string): void { this._buffer.push(line); }
  public clear(): void { this._buffer.length = 0; }
}
