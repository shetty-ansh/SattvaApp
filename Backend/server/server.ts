import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectToDB } from './database';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
async function startServer() {
  try {
    const dbConnected = await connectToDB();
    if (!dbConnected) {
      console.error("Failed to connect to DB. Exiting...");
      process.exit(1);
    }

    // ✅ Import routers AFTER DB is connected
    const { journalRouter } = await import('./Routes/journalRouter');
    const { moodtrackerRouter } = await import('./Routes/moodtrackerRouter');
    const { habitRouter } = await import('./Routes/habitRouter');
    const { dashRouter } = await import ('./Routes/dashboardRouter');

    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
      res.send('Chalu hai');
    });

    app.use("/habits", habitRouter);
    app.use("/journal", journalRouter);
    app.use("/moodtracker", moodtrackerRouter);
    app.use("/dashboard", dashRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
