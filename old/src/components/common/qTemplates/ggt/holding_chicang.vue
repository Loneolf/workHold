<template>
  <div class="table">
    <div v-for="item in gridData" track-by="$index" @click="listFunc($index)" class="table-list {{item | isBuy YKINDEX}}">
      <div>
        <p v-for="trItem in dateArray"><span v-for="dataList in trItem" track-by="$index" class="{{$index | textAgline trItem.length}}">{{dataList | valueKey item}}<em class="ggtIcon {{dataList | wtTypeKey item}}"></em></span></p>
      </div>
      <p class="showlist" id=""><span data-type="buy" @click.stop="tradeaction($index,0,'buy')" class="buy opctup1 inbok"><i></i><em>买入</em></span><span data-type="sale" @click.stop="tradeaction($index,1,'sell')" class="sell opctup2 inbok"><i></i><em>卖出</em></span><span data-type="hq"  @click.stop="hq($index)" class="opctup3 inbok"><i></i><em>行情</em></span><!--<span data-type="xq" @click.stop="xq($index)" class="opctup4 inbok"><i></i><em>详情</em></span>--></p>
    </div>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import GRID from '../../../deal/scripts/GRID'
  import dealUtil from '../../../deal/scripts/dealUtil'
  import service_ggt from '../../../deal/service/trade/service_ggt'
  import localService from '../../../../services/localService'
	export default{
    props: ['action','viewname'],
		data(){
			return {
        gridData:[],
        gridTitle:[],
        dateArray:[],
        loading:false,
        items: [],
        listNumber:0,
        YKINDEX:'',
        INDEX:{
          STOCKCODEINDEX:'',
          WTACCOUNTTYPEINDEX:''
        },
        textTitleArray:[]
			}
		},
    ready(){
      console.log(1);
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
          wtaccounttype:'!',
          //最大条数
          MaxCount: repoconfig.config.pagecount
        };

        service_ggt.require5106(oSendData)
          .then((data)=>{
            let oData = GRID.htmltitle(data,that.listNumber);
            that.YKINDEX = data.YKINDEX;
            if(that.listNumber === 0){
              that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
              that.INDEX.WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX;
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
      },
      hq(index){
        console.log(this.gridData)
        var listData = this.gridData[index];
        var ArrayList = listData.split('|');
        var stockcode = 'H'+ArrayList[this.INDEX.STOCKCODEINDEX];
        this.$TZT.action10061(`/hq/ggStockInfo?stockcode=${stockcode}&marketno=`);
      },
      tradeaction(index,num,action){
        var listData = this.gridData[index];
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX],
            wtaccounttype = ArrayList[this.INDEX.WTACCOUNTTYPEINDEX];
        console.log(stockcode);
        localService.saveMapMesg({'footerStockcode':stockcode,'footerWtaccountType':wtaccounttype});
        this.$dispatch('choosetab',num,action);
      },
      listFunc(index){
        var listData = this.gridData[index];
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX];
        var kkkw = $(this.$el).find(".showlist");
        if(kkkw[index].style.display == "block"){
          kkkw[index].style.display = "none";
        }else{
          kkkw[index].style.display = "block";
        }
        for(var i = 0;i<$(this.$el).find(".showlist").length;i++){
          if(kkkw[i].style.display == "block" && i != index){
            kkkw[i].style.display = "none";
          }
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
      },
      wtTypeKey(index,grid){
        let aItem = grid?grid.split('|'):'',sImgHtml = '';
        if(index==this.INDEX.STOCKCODEINDEX && aItem.length>0 && aItem[this.INDEX.WTACCOUNTTYPEINDEX] != ''){
            if(aItem[this.INDEX.WTACCOUNTTYPEINDEX] == 'HKACCOUNT'){
              sImgHtml = 'ggcc_h';
            }else if(aItem[this.INDEX.WTACCOUNTTYPEINDEX] == 'HKSZACCOUNT'){
              sImgHtml = 'ggcc_s';
            }else{
              sImgHtml = '';
            }
        }
        return sImgHtml;
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

