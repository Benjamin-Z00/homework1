import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'zh';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

export default async function loadMessages(locale: string) {
  try {
    return (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    return {};
  }
}
