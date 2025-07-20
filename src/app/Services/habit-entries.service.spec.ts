import { TestBed } from '@angular/core/testing';

import { HabitEntriesService } from './habit-entries.service';

describe('HabitEntriesService', () => {
  let service: HabitEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
