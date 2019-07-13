<template>
<div class="selectWrap">
  <div class="select-wrapper">
    <div class="select" @click="triggerOption">
      <div class="select-content"> {{selectContent.text}} </div>
      <div class="triangle-wrapper">
        <div id="triangle-down"></div>
      </div>
    </div>
    <div class="option-wrapper" style="display: none;">
      <div class="option-item" v-for = "(item,index) in subject" :key="index" @mouseout="out($event)" @mouseover="move($event)" @click="choose(item)">{{item.text}}</div>
    </div>
  </div>
</div>
</template>
<script>
  export default{
    props: {
      selectWidth:{
        type:Number,
        default:100,
      },
      subject:{
        type:Array,
        default:function(){
          return []
        }
      },
      selectContent:{
        type:Object,
        default:function(){
          return {value:0, text:"请选择"}
        }
      },
    },
    data() {
        return {
            visible: false
        }
    },
    mounted(){
        document.querySelector(".selectWrap").style.width = this.selectWidth+"rem"
    },
    computed:{
        optionWrapper(){
            return document.querySelector(".option-wrapper");
        },
        selectCon(){
            return document.querySelector(".select-content");
        },
        subjectList(){
            return document.getElementsByClassName("option-item");
        },
    },
    methods:{
        move(event){ //模拟hover效果
            for(var item of this.subjectList){
                item.classList.remove("hover");
            }
            event.currentTarget.classList.add("hover");
        },
        out(event){
            event.currentTarget.classList.remove("hover");
        },
        triggerOption(){ //控制option的展示，以及选中后的高亮效果
            this.visible = !this.visible;
            if (this.optionWrapper.style.display == "none") {
                this.optionWrapper.style.display = "block";
            }else{
                this.optionWrapper.style.display = "none";
            }
            for(var item of this.subjectList){
                if (item.innerHTML == this.selectContent.text) {
                    item.classList.add("hover");
                }else{
                    item.classList.remove("hover");
                }
            }
        },
        choose(item){ //选中“option”
            this.selectContent.text = item.text;
            this.optionWrapper.style.display = "none";
            this.$emit("changeSelect",item);
        }
    },
  }
</script>
<style>
  .selectWrap{ /*select的宽度*/
    width: 1rem;
  }
  .select{
    position: relative;
    overflow: hidden;
    min-width: 0.8rem;
    width: 100%;
    height: 0.26rem;
    line-height: 0.26rem;
    border: 0.01rem solid #d4d4d4;
    cursor: default;
    font-size: 0.12rem;
  }
  .select-content{
    text-align: left;
    padding-right: 0.1rem;
    padding-left: 0.1rem;
  }
  .triangle-wrapper{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.26rem;
    height: 0.26rem;
    background-color: #fff;
    cursor: default;
  }
  #triangle-down{
    position: absolute;
    right: 0.06rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 0.07rem solid transparent;
    border-right: 0.07rem solid transparent;
    border-top: 0.08rem solid #d4d4d4;
  }
  .option-wrapper{
    position: relative;
    overflow: hidden;
    min-width: 0.08rem;
    width: 100%;
    border-right: 0.01rem solid #d4d4d4;
    border-bottom: 0.01rem solid #d4d4d4;
    border-left: 0.01rem solid #d4d4d4;
  }
  .option-item{
    min-width: 0.08rem;
    height: 0.26rem;
    line-height: 0.26rem;
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    text-align: left;
    cursor: default; 
  }
  .hover{
    background-color: #e4e4e4;
    color:#2d2d2d;
  }
</style> 