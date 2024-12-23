<template>
  <div class="table">
    <div v-for="item in gridData" track-by="$index" @click="listFunc($index)" class="table-list {{item | isBuy YKINDEX}}">
      <div>
        <p v-for="trItem in dateArray"><span v-for="dataList in trItem" track-by="$index" class="{{$index | textAgline trItem.length}}">{{dataList | valueKey item}}</span></p>
      </div>
      <p class="showlist" id=""><span @click.stop="pdlx($index,'buy')" class="buy opctup1 inbok"><i></i><em>买入</em></span><span  @click.stop="pdlx($index,'sell')" class="sell opctup2 inbok"><i></i><em>卖出</em></span><span data-type="hq"  @click.stop="hq($index)" class="opctup3 inbok"><i></i><em>行情</em></span><!--<span data-type="xq" @click.stop="xq($index)" class="opctup4 inbok"><i></i><em>详情</em></span>--></p>
    </div>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import GRID from '../../../deal/scripts/GRID'
  import dealUtil from '../../../deal/scripts/dealUtil'
  import service_ptjy from '../../../deal/service/trade/service_ptjy'
  import service_gz from '../../../deal/service/trade/service_gz'
  import service_hq_often from '../../../hq/service/common/service_hq_often'
  import localService from '../../../../services/localService'
	export default{
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
          STOCKCODEINDEX:''
        },
        textTitleArray:[],
        stockPropData:{},
			}
		},
    ready(){

    },
    attached(){
      this.gridData = [];
      this.gridTitle = [];
      this.dateArray = [];
      this.loading = false;
      this.items = [];
      this.listNumber = 0;
      this.textTitleArray = [];
      this.stockPropData = {};
      this.INDEX = {
        STOCKCODEINDEX:''
      };
		  this.init();
    },
    methods: {
      init(){
        this.listNumber = 0;
        repoconfig.config.pagecount = 20;
        this.loading = false;
        this.loadMore();
        // this.loadZJ();
      },
      loadZJ(){
        let oSendData = {
          //起始位置
          StartPos: 0,
          //最大条数
          MaxCount: 0
        };
        service_ptjy.require117(oSendData)
          .then((data)=>{
            this.$dispatch('fundList', data);
          });
      },
      hq(index){
        var listData = this.gridData[index];
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX];
        this.$TZT.action10061(`/hq/ggStockInfo?stockcode=${stockcode}&marketno=`);
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
            $.hidePreloader();
            that.YKINDEX = data.YKINDEX;
            let oData = GRID.htmltitle(data,that.listNumber);
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
            let aStock = [];
            data.GRID0.forEach((item,index) => {
                let listItem = item.split('|'),
                stock = listItem[data['STOCKCODEINDEX']];
                aStock.push(stock);
            })
            let newData = that.gridData.concat(data.GRID0);
            that.getHqStockProp(aStock,function(){
              that.$set('gridData',newData);
            })
          });
      },
      /**
       * [getHqStockProp 从行情里面获取股票属性进行补充]
       * @param  {Array} aStock 股票数组
       * @param  {Function} fn 回调函数
       */
      getHqStockProp(aStock,fn){
        if(!aStock || aStock.length <= 0){
          fn && fn();
          return;
        }
        let oSendData = {
          grid:aStock.join(','),
          maxCount:aStock.length,
          NewMarketNo:'4613', //股转市场
          newindex:1,
        },oStockProp = $.extend({},this.stockPropData),that = this;
        service_hq_often.require60(oSendData).then((oData)=> {
          if(!oData || !oData.GRID0 || oData.GRID0.length<=1 || !oData.STOCKPROP){
            fn && fn();
          }
          oData.GRID0.shift();
          let aStockProp = oData.STOCKPROP.split('|');
          oData.GRID0.forEach((item,index) => {
            let listItem = item.split('|'),
                stock = (!!listItem[oData['STOCKCODEINDEX']]?listItem[oData['STOCKCODEINDEX']].replace(/^\d+./g,''):'');
            if(!oStockProp[stock]){
              oStockProp[stock] = that.stockPropFormat(aStockProp[index]);
            }
          })
          that.$set('stockPropData',oStockProp); //数据赋值
          fn && fn();
        })
      },
      /**
       * [stockPropFormat 根据股票属性来判断是股转的协议转让还是做市转让]
       * @param  {string} stockProp [股票属性字符串]
       * @return {string}           [1|协议转让 2|做市转让 空]
       */
      stockPropFormat(stockProp){
        if(!!stockProp && stockProp.length > 10){
          if(stockProp[10] == 'T'){
            return '1'; //协议转让
          }else if(!!stockProp && stockProp[10] != 'T'){ //其他类型做限价跳转
            return '2'; 
          }
        }
        return '';
      },
      pdlx(index,mmtype){
        //9=三板
        var oWTINFO = this.gridData[index].split('|');
        var nowArray = oWTINFO[14];
        var sbaccount = ['9','三板','SBACCOUNT','SBBACCOUNT'];
         var stockcode = oWTINFO[this.INDEX.STOCKCODEINDEX];
         localService.saveMapMesg({'footerStockcode':stockcode});
        this.$TZT.action10061(`/deal/gz/gz_index`);
//        if(sbaccount.indexOf(nowArray)>=0){
//          var tp = this.$route.query.type;
//          if(tp==1||tp==2||tp==3||tp==4){
//            var taps =0;
//            if(mmtype=="sell"){
//              taps =1;
//            }
//            this.$dispatch('choosetab',taps,mmtype); //改变标头
//          }else {
//            this.$dispatch('gridDataSet',this.gridData[index]);
//            this.$dispatch('showtap',mmtype,this.stockPropData[stockcode]); //跳转顺序  20170902
//            // $('.window_custon,.window_mask').css("display","block");
//          }
//        }else{
//          if (mmtype == 'buy') {
//            this.$TZT.tradeaction({action:"12310",});
//          } else if (mmtype == 'sell') {//卖出
//            this.$TZT.tradeaction({action:"12311",});
//          }
//        }
      },
      listFunc(index){
        var listData = this.gridData[index];
        console.log(listData)
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX];
//        this.$TZT.tradeaction({action:'12310',stockcode:stockcode},this);
        var showlist = $(this.$el).find(".showlist");
        if(showlist[index].style.display == "block"){
          showlist[index].style.display = "none";
        }else{
          showlist[index].style.display = "block";
        }
        for(var i = 0;i<$(this.$el).find(".showlist").length;i++){
          if(showlist[i].style.display == "block" && i != index){
            showlist[i].style.display = "none";
          }
        }
//        this.$TZT.tradeaction({action:'12310',stockcode:stockcode},this);
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

