const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  //eslint校验功能关闭（声明变量未使用）
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
         '/api':{
           target:'http://gmall-h5-api.atguigu.cn/',
          //  pathRewrite:{'^/api':''}
         }
    }
  }
})

