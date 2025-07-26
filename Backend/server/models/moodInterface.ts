import * as mongodb from 'mongodb'

export interface MoodEntry {
    _id?: mongodb.ObjectId;
    mood: 'happy' | 'sad' | 'anxious' | 'angry' | 'calm' | 'stressed';
    intensity?: 1 | 2 | 3 | 4 | 5; 
    note?: string;
    date: Date;
  }
    