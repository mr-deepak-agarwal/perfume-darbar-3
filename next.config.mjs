// When API_URL is set (e.g. http://localhost:8000), /api/* is proxied to the FastAPI backend.
const api = process.env.API_URL;
export default {
  async rewrites() {
    return api ? [{ source: "/api/:path*", destination: `${api.replace(/\/$/, "")}/api/:path*` }] : [];
  },
};
