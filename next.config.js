/** @type {import('next').NextConfig} */
module.exports = {
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/waitlist_form',
                destination: 'https://forms.gle/qwcdQ7rjyKEQNi3G9',
                permanent: false,
                basePath: false
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ]
    }
}