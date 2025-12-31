"use client";

import { useState } from "react";
import { Note } from "@/types/note";
import AddNote from "./AddNote";

export default function NotesList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <>
      <AddNote onAdd={(note: Note) => setNotes((prev) => [note, ...prev])} />

      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border rounded p-3 text-sm bg-muted"
          >
            {note.content}
          </div>
        ))}
      </div>
    </>
  );
}
