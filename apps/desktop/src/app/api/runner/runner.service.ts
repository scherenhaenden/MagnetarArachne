import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RunnerService {
  public constructor() {}
  public run(flowPath: string): void { /* noop */ }
  public pause(runId: string): void { /* noop */ }
  public resume(runId: string): void { /* noop */ }
  public cancel(runId: string): void { /* noop */ }
}
