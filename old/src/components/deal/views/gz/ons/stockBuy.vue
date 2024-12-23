<template>
  <div class="explain content native-scroll" @click="modalstock">
    <div class="cont-wrap">
      <div class="cont">
        <div class="cont_left list-block ">
          <div class="t1 stockcode" v-on:input="clickInput"  is-stock-input="true" placeholder="请输入股票代码" data-mydy="1" type="text" maxlength="6" value="" @click.stop="keyPanel"><em>请输入股票代码</em></div>
          <!--<div class="t1 stockcode" v-on:input="clickInput"  is-stock-input="true" placeholder="请输入股票代码"  type="text"  maxlength="6"  max="6" onkeyup="this.value=this.value.replace(/\D/g,'')" value="" @click.stop="keyPanel" ><em>请输入股票代码</em></div>-->
          <div class="list-abroad margin-bottom"><!--
          --><!--<p class="abroad-cont"><input v-on:blur="blur()" v-on:focus="focus()" type="text" v-model="stockcodes" @input="change($event)" placeholder="请输入股票代码" maxlength="6" max="6" onkeyup="this.value=this.value.replace(/\D/g,'')"></p>-->
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
            <div class="select_box abroad-cont">
              <p class="">{{WTTYPENAME}}</p>
            </div>
          </div>
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><select v-model="selected"><option v-for="items in wtaccountlist" value="{{$index}}">{{items.wtaccount}}({{items.wtaccounttype}})</option></select></p></div>-->
          <p class="list-price"><span class="minus" v-on:click="price(VOLUME*-1)">{{VOLUME}}</span><span class="input"><span class="input-border"><span class="zhezhao" v-show="isSJWT">市价委托</span><span class="input-border-cont"><input type="number" placeholder="委托价格" v-model="priceData"></span></span></span><span class="add" v-on:click="price(VOLUME)">{{VOLUME}}</span></p>
          <p class="shouyilv">
            <span class="left">涨停：<span class="rise" @click.stop="upDownEvent(upPrice)">{{upPrice}}</span></span><span class="right">跌停：<span class="fill" @click.stop="upDownEvent(downPrice)">{{downPrice}}</span></span>
            <!-- 添加 不含手续费提示语 -->
            <span class="sxfDiv" v-show="stockSxfyFlag"><em class="sxfText">{{stockSxfy}} 不含手续费</em></span>
          </p>
          <p class="list-price"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" placeholder="{{volumes | getVolumes}}" v-model="volume"></span></span></span><span class="add" v-on:click="quantities(1)">{{sMoney}}</span></p>
          <p class="list-text">{{FUNDTITLE}}{{USABLE}}</p>
          <div class="btn" v-on:click="lendOut">{{lendname}}</div>
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
      <swipe-item class="slide1"><templates url="gz/chicang" v-bind:action="action" v-bind:viewname="viewname"></templates></swipe-item>
      <swipe-item class="slide2"><stockmin></stockmin></swipe-item>
    </swipe>
  </div>
