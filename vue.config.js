const { defineConfig } = require('@vue/cli-service')
console.info(process.env.NODE_ENV,"====");
console.info(process.env.VUE_APP_ENV_PATH,"====");
module.exports = defineConfig({
  // 关闭eslint语法验证
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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
    iconPaths: {

      favicon32: 'favicon.ico',

      favicon16: 'favicon.ico',

      appleTouchIcon: 'favicon.ico',

      maskIcon: 'favicon.ico',

      msTileImage: 'favicon.ico',

    }
  },
  devServer: {
    host: "localhost",
    port: `8089`,
    open: true,
    // 代理链接配置
    proxy: {
      [process.env.VUE_APP_ENV_PATH]: {
        target: process.env.VUE_APP_ENV_PATH,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_ENV_PATH]: process.env.VUE_APP_ENV_PATH
        },
        logLevel: 'debug',
        secure: true,
      }
    }
  }
})
