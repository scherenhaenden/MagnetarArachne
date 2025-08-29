import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-select',
  standalone: true,
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent {
  @Input() public options: ReadonlyArray<string> = [];
  @Input() public value = '';
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();
  public onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
