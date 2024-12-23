<template>
  <div class="explain">
    <div v-for="item in gridData">
      <h2>{{item.title}}</h2>
      <p class="box">{{item.cont}}</p>
    </div>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  export default {
    data(){
      return {
        gridData:[]
      }
    },
    ready(){
      this.getCustomers();
    },
    methods:{
      getCustomers(){
        this.$set('gridData', [
          {title:'主营亮点－－啤酒行业龙头',cont:'青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的青岛啤酒品牌为首批认定的"中华老字号"。2013年报披露'},
          {title:'主营亮点－－啤酒行业龙头',cont:'青岛啤酒品牌为首批认定的"中华老字号"。2013年报披露'}
        ]);
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .tabs .tab {
    display: none;
  }
  .tabs .tab.active {
    display: block;
    padding:2rem 0.5rem 0;
  }
  .explain{
  /*.native-data{padding:2rem 0.5rem 0;}*/
  .button span{
    display: inline-block;
  }
  .buttons-tab .button.active span{
    color: @color-primary;
    z-index: 100;
    border: 0;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    border-color: @color-primary;
    height: 2rem;
  }
  .native-data{
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
  td,th{
    display: inline-block;
    padding: 0.5rem 0;
    text-align: left;

  }
  :nth-child(1){
    width: 20%;
  }
  :nth-child(2){
    width: 40%;
    vertical-align: middle;
  }
  :nth-child(3){
    width: 20%;
    vertical-align: middle;
  }
  :nth-child(4){
    width: 20%;
    vertical-align: middle;
  }
  }
  }
  .explain-ul{
  tr{
    width: 100%;
  td,th{
    display: inline-block;
    padding: 0.5rem 0;
    text-align: left;

  }
  :nth-child(1){
    width: 30%;
  }
  :nth-child(2){
    width: 70%;
    vertical-align: middle;
  }
  }

  }
  }
  .box {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
