<template>
    <div class="explain content native-scroll">
      <div class="buttons-tab fixed-tab buttons-fixed" data-offset="44">
        <a href="#tab1" class="tab-link button active"><span class="active">股本结构</span></a>
        <a href="#tab2" class="tab-link button"><span class="">股本变动</span></a>
      </div>
      <div class="tabs">
        <div id="tab1" class="tab active">
          <div class="explain-ul">
            <table>
              <tr><th>股份流通受限表</th><th>数量</th><th>占比</th></tr>
              <tr v-for="item in gridStructure"><td>{{$key}}</td><td class="">{{item[0]}}</td><td class="">{{item[1]}}</td></tr>
            </table>
            <table>
              <tr><th>流通股份分布情况表</th><th>数量</th><th>占比</th></tr>
              <tr v-for="item in gridStructures"><td>{{$key}}</td><td class="">{{item[0]}}</td><td class="">{{item[1]}}</td></tr>
            </table>
          </div>
        </div>
        <div id="tab2" class="tab">
          <div class="native-data">
            <table>
              <tr><th>日期</th><th>总股本</th><th>流通A股</th><th>变动原因</th></tr>
              <tr v-for="item in gridChange"><td>{{item.date}}</td><td>{{item.guben}}</td><td>{{item.Astock}}</td><td>{{item.reason}}</td></tr>
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
        gridChange:[],
        gridStructure:{},
        gridStructures:{}
			}
		},
    ready(){
      this.getCustomers();
    },
    methods:{
      getCustomers(){
        this.$set('gridChange', [
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'},
          {date:'2011-12-20',guben:'13.51亿',Astock:'6.96亿',reason:'其他上市'}
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
      :nth-child(2),:nth-child(3){
        width: 25%;
        vertical-align: middle;
        text-align: right;
      }
    }

  }
}
</style>
