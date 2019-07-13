//定义一个状态管理容器
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'  
import permission from './modules/permission'  // 权限登入

import home from './modules/home' // 菜单 获取服务器时间 用户信息 下期开奖时间
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        permission, // 权限登入
        home // 首页相关
    },
    getters
})

export default store;