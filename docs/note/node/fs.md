# 文件系统模块
## 1 什么是fs文件系统模块
fs模块是 Nodejs 官方提供的、用来操作文件的模块。他提供了一系列的方法和属性，用来满足用户对文件的操作需求。  
例如：
- `fs.readFile()`方法，用来**读取**指定文件的内容
- `fs.writeFile()`方法，用来向指定的文件中**写入**内容

如果要在 JavaScript 代码中，使用 fs模块来操作文件，则需要使用如下的方式先导入它：
```js
const fs = require('fs')
```

## 2 读取指定文件中的内容
### 2.1 fs.readFile() 的语法格式
使用`fs.readFile()`方法，可以读取指定文件中的内容，语法格式如下：
```js
fs.readFile(path[, oprions], callback)
```
参数解读：
- 参数1：**必选**参数，字符串，表示文件的路径
- 参数2：可选参数，表示以什么编码格式来读取文件
- 参数3：**必选** 参数，文件读取完成后，通过回调函数拿到读取的结果
### 2.2 fs.read() 的示例代码
以`utf-8`的编码格式，读取指定文件的内容，并打印 err 和 dataStr 的值：
```js
const fs = require('fs')
fs.readFile('./files/11.txt', 'utf-8', function(err, dataStr) {
    console.log(err)
    console.log('----------')
    console.log(dataStr)
})
```
### 2.3 判断文件是否读取成功
可以判断 err 对象是否为 null，从而知晓文件读取的结果：
```js
const fs = require('fs')
fs.readFile('./files/1.txt', 'utf-8', function (err, result) {
    if (err) {
        return console.log('文件读取失败！' + err.message)
    }
    console.log('文件读取成功，内容是：' + result)
})
```

## 3 向指定的文件中写入内容
### 3.1 fs.write() 的语法格式
使用`fs.writeFile()`方法，可以向指定的文件中写入内容，语法格式如下：
```js
fs.write(file, data[, options], callback)
```
参数解读：
- 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- 参数2：必选参数，表示要写入的内容。
- 参数3：可选参数，表示以什么格式写入文件内容，默认值是 utf-8



