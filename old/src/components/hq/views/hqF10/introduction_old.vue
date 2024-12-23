<!--简况-->
<template>
  <div id="contentArea">
    <div class="introBox">
      <div class="introTitle">
        <span class="introComa">公司简介</span>
      </div>
      <div class="introCon">
        <p class="compName">
          <span class="nameText">公司名称</span>
          <span class="nameText width80 jscomName">{{jscomName}}</span>
        </p>
        <p class="compName">
          <span class="nameText">所属行业</span>
          <span class="nameText width80 jscomIndust">{{jscomIndust}}</span>
        </p>
        <p class="compName">
          <span class="nameText">所属地区</span>
          <span class="nameText width80 jscomArea">{{jscomArea}}</span>
        </p>
        <p class="compName">
          <span class="nameText">主营业务</span>
          <span class="nameText width80 jscomBusines">{{jscomBusines}}</span>
        </p>
        <p class="compName">
          <span class="nameText">上市日期</span>
          <span class="nameText width80 jscomDateTime">{{jscomDateTime}}</span>
        </p>
      </div>
    </div>
    <div class="introBox">
      <div class="introTitle">
        <span class="introComa">主营收入结构</span>
        <i>单位：元</i>
      </div>
      <div class="introCon jsmainIncome">
        <p class="compName" v-for="items in jsmainIncome">
          <span class="textBox">{{items.name}}</span>
          <i>{{items.id}}</i>
        </p>

      </div>
    </div>
    <div class="introBox">
      <div class="introTitle">
        <span class="introComa">分红送配</span>
      </div>
      <div class="introCon">
        <div class="textTitle">
          <span class="titCon">年度</span>
          <span class="titCon width40">方案</span>
          <span class="titCon">除权除息日</span>
        </div>
        <div class="jscomBonus">
          <p class="textTitle" v-for="items in jscomBonus">
            <span class="titCon">{{items.year}}</span>
            <span class="titCon width40">{{items.name}}</span>
            <span class="titCon">{{items.date}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="introBox jsXStroBox">
      <div class="introTitle">
        <span class="introComa">限售解禁</span>
        <i>单位：亿股</i>
      </div>
      <div class="introCon">
        <div class="textTitle">
          <span class="width20 width30">解禁时间</span>
          <span class="width20">数量</span>
          <span class="width20 width30">类型</span>
          <span class="width20 tconter">占比</span>
        </div>
        <div class="jsLiftBan">
          <p class="textTitle" v-for="items in jsLiftBan">
            <span class="width20 width30">{{items.date}}</span>
            <span class="width20">{{items.one}}</span>
            <span class="width20 width30">{{items.two}}</span>
            <span class="width20">{{items.three}}</span>
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
        jscomName:'',
        jscomIndust:'',
        jscomArea:'',
        jscomBusines:'',
        jscomDateTime:'',
        jsmainIncome:[],
        jscomBonus:[],
        jsLiftBan:[]
      }
    },
    attached() {
      // $.init();
      this.jscomName = '';
      this.jscomIndust = '';
      this.jscomArea = '';
      this.jscomBusines = '';
      this.jscomDateTime = '';
      this.jsmainIncome = [];
      this.jscomBonus = [];
      this.jsLiftBan = [];
      this.stockcode = this.$route.query.stockcode;
      this.getInfoIntro();
    },
    methods: {
      getInfoIntro(){
        var that = this;
        var NEWMARKETNO = this.$route.query.marketno;
        let  actiontype= '46103'; //默认发A股简况功能号
        let stockcode= this.stockcode
        if(tztStockType.MakeHKMarketStock(NEWMARKETNO)){ //判断是港股就发这个功能号
          actiontype='46107';
          stockcode=this.stockcode.replace("H",""); //港股去掉H
        }
        var oSendData = {
          StockCode: stockcode,//"000001",
          action:actiontype
        };
        service_information_often.require46103(oSendData)
          .then((oSend)=>{
            var gRID0 = oSend.GRID2;
            if (gRID0) {
              var send0 = gRID0[0].split("|");
              that.jscomName = that.formatNaN(send0[0]);
              that.jscomIndust  = that.formatNaN(send0[1]);
              that.jscomArea  = that.formatNaN(send0[2]);
              that.jscomBusines  = that.formatNaN(send0[3]);
            }
            var gRID1 = oSend.GRID3;
            if (gRID1) {
              var send1 = gRID1[0].split("|");
              that.jscomDateTime  = that.formatNaN(send1[0]);
            }
            var gRID2 = oSend.GRID4;
            if (gRID2) {
              var sItem2 = [];
              for (var i = 0; i < gRID2.length; i++) {
                var send2 = gRID2[i].split("|");
                var arr = {
                  name:send2[0],
                  id:that.format(parseFloat(send2[1]) / 10000)+'万'
                };
                sItem2.push(arr);
              }
              that.$set('jsmainIncome',sItem2)
            }
            var gRID3 = oSend.GRID5;
            if (gRID3) {
              var sItem3 = [];
              for (var j = 0; j < gRID3.length; j++) {
                var send3 = gRID3[j].split("|");
                var arr3 = {
                  year:that.formatNaN(send3[0]),
                  name:that.comBonus(send3[1], send3[2], send3[3]),
                  date:that.formatNaN(send3[4])
                };
                sItem3.push(arr3);
              }
              that.$set('jscomBonus',sItem3);
            }
            var gRID4 = oSend.GRID6;
            if(!gRID4){
              return ;
            }
            if (gRID4 && (typeof gRID4 == 'object')) {
              var sItem4 = [];
              for (var n = 0; n < gRID4.length; n++) {
                var send4 = gRID4[n].split("|");
                var arr4 = {
                  date:that.formatNaN(send4[0]),
                  one:(parseFloat(send4[1]) / 10000).toFixed(2),
                  two:send4[4],
                  three:that.formatNaN(parseFloat(send4[2]).toFixed(2))=='--'?'--':(that.formatNaN(parseFloat(send4[2]).toFixed(2))+'%')
                };
                sItem4.push(arr4);
              }
              that.$set('jsLiftBan',sItem4);
            }else{
              gRID4 = gRID4.split('&##&');
              var sItem4_1 = [];
              for (var n = 0; n < gRID4.length; n++) {
                if(gRID4[n] == ''){
                  continue;
                }
                var send_4 = gRID4[n].split("|");
                var arr_4 = {
                  date:that.formatNaN(send_4[0]),
                  one:(parseFloat(send_4[1]) / 10000).toFixed(2),
                  two:send_4[4],
                  three:that.formatNaN(parseFloat(send_4[2]).toFixed(2))=='--'?'--':(that.formatNaN(parseFloat(send_4[2]).toFixed(2))+ "%")
                };
                sItem4_1.push(arr_4);
              }
              that.$set('jsLiftBan',sItem4_1);
            }
            if (!gRID4) {
              that.$set('jsLiftBan',[]);
            }
          })
      },
      comBonus(a, b, c) {
        if ((a == 0 || a == "") && (b == 0 || b == "") && (c == 0 || c == "")) {
          return "不分配不转增";
        } else {
          return '10' + this.song(a) + this.zhuan( b) + this.pai(c) ;
        }
      },
      song(a) {
        if (a == 0 || a == "") {
          return "";
        } else {
          return "送" + a;
        }
      },
      zhuan(b) {
        if (b == 0 || b == "") {
          return "";
        } else {
          return "转" + b;
        }
      },pai(c) {
        if (c == 0 || c == "") {
          return "";
        } else {
          return "派" + c;
        }
      },format(num) {
        if (num == "" || num == "NaN") {
          return "--";
        } else {
          return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
      },
      formatNaN(n) {
        if (n == "" || n == "NaN") {
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
  .textTitle .width30 {
    width: 30%;
  }
  .textTitle .tconter {
    text-align:center;
  }
  .textTitle .tright {
    text-align:right;
    padding: 0 5px 0 0;
  }
</style>
