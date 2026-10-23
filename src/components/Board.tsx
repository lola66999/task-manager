"use client";

import { useEffect, useState } from "react";
import { Task, Priority } from "../types/tasks";
import { initialTasks } from "../data/tasks";
import Column from "./Column";
import TaskForm from "./TaskForm";

const STORAGE_KEY = "tasks";

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setTasks(saved ? JSON.parse(saved) : initialTasks);
    } catch {
      setTasks(initialTasks);
    }
    setLoaded(true);
  }, []);


  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

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

  if (!loaded) {
    return <p className="text-gray-500">Yuklanmoqda...</p>;
  }

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