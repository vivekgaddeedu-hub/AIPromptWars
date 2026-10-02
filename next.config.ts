import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            // Reasoned Content-Security-Policy:
            // - script-src: 'self' + 'unsafe-inline' needed for Next.js hydration; 'unsafe-eval' restricted to dev only.
            //               https://maps.googleapis.com and https://*.googleapis.com strictly for Google Maps SDK.
            // - style-src:  'unsafe-inline' required for Tailwind CSS runtime utilities & Google Fonts.
            // - img-src:    Google Maps tiles (maps.gstatic.com, ggpht.com) and local SVG icons.
            // - connect-src: Google Maps tile requests and local API calls.
            // - object-src 'none' & base-uri 'self': Prevents plugin exploits and base URI hijacking.
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'production' ? '' : "'unsafe-eval'"} https://maps.googleapis.com https://*.googleapis.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://maps.gstatic.com https://*.googleapis.com https://*.ggpht.com",
              "connect-src 'self' https://maps.googleapis.com https://*.googleapis.com",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
