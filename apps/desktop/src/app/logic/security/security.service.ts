import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  public constructor() {}
  public sanitizeText(input: string): string { return String(input); }
  public redactSecret(input: string): string { return '••••••'; }
}
