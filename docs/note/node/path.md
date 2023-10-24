# path 路径模块
## 1. 什么是 path 路径模块
**path 模块**是 Node.js 官方提供的、用来**处理路径**的模块。他提供了一系列的方法和属性，用来满足用户对路径的处理需求。  
例如：
- `path.join()`方法，用来**将多个路径片段拼接成一个完整的路径字符串**
- `path.basename()`方法，用来从路径字符串中，将文件名解析出来

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它：
```js
const path = require('path')
```
## 2. 路径拼接
### 2.1 path.join() 的语法格式
使用 path.join() 方法，可以把多个路径片段拼接成完整的路径字符串，语法格式如下：
```js
path.join([...paths])
```
参数解读：
- ...paths`<string>` 路径片段的序列
- 返回值：`<string>`

### 2.2 path.join() 的代码示例
使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串：
```js
const pathStr = path.join('/a', '/b/c', '../', './d', 'e')
console.log(pathStr) // 输出 \a\b\d\e  ../ 抵消了 /c  每个 ../ 会抵消前面的一层路径

const pathStr2 = path.join(__dirname, './files/1.txt')
console.log(pathStr2) // 输出 当前文件所处目录\files\1.txt
```
注意：**今后凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理**。不要直接使用 + 进行字符串的拼接。

## 3. 获取路径中的文件名
### 3.1 path.basename() 的语法格式
使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：
```js
path.basename(path[, ext])
```
参数解读：
- path：文件存放路径
- ext：扩展名，如 不传 ext 返回 index.html，加了 (path, '.html') 输出 index 

### 3.2 path.basename() 的代码示例
使用 path.basename() 方法，可以从一个文件路径中，获取到文件的名称部分：
```js
const fpath = '/a/b/c/index.html' // 文件的存放路径

let fullNmae = path.basename(fpath)
console.log(fullName) // 输出 index.html

let nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // 输出 index
```

## 4. 获取路径中的文件扩展名
### 4.1 path.extname() 的语法格式
使用 path.extname() 方法，可以获取路径中的扩展名部分，语法格式如下：
```js
path.extname(path)
```
参数解读：
- path：string 必选参数，表示一个路径的字符串
- 返回：string 返回得到的扩展名字符串
### 4.2 path.extname() 的代码示例
使用 path.extname() 方法，可以获取路径中的扩展名部分：
```js
const fpath = '/a/b/c/index.html'  // 路径字符串

const fext = path.extname(fpath)
console.log(fext)  // 输出 .html
```
