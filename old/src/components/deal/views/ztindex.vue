<template>
  <div class="explain content native-scroll">
    <h2 class="ztin-title"><span>业务办理</span><span>网上开户，修改密码</span></h2>
    <ul class="ztin-main jBusiness">
      <!--<li class="ztin-list ztin-listFir" data-url="http://action:10048" data-type="0">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">网上开户</p>
          <p class="ztin-note">5-10分钟即可轻松完成在线开户</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>-->
      <li class="ztin-list ztin-listSec" @click="action10090('/zt/zt_pass.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">修改密码</p>
          <p class="ztin-note">交易密码、资金密码</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
      <li class="ztin-list ztin-listThi" @click="action10090('/zt/zt_power.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">设置权限</p>
          <p class="ztin-note">开通权限，安全又方便</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
      <li class="ztin-list ztin-listFou" @click="action10090('/zt/zt_personalInfo.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">修改个人信息</p>
          <p class="ztin-note">手机号码、邮箱、省份、地址</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
      <li class="ztin-list ztin-listFif" @click="action10090('/zt/qsdzht/zt_dzht.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">签署电子合同</p>
          <p class="ztin-note">风险承诺书、风险揭示书、资产管理合同</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
      <li class="ztin-list ztin-listSix" @click="action10090('/zt/zt_electron.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">签署电子签名约定书</p>
          <p class="ztin-note">电子签名约定书</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
      <li class="ztin-list ztin-listSev" @click="action10090('/newzt/zt/zt_risktips.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">风险评测</p>
          <p class="ztin-note">了解自己的投资类型、投资能力</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
    </ul>
    <h2 class="ztin-title"><span>特色业务</span><span>开通港股通</span></h2>
    <ul class="ztin-main jBusiness">
      <li class="ztin-list ztin-listEig ggtkh" @click="action10090('/zt/ggtkt/ggtkt_index.html')">
        <div class="list-box">
          <em class="ztin-icon"></em>
          <p class="ztin-name">开通港股通权限</p>
          <p class="ztin-note">开通即可用A股账户买港股</p>
          <i class="ztin-arrow"></i>
        </div>
      </li>
    </ul>
    <h2 class="ztin-title"></h2>
  </div>
</template>
<script>
  export default{
    data(){
      return {

      }
    },
    ready(){

    },
    attached(){

    },
    methods: {
      action10090(url){
        this.$TZT.action10090({url:url});
      },
      action10061(url){
        this.$TZT.action10061({url:url});
      },
      tradeaction(action){
        this.$TZT.tradeaction({action:action});
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";

  .ztin-title{padding:0.4rem 0.75rem; background:#EFEFF3; font-size:0.6rem; font-weight:normal; line-height:0.4rem;}
  .ztin-title span{font-size:0.7rem;color:#666666;line-height:0.8rem;}
  .ztin-title span:first-child {font-size:0.8rem;color:#007DE3;margin-right:0.55rem;line-height:0.8rem;}

  .ztin-main{background:#ffffff;}
  .ztin-main .ztin-list{padding:0 0 0 2.5rem; position:relative;}
  .ztin-main .hgt-list{padding:0 0 0 2.5rem; position:relative;}
  .list-box{position:relative;padding:0.5rem 0 0.6rem;border-bottom:1px solid #f0f0f0;}
  .ztin-icon{width:0.9rem; height:0.9rem; margin:-0.45rem 0 0; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAFACAYAAADOLj7uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NEEwQTYxOTdFMDNFNTExOUM4OUE4QTMzMkM1REQ5RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NUQzQ0I1MDAzOTMxMUU1QjE3ODhDMEIyMDkxMkU3NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NUQzQ0I0RjAzOTMxMUU1QjE3ODhDMEIyMDkxMkU3NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE1QURGRTQ1OTMwM0U1MTE5QzIxREVCOUFCQjEzMDZBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg0QTBBNjE5N0UwM0U1MTE5Qzg5QThBMzMyQzVERDlFIi8+IDwvcmRmOkRlc2NyaXB0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") no-repeat; background-size:0.9rem 7.2rem; position:absolute; left:-1.5rem; top:50%;}
  .ztin-listFir .ztin-icon{background-position:center 0;}
  .ztin-listSec .ztin-icon{background-position:center -0.9rem;}
  .ztin-listThi .ztin-icon{background-position:center -1.8rem;}
  .ztin-listFou .ztin-icon{background-position:center -2.7rem;}
  .ztin-listFif .ztin-icon{background-position:center -3.6rem;}
  .ztin-listSix .ztin-icon{background-position:center -4.5rem;}
  .ztin-listSev .ztin-icon{background-position:center -5.4rem;}
  .ztin-listEig .ztin-icon{background-position:center -6.3rem;}
  .ztin-name{padding:0 0 0.4rem; font-size:0.8rem; line-height:0.8rem;color:#000000;}
  .ztin-note{font-size:0.6rem; line-height:0.6rem;color:#848484;}
  .ztin-arrow{width:0.35rem; height:0.6rem; margin:-0.3rem 0 0; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAAG9wPzBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjBBMjU4MDIyNzc0MTFFNEEyNkJDMkZGOEI5MjkyMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjBBMjU4MDMyNzc0MTFFNEEyNkJDMkZGOEI5MjkyMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMEEyNTgwMDI3NzQxMUU0QTI2QkMyRkY4QjkyOTIxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMEEyNTgwMTI3NzQxMUU0QTI2QkMyRkY4QjkyOTIxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgOlSh0AAAGoSURBVHjaYvz//z8DCDCBiMuXL/8HM0AAIIAY4VJABjuYcfv27S8gBkAAMfz794/90qVL/0FKQBiu9tatW79//vzJwvDs2bMNyCoAAgisBcZhunLlyg+QUrg9IJvZ2dn/MMCUgPTCGSC9cAZIECCA4A64efPmb5gWFMeA3AyyBWQDyGA1NTVWFF+BALIiJiYmBrjfQQDuWSDQ1NQUYEHxHxDo6OhwMDIy/oQZxXD37t2nyN6EYYAAgjsIrhoJMN0HApAjYKGMIgkUZAMxsCkAGwsMgP+/fv1iQHcQ2Cvq6uqMbGxgA1BMQAkEZBO0tbUFcIYQMzMzIoTQg05LS4uRBV0CZDfIDfBUhE0C7CBwdGORgKc2UNiihysIAwQYPGwfPHhwA6RYQUFBA1s4owNGUAp98+aNP7IgKKWoqqry4DMAbiMwLfyABRwxBmAELLEGoGgkZAAoljQ0NASAkfIRq0ZkA4Bx/+P3798YBjDh0wTKGOiagM4F28qCSwMs08AAKKKBeRKeXllI1QADLLDI//LliwIxGuAaobaxEasBIzrg2YmI5AYCANtmpA13A9YBAAAAAElFTkSuQmCC") no-repeat center; background-size:0.35rem 0.6rem; position:absolute; right:0.75rem; top:50%;}
</style>
