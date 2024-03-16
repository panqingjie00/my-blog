## 美化表单元素

### 1. :focus

元素聚焦时的样式

可以通过 `tabindex` 改变聚焦顺序



### 2. :checked

元素选中时的样式

一般用来表示单选或多选框被选中时的样式



### 3. 常见用法

1. 重置表单元素样式

2. 设置 textarea 是否允许调整尺寸

   css 属性 resize

   - both：默认值。两个方向都可以调整尺寸
   - none：不能调整尺寸
   - horizontal：水平方向可以调整尺寸
   - vertical：垂直方向可以调整尺寸

3. 文本框边缘到内容的距离

   - padding
   - text-indent

4. :star:**控制单选和多选的样式**

   使用 `:checked` 伪类 和 `label 隐式关联` 实现单选和多选框样式的改变