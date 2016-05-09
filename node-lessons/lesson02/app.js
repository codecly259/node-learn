// 引入依赖
var express = require("express");
var utility = require("utility");

// 建立express实例
var app = express();

app.get("/", function (request, response) {
    // 获取参数值
    var q = request.query.q;
    // 使用工具得到md5之后的值
    var md5Value = utility.md5(q);

    response.send(q + ":" + md5Value);
});

app.listen("3000", function (request, response) {
    console.log("app is running at port 3000");
});
