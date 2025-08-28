import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-input',
  standalone: true,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  @Input() public type: 'text'|'number' = 'text';
  @Input() public value: string | number = '';
  @Input() public placeholder = '';
  @Output() public valueChange: EventEmitter<string|number> = new EventEmitter<string|number>();

  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = this.type === 'number' ? Number(target.value) : target.value;
    this.valueChange.emit(newValue);
  }
}
