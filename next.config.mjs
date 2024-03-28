/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "replicate.com",
        },
        {
          protocol: "https",
          hostname: "replicate.delivery",
        },
        {
          protocol: "https",
          hostname: "*.replicate.delivery",
        },
        {
          protocol: "https",
          hostname: "user-images.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "upcdn.io",
        },
      ],
    },
    async redirects() {
      return [
        {
          source: "/github",
          destination: "https://github.com/mcks2000/scribble-diffusion-ts",
          permanent: false,
        },
        {
          source: "/deploy",
          destination: "https://scribble.mck2000.com",
          permanent: false,
        },
      ];
    },
  };

export default nextConfig;
