<template>
  <div class="content">
    <div class="buttons-tab buttons-fixed">
      <a href="#tab1" class="tab-link button" v-for="tab in tabs" @click="choose($index)" :class="{'active':$index===selected}"><span :class="{'active':$index===selected}">{{tab.tabName}}</span></a>
    </div>
    <div class="tabs native-scroll content">
      <component :is="currentView" keep-alive></component>
    </div>
  </div>
</template>

<script>
  import util from  '../../../util/util'
  import service_hq_often from  '../service/common/service_hq_often'
  import tztMarketMenu from  '../scripts/tztMarketMenu'
  import  tab1 from '../ons/index/tab1.vue';
  import  tab2 from '../ons/index/tab2.vue';
  import  tab3 from '../ons/index/tab3.vue';
  import  tab4 from '../ons/index/tab4.vue';
  import  tab5 from '../ons/index/tab5.vue';
  import  tab6 from '../ons/index/tab6.vue';
  import Bar from '../../common/Bar'
  import BarItem from '../../common/BarItem'
export default {
  data () {
    return {
      tabs:[
        {tabName:'沪深'},
        {tabName:'板块'},
        {tabName:'股转'},
        {tabName:'港股'},
        {tabName:'全球'},
        {tabName:'更多'}
      ],
      selected:0,
      currentView:'view_0'
    }
  },
  ready(){
    $.init();
    this.getCustomers();
  },
  methods:{
    getCustomers(){
      var MarketMenu = util.getLocalStorage(['tztMarketMenu']).tztMarketMenu;
      if(MarketMenu){
        MarketMenu = JSON.parse(MarketMenu);
        this.getMarketMenu(MarketMenu.BANKINDENT,MarketMenu.VOLUME);
      }else {
        util.setLocalStorage({tztMarketMenu:JSON.stringify(tztMarketMenu)});
        this.getMarketMenu(tztMarketMenu.BANKINDENT,tztMarketMenu.VOLUME);
      }
    },
    getMarketMenu(BankIndent,Volume){//版本号，crc值
      var obj = {};
      if(BankIndent&&Volume){
        obj.BankIndent = BankIndent;
        obj.Volume = Volume;
      }
      service_hq_often.require20190(obj)
        .then((data)=>{
          if(data.ERRORNO > 0){
            util.setLocalStorage({tztMarketMenu:JSON.stringify(data)});
          }
        })
    },
    clickdata(index){

    },
    choose(index) {
      this.selected=index;
      this.currentView='view_'+index;
    }
  },
  components:{
    'view_0':tab1,
    'view_1':tab2,
    'view_2':tab3,
    'view_3':tab4,
    'view_4':tab5,
    'view_5':tab6,
    Bar,
    BarItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
@import "../../../assets/less/mixins.less";

.tabs{
  display: block;
  padding:2.5rem 0 0;
}
.buttons-tab .button.active span{
  color: @color-primary;
  z-index: 100;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  border-color: @color-primary;
  height: 2rem;
}
  .hq_main{
    height: 100%;
    overflow: auto;
  }
</style>
