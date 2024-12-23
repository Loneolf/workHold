<template>
  <div class="content">
    <div class="trade_nav">
      <ul class="cleart">
        <li class="trade_li"><a class="r_login" href="javascript:void(0);" @click="tradeaction('12310')">买入</a></li>
        <li class="trade_li"><a class="r_login" href="javascript:void(0);" @click="tradeaction('12311')">卖出</a></li>
        <li class="trade_li"><a class="r_login" href="javascript:void(0);" @click="tradeaction('12340')">撤单</a></li>
        <li class="trade_li"><a href="javascript:void(0);" @click="action10090('/jy/ptjy/qTemplate.html?title=查询资金&url=/jy/ptjy/js/qcxzjnew.js')">查询资金</a></li>
        <li class="trade_li"><a href="javascript:void(0);" @click="tradeaction('12342')">我的持仓</a></li>
        <li class="trade_li"><a href="javascript:void(0);" @click="action10090('/jy/ptjy/qTemplate.html?title=当日委托&url=/jy/ptjy/js/qdrwtnew.js')">当日委托</a></li>
        <li class="trade_li"><a href="javascript:void(0);" @click="action10090('/jy/ptjy/qTemplate.html?title=当日成交&url=/jy/ptjy/js/qdrcjnew.js')">当日成交</a></li>
        <li class="trade_li"><a href="javascript:void(0);" @click="action10090('/deal/stock?tab=4')">更多</a></li>
      </ul>
    </div>
    <div id="wrapper_yourname">
      <div class="trade_nav2">
        <ul>
          <li><a href="javascript:void(0);" @click="action10090RZRQ('/deal/rzrq/index')">融资融券</a></li>
          <!--<li><a href="javascript:void(0);" @click="action10090('/jy/kfjj/kfjj_index2.0.html')">开放式基金</a></li>-->
          <li><a href="javascript:void(0);" @click="action10090('/jy/xgsg/xgsg_index2.0.html')">新股申购<i v-show="isShow" class="arrow">今日有{{xg}}只新股可申购</i></a></li>
          <li><a href="javascript:void(0);" @click="action10090('/jy/dcgyh/dcg_index2.0.html')">银证转账</a></li>
          <li v-show="channelgj"><a href="javascript:void(0);" @click="action10090('/jy/xed/index_new.html')">微短融</a></li>
          <!--<li><a href="javascript:void(0);" @click="action10090('/jy/dcgyh/dcg_index2.0.html')">多银行存管</a></li>-->
          <!--<li><a href="javascript:void(0);" @click="action10090('/jy/cnjj/cnjj_index2.0.html')">场内基金</a></li>-->
          <!--<li><a href="javascript:void(0);" @click="action10090('/deal/reverseRepo/index')">国债逆回购</a></li>-->
          <li><a href="javascript:void(0);" @click="actionGgt('/deal/ggt/index')">港股通</a></li>
          <li><a href="javascript:void(0);" @click="action10090('/deal/gz/gz_index')">股转业务</a></li>
          <li><a href="javascript:void(0);" @click="action10090('/zt/yw_index.html')">业务办理</a></li>
        </ul>
      </div>
    </div>
    <p class="out" v-show="isBtn" @click="goOut">退出</p>
  </div>
