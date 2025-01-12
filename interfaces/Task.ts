export interface Task {
    _id?: string;
    title: string;
    priority: "P0" | "P1" | "P2" | "P3" | "P4";
    type: "Planned" | "ADHOC" | "On-going";
    status: "Not Started" | "In Progress" | "Completed";
    assigned_sp: number;
    actual_sp: number;
    jira_ticket: string;
    due_date: Date;
    comment: string;
  }