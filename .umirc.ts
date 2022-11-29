import { defineConfig } from '@umijs/max';

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
    proxy: {
        '/api': {
            'target': 'http://127.0.0.1:7001/',
            'changeOrigin': true,
            'pathRewrite': { '^/api': '' },
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
            component: './Home',
            icon: 'home',
        },
        {
            name: '系统设置',
            path: '/system',
            component: './System',
            icon: 'setting'
        },
    ],
    npmClient: 'pnpm',
});

