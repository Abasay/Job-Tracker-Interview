import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Job Tracker Interview Application',
  description: 'This is a job tracker application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
