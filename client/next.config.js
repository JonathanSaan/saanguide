const path = require('path');

module.exports = {
  compilerOptions: {
    baseUrl: './',
    paths: {
      '@vercel/analytics/react': ['./node_modules/@vercel/analytics/dist/react'],
    },
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost', 'encrypted-tbn1.gstatic.com', 'c.pxhere.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
