"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface HourBlockProps {
  userId: string;
  date: string;
  hour: number;
  initialContent?: string;
}

export default function HourBlock({ userId, date, hour, initialContent = "" }: HourBlockProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  const formattedHour = `${hour.toString().padStart(2, "0")}:00`;

  const handleChange = (value: string) => {
    setContent(value);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        setIsSaving(true);
        await supabase.from("entries")
          .upsert({ user_id: userId, date, hour, content: value });
        setIsSaving(false);
      }, 1200)
    );
  };

  return (
    <div className="flex flex-col border-b border-gray-200 p-3 hover:bg-gray-50 transition">
      <div className="text-xs text-gray-500">{formattedHour}</div>
      <textarea
        className="mt-1 w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        rows={2}
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="What did you do this hour?"
      />
      {isSaving && <div className="text-[10px] text-blue-400 mt-1">Saving...</div>}
    </div>
  );
}