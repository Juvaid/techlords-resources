// Keep shared resource URLs on HTTPS; all content remains in the static assets binding.
const CANONICAL_HOST = 'techlord.wordlordmedia.com';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.href, 308);
    }
    const res = await env.ASSETS.fetch(request);
    // The assets server adds a page's trailing slash with a temporary 307; search engines should treat it as permanent.
    if (res.status === 307 && res.headers.get('location')) {
      return new Response(null, {status: 301, headers: {location: res.headers.get('location')}});
    }
    // workers.dev and preview hosts serve the same pages: keep them out of search so only the real domain is indexed.
    if (url.hostname !== CANONICAL_HOST) {
      const out = new Response(res.body, res);
      out.headers.set('X-Robots-Tag', 'noindex');
      return out;
    }
    return res;
  },
};
