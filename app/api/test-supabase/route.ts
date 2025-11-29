import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.auth.getSession();

  return new Response(
    JSON.stringify({ data, error }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
