<template>
  <swipe class="my-swipe ggstockinfo" :speed="500" :auto="0" :show-indicators="true" :no-drag="true">
    <swipe-item class="slide1"><five-range></five-range></swipe-item>
    <swipe-item class="slide2"><detailed v-ref:refd></detailed></swipe-item>
    <swipe-item class="slide3"><the-price v-ref:reft></the-price></swipe-item>
  </swipe>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import fiveRange from './fiveRange'
  import detailed from './detailed'
  import thePrice from './thePrice'
	export default {
		data() {
		  return {
        Close_p:'-.-',
        index:0
			}
		},
    methods: {
      notifyStock(n) {
        this.index = n;
        switch (n){
          case 0:
            break;
          case 1:
            this.$broadcast('parent-detailed', this.Close_p);
            break;
          case 2:
            this.$broadcast('parent-thePriceFunc', this.Close_p);
            break;
        }
      },
      dealRefreshTimer(){
        switch (this.index){
          case 0:
            break;
          case 1:
            this.$refs.refd.detailedFunc && this.$refs.refd.detailedFunc();
            break;
          case 2:
            this.$refs.reft.thePriceFunc && this.$refs.reft.thePriceFunc();
            break;
        }

      }
    },
    events:{
      handleIt(msg){
        this.notifyStock(msg);
      },
      stockInfoSwipeFunc(msg){
        this.Close_p = msg;
      }
    },
    components:{
      fiveRange,
      thePrice,
      detailed,
      Swipe,
      SwipeItem
    }
	}
</script>
<style lang="less">
  .content .ggstockinfo{
    height: 110px;
  }
  .ggstockinfo .swipe-indicator.active {
    background: #000;
    opacity: 0.6;
  }
  .ggstockinfo .swipe-indicators{
    bottom: -6px;
  }
</style>
