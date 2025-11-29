export default function TemplatesManager() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 ">Templates</h1>
      <a
        href="/admin/templates/new"
        className="px-5 py-3 bg-black text-white rounded-lg"
      >
        ➕ Add New Template
      </a>
    </div>
  );
}
