<template>
  <div class="content pull-to-refresh-content" v-pull-to-refresh="loadOld" data-up='1'>
    <!--<div class="content pull-to-refresh-layer" v-pull-to-refresh="loadOld" data-up='1'>-->
    <div class="pull-to-refresh-layer">
      <div class="preloader"></div>
      <div class="pull-to-refresh-arrow"></div>
    </div>
      <div class="bk-block" v-show="isBK">
        <div class="bk-cont" v-on:click="clickFunc(0,1)">
          <p class="bk-title"><span class="price {{UPDOWNPINDEX | isUP}}">{{NEWPRICEINDEX}}</span><span class="fdprice {{UPDOWNPINDEX | isUP}}">{{UPDOWNPINDEX}}</span></p>
          <p class="bk-notice"><span>上涨个股：<em class="rise">{{PRICE}}</em></span><span>下跌个股：<em class="fill">{{VOLUME}}</em></span><span>平盘个股：<em>{{CONTACTID}}</em></span></p>
        </div>

      </div>
      <div style="position: relative;">
        <div class="cont-right">
          <table>
            <tr class="cont-right-title">
              <th class="first" v-show="isShowTitle"></th>
              <th v-for="items in titleArray" v-on:click="titleFunc(items)">{{items}}</th>
            </tr>
            <tr v-for="(index,item) in GRID" v-on:click="clickFunc($index)">
              <td class="first"></td>
              <td v-for="(indexs,data) in item" track-by="$index" v-bind:style="{color:colorArray[index][indexs]}">{{data}}</td>
            </tr>
          </table>
        </div>
        <div class="cont-left">
          <p class="cont-left-title" v-show="isShowTitle">{{titles}}</p>
          <p class="cont-left-height" v-for="item in stockArray" v-on:click="clickFunc($index)"><span>{{item.STOCKNAMEINDEX}}</span><span>{{item.STOCKCODEINDEX}}<em v-if="item.RZRQ" class="RZRQ"></em><em v-if="item.Tong" class="Tong"></em><em v-if="item.FXJS" class="FXJS"></em><em v-if="item.TSZL" class="TSZL"></em><em v-if="item.SBGP" class="SBGP"></em><em v-if="item.SBLW" class="SBLW"></em><em v-if="item.SBXQ" class="SBXQ"></em><em v-if="item.SBXZ" class="SBXZ"></em><em v-if="item.ISH" class="ISH"></em><em v-if="item.ISZ" class="ISZ"></em></span></p>
        </div>
      </div>
    <!--</div>-->
  </div>
</template>

<script>
  import utils from '../../../util/util'
  import tztMarket from '../scripts/tztMarket'
  import service_hq_often from '../service/common/service_hq_often'
  import tztTechObjBaseOperation from '../scripts/tztTechObjBaseOperation';
