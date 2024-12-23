<!-- 股东 -->
<template>
  <div id="contentArea">
    <div class="shareBox">
      <div class="shareTitle">
        <span class="shareComa">股本情况</span>
      </div>
      <div class="shareCon">
        <p class="textTitle">
          <span class="titCon pad12">总股本</span>
          <span class="titCon pad12 jsTotalShare">{{jsTotalShare}}</span>
        </p>
        <p class="textTitle">
          <span class="titCon pad12">流通股本</span>
          <span class="titCon pad12 jsFlowShare">{{jsFlowShare}}</span>
        </p>
        <!--<p class="textTitle">
            <span class="titCon">总市值</span>
            <span class="titCon">24.5亿元</span>
         </p>
        <p class="textTitle">
            <span class="titCon">流通市值</span>
            <span class="titCon">12.6亿元</span>
         </p>-->
      </div>
    </div>
    <div class="shareBox pandRigt">
      <div class="shareTitle">
        <span class="shareComa width20">股东变动</span>
        <i class="jsAnnualReport01 textRigt width30">{{jsAnnualReport01}}</i>
        <i class="jsAnnualReport02 textRigt width30">{{jsAnnualReport02}}</i>
      </div>
      <div class="shareCon">
        <p class="titleCon">
          <span class="titBox width40">股东人数</span>
          <span class="titBox jsNumShare01 textRigt">{{jsNumShare01}}</span>
          <span class="titBox jsNumShare02 textRigt">{{jsNumShare02}}</span>
        </p>
        <p class="titleCon">
          <span class="titBox width40">较上期变化</span>
          <span class="titBox jsOpCchange01 textRigt">{{jsOpCchange01}}</span>
          <span class="titBox jsOpCchange02 textRigt">{{jsOpCchange02}}</span>
        </p>
      </div>
    </div>
    <div class="shareBox">
      <div class="shareTitle">
        <span class="shareComa">十大流通股股东</span>
        <!--<span class="width50">2014年半年报披露</span>-->
      </div>
      <div class="shareCon">
        <div class="teTitle">
          <span class="titName width40 width60">股东名称</span>
          <!--<span class="titName width40">持股数</span>-->
          <span class="titName">占比</span>
          <span class="titName">增减</span>
        </div>
        <div class="jsTFlowShare">
          <p class="teTitle" v-for="items in jsTFlowShare">
              <span class="titName width40 width60">{{items.one}}</span>
              <span class="titName">{{items.two}}</span>
              <span class="titName">{{items.three}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="shareBox">
      <div class="shareTitle">
        <span class="shareComa">十大股东</span>
        <!--<span class="width50">2014年半年报披露</span>-->
      </div>
      <div class="shareCon">
        <div class="teTitle">
          <span class="titName width40 width60">股东名称</span>
          <!-- <span class="titName width40">持股数</span>-->
          <span class="titName">占比</span>
          <span class="titName">增减</span>
        </div>
        <div class="jsTShare">
          <p class="teTitle" v-for="items in jsTShare">
              <span class="titName width40 width60">{{items.one}}</span>
              <span class="titName">{{items.two}}</span>
              <span class="titName">{{items.three}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="shareBox">
      <div class="shareTitle">
        <span class="shareComa">基金持股情况</span>
      </div>
      <div class="shareCon">
        <div class="teTitle">
          <span class="titName width40 width60">机构名称</span>
          <!--<span class="titName width40">持股数</span>-->
          <span class="titName">占比</span>
          <span class="titName">增减</span>
        </div>
        <div class="jsAgency">
          <p class="teTitle" v-for="items in jsAgency">
            <span class="titName width40 width60">{{items.one}}</span>
            <span class="titName">{{items.two}}</span>
            <span class="titName">{{items.three}}</span>
          </p>
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
          jsTotalShare:'',
          jsFlowShare:'',
          jsTShare:[],
          jsTFlowShare:[],
          jsAgency:[],
          jsAnnualReport01:'',
          jsNumShare01:'',
          jsOpCchange01:'',
          jsAnnualReport02:'',
          jsNumShare02:'',
          jsOpCchange02:''
        }
    },
    attached() {
    // $.init();
      this.jsTotalShare = '';
      this.jsFlowShare = '';
      this.jsTShare = [];
      this.jsTFlowShare = [];
      this.jsAgency = [];
      this.jsAnnualReport01 = '';
      this.jsNumShare01 = '';
      this.jsOpCchange01 = '';
      this.jsAnnualReport02 = '';
      this.jsNumShare02 = '';
      this.jsOpCchange02 = '';
      this.stockcode = this.$route.query.stockcode;
      this.getInfoShare();
    },
    methods: {
      getInfoShare() {
        var that = this;
        var oSendData = {
          StockCode: this.stockcode,//"000001",
        };
        service_information_often.require46104(oSendData)
          .then((oSend)=>{
          var gRID0 = oSend.GRID2;
          if (gRID0) {
            var send0 = gRID0[0].split("|");
            that.jsTotalShare = (that.formatNaN((parseFloat(send0[0]) / 100000000).toFixed(2)) + "亿股");
            that.jsFlowShare = (that.formatNaN((parseFloat(send0[1]) / 100000000).toFixed(2)) + "亿股");
          }
          var gRID1 = oSend.GRID3;
          if (gRID1) {
            var sItem1 = [];
            for (var i = 0; i < gRID1.length; i++) {
              var send1 = gRID1[i].split("|");
              var arr1 = {
                one:send1[4],
                two:parseFloat(send1[6]).toFixed(2) + '%',
                three:that.chenPass(send1[7], send1[8])
              };
              sItem1.push(arr1);
            }
            that.$set('jsTShare',sItem1);
          }
          var gRID2 = oSend.GRID4;
          if (gRID2) {
            var sItem2 = [];
            for (var j = 0; j < gRID2.length; j++) {
              var send2 = gRID2[j].split("|");
              var arr2 = {
                one:send2[4],
                two:parseFloat(send2[6]).toFixed(2)+ '%',
                three:that.chenPass(send2[7], send2[8])
              };
              sItem2.push(arr2);
            }
            that.$set('jsTFlowShare',sItem2);
          }
          var gRID3 = oSend.GRID5;
          if (gRID3) {
            var sItem3 = [];
            for (var n = 0; n < gRID3.length; n++) {
              var send3 = gRID3[n].split("|");
              var arr3 = {
                one:send3[0],
                two:parseFloat(send3[3]).toFixed(2)+'%',
                three:that.chenPass(send3[2], send3[4])
              };
              sItem3.push(arr3);
            }
            that.$set('jsAgency',sItem3);
          }
          var gRID4 = oSend.GRID6;
          if (gRID4) {
            if(gRID4[0]) {
              var send41 = gRID4[0].split('&##&')[0].split("|");
              var gRID4_1 = gRID4[0].split('&##&')[1];
              that.jsAnnualReport01 = (that.AnnualReport(send41[2]));
              that.jsNumShare01 = (that.formatNaN((parseFloat(send41[0]) / 10000).toFixed(2)) + "万户");
              that.jsOpCchange01 = (that.formatNaN(send41[1]) + "%");

              if (gRID4_1) {
                var send42 = gRID4_1.split("|");
                that.jsAnnualReport02 = (that.AnnualReport(send42[2]));
                that.jsNumShare02 = (that.formatNaN((parseFloat(send42[0]) / 10000).toFixed(2)) + "万户");
                that.jsOpCchange02 = (that.formatNaN(send42[1]) + "%");
              }
            }
          }
        })
      },AnnualReport(date) {
        if(!date){
          return '';
        }
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
      chenPass(n, m) {
        if (m == 1) {
          return "新进";
        }
        if (n == 0 || n == "") {
          return "不变";
        }
        if (n > 0) {
          return "增持";
        }
        if (n < 0) {
          return "减持";
        }
        else {
          return ((parseFloat(n) / 10000).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + "万股";//(parseFloat(n) / 10000).toFixed(2) + "万股";
        }
      },
      formatNaN(n) {
        if (n == "" || n == "NaN" || n==undefined) {
          return "--";
        } else {
          return n;
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
  #contentArea .shareBox {
    margin-top: 6px;
    /*background-color: #fff;*/
    width: 100%;
  }
  .shareBox .shareTitle {
    padding: 10px 0 10px 0px;
    border-bottom: 1px solid #e5e5e5;
    width:100%;
    font-size:0;
    vertical-align:top;
  }
  .shareTitle .shareComa {
    display:inline-block;
    font-size: 15px;
    color: #2a8ee3;
    letter-spacing: 1px;
    width:34%;
  }
  .shareTitle .width20{
    width:20%;
  }
  .shareTitle i {
    display:inline-block;
    font-size:13px;
    width:32%;
  }
  .shareBox .shareCon {
    width:100%;
    font-size:0;
    vertical-align:top;
  }
  .shareCon .textTitle {
    display:inline-block;
    width:50%;
    padding:8px 0;
    word-wrap: normal;
  }
  .textTitle .titCon {
    font-size:13px;
    padding:0 4px 0 16px;
  }
  .textTitle .pad12 {
    padding:0 4px 0 12px
  }

  .textTitle .pad12:first-child {
    padding:0 4px 0 0px
  }
  .shareCon .titleCon {
    width:100%;
    font-size:0;
    vertical-align:top;
    padding:8px 0 8px 0px;
  }
  .titleCon .titBox {
    display:inline-block;
    width:30%;
    font-size:13px;
  }
  .titleCon .width40 {
    width:40%;
  }

  .width50 {
    display: inline-block;
    font-size: 13px;
    width: 64%;
    text-align: right;
    padding-right: 19px;
  }
  .shareCon .teTitle {
    width:100%;
    font-size:0;
    vertical-align:top;
    padding:9px 0px 9px 0;
  }
  .teTitle .titName {
    display: inline-block;
    width: 16%;
    font-size: 13px;
    vertical-align: top;
    text-align: right;
  }
  .teTitle .width40 {
    width:30%;
    text-align: left;
  }
  .teTitle .width60 {
    width:68%;
  }
  .teTitle .width25 {
    width:28%;
  }
  .pandRigt {
    /*padding-right:9px;*/
  }
  .textRigt {
    text-align: right;
  }
</style>
