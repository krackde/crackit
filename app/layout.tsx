import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "crackit",
  description: "crackit 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geist.className} bg-zinc-950 text-zinc-100 min-h-screen`}>
        <header className="border-b border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
            <Link href="/crackit" className="text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
              crackit
            </Link>
            <nav className="flex gap-6 text-sm text-zinc-400">
              <Link href="/crackit" className="hover:text-white transition-colors">홈</Link>
              <Link href="/crackit/categories" className="hover:text-white transition-colors">카테고리</Link>
              <Link href="/crackit/posts" className="hover:text-white transition-colors">전체글</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-12">
          {children}
        </main>
        <footer className="border-t border-zinc-800 mt-20">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
            © 2026 crackit · Powered by Next.js & GitHub Pages
          </div>
        </footer>
      </body>
    </html>
  );
}
