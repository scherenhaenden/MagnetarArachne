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
  public onInput(v: string): void { this.value = v; this.valueChange.emit(v); }
}
