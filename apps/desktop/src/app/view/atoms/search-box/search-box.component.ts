import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() public placeholder: string = 'Search...';
  @Input() public value: string = '';
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public onInput(v: string): void { this.value = v; this.valueChange.emit(v); }
}
