import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Task from "../models/task.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const formatTasksForContext = (tasks) => {
  return tasks.map(task => ({
    title: task.title,
    priority: task.priority,
    status: task.status,
    due_date: new Date(task.due_date).toISOString().split('T')[0],
    type: task.type,
    jira_ticket: task.jira_ticket
  }));
};

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const tasks = await Task.find({});
    const formattedTasks = formatTasksForContext(tasks);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a task management assistant with access to a database of tasks.
      Your role is to:
      1. Answer questions only about the tasks in the database
      2. Provide clear, concise responses about task status, priorities, due dates, etc.
      3. Return "I can only answer questions about tasks in the database. This query is out of scope." for non-task-related questions
      4. Format dates in a readable format (YYYY-MM-DD)
      5. When listing tasks:
         - Start each task on a new line
         - Use bullet points (•) for each task
         - Include the title, followed by relevant details in parentheses
         - For multiple tasks, number them
         - Add a blank line between different sections
      6. Format your response for readability:
         - Use line breaks between sections
         - Use bold for important numbers or counts
         - Organize information in a clear hierarchy

      Example format for listing tasks:
      Here are the matching tasks:

      1. • Task Title (Priority: P1, Status: In Progress)
      2. • Another Task (Due: 2024-02-01, Type: ADHOC)

      Current tasks context: ${JSON.stringify(formattedTasks)}

      User question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    res.json({ 
      response: response.text(),
      status: 'success'
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      message: error.message || 'An error occurred while processing your request',
      status: 'error'
    });
  }
});

export default router;
