import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesService } from '../../Services/entries.service';
import { JournalEntry } from '../../JournalEntry';
import { findIndex } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent implements OnInit {
  JournalEntries: JournalEntry[] = [];
  @Output() selectedEntry = new EventEmitter<number>();

  constructor(private entriesService: EntriesService, private router: Router) {}

  ngOnInit() {
    this.JournalEntries = this.entriesService.getEntries();
  }

  openEntry(JournalEntry: JournalEntry) {
    const index = this.JournalEntries.findIndex(entry => entry === JournalEntry);
    this.selectedEntry.emit(index);
    // alert(index);
    this.router.navigate(['/entry']);
  }
}
