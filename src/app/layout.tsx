import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '五行バランスシート',
  description: '四柱推命鑑定用の五行バランスシートをSVGで可視化・ダウンロード',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className + ' bg-gray-50 min-h-screen'}>{children}</body>
    </html>
  );
}
