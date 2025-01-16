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

const handleTaskOperation = async (response) => {
  try {
    if (response.trim().startsWith('{')) {
      const operationData = JSON.parse(response);
      
      if (operationData.action === 'create') {
        return {
          type: 'show_form',
          action: 'create'
        };
      }
      
      if (operationData.action === 'edit' && operationData.jira_ticket) {
        const taskToEdit = await Task.findOne({ jira_ticket: operationData.jira_ticket });
        if (!taskToEdit) {
          return `No task found with JIRA ticket: ${operationData.jira_ticket}`;
        }
        return {
          type: 'show_form',
          action: 'edit',
          data: taskToEdit
        };
      }

      if (operationData.action === 'delete' && operationData.jira_ticket) {
        const taskToDelete = await Task.findOne({ jira_ticket: operationData.jira_ticket });
        if (!taskToDelete) {
          return `No task found with JIRA ticket: ${operationData.jira_ticket}`;
        }
        return {
          type: 'confirm_delete',
          data: taskToDelete
        };
      }
    }
    return response;
  } catch (error) {
    console.error('Operation error:', error);
    return response;
  }
};

const formatTaskDetails = (task) => {
  return `
Title: ${task.title}
Priority: ${task.priority}
Type: ${task.type}
Status: ${task.status}
Story Points: ${task.assigned_sp} (assigned) / ${task.actual_sp} (actual)
JIRA Ticket: ${task.jira_ticket}
Due Date: ${new Date(task.due_date).toLocaleDateString()}
${task.comment ? `Comment: ${task.comment}` : ''}
`;
};

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const tasks = await Task.find({});
    const formattedTasks = formatTasksForContext(tasks);

    const prompt = `
      You are a task management assistant. When users want to:

      1. Create a task: Return JSON with "action": "create"
      2. Edit a task: Return JSON with "action": "edit" and "jira_ticket": "<ticket_id>"
      3. Delete a task: Return JSON with "action": "delete" and "jira_ticket": "<ticket_id>"
      4. For other queries: Format your response in a clear, readable way:
         - For task listings: Use numbered lists
         - Include relevant details in a structured format
         - Use markdown formatting for better readability
         - Highlight important information using bold or italics
         
      Example responses:
      For create: {"action": "create"}
      For edit: {"action": "edit", "jira_ticket": "ABC-123"}
      For delete: {"action": "delete", "jira_ticket": "ABC-123"}
      
      For task listings:
      1. **[Title]** Task Name
         - Priority: P1
         - Status: In Progress
         - Due Date: Jan 25, 2025
         - Type: On-going
         - JIRA: ABC-123

      Current tasks context: ${JSON.stringify(formattedTasks)}

      User question: ${message}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Process any CRUD operations in the response
    const finalResponse = await handleTaskOperation(response);
    
    res.json({ 
      response: finalResponse,
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
