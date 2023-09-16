### 原型与原型链
> 放点东西占位
#### 由来
JS 中是没有 类（class）的，但是又想用 JS 进行面向对象编程，所以，引入了 `原型链`，利用 原型链 来 **模拟类**，实现面向对象编程。
#### 理解原型链的关键
::: tip 理解原型链的关键
- 理解`new`关键字的作用机制（写）
- 理解`[[GET]]`函数的机制（读）
:::
#### 前置知识
- **JS中所有对象都有`[[Prototype]]（__proto__）`隐式属性，如果是函数对象，则还有一个`prototype`显示属性。**<br>
`隐式属性`就是程序不能直接访问的属性，因此JS提供了`__proto__`这个属性来让我门使用`[[Prototype]]`，这俩是一个东西，就是名字不同。
- 构造函数
```js{4}
function foo() {
    console.log(1)
}
const a = new foo() // 当一个普通函数左侧加了 new 关键字，它就变成了一个 构造函数
```
#### new 关键字的执行流程
以上面的构造函数foo()为例
1. 绑定`this`为空对象

<img src="/markdownImgs/image-20221222190430489.png" alt="image-20221222190430489" style="zoom:60%;cursor:zoom-in"  data-fancybox="gallery"/>

2. 给空对象添加`[[Prototype]](__proto__)`隐式属性，并指向`new`后面函数（也就是foo()）的`prototype`属性。（这一步其实就是：`this.__proto__ = foo.prototype`）  
**注：这就是为什么所有对象都有`[[Prototype]]（__proto__）`这个属性，因为所有对象本质上都是`new`出来的，`new`的过程中就会给对象添加`[[Prototype]]`隐式属性。**

<img src="/markdownImgs/image-20221222220622661.png" alt="image-20221222220622661" style="zoom:67%;cursor:zoom-in" data-fancybox="gallery"/>

3. 正常执行函数
4. 如果函数返回的是基本类型，则返回`this`的值，否则返回原函数的返回值。  
**注：当前函数`foo`没有返回值，默认返回`undefined`，而`undefined`是基本类型，所以返回`this`**

#### [[GET]] 执行流程

```js{6}
function foo() {
   console.log(1);
}

let a = new foo();
a.b; //由上可知，a 指向 foo.prototype,其中并没有 属性 b，返回 undefined
```
> 思考一下，为什么`a.b`会返回`undefined`？
`a.b`访问对象属性的本质，其实是底层帮你调用了一个`[[GET]]`函数
1. 判断对象`a`中有没有属性
2. 如果没有，沿着原型链`a.__proto__`一直递归查找（注意，这时又触发了`[[GET]]`），如果最后没找到，返回`undefined`

<img src="/markdownImgs/image-20221222223431234.png" alt="image-20221222223431234" style="zoom:67%;margin-bottom: 30px;cursor:zoom-in" data-fancybox="gallery"/>

#### 原型链的应用
> **instanceof**

作用：判断 xxx 是不是 xxx 的一个实例
```js{7-8}
function Student(name, age, gender) {
   this.name = name;
   this.age = age;
   this.gender = gender;
}
var s1 = new Student('小明', 18, '男');
s1 instanceof Student; // true
s1 instanceof Object; // true
```
底层逻辑：
1. 判断`s1.__proto__ === Student.prototype`(true),`s1.__proto__ === Object.prototype`(false)
2. 如果为false则递归查询：`s1.__proto__ = Student.prototype` ==> `Student.prototype.__proto__ = Object.prototype`(true)

根据上述逻辑封装一个`myInstanceof`方法：
```js
// 参数：obj 为 instance 左边对象，Fun 为 instance 右边函数
Object.myInstanceof() = function (obj, Fun) {
    if (obj === null) return false

    if(obj.__proto__ === Fun.prototype) {
        return true
    } else {
        return Object.myInstanceof(obj.__proto__, Fun)
    }
}
// 因为使用 obj.__proto__属性效率很低，所以我们使用es新的Object.getPrototypeOf(obj)来获取到一个对象的原型链所指向的原型对象
Object.myInstanceof() = function (obj, Fun) {
    if (obj === null) return false

    if(Object.getPrototypeOf(obj) === Fun.prototype) {
        return true
    } else {
        return Object.myInstanceof(Object.getPrototypeOf(obj), Fun)
    }
}
```

> **数组和类数组**

<mark>数组、类数组的本质都是对象</mark>

```js
// 字面量方式创建数组
let arr = [1, 2, 3]
// 等价于下面的对象
arr = {
    '0': 1,
    '1': 2,
    '2': 3,
    length: 3,
    [[Prototype]]: Array.prototype  //或__proto__: Array.prototype
}
// 类数组
arr_like = {
    '0': 1,
    '1': 2,
    '2': 3,
    length: 3
    [[Prototype]]: xxxxx   // 原型链不知道指向谁，反正不是 Array.prototype   
}
```

