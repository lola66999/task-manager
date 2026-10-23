"use client";

import { useState } from "react";
import { Priority } from "../types/tasks";

interface Props {
  onAdd: (title: string, priority: Priority) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // bo'sh vazifani qo'shmaymiz
    onAdd(title.trim(), priority);
    setTitle("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yangi vazifa..."
        className="min-w-[200px] flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="rounded-lg border border-gray-300 px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        Qo'shish
      </button>
    </form>
  );
}