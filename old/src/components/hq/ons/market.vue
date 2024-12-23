<template>
  <div class="content">
    <ul class="market">
      <li v-for="item in grid" @click="clickFunc($index)">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
  import tztMarket from '../scripts/tztMarket'
	export default {
		data() {
		  return {
		    grid:[],
        market:''
			}
		},
    attached(){
		  this.grid = [];
      this.market = this.$route.query.market;
      var obj = tztMarket.getchildMarket(this.market);
      this.grid = obj.grid;
      this.$route.router.app.title = obj.parentName;
    },
    methods:{
      clickFunc(index){
        this.$TZT.action10061('/hq/list?market='+this.grid[index]['market']);
      }
    },
    events:{

    }
	}
</script>
<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .market{
    li{
      padding-left: 1rem;
      line-height: 1.8rem;
      font-size: 0.8rem;
      position: relative;
      .hairline(bottom,@border-default-color);
    }
  }
</style>
