import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ["P0", "P1", "P2", "P3", "P4"],
    },
    type: {
        type: String,
        required: true,
        enum: ["Planned", "ADHOC", "On-going"],
    },
    status: {
        type: String,
        required: true,
        enum: ["Not Started", "In Progress", "Completed"],
    },
    assigned_sp: {
        type: Number,
        required: true,
        min: 1,
    },
    actual_sp: {
        type: Number,
        required: true,
        min: 1,
    },
    jira_ticket: {
        type: String,
        required: true,
        trim: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    comment: {
        type: String,
        default: "",
        trim: true,
    }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;