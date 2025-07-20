export interface Habit {
  _id?: string;
  name: string;
  desc?: string;
  currentStreak: number;
  goalStreak: number;
  type: 'Good' | 'Bad';
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  // lastCompleted?: Date;
}


  