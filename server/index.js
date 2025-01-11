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

app.use(cors({
  origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
}));
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/chat', chatRouter);
// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    // Get tasks for context
    const tasks = await Task.find({});
    
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a task management assistant. You can only answer questions about the tasks in the database. Your responses should be focused on task-related queries only."
        },
        {
          role: "user",
          content: `Here are the current tasks: ${JSON.stringify(tasks)}. Question: ${message}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});