/** @type {import('next').NextConfig} */
const nextConfig = {
    standalone: true,
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
