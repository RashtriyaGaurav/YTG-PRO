import { supabase } from "@/lib/supabase";

interface BlogParams {
  params: { slug: string };
}

export default async function BlogPost({ params }: BlogParams) {
  const slug = params.slug;

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    return (
      <div className="text-center text-2xl py-20">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="rounded-xl mb-8"
        />
      )}

      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      <p className="text-gray-500 mb-10">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      <div className="text-lg leading-7 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
}
