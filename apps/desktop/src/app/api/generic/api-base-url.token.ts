import { InjectionToken } from '@angular/core';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL',
  { factory: (): string => '/api' } // default; override en app.config.ts
);
