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
          <span class="nameText">管理层</span>
          <span class="nameText width80 jscomIndust">{{jscomManag}}</span>
        </p>
        <p class="compName">
          <span class="nameText">所属行业</span>
          <span class="nameText width80 jscomArea">{{jscomIndust}}</span>
        </p>
        <p class="compName">
          <span class="nameText">总股本</span>
          <span class="nameText width80 jscomBusines">{{jsTotalCapital}}</span>
        </p>
        <p class="compName">
          <span class="nameText">每手股数</span>
          <span class="nameText width80 jscomDateTime">{{jsSharesNum}}</span>
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
  </div>
</template>

<script>
  import service_information_often from '../../../information/service/common/service_information_often'
  import tztStockType from '../../scripts/tztStockType'
  export default {
    data() {
      return {
        jscomName:'',
        jscomManag:'',
        jscomIndust:'',
        jsTotalCapital:'',
        jsSharesNum:'',
        jscomBonus:[],
      }
    },
    attached() {
      // $.init();
      this.jscomName = '';
      this.jscomManag = '';
      this.jscomIndust = '';
      this.jsTotalCapital = '';
      this.jsSharesNum = '';
      this.jscomBonus = [];
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
                that.jscomManag = that.formatNaN(send0[1]);
                that.jscomIndust = that.formatNaN(send0[2]);
                that.jsTotalCapital = that.format(send0[3])+" 股";
                that.jsSharesNum = that.format(send0[4]);
            }
            var gRID3 = oSend.GRID3;
            if (gRID3) {
              var sItem3 = [];
              for (var j = 0; j < gRID3.length; j++) {
                var send3 = gRID3[j].split("|");
                var arr3 = {
                  year:that.formatNaN(send3[0]),
                  name:that.formatNaN(send3[1]),
                  date:that.formatNaN(send3[2])
                };
                sItem3.push(arr3);
              }
              that.$set('jscomBonus',sItem3);
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
        } else if(!isNaN(num)){
          return (Number(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        } else {
          return num;
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
