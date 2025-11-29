import { supabase } from "@/lib/supabase";

export default async function MaterialsList() {
  const { data: materials } = await supabase
    .from("materials")
    .select("title, slug, image_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10">Materials</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {materials?.map((m) => (
          <a
            key={m.slug}
            href={`/materials/${m.slug}`}
            className="p-5 rounded-xl border-2 border-gray-700 transition border-hover hover:scale-[1.02]"
          >
            {m.image_url && (
              <img
                src={m.image_url}
                alt={m.title}
                className="rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-bold">{m.title}</h2>

            <p className="text-gray-500 mt-2">
              {new Date(m.created_at).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
