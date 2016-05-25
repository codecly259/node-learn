# benchmark 怎么写


## 目标

有一个字符串 `var number = '100'`, 我们要将它转换成 Number 类型的100。

目前有三个选项：+, parseInt, Number

请测试哪个方法更快。


## 知识点

1. 学习使用 benchmark 库
2. 学习使用 [http://jsperf.com/](http://jsperf.com) 分享你的 benchmark


## 课程内容

首先去弄个 benchmark 库，https://github.com/bestiejs/benchmark.js 。

这个库的最新版本是2.1.0

用法也很简单，照着官网的 copy 下来就好。

我们先来实现这三个函数：

```js
var int1 = function (str) {
	return +str;
}

var int2 = function (str) {
	return parseInt(str);
}

var int3 = function (str) {
	return Number(str);
}
```

然后按照官网的模板写 benchmark suite ：

```js
var number = '100';

// 添加测试
suite.add('+', function () {
    int1(number);
}).add('parseInt', function () {
    int2(number);
}).add('Number', function () {
    int3(number);
}).on('cycle', function (event) { // 每个测试跑完后，输出信息
    console.log(String(event.target));
}).on("complete", function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run({'async': true}); // 这里的 async 不是 mocha 测试那个 async 的意思，这个选项与它的时间计算有关，默认勾上就好了。
```

直接运行

```shell
E:\GitHub\node-learn\node-lessons\lesson10>node main.js
+ x 48,152,693 ops/sec ±6.81% (59 runs sampled)
parseInt x 28,679,636 ops/sec ±6.46% (55 runs sampled)
Number x 46,240,523 ops/sec ±9.51% (59 runs sampled)
Fastest is +,Number
```
