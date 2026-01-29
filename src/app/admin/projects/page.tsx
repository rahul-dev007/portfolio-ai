"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/* ================= TYPES ================= */

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  videoUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  isFeatured: boolean;
};

/* ================= HELPERS ================= */

function makeSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ================= PROGRESS BAR ================= */

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full transition-all duration-300"
        style={{
          width: `${value}%`,
          background:
            "linear-gradient(90deg,#22c55e,#38bdf8,#8b5cf6,#ec4899)",
        }}
      />
    </div>
  );
}

/* ================= UPLOAD HELPERS ================= */

// IMAGE
async function uploadImage(
  file: File,
  onProgress: (p: number) => void
): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload/image");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText).url);
      } else reject("Image upload failed");
    };

    xhr.onerror = () => reject("Network error");
    xhr.send(fd);
  });
}

// VIDEO
async function uploadVideo(
  file: File,
  onProgress: (p: number) => void
): Promise<string> {
  const sigRes = await fetch("/api/admin/cloudinary-signature", {
    method: "POST",
  });
  const sig = await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", sig.apiKey);
  fd.append("timestamp", sig.timestamp);
  fd.append("signature", sig.signature);
  fd.append("folder", "projects/videos");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(res.secure_url);
      } else reject("Video upload failed");
    };

    xhr.onerror = () => reject("Network error");
    xhr.send(fd);
  });
}

/* ================= PAGE ================= */

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  /* CREATE */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [techStackText, setTechStackText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [imageProgress, setImageProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  /* EDIT */
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTechStackText, setEditTechStackText] = useState("");
  const [editLiveUrl, setEditLiveUrl] = useState("");
  const [editGithubUrl, setEditGithubUrl] = useState("");

  const previewSlug = useMemo(() => {
    if (slug.trim()) return makeSlug(slug);
    if (title.trim()) return makeSlug(title);
    return "";
  }, [slug, title]);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch("/api/projects");
    setProjects(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function createProject() {
    if (!previewSlug || description.length < 10) {
      alert("Invalid data");
      return;
    }

    setSaving(true);

    const techStack = techStackText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: previewSlug,
        description,
        techStack,
        imageUrl,
        videoUrl,
        liveUrl,
        githubUrl,
        isFeatured,
      }),
    });

    setSaving(false);
    setTitle("");
    setSlug("");
    setDescription("");
    setTechStackText("");
    setImageUrl("");
    setVideoUrl("");
    setLiveUrl("");
    setGithubUrl("");
    setIsFeatured(false);
    setImageProgress(0);
    setVideoProgress(0);

    fetchProjects();
  }

  function openEdit(p: Project) {
    setSelected(p);
    setEditTitle(p.title);
    setEditDescription(p.description);
    setEditTechStackText(p.techStack.join(", "));
    setEditLiveUrl(p.liveUrl || "");
    setEditGithubUrl(p.githubUrl || "");
    setEditOpen(true);
  }

  async function updateProject() {
    if (!selected) return;

    const techStack = editTechStackText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await fetch(`/api/projects/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        techStack,
        liveUrl: editLiveUrl,
        githubUrl: editGithubUrl,
      }),
    });

    setEditOpen(false);
    fetchProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
        🚀 Projects Manager
      </h1>

      {/* CREATE */}
      <Card className="rounded-2xl border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Add New Project</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-4">
            <Input className="text-white" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea className="text-white" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input className="text-white" placeholder="Tech stack (comma)" value={techStackText} onChange={(e) => setTechStackText(e.target.value)} />
            <Input className="text-white" placeholder="Live URL" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
            <Input className="text-white" placeholder="GitHub URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Project Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setImageProgress(1);
                  const url = await uploadImage(f, setImageProgress);
                  setImageUrl(url);
                }}
              />
              {imageProgress > 0 && (
                <>
                  <ProgressBar value={imageProgress} />
                  <p className="text-xs text-white/60 text-right">
                    Uploading image… {imageProgress}%
                  </p>
                </>
              )}
              {imageUrl && (
                <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                  <Image src={imageUrl} alt="preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div>
              <Label className="text-white/80">Project Video</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setVideoProgress(1);
                  const url = await uploadVideo(f, setVideoProgress);
                  setVideoUrl(url);
                }}
              />
              {videoProgress > 0 && (
                <>
                  <ProgressBar value={videoProgress} />
                  <p className="text-xs text-white/60 text-right">
                    Uploading video… {videoProgress}%
                  </p>
                </>
              )}
              {videoUrl && (
                <video src={videoUrl} controls className="w-full rounded-xl border border-white/10" />
              )}
            </div>

            <Button
              onClick={createProject}
              disabled={saving}
              className="h-12 w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white"
            >
              {saving ? "Saving..." : "Add Project"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* LIST */}
      <Card className="rounded-2xl border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">All Projects</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-white/60">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white/70">Preview</TableHead>
                  <TableHead className="text-white/70">Title</TableHead>
                  <TableHead className="text-white/70">Featured</TableHead>
                  <TableHead className="text-right text-white/70">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p.id} className="hover:bg-white/5">
                    <TableCell>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} className="h-12 w-20 rounded-md object-cover" />
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-white">{p.title}</TableCell>
                    <TableCell>
                      {p.isFeatured ? (
                        <Badge className="bg-yellow-500/20 text-yellow-300">
                          Featured
                        </Badge>
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteProject(p.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <Input value={editTechStackText} onChange={(e) => setEditTechStackText(e.target.value)} />
          <Input value={editLiveUrl} onChange={(e) => setEditLiveUrl(e.target.value)} />
          <Input value={editGithubUrl} onChange={(e) => setEditGithubUrl(e.target.value)} />

          <Button onClick={updateProject} className="w-full">
            Update Project
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
