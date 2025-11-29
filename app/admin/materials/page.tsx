"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMaterials() {
    const { data } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    setMaterials(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Materials</h1>

        <a
          href="/admin/materials/new"
          className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-900"
        >
          ➕ Add Material
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-xl shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Slug</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{m.title}</td>
                  <td className="p-4 border-b text-gray-600">{m.slug}</td>
                  <td className="p-4 border-b flex gap-3">
                    <a
                      href={`/admin/materials/${m.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={async () => {
                        if (!confirm("Delete this material?")) return;
                        await supabase.from("materials").delete().eq("id", m.id);
                        loadMaterials();
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
