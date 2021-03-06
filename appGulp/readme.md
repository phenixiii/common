## 帮助文档

### 安装依赖
- npm install

### 运行
- gulp
- 执行后可直接访问index.html即可

### 发布web(适用于微信、移动浏览器等)
	修改jsTools.Res.curSystem = 'web'
	gulp web

### 发布app
	修改jsTools.Res.curSystem = 'app'
	gulp app
	完成后将dest目录COPY到apicloud项目中即可



## 目录结构

- 项目
	- css                         	//  样式相关
		- styles                  	//  打包前CSS  
	- dest                        	//  发布文件
	- font                        	//  字体目录
	- image                      	//  图片资源
	- icon							//  上传图标
	- launch						//  上传启动页图片
	- script
		- aui						// ui组件
		- barcode 					// 二维码生成库
		- common                  	// 系统必备库
		- plugins                 	// 系统核心库
		- chart                  	// 数据可视化库
	- html                       	//  用于存放页面代码
	- config						// app打包配置文件
	- index.html                  	// 入口
	- gulpfile.js                 	// 打包配置文件
- package.json                    	// package.json



## 框架描述

+ 框架对apicloud 的部分js方法进行了封装和整合，可满足一套代码兼容APP、微信
+ 框架内script/plugins/文件解释：

名称|描述
----|:---:
jsApi.js|apicloud 原生访问封装
jsFile.js|图片文件js 操作库
jsRes.js|资源库，常存放项目各页面菜单等静态资源
jsTools.js|核心库，主要包含窗体初始化、打开、关闭、数据通信ajax、各类提示框等相关方法
jsToolsRes.js|核心服务库
phenix.js|软一服务端通讯JS标准库
wxApi.js|调用微信支付、微信分享方法
	
+ gulp打包 

	[使用帮助](https://www.gulpjs.com.cn/)
```
	gulp.task('default', function (cb) {
	runSequence(
		'clean', // 第一步：清理目标目录
		['aui-min', 'barcode-min', 'common-min', 'plugins-min', 'styles-min'], // 第二步：合并
		'watch-plugins',
		'watch-aui',
		'watch-css',
		cb
	);
	});
```

***ps:项目需熟悉gulp, vue, apicloud, aui等知识***