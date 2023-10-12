# Node基础

## http
引入`http`模块，在本地3000端口(`localhost:3000`)开启一个服务，并打印`Hello World!!`。
```js
// 1、引入 http 模块
let http = require("http")

// 2、用 http 模块创建服务
/* 
* req 获取 url 信息（request）
* res 浏览器返回的响应信息（response）
*/
http.createServer(function (req, res) {
    // 设置 http 头部，状态码是200，文件类型是 html，字符集是 utf-8
    res.writeHead(200, {
        "Content-Type": "text/html;charset=UTF-8"
    })

    // 往页面打印值
    res.write('<h1 style="text-align:center">Hello World!!</h1>')

    // 结束响应
    res.end()
}).listen(3000, () => console.log("service on 3000 port......"))  // 监听端口 和 控制台输出信息
```

