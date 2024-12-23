<template>
  <account></account>
  <div id="chicang-list-container" style="margin-top: .08rem;position: relative;z-index: 10;">
    <title-bar id="chicang-title" :title="'持仓展开行情'" :right-text="rightText">
      <switch v-if="isSwitchShow" :init-status="isMinTimeShow" @on="switchOn" @off="switchOff"></switch>
    </title-bar>
    
    <template-holding url="ptjy/chicang3" :switch-status="isMinTimeShow" :eye-status="eyeStatus" v-ref:chicangnew></template-holding>
  </div>
  <div class="ttlc-container" v-if="currAccount == '0' && (isTTLCYTQshow || isTTLCDTQshow)">
    <div class="ttlctip ttlc_ytq" v-if="currAccount == '0' && isTTLCYTQshow" @click="jumpToTTLCYTQ">查看天天利财一天期<span class="icon"></span></div>
    <div class="splitline" v-if="currAccount == '0' && isTTLCYTQshow && isTTLCDTQshow"></div>
    <div class="ttlctip ttlc_dtq" v-if="currAccount == '0' && isTTLCDTQshow" @click="jumpToTTLCDTQ">查看天天利财多天期<span class="icon"></span></div>
  </div>
  
  <title-bar v-show="isShowZaiTuBar" class="zaitu" :class="{'ttlc': currAccount == '0' && (isTTLCYTQshow || isTTLCDTQshow),'noBottomLine':!isShowQingCangBar}" :title="'在途证券'" is-right-icon="true" @click="jumpToZaiTuStock"></title-bar>
  <title-bar v-show="isShowQingCangBar" class="qingcang" :style="{'margin-top':isShowZaiTuBar ? '' : '.2rem'}" :class="{'ttlc': currAccount == '0' && (isTTLCYTQshow || isTTLCDTQshow)}" :title="'已清仓证券'" is-right-icon="true" @click="jumpToQingCangStock"></title-bar>
  
