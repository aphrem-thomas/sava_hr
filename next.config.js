module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://141.148.217.128/api/:path*' // Proxy to Backend
      },
    ]
  },
}