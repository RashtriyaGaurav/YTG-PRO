export default function AdminLayout({ children }: any) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 text-gray-900">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col space-y-4 text-lg">
          <a href="/admin" className="hover:text-black">Dashboard</a>
          <a href="/admin/blogs" className="hover:text-black">Blogs</a>
          <a href="/admin/materials" className="hover:text-black">Materials</a>
          <a href="/admin/templates" className="hover:text-black">Templates</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 text-gray-900">{children}</main>

    </div>
  );
}
