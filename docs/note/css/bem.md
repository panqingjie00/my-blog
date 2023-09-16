# BEM 架构
## 介绍
BEM 即为块级元素修饰字符（Block Element Modifier）。在 BEM 中，一个块，例如一个按钮、菜单或者标志，就是独立的实体。一个元素就像一个列表项或者标题一样，被绑定到它所在的块。修饰字符是标记到一个块或者元素的标识，能够改变样式或者行为。你能认出使用 BEM 的代码，因为代码中在 CSS 的类里使用了多余的一个下划线和连字符。例如看看这个来自关于BEM 命名常规的页面里面的 HTML 所应用的类：
## 事例
利用 `sass` 做一个 `BEM` 的小例子：

环境描述：vite 搭建的 vue-cli

- 在 `src`目录下创建`bem.scss`文件
```scss
$namespace: 'xm' !default; // $xxx: xxx 是 sass中定义变量的语法，!default 可以理解为 定义的变量是常量
$block-sel: '-' !default; // B block 用 - 表示
$elem-sel: '__' !default; // E element 用 __ 表示
$mod-sel: '--' !default; // M modefiy 用 -- 表示

// <div class="xm-block">

// .xm-block {
//     display: block;
// }

@mixin b($block) {
    $B: #{$namespace + $block-sel + $block}; // 命中class：对应 上述 中的 <div class="xm-block">

    .#{$B} {
        @content; // @content是占位符，.$B: .xm-block，对应上述中的 .xm-block { display: block; }，@content 到时候就会替换成 display: block;
    }
}


// .xm-block__inner {

// }

@mixin e($el) {
    $selector: &;

    // 利用 @at-root 跳出嵌套，如果不用@at-root，编译后 为：.xm-block .xm-block__inner {...}，加了 @at-root后为：.xm-block__inner {...}
    @at-root {
        #{$selector + $elem-sel + $el} {
            @content;
        }
    }
}

// .xm-button--danger {

// }

@mixin m($m) {
    $selector: &;

    @at-root {
        #{$selector + $mod-sel + $m} {
            @content;
        }
    }
}
```

- 在组件`App.vue`中使用
```vue
<template>
  <div class="xm-test">
    BBBBBBB
    <div class="xm-test__inner">EEEEEEE</div>
    <div class="xm-test--warning">MMMMMMM</div>  
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@include b(test) {
  color: red;
  @include e(inner) {
    color: blue;
  }
  @include m(info) {
    color: gray;
  }
  @include m(warning) {
    color: orange;
  }
  @include m(success) {
    color: green;
  }
  @include m(danger) {
    color: red;
  }
}
</style>
```
