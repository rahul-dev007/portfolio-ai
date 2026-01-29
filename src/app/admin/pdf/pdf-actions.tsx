"use client";

import { Button } from "@/components/ui/button";

export function ActivatePdfButton({ id }: { id: string }) {
  async function activate() {
    await fetch("/api/admin/pdf/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // refresh page to reflect status
    window.location.reload();
  }

  return (
    <Button size="sm" variant="outline" onClick={activate}>
      Make Active
    </Button>
  );
}
