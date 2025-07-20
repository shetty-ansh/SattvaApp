import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Entry } from '../Interfaces/journalEntryInterface';

@Injectable({
  providedIn: 'root'
})
export class JournalEntriesService {
  entries$ = signal<Entry[]>([]);
  entry$ = signal<Entry | null>(null);
  private url = 'http://localhost:3000';
  
  constructor(private httpClient: HttpClient) {}

  private refreshJournalEntries(){
    this.httpClient.get<{data: Entry[]}>(`${this.url}/journal`).subscribe(response => {
      this.entries$.set(response.data);
    });
  }

  getJournalEntries(): Signal<Entry[]>{
    this.refreshJournalEntries();
    return this.entries$;
  }

  getJournalEntry(id:string){
    this.httpClient.get<{data: Entry}>(`${this.url}/journal/${id}`).subscribe(response => {
      this.entry$.set(response.data);
    });
    return this.entry$;
  }

  createJournalEntry(newEntry: Entry){
    return this.httpClient.post(`${this.url}/journal`, newEntry).subscribe(() => this.refreshJournalEntries());
  }

  updateJournalEntry(id:string, updatedEntry: Entry){
    this.httpClient.put(`${this.url}/journal/${id}`, updatedEntry).subscribe(() => this.refreshJournalEntries());
  }

  deleteJournalEntry(id:string){
    this.httpClient.delete(`${this.url}/journal/${id}`).subscribe(() => this.refreshJournalEntries());
  }
}
