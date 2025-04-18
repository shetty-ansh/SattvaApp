import { Component } from '@angular/core';
import { Habit } from '../../Habit';
import { EntriesService } from '../../Services/entries.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habits',
  imports: [CommonModule],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {
    GoodHabits: Habit[] = [];
    BadHabits: Habit[] = [];
    constructor(private entriesService: EntriesService) {
        this.GoodHabits= this.entriesService.GoodHabits;
        this.BadHabits= this.entriesService.BadHabits;
    }
    ShowingGood: boolean = true;
    ToggleHabits() {
        this.ShowingGood = !this.ShowingGood;
    }
    onClickAdd() {
            // this.GoodHabits[index].Streak++;
        }
    }

