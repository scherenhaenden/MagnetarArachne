import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  public constructor() {}
  public readManifest(pkgDir: string): Promise<unknown> { return Promise.resolve({}); }
  public installPackage(apkgPath: string): Promise<void> { return Promise.resolve(); }
  public listPackages(dir: string): Promise<readonly string[]> { return Promise.resolve([]); }
}
