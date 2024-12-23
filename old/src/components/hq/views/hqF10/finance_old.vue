<!-- 财务 -->
<template>
  <div id="contentArea">
    <!--A股-->
    <div v-show="isH==false" >
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">重点数据</span>
          <i class="jsAnnualReport01">{{jsAnnualReport01}}</i>
          <i class="jsAnnualReport02">{{jsAnnualReport02}}</i>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">每股收益</span>
            <span class="titBox jsEPS01">{{jsEPS01}}</span>
            <span class="titBox jsEPS02">{{jsEPS02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">扣非每股收益</span>
            <span class="titBox jsNonEPS01">{{jsNonEPS01}}</span>
            <span class="titBox jsNonEPS02">{{jsNonEPS02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">每股净资产</span>
            <span class="titBox jsNetAps01">{{jsNetAps01}}</span>
            <span class="titBox jsNetAps02">{{jsNetAps02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">每股公积金</span>
            <span class="titBox jsShareFund01">{{jsShareFund01}}</span>
            <span class="titBox jsShareFund02">{{jsShareFund02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">每股未分配利润</span>
            <span class="titBox jsProfit01">{{jsProfit01}}</span>
            <span class="titBox jsProfit02">{{jsProfit02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">每股经营现金流</span>
            <span class="titBox jsOperat01">{{jsOperat01}}</span>
            <span class="titBox jsOperat02">{{jsOperat02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">市盈率</span>
            <span class="titBox jsPEratio01">{{jsPEratio01}}</span>
            <span class="titBox jsPEratio02">{{jsPEratio02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">市净率</span>
            <span class="titBox jsCityRate01">{{jsCityRate01}}</span>
            <span class="titBox jsCityRate02">{{jsCityRate02}}</span>
          </p>
        </div>
      </div>
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">成长能力指标</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">营业收入</span>
            <span class="titBox jsBusines01">{{jsBusines01}}</span>
            <span class="titBox jsBusines02">{{jsBusines02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">营业收入同比增长</span>
            <span class="titBox jsOIRrose01">{{jsOIRrose01}}</span>
            <span class="titBox jsOIRrose02">{{jsOIRrose02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">营业收入环比增长</span>
            <span class="titBox jsOIGrowth01">{{jsOIGrowth01}}</span>
            <span class="titBox jsOIGrowth02">{{jsOIGrowth02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">净利润</span>
            <span class="titBox jsNetprofit01">{{jsNetprofit01}}</span>
            <span class="titBox jsNetprofit02">{{jsNetprofit02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">净利润同比增长</span>
            <span class="titBox jsNPRose01">{{jsNPRose01}}</span>
            <span class="titBox jsNPRose02">{{jsNPRose02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">净利润环比增长</span>
            <span class="titBox jsNPGrowth01">{{jsNPGrowth01}}</span>
            <span class="titBox jsNPGrowth02">{{jsNPGrowth02}}</span>
          </p>
        </div>

      </div>
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">运营能力指标</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">总资产周转率</span>
            <span class="titBox jsTATurnover01">{{jsTATurnover01}}</span>
            <span class="titBox jsTATurnover02">{{jsTATurnover02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">应收账款周转天数</span>
            <span class="titBox jsRTDays01">{{jsRTDays01}}</span>
            <span class="titBox jsRTDays02">{{jsRTDays02}}</span>
          </p>
        </div>

      </div>
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">财务风险指标</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">资产负债率</span>
            <span class="titBox jsAssetRatio01">{{jsAssetRatio01}}</span>
            <span class="titBox jsAssetRatio02">{{jsAssetRatio02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">流动比率</span>
            <span class="titBox jsLiquidRatio01">{{jsLiquidRatio01}}</span>
            <span class="titBox jsLiquidRatio02">{{jsLiquidRatio02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">速动比率</span>
            <span class="titBox jsQuickRatio01">{{jsQuickRatio01}}</span>
            <span class="titBox jsQuickRatio02">{{jsQuickRatio02}}</span>
          </p>
        </div>
      </div>
    </div>
    <!--港股-->
    <div v-show="isH" >
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">每股指标</span>
          <i class="jsAnnualReport01">{{jsAnnualReport01}}</i>
          <i class="jsAnnualReport02">{{jsAnnualReport02}}</i>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">基本每股收益</span>
            <span class="titBox jsEPS01">{{jsEPS01}}</span>
            <span class="titBox jsEPS02">{{jsEPS02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">每股净资产</span>
            <span class="titBox jsNonEPS01">{{jsNonEPS01}}</span>
            <span class="titBox jsNonEPS02">{{jsNonEPS02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">每股现金流量净额</span>
            <span class="titBox jsNetAps01">{{jsNetAps01}}</span>
            <span class="titBox jsNetAps02">{{jsNetAps02}}</span>
          </p>
        </div>
      </div>
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">盈利能力</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">销售毛利率</span>
            <span class="titBox jsShareFund01">{{jsShareFund01}}</span>
            <span class="titBox jsShareFund02">{{jsShareFund02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">销售净利率</span>
            <span class="titBox jsProfit01">{{jsProfit01}}</span>
            <span class="titBox jsProfit02">{{jsProfit02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">净资产收益率（ROE）</span>
            <span class="titBox jsOperat01">{{jsOperat01}}</span>
            <span class="titBox jsOperat02">{{jsOperat02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">总资产净利率</span>
            <span class="titBox jsPEratio01">{{jsPEratio01}}</span>
            <span class="titBox jsPEratio02">{{jsPEratio02}}</span>
          </p>
        </div>

      </div>
      <div class="finanBox">
       <div class="finanTitle">
          <span class="finanComa">成长能力</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">营业利润(1年)</span>
            <span class="titBox jsCityRate01">{{jsCityRate01}}</span>
            <span class="titBox jsCityRate02">{{jsCityRate02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">营业利润（3年）</span>
            <span class="titBox jsBusines01">{{jsBusines01}}</span>
            <span class="titBox jsBusines02">{{jsBusines02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">净利润(1年)</span>
            <span class="titBox jsOIRrose01">{{jsOIRrose01}}</span>
            <span class="titBox jsOIRrose02">{{jsOIRrose02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">净利润(3年)</span>
            <span class="titBox jsOIGrowth01">{{jsOIGrowth01}}</span>
            <span class="titBox jsOIGrowth02">{{jsOIGrowth02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">股东权益(1年)</span>
            <span class="titBox jsNetprofit01">{{jsNetprofit01}}</span>
            <span class="titBox jsNetprofit02">{{jsNetprofit02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">股东权益(3年)</span>
            <span class="titBox jsNPRose01">{{jsNPRose01}}</span>
            <span class="titBox jsNPRose02">{{jsNPRose02}}</span>
          </p>
        </div>
      </div>
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">偿债能力</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">流动比率</span>
            <span class="titBox jsNPGrowth01">{{jsNPGrowth01}}</span>
            <span class="titBox jsNPGrowth02">{{jsNPGrowth02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">速动比率</span>
            <span class="titBox jsTATurnover01">{{jsTATurnover01}}</span>
            <span class="titBox jsTATurnover02">{{jsTATurnover02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">股东权益/负债</span>
            <span class="titBox jsRTDays01">{{jsRTDays01}}</span>
            <span class="titBox jsRTDays02">{{jsRTDays02}}</span>
          </p>
        </div>
      </div>
      <div class="finanBox">
        <div class="finanTitle">
          <span class="finanComa">营运能力</span>
        </div>
        <div class="finanCon">
          <p class="titleCon">
            <span class="titBox width40">存货周转率</span>
            <span class="titBox jsAssetRatio01">{{jsAssetRatio01}}</span>
            <span class="titBox jsAssetRatio02">{{jsAssetRatio02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">流动资产周转率</span>
            <span class="titBox jsLiquidRatio01">{{jsLiquidRatio01}}</span>
            <span class="titBox jsLiquidRatio02">{{jsLiquidRatio02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">固定资产周转率</span>
            <span class="titBox jsQuickRatio01">{{jsQuickRatio01}}</span>
            <span class="titBox jsQuickRatio02">{{jsQuickRatio02}}</span>
          </p>
          <p class="titleCon">
            <span class="titBox width40">总资产周转率</span>
            <span class="titBox jsQuickZ01">{{jsQuickZ01}}</span>
            <span class="titBox jsQuickZ02">{{jsQuickZ02}}</span>
          </p>
        </div>
      </div>

    </div>
    </div>

  </div>
</template>

<script>
  import service_information_often from '../../../information/service/common/service_information_often'
  import tztStockType from '../../scripts/tztStockType'
  export default {
    data() {
      return {
        jsAnnualReport01:'',
        jsAnnualReport02:'',
        jsPEratio01:'',
        jsCityRate01:'',
        jsPEratio02:'',
        jsCityRate02:'',
        jsNonEPS01:'',
        jsBusines01:'',
        jsNetprofit01:'',
        jsNonEPS02:'',
        jsBusines02:'',
        jsNetprofit02:'',
        jsEPS01:'',
        jsNetAps01:'',
        jsShareFund01:'',
        jsProfit01:'',
        jsOperat01:'',
        jsOIRrose01:'',
        jsNPRose01:'',
        jsLiquidRatio01:'',
        jsQuickRatio01:'',
        jsAssetRatio01:'',
        jsTATurnover01:'',
        jsRTDays01:'',
        jsEPS02:'',
        jsNetAps02:'',
        jsShareFund02:'',
        jsProfit02:'',
        jsOperat02:'',
        jsOIRrose02:'',
        jsNPRose02:'',
        jsLiquidRatio02:'',
        jsQuickRatio02:'',
        jsAssetRatio02:'',
        jsTATurnover02:'',
        jsRTDays02:'',
        jsOIGrowth01:'',
        jsNPGrowth01:'',
        jsOIGrowth02:'',
        jsNPGrowth02:'',
        jsQuickZ01:'',
        jsQuickZ02:'',
        isH:''  //是否为港股
      }
    },
    attached() {
      // $.init();
      this.jsAnnualReport01 = '';
      this.jsAnnualReport02 = '';
      this.jsPEratio01 = '';
      this.jsCityRate01 = '';
      this.jsPEratio02 = '';
      this.jsCityRate02 = '';
      this.jsNonEPS01 = '';
      this.jsBusines01 = '';
      this.jsNetprofit01 = '';
      this.jsNonEPS02 = '';
      this.jsBusines02 = '';
      this.jsNetprofit02 = '';
      this.jsEPS01 = '';
      this.jsNetAps01 = '';
      this.jsShareFund01 = '';
      this.jsProfit01 = '';
      this.jsOperat01 = '';
      this.jsOIRrose01 = '';
      this.jsNPRose01 = '';
      this.jsLiquidRatio01 = '';
      this.jsQuickRatio01 = '';
      this.jsAssetRatio01 = '';
      this.jsTATurnover01 = '';
      this.jsRTDays01 = '';
      this.jsEPS02 = '';
      this.jsNetAps02 = '';
      this.jsShareFund02 = '';
      this.jsProfit02 = '';
      this.jsOperat02 = '';
      this.jsOIRrose02 = '';
      this.jsNPRose02 = '';
      this.jsLiquidRatio02 = '';
      this.jsQuickRatio02 = '';
      this.jsAssetRatio02 = '';
      this.jsTATurnover02 = '';
      this.jsRTDays02 = '';
      this.jsOIGrowth01 = '';
      this.jsNPGrowth01 = '';
      this.jsOIGrowth02 = '';
      this.jsNPGrowth02 = '';
      this.jsQuickZ01='',
      this.jsQuickZ02='',
      this.stockcode = this.$route.query.stockcode;
      this.getInfoFinan();
      this.isH = tztStockType.MakeHKMarketStock(this.$route.query.marketno);
    },
    methods: {
      getInfoFinan() {
        var that = this;
        var NEWMARKETNO = this.$route.query.marketno;
        let  actiontype= '46105'; //默认发A股财务功能号
        let stockcode= this.stockcode
        if(tztStockType.MakeHKMarketStock(NEWMARKETNO)){ //判断是港股就发这个功能号
          actiontype='46108';
          stockcode=this.stockcode.replace("H",""); //港股去掉H
        }
        var oSendData = {
          StockCode: stockcode,//"000001",
          action:actiontype
        };
        service_information_often.require46105(oSendData)
          .then((oSend)=>{
          var gRID0 = oSend.GRID2,
                  gRID1 = oSend.GRID3,
                  gRID2 = oSend.GRID4,
                  gRID3 = oSend.GRID5, begindate = 0, enddate = 0;
        if(this.isH){//港股数据
          var gRID4 = oSend.GRID6;
          if (gRID0) {
            var send01 = gRID0[0] ? gRID0[0].split("|") : [];
            var send02 = gRID0[1] ? gRID0[1].split("|") : [];
            if (send01[0]) {
              that.jsAnnualReport01 = that.AnnualReport(send01[0]);
            }
            if (send02[0]) {
              that.jsAnnualReport02 = that.AnnualReport(send02[0]);
            }
            that.jsEPS01 = (that.parseFloatNum(send01[1]));
            that.jsEPS02 = (that.parseFloatNum(send02[1]));
            that.jsNonEPS01 = (that.parseFloatNum(send01[2]));
            that.jsNonEPS02 = (that.parseFloatNum(send02[2]));
            that.jsNetAps01 = (that.parseFloatNum(send01[3]));
            that.jsNetAps02 = (that.parseFloatNum(send02[3]));
          }
          if(gRID1){
            var send11 = gRID1[0] ? gRID1[0].split("|") : [];
            var send12 = gRID1[1] ? gRID1[1].split("|") : [];
            that.jsShareFund01 = (that.parseFloatNum(send11[0])) + "%";
            that.jsShareFund02 = (that.parseFloatNum(send12[0])) + "%";
            that.jsProfit01 = (that.parseFloatNum(send11[1])) + "%";
            that.jsProfit02 = (that.parseFloatNum(send12[1])) + "%";
            that.jsOperat01 = (that.parseFloatNum(send11[2])) + "%";
            that.jsOperat02 = (that.parseFloatNum(send12[2])) + "%";
            that.jsPEratio01 = (that.parseFloatNum(send11[3])) + "%";
            that.jsPEratio02 = (that.parseFloatNum(send12[3])) + "%";
          }
          if(gRID2){
            var send21 = gRID2[0] ? gRID2[0].split("|") : [];
            var send22 = gRID2[1] ? gRID2[1].split("|") : [];
            that.jsCityRate01 = (that.parseFloatNum(send21[0])) + "%";
            that.jsCityRate02 = (that.parseFloatNum(send22[0])) + "%";
            that.jsBusines01 = (that.parseFloatNum(send21[1])) + "%";
            that.jsBusines02 = (that.parseFloatNum(send22[1])) + "%";
            that.jsOIRrose01 = (that.parseFloatNum(send21[2])) + "%";
            that.jsOIRrose02 = (that.parseFloatNum(send22[2])) + "%";
            that.jsOIGrowth01 = (that.parseFloatNum(send21[3])) + "%";
            that.jsOIGrowth02 = (that.parseFloatNum(send22[3])) + "%";
            that.jsNetprofit01 = (that.parseFloatNum(send21[4])) + "%";
            that.jsNetprofit02 = (that.parseFloatNum(send22[4])) + "%";
            that.jsNPRose01 = (that.parseFloatNum(send21[5])) + "%";
            that.jsNPRose02 = (that.parseFloatNum(send22[5])) + "%";
          }
          if(gRID3){
            var send31 = gRID3[0] ? gRID3[0].split("|") : [];
            var send32 = gRID3[1] ? gRID3[1].split("|") : [];
            that.jsNPGrowth01 = (that.parseFloatNum(send31[0])) + "%";
            that.jsNPGrowth02 = (that.parseFloatNum(send32[0])) + "%";
            that.jsTATurnover01 = (that.parseFloatNum(send31[1])) + "%";
            that.jsTATurnover02 = (that.parseFloatNum(send32[1])) + "%";
            that.jsRTDays01 = (that.parseFloatNum(send31[2])) + "%";
            that.jsRTDays02 = (that.parseFloatNum(send32[2])) + "%";
          }
          if(gRID4){
            var send41 = gRID4[0].split("&##&")[0];
            var send42 = gRID4[0].split("&##&")[1];
            if(send41){
              send41 = send41.split('|');
              that.jsAssetRatio01 = (that.parseFloatNum(send41[0])) + "%";
              that.jsLiquidRatio01 = (that.parseFloatNum(send41[1])) + "%";
              that.jsQuickRatio01 = (that.parseFloatNum(send41[2])) + "%";
              that.jsQuickZ01 = (that.parseFloatNum(send41[3])) + "%";
            }
            if(send42){
              send42 = send42.split('|');
              that.jsAssetRatio02 = (that.parseFloatNum(send42[0])) + "%";
              that.jsLiquidRatio02 = (that.parseFloatNum(send42[1])) + "%";
              that.jsQuickRatio02 = (that.parseFloatNum(send42[2])) + "%";
              that.jsQuickZ02 = (that.parseFloatNum(send42[3])) + "%";
            }
          }
        }else{
          //A股数据
          if (gRID0) {
            var send01 = gRID0[0] ? gRID0[0].split("|") : [];
            var send02 = gRID0[1] ? gRID0[1].split("|") : [];
            if (send01[0]) {
              enddate = that.compare(send01[0], enddate);
            }
            if (send02[0]) {
              begindate = that.compare(send02[0], begindate);
            }
          }
          if (gRID1) {
            var send11 = gRID1[0] ? gRID1[0].split("|") : [];
            var send12 = gRID1[1] ? gRID1[1].split("|") : [];
            if (send11[1]) {
              enddate = that.compare(send11[1], enddate);
            }
            if (send12[1]) {
              begindate = that.compare(send12[1], begindate);
            }
          }
          if (gRID2) {
            var send21 = gRID2[0] ? gRID2[0].split("|") : [];
            var send22 = gRID2[1] ? gRID2[1].split("|") : [];
            if (send21[0]) {
              enddate = that.compare(send21[0], enddate);
            }
            if (send22[0]) {
              begindate = that.compare(send22[0], begindate);
            }
          }
          if (gRID3) {
            var send31 = gRID3[0] ? gRID3[0].split("|") : [];
            var send32 = gRID3[1] ? gRID3[1].split("|") : [];
            if (send31[2]) {
              enddate = that.compare(send31[2], enddate);
            }
            if (send32[2]) {
              begindate = that.compare(send32[2], begindate);
            }
          }
          enddate && (that.jsAnnualReport01 = that.AnnualReport(that.ormatDate(enddate.slice(0, 10))));
          begindate && (that.jsAnnualReport02 = that.AnnualReport(that.ormatDate(begindate.slice(0, 10))));
          if (send01 && that.get_unix_time(send01[0]) == enddate) {

            that.jsPEratio01 = (that.parseFloatNum(send01[1]));
            that.jsCityRate01 = (that.parseFloatNum(send01[2]));
          }
          if (send02 && that.get_unix_time(send02[0]) == begindate) {

            that.jsPEratio02 = (that.parseFloatNum(send02[1]));
            that.jsCityRate02 = (that.parseFloatNum(send02[2]));
          }
          if (send11 && that.get_unix_time(send11[1]) == enddate) {
            //var send11 = gRID1[0].split("|");
            that.jsNonEPS01 = (that.parseFloatNum(send11[2]));
            that.jsBusines01 = (that.parseFloatNum((parseFloat(send11[3]) / 100000000)) + "亿元");
            that.jsNetprofit01 = (that.parseFloatNum((parseFloat(send11[4]) / 100000000)) + "亿元");
            //var send12 = gRID1[1].split("|");
          }
          if (send12 && that.get_unix_time(send12[1]) == begindate) {
            that.jsNonEPS02 = (that.parseFloatNum(send12[2]));
            that.jsBusines02 = (that.parseFloatNum((parseFloat(send12[3]) / 100000000)) + "亿元");
            that.jsNetprofit02 = (that.parseFloatNum((parseFloat(send12[4]) / 100000000)) + "亿元");
          }
          if (send21 && that.get_unix_time(send21[0]) == enddate) {
            //var send21 = gRID2[0].split("|");
            that.jsEPS01 = (that.parseFloatNum(send21[1]));
            that.jsNetAps01 = (that.parseFloatNum(send21[2]));
            that.jsShareFund01 = (that.parseFloatNum(send21[3]));
            that.jsProfit01 = (that.parseFloatNum(send21[4]));
            that.jsOperat01 = (that.parseFloatNum(send21[5]));
            that.jsOIRrose01 = (that.parseFloatNum(send21[6]) + "%");
            that.jsNPRose01 = (that.parseFloatNum(send21[7]) + "%");
            that.jsLiquidRatio01 = (that.parseFloatNum(send21[8]));
            that.jsQuickRatio01 = (that.parseFloatNum(send21[9]));
            that.jsAssetRatio01 = (that.parseFloatNum(send21[10]) + "%");
            that.jsTATurnover01 = (that.parseFloatNum(send21[11]));
            that.jsRTDays01 = (that.parseFloatNum(send21[12]));
            //var send22 = gRID2[1].split("|");

          }
          if (send22 && that.get_unix_time(send22[0]) == begindate) {
            that.jsEPS02 = (that.parseFloatNum(send22[1]));
            that.jsNetAps02 = (that.parseFloatNum(send22[2]));
            that.jsShareFund02 = (that.parseFloatNum(send22[3]));
            that.jsProfit02 = (that.parseFloatNum(send22[4]));
            that.jsOperat02 = (that.parseFloatNum(send22[5]));
            that.jsOIRrose02 = (that.parseFloatNum(send22[6]) + "%");
            that.jsNPRose02 = ((that.parseFloatNum(send22[7])) + "%");
            that.jsLiquidRatio02 = (that.parseFloatNum(send22[8]));
            that.jsQuickRatio02 = (that.parseFloatNum(send22[9]));
            that.jsAssetRatio02 = (that.parseFloatNum(send22[10]) + "%");
            that.jsTATurnover02 = (that.parseFloatNum(send22[11]));
            that.jsRTDays02 = (that.parseFloatNum(send22[12]));
          }
          if (send31 && that.get_unix_time(send31[2]) == enddate) {
            //var send31 = gRID3[0].split("|");
            that.jsOIGrowth01 = (that.parseFloatNum(send31[3]) + "%");
            that.jsNPGrowth01 = (that.parseFloatNum(send31[4]) + "%");
            //var send32 = gRID3[1].split("|");

          }
          if (send32 && that.get_unix_time(send32[2]) == begindate) {
            that.jsOIGrowth02 = (that.parseFloatNum(send32[3]) + "%");
            that.jsNPGrowth02 = (that.parseFloatNum(send32[4]) + "%");
          }
        }

          })
      },
      AnnualReport(date) {
        var syear = date.slice(0, 4);
        if (date.slice(5, 10) == "03-31") {
          return syear + "年一季报";
        }
        if (date.slice(5, 10) == "06-30") {
          return syear + "年半年报";
        }
        if (date.slice(5, 10) == "09-30") {
          return syear + "年三季报";
        }
        if (date.slice(5, 10) == "12-31") {
          return syear + "年年报";
        }
      },
      parseFloatNum(n) {
        if (n == "" || n == "NaN" || !n) {
          return "--";
        } else {
          return parseFloat(n).toFixed(3);
        }
      },get_unix_time(dateStr){
        dateStr = dateStr || '';
        var newstr = dateStr.replace(/-/g,'/');
        var date =  new Date(newstr);
        var time_str = date.getTime().toString();
        return time_str/*.substr(0, 10)*/;
      },
      compare(a,b){
        var starString = '',
          endString  = '';
        if(a && a.indexOf('-')>0){
          starString = this.get_unix_time(a);
        }
        if(b && b.indexOf('-')>0){
          endString = this.get_unix_time(b);
        }
        return (starString>endString?starString:endString);
      },
      ormatDate(dateNum){
        var date=new Date(dateNum*1000);
        return date.getFullYear()+"-"+fixZero(date.getMonth()+1,2)+"-"+fixZero(date.getDate(),2)+" "+fixZero(date.getHours(),2)+":"+fixZero(date.getMinutes(),2)+":"+fixZero(date.getSeconds(),2);
        function fixZero(num,length){
          var str=""+num;
          var len=str.length;
          var s="";
          for(var i=length;i-->len;){
            s+="0";
          }
          return s+str;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  i{
    font-style: normal;
    font-weight: normal;
  }
  #contentArea {
    margin:0 5px;
  }
  #contentArea .finanBox {
    margin-top: 6px;
    width: 100%;
  }
  .finanBox .finanTitle {
    padding: 10px 0 10px 0px;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    font-size: 0;
    vertical-align: top;
  }
  .finanTitle .finanComa {
    display: inline-block;
    font-size: 15px;
    color: #2a8ee3;
    letter-spacing: 1px;
    width: 42%;
  }
  .finanTitle i {
    display: inline-block;
    font-size: 13px;
    width: 29%;
    text-align:right;
  }
  .finanBox .titleCon {
    width:100%;
    font-size:0;
    vertical-align:top;
    padding:8px 0 8px 0px;
  }
  .titleCon .titBox {
    display: inline-block;
    width: 29%;
    font-size: 13px;
    vertical-align: top;
    text-align: right;
    /*padding-right: 7px;*/
  }
  .titleCon .width40 {
    width:42%;
    text-align:left;
  }
  .titleCon .width46 {
    width:46%;
    text-align:left;
  }
  .titleCon .width25 {
    width: 27%;
  }
  .titleCon .width45 {
    width:50%;
    text-align:left;
  }
  .titleCon .width27 {
    width: 25%;
  }
  .finanTitle .width40 {
    width: 40%;
  }
</style>
