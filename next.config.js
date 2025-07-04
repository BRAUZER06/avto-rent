/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rentavtokavkaz.ru', 'www.rentavtokavkaz.ru', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rentavtokavkaz.ru',
      },
      {
        protocol: 'https',
        hostname: 'www.rentavtokavkaz.ru',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
