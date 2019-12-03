
module.exports = {
  publicPath: './',
  productionSourceMap: false,       //生产环境是否显示sourceMap
  pages:{
    index:{
      entry: 'src/index.js',
    },
    wllh:{
      entry: 'src/wllh.js',
    },
    test:{
      entry: 'src/template/test.js',
      template:'public/template/test.html',
      filename: 'test.html',
    }
  }
}