</template>
<script>
  import utils from '../../../../../util/util'
  import service_deal_often from '../../../service/common/service_deal_often'
  import service_gz from '../../../service/trade/service_gz'
  import service_config from '../../../service/common/service_config'
  import service_hq_often from '../../../../hq/service/common/service_hq_often'
  import stockmin from '../../../ons/stockmin.vue'
  import { Swipe, SwipeItem } from 'vue-swipe';
  import templates from '../../../../common/templates.vue'
  import localService from '../../../../../services/localService'
  import keyPanel from '../../../../../util/keyPanel/keyPanel';
  import "../../../../../assets/less/KeyPanel.less";


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
        WTTYPENAME:'转让类型',
        WTACCOUNTNAME:'选择股东账号',
        WTACCOUNTINDEX:0,
        COMMBATCHENTRUSTINFO:'',
        STOCKKIND:'',
        BANKMONEY:'',
        wtaccountlist:[],
        stockList:[],
        isWTACCOUNT:false,
        isSJWT:false,
        isStockList:false,
        priceData:'',
        newPrice:'',
        FUNDTITLE:'',
        USABLE:'',
        downPrice:'',
        upPrice:'',
        lendname:'立即买入',
        volume:'',
        VOLUME:'0.01',
        volumes:'',
        name:'',
        sMoney:'100',
        msg:'',
        action:'',
        viewname:'',
        main:keyPanel.main(),
        WTPriceType:'a',
        priceunit:2,
        //不含手续费提示
        stockSxfyFlag:false, //是否要显示这个提示
        stockSxfy:'', //所需费用 人民币 港股需要换算成人民币
      }
    },
    ready(){

    },
    attached(){
      var type = this.$route.query.type;
      if(type == 3 || type == 4){
        this.WTPriceType = 'b';
        this.lendname = '定价买入';
        this.action = '13014';
        this.viewname = 'view13014';
      }
      if(type == 1 || type == 2){
        this.WTPriceType = 'a';
        this.lendname = '限价买入';
        this.action = '13010';
        this.viewname = 'view13010';
      }
      this.$TZT.action10077(this);
      this.stockcode = '';
      this.stockcodes = '';
      !!this.main && this.main.inputvalue($(this.$el).find(".t1")[0],''); //清空
      this.clearData();
      $($(this.$el).find(".stockcode em")).text('请输入股票代码');
      localService.readMapMesg('footerStockcode')
              .then((local)=>{
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
      keyPanel(){
        var that = this;
        if(this.stockcodes.length>6 && this.stockcode.length == 6){
          that.main.inputvalue($(this.$el).find(".t1")[0],this.stockcode,true);
        }
        this.main.init($(this.$el).find(".t1")[0],5,!1, {
          afterCloseFunc: function (sValue) {
            if (that.stockcode == sValue && !!that.name) {
              this.stockcodes = this.stockcode + '(' + this.name + ')';
              that.main.inputvalue($(that.$el).find(".t1")[0], that.stockcodes, true);
            }
          }
        });
      },
      dealRefreshTimer(){
        if(this.stockcode.length === 6){
          this.getfiveData();
        }
        if(this.msg === 1){
          this.$emit('handleIt',1);
        }
      },
      blur(){
        if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
          this.stockcodes = this.stockcode+'('+this.name+')';
          this.main.inputvalue($(this.$el).find(".stockcode")[0],this.stockcodes);
        }
      },
      focus(){
        if(this.stockcodes.length>6 && this.stockcode.length == 6){
          var stock = this.stockcodes;
          this.stockcodes = stock.replace(/\(.*\)/g,'');
        }
        this.main.close();
      },
      clickInput(data){//数字键盘输入
        var val = data.currentTarget.innerText;
        if(val && val.length ==6){
          this.stockcodes = val
          this.change();
          this.blur();
        }
      },
      //股票输入触发事件
      change(e){
        console.log(this.stockcode);
        this.clearData();
        if(this.stockcodes.length === 6){
//          e && e.path && e.path[0] && e.path[0].blur();
          this.main.close();
          this.stockcode = this.stockcodes;
          this.getWtaccount();
          this.getWTTYPE();
        }
        if(this.stockcodes.length>6){
          this.stockcodes = this.stockcodes.slice(0,5);
        }
      },
      getWTTYPE(){
        var that      = this;
        if(that.stockcode.length != 6){
          return;
        }
        var obj = {
          startpos:1,
          stockcode:that.stockcode
        };
        //获取转让类型的
        service_deal_often.require5124(obj).then((data)=>{
            if(data.GRID0 && data.GRID0.length>1){
                var GRID = data.GRID0;
                GRID.shift();
                var listData = GRID[0].split('|');
                that.WTTYPENAME = listData[data.TRANSTYPEINDEX];
            }
        })
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
                var TRANSTYPEINDEX = data.TRANSTYPEINDEX;
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
                that.sMoney = listData[data.NEWBUYUNITINDEX];
                if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
                  this.stockcodes = this.stockcode+'('+this.name+')';
                  this.main.inputvalue($(this.$el).find(".stockcode")[0],this.stockcodes);
                }
                that.getfiveData();
                this.$refs.swipe.reInitPages();
                this.$refs.swipe.setPage(1);
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
      //价格的加减
      price(e){
        if(e<0){
          if(this.priceData>0 && this.priceData - e>0){
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),2);
          }
        }else{
          if(this.priceData == ''||this.priceData == '-.-'){
            this.priceData = e;
          }else{
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),2);
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
        if(isNaN(this.priceData)){
          $.alert('价格请输入数字');
          return;
        }
        if(this.volume == ''){
          $.alert('请输入买入数量');
          return;
        }
        if(isNaN(this.volume)){
          $.alert('买入数量请输入数字');
          return;
        }
        //对股东账号进行校验
        if(!!this.wtaccountlist && this.wtaccountlist.length<=0){
          $.alert("无股东账号");
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
          Direction:'B',
          price:this.priceData
        };
        var sPrice = '',
            sTs = '';
        if(this.WTPriceType == 'a' ||this.WTPriceType == 'b'){
          oSendData.price = this.priceData;
          if(parseFloat(oSendData.price)>parseFloat(this.upPrice)){
            sTs += '<p class="rise">委托价格超过涨停价，交易可能不会成功。</p>';
          }
          if(parseFloat(oSendData.price)<parseFloat(this.downPrice)){
            sTs += '<p class="rise">委托价格低于跌停价，交易可能不会成功。</p>';
          }
          if(this.volumes=="--"||parseFloat(this.volume)>parseFloat(this.volumes)){
            sTs += '<p class="rise">买入数量大于最大可买量，交易可能不会成功。</p>';
          }
          sPrice = `<p>委托价格:${oSendData.price}</p>`;
        }else {
          sPrice = '<p>委托方式:市价委托</p>';
        }
        console.log(oSendData);
        var sConfirm = `<p>股东账号:${oSendData.wtaccount}</p><p>证券代码:${oSendData.stockcode}</p><p>证券名称:${this.name}</p>${sPrice}<p>委托数量:${oSendData.volume}</p>${sTs}<p>确认买入该证券?</p>`;
//        $.toast("请求中！！！");
        $.confirm(
          `<div style="text-align: left;">${sConfirm}</div>`,
          this.lendname,
          function () {
//          $.alert('You clicked Ok button');
            $.showPreloader();
            service_gz.require178(oSendData)
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
          direction:'B',
          accountIndex:2,
          Accountlist:1,
          updatesign:1,
          COMMBATCHENTRUSTINFO:1
        };
        $.showPreloader();
        service_deal_often.require150(oSendData)
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

            if(data.wtaccountlist){
              that.volumes = data.wtaccountlist[0].volume;
            }
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
            $.hidePreloader();
            console.log(data);
            if(data.ERRORNO<0){
              if(that.wtaccountlist.length<=0){
                that.getCustomers(); //触发可买卖数量
              }
              return;
            }
            data && data.fiveData && that.$set('fiveData', data.fiveData);
            if(that.priceData == '' && data.PRICE && that.wtaccountlist.length == 0){
              that.priceData = data.PRICE;
            }
            if(data.VOLUME){
              var unit   = Math.pow(10,(data.VOLUME));
              that.VOLUME = 1/unit;
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
      wtAccountFunc(aIndex){
        this.WTACCOUNTINDEX = aIndex;
        this.WTACCOUNTNAME = this.wtaccountlist[aIndex]['wtaccount']+'('+this.wtaccountlist[aIndex]['name']+')';
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
        this.WTTYPENAME = '转让类型';
        this.wtaccountlist = [];
        this.stockList = [];
        this.downPrice = '';
        this.upPrice = '';
        this.FUNDTITLE = '';
        this.USABLE = '';
        this.stockcode = '';
//        this.WTPriceType = 'a';
        this.WTACCOUNTINDEX = 0;
        this.isSJWT = false;
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
        if( val == '' || this.WTACCOUNTTYPEINDEX == ''){
          return;
        }
        var v = ''+val.replace(/[^\d\.]/g,'');
        var ln = v.indexOf('.');
        var newdata = v;
        if(ln>0){
          var s = v.substr(0,ln+1);
          var e = v.substr(ln+1);
          var r = e.replace(/\./g,'');
          newdata = s+''+r.substr(0,this.priceunit);
        }else if(ln == 0){
          newdata = '0.';
        }else {
          if(newdata.length>1){
            newdata = newdata.replace(/^0/g,'');
          }
        }
        this.getCustomers();
        var self = this;
        this.$nextTick(function () { self.priceData = newdata; })
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
          return '可买:'+utils.fmtunit(val,2);
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
</style>

