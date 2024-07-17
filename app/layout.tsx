import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Recursive } from 'next/font/google'
import "./globals.css";
import Footer from "@/components/Footer";

const recursive = Recursive({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Extractores eólicos",
  description: "e-commerce de extractores eólicos en Colombia con envío a todo el país"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={recursive.className}>
        <Navbar />

        <main className='flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]'>
          <div className='flex-1 flex flex-col h-full'>
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
