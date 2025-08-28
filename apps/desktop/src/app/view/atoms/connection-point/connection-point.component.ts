import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connection-point',
  standalone: true,
  templateUrl: './connection-point.component.html',
  styleUrls: ['./connection-point.component.scss']
})
export class ConnectionPointComponent {
  @Input() public type: 'input'|'output' = 'input';
  @Input() public state: 'default'|'true'|'false' = 'default';
}
