<template>
  <div class="content">
        <div class="hq-bar">
          <div>
            <span>新</span><span :class="handleColorStyle(upDown)"><i>{{lastPrice ? lastPrice : '--'}}</i><i>{{upDownPrice ? upDownPrice : '--'}}</i><i>{{upDown ? upDown : '--'}}</i></span>
          </div>
          <div>
            <span>收</span><span>{{closePrice ? closePrice : '--'}}</span>
          </div>
          <div>
            <span>开</span><span :class="handleColorStyle(upDown, openPrice)">{{openPrice ? openPrice : '--'}}</span>
          </div>
        </div>
        <div
          id="ttop"
          style="height: 100%"
          class="content-body"
        >
          <div class="tabs js-tabs">
            <swipe
              class="my-swipe ggstockinfo"
              :speed="300"
              :auto="0"
              :show-indicators="isNewMarketNo"
              v-ref:swipe
            >
              <swipe-item class="slide1">
                <component
                  :is="currentView"
                  v-bind:minsid="minsid"
                ></component>
              </swipe-item>
              <swipe-item class="slide2" v-if="isNewMarketNo"
                ><k-line></k-line
              ></swipe-item>
            </swipe>
          </div>
        </div>
  </div>
</template>

<script>
//head
import service_hq_often from "../service/common/service_hq_often";
import { Swipe, SwipeItem } from "vue-swipe";
import numToChinese from "../scripts/numToChinese.js";
import util from "../../../util/util";
import tztStockType from "../scripts/tztStockType.js";
// import gegutou from "../ons/stockInfo/gegutouNew.vue";

import min from "./hqStock/geguminNew";
import kLine from "../ons/canvas/kLine_trade_new";

// require('vue-swipe/dist/vue-swipe.css');

