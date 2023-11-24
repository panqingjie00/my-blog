### 继承

> 1、原型链继承

原理：通过将`子构造函数的原型`指向`父构造函数的实例对象`来实现



问题：所有子实例对象会共享父类**引用数据类型数据**的修改（本质上是`LHS[[PUT]]`机制的问题）



代码演示：

```js
function Parent() {
   this.a = '123';
}

Parent.prototype.b = function () {
   console.log('我是父类原型上的方法b');
}

function Child() {
   // 我想继承Parnet中的属性和方法
   // 要怎么做呢？
}
// 这样就可以了
Child.prototype = new Parent();
```

存在的问题：

```js
function Parent() {
   this.a = '父类实例对象的属性a';
   this.arr = [1, 2, 3];
}

const c1 = new Child();
const c2 = new Child();
// 修改了 c1的arr
c1.arr[0] = 0;

console.log(c1.arr);  // [0, 2, 3]
console.log(c2.arr);  // [0 ,2, 3]
```

> 2、借用构造函数继承

解决了：原型链继承 的实例共享引用数据修改的问题



原理：在`子构造函数`中通过`call(this)`来调用父构造函数并改变this指向，将父构造函数中的this指向子构造函数的this。



问题：无法继承父类原型对象上的属性和方法。



代码演示：

```js
function Parent() {
   this.a = [1, 2, 3];
}

Parent.prototype.b = function () {
   console.log('我是父类原型上的方法b');
}

function Child() {
   // 我想继承Parnet中的属性和方法
   // 要怎么做呢？
   Parent.call(this);
}
```

存在的问题：

```js
const c1 = new Child();
c1.b();  // undefinde
```

> 3、组合继承（伪经典继承）

解决了：构造函数继承 的无法继承父类原型对象上的属性和方法的问题。



原理：将 1、2 组合



问题：调用了两次父类构造函数，生成了两份实例。子构造函数的原型对象被覆盖。



代码演示：

```js
function Parent() {
   this.a = [1, 2, 3];
}

Parent.prototype.b = function () {
   console.log('我是父类原型上的方法b');
}

function Child() {
   // 方法1
   Parent.call(this);
}
// 方法2
Child.prototype = new Parent();
```

存在的问题：

```js
Child.prototype = new Parent();
const c1 = new Child();
```



> 4、寄生组合继承（经典继承）

解决了： 组合继承调用两次父类构造函数的问题、区分了子类和父类的构造函数、子类构造函数的原型对象被覆盖的问题



原理：通过`Object.create(xxx)`方法生成一个新的对象`obj`，这个对象继承自`xxx`



问题：目前来说最完美



代码演示：

```js
function Parent() {
   this.a = [1, 2, 3];
}

Parent.prototype.b = function () {
   console.log('我是父类原型上的方法b');
}

function Child() {
   Parent.call(this);
}
// Object.create() 是ES5 的方法，ES3不支持，需要 ployfill
if (!Object.create) {
   Object.create = function (proto) {
      function F() {};
      F.prototype = proto;
      return 
   }
}

// 以Parent.prototype对象为原型，生成了新的Child.prototype对象。Child.prototype继承了Parent.prototype的所有属性和方法。
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

> 5、ES6中的class继承
这个就不再赘述了