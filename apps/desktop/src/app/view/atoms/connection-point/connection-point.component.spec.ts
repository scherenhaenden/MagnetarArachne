import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionPointComponent } from './connection-point.component';

describe('ConnectionPointComponent', () => {
  let component: ConnectionPointComponent;
  let fixture: ComponentFixture<ConnectionPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ConnectionPointComponent] }).compileComponents();
    fixture = TestBed.createComponent(ConnectionPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
