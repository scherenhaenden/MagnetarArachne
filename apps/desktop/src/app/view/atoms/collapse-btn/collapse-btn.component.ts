import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collapse-btn',
  standalone: true,
  templateUrl: './collapse-btn.component.html',
  styleUrls: ['./collapse-btn.component.scss']
})
export class CollapseBtnComponent {
  @Input() public collapsed: boolean = false;
  @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Emits the toggle event with the opposite of the collapsed state.
   */
  public onClick(): void { this.toggle.emit(!this.collapsed); }
}