</template>
<script>
//   import templates from '../../../../common/templates.vue'
  import account from '../../../../common/qTemplates/ptjy/account.vue';
  import titleBar from '../../../../common/qTemplates/ptjy/titleBar.vue';
  import templateHolding from "../../../../common/templates3.vue";
  import Switch from "../../../../common/Switch.vue";
  require('vue-swipe/dist/vue-swipe.css');
  export default{
    data(){
      return {
        isTTLCYTQshow: false,
        isTTLCDTQshow: false,
        currAccount: '',
        isMinTimeShow: false,
        isSwitchShow: false,
        eyeStatus: true,
        isShowZaiTuBar: true,
        isShowQingCangBar: true,
      }
    },
    computed: {
      rightText(){
        return this.currAccount == '0_HK' ? '注：成本/市价为港元计价' : '';
      }
    },
    ready(){
      var that = this
      var result1 = CiticsNative.NativeCall("getCSValueForKey",["CS_Switch_ShowZTNavbar","1"]);
      var result2 = CiticsNative.NativeCall("getCSValueForKey",["CS_Switch_ShowQCNavbar","1"]);
      try {
        var res1 = JSON.parse(result1);
        var res2 = JSON.parse(result2);
        if (!res1.result) {
          that.isShowZaiTuBar = true
        } else {
          if(res1.result === "1") {
            that.isShowZaiTuBar = true
          } else {
            that.isShowZaiTuBar = false
          }
        }
        if (!res2.result) {
          that.isShowQingCangBar = true
        } else {
          if(res2.result === "1") {
            that.isShowQingCangBar = true
          } else {
            that.isShowQingCangBar = false
          }
        }
      } catch(e) {
        console.log('getCSValueForKey获取失败')
      }
    },
    attached(){
      this.init();
    },
    methods: {
      init(){
        var that = this;
        H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
          H5TZT.readFileMesg('MINTIME_SWITCH_STATUS_' + oData.USERCODE, function (_oData) {
            if(_oData && _oData == '1'){
              that.isMinTimeShow = true;
            }
            else{
              that.isMinTimeShow = false;
            }    
            that.isSwitchShow = true;      
          });
        }); 
      },
      switchOn(){
        var that = this;
        H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
          H5TZT.saveFileMesg('1', 'MINTIME_SWITCH_STATUS_' + oData.USERCODE, function(){
            that.isMinTimeShow = true;
          });
        }); 
      },
      switchOff(){
        var that = this;
        H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
          H5TZT.saveFileMesg('', 'MINTIME_SWITCH_STATUS_' + oData.USERCODE, function(){
            that.isMinTimeShow = false;
          });
        }); 
      },
      action10061(url){
        this.$TZT.action10061({
          type: 'weituo',
          url: url
        });
      },
      // 跳转持仓说明
      jumpToChiCangShuoMing(){
        this.action10061('/newjy/chicangshujushuoming/chicangshujushuoming.html');
      },
      // 跳转到在途证券
      jumpToZaiTuStock() {
        maidian.reportEvent('jy_wtjy_cc_ztzq', {
          'appkey': 'aa347fba81312f23',
          'record_cluster':'xet_HMA',
          'xwhat':'resource_click',
          'title':'委托交易',
          'resource_name':'在途证券',
          'resource_module':'持仓',
          'function_module':'交易',
          'function':'普通沪深京全屏交易'
	      });
        this.action10061('/newjy/zaiTuZhengQuan/html/index.html')
      },
      // 跳转已清仓股票
      jumpToQingCangStock(){
        // 港股通
        if(this.currAccount == '0_HK'){
          this.action10061('/newjy/gupiaofupan/qingcanggu/index.html?tabType=2');
          return;
        }
        this.action10061('/newjy/gupiaofupan/qingcanggu/index.html?tabType=1');
      },
      // 跳转天天利财一天期
      jumpToTTLCYTQ(){
        this.$TZT.action10090({
            url: this.$TZT.action10061({
                type: 'weituo',
                url: '/newzt/zichanquanjing/html/cash_assets_putong.html',
                secondtype: '99',
                secondtext: '管理',
                secondurl: encodeURIComponent('http://action:10061/?secondtype=9&&url=/investment/positions/html/positions_administration.html?showType=cash'), // 持仓设置
                isExport: true
            })
        });
      },
      // 跳转天天利财多天期
      jumpToTTLCDTQ(){
        var url = '/investment/positions/html/positions_fund_list.html?type=LGD&title='+ encodeURIComponent('中信持仓')
        this.action10061(url);
      }
    },
    events:{
      'setHoldingData': function (gridData, oData1, oData2, exchangeRateList) {
        this.$broadcast('initAccount', gridData, oData1, oData2, exchangeRateList);
        // 天天利财一天期入口展示
        if (oData1['MKTVAL_ONEDAYBJHG'] && parseFloat(oData1['MKTVAL_ONEDAYBJHG'])>0){
          this.isTTLCYTQshow = true;
        }
        // 天天利财多天期入口展示
        if (oData1['MKTVAL_MULTIDAYBJHG'] && parseFloat(oData1['MKTVAL_MULTIDAYBJHG'])>0){
          this.isTTLCDTQshow = true;
        }
      },
      'setComputedHoldingData': function(gridData){
        this.$broadcast('updateAccount', gridData);
      },
      'slideChangeTransitionStart': function(){
        this.$broadcast('clearHqTimer');
      },
      'slideChangeTransitionEnd': function(account){
        this.$broadcast('getCurrAccount', account);
        this.currAccount = account;
        console.log('---------------------------',this.currAccount)
      },
      'accountReady': function(accountList, type){
        this.$broadcast('loadingEnd', accountList, type);
      },
      'setEyeStatus': function(eyeStatus){
        this.eyeStatus = eyeStatus;
      },
      'refreshInitStatus': function() {
        this.init()
      }
    },
    components:{
      account,
      templateHolding,
      titleBar,
      Switch
    }
  }
</script>
<style lang="less" scoped>
  .ttlc-container {
    display: flex;
    flex-direction: row;
    height: .74rem;
    line-height: .74rem;
    align-items: center;
    .ttlctip {
      width: 100%;
      height: .36rem;
      line-height: .36rem;
      font-family: PingFangSC-Regular;
      font-size: .24rem;
      color: #AAAAAA;
      letter-spacing: 0;
      justify-content: center;
      font-weight: 400;
      display: flex;
      align-items: center;
      .icon {
        width: 0.36rem;
        height: 0.36rem;
        background: url(../../../../../assets/jy/images/icon-godetail.png) no-repeat;
        background-repeat: no-repeat;
        background-size: 100%;
        margin-top: .02rem;
      }
    }
    .splitline{
      width: 1px;
      height: .4rem;
      background: #E5E5E5;
    }
  }
  .ttlc {
    margin-top: 0!important;
  }
  
</style>

<style lang="less">
  .page.page-current, .page-group.page-current {
      position: relative;
      overflow: auto;
      background: #F5F5F5;
      > div:last-child{
        margin-bottom: .5rem;
      }
  }

  .van-switch{
    margin-left: .2rem;
    width: .78rem!important;
    height: .4rem!important;
    background-color: #CCCCCC!important;
    border: 1px solid #CCCCCC!important;
    display: flex;
    align-items: center;
    .van-switch__node{
      width: .4rem!important;
      height: .4rem!important;
      background-color: #FEFFFE!important;
      box-shadow: none!important;
    }
    &.van-switch--on {
      background-color: #ED2121!important;
      border: 1px solid #ED2121!important;
      .van-switch__node {
          -webkit-transform: translateX(0.38rem) !important; 
          transform: translateX(0.38rem) !important; 
      }
    }
  }
</style>
