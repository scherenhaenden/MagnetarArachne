import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FlowDesignerController {
  private _selectedNodeId: string | null = null;
  public constructor() {}
  public get selectedNodeId(): string | null { return this._selectedNodeId; }
  public setSelectedNode(id: string | null): void { this._selectedNodeId = id; }
}