export default {
  props: {
      stockCode: {
          type: String,
          default: ''
      },
      wtAccountType: {
          type: String,
          default: ''
      },
      account: {
          type: String,
          default: ''
      },
      newMarketNo:{
          type: String,
          default: ''
      },
      isActive: {
          type: Boolean,
          default: true
      },
      stockCodeType:{
          type: String,
          default: ''
      },
      subStockType:{
          type: String,
          default: ''
      },
  },
  data() {
    return {
      id: 'hqchart',
      showAdd: false, //是否显示揭示
      changIndex: 0,
      Total_m: "",
      newdata: "",
      loading: false,
      Tabs1: [],
      Tabs2: [],
      selected: 0,
      selectedTemp: 0, //记录点击上一次的值
      selected1: 0,
      selected1Temp: 0,
      selected2: 0,
      selected2Temp: 0,
      currentView: "view_min",
      currentView1: "",
      currentView2: "",
      fiveRange: false,
      currenthead: "",
      NEWMARKETNO: "",
      isView1: true,
      isView2: true,
      isAH: false,
      AHData: {},
      HKMinData: {},
      isMins: false,
      minsid: "",
      selectedMins: "",
      footer: "view_footer",

      isZqShow: false,
      RepurDay: "",
      possesDay: "",

      isGzShow: false,
      gzZrStateName: "--",
      gzZrTypeName: "--",

      isGzYxgShow: false, //优先股
      yxgData: {},
      timer: null,
      isNewMarketNo: false,
      // 日K
      KLineData: [],
      chartType: 0, // 0-分时 1-K线
      hqTimer: '',
      lastPrice: '',
      upDown: '',
      upDownPrice: '',
      closePrice: '',
      openPrice: '',
      swiperItemIndex: 0
    };
  },
  watch:{
    isActive(val, oldVal){
      if(val){
        // this.GoBackOnLoad();
      }
      else{
        this.onDisappear();
      }
    }
  },
  attached() {
    if(this.hqTimer){
      clearInterval(this.hqTimer);
    }
    // this.hqTimer = setInterval(()=>{
    //   if(!this.stockCode){
    //     return;
    //   }
    //   if(this.newMarketNo && this.newMarketNo !== '0'){
    //     this.inits();
    //   }
    //   else{
    //     this.queryNewMarketNo();
    //   }
    // }, 5000);
    // 立即执行一次
    if(!this.stockCode){
      return;
    }
    if(this.newMarketNo && this.newMarketNo !== '0'){
      this.inits();
    }
    else{
      this.queryNewMarketNo();
    }
  },
  beforeDestroy(){
    console.log('销毁', this.stockCode);
    this.stockCode = '';
    this.onDisappear();
  },
  methods: {
    inits(marketno) {
      this.currenthead = "";
      this.currentView = "view_min";
      this.currentView1 = "";
      this.currentView2 = "";
      this.fiveRange = false;
      this.isAH = false;
      this.selected = 0;
      this.selected1 = 0;
      this.selected2 = 0;
      this.isMins = false; //清除分钟展开状态
      this.isGzShow = false;
      this.isGzYxgShow = false;
      this.yxgData = {};
      this.selectedMins = "";
      this.Tabs1 = [];
      this.Tabs2 = [];
      if (marketno) {
        this.newMarketNo = marketno;
      }
      // if (this.currentView != "view_min") {
      //   this.$refs.ref2.$parent.$children[0].queryHKMinDataTime();
      // }
      if (this.newMarketNo) {
        this.getEXtHqType();
        this.getfiveType();
      }
      this.queryHKMinDataTime();
    },
    getEXtHqType() {
      // var view = "gegutou";
      // this["currenthead"] = view;
      this.isNewMarketNo = true;
    },
    getfiveType() {
      if (
        tztStockType.MakeStockMarketStock(this.newMarketNo) ||
        tztStockType.MakeGGQQMarket(this.newMarketNo) ||
        tztStockType.MakeHKMarketStock(this.newMarketNo)
      ) {
        this.fiveRange = true;
      }
    },
    choose(index, id, ln) {
      ln = ln || "";
      var that = this;
      if (id === "mins") {
        if (this.isMins) {
          this.isMins = false;
          this.canvasTabs.forEach((items, index) => {
            if ("view_" + items.id == that.currentView) {
              that["selected" + ln] = index;
            }
          });
        } else {
          this["selected" + ln + "Temp"] = this["selected" + ln];
          this["selected" + ln] = index;
          this.isMins = true;
        }
        return;
      }
      if (id != "minss") {
        this.isMins = false;
        this.selectedMins = "";
        this.canvasTabs[5]["tabName"] = "分钟";
      }
      this["selected" + ln] = index;
      this["currentView" + ln] = "view_" + id;
    },
    AHclick() {
      if (this.AHData && this.AHData.m_AHCode) {
        this.$TZT.action1964(
          `/hq/ggStockInfo?stockcode=${this.AHData.m_AHCode}`
        );
      }
    },
    transfer(data, quotedata) {
      if (data.m_isAH === "Y") {
        this.isAH = true;
        this.AHData = {
          name: data.m_AHCode.indexOf("H") > -1 ? "H股" : "A股",
          m_AHCode: data.m_AHCode,
          m_AHPrice: data.m_AHPrice,
          m_AHRatio: data.m_AHRatio,
          m_AHTime: data.m_AHTime,
          m_AHPremiumRate: data.m_AHPremiumRate,
        };
      } else {
        this.isAH = false;
        this.AHData = {};
      }
      data.quotedata = $.extend({}, quotedata);
      if(this.$children){
        this.$broadcast("parent-minStockInfo", data);
      }  
    },
    queryNewMarketNo() {
      console.log('调用32', this.stockCode)
      var that = this;
      that.showAdd = false;
      var result = "0";
      if (that.wtAccountType) {
        if (that.wtAccountType == "SBACCOUNT" || that.wtAccountType === "SBBACCOUNT") {
          that.showAdd = true;
        }
        var oSendData = {
          StockCode: that.stockCode,
          WTACCOUNTTYPE: that.wtAccountType,
        };
        service_hq_often.require32(oSendData).then(function (data) {
          if (data.ERRORNO < 0) {
            if(that.hqTimer){
              clearInterval(that.hqTimer);
            }
            return;
          }
          result = data.NEWMARKETNO;
          that.newMarketNo = result;        
          that.inits();
          if(that.$children){
            that.$broadcast("parent-changeTab", 0);
          }     
          that.chartType = 0;     
        });
      } else {
        that.newMarketNo = "";
        that.isNewMarketNo = false;
        that.onDisappear();
        that.inits();
        if(that.$children){
          that.$broadcast("parent-changeTab", 0);
        } 
        that.chartType = 0;
      }
    },
    queryHKMinDataTime() {
      var that = this;
      
      if (!that.stockCode || ~that.stockCode.indexOf("null")) {
        if(that.$children){
          that.$broadcast("parent-minStockInfo", "");
          that.$broadcast("getHKTime", "");
        } 
        that.isNewMarketNo = false;
        that.chartType = 0;
        return;
      }

      var oSendData = {
        stockcode: that.stockCode,
        startPos: "0",
        NewMarketNo: that.newMarketNo,
      };
      service_hq_often.require20109(oSendData).then((data) => {
        // 分时
        if (data.ERRORNO < 0) {
          if(that.hqTimer){
            clearInterval(that.hqTimer);
          }
          that.lastPrice = '--';
          that.upDown = '--';
          that.upDownPrice = '--';
          that.closePrice = '--';
          that.openPrice = '--';
          if(that.$children){
            that.$broadcast("parent-minStockInfo", "");
            that.$broadcast("getHKTime", "");
          } 
          return;
        }

        that.lastPrice = data.WTHead['Last_p'];
        that.upDown = data.WTHead['m_lUpIndex'];
        that.upDownPrice = data.WTHead['m_lUpPrice'];
        that.closePrice = data.WTHead['Close_p'];
        that.openPrice = (/^0.0*$/).test(data.WTHead['Open_p']) ? '--' : data.WTHead['Open_p'];

        var STOCKPROP = data.STOCKPROP ? data.STOCKPROP : "";
        var oData = {
          BUYSELL: data.buySell,
          BINHead: data.BINHead,
          TIMEHead: data.TIMEHead,
          AMOUNT: data.AMOUNT,
          MAXCOUNT: data.MAXCOUNT,
          BEGINDATE: data.BEGINDATE,
          ENDDATE: data.ENDDATE,
          ERRORNO: data.ERRORNO,
          NEWMARKETNO: data.NEWMARKETNO,
        };
        var listObj = {};
        if (STOCKPROP) {
          listObj["RZRQ"] =
            (STOCKPROP[3] == 1 ? true : false) ||
            (STOCKPROP[4] == 1 ? true : false);
          listObj["Tong"] = STOCKPROP[13] == 1 ? true : false;
          listObj["FXJS"] = STOCKPROP[5] == 1 ? true : false;
          listObj["TSZL"] = STOCKPROP[6] == 1 ? true : false;
          listObj["ISH"] = STOCKPROP[7] == 1 ? true : false;
          listObj["ISZ"] = STOCKPROP[8] == 1 ? true : false;
          listObj["SBGP"] = STOCKPROP[9] == "T" ? true : false;
          listObj["SBLW"] = STOCKPROP[9] == "B" ? true : false;
          listObj["SBXQ"] = STOCKPROP[9] == "O" ? true : false;
          listObj["SBXZ"] = STOCKPROP[9] == "P" ? true : false;
        }
        listObj["AH"] = this.isAH;
        //是否为质押债券产品，增加标志和回购期限显示
        var isShzy =
            data.NEWMARKETNO == "4355" && that.stockCode.indexOf("204") == 0,
          isSzzy =
            data.NEWMARKETNO == "4611" && that.stockCode.indexOf("131") == 0;
        if (isShzy || isSzzy) {
          that.isZqShow = true;
          listObj["ZYZQ"] = true;
          that.RepurDay = data.quoteAdd
            ? numToChinese.change(data.quoteAdd.RepurDay) + "天期"
            : "--";
          that.possesDay = data.quoteAdd
            ? data.quoteAdd.possesDay + "天"
            : "--";
        } else {
          that.isZqShow = false;
          listObj["ZYZQ"] = false;
        }
        if (
          tztStockType.MakeStockMarketStock(this.newMarketNo) &&
          tztStockType.MakeHSMarket(this.newMarketNo) &&
          tztStockType.MakeThreeBordMarket(this.newMarketNo)
        ) {
          if (!data.quoteAdd) {
            that.isGzShow = true;
            let oTempData = this.getGzZrStateType(STOCKPROP);
            that.gzZrStateName = oTempData.state;
            that.gzZrTypeName = oTempData.type;
          } else {
            that.isGzYxgShow = true;
            that.yxgData = data.quoteAdd;
          }
        } else {
          that.isGzShow = false;
          that.isGzYxgShow = false;
        }

        that.$route.router.app.title = data.BINHead.StockName;
        that.$route.router.app.barstockcode = that.stockCode;
        that.$route.router.app.stocktypenew = listObj;
        //          that.$broadcast('parent-chartMindata', oData);
        var newMin = oData;
        newMin.WTHead = data.WTHead;
        newMin.TIMEHead = data.TIMEHead;
        
        if(that.$children){
          that.$broadcast("getHKTime", newMin);
        } 
        // that.$broadcast('getstockprop', data.STOCKPROP, data.NEWMARKETNO);
        // that.$broadcast('footerEvent',data.NEWMARKETNO); //传递footerEvent
        data.WTHead.stockname = data.STOCKNAME;
        that.Total_m = util.numTosize(data.WTHead.Total_m);
        that.newdata = data;
        that["childmin"](data.WTHead, data.NEWMARKETNO, data.quoteAdd); //传递给子组件
        if(that.$children){
          // 日K
          that.$broadcast("parent-minStockInfo", data.WTHead);
        }        
      });
      // this.queryKLineData();
    },
    queryKLineData() {
      var that = this;
      var oSendData = {
        stockcode: that.stockCode,
        startPos: "0",
        stockindex: "0",
        direction: "0",
        Maxcount: "200",
        NewMarketNo: that.newMarketNo
      };
      service_hq_often.require64(oSendData).then((data) => {
        // K线
        if (data.ERRORNO < 0) {
          if(that.hqTimer){
            clearInterval(that.hqTimer);
          }
          that.lastPrice = '--';
          that.upDown = '--';
          that.upDownPrice = '--';
          that.closePrice = '--';
          that.openPrice = '--';
          if(that.$children){
            that.$broadcast("parent-chartKLinedata", "");
          } 
          return;
        }
        that.lastPrice = data.WTHead['Last_p'];
        that.upDown = data.WTHead['m_lUpIndex'];
        that.upDownPrice = data.WTHead['m_lUpPrice'];
        that.closePrice = data.WTHead['Close_p'];
        that.openPrice = (/^0.0*$/).test(data.WTHead['Open_p']) ? '--' : data.WTHead['Open_p'];
        var oData = {
          TkLineHead: data.TkLineHead,
          TkLineData: data.TkLineData,
          BEGINDATE: data.BEGINDATE,
          ENDDATE: data.ENDDATE,
          MAXCOUNT: oSendData.Maxcount,
          CONTACTID: data.CONTACTID,
          total_max: data.total_max,
        };
        that.$set("KLineData", oData);
        if(that.$children){
          that.$broadcast("parent-chartKLinedata", that.KLineData);
        }     
      });
    },
    childmin: function (chartdata, NEWMARKETNO, quotedata) {
      if (!this.newMarketNo) {
        this.newMarketNo = NEWMARKETNO;
        this.inits(NEWMARKETNO);
      }
      this.transfer(chartdata, quotedata);
    },
    getMins(index) {
      var objMins = this.minsData[index];
      this.isMins = false;
      this.canvasTabs[5]["tabName"] = objMins.name;
      this.minsid = objMins.id;
      this.selectedMins = index;
      this.choose(5, "minss");
    },
    /**
     * [getGzZrStateName 获取股转类型及状态]
     * @parent string stockProp 股票属性
     * @return {[type]} [description]
     */
    getGzZrStateType(stockProp) {
      var oTemp = { state: "--", type: "--" };
      if (!stockProp) return oTemp;
      if (!!stockProp && stockProp.length > 10) {
        switch (stockProp[10]) {
          case "T":
            oTemp.type = "协议交易";
            break;
          case "M":
            oTemp.type = "做市交易";
            break;
          case "B":
            oTemp.type = "集合竞价+连续竞价转让";
            break;
          case "C":
            oTemp.type = "集合竞价转让";
            break;
          case "O":
            oTemp.type = "其他类型";
            break;
          default:
            oTemp.type = "--";
            break;
        }
      }
      if (!!stockProp && stockProp.length > 11) {
        switch (stockProp[11]) {
          case "N":
            oTemp.state = "正常状态";
            break;
          case "Y":
            oTemp.type = "首日挂牌";
            break;
          case "D":
            oTemp.type = "新增股票挂牌转让";
            break;
          default:
            oTemp.type = "--";
            break;
        }
      }
      return oTemp;
    },
    onDisappear() {
      var that = this;
      if(that.hqTimer){
        clearInterval(that.hqTimer);
      }       
    },
    GoBackOnLoad() {
      var that = this;
      if (that.isNewMarketNo) {
        if (that.swiperItemIndex === 0) {
          that.queryHKMinDataTime();
        } else {
          that.queryKLineData()
        }
        if(that.hqTimer){
          clearInterval(that.hqTimer);
        }
        // if(!that.isAutoRefresh){
          // that.hqTimer = setInterval(function(){
          //   that.queryHKMinDataTime();
          // }, 5000);
        // }    
      }
    },
    handleColorStyle(val, openPrice) {
      var _this = this
      if (openPrice) {
        var closePrice = _this.closePrice
        if (isNaN(Number(openPrice)) || !closePrice || isNaN(Number(closePrice))) {
          return 'black'
        } else {
          if (openPrice > closePrice) {
            return 'red'
          } else if (openPrice < closePrice) {
            return 'green'
          } else {
            return 'black'
          }
        }
      }
      var num = val ? val.split('%')[0] : ''
      if (num && !isNaN(Number(num))) {
        if (num > 0) {
          return 'red'
        } else if (num < 0) {
          return 'green'
        } else {
          return 'black'
        }
      } else {
        return 'black'
      }
    },
    isComputeCostPrice() {
      // 代码黑名单
      if((this.stockCode == '161838' || this.stockCode == '161022') && this.wtAccountType == 'SZACCOUNT'){
        return false;
      }
      // 标准券不记盈亏
      if(this.stockCode == '888886' || this.stockCode == '200000'|| this.stockCode == '131990' || this.stockCode == '131991' || this.stockCode == '888880'){
          return false;
      }
      // 深圳的特殊业务, 深圳-基金认购'K'-159代码段不计算盈亏
      if(this.wtAccountType == 'SZACCOUNT' && (this.stockCodeType == '8' || (this.stockCodeType == 'K' && this.stockCode.startsWith('159')))){
          return false;
      }
      // 上海-证券类别为M、K、S、L不计算盈亏
      if(this.wtAccountType == 'SHACCOUNT' && (this.stockCodeType == 'M' || this.stockCodeType == 'K' || this.stockCodeType == 'S' || this.stockCodeType == 'L' || (this.stockCodeType == 'A' && this.stockCode.startsWith('519')))){
        return false;
      }
      // 沪深京
      // 1.标准券（888886，200000，131990，131991，888880）
      // 2.报价回购（stock_type=Z&& sub_stock_type=z1）
      // 3.配股权证（stock_type=3）
      // 4.普通申购（stock_type=4）
      // 5.债券申购（stock_type=G）
      if(this.stockCodeType == '3' || this.stockCodeType == '4' || this.stockCodeType == 'G' || (this.stockCodeType == 'Z' && this.subStockType == 'z1')){
          return false;
      }
      return true;
    },
  },
  components: {
    view_min: min,
    kLine,
    Swipe,
    SwipeItem,
  },
  events: {
    "onDisappear": function(){
      this.onDisappear();
    },
    "GoBackOnLoad": function(){
      this.GoBackOnLoad();
    },
    "handleIt": function(index){
      console.warn(index)
      this.swiperItemIndex = index
      this.hqTimer && clearInterval(this.hqTimer);
      var hqFunc = index === 0 ? this.queryHKMinDataTime : this.queryKLineData;
      hqFunc();
      // this.hqTimer = setInterval(()=>{
      //   hqFunc();
      // }, 5000);
    },
    "refreshHKMinDataTime": function() {
      var that = this
      if (that.isNewMarketNo && that.isComputeCostPrice()) {
        if (that.swiperItemIndex === 0) {
          that.queryHKMinDataTime();
        } else {
          that.queryKLineData()
        }
      }
    }
  },
  // route: {
  //   canReuse() {
  //     this.inits();
  //     this.$TZT.action10077(this);
  //     //      transition.next()
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../assets/less/variables.less";
@import "../../../assets/less/mixins.less";
.hq-bar{
  display: flex;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: .64rem;
  font-family: PingFangSC-Regular;
  font-size: .24rem;
  color: #222222;
  line-height: .64rem;
  font-weight: 400;
  padding: 0 .3rem;
  border-bottom: .02rem solid #EBEDEE;
  div {
    display: flex;
    align-items: center;
    line-height: 1;
    margin-right: .32rem;
    >span {
      width: max-content;
    }
    >span:first-child {
      margin-right: .16rem;
    }
    >span:last-child {
      font-family: CITIC-Numbers-Medium;
      font-weight: 500;
      i {
        font-style: normal;
        margin-right: .16rem;
      }
      i:last-child {
        margin-right: 0;
      }
    }
  }
  >div:last-child {
    margin-right: 0;
  }
  .green {
    color: #169665;
  }
  .red {
    color: #E83333;
  }
}
.slh .hq-bar {
  font-size: .22rem;
  div {
    margin-right: .2rem;
    >span:first-child {
      margin-right: .1rem;
    }
  }
}
.addBox {
  // margin-top: 8px;
  padding: 15px 10px 0 10px;
  font-size: 0.65rem;
  .addTop {
    font-size: 0.6rem;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      p {
        &:nth-child(1) {
          background: #9b9b9c;
          padding: 0px 8px;
          border-radius: 4px;
          color: #fff;
        }
        &:nth-child(2) {
          margin-left: 10px;
          background: #9b9b9c;
          padding: 0px 8px;
          border-radius: 4px;
          color: #fff;
        }
      }
    }
  }
  .addBottom {
    padding-left: 3px;
    margin-top: 3px;
    display: flex;
    div {
      &:nth-child(1) {
        // width: 20%;
      }
      &:nth-child(2) {
        // width: 20%;
        margin-left: 20%;
      }
      // &:nth-child(3) {
      //   width: 30%;
      //   p {
      //     display: flex;
      //     justify-content: space-between;
      //   }
      // }
    }
  }
}

