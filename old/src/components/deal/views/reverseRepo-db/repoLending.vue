<template>
  <div class="explain content native-scroll">
    <div class="cont-wrap">
      <header class="header">
        <div class="header_left">
          <p>资金共占用</p>
          <p><span class='zjzy_day'>{{dayNum}}</span>天<span class="calendar"></span></p>
        </div><div class="header_right">
        <p><span class="to_day">借款</span><span>可用</span><span>可取</span></p>
        <p><span class="to_day">{{nowDate}}</span>/<span>{{kydate}}</span>/<span>{{kqdate}}</span></p>
      </div>
      </header>
      <div class="cont">
        <div class="cont_left list-block">
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><input type="number" v-model="stockcode" @input="change($event)" placeholder="请输入股票代码"></p></div>-->
          <div class="list-abroad margin-bottom"><p class="abroad-cont"><input v-on:blur="blur()" v-on:focus="focus()" type="text" v-model="stockcodes" @input="change($event)" placeholder="请输入股票代码" maxlength="6" max="6" onkeyup="this.value=this.value.replace(/\D/g,'')"></p>
            <div class="select_drop" v-show="isStockList">
              <ul>
                <li v-for="items in stockList" @click="stockListFunc($index)"><a href="javascript:void(0);"><strong style="font-size:0.75rem">{{items.STOCKCODEINDEX}}</strong>{{items.STOCKNAMEINDEX}}</a></li>
              </ul>
            </div>
          </div>
          <!--<div class="list-abroad margin-bottom"><p class="abroad-cont"><select v-model="selected"><option v-for="items in wtaccountlist" value="{{$index}}">{{items.wtaccount}}({{items.name}})</option></select></p></div>-->
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
          <p class="list-price"><span class="minus" v-on:click="price(-0.001)">0.001</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" v-model="priceData" @input="feeCal($event)"></span></span></span><span class="add" v-on:click="price(0.001)">0.001</span></p>
          <p class="shouyilv">实际年华收益率：<span class="rise">{{newPrice}}</span></p>
          <p class="list-price"><span class="minus" v-on:click="quantities(-1)">{{sMoney}}</span><span class="input"><span class="input-border"><span class="input-border-cont"><input type="number" placeholder="可借{{volumes}}" v-model="volume" @input="feeCal($event)"></span></span></span><span class="add" v-on:click="quantities(1)">{{sMoney}}</span></p>
          <p class="list-text">预期收益：<span class="rise">{{sProfit}}</span>元</p>
          <p class="list-text">手续费参考：<span class="rise">{{sFee}}</span>元</p>
          <div class="btn" v-on:click="lendOut">立即借出</div>
        </div><div class="cont_right">
        <div class="cont_right_lr">
          <p class="five-name">即时借贷年利率(%)</p>
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
    <swipe class="my-swipe" :speed="500" :auto="0" :show-indicators="true" :no-drag="true">
      <swipe-item class="slide1"><templates url="reverseRepo/chicang" action="" viewname=""></templates></swipe-item>
      <swipe-item class="slide2"><stockmin></stockmin></swipe-item>
    </swipe>
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
        name:'',
        sMoney:'--',
        sFee:'--',
        sProfit:'--',
        nowDate:'',
        msg:'',
        kydate:'',
        kqdate:'',
        isStockList:false,
        isWTACCOUNT:false,
        WTACCOUNTNAME:'选择股东账号',
        WTACCOUNTINDEX:0,
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
      this.nowDate = utils.manyDays(0);
