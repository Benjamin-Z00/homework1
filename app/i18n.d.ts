declare module 'next-intl/middleware' {
    export default function createMiddleware(config: {
        locales: string[];
        defaultLocale: string;
        localeDetection?: boolean;
    }): any;
}

declare module 'next-intl' {
    export function useTranslations(namespace?: string): (key: string) => string;
}

declare module 'next-intl/client' {
    export function useTranslations(namespace?: string): (key: string) => string;
}
