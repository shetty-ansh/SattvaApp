import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { MoodEntry } from '../Interfaces/moodInterface';

@Injectable({
  providedIn: 'root'
})
export class MoodEntriesService {
  moods$ = signal<MoodEntry[]>([]);
  mood$ = signal<MoodEntry | null>(null);
  private url = 'http://localhost:4200';
  
  constructor(private httpClient: HttpClient) {}

  private refreshMoodEntries(){
    this.httpClient.get<MoodEntry[]>(`${this.url}/journal`).subscribe(data => {this.moods$.set(data)})

  } 

  getMoodEntries(): Signal<MoodEntry[]>{
    this.refreshMoodEntries()
    return this.moods$ 
  }

  getMoodEntry(id:string){
    this.httpClient.get<MoodEntry>(`${this.url}/journal/${id}`).subscribe(data => {this.mood$.set(data)})

    return this.mood$
  }

  createMoodEntry(newMoodEntry: MoodEntry){
    return this.httpClient.post(`${this.url}/journal`, newMoodEntry).subscribe(() => this.refreshMoodEntries());
  }

  updateMoodEntry(id:string, updatedMoodEntry: MoodEntry){
    this.httpClient.put(`${this.url}/journal/${id}`, updatedMoodEntry).subscribe(() => this.refreshMoodEntries());
  }

  deleteMoodEntry(id:string){
    this.httpClient.delete(`${this.url}/journal/${id}`).subscribe(() => this.refreshMoodEntries());
  }
}
