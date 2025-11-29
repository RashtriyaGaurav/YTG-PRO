"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewMaterial() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [gdrive, setGdrive] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function generateSlug(text: string) {
    return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }

  async function handleSubmit() {
    setLoading(true);

    let image_url = null;

    if (imageFile) {
      const fileName = `material-${Date.now()}-${imageFile.name}`;

      const { error: uploadErr } = await supabase.storage
        .from("material-images")
        .upload(fileName, imageFile);

      if (uploadErr) {
        alert("Image upload failed: " + uploadErr.message);
        setLoading(false);
        return;
      }

      image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/material-images/${fileName}`;
    }

    const { error } = await supabase.from("materials").insert([
      {
        title,
        slug,
        description,
        gdrive_link: gdrive,
        image_url,
        seo_title: seoTitle,
        seo_description: seoDesc,
      },
    ]);

    if (error) {
      alert("Insert failed: " + error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/materials");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Add New Material</h1>

      <div className="space-y-6">
        <input
          className="w-full p-3 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="Google Drive Link"
          value={gdrive}
          onChange={(e) => setGdrive(e.target.value)}
        />

        <label className="block font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="SEO Title"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded"
          placeholder="SEO Description"
          value={seoDesc}
          onChange={(e) => setSeoDesc(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-lg mt-4"
        >
          {loading ? "Saving..." : "Save Material"}
        </button>
      </div>
    </div>
  );
}
