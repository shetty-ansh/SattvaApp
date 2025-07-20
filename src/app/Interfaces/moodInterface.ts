export interface MoodEntry {
    _id?: string;
    mood: 'happy' | 'sad' | 'anxious' | 'angry' | 'calm' | 'stressed';
    intensity?: 1 | 2 | 3 | 4 | 5; // Optional
    note?: string;
    date: Date;
  }
  