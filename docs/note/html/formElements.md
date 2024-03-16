## 表单元素

> **表单元素都是 行块盒（display: inline-block）**



### input 元素

type= .....



### select 元素

下拉列表

- 内部只能是 option、optgroup 元素

- 可以通过 `<optgroup label="组名">` 进行分组

- 通过 `<select multiple>`  多选
- 通过 `selected` 布尔属性 设置 默认选中的 option

```html
<body>
	<select multiple>
   	<optgroup label="美食">
         <option>干炸里脊</option>
         <option>黄焖鸡</option>
         <option>糖醋排骨</option>
     	</optgroup>
     	<optgroup label="电影">
         <option selected>星际穿越</option>
         <option>奥本海默</option>
         <option>盗梦空间</option>
     	</optgroup>
	</select>
</body>
```



### textarea 元素

不要通过 col、row 控制宽高，使用 css 控制

css resize 设置 textarea 调整



### 按钮元素

`<button type="xxx"></button>`

type取值：

- reset
- submit：默认值
- button

页面中涉及到按钮的地方，用 button 元素做，兼容性好、语义强、功能强



### 配合表单元素的其他元素

#### :star: label 元素

普通元素，通常配合单选和多选框使用

可以通过 for 属性，让 label 元素关联一个表单元素，for 属性值为表单元素的 id 值（**显示关联**）

单选框 --- 性别选择：

> 最好使用 **隐式关联**，因为隐式关联是整个 label 区域点击都有效，用户体验更好，而且更有利于后面我们**自己设计 单选 多选框样式**

```html
<!-- 显示关联 -->
性别：
     <input id="radio_man" type="radio" name="gender">
     <label for="radio_man">男</label>

     <input id="radio_woman" type="radio" name="gender">
     <label for="radio_woman">女</label>

<!-- 隐式关联 -->
性别：
     <label>
        <input type="radio" name="gender"> 男
    </label>

    <label>
        <input type="radio" name="gender"> 女
    </label>
```



#### datalist 元素

数据列表



#### form 元素

通常，会将整个表单元素，放置在 form 元素内部，作用是当提交表单时，会将 form 元素内部的表单内容以合适的方式提交到服务器。

form 元素对于开发静态页面没有什么意义。



#### fieldset 元素

表单分组

将表单中有关联的表单元素分到一个组

```html
<body>
 <form action="https://www.baidu.com" method="get">
     <fieldset>
         <legend>用户信息</legend>
         帐号：<input type="text" name="user_account" placeholder="请输入帐号">
         密码：<input type="password" name="user_password" placeholder="请输入密码">
     </fieldset>

     <fieldset>
         <legend>任务信息</legend>
         任务名：<input type="text" name="task_name" placeholder="请输入任务名">
         任务描述：<input type="text" name="task_desc" placeholder="请输入任务描述">
     </fieldset>

     <input type="submit">
 </form>
</body>
```



### 表单状态

- readonly：只读
- disabled：禁用表单