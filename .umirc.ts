import { defineConfig } from '@umijs/max';

const is_dev = process.env.NODE_ENV === 'development';

export default defineConfig({
    dva: {},
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'Umi4 Egg3 Admin',
    },
    mfsu: {},
    devtool: is_dev ? 'eval' : false,
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:7001/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: '@/pages/home',
            icon: 'home',
        },
        {
            name: '注册页面',
            path: '/register',
            component: '@/pages/register',
            icon: 'home',
            hideInMenu: true, // 隐藏自己和子菜单
            menuRender: false, // 不显示菜单
        },
        {
            name: '登录页面',
            path: '/login',
            component: '@/pages/login',
            icon: 'home',
            hideInMenu: true,
            menuRender: false,
        },
        {
            name: '系统设置',
            path: '/system',
            component: '@/pages/system',
            icon: 'setting',
        },
        {
            name: '数据分析',
            path: '/analysis',
            component: '@/pages/analysis',
            icon: 'setting',
            hideInMenu: true,
            menuRender: false,
        },
    ],
    npmClient: 'pnpm',
});
