<template>
  <div class="content">
    <!--<div class="tab_nav">-->
      <!--<ul>-->
        <!--<li v-for="stockTab in stockTabs" @click="choose($index,stockTab.id)" :class="{'active':$index===selected}"><a href="javascript:void(0);">{{stockTab.tabName}}</a></li>-->
      <!--</ul>-->
    <!--</div>-->
    <div class="tabs">
      <component :is="currentView" v-if="iscurrent"></component>
    </div>
  </div>
</template>
<script>
  import localService from '../../../../services/localService'
  import stockBuy from './ons/stockBuy.vue'
  import stockCancel from './ons/stockCancel.vue'
  import stockHolding from './ons/stockHolding.vue'
  import stockQuery from './ons/stockQuery.vue'
  import stockSell from './ons/stockSell.vue'
  export default{
    data(){
      return {
        currentView:'',
        selected:0,
        iscurrent:false,
        stockTabs:[
          {tabName:'买入',id:'buy'},
          {tabName:'卖出',id:'sell'},
          {tabName:'撤单',id:'cancel'},
          {tabName:'持仓',id:'holding'},
          {tabName:'查询',id:'query'}
        ]
      }
    },
    attached(){
//      this.inits();
    },
    methods: {
      inits(){
        // this.$route.query.tab = 1;
        var index = 1;
        if(index){
          var stocktab = this.stockTabs[index];
          this.choose(parseInt(index),stocktab.id);
        }
      },
      choose(index,id,ln) {
        if($("#KeyPanel5").attr("display","block")){
          console.log("oj")
          $("#KeyPanel5").css("display","none");
        }
        if(window.setIntervalID){
          window.clearInterval(window.setIntervalID);
        }
        ln = ln || '';
        this['selected'+ln]=index;
        this['currentView'+ln]='view_'+id;
        localService.saveMapMesg({stock:index});
      }
    },
    route:{
      activate ({to, from,next}) {
        this.iscurrent = false;
        this.iscurrent = true;
        var that = this;
        if(from.path){
          localService.removemapMesg(['stock']);
          that.inits();
          next();
        }else {
          this.selected = 3;
          this.currentView = 'view_holding';
          localService.readMapMesg(['stock'])
            .then((data)=>{
            var index = 1;
            that.selected = index;
            that.currentView = 'view_'+that.stockTabs[index]['id'];
            next();
          })
        }
      }
    },
    events:{
      'choosetab':function(index,id,ln){
          this.choose(index,id,ln);
        }
    },
    components:{
      'view_buy':stockBuy,
      'view_cancel':stockCancel,
      'view_holding':stockHolding,
      'view_query':stockQuery,
      'view_sell':stockSell,
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .tabs{
    position: relative;
    width: 100%;
    /*height: 550px;*/
    height: 100%;
    /*padding-top: 1.6rem;*/
  }
  /*@media screen and (max-height: 600px) {*/
    /*.tabs{height: 550px;}*/
  /*}*/
  .tab_nav {
    height: 1.6rem;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #efeded;
    z-index: 10;
  ul {
    display: table;
    width: 100%;
  li{
    display: table-cell;
  a {
    display: block;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    font-size: 0.8rem;
    color: #999;
    text-decoration: none;
    position: relative;
  &:before {
     content: "";
     width: 80%;
     height: 0;
     background: #FF7F00;
     position: absolute;
     left: 10%;
     bottom: 0;
     -webkit-transition: all .25s ease 0s;
     -moz-transition: all .25s ease 0s;
     transition: all .25s ease 0s;
   }
  }
  &.active a {
     font-weight: 700;
     color: #FF7F00;
  &:before {
     height: 2px;
   }
  }
  }
  }
  }

</style>
