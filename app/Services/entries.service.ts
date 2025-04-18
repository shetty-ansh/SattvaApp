import { Injectable } from '@angular/core';
import { JournalEntry } from '../JournalEntry';
import { Habit } from '../Habit';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  JournalEntries: JournalEntry[] = [
    {
      heading: "My First Entry",
      content: "Today was a good day. I started journaling and it feels great to write down my thoughts.",
      date: "2024-01-15"
    },
    {
      heading: "Making Progress", 
      content: "I've been consistent with my daily habits and can feel myself getting better each day.",
      date: "2024-01-16"
    },
    {
      heading: "New Goals",
      content: "Setting some new goals for myself this month. Excited to see what I can achieve!",
      date: "2024-01-17"
    },
    {
      heading: "Reflection Time",
      content: "Taking a moment to reflect on my journey so far. Proud of the small wins.",
      date: "2024-01-18"
    },
    {
      heading: "Weekend Plans", 
      content: "Planning to try some new activities this weekend. Looking forward to the adventure!",
      date: "2024-01-19"
    },
    {
      heading: "Learning Experience",
      content: "Made some mistakes today but learned valuable lessons. Growth comes from challenges.",
      date: "2024-01-20"
    },
    {
      heading: "Future Goals",
      content: "Brainstorming some long-term goals today. Dream big, work hard!",
      date: "2024-01-21"
    },
    {
      heading: "Mindful Morning",
      content: "Started my day with meditation and journaling. Feeling centered and focused.",
      date: "2024-01-22"
    },
    {
      heading: "Creative Flow",
      content: "Spent the afternoon working on creative projects. Time flies when you're in the zone!",
      date: "2024-01-23"
    }
  ];


  GoodHabits: Habit[] = [
    {
      Name: "Exercise",
      Goal: "Workout 3 times a week",
      Streak: 5
    },
    {
      Name: "Meditation",
      Goal: "Meditate 10 minutes a day",
      Streak: 7
    },
    {
      Name: "Read",
      Goal: "Read 10 pages a day",
      Streak: 3
    },
    {
      Name: "Drink Water",
      Goal: "Drink 8 glasses of water a day",
      Streak: 10
    },
    {
      Name: "Sleep",
      Goal: "Get 8 hours of sleep a day",
      Streak: 14
    },
    {
      Name: "Meditate",
      Goal: "Meditate 10 minutes a day",
      Streak: 7
    }
    
  ];  
  BadHabits: Habit[] = [
    {
      Name: "Smoking",
      Goal: "Smoke 10 cigarettes a day",
      Streak: 10
    },
    {
      Name: "Drinking",
      Goal: "Drink 10 glasses of alcohol a day",
      Streak: 10
    },
    {
      Name: "Sleep",
      Goal: "Get 8 hours of sleep a day",
      Streak: 14
    },
    {
      Name: "Meditate",
      Goal: "Meditate 10 minutes a day",
      Streak: 7
    },
    {
      Name: "Exercise",
      Goal: "Workout 3 times a week",
      Streak: 5
    },
    {
      Name: "Read",
      Goal: "Read 10 pages a day",
      Streak: 3
    }
  ];

  getEntries(): JournalEntry[] {
    return this.JournalEntries;
  }

  addEntry(entry: JournalEntry): void {
    this.JournalEntries.push(entry);
  }
} 