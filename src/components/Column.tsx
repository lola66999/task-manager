import { Task } from "../types/tasks";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  tasks: Task[];
}

export default function Column({ title, tasks }: Props) {
  return (
    <div className="w-full rounded-xl bg-gray-100 p-4">
      <h2 className="mb-3 font-semibold text-gray-700">
        {title} <span className="text-gray-400">({tasks.length})</span>
      </h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}