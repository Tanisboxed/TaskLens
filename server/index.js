import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routers/openai.js";
import tasksRouter from "./routers/tasks.js";
import connectDB from "./db/mongoose.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/chat', chatRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
