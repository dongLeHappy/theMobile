<template lang="jade">
    .alert-container-box
        .alert-container
            .tit GG彩票平台代理商游戏用户充值提现信息展示
            ul
                li(v-for="val,index in openapiDataList") 
                    span(v-if="alertState == 'withdrawal'") {{ titleW[index] }}：  
                    span(v-if="alertState == 'deposit'") {{ titleD[index] }}： 
                    span {{ val,index | filtrationTime }}
                li 
                    button(type="primary",@click="handleClose") 确定
        div.bg
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'Alert',
    computed: { // 计算属性
        ...mapState({
            openapiDataList: state => state.home.openapiDataList ,//  open回参
            alertState: state => state.home.alertState // 充值取款状态
        }),

    },
    filters:{ //过滤
        filtrationTime: function (v,k) { // v为value， k为key键
            // console.log("v-----",v,"k-----",k)
            function formatDate(date) { // 时间戳转yyyy-MM-dd hh:mm:ss 时间格式
                var date = new Date(date);
                var YY = date.getFullYear() + '-';
                var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return YY + MM + DD +" "+hh + mm + ss;
            }
            if(k == 'tradeTime'){
                return formatDate(v)
            }else if(k == 'agentTradeTime'){
                 return formatDate(v)
            }

            return v
        }
    },
    watch: {
        openapiDataList: {
            handler(newName, oldName) {
                console.log("newName",newName,"oldName",oldName)
            }
        }
    },
    components: { },
    data() {
        return {
            titleD: { // 充值标题
                agnetUserId: '用户在代理商的id',
                amount: '充值金额',
                tradeNo: '彩票平台交易流水号',
                tradeTime: '彩票平台交易时间',
                beforeAmount: '充值前余额',
                afterAmount: '充值后余额',
                agentTradeNo: '代理商订单号',
                beforAmount: '充值前余额',
                agentTradeTime: '代理商的订单创建时间'
            },
             titleW: { // 提现标题
                agnetUserId: '用户在代理商的id',
                amount: '提现金额',
                tradeNo: '彩票平台交易流水号',
                tradeTime: '彩票平台交易时间',
                beforeAmount: '提现前余额',
                afterAmount: '提现后余额',
                agentTradeNo: '代理商订单号',
                beforAmount: '提现前余额',
                agentTradeTime: '代理商的订单创建时间'
            }
        }
    },
    created(){
        
    },
    methods:{
        handleClose() {
            this.$store.state.home.flag_oAlert = false;
            this.$router.push({ path: '/login' })
            sessionStorage.setItem('curMid',1)
        }
    }
}
</script>

<style scoped lang="stylus">
.alert-container
    width 400px
    height 300px
    background #2b2e3f  // #595f75
    margin 0px auto
    position fixed
    left 50%
    top 50%
    margin-top -150px
    margin-left -200px
    padding 0 20px
    box-sizing border-box
    z-index 1
    border-radius 10px
    box-shadow 0 0 15px #000
    .tit
        text-align center
        border-bottom 1px solid #595f75
        line-height 35px
        color #ffffff
    ul
        width 100%
        margin 0px auto
        color #595f75
        li  
            border-bottom 1px dashed #595f75
            display flex
            justify-content center
            line-height 26px
            span
                &:nth-child(1)
                    width 150px
                    display inline-block
                &:nth-child(2)
                    width 200px
            &:nth-last-of-type(1)
                border-bottom 0px
    button
        text-align center
        width 50%
        background #01c8b3
        color #ffffff
        border none 
        border-radius 17px
        margin-top 20px
div.bg
    z-index 0
@media screen and (max-width: 760px) and (min-width: 320px)
    .alert-container
        width 95%
        height 70%
        position fixed
        left 50%
        top 60%
        margin-top -50%
        margin-left -48%
        padding 0 10px
        font-size 12px
</style>