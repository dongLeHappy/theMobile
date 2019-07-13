<template lang="jade">
    #app
        div.logo-box
            div.logo
                svg-icon(icon-class="logo2")
            ul.menu
                li(v-for="v,index in menuList", :key="index", @click="curMenu(v.id)", :class="[curMid == v.id ? 'cur' : '']") 
                    router-link(:to="{ name: v.url }")  {{ v.name }}
            // 路由
            router-view 
            vue-openApi-alert(v-if="flag_oAlert == true")
        p.bottom-label 【现金网&代理商&游戏用户】模拟登陆系统
</template>
<style lang="stylus">
@import "assets/stylus/base";
#app
    padding 0rem
    width 100%
    margin 0 auto
    height 100%
   
</style>
<script>
import { mapState } from "vuex";
import oAlert from '@/views/login/alert' // openapi弹出框

export default {
    name: 'App',
    components:{
      'vue-openApi-alert': oAlert // 弹出框
    },
    computed: {
        ...mapState({
            flag_oAlert: state => state.home.flag_oAlert, // 当前批量下注值
        }),
    },
    data() {
        return {
            getToken: false,
            curMid: '1',
            menuList: [
                {
                'name':'游客登录',
                'url':'visitLogin',
                'id':'0'
                },
                {
                'name':'登录',
                'url':'login',
                'id':'1'
                },
                {
                'name':'注册',
                'url':'register',
                'id':'2'
                },
                {
                'name':'充值',
                'url':'deposit',
                'id':'3'
                },
                {
                'name':'提现',
                'url':'withdrawal',
                'id':'4'
                }
            ]
        }
    },
    mounted() {
        this.curMid = sessionStorage.getItem('curMid') // 刷新后从本地储存获取当前状态
    },
    methods: {
        curMenu(v){
            sessionStorage.setItem('curMid',v) // 刷新时将当前菜单状态存本地
            this.curMid = v
        }
    },
    destroyed() { // 组件销毁时清除定时器
    },
    watch:{
        $route(to,from){
            if(to.path != from.path){
                this.curMid = sessionStorage.getItem('curMid')
            }
            if(!sessionStorage.getItem('curMid')){
                this.$router.push({ path: '/login' })
                sessionStorage.setItem('curMid',1)
                this.curMid = 1
            }
        }
    }
}
</script>
<!-- 添加“scoped”属性以仅将CSS限制为此组件 -->
<style scoped lang="stylus">
@import "./assets/stylus/blue"

#app
    background url(./assets/images/gameLogo/bg.jpg) 
    // backgroun-size 100% 100%
.logo-box
    position fixed
    // height 700px
    width 450px
    top 50%
    left 50%
    transform translate(-50%,-50%)
    background rgba(255, 255, 255, 0.15)
    padding 10px
    overflow hidden
    height auto
p.bottom-label
    text-align center
    line-height 30px
    color $register-tab-color
    position absolute
    bottom 0px
    width 100%
div.logo
    width 450px
    margin 0px auto
    display flex
    margin-bottom 12px
    margin-top 5px
    svg 
        margin auto
        width 146px
        height 44px
.menu
    width 450px
    margin 0px auto
    display flex
    flex-wrap wrap
    flex-direction row
    background rgba(255, 255, 255, 0.18)
    // height 80px
    padding 5px 0 10px 0
    li
        cursor pointer
        margin 5px 0 0 35px
        text-align center
        width 100px
        line-height 30px
        border-radius 5px
        background-color $register-tab-bg
        a
            font-size 16px
            color $register-tab-active-color
            font-weight normal
            display inline-block
            width 100%
    .cur
        background-color $register-tab-btn-active-bgColor
        color $register-tab-active-color

@media screen and (max-width: 750px) and (min-width: 320px)
    .logo-box
        position absolute
        height auto
        width 80vw
        top 50%
        left 50%
        transform translate(-50%,-50%)
    div.logo
        width 80vw
        margin 0px auto
        display flex
        margin-bottom 5px 
        svg 
            margin auto
            width 100px
            height 30px
    .menu
        width 100%
        display flex
        flex-wrap wrap
        flex-direction row
        box-sizing border-box
        padding 2px
        li
            box-sizing border-box
            width 75px
            height 25px
            cursor pointer
            text-align center
            line-height 25px
            background-color $register-tab-bg
            margin 3px 0 0 18px
            a
                font-size 12px
                color $register-tab-active-color
                font-weight normal
                line-height 25px
                display inline-block
                width 100%
                height 25px
        .cur
            background-color $register-tab-btn-active-bgColor
            color $register-tab-active-color

@media screen and (max-width: 320px)  // iphone5S
    .menu
        width 100%
        display flex
        flex-wrap wrap
        flex-direction row
        box-sizing border-box
        padding 2px
        padding-bottom 3px 
        li
            box-sizing border-box
            width 65px
            height 25px
            cursor pointer
            text-align center
            line-height 25px
            background-color $register-tab-bg
            margin 3px 0 0 14px
            a
                font-size 12px
                color $register-tab-active-color
                font-weight normal
                line-height 25px
                display inline-block
                width 100%
                height 25px
</style>