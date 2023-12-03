# 发布-订阅者模式（Publish-Subscribe Pattern）

## 前言

**发布-订阅模式**其实是一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变的通知。

- **订阅者**（Subscriber）把自己想订阅的事件 **注册**（Subscribe）到调度中心（Event Channel）;
- 当**发布者**（Publisher）**发布该事件**（Publish Event）到调度中心，也就是该事件触发时，由 **调度中心** 统一调度（Fire Event）订阅者注册到调度中心的处理代码。

??😅  这说的是啥

不慌不慌，下面有个通俗的例子

> 比如我们很喜欢看某个公众号的文章，但是不知道什么时候发布新文章，要不定时的去翻阅；这时候，我们可以关注该公众号，当有文章推送时，会有消息及时通知我们文章更新了。

上面一个看似简单的操作，其实是一个典型的发布订阅模式，`公众号`属于发布者，`用户`属于订阅者；用户将订阅公众号的事件注册到调度中心，公众号作为发布者，当有新文章发布时，公众号发布该事件到调度中心，调度中心会及时发消息告知用户。

## 手写订阅发布者模式

**题目**

```javascript
javascript复制代码class EventEmitter {
    constructor() {
    }
    on() {
    }
    once() {        
    }
    emit() {
    }
    off() {
    }
  }
  
  // 运行示例
let ev = new EventEmitter();

const fun1 = (str) => {
  console.log(str);
}

ev.on('say', fun1);
ev.emit('say', 'visa');
ev.off('say', fun1);
ev.once('say', fun1)
```

**面试官：请你实现这个方法**

(这就是笔者前两天的面试题，因为当时不理解这个题目的意思是叫我手写一个发布订阅模式，导致我连题目都没看懂)

### 分析

我们要对`EventEmitter类`中的四个方法有个了解

- **on()**:  类似于订阅微信公众号的订阅方法，但不会触发事件
- **emit()**:  类似于订阅公众号之后，公众号一有消息就会通知给我们
- **once()**:  代表我订阅公众号之后，它只通知我一次
- **off()**:  就是我们常见的取消关注该公众号了

### 实现on方法

`on` 方法用来存储该事件类型的回调函数

**示例**

```csharp
csharp
复制代码ev.on('say', fun1);
```

很明显我们给`on`方法传入了两个参数：

- `say`：事件名
- `fun1`：回调函数

但是我们知道，执行了`on`方法后，这里的回调函数并不会触发,说明我们肯定是靠`on`方法存储了这个回调函数，那么该怎么做到存储函数的效果呢？

```kotlin
kotlin复制代码class EventEmitter {
    constructor() {
      this.event = {

      }
    }
```

**我们可以直接创建一个event对象来存储。**

记住，因为我们后面存储的`事件名`肯定不止一种事件，而且每一个事件又可能不止对应着一种`回调函数`，所以这里的结构后面会大概长成这样

```kotlin
kotlin复制代码class EventEmitter {
    constructor() {
      this.event = {
            'say':[cb1,cb2] // cb代表回调函数
      }
    }
```

**分析**

我们再分析一下on方法的作用

- 如果`this.event`有该类型的事件，那么直接往该事件中增加该回调函数
- 如果`this.evnet`没有，新建事件类型和回调函数

**代码**

```typescript
typescript复制代码class EventEmitter {
    constructor() {
      this.event = {
      }
    }
    on(type,cb) {
      if(!this.event[type]){
        this.event[type] = [cb]
      }else{
        this.event[type].push(cb)
      }
    }

  }
  
  // 运行示例
let ev = new EventEmitter();
const fun1 = (str) => {
  console.log(str);
}
ev.on('say', fun1);
console.log(ev, 'ev');
```

**打印结果**

<img src="/designPattern/发布订阅者模式1.jpg" alt="发布订阅者模式1.jpg" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

发现我们确实存储成功了!!

### 实现emit方法

`emit` 方法用来执行订阅事件的回调函数

**示例**

```arduino
arduino
复制代码  ev.emit('say','visa');
```

很明显我们给`emit`方法传入了两个参数：

- `say`：事件名

- ```
  visa
  ```

  ：参数

  > 这个参数就是传给`say`事件类型中回调函数的参数

**分析**

`emit`方法的作用

- 判断是否订阅了`say`事件，如果没有，返回空
- 如果订阅了，遍历执行`say`事件中的回调函数

**代码**

```typescript
typescript复制代码class EventEmitter {
  constructor() {
    this.event = {

    }
  }
  on(type, cb) {
    if (!this.event[type]) {
      this.event[type] = [cb]
    } else {
      this.event[type].push(cb)
    }
  }
   // 用剩余参数是保证emit接收的参数不止一个
  emit(type, ...args) {
    if (!this.event[type])
      return
    else {
      this.event[type].forEach(cb => {
        cb(...args)
      });
    }
  }

}

// 运行示例
let ev = new EventEmitter();
const fun1 = (str) => {
    console.log(str);
}
ev.on('say', fun1);

ev.emit('say', 'visa');
```

