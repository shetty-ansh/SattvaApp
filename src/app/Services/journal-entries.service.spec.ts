import { TestBed } from '@angular/core/testing';

import { JournalEntriesService } from './journal-entries.service';

describe('JournalEntriesService', () => {
  let service: JournalEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
