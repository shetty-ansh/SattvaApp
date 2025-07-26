import { getHabitsCollection, getJournalEntriesCollection, getMoodLogCollection } from "../database";
import { Router, Request, Response, RequestHandler } from "express";

export const dashRouter = Router();
const moodCollection = getMoodLogCollection();
const habitCollection = getHabitsCollection();
const journalCollection = getJournalEntriesCollection();

dashRouter.get('/', (async (req: Request, res: Response) => {
    const { mood, intensity, date } = req.query;
    const moodFilter: any = {};
    if (mood) moodFilter.mood = mood;
    if (intensity) moodFilter.intensity = Number(intensity);
    if (date) moodFilter.date = date;

    try {
        const [moods, habits, journals] = await Promise.all([
            moodCollection.find(moodFilter).toArray(),
            habitCollection.find().toArray(),
            journalCollection.find().toArray()
        ]);

        return res.status(200).json({
            message: 'Dashboard data fetched successfully',
            data: { moods, habits, journals }
        });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ error: err.message });
    }
}) as unknown as RequestHandler);
