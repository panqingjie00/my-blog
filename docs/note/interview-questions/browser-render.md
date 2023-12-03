# 浏览器渲染原理

### 渲染时间点

<img src="/duyi/image-20231115120400299.png" alt="image-20231115120400299.png" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

### 渲染流水线

<img src="/duyi/image-20231115120510042.png" alt="image-20231115120510042.png" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

 

### 渲染流程

#### 1、解析 HTML - Parse HTML

<img src="/duyi/image-20231115120942614.png" alt="image-20231115120942614" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

<img src="/duyi/image-20231115121525601.png" alt="image-20231115121525601" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />



> `StyleSheetList`代表所有样式表。
>
> HTML 中有哪些样式表？
>
> 1. `<style>...</style>` 内部样式表
> 2. `<link rel="stylesheet" href="xxx.css">` 外部样式表
> 3. `<div style="xxxx"></div>` 内联样式表
> 4. 浏览器默认样式表
>
> 以上四种样式表，在一个 HTML 文件中可能会出现多次，每一个都是一个`StyleSheet`，所有的 `StyleSheet`组成了一个 `StyleSheetList`



<img src="/duyi/image-20231115122733075.png" alt="image-20231115122733075" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

> 每一个`StyleSheet`都有一个或多个`StyleRule`样式规则
>
> 每一个`StyleRule`都有选择器`body h1`和`style`样式
>
> `style`样式就是所有的键值对`color: red; font-size: 3em; ....`
>
> 
>
> :warning:**注意：**除了`浏览器默认样式`以外，我们可以通过`js`操作所有的样式表。
>
> 通过`document.styleSheets`我们可以得到一个名为`StyleSheetList`的数组，里面包含了所有的样式表



**HTML 解析过程中遇到 CSS 代码怎么办？**

**为了提高解析效率，浏览器会启动一个预解析器率先下载和解析 CSS**

<img src="/duyi/image-20231115130133159.png" alt="image-20231115130133159" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

**HTML 解析过程中遇到 JS 代码怎么办？**

**渲染主线程遇到 JS 时必须暂停一切行为，等待下载执行完成后才继续**

**预解析线程可以分担一点下载 JS 的任务**

<img src="/duyi/image-20231115131721983.png" alt="image-20231115131721983" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />


#### 2、样式计算 - Recalculate Style


<img src="/duyi/image-20231115132128419.png" alt="image-20231115132128419" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

> 根据 继承、层叠 等规则，计算出最终样式
>
> 这里有两个很重要的知识点：
>
> 1. **css样式计算**
> 2. **包含块**



#### 3、布局 - Layout

<img src="/duyi/image-20231115142136787.png" alt="image-20231115142136787" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

​	**DOM 树 和 Layout 树不一定是一一对应的**

<img src="/duyi/image-20231115142308532.png" alt="image-20231115142308532" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

比如，声明为 `display: none`的元素不会出现在 Layout树 中

​<img src="/duyi/image-20231115150100634.png" alt="image-20231115150100634" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

声明了 `::before` 伪元素的不会出现在最终 DOM树 中，但是会出现在 Layout 布局树 中



<img src="/duyi/image-20231115150405157.png" alt="image-20231115150405157" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

> DOM树 转 Layout树 规则：
>
> - 内容必须在行盒中
> - 行盒和块盒不能相邻
> - 使用匿名行盒和匿名块盒占位



#### 4、分层 - Layer

<img src="/duyi/image-20231115160640177.png" alt="image-20231115160640177" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

> 分层的策略会受 **堆叠上下文有关的属性** 影响
>
> 如：z-index、opacity、transform 等
>
> 
>
> 当程序员觉得需要分层的部分（比如这个地方会频繁重绘），没有被浏览器分层时，可以通过 `will-change`来影响浏览器的分层策略
>
> ```html
> <style>
> .container {
>    will-change: transform;
> }
> </style>
> <body>
> <div class="container">
> 	.....
> </div>
> </body>
> ```



#### 5、绘制 - Paint

**这里的绘制，是为每一层生成如何绘制的指令**

<img src="/duyi/image-20231115162316706.png" alt="image-20231115162316706" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

  **渲染主线程的工作到此为止，剩余步骤交给其他线程完成**

<img src="/duyi/image-20231115162430199.png" alt="image-20231115162430199" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />



#### 6、分块 - Tiling

**分块会将每一层分为多个小的区域**

<img src="/duyi/image-20231115162827978.png" alt="image-20231115162827978" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

  

**分块的工作是交给多个线程同时进行的**

<img src="/duyi/image-20231115163113069.png" alt="image-20231115163113069" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

> 合成线程是在 渲染进程中的

#### 7、光栅化 - Raster

**光栅化是将每个块变成位图**

**优先处理靠近视口的块（优化）**

