# JS 作用域和闭包
## 一、预编译
### 1.概念
---
#### 1）什么是预编译
首先，我们要知道`JavaScript`是解释性语言
- 解释性：逐行解析，逐行执行

那么，什么是预编译呢？
在`JavaScript`真正被解析之前，js解析引擎会首先把整个文件进行**预处理**，以消除一些歧义。这个预处理的过程就被成为**预编译**

>示例
```js
console.log(a);
var a = 123
console.log(a);
function a() {
    console.log(a);
}
a()
```
::: details 点击查看答案
```js
function a() {
    console.log(a);
}
123
error: a not a function 
```
:::
这是一段奇怪的代码，大家可以先思考一下，三个`console.log`分别会打印出什么？
如果要完全理解，我们就需要深入的分析`js引擎`到底是如何工作的！！！

#### 2）全局对象GO
>全局对象
全局对象（Global Object）：
- 在浏览器环境中，`js引擎`会整合`<script>`标签中的内容，产生`window对象`，这个window对象就是全局对象
- 在node环境中，会产生`global对象`

##### 全局变量
在`<script>`标签中声明的变量为`全局变量`,全局变量会作为`window`对象的属性存在！！！
>示例
```js
var a = 100
console.log(a)
console.log(window.a)
```
这里打印a实际上相当于打印`window`对象的a属性
>演示

<img src="/markdownImgs/scope.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

> 扩展

啥叫整合？

> 示例

```js
<script>
    var a = 100
    console.log(a)
    console.log(window.a)
</script>
<script>
    // 在这里能访问到 a 吗？
    console.log(a)
</script>
```
- 可以，因为`js引擎`会把所有的`<script>`标签整合到一起，生成一个`window`对象

##### 全局函数
在`<script>`标签中声明的函数为`全局函数`，全局函数会作为`window`对象的方法存在！！！
>示例

```js
function a() {
    console.log('111')
}
console.log(window.a)
```
>演示

<img src="/markdownImgs/scope2.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

那么问题来了，当同时定义变量a和函数a时，会发生什么呢？
就像我们看到的奇怪代码里一样，而预编译就是为了处理类似的这些冲突

#### 3）活动对象AO
>活动对象

活动对象（Activation Object）：也叫激活对象
- 在函数被调用时产生，用来保存当前函数内部的执行环境（Execution Context），也叫执行期上下文
- 在函数调用结束时销毁

##### 局部变量
在函数内部声明的变量叫**局部变量**，局部变量作为**AO对象**的属性存在
>示例

```js
function a() {
    var i = 0
    console.log(i)
}
a()
```
>演示

<img src="/markdownImgs/scope3.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

>如何理解局部

在`函数a`的外部，不能访问`变量i`，`变量i`只在`函数a`的范围内才能使用。其实，这也就是作用域的由来。
- 如果不执行函数，不会产生`AO对象`，就不会存在`i属性`
- 如果执行函数，就会产生`AO对象`，并将`变量i`作为`AO对象`的属性
- 函数执行完后，AO对象被销毁，也就意味着不能使用`i属性`

##### 局部函数
在函数内部声明的函数叫**局部函数**，局部函数作为**AO对象**的方法存在
>示例

```js
function a() {
    function b() {
        console.log(222)
    }
    b()
}
a()
```
> 演示

<img src="/markdownImgs/scope4.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>


### 2.全局预编译
---
#### 1）流程
1. 查找变量声明，作为`GO`对象的属性名，值为`undefined`
2. 查找函数声明，作为`GO`对象的属性名，值为`function`
> 变量声明

通过`var`关键字声明变量
```js
var a // 变量声明
var a = 111 // 变量声明 + 变量赋值
```
> 函数声明

通过`function`关键字声明函数
```js
function a() {} // 函数声明
var a = function () {} // 函数表达式，不是函数声明
```
>示例

```js
console.log(a);
var a = 100
console.log(a);
function a() {
    console.log(111);
}
console.log(a);
```

#### 2）结论
如果存在同名的变量和函数，函数的优先级更高   

### 3.函数预编译
---
#### 1）流程
1. 在函数被调用时，为当前函数产生`AO对象`
2. 查找形参和变量声明作为`AO对象`的属性名，值为`undefined`
3. 使用实参的值改变形参的值
4. 查找函数声明，作为`AO对象`的属性名，值为`function`

#### 2）示例
>示例一

```js
function a(test) {
    var i = 0
    function b() {
        console.log(222);
    }
    b()
}
a(1)
```
>演示

<img src="/markdownImgs/scope5.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

在`函数a`的AO对象中，存在三个属性
- test：形参，值为 1
- i：局部变量，值为 0
- b：局部函数

>示例二

```js
function a(test) {
    console.log(b);
    var b = 0
    console.log(b);
    function b() {
        console.log(222);
    }
}
a(1)
```
>演示

<img src="/markdownImgs/scope6.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

当局部变量与局部函数同名时，函数的优先级更高

>示例三

```js
function a(b, c) {
    console.log(b);
    var b = 0
    console.log(b);
    function b() {
        console.log(222);
    }
    console.log(c);
}
a(1)
```
>演示

<img src="/markdownImgs/scope7.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

> 示例四

```js
function a(i) {
    var i;
    console.log(i);
}
a(1)
```
#### 3）结论
- 只要声明了局部函数，函数的优先级最高
- 没有声明局部函数，实参的优先级高
- 整体来说：<mark>局部函数 > 实参 > 局部变量</mark>



