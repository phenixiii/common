# 基于vue-cli4 + webpack4 的前端开发框架

    本框架需开发人员掌握一定的前端模块化知识，熟悉ES6编写方式，常用于企业内部管理系统的开发。
    
    本项目中的案例是对外理管控平台部分页面的重构


## Build Setup

``` bash
# 安装依赖
npm install

# 开发模式
npm run serve

# 生产模式
npm run build

```

# 目录结构

```
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
│   ├── index.js               // 入口 加载组件 初始化等
├── public                     // 第三方不打包资源
│   ├── js                     // 入口 加载组件 初始化等
│   ├── ├── plugins            // 插件组，可根据需要选择生成plugins.min.js(使用Minify插件)
├── .babel.config.js           // babel-loader 配置
├── .gitignore                 // git 忽略项
└── package.json               // package.json
```

## 需熟悉vue-cli vuex router element webpack es6等

* 更新内容 

    ### 2019-12-05：
        1.  增加机械组件
        2.  增加指令组件
        3.  增加任务组件
        4.  增加面板组件
        5.  增加船舶数据滚动组件
        6.  增加TOS操作页面

    ### 2019-11-28：
        1.  增加倍位组件
        2.  增加船舶泊位图组件
        3.  增加图片查看器组件

    ### 2019-11-14：
        1.  优化目录结构
        2.  个性化定制plugins.min.js

    ### 2019-11-11：
        1.  新增页面传值demo
        2.  修改404
        3.  代码整理
        

    ### 2019-11-07：
        1.  新增部分demo页面
        2.  新增多页、多路由模式
            index.html ==> demo 页面
            wllh.html ===> 外轮理货 页面

    ### 2019-10-29：
        1.  新增水平菜单切换
        2.  优化水平和垂直菜单样式
        3.  增加tab时页面缓存
        4.  开始制作demo

    ### 2019-10-15：
        1.  增加vuex支持
        2.  优化动态路由
        3.  增加垂直菜单，其中垂直菜单有page和tab 两种模式
