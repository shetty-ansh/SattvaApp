import { Component, OnInit, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JournalEntriesService } from '../../Services/journal-entries.service';
import { Entry } from '../../Interfaces/journalEntryInterface';


@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit {
  entry!: Signal<Entry | null>;

  constructor(
    private route: ActivatedRoute,
    private journalEntriesService: JournalEntriesService,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.entry = this.journalEntriesService.getJournalEntry(id);
    console.log("Entry:", this.entry?.());
  }
}

