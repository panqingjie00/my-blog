# 数据结构 笔试题总结
- 给定一个二叉树的root，确定它是否是一个完全二叉树  
>如：`[1, 2, 3, 4, 5, 6]`是完全二叉树，`[1, 2, 3, 4, 5, null, 7]`不是完全二叉树

- 二分查找
> while(left <= right)  
> if (target < arr[mid]) right = mid - 1  
> if (target > arr[mid]) left = mid + 1
***
- 哈夫曼树
> 1. 构造：给定一组向量，每次选取其中最小的两个，小的放左边，大的放右边
> 2. 例如：`[2, 4, 1, 3, 5]`
<img src="/markdownImgs/哈弗曼树1.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

> 3. 求解WPL：`(3 * 2 + 4 * 2 + 5 * 2) + (1 * 3 + 2 * 3) = 39`
> 4. 哈夫曼编码  
假设，`[2, 4, 1, 3, 5]` 为 `[A, B, C, D, E]` 每个字符出现的频率，基于上述构建的哈夫曼树，左子树全为 0，右子树全为 1。则得到下图
<img src="/markdownImgs/哈夫曼树3.png" alt="image-20221223180442317" style="zoom:100%;cursor:zoom-in" data-fancybox="gallery"/>

> 则 `ABC` 的编码为：`001 10 000` 
***
- 对递归程序的优化的一般的手段为
> 尾递归优化