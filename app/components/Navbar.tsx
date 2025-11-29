export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 py-5 px-10 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-2xl font-bold">
        <span>▶️</span>
        <span>YT Thumbnail</span>
      </div>

      <div className="flex items-center space-x-8 text-gray-700 text-lg">
        <a href="/" className="hover:text-black">Home</a>
        <a href="/blog" className="hover:text-black">Blog</a>
      </div>
    </nav>
  );
}
