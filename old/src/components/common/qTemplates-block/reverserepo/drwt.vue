<template>
  <div class="cont_list" v-for="item in grid0" @click="listFunc($index)">
    <p class="list_title">
      <span class="w50"><em class="name">{{item.stockName}}</em><em class="code">{{item.stockCode}}</em></span><span class="w50 category"><!-- <em class={{item.draw}} v-if="noChedan" @click.stop.prevent="doChedan($index)">点击撤单</em> --></span>
    </p>
    <div class="list_con">
      <div class="w60 position">
        <p class="w50 pt15"><em class="cont_time center">{{item.orderTime | dateForm INDEXKEY.ORDERTIMEINDEX}}</em></p><p class="w50"><em class="con_wtname pgray">委托状态</em><em class="con_wtname pgray">委托数量</em><em class="con_wtname pgray">委托价格</em></p>
        <span class="vertical h60"></span>
      </div>
      <p class="w40"><span class="accountright wtamount">{{item.entrustTypename}}</span><span class="accountright wtamount">{{item.orderQty}}</span><span class="accountright con_sjamount">{{item.orderPrice}}</span></p>
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
  export default{
    data(){
      return {
        grid0:[],
        A_ARR:[],
        INDEX:['STOCKCODEINDEX','STOCKNAMEINDEX','ENTRUSTTYPENAMEINDEX','ORDERPRICEINDEX','ORDERQTYINDEX','ORDERTIMEINDEX','DRAWINDEX','DATEFORMINDEX','CONTACTINDEX'],
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
        service_repo.require6776(oSendData)
          .then((data)=>{
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
                listObj.stockCode = listObj.STOCKCODEINDEX;
                listObj.stockName = listObj.STOCKNAMEINDEX;
                listObj.entrustTypename = listObj.ENTRUSTTYPENAMEINDEX;
                listObj.orderPrice = listObj.ORDERPRICEINDEX;
                listObj.orderQty = listObj.ORDERQTYINDEX;
                listObj.orderTime = util.dateForm(listObj.ORDERTIMEINDEX,oData.ORDERTIMEINDEX,oData.DATEFORMINDEX);
                listObj.draw = listObj.DRAWINDEX>0?'chedan':'gray';
                that.noChedan = listObj.DRAWINDEX>0?true:false;
                obj.push(listObj);
              });
              that.$set('grid0',obj);
            }
          })
      },
      doChedan(index){
        // var ele = event.currentTarget;
        // console.log(index);
        var that = this;
        var arrData = this.grid0[index];
        let oSendData = {
          ContactID: arrData.CONTACTINDEX
        };
        var aWord = [];
        aWord.push('<p>代码:' + arrData.stockCode +'</p>');
        aWord.push('<p>名称:' + arrData.stockName  + '</p>');
        aWord.push('<p>价格:' + arrData.orderPrice + '</p>');
        aWord.push('<p>数量:' + arrData.orderQty +  '</p>');
        aWord.push('<p>您是否确认以上撤单?</p>');
        var str = '<div style="text-align: left;">'+aWord.join('')+'</div>';
        $.confirm(str,'撤单信息',function (){
          service_ptjy.require111(oSendData)
            .then((data)=>{
              //$.alert(data.ERRORMESSAGE);
              if(data.ERRORNO>=0){
                that.init();
              }
              console.log(data);
            })
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
//            this.$TZT.action10061({url:'/deal/info?num=' + index});
            this.$TZT.action10061({url:'/jy/qinfo.html?num='+index});
          }
        })
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
</style>
