import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilesystemService {
  public constructor() {}
  public open(path: string): Promise<string> { return Promise.resolve(''); }
  public save(path: string, content: string): Promise<void> { return Promise.resolve(); }
  public list(dir: string): Promise<readonly string[]> { return Promise.resolve([]); }
}
