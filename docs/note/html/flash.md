# 在页面中使用 flash

可以通过 `<object></object>` 或 `<embed>` 元素 嵌入 flash

```html
<body>
   <!-- 
     data：要嵌入的 flash 文件
     type：flash文件的 MIME
   -->
   <object data="./example.swf" type="application/x-shockwave-flash">
     <!-- 通过 param 给 flash 程序传值 -->
     <param name="quality" value="high">
   </object>

   <!-- 
     src：要嵌入的 flash 文件
     type：flash文件的 MIME
     quality="high" 《===》 object：<param name="quality" value="high">
   -->
   <embed src="./example.swf" type="application/x-shockwave-flash" quality="high">
</body>
```



> :warning:：因为有的浏览器不识别 object 或 embed

兼容性写法：

```html
<body>
    <object data="./example.swf" type="application/x-shockwave-flash">
        <param name="quality" value="high">
        <!-- 将 embed 写在 object 里面 -->
        <embed src="./example.swf" type="application/x-shockwave-flash" quality="high">
    </object>
</body>
```

