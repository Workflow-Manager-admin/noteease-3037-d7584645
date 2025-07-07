"use client";

import { useState, useEffect } from "react";
import { addNote, updateNote, fetchNote } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  noteId?: string;
  isEdit?: boolean;
}

export default function NoteFormPanel({ noteId, isEdit }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(isEdit ? true : false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isEdit && noteId) {
      fetchNote(noteId)
        .then((data) => {
          setTitle(data?.title || "");
          setContent(data?.content || "");
        })
        .catch(() => setError("Note not found"))
        .finally(() => setLoading(false));
    }
  }, [noteId, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isEdit && noteId) {
        await updateNote(noteId, { title, content });
        router.push(`/note/${noteId}`);
      } else {
        const created = await addNote({ title, content });
        router.push(`/note/${created.id}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-[#1E90FF]">
        {isEdit ? "Edit Note" : "Add Note"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-[#4B5563] rounded px-3 py-2 text-lg focus:outline-none focus:border-[#1E90FF]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-label="Note title"
        />
        <textarea
          placeholder="Write your note…"
          className="border border-[#4B5563] rounded px-3 py-2 h-40 resize-none focus:outline-none focus:border-[#1E90FF]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          aria-label="Note content"
        />
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="bg-[#1E90FF] text-white px-6 py-2 rounded hover:bg-[#F59E42] transition"
            disabled={loading}
          >
            {isEdit ? "Save" : "Create"}
          </button>
          <button
            type="button"
            className="border border-[#1E90FF] text-[#1E90FF] px-6 py-2 rounded hover:bg-[#1E90FF] hover:text-white transition"
            onClick={() => (isEdit && noteId ? router.push(`/note/${noteId}`) : router.push("/"))}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
