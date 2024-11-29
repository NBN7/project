/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/transactions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
