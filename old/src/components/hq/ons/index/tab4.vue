<template>
  <div class="hq_main">
   <!-- <div class="ui layout hq_box">
      <div class="row-1" v-for="items in indexModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
        <div class="inner {{items.UPDOWNPINDEX | isUP}}">
          <h5>{{items.STOCKNAMEINDEX}}</h5>
          <strong><em class="triangle"></em>{{items.NEWPRICEINDEX}}</strong>
          <p><span class="lt">{{items.UPDOWNINDEX}}</span><span class="rt">{{items.UPDOWNPINDEX}}</span></p>
        </div>
      </div>
    </div>-->
    <div class="top_box1">
      <div class="title">
        <h5 @click="funcHide(1)">沪港通</h5>
        <em class="xia_button {{iconButton.xia_button1}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('沪港通','stock','title=沪港通')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow1}}" id="lzgList">
        <dl class="part" v-for="items in shHKModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(2)">深港通</h5>
        <em class="xia_button {{iconButton.xia_button2}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('深港通','stock','title=深港通')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow2}}" id="lzgList">
        <dl class="part" v-for="items in szHKModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(3)">国企股</h5>
        <em class="xia_button {{iconButton.xia_button3}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('国企股','stock','title=国企股')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow3}}" id="lzgList">
        <dl class="part" v-for="items in stateModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(4)">红筹股</h5>
        <em class="xia_button {{iconButton.xia_button4}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('红筹股','stock','title=红筹股')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow4}}" id="lzgList">
        <dl class="part" v-for="items in redChipModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(5)">蓝筹股</h5>
        <em class="xia_button {{iconButton.xia_button5}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('蓝筹股','stock','title=蓝筹股')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow5}}" id="lzgList">
        <dl class="part" v-for="items in blueChipModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(6)">AH股</h5>
        <em class="xia_button {{iconButton.xia_button6}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('AH股','stock','title=AH股')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow6}}" id="lzgList">
        <dl class="part" v-for="items in AHModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(7)">香港主板</h5>
        <em class="xia_button {{iconButton.xia_button7}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('2104','stock','title=香港主板')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow7}}" id="lzgList">
        <dl class="part" v-for="items in HKMainModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(8)">创业板</h5>
        <em class="xia_button {{iconButton.xia_button8}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('210A','stock','title=创业板')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow8}}" id="lzgList">
        <dl class="part" v-for="items in businessModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(9)">恒指成份</h5>
        <em class="xia_button {{iconButton.xia_button9}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('恒指成份','stock','title=恒指成份')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow9}}" id="lzgList">
        <dl class="part" v-for="items in componentModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
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
          xia_button6:'fadeIn',
          xia_button7:'fadeIn',
          xia_button8:'fadeIn',
          xia_button9:'fadeIn'
        },
        hideShow:{
          hideshow1:'fadeIn',
          hideshow2:'fadeIn',
          hideshow3:'fadeIn',
          hideshow4:'fadeIn',
          hideshow5:'fadeIn',
          hideshow6:'fadeIn',
          hideshow7:'fadeIn',
          hideshow8:'fadeIn',
          hideshow9:'fadeIn'
        },
        indexModule:[
          {STOCKNAMEINDEX:'恒生指数',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'},
          {STOCKNAMEINDEX:'恒指红筹指数',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'},
          {STOCKNAMEINDEX:'恒生国企指数',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'}
        ],
        shHKModule:[
          {STOCKNAMEINDEX:'--',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        szHKModule:[
          {STOCKNAMEINDEX:'--',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        stateModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        redChipModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        blueChipModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        AHModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        HKMainModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        businessModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        componentModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ]
      }
    },
    ready(){
      this.getIndexData();
      this.getshHKData();
      this.getszHKData();
      this.getstateData();
      this.getredChipData();
      this.getblueChipData();
      this.getAHData();
      this.getHKMainData();
      this.getbusinessData();
      this.getcomponentData();
    },
    attached(){
      this.$TZT.action10077(this);
    },
    methods: {
      dealRefreshTimer(){
        this.getIndexData();
        this.getshHKData();
        this.getszHKData();
        this.getstateData();
        this.getredChipData();
        this.getblueChipData();
        this.getAHData();
        this.getHKMainData();
        this.getbusinessData();
        this.getcomponentData();
      },
      getIndexData(){
        var that = this;
        let oSendData = {
          AccountIndex:9,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:3,
          NewMarketNo:0,
          StartPos:0,
          StockCode:'港股首页抬头',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=>{
            console.log(data);
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
                  UPDOWNINDEX:listData[data.UPDOWNINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1]
                };
                indexData.push(listObj);
              }
            });
            that.$set('indexModule',indexData);
          })
      },
      getshHKData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'沪港通',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('shHKModule',indexData);
          })
      },
      getszHKData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'深港通',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('szHKModule',indexData);
          })
      },
      getstateData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'国企股',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('stateModule',indexData);
          })
      },
      getredChipData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'红筹股',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('redChipModule',indexData);
          })
      },
      getblueChipData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'蓝筹股',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('blueChipModule',indexData);
          })
      },
      getAHData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          StockIndex:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'AH股',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20194(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('AHModule',indexData);
          })
      },
      getHKMainData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'2104',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20191(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('HKMainModule',indexData);
          })
      },
      getbusinessData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'210A',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20191(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('businessModule',indexData);
          })
      },
      getcomponentData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'恒指成份',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
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
                  ISH:false,
                  ISZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['ISH'] = (STOCKPROP[index-1][7] == 1?true:false);
                  listObj['ISZ'] = (STOCKPROP[index-1][8] == 1?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('componentModule',indexData);
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
