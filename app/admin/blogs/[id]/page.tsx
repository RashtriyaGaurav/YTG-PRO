"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();


  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content || "");
        setThumbnail(data.thumbnail || "");
        setSeoTitle(data.seo_title || "");
        setSeoDesc(data.seo_description || "");
      }

      setLoading(false);
    }

    loadBlog();
  }, [id]);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  async function handleUpdate() {
    setLoading(true);

    let newImageUrl = thumbnail;

    // If user selected a new image
    if (imageFile) {
      const imageName = `${Date.now()}-${imageFile.name}`;
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(imageName, imageFile);

      if (!error) {
        newImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${imageName}`;
      }
    }

    // Update database
    const { error: updateError } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        content,
        thumbnail: newImageUrl,
        seo_title: seoTitle,
        seo_description: seoDesc,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      alert("Failed to update blog: " + updateError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/blogs");
  }

  if (loading) {
    return <div className="text-lg">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

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

        {/* Show existing thumbnail */}
        {thumbnail && (
          <div>
            <label className="font-semibold">Current Thumbnail</label>
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-40 rounded mt-2 border"
            />
          </div>
        )}

        <div>
          <label className="font-semibold mb-1 block">
            Upload New Thumbnail (optional)
          </label>
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
          onClick={handleUpdate}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
