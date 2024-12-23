<template>
  <div>
    <newslist></newslist>
  </div>
</template>
<script>
  import newslist from '../../ons/stockInfo/newslist.vue'
  export default {
    attached(){
      this.$broadcast('parent-newslist', '20003');
    },
    methods: {

    },
    events:{

    },
    components:{
      newslist
    }
  }
</script>
