"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<any[]>([]);

  function extractVideoId(link: string) {
    const regex = /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  }

  function getThumbnails() {
    const id = extractVideoId(url);
    if (!id) return alert("Invalid YouTube URL");

    const sizes = [
      "maxresdefault",
      "sddefault",
      "hqdefault",
      "mqdefault",
      "default",
    ];

    const thumbs = sizes.map((size) => ({
      size,
      url: `https://img.youtube.com/vi/${id}/${size}.jpg`,
    }));

    setThumbnails(thumbs);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

    <section className="text-center mt-24 px-6">
  <div className="flex justify-center text-5xl mb-6">▶️</div>

  <h1 className="text-6xl font-extrabold mb-6 leading-[1.15]">
    YouTube Thumbnail Downloader
  </h1>

  <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
    Download YouTube video thumbnails in all resolutions instantly.
    Get HD, HQ, and SD quality thumbnails for free.
  </p>

  <div className="max-w-2xl mx-auto flex gap-4">
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Paste YouTube URL or Video ID here..."
      className="w-full p-4 border border-gray-300 rounded-xl text-lg"
    />

    <button
      onClick={getThumbnails}
      className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-900"
    >
      Get Thumbnails
    </button>
  </div>
</section>


      {/* Thumbnails Section */}
     {/* Thumbnails Section */}
<div className="max-w-6xl mx-auto mt-20 px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {thumbnails.map((t) => (
    <div
      key={t.size}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5"
    >
      <img
        src={t.url}
        className="w-full rounded-xl mb-4 border"
        alt="Thumbnail"
      />

      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium text-lg capitalize">
          {t.size}
        </span>

       <a
  href={`/api/download?url=${encodeURIComponent(t.url)}&size=${t.size}`}
  className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-900"
>
  Download
</a>

      </div>
    </div>
  ))}
</div>


    </main>
  );
}
