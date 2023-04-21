const { defineConfig } = require('@vue/cli-service')
console.info(process.env.VUE_APP_ENV_PATH,"====");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    // workboxOptions: {
    //   // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    //   skipWaiting: true,
    //   clientsClaim: true,
    //   importWorkboxFrom: 'disabled',
    //   importsDirectory: 'js',
    //   navigateFallback: '/',
    //   navigateFallbackBlacklist: [/\/api\//]
    // }
  },
  devServer: {
    // publicPath: './',
    host: "localhost",
    port: `8089`,
    open: true,
    // 代理链接配置
    proxy: {
      "/api": {
        target: process.env.VUE_APP_ENV_PATH,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        },
        secure: true,
      }
    }
  }
})
