import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { appRoutes } from './app.routes';
import { NxWelcome } from './welcome-component/nx-welcome';
import { ButtonComponent, CollapseBtnComponent,
  ConnectionPointComponent, FormInputComponent, FormSelectComponent, FormSliderComponent,
  FormTextareaComponent, IconComponent, NodeIconComponent, SearchBoxComponent, StatusItemComponent
} from './view/atoms';

@NgModule({
  declarations: [App, NxWelcome],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ButtonComponent,
    IconComponent,
    CollapseBtnComponent,
    SearchBoxComponent,
    NodeIconComponent,
    ConnectionPointComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormSliderComponent,
    FormInputComponent,
    StatusItemComponent,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
