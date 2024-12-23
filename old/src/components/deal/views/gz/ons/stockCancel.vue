<template>
  <div class="explain content">
    <div class="wrancont">
      <templatesblock url="gz/chedan"></templatesblock>
    </div>
  </div>
</template>
<script>
  import templatesblock from '../../../../common/templates-block.vue'
  export default{
    data(){
      return {
        isBtn:false
      }
    },
    ready(){

    },
    attached(){
      this.inits();
    },
    methods: {
      inits(){

      }
    },
    components:{
      templatesblock
    }
  }
</script>
<style lang="less" scoped>
  .explain{
    top: 1.6rem;display: block;
  }
  .explain .content{
    padding-top: 1.6rem;
  }
  .wrancont{
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

