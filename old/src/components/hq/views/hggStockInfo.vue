<template>
  <component :is="footer" keep-alive></component>
  <div class="content" @click="modalstock">
    <div class="content"><!--v-pull-to-refresh="loadMore"-->
      <component :is="currenthead" keep-alive></component>
      <div v-if="isZqShow" class="zq_box">
        <p>回购期限：{{RepurDay}}</p><p>实际占款天数：<span class="red">{{possesDay}}</span></p>
      </div>
      <div v-if="isGzShow" class="zq_box">
        <p>转让状态：<span class="red">{{gzZrStateName}}</span></p><p>转让类型：<span class="red">{{gzZrTypeName}}</span></p>
      </div>
      <div v-if="isGzYxgShow" class="zq_box">
        <p style="font-size:12px;width:36%;transform: scale(0.8);margin-left: -10px;">起息日：<span class="red">{{yxgData.valueDate}}</span></p><p style="font-size:12px;width:18%;transform: scale(0.8);margin-left: -5px;">{{yxgData.isKehuis=='N'?'不可回售':'可回售'}}</p><p style="font-size:12px;width:18%;transform: scale(0.8);margin-left: -5px;">{{yxgData.isKezhuangg=='N'?'不可转股':'可转股'}}</p><p style="font-size:12px;width:36%;transform: scale(0.8);margin-left: -10px;">票面股息率：<span class="red">{{yxgData.dividendYield}}</span></p>
      </div>
      <div class="AH" v-show="isAH" @click="AHclick">
        <span class="left"><span class="AHname">{{AHData.name}}</span><span class="AHprice {{AHData.m_AHRatio | isUP}}">{{AHData.m_AHPrice}}</span><span class="AHfudu {{AHData.m_AHRatio | isUP}}">{{AHData.m_AHRatio}}</span></span><span class="right">溢价(A/H):{{AHData.m_AHPremiumRate}}</span>
      </div>
      <div class="stock_tab chart_tab">
        <ul>
          <li v-for="canvasTab in canvasTabs" @click.stop="choose($index,canvasTab.id)" :class="{'active':$index===selected}"><a href="javascript:void(0);" id="{{canvasTab.id}}">{{canvasTab.tabName}}<span class="dot-bottom" v-if="$index>4"></span></a></li>
        </ul>
        <p class="select-vule" v-show="isMins"><span v-for="items in minsData" @click.stop="getMins($index)" :class="{'active':$index===selectedMins}">{{items.name}}</span></p>
      </div>

      <div class="tabs">
        <component :is="currentView" keep-alive v-bind:minsid="minsid" v-ref:ref2></component>
      </div>
      <stock-info-swipe v-if="fiveRange"  v-ref:ref3></stock-info-swipe>
      <div class="stock_tab" v-show="isView1">
        <ul>
          <li v-for="canvasTab in Tabs1" @click="choose($index,canvasTab.id,1)" :class="{'active':$index===selected1}"><a href="javascript:void(0);" id="{{canvasTab.id}}">{{canvasTab.tabName}}</a></li>
        </ul>
      </div>
      <div class="tabs">
        <component :is="currentView1" keep-alive v-ref:ref4></component>
      </div>
      <div class="stock_tab" v-show="isView2">
        <ul>
          <li v-for="canvasTab in Tabs2" @click="choose($index,canvasTab.id,2)" :class="{'active':$index===selected2}"><a href="javascript:void(0);" id="{{canvasTab.id}}">{{canvasTab.tabName}}</a></li>
        </ul>
      </div>
      <div class="tabs" style="position: relative;">
        <component :is="currentView2" keep-alive v-if="isView2" v-ref:ref1></component>
      </div>
    </div>
  </div>
</template>

