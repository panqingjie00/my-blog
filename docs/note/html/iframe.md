# iframe 元素

又叫 框架页

通常用于在网页中嵌入另一个页面

iframe 是可替换元素（跟之前的 img、video、audio 类似）

可替换元素的特点：

1. 通常是行盒
2. 通常显示的内容取决于元素的属性（如 src）
3. CSS 不能完全控制其中的样式（如 你不能控制 iframe 嵌入的网页的内容）
4. 具有行块盒的特点（可以设置宽高、垂直方向的margin等）

> 当我们把 a 标签的 `target` 属性，设置为一个 iframe 的 name 属性值时，点击 a 标签后会将跳转内容显示到指定的 iframe 中

```html
<style>
  iframe {
      width: 800px;
      height: 500px;
  }
</style>

<body>
<a href="https://player.bilibili.com/player.html?aid=792768862&bvid=BV18C4y1q7Uy&cid=1381833690&p=1"
  target="videoIframe">视频1</a>
<a href="https://player.bilibili.com/player.html?aid=622762317&bvid=BV1Nb4y1G76G&cid=1380533015&p=1"
  target="videoIframe">视频2</a>
<a href="https://player.bilibili.com/player.html?aid=367988175&bvid=BV1s94y1c7PP&cid=1386437498&p=1"
  target="videoIframe">视频3</a>
<iframe name="videoIframe"
  src="https://player.bilibili.com/player.html?aid=792768862&bvid=BV18C4y1q7Uy&cid=1381833690&p=1" scrolling="no"
  frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</body>
```

