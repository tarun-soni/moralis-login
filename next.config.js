/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.dicebear.com",
      "ipfs.moralis.io",
      "ipfs.io",
      "via.placeholder.com",
      "https://via.placeholder.com/150",
    ],
  },
};

module.exports = nextConfig;
