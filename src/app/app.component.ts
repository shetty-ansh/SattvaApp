import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./Components/navigation/navigation.component";
import { JournalComponent } from './Components/journal/journal.component';
import { EntryComponent } from './Components/entry/entry.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
// import { DashboardComponent } from './Components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, JournalComponent, EntryComponent, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SattvaApp';
  selectedEntryIndex: number = 0;

  onEntrySelected(index: number) {
    this.selectedEntryIndex = index;
  }
}
