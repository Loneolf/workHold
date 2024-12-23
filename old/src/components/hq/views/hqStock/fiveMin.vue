<template>
  <div class="swipes" style="width: 100%;height: 265px;">
    <p class="time-title" v-show="isshow"><span>{{times}}</span><span>价:<em class="{{Last_p | colorDivide Close_p}}">{{Last_p}}</em></span><span>涨跌:<em class="{{m_lUpPrice | isUP}}">{{m_lUpPrice}}</em></span><span>涨幅:<em class="{{m_lUpPrice | isUP}}">{{m_lUpIndex}}</em></span><span>量:{{total_h}}</span><span>均:<em class="{{m_lAvgPrice | colorDivide Close_p}}">{{m_lAvgPrice}}</em></span></p>
    <time></time>
  </div>
</template>

<script>
  import  time from '../../ons/canvas/time'
  import service_hq_often from '../../../hq/service/common/service_hq_often'
  import util from '../../../../util/util.js';
export default {
  data () {
    return {
      HKMinData:{},
      stockcode: this.$route.query.stockcode,
      Last_h:'-.-',
      m_lAvgPrice:'-.-',
      Last_p:'-.-',
      Close_p:'-.-',
      times:'-.-',
      total_h:'-.-',
      m_lUpPrice:'-.-',
      m_lUpIndex:'-.-',
      averprice:'-.-',
      isshow:false,
      minln:241
    }
  },
  attached(){
    this.HKMinData = [];
    this.stockcode = this.$route.query.stockcode;
    this.queryHKMinData();
  },
  methods:{
    queryHKMinData(){
      var that      = this;
      that.stockcode = that.$route.query.stockcode;
      var oSendData = {
        stockcode   :that.stockcode,
        Level       :'2',
        startPos    :'0',
        NewMarketNo :'0',
        beginDate   :'-5'
      };
      service_hq_often.require20109(oSendData)
        .then((data)=>{
          var oData = {
            BINHead   :data.BINHead,
            TIMEHead  :data.TIMEHead,
            AMOUNT    :data.AMOUNT,
            MAXCOUNT  :data.MAXCOUNT,
            BEGINDATE :data.BEGINDATE,
            ENDDATE   :data.ENDDATE,
            ERRORNO   :data.ERRORNO,
            TYPE      :'five'
          };
          that.$set('HKMinData',oData);
          that.notify();
        });
    },

    //分时组件
    notify() {
      this.$broadcast('parent-chartMindata', this.HKMinData)
    }
  },
  events:{
    'child-index-five':function (index,ishow) {
      if(ishow){
        this.m_lAvgPrice = this.HKMinData.TIMEHead.struct[index]['averprice'];
        this.Last_p = this.HKMinData.TIMEHead.struct[index]['Last_p'];
//        this.total_h = this.HKMinData.TIMEHead.struct[index]['total_h'];
        this.total_h = util.numTosize(this.HKMinData.TIMEHead.struct[index]['total_h']);
        this.m_lUpPrice = this.HKMinData.TIMEHead.struct[index]['m_lUpPrice'];
        this.m_lUpIndex = this.HKMinData.TIMEHead.struct[index]['m_lUpIndex'];
        var date = this.HKMinData.ENDDATE.split('|');
        var dateindex = 0;
        if(index<=this.minln*1-1){
          dateindex = 0;
        }else if(index>this.minln*1-1 && index<=this.minln*2-1){
          dateindex = 1;
        }else if(index>this.minln*2-1 && index<=this.minln*3-1){
          dateindex = 2;
        }else if(index>this.minln*3-1 && index<=this.minln*4-1){
          dateindex = 3;
        }else {
          dateindex = 4;
        }
        this.times = date[dateindex];
        this.isshow = true;
      }else {
        this.isshow = false;
      }
    }
  },
  components:{
    time
  }
}
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .h5_difference_time {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .h5_difference canvas{
    width: 100%;
    height: 100%;
  }
  .swipes{
    position: relative;
    height: 100%;
  }
  .time-title{
    font-size: 0.5rem;
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    background: @color-text;
    height: 2rem;
    white-space: nowrap;
    word-break: break-all;
    line-height: 2rem;
    span{
      margin-left: 0.1rem;
    }
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
  }
</style>

