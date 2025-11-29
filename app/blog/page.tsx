import { supabase } from "@/lib/supabase";

export default async function BlogList() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, slug, thumbnail, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl  mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10">Blogs</h1>

      <div className="grid sm:grid-cols-2 gap-8">
        {blogs?.map((blog) => (
          <a
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="p-5 rounded-xl border-2 border-gray-700 transition border-hover hover:scale-[1.02]"
          >
            {blog.thumbnail && (
              <img
                src={blog.thumbnail}
                className="rounded-lg mb-4"
                alt={blog.title}
              />
            )}

            <h2 className="text-xl font-bold">{blog.title}</h2>

            <p className="text-gray-500 mt-2">
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
