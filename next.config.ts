/* global require */

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_API_GSO: process.env.NEXT_PUBLIC_API_GSO,
    NEXT_PUBLIC_NEXT_URL: process.env.NEXT_PUBLIC_NEXT_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  images: {
    formats: ["image/avif", "image/webp"], // Optimize images with Next.js
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.designi.com.br",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "dpobjetivo.com.br",
      },
      {
        protocol: "https",
        hostname: "apexpublicschool.com",
      },
      {
        protocol: "http",
        hostname: "wsgso.000webhostapp.com",
      },
      {
        protocol: "http",
        hostname: "wsgso.localhost",
      },

      {
        protocol: "http",
        hostname: "192.168.100.57:7777",
      },
      {
        protocol: "http",
        hostname: "localhost:7777",
      },
      {
        protocol: "http",
        hostname: "192.168.100.57",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "179.253.45.156:7777",
      },
      {
        protocol: "http",
        hostname: "179.253.45.156",
      },
    ],
  },

  reactStrictMode: true,
};

module.exports = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    customWorkerSrc: "service-worker",
    // disable: false,
    disable: process.env.NODE_ENV === "development",
    cacheOnFrontEndNavigation: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,

    swcMinify: true,
    workboxOptions: {
      disableDevLogs: true,
    },
  });
  return withPWA(nextConfig);
};
