const path = require("path");

module.exports = {
  webpack: {
    alias: {
      app: path.resolve(__dirname, "src/app"),
      components: path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/store"),
      constants: path.resolve(__dirname, "src/constants"),
    },
  },
};