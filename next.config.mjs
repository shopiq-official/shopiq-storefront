/** @type {import('next').NextConfig} */
import runtimeCaching from "next-pwa/cache.js";
import pwa from "next-pwa";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "business-one-1.s3.ap-south-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dbxtdwj4gd9ez.cloudfront.net",
        port: "",
      },

    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

const withPWA = pwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

// export default withPWA({ ...nextConfig, reactStrictMode: false });
export default { ...nextConfig, reactStrictMode: false };
