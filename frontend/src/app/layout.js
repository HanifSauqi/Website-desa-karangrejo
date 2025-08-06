// file: frontend/src/app/layout.js

import { Montserrat } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: "Profil Desa Karangrejo",
  description: "Website resmi profil Desa Karangrejo, menampilkan informasi, pariwisata, dan UMKM desa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={montserrat.className}>
        <Navbar />
        {/* Konten utama sekarang langsung di dalam main */}
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}