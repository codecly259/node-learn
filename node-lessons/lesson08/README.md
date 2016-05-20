# 《测试用例: supertest》


## 目标

建立一个lesson08项目，在其中编写代码。

app.js: 其中有个 fibonacci 接口。fibonacci 的介绍见：[http://en.wikipedia.org/wiki/Fibonacci_number](http://en.wikipedia.org/wiki/Fibonacci_number) 。

fibonacci 函数的定义为 `int fibonacci(int n)`，调用函数的路径是 '/fib?n=10', 然后这个接口会
返回'55'。函数的行为定义如下：

- 当 n===0 时，返回0；n===1时，返回1；
- n>1时，返回 `fibonacci(n) = fibonacci(n-1) + fibnonacci(n-2)`,如 `fibonacci(10)=55`;
- n不可以大于10，否则抛错，http status 500，因为node.js计算性能没那么强；
- n也不可以小于0，否则抛错，500，因为没有意义；
- n不为数字是，抛错，500。

test/main.test.js:对app的接口进行测试，覆盖以上所有情况。


## 知识点

1. 学习supertest的使用([http://github.com/tj/supertest](http://github.com/tj/supertest))
2. 复习mocha, should的使用


## 课程内容

我们来新建一个项目

```
npm init # 填写初始化信息
```

然后安装我们的依赖

```
npm i mocha should supertest --save-dev
```

```
npm i express --save
```

接着，编写 app.js

```
var express = require("express");

var fibonacci = function (n) {
    // typeof NaN === "number" 是成立的，所以要判断 NaN
    if (typeof n !== "number" || isNaN(n)) {
        throw  new Error("n should be a Number");
    }
    if (n < 0) {
        throw new Error("n should >= 0");
    }
    if (n > 10) {
        throw  new Error("n should <= 10");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

var app = express();

app.get("/fib", function (req, res) {
    // http 传来的东西默认都是没有类型的，都是 String, 所以我们要手动转换类型
    var n = Number(req.query.n);
    try {
        // 为何使用 String 做类型转化，是因为如果直接给个数字给 res.send 的话，
        // 它会当成你是给了它一个 http 状态吗，所以我们明确给 String
        res.send(String(fibonacci(n)));
    } catch (e) {
        // 如果 fibonacci 抛错的话，错误信息会记录在err 对象的 .message 属性中。
        // 拓展阅读：https://www.joyent.com/developers/node/design/errors
        res.status(500).send(e.message);
    }
});

// 暴露 app 出去，module.exports 与 exports 的区别请看《深入浅出 Node.js》
module.exports = app;

app.listen(3000, function () {
    console.log("app is listening at port 3000");
});
```

好了，启动一下看看。

```
node app.js
```

然后访问 `http://127.0.0.1:3000/fib?n=10`,看到`55`就说明启动成功了。
再访问 `http://127.0.0.1:3000/fib?n=111`, 会看到 `n should <= 10`。


装个`nodemon` [https://github.com/remy/nodemon](https://github.com/remy/nodemon)

```
npm i -g nodemon
```

这个库是专门调用时候使用的，它会自动检测 node.js 代码的改动，然后帮你自动重启应用。
在调用时可以完全使用 `nodemon` 命令代替 node 命令。

`nodemon app.js` 启动我们的应用试试，然后随便改两行代码，就可以看到 nodemon 帮我们重启应用了。

那么 app 写完了，接着开始测试，测试代码在 test/app.test.js 中。


