const { defineConfig } = require('@vue/cli-service')
console.info(process.env.ENV_PATH,"====");
let rootApi = process.env.ENV_PATH === 'pro' ? 'https://ah5game.com/' : 'http://game.afantai.com/'
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxOptions: {
      // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
      skipWaiting: true,
      clientsClaim: true,
      importWorkboxFrom: 'local',
      importsDirectory: 'js',
      navigateFallback: '/',
      navigateFallbackBlacklist: [/\/api\//]
    }
  },
  devServer: {
    host: "localhost",
    port: `8089`,
    // 代理链接配置
    proxy: {
      "/api": {
        target: rootApi,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        },
        secure: true,
      }
    }
  }
})
