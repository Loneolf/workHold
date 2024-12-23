<template>
  <div class="swipes" style="width: 100%;height: 200px;">
    <div class="time-title"><p class="bg"><span>{{name}}</span><span><em class="{{Last_p | colorDivide Close_p}}">{{Last_p}}</em></span><span><em class="{{m_lUpPrice | isUP}}">{{m_lUpPrice}}</em></span><span><em class="{{m_lUpPrice | isUP}}">{{m_lUpIndex}}</em></span><span>{{total_h}}</span></p></div>
    <time></time>
  </div>
</template>

<script>
  import  time from '../../hq/ons/canvas/time'
  import service_hq_often from '../../hq/service/common/service_hq_often'
  import tztStockType from '../../hq/scripts/tztStockType.js'
  import util from '../../../util/util.js';
  export default {
    data () {
      return {
        HKMinData:{},
        WTHead:{},
        stockcode: '',
        NEWMARKETNO: '',
        Last_h:'-.-',
        m_lAvgPrice:'-.-',
        Last_p:'-.-',
        Close_p:'-.-',
        times:'-.-',
        total_h:'-.-',
        m_lUpPrice:'-.-',
        m_lUpIndex:'-.-',
        m_lx:'-.-',
        old_lx:'-.-',
        name:'',
        isshow:false,
        isZS:true,
        zsname:'领先',
        bIndex:true
      }
    },
    attached(){
      console.log('min');
      this.HKMinData = {};
      this.WTHead = {};
      this.Last_h = '-.-';
      this.m_lAvgPrice = '-.-';
      this.Last_p = '-.-';
      this.Close_p = '-.-';
      this.times = '-.-';
      this.total_h = '-.-';
      this.m_lUpPrice = '-.-';
      this.m_lUpIndex = '-.-';
      this.m_lx = '-.-';
      this.old_lx = '-.-';
      this.name = '';
      this.isshow = false;
      this.NEWMARKETNO = this.$route.query.marketno;
      this.stockcode = this.$route.query.stockcode;
    },
    methods:{
      queryHKMinDataTime(stock){
        var that      = this;
        that.stockcode = that.$route.query.stockcode || stock;
        if(!that.stockcode || that.stockcode == ''){
          return;
        }
        if(that.stockcode.length == 5){
          that.stockcode = 'H'+that.stockcode;
        }
        if(that.stockcode.length != 6){
          return;
        }
        var oSendData = {
          stockcode   :that.stockcode,
          Level       :'2',
          startPos    :'0',
          NewMarketNo :'0'
        };
        service_hq_often.require20109(oSendData)
          .then((data)=>{
            if(data.ERRORNO>=0){
              var oData = {
                BINHead   :data.BINHead,
                TIMEHead  :data.TIMEHead,
                AMOUNT    :data.AMOUNT,
                MAXCOUNT  :data.MAXCOUNT,
                BEGINDATE :data.BEGINDATE,
                ENDDATE   :data.ENDDATE,
                ERRORNO   :data.ERRORNO,
                isNoTouch :true
              };
              that.Last_p = data.WTHead.Last_p;
              that.Close_p = data.BINHead.close_p;
              that.m_lUpPrice = data.WTHead.m_lUpPrice;
              that.m_lUpIndex = data.WTHead.m_lUpIndex;
              that.total_h = util.numTosize(data.WTHead.Total_h);

              that.name = data.BINHead.StockName;
              that.$set('HKMinData',oData);
            }
            that.notify();
          });
      },
      //分时组件
      notify() {
        this.$broadcast('parent-chartMindata', this.HKMinData); //事件传递到行情分时图中
      }
    },
    events:{
      'parent-stockmin':function (stock) {
        if(stock){
          this.queryHKMinDataTime(stock);
        }else {
          this.HKMinData = {};
          this.WTHead={};
          this.stockcode= '';
          this.NEWMARKETNO= '';
          this.Last_h='-.-';
          this.m_lAvgPrice='-.-';
          this.Last_p='-.-';
          this.Close_p='-.-';
          this.times='-.-';
          this.total_h='-.-';
          this.m_lUpPrice='-.-';
          this.m_lUpIndex='-.-';
          this.m_lx='-.-';
          this.old_lx='-.-';
          this.name = '';
          this.isshow = false;
          this.isZS = true;
          this.zsname = '领先';
          this.bIndex = true;
          this.notify();
        }
      }
    },
    components:{
      time
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .h5_difference_time {
    width: 100%;
    height: 100%;
    padding: 16px 10px 10px;
  }
  .h5_difference_time canvas{
    width: 100%;
    height: 100%;
  }
  .swipes{
    position: relative;
    height: 100%;
  }
  .time-title{
    font-size: 0.6rem;
    padding: 0 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: @color-text;
    height: 0.8rem;
    white-space: nowrap;
    word-break: break-all;
    z-index: 10;
    line-height: 0.8rem;
    .bg{
      background: #f3f3f3;
    }
    span{
      margin-left: 0.3rem;
    }
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
  }
</style>


