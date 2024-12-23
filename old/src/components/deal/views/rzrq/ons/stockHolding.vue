<template>
  <div class="adBox1" style="height: 117px;position: relative;width: 100%;">
    <div class="banner" id="J_header">
      <div id="d-slide" class="swipe" style="visibility: visible;">
        <div class="cnyName">
          <div class="cnyName_tige">
            <i></i><span>信用资产</span><span class="cny_xq" @click="action10061('/jy/ptjy/qTemplate.html?title=信用资产&url=/jy/rzrq/js/qcxzcnew.js')">详情&gt;</span>
          </div>
          <div class="moerysp">
            <ul class="moerysp_ul clear">
              <li>
                <span class="j_totalrmb">{{totalrmb}}</span>
                <p>负债总额</p>
              </li>
              <li>
                <span class=" j_ylrmb">{{ylrmb}}</span>
                <p>个人维持担保比例</p>
              </li>
              <li>
                <span class="j_szrmb">{{szrmb}}</span>
                <p>可用保证金</p>
              </li>
            </ul>
          </div>
          <div class="moerysp moerysp2">
            <ul class="moerysp_ul clear">
              <li>
                <span class="j_kqrmb">{{kqrmb}}</span>
                <p>融资可用额度</p>
              </li>
              <li>
                <span class="j_kyrmb">{{kyrmb}}</span>
                <p>融券可用额度</p>
              </li>
              <li>
                <div class="band_over j_yzzz" @click="action10061('/jy/rzrq/bankcr2.0.html')">银证转账</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="explain content native-scroll">
    <div class="wrancont">
      <templates url="rzrq/holding_chicang"></templates>
    </div>
  </div>

</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import templates from '../../../../common/templates.vue'
  import service_rzrq from '../../../service/trade/service_rzrq'
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
      inits(){
        var that = this;
        service_rzrq.require406().then((oData)=>{
          if(oData.GRID0 && oData.GRID0[1]){
            var newGRID = [];
            var oldGRID= oData.GRID0[1].split('|'),
              ln = oldGRID.length,
              i=0;
            for(;i<ln;i++){
              if(oData.PERASSURESCALEVALUEINDEX && oData.PERASSURESCALEVALUEINDEX == i && oldGRID[oData.PERASSURESCALEVALUEINDEX] != ''){
                if(parseFloat(oldGRID[i])){
                  oldGRID[i] = (parseFloat(oldGRID[i])*100).toFixed(2)+'%';
                }
              }
            }
          }
          that.totalrmb = oldGRID[oData.TOTALDEBITINDEX||2]; //该索引取不到，暂时这样处理
          that.ylrmb = oldGRID[oData.PERASSURESCALEVALUEINDEX];
          that.szrmb = oldGRID[oData.CREDITBALANCEINDEX];
          that.kqrmb = oldGRID[oData.FINENABLEQUOTAINDEX];
          that.kyrmb = oldGRID[oData.SLOENABLEQUOTAINDEX];
        })
      },
      action10061(url){
        this.$TZT.action10061({url:url});
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
    position: absolute;
    top: 155px;
  }

  .cnyName .cnyName_tige {
    margin: 6px 7px;
    border-bottom: 1px dashed #e7e7e7;
    text-align: left;
    font-size: 0.7rem;
    span{display: inline-block;width: 50%;}
    .cny_xq{text-align: right;}
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
    top: 30px;
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
