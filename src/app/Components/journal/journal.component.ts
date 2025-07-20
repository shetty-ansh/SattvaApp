import { Component, EventEmitter, OnInit, Output, Signal, signal, WritableSignal, OnDestroy, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { findIndex } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { JournalEntriesService } from '../../Services/journal-entries.service';
import { Entry } from '../../Interfaces/journalEntryInterface';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent implements OnInit {
  entries$: Signal<Entry[]>;
  showJournal: boolean = false
  showForm: boolean = true
  showCover: boolean = true
  title: string = '';
  desc: string = '';
  date: string = '';  // bind as string for input[type="date"]
  rating: '1' | '2' | '3' | '4' | '5' = '3';

  // entries = computed(() => this.entries$()); // for reactive updates

  constructor(private JournalEntriesService: JournalEntriesService) {
    this.entries$ = this.JournalEntriesService.getJournalEntries();
  }

  ngOnInit() {
    this.refreshEntries();
  }

  refreshEntries() {
    this.entries$ = this.JournalEntriesService.getJournalEntries();
  }

  deleteEntry(id: string | undefined) {
    if (id) {
      this.JournalEntriesService.deleteJournalEntry(id);
    }
  }
  openJournal() {
    this.showJournal = true
  }

  addEntry() {
    this.showForm = true
    this.showJournal = false
    this.showCover = false
    // console.log('ABABABA')
  }

  submitEntry() {
    this.showForm = false
    this.showJournal = true
    const newEntry = {
      title: this.title,
      desc: this.desc,
      date: new Date(this.date),
      rating: this.rating
    };
    this.JournalEntriesService.createJournalEntry(newEntry)
    this.refreshEntries();
    this.resetForm();

  }
  cancelButton() {
    this.showForm = false
  }
  resetForm() {
    this.title = ' ',
      this.desc = ' ',
      this.date = ' ',
      this.rating = '3'

  }
  setRating(r: string) {
    this.rating = r as '1' | '2' | '3' | '4' | '5';
  }

}



