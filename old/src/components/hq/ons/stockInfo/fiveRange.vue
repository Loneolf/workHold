<template>
  <div class="fiveRange">
    <div class="five-left">
      <p v-for="item in fiveSell" ><span class="five-name">{{item.name}}</span><span class="five-price {{item.price | colorDivide Close_p}}">{{item.price}}</span><span class="five-width"><em></em></span><span class="five-amount">{{item.amount | numTosize}}</span></p>
    </div><div class="five-right">
      <p v-for="item in fiveBuy" ><span class="five-name">{{item.name}}</span><span class="five-price {{item.price | colorDivide Close_p}}">{{item.price}}</span><span class="five-width"><em></em></span><span class="five-amount">{{item.amount | numTosize}}</span></p>
    </div>
  </div>
</template>
<script>
  import util from '../../../../util/util'
  import tztStockType from '../../../hq/scripts/tztStockType.js';
	export default {
		data() {
		  return {
		    maxAmount:'0',
        Close_p:'-.-',
		fiveBuy:[],
        fiveSell:[]
			}
		},
    events:{
      'parent-minStockInfo':function (data) {
        this.Close_p = data.Close_p;
        this.$dispatch('stockInfoSwipeFunc',this.Close_p);
        if(data.StockData){
          if(tztStockType.MakeHKMarketStock(this.$route.query.marketno)){
            this.fiveBuy=[
              {name:'买1',price:'-.-',amount:'--'}
            ],
            this.fiveSell=[
               {name:'卖1',price:'-.-',amount:'--'}
            ]
            this.fiveBuy[0]['price'] = data.StockData.p1;
            this.fiveBuy[0]['amount'] = data.StockData.Q1;

            this.fiveSell[0]['price'] = data.StockData.p4;
            this.fiveSell[0]['amount'] = data.StockData.Q4;
          }else{
            this.fiveBuy=[
              {name:'买1',price:'-.-',amount:'--'},
              {name:'买2',price:'-.-',amount:'--'},
              {name:'买3',price:'-.-',amount:'--'},
              {name:'买4',price:'-.-',amount:'--'},
              {name:'买5',price:'-.-',amount:'--'}
            ],
             this.fiveSell=[
              {name:'卖1',price:'-.-',amount:'--'},
              {name:'卖2',price:'-.-',amount:'--'},
              {name:'卖3',price:'-.-',amount:'--'},
              {name:'卖4',price:'-.-',amount:'--'},
              {name:'卖5',price:'-.-',amount:'--'}
            ]

            this.fiveBuy[0]['price'] = data.StockData.p1;
            this.fiveBuy[0]['amount'] = data.StockData.Q1;
            this.fiveBuy[1]['price'] = data.StockData.p2;
            this.fiveBuy[1]['amount'] = data.StockData.Q2;
            this.fiveBuy[2]['price'] = data.StockData.p3;
            this.fiveBuy[2]['amount'] = data.StockData.Q3;
            this.fiveBuy[3]['price'] = data.StockData.p7;
            this.fiveBuy[3]['amount'] = data.StockData.Q7;
            this.fiveBuy[4]['price'] = data.StockData.p8;
            this.fiveBuy[4]['amount'] = data.StockData.Q8;

            this.fiveSell[0]['price'] = data.StockData.p4;
            this.fiveSell[0]['amount'] = data.StockData.Q4;
            this.fiveSell[1]['price'] = data.StockData.p5;
            this.fiveSell[1]['amount'] = data.StockData.Q5;
            this.fiveSell[2]['price'] = data.StockData.p6;
            this.fiveSell[2]['amount'] = data.StockData.Q6;
            this.fiveSell[3]['price'] = data.StockData.p9;
            this.fiveSell[3]['amount'] = data.StockData.Q9;
            this.fiveSell[4]['price'] = data.StockData.p10;
            this.fiveSell[4]['amount'] = data.StockData.Q10;
          }

        }
      }
    },
    filters:{
      numTosize(val){
        return util.numTosize(val);
      }
    }
	}
</script>
<style  lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .fiveRange{
    padding: 0 0.3rem;
    font-size: 0;
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
    .five-left,.five-right{
      display: inline-block;
      width: 50%;
      font-size: 0.6rem;
      padding:0 0.2rem;
      p{
        padding-bottom: 0.1rem;
      }
    }
    .five-name,.five-price,.five-width,.five-amount{
      display: inline-block;
    }
    .five-name{
      width: 20%;
    }
    .five-price{
      width: 20%;
    }
    .five-width{
      width: 20%;
    }
    .five-amount{
      width: 40%;
      text-align: right;
    }
  }
</style>
