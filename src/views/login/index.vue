<template lang="jade">
    .login-container
        //- .tit GG彩票平台代理商游戏用户登录
        ul
            li  
                span
                    svg-icon(icon-class="user")
                span *
                span 
                    input(type='text',placeholder='请输入代理商UUID编号', v-model="loginForm.hashCode")
            li(:class="disableForm == true ? 'disabledColor' : ''")  
                span
                    svg-icon(icon-class="platform")
                span *
                span 
                    input(type='text',placeholder='请输入游戏用户名称(代理商平台的)', :disabled="disableForm", v-model="loginForm.username")
            li(:class="disableForm == true ? 'disabledColor' : ''")  
                span
                    svg-icon(icon-class="link")
                span *
                span 
                    input(type='text',placeholder='请输入代理商游戏大厅链接', :disabled="disableForm", v-model="loginForm.homeUrl")
            li(:class="disableForm == true ? 'disabledColor' : ''")  
                span
                    svg-icon(icon-class="top-up")
                span 
                    input(type='text',placeholder='请输入代理商充值通道链接', :disabled="disableForm", v-model="loginForm.walletDepositUrl")
            li(:class="disableForm == true ? 'disabledColor' : ''")  
                span
                    svg-icon(icon-class="service")
                span 
                    input(type='text',placeholder='请输入代理商客服通道链接', :disabled="disableForm", v-model="loginForm.customerUrl")
            li
                span
                    svg-icon(icon-class="stair1")
                span 
                    el-select(ref='headerSearchSelect', v-model='loginForm.value', filterable='', default-first-option='', remote='', placeholder='请选择一级彩种定位', @change='getFistGame')
                        el-option(v-for='item,index in loginForm.parentList', :key='item.index', :value='item.code', :label="item.name")
                    i
                        svg-icon(icon-class="triangle")
            li
                span
                    svg-icon(icon-class="stair2")
                span
                    el-select(ref='headerSearchSelect', v-model='loginForm.value1', filterable='', default-first-option='', remote='', :placeholder='loginForm.lotteryCode', @change='getSecondGame')
                        el-option(v-for='item,index in loginForm.lotteryChildList', :key='index', :value='item.code', :label='item.cname')
                    i
                        svg-icon(icon-class="triangle")
            li
                span
                    svg-icon(icon-class="facility")
                span 
                    el-select(ref='headerSearchSelect', v-model='loginForm.device', filterable='', default-first-option='', remote='', placeholder='loginForm.device', @change='getDriveSelect')
                        el-option(v-for='item,index in loginForm.driveList', :key='item.index', :value='item', :label="item.driverName")
                    i
                        svg-icon(icon-class="triangle")
            li
                 button(type="primary",@click="handleLogin") 登录
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth' // 设置token
import { loginByToken } from '@/api/home'
import { drive } from '@/utils/judge'
export default {
    name: 'Login',
    components: { },
    data() {
        return {
            recordRoute:"", // 记录当前页面
            disableForm:false, // 禁用输入框
            secondLevel:'',
            isClick: true,  // 判断是否可以点击
            loginForm:{
                value:'', // 
                value1:'', // 
                hashCode: '',//'MxrMzYsd3D8vTuyEvpc', // 代理商id，19位整型数
                command:'LOGIN', // 登录命令
                visit_command:'TORIST_LOGIN', // 游客登录命令
                version:'1.0', // 接口版本号
                guserName: '', // 游戏用户名称
                username: '', // 游戏用户名称(代理商平台的)
                walletDepositUrl: '', // 代理商充值通链接
                customerUrl: '', // 代理商客服通道链接
                device: '请选择登录设备端', // 设备端
                playRuleCode:'', // 玩法代码(传空时定位到彩种首页)
                homeUrl: '', // 游戏大厅页面，玩家点此链接返回游戏大厅
                parentGame:'一级彩种', // 父级彩种
                lotteryCode:'请选择二级彩种定位', // 子级彩种
                driveList: ["PC", "H5"],
                parentList: [
                    {
                        "id": 6,
                        "name": "香港彩",
                        "code": "HK",
                    },
                    {
                        "id": 1,
                        "name": "PK10",
                        "code": "PKT",
                    },
                    {
                       "id": 2,
                        "name": "时时彩",
                        "code": "SSC", 
                    },
                    {
                       "id": 3,
                        "name": "11选5",
                        "code": "EF", 
                    },
                    {
                       "id": 4,
                        "name": "快3",
                        "code": "FT", 
                    },
                    {
                        "id": 5,
                        "name": "快乐十分",
                        "code": "KLT", 
                    },
                    
                ],
                lotteryChildList: [
                    {
                        "id": "bjpk10",
                        "code": "PKT_BJ",
                        "cname": "北京赛车"
                    },
                    {
                        "id": "tjssc",
                        "code": "SSC_TJ",
                        "cname": "天津时时彩"
                    }, {
                        "id": "xjssc",
                        "code": "SSC_XJ",
                        "cname": "新疆时时彩"
                    }, {
                        "id": "cqssc",
                        "code": "SSC_CQ",
                        "cname": "重庆时时彩"
                    }, {
                        "id": "ynssc",
                        "code": "SSC_YN",
                        "cname": "云南时时彩"
                    },
                    {
                        "id": "hb11x5",
                        "code": "EF_HuB",
                        "cname": "湖北11选5"
                    }, {
                        "id": "gd11x5",
                        "code": "EF_GD",
                        "cname": "广东11选5"
                    }, {
                        "id": "ah11x5",
                        "code": "EF_AH",
                        "cname": "安徽11选5"
                    }, {
                        "id": "sh11x5",
                        "code": "EF_SH",
                        "cname": "上海11选5"
                    }, {
                        "id": "jx11x5",
                        "code": "EF_JX",
                        "cname": "江西11选5"
                    }, {
                        "id": "js11x5",
                        "code": "EF_JS",
                        "cname": "江苏11选5"
                    }, {
                        "id": "sd11x5",
                        "code": "EF_SD",
                        "cname": "山东11选5"
                    }, {
                        "id": "ln11x5",
                        "code": "EF_LN",
                        "cname": "辽宁11选5"
                    },
                    {
                        "id": "hb11x5",
                        "code": "EF_HuB",
                        "cname": "湖北11选5"
                    }, {
                        "id": "gd11x5",
                        "code": "EF_GD",
                        "cname": "广东11选5"
                    }, {
                        "id": "ah11x5",
                        "code": "EF_AH",
                        "cname": "安徽11选5"
                    }, {
                        "id": "sh11x5",
                        "code": "EF_SH",
                        "cname": "上海11选5"
                    }, {
                        "id": "jx11x5",
                        "code": "EF_JX",
                        "cname": "江西11选5"
                    }, {
                        "id": "js11x5",
                        "code": "EF_JS",
                        "cname": "江苏11选5"
                    }, {
                        "id": "sd11x5",
                        "code": "EF_SD",
                        "cname": "山东11选5"
                    }, {
                        "id": "ln11x5",
                        "code": "EF_LN",
                        "cname": "辽宁11选5"
                    },
                    {
                        "id": "hbk3",
                        "code": "FT_HuB",
                        "cname": "湖北快3"
                    }, {
                        "id": "gxk3",
                        "code": "FT_GX",
                        "cname": "广西快3"
                    }, {
                        "id": "ahk3",
                        "code": "FT_AH",
                        "cname": "安徽快3"
                    }, {
                        "id": "jlk3",
                        "code": "FT_JL",
                        "cname": "吉林快3"
                    }, {
                        "id": "jxk3",
                        "code": "FT_JX",
                        "cname": "江西快3"
                    }, {
                        "id": "jsk3",
                        "code": "FT_JS",
                        "cname": "江苏快3"
                    }, {
                        "id": "fjk3",
                        "code": "FT_FJ",
                        "cname": "福建快3"
                    }, {
                        "id": "bjk3",
                        "code": "FT_BJ",
                        "cname": "北京快3"
                    },
                    {
                        "id": "gd10",
                        "code": "KLT_GD",
                        "cname": "广东快乐10分"
                    }, {
                        "id": "tj10",
                        "code": "KLT_TJ",
                        "cname": "天津快乐10分"
                    }, {
                        "id": "hn10",
                        "code": "KLT_HuN",
                        "cname": "湖南快乐10分"
                    }, {
                        "id": "sx10",
                        "code": "KLT_SX3",
                        "cname": "陕西快乐10分"
                    }, {
                        "id": "yn10",
                        "code": "KLT_YN",
                        "cname": "云南快乐10分"
                    }, {
                        "id": "sxj10",
                        "code": "KLT_SX1",
                        "cname": "山西快乐10分"
                    },
                    {
                        "id": "lhc",
                        "code": "HK_LH",
                        "cname": "香港六合彩"
                    }
                ],
                
                // menuListArr: [
                //     {
                //         "id": 1,
                //         "name": "PK10",
                //         "code": "PKT",
                //         "subMenu": [{
                //             "id": "bjpk10",
                //             "code": "PKT_BJ",
                //             "cname": "北京赛车"
                //         }]
                //     },
                //     {
                //         "id": 2,
                //         "name": "时时彩",
                //         "code": "SSC",
                //         "subMenu": [{
                //             "id": "tjssc",
                //             "code": "SSC_TJ",
                //             "cname": "天津时时彩"
                //         }, {
                //             "id": "xjssc",
                //             "code": "SSC_XJ",
                //             "cname": "新疆时时彩"
                //         }, {
                //             "id": "cqssc",
                //             "code": "SSC_CQ",
                //             "cname": "重庆时时彩"
                //         }, {
                //             "id": "ynssc",
                //             "code": "SSC_YN",
                //             "cname": "云南时时彩"
                //         }]
                //     },
                //     {
                //         "id": 3,
                //         "name": "11选5",
                //         "code": "EF",
                //         "subMenu": [{
                //             "id": "hb11x5",
                //             "code": "EF_HuB",
                //             "cname": "湖北11选5"
                //         }, {
                //             "id": "gd11x5",
                //             "code": "EF_GD",
                //             "cname": "广东11选5"
                //         }, {
                //             "id": "ah11x5",
                //             "code": "EF_AH",
                //             "cname": "安徽11选5"
                //         }, {
                //             "id": "sh11x5",
                //             "code": "EF_SH",
                //             "cname": "上海11选5"
                //         }, {
                //             "id": "jx11x5",
                //             "code": "EF_JX",
                //             "cname": "江西11选5"
                //         }, {
                //             "id": "js11x5",
                //             "code": "EF_JS",
                //             "cname": "江苏11选5"
                //         }, {
                //             "id": "sd11x5",
                //             "code": "EF_SD",
                //             "cname": "山东11选5"
                //         }, {
                //             "id": "ln11x5",
                //             "code": "EF_LN",
                //             "cname": "辽宁11选5"
                //         }]
                //     },
                //     {
                //         "id": 4,
                //         "name": "快3",
                //         "code": "FT",
                //         "subMenu": [{
                //             "id": "hbk3",
                //             "code": "FT_HuB",
                //             "cname": "湖北快3"
                //         }, {
                //             "id": "gxk3",
                //             "code": "FT_GX",
                //             "cname": "广西快3"
                //         }, {
                //             "id": "ahk3",
                //             "code": "FT_AH",
                //             "cname": "安徽快3"
                //         }, {
                //             "id": "jlk3",
                //             "code": "FT_JL",
                //             "cname": "吉林快3"
                //         }, {
                //             "id": "jxk3",
                //             "code": "FT_JX",
                //             "cname": "江西快3"
                //         }, {
                //             "id": "jsk3",
                //             "code": "FT_JS",
                //             "cname": "江苏快3"
                //         }, {
                //             "id": "fjk3",
                //             "code": "FT_FJ",
                //             "cname": "福建快3"
                //         }, {
                //             "id": "bjk3",
                //             "code": "FT_BJ",
                //             "cname": "北京快3"
                //         }]
                //     },
                //     {
                //         "id": 5,
                //         "name": "快乐十分",
                //         "code": "KLT",
                //         "subMenu": [{
                //             "id": "gd10",
                //             "code": "KLT_GD",
                //             "cname": "广东快乐10分"
                //         }, {
                //             "id": "tj10",
                //             "code": "KLT_TJ",
                //             "cname": "天津快乐10分"
                //         }, {
                //             "id": "hn10",
                //             "code": "KLT_HuN",
                //             "cname": "湖南快乐10分"
                //         }, {
                //             "id": "sx10",
                //             "code": "KLT_SX3",
                //             "cname": "陕西快乐10分"
                //         }, {
                //             "id": "yn10",
                //             "code": "KLT_YN",
                //             "cname": "云南快乐10分"
                //         }, {
                //             "id": "sxj10",
                //             "code": "KLT_SX1",
                //             "cname": "山西快乐10分"
                //         }]
                //     },
                //     {
                //         "id": 6,
                //         "name": "香港彩",
                //         "code": "HK",
                //         "subMenu": [{
                //             "id": "lhc",
                //             "code": "HK_LH",
                //             "cname": "香港六合彩"
                //         }]
                //     }
                // ],
            }
        }
    },
    watch:{
        $route(to,form){ // 监听路由变化
            this.recordRoute = to.path;
            if(to.path == '/visitLogin'){
                this.disableForm = true;
            }else{
                this.disableForm = false;
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
        this.loginForm.device = drive();
        this.recordRoute = this.$route.path;
        if(this.$route.path == '/visitLogin'){  // 判断初始化进来是哪个页面
            this.disableForm = true;
        }else{
            this.disableForm = false;
        }  
    },
    methods:{
        getDriveSelect() { // 设备端
            
        },
        getFistGame() { // 获取一级彩种
            
        },
        getFistCode(val){ 
            // this.secondLevel = val.subMenu
            // this.loginForm.value1 = ''
            // this.loginForm.lotteryCode = val.subMenu[0].cname
            // console.log('val----',this.loginForm.lotteryCode )
        },
        getSecondGame() { // 获取二级彩种
           
        },
        handleLogin() {
            this.$loading.show(); // loading显示
            if(this.isClick == false) {
                return;
            }
            let data = {};
            this.isClick = false;  // 防多点击
            if(this.recordRoute == '/visitLogin') {  // 判断是游客登录还是账号密码登录
                // if(!this.loginForm.hashCode) {
                //     this.$loading.hidden(); // loading隐藏
                //     this.$tips.error("用户名不能为空")

                //     return false;
                // }
                debugger
                let visit = { device:this.loginForm.device };
                data = {
                    hashCode: this.loginForm.hashCode, // 代理商账号
                    command: this.loginForm.visit_command, // 游客登录命令
                    version: this.loginForm.version, // 接口版本号
                    data: JSON.stringify(visit)
                }
            } else {
                let s = {
                    walletDepositUrl: this.loginForm.walletDepositUrl, // 代理商充值通链接
                    customerUrl: this.loginForm.customerUrl, // 代理商客服通道链接
                    username: this.loginForm.username, // 游戏用户名称(代理商平台的)
                    device: this.loginForm.device, // 设备端
                    lotteryCode: this.loginForm.value, // 二级彩种
                    playRuleCode: this.loginForm.value1, // 玩法代码(传空时定位到彩种首页)
                    homeUrl: this.loginForm.homeUrl // 游戏大厅页面，玩家点此链接返回游戏大厅                
                }
                s = JSON.stringify(s)
                data = {
                    hashCode: this.loginForm.hashCode, // 代理商账号
                    command: this.loginForm.command, // 登录命令
                    version: this.loginForm.version, // 接口版本号
                    data: s
                }
            }
            loginByToken(data).then(response => {
                this.$loading.hidden(); // loading隐藏
                this.isClick = true;  // 防多点击
                debugger
                let res = response;
                if(res.success == 1) {
                    window.location.href= res.content.url
                }else{
                    this.$tips.error(res.espMsg)
                }
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/logo-index"
@media screen and (max-width: 320px)
    .login-container
        ul
            li
                margin-bottom 10px
                &:nth-last-of-type(1)
                    margin-top 20px

</style>