//      this.$TZT.action10077(this);
    },
    methods:{
      dealRefreshTimer(){
        this.getfiveData();
        if(this.msg === 1){
          this.$emit('handleIt',1);
        }
      },
      //借款，可用，可取
      dateType(date,key){
//        console.log(repoconfig.repoData[this.stockcode]);
        var initddate = utils.manyDays(repoconfig.repoData[this.stockcode]);
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
            if(data.ERRORNO<0){
              return;
            }
            if(!date){
              if(data.NEXT_TRADE_DATE == initddate){
                this.kydate = data.NEXT_TRADE_DATE;
                this.dateType(data.NEXT_TRADE_DATE,'kqdate');
              }else {
                this.dateType(data.NEXT_TRADE_DATE,'kydate');
              }
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
      blur(){
        if(this.stockcodes == this.stockcode && this.name != '' && this.stockcode.length == 6){
          this.stockcodes = this.stockcode+'('+this.name+')';
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
        if(this.stockcodes.length === 6){
          this.stockcode = this.stockcodes;
          if(this.stockcode in repoconfig.repoData){
            this.dayNum = repoconfig.repoData[this.stockcode];
            let type    = this.stockcode.substr(0,3);
            if(type === '204'){
              this.sMoney = 100000;
            }else if(type === '131'){
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
        if(this.fiveData[e]){
          this.priceData = this.fiveData[e];
          this.feeCal();
        }
      },
      //计算收益和费用
      feeCal(){
        if(this.volume == ''){
          return;
        }
        let sFee = (Number(this.volume)*(Number(repoconfig.repoFee[repoconfig.repoData[this.stockcode]])/100)).toFixed(2);
        this.sFee    = sFee;
        if(this.priceData === ''){
          return;
        }
        let sProfit = ((Number(this.volume)*Number(this.priceData))/(360*Number(repoconfig.repoData[this.stockcode]))-sFee).toFixed(2);

        this.sProfit = sProfit;
      },
      //价格的加减
      price(e){
//        console.log(e);
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
          volume:this.volume,
          priceType:0,
          Direction:'s'
        };
//        console.log(oSendData);
//        $.toast("请求中！！！");
        $.confirm(
          `<div style="text-align: left;"><p>股东账号:${oSendData.wtaccount}</p><p>证券代码:${oSendData.stockcode}</p><p>证券名称:${this.name}</p><p>借入价格:${oSendData.price}</p><p>借入数量:${oSendData.volume}</p></div>`,
          '确认借钱',
          function () {
//          $.alert('You clicked Ok button');
          $.showPreloader();
          service_deal_often.require110(oSendData)
            .then((data)=>{
              $.alert(data.ERRORMESSAGE);
              $.hidePreloader();
              if(data.ERRORNO>=0){
                that.stockcodes = '';
                that.volume = '';
                that.clearData();
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
        let index = this.selected;
        if(that.wtaccountlist.length>0){
          that.WTACCOUNT = that.wtaccountlist[index]['wtaccount'];
        }
        var oSendData = {
          stockcode   :that.stockcode,
          WTACCOUNTTYPE:that.WTACCOUNTTYPEINDEX,
//          WTACCOUNT:that.WTACCOUNT,
          price       :that.priceData,
          PriceType:0,
          accountIndex:2,
          Accountlist:1
        };
        $.showPreloader();
        service_deal_often.require151(oSendData)
          .then((data)=>{
            $.hidePreloader();
//            console.log(data);
//            data && data.fiveData && that.$set('fiveData', data.fiveData);
            that.selected = 0;
            if(data && data.wtaccountlist){
              that.$set('wtaccountlist',data.wtaccountlist);
              that.$set('WTACCOUNTNAME',data.wtaccountlist[that['WTACCOUNTINDEX']]['wtaccount']);
            }
            if(data.wtaccountlist){
              that.volumes = data.wtaccountlist[0].volume;
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
//            console.log(data);
            data && data.fiveData && that.$set('fiveData', data.fiveData);
            if(that.priceData == '' && data.PRICE){
              that.priceData = data.PRICE;
              that.newPrice = data.PRICE+'%';
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
        this.kydate = '';
        this.kqdate = '';
        this.nowDate = '';
        this.stockcode = '';
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
        this.$emit('handleIt','1');
      }
    },
    watch: {
      WTACCOUNTINDEX: function(val) {
        this.WTACCOUNT = this.wtaccountlist[val]['wtaccount'];
        this.WTACCOUNTTYPEINDEX = this.wtaccountlist[val]['wtaccounttype'];
        this.getCustomers();
      },
      priceData(val){
        if(val == ''){
          return;
        }
        this.getCustomers();
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
          this.stockcodes = this.stockcode+'('+val+')';
        }
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
          return val+'(股东账号)'
        }
      }
    },
    events:{
      handleIt(msg){
        this.msg = msg;
//        console.log(msg);
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
  @import "../../../../assets/less/stockbuy.less";
  .swipe-indicators{
    bottom:0px;
  .swipe-indicator.active{
    background: @color-text-secondary;
  }
  }
  .my-swipe {
    height: 100%;
    overflow: inherit;
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
      line-height: 0.65rem;
      padding: 0.2rem 0.1rem;
      :nth-child(1){
        width: 30%;
      }
      :nth-child(2){
        width: 30%;
      }
      :nth-child(3){
        width: 40%;
        text-align: right;
        white-space: nowrap;
        word-break: break-all;
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
</style>
