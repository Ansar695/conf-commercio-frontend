/** @type {import('next').NextConfig} */

// const withNextIntl = require("next-intl/plugin")();

// module.exports = withNextIntl({});

const nextConfig = {
    // i18n: {
    //     defaultLocale: "en",
    //     locales: ["en", "it"],
    // },
    // redirects: async () => [
    //   {
    //     source: "/",
    //     destination: "/qns/1",
    //     permanent: false,
    //   },
    // ],
    images: {
        remotePatterns: [
            {
                hostname: "i.scdn.co",
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8000/api/:path*",
            },
        ];
    }
}

module.exports = nextConfig;
