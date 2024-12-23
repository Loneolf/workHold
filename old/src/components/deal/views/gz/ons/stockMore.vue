<template>
  <div class="explain content">
    <div class="wrancont">
      <div class="modulenew">
          <span class="wp_cont_list j_dbmr" @click="action10090('/jy/gz/gz_gjqr.html?sType=0')">成交确认买入<em class="cont_img xyzr2"></em></span><!--
        --><span class="wp_cont_list" @click="action10090('/jy/gz/gz_gjqr.html?sType=1')">成交确认卖出<em class="cont_img xyzr3"></em></span><!--
        --><span class="wp_cont_list j_dbmr" @click="tradeaction('13016')">互报成交确认买入<em class="cont_img xyzr4"></em></span><!--
        --><span class="wp_cont_list" @click="tradeaction('13017')">互报成交确认卖出<em class="cont_img xyzr5"></em></span><!-- 
         --><span class="wp_cont_list j_dbmr" @click="action10090('/jy/ptjy/qTemplate.html?title=委托查询&url=/jy/gz/js/gz_weituonew.js')">委托查询<em class="cont_img qt3"></em></span>
      </div>
    </div>
  </div>
</template>
<script>
  import localService from '../../../../../services/localService'

  export default{
    data(){
      return {
        isBtn:false
      }
    },
    ready(){

    },
    attached(){
    },
    methods: {
      action10090(url){
        this.$TZT.action10090({url:url,logintype:1});
      },
      action10061(url){
        if(url.indexOf('?')>-1){
          url+='&logintype=1'
        }else {
          url+='?logintype=1'
        }
        this.$TZT.action10061({url:url});
      },
      tradeaction(action){
        this.$TZT.tradeaction({action:action});
      }
    }
  }
</script>
<style lang="less" scoped>
  .explain{
    top: 1.6rem;display: block;
  }
  .explain .content{
    padding-top: 1.6rem;
  }
  .wrancont{
    width: 100%;
    height: 100%;
    position: relative;
  }

  .modulenew {
    font-size: 0;display: block;padding: 0 10px;
  }
  .modulenew .j_dbmr {
    margin-right: 4%;
  }
  .modulenew .wp_cont_list {
    width: 48%;
    display: inline-block;
    font-size: 15px;
    height: 35px;
    background: #f0f0f0;
    border-radius: 5px;
    text-align: center;
    line-height: 35px;
    color: #292929;
    margin-top: 10px;
  }
</style>

