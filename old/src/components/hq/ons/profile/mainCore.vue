<template>
  <div class="explain">
    <h3 class="title"><span>主营收入构成(元)</span></h3>
    <div class="explain-ul">
      <table>
        <tr v-for="item in gridData"><td>{{$key}}</td><td class="">{{item}}</td></tr>
      </table>
    </div>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  export default {
    data(){
      return {
        gridData:{}
      }
    },
    events: {//父集传过来的值
      'parent-mainCore': function(Data) {
        this.gridData = Data;
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
  .title{
    padding: 0 0.75rem;
    margin: 0;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 1.6rem;
    position: relative;
  .hairline(bottom,@color-split);
  .hairline(top,@color-split);
  span{
    display: inline-block;
  }
  :nth-child(1){
    width: 50%;
  }
  :nth-child(2){
    width: 50%;
    text-align: right;
  }
  }
  .explain-ul{
    padding: 0 0.75rem;
    margin: 0;
  }
  table{
    width: 100%;
  :last-child{
    border-bottom:none;
  }
  }
  tr{
    list-style: none;
    font-size: 0.7rem;
    display:block;
    position: relative;
  .hairline(bottom,@color-split);
  td{
    display: inline-block;
    padding: 0.5rem 0;

  }
  :nth-child(1){
    width: 50%;
  }
  :nth-child(2){
    width: 50%;
    vertical-align: middle;
    text-align: right;
  }
  }
  }
</style>
