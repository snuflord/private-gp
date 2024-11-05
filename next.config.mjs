/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [320, 420, 768, 1024, 1200],
        imageSizes: [16, 32, 48, 64, 96],
        domains: ['res.cloudinary.com'],
        formats: ['image/avif', 'image/webp',],
        path: '/_next/image',
        loader: 'default',
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/image/upload/**',
        },
        ],
    },
};

export default nextConfig;