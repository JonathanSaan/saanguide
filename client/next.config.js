const path = require("path");

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["localhost", "encrypted-tbn1.gstatic.com", "c.pxhere.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
