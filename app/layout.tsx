import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "YouTube Thumbnail Downloader",
  description: "Download YouTube thumbnails instantly in HD quality.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter bg-white text-black">
        {children}
      </body>
    </html>
  );
}
