import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");
  const size = req.nextUrl.searchParams.get("size") || "thumbnail";

  if (!imageUrl) {
    return NextResponse.json({ error: "URL missing" }, { status: 400 });
  }

  try {
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename=${size}.jpg`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to fetch thumbnail" },
      { status: 500 }
    );
  }
}
