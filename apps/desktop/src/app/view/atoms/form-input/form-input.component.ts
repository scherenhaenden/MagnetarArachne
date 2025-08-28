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
  @Input() public placeholder: string = '';
  @Output() public valueChange: EventEmitter<string|number> = new EventEmitter<string|number>();
  public onInput(v: string): void { this.value = this.type==='number' ? Number(v) : v; this.valueChange.emit(this.value); }
}
