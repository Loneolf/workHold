<template>
  <div class="explain">
    <h3 class="title"><span>概念题材</span></h3>
    <p>涉及概念</p>
    <p>{{gridText}}</p>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        gridText:''
      }
    },
    events: {//父集传过来的值
      'parent-companyTheme': function(Data) {
        this.gridText = Data;
        console.log(this.gridText);
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .explain{
    position: relative;
    .hairline(bottom,@color-split);
    margin-top: 0.5rem;
    .title {
      padding: 0 0.75rem;
      margin: 0;
      font-weight: normal;
      font-size: 0.8rem;
      line-height: 1.6rem;
      position: relative;
    .hairline(bottom, @color-split);
    .hairline(top, @color-split);

  span {
    display: inline-block;
  }

  :nth-child(1) {
    width: 50%;
  }

  :nth-child(2) {
    width: 50%;
    text-align: right;
  }

  }
  }
</style>
