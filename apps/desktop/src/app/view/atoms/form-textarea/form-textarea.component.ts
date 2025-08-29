import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-textarea',
  standalone: true,
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent {
  @Input() public rows: number = 3;
  @Input() public placeholder: string = '';
  @Input() public value: string = '';
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();
  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.valueChange.emit(newValue);
  }
}
