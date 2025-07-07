"use client";

import { useEffect, useState } from "react";
import { fetchNotes, deleteNote } from "@/lib/api";
import Link from "next/link";
import { Note } from "@/lib/types";

export default function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchNotes()
      .then((n) => setNotes(n))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setActiveId(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center mb-8">
        <h2 className="text-xl font-bold flex-1 text-[#1E90FF] tracking-tight">
          Your Notes
        </h2>
        <Link href="/new">
          <button className="bg-[#F59E42] text-white px-4 py-2 rounded shadow hover:bg-[#f1880a] transition">
            + New Note
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="text-[#4B5563]">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-[#4B5563]">No notes found. Create one!</div>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`flex items-center border rounded px-3 py-2 transition ${
                activeId === note.id
                  ? "border-[#1E90FF] bg-blue-50"
                  : "border-gray-200 hover:border-[#F59E42] hover:bg-orange-50"
              }`}
              onMouseEnter={() => setActiveId(note.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <Link
                href={`/note/${note.id}`}
                className="flex-1 font-semibold text-[#1E90FF] hover:underline"
              >
                {note.title || "(Untitled Note)"}
              </Link>
              <div className="flex gap-2 ml-2">
                <Link href={`/edit/${note.id}`}>
                  <button className="text-xs bg-[#1E90FF] text-white rounded px-2 py-1 hover:bg-[#F59E42] transition">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-xs bg-red-400 text-white rounded px-2 py-1 hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
