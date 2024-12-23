<template>
  <div class="hq_main">
    <div class="ui layout hq_box">
      <div class="row-1" v-for="items in indexModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
        <div class="inner {{items.UPDOWNINDEX | isUP}}">
          <h5>{{items.STOCKNAMEINDEX}}</h5>
          <strong><em class="triangle"></em>{{items.NEWPRICEINDEX}}</strong>
          <p><span class="lt">{{items.UPDOWNINDEX}}</span><span class="rt">{{items.UPDOWNPINDEX}}</span></p>
        </div>
      </div>
    </div>
    <div class="hot_box" >
      <div class="title">
        <h5 @click="funcHide(1)">领涨板块</h5>
        <em class="xia_button {{iconButton.xia_button1}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('4661','stock','title=领涨板块')"></a>
      </div>
      <div class="plate_list {{hideShow.hideshow1}}">
        <ul class="clearfix">
          <li class="part" v-for="items in letModule" @click="list(items.STOCKCODEINDEX)">
            <p>{{items.STOCKNAMEINDEX}}</p>
            <strong class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</strong>
            <small>{{items.LEADSTOCKNAMEINDEX}}<em class="{{items.LEADUPDOWNPINDEX | isUP}}">{{items.LEADUPDOWNPINDEX}}</em></small>
          </li>
        </ul>
      </div>
    </div>
    <div class="top_box1">
      <div class="title">
        <h5 @click="funcHide(2)">涨幅榜</h5>
        <em class="xia_button {{iconButton.xia_button2}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('302','market','title=涨幅榜')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow2}}" id="lzgList">
        <dl class="part" v-for="items in lzgModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.RZRQ" class="RZRQ"></em><em v-if="items.Tong" class="Tong"></em><em v-if="items.FXJS" class="FXJS"></em><em v-if="items.TSZL" class="TSZL"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>
      <div class="title">
        <h5 @click="funcHide(3)">跌幅榜</h5>
        <em class="xia_button {{iconButton.xia_button3}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('302','market','Direction=0&title=跌幅榜')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow3}}" id="ldgList">
        <dl class="part" v-for="items in ldgModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.RZRQ" class="RZRQ"></em><em v-if="items.Tong" class="Tong"></em><em v-if="items.FXJS" class="FXJS"></em><em v-if="items.TSZL" class="TSZL"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>
      <div class="title">
        <h5 @click="funcHide(4)">资金流入</h5>
        <em class="xia_button {{iconButton.xia_button4}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('1101,1201,1206,120B,110C,120C','stock','AccountIndex=41&title=资金流入')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow4}}" id="inflowsList">
        <dl class="part" v-for="items in inflowsModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.RZRQ" class="RZRQ"></em><em v-if="items.Tong" class="Tong"></em><em v-if="items.FXJS" class="FXJS"></em><em v-if="items.TSZL" class="TSZL"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.ZJLXRISEINDEX}}</span></dd>
        </dl>
      </div>
      <div class="title">
        <h5 @click="funcHide(5)">资金流出</h5>
        <em class="xia_button {{iconButton.xia_button5}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('1101,1201,1206,120B,110C,120C','stock','AccountIndex=41&Direction=0&title=资金流出')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow5}}" id="outList">
        <dl class="part" v-for="items in outModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.RZRQ" class="RZRQ"></em><em v-if="items.Tong" class="Tong"></em><em v-if="items.FXJS" class="FXJS"></em><em v-if="items.TSZL" class="TSZL"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd>
          <dd><span class="{{items.ZJLXRISEINDEX | isUP}}">{{items.ZJLXRISEINDEX}}</span></dd>
        </dl>
      </div>
      <div class="title">
        <h5 @click="funcHide(6)">总金额榜</h5>
        <em class="xia_button {{iconButton.xia_button6}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('302','market','AccountIndex=4&title=总金额榜&Lead=0')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow6}}" id="allList">
        <dl class="part" v-for="items in allModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.RZRQ" class="RZRQ"></em><em v-if="items.Tong" class="Tong"></em><em v-if="items.FXJS" class="FXJS"></em><em v-if="items.TSZL" class="TSZL"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd>
          <dd><span class="{{items.TOTALMINDEX | isUP}}">{{items.TOTALMINDEX}}</span></dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import service_hq_often from '../../service/common/service_hq_often'
  export default {
    data() {
      return {
        iconButton:{
          xia_button1:'fadeIn',
          xia_button2:'fadeIn',
          xia_button3:'fadeIn',
          xia_button4:'fadeIn',
          xia_button5:'fadeIn',
          xia_button6:'fadeIn'
        },
        hideShow:{
          hideshow1:'fadeIn',
          hideshow2:'fadeIn',
          hideshow3:'fadeIn',
          hideshow4:'fadeIn',
          hideshow5:'fadeIn',
          hideshow6:'fadeIn'
        },
        indexModule:[
          {STOCKNAMEINDEX:'上证指数',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'},
          {STOCKNAMEINDEX:'深证成指',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'},
          {STOCKNAMEINDEX:'创业板指',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'}
        ],
        letModule:[
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',LEADSTOCKNAMEINDEX:'--',LEADUPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',LEADSTOCKNAMEINDEX:'--',LEADUPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',LEADSTOCKNAMEINDEX:'--',LEADUPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',LEADSTOCKNAMEINDEX:'--',LEADUPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',LEADSTOCKNAMEINDEX:'--',LEADUPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',LEADSTOCKNAMEINDEX:'--',LEADUPDOWNPINDEX:'--'}
        ],
        lzgModule:[
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        ldgModule:[
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        inflowsModule:[
          {STOCKNAMEINDEX:'--',ZJLXRISEINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
        ],
        outModule:[
          {STOCKNAMEINDEX:'--',ZJLXRISEINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
        ],
        allModule:[
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'},
          {STOCKNAMEINDEX:'--',TOTALMINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',UPDOWNPINDEX:'--'}
        ]
      }
    },
    ready(){
      this.getIndexData();
      this.getLetData();
      this.getlzgData();
      this.getldgData();
      this.getInflowsData();
      this.getOutData();
      this.getAllData();
    },
    attached(){
//      console.log(1);
      this.$TZT.action10077(this);
    },
    methods: {
      dealRefreshTimer(){
        this.getIndexData();
        this.getLetData();
        this.getlzgData();
        this.getldgData();
        this.getInflowsData();
        this.getOutData();
        this.getAllData();
      },
      getIndexData(){
        var that = this;
        let oSendData = {
          AccountIndex:9,
          DeviceType:0,
          Direction:1,
          Grid:"1A0001,2A01,399006",
          Lead:1,
          MaxCount:3,
          NewMarketNo:0,
          StartPos:0,
          StockIndex:1,
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require60(oSendData)
          .then((data)=>{
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].slice(2),
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  UPDOWNINDEX:listData[data.UPDOWNINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1]
                };
                indexData.push(listObj);
              }
            });
            that.$set('indexModule',indexData);
          })
      },
      getLetData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:6,
          NewMarketNo:0,
          StartPos:0,
          StockCode:4661,
          StockIndex:1,
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20196(oSendData)
          .then((data)=> {
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].slice(2),
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  LEADSTOCKNAMEINDEX:listData[data.LEADSTOCKNAMEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  LEADUPDOWNPINDEX:listData[data.LEADUPDOWNPINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1]
                };
                indexData.push(listObj);
              }
            });
            that.$set('letModule',indexData);
          })
      },
      getlzgData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:0,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'1101,1201,1206,120B',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20191(oSendData)
          .then((data)=> {
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1],
                  RZRQ:false,
                  Tong:false,
                  FXJS:false,
                  TSZL:false
                };
                if(STOCKPROP[index-1]){
                  listObj['RZRQ'] = (STOCKPROP[index-1][3] == 1?true:false) || (STOCKPROP[index-1][4] == 1?true:false);
                  listObj['Tong'] = (STOCKPROP[index-1][13] == 1?true:false);
                  listObj['FXJS'] = (STOCKPROP[index-1][5] == 1?true:false);
                  listObj['TSZL'] = (STOCKPROP[index-1][6] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('lzgModule',indexData);
          })
      },
      getldgData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:0,
          Lead:0,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'1101,1201,1206,120B',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20191(oSendData)
          .then((data)=> {
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1],
                  RZRQ:false,
                  Tong:false,
                  FXJS:false,
                  TSZL:false
                };
                if(STOCKPROP[index-1]){
                  listObj['RZRQ'] = (STOCKPROP[index-1][3] == 1?true:false) || (STOCKPROP[index-1][4] == 1?true:false);
                  listObj['Tong'] = (STOCKPROP[index-1][13] == 1?true:false);
                  listObj['FXJS'] = (STOCKPROP[index-1][5] == 1?true:false);
                  listObj['TSZL'] = (STOCKPROP[index-1][6] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('ldgModule',indexData);
          })
      },
      getInflowsData(){
        var that = this;
        let oSendData = {
          AccountIndex:41,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'1101,1201,1206,120B,110C,120C',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20620(oSendData)
          .then((data)=> {
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  ZJLXRISEINDEX:listData[data.ZJLXRISEINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1],
                  RZRQ:false,
                  Tong:false,
                  FXJS:false,
                  TSZL:false
                };
                if(STOCKPROP[index-1]){
                  listObj['RZRQ'] = (STOCKPROP[index-1][3] == 1?true:false) || (STOCKPROP[index-1][4] == 1?true:false);
                  listObj['Tong'] = (STOCKPROP[index-1][13] == 1?true:false);
                  listObj['FXJS'] = (STOCKPROP[index-1][5] == 1?true:false);
                  listObj['TSZL'] = (STOCKPROP[index-1][6] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('inflowsModule',indexData);
          })
      },
      getOutData(){
        var that = this;
        let oSendData = {
          AccountIndex:41,
          DeviceType:0,
          Direction:0,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'1101,1201,1206,120B,110C,120C',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20620(oSendData)
          .then((data)=> {
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  ZJLXRISEINDEX:listData[data.ZJLXRISEINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1],
                  RZRQ:false,
                  Tong:false,
                  FXJS:false,
                  TSZL:false
                };
                if(STOCKPROP[index-1]){
                  listObj['RZRQ'] = (STOCKPROP[index-1][3] == 1?true:false) || (STOCKPROP[index-1][4] == 1?true:false);
                  listObj['Tong'] = (STOCKPROP[index-1][13] == 1?true:false);
                  listObj['FXJS'] = (STOCKPROP[index-1][5] == 1?true:false);
                  listObj['TSZL'] = (STOCKPROP[index-1][6] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('outModule',indexData);
          })
      },
      getAllData(){
        var that = this;
        let oSendData = {
          AccountIndex:4,
          DeviceType:0,
          Direction:1,
          Lead:0,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'1101,1201,1206,120B',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20191(oSendData)
          .then((data)=> {
//            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  TOTALMINDEX:listData[data.TOTALMINDEX],
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1],
                  RZRQ:false,
                  Tong:false,
                  FXJS:false,
                  TSZL:false
                };
                if(STOCKPROP[index-1]){
                  listObj['RZRQ'] = (STOCKPROP[index-1][3] == 1?true:false) || (STOCKPROP[index-1][4] == 1?true:false);
                  listObj['Tong'] = (STOCKPROP[index-1][13] == 1?true:false);
                  listObj['FXJS'] = (STOCKPROP[index-1][5] == 1?true:false);
                  listObj['TSZL'] = (STOCKPROP[index-1][6] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('allModule',indexData);
          })
      },
      ggStockInfo(stock,marketno){
        this.$router.go(`/hq/ggStockInfo?stockcode=${stock}&marketno=${marketno}`);
      },
      list(stock,key,parame){
        let keys = key || 'stockcode';
        let para = '';
        if(parame){
          para = '&'+parame;
        }
        this.$router.go(`/hq/list?${keys}=${stock}${para}`);
      },
      funcHide(index){
        var vl = this.hideShow['hideshow'+index];
        if(vl == 'fadeIn'){
          this.hideShow['hideshow'+index] = 'fadeOut';
          this.iconButton['xia_button'+index] = 'fadeOut';
        }else {
          this.hideShow['hideshow'+index] = 'fadeIn';
          this.iconButton['xia_button'+index] = 'fadeIn';
        }
      }
    },
    events:{

    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/hq.less";

</style>
