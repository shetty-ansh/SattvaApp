import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { JournalComponent } from './Components/journal/journal.component';
import { EntryComponent } from './Components/entry/entry.component';
import { ChatComponent } from './Components/chat/chat.component';
import { HabitsComponent } from './Components/habits/habits.component';
import { TrackerComponent } from './Components/tracker/tracker.component';
import { MeditationComponent } from './Components/meditation/meditation.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'journal',
        component: JournalComponent
    },
    {
        path: 'entry',
        component: EntryComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    {
        path: 'habits',
        component: HabitsComponent
    },
    {
        path: 'tracker',
        component: TrackerComponent
    },
    {
        path: 'meditation',
        component: MeditationComponent
    }
];
