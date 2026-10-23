"use client";

import { PriorityFilter } from "../types/tasks";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  priority: PriorityFilter;
  onPriorityChange: (value: PriorityFilter) => void;
}

export default function Filters({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="🔍 Vazifa qidirish..."
        className="min-w-[200px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
      />
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as PriorityFilter)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2"
      >
        <option value="all">Barcha priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}