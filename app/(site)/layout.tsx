import "../globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PostHogProvider } from '../providers';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PostHogProvider>
      <Navbar />
      {children}
      <Footer />
    </PostHogProvider>
  );
}
