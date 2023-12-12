最近在B站看了几个 js 继承的视频，一般第一个讲的都是原型链继承，基本就没有说对的。
### 原型链继承

话不多说，先上代码：
```js
function Parent() {
    this.a = 123;
}

Parent.prototype.b = function() {
    console.log('方法 b');
}

function Child() {

}

Child.prototype = new Parent();
```
由以上代码可知，通过将**子构造函数的原型**指向**父构造函数的实例对象**，实现了原型链继承。

通过这种方式，`Child`的实例对象们，可以通过原型链访问到父类的所有属性和方法。

### 原型链继承存在的问题：
当子构造函数只有一个实例对象时，这种方法是没有什么问题的。

当有多个实例对象时，会存在某一个实例修改数据，其他实例的数据也会跟着改变的问题。

但是，这个问题只存在于，**对引用数据类型中的数据的修改，原始数据类型的修改和引用的修改都不会出现这个问题。**


<img src="/js/proto-inherit1.jpg" alt="image-20231113220141828" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

什么意思？让我们来看下代码：

>1、当实例修改原始数据类型时

```js
const c1 = new Child();
const c2 = new Child();
c1.a = '456';
console.log(c2.a);

// 控制台打印
// 123
```
可见`c1`修改`a`并没有影响`c2`

>2、当实例修改引用数据类型的引用

```js
// 我们为 Parent 添加一个 引用数据类型 arr
function Parent() {
    this.a = '123';
    this.arr = [1, 2, 3];
}

const c1 = new Child();
const c2 = new Child();
c1.arr = ['a', 'b', 'c'];
console.log(c2.arr);

//控制台打印
// [1, 2, 3]
```
可见`c1`修改`arr`的引用，并没有影响到`c2`

>3、当实例修改引用数据类型中的数据时

```js
// 我们为 Parent 添加一个 引用数据类型 arr
function Parent() {
    this.a = '123';
    this.arr = [1, 2, 3];
}

const c1 = new Child();
const c2 = new Child();
c1.arr.push(4);
console.log(c2.arr);

//控制台打印
// [1, 2, 3, 4]
```
哎，这就有问题了，`c1`修改引用数据类型中的数据，影响了`c2`


### 原型链继承问题的本质：

#### 变量的查找方式：
我们都知道，JS 在执行过程中，是到**作用域（词法环境）** 中去查找变量。

查找的方式有两种：
- LHS
- RHS

因为`LHS`和`RHS`是相对于赋值号`=`左右两侧来说的，所以我们可以简单理解为：
- LHS：当遇到赋值操作时，执行LHS查询
- RHS：当遇到读取值操作时，执行RHS查询

举例：
```js
let a = 1;  // 对 a 赋值 1，这是一个 LHS

let a = b; // 先 RHS 获取 b 的值，再 LHS 赋值给 a

function fn(x) {
  ...
}
fn(1);   // 当实参传递给形参，也是 LHS

console.log(c); // 首先 RHS 查找对象console，然后 RHS 查找函数 log，然后 RHS 查找变量 c，最后输出 
```
通过以上几个简单的例子，我们应该清楚了什么是 LHS、RHS

PS：LHS 查询实际上是执行一个 `[[PUT]]`隐式函数，RHS 查询是执行 `[[GET]]`隐式函数


#### 查找流程：

对于变量的查找，就是沿着**作用域链查找**，跟以下讲的原型链查找是不一样的，这里我们不多赘述。

我们着重讲对于对象属性的查找（**原型链查找**）。

>RHS 的查找流程

以上述代码中的片段为例：
```js
c1.a
```
- 首先，在 c1 本身查找，如果找到就ok了，如果没有，沿着原型链找
- c1 原型链指向 Child 的原型（`c1.__proto__ ==> Child.prototype`）
- 如果 `Child.prototype` 有就ok，没有继续沿着原型链找
- 因为`Child.prototype = new Parent()` ，所以在这里我们找到了 a，值为 ‘123’
- 如果直到最后的 `Object.prototype = null`，还没有找到，则返回 `undefined`

以上 RHS 查询是比较简单的，我们就直接写出来了

LHS查询是比较麻烦一点的，下面我们用一张`图`来演示

>LHS 的查找流程

以上述代码中的片段为例：
```js
c1.a = '456';
```

<img src="/js/proto-inherit2.jpg" alt="image-20231113220141828" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

上图为 LHS 查询对象属性的流程

根据上图，我们再来看原型链继承中的 3 种实例修改数据的情况：

>1、当实例修改原始数据类型时

```js
const c1 = new Child();
const c2 = new Child();
c1.a = '456';
console.log(c2.a);

// 控制台打印
// 123
```
LHS，c1 对象本身是没有 a 属性的，因此我们沿着原型链找，最终找到了 a，又因为 a 是一个**原始数据类型**（因为 this.a = '123'），因此，我们**不使用**原型链找到的这个 a，而是在我 c1 对象本身创建一个属性 a，然后赋值为 ‘456’。

不信我们看控制台输出（c1对象）：

<p align=center><img src="/js/proto-inherit3.jpg" alt="image-20231113220141828" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/></p>

原本，c1 对象本身是没有任何属性，但是执行了 `c1.a = '456'`后，由于 `LHS` 查询机制，在 c1 对象本身创建了 a = ‘456’


>2、当实例修改引用数据类型的引用

```js
// 我们为 Parent 添加一个 引用数据类型 arr
function Parent() {
    this.a = '123';
    this.arr = [1, 2, 3];
}

const c1 = new Child();
const c2 = new Child();
c1.arr = ['a', 'b', 'c'];
console.log(c2.arr);

//控制台打印
// [1, 2, 3]
```

LHS，c1 没有 arr，沿着原型链找，最终找到了 arr，因为 arr 是一个**引用数据类型**，又因为我们是直接**修改引用本身**，因此，我们**覆盖**

不信看控制台输出（c1对象）：

<p align=center><img src="/js/proto-inherit4.jpg" alt="image-20231113220141828" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/></p>


>3、当实例修改引用数据类型中的数据时

```js
// 我们为 Parent 添加一个 引用数据类型 arr
function Parent() {
    this.a = '123';
    this.arr = [1, 2, 3];
}

const c1 = new Child();
const c2 = new Child();
c1.arr.push(4);
console.log(c2.arr);

//控制台打印，    注意：c2 被影响
// [1, 2, 3, 4]
```

LHS，同以上流程，找到了 arr，因为 arr 是一个引用数据类型，且是对引用数据类型中数据的修改，那我们就**直接修改原型链上找到的这个 arr**

也就是说，c1 修改了父类原型中的数据，导致 c2 被影响

以上，就是原型链继承，实例共享数据修改问题的本质原因。

仅仅一个原型链继承就写了这么多，还有好多知识没有扩展出来仔细讲解。

第一次写文章，必然有很多很多问题和不足，希望掘友多多指教，感谢

<img src="/js/proto-inherit5.jpg" alt="image-20231113220141828" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>