import { TestBed } from '@angular/core/testing';

import { MoodEntriesService } from './mood-entries.service';

describe('MoodEntriesService', () => {
  let service: MoodEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
