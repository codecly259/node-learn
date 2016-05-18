# 浏览器端测试：mocha，chai，phantomjs


## 目标

建立一个 lesson7 项目，在其中编写代码，我们暂时命名为 vendor 根据下面的步骤，最终的项目结构应该长这样

这次我们测试的对象是上文提到的 fibonacci 函数

此函数的定义为 int fibonacci(int n)

- 当 n === 0 时，返回 0；n === 1时，返回 1;
- n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;

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

然后在 test.js 中写入对应的测试用例

```
var should = chai.should();
describe('simple test', function () {
  it('should equal 0 when n === 0', function () {
    window.fibonacci(0).should.equal(0);
  });
});
```

这时打开index.html，可以发现测试结果，我们完成了浏览器端的脚本测试(注意我们调用了 window 对象)

## 测试反馈

mocha 没有提供一个命令行的前端脚本测试环境（因为我们的脚本文件需要运行在浏览器环境中），因此我们使用
phantomjs 帮助我们搭建一个模拟环境。不重复制造轮子，这里直接使用 mocha-phantomjs 帮助我们在命令行运行测试。

首先安装 mocha-phantomjs

```
npm i -g mocha-phantomjs
```

然后在 index.html 的页面下加上这段兼容代码

```html
<script>
	mocha.run();
</script>
```

改为

```html
<script>
	if(window.initMochaPhantomJS && window.location.search.indexOf("skip") === -1){
		initMochaPhantomJS();
	}
	mocha.ui("bdd");
	expect = chai.expect;

	mocha.run();
</script>
```

这时候，我们在命令行中运行

```
mocha-phantomjs index.html --ssl-protocol=any --ignore-ssl-errors=true
```

结果展现的是不是跟后端代码测试很类似。

更进一步，我们直接在package.json的 scripts 中添加(package.json通过 `npm init` 生成，这里不再赘述)

```
"script": {
	"test": "mocha-phantomjs index.html --ssl-protocol=any --ignore-ssl-errors=true"
},
```

将mocha-phantomjs作为依赖

```
npm i mocha-phantomjs --save-dev
```

直接运行

```
npm test
```

至此，我们实现了前端脚本的单元测试，基于 phantomjs 你几乎可以调用所有的浏览器方法，而 mocha-phantomjs 也可以
很便捷的将测试结果反馈到 mocha ，便于后续的持续集成。

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

2. `npm i -g mocha-phantomjs` 时报错：

```
E:\GitHub\node-learn\node-lessons\lesson07\vendor>npm i -g mocha-phantomjs
npm WARN deprecated npmconf@0.0.24: this package has been reintegrated into npm and is now out of date with respect to npm
C:\Users\maxinchun\AppData\Roaming\npm\mocha-phantomjs -> C:\Users\maxinchun\AppData\Roaming\npm\node_modules\mocha-phantomjs\bin\mocha-phantomjs

> phantomjs@1.9.7-15 install C:\Users\maxinchun\AppData\Roaming\npm\node_modules\mocha-phantomjs\node_modules\phantomjs
> node install.js

Downloading https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-windows.zip
Saving to C:\Users\MAXINC~1\AppData\Local\Temp\phantomjs\phantomjs-1.9.7-windows.zip
Receiving...
  [===========-----------------------------] 27% 0.0s
Error making request.
Error: read ECONNRESET
    at exports._errnoException (util.js:896:11)
    at TLSWrap.onread (net.js:556:26)
```

应该是下载 `phantomjs-1.9.7-windows.zip` 这个文件的问题，于是到官网下载了此文件，并解压后添加到环境变量中，
再执行 `npm i -g mocha-phantomjs` 时报了另一个异常：

```
E:\GitHub\node-learn\node-lessons\lesson07\vendor>npm i -g mocha-phantomjs
npm WARN deprecated npmconf@0.0.24: this package has been reintegrated into npm and is now out of date with respect to npm
npm ERR! Windows_NT 10.0.10586
npm ERR! argv "D:\\Program Files\\nodejs\\node.exe" "C:\\Users\\maxinchun\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js" "i" "-g" "mocha-phantomjs"
npm ERR! node v6.0.0
npm ERR! npm  v3.8.2
npm ERR! path C:\Users\maxinchun\AppData\Roaming\npm\node_modules\mocha-phantomjs
npm ERR! code EPERM
npm ERR! errno -4048
npm ERR! syscall rename

npm ERR! Error: EPERM: operation not permitted, rename 'C:\Users\maxinchun\AppData\Roaming\npm\node_modules\mocha-phantomjs' -> 'C:\Users\maxinchun\AppData\Roaming\npm\no
ha-phantomjs.DELETE'
```

重命名文件时没有权限，用管理员打开命令行再执行 `npm i -g mocha-phantomjs`，终于大功告成。
