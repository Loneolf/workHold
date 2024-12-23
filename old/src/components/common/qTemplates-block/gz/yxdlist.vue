<template>
  <div class="cont_list" v-for="items in gridData" @click="listFunc($index)">
    <p class="list_top"><span class="w50"><em class="stockname">{{items.STOCKNAMEINDEX}}</em><em class="stockcode">{{items.STOCKCODEINDEX}}</em></span><span class="w50 right">席位代码<em class="xiwei">{{items.SEATNOINDEX}}</em></span></p>
    <p class="list_top"><span class="w50">委托价格/数量</span><span class="w50 right">{{items.ORDERPRICEINDEX}}元/{{items.ORDERQTYINDEX}}股</span></p>
    <p class="list_top"><span class="w50">约定序号</span><span class="w50 right">{{items.CONFERNOINDEX}}</span></p>
    <p class="list_top"><span class="w50">委托时间</span><span class="w50 right">{{items.REPORTTIMEINDEX | dateForm INDEXKEY.REPORTTIMEINDEX}}</span></p>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import service_gz from '../../../deal/service/trade/service_gz'
  import localService from '../../../../services/localService'
  import util from '../../../../util/util'
	export default{
    props: ['action','viewname','stockcode'],
		data(){
			return {
        gridData:[],
        loading:false,
        INDEX: ['STOCKCODEINDEX','STOCKNAMEINDEX','SEATNOINDEX','ORDERPRICEINDEX','ORDERQTYINDEX','CONFERNOINDEX','REPORTTIMEINDEX'],
        INDEXKEY:{},
        listNumber:0,
        S_FIELD:'',
        A_ARR:[],
        ACTIONS:{}
			}
		},
    ready(){
//      console.log(1);
    },
    attached(){
      this.gridData = [];
      this.loading = false;
      this.INDEXKEY = [];
      this.listNumber = 0;
      this.S_FIELD = '';
      this.A_ARR = [];
      this.ACTIONS = {};
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
        var notice={
            13012:{type:'OS'},
            13013:{type:'OB'}
        };
        let oSendData = {
          //起始位置
          StartPos: this.listNumber==0 ? this.listNumber : (this.listNumber+1),
          //最大条数
          MaxCount: repoconfig.config.pagecount,
          hsstring: notice[this.action] && notice[this.action].type,
          YXMMLB: notice[this.action] && notice[this.action].type,
          StockCode: this.stockcode
        };
        service_gz.require199(oSendData).then((data)=>{
            console.log(data);
            $.hidePreloader();
            var ArrayData = [];
            if((!data.GRID0 || data.GRID0.length ==1)&& oSendData.StartPos === 0){
              this.$dispatch('noDataBlock');
              return;
            }
            if(!data.GRID0){
              return;
            }
            if(oSendData.StartPos === 0) {
              if(data.GRID0){
                this.S_FIELD = data.GRID0[0];
                data.GRID0.shift();
              }
              var cxzp = {
                STOCKCODEINDEX:data.STOCKCODEINDEX || '',
                ORDERPRICEINDEX:data.ORDERPRICEINDEX || '',
                ORDERQTYINDEX:data.ORDERQTYINDEX || '',
                SEATNOINDEX:data.SEATNOINDEX || '',
                CONFERNOINDEX:data.CONFERNOINDEX || '',
                DATEFORMINDEX:data.DATEFORMINDEX || '',
              };
              this.$dispatch('parentData', data);
              that.$set('gridData',[]);
              that.$set('ACTIONS',cxzp);
              var indexkey = {};
              that.INDEX.forEach((value) => {
                indexkey[value] = data[value];
              });
              that.$set('INDEXKEY',indexkey);
            }
            that.$set('A_ARR',that.A_ARR.concat(data.GRID0));
            data.GRID0.forEach((item,index) => {
              var listItem = item.split('|');
              var listobj = {};

              that.INDEX.forEach((value) => {
                if (data[value]) {
                  listobj[value] = listItem[data[value]]
                }
              });
              ArrayData.push(listobj);
            });
            var newData = that.gridData.concat(ArrayData);
            that.$set('gridData',newData);
            if(!data.GRID0){
              data.GRID0 = [];
            }else{
              that.listNumber += repoconfig.config.pagecount;
              that.loading = false;
            }
          });
      },
      listFunc(index){
        let listData = this.gridData[index],
            stockcode = listData.STOCKCODEINDEX;
        console.log(listData)
        console.log(this.action);
        if ($.trim(listData.STOCKCODEINDEX)=="" && $.trim(listData.ORDERPRICEINDEX)== "" && $.trim(listData.SEATNOINDEX)=="" && $.trim(listData.CONFERNOINDEX)== "" ) {
            $.alert("无此意向单！");
            return;
        }
        let obj = {stockcode:listData.STOCKCODEINDEX,price:listData.ORDERPRICEINDEX,amount:listData.ORDERQTYINDEX,oppseatno:listData.SEATNOINDEX,conferno:listData.CONFERNOINDEX};
        if(this.action){
          obj.action = this.action;
          this.$TZT.tradeaction(obj,this,true);
        }
      }
    },
    filters: {
      dateForm(str,index){
        return util.dateForm(str,index,this.ACTIONS.DATEFORMINDEX);
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
  @import "../../../../assets/less/qtemplate.less";
  .classIfication .table-cont{
    padding-top: 0;
  }
  .explain .cont_list{
    background-color: #f8f8f8;padding: 0 10px;
  }
  .cont_list .list_top{font-size: 0;width: 100%;padding-top: 5px;}
  .cont_list .list_top span{font-size: 12px;}
  .list_top .stockname{font-size: 16px;padding-right: 15px;}
  .list_top .stockcode{color: @color-bg;}
  .list_top .right{text-align: right;}
  .list_top .right .xiwei{padding-left: 10px;}
  .w30{width: 30%;display: inline-block;}
  .w70{width: 70%;display: inline-block;}
  .w50{width: 50%;display: inline-block;}
  .w40{width: 40%;display: inline-block;}
  .w60{width: 60%;display: inline-block;}
</style>