.AH {
  margin: 0.2rem 0.2rem 0;
  border: 1px solid #e2e2e2;
  font-size: 0.6rem;
  padding: 0 0.2rem;

  .left {
    display: inline-block;
    width: 60%;

    .AHfudu,
    .AHprice {
      margin-left: 1rem;
    }
  }

  .right {
    display: inline-block;
    width: 40%;
    text-align: right;
  }

  .fill {
    color: @color-fill;
  }

  .rise {
    color: @color-rise;
  }
}

.stock_tab {
  padding: 0 5px;
  background: #fff;
  margin-top: 6px;
  position: relative;
  border-top: 1px solid #e2e2e2;

  ul {
    height: 32px;
    line-height: 32px;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;

    li {
      position: relative;
      display: table-cell;

      a {
        display: block;
        text-align: center;
        font-size: 16px;
        color: #000;
        text-decoration: none;
      }

      .dot-bottom {
        font-size: 0;
        line-height: 0;
        border-width: 4px;
        border-color: #000;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
        vertical-align: middle;
        position: absolute;
        top: 40%;
      }
    }

    li.active a {
      color: #00a9f8;
      border-bottom: 2px solid #00a9f8;

      .dot-bottom {
        border-color: #00a9f8;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    }
  }

  .select-vule {
    position: absolute;
    background: #fff;
    right: 0.5rem;
    top: 1.2rem;
    width: 4rem;
    height: 8rem;
    z-index: 10;
    overflow-y: scroll;
    border: 1px solid #00a9f8;
    border-radius: 0.25rem;

    span {
      display: block;
      text-align: center;
      line-height: 1.6rem;
      font-size: 0.7rem;
      position: relative;
      .hairline(bottom, #ccc);
    }

    span.active {
      color: #00a9f8;
    }
  }
}

.tabs .content {
  position: inherit;
}

.swipe-indicators {
  bottom: -5px;
}

.footer ~ .content {
  bottom: 49px;
}

.zq_box {
  border: 1px solid #e2e2e2;
  font-size: 0.65rem;
  margin: 0.25rem;

  p {
    display: inline-block;
    width: 50%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
  }

  .red {
    color: #f00;
  }
}

.tabs {
  width: 100%;
}

// .tabs1 {
//   width: 17.07%;
//   padding: 0 0.2rem 0.5rem;
// }

.content {
  background-color: #FFFFFF;
}

.content-body {
  display: flex;
  height: 100%;
  position: relative;
  left: 0;
  top: .88rem;
  height: 4.12rem!important;
  margin: 0 .24rem;
  // min-height: 8rem;
}
</style>

<style lang="less">
.swipe {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .swipe-items-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    > div {
      display: block !important;
      padding-bottom: 0.54rem!important;
      position: absolute;
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
      width: 100%;
      height: 100%;
    }
    > div.active {
      display: block;
      -webkit-transform: none;
      transform: none;
    }
  }
  .swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 0.15rem;
    line-height: 0.5rem;
    .swipe-indicator {
      width: 0.12rem!important;
      height: 0.06rem!important;
      opacity: 1;
      background: #EBEDEE;
      display: inline-block;
      border-radius: .01rem!important;
      margin: 0;
    }
    .swipe-indicator.active {
      width: 0.36rem!important;
      opacity: 1;
      border-radius: 0.2rem;
      background: #9BA4AC;
    }
    .swipe-indicator:last-child {
      margin-left: .12rem;
    }
  }
}
</style>