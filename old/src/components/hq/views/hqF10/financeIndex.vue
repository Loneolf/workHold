<template>
    <div class="explain content native-scroll">
      <div class="buttons-tab fixed-tab buttons-fixed" data-offset="44">
        <a href="#tab1" class="tab-link button active"><span class="active">全部</span></a>
        <a href="#tab2" class="tab-link button"><span class="">年报</span></a>
        <a href="#tab3" class="tab-link button"><span class="">中报</span></a>
        <a href="#tab4" class="tab-link button"><span class="">三季报</span></a>
        <a href="#tab5" class="tab-link button"><span class="">一季报</span></a>
      </div>
      <div class="tabs">
        <div id="tab1" class="tab active">
          <h2 class="more_title"><span>青岛啤酒（600600）</span><span class="more_text">2016一季报</span></h2>
          <div class="explain-ul" v-for="grid in gridData">
            <h3 class="title"><span>{{grid.name}}</span></h3>
            <table>
              <tr v-for="item in grid.val"><td>{{$key}}</td><td class="">{{item}}</td></tr>
            </table>
          </div>
        </div>
        <div id="tab2" class="tab">
          <h2 class="more_title"><span>青岛啤酒（600）</span><span class="more_text">2016年报</span></h2>
          <div class="explain-ul" v-for="grid in gridData">
            <h3 class="title"><span>{{grid.name}}</span></h3>
            <table>
              <tr v-for="item in grid.val"><td>{{$key}}</td><td class="">{{item}}</td></tr>
            </table>
          </div>
        </div>
        <div id="tab3" class="tab">
          <h2 class="more_title"><span>青岛啤酒（60）</span><span class="more_text">2016中报</span></h2>
          <div class="explain-ul" v-for="grid in gridData">
            <h3 class="title"><span>{{grid.name}}</span></h3>
            <table>
              <tr v-for="item in grid.val"><td>{{$key}}</td><td class="">{{item}}</td></tr>
            </table>
          </div>
        </div>
        <div id="tab4" class="tab">
          <h2 class="more_title"><span>青岛啤酒（6006）</span><span class="more_text">2016三季报</span></h2>
          <div class="explain-ul" v-for="grid in gridData">
            <h3 class="title"><span>{{grid.name}}</span></h3>
            <table>
              <tr v-for="item in grid.val"><td>{{$key}}</td><td class="">{{item}}</td></tr>
            </table>
          </div>
        </div>
        <div id="tab5" class="tab">
          <h2 class="more_title"><span>青岛啤酒（60060）</span><span class="more_text">2016一季报</span></h2>
          <div class="explain-ul" v-for="grid in gridData">
            <h3 class="title"><span>{{grid.name}}</span></h3>
            <table>
              <tr v-for="item in grid.val"><td>{{$key}}</td><td class="">{{item}}</td></tr>
            </table>
          </div>
        </div>
    </div>
</template>
<script>
	import utils from '../../../../util/util'
	export default {
		data(){
			return {
        gridData:[],
        gridStructure:{},
        gridStructures:{}
			}
		},
    ready(){
      this.getCustomers();
    },
    methods:{
      getCustomers(){
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
        this.$set('gridStructure',{
          '未流通股份':[0,'0%'],
          '流通受限股份':[0,'0%'],
          '已流通股份':['13.51亿股','100%'],
          '总股本':['13.51亿股','100%']
        });
        this.$set('gridStructures',{
          '未流通股份':[0,'0%'],
          '流通受限股份':[0,'0%'],
          '已流通股份':['13.51亿股','100%'],
          '总股本':['13.51亿股','100%']
        })
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
        width: 40%;
      }
      :nth-child(2){
        width: 20%;
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
  table{
    width: 100%;
  }
  table tr{
      width: 100%;
      td,th{
        display: inline-block;
        padding: 0.5rem 0;
        text-align: left;

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
}

.tab .more_title{
  line-height: 1.9rem;
  margin: 0;
  font-size: 0.8rem;
  font-weight: normal;
span{width:50%;display:inline-block;}
}
.tab .more_text{
  color: @color-text-secondary;
  text-align: right;
}
</style>
