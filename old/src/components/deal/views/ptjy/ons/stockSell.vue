<template>
  <div class="explain content native-scroll"  @click="modalstock">
    <div class="cont-wrap">
      <div class="cont">
        <div class="cont_left list-block ">
          <div class="t1" v-on:input="clickInput"  is-stock-input="true" placeholder="请输入证券代码" data-mydy="1" type="text" maxlength="6" value="" @click.stop="keyPanel"><em>请输入证券代码</em></div>
          <!--<div class="t1" v-on:input="clickInput" is-stock-input="true" placeholder="请输入证券代码"  type="text"  maxlength="6"  max="6" onkeyup="this.value=this.value.replace(/\D/g,'')" value="" @click.stop="keyPanel" ><em>请输入证券代码</em></div>-->
          <div class="list-abroad margin-bottom"><!--
          --><!--<p class="abroad-cont"><input v-on:blur="blur()" v-on:focus="focus()" type="text" v-model="stockcodes" @input="change($event)" placeholder="请输入证券代码" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')"></p>-->
            <div class="select_drop" v-show="isStockList">
              <ul>
                <li v-for="items in stockList" @click="stockListFunc($index)"><a href="javascript:void(0);"><strong style="font-size:0.75rem">{{items.STOCKCODEINDEX}}</strong>{{items.STOCKNAMEINDEX}}</a></li>
              </ul>
            </div>
          </div>
          <div class="list-abroad margin-bottom select_box2">
            <div class="select_box abroad-cont" @click.stop="isWTACCOUNTFunc">
              <p class="select_active">{{WTACCOUNTNAME | wtaccountname}}</p>
            </div>
            <div v-show="isWTACCOUNT">
              <ul>
                <li v-for="items in wtaccountlist" @click="wtAccountFunc($index)" :class="{active:WTACCOUNTINDEX==$index}"><a href="javascript:void(0);">{{items.wtaccount}}({{items.name}})</a></li>
              </ul>
            </div>
          </div>
          <div class="list-abroad margin-bottom select_box2">
            <div class="select_box abroad-cont" @click.stop="isWTTYPEFunc">
              <p class="select_active">{{WTTYPENAME}}</p>
            </div>
            <div v-show="isWTTYPE">
              <ul>
                <li v-for="item in WTTYPE" @click="wtTypeFunc($index)" :class="{active:WTTYPEINDEX==$index}"><a href="javascript:void(0);">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><select v-model="selected"><option v-for="items in wtaccountlist" value="{{$index}}">{{items.wtaccount}}({{items.wtaccounttype}})</option></select></p></div>-->
          <p class="list-price"><span class="minus" v-on:click="price(VOLUME1,'-1')">{{VOLUME1}}</span><span class="input"><span class="input-border"><span class="zhezhao" v-show="isSJWT">市价委托</span><span class="input-border-cont"><span class="biaoshi-j">HK$</span><input class="wtInput-j" type="number" placeholder="委托价格" v-model="priceData" v-on:focus="focus()" v-on:blur="blur(1)"></span></span></span><span class="add" v-on:click="price(VOLUME)">{{VOLUME}}</span></p>
          <p class="shouyilv">
            <!--<span class="left">涨停：<span class="rise" @click.stop="upDownEvent(upPrice)">{{upPrice}}</span></span><span class="right">跌停：<span class="fill" @click.stop="upDownEvent(downPrice)">{{downPrice}}</span></span>-->
            <!-- 添加 不含手续费提示语 -->
            <span class="sxfDiv" v-show="stockSxfyFlag"><em class="sxfText">{{stockSxfy}} 不含手续费</em></span>
          </p>
          <!--<p class="list-price"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" placeholder="{{volumes | getVolumes}}" v-model="volume"></span></span></span><span class="add" v-on:click="quantities(1)">{{sMoney}}</span></p>-->
          <p class="list-price"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><div class="t2" v-on:input="numInput"  placeholder="{{volumes | getVolumes}}"  type="number"   value="" @click.stop="keyPanel2" ><em>委托数量</em></div><span class="add" style="background-color: #498eff" v-on:click="quantities(1)">{{sMoney}}</span></p>
          <p class="list-text list-ccount"><span>{{FUNDTITLE}}{{USABLE}}</span><span>{{FUNDDAYSTITLE}}{{FUNDUSEDDAYS}}</span></p>
          <div class="btn" v-on:click="lendOut">立即卖出</div>
        </div><div class="cont_right">
        <div class="cont_right_lr">
          <p class="five-data" v-on:click="greet('sSellPrice5')"><span>卖5</span><span class="{{fiveData.sSellPrice5 | pricecolor}}">{{fiveData.sSellPrice5}}</span><span>{{fiveData.sSellAmount5 | vomUnit}}</span></p>
          <p class="five-data" v-on:click="greet('sSellPrice4')"><span>卖4</span><span class="{{fiveData.sSellPrice4 | pricecolor}}">{{fiveData.sSellPrice4}}</span><span>{{fiveData.sSellAmount4 | vomUnit}}</span></p>
          <p class="five-data" v-on:click="greet('sSellPrice3')"><span>卖3</span><span class="{{fiveData.sSellPrice3 | pricecolor}}">{{fiveData.sSellPrice3}}</span><span>{{fiveData.sSellAmount3 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sSellPrice2')"><span>卖2</span><span class="{{fiveData.sSellPrice2 | pricecolor}}">{{fiveData.sSellPrice2}}</span><span>{{fiveData.sSellAmount2 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sSellPrice1')"><span>卖1</span><span class="{{fiveData.sSellPrice1 | pricecolor}}">{{fiveData.sSellPrice1}}</span><span>{{fiveData.sSellAmount1 | vomUnit}}</span></p>
          <p class="line"></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice1')"><span>买1</span><span class="{{fiveData.sBuyPrice1 | pricecolor}}">{{fiveData.sBuyPrice1}}</span><span>{{fiveData.sBuyAmount1 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice2')"><span>买2</span><span class="{{fiveData.sBuyPrice2 | pricecolor}}">{{fiveData.sBuyPrice2}}</span><span>{{fiveData.sBuyAmount2 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice3')"><span>买3</span><span class="{{fiveData.sBuyPrice3 | pricecolor}}">{{fiveData.sBuyPrice3}}</span><span>{{fiveData.sBuyAmount3 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice4')"><span>买4</span><span class="{{fiveData.sBuyPrice4 | pricecolor}}">{{fiveData.sBuyPrice4}}</span><span>{{fiveData.sBuyAmount4 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice5')"><span>买5</span><span class="{{fiveData.sBuyPrice5 | pricecolor}}">{{fiveData.sBuyPrice5}}</span><span>{{fiveData.sBuyAmount5 | vomUnit}}</span></p>
        </div>
      </div>
      </div>
    </div>
    <!--<div class="swipe my-swipe"> <div class="swipe-items-wrap">
      <div class="swipe-item slide2 active"><K-line></K-line> </div> </div> </div>-->
    <swipe class="my-swipe" :speed="500" :auto="0" :show-indicators="true" :no-drag="true" v-ref:swipe>
      <swipe-item class="slide1"><templates url="ptjy/chicang" action="123111" viewname="view_sell" v-ref:templates></templates></swipe-item>
      <swipe-item class="slide2"><stockmin></stockmin></swipe-item>
    </swipe>
  </div>
</template>
<script>
  import utils from '../../../../../util/util'
  import service_deal_often from '../../../service/common/service_deal_often'
  import service_config from '../../../service/common/service_config'
  import service_hq_often from '../../../../hq/service/common/service_hq_often'
  import stockmin from '../../../ons/stockmin.vue'
  import { Swipe, SwipeItem } from 'vue-swipe';
  import templates from '../../../../common/templates.vue'
  import localService from '../../../../../services/localService'
  import keyPanel from '../../../../../util/keyPanel/keyPanel';
  import "../../../../../assets/less/KeyPanel.less"
  import {jiaChaConfig,meiShouGuShu} from '../../../../../config.js';
  require('vue-swipe/dist/vue-swipe.css');

  export default{
    data(){
      return {
        fiveData:{//五档数据
          sSellPrice5 :'--',
          sSellAmount5:'--',
          sSellPrice4 :'--',
          sSellAmount4:'--',
          sSellPrice3 :'--',
          sSellAmount3:'--',
          sSellPrice2 :'--',
          sSellAmount2:'--',
          sSellPrice1 :'--',
          sSellAmount1:'--',
          sBuyPrice1  :'--',
          sBuyAmount1 :'--',
          sBuyPrice2  :'--',
          sBuyAmount2 :'--',
          sBuyPrice3  :'--',
          sBuyAmount3 :'--',
          sBuyPrice4  :'--',
          sBuyAmount4 :'--',
          sBuyPrice5  :'--',
          sBuyAmount5 :'--',
          sPrec:0
        },
        stockcode:'',
        stockcodes:'',
        WTACCOUNTTYPEINDEX:'',
        WTACCOUNT:'',
        WTTYPE:[],
        WTTYPENAME:'委托方式',
        WTACCOUNTNAME:'选择股东账号',
        WTACCOUNTINDEX:0,
        WTTYPEINDEX:0,
        WTPriceType:0,
        COMMBATCHENTRUSTINFO:'',
        STOCKKIND:'',
        BANKMONEY:'',
        wtaccountlist:[],
        stockList:[],
        isWTACCOUNT:false,
        isWTTYPE:false,
        isSJWT:false,
        isStockList:false,
        priceData:'',
        newPrice:'',
        FUNDTITLE:'',
        USABLE:'',
        FUNDDAYSTITLE:'',
        FUNDUSEDDAYS:'',
        STOCKTYPE:'',
        downPrice:'',
        upPrice:'',
        volume:'',
        VOLUME1:'0.001',
        VOLUME:'0.001',
        volumes:'',
        name:'',
        sMoney:'100',
        msg:'',
        priceunit:2,
        main:keyPanel.main(),
        //不含手续费提示
        stockSxfyFlag:false, //是否要显示这个提示
        stockSxfy:'', //所需费用 人民币 港股需要换算成人民币
      }
    },
    ready(){
        var inputParent = $('.wtInput-j').parents('.list-price');
      $('.t2').width(inputParent.width()-inputParent.find('.add').width()*2)
        console.log(inputParent.width()-inputParent.find('.add').width()*2,$('.t2').width());
    },
    attached(){
      this.stockcodes = '';
      !!this.main && this.main.inputvalue($(this.$el).find(".t1")[0],''); //清空
      this.clearData();
      this.$TZT.action10077(this);
      localService.readMapMesg('footerStockcode')
      .then((local)=>{
          local.footerStockcode = this.$route.query.hstockcode;
         if(!!local.footerStockcode){
          this.stockcodes =local.footerStockcode;
          this.change();
          localService.removemapMesg(['footerStockcode']);
         }
      })
    },
    detached(){ //销毁函数
      if(!!this.main) this.main.close();
    },
    methods: {
        updateStockcode(code) {
            this.stockcodes = code;
            this.change();
        },
      keyPanel(){
        var that = this;
        if(this.stockcodes.length>6 && this.stockcode.length == 6){
//          this.clearData();
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
      keyPanel2(){
        this.main.init($(this.$el).find(".t2")[0],5,!1,this.Func);
      },
      dealRefreshTimer(){
        if(this.stockcode.length === 6){
          this.getfiveData();
        }
        if(this.msg == 1){
          this.$emit('handleIt',1);
        }
      },
      blur(val){
        if(val ==1 ){
            this.price(0);
          return;
        }
        if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
          this.stockcodes = this.stockcode+'('+this.name+')';
          this.main.inputvalue($(this.$el).find(".t1")[0],this.stockcodes);
        }
      },
      focus(){
        this.main.close();
//        if(this.stockcodes.length>6 && this.stockcode.length == 6){
//          var stock = this.stockcodes;
//          this.stockcodes = stock.replace(/\(.*\)/g,'');
//        }
      },
      clickInput(data){
        var val = data.currentTarget.innerText;
        if(!val || val && val.length < 6) {
            this.clearData1()
        }
        if(val && val.length ==6){
          this.stockcodes = val
          this.change();
          this.blur();
        }
      },
      huoQujiaCha(){
            var that = this;
            for(var i = 0;i<jiaChaConfig.length;i++) {
                var t = jiaChaConfig[i];
                if (+that.priceData >= +t.BEGIN_PRICE && +that.priceData < +t.END_PRICE) {
                    that.VOLUME1 = that.VOLUME = t.STEP_PRICE;
                    if (+that.priceData == +t.BEGIN_PRICE&&jiaChaConfig[i-1]) {
                        that.VOLUME1 = jiaChaConfig[i-1].STEP_PRICE
                    }
                    break;
                }
            }
      },
      //股票输入触发事件
      change(e){
          this.clearData();
        if(this.stockcodes.length === 6){
//          e && e.target && e.target.blur();
          this.stockcode = this.stockcodes;
          this.main.close();
          this.getWtaccount();
        }
        if(this.stockcodes.length>6){
          this.stockcodes = this.stockcodes.slice(0,5);
        }
      },
      getWtaccount(){
        var that      = this;
        if(that.stockcode.length != 6){
          return;
        }
        var obj = {
          stockcode:that.stockcode
        };
        service_deal_often.require5061(obj)
          .then((data)=>{
            if(data.GRID0 && data.GRID0.length>1){
              var GRID = data.GRID0;
              GRID.shift();
              if(GRID.length>1){
                var aStockList = [];
                var WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX;
                var STOCKNAMEINDEX = data.STOCKNAMEINDEX;
                var NEWBUYUNITINDEX = data.NEWBUYUNITINDEX;
                var STOCKCODEINDEX = data.STOCKCODEINDEX;
                for(var i=0;i<GRID.length;i++){
                  var list = GRID[i].split('|');
                  var obj = {
                    WTACCOUNTTYPEINDEX:list[WTACCOUNTTYPEINDEX],
                    STOCKNAMEINDEX:list[STOCKNAMEINDEX],
                    NEWBUYUNITINDEX:list[NEWBUYUNITINDEX],
                    STOCKCODEINDEX:list[STOCKCODEINDEX]
                  };
                  aStockList.push(obj);
                }
                that.$set('stockList',aStockList);
                that.isStockList = true;
              }else {
                var listData = GRID[0].split('|');
                that.WTACCOUNTTYPEINDEX = listData[data.WTACCOUNTTYPEINDEX];
                that.name = listData[data.STOCKNAMEINDEX];
                that.sMoney = listData[data.NEWSELLUNITINDEX || data.NEWBUYUNITINDEX] || '100';
                that.getfiveData();
                if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
                  this.stockcodes = this.stockcode+'('+this.name+')';
                  this.main.inputvalue($(this.$el).find(".t1")[0],this.stockcodes);
                }
                //取价差  原来从行情运算10次幂有误
                if(!!listData[data['PRICESTEPINDEX']] && !isNaN(listData[data['PRICESTEPINDEX']])){
                  this.VOLUME = listData[data['PRICESTEPINDEX']];
                }else{
                  this.VOLUME = '0.05';
                }
                  // this.$refs.swipe.reInitPages();
                // this.$refs.swipe.setPage(1);
                this.$broadcast('parent-stockmin',this.stockcode);
                if (meiShouGuShu[that.stockcode]) {
                    that.sMoney = meiShouGuShu[that.stockcode] || '100';
                }
              }

            }else {
              var message = data.ERRORMESSAGE || '无此证券代码行情';
              $.alert(message);
            }
          });
      },
      /**
       * [upDownEvent 涨跌价格点击事件]
       * @param  {string} price 价格
       */
      upDownEvent(price){
        if(isNaN(price)) return;
        this.priceData = price;
        this.getCustomers();
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
        if(this.WTPriceType != 0) return;
        let nType = (typeof type != 'undefined'&&!isNaN(type)?type:1),
            n = (!!e&&(e+'').indexOf('.')>=0?(e+'').substr((e+'').indexOf('.')+1).length:this.priceunit); //取步长
        if(!isNaN(e)) e = e*Number(nType);
        if(e<0){
          if(this.priceData>0 && this.priceData - e>0){
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),n);
          }
        }else if(e>0){
            if(this.priceData == ''){
            this.priceData = e;
          }else{
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),n);
          }
        }
        if(this.WTACCOUNTTYPEINDEX == '' || this.priceData == ''){
          return;
        }
        this.stockSxfyInfo();
        this.getCustomers();
          // this.huoQujiaCha();
      },
      //立即卖出功能
      lendOut(){
        this.main.close();
        if(this.stockcode == ''){
          $.alert('请输入证券代码');
          return;
        }
        if(this.wtaccountlist == ''){
          $.alert('无股东账号');
          return;
        }
        if(this.priceData == ''){
          $.alert('请输入价格');
          return;
        }
        if(this.volume == ''){
          $.alert('请输入卖出数量');
          return;
        }
        if(isNaN(this.volume)){
          $.alert('卖出数量请输入数字');
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
          priceType:this.WTPriceType,
          Direction:'S',
          channels:''
        };
        localService.readMapMesg('channels')
                .then((local)=>{
          if(!!local.channels){
          oSendData.channels=local.channels;
        }
      })
        var sPrice = '',
          sTs = '',
          sZq = '';
        if (this.STOCKTYPE == 1) {
          sZq = `<p>实际占款天数：${this.FUNDUSEDDAYS}</p>`;
        }
        if(this.WTPriceType == 0){
          oSendData.price = this.priceData;
          if(parseFloat(oSendData.price)>parseFloat(this.upPrice)){
            sTs = '<p class="rise">委托价格超过涨停价，交易可能不会成功。</p>';
          }
          if(parseFloat(oSendData.price)<parseFloat(this.downPrice)){
            sTs = '<p class="rise">委托价格低于跌停价，交易可能不会成功。</p>';
          }
          sPrice = `<p>委托价格:${oSendData.price}</p>`;
        }else {
          oSendData.price = 1;
          sPrice = '<p>委托方式:市价委托</p>';
        }
        console.log(oSendData);
        var sConfirm = `<p>股东账号:${oSendData.wtaccount}</p><p>证券代码:${oSendData.stockcode}</p><p>证券名称:${this.name}</p>${sPrice}<p>委托数量:${oSendData.volume}</p>${sZq}${sTs}<p>确认卖出该证券?</p>`;
//        $.toast("请求中！！！");
        $.confirm(
          `<div style="text-align: left;">${sConfirm}</div>`,
          '确认卖出',
          function () {
//          $.alert('You clicked Ok button');
            $.showPreloader();
            service_deal_often.require110(oSendData)
              .then((data)=>{
                $.alert(data.ERRORMESSAGE);
                $.hidePreloader();
                if(data.ERRORNO>=0){
                  that.stockcodes = '';
                  !!that.main && that.main.inputvalue($(that.$el).find(".t1")[0],''); //直接进行赋值
                  that.clearData();
                  that.$refs.templates.init();
                }
                console.log(data);
              })
          });
      },
      //获取可卖量
      getCustomers(){
        var that      = this;
        if(that.stockcode.length != 6){
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
          direction:'S',
          accountIndex:2,
          Accountlist:1,
          updatesign:1,
          COMMBATCHENTRUSTINFO:1
        };
        $.showPreloader();
        console.log(oSendData);
        service_deal_often.require151(oSendData)
          .then((data)=>{
            $.hidePreloader();
            console.log(data);
            if(data.COMMBATCHENTRUSTINFO){
              that.COMMBATCHENTRUSTINFO = data.COMMBATCHENTRUSTINFO;
            }
            if(data.BANKMONEY){
              that.BANKMONEY = data.BANKMONEY;
            }
            if(data.STOCKKIND){
              that.STOCKKIND = data.STOCKKIND;
            }
//            data && data.fiveData && that.$set('fiveData', data.fiveData);
            that.WTACCOUNTINDEX = 0;
            if(data && data.wtaccountlist){
              that.$set('wtaccountlist',data.wtaccountlist);
              that.$set('WTACCOUNTNAME',data.wtaccountlist[that['WTACCOUNTINDEX']]['wtaccount']+'('+data.wtaccountlist[that['WTACCOUNTINDEX']]['name']+')');
            }
            var config_wtaccout = that.WTACCOUNTTYPEINDEX;
            if(!service_config[that.WTACCOUNTTYPEINDEX]){
              config_wtaccout = 'QTACCOUNT';
            }
            that.$set('WTTYPE',service_config[config_wtaccout]);
            that.$set('WTTYPENAME',service_config[config_wtaccout][that.WTTYPEINDEX]['name']);
            that.$set('WTPriceType',service_config[config_wtaccout][that.WTTYPEINDEX]['id']);

            if(data.wtaccountlist){
              that.volumes = data.wtaccountlist[0].volume;
            }
            that.FUNDTITLE = data.FUNDTITLE || '';
            that.STOCKTYPE = data.STOCKTYPE || '0';
            that.USABLE = data.USABLE ? ((that.STOCKTYPE == '1') ? data.USABLE+'元' : data.USABLE) : '';
            that.FUNDDAYSTITLE = data.FUNDDAYSTITLE || '';
            that.FUNDUSEDDAYS = data.FUNDUSEDDAYS || '';
          })
      },
      //获取五档
      getfiveData(){
        var that      = this;
        if(that.stockcode.length != 6){
          return;
        }
        var oSendData = {
          stockcode    :that.stockcode,
          WTACCOUNTTYPE:that.WTACCOUNTTYPEINDEX,
          Level        :'1'
        };
        service_hq_often.require33(oSendData)
          .then((data)=>{
            // $.hidePreloader();
            if(that.stockcode == '') return;
            if(data.ERRORNO<0){
              if(that.wtaccountlist.length<=0){
                that.getCustomers(); //触发可买卖数量
              }
              return;
            }
            // if(data.VOLUME){
            //   var unit   = Math.pow(10,(data.VOLUME));
            //   that.priceunit = data.VOLUME;
            //   that.VOLUME = 1/unit;
            // }
            data && data.fiveData && that.$set('fiveData', data.fiveData);
            if(that.priceData == '' && data.fiveData.sBuyPrice1 && that.wtaccountlist.length == 0){
              that.priceData = data.fiveData.sBuyPrice1;
              if(!/\d/.test(that.priceData)){
                that.priceData=data.CONTACTID;
              }
              that.price(0);
            }
            if(data.fiveData){
              if(data.fiveData.upPrice){
                that.upPrice = data.fiveData.upPrice;
              }
              if(data.fiveData.downPrice){
                that.downPrice = data.fiveData.downPrice;
              }
            }
          })
      },
      //数量的键盘输入
      numInput(data){
        var val = data.currentTarget.innerText;
        if(isNaN(val)) return;
        this.volume = val;
      },
      //数量的加减
      quantities(e){
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
        this.main.inputvalue($(this.$el).find(".t2")[0],this.volume);
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
        this.isWTACCOUNTFunc();
      },
      isWTACCOUNTFunc(){
        if(this.isWTACCOUNT){
          this.isWTACCOUNT = false;
        }else {
          this.isWTACCOUNT = true;
        }
      },
      isWTTYPEFunc(){
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
        clearData1(){
            this.priceData = '';
            this.volume = '';
            this.volumes = '';
            this.name = '';
            this.COMMBATCHENTRUSTINFO = '';
            this.STOCKKIND = '';
            this.BANKMONEY = '';
            this.WTACCOUNT = '';
            this.VOLUME = '0.001';
            this.sMoney = '100';
            this.WTACCOUNTTYPEINDEX = '';
            this.WTACCOUNTNAME = '选择股东账号';
            this.WTTYPENAME = '委托方式';
            this.wtaccountlist = [];
            this.WTTYPE = [];
            this.stockList = [];
            this.downPrice = '';
            this.upPrice = '';
            this.FUNDTITLE = '';
            this.USABLE = '';
            this.FUNDDAYSTITLE='',
                this.FUNDUSEDDAYS='',
                this.STOCKTYPE='',
                this.stockcode = '';
            this.WTPriceType = '0';
            this.WTACCOUNTINDEX = 0;
            this.WTTYPEINDEX = 0;
            this.priceunit = 2;
            this.isSJWT = false;
            for(var n in this.fiveData){
                if(n === 'sPrec'){
                    this.fiveData[n] = 0;
                }else {
                    this.fiveData[n] = '--';
                }
            }
            this.$emit('handleIt','1');
            // this.$refs.swipe.reInitPages();
            // this.$refs.swipe.setPage(0);
            // this.main.close();
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
        this.VOLUME = '0.001';
        this.sMoney = '100';
        this.WTACCOUNTTYPEINDEX = '';
        this.WTACCOUNTNAME = '选择股东账号';
        this.WTTYPENAME = '委托方式';
        this.wtaccountlist = [];
        this.WTTYPE = [];
        this.stockList = [];
        this.downPrice = '';
        this.upPrice = '';
        this.FUNDTITLE = '';
        this.USABLE = '';
        this.FUNDDAYSTITLE='',
        this.FUNDUSEDDAYS='',
        this.STOCKTYPE='',
        this.stockcode = '';
        this.WTPriceType = '0';
        this.WTACCOUNTINDEX = 0;
        this.WTTYPEINDEX = 0;
        this.priceunit = 2;
        this.isSJWT = false;
        for(var n in this.fiveData){
          if(n === 'sPrec'){
            this.fiveData[n] = 0;
          }else {
            this.fiveData[n] = '--';
          }
        }
        this.$emit('handleIt','1');
        // this.$refs.swipe.reInitPages();
        // this.$refs.swipe.setPage(0);
        this.main.close();
      },
      modalstock(){
        if(!!this.main){
          this.main.close();
        }
        if(this.isWTTYPE){
          this.isWTTYPE = false;
        }
        if(this.isWTACCOUNT){
          this.isWTACCOUNT = false;
        }
      },
      /**
       * [stockSxfyInfo 股票手续费信息]
       */
      stockSxfyInfo(){
        if(!this.volume || isNaN(this.volume) || !Number(this.volume) || Number(this.volume)<=0) return;
        if(!this.priceData || !Number(this.priceData) || Number(this.priceData)<=0) return;
        if(!this.stockcode || !this.WTACCOUNTTYPEINDEX) return;
        //解析priceData有几位小数
        var s = this.priceData.replace(/[^\d\.]/g,'')+'',
            ln = s.indexOf('.'),
            sDh = s.substr(ln+1).length;
        try{
          let nsyfy = Number(this.priceData)*Number(this.volume);
          if(this.stockcode.length==6){ //港股5位
            nsyfy = Number(Number(nsyfy).toFixed(sDh));
            this.stockSxfyFlag = true;
            this.stockSxfy = nsyfy;
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
        if(this.WTACCOUNT == this.wtaccountlist[val]['wtaccount'] || !this.priceData || this.priceData == ''){
          return;
        }
        this.WTACCOUNT = this.wtaccountlist[val]['wtaccount'];
        this.WTACCOUNTTYPEINDEX = this.wtaccountlist[val]['wtaccounttype'];
        this.getCustomers();
      },
      priceData(val,old){
        if(val == old){
          return;
        }
        var v = (''+val).replace(/[^\d\.]/g,'');
        var ln = v.indexOf('.');
        var newdata = v;
        if(ln>0){
          var s = v.substr(0,ln+1);
          var e = v.substr(ln+1);
          var r = e.replace(/\./g,'');
          let n = (!!this.VOLUME&&(this.VOLUME+'').indexOf('.')>=0?(this.VOLUME+'').substr((this.VOLUME+'').indexOf('.')+1).length:this.priceunit);
          newdata = s+''+r.substr(0,n);
        }else if(ln == 0){
          newdata = '0.';
        }else {
          if(newdata.length>1){
            newdata = newdata.replace(/^0/g,'');
          }
        }
        var self = this;
        this.$nextTick(function () {
            self.priceData = newdata;
            self.huoQujiaCha();
        })
      },
      WTPriceType(val,old){
        if(val == old || !this.priceData || this.priceData == '' || this.WTACCOUNTTYPEINDEX == ''){
          return;
        }
        if(val != 0){
          this.isSJWT = true;
        }else {
          this.isSJWT = false;
        }
        this.getCustomers();
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
          $(".t2").html("<em style='height:32px;line-height:32px;display:inline-block;border:none;font-size:14px;position:relative;'>可卖:"+utils.fmtunit(val,2)+"</em>")
          return '可卖:'+utils.fmtunit(val,2);
        }else {
          $(".t2").html("<em style='height:32px;line-height:32px;display:inline-block;border:none;font-size:14px;position:relative;'>委托数量</em>")
          return '委托数量'
        }
      },
      wtaccountname(val){
        if(!val || val == ''){
          return '选择股东账号';
        }
        return val;
      }
    },
    events:{
      handleIt(msg){
        this.msg = msg;
        console.log(msg);
        if(msg == 1 ){
          this.$broadcast('parent-stockmin',this.stockcode);
        }
      },
      updateStock(code){
        this.stockcodes = code;
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
  .list-ccount{
    position: relative;
    span{
      position: absolute;
      left:0;
      top:0;
      &:last-child{
        right: 0;
        text-align: right;
      }
    }
  }
  .biaoshi-j {
    color: #777;
    line-height: 32px;
    position: absolute;
    left: 5px;
    top: 0;
  }
  .list-block .wtInput-j[type=number] {
    padding-left: 2rem;
  }
</style>

