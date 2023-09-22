# 颠覆认知的JavaScript

::: tip B站视频链接
[【前端开发】颠覆认知的JavaScript](https://www.bilibili.com/video/BV1zS4y1r7gZ/?spm_id_from=333.788&vd_source=6074db60c63978ad83d5bb9aa2fca372)
:::

## 基本语法、规范、错误、运算符、判断分支、注释
关于 `&&` 和 `||`
>只要 && 左边的表达式是true，就会一直往右走，直到最后，然后输出最后的表达式的值

>遇到 false 输出当前表达式的值，然后中止执行
```js
console.log(1 && 2 && 3) // 3
console.log(0 && 1 && 2) // 0
```
>应用：简化 if else
```js
if (1) {
    console.log(2)
}
// 等价于
1 && console.log(2)
```
------
>只要 || 左边的表达式是false，就会一直往右走，直到最后，然后输出最后的表达式的值

>遇到 true 输出当前表达式的值，然后中止执行
```js
console.log(1 || 2 || 3) // 1
console.log(0 || 1 || 2) // 1
```
>应用：给变量赋默认值（本质也是简化 if else）
```js
function getName(name) {
    // 1、不确定 name 是不是一个有意义的值
    // 2、对于 || 来说，无意义的值包括：0、''、false、null、undefined、NaN
    // 3、等价于 if(!name) myName = '马牛逼'
    const myName = name || '马牛逼'
    return myName
}
getName(0) // '马牛逼'
```


