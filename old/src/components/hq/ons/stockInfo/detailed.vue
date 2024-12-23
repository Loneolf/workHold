<template>
  <div class="detailed">
    <div class="detailed-cont">
      <p v-for="item in grid" class="detailed-list"><span class="detailed-name">{{item.time}}</span><span class="detailed-price {{item.price | colorDivide Close_p}}">{{item.price}}</span><span class="detailed-amount {{item.falg | colorFalg}}">{{item.amount | flags item.falg}}</span></p>
      <span class="line"></span>
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
          /*{price:'30.86',amount:'65',time:'14:59'},
          {price:'30.84',amount:'2',time:''},
          {price:'30.83',amount:'30',time:''},
          {price:'30.83',amount:'30',time:''},
          {price:'30.83',amount:'30',time:'14:59'},
          {price:'30.86',amount:'65',time:''},
          {price:'30.84',amount:'2',time:''},
          {price:'30.83',amount:'30',time:''},
          {price:'30.83',amount:'30',time:'14:59'},
          {price:'30.83',amount:'30',time:''}*/
        ]
			}
		},
    attached(){
      this.grid = [];
    },
    methods:{
      detailedFunc(){
        var that      = this;
        that.stockcode= that.$route.query.stockcode;
        var NewMarketNo= that.$route.query.marketno;
        var oSendData = {
          stockcode   :that.stockcode,
          Level       :'1',
          startPos    :'0',
          NewMarketNo :NewMarketNo
        };
        service_hq_often.require44(oSendData)
          .then((data)=>{
          console.log(data);
          if(data.DetailedData){
            that.grid = data.DetailedData;
          }
        });
      }
    },
    events:{
      'parent-detailed':function (n) {
        console.log(n);
        this.Close_p = n;
        this.detailedFunc();
      }
    },
    filters: {
      flags(vaule, falg) {
        if(vaule){
          if(falg == 1){
            return vaule+'↑';
          }else {
            return vaule+'↓';
          }
        }

      },
      colorFalg(vaule){
        if(vaule == 1){
          return 'rise';
        }else {
          return 'fill';
        }
      }
    }
	}
</script>
<style  lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .detailed{
    padding: 0 0.3rem;
    font-size: 0;
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
    .detailed-cont{
      position: relative;
      .line{
        position: absolute;
        display: inline-block;
        top:0;
        left: 50%;
        height: 100%;
        width: 1px;
        background: #ccc;
      }
    }
    .detailed-list{
      display: inline-block;
      width: 50%;
      font-size: 0.6rem;
      padding:0 0.2rem 0.1rem;
      p{
        padding-bottom: 0.1rem;
      }
    }
    .detailed-name,.detailed-price,.detailed-amount{
      display: inline-block;
    }
    .detailed-name{
      width: 35%;
      text-align: center;
    }
    .detailed-price{
      width: 30%;
      padding-left: 0.5rem;
    }
    .detailed-amount{
      width: 35%;
      text-align: right;
    }
  }
</style>
