<template>
  <!-- 普通 -->
  <div :class="isptjy" >
    <div class="buy" @click="tradeaction('12310')"><em></em><span>买入</span></div><!--
    --><div class="sale" @click="tradeaction('12311')"><em></em><span>卖出</span></div><!--
    --><div class="chedan" @click="tradeaction('12340')"><em></em><span>撤单</span></div>
  </div>
  <!-- 股转 -->
  <div :class="isgzjy">
    <div class="buy" @click="gzclick('mr')"><em></em><span>买入</span></div><!--
    --><div class="sale" @click="gzclick('mc')"><em></em><span>卖出</span></div><!--
    --><div class="chedan" @click="tradeaction('13018')"><em></em><span>撤单</span></div>
  </div>
  <!-- 港股 -->
  <div :class="isggtjy">
    <div class="buy" @click="tradeaction('16010')"><em></em><span>买入</span></div><!--
    --><div class="sale" @click="tradeaction('16011')"><em></em><span>卖出</span></div><!--
    --><div class="chedan" @click="tradeaction('16012')"><em></em><span>撤单</span></div>
  </div>
  <div v-show="isShowMr" class="mr-box">
      <span @click.stop="tradeaction('13010')" v-if="spValueFlag">限价买入</span><span @click.stop="tradeaction('13014')" >定价买入</span><span @click="action10090('/jy/gz/gz_gjqr.html?sType=0')">成交确认买入</span><span class="noborder" @click.stop="tradeaction('13016')">互报成交确认买入</span>
  </div>
  <div v-show="isShowMc" class="mc-box">
      <span @click.stop="tradeaction('13011')" v-if="spValueFlag">限价卖出</span><span @click.stop="tradeaction('13015')">定价卖出</span><span @click="action10090('/jy/gz/gz_gjqr.html?sType=1')">成交确认卖出</span><span class="noborder" @click.stop="tradeaction('13017')">互报成交确认卖出</span></p>
  </div>
</template>

<script>
  import util from  '../../../util/util'
  import localService from '../../../services/localService'
  import tztStockType from '../scripts/tztStockType'
