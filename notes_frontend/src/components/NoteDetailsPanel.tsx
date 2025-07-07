"use client";

import { useEffect, useState } from "react";
import { fetchNote, deleteNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Note } from "@/lib/types";

export default function NoteDetailsPanel({ noteId }: { noteId: string }) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchNote(noteId)
      .then(setNote)
      .finally(() => setLoading(false));
  }, [noteId]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    await deleteNote(noteId);
    router.push("/");
  };

  if (loading) {
    return <div className="text-[#4B5563] p-8">Loading...</div>;
  }
  if (!note) {
    return (
      <div className="text-[#4B5563] p-8">
        Note not found <Link href="/">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-2 text-[#1E90FF]">{note.title || "(Untitled Note)"}</h2>
      <div className="text-sm mb-4 text-[#4B5563]">
        Last updated: {new Date(note.updated_at || note.created_at).toLocaleString()}
      </div>
      <p className="whitespace-pre-wrap mb-6">{note.content}</p>
      <div className="flex gap-2">
        <Link href={`/edit/${noteId}`}>
          <button className="bg-[#F59E42] text-white px-4 py-2 rounded hover:bg-[#f1880a] transition">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Delete
        </button>
        <Link href="/">
          <button className="border border-[#1E90FF] text-[#1E90FF] px-4 py-2 rounded hover:bg-[#1E90FF] hover:text-white transition">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
