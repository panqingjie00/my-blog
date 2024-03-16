# 图片元素

`<img src="" alt="">`

- 和 `a` 联用

  当需要点击图片跳转到某个页面时，可以在`img`外套一层`a`

  ```html
  <a href="https://zh.wikipedia.org/wiki/%E5%A4%AA%E9%98%B3%E7%B3%BB" target="_blank">
    <img src="https://www.108hei.com/wp-content/uploads/2022/09/2022090604455362.jpg">
  </a>
  ```

- 和`map`联用，area

  当需要点击图片中的不同区域跳转到不同页面时，可以使用`map`

  ```html
  <a href="https://zh.wikipedia.org/wiki/%E5%A4%AA%E9%98%B3%E7%B3%BB" target="_blank">
    <img usemap="#sun" src="https://www.108hei.com/wp-content/uploads/2022/09/2022090604455362.jpg">
  </a>
  
  <map name="sun">
    <area shape="circle" coords="246,255,33" href="https://zh.wikipedia.org/wiki/%E5%9C%B0%E7%90%83" alt="地球">
  </map>
  ```

- 和`figure`联用，figcaption

  > 详见：[MDN-figure](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)

  ```html
  <!-- 有标题的图像 -->
  <figure>
    <img
      src="/zh-CN/docs/Web/HTML/Element/figure/favicon-192x192.png"
      alt="The beautiful MDN logo." />
    <figcaption>MDN Logo</figcaption>
  </figure>
  ```

  