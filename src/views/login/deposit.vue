<template lang="jade">
    .login-container
        //.tit GG彩票平台代理商游戏用户充值
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
                    input(type='text',placeholder='请输入游戏用户名称', v-model="loginForm.username")
            li
                span
                    svg-icon(icon-class="top-up1")
                span * 
                span 
                    input(type='text',placeholder='请输入充值金额(单位分)', v-model="loginForm.amount")
            li
                span  
                    svg-icon(icon-class="bet-record")
                span 
                    //- 订单号预留32位字符
                    input(type='text',placeholder='请输入代理商订单号', v-model="loginForm.agentTradeNo")
            li
                span  
                    svg-icon(icon-class="bet-record")
                span 
                    //- input(type='text',placeholder='格式：2019-6-2 22:00:56', v-model="loginForm.agentTradeTime")
                    el-date-picker(v-model="value", type="datetime", placeholder="请输入代理商充值订单的创建时间",  :default-time="defaultTime", size="mini")
            li
                button(type="primary",@click="handleLogin") 确定
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth' // 设置token
import { loginByToken } from '@/api/home'
export default {
    name: 'Deposit',
    components: {
        
    },
    data() {
        return {
            value:"", // 时间插件绑定值
            isClick: true,  // 判断是否可以点击
            loginForm:{
                hashCode: '', // 代理商id，19位整型数
                command:'DEPOSIT', // 登录命令
                version:'1.0', // 接口版本号
                guserName: '', // 游戏用户名称
                username: '', // 游戏用户名称(代理商平台的)
                amount: '', // 充值金额
                agentTradeTime: '', // 代理商的订单创建时间，格式：yyyy-MM-dd HH:mm:ss
                agentTradeNo: '' // 代理商订单号，预留36位字符
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
    mounted(){
        this.getOrderNum();
    },
    computed:{
        defaultTime:()=>{
            return new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
        }
    },
    methods:{
        getOrderNum(){  // 订单号码
            // let a = Math.floor((Math.random()*11)+1);
            let rand = "";
            for(var i = 0; i < 11; i++){
                var r = Math.floor(Math.random() * 10);
                rand += r;
            }
            if(rand == 0){
                this.getOrderNum();
            }
            let time = this.getNowFormatDate().split(' ')[0];
            let y = time.replace('-',"").replace('-','')
            let t =  this.getNowFormatDate().split(' ')[1].replace(':','').replace(':','')
            this.loginForm.agentTradeNo = y+''+t+''+rand;
            this.value = this.getNowFormatDate();
        },
        getNowFormatDate() {//获取当前时间
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
            var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
            var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
                    + " "  + date.getHours()  + seperator2  + date.getMinutes()
                    + seperator2 + date.getSeconds();
            return currentdate;
        },
        getDriveSelect() { // 设备端
            
        },
        getFistGame() { // 获取一级彩种
            
        },
        getSecondGame() { // 获取二级彩种
           
        },
        formatDate(date, fmt) { // 转年月日时分秒
            var currentDate = new Date(date);
            var o = {
                "M+": currentDate.getMonth() + 1, //月份
                "d+": currentDate.getDate(), //日
                "h+": currentDate.getHours(), //小时
                "m+": currentDate.getMinutes(), //分
                "s+": currentDate.getSeconds(), //秒
                "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
                "S": currentDate.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        handleLogin(v) {
            this.$loading.show(); // loading显示
            if(this.isClick == false){
                return;
            }
            this.isClick = false;  // 防多点击
            let time, tr
            if(this.value != ''){
                time = this.formatDate(this.value, 'yyyy-MM-dd hh:mm:ss'),
                tr = Date.parse(time);
                // console.log("time1----",time)
            }else{
                time = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                tr = Date.parse(time);
                // console.log("time2----",time)
            }
            let s = {
                username: this.loginForm.username, // 游戏用户名称(代理商平台的)
                amount: this.loginForm.amount, // 充值金额,整数，单位:分
                agentTradeTime: this.loginForm.agentTradeTime = time, // 代理商的订单创建时间，格式：yyyy-MM-dd HH:mm:ss
                agentTradeNo: this.loginForm.agentTradeNo // 代理商订单号，预留36位字符
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
                console.log('reg',res)
                if(res.success == 1){
                    this.$store.dispatch('getOpenDataList' , res.content)
                    this.$store.state.home.flag_oAlert = true
                    this.$store.dispatch('getAlertState', 'deposit') // alert充值状态
                } else {
                    this.$tips.error(res.respMsg)
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/logo-index"
.el-date-editor.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--datetime
    width 280px
    .el-input__inner
        height 22px !important
        line-height 22px !important
        // box-sizing border-box
@media screen and (min-width: 750px) 
    .login-container
        width 100%


</style>