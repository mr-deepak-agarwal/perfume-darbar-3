// When API_URL is set (e.g. http://localhost:8000), /api/* is proxied to the FastAPI backend.
const api = process.env.API_URL;
export default {
  async rewrites() {
    return api ? [{ source: "/api/:path*", destination: `${api.replace(/\/$/, "")}/api/:path*` }] : [];
  },
  // Old pages that no longer exist
  async redirects() {
    return [
      { source: "/samples", destination: "/shop", permanent: true },
      { source: "/brands", destination: "/shop", permanent: true },
      { source: "/collections/attars", destination: "/collections/oud", permanent: true },
      { source: "/collections/gift-sets", destination: "/collections", permanent: true },
      { source: "/collections/new-arrivals", destination: "/collections", permanent: true },
      { source: "/collections/bestsellers", destination: "/shop", permanent: true },
      { source: "/collections/under-5000", destination: "/collections/best-value", permanent: true },
      { source: "/collections/wedding-edit", destination: "/collections", permanent: true },
      { source: "/collections/office-picks", destination: "/collections", permanent: true },
      { source: "/collections/date-night", destination: "/collections", permanent: true },
    ];
  },
};
