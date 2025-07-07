"use client";
import { useParams } from "next/navigation";
import NoteDetailsPanel from "@/components/NoteDetailsPanel";
import Sidebar from "@/components/Sidebar";

export default function NoteViewPage() {
  const { id } = useParams<{ id: string }>();
  if (!id || typeof id !== "string") return <Sidebar>Note not found</Sidebar>;
  return (
    <Sidebar>
      <NoteDetailsPanel noteId={id} />
    </Sidebar>
  );
}