export default {
  data () {
    return {
      GRID:[],
      loading:false,
      StartPos:1,
      NewMarketNo:0,
      MaxCount:0,
      isDownLoad:true,
      market:this.$route.query.market,
      stockcode:'',
      isBK:false,
      action:'require20191',
      oldGRID:[],
      titleArray:[],
      titles:'',
      name:'',
      PRICE:'--',
      VOLUME:'--',
      CONTACTID:'--',
      NEWPRICEINDEX:'--',
      UPDOWNPINDEX:'--',
      stockArray:[],
      colorArray:[],
      AccountIndex:0,
      Direction:1,
      DeviceType:1,
      Lead:1,
      STOCKCODEINDEX:'',
      NEWMARKETNO:[],
      headMarketno:'',
      headGrid:'',
      isShowTitle:false,
      defaultTitle:'幅度',
    }
  },
  attached(){
    // this.$route.query.stock = 'H股全流通';
    // this.$route.query.title = 'H股全流通';
    this.$route.query.title = 'B转H';
    this.$route.query.market = '4682';
    $.init();
    this.inits();
  },
  methods:{
    dealRefreshTimer(){
        if (!$('.pull-to-refresh-content').hasClass('pull-up')) {
            this.loadOld();
        }
    },
    inits(){
      this.action = 'require20191';
      this.loading = false;
      this.market = this.$route.query.market;
      if(this.$route.query.title){
        this.$route.router.app.title = this.$route.query.title;
      }
      this.isDownLoad = true;
      this.isBK = false;
      this.isShowTitle = false;
      this.titles = '';
      this.GRID = [];
      this.oldGRID = [];
      this.STOCKCODEINDEX = '';
      this.headMarketno = '';
      this.headGrid = '';
      this.AccountIndex = 0;
      this.NEWMARKETNO = [];
      this.titleArray = [];
      this.stockArray = [];
      this.DeviceType = 1;
      this.Lead = 1;
      this.StartPos = 1;
      var cont_h = $(this.$router.app.$el).height()-44;
      console.log(cont_h);
      for(var x in this.$route.query){
        this[x] = this.$route.query[x];
      }
      if(this.market){
        this.MaxCount = Math.floor((cont_h-20)/40);
        var marketObj = tztMarket.getMarket(this.market);
        if(!this.$route.query.title){
          this.$route.router.app.title = marketObj.title;
        }
        this.action = marketObj.action;
        this.stockcode = marketObj.stockcode;
        if(this.market == '802'){
          this.AccountIndex = 9;
        }
        if (this.market == '4681'||this.market == '4682') {
            this.action = 'require20191';
            this.stockcode = '4682';
        }
      }else if(this.$route.query.stockcode){
        this.stockcode = this.$route.query.stockcode;
        this.isBK = true;
        this.action = 'require20199';
        this.MaxCount = Math.floor((cont_h-20-66)/40);
      }else if(this.$route.query.stock){
        this.stockcode = this.$route.query.stock;
        if(this.stockcode === '4661' || this.stockcode === '4662' || this.stockcode === '4664' || this.stockcode === '4663'){
          this.action = 'require20196';
        }else if(this.stockcode === '1101,1201,1206,120B,110C,120C'){
          this.action = 'require20620';
        }else if(
          this.stockcode === '创新层' ||
          this.stockcode === '基础层' ||
          this.stockcode === '优先股' ||
          this.stockcode === '新三板_转让类型_协议' ||
          this.stockcode === '新三板_转让类型_做市' ||
          this.stockcode === '新三板_转让类型_集合竞价' ||
          this.stockcode === '新三板_证券级别_两网(A股)' ||
          this.stockcode === '新三板_证券级别_两网(B股)' ||
          this.stockcode === '新三板_转让状态_首日挂牌' ||
          this.stockcode === '新三板_转让状态_新增股票挂牌转让' ||
          this.stockcode === '沪港通' ||
          this.stockcode === '深港通' ||
          this.stockcode === '国企股' ||
          this.stockcode === '红筹股' ||
          this.stockcode === '蓝筹股' ||
          this.stockcode === '恒指成份' ||
          this.stockcode === '全球指数' ||
          this.stockcode === 'H股全流通'
        ){
          this.action = 'require20192';
        }else if(this.stockcode === 'AH股'){
          this.action = 'require20194';
        }
        this.MaxCount = Math.floor((cont_h-20)/40);
      }
      this.loadOld('pull');
    },
    loadOld(val){
//      console.log(val);
      $.pullToRefreshDone('.pull-to-refresh-content');
      // 如果正在加载，则退出
      if(this.loading){
        return;
      }
      this.loading = true;
      var that = this;
      if(val === 'pull'){
        that.StartPos-=that.MaxCount;
        if(that.StartPos<1){
          that.StartPos = 1;
        }
      }else if(val == 'up'){
        if(!that.isDownLoad){
          this.loading = false;
          return;
        }
        that.StartPos+=that.MaxCount;
      }
      let oSendData = {
        AccountIndex:that.AccountIndex,
        DeviceType:that.DeviceType,
        Direction:that.Direction,//0升序1降序
        Lead:that.Lead,
        MaxCount:that.MaxCount,
        NewMarketNo:0,
        StartPos:that.StartPos,
        StockCode:that.stockcode,
        newindex:1
      };
      service_hq_often[that.action](oSendData)
        .then((data)=> {
//          console.log(data);
          if(!data.GRID0){
            if(window.setIntervalID){
              window.clearInterval(window.setIntervalID);
            }
            $.alert(data.ERRORMESSAGE);
            return;
          }
          that.isShowTitle = true;
          that.titles = '名称';
//          that.$route.router.app.title = data.BINHead.StockName;
          var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
          var newData = data.GRID0;
          var title = newData[0].slice(0,-1).split('|');
          if(data.STOCKNAMEINDEX){
            var nArray1 = title.slice(0,data.STOCKNAMEINDEX);
            var nArray2 = title.slice(data.STOCKNAMEINDEX+1);
            title = nArray1.concat(nArray2);
          }
          if(data.STOCKCODEINDEX){
            that.STOCKCODEINDEX = data.STOCKCODEINDEX;
            var n = data.STOCKCODEINDEX;
            if(data.STOCKCODEINDEX-data.STOCKNAMEINDEX>0){
              n = n-1;
            }
            var cArray1 = title.slice(0,n);
            var cArray2 = title.slice(n+1);
            title = cArray1.concat(cArray2);
          }
          if(that.StartPos == 1){
            if(that.AccountIndex==0){
              var fdln = title.indexOf('幅度');
              if(that.Direction ==1){
                title[fdln] = '幅度↓';
              }else if(that.Direction ==0){
                title[fdln] = '幅度↑';
              }
            }else if(that.AccountIndex==41){
              var fdln = title.indexOf('净流入');
              if(that.Direction ==1){
                title[fdln] = '净流入↓';
              }else if(that.Direction ==0){
                title[fdln] = '净流入↑';
              }
              that.defaultTitle = '净流入';
            }else if(that.AccountIndex==4){
              var fdln = title.indexOf('总额');
              if(that.Direction ==1){
                title[fdln] = '总额↓';
              }else if(that.Direction ==0){
                title[fdln] = '总额↑';
              }
              that.defaultTitle = '总额';
            }
            var accountIndex = that.$route.query.AccountIndex;
            if(accountIndex && that.AccountIndex == accountIndex){
              that.titleArray = title;
            }
            if((!accountIndex && that.AccountIndex == 0 && that.titleArray.length==0)||(!accountIndex && that.AccountIndex == 9)){
              that.titleArray = title;
            }
          }
          if(data.NEWMARKETNO){
            that.NEWMARKETNO = data.NEWMARKETNO.split('|');
          }
          if(that.isBK){
            that.PRICE = data.PRICE;
            that.VOLUME = data.VOLUME;
            that.CONTACTID = data.CONTACTID;
            newData.shift();
            STOCKPROP.shift();
            that.UPDOWNPINDEX = newData[0].split('|')[data.UPDOWNPINDEX];
            that.NEWPRICEINDEX = newData[0].split('|')[data.NEWPRICEINDEX];
            if(that.NEWMARKETNO){
              that.headMarketno = that.NEWMARKETNO.shift();
            }
            that.$route.router.app.title = newData[0].split('|')[data.STOCKNAMEINDEX];
            that.$route.router.app.barstockcode = newData[0].split('|')[data.STOCKCODEINDEX];
          }
          that.headGrid = newData.shift();
          that.$set('oldGRID',newData);
          let indexData = [];
          let colors = [];
          let stockArrays = [];
          let colorArrays = [];
          if(data.BINDATA){
            var listIndex = newData[0].slice(0,-1).split('|').length;
            var ln = newData.length+1;
            if(that.isBK){
              ln++;
            }
            var colorObj = tztTechObjBaseOperation.setTNewPriceData(data.BINDATA,data.NEWMARKETNO,'ColorData',listIndex*ln);
//            console.log(colorObj);
            var color;
            if(that.isBK){
              color = colorObj.slice(listIndex*2);
            }else {
              color = colorObj.slice(listIndex);
            }
            color.forEach((item,index)=>{
              var i = Math.floor(index/listIndex);
              if(!colorArrays[i]){
                colorArrays[i] = [];
              }
              colorArrays[i].push(tztMarket.rgb(item.color));
            });
          }
//          console.log(colorArrays);
          newData.forEach((items,index)=>{
              let listData = items.slice(0,-1).split('|');
              listData[0] = listData[0].replace(/^\d+./g,'');
              let name = '',stockcode = '';
              let stockArray = listData;
              let colorData = colorArrays[index];
              if(data.STOCKNAMEINDEX){
                var nArray1 = stockArray.slice(0,data.STOCKNAMEINDEX);
                var nArray2 = stockArray.slice(data.STOCKNAMEINDEX+1);
                stockArray = nArray1.concat(nArray2);
                var colorArray1 = colorData.slice(0,data.STOCKNAMEINDEX);
                var colorArray2 = colorData.slice(data.STOCKNAMEINDEX+1);
                colorData = colorArray1.concat(colorArray2);
                name = listData[data.STOCKNAMEINDEX];
              }
              if(data.STOCKCODEINDEX){
                var n = data.STOCKCODEINDEX;
                if(data.STOCKCODEINDEX-data.STOCKNAMEINDEX>0){
                  n = n-1;
                }
                var cArray1 = stockArray.slice(0,n);
                var cArray2 = stockArray.slice(n+1);
                stockArray = cArray1.concat(cArray2);

                var colorsArray1 = colorData.slice(0,n);
                var colorsArray2 = colorData.slice(n+1);
                colorData = colorsArray1.concat(colorsArray2);
                stockcode = listData[data.STOCKCODEINDEX];
              }
              indexData.push(stockArray);//listData
              colors.push(colorData);//colorData
              var listObj = {
                STOCKCODEINDEX:stockcode,
                STOCKNAMEINDEX:name,
                RZRQ:false,
                Tong:false,
                FXJS:false,
                TSZL:false,
                SBGP:false,
                SBLW:false,
                SBXQ:false,
                SBXZ:false,
                ISH:false,
                ISZ:false
              };
              if(STOCKPROP[index]){
                listObj['RZRQ'] = (STOCKPROP[index][3] == 1?true:false) || (STOCKPROP[index][4] == 1?true:false);
                listObj['Tong'] = (STOCKPROP[index][13] == 1?true:false);
                listObj['FXJS'] = (STOCKPROP[index][5] == 1?true:false);
                listObj['TSZL'] = (STOCKPROP[index][6] == 1?true:false);
                listObj['SBGP'] = (STOCKPROP[index][9] == 'T'?true:false);
                listObj['SBLW'] = (STOCKPROP[index][9] == 'B'?true:false);
                listObj['SBXQ'] = (STOCKPROP[index][9] == 'O'?true:false);
                listObj['SBXZ'] = (STOCKPROP[index][9] == 'P'?true:false);
                listObj['ISH'] = (STOCKPROP[index][7] == 1?true:false);
                listObj['ISZ'] = (STOCKPROP[index][8] == 1?true:false);
              }
              stockArrays.push(listObj);
          });
          var no = newData[newData.length-1].split('|')[0].split('.')[0];
          var nos=parseInt(no);
          if(!isNaN(nos)){
            if(nos == data.MAXCOUNT){
              that.isDownLoad = false;
            }else {
              that.isDownLoad = true;
            }
          }
//          console.log(colors);
          that.$set('GRID',indexData);
          that.$set('colorArray',colors);
          that.$set('stockArray',stockArrays);
          that.loading = false;
          that.$TZT.action10077(that);
          that.$nextTick(function(){
            if(that.GRID[0].length<=3){
              var w = ($(that.$el).width()-$(that.$el).find('.cont-left').width())/indexData[0].length;
              $(that.$el).find('.cont-right .cont-right-title th').css({'min-width':w+'px'});
            }
          })
        });
    },
    titleFunc(item){
//      console.log(item);↑↓
      item = item.replace('↓','').replace('↑','');
      if(item in tztMarket.SortColInfo){
        var title = [];
        this.titleArray.forEach((item,index)=>{
          title.push(item.replace('↓','').replace('↑',''));
        });
        var ln = title.indexOf(item);
        if(item === this.defaultTitle){
          this.titleArray = title;
          if(this.Direction === 0){
            this.Direction = 1;
            this.titleArray[ln] = item+'↓';
          }else {
            this.Direction = 0;
            this.titleArray[ln] = item+'↑';
          }
        }else {
          this.titleArray = title;
          this.defaultTitle = item;
          this.titleArray[ln] = item+'↓';
          this.AccountIndex = tztMarket.SortColInfo[item];
          this.Direction = 1;
        }
        this.StartPos= 1;
        this.loadOld();
      }
    },
    clickFunc(index,bk) {
      var grid = this.oldGRID;
      if(index>=grid.length){
        return;
      }
      var stock = grid[index].split('|')[this.STOCKCODEINDEX];
      var stockname = encodeURIComponent(this.stockArray[index].STOCKNAMEINDEX);
      if(this.action === 'require20196'){
        this.$TZT.action10061(`/hq/list?stockcode=${stock}`);
//        window.location.href = `/index.html#!/hq/list?stockcode=${stock}`;
      }else {
        var marketno = this.NEWMARKETNO[index];
        if(bk == 1){
          stock = this.headGrid.split('|')[this.STOCKCODEINDEX];
          marketno = this.headMarketno;
        }
        this.$TZT.action10061(`/hq/hggStockInfo?stockcode=${stock}&marketno=${marketno}&hstockname=${stockname}`);
      }
    }
  },
  route:{
    /*data(transition){
      console.log(1);
      transition.next()
    },
    activate(transition){
      console.log(2);
      transition.next()
    },*/
    canReuse(transition){
      console.log(3);
      this.inits();
//      transition.next()
    }/*,
    deactivate(transition){
      console.log(4);
      transition.next()
    },
    canDeactivate({next, redirect}) {
      console.log(5);
      next();
    },
    deactivate({next,redirect}){
      console.log(6);
      next();
    }*/
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
@import "../../../assets/less/mixins.less";
.content{
  .bk-block{
    padding: 0.25rem;
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
    .bk-cont{
      border:1px solid #f0f0f0;
      border-radius: 0.25rem;
      .bk-title{
        .price{
          font-size: 1.2rem;
          padding-left: 0.5rem;
        }
        .fdprice{
          font-size: 0.6rem;
          padding-left: 0.5rem;
        }
      }
      .bk-notice{
        font-size: 0;
        padding:0 0.5rem;
        span{
          width: 33%;
          font-size: 0.6rem;
          display: inline-block;
        }
      }
    }
  }
  .cont-right{
    position: relative;
    width: 100%;
    overflow-x: scroll;
    .first{
      padding-left: 4.25rem;
    }
    tr{
      height: 2.5rem;
      line-height: normal;
      border-bottom: 1px solid #e7e7e7;
      td{
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
      }
    }
    tr:nth-child(2n-1){
      /*background: #f0f0f0;*/
    }
    .cont-right-title{
      height: 2rem;
      font-size:0.7rem;
      color: #919191;
      th{
        min-width: 5rem;
      }
    }
  }
  .cont-left{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: #fff;
    width: 4.25rem;
    font-size: 0.7rem;
    line-height: normal;
    .cont-left-title{
      font-size: 0.7rem;
      height: 2rem;
      padding-left: 0.5rem;
      line-height: 2rem;
      color: #919191;
      border-bottom: 1px solid #e7e7e7;
      box-sizing: content-box;
    }
    .cont-left-height{
      padding-top: 0.4rem;
      height: 2.5rem;
      padding-left: 0.5rem;
      white-space: nowrap;
      border-bottom: 1px solid #e7e7e7;
    }
    span{
      display: block;
      overflow:hidden;
      text-overflow:ellipsis;
      /*padding-top: 0.2rem;*/
      line-height: 1rem;
      font-size: 0.9rem;
      color: #484848;
      font-weight: bold;
      em{
        display: inline-block;
        height: 0.7rem;
        width: 0.7rem;
        margin-left: 0.1rem;
      }
    }
    span:nth-child(2n){
      font-size: 0.6rem;
      color: #919191;
      font-weight: normal;
    }
    .RZRQ{
      background: url("../../../assets/hq-icon/TZTRZRQIcon@2x.png") no-repeat;
      background-size: auto 0.7rem;
    }
    .Tong{
      background: url("../../../assets/hq-icon/TZTTongIcon@2x.png") no-repeat;
      background-size: auto 0.7rem;
    }.FXJS{
      background: url("../../../assets/hq-icon/TZTFXJSIcon@2x.png") no-repeat;
      background-size: auto 0.7rem;
    }.TSZL{
      background: url("../../../assets/hq-icon/TZTTSZLIcon@2x.png") no-repeat;
      background-size: auto 0.7rem;
    }.SBGP{
      background: url("../../../assets/hq-icon/tztSBGP@2x.png") no-repeat;
      background-size: auto 0.7rem;
      width: 1.4rem;
    }.SBLW{
      background: url("../../../assets/hq-icon/tztSBLW@2x.png") no-repeat;
      background-size: auto 0.7rem;width: 1.4rem;
    }.SBXQ{
      background: url("../../../assets/hq-icon/tztSBXQ@2x.png") no-repeat;
      background-size: auto 0.7rem;width: 1.4rem;
    }.SBXZ{
      background: url("../../../assets/hq-icon/tztSBXZ@2x.png") no-repeat;
      background-size: auto 0.7rem;width: 1.4rem;
    }.ISH{
      background: url("../../../assets/hq-icon/TZTHGTIcon@2x.png") no-repeat;
      background-size: auto 0.7rem;
    }.ISZ{
      background: url("../../../assets/hq-icon/TZTSGTIcon@2x.png") no-repeat;
      background-size: auto 0.7rem;
    }
    p:nth-child(2n-1){
      /*background: #f0f0f0;*/
    }
  }
}
</style>
