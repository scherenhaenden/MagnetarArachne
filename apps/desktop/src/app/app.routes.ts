import { Route } from '@angular/router';
import { WorkflowsPageComponent } from './view/pages/workflows-page/workflows-page.component';
import { TemplatesPageComponent } from './view/pages/templates-page/templates-page.component';
import { ExecutionsPageComponent } from './view/pages/executions-page/executions-page.component';
import { SettingsPageComponent } from './view/pages/settings-page/settings-page.component';
import { NxWelcome } from './welcome-component/nx-welcome';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'workflows' },
  { path: 'workflows', component: WorkflowsPageComponent },
  { path: 'workflows-preview', component: NxWelcome },
  { path: 'templates', component: TemplatesPageComponent },
  { path: 'executions', component: ExecutionsPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: 'workflows' }
];
