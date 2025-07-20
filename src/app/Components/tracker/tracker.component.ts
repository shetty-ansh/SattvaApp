import { Component } from '@angular/core';

@Component({
  selector: 'app-tracker',
  imports: [],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  viewDate = new Date();

onDayClick(date: Date) {
  const mood = prompt('Enter mood');
  const value = prompt('Enter mood value (1-5)');
  // Call service to save mood
  console.log({ date, mood, value });
}

}
