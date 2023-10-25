# JavaScript 笔试题总结
- js 事件流
- XSS、CSRF
>内容安全策略（csp）：能防御 xss 攻击；  
cookie samesite属性：防止 CSRF 攻击和用户追踪（第三方恶意获取cookie）;
- Web Worker
>web worker 线程不能操作DOM，不能使用Document、window、parent这些对象，但是可以使用navigator对象和location对象。
- cookie 的 secure 和 htpOnly 属性
>httpOnly：设置了`httpOnly = true`的`cookie`不能给js获取到，无法使用`document.cookie`打出cookie的内容
secure：cookie 在 `secure = true`情况下只能用`https`协议发送给服务器，用`http`协议是不发送的。换句话说，cookie在https的情况下被创建，那它的`secure = true`，那么之后你一直用https访问其他页面，cookie会被发送到服务器，你无需重新登录就可以跳转到其他页面。但是如果你把url改成http协议访问其他页面，你就需要重新登录了，因为这个cookie不能在http协议中发送。
- 每个特定域名下最多生成的cookie个数有限制  ✔
>最多50个
- cookie 和 session
>cookie 和 seesion 都是用来跟踪浏览器用户身份的会话方式。  
>区别：
>1. 保持状态：cookie 保存在浏览器端，session 保存在服务器端。
>2. 使用方式：  
>（1）cookie机制：如果不在浏览器中设置过期时间，cookie被保存在`内存`中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie会保存到硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。  
>（2）session机制：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含`sessionId`。如果有sessionId，服务器将根据sessionId返回对应的session对象。如果客户端请求中没有sessionId，服务器会创建新的session对象，并把sessionId在本次响应中返回给客户端。通常使用cookie方式存储sessionId到客户端，在交互中浏览器按照规则将sessionId发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过`response.encodeURL(url)`进行实现；API对encodeURL的结束为，当浏览器支持cookie时，url不做任何处理；当浏览器不支持cookie时，将会重写URL将sessionId拼接到访问地址后。
>3. 存储内容：cookie只能保存字符串类型，以文本的方式；session通过类似于`Hashtable`的数据结构来保存，能支持任何类型的对象（session中可含有多个对象）
>4. 存储的大小：cookie-4kb；session 没有大小限制。
>5. 安全性：cookie 针对 cookie所存在的攻击：cookie欺骗、cookie劫持；session的安全性大于cookie  
原因如下：  
（1）sessionId存储在cookie中，若要攻破session首先要攻破cookie。  
（2）sessionId是要有人登录，或者启动`session_start`才会有，所以破解了cookie也不一定能得到sessionId。  
（3）第二次启动`session_start`后，前一次的sessionId就失效了，session过期后，sessionId也随之失效。  
（4）sessionId 是加密的。  
（5）综上所述，攻击者必须在短时间内攻破加密的sessionId，这很难。  
详情参考：https://blog.csdn.net/qq_39411208/article/details/102646086

- XSS 可以通过字符转义防御吗？ ✔

- cookie 是明文传递吗？
> http协议下cookie是明文传递的，https协议下cookie是密文传递的。
