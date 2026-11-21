export default function Loading() {
  return (
    <div className="container-max section">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        <div className="skeleton h-10 w-2/3" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-5/6" />
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="skeleton h-48" /><div className="skeleton h-48" /><div className="skeleton h-48" />
        </div>
      </div>
    </div>
  );
}
