import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() public placeholder = 'Search...';
  @Input() public value = '';
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue= target.value;
    this.valueChange.emit(newValue);
  }
}
