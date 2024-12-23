<template>
  <div class="classIfication">
    <table class="title">
      <tr v-for="titleItem in gridTitle"><th v-for="titleText in titleItem">{{AllTitle[titleText]}}</th></tr>
    </table>
    <div class="table-cont content infinite-scroll" v-infinite-scroll="loadMore">
      <table v-for="item in gridData">
        <tr v-for="titleItem in gridTitle"><th v-for="titleText in titleItem">{{item[titleText]}}</th></tr>
      </table>
      <div class="noData" v-if="IsGrid"><p class="img"></p><span>~ 查无数据 ~</span></div>
    </div>
  </div>
</template>

<script>
  import service_repo from '../../../service/trade/service_repo'
  import GRID from '../../../scripts/GRID'
  import repoconfig from '../../../scripts/repoconfig'
	export default{
		data(){
			return {
        gridData:[],
        gridTitle:[],
        AllTitle:[],
        loading:false,
        IsGrid:false,
        listNumber:0
			}
		},
    attached(){
      this.listNumber = 0;
      this.loading = false;
      this.IsGrid = false;
      this.gridData = [];
      this.gridTitle = [];
      this.AllTitle = [];
      this.loadMore();
    },
    methods: {
      loadMore () {
        // 如果正在加载，则退出
        if(this.loading){
          return;
        }
        this.loading = true;
        var that = this;
        var obj = {
          //起始位置
          StartPos: this.listNumber,
          //最大条数
          MaxCount: repoconfig.config.pagecount
        };
        service_repo.require6594(obj)
          .then((data)=>{
            that.loading = false;
            that.listNumber +=(data.GRID0?data.GRID0.length:0);
            if(obj.StartPos === 0){
              let htmlTitle = GRID.htmltitle(data);
              htmlTitle.textTitle.length>0 && that.$set('AllTitle',htmlTitle.textTitle);
              that.$set('gridTitle',htmlTitle.dateArray);
              data.GRID0.shift();
              if(data.GRID0.length == 0){
                that.IsGrid = true;
              }
            }
            if(data.GRID0 && data.GRID0.length>0){
              var grid = that.gridData;
              data.GRID0.forEach((items,index)=>{
                grid.push(items.split('|'));
              });
              that.$set('gridData',grid);
            }
        });
      }
    }
	}
</script>
<style lang="less" scoped>
  @import '../../../../../assets/less/variables.less';
  @import "../../../../../assets/less/mixins.less";
  @import "../../../../../assets/less/htmltitle.less";
</style>


