import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'MentorLagbe | Smart Tuition & Mentorship Platform',
  description: 'Find verified tutors, post tuition batches, and manage mentorship with MentorLagbe.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-300px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
