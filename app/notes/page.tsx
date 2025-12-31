import { createClient } from "@/lib/supabase/server";
import NotesList from "./NotesList";

export default async function NotesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your Notes</h1>
      <NotesList initialNotes={notes} />
    </div>
  );
}
