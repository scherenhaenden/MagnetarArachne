import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent, CollapseBtnComponent,
  ConnectionPointComponent, FormInputComponent,
  FormSelectComponent, FormSliderComponent, FormTextareaComponent, IconComponent, NodeIconComponent, SearchBoxComponent,
  StatusItemComponent
} from '../../atoms';

@Component({
  selector: 'app-workflows-page',
  standalone: true,
  templateUrl: './workflows-page.component.html',
  imports: [
    FormInputComponent,
    IconComponent,
    ButtonComponent,
    CollapseBtnComponent,
    SearchBoxComponent,
    NodeIconComponent,
    ConnectionPointComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormSliderComponent,
    StatusItemComponent,
  ],
  styleUrls: ['./workflows-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkflowsPageComponent {
  public searchTerm = '';
  public selectedModel = 'gpt-4-turbo';
  public systemPrompt = 'You are a helpful assistant.';
  public userMessage = 'Enter your prompt or map from a previous node...';
  public temperature = 0.7;
  public maxTokens: string | number = 1000;

  onSidebarToggle($event: boolean) {

  }

  onSearchChange($event: string) {

  }

  onCategoryToggle(core: string, $event: boolean) {

  }

  onPropertiesToggle($event: boolean) {

  }

  onModelChange($event: string) {

  }

  onSystemPromptChange($event: string) {

  }

  onUserMessageChange($event: string) {

  }

  onTemperatureChange($event: number) {

  }

  onMaxTokensChange($event: string | number) {

  }

  constructor() {
    this.toggleTheme();
  }

  private isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  setDarkTheme(isDark: boolean) {
    this.isDark = isDark;
    document.body.classList.toggle('dark-theme', isDark);
  }
}
