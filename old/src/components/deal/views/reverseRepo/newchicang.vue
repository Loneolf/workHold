<template>
  <div class="content">
    <div class="nbsp"></div>
    <div class="header">
      <p class="index">当前持仓(元)</p>
      <p class="price">{{chicangFunds}}</p>
    <!--   <p class="addprice">+4000.00</p> -->
    </div>
    <div class="usable">
      <p class="index">可用资金(元)：</p>
      <p class="prices">{{availableFunds}}</p>
      <p class="zrzj" @click="zrzj()"><span>转入资金</span></p>
      </div>

       <div class="nbsp"></div>
      <div class="cyhy"><span></span>持有合约</div>
      <div class="swipe my-swipe">
        <templates url="reverseRepo/chicang" action="" viewname=""></templates>
      </div>
     
    </div>
    <div class="foot">
         <p class="jyjl" @click="clickdata(0)">交易记录</p>
         <p class="qjy" @click="clickdata(1)">去交易</p>
        <!--  <div class="dt"></div> -->
     </div>
</template>
<script>
  import utils from '../../../../util/util'
  import repoconfig from '../../scripts/repoconfig'
  import tradingconfig from '../../scripts/tradingconfig'
  import templates from '../../../common/templates-gznhg.vue'
  import service_deal_often from '../../service/common/service_deal_often'
  import service_repo from '../../../deal/service/trade/service_repo'
  import { Swipe, SwipeItem } from 'vue-swipe';
   
export default {
  data () {
    return {
      availableFunds:'--',
      jyloginflag:0,
      chicangFunds:'--',
    }
  },
  ready(){

  },
  attached(){
    this.getCustomers();
    this.getChicang();
  },
  methods:{
    getCustomers(){
      var that  = this;
      service_deal_often.require116()
        .then((data)=>{
          //console.log(utils.fmoney("12345.675910", 3))
          data[0] && data[0][1]['USABLEINDEX'] && that.$set('availableFunds',tradingconfig.fmoney(data[0][1]['USABLEINDEX'], 2));
          /*data[0] && data[0][1]['TOTALINDEX'] && that.$set('chicangFunds',tradingconfig.fmoney(data[0][1]['TOTALINDEX'],2));  */
        })
    },
    getChicang(){
      var that  = this;
       let oSendData = {
          //起始位置
          StartPos: 0,
          //最大条数
        /*  MaxCount: repoconfig.config.pagecount*/
        };
       service_repo.require6594(oSendData)
        .then((data)=>{
           data.TOTALBUSINESSBALANCE && that.$set('chicangFunds',tradingconfig.fmoney(data.TOTALBUSINESSBALANCE,2));
           
         // that.chicangFunds = tradingconfig.fmoney(data.TOTALBUSINESSBALANCE,2);
        })
    },
    clickdata(index){
      let urlArray = [
        '/deal/reverseRepo/repoQuery',
        '/deal/reverseRepo/repoList',
      ];
      this.$TZT.action10061({url:urlArray[index]});
    },
     zrzj(){
      this.$TZT.action10061({url:'/newjy/dcgyh/dcg_index.html'});
    },
  
  },
    components:{
      templates
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../../assets/less/variables.less';
 .content{
 background: #f4f4f4;
} 
.dt{
  height: 20px;
  background: #f4f4f4;
}
.nbsp{
 height: 10px;
 background: #f4f4f4;
}
.header{
  font-size: 14px;
  color: #3d3d3d;
  padding-left: 20px;
  padding-top: 15px;
  height: 110px;
 /*  border-bottom: 1px solid #f3f3f3; */
  background: #fff;
  position: relative;
}
 .header:after{
  content: '';
  position: absolute;
  width: 200%;
  height: 1px;
  background: #eee;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  z-index: 1;
}
.header:after{
  bottom: 0;
  left: 0;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;

}
.price{
  font-size: 38px;
  font-weight: bold;
  color: #f43438;
  word-wrap: break-word;
}
.addprice{
  font-size: 16px;
  color: #f43438;
}
.usable{
  height: 64px;
  font-size: 16px;
  color: #3d3d3d;
  padding-left: 20px;
  padding-top: 10px;
  background: #fff;
  position: relative;
  /* line-height: 64px; */
  p{
   /*  display: inline-block; */
  }
}
.prices{
  font-weight: bold;
}
.zrzj{
  height: 34px;
  line-height: 34px;
  width: 90px;
  background: #ff4342;
   margin-left: 8px; 
  font-size: 16px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 15px;
  right: 10px;
}
.native-scroll{
   /*margin-top: 270px; */
}
.cyhy{
    font-size: 16px;
    padding-left: 20px;
    height: 49px;
    color: #3d3d3d;
    line-height: 49px;
    background: #fff;
    font-weight: 600;
    span{
        height: 8px;
        width: 8px;
        background: #f43438;
        display: inline-block;
        margin-right: 5px;
    }
}
.my-swipe{
  background: #fff;
  margin-bottom: 80px;
}
.foot{
    position: fixed;
    bottom: 0;
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    margin-top: 30px;
   /*  margin-bottom: 20px; */
    z-index: 100;
    border-top: 1px solid #f3f3f3;
    p{
      width: 48%;
      display: inline-block;
      text-align: center;
      font-size: 16px;
    }
    .jyjl{
      border-right: 1px solid #f4f4f4;
      color: #3d3d3d;
    }
    .qjy{
      color: #f43438;
    }
}
.swipe, .swipe-items-wrap{
  height: auto;
}
</style>
