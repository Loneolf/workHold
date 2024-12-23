<template>
  <div class="thePrice">
    <div class="thePrice-cont">
      <div v-for="item in grid" class="thePrice-list"><p class="listPrice" v-for="items in item"><span class="thePrice-price {{items.price | colorDivide Close_p}}">{{items.price}}</span><span class="thePrice-amount">{{items.amount}}</span></p></div>
      <span class="line"></span>
      <span class="lines"></span>
    </div>
  </div>
</template>
<script>
  import service_hq_often from '../../../hq/service/common/service_hq_often'
  export default {
    data() {
      return {
        Close_p:'-.-',
        stockcode: this.$route.query.stockcode,
        grid:[
          {price:'价',amount:'量'}
        ]
      }
    },
    attached(){
      this.grid = [];
    },
    methods:{
      thePriceFunc(){
        var that      = this;
        that.stockcode = this.$route.query.stockcode;
        var oSendData = {
          stockcode   :that.stockcode,
          Level       :'2',
          startPos    :'0',
          MaxCount    :200,
          NewMarketNo :'0'
        };
        service_hq_often.require35(oSendData)
          .then((data)=>{
          console.log(data);
        if(data.ThePriceData){
          var Data = data.ThePriceData;
          if(Data.length>14){
            Data = Data.slice(0,14);
          }
          Data.unshift({price:'价',amount:'量'});
          var ln = Math.ceil(Data.length/5);
          var oData = [];
          var start = 0;
          var end = 5;
          for(var i=0;i<ln;i++){
            oData.push(Data.slice(start,end));
            start = end;
            end += 5;
          }
          that.grid = oData;
        }
      });
      }
    },
    events:{
      'parent-thePriceFunc':function (n) {
        this.Close_p = n;
        this.stockcode =  this.$route.query.stockcode;
        this.thePriceFunc();
      }
    }
  }
</script>
<style  lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .thePrice{
    padding: 0 0.3rem;
    font-size: 0;
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
  .thePrice-cont{
    clear: both;
    height: 5rem;
    position: relative;
  .line,.lines{
    position: absolute;
    display: inline-block;
    top:0;
    left: 33%;
    height: 100%;
    width: 1px;
    background: #ccc;
  }
  .lines{
    left: 66%;
  }
  }
  .thePrice-list{
    float: left;
    width: 33%;
    .listPrice{
      display: block;
      font-size: 0.6rem;
      padding:0 0.5rem 0.1rem 0.2rem;
    }
    p{
      padding-bottom: 0.1rem;
    }
  }
 .thePrice-price,.thePrice-amount{
    display: inline-block;
  }
  .thePrice-price{
    width: 50%;
  }
  .thePrice-amount{
    width: 50%;
    text-align: right;
  }
  }
</style>
