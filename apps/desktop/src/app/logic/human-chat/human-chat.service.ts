import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HumanChatService {
  private _awaitingInput: boolean = false;
  public constructor() {}
  public get awaitingInput(): boolean { return this._awaitingInput; }
  public pause(): void { this._awaitingInput = true; }
  public resume(): void { this._awaitingInput = false; }
}
