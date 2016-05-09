# 使用eventproxy控制并发


## 目标

代码入口`app.js`,使用`node app.js`时，会在控制台输出CNode(https://cnodejs.org)社区首页的所有主题和标题，链接和第一条评论，以json形式


## 步骤

1. `mkdir lesson04 && cd lesson04`

2. `npm init`

3. `npm install cheerio eventproxy superagent --save`

4. `touch app.js`, 并编写app.js中的具体代码实现

5. `node app.js`
