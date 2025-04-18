import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EntriesService } from '../../Services/entries.service';
import { JournalEntry } from '../../JournalEntry';
import { JournalComponent } from '../journal/journal.component';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit {
  constructor(
    public router: Router,
    private entriesService: EntriesService
  ) {}
  
  @Input() selectedEntryIndex: number = 0;
  JournalEntries: JournalEntry[] = [];

  ngOnInit() {
    this.JournalEntries = this.entriesService.getEntries();
  }

  onEntrySelected(index: number) {
    this.selectedEntryIndex = index;
  }
}
