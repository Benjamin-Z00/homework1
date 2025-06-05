import '../globals.css';
import { Inter } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Background from '@/components/Background';
import HistoryDrawer from '@/components/HistoryDrawer';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages(locale);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="dark" style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Background />
            <main className="min-h-screen relative">
              {children}
            </main>
            <Toaster />
            <HistoryDrawer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <script defer data-domain="librogarden.com" src="https://plausible.io/js/script.hash.outbound-links.pageview-props.revenue.tagged-events.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
          }}
        />
      </body>
    </html>
  );
}
