import Link from 'next/link';
export default function PaymentCancel() {
  return (
    <div className="container-max section text-center max-w-xl">
      <div className="bg-white border rounded-2xl p-10">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold">Payment Cancelled</h1>
        <p className="mt-3 text-slate-600">Your Stripe checkout was cancelled. No charge was made.</p>
        <Link href="/pricing" className="btn btn-primary mt-6">Back to Pricing</Link>
      </div>
    </div>
  );
}
