<template>
	<div class="hqmore">
    <div class="box pbox">
      <div class="title">
        <div class="words"><span>沪深</span></div>
        <p class="lines line"></p>
      </div>
      <div class="modulenew b-line">
        <span class="j_dbmr" @click="clickFunc('302|')">沪深A股</span>
        <span class="j_dbmr" @click="clickFunc('310|')">中小板</span>
        <span class="j_dbmr" @click="clickFunc('311|')">创业板</span>
        <span class="j_dbmr" @click="clickFunc('323|')">沪深B股</span>
        <span class="j_dbmr" @click="clickFunc('324|')">上证A股</span>
        <span class="j_dbmr" @click="clickFunc('325|')">深证A股</span>
        <span class="j_dbmr" @click="clickFunc('326|')">上证B股</span>
        <span class="j_dbmr" @click="clickFunc('327|')">深证B股</span>
        <span class="j_dbmr" @click="clickFunc('330|')">沪深基金</span>
        <span class="j_dbmr" @click="clickFunc('331|')">ETF</span>
        <span class="j_dbmr" @click="clickFunc('342|')">LOF</span>
        <span class="j_dbmr" @click="clickFunc('343|')">上证债券</span>
        <span class="j_dbmr" @click="clickFunc('346|')">股转</span>
        <span class="j_dbmr" @click="clickFunc('350|')">风险警示</span>
        <span class="j_dbmr" @click="clickFunc('351|')">退市整理</span>
        <span class="j_dbmr" @click="clickFunc('12|')">大盘指数</span>
      </div>
      <div class="title">
        <div class="word">港股</div>
        <p class="line"></p>
      </div>
      <div class="modulenew b-line">
        <span class="j_dbmr" @click="clickFunc('609|')">沪港通</span>
        <span class="j_dbmr" @click="clickFunc('610|')">深港通</span>
        <span class="j_dbmr" @click="clickFunc('601|')">香港指数</span>
        <span class="j_dbmr" @click="clickFunc('602|')">国企股</span>
        <span class="j_dbmr" @click="clickFunc('603|')">红筹股</span>
        <span class="j_dbmr" @click="clickFunc('604|')">蓝筹股</span>
        <span class="j_dbmr" @click="clickFunc('605|')">AH股</span>
        <span class="j_dbmr" @click="clickFunc('606|')">香港主板</span>
        <!-- <span class="j_dbmr" @click="clickFunc('607|')">创业板</span> -->
        <span class="j_dbmr" @click="clickFunc('608|')">恒指成份</span>
      </div>
      <div class="title">
        <div class="word">全球</div>
        <p class="line"></p>
      </div>
      <div class="modulenew b-line">
        <span class="j_dbmr" @click="clickFunc('901')">全球指数</span>
      </div>
      <div class="title">
        <div class="word">国内期货</div>
        <p class="line"></p>
      </div>
      <div class="modulenew b-line">
        <span class="j_dbmr" @click="clickFunc('701|3')">中金所</span>
        <span class="j_dbmr" @click="clickFunc('702|3')">郑州期货</span>
        <span class="j_dbmr" @click="clickFunc('703|3')">上海期货</span>
        <span class="j_dbmr" @click="clickFunc('704|3')">大连期货</span>
      </div>
      <div class="title">
        <div class="word">外汇</div>
        <p class="line"></p>
      </div>
      <div class="modulenew b-line">
        <span class="j_dbmr" @click="clickFunc('802')">外汇</span>
      </div>
    </div>

  </div>
</template>
<script>
	export default {
		data() {
		  return {
			}
		},
    attached(){
      if(window.setIntervalID){
        window.clearInterval(window.setIntervalID);
      }
    },
    methods:{
      clickFunc(str){
        var aInfo = str.split('|');
        if(aInfo[0]){
          var obj = {
            isblock:0,
            hqmenuitem:aInfo[0]
          };
          if(aInfo[1]){
            obj.subitemspos = aInfo[1];
          }
          this.$TZT.action10075(obj);
        }
      }
    },
    events:{

    }
	}
</script>
<style lang="less" scoped>
  .hqmore .box {
    padding: 0 12px 40px 12px;
  }
  .hqmore .box .title {
    margin-top: 8px;
    margin-bottom: 7px;
    padding-left: 0;
    position: relative;
    height: 16px;
  }
  .title .words {
    color: #9d9d9d;
    font-size: 15px;
    position: relative;
  }
  .title .word {
    height: 16px;
    color: #9d9d9d;
    display: inline-block;
    position: absolute;
    z-index: 3;
    padding-right: 5px;
    background-color: #fff;
  }
  .title .words span {
    background: #fff;
    padding-right: 5px;
  }
  .title .line {
    background: #e4e4e4;
    height: 1px;
    position: relative;
    top: 10px;
  }
  .title .lines {
    position: absolute;
    width: 100%;
    z-index: -1;
  }
  .modulenew {
    font-size: 0;
  }


  .modulenew li.j_dbmr, .modulenew .j_dbmr {
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
  .hqmore .modulenew .j_dbmr {
    margin-top: 8px;
    width: 23%;
    display: inline-block;
    font-size: 12px;
  }
  .hqmore .modulenew span.j_dbmr {
    margin-left: 2%;
    width: 23.5%;
  }
  .hqmore .modulenew .j_dbmr:nth-child(4n+1) {
    margin-left: 0;
  }
  .hqmore .modulenew .j_dbmr:nth-child(1) {
    margin-left: 0;
  }
  .hqmore .title .word {
    font-size: 15px;
  }


</style>
