import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-item',
  standalone: true,
  templateUrl: './status-item.component.html',
  styleUrls: ['./status-item.component.scss']
})
export class StatusItemComponent {
  @Input() public text: string = '';
}
