<template>
    <div class="wapper">
      <ul class="pass">
        <li class="j_cxzj" @click="action10090('/newjy/ptjy/qcxzj.html')">
          <span>资金查询</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10090('/newjy/ptjy/qdrzj.html')">
          <span>当日资金明细</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10061('/newjy/ptjy/qzjls.html?title=资金明细&datetype=1')">
          <span>历史资金明细</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10090('/newjy/ptjy/qdrwt.html')">
          <span>当日委托</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10090('/newjy/ptjy/qdrcj.html')">
          <span>当日成交</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10061('/newjy/ptjy/qhiswt.html?title=历史委托&datetype=1')">
          <span>历史委托</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10061('/newjy/ptjy/qhiscj.html?title=历史成交&datetype=1')">
          <span>历史成交</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10061('/newjy/ptjy/qjgd.html?title=查询交割&datetype=1')">
          <span>查询交割</span>
          <i></i>
        </li>
        <li class="j_cxzj" @click="action10090('/newjy/ptjy/qgdzl.html')">
          <span>股东资料</span>
          <i></i>
        </li>

      </ul>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        isBtn:false
      }
    },
    ready(){

    },
    attached(){
      this.inits();
    },
    methods: {
      inits(){

      },
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
  .wapper{
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
  }
  .pass {
    background-color: #fff;
    margin-bottom: 0.5rem;
    li {
      height: 2.05rem;
      line-height: 2.05rem;
      border-bottom: 1px solid #e4e4e4;
      position: relative;
      padding-left: 0.95rem;
    }
    span {
      font-size: 0.7rem;
      color: #555;
    }
    i {
      position: absolute;
      right: 0.7rem;
      top: 0.9rem;
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      border-width: 0.1rem 0.1rem 0 0;
      border-color: #ccc;
      border-style: solid;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }
</style>

