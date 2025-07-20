import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { JournalComponent } from './Components/journal/journal.component';
import { EntryComponent } from './Components/entry/entry.component';
import { ChatComponent } from './Components/chat/chat.component';
import { HabitsComponent } from './Components/habits/habits.component';
import { TrackerComponent } from './Components/tracker/tracker.component';
import { MeditationComponent } from './Components/meditation/meditation.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { UserComponent } from './Components/user/user.component';
// import { DashboardComponent } from './Components/dashboard/dashboard.component';

// Services
import { HabitEntriesService } from './Services/habit-entries.service';
import { JournalEntriesService } from './Services/journal-entries.service';
import { MoodEntriesService } from './Services/mood-entries.service';

// Routing
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    JournalComponent,
    EntryComponent,
    ChatComponent,
    HabitsComponent,
    TrackerComponent,
    MeditationComponent,
    NavigationComponent,
    UserComponent,
    // DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HabitEntriesService,
    JournalEntriesService,
    MoodEntriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 