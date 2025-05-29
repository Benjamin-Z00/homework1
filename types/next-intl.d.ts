declare module 'next-intl/client' {
  export function useLocale(): string;
  export function useRouter(): {
    push: (href: string, options?: { locale?: string }) => void;
    replace: (href: string, options?: { locale?: string }) => void;
  };
  export function usePathname(): string;
}
