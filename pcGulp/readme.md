## 帮助文档
	该框架对开发人员要求不高，无需写单文件组件，对单页、多页的支持较灵活，常用于企业门户等。

### 安装依赖
npm install

### 打包
gulp
执行后可直接访问index.html即可

### 发布
gulp web


## 目录结构
```

├── css                      			// 样式相关  
├── dist                     			// 发布目录
├── font                        		// 字体目录
├── Images                        		// 图片资源
├── Js                        			// 源代码
│   ├── barcode 						// 二维码生成库
│   ├── biz								// 页面对应JS代码
│   ├── common                  		// 系统必备库
│   ├── component               		// 自定义组件
│   ├── plugins                 		// 系统核心库
│   ├── others                  		// 第三方不打包资源
├── Res                     			// 用于存放枚举、主题等相关资源
├── Views                   			// 用于存放页面代码
├── index.html                 			// 入口
│   ├── gulpfile.js                 	// 打包配置文件
└── package.json               			// package.json

```

***ps:项目需熟悉gulp,vue,element ui等知识***