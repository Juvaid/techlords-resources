// Keep shared resource URLs on HTTPS; all content remains in the static assets binding.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.href, 308);
    }
    return env.ASSETS.fetch(request);
  },
};
