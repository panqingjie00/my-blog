### 事件循环、任务队列

> 同步任务、异步任务（微任务、宏任务）
>
> 注意：
>
> **因为 script整个代码块属于宏任务，所以第一次事件循环必然是从宏任务开始。**
>
> **在执行本轮宏任务时，如果遇到微任务，则放到本轮事件循环的最后（本轮所有宏任务执行完毕后）执行。**
>
> **如果遇到宏任务，则放到下一轮事件循环执行。**
#### 0. 刷题前注意点！！！
::: warning 注意！
- sdsd 
:::
::: danger 温馨小提示
以下题目刚开始做，可能会比较吃力，比较无聊，但是孰能生巧，玩的就是肌肉记忆。  
先自己做完再看答案哦！
:::
#### 1. 输出顺序是什么？
```js{1}
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)
```
::: details 点击查看答案
```js
1 2 3 4
```
:::
#### 2. 输出顺序是什么？
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
```
::: details 点击查看答案
```js
Promise1
setTimeout1
Promise2
setTimeout2
```
:::
#### 3. 输出顺序是什么？
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
```
::: details 点击查看答案
```js
1 2 3 
before timeout 
also before timeout 
4
```
:::
>`before timeout`与`also before timeout`在4之前输出的原因是：
>
>**在微任务执行的过程中，新产生的微任务会被直接添加到微任务队列尾部，并在下一宏任务执行之前，全部执行掉。**
>**而如果在微任务执行的过程中，新产生了宏任务，则会进入到宏任务队列尾部，按照宏任务顺序在后面的事件循环中执行。**
#### 4. 输出顺序是什么？
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
```
::: details 点击查看答案
```js
Promise1 
setTimeout1 
Promise2 
setTimeout2
```
:::
> <mark>注</mark>：`node.js` 中的 `process.nextTick()` 属于微任务
#### 5. 输出顺序是什么？
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
rocess.nextTick(function() {
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
```
::: details 点击查看答案
```js
1 7 6 8 2 4 3 5 9 11 10 12
```

#### ∞. 相关参考资料
:::
::: tip 相关参考资料
- [JS核心理论之《运行机制与宏任务、微任务》 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/136366037)
- [微任务、宏任务与Event-Loop](https://juejin.cn/post/6844903657264136200)
:::
