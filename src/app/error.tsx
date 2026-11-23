'use client';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-max section text-center">
      <h1 className="text-4xl font-extrabold text-slate-900">Something went wrong</h1>
      <p className="mt-3 text-slate-600">{error.message || 'An unexpected error occurred.'}</p>
      <div className="mt-6 flex gap-3 justify-center">
        <button onClick={reset} className="btn btn-primary">Try Again</button>
        <a href="/" className="btn btn-ghost">Back to Home</a>
      </div>
    </div>
  );
}