<script>
    //head
    import service_hq_often from '../service/common/service_hq_often'

    import numToChinese from '../scripts/numToChinese.js';

    import tztStockType from '../scripts/tztStockType.js';
    import hsHead from '../ons/stockInfo/hsHead'
    import markHead from '../ons/stockInfo/markHead'
    import HKHead from '../ons/stockInfo/hHKHead.vue'
    import HKZHead from '../ons/stockInfo/hHKZHead.vue'
    import QHHead from '../ons/stockInfo/QHHead.vue'
    import GGQQHead from '../ons/stockInfo/GGQQHead.vue'


    require('vue-swipe/dist/vue-swipe.css');
    import stockInfoSwipe from '../ons/stockInfo/stockInfoSwipe'

    import min from './hqStock/min'
    import fiveMin from './hqStock/fiveMin'
    import dayKLine from './hqStock/dayKLine'
    import weekKLine from './hqStock/weekKLine'
    import monthKLine from './hqStock/monthKLine'
    import mins from './hqStock/mins.vue'

    //tab1 新闻 公告 研报 研究等
    import more from './hqF10/more'
    import handicap from './hqF10/handicap'
    import ups from '../ons/stockInfo/ups.vue'
    import downs from '../ons/stockInfo/downs.vue'
    import turnoverrate from '../ons/stockInfo/turnoverRate.vue'
    import volume from '../ons/stockInfo/volume.vue'
    import news from './hqF10/news.vue'
    import notice from './hqF10/notice.vue'
    import reports from './hqF10/reports.vue'

    //tab2
    import capitalflows from './hqF10/capitalflows'
    import positions from './hqF10/positions';
    import introduction from './hqF10/introduction_old.vue'; //简况
    import ggintroduction from './hqF10/ggintroduction_old.vue'; //港股简况
    import finance from './hqF10/finance_old.vue';
    import shareholder from './hqF10/shareholder_old.vue';
    import interests from './hqF10/interests_old.vue';

    import utils from '../../../util/util'

    //footer
    import footer from './hfooter.vue'

    export default {
        data () {
            return {
                loading:false,
                canvasTabs:[
                    {tabName:'分时',id:'min'},
                    {tabName:'五日',id:'fiveMin'},
                    {tabName:'日K',id:'day'},
                    {tabName:'周K',id:'week'},
                    {tabName:'月K',id:'month'},
                    {tabName:'分钟',id:'mins'}
                ],
                minsData:[
                    {name:'1分钟',id:'9'},
                    {name:'5分钟',id:'1'},
                    {name:'15分钟',id:'2'},
                    {name:'30分钟',id:'3'},
                    {name:'60分钟',id:'4'}
                ],
                Tabs1:[

                ],
                Tabs2:[

                ],
                selected:0,
                selectedTemp:0, //记录点击上一次的值
                selected1:0,
                selected1Temp:0,
                selected2:0,
                selected2Temp:0,
                currentView:'view_min',
                currentView1:'',
                currentView2:'',
                fiveRange:false,
                currenthead:'',
                NEWMARKETNO:'',
                isView1:true,
                isView2:true,
                isAH:false,
                AHData:{},
                HKMinData:{},
                isLoading:false,
                isMins:false,
                minsid:'',
                selectedMins:'',
                footer:'view_footer',

                isZqShow:false,
                RepurDay:'',
                possesDay:'',

                isGzShow:false,
                gzZrStateName:'--',
                gzZrTypeName:'--',

                isGzYxgShow:false, //优先股
                yxgData:{}
            }
        },
        attached(){
//    $.init();
            this.inits();
            this.$TZT.action10077(this);
        },
        methods:{
            dealRefreshTimer(){
//      new this.$options.components.view_min().queryHKMinData(this.$options);
                this.queryHKMinDataTime();
                /*if(this.$refs.ref2.queryHKMinDataTime){
                  this.$refs.ref2.queryHKMinDataTime();
                }else {
                  this.$refs.ref2.$parent.$children[0].queryHKMinDataTime();
                }*/
                this.$refs.ref2 && this.$refs.ref2.queryHKMinData && this.$refs.ref2.queryHKMinData();
                this.$refs.ref2 && this.$refs.ref2.queryKLineData && this.$refs.ref2.queryKLineData();
                this.$refs.ref3 && this.$refs.ref3.dealRefreshTimer && this.$refs.ref3.dealRefreshTimer();
                this.$refs.ref4 && this.$refs.ref4.getlzgData && this.$refs.ref4.getlzgData();
                this.$refs.ref4 && this.$refs.ref4.getCustomers && this.$refs.ref4.getCustomers();
                this.$refs.ref1 && this.$refs.ref1.getCustomers && this.$refs.ref1.getCustomers();
            },
            inits(marketno){
//      console.log(this);
                this.currenthead = '';
                this.currentView = 'view_min';
                this.currentView1 = '';
                this.currentView2 = '';
                this.fiveRange = false;
                this.isAH = false;
                this.selected = 0;
                this.selected1 = 0;
                this.selected2 = 0;
                this.isMins = false; //清除分钟展开状态
                this.isGzShow = false;
                this.isGzYxgShow = false;
                this.yxgData = {};
                this.selectedMins='';
                this.canvasTabs[5] = {tabName:'分钟',id:'mins'};
                this.Tabs1 = [];
                this.Tabs2 = [];
                if(marketno){
                    this.$route.query.marketno = marketno;
                }
                this.NEWMARKETNO = this.$route.query.marketno;
                if(this.currentView != 'view_min'){
                    this.$refs.ref2.$parent.$children[0].queryHKMinDataTime();
                }
                if(this.NEWMARKETNO){
                    this.getEXtHqType();
                    this.getfiveType();
                    this.getTabs1();
                    this.getTabs2();
                }
                this.queryHKMinDataTime();
            },
            getEXtHqType(){
                var view = 'hsHead';
                if(tztStockType.MakeHKMarket(this.NEWMARKETNO)){
                    if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
                        view = 'HKHead';
                    }else {
                        view = 'HKZHead';
                    }
                }else if(tztStockType.MakeQHMarket(this.NEWMARKETNO)){
                    view = 'QHHead';
                }else if(tztStockType.MakeWPMarket(this.NEWMARKETNO)){//外盘
                    view = 'HKZHead';
                }else {
                    if(tztStockType.MakeIndexMarket(this.NEWMARKETNO) || tztStockType.MakeBlockIndex(this.NEWMARKETNO)){
                        view = 'markHead';
                    }else if(tztStockType.MakeGGQQMarket(this.NEWMARKETNO)){
                        view = 'GGQQHead';
                    }
                }
                this['currenthead']=view;
            },
            getfiveType(){
                if(tztStockType.MakeStockMarketStock(this.NEWMARKETNO) || tztStockType.MakeGGQQMarket(this.NEWMARKETNO) || tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
                    this.fiveRange = true;
                }
            },
            getTabs1(){
                if(tztStockType.MakeIndexMarket(this.NEWMARKETNO) || tztStockType.MakeBlockIndex(this.NEWMARKETNO)){
                    this.Tabs1 = [
                        {tabName:'盘口',id:'handicap'},
                        {tabName:'涨幅榜',id:'ups'},
                        {tabName:'跌幅榜',id:'downs'},
                        {tabName:'换手率榜',id:'turnoverrate'}
                    ];
                    this.currentView1 = 'view_handicap';
                }else if(tztStockType.MakeQHMarket(this.NEWMARKETNO) || tztStockType.MakeWHMarket(this.NEWMARKETNO) || tztStockType.MakeWPMarket(this.NEWMARKETNO)){
                    this.Tabs1 = [];
                    this.currentView1 = '';
                }else if(tztStockType.MakeHKMarket(this.NEWMARKETNO)){
                    if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
                        this.Tabs1 = [
                            {tabName:'盘口',id:'handicap'},
                            {tabName:'新闻',id:'news'},
                            {tabName:'公告',id:'notice'}
                        ];
                        this.currentView1 = 'view_handicap';
                    }else {
                        this.Tabs1 = [
                            {tabName:'涨幅榜',id:'ups'},
                            {tabName:'跌幅榜',id:'downs'},
                            {tabName:'成交量榜',id:'volume'}
                        ];
                        this.currentView1 = 'view_ups';
                    }
                }else {
                    this.Tabs1 = [
                        {tabName:'盘口',id:'handicap'},
                        {tabName:'新闻',id:'news'},
                        {tabName:'公告',id:'notice'},
                        {tabName:'研报',id:'reports'},
                        {tabName:'相关',id:'more'}
                    ];
                    this.currentView1 = 'view_handicap';
                }
            },
            getTabs2(){
                if(tztStockType.MakeIndexMarket(this.NEWMARKETNO)
                    || tztStockType.MakeQHMarket(this.NEWMARKETNO)
                    || tztStockType.MakeWHMarket(this.NEWMARKETNO)
                    || tztStockType.MakeWPMarket(this.NEWMARKETNO)
                    || tztStockType.MakeGGQQMarket(this.NEWMARKETNO)
                    || tztStockType.MakeBlockIndex(this.NEWMARKETNO)
                ){
                    this.Tabs2 = [];
                    this.currentView2 = '';
                }else if(tztStockType.MakeHKMarket(this.NEWMARKETNO)){
                    if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
                        this.Tabs2 = [
                            {tabName:'简况',id:'ggintroduction'},
                            {tabName:'财务',id:'finance'},
                            {tabName:'权益',id:'interests'}
                        ];
                        this.currentView2 = 'view_ggintroduction';
                    }else {
                        this.Tabs2 = [];
                        this.currentView2 = '';
                    }
                }else if(tztStockType.MakeThreeBordMarket(this.NEWMARKETNO)){
                    this.Tabs2 = [
                        {tabName:'简况',id:'introduction'},
                        {tabName:'财务',id:'finance'},
                        {tabName:'股东',id:'shareholder'}
                    ];
                    this.currentView2 = 'view_introduction';
                }else{
                    this.Tabs2 = [
                        {tabName:'资金',id:'capitalflows'},
//          {tabName:'持仓',id:'positions'},
                        {tabName:'简况',id:'introduction'},
                        {tabName:'财务',id:'finance'},
                        {tabName:'股东',id:'shareholder'}
                    ];
                    this.currentView2 = 'view_capitalflows';
                }
                // TODO 屏蔽行情下面显示；
                this.currentView1 = '';
                this.currentView2 = '';
                if(this.currentView1 == ''){
                    this.isView1 = false;
                }else {
                    this.isView1 = true;
                }
                if(this.currentView2 == ''){
                    this.isView2 = false;
                }else {
                    this.isView2 = true;
                }
            },
            clickdata(index){

            },
            choose(index,id,ln) {
                ln = ln || '';
                var that = this;
                if(id === 'mins'){
                    if(this.isMins){
                        this.isMins = false;
                        this.canvasTabs.forEach((items,index)=>{
                            if('view_'+items.id == that.currentView){
                                that['selected'+ln]=index;
                            }
                        });
                    }else {
                        this['selected'+ln+'Temp'] = this['selected'+ln];
                        this['selected'+ln]=index;
                        this.isMins = true;
                    }
                    return;
                }
                if(id != 'minss'){
                    this.isMins = false;
                    this.selectedMins = '';
                    this.canvasTabs[5]['tabName'] = '分钟';
                }
                this['selected'+ln]=index;
                this['currentView'+ln]='view_'+id;
            },
            AHclick(){
                if(this.AHData && this.AHData.m_AHCode){
                    this.$TZT.action1964(`/hq/ggStockInfo?stockcode=${this.AHData.m_AHCode}`);
                }
            },
            transfer(data,quotedata){
                console.log(data);
                if(data.m_isAH === 'Y'){
                    this.isAH = true;
                    this.AHData = {
                        name:(data.m_AHCode.indexOf('H')>-1?'H股':'A股'),
                        m_AHCode:data.m_AHCode,
                        m_AHPrice:data.m_AHPrice,
                        m_AHRatio:data.m_AHRatio,
                        m_AHTime:data.m_AHTime,
                        m_AHPremiumRate:data.m_AHPremiumRate
                    };
                }else {
                    this.isAH = false;
                    this.AHData = {};
                }
                data.quotedata = $.extend({},quotedata);
                this.$broadcast('parent-minStockInfo', data);
            },
            queryHKMinDataTime(){
                this.isLoading = false;
                var that      = this;
                that.stockcode = that.$route.query.stockcode;
                var oSendData = {
                    stockcode   :that.stockcode,
                    Level       :'2',
                    startPos    :'0',
                    NewMarketNo :'0'
                };
                service_hq_often.require20109(oSendData)
                    .then((data)=>{

                        that.isLoading = false;
                        var STOCKPROP = (data.STOCKPROP?data.STOCKPROP:"");
//          var STOCKSTOP = data.WTHead.XFlag?data.WTHead.XFlag:""

                        var oData = {
                            BINHead   :data.BINHead,
                            TIMEHead  :data.TIMEHead,
                            AMOUNT    :data.AMOUNT,
                            MAXCOUNT  :data.MAXCOUNT,
                            BEGINDATE :data.BEGINDATE,
                            ENDDATE   :data.ENDDATE,
                            ERRORNO   :data.ERRORNO
                        };
                        var listObj = {};
                        if(STOCKPROP){
                            listObj['RZRQ'] = (STOCKPROP[3] == 1?true:false) || (STOCKPROP[4] == 1?true:false);
                            listObj['Tong'] = (STOCKPROP[13] == 1?true:false);
                            listObj['FXJS'] = (STOCKPROP[5] == 1?true:false);
                            listObj['TSZL'] = (STOCKPROP[6] == 1?true:false);
                            listObj['ISH'] = (STOCKPROP[7] == 1?true:false);
                            listObj['ISZ'] = (STOCKPROP[8] == 1?true:false);
                            listObj['SBGP'] = (STOCKPROP[9] == 'T'?true:false);
                            listObj['SBLW'] = (STOCKPROP[9] == 'B'?true:false);
                            listObj['SBXQ'] = (STOCKPROP[9] == 'O'?true:false);
                            listObj['SBXZ'] = (STOCKPROP[9] == 'P'?true:false);
                        }
                        listObj['AH'] = this.isAH;
                        //是否为质押债券产品，增加标志和回购期限显示
                        var isShzy = data.NEWMARKETNO == '4355' && that.stockcode.indexOf('204') == 0,
                            isSzzy = data.NEWMARKETNO == '4611' && that.stockcode.indexOf('131') == 0;
                        if (isShzy || isSzzy) {
                            that.isZqShow = true;
                            listObj['ZYZQ'] = true;
                            that.RepurDay = data.quoteAdd ? numToChinese.change(data.quoteAdd.RepurDay)+'天期' : '--';
                            that.possesDay = data.quoteAdd ? data.quoteAdd.possesDay+'天' : '--';
                        }else{
                            that.isZqShow = false;
                            listObj['ZYZQ'] = false;
                        }
                        if(tztStockType.MakeStockMarketStock(this.NEWMARKETNO) && tztStockType.MakeHSMarket(this.NEWMARKETNO) && tztStockType.MakeThreeBordMarket(this.NEWMARKETNO)){
                            if(!data.quoteAdd){
                                that.isGzShow = true;
                                let oTempData = this.getGzZrStateType(STOCKPROP);
                                that.gzZrStateName = oTempData.state;
                                that.gzZrTypeName = oTempData.type;
                            }else{
                                that.isGzYxgShow = true;
                                that.yxgData = data.quoteAdd;
                            }
                        }else{
                            that.isGzShow = false;
                            that.isGzYxgShow = false;
                        }

                        that.$route.router.app.title = data.BINHead.StockName;
                        that.$route.router.app.barstockcode =that.stockcode;
                        that.$route.router.app.stocktypenew =listObj;
//          that.$broadcast('parent-chartMindata', oData);
                        var newMin = oData;
                        newMin.WTHead = data.WTHead;
                        newMin.TIMEHead = data.TIMEHead;
                        that.$broadcast('getHKTime', newMin);
                        that.$broadcast('getstockprop',data.STOCKPROP,data.NEWMARKETNO);
                        // that.$broadcast('footerEvent',data.NEWMARKETNO); //传递footerEvent
                        that['childmin'](data.WTHead,data.NEWMARKETNO,data.quoteAdd); //传递给子组件
                    });
            },
            'childmin':function(chartdata,NEWMARKETNO,quotedata){
//      console.log(chartdata);
                if(!this.NEWMARKETNO){
                    this.NEWMARKETNO = NEWMARKETNO;
                    this.inits(NEWMARKETNO);
                }
                this.transfer(chartdata,quotedata);
            },
            getMins(index){
                var objMins = this.minsData[index];
                this.isMins = false;
                this.canvasTabs[5]['tabName'] = objMins.name;
                this.minsid = objMins.id;
                this.selectedMins = index;
                this.choose(5,'minss');
            },
            modalstock(){
                $(".mr-box").css("display","none");
                $(".mc-box").css("display","none");
                if(this.isMins){
                    this['selected'] = this['selectedTemp'];
                    this.isMins = false;
                }
            },
            /**
             * [getGzZrStateName 获取股转类型及状态]
             * @parent string stockProp 股票属性
             * @return {[type]} [description]
             */
            getGzZrStateType(stockProp){
                var oTemp = {state:"--",type:"--"};
                if(!stockProp) return oTemp;
                if(!!stockProp && stockProp.length > 10){
                    switch(stockProp[10]){
                        case 'T':
                            oTemp.type = '协议转让';
                            break;
                        case 'M':
                            oTemp.type = '做市转让';
                            break;
                        case 'B':
                            oTemp.type = '集合竞价+连续竞价转让';
                            break;
                        case 'C':
                            oTemp.type = '集合竞价转让';
                            break;
                        case 'O':
                            oTemp.type = '其他类型';
                            break;
                        default:
                            oTemp.type = '--';
                            break
                    }
                }
                if(!!stockProp && stockProp.length > 11){
                    switch(stockProp[11]){
                        case 'N':
                            oTemp.state = '正常状态';
                            break;
                        case 'Y':
                            oTemp.type = '首日挂牌';
                            break;
                        case 'D':
                            oTemp.type = '新增股票挂牌转让';
                            break;
                        default:
                            oTemp.type = '--';
                            break
                    }
                }
                return oTemp;
            }
        },
        components:{
            'hsHead'             :hsHead,
            'markHead'           :markHead,
            'HKZHead'            :HKZHead,
            'HKHead'             :HKHead,
            'QHHead'             :QHHead,
            'GGQQHead'           :GGQQHead,
            stockInfoSwipe,
            'view_min'           :min,
            'view_fiveMin'       :fiveMin,
            'view_day'           :dayKLine,
            'view_week'          :weekKLine,
            'view_month'         :monthKLine,
            'view_minss'         :mins,

            'view_more'          :more,
            'view_ups'           :ups,
            'view_downs'         :downs,
            'view_turnoverrate'  :turnoverrate,
            'view_volume'        :volume,
            'view_news'          :news,
            'view_notice'        :notice,
            'view_reports'       :reports,
            'view_handicap'      :handicap,


            'view_capitalflows'  :capitalflows,
            'view_positions'     :positions,
            'view_introduction'  :introduction,
            'view_finance'       :finance,
            'view_shareholder'   :shareholder,
            'view_interests'   :interests,

            //底部买入卖出按钮
            'view_footer'        :footer,
        },
        events:{
            'child-min':function () {
                if(!this.isLoading){
                    this.queryHKMinDataTime();
                }
            }
        },
        route:{
            canReuse(){
                console.log(3);
                this.inits();
                this.$TZT.action10077(this);
//      transition.next()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
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
    position: relative;
    border-top: 1px solid #e2e2e2;
    ul {
      height: 32px;
      line-height: 32px;
      width: 100%;
      display: table;
      border-bottom: 1px solid #DDD;
      li {
        position: relative;
        display: table-cell;
        a {
          display: block;
          text-align: center;
          font-size: 16px;
          color: #000;
          text-decoration: none;
        }
        .dot-bottom{
          font-size: 0;
          line-height: 0;
          border-width: 4px;
          border-color: #000;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
          vertical-align: middle;
          position: absolute;
          top:40%;
        }
      }
      li.active a {
        color: #00a9f8;
        border-bottom: 2px solid #00a9f8;
        .dot-bottom{
          border-color: #00a9f8;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
    .select-vule{
      position: absolute;
      background: #fff;
      right: 0.5rem;
      top:1.2rem;
      width: 4rem;
      height: 8rem;
      z-index: 10;
      overflow-y: scroll;
      border: 1px solid #00a9f8;
      border-radius: 0.25rem;
      span{
        display: block;
        text-align: center;
        line-height: 1.6rem;
        font-size: 0.7rem;
        position: relative;
        .hairline(bottom, #ccc);
      }
      span.active{
        color:#00a9f8;
      }
    }
  }
  .tabs .content{
    position: inherit;
  }
  .swipe-indicators{
    bottom:-5px;
  }
  .footer~.content{bottom:49px;}
  .zq_box{
    border:1px solid #e2e2e2;font-size: 0.65rem;margin:0.25rem;
    p{
      display: inline-block;
      width: 50%;
      height:1.2rem;
      line-height: 1.2rem;
      text-align: center;
    }
    .red{
      color:#f00;
    }
  }
</style>

