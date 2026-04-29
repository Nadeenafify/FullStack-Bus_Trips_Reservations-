const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   eslint: {
    ignoreDuringBuilds: false, 
  },

  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "images.unsplash.com"
    ]
  }
};

module.exports = withNextIntl(nextConfig);