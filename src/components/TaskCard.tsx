"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../types/tasks";
  
const priorityColor = {
  low: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, disabled: isEditing });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const save = () => {
    const title = draft.trim();
    if (title && title !== task.title) {
      onEdit(task.id, title);
    } else {
      setDraft(task.title);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700 ${
        isEditing ? "" : "cursor-grab"
      } ${isDragging ? "relative z-50 opacity-80 shadow-lg" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        {isEditing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            className="w-full rounded border border-blue-400 px-2 py-1 text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-100"
          />
        ) : (
          <p className="font-medium text-gray-800 dark:text-gray-100">
            {task.title}
          </p>
        )}

        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-500"
              aria-label="Tahrirlash"
            >
              ✎
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500"
              aria-label="O'chirish"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      <span
        className={`mt-2 inline-block rounded px-2 py-0.5 text-xs ${priorityColor[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>
  );
}