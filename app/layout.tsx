import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "YT Thumbnail Downloader",
  description: "Download YouTube thumbnails instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter bg-white text-black">
        {children}
      </body>
    </html>
  );
}
