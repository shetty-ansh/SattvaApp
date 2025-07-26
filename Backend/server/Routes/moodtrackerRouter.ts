import { RequestHandler, Router, Request, Response } from "express";
import { getMoodLogCollection, moodValidation } from "../database";
import { ObjectId } from "mongodb";

export const moodtrackerRouter = Router();

const collection = getMoodLogCollection();

moodtrackerRouter.post('/', ((async (req: Request, res: Response) => {
  const newMood = req.body;
  const valid = await moodValidation(newMood);

  if (!valid) {
    return res.status(400).json({ error: "Invalid mood format" });
  }

  try {
    const result = await collection.insertOne(newMood);
    return res.status(201).json({ message: "Mood entry added", id: result.insertedId });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}) as unknown) as RequestHandler);

moodtrackerRouter.delete('/:id', ((async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const query = { _id: new ObjectId(id) };

  try {
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Mood entry not found" });
    }
    return res.status(200).json({ message: "Mood entry deleted" });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}) as unknown) as RequestHandler);

moodtrackerRouter.put('/:id', ((async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedMood = req.body;
  const valid = await moodValidation(updatedMood);

  if (!valid) {
    return res.status(400).json({ error: "Invalid mood format" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedMood }
    );

    if (!result) {
      return res.status(404).json({ message: `No mood entry found with ID: ${id}` });
    }

    return res.status(200).json({ message: `Updated mood entry ID: ${id} successfully` });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}) as unknown) as RequestHandler);

moodtrackerRouter.get('/', ((async (req: Request, res: Response) => {
  try {
    const result = await collection.find({}).toArray();
    return res.status(200).json({ message: "Fetched all mood entries successfully", data: result });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}) as unknown) as RequestHandler);

moodtrackerRouter.get('/:id', ((async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ message: `No mood entry found with ID: ${id}` });
    }
    return res.status(200).json({ message: `Fetched mood entry ID: ${id} successfully`, data: result });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}) as unknown) as RequestHandler);
