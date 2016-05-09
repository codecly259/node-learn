# 使用superagent和cheerio完成简单爬虫


## 目标

当浏览器中访问 http://127.0.0.1:3000 时，输出CNode(https://cnodejs.org)社区首页的所有帖子标题和链接，以json形式


## 步骤

1. 创建目录：`mkdir lesson03 && cd lesson03`

2. 初始化nodejs环境目录: `npm init`

3. 安装依赖 `npm install express superagent cheerio --save`

4. 创建app.js并编写代码

5. 运行项目：`node app.js`

6. 访问页面 [http://127.0.0.1:3000](http://127.0.0.1:3000)


## 使用到的模块

1. [express](http://expressjs.com/): 高度包容、快速而极简的 Node.js Web 框架
2. [superagent](https://visionmedia.github.io/superagent/): 一个轻量的,渐进式的ajax api,可读性好,学习曲线低,内部依赖nodejs原生的请求api
3. [cheerio](http://cheeriojs.github.io/cheerio/): 为服务端特别定制的，快速、灵活、实施的jQuery核心实现
