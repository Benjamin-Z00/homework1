import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Background from '@/components/Background';
import HistoryDrawer from '@/components/HistoryDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '拒绝拖延 | Reject Procrastination',
  description: '帮助你克服拖延症的个性化AI助手',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <main className="min-h-screen relative">
            {children}
          </main>
          <Toaster />
          <HistoryDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}