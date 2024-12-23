<template>
    <!-- <table>
      <tbody v-for="item in gridData" track-by="$index" @click="listFunc($index)" class="{{item | isBuy YKINDEX}}">
        <tr v-for="trItem in dateArray"><th v-for="dataList in trItem" track-by="$index" class="{{$index | textAgline trItem.length}}">{{dataList | valueKey item | ValueCont dataList}}</th></tr>
      </tbody>
      <tbody v-if="IsGrid" style="border: none;"><tr><th><div class="noData"><p class="img"></p><span>~ 查无数据~</span></div></th></tr></tbody>
    </table> -->
    <div class="titles">
      <p>名称/代码</p>
      <p>成交日期</p>
      <p>年化收益率(%)</p>
      <p>金额</p>
    </div>
    <div class="zt">
      <div class="main" v-for="item in grid0" @click="listFunc($index)">
        <p>
          <span>{{item.stockName}}</span>
          <span>{{item.stockCode}}</span>
        </p>
        <p class="time">{{item.orderTime}}</p>
        <p>{{item.orderPrice}}</p>
        <p>{{item.orderQty}}</p>
      </div>
      <!--  <div class="main" @click="listFunc($index)">
       <p>
         <span>1天期</span>
         <span>204001</span>
       </p>
       <p>2017-09-01</p>
       <p>3.255</p>
       <p>10000</p>
            </div>
      <div class="main" @click="listFunc($index)">
       <p>
         <span>1天期</span>
         <span>204001</span>
       </p>
       <p>2017-09-01</p>
       <p>3.255</p>
       <p>10000</p>
            </div> -->
    </div>
    <div v-if="noData" class="noData">
     <!-- <p class="img"></p> -->
    <span class="block">暂无持有合约</span>
  </div>
</template>

