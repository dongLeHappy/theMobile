import router from './router'
import store from './store'
import { MessageBox } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import "./assets/stylus/load.styl";
import { getToken } from '@/utils/auth' // getToken from cookie
import { loadingShow, loadingHidden } from '@/components/Loading/index' // Loading
// 动态改造路由
function mapRouter(roles) { // 遍历后台传来的路由字符串，转换为组件对象
    let itme_data = [];
    let itme = [];

    roles.forEach((route, i) => {
        itme = {
            "path": "/",
            "name": route.urlName,
            "component": route.component
        }
    })
    itme_data.push(itme);
    return itme_data
}
const whiteList = ['/visitLogin', '/login', '/register', '/deposit', '/withdrawal'] // no redirect whitelist
router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    if (getToken()) { // determine if there has token
        next()
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login`) // 否则全部重定向到登录页
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})