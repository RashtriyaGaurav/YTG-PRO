"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBlogs(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>

        <a
          href="/admin/blogs/new"
          className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-900"
        >
          ➕ Add New Blog
        </a>
      </div>

      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-lg text-gray-600">No blogs found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Slug</th>
                <th className="p-4 border-b">Created</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{b.title}</td>
                  <td className="p-4 border-b text-gray-600">{b.slug}</td>
                  <td className="p-4 border-b">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b flex gap-3">
                    <a
                      href={`/admin/blogs/${b.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </a>

                    <button
                      onClick={async () => {
                        if (!confirm("Delete this blog?")) return;
                        await supabase.from("blogs").delete().eq("id", b.id);
                        loadBlogs();
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
