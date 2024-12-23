<template>
<nav class="date-wrap">
    <div class="wrap"><span class="date-text"><input type="text" id="beigin-input" v-model="beiginValue" /></span><span class="icon">↔</span><span class="date-text"><input type="text" id="end-input" v-model="endValue" /></span><span class="date-btn" @click="dateFunc">确认</span></div>
  </nav>
  <div class="gd"></div>
  <div class="cont_list" v-for='item in grid0' @click="listFunc($index)">
    <p class="list_title">
      <span class="w50"><em class="name">{{item.name}}-{{item.stockName}}&nbsp;{{item.stockCode}}</em></span>
    </p>
    <div class="list_con">
      <div class="w60 position">
        <!-- <p class="w50"><em class="con_title center {{item.buyDirectionColor}}">{{item.buyDirection}}</em><em class="cont_time center">{{item.ordeTime}}</em></p> -->
       <!--  <p class="w50"><em class="con_wtname pgray">委托交易</em><em class="sjcj pgray">实际成交</em></p> -->
        <p class="w50"><em class="con_wtname pgray pgrays">委托金额：{{item.orderQty}}</em><em class="con_wtname pgray pgrays">委托利率：{{item.orderPrice}}</em></p>
        <span class="vertical h60"></span>
          <p class="w50"><em class="con_wtname pgray">委托日期：{{item.ordeTime}}</em></p>
          <span class="vertical h60"></span>
          <p class="cd"><span >{{item.wtState}}</span></p>
      </div>
     <!--  <p class="w40"><span class="accountright wtamount">{{item.orderPrice}}元/{{item.orderQty}}股</span><span class="accountright con_sjamount">{{item.matchPrice}}元/{{item.matchQty}}股</span></p> -->
    </div>
    <span class="inco"></span>
  </div>
  <div v-if="noData" class="noData">
    <!-- <p class="img"></p> -->
    <span class="block">暂无交易记录</span>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import service_repo from '../../../deal/service/trade/service_repo'
  import service_ptjy from '../../../deal/service/trade/service_ptjy'
  import util from '../../../../util/util'
  import localService from '../../../../services/localService'
  import dateFilter from '../../../../filters/dateTimeFormatter'
  var beidate = util.manyDays('-7');
  export default{
    data(){
      return {
        grid0:[],
        A_ARR:[],
        INDEX:['STOCKCODEINDEX','STOCKNAMEINDEX','BUYDIRECTIONINDEX','ORDERTIMEINDEX','ORDERPRICEINDEX','ORDERQTYINDEX','MATCHPRICEINDEX','MATCHQTYINDEX','DATEFORMINDEX','ENTRUSTTYPENAMEINDEX','ORDERDATEINDEX'],
        loading:false,
        S_FIELD:'',
        ACTIONS:{},
        INDEXKEY:{},
        listNumber:0,
        BeginDate:'',//获取时间？
        EndDate: '',
        noData: false,
         beiginValue:util.getYTDS(beidate),
        endValue:dateFilter(new Date().getTime(),2)
      }
    },
    ready(){

    },
    attached(){
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
         var that = this;
         $("#beigin-input").datetimePicker({
            value: that.beiginValue.split('-')
         });
        $("#end-input").datetimePicker({
            value: that.endValue.split('-')
         });
        this.listNumber = 0;
        this.loading = false;
        this.BeginDate = that.beiginValue.replace(/-/g,'');
        this.EndDate = that.endValue.replace(/-/g,'');
        this.loadMore();
      },
      loadMore () {
        var that = this;
        // 如果正在加载，则退出
        if(this.loading){
          return;
        }
        this.loading = true;
        //$.showPreloader();
        let oSendData = {
          //开始日期
          BeginDate: this.BeginDate,
          //结束日期
          EndDate: this.EndDate,
          //起始位置
          StartPos: this.listNumber==0 ? this.listNumber : (this.listNumber+1),
          //最大条数
          MaxCount: repoconfig.config.pagecount
        };
        service_repo.require6778(oSendData)
          .then((data)=>{
            //$.hidePreloader();
            if(data.ERRORNO<0){
              alert(data.ERRORMESSAGE);
            }
            var oData = data;
            if(oData.GRID0 ){
              that.loading = false;
            }
            that.listNumber += (oData.GRID0?oData.GRID0.length:0);
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
                listObj.name = repoconfig.repoData[listObj.STOCKCODEINDEX] + '天期';
                listObj.draw = listObj.DRAWINDEX>0?'chedan':'gray';//可撤
                listObj.buyDirection = listObj.BUYDIRECTIONINDEX;//买卖方向
                listObj.buyDirectionColor = listObj.BUYDIRECTIONINDEX.indexOf('买')>-1?'red':'blue';
                listObj.ordeTime = util.dateForm(listObj.ORDERDATEINDEX,oData.ORDERDATEINDEX,oData.DATEFORMINDEX);//委托时间
                listObj.orderPrice = listObj.ORDERPRICEINDEX;//委托价格
                listObj.orderQty = util.toDecimal2(listObj.ORDERQTYINDEX,0)*100;//委托数量
                listObj.matchPrice = listObj.MATCHPRICEINDEX;//成交价格
                listObj.matchQty = util.toDecimal2(listObj.MATCHQTYINDEX,0);//成交数量
                listObj.wtState = listObj.ENTRUSTTYPENAMEINDEX;//委托状态
                obj.push(listObj);
              });
              that.$set('grid0',obj);
            }
          })
      },
      listFunc(index){
       let oSave = {
          field: this.S_FIELD,
          Arr: this.A_ARR
        };
        localService.saveMapMesg({C_DETAIL: JSON.stringify(oSave)})
          .then((data)=>{
          if(data.ERRORNO>=0){
           // this.$TZT.action10061({url:'/jy/qinfo.html?num='+index});
          }
        })
      },
      dateFunc(){
        var beigin = new Date(this.beiginValue.replace(/-/g,'/')).getTime();
        var end = new Date(this.endValue.replace(/-/g,'/')).getTime();
        if(beigin>end){
          alert("结束时间必须大于起始时间！");
          return;
        }
        /*if(util.DateDiff(this.beiginValue,this.endValue)>100){
          alert("查询间隔不能大于100天");
          return;
        }*/
        window.refreshhistorydata(this.beiginValue.replace(/-/g,''),this.endValue.replace(/-/g,''));
//        console.log(this.beiginValue,this.endValue);
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
  @import "../../../../assets/less/qtemplate-gznhg.less";
   .date-wrap{
    position: absolute;
    right: 0;
    left: 0;
    top:50px;
    z-index: 20;
    height: 1.8rem;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
    background-color: #f7f7f8;
    -webkit-backface-visibility: hidden;
    vertical-align: top;
    backface-visibility: hidden;
    padding: 5px 15px;
    .date-text{
      display: inline-block;
      width: 30%;
      vertical-align: top;
      input{
        width: 100%;
        padding: 0;
        margin: 0;
        height: 1.5rem;
        line-height: 1.5rem;
        border: 1px solid #c5c5c5;
        background: #f9f9f9;
        font-size: 0.7rem;
        text-align: center;
      }
    }
    .icon{
      width: 10%;
      text-align: center;
      vertical-align: top;
      line-height: 1.5rem;
    }
    .date-btn{
      display: inline-block;
      width: 20%;
      margin-left: 10%;
      text-align: center;
      background: #f43438;
      color: #fff;
      font-size: 0.7rem;
      vertical-align: top;
      line-height: 1.5rem;
    }
  }
  .bar-nav ~ .date-wrap{
    top:2.2rem;
  }
  .gd{
    height:85px;
  }
  .list_title{
    vertical-align: bottom;
    padding-left: 20px;
    padding-right: 26px;
   /*  padding-bottom: 10px; */
    border-top: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
    line-height: 35px;
  }
  .list_con{
    padding-top: 20px;
     font-size: 14px;
    color: #0e0e0e;
    vertical-align: top;
    padding-left: 10px;
    padding-right: 26px;
    position: relative;
   /*  border-bottom: 1px solid #f3f3f3; */
    height: 100px;
  }
  @media screen and (max-width:320px) {
     .list_con{
    padding-top: 20px;
     font-size: 12px;
    color: #0e0e0e;
    vertical-align: top;
    padding-left: 10px;
    padding-right: 26px;
    position: relative;
   /*  border-bottom: 1px solid #f3f3f3; */
    height: 100px;
  }
}

  .con_wtname {
    padding-left: 10px;
    line-height: 30px;
  }
  .cd{
    position: absolute;
    top: 26px;
    right: 20px;
    color: #f43438;
    font-size: 14px;
  }
  em.name{
    font-size: 16px;
    color: #3d3d3d;
    line-height: 20px;
    font-weight: 600;
  }
  .pgrays{
    color: #3d3d3d;
  }
</style>
