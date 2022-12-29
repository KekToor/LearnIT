/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_MEDIA_URL, '127.0.0.1']
  }
}

module.exports = nextConfig
