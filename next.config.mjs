/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'], // Add the domain of the image
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/all-product',
        permanent: true, // Permanent redirect (status code 308)
      },
    ];
  },
};

export default nextConfig;
