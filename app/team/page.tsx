"use client";

import { useState } from "react";
import { Member } from "@/src/types/tasks";
import { initialMembers, memberColors } from "@/src/data/members";
import { useLocalStorage } from "@/src/hooks/useLocalStorige";
import Avatar from "@/src/components/Avatar";

export default function TeamPage() {
  const [members, setMembers, loaded] = useLocalStorage<Member[]>(
    "members",
    initialMembers
  );
  const [name, setName] = useState("");

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setMembers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: trimmed,
        color: memberColors[prev.length % memberColors.length],
      },
    ]);
    setName("");
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  if (!loaded) {
    return <p className="p-6 text-gray-500">Yuklanmoqda...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Jamoa
      </h1>

      <form onSubmit={addMember} className="mb-6 flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Yangi a'zo ismi..."
          className="min-w-[200px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Qo'shish
        </button>
      </form>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <Avatar name={m.name} color={m.color} />
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {m.name}
              </span>
            </div>
            <button
              onClick={() => deleteMember(m.id)}
              className="text-gray-400 hover:text-red-500"
              aria-label="O'chirish"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {members.length === 0 && (
        <p className="py-10 text-center text-gray-400">
          Hali a&apos;zo yo&apos;q. Birinchisini qo&apos;shing!
        </p>
      )}
    </main>
  );
}