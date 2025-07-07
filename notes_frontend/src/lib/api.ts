import { supabase } from "./supabaseClient";
import { Note } from "./types";

/**
 * PUBLIC_INTERFACE
 * Fetch all notes ordered by last update.
 */
export async function fetchNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * PUBLIC_INTERFACE
 * Fetch a single note by ID.
 */
export async function fetchNote(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Add a new note.
 */
export async function addNote(note: { title: string; content: string }): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .insert(note)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note.
 */
export async function updateNote(id: string, note: { title: string; content: string }): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .update(note)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by ID.
 */
export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw error;
}
