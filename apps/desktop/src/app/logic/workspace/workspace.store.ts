import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WorkspaceStore {
  private readonly _recentFiles: readonly string[] = [];
  public constructor() {}
  public get recentFiles(): readonly string[] { return this._recentFiles; }
}
