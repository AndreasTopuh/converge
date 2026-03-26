import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/AppShell';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CONVERGE - Knowledge Capture Platform',
  description: 'Turn conversations into structured, queryable knowledge using AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
