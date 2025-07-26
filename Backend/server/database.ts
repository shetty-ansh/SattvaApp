import * as mongodb from 'mongodb';
import * as dotenv from 'dotenv';
import { Habit } from './models/habitsInterface';
import { Entry } from './models/journalEntryInterface';
import { MoodEntry } from './models/moodInterface';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
let db: mongodb.Db;
let habitsCollection: mongodb.Collection<Habit>;
let journalCollection: mongodb.Collection<Entry>;
let moodCollection: mongodb.Collection<MoodEntry>;



export async function connectToDB() {
    if (!MONGO_URI) {
        console.error("No URI in .env file");
        return false;
    }
    try {
        const client = await mongodb.MongoClient.connect(MONGO_URI);
        db = client.db('Sattva');
        // Initialize collections after connection
        habitsCollection = db.collection<Habit>('habitEntries');
        journalCollection = db.collection<Entry>('journalEntries');
        moodCollection = db.collection<MoodEntry>('moodLog');
        console.log("Connected to MongoDB successfully");
        return true;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error({ message: "Error Connecting to MongoDB Server", error: errorMessage });
        process.exit(1);
        return false;
    }
}

export function getHabitsCollection(): mongodb.Collection<Habit> {
    if (!habitsCollection) {
        throw new Error("Database not connected. Call connectToDB() first.");
    }
    return habitsCollection;
}

export function getJournalEntriesCollection(): mongodb.Collection<Entry> {
    if (!journalCollection) {
        throw new Error("Database not connected. Call connectToDB() first.");
    }
    return journalCollection;
}

export function getMoodLogCollection(): mongodb.Collection<MoodEntry> {
    if (!moodCollection) {
        throw new Error("Database not connected. Call connectToDB() first.");
    }
    return moodCollection;
}



// Validation Functions

export async function habitValidation(habit: Habit) {
  if (typeof habit !== 'object' || habit === null) return false;
  if (typeof habit.name !== 'string') return false;
  if (habit.desc !== undefined && typeof habit.desc !== 'string') return false;
  if (typeof habit.currentStreak !== 'number') return false;
  if (typeof habit.goalStreak !== 'number') return false;
  if (!['Good', 'Bad'].includes(habit.type)) return false;
  if (!['Low', 'Medium', 'High'].includes(habit.priority)) return false;
  if (typeof habit.completed !== 'boolean') return false;

  return true;
}

export async function journalEntryValidation(entry: Entry) {
    if (typeof entry !== 'object' || entry === null) return false;
    if (typeof entry.title !== 'string') return false;
    if (typeof entry.desc !== 'string') return false;
    if (!(entry.date instanceof Date) && isNaN(Date.parse(entry.date as any))) return false;
    if (!['1', '2', '3', '4', '5'].includes(entry.rating)) return false;

    return true;
}

export async function moodValidation(mood: MoodEntry) {
    if (typeof mood !== 'object' || mood === null) return false;
    if (!['happy', 'sad', 'anxious', 'angry', 'calm', 'stressed'].includes(mood.mood)) return false;
    if (typeof mood.note !== 'string') return false;
    if (mood.intensity !== undefined && ![1, 2, 3, 4, 5].includes(mood.intensity)) return false;
    if (!(mood.date instanceof Date) && isNaN(Date.parse(mood.date as any))) return false;

    return true;
}
