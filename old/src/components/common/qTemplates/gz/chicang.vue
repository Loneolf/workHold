<template>
  <div class="table">
    <div v-for="item in gridData" track-by="$index" @click="listFunc($index)" class="table-list {{item | isBuy YKINDEX}}">
      <p v-for="trItem in dateArray"><span v-for="dataList in trItem" track-by="$index" class="{{$index | textAgline trItem.length}}">{{dataList | valueKey item}}</span></p>
    </div>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import GRID from '../../../deal/scripts/GRID'
  import dealUtil from '../../../deal/scripts/dealUtil'
  import service_gz from '../../../deal/service/trade/service_gz'
	export default{
    props: ['action','viewname','stockcode'],
		data(){
			return {
        gridData:[],
        gridTitle:[],
        dateArray:[],
        loading:false,
        items: [],
        listNumber:0,
        YKINDEX:'',
        noData:false,
        INDEX:{
          STOCKCODEINDEX:''
        },
        textTitleArray:[]
			}
		},
    ready(){
//      console.log(1);
    },
    attached(){
      this.gridData = [];
      this.gridTitle = [];
      this.dateArray = [];
      this.loading = false;
      this.items = [];
      this.listNumber = 0;
      this.textTitleArray = [];
      this.INDEX = {
        STOCKCODEINDEX:''
      };
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
      service_gz.require5173(oSendData).then((data)=>{
          console.log(data);
          $.hidePreloader();
          let oData = GRID.htmltitle(data,that.listNumber);
          that.YKINDEX = data.YKINDEX;
          if(that.listNumber === 0){
            that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
            that.INDEX.DATEFORMINDEX = data.DATEFORMINDEX;
            that.INDEX.ZZPINDEX = data.ZZPINDEX;
            data.GRID0 && data.GRID0.shift();
            /*that.$set('textTitleArray',oData.dateTitle);
            that.$set('gridTitle',oData.textTitle);*/
            that.$set('dateArray',oData.dateArray);
            var obj = {
              textTitleArray:oData.dateTitle,
              gridTitle:oData.textTitle,
              dateArray:oData.dateArray
            };
//              that.$emit('headtitle', obj);
            this.$dispatch('headtitle', obj);
            if((!data.GRID0 || data.GRID0.length <=0)){
              that.$dispatch('noDataBlock');
              return;
            }
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
        });
      },
      listFunc(index){
        var listData = this.gridData[index];
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX];
        console.log(listData)
        console.log(this.action);
        if(this.action){
          this.$TZT.tradeaction({action:this.action,stockcode:stockcode},this);
        }
      }
    },
    filters: {
      isBuy(grid,ykl){
        var className = '';
        if(grid && ykl){
          var val = grid.split('|')[ykl];
          if(parseFloat(val)>0){
            className = 'rise'
          }else {
            className = 'fill'
          }
        }
        return className;
      },
      valueKey(index, grid) {
        let str = grid?grid.split('|')[index]:'';
        return dealUtil.formatZZDate(str,index,this.INDEX.ZZPINDEX,this.INDEX.DATEFORMINDEX);
      },
      textAgline(index,length){
        if(index == 0){
          return 'left';
        }
        if(index == length-1){
          return 'right';
        }
      }
    },
    events:{
      'child-loadMore':function () {
        this.loadMore();
      }
    }
	}
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/template.less";
</style>

