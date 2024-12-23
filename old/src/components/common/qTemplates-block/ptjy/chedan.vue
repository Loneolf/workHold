<template>
  <div class="cont_list" v-for="items in gridData" v-on:click="listFunc($index)">
    <p class="list_title"><span class="w50"><em class="name">{{items.STOCKNAMEINDEX}}</em><em class="code">{{items.STOCKCODEINDEX}}</em></span><span class="w50 category"><em class="chedan {{items.DRAWINDEX == 0 ?'gray':''}}" @click.stop.prevent="cancelFunc($index)">点击撤单</em></span></p>
    <div class="list_con"><div class="w50 position" style="width:60%"><p class="w50 pt15 center"><em class="con_title {{items.BUYDIRECTIONINDEX.indexOf('买')>-1?'red':'blue'}}">{{items.BUYDIRECTIONINDEX}}</em><em class="cont_time">{{items.ORDERTIMEINDEX | dateForm INDEXKEY.ORDERTIMEINDEX}}</em></p><p class="w50"><em class="con_wtname pgray">委托状态</em><em class="con_wtname pgray">委托交易</em><em class="sjcj pgray">均价/委托数量</em></p><span class="vertical h60"></span></div><p class="w50" style="width:40%"><span class="accountright wtamount">{{items.ENTRUSTTYPENAME}}</span><span class="accountright wtamount">{{items.ENTRUSTPRICE}}/{{items.AMOUNTINDEX}}股</span><span class="accountright con_sjamount">{{items.BUSINESSPRICE}}/{{items.BUSINESSAMOUNT}}</span></p></div>
    <span class="inco t65"></span>
  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import service_ptjy from '../../../deal/service/trade/service_ptjy'
  import localService from '../../../../services/localService'
  import util from '../../../../util/util'
  export default{
    data(){
      return {
        gridData:[],
        loading:false,
        INDEX: ['STOCKCODEINDEX','STOCKNAMEINDEX','ENTRUSTTYPENAME','ENTRUSTPRICE','AMOUNTINDEX','ORDERTIMEINDEX','BUSINESSPRICE','BUSINESSAMOUNT','DRAWINDEX','BUYDIRECTIONINDEX','CONTACTINDEX','DRAWINDEX'],
        listNumber:0,
        INDEXKEY:{},
        S_FIELD:'',
        A_ARR:[],
        ACTIONS:{}
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
        this.gridData = [];
        this.INDEXKEY = {};
        this.S_FIELD = '';
        this.A_ARR = [];
        this.ACTIONS = {};
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
        service_ptjy.require152(oSendData)
          .then((data)=>{
            console.log(data);
            $.hidePreloader();
            var ArrayData = [];

// data.GRID0=
// ["合同编号|名称|委托状态|委托|数量|时间|均价|成交数量|股票代码|方向|是否可撤|股东代码|市场类型|可撤|市场类别|","2|青岛啤酒|待报|38.000|100.00|131305|0.000|0.00|600600|买入|不可撤|A764231835|上海A|0|SHACCOUNT|","1|青岛啤酒|待报|38.290|100.00|102524|0.000|0.00|600600|买入|不可撤|A764231835|上海A|0|SHACCOUNT|"]
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
                ZZPINDEX:data.ZZPINDEX || '',
                DATEFORMINDEX:data.DATEFORMINDEX || '',
                HIDESEGMENTINDEX:data.HIDESEGMENTINDEX || '',
                YKLINDEX:data.YKLINDEX || ''
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
            data.GRID0.forEach((item) => {
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
      cancelFunc(index){
        var that = this;
        var oSendData = this.gridData[index];
        var oSend = {
          ContactID:oSendData.CONTACTINDEX
        };
        var sConfirm = `<p>操作:${oSendData.BUYDIRECTIONINDEX}</p><p>代码:${oSendData.STOCKCODEINDEX}</p><p>名称:${oSendData.STOCKNAMEINDEX}</p><p>价格:${oSendData.ENTRUSTPRICE}</p><p>数量:${oSendData.AMOUNTINDEX}</p><p>您是否确认以上撤单?</p>`;
        $.confirm(
          `<div style="text-align: left;">${sConfirm}</div>`,
          '撤单信息',
          function () {
            service_ptjy.require111(oSend)
              .then((data)=>{
                $.alert((data.ERRORMESSAGE || '撤单成功'));
                if(data.ERRORNO>=0){
                  that.init();
                }
              })
          });
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
  .cont_list {
    margin-top: 10px;
    padding: 10px 0 0;
    background: #f8f8f8;
    position: relative;
  .list_title {
    vertical-align: bottom;
    font-size: 0;
    padding-left: 10px;
    padding-right: 26px;
  .name {
    font-size: 18px;
    line-height: 20px;
  }
  .code {
    font-size: 12px;
    color: @color-bg-secondary;
    padding-left: 11px;
  }
  .list_title .code {
    font-size: 12px;
    color: #999;
    padding-left: 11px;
  }
  .category {
    font-size: 14px;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    line-height: 20px;
  .chedan {
    color: #fff;
    display: inline-block;
    padding: 5px 10px;
    background: #cb2323;
    position: absolute;
    right: 17px;
    top: 5px;
  }
  .gray{
    background: #9a9a9a;color: #fff;
  }
  }
  }
  .list_con {
    padding-top: 10px;
    font-size: 0;
    vertical-align: top;
    padding-left: 10px;
    padding-right: 26px;
    position: relative;
  .position {
    position: relative;
    vertical-align: top;
  }
  .w50{
    vertical-align: middle;
  }
  .center {
    text-align: center;
  }
  .con_title,.cont_time {
    padding-right: 10px;
    font-size: 14px;
    display: block;
    line-height: 14px;
    padding-bottom: 10px;
    word-break: break-all;
    word-wrap: break-word;
    text-align: center;
  }
  .con_wtname,.sjcj {
    padding-left: 10px;
    font-size: 14px;
    display: block;
    line-height: 14px;
    padding-bottom: 10px;
    text-align: left;
  }
  .vertical {
    height: 80%;
    display: inline-block;
    width: 1px;
    position: absolute;
    left: 50%;
    background: #cac8c8;
  }
  .accountright {
    text-align: right;
    display: block;
    line-height: 14px;
    padding-bottom: 10px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  }
  }
  .pt15 {
    padding-top: 15px;
  }
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .cont_list .inco {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-bottom: 1px solid #767676;
    border-right: 1px solid #767676;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -9px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    filter: "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=0.7660444431189777, M12=-0.6427876096865394, M21=0.6427876096865398, M22=0.7660444431189779)";
  }
  .red, .cont .red {
    color: #ec2f1f;
  }
  .blue, .cont .blue{
    color: #21a723;
  }
</style>
