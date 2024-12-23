<template>
  <!-- <div class="adBox">
    <swipe class="my-swipe" :speed="500" :auto="0" :show-indicators="true" :no-drag="true">
      <swipe-item class="slide1">
        <div class="cnyName">
          <div class="cnyName_tige">
            <i></i><span>人民币账户CNY</span>
          </div>
          <div class="moerysp">
            <ul class="moerysp_ul clear">
              <li>
                <span class="j_totalrmb">{{totalrmb}}</span>
                <p>总资产</p>
              </li>
              <li>
                <span class="j_ylrmb loss">{{ylrmb}}</span>
                <p>总盈利</p>
              </li>
              <li>
                <span class="j_szrmb">{{szrmb}}</span>
                <p>总市值</p>
              </li>
            </ul>
          </div>
          <div class="moerysp moerysp2">
            <ul class="moerysp_ul clear">
              <li>
                <span class="j_kqrmb">{{kqrmb}}</span>
                <p>可取</p>
              </li>
              <li>
                <span class="j_kyrmb">{{kyrmb}}</span>
                <p>可用</p>
              </li>
              <li>
                <div class="band_over j_yzzz" @click="action10061('/jy/dcgyh/dcg_index2.0.html')">
                  银证转账
                </div>
              </li>
            </ul>
          </div>
        </div>
      </swipe-item>
    </swipe>
  </div> -->

  <div class="explain content native-scroll">
    <div class="wrancont">
      <templates url="gz/holding_chicang"></templates>
    </div>
  </div>

  <div class="window_mask" v-show="openShowTab" @click.stop="tclick"></div>
  <div class="window_custon" v-show="openShowTab"><div class="zhbox"><!--
  --><p  class="list" v-show="buy"><span v-if="allShowTab" @click.stop="tradeaction('13010','buy')">限价买入</span><span @click.stop="tradeaction('13014','buy')" >定价买入</span><span @click="action10090('/jy/gz/gz_gjqr.html?sType=0')">成交确认买入</span><span class="noborder" @click.stop="tradeaction('13016','buy')">互报成交确认买入</span></p><!--
  --><p  class="list" v-show="sale" ><span v-if="allShowTab" @click.stop="tradeaction('13011','sell')">限价卖出</span><span @click.stop="tradeaction('13015','sell')">定价卖出</span><span @click="action10090('/jy/gz/gz_gjqr.html?sType=1')">成交确认卖出</span><span class="noborder" @click.stop="tradeaction('13017','sell')">互报成交确认卖出</span></p><!--
  --><span class="qx" @click.stop="tclick"><em class="shu"></em><em class="heng"></em></span></div></div>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import templates from '../../../../common/templates.vue'
  import utils from '../../../../../util/util'
  import localService from '../../../../../services/localService'

  require('vue-swipe/dist/vue-swipe.css');
  export default{
    data(){
      return {
        totalrmb:'',
        szrmb:'',
        kqrmb:'',
        kyrmb:'',
        ylrmb:'',

        totalmy:'',
        szmy:'',
        kqmy:'',
        kymy:'',
        ylmy:'',

        totalgb:'',
        szgb:'',
        kqgb:'',
        kygb:'',
        ylgb:'',
        buy:'',
        sale:'',
        gridData:'',
        allShowTab:false,
        openShowTab:false,
      }
    },
    ready(){

    },
    attached(){
      this.gridData = '';
      this.allShowTab = false;
      this.openShowTab = false;
      this.inits();
    },
    methods: {
      inits(){

      },
      action10090(url){
        let listData = this.gridData,
            ArrayList = listData.split('|'),
            stockcode = ArrayList[0];
        if(!!stockcode){
          if(url.indexOf('?')>=0){
            url += '&stockcode='+stockcode;
          }else{
            url += '?stockcode='+stockcode;
          }
        }
        this.$TZT.action10090({url:url,logintype:1});
      },
      tradeaction(action,type){
        var listData = this.gridData;
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[0];
        var taps =0;
        if(type=="sell"){
          taps =1;
        }
        console.log(stockcode);
        localService.saveMapMesg({'footerStockcode':stockcode});
        this.$TZT.tradeaction({action:action,});
        this.tclick();
      },
      showtaps(index){
        this.openShowTab = true;
        if(index&& index=="sell"){
          this.sale=true;
          this.buy=false;
        }else if(index&& index=="buy"){
          this.buy=true;
          this.sale=false;
        }
      },
      tclick(){
        this.openShowTab = false;
        // $('.window_custon,.window_mask').css("display","none");
      },
      setData(data){
        this.gridData = data;
      },
      action10061(url){
        this.$TZT.action10061({url:url});
      }
    },
    events:{
      'showtap':function(index,stockProp){
        if(index == 'buy' && stockProp == '2'){
          this.tradeaction('13010','buy');
          return;
        }else if(index == 'sell' && stockProp == '2'){
          this.tradeaction('13011','sell');
          return;
        }else if(!stockProp){
          this.allShowTab = true;
        }
        this.showtaps(index);
      },
      'gridDataSet':function(index){
        this.setData(index);
      },
      'fundList':function (oData) {
        var that = this;
        if(!oData.GRID2){
          return;
        }
        oData.GRID2.shift();
        //个人资产
        $.each(oData.GRID2, function (o, oitem) {
          var aIt = oitem.split('|');
          //币种 人民币  美元 港币
          var type = aIt[oData['2_MONEYTYPEINDEX']];
          //可取
          var sKq = aIt[oData['2_AVAILABLEINDEX']];
          //可用
          var sKy = aIt[oData['2_USABLEINDEX']];
          if (type == '0' || type =='RMB' || type=='rmb') {
            that.totalrmb = oData.TOTALASSET_RMB;
            that.szrmb = oData.MKTVAL_RMB;
            that.kqrmb = sKq;
            that.kyrmb =sKy;
            var val = parseFloat(oData.TOTALYK_RMB);
            if (val > 0) {
              that.ylrmb = '+' + oData.TOTALYK_RMB;
            }
            else if (val < 0) {
              that.ylrmb = oData.TOTALYK_RMB;
            }
            else {
              that.ylrmb = oData.TOTALYK_RMB;
            }

          }
          //美元
          else if (type == '1' || type =='USD' || type=='usd') {
            that.totalmy = oData.TOTALASSET_USD;
            that.szmy = oData.MKTVAL_USD;
            that.kqmy = sKq;
            that.kymy = sKy;
            var val = parseFloat(oData.TOTALYK_USD);
            if (val > 0) {
              that.ylmy = '+' + oData.TOTALYK_USD;
            }
            else if (val < 0) {
              that.ylmy = oData.TOTALYK_USD;
            }
            else {
              that.ylmy = oData.TOTALYK_USD;
            }
          }
          //港币
          else if (type == '2' || type =='HK' || type=='hk' || type =='HKD' || type=='hkd') {
            that.totalgb = oData.TOTALASSET_HK;
            that.szgb = oData.MKTVAL_HK;
            that.kqgb = sKq;
            that.kygb = sKy;
            var val = parseFloat(oData.TOTALYK_HK);
            if (val > 0) {
              that.ylgb = '+' + oData.TOTALYK_HK;
            }
            else if (val < 0) {
              that.ylgb = oData.TOTALYK_HK;
            }
            else {
              that.ylgb = oData.TOTALYK_HK;
            }
          }
        });
      }
    },
    components:{
      Swipe,
      SwipeItem,
      templates
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../../assets/less/variables.less';
  @import "../../../../../assets/less/mixins.less";
  .window_mask {
    position: absolute;
    display: block;
    left: 0px;
    top: 0px;
    background-color: rgb(0, 0, 0);
    opacity: 0.7;
    z-index: 1000;
    filter: alpha(opacity=70);
    width: 100%;
    height: 100%;
  }
  .window_custon{top:40%;width:60%;left:20%;border-radius:3px;z-index: 1001; position: absolute; display: block; background-color: rgb(240, 240, 240);}
  .window_custon .list span{display:block;font-size:14px;width: 100%; height:40px;line-height:40px;border-bottom:1px solid #ccc;text-align:center;}
  .window_custon .list .noborder{border:none}
  .window_custon .qx{position: absolute;right:-9px;top:-9px;display:inline-block;width:30px;height:30px;border-radius:15px;background:#ccc;font-size: 0;z-index:1002;}
  .qx .shu,.qx .heng{display:inline-block;width:100%;height:1px;background:#F45E5E;position:relative;top:15px;left:0;transform:rotate(45deg);-webkit-transform:rotate(45deg);}
  .qx .heng{transform:rotate(-45deg);-webkit-transform:rotate(-45deg);top:13px;left:0;}
  .window_custon .list{padding:0 20px;}
  .explain {
    // height: 100%;
    // padding-top: 135px;
    top: 2.2rem;
    // position: relative;
  }

  .cnyName .cnyName_tige {
    margin: 6px 7px;
    border-bottom: 1px dashed #e7e7e7;
    text-align: left;
    font-size: 0.7rem;
  }
  .moerysp {
    border-bottom: 1px solid #e7e7e7;
  }
  .cnyName .moerysp {
    margin: 0px 5px;
  }
  .cnyName .moerysp_ul {
    margin: 6px 0px;
  }
  .moerysp_ul li {
    float: left;
    width: 33.333%;
    text-align: center;
    border-left: 1px solid #e7e7e7;
  }
  .moerysp_ul li:first-child {
    border-left: 0;
  }
  .moerysp_ul li span {
    color: #090909;
    font-size: 12px;
    font-weight: bold;
    line-height: 14px;
    display: block;
  }
  .moerysp_ul li p {
    color: #5d5d5d;
    font-size: 12px;
    font-weight: bold;
    line-height: 14px;
    margin-top: 5px;
  }
  .clear:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
  }
  .moerysp2 li {
    border-left: 0;
  }
  .band_over {
    background-color: #cb2323;
    text-align: center;
    color: #ffffff;
    height: 27px;
    width: 95px;
    font-size: 12px;
    line-height: 27px;
    margin: 5px auto 0;
  }
  .adBox {
    width: 100%;
    height: 135px;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 100;
    overflow: hidden;
  }
  .wrancont{
    width: 100%;
    height: 100%;
    position: relative;
  }


</style>