由上可知，**数组和类数组的区别主要是原型链的指向不同，数组一定指向`Array.prototype`，但是类数组不指向**

这样会造成一个问题：类数组访问不到`Array.prototype`中的方法。为了解决这个问题我们需要把类数组转换成数组。

> **隐式原型的修改**

- 浏览器提供：`__proto__`
- ECMA：`Object.getPrototypeOf(obj)` 等价于 `obj__proto__`但效率更高
- ECMA：`Object.setPrototypeOf(obj, obj)` 这个一般不要用，原因如下（引用自MDN）
::: warning ⚠️警告
由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]] 在各个浏览器和 JavaScript 引擎上都是一个**很慢**的操作。此外，修改继承的影响是微妙和广泛的，并不仅限于在 Object.setPrototypeOf(...) 语句上的时间花费，而是可能扩展到任何访问已更改 [[Prototype]] 属性的对象的代码。你可以在 [JavaScript 引擎基础知识：优化原型](https://mathiasbynens.be/notes/prototypes)中了解更多信息。

由于这个特性是语言的一部分，因此引擎开发人员实现该特性的性能（理想情况下）仍然是一个负担。在引擎开发人员解决这个问题之前，如果你担心**性能问题**，应该避免设置对象的 [[Prototype]] 属性。而是使用 **Object.create() 创建一个具有所需 [[Prototype]] 属性的新对象**。
:::
- `Object.create(obj)`返回一个以 obj 为原型的新对象，等价于：
```js
let newObj = {}
Object.getPrototype(newObj) = obj
// 注：如果 obj 为 function，则
Object.getPrototype(newObj) = obj.prototype // Object.create(obj.prototype)
```

> **LHS、RHS（状态的读写）[[GET]]、[[PUT]]**

```js
let b = 2; // 将 2 写入 b，LHS左查询 用 [[PUT]]
let a = b; // 先读 b，用 RHS右查询 用 [[GET]]，再写入 a，LHS左查询 用 [[PUT]]
```
上面已经有`[[GET]]`的执行流程，这里不再赘述。

**[[PUT]] LHS 的执行流程用一张图概括：**

<img src="/markdownImgs/image-20221223180442317.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

**简单总结一句话：如果是 `基本类型`、`引用类型的引用`、`原型链最终没有找到`这三种情况，则都是在自身对象创建一个同名属性覆盖掉。如果是访问引用数据类型内的数据，则修改访问数据**

<br/>

#### 相关面试题
<br/>

##### 1. 阿里四面真题
```js{15,20,25,28}
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

##### 2. 输出什么？
```js{5}
function A() {}

A.prototype.n = 3;
A.prototype.add = function () {
   this.n++;  //重点是这里要 拆解成：this.n = this.n + 1; 因此要先用 RHS[[GET]] 获取到 this.n 的值+1，然后在 LHS[[PUT]] 修改 this.n
}

var a = new A();
var b = new A();
var c = new A();

a.add();
b.add();

console.log(a.n,b.n,c.n);
```
::: details 点击查看答案
```js
4, 4, 3
```
:::

##### 3. 输出什么？
```js{11}
function A() {}

A.prototype.m = { t: 1 };
A.prototype.add = function() {
   this.m = {};
}

var a = new A();
a.add();

console.log(a.m.t);
```
::: details 点击查看答案
```js
undefined
```
:::

##### 4. 比较相等吗？
```js
function Person(name, age) {
   this.name = name;
   this.age = age;
   this.eat = function() {
      console.log(age + '岁的' + name + '在吃饭。');
   }
}

Person.run = function() {} //静态方法
Person.prototype.walk = function() {}

let p1 = new Person('xiaoming', 18);
let p2 = new Person('xiaoming', 18);

console.log(p1.eat === p2.eat);
console.log(p1.run === p2.run);
console.log(p1.walk === p2.walk);
```
::: details 点击查看答案
```js
false
true
true
```
:::

##### 5. foo1能访问到哪些属性？
```js
function foo() {
   this.some = '222'
   let ccc = 'ccc'
   foo.obkorol = 'obkorol'
   foo.prototype.a = 'aaa'
}

foo.koro = '扣肉';

foo.prototype.test = 'test';

let foo1 = new foo();
foo.prototype.test = 'test2';

//问：foo1 访问到哪些属性？
```
::: details 点击查看答案
```js
// 能访问到以下3个属性：
some: '222', a: 'aaa', test: 'test2'
```
:::