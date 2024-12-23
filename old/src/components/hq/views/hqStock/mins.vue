<template>
  <div class="swipes" style="width: 100%;height: 265px;padding-top: 20px;">
    <div class="time-title" v-show="isshow">
      <p class="">时:<span>{{Time}}</span><span>开:<em class="{{OpenPrice | colorDivide z_closeprice}}">{{OpenPrice}}</em></span><span>高:<em class="{{HighPrice | colorDivide z_closeprice}}">{{HighPrice}}</em></span><span>涨:<em class="{{m_lUpPrice | isUP}}">{{m_lUpPrice}}</em></span></p>
      <p class="">量:<span>{{Total_h}}</span><span>收:<em class="{{ClosePrice | colorDivide z_closeprice}}">{{ClosePrice}}</em></span><span>低:<em class="{{LowPrice | colorDivide z_closeprice}}">{{LowPrice}}</em></span><span>幅:<em class="{{m_lUpPrice | isUP}}">{{m_lUpIndex}}</em></span></p>
    </div>
    <p class="time-text"><span class="averprice5">MA5:{{averprice5}}</span><span class="averprice10">MA10:{{averprice10}}</span><span class="averprice20">MA20:{{averprice20}}</span></p>
    <k-line></k-line>
  </div>
</template>

<script>
  import kLine from '../../ons/canvas/kLine'
  import service_hq_often from '../../../hq/service/common/service_hq_often'
  import util from '../../../../util/util'
export default {
  props: ["minsid"],
  data () {
    return {
      KLineData:{},
      stockcode: this.$route.query.stockcode,
      isshow:false,
      Time:'-.-',
      averprice5:'-.-',
      averprice10:'-.-',
      averprice20:'-.-',
      ClosePrice:'-.-',
      HighPrice:'-.-',
      LowPrice:'-.-',
      m_lUpPrice:'-.-',
      m_lUpIndex:'-.-',
      z_closeprice:'-.-',
      OpenPrice:'-.-',
      Total_h:'-.-'
    }
  },
  attached(){
    this.KLineData = [];
    this.stockcode = this.$route.query.stockcode;
    this.queryKLineData();
  },
  methods:{
    queryKLineData(){
      var that      = this;
      if(!that.minsid || that.minsid == ''){
        return;
      }
      that.stockcode = that.$route.query.stockcode;
      var oSendData = {
        stockcode   :that.stockcode,
        startPos    :'0',
        direction   :'0',
        Maxcount    :'100',
        StockNumIndex:'1',
        StockIndex:that.minsid
      };
      service_hq_often.require64(oSendData)
        .then((data)=>{
          var oData = {
            TkLineHead  :data.TkLineHead,
            TkLineData  :data.TkLineData,
            BEGINDATE   :data.BEGINDATE,
            ENDDATE     :data.ENDDATE,
            MAXCOUNT    :oSendData.Maxcount,
            CONTACTID   :data.CONTACTID,
            total_max   :data.total_max,
            StockIndex  :oSendData.StockIndex
          };
          that.$set('KLineData',oData);
          that.notifykLine();
        });
    },
    //分时组件
    notifykLine() {
      this.$broadcast('parent-chartKLinedata', this.KLineData)
    }
  },
  watch: {
    minsid:function () {
      this.queryKLineData();
    }
  },
  events:{
    'child-index-dayKLine':function (data,isshow,aver) {
//      console.log(data);
      if(isshow){
        this.averprice5 = data.average.averprice5;
        this.averprice10 = data.average.averprice10;
        this.averprice20 = data.average.averprice20;
        this.ClosePrice = data.closeprice;
        this.HighPrice = data.highprice;
        this.LowPrice = data.lowprice;
        this.Total_h = data.total_h;
        this.OpenPrice = data.openprice;
        this.m_lUpPrice = data.m_lUpPrice;
        this.m_lUpIndex = data.m_lUpIndex;
        this.z_closeprice = data.z_closeprice;
        this.Time = util.formatTimeLable(data.Time,this.minsid);
        this.isshow = true;
      }else {
        this.isshow = false;
      }
      if(aver === 1){
        this.averprice5 = data.averprice5;
        this.averprice10 = data.averprice10;
        this.averprice20 = data.averprice20;
      }
    }
  },
  components:{
    kLine
  }
}
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .h5_difference canvas{
    width: 100%;
    height: 100%;
  }
  .time-text{
    font-size: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    span{
      display: inline-block;
      margin-right: 0.3rem;
      font-size: 0.5rem;
      line-height: 1rem;
    }
  }
  .time-title{
    font-size: 0.6rem;
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    background: @color-text;
    height: 2rem;
    line-height: 2rem;
    z-index:2;
    .hairline(bottom,@color-split);
    p{
      line-height: 1rem;
      white-space: nowrap;
    }
    span{
      margin-left: 0.5rem;
      display: inline-block;
      width: 3rem;
    }
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
  }
  .averprice5{
    color: #f8b526;
  }
  .averprice10{
    color: #ff6666;
  }
  .averprice20{
    color: #4aa6f6;
  }
  .swipes{
    position: relative;
    height: 100%;
  }
</style>

