<template>
  <div class="explain content native-scroll">
    <div class="buttons-tab fixed-tab buttons-fixed" data-offset="44">
      <a href="#tab1" class="tab-link button active"><span class="active">当日委托</span></a>
      <a href="#tab2" class="tab-link button"><span class="">历史委托</span></a>
    </div>
    <div class="tabs">
      <div id="tab1" class="tab active classIfication content">
        <templatesblock url="reverserepo/chedan"></templatesblock>
      </div>
      <div id="tab2" class="tab">
       <templatesblock url="reverserepo/hiswt"></templatesblock>
        <!-- <div class="list-p">
          <p @click="clickdata(0)"><span>当日委托</span><i></i></p>
          <p @click="clickdata(1)"><span>当日成交</span><i></i></p>
        </div> -->
      <!--   <div class="list-p">
        <p @click="clickdata(2)"><span>历史委托</span><i></i></p>
       <p @click="clickdata(3)"><span>历史成交</span><i></i></p>
      </div> -->
      </div>
    </div>
</template>
<script>
  import templatesblock from '../../../common/templates-block-gznhg.vue'
  export default {
    data(){
      return {

      }
    },
    ready(){

    },
    attached(){
      let tab = this.$route.query.tab || 0;
      if(tab == 1){
        this.$route.router.app.title = '查询';
        $.showTab('#tab2',$(this.$el).find('.tab-link')[tab]);
      }else {
        this.$route.router.app.title = '撤单';
        $.showTab('#tab1',$(this.$el).find('.tab-link')[tab]);
      }
    },
    methods: {
      clickdata(index){
        let urlArray = [
          '/deal/reverseRepo/drwt',//当日委托
          '/deal/reverseRepo/drcj',//当日成交
          '/deal/reverseRepo/hiswt',//历史委托
          '/deal/reverseRepo/hiscj'//历史成交
        ];

        var obj = {url:urlArray[index]};
        if(index>1){
          obj.url += '?datetype=1';
        }
        this.$TZT.action10061(obj);
      }
    },
    components:{
      templatesblock
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/qtemplate.less";
  .tabs .tab {
    display: none;
  }
  .tabs .tab.active {
    display: block;
    padding:2rem 0 0;
  }
  .classIfication{
    top:2.5rem;
  }
  .w50 {
    width: auto;
  }
  .explain .buttons-tab .button.active span{
    border:none;
  }
</style>
