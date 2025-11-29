"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  async function handleSubmit() {
    if (!title || !slug || !content) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    let imageUrl = null;

    // Upload image if selected
    if (imageFile) {
      const imageName = `${Date.now()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(imageName, imageFile);

      if (error) {
        alert("Image upload failed: " + error.message);
        setLoading(false);
        return;
      }

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${imageName}`;
    }

    // Insert into database
    const { error: insertError } = await supabase.from("blogs").insert({
      title,
      slug,
      content,
      thumbnail: imageUrl,
      seo_title: seoTitle,
      seo_description: seoDesc,
      published: true,
    });

    if (insertError) {
      alert("Failed to save blog: " + insertError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/admin/blogs");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Blog</h1>

      <div className="space-y-6 max-w-2xl">

        <div>
          <label className="font-semibold">Title</label>
          <input
            className="w-full p-3 border rounded"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(generateSlug(e.target.value));
            }}
          />
        </div>

        <div>
          <label className="font-semibold">Slug</label>
          <input
            className="w-full p-3 border rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Content</label>
          <textarea
            className="w-full p-3 border rounded h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold mb-1 block">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => setImageFile(e.target.files[0])}
          />
        </div>

        <div>
          <label className="font-semibold">SEO Title</label>
          <input
            className="w-full p-3 border rounded"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">SEO Description</label>
          <textarea
            className="w-full p-3 border rounded"
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </div>
  );
}
