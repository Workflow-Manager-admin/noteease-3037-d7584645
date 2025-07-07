"use client";
import { useParams } from "next/navigation";
import NoteFormPanel from "@/components/NoteFormPanel";
import Sidebar from "@/components/Sidebar";

export default function EditNotePage() {
  const { id } = useParams<{ id: string }>();
  if (!id || typeof id !== "string") return <Sidebar>Note not found</Sidebar>;
  return (
    <Sidebar>
      <NoteFormPanel noteId={id} isEdit />
    </Sidebar>
  );
}
