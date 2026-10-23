"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Task, Priority, Status, PriorityFilter } from "../types/tasks"
import { initialTasks } from "../data/tasks"
import Column from "./Column";
import TaskForm from "./TaskForm";
import Filters from "./Filters";

const STORAGE_KEY = "tasks";

const columns: { id: Status; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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

  const editTask = (id: string, title: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id as Status;
    setTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t))
    );
  };

  // Ko'rinadigan vazifalar: asl `tasks` o'zgarmaydi, faqat filtrlanadi
  const visibleTasks = tasks.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  if (!loaded) {
    return <p className="text-gray-500">Yuklanmoqda...</p>;
  }

  return (
    <>
      <TaskForm onAdd={addTask} />
      <Filters
        search={search}
        onSearchChange={setSearch}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={visibleTasks.filter((t) => t.status === col.id)}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}