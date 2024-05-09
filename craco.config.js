const path = require(`path`);

module.exports = {
  devServer: {
    port: 5001,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    resolve: {
      process: require.resolve("process/browser"),
    },
  },
};
