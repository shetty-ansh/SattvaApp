import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Habit } from '../Interfaces/habitsInterface';

@Injectable({
  providedIn: 'root'
})
export class HabitEntriesService {

  private url = 'http://localhost:3000'
  habits$ = signal<Habit[]>([]);
  // habit$ = signal<Habit>({} as Habit)
  habit$ = signal<Habit | null>(null); //Better

  constructor(private httpClient: HttpClient) { }

  private refreshHabits() {
    this.httpClient.get<Habit[]>(`${this.url}/habits`).subscribe(data => { this.habits$.set(data) })
  }

  getHabits() {
    this.refreshHabits();
    return this.habits$;
  }

  getSingleHabit(id: string): Signal<Habit | null> {
    this.httpClient.get<Habit>(`${this.url}/habits/${id}`).subscribe(data => { this.habit$.set(data) })

    return this.habit$;
  }

  createHabit(newHabit: Habit) {
    return this.httpClient.post<Habit>(`${this.url}/habits`, newHabit)
  }

  updateHabits(id: string, updatedHabit: Habit): Signal<Habit | null> {
    this.httpClient.put<Habit>(`${this.url}/habits/${id}`, updatedHabit).subscribe(data => { this.habit$.set(data) })

    return this.habit$
  }

  patchHabit(id: string, updatedFields: Partial<Habit>) {
    return this.httpClient.patch<Habit>(`${this.url}/habits/${id}`, updatedFields);
  }
  
  

  deleteHabit(id: string) {
    return this.httpClient.delete(`${this.url}/habits/${id}`).subscribe(() => { this.refreshHabits() });
  }

  getGoodHabits() {
    return this.httpClient.get<Habit[]>(`${this.url}/habits?type=Good`);
  }

  getBadHabits() {
    return this.httpClient.get<Habit[]>(`${this.url}/habits?type=Bad`);
  }



}

//Refresh habits$ after everything here itself or
//this.habitEntriesService.getHabits(); in components
