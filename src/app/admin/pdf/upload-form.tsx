"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UploadPdfForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/pdf/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (json.success) {
      setMessage(`✅ PDF uploaded (${json.chunks} chunks)`);
      // reload list
      window.location.reload();
    } else {
      setMessage("❌ Upload failed");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3"
    >
      <Input
        type="file"
        name="file"
        accept="application/pdf"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload PDF"}
      </Button>

      {message && (
        <span className="text-sm text-muted-foreground">
          {message}
        </span>
      )}
    </form>
  );
}
