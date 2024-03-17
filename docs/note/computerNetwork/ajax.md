### 历史

浏览器本身就具备网络通信能力，但在早期，浏览器并没有把这个能力开放给 JS



最早是微软在 IE 浏览器中把这一能力向 JS 开放，让 JS 可以在代码中实现发送请求，这项技术在 2005 年被正式命名为 AJAX（Asynchronous Javascript And XML）



IE使用了一套 API 来完成请求的发送，这套 API 主要依靠一个构造函数完成。该构造函数的名称为 `XMLHttpRequest`，简称为`XHR`，所以这套API又称之为`XHR API`



由于`XHR API`有这诸多缺陷，在 HTML 5 和 ES6 发布后，产生了一套更完善的API来发送请求。这套API主要使用的是一个叫做`fetch`的函数，因此这套API又称之为`Fetch API`



**无论是`XHR` 还是 `Fetch` ，他们都是实现 ajax 的技术手段，只是API不同**