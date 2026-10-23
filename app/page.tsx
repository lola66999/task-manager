import Board from "@/src/components/Board";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Task Manager</h1>
      <Board />
    </main>
  );
}