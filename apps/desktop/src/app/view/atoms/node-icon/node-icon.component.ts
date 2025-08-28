import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-node-icon',
  standalone: true,
  templateUrl: './node-icon.component.html',
  styleUrls: ['./node-icon.component.scss']
})
export class NodeIconComponent {
  @Input() public kind: 'start'|'function'|'condition'|'switch'|'ai'|'chat'|'vector'|'database'|'api'|'file'|'transform' = 'function';
}
