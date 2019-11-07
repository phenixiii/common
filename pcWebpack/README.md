# pcwebpack

> 1.基于vue-cli2 + webpack 3.6 的前端开发框架

    本框架需开发人员掌握一定的前端模块化知识，熟悉ES6编写方式，常用于企业内部管理系统的开发。
    
    本项目中的案例是对外理管控平台部分页面的重构

## Build Setup

``` bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产模式
npm run build

# 分析报表
npm run build --report
```

# 目录结构

```
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── assets                 // 静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 自定义指令
│   ├── router                 // 路由
│   ├── store                  // vuex
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                  // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 路由钩子
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // html模板
└── package.json               // package.json
```


## 需熟悉vue-cli vuex router element webpack es6等


* 更新内容 

    ### 2019-11-06：
        1.  新增部分demo页面

    ### 2019-10-29：
        1.  新增水平菜单切换
        2.  优化水平和垂直菜单样式
        3.  增加tab时页面缓存
        4.  开始制作demo

    ### 2019-10-15：
        1.  增加vuex支持
        2.  优化动态路由
        3.  增加垂直菜单，其中垂直菜单有page和tab 两种模式

    