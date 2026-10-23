"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task, Status } from "../types/tasks";
import TaskCard from "./TaskCard";

interface Props {
  id: Status;
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function Column({ id, title, tasks, onDelete, onEdit }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] w-full rounded-xl p-4 transition-colors ${
        isOver ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      <h2 className="mb-3 font-semibold text-gray-700">
        {title} <span className="text-gray-400">({tasks.length})</span>
      </h2>
      <div className="flex flex-col gap-3">
        {tasks.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-400">
            Vazifa yo&apos;q
          </p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}