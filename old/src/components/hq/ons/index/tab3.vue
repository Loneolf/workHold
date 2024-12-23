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
    <div class="top_box1">
      <div class="title">
        <h5 @click="funcHide(1)">创新层</h5>
        <em class="xia_button {{iconButton.xia_button1}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('创新层','stock','title=创新层')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow1}}" id="lzgList">
        <dl class="part" v-for="items in innovateModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(2)">基础层</h5>
        <em class="xia_button {{iconButton.xia_button2}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('基础层','stock','title=基础层')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow2}}" id="lzgList">
        <dl class="part" v-for="items in BasicsModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(3)">优先股</h5>
        <em class="xia_button {{iconButton.xia_button3}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('优先股','stock','title=优先股')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow3}}" id="lzgList">
        <dl class="part" v-for="items in preferredModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <!-- <div class="title">
        <h5 @click="funcHide(3)">协议转让</h5>
        <em class="xia_button {{iconButton.xia_button3}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_转让类型_协议','stock','title=协议转让')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow3}}" id="lzgList">
        <dl class="part" v-for="items in agreementModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div> -->

      <div class="title">
        <h5 @click="funcHide(4)">做市转让</h5>
        <em class="xia_button {{iconButton.xia_button4}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_转让类型_做市','stock','title=做市转让')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow4}}" id="lzgList">
        <dl class="part" v-for="items in marketModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(5)">集合竞价转让</h5>
        <em class="xia_button {{iconButton.xia_button5}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_转让类型_集合竞价','stock','title=集合竞价转让')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow5}}" id="lzgList">
        <dl class="part" v-for="items in biddingModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(6)">两网及退市公司(A股)</h5>
        <em class="xia_button {{iconButton.xia_button6}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_证券级别_两网(A股)','stock','title=两网及退市公司(A股)')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow6}}" id="lzgList">
        <dl class="part" v-for="items in networkAModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(7)">两网及退市公司(B股)</h5>
        <em class="xia_button {{iconButton.xia_button7}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_证券级别_两网(B股)','stock','title=两网及退市公司(B股)')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow7}}" id="lzgList">
        <dl class="part" v-for="items in networkBModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(8)">首次挂牌</h5>
        <em class="xia_button {{iconButton.xia_button8}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_转让状态_首日挂牌','stock','title=首次挂牌')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow8}}" id="lzgList">
        <dl class="part" v-for="items in firstListingModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(9)">增发</h5>
        <em class="xia_button {{iconButton.xia_button9}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_转让状态_新增股票挂牌转让','stock','title=增发')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow9}}" id="lzgList">
        <dl class="part" v-for="items in SEOModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title" v-show="Agreement">
        <h5 @click="funcHide(10)">协议转让</h5>
        <em class="xia_button {{iconButton.xia_button10}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('新三板_转让类型_协议','stock','title=协议转让')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow3}}" id="lzgList" v-show="Agreement">
        <dl class="part" v-for="items in agreementModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em></small></dt>
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
          {STOCKNAMEINDEX:'三板成指',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'},
          {STOCKNAMEINDEX:'三板做市',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'},
          {STOCKNAMEINDEX:'创业板指',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',UPDOWNINDEX:'--'}
        ],
        innovateModule:[
          {STOCKNAMEINDEX:'--',NEWPRICEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        BasicsModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        preferredModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        agreementModule:[ //协议转让取消掉
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        marketModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        biddingModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        networkAModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        networkBModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        firstListingModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        SEOModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        Agreement:false
      }
    },
    ready(){
      this.getIndexData();
      this.getInnovateData();
      this.getBasicsData();
      this.getPreferredData();
      this.getAgreementData();
      this.getMarketData();
      this.getBiddingData();
      this.getNetworkAData();
      this.getNetworkBData();
      this.getFirstListingData();
      this.getSEOData();
    },
    attached(){
      this.$TZT.action10077(this);
    },
    methods: {
      dealRefreshTimer(){
        this.getIndexData();
        this.getInnovateData();
        this.getBasicsData();
        this.getPreferredData();
        this.getAgreementData(); //协议转让
        this.getMarketData();
        this.getBiddingData();
        this.getNetworkAData();
        this.getNetworkBData();
        this.getFirstListingData();
        this.getSEOData();
      },
      //股转指数
      getIndexData(){
        var that = this;
        let oSendData = {
          AccountIndex:9,
          DeviceType:0,
          Direction:1,
          Grid:"899001,899002,399006",
          Lead:1,
          MaxCount:6,
          NewMarketNo:0,
          StartPos:0,
          StockIndex:1,
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require60(oSendData)
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
      //创新层
      getInnovateData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'创新层',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('innovateModule',indexData);
          })
      },
      //基础层
      getBasicsData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'基础层',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('BasicsModule',indexData);
          })
      },
      //优先股
      getPreferredData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'优先股',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('preferredModule',indexData);
          })
      },
      //转让类型_协议
      getAgreementData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_转让类型_协议',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
            if(!data.GRID0){
              that.Agreement=false;
              return;
            }else{
              that.Agreement=true;
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('agreementModule',indexData);
          })
      },
      //转让类型_做市
      getMarketData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_转让类型_做市',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('marketModule',indexData);
          })
      },
      //转让类型_集合竞价
      getBiddingData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_转让类型_集合竞价',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('biddingModule',indexData);
          })
      },
      //两网(A股)
      getNetworkAData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_证券级别_两网(A股)',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('networkAModule',indexData);
          })
      },
      //两网(B股)
      getNetworkBData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_证券级别_两网(B股)',
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('networkBModule',indexData);
          })
      },
      //首次挂牌
      getFirstListingData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_转让状态_首日挂牌',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData).then((data)=> {
            console.log(data);
            if(!data.GRID0) return;
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('firstListingModule',indexData);
          })
      },
      //增发
      getSEOData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'新三板_转让状态_新增股票挂牌转让',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData).then((data)=> {
            console.log(data);
            if(!data.GRID0) return;
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
                  SBGP:false,
                  SBLW:false,
                  SBXQ:false,
                  SBXZ:false
                };
                if(STOCKPROP[index-1]){
                  listObj['SBGP'] = (STOCKPROP[index-1][9] == 'T'?true:false);
                  listObj['SBLW'] = (STOCKPROP[index-1][9] == 'B'?true:false);
                  listObj['SBXQ'] = (STOCKPROP[index-1][9] == 'O'?true:false);
                  listObj['SBXZ'] = (STOCKPROP[index-1][9] == 'P'?true:false);
                }
                indexData.push(listObj);
              }
            });
            that.$set('SEOModule',indexData);
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
