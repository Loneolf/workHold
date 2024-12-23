<template>
  <nav class="date-wrap">
    <div class="wrap"><span class="date-text"><input type="text" id="beigin-input" v-model="beiginValue" /></span><span class="icon">↔</span><span class="date-text"><input type="text" id="end-input" v-model="endValue" /></span><span class="date-btn" @click="dateFunc">确认</span></div>
  </nav>
</template>

<script>
  import dateFilter from '../../filters/dateTimeFormatter';
  import util from '../../util/util'
  var beidate = util.manyDays('-7');
  export default {
    data(){
      return {
        beiginValue:util.getYTDS(beidate),
        endValue:dateFilter(new Date().getTime(),2)
      }
    },
    attached(){
      this.inits();
    },
    methods:{
      inits(){
        var that = this;
         $("#beigin-input").datetimePicker({
            value: that.beiginValue.split('-')
         });
        $("#end-input").datetimePicker({
            value: that.endValue.split('-')
         });
      },
      dateFunc(){
        window.refreshhistorydata(this.beiginValue.replace(/-/g,''),this.endValue.replace(/-/g,''));
//        console.log(this.beiginValue,this.endValue);
      }
    }/*,
    watch: {
      beiginValue(val){
        console.log(val);
      }
    }*/
  }
</script>
<style lang="less" scoped>
  @import '../../assets/less/variables.less';
  .date-wrap{
    position: absolute;
    right: 0;
    left: 0;
    top:2.2rem;
    z-index: 20;
    height: 1.8rem;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
    background-color: #f7f7f8;
    -webkit-backface-visibility: hidden;
    vertical-align: top;
    backface-visibility: hidden;
    .date-text{
      display: inline-block;
      width: 30%;
      vertical-align: top;
      input{
        width: 100%;
        padding: 0;
        margin: 0;
        height: 1.25rem;
        line-height: 1.25rem;
        border: 1px solid #c5c5c5;
        background: #f9f9f9;
        font-size: 0.7rem;
        text-align: center;
      }
    }
    .icon{
      width: 10%;
      text-align: center;
      vertical-align: top;
      line-height: 1.25rem;
    }
    .date-btn{
      display: inline-block;
      width: 20%;
      margin-left: 10%;
      text-align: center;
      background: #cb2323;
      color: #fff;
      font-size: 0.7rem;
      vertical-align: top;
      line-height: 1.25rem;
    }
  }
  </style>
