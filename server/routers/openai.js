import express from "express";
import OpenAI from 'openai';
import Task from "../models/task.js"; // Adjust the path as necessary
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
router.post("/", async (req, res) => {
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

export default router;
