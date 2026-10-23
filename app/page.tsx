import Column from "@/src/components/Column";
import { initialTasks } from "@/src/data/tasks";

export default function Home() {
  const todo = initialTasks.filter((t) => t.status === "todo");
  const inProgress = initialTasks.filter((t) => t.status === "in-progress");
  const done = initialTasks.filter((t) => t.status === "done");

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Task Manager</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Column title="To Do" tasks={todo} />
        <Column title="In Progress" tasks={inProgress} />
        <Column title="Done" tasks={done} />
      </div>
    </main>
  );
}