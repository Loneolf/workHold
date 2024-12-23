<template>
  <div class="explain content native-scroll" @click="modalstock">
    <div class="cont-wrap">
      <div class="cont">
        <div class="cont_left list-block ">
          <div class="t1 stockcode" v-on:input="clickInput"  is-stock-input="true" placeholder="请输入股票代码" data-mydy="1" type="text" maxlength="6" value="" @click.stop="keyPanel"><em>请输入股票代码</em></div>
          <div class="list-abroad margin-bottom"><!--
          --><!--<p class="abroad-cont"><input v-on:blur="blur()" v-on:focus="focus()" type="text" v-model="stockcodes" @input="change($event)" placeholder="请输入股票代码" v-bind:disabled="isDisabled" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')"></p>-->
            <div class="select_drop" v-show="isStockList">
              <ul>
                <li v-for="items in stockList" @click="stockListFunc($index)"><a href="javascript:void(0);"><strong style="font-size:0.75rem">{{items.STOCKCODEINDEX}}</strong>{{items.STOCKNAMEINDEX}}</a></li>
              </ul>
            </div>
          </div>
          <div class="list-abroad margin-bottom"><p class="abroad-cont"><input v-on:blur="blur('0')" v-on:focus="focus('0')" type="tel" v-model="oppclientno" placeholder="请输入对方股东账号" maxlength="10" max="10"></p>
          </div>
          <div class="list-abroad margin-bottom"><p class="abroad-cont"><input v-on:blur="blur(1)" v-on:focus="focus(1)" maxlength="6"  max="6" type="text" v-model="confernos" placeholder="请输入约定序号"></p>
          </div>
          <div class="list-abroad margin-bottom"><p class="abroad-cont"><input v-on:blur="blur(2)" v-on:focus="focus(2)" maxlength="6"  max="6" type="text" v-model="opposeatnos" placeholder="请输入对方席位号"></p>
          </div>
          <p class="list-price"><span class="minus" v-on:click="price(VOLUME*-1)">{{VOLUME}}</span><span class="input"><span class="input-border"><span class="zhezhao" v-show="isSJWT">市价委托</span><span class="input-border-cont"><input type="number" placeholder="委托价格" v-model="priceData"></span></span></span><span class="add" v-on:click="price(VOLUME)">{{VOLUME}}</span></p>
          <p class="shouyilv">
            <span class="left">涨停：<span class="rise" @click.stop="upDownEvent(upPrice)">{{upPrice}}</span></span><span class="right">跌停：<span class="fill" @click.stop="upDownEvent(downPrice)">{{downPrice}}</span></span>
            <!-- 添加 不含手续费提示语 -->
            <span class="sxfDiv" v-show="stockSxfyFlag"><em class="sxfText">{{stockSxfy}} 不含手续费</em></span>
          </p>
          <p class="list-price"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" placeholder="{{volumes | getVolumes}}" v-model="volume"></span></span></span><span class="add" v-on:click="quantities(1)">{{sMoney}}</span></p>
          <p class="list-text">{{FUNDTITLE}}{{USABLE}}</p>
          <div class="btn-wrapp">
            <div class="appoint"><span @click="isWTACCOUNTFunc">{{WTACCOUNTNAME | wtaccountname}}</span>
              <div class="select_drop" v-show="isWTACCOUNT">
                <ul>
                  <li v-for="items in wtaccountlist" @click="wtAccountFunc($index)" :class="{active:WTACCOUNTINDEX==$index}"><a href="javascript:void(0);">{{items.wtaccount}}({{items.name}})</a></li>
                </ul>
              </div>
            </div>
            <div class="btn" :class="{ 'btn-appoint': isAppointClass }" v-on:click="lendOut">{{lendname}}</div>
          </div>

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
        WTACCOUNTNAME:'选择股东账号',
        WTACCOUNTINDEX:0,
        WTPriceType:'d',
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
        volume:'',
        VOLUME:'0.01',
        volumes:'',
        name:'',
        sMoney:'100',
        msg:'',
        CREDITTYPE:'',
        lendname:'担保品买入',
        INDEX:['CONTACTINDEX','STOCKCODEINDEX','STOCKNAMEINDEX','STOCKNUMINDEX','WTACCOUNTTYPEINDEX'],
        isAppointClass:true,
        isDisabled:false,
        appointcode:'',
        action:'',
        viewname:'',
        oppclientnos:'',
        oppclientno:'',
        confernos:'',
        conferno:'',
        opposeatnos:'',
        main:keyPanel.main(),
        opposeatno:'',
        priceunit:2,
        //不含手续费提示
        stockSxfyFlag:false, //是否要显示这个提示
        stockSxfy:'', //所需费用 人民币 港股需要换算成人民币
      }
    },
    ready(){

    },
    attached(){
      this.CREDITTYPE = this.$route.query.type;
      if(this.CREDITTYPE == 5){
        this.lendname = '立即买入';
        this.action = '13016';
        this.viewname = 'view13016';
      }
      this.stockcode = '';
      this.stockcodes = '';
      !!this.main && this.main.inputvalue($(this.$el).find(".t1")[0],''); //清空
      this.clearData();
      //Url带过来参数
      if(this.$route.query.stockcode){
        this.stockcodes = this.$route.query.stockcode;//股票代码
        this.change();
        this.priceData = this.$route.query.price;//价格
        this.newPrice = this.$route.query.price;//价格
        this.volume = this.$route.query.amount; //数量
        this.opposeatnos = this.$route.query.oppseatno;//席位编号
        this.opposeatno = this.$route.query.oppseatno;//席位编号
        this.confernos = this.$route.query.conferno;//席位编号
        this.conferno = this.$route.query.conferno;//席位编号
      }
      this.$TZT.action10077(this);
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
      blur(val){
        if(val == 0){
        }else if(val == 1){
          this.conferno = this.confernos;
          if(this.confernos != ''){
            this.confernos = '约定序号:'+this.conferno;
          }
        }else if(val == 2){
          this.opposeatno = this.opposeatnos;
          if(this.opposeatnos != ''){
            this.opposeatnos = '对方席位号:'+this.opposeatno;
          }
        }else {
          if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
            this.stockcodes = this.stockcode+'('+this.name+')';
            this.main.inputvalue($(this.$el).find(".stockcode")[0],this.stockcodes);
          }
        }

      },
      focus(val){
        if(val == '0'){

        }else if(val == 1){
          if(this.confernos != ''){
            var conferno = this.confernos.split(':');
            if(conferno.length>1){
              this.confernos = conferno[1];
            }
          }
        }else if(val == 2){
          if(this.opposeatnos != ''){
            var opposeatno = this.opposeatnos.split(':');
            if(opposeatno.length>1){
              this.opposeatnos = opposeatno[1];
            }
          }
        }else {
          if(this.stockcodes.length>6 && this.stockcode.length == 6){
            var stock = this.stockcodes;
            this.stockcodes = stock.replace(/\(.*\)/g,'');
            this.main.close();
          }
        }
      },
      clickInput(data){//股票数字键盘输入
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
          e && e.path && e.path[0] && e.path[0].blur();
          this.main.close();
          this.stockcode = this.stockcodes;
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
      //五档数据点击
      greet(e){
        if(this.fiveData[e]){
          this.priceData = this.fiveData[e];
        }
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
      //价格的加减
      price(e){
        if(e<0){
          if(this.priceData>0 && this.priceData - e>0){
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),2);
          }
        }else{
          if(this.priceData == ''){
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
        if(this.volume == ''){
          $.alert('请输入买入数量');
          return;
        }
        //对股东账号进行校验
        if(!!this.wtaccountlist && this.wtaccountlist.length<=0){
          $.alert("无股东账号");
          return;
        }
        if(this.oppclientno == ''){
          $.alert('请输入对方股东账号!');
          return;
        }
        if(this.conferno == ''){
          $.alert('请输入约定号!');
          return;
        }
        if(this.opposeatno == ''){
          $.alert('请输入对方席位号!');
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
//          CREDITTYPE:this.CREDITTYPE,
          priceType:this.WTPriceType,
          Direction:'B',
          COMMBATCHENTRUSTINFO:1,
          price:this.priceData,
          oppclientno:this.oppclientno,
          conferno:this.conferno,
          opposeatno:this.opposeatno
        };
        var sTs = '';
        if(parseFloat(oSendData.price)>parseFloat(this.upPrice)){
          sTs += '<p class="rise">委托价格超过涨停价，交易可能不会成功。</p>';
        }
        if(parseFloat(oSendData.price)<parseFloat(this.downPrice)){
          sTs += '<p class="rise">委托价格低于跌停价，交易可能不会成功。</p>';
        }
        if(this.volumes=="--"||parseFloat(this.volume)>parseFloat(this.volumes)){
          sTs += '<p class="rise">买入数量大于最大可买量，交易可能不会成功。</p>';
        }
        console.log(oSendData);
        var sConfirm = `<p>股东账号:${oSendData.wtaccount}</p><p>证券代码:${oSendData.stockcode}</p><p>证券名称:${this.name}</p><p>委托价格:${oSendData.price}</p><p>委托数量:${oSendData.volume}</p><p>对方股东账号:${oSendData.oppclientno}</p><p>约定序号:${oSendData.conferno}</p><p>对方席位号:${oSendData.opposeatno}</p>${sTs}<p>确认买入该股票?</p>`;
//        $.toast("请求中！！！");
        $.confirm(
          `<div style="text-align: left;">${sConfirm}</div>`,
          '互报成交确认买入',
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
//          CREDITTYPE:that.CREDITTYPE,
          accountIndex:2,
          Accountlist:1,
          updatesign:1,
          Direction:'B',
          COMMBATCHENTRUSTINFO:1
        };
        $.showPreloader();
        service_deal_often.require150(oSendData)
          .then((data)=>{
            $.hidePreloader();
            console.log(data);
            if(!data){
              return;
            }
            that.WTACCOUNTINDEX = 0;
            if(data && data.wtaccountlist){
              that.$set('wtaccountlist',data.wtaccountlist);
              that.$set('WTACCOUNTNAME',data.wtaccountlist[that['WTACCOUNTINDEX']]['wtaccount']+'('+data.wtaccountlist[that['WTACCOUNTINDEX']]['name']+')');
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
//            data && data.fiveData && that.$set('fiveData', data.fiveData);
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
        this.wtaccountlist = [];
        this.stockList = [];
        this.downPrice = '';
        this.upPrice = '';
        this.FUNDTITLE = '';
        this.USABLE = '';
        this.appointcode = '';
        this.stockcode  = '';
        this.oppclientnos = '';
        this.oppclientno = '';
        this.confernos = '';
        this.conferno = '';
        this.opposeatnos = '';
        this.opposeatno = '';
        this.WTPriceType = 'd';
        this.WTACCOUNTINDEX = 0;
        this.isSJWT = false;
        for(var n in this.fiveData){
          this.fiveData[n] = '--';
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
      WTPriceType(val,old){
        if(val == old){
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
  .shouyilv{
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .select_box,.abroad-cont{
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .cont .list-text{
    height: 0.7rem;
  }
  .cont .cont_left .btn{
    height: 1rem;
    line-height: 1rem;
    position: relative;
    z-index: 1;
  }
  .cont .cont_left .btn-appoint{
    position: absolute;
    right: 0;
    top:0;
    width: 50%;
  }
  .abroad-cont .select_inco,.appoint span{
    height: 1.6rem;
    width: 1.6rem;
    position: absolute;
    right: 0;
    top: 0;
    &:before {
       content: "";
       width: 0;
       height: 0;
       border: .3rem solid transparent;
       border-top: .3rem solid #58B3FA;
       position: absolute;
       right: .5rem;
       top: .6rem;
     }
  }
  .appoint span{
    &:before {
       right: .2rem;
       top: .4rem;
     }
  }
  .abroad-cont input{
    padding-right: 1.6rem;
  }
  .btn-wrapp{
    height: 1rem;
    line-height: 1rem;
    position: relative;
    z-index:100;
    .appoint{
      position: absolute;
      left: 0;
      top:0;
      width: 50%;
      z-index: 0;
      input{
        width: 95%;
        height: 1rem;
        line-height: 1rem;
        padding: 0;
        margin: 0;
        background-color:#f9f9f9;
        border: none;
        font-size: 0.4rem;
      }
      span{
        display: inline-block;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        padding: 0;
        margin: 0;
        background-color:#eaeaea;
        border: none;
        font-size: 0.4rem;
      }
    }
  }
  .appoint .select_drop ul{
    width: 200%;
  }
</style>

