"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";

export default function AddNote({ onAdd }: { onAdd: (note: Note) => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleAddNote() {
    if (!content.trim()) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        router.push("/login");
        return;
    }

    const { data, error } = await supabase
      .from("notes")
      .insert({
        content,
        user_id: user.id,
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    onAdd(data);
    setContent("");
  }

  return (
    <div className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write a note..."
      />

      <button
        onClick={handleAddNote}
        disabled={loading}
        className="px-3 py-1 bg-black text-white rounded"
      >
        Add Note
      </button>
    </div>
  );
}
