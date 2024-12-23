<template>
  <div class="explain content native-scroll">
    <div class="cont-wrap">
         <div class="zqpz">
             <p>证券品种</p>
             <p>{{dayNums}}天期({{stockcodes}})</p>
         </div>
         <div class="zqpzcontent">
           <div class="sy">
             <p>到期收益 <span>{{sProfit}}元</span> </p>
             <p>占用天数 <span>{{diffNum}}天</span></p>
           </div>
           <div class="date">
             <p>资金可用日期 {{kydate}}</p>
             <p>资金可取日期 {{kqdate.substring(0,4)+'-'+kqdate.substring(4,6)+'-'+kqdate.substring(6,8)}}</p>
           </div>
         </div>
      <!-- <header class="header">
        <div class="header_left">
          <p>资金共占用</p>
          <p>实际占款天数</p>
          <p><span class='zjzy_day'>{{diffNum}}</span>天</p>
        </div><div class="header_right">
        <p><span class="to_day">借款</span><span>可用</span><span>可取</span></p>
        <p><span class="to_day">{{nowDate}}</span>/<span>{{kydate}}</span>/<span>{{kqdate}}</span></p>
      </div>
      </header> -->
      <div class="cont">
        <div class="cont_left list-block">
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><input type="number" v-model="stockcode" @input="change($event)" placeholder="请输入股票代码"></p></div>-->
          <!-- <div class="list-abroad margin-bottom"><p class="abroad-cont"><input v-on:blur="blur()" v-on:focus="focus()" type="text" v-model="stockcodes" @input="change($event)" placeholder="请输入股票代码" maxlength="6" max="6" onkeyup="this.value=this.value.replace(/\D/g,'')" disabled></p>
            <div class="select_drop" v-show="isStockList">
              <ul>
                <li v-for="items in stockList" @click="stockListFunc($index)"><a href="javascript:void(0);"><strong style="font-size:0.75rem">{{items.STOCKCODEINDEX}}</strong>{{items.STOCKNAMEINDEX}}</a></li>
              </ul>
            </div>
          </div> -->
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><select v-model="selected"><option v-for="items in wtaccountlist" value="{{$index}}">{{items.wtaccount}}({{items.name}})</option></select></p></div>-->
          <div class="list-abroad margin-bottom select_box2">
            <p class="gddm">股东账号</p>
            <div class="select_box abroad-cont" @click="isWTACCOUNTFunc">
              <p class="select_active">{{WTACCOUNTNAME | wtaccountname}}</p>
            </div>
            <div v-show="isWTACCOUNT">
              <ul>
                <li v-for="items in wtaccountlist" @click="wtAccountFunc($index)"><a href="javascript:void(0);">{{items.wtaccount}}({{items.name}})</a></li>
              </ul>
            </div>
          </div>
          <p class="wtll">委托利率</p>
          <p class="list-price"><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" v-model="priceData" v-on:blur="blur(1)"></span></span></span><span class="minus" v-on:click="price(VOLUME*-1)">{{VOLUME}}</span><span class="add" v-on:click="price(VOLUME)">{{VOLUME}}</span></p>
         <!--  <p class="shouyilv">实际年化收益率：<span class="rise">{{priceData | riseData}}%</span></p> -->
          <p class="jyje">交易金额</p>
          <p class="list-price kjzj"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" placeholder="可借{{volumes}}" v-model="volume" @input="feeCal($event)"></span></span></span><span class="add" v-on:click="quantities(1)">{{sMoney}}</span></p>
          <p class="kyzj">可用资金  <span class="rise">{{availableFunds}}元</span></p>
          <!-- <p class="list-text">预期收益：<span class="rise">{{sProfit}}</span>元</p>
          <p class="list-text">手续费参考：<span class="rise">{{sFee}}</span>元</p> -->
          <div class="btn" v-on:click="lendOut">借出资金</div>
        </div><div class="cont_right">
        <div class="cont_right_lr">
       <!--    <p class="five-name">即时借贷年利率(%)</p> -->
          <p class="five-data" v-on:click="greet('sSellPrice5')"><span>借出5</span><span class="{{fiveData.sSellPrice5 | pricecolor}}">{{fiveData.sSellPrice5}}</span><span>{{fiveData.sSellAmount5 | vomUnit}}</span></p>
          <p class="five-data" v-on:click="greet('sSellPrice4')"><span>借出4</span><span class="{{fiveData.sSellPrice4 | pricecolor}}">{{fiveData.sSellPrice4}}</span><span>{{fiveData.sSellAmount4 | vomUnit}}</span></p>
          <p class="five-data" v-on:click="greet('sSellPrice3')"><span>借出3</span><span class="{{fiveData.sSellPrice3 | pricecolor}}">{{fiveData.sSellPrice3}}</span><span>{{fiveData.sSellAmount3 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sSellPrice2')"><span>借出2</span><span class="{{fiveData.sSellPrice2 | pricecolor}}">{{fiveData.sSellPrice2}}</span><span>{{fiveData.sSellAmount2 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sSellPrice1')"><span>借出1</span><span class="{{fiveData.sSellPrice1 | pricecolor}}">{{fiveData.sSellPrice1}}</span><span>{{fiveData.sSellAmount1 | vomUnit}}</span></p>
          <p class="line"></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice1')"><span>借入1</span><span class="{{fiveData.sBuyPrice1 | pricecolor}}">{{fiveData.sBuyPrice1}}</span><span>{{fiveData.sBuyAmount1 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice2')"><span>借入2</span><span class="{{fiveData.sBuyPrice2 | pricecolor}}">{{fiveData.sBuyPrice2}}</span><span>{{fiveData.sBuyAmount2 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice3')"><span>借入3</span><span class="{{fiveData.sBuyPrice3 | pricecolor}}">{{fiveData.sBuyPrice3}}</span><span>{{fiveData.sBuyAmount3 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice4')"><span>借入4</span><span class="{{fiveData.sBuyPrice4 | pricecolor}}">{{fiveData.sBuyPrice4}}</span><span>{{fiveData.sBuyAmount4 | vomUnit}}</span></p>
          <p  class="five-data" v-on:click="greet('sBuyPrice5')"><span>借入5</span><span class="{{fiveData.sBuyPrice5 | pricecolor}}">{{fiveData.sBuyPrice5}}</span><span>{{fiveData.sBuyAmount5 | vomUnit}}</span></p>
        </div>

      </div>
      </div>
    </div>
    <!--<div class="swipe my-swipe"> <div class="swipe-items-wrap">
      <div class="swipe-item slide2 active"><K-line></K-line> </div> </div> </div>-->
    <!-- <swipe class="my-swipe" :speed="500" :auto="0" :show-indicators="true" :no-drag="true">
      <swipe-item class="slide1"><templates url="reverseRepo/chicang" action="" viewname=""></templates></swipe-item> -->
      <!-- <swipe-item class="slide2"><stockmin></stockmin></swipe-item> -->
      <swipe class="my-swipe ggstockinfo" :speed="500" :auto="0" :show-indicators="true" :no-drag="false">
        <!-- <swipe-item class="slide1"><templates url="reverseRepo/chicang" action="" viewname=""></templates></swipe-item>
        <swipe-item class="slide2"><stockmin></stockmin></swipe-item> -->

        <swipe-item class="slide1"><stockmin></stockmin></swipe-item>
       <!--  <swipe-item class="slide2"><templates url="reverseRepo/chicang" action="" viewname=""></templates></swipe-item> -->
      <!-- <div class="swipe my-swipe">
        <templates url="reverseRepo/chicang" action="" viewname=""></templates>
      </div> -->
    </swipe>
       <!--   </swipe> -->
       <!--    <div class="stock_tab chart_tab">
               <ul>
       <li v-for="canvasTab in canvasTabs" @click="choose($index,canvasTab.id)" :class="{'active':$index===selected}"><a href="javascript:void(0);" id="{{canvasTab.id}}">{{canvasTab.tabName}}</a></li>
               </ul>
             </div>
       
             <div class="tabs">
               <component :is="currentView" v-ref:ref2></component>
             </div> -->
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import repoconfig from '../../scripts/repoconfig'
  import templates from '../../../common/templates.vue'
  import service_deal_often from '../../service/common/service_deal_often'
  import { Swipe, SwipeItem } from 'vue-swipe';

  import service_hq_often from '../../../hq/service/common/service_hq_often'
  import stockmin from '../../ons/stockmin.vue'

  require('vue-swipe/dist/vue-swipe.css');
  export default {
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
        gridSZ:[],
        stockcode:'',
        stockcodes:'',
        WTACCOUNTTYPEINDEX:'',
        WTACCOUNT:'',
        wtaccountlist:[],
        priceData:'',
        newPrice:'',
        volume:'',
        volumes:'',
        selected:0,
        WTPriceType:0,
        dayNum:'',
        diffNum:'',
        name:'',
        sMoney:'--',
        sFee:'--',
        sProfit:'--',
        nowDate:'',
        msg:'',
        kydate:'',
        kqdate:'',
        VOLUME:'0.001',
        isStockList:false,
        isWTACCOUNT:false,
        WTACCOUNTNAME:'选择股东账号',
        WTACCOUNTINDEX:0,
        dayNums:'',
        availableFunds:'--',
        sc:'',
      }
    },
    ready(){
//      this.getCustomers();
//      this.queryHKMinData();

    },
    attached(){
      this.stockcodes = this.$route.query.stockcode;
      this.priceData = '';
      this.volume = '';
      this.volumes = '';
      this.name = '';
      this.sFee = '';
      this.sProfit = '';
      this.msg = 0;
      this.WTACCOUNT = '';
      this.WTACCOUNTTYPEINDEX = '';
      this.wtaccountlist = [];
//      this.queryKLineData();
//      this.dateType();
//      this.getWtaccount();
//      this.getfiveData();
      this.change();
      this.getUsable();
      this.nowDate = utils.manyDays(0);
      this.$TZT.action10077(this);
    },
    methods:{
       getUsable(){
      var that  = this;
      service_deal_often.require116()
        .then((data)=>{
          //console.log(data[0][1]['USABLEINDEX'])
          data[0] && data[0][1]['USABLEINDEX'] && that.$set('availableFunds',data[0][1]['USABLEINDEX']);
          //data[0] && data[0][1]['TOTALINDEX'] && that.$set('chicangFunds',data[0][1]['TOTALINDEX']);
          //  alert(data[0][1]['TOTALINDEX'])
        })
    },
      dealRefreshTimer(){
        this.getfiveData();
        if(this.msg === 0){
          this.$emit('handleIt',0);
        }
      },
      //借款，可用，可取
      dateType(date,key){
//        console.log(repoconfig.repoData[this.stockcode]);
//        var initddate = utils.manyDays(repoconfig.repoData[this.stockcode]);
        var initddate = utils.manyDays(repoconfig.repoData[this.stockcode]-1);
        /*if(key){
          initddate = utils.manyDays(repoconfig.repoData[this.stockcode]);
        }*/
        if(date){
          initddate = date;
        }
        let oSendData = {
          wtaccounttype:'SHACCOUNT',
          initdate:initddate,
          stagenum:0,
          FINANCETYPE:'1'
        };
        service_deal_often.require5015(oSendData)
          .then((data)=>{
//            console.log(data);
           //$.hidePreloader();
            if(data.ERRORNO<0){
              return;
            }
            if(!date){
              //if(data.NEXT_TRADE_DATE == initddate){
                this.kydate = data.NEXT_TRADE_DATE.substring(0,4)+'-'+data.NEXT_TRADE_DATE.substring(4,6)+'-'+data.NEXT_TRADE_DATE.substring(6,8);
                this.dateType(data.NEXT_TRADE_DATE,'kqdate');
              /*}else {
                this.dateType(data.NEXT_TRADE_DATE,'kydate');
              }*/
            }else {
              this[key] = data.NEXT_TRADE_DATE;
              if(key === 'kydate'){
                this.dateType(data.NEXT_TRADE_DATE,'kqdate');
              }else{
//                console.log(this.kydate);
//                console.log(this.kqdate);
              }
            }
          })
      },
      blur(val){
        if(val ==1 ){
          this.price(0);
          return;
        }
        if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
          this.stockcodes = this.stockcode+this.name;
        }
      },
      focus(){
        if(this.stockcodes.length>6 && this.stockcode.length == 6){
          var stock = this.stockcodes;
          this.stockcodes = stock.replace(/\(.*\)/g,'');
        }
      },
      //股票输入触发事件
      change(e){
//        console.log(this.stockcode);
        this.clearData();
        this.diffNum = this.$route.query.diff;//实际占款天数
        if(this.stockcodes.length === 6){
          this.stockcode = this.stockcodes;
          this.$emit('handleIt',0);
          if(this.stockcode in repoconfig.repoData){
            this.dayNum = repoconfig.repoData[this.stockcode]; //期限数
            var sType = this.stockcode.substr(0,3);
            if(sType === '204'){
               this.dayNums = '上海国债逆回购'+repoconfig.repoData[this.stockcode];
               this.sc = 'SHACCOUNT';
             }else if(sType === '131'){
              this.dayNums = '深圳国债逆回购'+repoconfig.repoData[this.stockcode];
              this.sc = 'SZACCOUNT';
              }
            let type    = this.stockcode.substr(0,3);
            if(type === '204'){
              this.VOLUME = '0.005';
              this.sMoney = 100000;
            }else if(type === '131'){
              this.VOLUME = '0.001';
              this.sMoney = 1000;
            }
          }
          this.nowDate = utils.manyDays(0);
          this.dateType();
          this.getWtaccount();
        }
      },
      //五档数据点击
      greet(e){
        if(this.fiveData[e] && !isNaN(parseFloat(this.fiveData[e]))){
          this.priceData = this.fiveData[e];
          this.feeCal();
        }
      },
      //计算收益和费用
      feeCal(){
        if(this.stockcode == ''){
          return;
        }
        if(this.volume == ''){
          return;
        }

        if(this.priceData === ''){
          return;
        }
         let sFee = (Number(this.volume)*(Number(repoconfig.repoFee[repoconfig.repoData[this.stockcode]])/100)).toFixed(2);
        this.sFee    = sFee;
        var day = 365;
        if(repoconfig.repoSH.indexOf(this.stockcode)>-1){
          day = 365;
        }
        //let sProfit = ((Number(this.volume)*Number(this.priceData/100))*Number(repoconfig.repoData[this.stockcode])/(day)).toFixed(3);
        let sProfit = ((Number(this.volume)*Number(this.priceData/100))*Number(this.diffNum)/(day)).toFixed(3);
        this.sProfit = isNaN(sProfit)?'--':sProfit;
      },
      //价格的加减
      price(e){
//        console.log(e);
        if(this.WTPriceType != 0){
          return;
        }
        if(e<0){
          if(this.priceData>0 && this.priceData - e>0){
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),3);
          }
        }else{
          if(this.priceData == ''){
            this.priceData = e;
          }else{
            this.priceData = utils.toDecimal2(parseFloat(e)+parseFloat(this.priceData),3);
          }
        }
        this.feeCal();
        if(this.WTACCOUNTTYPEINDEX == '' || this.priceData == ''){
          return;
        }
        this.getCustomers();
      },
      //立即卖出功能
      lendOut(){
        var that = this;
        let index = this.selected;
        let oSendData = {
          wtaccount:this.wtaccountlist[index]['wtaccount'],
          wtaccounttype:this.wtaccountlist[index]['wtaccounttype'],
          stockcode:this.stockcode,
          price:this.priceData,
          volume:(this.volume)/100,
          priceType:0,
          Direction:'s'
        };
//        console.log(oSendData);
//        $.toast("请求中！！！");
        if(this.volume<=0){
          //$.alert('请输入出借资金');
           alert('请输入出借资金');
          return;
        }
        var sType = oSendData.stockcode.substr(0,3);
  
        if(sType === '204'){
               this.names = '上海国债逆回购'+that.dayNum;
             }else if(sType === '131'){
              this.names = '深圳国债逆回购'+that.dayNum;
              }
        $.confirm(
          `<div style="text-align: left;"><p class="gzjy"><span class="circle"></span>股东账号：${oSendData.wtaccount}</p><p class="gzjy"><span class="circle"></span>证券代码：${oSendData.stockcode}</p><p class="gzjy"><span class="circle"></span>证券名称：${this.names}天</p><p class="gzjy"><span class="circle"></span>委托利率：${oSendData.price}%</p><p class="gzjy"><span class="circle"></span>委托金额：${(oSendData.volume)*100}</p></div>`,
          //100}</p><p>实际占款天数:${that.diffNum}天</p></div>`,
          '订单确认',
          function () {
//          $.alert('You clicked Ok button');
         // $.showPreloader();
          service_deal_often.require110(oSendData)
            .then((data)=>{
              alert(data.ERRORMESSAGE);
             // $.hidePreloader();
              if(data.ERRORNO>=0){
                //that.stockcodes = '';
                 that.$TZT.action10061(`/deal/reverseRepo/tradeRecord?answerid=${encodeURIComponent(data.ANSWERNO)}&stockcode=${encodeURIComponent(oSendData.stockcode)}&price=${oSendData.price}&wtmoney=${(oSendData.volume)*100}&wtaccount=${oSendData.wtaccount}&wtaccounttype=${oSendData.wtaccount}&wtaccounttype=${oSendData.wtaccounttype}&gzmc=${encodeURIComponent(that.gzmc)}`);
                // this.$TZT.action10061('/deal/reverseRepo/tradeRecord?answerid=${encodeURIComponent(data.ANSWERNO)}');
               /* that.$TZT.action10061({url:'/deal/reverseRepo/tradeRecord?answerid='+data.ANSWERNO+'&stockcode='+oSendData.stockcode+'&price='+oSendData.price+'&wtmoney='+(oSendData.volume)*100+'&wtaccount='+oSendData.wtaccount+'&wtaccounttype='+oSendData.wtaccounttype+'&gzmc='+that.gzmc});*/
                that.volume = '';
                //that.clearData();
                that.getCustomers();
              }
//              console.log(data);
            })
        });
        /*service_deal_often.require110(oSendData)
         .then((data)=>{
         console.log(data);
         })*/
      },
      //数量的加减
      quantities(e){
//        console.log(e);
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
        this.feeCal();
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
            // $.hidePreloader();
            if(data.GRID0 && data.GRID0.length>1){
              var GRID = data.GRID0;
              GRID.shift();
              if(GRID.length>1){
                 var ln = data.GRID0.length;

           for(var i = 0;i<ln;i++){
              var listData = data.GRID0[i].split('|');
              var hgbz = listData[data.WTACCOUNTTYPEINDEX];
              var dm = listData[data.STOCKCODEINDEX];
              console.log(that.stockcode+that.sc)
              if(hgbz == that.sc&&dm == that.stockcode){
                that.WTACCOUNTTYPEINDEX = listData[data.WTACCOUNTTYPEINDEX];
                that.name = listData[data.STOCKNAMEINDEX];
              }

            }
             that.getfiveData();
              }else {
                var listData = GRID[0].split('|');
                that.WTACCOUNTTYPEINDEX = listData[data.WTACCOUNTTYPEINDEX];
                that.name = listData[data.STOCKNAMEINDEX];
                that.getfiveData();
              }
            }else {
              data.ERRORMESSAGE && $.alert(data.ERRORMESSAGE);
            }
          });
      },
      //获取可卖量
      getCustomers(){
        var that      = this;
        if(that.stockcode.length != 6){
          return;
        }
        /*let index = this.selected;
        if(that.wtaccountlist.length>0){
          that.WTACCOUNT = that.wtaccountlist[index]['wtaccount'];
        }*/
        var oSendData = {
          stockcode   :that.stockcode,
          WTACCOUNTTYPE:that.WTACCOUNTTYPEINDEX,
          WTACCOUNT:that.WTACCOUNT,
          price       :that.priceData,
          PriceType:0,
          accountIndex:2,
          Accountlist:1
        };
       // $.showPreloader();
        service_deal_often.require151(oSendData)
          .then((data)=>{
           // $.hidePreloader();
//            console.log(data);
//            data && data.fiveData && that.$set('fiveData', data.fiveData);
            if(!that.diffNum||that.diffNum=="--"){
              that.diffNum = (data.FUNDUSEDDAYS).charAt(0);
            }
            that.selected = 0;
            if(data && data.wtaccountlist){
              that.$set('wtaccountlist',data.wtaccountlist);
              if(that.WTACCOUNTNAME === '选择股东账号'){
                that.$set('WTACCOUNTNAME',data.wtaccountlist[that['WTACCOUNTINDEX']]['wtaccount']);
              }
            }
            if(data.wtaccountlist){
              that.volumes = data.wtaccountlist[0].volume*100;
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
           // $.hidePreloader();
//            console.log(data);

            data && data.fiveData && that.$set('fiveData', data.fiveData);
            if(that.priceData == '' && data.PRICE){
              that.priceData = data.PRICE;
              that.newPrice = data.PRICE+'%';
              that.price(0);
            }
          })
      },
      wtTypeFunc(aIndex){
        this.WTTYPEINDEX = aIndex;
        this.WTPriceType = this.WTTYPE[aIndex]['id'];
        this.WTTYPENAME = this.WTTYPE[aIndex]['name'];
        this.isWTTYPEFunc();
      },
      wtAccountFunc(aIndex){
        this.WTACCOUNTINDEX = aIndex;
        this.selected = aIndex;
        this.WTACCOUNTNAME = this.wtaccountlist[aIndex]['wtaccount'];
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
        this.wtaccountlist = [];
        this.WTTYPE = [];
        this.gridSZ = [];
        this.stockList = [];
        this.downPrice = '';
        this.newPrice = '';
        this.upPrice = '';
        this.FUNDTITLE = '';
        this.USABLE = '';
        this.dayNum = '';
        this.diffNum = '';
        this.kydate = '';
        this.kqdate = '';
        this.nowDate = '';
        this.stockcode = '';
        this.VOLUME = '0.001';
        this.sFee = '--';
        this.sProfit = '--';
        this.selected = 0;
        this.WTACCOUNTINDEX = 0;
        this.isStockList = false;
        this.isWTACCOUNT = false;
        for(var n in this.fiveData){
          if(n === 'sPrec'){
            this.fiveData[n] = 0;
          }else {
            this.fiveData[n] = '--';
          }
        }
        this.$emit('handleIt',0);
      }
    },
    watch: {
      WTACCOUNTINDEX: function(val) {
        if(val == 0){
          return;
        }
        this.WTACCOUNT = this.wtaccountlist[val]['wtaccount'];
        this.WTACCOUNTTYPEINDEX = this.wtaccountlist[val]['wtaccounttype'];
        this.WTACCOUNTINDEX = 0;
        this.getCustomers();
      },
      priceData(val,old){
        if(val == old){
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
          this.stockcodes = val+'   '+this.stockcode;
          this.gzmc = val;
        }
      }
    },
    filters: {
      //实际年化收益率
      riseData(val){
        if(!val){
          return '';
        }
        var rise = utils.toDecimal2((val*this.dayNum/this.diffNum),3)||'--';
        return rise;
      },
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
          return '委托价格'
        }
      },
      wtaccountname(val){
        if(!val || val == ''){
          return '选择股东账号';
        }
        if(val == '选择股东账号'){
          return val;
        }else {
          return val
         //  return val+'(股东账号)'
        }
      }
    },
    events:{
      handleIt(msg){
        this.msg = msg;
//        console.log(msg);
        if(msg == 0){
          this.$broadcast('parent-stockmin',this.stockcode);
        }
      },
      updateStock(code){
        this.stockcodes = code;
        this.change();
      }
    },
    components:{
      templates,
      Swipe,
      SwipeItem,
      stockmin
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/stockbuy_gz.less";
  @color-split: #fff; 
  .content {
 -webkit-overflow-scrolling: touch;

}
  .swipe-indicators{
    bottom:0px;
  .swipe-indicator.active{
    background: @color-text-secondary;
  }
  }
  .my-swipe {
   /* height: 100%;*/
    height: 220px;
    overflow: inherit;
    margin-top: 140px;
  }
  .slide2 {
    color: #000;
  }
  .explain{
    padding-top: 15.5rem;
  .cont-wrap{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
  }
  }
  .header{
    width: 100%;
    background-color: @color-bg-threedary;
    height:3rem;
    font-size:0.7rem;
    padding:0.6rem 0 0.4rem;
    position: relative;
  .hairline(bottom,@color-split);
  .header_left{
    display: inline-block;
    width: 30%;
    text-align: center;
    height: 1.9rem;
    position: relative;
  .hairline(right,@color-split);
  }
  .header_left p:nth-child(2){
    position:relative;
    top: -0.2rem;
  }
  .zjzy_day{
    color: @color-bg-rise;
    font-size: 1.0rem;
    font-weight: 500;
  }
  .calendar{
    display: inline-table;
    width: 1.0rem;
    height: 1.0rem;
    background: url('../../../../assets/img/calendar.png') no-repeat;
    background-size: 1.0rem;
    margin-left: 10px;
  }
  .header_right{
    display: inline-block;width: 65%;
    position: absolute;
    top: 0.6rem;
    margin-left: 5%;
  span{display: inline-block;width: 30%;text-align: center;}
  }
  .header_right p:first-child{
  span{height: 21px; background-color: @color-text-gray-more;}
  span.to_day{
    background-color: #4cb5e6;
    color: @color-text;
    position: relative;
  }
  span.to_day:after{
    content:'';
    display: inline-block;
    width: 14.85px;
    height: 14.85px;
    position:absolute;
    right:-7.5px;
    top: 3px;
    background-color: #4cb5e6;
    z-index: 999;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);

  }
  span:nth-child(2){position: relative;}
  span:nth-child(2):after{
    content:'';
    display: inline-block;
    width: 13.85px;
    height: 13.85px;
    border-bottom: 1px solid @color-text-gray-more;
    border-top: 1px solid @color-text-gray-light;
    border-right: 1px solid @color-text-gray-light;
    border-left: 1px solid @color-text-gray-more;
    position:absolute;
    right:-7.5px;
    top: 3px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  }
  .header_right p:nth-child(2){
    font-size: 12px;
    margin-top: 0.2rem;
  span.to_day{color: #4cb5e6;}
  }
  }
  .cont{

  .cont_right{

    .five-data{
      line-height: 0.8rem;
      padding: 0.2rem 0.1rem;
      :nth-child(1){
        width: 33.33%;
        color: #3d3d3d;
      }
      :nth-child(2){
        width: 33.33%;
        text-align: center;
      }
      :nth-child(3){
        width: 33.33%;
        text-align: right;
        white-space: nowrap;
        word-break: break-all;
        color: #919191;
      }
    }
  }
  .list-text{
    height: 1.2rem;
  }
  }
  .line{
    position: relative;
    .hairline(bottom,@color-split);
  }
  input[type="text"]:disabled {
     background-color: #ddd; 
    height: 1.5rem;
    webkit-opacity: 1;
    opacity: 1;
    color: #444;
  }
  input[type="number"]:disabled {
    /* background-color: #fff; */
    height: 1.5rem;
    webkit-opacity: 1;
    opacity: 1;
    color: #444;
  }
  .AH{
  margin: 0.2rem 0.2rem 0;
  border: 1px solid #e2e2e2;
  font-size: 0.6rem;
  padding:0 0.2rem;
  .left{
    display: inline-block;
    width: 60%;
    .AHfudu,.AHprice{
      margin-left: 1rem;
    }
  }
  .right{
    display: inline-block;
    width: 40%;
    text-align: right;
  }
  .fill{
     color:@color-fill;
   }
  .rise{
    color:@color-rise;
  }
}
.stock_tab {
  padding: 0 5px;
  background: #fff;
  margin-top: 6px;
  border-top: 1px solid #e2e2e2;
  ul {
     height: 32px;
     line-height: 32px;
     width: 100%;
     display: table;
    border-bottom: 1px solid #DDD;
      li {
        display: table-cell;
        a {
          display: block;
          text-align: center;
          font-size: 16px;
          color: #000;
          text-decoration: none;
        }
      }
      li.active a {
        color: #00a9f8;
        border-bottom: 2px solid #00a9f8;
      }
   }
}
.tabs .content{
  position: inherit;
}
.zqpz{
    padding-left: 15px;
    padding-top: 10px;
    height: 65px;
    border-bottom: 1px solid #f4f4f4;
}
.zqpz p:nth-child(1){
     font-size: 14px;
    color: #919191;
}
.zqpz p:nth-child(2){
    font-weight: 600;
    color: #3d3d3d;
}
  @media screen and (max-width:320px) {
   .zqpz p:nth-child(2){
    font-weight: 600;
    color: #3d3d3d;
    font-size:16px;
  }
}

.zqpzcontent{
   font-size: 14px;
    /* height: 70px; */
    padding-bottom: 1px solid #f4f4f4;
    border-bottom: 1px solid #f5f5f5;
    padding: 15px 15px;
    background: #f4f4f4;
    color: #919191;
}
.zqpzcontent .sy{
     /*  float: left; */
}
.sy p span{
  color: #f43438;
}
.zqpzcontent .date{
     /*  float: right; */
}
.gddm,.jyje,.wtll,.kyzj{
  color: #919191;
  font-size: 13px;
}
.kyzj{
  padding: 7px 0;
}
.theme-white .list-block input[type="number"]{
  color:#3d3d3d;
   font-size: 17px;
   text-align: left ! important;
   padding: 0;
}
.kjzj input[type="number"]{
  color:#3d3d3d;
   font-size: 12px ! important;
}
.select_active{
 /*  border-bottom: 1px solid #f4f4f4; */
  font-size: 17px;
  position: relative;
}
.select_active:after{
          content: '';
          position: absolute;
          width: 200%;
          height: 1px;
          background: #eee;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          z-index: 1;
}
.select_active:after{
    bottom: 0;
  left: 0;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
.list-price{
  height: 40px;
 /*  border-bottom: 1px solid #f4f4f4; */
  padding-top: 5px;
}

.list-price:after{
          content: '';
          position: absolute;
          width: 200%;
          height: 1px;
          background: #eee;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          z-index: 1;
}
.list-price:after{
    bottom: 0;
  left: 0;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #919191; opacity:1; 
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #919191;opacity:1;
}

input:-ms-input-placeholder{
    color: #919191;opacity:1;
}

input::-webkit-input-placeholder{
    color: #919191;opacity:1;
}

</style>
