import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExecutionController {
  private _running: boolean = false;
  public constructor() {}
  public get isRunning(): boolean { return this._running; }
  public start(): void { this._running = true; }
  public stop(): void { this._running = false; }
}
