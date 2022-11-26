export const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: '@/layouts/index',
        icon: 'PieChart',
        routes: [
            {
                path: '/login',
                name: '登陆页',
                component: 'login',
                layout: false,
                hideInMenu: true,
            },
            {
                path: '/dashboard/analysis',
                name: '分析页',
                component: '@/pages/analysis',
            },
            {
                path: '/dashboard/monitor',
                name: '监控页',
                component: '@/pages/monitor',
            },
        ]
    }
]