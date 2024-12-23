<!--权益-->
<template>
  <div id="contentArea">
    <div class="introBox jsXStroBox">
      <div class="introTitle">
        <span class="introComa">权益披露</span>
        <i></i>
      </div>
      <div class="introCon">
        <div class="textTitle">
          <span class="width20 width40">股东</span>
          <span class="width20">目前持股</span>
          <span class="width20 tconter">持股率</span>
          <span class="width20 tconter">日期</span>
        </div>
        <div class="jsLiftBan">
          <p class="textTitle" v-for="items in jsLiftBan">
            <span class="width20 width40">{{items.name}}</span>
            <span class="width20">{{items.two}}</span>
            <span class="width20 tconter">{{items.three}}</span>
            <span class="width20">{{items.date}}</span>
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
        jsLiftBan:[]
      }
    },
    attached() {
      // $.init();
      this.jsLiftBan = [];
      this.stockcode = this.$route.query.stockcode;
      this.getInfoIntro();
    },
    methods: {
      getInfoIntro(){
        var that = this;
        var oSendData = {
          StockCode: this.stockcode.replace("H",""),//"000001",
        };
        service_information_often.require46109(oSendData)
                .then((oSend)=>{
          var gRID0 = oSend.GRID2;
          console.log(oSend);
          if (!gRID0) {
            return ;
          }
          var sItem4 = [];
          for (var n = 0; n < gRID0.length; n++) {
            var send4 = gRID0[n].split("|");
            var arr4 = {
              date:send4[0],
              name:send4[1],
              two:send4[2],
              three:that.formatNaN(parseFloat(send4[3]).toFixed(2)) +"%"
            };
            sItem4.push(arr4);
          }
          that.$set('jsLiftBan',sItem4);
      })
      },
      formatNaN(n) {
        if (n == "" || n == "NaN") {
          return "--";
        } else {
          return n;
        }
      },
      parseFloatNum(n) {
          if (n == "" || n == "NaN" || n == undefined) {
              return "--";
          } else {
              return ((parseFloat(n) / 10000).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
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
  #contentArea .introBox {
    margin-top: 6px;
    /*background-color: #fff;*/
    width: 100%;
  }
  .introBox .introTitle {
    padding:10px 0 10px 0px;
    border-bottom:1px solid #e5e5e5;
  }
  .introTitle .introComa {
    font-size:15px;
    color:#2a8ee3;
    letter-spacing:1px;
  }
  .introTitle i {
    font-size: 13px;
    float:right;
    /*margin-right:5px;*/
  }
  .introBox .introCon {
    width:100%;
  }
  .introCon .compName {
    width: 100%;
    padding: 8px 0 8px 0px;
    font-size: 0;
  }
  .compName .nameText {
    display: inline-block;
    width: 20%;
    font-size: 13px;
    word-wrap: normal;
    vertical-align: top;
    min-width: 50px;
  }
  .compName .width80 {
    width: 80%;
  }
  .compName .textBox {
    display: inline-block;
    width: 65%;
    font-size: 13px;
    word-wrap: normal;
    vertical-align: top;
  }
  .compName .width35 {
    width: 35%;
    text-align: right;
    /*padding: 0 5px 0 0;*/
  }
  .compName i {
    font-size:13px;
    float:right;
    margin-right:19px;
  }
  .introCon .textTitle {
    width:100%;
    font-size:0;
    vertical-align:top;
    padding: 9px 0 9px 0px;
  }
  .textTitle .titCon {
    display:inline-block;
    font-size:13px;
    width:30%;
    vertical-align: top;
  }
  .textTitle .titCon:last-child{
    text-align: right;
    /*padding: 0 5px 0 0;*/
  }
  .textTitle .width40 {
    width:40%;
  }
  .textTitle .width20 {
    display:inline-block;
    font-size:13px;
    width: 20%;
    vertical-align: top;
  }
  .textTitle .width40 {
    width: 40%;
  }
  .textTitle .tconter {
    text-align:center;
  }
  .textTitle .tright {
    text-align:right;
    padding: 0 5px 0 0;
  }
</style>
