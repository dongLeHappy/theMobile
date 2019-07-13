import Vue from 'vue'
import 'babel-polyfill' // 转ES5
import router from './router' // 路由
import store from './store' // 状态库
import './components/SvgIcon/icons' // svg图标
import vTips from './components/Tips/index' // 提示
import loading from './components/Loading/index' // Loading
import './permission' // 权限控制
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(vTips)
Vue.use(Element);
Vue.use(loading)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})