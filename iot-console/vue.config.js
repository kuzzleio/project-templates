const { defineConfig } = require('@vue/cli-service');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TsconfigPaths = new TsconfigPathsPlugin({
  extensions: ['.ts', '.tsx', '.js', '.vue'],
});

module.exports = defineConfig({
  productionSourceMap: process.env.NODE_ENV === 'development',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'none',
    resolve: {
      plugins: [TsconfigPaths],
    },
  },
  transpileDependencies: true,
});
