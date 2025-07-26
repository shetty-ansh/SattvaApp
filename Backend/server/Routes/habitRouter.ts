import { Router, Request, Response, RequestHandler } from "express";
import { getHabitsCollection, habitValidation } from "../database";
import { ObjectId } from "mongodb";
export const habitRouter = Router();

const collection = getHabitsCollection();

habitRouter.post('/', (async (req: Request, res: Response) => {
  const newHabit = req.body;
  const valid = await habitValidation(newHabit);

  if (!valid) {
    return res.status(400).json({ error: "Invalid habit entry format" });
  }

  try {
    const result = await collection.insertOne(newHabit);
    res.status(201).json({ message: "Habit entry added", id: result.insertedId });
  } catch (error: any) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
}) as RequestHandler);

habitRouter.delete('/:id', (async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: `No habit found with ID: ${id}` });
    }

    return res.status(200).json({ message: `Deleted entry with ID: ${id} successfully` });
  } catch (error: any) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
}) as unknown as RequestHandler);

habitRouter.put('/:id', (async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedHabit = req.body
    const query = {_id: new ObjectId(id)}
    try {
      
      const result = await collection.findOneAndUpdate(query, updatedHabit)
      if(!result){
        return res.status(404).json({ message: `No Habit found with ID: ${id}` });
      }
      return res.status(200).json({ message: `Updated ID: ${id} successfully` });
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: `Error while updating ID: ${id}`, error: err.message });
    }
    
}) as unknown as RequestHandler);

habitRouter.get('/', (async (req: Request, res: Response) => {
    try {   
      const result = await collection.find({}).toArray();
      return res.status(200).json(result);
      // return res.status(201).json({ message: `Fetched all entries successfully` }, );
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: `Error while fetching entries`, error: err.message });
    }
}) as unknown as RequestHandler);

habitRouter.get('/:id', (async (req: Request, res: Response) => {
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    try {
      const result = await collection.findOne(query)
      if(!result){
        return res.status(404).json({ message: `No entry found with ID: ${id}` });
      }
      return res.status(200).json({ message: `Fetched ID: ${id} successfully` , data: result});
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: `Error while fetching ID: ${id}`, error: err.message });
    }
}) as unknown as RequestHandler);

// PATCH route for partial updates (e.g., incrementing streak)
habitRouter.patch('/:id', (async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  const updateFields = req.body;
  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    if (!result || !('value' in result) || !result.value) {
      return res.status(404).json({ message: `No habit found with ID: ${id}` });
    }
    return res.status(200).json({ message: `Updated ID: ${id} successfully`, data: result.value });
  } catch (error: any) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
}) as unknown as RequestHandler);

