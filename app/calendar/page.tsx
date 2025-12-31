"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import HourBlock from "@/components/HourBlock";

interface Entry {
  hour: number;
  content: string;
}

export default function CalendarPage() {
  const [entries, setEntries] = useState<Record<number, string>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const loadEntries = async () => {
      const { data } = await supabase
        .from("entries")
        .select("hour, content")
        .eq("user_id", userId)
        .eq("date", date);
      if (data) {
        const map: Record<number, string> = {};
        data.forEach((d) => (map[d.hour] = d.content));
        setEntries(map);
      }
    };
    loadEntries();
  }, [userId, date]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="sticky top-0 bg-white shadow-md p-3 rounded-md flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">🗓️ Daily Journal</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        />
      </div>

      <div className="grid gap-2">
        {Array.from({ length: 24 }).map((_, hour) => (
          <HourBlock
            key={hour}
            userId={userId || ""}
            date={date}
            hour={hour}
            initialContent={entries[hour] || ""}
          />
        ))}
      </div>
    </div>
  );
}
