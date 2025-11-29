import { supabase } from "@/lib/supabase";

interface MaterialParams {
  params: { slug: string };
}

export default async function MaterialPage({ params }: MaterialParams) {
  const slug = params.slug;


  const { data: material } = await supabase
    .from("materials")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!material) {
    return (
      <div className="text-center text-2xl py-20">
        Material not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      {material.image_url && (
        <img
          src={material.image_url}
          className="rounded-xl mb-8"
          alt={material.title}
        />
      )}

      <h1 className="text-4xl font-bold mb-6">{material.title}</h1>

      <div className="text-gray-600 mb-10 whitespace-pre-line">
        {material.description}
      </div>

      <a
        href={material.gdrive_link}
        target="_blank"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900"
      >
        Download Material
      </a>
    </div>
  );
}
