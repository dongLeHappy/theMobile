<template lang='jade'>
    .all-lottery-select
        ul(:v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
            li(v-for="item,index in list", :key="index")  {{ item.issue }}  {{ item.number }}  {{ item.time }}
        .all-lottery-checked(@click="showSelect")
            span 六合彩
            svg-icon(icon-class="arrows-left")
        datalist.all-lottery-tobe-Select(v-show="isShow")
            div(@click="showSelect") 请选择
                svg-icon(icon-class="arrows-left")
            div.all-lottery-list
                div.all-lottery-tit 全部
                div.all-lottery-subclass
                    span 全部 
            div.all-lottery-list(v-for="list,index in lotterClass", :key="index")
                div.all-lottery-tit {{ list.gameName }}
                div.all-lottery-subclass
                    span(v-for="sublist,index in list.subClass", :key="index") {{ sublist.name }}
        .bg(v-if="isShow")
</template>
<script>
import { InfiniteScroll } from 'mint-ui'
import { getAllLottery, getHistoricRecord } from '@/api/memberCenter'
export default {
    name: 'allLotterySelect',
    props:[],
    data() {
        return {
            loadMore: false,
            isShow: false,
            lotterClass: [],
            list: []
        }
    },
    mounted(){
        this.getAllLottery() // 获取所有中彩种
        this.getHistoricRecord() // 获取历史记录
    },
    methods: {
        showSelect(){
            this.isShow = !this.isShow;
        },
        getAllLottery(){ // 获取所有中彩种
            return new Promise((resolve, reject) => {
                getAllLottery().then((response) => {
                    let res = response.data
                    if(res.data.code == 0){
                        this.lotterClass = res.data.data
                    }
                    resolve()
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        getHistoricRecord() { // 获取历史记录
            return new Promise((resolve, reject) => {
                this.loading = true;
                getHistoricRecord().then((response) => {
                    let res = response.data
                    this.list = res.data.data
                    let last = this.list[this.list.length - 1];
                    this.loading = false;
                    resolve()
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        }
    }
}
</script>
<style scoped lang="stylus">
.all-lottery-select
    display block
    .all-lottery-checked
        display block
    .all-lottery-tobe-Select
        display block
        position fixed
        transition bottom 2s
        bottom 0
        background #ccf
        width 100%
        min-width 3.75rem
        max-width 3.75rem
        z-index 11
        .all-lottery-list
            display flex
            flex-wrap wrap
            width 100%
            height auto
            .all-lottery-tit
                width 20%
                line-height 0.26rem
                text-align center
            .all-lottery-subclass
                width 80%
                span
                    padding-right 0.1rem
                    line-height 0.26rem
</style> 