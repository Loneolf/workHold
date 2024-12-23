<template>
  <div>
    <newslist></newslist>
  </div>
</template>
<script>
  import newslist from '../../ons/stockInfo/newslist.vue'
  export default {
    attached(){
      this.inits();
    },
    methods: {
      inits(){
        this.$broadcast('parent-newslist', '20001');
      }
    },
    components:{
      newslist
    }
  }
</script>