export default {
  data () {
    return {
      stockcode:'',
      NEWMARKETNO:'',
      isptjy:'footer', //普通委托
      isgzjy:'footer', //股转
      isggtjy:'footer', //港股通
      isShowMr : false, //股转买入
      isShowMc : false,  //股转卖出
      stockProp:'', //股票属性
      spValueFlag: true, //股票属性值是否传过来，默认表示没有传过来
    }
  },
  ready(){

  },
  attached(){
    this.stockcode=this.$route.query.stockcode;
    this.NEWMARKETNO = this.$route.query.marketno;
    this.init();
  },
  methods:{
      init(){
        if(tztStockType.MakeStockMarketStock(this.NEWMARKETNO) && tztStockType.MakeHSMarket(this.NEWMARKETNO) && !tztStockType.MakeThreeBordMarket(this.NEWMARKETNO)){
            this.isptjy='footer';
            this.isgzjy='none';
            this.isggtjy='none';
        }else if(tztStockType.MakeStockMarketStock(this.NEWMARKETNO) && tztStockType.MakeHSMarket(this.NEWMARKETNO) && tztStockType.MakeThreeBordMarket(this.NEWMARKETNO)){
            this.isptjy='none';
            this.isgzjy='footer';
            this.isggtjy='none';
        }else if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){ //判断是不是港股个股
            this.isptjy='none';
            this.isgzjy='none';
            this.isggtjy='footer';
        }else{
          console.log('do not show footer');
          this.isptjy='none';
          this.isgzjy='none';
          this.isggtjy='none';
        }
      },
      action10090(url){
          this.isShowMr = false;
          this.isShowMc = false;
        this.$TZT.action10090({url:url});
      },
      tradeaction(action){
        this.isShowMr = false;
        this.isShowMc = false;
        localService.saveMapMesg({'footerStockcode':this.stockcode});
        let oObj = {action:action};
        if(action=='16010' || action=='16011' || action=='16012'){
          oObj.isCheckLoginRight = 'ggt'; //验证港股通权限
        }
        this.$TZT.tradeaction(oObj);
      },
      gzclick(index){
          localService.saveMapMesg({'footerStockcode':this.stockcode});
          this.$TZT.action10090({url:'/deal/gz/gz_index'});
//          if(!!this.stockProp && this.getStockProp(this.stockProp) != '1'){ //做市转让
//            if(index == 'mr'){
//              this.tradeaction('13010')
//            }else if(index == 'mc'){
//              this.tradeaction('13011');
//            }
//            return false;
//          }
//          if(index=="mr"){
//              this.isShowMc = false;
//              if(this.isShowMr==false){
//                  this.isShowMr = true;
//              }else{
//                  this.isShowMr = false;
//              }
//          }
//          if(index=="mc"){
//              this.isShowMr = false;
//              if(this.isShowMc==false){
//                  this.isShowMc = true;
//              }else{
//                  this.isShowMc = false;
//              }
//          }
      },
      getUrlParameter(parameterName){
          var reg = new RegExp("(^|&|\\?)" + parameterName + "=([^&]*)(&|$)", "i"),arr,arr1;
          arr = location.search.substr(1).match(reg);
          arr1 = location.hash.substr(2).match(reg);
          if (arr) {
             return arr[2].replace(/</g,'&lt;').replace(/>/g,'&gt;');
          }else if(arr1){
             return arr1[2].replace(/</g,'&lt;').replace(/>/g,'&gt;');
          } else return null;
      },
      /**
       * [getStockProp 根据股票属性来判断是股转的协议转让还是做市转让]
       * @param  {string} stockProp [股票属性字符串]
       * @return {string}           [1|协议转让 2|做市转让 空]
       */
      getStockProp(stockProp){
        if(!!stockProp && stockProp.length > 10){
          if(stockProp[10] == 'T'){
            return '1'; //协议转让
          }else if(stockProp[10] == 'M'){
            return '2'; //做市转让
          }
        }
        return '';
      }
  },
  events:{
    getstockprop:function(stockProp,NEWMARKETNO){
      if(!!stockProp){
        this.stockProp = stockProp;
        this.spValueFlag = false;
      }
      if(!this.NEWMARKETNO && !!NEWMARKETNO){
        this.NEWMARKETNO = NEWMARKETNO;
        this.init();
      }
    }
  },
  components:{
  }
}
</script>
<style lang="less" scoped>
  .footer{position:absolute;bottom:0;left:0;right:0;padding-bottom:-0.44rem;border-top:1px solid #999;}
  .footer>div{display:inline-block;width:33.33%;text-align:center;font-size:0.4rem}
  .footer>div>em{display:block;width:100%;height:28px;}
  .buy em{background: url('../../../assets/hq-icon/mairu.png') no-repeat 50%;background-size: 30px 28px;}
  .sale em{background: url('../../../assets/hq-icon/maichu.png') no-repeat 50%;background-size: 30px 28px;}
  .chedan em{background: url('../../../assets/jy/images/nav_3.png') no-repeat 50%;background-size: 21px 19px;}
  .none{display:none;}
  .mr-box{
      position: absolute;
      left: 35%;
      bottom: 57px;
      width: 141px;
      margin-left: -135px;
      margin-top: -110px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #e2e2e2;
      color: #333333;
      z-index: 99;
  span{display:block;font-size:14px;height:40px;line-height:40px;border-bottom:1px solid #ccc;text-align:center;}
  }
  .mc-box{
      position: absolute;
      left: 65%;
      bottom: 57px;
      width: 141px;
      margin-left: -135px;
      margin-top: -110px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #e2e2e2;
      color: #333333;
      z-index: 99;
  span{display:block;font-size:14px;height:40px;line-height:40px;border-bottom:1px solid #ccc;text-align:center;}
  }
</style>