**运行结果**

<img src="/designPattern/发布订阅者模式2.jpg" alt="发布订阅者模式1.jpg" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

### 实现off方法

`off` 方法用来删除事件队列里的回调函数

**示例**

```vbnet
vbnet
复制代码ev.off('say', fun1);
```

我们给`off`方法也传入了两个参数：

- `say`：事件名

- ```
  fun1
  ```

  ：回调函数

  > 即要删除的回调函数

**分析**

- 判断是否有订阅，即事件队列里是否有`say`这个类型的事件，没有的话就直接return
- 有`fun1`就仅仅删掉`fun1`这个消息

**代码**

```typescript
typescript复制代码class EventEmitter {
  constructor() {
    this.event = {

    }
  }
  on(type, cb) {
    if (!this.event[type]) {
      this.event[type] = [cb]
    } else {
      this.event[type].push(cb)
    }
  }
  once() {
  }
  emit(type, ...args) {
    if (!this.event[type])
      return
    else {
      this.event[type].forEach(cb => {
        cb(...args)
      });
    }
  }
  off(type, cb) {
    if (!this.event[type])
      return
    else {
      this.event[type] = this.event[type].filter(item => item !== cb)
    }
  }
}

// 运行示例
let ev = new EventEmitter();
const fun1 = (str) => {
  console.log(str);
}
ev.on('say', fun1);


ev.emit('say', 'visa');
ev.off('say', fun1);
console.log(ev);
ev.emit('say', 'visa222');
```

**运行结果** 
<img src="/designPattern/发布订阅者模式3.jpg" alt="发布订阅者模式1.jpg" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

可以看到，`fun1`这个方法在调用`off`方法时被删除了，以至于后面无法输出`visa222`

### 实现once方法

`once` 方法 只执行一次订阅的事件，然后移除

**示例**

```arduino
arduino
复制代码ev.once('say', fun1);
```

- 第一个参数`say`,订阅事件的类型
- 第二个参数`fun1`，仅发布一次发布

**分析**

**once()方法既要做到订阅发布，还只能发布一次**

> 这也即意味着后面订阅的事件要被删除

是不是感觉有点复杂，但别忘了

`订阅(on)`，`发布(emit)`以及`删除(off)`的方法我们已经实现过了呀,自己造的轮子自己不用可惜了~

**代码**

```typescript
typescript复制代码class EventEmitter {
  constructor() {
    this.event = {

    }
  }
  on(type, cb) {
    if (!this.event[type]) {
      this.event[type] = [cb]
    } else {
      this.event[type].push(cb)
    }
  }
  once(type, cb) {
    // 绑定的时fn, 执行的时候会触发fn函数
    let fn = () => {
      cb(); // fn函数中调用原有的callback
      this.off(type, fn); // 删除fn, 再次执行的时候之后执行一次
    }
    this.on(type, fn)
  }
  emit(type, ...args) {
    if (!this.event[type])
      return
    else {
      this.event[type].forEach(cb => {
        cb(...args)
      });
    }
  }
  off(type, cb) {
    if (!this.event[type])
      return
    else {
      this.event[type] = this.event[type].filter(item => item !== cb)
    }
  }
}


// 运行示例
let ev = new EventEmitter();
const fun1 = (str) => {
  console.log(str);
}

ev.once('say', fun1)
ev.emit('say', 'visa');
console.log(ev);
```

**结果**

<img src="/designPattern/发布订阅者模式4.jpg" alt="发布订阅者模式1.jpg" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

可以看到，空空如也~

## 完整代码

```typescript
typescript复制代码class EventEmitter {
  constructor() {
    this.event = {
    }
  }
  on(type, cb) {
    if (!this.event[type]) {
      this.event[type] = [cb]
    } else {
      this.event[type].push(cb)
    }
  }
  once(type, cb) {
    // 绑定的时fn, 执行的时候会触发fn函数
    let fn = () => {
      cb(); // fn函数中调用原有的callback
      this.off(type, fn); // 删除fn, 再次执行的时候之后执行一次
    }
    this.on(type, fn)
  }
  emit(type, ...args) {
    if (!this.event[type])
      return
    else {
      this.event[type].forEach(cb => {
        cb(...args)
      });
    }
  }
  off(type, cb) {
    if (!this.event[type])
      return
    else {
      this.event[type] = this.event[type].filter(item => item !== cb)
    }
  }
}



// 运行示例
let ev = new EventEmitter();
const fun1 = (str) => {
  console.log(str);
}

ev.on('say', fun1);
ev.once('say', fun1)
ev.emit('say', 'visa');
ev.off('say', fun1);
```

## 结尾

这道题经过这么梳理一遍之后，其实还是比较简单的，下次面试可不能写不出了哦，也希望能帮助到屏幕前的你哦~