<script>
  import util from '../../../../util/util'
  import repoconfig from '../../../deal/scripts/repoconfig'
  import GRID from '../../../deal/scripts/GRID'
  import service_repo from '../../../deal/service/trade/service_repo'
  import localService from '../../../../services/localService'
  export default{
    props: ['action','viewname'],
    data(){
      return {
       grid0:[],
        A_ARR:[],
        INDEX:['STOCKCODEINDEX','STOCKNAMEINDEX','ENTRUSTTYPENAMEINDEX','MATCHPRICEINDEX','ORDERQTYINDEX','REPORTDATEINDEX','DRAWINDEX','DATEFORMINDEX','CONTACTINDEX','DEALMONEYINDEX','REPORTSDATEINDEX','REMARKINDEX'],
        loading:false,
        S_FIELD:'',
        ACTIONS:{},
        INDEXKEY:{},
        listNumber:0,
        noData: false,
        noChedan:false
      }
    },
    ready(){
//      console.log(1);
    },
    attached(){
      /*this.gridData = [];
      this.gridTitle = [];
      this.dateArray = [];
      this.loading = false;
      this.items = [];
      this.listNumber = 0;
      this.textTitleArray = [];
      this.INDEX = {
        STOCKCODEINDEX:''
      };*/
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
        //$.showPreloader();
        let oSendData = {
          //起始位置
          StartPos: this.listNumber==0 ? this.listNumber : (this.listNumber+1),
          //最大条数
        /*  MaxCount: repoconfig.config.pagecount*/
        };

        service_repo.require6594(oSendData)
          .then((data)=>{
           // $.hidePreloader();
            /*if(data.ERRORNO<0){
              return;
            }
            let oData = GRID.htmltitle(data,that.listNumber);
            that.YKINDEX = data.YKINDEX;
            that.ZZPINDEX = data.ZZPINDEX;
            that.DATEFORMINDEX = data.DATEFORMINDEX;
            if(that.listNumber === 0){
              that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
              data.GRID0 && data.GRID0.shift();
              /*that.$set('textTitleArray',oData.dateTitle);
              that.$set('gridTitle',oData.textTitle);*/
              /*that.$set('dateArray',oData.dateArray);
              var obj = {
                textTitleArray:oData.dateTitle,
                gridTitle:oData.textTitle,
                dateArray:oData.dateArray
              };
              if(data.GRID0.length == 0){
                that.IsGrid = true;
              }
              that.$emit('headtitle', obj);
              this.$dispatch('headtitle', obj);
            }
            if(!data.GRID0){
              data.GRID0 = [];
            }else{
              that.listNumber += repoconfig.config.pagecount;
              that.loading = false;
            }
           that.$set('gridData',data.GRID0);
            var newData = that.gridData.concat(data.GRID0);
            that.$set('gridData',newData);*/
             $.hidePreloader();
            var oData = data;

            that.listNumber += (oData.GRID0?oData.GRID0.length:0);
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
              /*var cxzp = {
                ZZPINDEX:data.ZZPINDEX || '',
                DATEFORMINDEX:data.DATEFORMINDEX || '',
                HIDESEGMENTINDEX:data.HIDESEGMENTINDEX || '',
                YKLINDEX:data.YKLINDEX || ''
              };*/
              this.$dispatch('parentData', data);
              //that.$set('ACTIONS',cxzp);
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
                listObj.stockCode = listObj.STOCKCODEINDEX;
               // listObj.stockName = listObj.STOCKNAMEINDEX;
                listObj.stockName = repoconfig.repoData[listObj.STOCKCODEINDEX]+'天期';
                listObj.entrustTypename = listObj.ENTRUSTTYPENAMEINDEX;
                listObj.orderPrice = listObj.MATCHPRICEINDEX;
                listObj.orderQty = listObj.DEALMONEYINDEX;
                if(listObj.REMARKINDEX==1){
                  listObj.orderTime = listObj.REPORTSDATEINDEX.substring(0,4)+'-'+listObj.REPORTSDATEINDEX.substring(4,6)+'-'+listObj.REPORTSDATEINDEX.substring(6,8);
                }else{
                  listObj.orderTime = listObj.REPORTDATEINDEX.substring(0,4)+'-'+listObj.REPORTDATEINDEX.substring(4,6)+'-'+listObj.REPORTDATEINDEX.substring(6,8);
                }
                
                listObj.draw = listObj.DRAWINDEX>0?'chedan':'gray';
                that.noChedan = listObj.DRAWINDEX>0?true:false;
                obj.push(listObj);
              });
              that.$set('grid0',obj);
            }
          });
      },
      /*listFunc(index){
       let oSave = {
          field: this.S_FIELD,
          Arr: this.A_ARR
        };
        localService.saveMapMesg({C_DETAIL: JSON.stringify(oSave)})
         // .then((data)=>{
          //if(data.ERRORNO>=0){
            this.$TZT.action10061({url:'/deal/detail?num='+index});
            
          //}
        //})
      }*/
      listFunc(index){
       let oSave = {
          field: this.S_FIELD,
          Arr: this.A_ARR
        };
        localService.saveMapMesg({C_DETAIL: JSON.stringify(oSave)})
         // .then((data)=>{
          //if(data.ERRORNO>=0){
            this.$TZT.action10061({url:'/deal/detail?num='+index});
            
          //}
        //})
      }
    
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
   .content{
      position: relative;
      -webkit-overflow-scrolling:auto;
  } 
  .titles{
    width: 100%;
    display: -webkit-box;
    text-align: center;
    font-size: 0.6rem;
    height: 40px;
    line-height: 40px;
    background: #f4f4f4;
    top:0;
    color:#919191;
  }
  .titles p{
    width: 25%;
  }
  .time{
    font-size: 0.7rem ! important;
  }
  .main{
    display: -webkit-box;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 13px;
    border-bottom: 1px solid #f3f3f3;
  }
  .main p{
    width: 25%;
    font-size: 16px;
   /*  font-weight: 600; */
    color: #3d3d3d;
  }
  .main p:nth-child(1){
    line-height: 16px;
    text-align: left;
    padding-left: 6%;
    span{
      display: block;
    }
    span:nth-child(1){
      padding-top: 10px;
    }
    span:nth-child(2){
      color:#919191;
      font-size: 12px;
    }
  }
  .main p:nth-child(4){
    font-size: 12px;
    text-align: right;
    position: absolute;
    right: 10px;
  }

  /* .zt{
    display: none;
  } */
  .noData{
    text-align: center;
    padding-top: 73px;
    color: #919191;
    font-size: 15px;
    height: 200px;
  }
  .noData .img{
    width: 20%;
    padding-bottom: 20%;
    margin: 0 auto 5px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACPCAYAAADDY4iTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RUZBNkQyQjcwODYxMUU1OENGNEUwMEE0ODJFNjk1MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RUZBNkQyQzcwODYxMUU1OENGNEUwMEE0ODJFNjk1MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFRkE2RDI5NzA4NjExRTU4Q0Y0RTAwQTQ4MkU2OTUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdFRkE2RDJBNzA4NjExRTU4Q0Y0RTAwQTQ4MkU2OTUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dRPv7QAAEzBJREFUeNrsXQuQFcUV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) no-repeat;
    background-size: 100% 100%;
  }

</style>

