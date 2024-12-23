<template>
  <div class="explain content native-scroll">
    <div class="classIfication">
      <div class="cont_list">
        <p class="list_title">
          <span class="w50"><em class="name">亚迪投票</em><em class="code">362594</em></span>
          <span class="w50 category"><em class="chedan ">点击撤单</em></span>
        </p>
        <div class="list_con">
          <div class="w60 position">
            <p class="w50 pt15"><em class="con_title center red">买入</em><em class="cont_time center">2016/01/02</em></p>
            <p class="w50"><em class="con_wtname pgray">委托状态</em><em class="con_wtname pgray">委托交易</em><em class="sjcj pgray">实际成交</em></p>
            <span class="vertical h60"></span>
          </div>
          <p class="w40"><span class="accountright wtamount"></span><span class="accountright wtamount">/股</span><span class="accountright con_sjamount">/股</span></p>
        </div>
        <span class="inco"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import repoconfig from '../../../scripts/repoconfig'
  import service_ptjy from '../../../service/trade/service_ptjy'
	export default{
		data(){
			return {
        gridData:[],
        gridTitle:[],
        dateArray:[],
        loading:false,
        items: [],
        listNumber:0,
        textTitleArray:[]
			}
		},
    ready(){
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
        service_ptjy.require113(oSendData)
          .then((data)=>{
            console.log(data);
            $.hidePreloader();
          });
      }
    }
	}
</script>

<style lang="less" scoped>
	@import '../../../../../assets/less/variables.less';
  @import "../../../../../assets/less/mixins.less";
	.classIfication{
    position: relative;
    height:100%;
    .cont_list {
      margin-top: 10px;
      background: #1f1f1f;
      padding: 10px 0 0;
      position: relative;
    }
    .cont_list .list_title {
      vertical-align: bottom;
      font-size: 0;
      padding-left: 10px;
      padding-right: 26px;
    }
    .list_con {
      padding-top: 10px;
      font-size: 0;
      color: #f5f5f5;
      vertical-align: top;
      padding-left: 10px;
      padding-right: 26px;
      position: relative;
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
    .list_title .category {
      font-size: 14px;
      color: #fff;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: top;
      line-height: 20px;
    }
    .list_con .accountright {
      text-align: right;
      display: block;
      line-height: 14px;
      padding-bottom: 10px;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      height: 24px;
    }
    .list_con .w50, .list_con .w40, .list_con .w60 {
      vertical-align: top;
    }
    .list_con .con_title, .list_con .cont_time {
      padding-right: 10px;
      font-size: 14px;
      display: block;
      line-height: 14px;
      padding-bottom: 10px;
      word-break: break-all;
      word-wrap: break-word;
      text-align: center;
    }
    .list_title .name {
      font-size: 18px;
      color: #fff;
      line-height: 20px;
    }
    .list_title .code {
      font-size: 12px;
      color: #999;
      padding-left: 11px;
    }
    .list_con .con_wtname, .list_con .sjcj {
      padding-left: 10px;
      font-size: 14px;
      display: block;
      line-height: 14px;
      padding-bottom: 10px;
      text-align: left;
    }
	}
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w60 {
    width: 60%;
    display: inline-block;
  }
  .w40 {
    width: 40%;
    display: inline-block;
  }
  .pt15 {
    padding-top: 15px;
  }
  .red, .cont .red {
    color: #ec2f1f;
  }
  em{
    font-style: normal;
    font-weight: normal;
  }
</style>
