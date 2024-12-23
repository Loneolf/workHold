<template>
    <div class="explain content native-scroll">
      <div class="buttons-tab fixed-tab buttons-fixed" data-offset="44">
        <a href="#tab1" class="tab-link button active"><span class="active">管理层</span></a>
        <a href="#tab2" class="tab-link button"><span class="">资本运作</span></a>
      </div>
      <div class="tabs">
        <div id="tab1" class="tab active">
          <div class="native-data">
            <table>
              <tr><th>姓名</th><th>职务</th><th>年龄</th><th>学历</th></tr>
              <tr v-for="item in gridManag"><td>{{item.name}}</td><td>{{item.zhiwu}}</td><td>{{item.age}}</td><td>{{item.education}}</td></tr>
            </table>
          </div>
        </div>
        <div id="tab2" class="tab">
          <h3 class="title"><span>项目进度</span></h3>
          <div class="explain-ul">
            <table>
              <tr v-for="item in gridCapital"><td>{{$key}}</td><td class="">{{item}}</td></tr>
            </table>
          </div>
          <h3 class="title"><span>募集资金来源</span></h3>
          <p>{{gridSource}}</p>
        </div>
      </div>
    </div>
</template>
<script>
	import utils from '../../../../util/util'
	export default {
		data(){
			return {
        gridManag:[],
        gridCapital:{},
        gridSource:''
			}
		},
    ready(){
      this.getCustomers();
    },
    methods:{
      getCustomers(){
        this.$set('gridManag', [
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'},
          {name:'孙明波',zhiwu:'董事长，执行董事',age:59,education:'博士'}
        ]);
        this.$set('gridCapital',{
          '项目名称':'将剩余行权募集资金全部补充公司流动资金',
          '截止日期':'2008-03-31',
          '计划投资':'11853.01万元',
        })
        this.$set('gridSource','暂无相关数据')
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
</style>
