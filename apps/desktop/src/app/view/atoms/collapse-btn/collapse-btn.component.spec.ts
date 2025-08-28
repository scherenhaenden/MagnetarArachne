import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapseBtnComponent } from './collapse-btn.component';

describe('CollapseBtnComponent', () => {
  let component: CollapseBtnComponent;
  let fixture: ComponentFixture<CollapseBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CollapseBtnComponent] }).compileComponents();
    fixture = TestBed.createComponent(CollapseBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