<img src="/duyi/image-20231115163652353.png" alt="image-20231115163652353" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />



**此过程会用到 GPU 加速**

<img src="/duyi/image-20231115164117622.png" alt="image-20231115164117622" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />



#### 8、画 - Draw

合成线程计算出每个位图在屏幕上的位置，交给 GPU 进行最终呈现

<img src="/duyi/image-20231115164640097.png" alt="image-20231115164640097" style="zoom: 50%;" />

#### 9、完整过程

<img src="/duyi/image-20231115165338321.png" alt="image-20231115165338321" style="zoom:67%;" />









### 面试题

#### 浏览器是如何渲染页面的？

当浏览器的网络线程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。

在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。

---

整个渲染流程分为多个阶段，分别是：HTML 解析、样式计算、布局、分层、绘制、分块、光栅化、画

每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入

这样，整个渲染流程就形成了**一套组织严密的生产流水线**

***

1、渲染的第一步是**解析 HTML**

解析过程中遇到 CSS 解析 CSS，遇到 JS 解析 JS。为了提高解析效率，浏览器在开始解析前，会启动一个预解析的线程，率先下载 HTML 中的外部 CSS 文件和外部的 JS 文件。



如果主线程解析到`link`位置，此时外部的 CSS 文件还没有下载解析好，主线程不会等待，继续解析后续的 HTML。这是因为下载和解析 CSS 的工作是在预解析线程中进行的。这就是 CSS 不会阻塞 HTML 解析的根本原因。



如果主线程解析到`script`位置，会停止解析 HTML，转而等待 JS 文件下载好，并将全局代码解析执行完成后，才能继续解析 HTML。这是因为 JS 代码的执行过程可能会修改当前的 DOM 树，所以 DOM 树的生成必须暂停。这就是 JS 会阻塞 HTML 解析的根本原因。



第一步完成后，会得到 DOM 树 和 CSSOM 树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在 CSSOM 树中。

---

2、渲染的下一步是**样式计算**

主线程会遍历得到的 DOM 树，依次为树中的每个节点计算出它最终的样式，称之为 Computed Style。

在这一过程中，很多预设值会变成绝对值，比如`red`会变成`rgb(255, 0, 0)`；相对单位会变成绝对单位，比如`em`变成`px`

这一步完成后，会得到一棵带有样式的 DOM 树。

---

3、接下来是**布局**，布局完成后会得到布局树。

布局阶段会依次遍历 DOM 树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。



大部分时候，DOM 树和布局树并非一一对应。

比如`display: none`的节点没有几何信息，因此不会生成到布局树；又比如使用了伪元素选择器，虽然 DOM 树中不存在这些伪元素节点，但它们拥有几何信息，所以会生成到布局树中。还有匿名行盒、匿名块盒等等都会导致 DOM 树和布局树无法一一对应。

---

4、下一步是**分层**

主线程会使用一套复杂的策略对整个布局树进行分层。



分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率。



滚动条、堆叠上下文、transform、opacity 等样式都会或多或少的影响分层结果，也可以通过`will-change`属性更大程度的影响分层结果。

---

5、再下一步是**绘制**

主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来。

---

6、**分块**

完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。

合成线程首先对每个图层进行分块，将其划分为更多的小区域。

它会从线程池中拿取多个线程来完成分块工作。

---

7、**光栅化**

分块完成后，进入光栅化阶段。

合成线程会将块信息交给 GPU 进程，以极高的速度完成光栅化。

GPU 进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。

光栅化的结果，就是一块一块的位图。

---

8、**画**

最后一个阶段就是画了

合成线程拿到每个层、每个块的位图后，生成一个个 `指引（quad）`信息。

指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形。

变形发生在合成线程，与渲染主线程无关，这就是`transform`效率高的本质原因。

合成线程会把 quad 提交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。



#### 什么是 reflow？

<img src="/duyi/image-20231115165602519.png" alt="image-20231115165602519" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

reflow 的本质就是重新计算 layout 树。



当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。



为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。



也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。



浏览器在反复权衡下，最终决定获取属性立即 reflow



```js
dom.width = '100px'
dom.height = '200px'
dom.margin = '10px'
dom.padding = '4px'
// 并不会每次更改都会触发 reflow，而是收集所有会触发 reflow的代码，包装成一个任务 加到 消息队列中

dom.clientWidth   // 一旦读取布局属性，就会立即触发 reflow，为了保证获取到最新的 布局信息
```

#### 什么是 repaint？

<img src="/duyi/image-20231115194049227.png" alt="image-20231115194049227" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

repaint 的本质就是重新根据分层信息计算绘制指令。

当改动了**可见样式后**，就需要重新计算，会引发 repaint。

由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。



#### 为什么 transform 效率高？

<img src="/duyi/image-20231115195924693.png" alt="image-20231115195924693" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery" />

 

因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个 draw 阶段

由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。