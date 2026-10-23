import { Task } from "../types/tasks";

const priorityColor = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <p className="font-medium text-gray-800">{task.title}</p>
      <span
        className={`mt-2 inline-block rounded px-2 py-0.5 text-xs ${priorityColor[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>
  );
}