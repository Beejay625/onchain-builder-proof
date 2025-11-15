/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Use webpack explicitly to avoid Turbopack conflict
  experimental: {
    turbo: undefined,
  },
};

module.exports = nextConfig;

