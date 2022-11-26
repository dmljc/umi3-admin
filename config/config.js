import { defineConfig } from 'umi';
import { routes } from './routes';
import path from 'path';

export default defineConfig({
    alias: {
        '@': path.resolve(__dirname, 'src')
    },
    nodeModulesTransform: {
        type: 'none',
    },
    layout: {
        // 支持任何不需要 dom 的
        // https://procomponents.ant.design/components/layout#prolayout
        name: 'Ant Design',
        locale: true,
        layout: 'side',
    },
    routes,
    fastRefresh: {},
    mfsu: {},
    proxy: {
        '/api': {
            'target': 'http://127.0.0.1:7001/',
            'changeOrigin': true,
            'pathRewrite': { '^/api': '' },
        },
    },
});
