import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeIconComponent } from './node-icon.component';

describe('NodeIconComponent', () => {
  let component: NodeIconComponent;
  let fixture: ComponentFixture<NodeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NodeIconComponent] }).compileComponents();
    fixture = TestBed.createComponent(NodeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
