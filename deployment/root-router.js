/* Hosting-only routing: the portable website files remain in site/.
 * New homepage files come from Pages; all other URLs retain the original DNS origin.
 * No databases, secrets, tracking, uploads or payment handling.
 */
const PAGES_ORIGIN = 'https://ethinx-construction-landing.pages.dev';
const HOMEPAGE_FILES = new Set([
  '/', '/index.html', '/styles.css', '/app.js', '/favicon.svg', '/favicon.png',
  '/assets/social-preview.png', '/assets/apple-touch-icon.png',
  '/robots.txt', '/sitemap.xml'
]);

async function originalOrigin(request) {
  try {
    return await fetch(request);
  } catch (_) {
    return new Response('Service temporarily unavailable.', { status: 502 });
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const usePages = url.hostname === 'ethinx.solutions'
      && (request.method === 'GET' || request.method === 'HEAD')
      && HOMEPAGE_FILES.has(url.pathname);

    if (!usePages) return originalOrigin(request);
    if (url.protocol !== 'https:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    const upstream = new URL(url.pathname + url.search, PAGES_ORIGIN);
    const headers = new Headers();
    for (const name of ['accept', 'accept-language', 'cache-control',
      'if-none-match', 'if-modified-since', 'range', 'user-agent']) {
      if (request.headers.has(name)) headers.set(name, request.headers.get(name));
    }
    try {
      const response = await fetch(new Request(upstream, {
        method: request.method,
        headers,
        redirect: 'manual'
      }));
      if (response.status >= 500) return originalOrigin(request);
      return response;
    } catch (_) {
      return originalOrigin(request);
    }
  }
};
