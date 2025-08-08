/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ahfmrp5yzoe65qle.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

export default nextConfig;
