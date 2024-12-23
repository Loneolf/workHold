<template>
  <div class="content content_alone">
    <component :is="currentView"></component>
  </div>
</template>
<script>
  import localService from '../../../../services/localService'
  import stockBuy from './ons/stockBuy_ticket.vue'
  import stockSell from './ons/stockSell_ticket.vue'
  export default{
    data(){
      return {
        currentView:'view_buy',
        stockTabs:[
          {tabName:'买入',id:'buy'},
          {tabName:'卖出',id:'sell'}
        ]
      }
    },
    attached(){
      this.inits();
    },
    methods: {
      inits(){
        var index = this.$route.query.tab;
        if(index){
          var stocktab = this.stockTabs[index];
          this.choose(parseInt(index),stocktab.id);
        }
      },
      choose(index,id,ln) {
        ln = ln || '';
        this['currentView'+ln]='view_'+id;
      }
    },
    components:{
      'view_buy':stockBuy,
      'view_sell':stockSell
    }
  }
  </script>

