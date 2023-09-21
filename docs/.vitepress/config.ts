import { defineConfig } from 'vitepress'
import mdItCustomAttrs from 'markdown-it-custom-attrs'  // 引入 markdown-it 自定义属性插件


export default defineConfig({
    title: 'GravityDocs',
    titleTemplate: '一站式前端内容网站，包括学习路线、知识体系',
    // 页签图标
    head: [
        ['link', { rel: 'icon', href: '../public/favicon.ico' }],
        // cdn 方式 引入 fancybox js 和 css 文件（图片放大预览功能）
        [
            "link",
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },
        ],
        ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }],
    ],
    // 网站描述
    description: '一个基于VitePress构建的个人博客网站',
    // 开启/关闭 最后更新时间
    lastUpdated: true,
    themeConfig: {
        siteTitle: 'GravityDocs',  // 网站标题
        logo: '/my-logo.png',  // 网站logo
        // 在大纲中显示的标题级别  number | [number, number] | 'deep' | false
        outline: 'deep',
        // 自定义右侧边栏的标题
        outlineTitle: '当前页导航',
        docFooter: {
            prev: '上一篇',
            next: '下一篇',
        },
        // 顶部栏导航栏
        nav: [
            { text: '💭 我的笔记', link: '/note/', activeMatch: '/basis/' },
            {
                text: '🔥 专栏',
                items: [
                    { text: '🔥 前端算法', link: '/algorithm/guide/' },
                    { text: '🔥 设计模式', link: '/patterns/guide/' },
                    { text: '📋 面试大全', link: '/interview/' },
                ]
            },
            {
                text: '编程',
                items: [
                    { text: '⭐ 资源导航', link: '/favorites/front-end/' },
                    { text: '💻 编程学习', link: '/program/' },
                    { text: '🔧 编程工具', link: '/tool/' },
                ],
            },
            {
                text: '洞见',
                items: [
                    { text: '✏️ 随笔', link: '/essay/' },
                    { text: '🌱 青葱岁月', link: '/green/ch' },
                    { text: '📄 毕业论文', link: '/paper/' },
                ],
            },
            {
                text: `v0.2.3`,
                items: [
                    { text: '🧱 参与贡献', link: '/contributing' },
                    { text: '🎉 更新日志', link: `https://github.com/panqingjie00/releases` },
                ],
            },
        ],
        // 社交连接：github、bilibili
        socialLinks: [
            { icon: 'github', link: 'https://github.com/panqingjie00' },
            // You can also add custom icons by passing SVG as string:
            {
                icon: {
                    svg: '<svg t="1694332343546" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5648" width="200" height="200"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" p-id="5649"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" p-id="5650"></path></svg>'
                },
                link: 'https://space.bilibili.com/200297467?spm_id_from=333.1007.0.0',
                // You can include a custom label for accessibility too (optional but recommended):
                // ariaLabel: 'cool link'
            }
        ],
        // 侧边栏导航
        sidebar: {
            // This sidebar gets displayed when a user
            // is on `guide` directory.
            '/basis/': [
                {
                    text: '前端基础-HTML',
                    link: '/basis/',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: 'HTML1', link: '/basis/html-one' },
                        { text: 'HTML2', link: '/basis/html-two' },
                        { text: 'HTML3', link: '/basis/html-three' }
                    ]
                },
                {
                    text: '前端基础-CSS',
                    collapsed: false,
                    items: [
                        { text: 'CSS1', link: '/basis/css-one' },
                        { text: 'CSS2', link: '/basis/css-two' },
                        { text: 'CSS3', link: '/basis/css-three' }
                    ]
                },
                {
                    text: '前端基础-JavaScript',
                    collapsed: false,
                    items: [
                        { text: 'JavaScript1', link: '/basis/js-one' },
                        { text: 'JavaScript2', link: '/basis/js-two' },
                        { text: 'JavaScript3', link: '/basis/js-three' }
                    ]
                }
            ],
            // 专栏 - 面试大全
            '/interview/': [
                {
                    text: '介绍',
                    link: '/interview/',
                },
                {
                    text: '模拟面试',
                    collapsed: false,
                    items: [
                        { text: '介绍', link: '/interview/interviewer/' },
                        { text: '模拟面试 01', link: '/interview/interviewer/01' },
                        { text: '模拟面试 02', link: '/interview/interviewer/02' },
                        { text: '模拟面试 03', link: '/interview/interviewer/03' }
                    ]
                },
                {
                    text: '春招实习',
                    collapsed: false,
                    items: [
                        { text: '询问面试官的问题', link: '/interview/spring-internship/interviewer/' },
                        { text: '腾讯一面', link: '/interview/spring-internship/tencent-imweb/' },
                        { text: '字节一面准备', link: '/interview/spring-internship/bytedance-preparation/' },
                        { text: '字节一面', link: '/interview/spring-internship/bytedance1/' },
                        { text: '深信服-星耀实习', link: '/interview/spring-internship/sangfor/' },
                        { text: '恒生电子面试', link: '/interview/spring-internship/hundsun/' },
                        { text: '腾讯云 COS 一面', link: '/interview/spring-internship/tencent-cos/' },
                        { text: '春招知识整理', link: '/interview/spring-internship/summary/' },
                    ]
                },
                {
                    text: '2023 面试合集',
                    collapsed: false,
                    items: [
                        { text: 'isolcat 三月实习', link: '/interview/isolcat/' },
                        { text: 'HearLing 六月社招', link: '/interview/2023/hearling' }
                    ]
                },
                {
                    text: 'React',
                    collapsed: false,
                    items: [
                        { text: '模拟面试', link: '/interview/react-summary/' }
                    ]
                },
                {
                    text: 'Vue',
                    collapsed: false,
                    items: [
                        { text: '模拟面试', link: '/interview/vue/' }
                    ]
                },
                {
                    text: '前端基础: js/html/css/ts',
                    collapsed: false,
                    items: [
                        { text: 'JS 面试大全', link: '/interview/js/' },
                        { text: 'JS 自测清单（一）', link: '/interview/js/test/1' },
                        { text: 'JS 自测清单（二）', link: '/interview/js/test/2' },
                        { text: 'JS 自测清单（三）', link: '/interview/js/test/3' },
                        { text: 'CSS 面试', link: '/interview/js/css' },
                        { text: 'HTML 面试', link: '/interview/js/html' },
                        { text: 'TS 面试', link: '/interview/js/ts' }
                    ]
                },
                {
                    text: '操作系统/网络/浏览器',
                    collapsed: false,
                    items: [
                        { text: '操作系统', link: '/interview/system/' },
                        { text: '网络-TCP', link: '/interview/network/tcp/' },
                        { text: '网络-HTTP', link: '/interview/network/http/' },
                        { text: '网络-Websocket', link: '/interview/network/websocket/' },
                        { text: '网络-跨域问题', link: '/interview/network/cors/' },
                        { text: '浏览器-Session/Cookie/Token', link: '/interview/browser/cookie' },
                        { text: '浏览器-事件循环', link: '/interview/browser/principle/eventLoop' },
                        { text: '浏览器-输入URL到页面展示发生了什么', link: '/interview/browser/process/' },
                        { text: '浏览器-缓存', link: '/interview/browser/cache' },
                        { text: '浏览器-开发者工具', link: '/interview/browser/performance' },
                        { text: '浏览器-安全', link: '/interview/browser/safety/' }
                    ]
                },
            ],
            // 专栏 - 前端算法
            '/algorithm/': [
                { text: '导读', link: '/algorithm/guide/' },
                { text: '数据结构', link: '/algorithm/guide/dataStructure' },
                {
                    text: 'Hash Table 哈希表',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '介绍', link: '/algorithm/hash-table/' },
                        { text: '1.两数之和', link: '/algorithm/hash-table/1' },
                        { text: '3. 无重复字符的最长子串', link: '/algorithm/hash-table/3' },
                        { text: '136. 只出现一次的数字', link: '/algorithm/hash-table/136' },
                        { text: '349. 两个数组的交集', link: '/algorithm/hash-table/349' },
                        { text: '560. 和为 K 的子数组 ', link: '/algorithm/hash-table/560' }
                    ]
                },
                {
                    text: 'Stack 栈',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '20. 有效的括号', link: '/algorithm/stack/20' },
                        { text: '739. 每日温度', link: '/algorithm/stack/739' },
                        { text: '901. 股票价格跨度', link: '/algorithm/stack/901' },
                        { text: '907. 子数组的最小值之和', link: '/algorithm/stack/907' },
                        { text: '921. 使括号有效的最少添加', link: '/algorithm/stack/921' },
                        { text: '946. 验证栈序列', link: '/algorithm/stack/946' },
                        { text: '1190. 反转每对括号间的子串', link: '/algorithm/stack/1190' },
                        { text: '1249. 移除无效的括号', link: '/algorithm/stack/1249' }
                    ]
                },
                {
                    text: 'Queue 队列',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '933. 最近的请求次数', link: '/algorithm/queue/933' },
                    ]
                },
                {
                    text: 'Backtracking 递归与回溯',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '08.08. 有重复字符串的排列组合', link: '/algorithm/recursion-backtracking/08.08' },
                        { text: '16.11. 跳水板', link: '/algorithm/recursion-backtracking/16.11' },
                        { text: '17. 电话号码的字母组合', link: '/algorithm/recursion-backtracking/17' },
                        { text: '22. 括号生成', link: '/algorithm/recursion-backtracking/22' },
                        { text: '37. 解数独', link: '/algorithm/recursion-backtracking/37' },
                        { text: '39. 组合总和', link: '/algorithm/recursion-backtracking/39' },
                        { text: '40. 组合总和 II', link: '/algorithm/recursion-backtracking/40' },
                        { text: '46. 全排列', link: '/algorithm/recursion-backtracking/46' },
                        { text: '47. 全排列 II', link: '/algorithm/recursion-backtracking/47' },
                        { text: '51. N 皇后', link: '/algorithm/recursion-backtracking/51' },
                        { text: '54. 螺旋矩阵', link: '/algorithm/recursion-backtracking/54' },
                        { text: '59. 螺旋矩阵 II', link: '/algorithm/recursion-backtracking/59' },
                        { text: '73. 矩阵置零', link: '/algorithm/recursion-backtracking/73' },
                        { text: '77. 组合', link: '/algorithm/recursion-backtracking/77' },
                        { text: '78. 子集', link: '/algorithm/recursion-backtracking/78' },
                        { text: '79. 单词搜索', link: '/algorithm/recursion-backtracking/79' },
                        { text: '90. 子集 II', link: '/algorithm/recursion-backtracking/90' },
                        { text: '93. 复原 IP 地址', link: '/algorithm/recursion-backtracking/93' },
                        { text: '131. 分割回文串', link: '/algorithm/recursion-backtracking/131' },
                        { text: '212. 单词搜索 II', link: '/algorithm/recursion-backtracking/212' },
                        { text: '216. 组合总和 III', link: '/algorithm/recursion-backtracking/216' },
                        { text: '401. 二进制手表', link: '/algorithm/recursion-backtracking/401' },
                        { text: '784. 字母大小写全排列', link: '/algorithm/recursion-backtracking/784' },
                        { text: '980. 不同路径 III', link: '/algorithm/recursion-backtracking/980' },
                        { text: '1219. 黄金矿工', link: '/algorithm/recursion-backtracking/1219' },
                        { text: '1291. 顺次数', link: '/algorithm/recursion-backtracking/1291' }
                    ]
                },
                {
                    text: 'Tree 二叉树',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '100. 相同的树', link: '/algorithm/binary-tree/100' },
                        { text: '101. 对称二叉树', link: '/algorithm/binary-tree/101' },
                        { text: '102. 二叉树的层序遍历', link: '/algorithm/binary-tree/102' },
                        { text: '104. 二叉树的最大深度', link: '/algorithm/binary-tree/104' },
                        { text: '108. 将有序数组转换为二叉搜索树', link: '/algorithm/binary-tree/108' },
                        { text: '110. 平衡二叉树', link: '/algorithm/binary-tree/110' },
                        { text: '111. 二叉树的最小深度', link: '/algorithm/binary-tree/111' },
                        { text: '112. 路径总和', link: '/algorithm/binary-tree/112' },
                        { text: '113. 路径总和 II', link: '/algorithm/binary-tree/113' },
                        { text: '124. 二叉树中的最大路径和', link: '/algorithm/binary-tree/124' },
                        { text: '129. 求根到叶子节点数字之和', link: '/algorithm/binary-tree/129' },
                        { text: '144. 二叉树的前序遍历', link: '/algorithm/binary-tree/144' },
                        { text: '199. 二叉树的右视图', link: '/algorithm/binary-tree/199' },
                        { text: '236. 二叉树的最近公共祖先', link: '/algorithm/binary-tree/236' },
                        { text: '257. 二叉树的所有路径', link: '/algorithm/binary-tree/257' },
                        { text: '404. 左叶子之和', link: '/algorithm/binary-tree/404' },
                        { text: '437. 路径总和 III', link: '/algorithm/binary-tree/437' },
                        { text: '450. 删除二叉搜索树中的节点', link: '/algorithm/binary-tree/450' },
                        { text: '501. 二叉搜索树中的众数', link: '/algorithm/binary-tree/501' },
                        { text: '543. 二叉树的直径', link: '/algorithm/binary-tree/543' }
                    ]
                },
                {
                    text: 'Linked List 链表',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '2. 两数相加', link: '/algorithm/linked-list/2' },
                        { text: '18. 删除链表的节点', link: '/algorithm/linked-list/18' },
                        { text: '19. 删除链表的倒数第 N 个节点', link: '/algorithm/linked-list/19' },
                        { text: '24. 两两交换链表中的节点', link: '/algorithm/linked-list/24' },
                        { text: '92. 反转链表 II', link: '/algorithm/linked-list/92' },
                        { text: '142. 环形链表 II', link: '/algorithm/linked-list/142' },
                        { text: '203. 移除链表元素', link: '/algorithm/linked-list/203' },
                        { text: '206. 反转链表', link: '/algorithm/linked-list/206' }
                    ]
                },
                {
                    text: 'Dynamic Programming 动态规划',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '62. 不同路径', link: '/algorithm/dp/62' },
                        { text: '63. 不同路径 II', link: '/algorithm/dp/63' },
                        { text: '70. 爬楼梯', link: '/algorithm/dp/70' },
                        { text: '121. 买卖股票的最佳时机', link: '/algorithm/dp/121' },
                        { text: '122. 买卖股票的最佳时机 II', link: '/algorithm/dp/122' },
                        { text: '198. 打家劫舍', link: '/algorithm/dp/198' },
                        { text: '213. 打家劫舍 II', link: '/algorithm/dp/213' },
                        { text: '221. 最大正方形', link: '/algorithm/dp/221' },
                        { text: '322. 零钱兑换', link: '/algorithm/dp/322' }
                    ]
                },
                {
                    text: 'Two Pointers 双指针',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '11. 盛最多水的容器', link: '/algorithm/double-pointer/11' },
                        { text: '15. 三数之和', link: '/algorithm/double-pointer/15' },
                        { text: '16. 最接近的三数之和', link: '/algorithm/double-pointer/16' },
                        { text: '42. 接雨水', link: '/algorithm/double-pointer/42' },
                        { text: '75. 颜色分类', link: '/algorithm/double-pointer/75' },
                        { text: '209. 长度最小的子数组', link: '/algorithm/double-pointer/209' },
                        { text: '344. 反转字符串', link: '/algorithm/double-pointer/344' },
                        { text: '763. 划分字母区间', link: '/algorithm/double-pointer/763' },
                        { text: '925. 长按键入', link: '/algorithm/double-pointer/925' }
                    ]
                }
            ],
            // 专栏 - 设计模式
            '/patterns/': [
                {
                    text: '设计模式',
                    items: [
                        { text: '导读', link: '/patterns/guide/' },
                        { text: '单例模式', link: '/patterns/singleton-pattern/' },
                        { text: '代理模式', link: '/patterns/proxy-pattern/' },
                        { text: '提供者模式', link: '/patterns/provider-pattern/' },
                        { text: '原型模式', link: '/patterns/prototype-pattern/' },
                        { text: '容器/演示模式', link: '/patterns/container-presentational-pattern/' },
                        { text: '观察者模式', link: '/patterns/observer-pattern/' },
                        { text: '模块模式', link: '/patterns/module-pattern/' },
                        { text: '混合模式', link: '/patterns/mixin-pattern/' },
                        { text: '中介/中间件模式', link: '/patterns/middleware-pattern/' },
                        { text: '高阶组件模式', link: '/patterns/hoc-pattern/' }
                    ]
                }
            ],
            // 编程 - 资源导航
            '/favorites/': [
                {
                    text: '前端资源',
                    collapsed: false,  // 折叠开关
                    items: [
                        {
                            items: [
                                { text: '导读', link: '/favorites/front-end/' },
                                { text: 'Hooks', link: '/favorites/front-end/hooks' },
                                { text: '前端框架', link: '/favorites/front-end/framework' },
                                { text: 'UI 组件库', link: '/favorites/front-end/ui' },
                                { text: '表单设计器', link: '/favorites/front-end/form-design' },
                                { text: '微前端', link: '/favorites/front-end/micro-front-end' },
                                { text: 'Web3D', link: '/favorites/front-end/web3d' },
                                { text: 'WebGIS', link: '/favorites/front-end/webgis' },
                                { text: '前端插件', link: '/favorites/front-end/plugin' },
                            ]
                        },
                    ]
                }
            ],
            // 编程 - 资源导航
            '/program/': [
                {
                    text: '💻 编程学习',
                    collapsed: false,  // 折叠开关
                    items: [
                        { text: '介绍', link: '/program/' },
                    ]
                },
                {
                    text: '项目实战',
                    collapsed: false,  // 折叠开关
                    items: [
                        {
                            items: [
                                { text: 'Vue2开发去哪儿网App', link: '/program/where-to-go/' },
                            ]
                        },
                    ]
                }
            ],
            // 毕业论文
            '/paper/': [
                {
                    text: '论文查找',
                    link: '/paper/find'
                },
                {
                    text: '论文相关资料',
                    link: '/paper/'
                }
            ],
            // 我的笔记
            '/note/': [
                { text: '关于我的笔记', link: '/note/' },
                {
                    text: '前端面试题',
                    collapsed: false,
                    items: [
                        { text: '事件循环、任务队列', link: '/note/interview-questions/event-queue' },
                        { text: '原型与原型链', link: '/note/interview-questions/prototype' },
                    ]
                },
                {
                    text: 'ECMAScript 6',
                    collapsed: false,
                    items: [
                        { text: 'Proxy', link: '/note/es6/proxy' },
                        { text: 'Reflect', link: '/note/es6/reflect' },
                    ]
                },
                {
                    text: 'CSS',
                    collapsed: false,
                    items: [
                        { text: 'BEM架构', link: '/note/css/bem' },
                        { text: 'BFC机制', link: '/note/css/bfc' },
                    ]
                },
            ],
            //随笔
            '/essay/': [
                { text: '名人名言', link: '/essay/' },
                { text: '优美诗歌', link: '/essay/poetry' },
            ],

            '/project/': [
                {
                    text: '工程化',
                    items: [
                        { text: 'CommonJS', link: '/config/' },
                        { text: 'WebPack', link: '/webpack/' },
                        { text: 'Vite', link: '/vite/' }
                    ]
                }
            ]
        },
        // 本地搜索
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: { //这里是个大坑，zh是不生效的，改为root即可
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        },
        // 页脚配置
        footer: {
            message: '用心去做高质量的专业前端内容网站，欢迎 <a style="color: #0066ff" href="https://github.com/panqingjie00/my-blog">star ⭐</a> 让更多人发现',
            copyright: 'MIT License | 版权所有 © 2023-2024 Chocolate and ChoDocs contributors'
        },
        // github 编辑链接
        editLink: {
            pattern: 'https://github.com/panqingjie00/my-blog/blob/main/docs/.vitepress/config.ts',
            text: '在 GitHub 上编辑此页'
        },
        // 最后更新时间的显示文本
        lastUpdatedText: '最后一次更新于'
    },
    // markdown 文件 主题风格配置
    markdown: {
        // TODO
        theme: {
            dark: 'material-theme-darker',
            light: 'light-plus'
        },
        lineNumbers: true,
        // 配置markdown 使用自定义插件（fancybox 图片放大预览）
        // 详情参考这篇csdn文章：https://blog.csdn.net/www1577791638/article/details/126091280
        config: (md) => {
            md.use(mdItCustomAttrs, 'image', {
                'data-fancybox': "gallery"
            })
        }
    },
})