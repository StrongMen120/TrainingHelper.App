const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false, //process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [{ source: '/dynamic/config.js', destination: '/api/config' }];
  },
});
