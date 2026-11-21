export default function Stats({ items }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {items.map(i => (
        <div key={i.label} className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-slate-500">{i.label}</div>
          <div className="text-3xl font-extrabold text-teal-700 mt-1">{i.value}</div>
        </div>
      ))}
    </div>
  );
}