</template>
<script>
  import localService from '../../../services/localService'
  import service_ptjy from '../service/trade/service_ptjy'
  export default{
    data(){
      return {
        isBtn:false,
        xg:'',
        isShow:false,
        channelgj:true
      }
    },
    ready(){

    },
    attached(){
      this.inits();
      localService.saveMapMesg({'vivoDateTest':'11111'});
    },
    methods: {
      inits(){
        this.loadxg ();
        localService.readMapMesg(['jyloginflag'])
          .then((local)=>{
            if(local.jyloginflag && local.jyloginflag >= 1){
              this.isBtn = true;
            }else{
              this.isBtn = false;
            }
          });
//          localService.readLocalMesg(['channelgj'])
//                  .then((data)=>{
//            if(data.channelgj==1){
//            //机构用户
//            this.channelgj= false;
//            }else{
//              this.channelgj= true;
//            }
//          });
      },
      loadxg () {
        var that = this;
        let oSendData = {
        };
        service_ptjy.require686(oSendData)
                .then((oSend)=>{

        if(oSend.ERRORNO<0){
          return ;
        }
        oSend.GRID0.shift();
        var oGend = oSend.GRID0;
        if (oGend == undefined || oGend.length <= 0) {
          return false;
        }
        this.xg = oSend.GRID0.length ;
        this.isShow= true;
      });
      },
      goOut(){
        var that =this;
        $.confirm('是否确认退出？', function () {
//          localService.removemapMesg(['channelgj']);
          that.channelgj= true;
          that.isBtn = false;
          // that.$TZT.action10402();
          that.$TZT.action10408();
        });

      },
      action10090RZRQ(url){
        this.$TZT.action10090({url:url,logintype:2});
      },
      action10090(url){
        this.$TZT.action10090({url:url});
      },
      action10061(url){
        this.$TZT.action10061({url:url});
      },
      tradeaction(action){
        this.$TZT.tradeaction({action:action});
      },
      actionGgt(url){
        this.$TZT.action10090({url:url,isCheckLoginRight:'ggt'}); //检查港股通权限
      },
      back() {
        pushHistory();
        window.addEventListener("popstate", function (e) {
          var hashLocation = location.hash;
          var hashSplit = hashLocation.split("#!/");
          var hashName = hashSplit[1];
          if (hashName !== '') {
            var hash = window.location.hash;
            console.log(hash)
            if (hash === '#!/deal/index') {
              $.confirm('您是否确认要退出德邦H5行情交易！', function () {
              }, function () {
                pushHistory(hash);
              });
            }
          }
        }, false);
        function pushHistory(hash) {
          var state = {
            title: "title",
            url: hash
          };
          window.history.pushState(state, "title", hash);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .trade_nav {
    /*background: #F3F3F3;*/
  }
  .trade_nav ul li {
    float: left;
    height: 4rem;
    width: 25%;
  }
  .trade_nav ul li a {
    display: block;
    padding-top: 2.5rem;
    height: 4rem;
    line-height: 1.5rem;
    text-align: center;
    color: #666;
    position: relative;
    text-decoration: none;
    font-size: 0.6rem;
    border-left: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }
  .trade_nav ul li a:before {
    content: "";
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0.5rem;
    left: 50%;
    margin-left: -1rem;
    -moz-border-radius: 0.8rem;
    -webkit-border-radius: 0.8rem;
    border-radius: 0.8rem;
  }
  .trade_nav ul li:nth-child(1) a:before {
    background: url(../../../assets/jy/images/nav_1.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(2) a:before {
    background: url(../../../assets/jy/images/nav_2.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(3) a:before {
    background: url(../../../assets/jy/images/nav_3.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(4) a:before {
    background: url(../../../assets/jy/images/nav_4.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(5) a:before {
    background: url(../../../assets/jy/images/nav_5.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(6) a:before {
    background: url(../../../assets/jy/images/nav_6.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(7) a:before {
    background: url(../../../assets/jy/images/nav_7.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav ul li:nth-child(8) a:before {
    background: url(../../../assets/jy/images/nav_8.png) no-repeat center;
    background-size: 30px 28px
  }
  .trade_nav2 ul {
    margin-bottom: 10px;
    background: #fff;
    padding-left: 16px;
  }
  .trade_nav2 ul li a {
    display: block;
    height: 2.2rem;
    line-height: 2.2rem;
    position: relative;
    color: #666;
    font-size: 0.7rem;
    text-decoration: none;
    border-bottom: 1px solid #e4e4e4;
  }
  .trade_nav2 ul li a:before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACdSURBVFhH7ZfRDYAgEEMZwVEciZH8g/CDIziKG+nVQELMxb87YlITfu2z9CiGwOcvDqSUYs75rLUu7sxN/BIALF+IUsrahDuAL4SIbwqAL4RswU4IJJ9O9PmnE3Ti3QVfmTDvDZQT+kE7qABmCkBx2j46wMCZjdvUUcNXyT4fU9LeLdUupeaBU856/BM8t2J38aF64zRxs4TzxeLADY1N3q/A43nfAAAAAElFTkSuQmCC) no-repeat center;
    background-size: 0.8rem 0.8rem;
    position: absolute;
    right: .5rem;
    top: 50%;
    margin-top: -0.4rem;
  }
  .out{
    line-height: 2rem;
    text-align: center;
    display: block;
    background: #b8b8b8;
    margin: 0 1rem 0.5rem;
  }
  .trade_li:active{
     background: #f0f0f0;
   }
  .cleart:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
  }
  .arrow{font-size: 0.68rem;margin-left: 0.6rem;color: #0894ec;font-style:normal}
</style>
