# 浏览器端测试：mocha，chai，phantomjs


## 目标

建立一个 lesson7 项目，在其中编写代码，我们暂时命名为 vendor 根据下面的步骤，最终的项目结构应该长这样

这次我们测试的对象是上文提到的 fibonacci 函数

此函数的定义为 int fibonacci(int n)

当 n === 0 时，返回 0；n === 1时，返回 1;
n > 1 时，返回 fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)，如 fibonacci(10) === 55;

## 知识点

1. 学习使用测试框架mocha进行前端测试：[http://mochajs.org](http://mochajs.org)
2. 了解全栈的断言库chai：[http://chaijs.com](http://chaijs.com)
3. 了解headless浏览器phantomjs: [http://phantomjs.org](http://phantomjs.org)


## 前端脚本单元测试

lesson06的内容都是针对后端环境中的 node 的一些单元测试方案，处于应用健壮性的考量，针对前端js脚本的单元测试也非常重要。
而前后端通吃，也是mocha的一大特性。

首先，前端脚本的单元测试主要有两个困难需要解决：

1. 运行环境应当在浏览器中，可以操纵浏览器的DOM对象，且可以随意定义执行时的html上下文。
2. 测试结果应当可以反馈给 mocha , 判断测试是否通过。


## 浏览器环境执行

我们首先搭建一个测试原型，用mocha自带的脚手架可以自动生成。

```shell
cd vendor			# 进入我们的项目文件夹
npm i -g mocha		# 安装全局的 mocha 命令工具
mocha init .		# 生成脚手架
```

mocha 就会自动帮我们生成一个简单的测试原型

```
.
├── index.html       # 这是前端单元测试的入口
├── mocha.css
├── mocha.js
└── tests.js         # 我们的单元测试代码将在这里编写
```

其中 index.html 是单元测试的入口， test.js 是我们测试用例文件。

我们直接在 index.html 插入上述示例的 fibonacci 函数以及断言库 chaijs。


```html
<div id="mocha"></div>
<!-- <script src='https://raw.githubusercontent.com/chaijs/chai/master/chai.js'></script> -->
<script src='https://rawgit.com/chaijs/chai/master/chai.js'></script>
<script>
  var fibonacci = function (n) {
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    return fibonacci(n-1) + fibonacci(n-2);
  };
</script>
```



## 出现的问题

1. 引用 `<script src='https://raw.githubusercontent.com/chaijs/chai/master/chai.js'></script>` 时chrome下报错

```
Refused to execute script from 'https://raw.githubusercontent.com/chaijs/chai/master/chai.js'
because its MIME type ('text/plain') is not executable, and strict MIME type checking is enabled.
```

把js链接中的 `raw.githubusercontent.com` 改为 `rawgit.com` 即可。

参考：

- [Refused to Execute Script From Because Its MIME Type (Text/plain) Is Not Executable, and Strict MIME Type Checking Is Enabled](http://droidyue.com/blog/2014/09/27/refused-to-execute-script-from-because-its-mime-type-text-slash-plain-is-not-executable-and-strict-mime-type-checking-is-enabled/index.html)
- [Link and execute external JavaScript file hosted on GitHub](http://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github)
