import { Component, Signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitEntriesService } from '../../Services/habit-entries.service';
import { Habit } from '../../Interfaces/habitsInterface';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {
  habits$: Signal<Habit[]>;  // Signal from service
  // goodHabits: Signal<Habit[]>;
  // habitsArray: Habit[] = []; 
  isGood: boolean = false;
  showForm: boolean = false;
  name: string = '';
  description: string = '';
  currentStreak: number = 0;
  goalStreak: number | null = null;
  type: 'Good' | 'Bad' | null = null;
  priority: 'Low' | 'Medium' | 'High' | null = null;
  completed: boolean = false;
  
  constructor(private habitService: HabitEntriesService) {
    
    this.habits$ = this.habitService.getHabits();
    // this.goodHabits$ = this.habitService.getGoodHabits();
    

    // Effect to watch for changes in habits$
    // effect(() => {
    //   const updatedHabits = this.habits$();  // Trigger reactivity when habits$ changes
    //   this.habitsArray = [...updatedHabits];  // Update the local array with the new data
    // });
  }

  refreshHabits(){
    this.habits$ = this.habitService.getHabits();
  }

  getPriority(priority: string) {
    switch (priority) {
      case 'High':
        return 'High-Priority';
      case 'Medium':
        return 'Medium-Priority';
      case 'Low':
        return 'Low-Priority'
      default:
        return 'Medium-Priority';
    }
  }

  deleteHabit(id: string | undefined) {
    if (!id) return;
    this.habitService.deleteHabit(id)
    this.refreshHabits()
  }

  AddStreak(id: string | undefined, streak:number){
    if (!id) return;
    const updatedFields: Partial<Habit> = { currentStreak: streak + 1 };
    this.habitService.patchHabit(id, updatedFields).subscribe(() => {
      this.refreshHabits()
    })
  }

  toggleSwitch() {
    console.log('Switch is now:', this.isGood ? 'GOOD' : 'BAD');
  }

  addHabit(){
    this.showForm = true;
 
  }

  setType(type: 'Good' | 'Bad') {
    this.type = type;
  }

  setPriority(priority: 'Low' | 'Medium' | 'High') {
    this.priority = priority;
  }

  submitHabit(){
    if(!this.name || !this.goalStreak || !this.type || !this.priority){
      alert("Please enter all required fields!");
      return;
    }
    this.showForm = false;
    const newHabit = {
      name: this.name,
      desc: this.description || "You've got this",
      currentStreak: this.currentStreak,
      goalStreak: this.goalStreak,
      type: this.type,
      priority: this.priority,
      completed: this.completed
    } 
    this.habitService.createHabit(newHabit).subscribe(() => {
      this.refreshHabits();
      this.showForm = false;
      this.resetForm();
    })
    
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.goalStreak = null;
    this.type = null;
    this.priority = null;
  }

  
  cancelButton(){
    this.showForm = false;
  }
}
