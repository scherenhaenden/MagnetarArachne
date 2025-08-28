import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-select',
  standalone: true,
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent {
  @Input() public options: ReadonlyArray<string> = [];
  @Input() public value: string = '';
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();
  public onChange(v: string): void { this.value = v; this.valueChange.emit(v); }
}
