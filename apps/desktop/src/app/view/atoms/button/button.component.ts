import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() public variant: 'default'|'primary'|'danger' = 'default';
  @Input() public disabled: boolean = false;
}
