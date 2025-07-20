import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodModalComponent } from './mood-modal.component';

describe('MoodModalComponent', () => {
  let component: MoodModalComponent;
  let fixture: ComponentFixture<MoodModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
