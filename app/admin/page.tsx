"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) return router.push("/login");

      const { data: adminData } = await supabase
        .from("admins")
        .select("*")
        .eq("uid", user.id)
        .single();

      if (!adminData) return router.push("/login");

      setLoading(false);
    }

    checkAdmin();
  }, []);

  if (loading) {
    return <div className="text-center text-xl mt-20">Checking admin…</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-bold mb-2">Blogs</h2>
          <p className="text-gray-600">Manage all blog articles</p>
          <a href="/admin/blogs" className="text-blue-600 underline">Open</a>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-bold mb-2">Materials</h2>
          <p className="text-gray-600">Manage material resources</p>
          <a href="/admin/materials" className="text-blue-600 underline">Open</a>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-bold mb-2">Templates</h2>
          <p className="text-gray-600">Manage Canva templates</p>
          <a href="/admin/templates" className="text-blue-600 underline">Open</a>
        </div>
      </div>
    </div>
  );
}
