import { Metadata } from "next";
import ThumbnailDownloader from "./thumbnail-downloader";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader – Free, HD & Fast",
  description:
    "Download YouTube video thumbnails in Full HD (1080p/4K). Fast, free, simple YouTube Thumbnail Downloader. No ads, no limits.",
  keywords: [
    "youtube thumbnail downloader",
    "download youtube thumbnail",
    "yt thumbnail",
    "4k thumbnail",
    "hd thumbnail",
  ],
  openGraph: {
    title: "YouTube Thumbnail Downloader – HD & 4K",
    description:
      "Fast, free YouTube Thumbnail Downloader. Save thumbnails in HD, 1080p, 4K.",
    type: "website",
    url: "https://yourdomain.com/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* HERO SECTION */}
      <div className="max-w-3xl mx-auto pt-24 px-6 text-center">
        <h1 className="text-4xl font-bold leading-tight">
          Download YouTube Thumbnails in <span className="text-blue-600">HD</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Fast, free & simple YouTube Thumbnail Downloader. Paste your video URL and save thumbnails instantly.
        </p>

        {/* Thumbnail Component */}
        <div className="mt-10">
          <ThumbnailDownloader />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 border-t py-8 bg-gray-50 text-center text-gray-600">
        <p className="text-sm">© 2025 YourWebsiteName. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href="/blog" className="hover:text-black">Blog</a>
          <a href="/materials" className="hover:text-black">Materials</a>
          <a href="/privacy-policy" className="hover:text-black">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
