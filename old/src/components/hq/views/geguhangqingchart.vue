<template>
  <div class="content">

        <div
          id="ttop"
          style="height: 100%"
          class="content-body"
        >
          <div class="tabs js-tabs" @click="toStockDetails">
            <swipe
              class="my-swipe ggstockinfo"
              :speed="50"
              :auto="0"
              :show-indicators="isNewMarketNo"
              v-ref:swipe
            >
              <swipe-item class="slide1">
                <component
                  :is="currentView"
                  keep-alive
                  v-bind:minsid="minsid"
                ></component>
              </swipe-item>
              <swipe-item class="slide2" v-if="isNewMarketNo"
                ><k-line></k-line
              ></swipe-item>
            </swipe>
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
  data() {
    return {
      // coded:'',
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
      isLoading: false,
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
      WTACCOUNTTYPE: "",
      wtaccounttype: "",
    };
  },
  filters: {
    ppl(val) {
      if (isNaN(val) || val < 0) {
        return "--";
      } else if (val == 0) {
        return val;
      } else {
        return val / 100;
      }
    },
    cankao(val) {
      if (isNaN(val) || val <= 0) {
        return "--";
      } else {
        return val / 1000;
      }
    },
  },
  attached() {
    var that = this;
    //    $.init();
    this.inits();
    this.$TZT.action10077(this);
    window.changeStockCode = function (code, type) {
      console.log("已调", code, type);
      that.showAdd = false;
      // $('#ttop').css({"height":"97%"});
      var result = "0";
      that.WTACCOUNTTYPE = type;
      that.wtaccounttype = type;
      if (type && type != "") {
        // that.WTACCOUNTTYPE = type;
        // that.wtaccounttype = type;
        if (type == "SBACCOUNT" || type === "SBBACCOUNT") {
          that.showAdd = true;
        }
        var oSendData = {
          StockCode: code,
          WTACCOUNTTYPE: type,
        };
        service_hq_often.require32(oSendData).then(function (data) {
          result = data.NEWMARKETNO;
          that.$route.query.marketno = result;
          if (that.$route.query.marketno) {
            that.$route.query.stockcode = code;
          } else {
            that.currentstock = that.$route.query.stockcode = "";
          }
          that.inits();
          that.$broadcast("parent-changeTab", 0);
          that.chartType = 0;
          that.$refs.swipe.reInitPages();
          // that.$refs.swipe.setPage(0);
        });
      } else {
        that.$route.query.marketno = "";
        that.isNewMarketNo = false;
        that.$route.query.stockcode = code;
        that.inits();
        that.$broadcast("parent-changeTab", 0);
        that.chartType = 0;
        that.$refs.swipe.reInitPages();
        // that.$refs.swipe.setPage(0);
      }
    };
    // this.changeStockCode('s','SBACCOUNT')
    if(!window.onDisappear){
      window.onDisappear = function(){
        console.log('调用onDisappear');
        that.onDisappear();
      }
    }
    if(!window.GoBackOnLoad){
      window.GoBackOnLoad = function(){
        console.log('调用GoBackOnLoad');
        that.GoBackOnLoad();
      }
    } 
  },
  methods: {
    toStockDetails() {
      if (this.NEWMARKETNO) {
        if (!this.$refs.swipe.index) {
          maidian.reportEvent("jy_wtjy_fst_clk", {
            appkey: "aa347fba81312f23",
            xwhat: "resource_click",
            title: "委托交易分时图",
            product_market_code: this.NEWMARKETNO,
            product_name: this.$route.router.app.title,
          });
        } else {
          maidian.reportEvent("jy_wtjy_kxt_clk", {
            appkey: "aa347fba81312f23",
            xwhat: "resource_click",
            title: "委托交易K线图",
            product_market_code: this.NEWMARKETNO,
            product_name: this.$route.router.app.title,
          });
        }
        onJsOverrideUrlLoading(
          `http://action:12051/?stockcode=${this.stockcode}&&wtaccounttype=${this.WTACCOUNTTYPE}`
        );
      }
    },
    dealRefreshTimer() {
      this.queryHKMinDataTime();
      // this.$refs.ref2 &&
      //   this.$refs.ref2.queryHKMinData &&
      //   this.$refs.ref2.queryHKMinData();
      // this.$refs.ref2 &&
      //   this.$refs.ref2.queryKLineData &&
      //   this.$refs.ref2.queryKLineData();
    },
    inits(marketno) {
      this.currentstock = "";
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
        this.$route.query.marketno = marketno;
      }
      this.NEWMARKETNO = this.$route.query.marketno;
      // if (this.currentView != "view_min") {
      //   this.$refs.ref2.$parent.$children[0].queryHKMinDataTime();
      // }
      if (this.NEWMARKETNO) {
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
        tztStockType.MakeStockMarketStock(this.NEWMARKETNO) ||
        tztStockType.MakeGGQQMarket(this.NEWMARKETNO) ||
        tztStockType.MakeHKMarketStock(this.NEWMARKETNO)
      ) {
        this.fiveRange = true;
      }
    },
    clickdata(index) {},
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
      this.$broadcast("parent-minStockInfo", data);
    },
    queryHKMinDataTime() {
      this.isLoading = false;
      var that = this;
      that.stockcode = that.currentstock || that.$route.query.stockcode;
      if (!that.stockcode || ~that.stockcode.indexOf("null")) {
        that.$broadcast("parent-minStockInfo", "");
        that.$broadcast("getHKTime", "");
        that.isNewMarketNo = false;
        that.chartType = 0;
        that.$refs.swipe.reInitPages();
        return;
      }

      var oSendData = {
        stockcode: that.stockcode,
        startPos: "0",
        NewMarketNo: that.NEWMARKETNO,
      };
      service_hq_often.require20109(oSendData).then((data) => {
        // 分时
        if (data.ERRORNO < 0) {
          that.$route.query.stockcode = "";
          that.$broadcast("parent-minStockInfo", "");
          that.$broadcast("getHKTime", "");
          return;
        }
        that.isLoading = false;
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
            data.NEWMARKETNO == "4355" && that.stockcode.indexOf("204") == 0,
          isSzzy =
            data.NEWMARKETNO == "4611" && that.stockcode.indexOf("131") == 0;
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
          tztStockType.MakeStockMarketStock(this.NEWMARKETNO) &&
          tztStockType.MakeHSMarket(this.NEWMARKETNO) &&
          tztStockType.MakeThreeBordMarket(this.NEWMARKETNO)
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
        that.$route.router.app.barstockcode = that.stockcode;
        that.$route.router.app.stocktypenew = listObj;
        //          that.$broadcast('parent-chartMindata', oData);
        var newMin = oData;
        newMin.WTHead = data.WTHead;
        newMin.TIMEHead = data.TIMEHead;
        that.$broadcast("getHKTime", newMin);
        // that.$broadcast('getstockprop', data.STOCKPROP, data.NEWMARKETNO);
        // that.$broadcast('footerEvent',data.NEWMARKETNO); //传递footerEvent
        data.WTHead.stockname = data.STOCKNAME;
        this.Total_m = util.numTosize(data.WTHead.Total_m);
        this.newdata = data;
        that["childmin"](data.WTHead, data.NEWMARKETNO, data.quoteAdd); //传递给子组件
        // 日K
        that.$broadcast("parent-minStockInfo", data.WTHead);
      });
      this.queryKLineData();
    },
    queryKLineData() {
      var that = this;
      var oSendData = {
        stockcode: that.stockcode,
        startPos: "0",
        stockindex: "0",
        direction: "0",
        Maxcount: "200",
        NewMarketNo: that.NEWMARKETNO
      };
      service_hq_often.require64(oSendData).then((data) => {
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
        this.$broadcast("parent-chartKLinedata", this.KLineData);
      });
    },
    childmin: function (chartdata, NEWMARKETNO, quotedata) {
      if (!this.NEWMARKETNO) {
        this.NEWMARKETNO = NEWMARKETNO;
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
      if(window.setIntervalID){
        window.clearInterval(window.setIntervalID);
      }   
    },
    GoBackOnLoad() {
      var that = this;
      that.dealRefreshTimer();
      that.$TZT.action10077(that);  
    },
  },
  components: {
    // lTab: gegutou,
    view_min: min,
    // 'view_minsh': minsh,
    // 'view_minsz': minsz,
    kLine,
    Swipe,
    SwipeItem,
  },
  events: {
    "child-min": function () {
      if (!this.isLoading) {
        this.queryHKMinDataTime();
      }
    },
    "child-choose": function () {
      this["currentView"] = "view_min";
    },
    "child-chartType": function (val) {
      this.chartType = val;
    },
    "child-changestock": function (id) {
      this.changIndex = id;
      var that = this;
      var arr = [that.$route.query.stockcode, "1A0001", "2A01"];
      var arr = [
        {
          stockcode: that.$route.query.stockcode,
          marketno: that.$route.query.marketno,
          WTACCOUNTTYPE: that.wtaccounttype,
        },
        { stockcode: "1A0001", marketno: "4353", WTACCOUNTTYPE: "SHACCOUNT" },
        { stockcode: "2A01", marketno: "4609", WTACCOUNTTYPE: "SZACCOUNT" },
      ];
      that.currentstock = arr[id].stockcode;
      that.NEWMARKETNO = arr[id].marketno;
      that.WTACCOUNTTYPE = arr[id].WTACCOUNTTYPE;
      this.queryHKMinDataTime();
    },
    "onDisappear": function(){
      this.onDisappear();
    },
    "GoBackOnLoad": function(){
      this.GoBackOnLoad();
    }
  },
  route: {
    canReuse() {
      this.inits();
      this.$TZT.action10077(this);
      //      transition.next()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../assets/less/variables.less";
@import "../../../assets/less/mixins.less";
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
  background-color: #f4f4f4;
}

.content-body {
  display: flex;
  height: 100%;
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
      padding-bottom: 0.5rem;
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
      width: 0.2rem;
      height: 0.2rem;
      opacity: 0.3;
      background: #000000;
      display: inline-block;
      border-radius: 100%;
      margin: 0 3px;
    }
    .swipe-indicator.active {
      width: 0.4rem;
      opacity: 1;
      border-radius: 0.2rem;
      background: #de2121;
    }
  }
}
</style>