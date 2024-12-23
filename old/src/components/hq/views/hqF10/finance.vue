<!-- 财务 -->
<template>
  <div>
    <div class="explain" v-for="grid in gridData">
      <h3 class="title"><span>{{grid.name}}</span><span>2016一季报</span></h3>
      <div class="explain-ul">
        <table>
          <tr v-for="item in grid.val"><td>{{$key}}</td><td class="">{{item}}</td></tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    data() {
        return {
            gridData :[]
        }
    },
    attached() {
        // $.init();
        this.stockcode = this.$route.query.stockcode;
        this.getCustomers();
    },
    methods: {
        getCustomers() {
            this.$set('gridData', [
              {
                name: '关键指标',
                val: {
                  '每股收益': '0.40',
                  '每股收益1': '0.40',
                  '每股收益2': '0.40',
                  '每股收益3': '0.40',
                  '每股收益4': '0.40',
                  '每股收益5': '0.40'
                }
              },
              {
                name:'利润表',
                val: {
                  '利润表': '0.40',
                  '利润表1': '0.40',
                  '利润表2': '0.40',
                  '利润表3': '0.40',
                  '每利润表4': '0.40',
                  '每利润表5': '0.40'
                }
              }
            ]);
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
  td,th{
    display: inline-block;
    padding: 0.5rem 0;

  }
  :nth-child(1){
    width: 60%;
    text-align: left;
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
</style>
