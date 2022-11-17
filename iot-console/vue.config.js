const { defineConfig } = require("@vue/cli-service");
const package = require('./package.json');

module.exports = defineConfig({
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        if (typeof package.title !== 'undefined') {
          args[0].title = package.title
        }
        if (typeof process.env['VUE_APP_TITLE'] !== 'undefined') {
          args[0].title = process.env['VUE_APP_TITLE'];
        }
        return args;
      });
  },
  transpileDependencies: true,
});
