import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'GravityDocs',
    titleTemplate: '一站式前端内容网站，包括学习路线、知识体系',
    // 页签图标
    head: [['link', { rel: 'icon', href: '../public/favicon.ico' }]],
    description: '一个基于VitePress构建的个人博客网站',
    themeConfig: {
        siteTitle: 'GravityDocs',  // 网站标题
        logo: '/my-logo.png',  // 网站logo
        // 顶部栏导航栏
        nav: [
            { text: '💭 学习圈子', link: '/basis/', activeMatch: '/basis/' },
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
                    { text: '⭐ 资源导航', link: '/favorites' },
                    { text: '💻 编程学习', link: '/program/' },
                    { text: '🔧 编程工具', link: '/tool/' },
                ],
            },
            {
                text: '洞见',
                items: [
                    { text: '✏️ 随笔', link: '/essay/' },
                    { text: '🌱 青葱岁月', link: '/green/ch' },
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
                    svg: '<svg t="1694332343546" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5648" width="200" height="200"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#98989f" p-id="5649"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#98989f" p-id="5650"></path></svg>'
                },
                link: 'https://space.bilibili.com/200297467?spm_id_from=333.1007.0.0',
                // You can include a custom label for accessibility too (optional but recommended):
                ariaLabel: 'cool link'
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

            // This sidebar gets displayed when a user
            // is on `config` directory.
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
            copyright: 'MIT License | 版权所有 © 0000-9999 Chocolate and ChoDocs contributors'
        },
        // github 编辑链接
        editLink: {
            pattern: 'https://github.com/panqingjie00/my-blog/blob/main/docs/.vitepress/config.ts',
            text: '在 GitHub 上编辑此页'
        },
        // 最后更新时间的显示文本
        lastUpdatedText: '最后一次更新于'
    },
    // 开启/关闭 最后更新时间
    lastUpdated: true,
})