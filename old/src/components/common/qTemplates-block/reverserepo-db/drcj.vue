<template>
  <div class="cont_list" v-for='item in grid0' @click="listFunc($index)">
    <p class="list_title">
      <span class="w50"><em class="name">{{item.stockName}}</em><em class="code">{{item.stockCode}}</em></span>
    </p>
    <div class="list_con">
      <div class="w60 position">
        <p class="w50 pt15"><em class="con_title center {{item.buyDirectionColor}}">{{item.buyDirection}}</em><em class="cont_time center">{{item.reporeTime}}</em></p>
        <p class="w50"><em class="con_wtname pgray">成交价格</em><em class="con_wtname pgray">成交数量</em><em class="sjcj pgray">成交金额</em></p>
        <span class="vertical h60"></span>
      </div>
      <p class="w40"><span class="accountright wtamount">{{item.matchPrice}}</span><span class="accountright wtamount">{{item.matchQty}}</span><span class="accountright con_sjamount">{{item.dealMoney}}</span></p>
    </div>
    <span class="inco"></span>
  </div>
  <div v-if="noData" class="noData">
    <p class="img"></p>
    <span class="block">~ 查无数据 ~</span>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import service_repo from '../../../deal/service/trade/service_repo'
  import service_ptjy from '../../../deal/service/trade/service_ptjy'
  import util from '../../../../util/util'
  import localService from '../../../../services/localService'
  export default{
    data(){
      return {
        grid0:[],
        A_ARR:[],
        INDEX:['STOCKCODEINDEX','STOCKNAMEINDEX','BUYDIRECTIONINDEX','REPORTTIMEINDEX','ENTRUSTTYPENAMEINDEX','MATCHPRICEINDEX','MATCHQTYINDEX','DEALMONEYINDEX','DATEFORMINDEX'],
        loading:false,
        S_FIELD:'',
        ACTIONS:{},
        INDEXKEY:{},
        listNumber:0,
        noData: false
      }
    },
    ready(){

    },
    attached(){
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
        service_repo.require6778(oSendData)
          .then((data)=>{
            $.hidePreloader();
            var oData = data;
            if(oData.GRID0 ){
              that.loading = false;
            }
            var obj = that.grid0;
            var arr = that.A_ARR;
            if(oSendData.StartPos == 0){
              that.S_FIELD = oData.GRID0[0];
              oData.GRID0.shift();
              //没有数据
              if(!oData.GRID0 || oData.GRID0.length ==0){
                that.noData = true;
              }
              obj = [];
              arr = [];
              var cxzp = {
                ZZPINDEX:data.ZZPINDEX || '',
                DATEFORMINDEX:data.DATEFORMINDEX || '',
                HIDESEGMENTINDEX:data.HIDESEGMENTINDEX || '',
                YKLINDEX:data.YKLINDEX || ''
              };
              this.$dispatch('parentData', data);
              that.$set('ACTIONS',cxzp);
              var indexkey = {};
              that.INDEX.forEach((value) => {
                indexkey[value] = data[value];
              });
              that.$set('INDEXKEY',indexkey);
            }

            if(oData.GRID0 && oData.GRID0.length>0){
              that.A_ARR = arr.concat(oData.GRID0);
              oData.GRID0.forEach((item)=>{
                var listItem = item.split('|');
                var listObj = {};
                that.INDEX.forEach((value)=>{
                  if(oData[value]){
                    listObj[value] = listItem[oData[value]]
                  }
                });
//              console.log(listObj);
                listObj.stockName = listObj.STOCKNAMEINDEX;//证券名称
                listObj.stockCode = listObj.STOCKCODEINDEX;//证券代码
                listObj.buyDirection = listObj.BUYDIRECTIONINDEX;//买卖方向
                listObj.buyDirectionColor = listObj.BUYDIRECTIONINDEX.indexOf('买')>-1?'red':'blue';
                listObj.reporeTime = util.dateForm(listObj.REPORTTIMEINDEX,oData.REPORTTIMEINDEX,oData.DATEFORMINDEX); //成交时间
                listObj.matchPrice = listObj.MATCHPRICEINDEX;//成交价格
                listObj.matchQty = util.toDecimal2(listObj.MATCHQTYINDEX,0);//成交数量
                listObj.dealMoney = listObj.DEALMONEYINDEX;//成交金额
                obj.push(listObj);
              });
              that.$set('grid0',obj);
            }
          })
      },
      listFunc(index){
        var oSave = {
          field: this.S_FIELD+'π'+JSON.stringify(this.ACTIONS),
          Arr: this.A_ARR
        };
        localService.saveMapMesg({C_DETAIL:oSave});
        this.$TZT.action10061({url:'/jy/qinfo.html?num='+index});
      }
    },
    filters:{
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
</style>
