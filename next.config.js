/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // EmailJS keys for the contact form (public by design). Set them in .env.local / Vercel → Environment Variables.
  env: {
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    SERVICE_ID: process.env.SERVICE_ID,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
  },
  async redirects() {
    return [{ source: "/work", destination: "/#work", permanent: false }];
  },
};

module.exports = nextConfig;
