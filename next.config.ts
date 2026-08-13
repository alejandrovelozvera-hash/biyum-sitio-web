import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "biyum.agency" },
      { protocol: "https", hostname: "**.biyum.agency" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async redirects() {
    const wpHost = "https://wp.biyum.agency";
    return [
      {
        source: "/wp-json/:path*",
        destination: `${wpHost}/wp-json/:path*`,
        permanent: false,
      },
      {
        source: "/wp-content/:path*",
        destination: `${wpHost}/wp-content/:path*`,
        permanent: false,
      },
      {
        source: "/wp-includes/:path*",
        destination: `${wpHost}/wp-includes/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
