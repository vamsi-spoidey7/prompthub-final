/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pixner.net**",
            },
        ],
        domains: ["res.cloudinary.com"],
    },
};

module.exports = nextConfig;
