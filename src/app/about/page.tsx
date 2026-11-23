export const metadata = { title: 'How It Works | MentorLagbe' };
export default function AboutPage() {
  const steps = [
    ['Create Your Account', 'Register as a Student or Tutor. Students browse and apply; tutors post tuition batches.'],
    ['Discover or Post Tuitions', 'Search and filter approved listings, or publish your batch with schedule and fee details.'],
    ['Apply and Manage', 'Students submit applications. Tutors review applicants and accept the right learners.'],
    ['Upgrade to Pro', 'Pay securely with Stripe to unlock unlimited posts and premium features.'],
  ];
  return (
    <div className="container-max section">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold">How MentorLagbe Works</h1>
        <p className="mt-4 text-slate-600">A transparent, role-based platform for tuition discovery, applications, and subscription management.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((s: any, i: number) => (
          <div key={s[0]} className="bg-white border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold">{i + 1}</div>
            <h2 className="text-xl font-semibold mt-4">{s[0]}</h2>
            <p className="text-slate-600 mt-2">{s[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
