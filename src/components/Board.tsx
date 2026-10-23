"use client";

import { useState } from "react";
import { Task, Priority } from "../types/tasks";
import { initialTasks } from "../data/tasks";
import Column from "./Column";
import TaskForm from "./TaskForm";

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
      priority,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <TaskForm onAdd={addTask} />
      <div className="grid gap-4 md:grid-cols-3">
        <Column
          title="To Do"
          tasks={tasks.filter((t) => t.status === "todo")}
          onDelete={deleteTask}
        />
        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "in-progress")}
          onDelete={deleteTask}
        />
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === "done")}
          onDelete={deleteTask}
        />
      </div>
    </>
  );
}