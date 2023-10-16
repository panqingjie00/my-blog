# JS 作用域和闭包
## 一、预编译
### 1 概念
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


### 2 全局预编译
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

### 3 函数预编译
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

## 二.作用域与作用域链
---
### 1 概念
---
#### 1）域
>域：范围，区域

在js中，作用域分为**全局作用域**和**局部作用域**
- 全局作用域：由`<script>`标签产生的区域，从计算机的角度可以理解为window对象
- 局部作用域：由函数产生的区域，从计算机的角度可以理解为该甘薯的AO对象

#### 2）作用域链
在js中，函数存在一个隐式属性`[[scopes]]`，这个属性用来保存当前函数在执行时的环境（上下文），由于在数据结构上是链式的，也被成为作用域链，我们可以把它理解成一个**数组**
> 函数类型存在[[scopes]]属性

```js
function a() {}
console.dir(a) // 打印内部结构
```
> 输出

<img src="/markdownImgs/scope8.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

`[[scopes]]`属性在函数声明时产生，在函数被调用时更新  
`[[scopes]]`属性记录当前函数的执行环境  
在函数被调用时，将该函数的AO对象压入到`[[scopes]]`中
> 示例

```js
function a() {
    console.dir(a)
    function b() {
        console.dir(b)
        function c() {
            console.dir(c)
        }
        c()
    }
    b()
}
a()
```
> 演示

<img src="/markdownImgs/scope9.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

`[[scopes]]`属性是一个数组的形式
0：是函数a的AO对象
1：是GO对象

### 2 作用
---
作用域链有什么作用呢？
在访问变量或者函数时，会在作用域链上依次查找，最直观的表现是：
- 内部函数可以使用外部函数声明的变量
>示例

```js
function a() {
    var aa = 111
    function b() {
        console.log(aa);
    }
    b()
}
a()
```
- 在函数a中声明定义了变量aa
- 在函数b中没有声明，却可以使用

> 思考

如果在函数b中，也定义同名变量aa会怎样

>示例

```js
function a() {
    var aa = 111
    function b() {
        var aa = 222
        console.log(aa);
    }
    b()
}
a()
```
第一个问题：函数a和函数b里的变量aa是不是同一个变量？
第二个问题：函数b里打印的aa是用的谁的？

>结论

内部函数可以使用外部函数的变量
外部函数不能使用内部函数的变量

## 三.闭包
---
闭包的形成：如果在内部函数使用了外部函数的变量，就会形成闭包，闭包保留了外部环境的引用
闭包的保持：如果内部函数被返回到了外部函数的外面，在外部函数执行完成后，依然可以使用闭包里的值

### 1 闭包的形成
---
>示例

```js
function a() {
    var aa = 100
    function b() {
        console.log(aa);
    }
    b()
}
a()
```
>演示

<img src="/markdownImgs/scope10.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>
<br>
<img src="/markdownImgs/scope11.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

从代码的角度看，闭包也是一个对象，闭包里包含哪些东西呢？
在内部函数b中使用了哪些外部函数a中的变量，这些变量就会<mark>作为闭包对象的属性保存下来！！！</mark>

### 2 闭包的保持
---
如果希望在函数调用结束后，闭包依然保持，就需要将内部函数返回到外部函数的外部
>示例

```js
function a() {
    var num = 0
    function b() {
        console.log(num++);
    }
    return b
}
var demo = a()
console.dir(demo)
demo()
demo()
```

## 四.闭包的应用
---
### 1 闭包的两面性
---
>任何事物都有两面性

好处：一般来说，在函数外部是没办法访问函数内部的变量的，设计闭包最主要的作用就是为了解决这个问题。
坏处：有时不注意使用了闭包，会导致意想不到的结果

### 2 闭包的应用
---
1. 在函数外部访问私有变量
2. 实现封装
3. 防止污染全局变量
>示例

在函数外部访问私有变量
```js
 function a() {
    var num = 0
    function b() {
        console.log(num++);
    }
    return b
}
var demo = a()
console.dir(demo)
demo()
demo()
```

## 五.相关题目
---
>题目一
```js
var a = 0
var b = 0
function A(a) {
    A = function (b) {
        alert(a + b++)
    }
    alert(a++)
}
A(1)
A(2)
```

::: details 查看答案
```js
先 alert 1
后 alert 4
```
:::
>解析

本题的重点在于`A = function (b) { alert(a + b++) }`这里  
1. 第一次`A(1)`执行到这里，将 `A(a){...}`内部的一个`匿名函数function(b) {...}`赋值给了 `A`  
2. 而此时，`A(a){...}`没有`A`这个变量，因此沿着`作用域链`找，找到了`GO.A`，将内部函数的引用传到了外部函数的外部
3. 又因为，`function(b){...}`中的`alert(a + b++)`使用到了外部函数的 a 变量，因此，`function A(a) {...}`作为包含a属性的闭包对象保持下来。



