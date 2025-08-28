import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() public size: number = 16;
  @Input() public title?: string;
}
