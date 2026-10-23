import { Task } from "../types/tasks";
const priorityColor = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-gray-800">{task.title}</p>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500"
          aria-label="O'chirish"
        >
          ✕
        </button>
      </div>
      <span
        className={`mt-2 inline-block rounded px-2 py-0.5 text-xs ${priorityColor[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>
  );
}