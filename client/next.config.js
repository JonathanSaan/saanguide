const path = require('path');

module.exports = {
  images: {
    domains: ['localhost', 'encrypted-tbn1.gstatic.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
