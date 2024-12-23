<template>
  <div class="explain content native-scroll">
    <div class="classIfication">
      <table class="title">
        <tr v-for="titleItem in textTitleArray"><th v-for="titleList in titleItem">{{gridTitle[titleList]}}</th></tr>
      </table>
      <div class="table-cont content infinite-scroll" v-infinite-scroll="loadMore">
        <table v-for="item in gridData">
          <tr v-for="trItem in dateArray"><th v-for="dataList in trItem">{{dataList | valueKey item}}</th></tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import repoconfig from '../../../scripts/repoconfig'
  import GRID from '../../../scripts/GRID'
  import service_ptjy from '../../../service/trade/service_ptjy'
	export default{
		data(){
			return {
        gridData:[],
        gridTitle:[],
        dateArray:[],
        loading:false,
        items: [],
        listNumber:0,
        textTitleArray:[]
			}
		},
    ready(){
      this.init();
    },
    methods: {
      init(){
        this.listNumber = 0;
        this.loading = false;
        this.loadMore();
      },
      loadMore () {
        var that = this;
        // 如果正在加载，则退出
        if(this.loading){
          return;
        }
        this.loading = true;
        $.showPreloader();
        let oSendData = {
          //起始位置
          StartPos: this.listNumber==0 ? this.listNumber : (this.listNumber+1),
          //最大条数
          MaxCount: repoconfig.config.pagecount
        };

        service_ptjy.require117(oSendData)
          .then((data)=>{
            console.log(data);

            let oData = GRID.htmltitle(data,that.listNumber);
            if(that.listNumber === 0){
              data.GRID0.shift();
              that.$set('textTitleArray',oData.dateTitle);
              that.$set('gridTitle',oData.textTitle);
              that.$set('dateArray',oData.dateArray);
            }
            if(!data.GRID0){
              data.GRID0 = [];
            }else{
              that.listNumber += repoconfig.config.pagecount;
              that.loading = false;
            }
//            that.$set('gridData',data.GRID0);
            var newData = that.gridData.concat(data.GRID0);
            that.$set('gridData',newData);
            $.hidePreloader();
          });
      }
    },
    filters: {
      valueKey(index, grid) {
        return grid?grid.split('|')[index]:''
      }
    }
	}
</script>

<style lang="less" scoped>
	@import '../../../../../assets/less/variables.less';
  @import "../../../../../assets/less/mixins.less";
	.classIfication{
    position: relative;
    height:100%;
    td,th{
      font-weight: normal;
    }
    table{
      width: 100%;
      font-size: 0.65rem;
    }
    .title{
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 100;
      .hairline(bottom,@color-split);
      .hairline(top,@color-split);
    }
    .table-cont{
      padding-top: 38px;
      height:100%;
      overflow-y: scroll;
      table{
        position: relative;
        .hairline(bottom,@color-split);
      }
    }
	}
</style>
