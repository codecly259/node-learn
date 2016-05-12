# 浏览器端测试：mocha，chai，phantomjs


## 目标

建立一个 lesson7 项目，在其中编写代码，我们暂时命名为 vendor 根据下面的步骤，最终的项目结构应该长这样

这次我们测试的对象是上文提到的 fibonacci 函数

此函数的定义为 int fibonacci(int n)

当 n === 0 时，返回 0；n === 1时，返回 1;
n > 1 时，返回 fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)，如 fibonacci(10) === 55;
