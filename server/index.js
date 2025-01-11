import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from 'openai';
import chatRouter from "./routers/openai.js";

dotenv.config();

import tasksRouter from "./routers/tasks.js";
import connectDB from "./db/mongoose.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/chat', chatRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
