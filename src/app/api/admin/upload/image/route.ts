import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";
import { authOptions } from "@/lib/auth";
import { UploadApiResponse } from "cloudinary";


export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

 const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    {
      folder: "projects/images",
      resource_type: "image",
    },
    (error, result) => {
      if (error) return reject(error);
      if (!result) return reject(new Error("No upload result"));
      resolve(result);
    }
  ).end(buffer);
});


  return NextResponse.json({
    success: true,
    url: uploadResult.secure_url,
  });
}
