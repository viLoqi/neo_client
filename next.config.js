/** @type {import('next').NextConfig} */
const nextConfig = {
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
    
}

module.exports = nextConfig
