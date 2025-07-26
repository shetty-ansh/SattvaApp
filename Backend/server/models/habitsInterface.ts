import * as mongodb from 'mongodb';

  export interface Habit {
    _id?: mongodb.ObjectId;
    name: string;
    desc?: string;
    currentStreak: number;
    goalStreak: number;
    type: 'Good' | 'Bad';
    priority: 'Low' | 'Medium' | 'High';
    completed: boolean;
    // lastCompleted?: Date;
  }

