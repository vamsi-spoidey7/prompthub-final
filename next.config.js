/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pixner.net**",
            },
        ],
    },
};

module.exports = nextConfig;
