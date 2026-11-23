import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container-max section text-center">
      <h1 className="text-7xl font-extrabold text-teal-700">404</h1>
      <p className="mt-4 text-xl text-slate-600">Page not found.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
