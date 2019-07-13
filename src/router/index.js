import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/login/index')
    },
    {
        path: '/visitLogin',
        name: 'visitLogin',
        component: () =>
            import ('@/views/login/index')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('@/views/login/register')
    },
    {
        path: '/deposit',
        name: 'deposit',
        component: () =>
            import ('@/views/login/deposit')
    },
    {
        path: '/withdrawal',
        name: 'withdrawal',
        component: () =>
            import ('@/views/login/withdrawal')
    }
]

export default new Router({
    scrollBehavior: function scrollBehavior() {
        return { y: 0 };
    },
    routes: constantRouterMap
});