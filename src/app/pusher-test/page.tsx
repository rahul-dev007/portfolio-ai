"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pushar/pusher-client";

export default function TestPage() {
  const [msg, setMsg] = useState("Waiting...");

  useEffect(() => {
    const channel = pusherClient.subscribe("test-channel");

    channel.bind("test-event", (data: any) => {
      setMsg(data.message);
    });

    return () => {
      pusherClient.unsubscribe("test-channel");
    };
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Pusher Test</h1>
      <p>{msg}</p>
    </div>
  );
}
