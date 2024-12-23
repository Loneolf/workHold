<template>
  <div class="ranking-cont" v-for="datalist in keyData">
    <h3 class="ranking-date">{{datalist[0] | date}}</h3>
    <div class="ranking-hilt">
      <div class="hilt-cont"><p class="hilt-itme"><span>买入总计</span><span class="rise">{{gridData[datalist[1]].BUY_AMOUNTINDEX | filunit 2}}元</span></p><p class="hilt-itme"><span>卖出总计</span><span class="fill">{{gridData[datalist[1]].SELL_AMOUNTINDEX | filunit 2}}元</span></p></div>
      <p class="hilt-type"><span>类型</span><span>{{datalist[1] | loongtype}}</span></p>
    </div>
    <div class="explain">
      <h3 class="title"><span>买入前五名</span><span>买入金额</span></h3>
      <div class="explain-ul">
        <table>
          <tr v-for="item in gridData[datalist[1]].BUY_DATA"><td>{{item.FIVE_NAMEINDEX}}</td><td class="rise">{{item.BUY_SELLINDEX | filunit 2}}元</td></tr>
        </table>
      </div>
      <h3 class="title"><span>卖入前五名</span><span>卖出金额</span></h3>
      <div class="explain-ul">
        <table>
          <tr v-for="item in gridData[datalist[1]].SELL_DATA"><td>{{item.FIVE_NAMEINDEX}}</td><td class="fill">{{item.BUY_SELLINDEX | filunit 2}}元</td></tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../../util/util'
  export default {
    data(){
      return {
        gridData:{},
        keyData:[]
      }
    },
    events: {
      'parent-rankingcout': function(Data,date) {
        this.gridData = Data;
        this.keyData = date;
      }
    },
    filters: {
      filunit(vaule, num) {
        return utils.fmtunit(vaule, num);
      },
      date(value){
        return value.replace(/^(\d{4})(\d{2})(\d{2})$/i,'$1-$2-$3');
      },
      newdata(value){
        console.log(value);
        return this.gridData[value]
      },
      loongtype(value){
        var txt = '';
        if(parseFloat(value)>0){
          txt = '涨幅偏离值达';
        }else{
          txt = '跌幅偏离值达';
        }
        var num = Math.abs(parseFloat(value))*100;
        return txt+utils.format(num,0)+'%的证券'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .ranking-cont{
    margin-top: 0.5rem;
  .ranking-date{
    font-size: 0.7rem;
    line-height: 1.6rem;
    padding: 0 0.75rem;
    margin:0;
    font-weight: normal;
    position: relative;
  .hairline(bottom,@color-split);
  .hairline(top,@color-split);
  }
  .ranking-hilt{
    padding: 0 0.75rem;
    position: relative;
  .hairline(bottom,@color-split);
  p:nth-child(1){
    border-right: @border-default;
  }
  }
  .hilt-cont{
    padding: 0.75rem 0;
  }
  .hilt-itme{
    display: inline-block;
    width: 50%;
    text-align: center;
  span{
    display: block;
  }
  .rise{
    color: @color-rise;
  }
  .fill{
    color: @color-fill;
  }
  }
  .hilt-type{
    line-height: 1.75rem;
    position: relative;
  .hairline(top,@color-split);
  span{
    display: inline-block;
  }
  :nth-child(1){
    width: 20%;
  }
  :nth-child(2){
    width: 80%;
  }
  }
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
    width: 60%;
  }
  :nth-child(2){
    width: 40%;
    vertical-align: middle;
    text-align: right;
  }
  .rise{
    color:@color-rise;
  }
  .fill{
    color:@color-fill;
  }
  }
  }
  }
</style>
