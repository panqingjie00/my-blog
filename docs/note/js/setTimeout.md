## 语法格式  

`setTimeout(code[, delay][, arg1...argn])`

`setInterval(code[, delay][, arg1...argn])`

## 返回值

`setTimeout()`和`setInterval()`都会返回一个唯一的 `number` 类型的 ID值，来和绑定的回调函数相关联。且**共享一个 ID 池**。

```js
const timer1 = setTimeout(() => {

}, 0);

const timer2 = setInterval(() => {

}, 1000);

const timer3 = setTimeout(() => {

}, 0);

console.log(timer1, timer2, timer3); // 1 2 3
```

## 清除定时器

`clearTimeout()`和`clearInterval()`只是名字不同而已，其他都相同，意味着这俩可以混用，但是为了代码可读性和可维护性，要区分开。

```js
let count = 0;

const timer = setInterval(() => {
    if (count > 2) {
        clearTimeout(timer2);
    }
    console.log(count++);
}, 1000);
// 0 
// 1 
// 2 
// 3
```


## 第一个参数：callback
第一个参数可以是**任意 js 代码片段**，可以是函数也可以是字符串形式的js代码。类似 `eval()`。但不推荐使用，不安全。


```js
setTimeout("console.log(1+2)", 0); // 3
```

## 第二个参数：等待时间（delay）
>什么是合法的 delay 值？
>
>- 整数（ms）
>- 小数（会下取整）
>- 字符串型数字：'123'、'56.8'
>
>什么是非法的 delay 值？
>
>- 不能转成数字的，如：'wqeas'
> 
>**注：如果 js 无法识别 delay 值，则等价于 delay=0，立即加入任务队列。这个 delay=0 是我自己的猜测，也可能是 js 引擎存在某种机制，看到无法识别的 delay，就觉得没有开启计时线程等待的必要，就直接加入任务队列**

```js
setTimeout("console.log(1)", 100);

setTimeout("console.log(2)", 78.3);

setTimeout("console.log(3)", 'asdas');

setTimeout("console.log(4)", 0);
// 3
// 4
// 2
// 1
```
解释：`78.3`会被转换成`78`，`asdas`会被转换成`0`，因此输出顺序为：3 4 2 1


## 传参
从第 3 个参数开始往后，都会被当做参数传递给回调函数。

```js
setTimeout((...args) => {

    console.log(args.join(' '));

}, 1000, 'hello', 'world'); // hello world
```

## this 指向

setTimeout、setInterval 中的回调函数，都是在 delay 时间到达后，添加到宏任务队列中。

等待主线程在合适的时机调度执行。

>那我主线程拿到你这个延时任务的回调后，在哪里执行呢？
>
>来自《JavaScript高级程序设计》第四版 中的描述：
>
>**所有超时执行的代码（函数）都会在全局作用域中的一个匿名函数中运行，因此函数中的 this 值在非严格模式下始终指向 window，而在严格模式下是 undefined。如果给 setTimeout() 提供了一个箭头函数，那么 this 会保留为定义它时所在的词法作用域。**

由《高程》的这段描述，我们就明白了为什么 setTimeout、setInterval 回调函数会存在 this 指向错误问题。

用代码解释一下：
```js
const person = {
    name: "张三",
    getName: function () {
        console.log(this.name);
    }
};

setTimeout(person.getName, 1000);
```
在以上代码中，1 秒后，会将 `person.getName` 这个函数添加到任务队列中，等到主线程拿到这个函数后，会把他放到一个全局的`IIFE`中执行：
```js
// 当前在全局作用域中
(function () {
        console.log(this.name); // 非严格模式下 this ==> window
})();
```
注意：这里 this.name 没有输出 undefined，而是输出为空的原因是，window 对象上本身就有 name 属性，且 window.name = ''；不信你可以自己输出看看。

那要怎么解决 this 指向问题呢？

上面《高程》给了一种解决方案：**给 setTimeout() 提供一个箭头函数，那么 this 会保留为定义它时所在的词法作用域**

我们试一下：
```js
const person = {
    name: "张三",
    getName: function () {
        console.log(this.name);
    }
};

setTimeout(() => {
    person.getName();
}, 1000);  // ok，1 秒后 输出 张三
```

那套一层普通函数可以吗？
```js
setTimeout(function () {
    person.getName();
}, 1000);  // 也是输出 张三，没问题
```

还有第二种我们惯用的解决方案：**使用 bind()**
```js
const person = {
    name: "张三",
    getName: function () {
        console.log(this.name);
    }
};
setTimeout(person.getName.bind(person), 1000); // 1s 。。张三
```

由上可知，我们在使用 setTimeout、setInterval 时，尽量不要直接把方法作为第一个参数，最好是套一层箭头函数。



## setTimeout 实现 setInterval
### 问题一：回调函数返回结果顺序不一致

为什么要用 setTimeout 实现 setInterval，而不直接使用 setInterval？

>来自 MDN 的解释：
>
>如果你的代码逻辑执行时间可能比定时器时间间隔要长，建议你使用递归调用了 `setTimeout()` 的具名函数。例如，使用 `setInterval()` 以 5 秒的间隔轮询服务器，可能因网络延迟、服务器无响应以及许多其他的问题而导致请求无法在分配的时间内完成。因此，你可能会发现排队的 XHR 请求没有按顺序返回。


请看下图实例：

<img src="/js/setTimeout1.jpg" alt="setTimeout1.jpg" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

这样就会造成 ajax 请求没有按顺序返回的问题，如果 ajax2 中的数据依赖 ajax1 中的某数据，则影响会更大。

那怎么解决呢？

思考一下，造成这种问题的原因，**其实就是上一个 setInterval 的回调函数没有得到结果，就将下一个回调加入了任务队列。**

那我们只要在上一个任务没有结果时不把下一个任务添加到任务队列，只有在上一个任务得到结果后再将下一个任务添加到队列不就行了嘛。

我们知道 setTimeout 会在 delay 时间后，将回调添加到队列，然后就结束了。因此，我们在每次得到上一次的执行结果后，再开启一个 setTimeout 等待 delay 时间后添加到队列，不就 ok 了吗。

以上解决方案，简单来说就是：**使用 setTimeout 递归调用具名函数**

代码演示：
```js
(function loop() {
    setTimeout(() => {
        // ajax 请求 。。。。

        if (上一个ajax请求结果得到) {
            loop();
        }
    }, 1000);
})();
```

### 问题二：任务队列冗余

设想一下，当每次或者大多数任务的执行时间都大于 delay 时

```js
// 阻塞 1s
function delay(delay = 1000) {
    let now = Date.now();
    while (Date.now() - now < delay) { };
}

// 每 0.5s 将回调添加到任务队列
setInterval(() => {
    delay();
}, 500);
```

一段时间过后，任务队列中会累积大量排队的任务，从而影响后续其他任务的执行


<img src="/js/setTimeout2.jpg" alt="setTimeout2.jpg" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>


✿✿ヽ(°▽°)ノ✿

本文到此就先告一段落了，如后续发现错误会自己更改，恳请各位大佬批评指正。

## 文章同步更新平台
- 掘金：搜用户 ThisGravity
- B站：https://space.bilibili.com/200297467?spm_id_from=333.1007.0.0 （一个做鬼畜视频的）

## 参考文献

-   V8引擎-事件循环、任务队列
-   书籍《JavaScript高级程序设计》;
-   [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)
-   B站up：前端小夏老师
