// file: frontend/src/app/layout.js
'use client';

import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="id">
      <body className={montserrat.className}>
        {/* Tampilkan Navbar hanya jika bukan halaman admin */}
        {!isAdminPage && <Navbar />}
        
        {/* Main wrapper - styling berbeda untuk admin dan public */}
        <main className={isAdminPage ? '' : ''}>
          {children}
        </main>
        
        {/* Tampilkan Footer hanya jika bukan halaman admin */}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}