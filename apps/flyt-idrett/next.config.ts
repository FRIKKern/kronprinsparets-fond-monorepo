import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // Redirect håndboka (with Norwegian å) to handboka (ASCII)
      // Handle both decoded and URL-encoded versions
      {
        source: "/håndboka",
        destination: "/handboka",
        permanent: true,
      },
      {
        source: "/h%C3%A5ndboka",
        destination: "/handboka",
        permanent: true,
      },
      {
        source: "/håndboka/:path*",
        destination: "/handboka/:path*",
        permanent: true,
      },
      {
        source: "/h%C3%A5ndboka/:path*",
        destination: "/handboka/:path*",
        permanent: true,
      },
      // Redirect trenerhånda (with Norwegian å) to trenerhanda (ASCII)
      // Handle both decoded and URL-encoded versions
      {
        source: "/trenerhånda",
        destination: "/trenerhanda",
        permanent: true,
      },
      {
        source: "/trenerh%C3%A5nda",
        destination: "/trenerhanda",
        permanent: true,
      },
      {
        source: "/trenerhånda/:path*",
        destination: "/trenerhanda/:path*",
        permanent: true,
      },
      {
        source: "/trenerh%C3%A5nda/:path*",
        destination: "/trenerhanda/:path*",
        permanent: true,
      },
      // Redirect old lekebank URL to new leker URL
      {
        source: "/handboka/lekebank",
        destination: "/handboka/leker",
        permanent: true,
      },
      {
        source: "/handboka/lekebank/:path*",
        destination: "/handboka/leker/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

