import { Component, OnInit, computed, Signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MoodEntriesService } from '../../Services/mood-entries.service';
import { MoodEntry } from '../../Interfaces/moodInterface';
import { MoodModalComponent } from './mood-modal/mood-modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MoodModalComponent, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  weeks: Date[][] = [];
  moods: Signal<MoodEntry[]>;
  selectedDate: Date | null = null;
  showMoodModal = false;

  constructor(private moodService: MoodEntriesService) {
    this.moods = computed(() => this.moodService.moods$());
  }

  ngOnInit() {
    this.generateCalendar();
    this.moodService.getMoodEntries(); // Triggers refresh
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: Date[][] = [];
    let week: Date[] = [];
    let day = new Date(firstDay);
    day.setDate(day.getDate() - day.getDay()); // Start from Sunday
    // Loop until we've added all days up to and including the last day of the month
    while (day <= lastDay || week.length > 0) {
      week.push(new Date(day));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      day.setDate(day.getDate() + 1);
      // After lastDay, fill the last week and break
      if (day > lastDay && week.length > 0 && week.length < 7) {
        while (week.length < 7) {
          week.push(new Date(day));
          day.setDate(day.getDate() + 1);
        }
        weeks.push(week);
        break;
      }
    }
    this.weeks = weeks;
  }

  getMoodForDate(date: Date): MoodEntry | undefined {
    return this.moods().find(mood => {
      const moodDate = new Date(mood.date);
      return moodDate.getFullYear() === date.getFullYear() &&
        moodDate.getMonth() === date.getMonth() &&
        moodDate.getDate() === date.getDate();
    });
  }

  getColorForIntensity(intensity?: number): string {
    switch (intensity) {
      case 1: return '#ff4d4d'; // red
      case 2: return '#ff944d'; // orange
      case 3: return '#ffe04d'; // yellow
      case 4: return '#b6ff4d'; // light green
      case 5: return '#4dff88'; // green
      default: return 'transparent';
    }
  }

  onDateClick(date: Date) {
    this.selectedDate = date;
    this.showMoodModal = true;
  }

  onMoodSaved() {
    this.showMoodModal = false;
    this.selectedDate = null;
    this.moodService.getMoodEntries(); // Refresh moods
  }

  closeMoodModal() {
    this.showMoodModal = false;
    this.selectedDate = null;
  }
}
