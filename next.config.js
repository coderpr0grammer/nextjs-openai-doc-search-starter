/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    apiTimeout: 10000, // Set the timeout to 10 seconds
  },
}

module.exports = nextConfig
