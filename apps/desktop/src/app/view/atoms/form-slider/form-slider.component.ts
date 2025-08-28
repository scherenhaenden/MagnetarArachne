import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-slider',
  standalone: true,
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent {
  @Input() public min: number = 0;
  @Input() public max: number = 100;
  @Input() public step: number = 1;
  @Input() public value: number = 0;
  @Output() public valueChange: EventEmitter<number> = new EventEmitter<number>();
  public onInput(v: string): void { this.value = Number(v); this.valueChange.emit(this.value); }
}
