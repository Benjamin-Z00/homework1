'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    router.push(`/${nextLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="text-xs"
    >
      {locale === 'en' ? '中文' : 'English'}
    </Button>
  );
}
