<template>
  <div class="explain content  infinite-scroll"  v-infinite-scroll="loadMore">
    <div class="classIfication">
      <div class="cont_list" v-for='item in grid0' @click="getInfo($index)">
        <p class="list_title">
          <span class="w50"><em class="name">{{item.stockName}}</em><em class="code">{{item.stockCode}}</em></span>
        </p>
        <div class="list_con">
          <div class="w60 position">
            <p class="w50"><em class="con_title center {{item.buyDirectionColor}}">{{item.buyDirection}}</em><em class="cont_time center">{{item.ordeTime}}</em></p>
            <p class="w50"><em class="con_wtname pgray">委托交易</em><em class="sjcj pgray">实际成交</em></p>
            <span class="vertical h60"></span>
          </div>
          <p class="w40"><span class="accountright wtamount">{{item.orderPrice}}元/{{item.orderQty}}股</span><span class="accountright con_sjamount">{{item.matchPrice}}元/{{item.matchQty}}股</span></p>
        </div>
        <span class="inco"></span>
      </div>
      <div v-if="noData" class="noData">
        <p class="img"></p>
        <span class="block">~ 查无数据 ~</span>
      </div>
    </div>
  </div>
</template>

<script>
  import repoconfig from '../../../scripts/repoconfig'
  import service_repo from '../../../service/trade/service_repo'
  import utils from '../../../../../util/util'
  export default{
    data(){
      return {
        grid0:[],
        INDEX:['STOCKCODEINDEX','STOCKNAMEINDEX','BUYDIRECTIONINDEX','ORDERTIMEINDEX','ORDERPRICEINDEX','ORDERQTYINDEX','MATCHPRICEINDEX','MATCHQTYINDEX','DATEFORMINDEX'],
        loading:false,
        listNumber:0,
        BeginDate:'',//获取时间？
        EndDate: '',
        noData: false
      }
    },
    ready(){
      this.init();
      this.$TZT.refreshhistorydata(this);
    },
    methods: {
      refreshhistorydata(begindate,enddate){
        this.listNumber = 0;
        this.loading = false;
        this.noData = false;
        this.grid0 = [];
        this.BeginDate = begindate;
        this.EndDate = enddate;
        this.loadMore();
      },
      init(){
        this.listNumber = 0;
        this.grid0 = [];
        this.loading = false;
        this.noData = false;
        this.BeginDate = this.$route.query.begindate;
        this.EndDate = this.$route.query.enddate;
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
          //开始日期
          BeginDate: this.BeginDate,
          //结束日期
          EndDate: this.EndDate,
          //起始位置
          StartPos: this.listNumber,
          //最大条数
          MaxCount: repoconfig.config.pagecount
        };
        service_repo.require6777(oSendData)
          .then((data)=>{
            console.log(data);
            $.hidePreloader();
            var oData = data;
            that.listNumber += (oData.GRID0?oData.GRID0.length:0);
            if(oData.GRID0){
              that.loading = false;
            }
            var obj = that.grid0;
            if(oSendData.StartPos == 0){
              that.S_FIELD = oData.GRID0[0];
              oData.GRID0.shift();
              //没有数据
              if(!oData.GRID0 || oData.GRID0.length ==0){
                that.noData = true;
              }
              obj = [];
            }

            if(oData.GRID0 && oData.GRID0.length>0){
              oData.GRID0.forEach((item)=>{
                var listItem = item.split('|');
                var listObj = {};
                that.INDEX.forEach((value)=>{
                  if(oData[value]){
                    listObj[value] = listItem[oData[value]]
                  }
                })
                listObj.stockName = listObj.STOCKNAMEINDEX;//证券名称
                listObj.stockCode = listObj.STOCKCODEINDEX;//证券代码
                listObj.draw = listObj.DRAWINDEX>0?'chedan':'gray';//可撤
                listObj.buyDirection = listObj.BUYDIRECTIONINDEX;//买卖方向
                listObj.buyDirectionColor = listObj.BUYDIRECTIONINDEX.indexOf('买')>-1?'red':'blue';
                listObj.ordeTime = utils.dateForm(listObj.ORDERTIMEINDEX,oData.ORDERTIMEINDEX,oData.DATEFORMINDEX);//委托时间
                listObj.orderPrice = listObj.ORDERPRICEINDEX;//委托价格
                listObj.orderQty = utils.toDecimal2(listObj.ORDERQTYINDEX,0);//委托数量
                listObj.matchPrice = listObj.MATCHPRICEINDEX;//成交价格
                listObj.matchQty = utils.toDecimal2(listObj.MATCHQTYINDEX,0);//成交数量
                obj.push(listObj);
              });
              that.$set('grid0',obj)
            }
          });
      },
      getInfo(index){
        // alert('跳转到详情页面'+index);
        //跳转到详情页面
        //跳转到详情页面
        let oSave = {
          field: this.S_FIELD,
          Arr: this.A_ARR
        };
        localService.saveMapMesg({C_DETAIL: JSON.stringify(oSave)})
          .then((data)=>{
            if(data.ERRORNO>=0){
              this.$TZT.action10061({url:'/index2.html#!/deal/ptjy/info?num=' + index});
            }
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../../assets/less/variables.less';
  @import "../../../../../assets/less/mixins.less";
  @import "../../../../../assets/less/qtemplate.less";
</style>
