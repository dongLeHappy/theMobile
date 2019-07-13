<template lang="jade">
    .login-container
        //.tit GG彩票平台代理商游戏用户注册
        ul
            li
                span
                    svg-icon(icon-class="user")
                span *
                span 
                    input(type='text',placeholder='请输入代理商UUID编号', v-model="loginForm.hashCode")
            li
                span
                    svg-icon(icon-class="platform")
                span *
                span 
                    input(type='text',placeholder='请输入游戏用户名称',v-model="loginForm.username")
            li
                button(type="primary",@click="handleLogin") 确定
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth' // 设置token
import { loginByToken } from '@/api/home'
export default {
    name: 'Register',
    components: { },
    data() {
        return {
            isClick: true,  // 判断是否可以点击
            loginForm:{
                hashCode: '', // 代理商id，19位整型数
                command:'REGISTER', // 登录命令
                version:'1.0', // 接口版本号
                username: '', // 游戏用户名称(代理商平台的)
            }
        }
    },
    created(){
        document.onkeypress = (e) => {
            var keycode = document.all ? event.keyCode : e.which;
            if (keycode == 13) {
                this.handleLogin(); // 登录方法名
                return false;
            }
        };
    },
    methods:{
        getDriveSelect() { // 设备端
            
        },
        getFistGame() { // 获取一级彩种
            
        },
        getSecondGame() { // 获取二级彩种
           
        },
        handleLogin() {
            this.$loading.show(); // loading显示
            if(this.isClick == false){
                return;
            }
            this.isClick = false;  // 防多点击
            let s = {
                username: this.loginForm.username, // 游戏用户名称(代理商平台的)             
            }
            s = JSON.stringify(s)
            let data = {
                hashCode: this.loginForm.hashCode, // 代理商账号
                command: this.loginForm.command, // 登录命令
                version: this.loginForm.version, // 接口版本号
                data: s
            }
            loginByToken(data).then(response => {
                this.$loading.hidden(); // loading隐藏
                this.isClick = true;  // 防多点击
                let res = response
                if(res.success == 1){
                    this.$tips.success('注册成功，请登入!')
                    this.$router.push({ path: '/login' })
                    sessionStorage.setItem('curMid',1)
                }else{
                    this.$tips.error(res.respMsg)
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/logo-index"
</style>