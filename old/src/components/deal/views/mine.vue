<template>
  <div class="explain content native-scroll">
    <div class="mine-top">
      <div class="half rmb">
        <p><em>人民币总资产(元)</em></p>
        <p class="large"><em>{{rmb}}</em></p>
      </div>
      <div class="half">
        <!--<div class="zfz">
          <p><em>总负债(元)</em></p>
          <p><em>{{zfz}}</em></p>
        </div>-->
        <div class="jzc">
          <p><em>净资产(元)</em></p>
          <p class="large"><em>{{jzc}}</em></p>
        </div>
      </div>
    </div>
    <div class="mine-mid">
      <div class="half">
         <p><em>港币总资产</em></p>
         <p><em>{{gb}}</em></p>
      </div>
      <div class="half">
         <p><em>美元总资产</em></p>
         <p><em>{{my}}</em></p>
      </div>
    </div>
    <div class="mine-bot">
      <div class="line">
        <p class="yzzh" @click="action10090('/jy/dcgyh/dcg_index2.0.html')">
          <em class="cash"></em>
          <em>现金</em>
          <span class="right">
            <em>银证转账</em>
            <em class="gt"></em>
          </span>
        </p>
      </div>
      <div class="loginEntry">
        <div class="">
          <p>现金资产(元): {{xjzc}}</p>
          <p>可取(元): {{kq}}</p>
          <p>可用(元): {{ky}}</p>
        </div>
        <div class="half" v-show="isbtn">
          <span class="login right" @click="action10090('/deal/ztindex')">请登录</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import localService from '../../../services/localService'
  import repoconfig from '../scripts/repoconfig'
  import GRID from '../scripts/GRID'
  import service_ptjy from '../service/trade/service_ptjy'
  import util from '../../../util/util.js';
  export default{
    data(){
      return {
        rmb:'--',//人民币总资产
        zfz:'--',//总负债
        jzc:'--',//净资产
        gb:'--',//港币
        my:'--',//美元
        xjzc:'--',//现金资产
        kq:'--',//可取
        ky:'--',//可用
        isbtn:'true'
      }
    },
    ready(){
    },
    attached(){
      this.inits();
    },
    methods: {
      inits(){
        var that=this;
        localService.readMapMesg('jyloginflag').then((local)=>{
          console.log(local);
          if(local.jyloginflag && local.jyloginflag >= 1){
            that.isbtn = false;
            that.loadMore();
          }else{
            that.isbtn = true;
            that.rmb='--';
            that.zfz='--';
            that.jzc='--';
            that.gb='--';
            that.my='--';
            that.xjzc='--';
            that.kq='--';
            that.ky='--';
          }
        });
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
      loadMore () {
        var that = this;
        $.showPreloader();
        let oSendData = {
          StartPos: 0,
          MaxCount: repoconfig.config.pagecount
        };
        service_ptjy.require117(oSendData).then((data)=>{
          console.log(data);
          if(!data.GRID2 || data.GRID2.length==1){
            $.hidePreloader();
            return;
          }else{
            console.log(data.GRID2.shift());
            var newData=data.GRID2;
            for(var i=0;i<newData.length;i++){
              var item=newData[i].split('|');
              console.log(item);
              if(item[0]=='人民币'){
                that.$set('rmb',util.numTosize(item[4],3));
                that.$set('kq',util.numTosize(item[2],3));
                that.$set('ky',util.numTosize(item[3],3));
                that.$set('xjzc',util.numTosize(item[8],3));
                that.$set('jzc',util.numTosize(item[9],3));
              }
              if(item[0]=='美元'){
                that.$set('my',util.numTosize(item[4],3));
              }
              if(item[0]=='港币'){
                that.$set('gb',util.numTosize(item[4],3));
              }
            }
            console.log(newData);
          }
          $.hidePreloader();
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .bar:after{height: 0;}
  .mine-top{background-color:#f24957;color:#f7f7f7;padding:1% 3%;font-size:0.7rem;}
  .large{font-size:1.0rem;line-height:2.5rem;}
  // f25a68
  .mine-mid{background-color:#f24957;margin-top:-1px;color:#f7f7f7;padding:1% 3%;font-size:0.7rem;}
  .half{width:49%;display:inline-block;vertical-align: top;}

  .yzzh{padding:2% 3%;font-size:0.8rem;}
  .line:after{content:'';height: 1px;width: 100%;background-color: #e7e7e7;display: block;z-index: 15;}
  .yzzh em{vertical-align: middle;display:inline-block;}
  .cash{width:1.1rem;height:1.1rem;background:url(../../../assets/jy/images/cash.png) no-repeat;background-size:1.1rem;margin-right: 5px;margin-bottom: 2px;}
  .right{float:right}
  .right .gt{
    display:inline-block;width:0.8rem;height:0.8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACdSURBVFhH7ZfRDYAgEEMZwVEciZH8g/CDIziKG+nVQELMxb87YlITfu2z9CiGwOcvDqSUYs75rLUu7sxN/BIALF+IUsrahDuAL4SIbwqAL4RswU4IJJ9O9PmnE3Ti3QVfmTDvDZQT+kE7qABmCkBx2j46wMCZjdvUUcNXyT4fU9LeLdUupeaBU856/BM8t2J38aF64zRxs4TzxeLADY1N3q/A43nfAAAAAElFTkSuQmCC) no-repeat center;
    background-size: 0.8rem 0.8rem;
   }
   .right em{vertical-align:middle}

   .w60{width:59%;display:inline-block;}
   .loginEntry{padding:5%;font-size:0.7rem}
   .loginEntry .w60{vertical-align:middle}
   .loginEntry .w60 p{padding:3px;}
   .loginEntry .half{width:90%;/*float:right;*/margin-top: 1rem;}

   .login{display:inline-block;width:90%;padding:0.5rem;background:#f24957;border-radius:4px;text-align:center;color:#f7f7f7;font-size: 0.8rem}
</style>
