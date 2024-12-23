<template>
  <div class="adBox1" style="width: 100%;height: 145px; position: relative;">
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
  </div>

  <div class="explain content native-scroll">
    <div class="wrancont">
      <templates url="ggt/holding_chicang" v-bind:action="" v-bind:viewname=""></templates>
    </div>
  </div>

</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import templates from '../../../../common/templates.vue'
  import service_ptjy from '../../../service/trade/service_ptjy'
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
      }
    },
    ready(){

    },
    attached(){
      this.inits();
    },
    methods: {
      action10061(url){
        this.$TZT.action10061({url:url});
      },
      inits(){
        var that = this;
        var oSendData = {
          startpos:0,
          maxcount:1
        };
        service_ptjy.require117(oSendData)
          .then((oData)=>{
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
              else if (type == '2' || type =='HK' || type=='hk'|| type =='HKD' || type=='hkd') {
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
          });
      }
    },
    events:{
      'fundList':function (oData) {

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
  .explain {
    // height: 100%;
    // padding-top: 135px;
    // position: relative;
    position: absolute;
    top: 167px;
  }

  .cnyName .cnyName_tige {
    margin: 6px 7px;
    border-bottom: 1px dashed #e7e7e7;
    text-align: left;
    font-size: 0.7rem;
  }
  .cnyName_tige i{
    width: 16px;
    height: 12px;
    background: url(../../../../../assets/jy/images/jy-chicang.png) -4px -4px no-repeat;
    background-size: 50px 40px;
    display: block;
    float: left;
    margin-top: 3px;
    position:inherit;
    border: none;
    -webkit-transform:rotate(0deg);
  }
  .cnyName_tige .usd {
     background-position: -29px -3px;
  }
  .cnyName_tige .hk {
     background-position: -4px -20px;
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
    height: 135px;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    z-index: 2;
    overflow: hidden;
  }
  .wrancont{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .swipe-indicator.active{
    background: #777575;
  }
</style>
