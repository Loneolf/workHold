<template>
  <div class="explain content native-scroll" @click="modalstock">
    <div class="cont-wrap">
      <div class="cont">
        <div class="cont_left list-block ">
          <div class="t1 stockcode" v-on:input="clickInput"  is-stock-input="true" placeholder="请输入股票代码" data-mydy="1" type="text" maxlength="5" value="" @click.stop="keyPanel"><em>请输入股票代码</em></div>
          <!--<div class="t1 stockcode" v-on:input="clickInput"  is-stock-input="true" placeholder="请输入股票代码"  type="text"  maxlength="5"  max="5" onkeyup="this.value=this.value.replace(/\D/g,'')" value="" @click.stop="keyPanel" ><em>请输入股票代码</em></div>-->
          <div class="list-abroad margin-bottom"><!--
          --><!--<p class="abroad-cont"><input type="text" v-model="stockcode" @input="change($event)" placeholder="请输入股票代码" maxlength="5"  onkeyup="this.value=this.value.replace(/\D/g,'')"></p>-->
            <div class="select_drop" v-show="isStockList">
              <ul>
                <li v-for="items in stockList" @click="stockListFunc($index)"><a href="javascript:void(0);"><strong style="font-size:0.75rem">{{items.STOCKCODEINDEX}}</strong>{{items.STOCKNAMEINDEX}}</a></li>
              </ul>
            </div>
          </div>
          <div class="list-abroad margin-bottom select_box2">
            <div class="select_box abroad-cont" @click="isWTACCOUNTFunc">
              <p class="select_active">{{WTACCOUNTNAME | wtaccountname}}</p>
            </div>
            <div v-show="isWTACCOUNT">
              <ul>
                <li v-for="items in wtaccountlist" @click="wtAccountFunc($index)" :class="{active:WTACCOUNTINDEX==$index}"><a href="javascript:void(0);">{{items.wtaccount}}({{items.name}})</a></li>
              </ul>
            </div>
          </div>
          <div class="list-abroad margin-bottom select_box2">
            <div class="select_box abroad-cont" @click="isWTTYPEFunc">
              <p class="select_active">{{WTTYPENAME}}</p>
            </div>
            <div v-show="isWTTYPE">
              <ul>
                <li v-for="item in WTTYPE" @click="wtTypeFunc($index)" :class="{active:WTTYPEINDEX==$index}"><a href="javascript:void(0);">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><select v-model="selected"><option v-for="items in wtaccountlist" value="{{$index}}">{{items.wtaccount}}({{items.wtaccounttype}})</option></select></p></div>-->
          <p class="list-price"><span class="minus" v-on:click="price(VOLUME,'-1')">{{VOLUME}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" placeholder="HK$委托价格" v-model="priceData" @blur="pricebl"></span></span></span><span class="add" v-on:click="price(VOLUME)">{{VOLUME}}</span></p>
          <p class="shouyilv">汇率：{{SELLRATE}}<!-- 添加 不含手续费提示语 -->
            <span class="sxfDiv" v-show="stockSxfyFlag"><em class="sxfText">{{stockSxfy}} 不含手续费</em></span></p>
          <p class="list-price"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="tel" placeholder="{{volumes | getVolumes}}" v-model="volume" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></span></span></span><span class="add" v-on:click="quantities(1)">{{sMoney}}</span></p>
          <p class="list-text">{{FUNDTITLE}}{{USABLE}}</p>
          <div class="btn" v-on:click="lendOut">{{lendname}}</div>
        </div><div class="cont_right">
        <div class="cont_right_lr">
          <p class="five-data" v-on:click="greet('sSellPrice5')"><span></span><span class="{{fiveData.sSellPrice5 | pricecolor}}">{{fiveData.sSellPrice5}}</span><span>{{fiveData.sSellAmount5 | vomUnit}}</span></p>
          <p class="five-data" v-on:click="greet('sSellPrice4')"><span></span><span class="{{fiveData.sSellPrice4 | pricecolor}}">{{fiveData.sSellPrice4}}</span><span>{{fiveData.sSellAmount4 | vomUnit}}</span></p>
          <p class="five-data" v-on:click="greet('sSellPrice3')"><span></span><span class="{{fiveData.sSellPrice3 | pricecolor}}">{{fiveData.sSellPrice3}}</span><span>{{fiveData.sSellAmount3 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sSellPrice2')"><span></span><span class="{{fiveData.sSellPrice2 | pricecolor}}">{{fiveData.sSellPrice2}}</span><span>{{fiveData.sSellAmount2 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sSellPrice1')"><span>卖1</span><span class="{{fiveData.sSellPrice1 | pricecolor}}">{{fiveData.sSellPrice1}}</span><span>{{fiveData.sSellAmount1 | vomUnit}}</span></p>
          <p class="line"></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice1')"><span>买1</span><span class="{{fiveData.sBuyPrice1 | pricecolor}}">{{fiveData.sBuyPrice1}}</span><span>{{fiveData.sBuyAmount1 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice2')"><span></span><span class="{{fiveData.sBuyPrice2 | pricecolor}}">{{fiveData.sBuyPrice2}}</span><span>{{fiveData.sBuyAmount2 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice3')"><span></span><span class="{{fiveData.sBuyPrice3 | pricecolor}}">{{fiveData.sBuyPrice3}}</span><span>{{fiveData.sBuyAmount3 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice4')"><span></span><span class="{{fiveData.sBuyPrice4 | pricecolor}}">{{fiveData.sBuyPrice4}}</span><span>{{fiveData.sBuyAmount4 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice5')"><span></span><span class="{{fiveData.sBuyPrice5 | pricecolor}}">{{fiveData.sBuyPrice5}}</span><span>{{fiveData.sBuyAmount5 | vomUnit}}</span></p>
        </div>
      </div>
      </div>
    </div>
    <!--<div class="swipe my-swipe"> <div class="swipe-items-wrap">
      <div class="swipe-item slide2 active"><K-line></K-line> </div> </div> </div>-->
    <swipe class="my-swipe" :speed="500" :auto="0" :show-indicators="true" :no-drag="true" v-ref:swipe>
      <!--<swipe-item class="slide1"><templates url="ggt/chicang" action="16011" viewname="view16011"></templates></swipe-item>-->
      <swipe-item class="slide1"><templates url="ggt/chicang" :action="action" :viewname="viewname"></templates></swipe-item>
      <swipe-item class="slide2"><stockmin></stockmin></swipe-item>
    </swipe>
    <div class="modal-overlay modal-stock" v-if="showModal" @click="modalstock"></div>
  </div>
</template>
<script>
  import utils from '../../../../../util/util'
  import service_deal_ggt from '../../../service/common/service_deal_ggt'
  import service_config from '../../../service/common/service_config'
  import service_hq_often from '../../../../hq/service/common/service_hq_often'
  import localService from '../../../../../services/localService'
  import stockmin from '../../../ons/stockmin.vue'
  import { Swipe, SwipeItem } from 'vue-swipe';
  import templates from '../../../../common/templates.vue'
  import keyPanel from '../../../../../util/keyPanel/keyPanel';
  import "../../../../../assets/less/KeyPanel.less"

  require('vue-swipe/dist/vue-swipe.css');

  export default{
    data(){
      return {
        fiveData:{//五档数据
          sSellPrice5 :'',
          sSellAmount5:'',
          sSellPrice4 :'',
          sSellAmount4:'',
          sSellPrice3 :'',
          sSellAmount3:'',
          sSellPrice2 :'',
          sSellAmount2:'',
          sSellPrice1 :'--',
          sSellAmount1:'--',
          sBuyPrice1  :'--',
          sBuyAmount1 :'--',
          sBuyPrice2  :'',
          sBuyAmount2 :'',
          sBuyPrice3  :'',
          sBuyAmount3 :'',
          sBuyPrice4  :'',
          sBuyAmount4 :'',
          sBuyPrice5  :'',
          sBuyAmount5 :'',
          sPrec:0
        },
        stockcode:'',
        stockcodes:'', //辅助股票代码信息
        action:'16011',
        viewname:'view16011',
        WTACCOUNTTYPEINDEX:'',
        wtTypes:'', //用于存值使用  市场类型
        WTACCOUNT:'',
        WTTYPE:[],
        WTTYPENAME:'委托方式',
        WTACCOUNTNAME:'选择股东账号',
        WTACCOUNTINDEX:null,
        WTTYPEINDEX:0,
        WTPriceType:0,
        COMMBATCHENTRUSTINFO:'',
        STOCKKIND:'',
        BANKMONEY:'',
        wtaccountlist:[],
        stockList:[],
        LEVELSDATA:{},
        isWTACCOUNT:false,
        isWTTYPE:false,
        isStockList:false,
        showModal:false,
        priceData:'',
        newPrice:'',
        FUNDTITLE:'',
        USABLE:'',
        SELLRATE:'',
        volume:'',
        VOLUME:'0.01',
        volumes:'',
        name:'',
        sMoney:'100',
        msg:'',
        lendname:'立即卖出',
        main:keyPanel.main(),
        //不含手续费提示
        stockSxfyFlag:false, //是否要显示这个提示
        stockSxfy:'', //所需费用 人民币 港股需要换算成人民币
      }
    },
    ready(){

    },
    attached(){
      var type = this.$route.query.type;
      if(type == '6'){ //零股卖出
        this.action="16016";
        this.viewname="view16016";
      }else{
        this.action = '16011';
        this.viewname = 'view16011';
      }
      this.$TZT.action10077(this);
      this.stockcodes = '';
      this.wtTypes = '';
      !!this.main && this.main.inputvalue($(this.$el).find(".t1")[0],''); //清空
      this.clearData();
      $($(this.$el).find(".stockcode em")).text('请输入股票代码');
      localService.readMapMesg(['footerStockcode','footerWtaccountType']).then((local)=>{
          if(!!local.footerStockcode){
            this.stockcodes =(local.footerStockcode.indexOf('H')>=0||local.footerStockcode.indexOf('h')>=0?local.footerStockcode.replace(/[H|h]/g,''):local.footerStockcode);
            this.wtTypes = (!!local.footerWtaccountType?local.footerWtaccountType:'');
            this.main.inputvalue($(this.$el).find(".stockcode")[0],this.stockcodes,true);
            this.change();
            localService.removemapMesg(['footerStockcode','footerWtaccountType']);
          }
      })
    },
    detached(){ //销毁函数
      if(!!this.main) this.main.close();
    },
    methods: {
      keyPanel(){
        var that = this;
        if( this.stockcode.length == 5){
          that.main.inputvalue($(this.$el).find(".t1")[0],this.stockcode,true);
        }
        this.main.init($(this.$el).find(".t1")[0],5,!1,{
          afterCloseFunc:function(sValue){
            if(that.stockcode == sValue && !!that.name){
              this.stockcodes = this.stockcode+'('+this.name+')';
              that.main.inputvalue($(that.$el).find(".t1")[0],that.stockcodes,true);
            }
          }
        });
      },
      dealRefreshTimer(){
        if(this.stockcode.length === 5){
          this.getfiveData();
        }
        if(this.msg === 1){
          this.$emit('handleIt',1);
        }
      },
      clickInput(data){//数字键盘输入
        var val = data.currentTarget.innerText;
        if(val && val.length ==5){
          this.wtTypes = '';
          this.stockcodes = val
          this.change();
        }
      },
      //股票输入触发事件
      change(e){
        this.clearData();
        if(this.stockcodes.length === 5){
          this.main.close();
          this.stockcode = this.stockcodes;
          this.getfiveData();
        }
        if(this.stockcodes && this.stockcodes.length>5){
          this.stockcode = this.stockcodes.slice(0,4);
        }
      },
      //五档数据点击
      greet(e){
        if(this.fiveData[e]){
          this.priceData = this.fiveData[e];
        }
      },
      /**
       * [price 价格加减]
       * @param  {string} e    [区间值]
       * @param  {string} type [减传-1 加传 1或不传]
       * @return {[type]}      [description]
       */
      price(e,type){
        // if(this.WTPriceType != 0) return;
        let nType = (typeof type != 'undefined'&&!isNaN(type)?type:1),
            n = (!!e&&(e+'').indexOf('.')>=0?(e+'').substr((e+'').indexOf('.')+1).length:2); //取步长
        if(!isNaN(e)) e = e*Number(nType);
        if(e<0){
          if(this.priceData>0 && this.priceData - e>0){
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),n);
          }
        }else{
          if(this.priceData == ''){
            this.priceData = e;
          }else{
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),n);
          }
        }
        this.stockSxfyInfo();
      },
      //立即卖出功能
      lendOut(){

        if(this.stockcode == ''){
          $.alert('请输入股票代码');
          return;
        }
        if(this.priceData == ''){
          $.alert('请输入价格');
          return;
        }
        if(this.volume == ''){
          $.alert('请输入买入数量');
          return;
        }
        //退市整理判断
        if(this.COMMBATCHENTRUSTINFO == '-1'){
          $.alert(this.BANKMONEY,function () {
            console.log(1);//TODO
          });
          return;
        }
        if(this.COMMBATCHENTRUSTINFO != '' && this.COMMBATCHENTRUSTINFO == 0){
          var that = this;
          $.confirm(this.BANKMONEY,'风险提示',function () {
            that.sendOut();
          });
          return;
        }
        this.sendOut();
      },
      sendOut(){
        var that = this;
        let index = this.WTACCOUNTINDEX;
        let oSendData = {
          wtaccount:this.wtaccountlist[index]['wtaccount'],
          wtaccounttype:this.wtaccountlist[index]['wtaccounttype'],
          stockcode:this.stockcode,
          volume:this.volume,
          pricelevels:this.WTPriceType,
          Direction:'S',
          COMMBATCHENTRUSTINFO:1,
          price:this.priceData
        };
        if(that.action == '16016') oSendData.entrusttype = 1; //零股申报
        var sPrice = '',
          sTs = '';
        console.log(oSendData);
        var sConfirm = `<p>股东账号:${oSendData.wtaccount}</p><p>委托类型:${this.WTTYPENAME}</p><p>证券代码:${oSendData.stockcode}</p><p>证券名称:${this.name}</p><p>委托价格:${oSendData.price}港元</p><p>委托数量:${oSendData.volume}</p><p>确认卖出该股票?</p>`;
//        $.toast("请求中！！！");
        $.confirm(
          `<div style="text-align: left;">${sConfirm}</div>`,
          '委托卖出',
          function () {
//          $.alert('You clicked Ok button');
            $.showPreloader();
            service_deal_ggt.require5102(oSendData)
              .then((data)=>{
              $.hidePreloader();
            $.alert(data.ERRORMESSAGE);
            if(data.ERRORNO>=0){
              that.stockcodes = '';
              !!that.main && that.main.inputvalue($(that.$el).find(".t1")[0],''); //直接进行赋值
              that.clearData();
            }
          })
          });
      },
      //获取可卖量
      getCustomers(){
        var that      = this;
        if(that.stockcode.length != 5){
          return;
        }
        let index = this.WTACCOUNTINDEX;
        if(that.wtaccountlist.length>0){
          that.WTACCOUNT = that.wtaccountlist[index]['wtaccount'];
        }
        var oSendData = {
          stockcode   :that.stockcode,
          WTACCOUNTTYPE:that.WTACCOUNTTYPEINDEX,
          price       :that.priceData,
          PriceType:that.WTPriceType,
          accountIndex:2,
          Accountlist:1,
          updatesign:1,
          COMMBATCHENTRUSTINFO:1
        };
        $.showPreloader();
        service_deal_ggt.require5101(oSendData).then((data)=>{
          $.hidePreloader();
          console.log(data);
          if(data.ERRORNO<0) $.alert(data.ERRORMESSAGE);
          if(data.GRID0 && data.GRID0.length>1){
            data.GRID0.shift();
            that.LEVELSDATA = {GRID0:data.GRID0,
                                DOWNPRICEINDEX:data.DOWNPRICEINDEX,
                                UPPRICEINDEX:data.UPPRICEINDEX,
                                PRICESTEPINDEX:data.PRICESTEPINDEX};
            that.getVOLUMES();
          }
          if(data.COMMBATCHENTRUSTINFO){
            that.COMMBATCHENTRUSTINFO = data.COMMBATCHENTRUSTINFO;
          }
          if(data.BANKMONEY){
            that.BANKMONEY = data.BANKMONEY;
          }
          if(data.STOCKKIND){
            that.STOCKKIND = data.STOCKKIND;
          }
          that.SELLRATE = data.SELLRATE ? data.SELLRATE : '';
          that.sMoney = data.SELLUNIT ? data.SELLUNIT : '100';
          if(/*typeof data.PRICELEVELS != 'undefined'*/false){ //修改时间：20170914  跟高端版保持一致
            that.WTTYPEINDEX = data.PRICELEVELS;
          }else {
            that.WTTYPEINDEX = 0;
          }

          that.volumes = data.MAXQTY ? data.MAXQTY : '0';
          if(data.FUNDTITLE){
            that.FUNDTITLE = data.FUNDTITLE;
          }else {
            that.FUNDTITLE = '';
          }
          if(data.USABLE){
            that.USABLE = data.USABLE;
          }else {
            that.USABLE = '';
          }
        })
      },
      //获取五档
      getfiveData(){
        var that      = this;
        if(that.stockcode.length != 5) return;
        var oSendData = {
          stockcode    :'H'+that.stockcode,
          NewMarketNo  :0,
          Level        :'2'
        };
        service_hq_often.require43(oSendData).then((data)=>{
            $.hidePreloader();
            if(data.ERRORNO<0){
              that.clearData();
              $.alert("无此证券代码行情");
              return;
            }
            //设置5档行情数据
            that.fiveData.sSellPrice1 = data.WTHead.StockData.p4;
            that.fiveData.sSellAmount1 = data.WTHead.StockData.Q4;
            that.fiveData.sBuyPrice1 = data.WTHead.StockData.p1;
            that.fiveData.sBuyAmount1 = data.WTHead.StockData.Q1;
            that.fiveData.sPrec = data.WTHead.Close_p;
            var newprice = data.WTHead.StockData.p1; //取最新价
            if((!newprice||isNaN(newprice)||Number(newprice)<=0) && (!isNaN(data.WTHead.Last_p)&&Number(data.WTHead.Last_p)>0)){
              newprice = data.WTHead.Last_p;
            }
            if((!newprice||isNaN(newprice)||Number(newprice)<=0) && (!isNaN(data.WTHead.Close_p)&&Number(data.WTHead.Close_p)>0)){
              newprice = data.WTHead.Close_p;
            }
            //设置价格
            if(that.priceData == '' && !!newprice && that.wtaccountlist.length == 0){
              that.priceData = newprice;
              that.price(0);
            }
            that.name = data.WTHead.Name;  //股票名称
            if(that.wtaccountlist.length == 0){
              that.getAccount(data.STOCKPROP); //根据股票属性解读改股票是不是在沪深市场都有
            }
          })
      },
      //设置股东账号
      getAccount(STOCKPROP){
        var that = this;
        var isSZ = (STOCKPROP.substr(8,1) == 1?true:false); //深圳市场
        var isSH = (STOCKPROP.substr(7,1) == 1?true:false); //上海市场
        //直接设置股票代码值
        if(that.stockcodes == that.stockcode && that.name != '' && that.stockcode.length == 5){
          that.stockcodes = that.stockcode+'('+that.name+')';
          that.main.inputvalue($(that.$el).find(".t1")[0],that.stockcodes); //直接进行赋值
        }
        //加载对应行情数据
        that.$refs.swipe.reInitPages();
        that.$refs.swipe.setPage(1);
        that.$broadcast('parent-stockmin',that.stockcode);
        localService.getAccountList('',true).then((data)=>{ //取股东账号
            if(!data) return;
            let wtlist = [],nI = null,nM=0;
            for(let n in data){
              if((!isSH&&!isSZ&&(n=='HKACCOUNT'||n=='HKSZACCOUNT')) || (n == 'HKACCOUNT' && isSH) || (n == 'HKSZACCOUNT' && isSZ)){
                if(!!that.wtTypes && n==that.wtTypes) nI = nM;
                wtlist.push(data[n]);
                nM++;
              }
            }
            //如果两个市场都有，直接展示让用户手动选择两个市场股东卡
            that.$set('wtaccountlist',wtlist);
            if((!!isSH || !!isSZ) && wtlist.length>1 && !that.wtTypes){
              that.isWTACCOUNT = true; //直接显示让用户自行选择股东卡
            }else if(wtlist.length>0){
              that.isWTACCOUNT = false;
              that.WTACCOUNTINDEX = (!!that.wtTypes&&nI?nI:0);
              that.$set('WTACCOUNTNAME',wtlist[that.WTACCOUNTINDEX]['wtaccount']+'('+wtlist[that.WTACCOUNTINDEX]['name']+')');
              that.$set('WTACCOUNTTYPEINDEX',wtlist[that.WTACCOUNTINDEX]['accounttype']);
            }
        });
      },
      //数量的加减
      quantities(e){
        console.log(e);
        if(typeof e !== 'number'){
          return;
        }
        e = e*this.sMoney;
        if(e<0){
          if(this.volume>0 && this.volume - Math.abs(e)>0){
            this.volume = this.volume - Math.abs(e);
          }
        }else{
          if(this.volume == ''){
            this.volume = e;
          }else{
            this.volume = parseFloat(e)+parseFloat(this.volume);
          }
        }
      },
      getVOLUMES(){
        var LEVELSDATA = this.LEVELSDATA;
        var price = this.priceData;
        var that = this;
        if(!price) that.VOLUME = '0.01';
        if(LEVELSDATA.GRID0.length>=1){
          for(var n in LEVELSDATA.GRID0){
            var aItem = LEVELSDATA.GRID0[n].split('|');
            if(parseFloat(price)>=parseFloat(aItem[LEVELSDATA['DOWNPRICEINDEX']]) && parseFloat(price)<parseFloat(aItem[LEVELSDATA['UPPRICEINDEX']])){
              that.VOLUME = aItem[LEVELSDATA['PRICESTEPINDEX']];
              return;
            }
          }
        }
      },
      wtTypeFunc(aIndex){
        this.WTTYPEINDEX = aIndex;
        this.WTPriceType = this.WTTYPE[aIndex]['id'];
        this.WTTYPENAME = this.WTTYPE[aIndex]['name'];
        this.isWTTYPEFunc();
      },
      wtAccountFunc(aIndex){
        this.WTACCOUNTINDEX = aIndex;
        this.WTACCOUNTNAME = this.wtaccountlist[aIndex]['wtaccount']+'('+this.wtaccountlist[aIndex]['name']+')';
        this.WTACCOUNTTYPEINDEX = this.wtaccountlist[aIndex]['accounttype'];
        this.isWTACCOUNTFunc();
      },
      isWTACCOUNTFunc(){
        if(!this.wtaccountlist){
          this.isWTACCOUNT = false;
          return;
        }
        if(this.isWTACCOUNT){
          this.isWTACCOUNT = false;
        }else {
          this.isWTACCOUNT = true;
        }
      },
      isWTTYPEFunc(){
        if(!this.WTTYPE){
          this.isWTTYPE = false;
          return;
        }
        if(this.isWTTYPE){
          this.isWTTYPE = false;
        }else {
          this.isWTTYPE = true;
        }
      },
      stockListFunc(aIndex){
        var listData = this.stockList[aIndex];
        this.WTACCOUNTTYPEINDEX = listData['WTACCOUNTTYPEINDEX'];
        this.name = listData['STOCKNAMEINDEX'];
        this.sMoney = listData['NEWBUYUNITINDEX'];
        this.isStockList = false;
        this.getfiveData();
      },
      clearData(){
        this.priceData = '';
        this.volume = '';
        this.volumes = '';
        this.name = '';
        this.COMMBATCHENTRUSTINFO = '';
        this.STOCKKIND = '';
        this.BANKMONEY = '';
        this.WTACCOUNT = '';
        this.VOLUME = '0.01';
        this.sMoney = '100';
        this.WTACCOUNTTYPEINDEX = '';
        this.WTACCOUNTNAME = '选择股东账号';
        this.WTTYPENAME = '委托方式';
        this.WTTYPEINDEX = 0;
        this.WTACCOUNTINDEX = null;
        this.wtaccountlist = [];
        this.WTTYPE = [];
        this.stockList = [];
        this.LEVELSDATA = {};
        this.FUNDTITLE = '';
        this.USABLE = '';
        this.SELLRATE = '';
        this.WTPriceType = '0';
        for(var n in this.fiveData){
          if(n === 'sPrec'){
            this.fiveData[n] = 0;
          }else {
            this.fiveData[n] = '--';
          }
        }
        this.$emit('handleIt','1');
        this.$refs.swipe.reInitPages();
        this.$refs.swipe.setPage(0);
        this.stockcode='';
      },
      pricebl(){
        if(!this.WTACCOUNTTYPEINDEX || this.WTACCOUNTTYPEINDEX == '' || this.priceData == ''){
          return;
        }
        this.getVOLUMES();
        this.getCustomers();
      },
      modalstock(){
        if(!!this.main){
          this.main.close();
        }
      },
      /**
       * [stockSxfyInfo 股票手续费信息]
       */
      stockSxfyInfo(){
        if(!this.volume || isNaN(this.volume) || !Number(this.volume) || Number(this.volume)<=0) return;
        if(!this.priceData || !Number(this.priceData) || Number(this.priceData)<=0) return;
        if(!this.stockcode || !this.WTACCOUNTTYPEINDEX || !this.SELLRATE || !Number(this.SELLRATE) || Number(this.SELLRATE)<=0) return;
        //解析priceData有几位小数
        var s = this.priceData.replace(/[^\d\.]/g,'')+'',
            ln = s.indexOf('.'),
            sDh = s.substr(ln+1).length;
        try{
          let nsyfy = Number(this.priceData)*Number(this.volume);
          if(this.stockcode.length==5){ //港股5位
            nsyfy = Number(Number(nsyfy*Number(this.SELLRATE)).toFixed(sDh));
            this.stockSxfyFlag = true;
            this.stockSxfy = '￥'+nsyfy;
            if(!!window.stockSxfyTime) window.clearTimeout(window.stockSxfyTime);
            let _self = this;
            window.stockSxfyTime = window.setTimeout(function(){
              window.clearTimeout(window.stockSxfyTime);
              _self.stockSxfyFlag = false;
              _self.stockSxfy = '';
            },900);
          }
        }catch(e){ //错误不做处理
          console.log(e);
        }
      }
    },
    watch: {
      WTACCOUNTINDEX: function(val) {
        if(this.wtaccountlist.length == 0){
          return;
        }
        if(this.WTACCOUNT == this.wtaccountlist[val]['wtaccount']  || !this.priceData || this.priceData == ''){
          return;
        }
        this.WTACCOUNT = this.wtaccountlist[val]['wtaccount'];
        this.WTACCOUNTTYPEINDEX = this.wtaccountlist[val]['wtaccounttype'];
        var config_wtaccout = this.WTACCOUNTTYPEINDEX;
        if(this.action == '16016') {
          config_wtaccout = 'GGTLGMCACCOUNT'; //零股卖出特殊处理
          this.WTTYPEINDEX = 0;
        }
        this.$set('WTTYPE',service_config[config_wtaccout]);
        this.$set('WTTYPENAME',service_config[config_wtaccout][this.WTTYPEINDEX]['name']);
        this.$set('WTPriceType',service_config[config_wtaccout][this.WTTYPEINDEX]['id']);
        this.getCustomers();
      },
      WTTYPEINDEX: function(val) {
        var config_wtaccout = this.WTACCOUNTTYPEINDEX;
        if(this.action == '16016') {
          config_wtaccout = 'GGTLGMCACCOUNT'; //零股卖出特殊处理
          val = 0;
        }
        if(config_wtaccout == ''){
          return;
        }
        this.$set('WTTYPE',service_config[config_wtaccout]);
        this.$set('WTTYPENAME',service_config[config_wtaccout][val]['name']);
        this.$set('WTPriceType',service_config[config_wtaccout][val]['id']);
      },
      priceData(val,oldval){
        if(!val || val == oldval || !this.WTACCOUNTTYPEINDEX) return;
        var v = ''+val.replace(/[^\d\.]/g,'');
        var ln = v.indexOf('.');
        var newdata = v;
        if(ln>0){
          var s = v.substr(0,ln+1);
          var e = v.substr(ln+1);
          var r = e.replace(/\./g,'');
          newdata = s+''+r.substr(0,3);
        }else if(ln == 0){
          newdata = '0.';
        }else {
          if(newdata.length>1){
            newdata = newdata.replace(/^0/g,'');
          }
        }
        var self = this;
        this.$nextTick(function () { self.priceData = newdata; })
        this.getVOLUMES();
        // this.getCustomers();
      },
      name(val){
        if(val && val != ''){
          if(this.stockcode == ''){
            this.stockcodes = '';
          }else {
            this.stockcodes = this.stockcode+'('+val+')';
          }
        }
      },
      volume(val){ //监听输入
        if(!val || !Number(val) || Number(val)<=0) return;
        this.stockSxfyInfo();
      }
    },
    filters: {
      //价格颜色过滤器
      pricecolor(val){
        if(!val){
          return '';
        }
        var newNumber = parseFloat(val);
        var newprec   = parseFloat(this.fiveData.sPrec);
        if(isNaN(newNumber)){
          return '';
        }
        if(!newprec || isNaN(newprec)){
          newprec = 0;
        }
        if(newNumber > newprec){
          return 'rise';
        }
        if(newNumber < newprec){
          return 'fill';
        }
      },
      vomUnit(val){
        return utils.fmtunit(val,2,'',true);
      },
      getVolumes(val){
        var price = val*1;
        if(typeof price == 'number' && val != ''){
          return '可卖:'+utils.fmtunit(val,2);
        }else {
          return '委托数量'
        }
      },
      wtaccountname(val){
        if(!val || val == ''){
          return '选择股东账号';
        }
        return val;
//        if(val == '选择股东账号'){
//          return val;
//        }else {
//          return val+'(股东账号)'
//        }
      }
    },
    events:{
      handleIt(msg){
        this.msg = msg;
        console.log(msg);
        if(msg == 1){
          this.$broadcast('parent-stockmin',this.stockcode);
        }
      },
      updateStock(code,wtTypes){
        this.stockcodes = code;
        !!wtTypes?(this.wtTypes=wtTypes):'';
        this.change();
      }
    },
    components:{
      Swipe,
      SwipeItem,
      stockmin,
      templates
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../../assets/less/variables.less';
  @import "../../../../../assets/less/mixins.less";
  @import "../../../../../assets/less/stockbuy.less";
  .cont .list-price .minus, .cont .list-price .add,.cont .cont_left .btn{
    background-color: @color-primary;
  }
</style>

