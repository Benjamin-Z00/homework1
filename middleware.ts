import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Detect locale from Accept-Language header
  localeDetection: true
});
 
export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /static (inside /public)
  // - /_vercel (Vercel internals)
  // - all files inside /public (e.g. /favicon.ico)
  matcher: ['/((?!api|_next|_vercel|static|.*\\..*).*)']
};
