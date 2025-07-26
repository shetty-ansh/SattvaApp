import { Router, Request, Response, RequestHandler } from "express";
import { getJournalEntriesCollection, journalEntryValidation } from "../database";
import { ObjectId } from "mongodb";
export const journalRouter = Router();

const collection = getJournalEntriesCollection();

journalRouter.post('/', (async (req: Request, res: Response) => {
  const newEntry = req.body;
  const valid = await journalEntryValidation(newEntry);

  if (!valid) {
    return res.status(400).json({ error: "Invalid journal entry format" });
  }

  try {
    const result = await collection.insertOne(newEntry);
    res.status(201).json({ message: "Journal entry added", id: result.insertedId });
  } catch (error: any) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
}) as RequestHandler);

journalRouter.delete('/:id', (async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: `No entry found with ID: ${id}` });
    }

    return res.status(200).json({ message: `Deleted entry with ID: ${id} successfully` });
  } catch (error: any) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
}) as unknown as RequestHandler);

journalRouter.put('/:id', (async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedEntry = req.body
    const query = {_id: new ObjectId(id)}
    try {
      
      const result = await collection.findOneAndUpdate(query, updatedEntry)
      if(!result){
        return res.status(404).json({ message: `No entry found with ID: ${id}` });
      }
      return res.status(200).json({ message: `Updated ID: ${id} successfully` });
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: `Error while updating ID: ${id}`, error: err.message });
    }
    
}) as unknown as RequestHandler);

journalRouter.get('/', (async (req: Request, res: Response) => {
    try {   
      const result = await collection.find({}).toArray();
      return res.status(200).json({ message: `Fetched all entries successfully` , data: result});
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: `Error while fetching entries`, error: err.message });
    }
}) as unknown as RequestHandler);

journalRouter.get('/:id', (async (req: Request, res: Response) => {
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

