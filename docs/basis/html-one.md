### 一、事件循环、任务队列

> 同步任务、微任务、宏任务队列
>
> 注意：
>
> **因为 script整个代码块属于宏任务，所以第一次事件循环必然是从宏任务开始。**
>
> **在执行本轮宏任务时，如果遇到微任务，则放到本轮事件循环的最后（本轮所有宏任务执行完毕后）执行。**
>
> **如果遇到宏任务，则放到下一轮事件循环执行。**

::: danger
This is a dangerous warning.
:::

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)
// 1 2 3 4
```

```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})

setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
// 结果：
//Promise1
//setTimeout1
//Promise2
//setTimeout2
```

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
  Promise.resolve().then(_ => {
    console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
      console.log('also before timeout')
    })
  })
})

console.log(2)
// 1 2 3 
//before timeout 
//also before timeout 
//4
```

>before timeout与also before timeout在4之前输出的原因是：
>
>**在微任务执行的过程中，新产生的微任务会被直接添加到微任务队列尾部，并在下一宏任务执行之前，全部执行掉。**
>**而如果在微任务执行的过程中，新产生了宏任务，则会进入到宏任务队列尾部，按照宏任务顺序在后面的事件循环中执行。**

```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})

setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
// Promise1 setTimeout1 Promise2 setTimeout2
```
> node.js 中的 process.nextTick()属于微任务

```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
//结果：1 7 6 8 2 4 3 5 9 11 10 12
```

[JS核心理论之《运行机制与宏任务、微任务》 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/136366037)



### 二、迭代器（iterator）

### 三、隐式类型转换

```js
[1, 2] + [2, 1] // '1,22,1'
// [1, 2].toString() ==> 1,2
// [2, 1].toString() ==> 2,1
// 因此，'1,2' + '2,1' ===> '1,22,1'
```

```js
'a' + + 'b' // -> "aNaN"
// 上述表达式 <===> 'a' + (+'b')
// 因为，+'b' ==> NaN
// 所以，'a' + NaN = 'aNaN'
```

<img src="/markdownImgs/image-20230908173052168.png" alt="image-20230908173052168" style="zoom:80%;" />


```js
[] == ![] // -> true
// 1、因为 [] ---> true
[] == !true
[] == false
// 2、根据上图 第 8 条
[] == 0
// 3、根据上图 第 10 条
ToPrimitive([]) == 0
[].toString() == 0
'' == 0
// 4、根据上图 第 6 条
ToNumber('') == 0
0 == 0 // -> true
```

### 四、IEEE754双精度浮点数标准问题

> 怎么让  0.1+0.2 === 0.3 ？

```js
// 1、toFixed()
+(0.1 + 0.2).toFixed(1) === 0.3 // true

// 2、Number.EPSILON
if (Math.abs(0.3 - (0.1 + 0.2)) < Number.EPSILON) // true
else // false
```

### 五、原型链

> 阿里四面真题

```js
//实例方法
Object.prototype.a = function () {
   console.log('a');
};

//实例方法
Function.prototype.b = function () {
   console.log('b');
};

var F = function () {}; //函数对象 new Function
var f = new F();

//问：以下打印啥
f.a();
// a [[GET]]: 
// f.__proto__ --> F.prototype 没有
// F.prototype.__proto__ --> Object.prototype.a = function() { console.log('a') } 找到了 输出 a

f.b();//undefined  现在是找不到这个属性 控制台就直接报错
// b [[GET]]:
// f.__proto__ --> F.prototype 没有
// F.prototype.__proto__ --> Object.prototype 没有
// Object.prototype.__proto__ --> null  没有，找不到就返回 undefined
F.a();//a
// F.__proto__ --> Function.prototype  没有
// Function.prototype.__proto__  --> Object.prototype  有，输出 a
F.b();//b
// F.__proto__ --> Function.prototype  有，输出 b
```