<template>
  <div class="native-scroll">
    <div class="classIfication">
      <table class="title">
        <tr v-for="titleItem in textTitleArray"><th v-for="titleList in titleItem" track-by="$index" class="{{$index | textAgline titleItem.length}}">{{gridTitle[titleList]}}</th></tr>
      </table>
      <div class="infinite-scroll" v-infinite-scroll="loadMore">
        <!--<component :is='templates' :context-path='path' @widget-active='widgetActive'></component>-->
        <component :is="isapp" v-bind:action="action" v-bind:viewname="viewname"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../util/util'
  import Vue from 'vue'
  /*let sUrl = util.getUrlParameter('url');
  if(sUrl){
    sUrl = decodeURIComponent(sUrl);
  }else {
    sUrl = 'deal/views/rzrq/ons/chicang'
  }*/
  export default{
    props: ["url",'action','viewname'],
    data(){
      var app = this.url || this.$route.query.url || 'deal/views/rzrq/ons/chicang';
      return {
        textTitleArray:[],
        gridTitle:[],
        path:'',
        app:'',
        isExample:false,
        isapp:app
      }
    },
    created(){
      var sUrl = this.isapp;
      Vue.component(this.isapp, function (resolve, reject) {
        require(['./qTemplates/'+sUrl+'.vue'],resolve);
      });
      this.isExample = false;
      this.isExample = true;
    }/*,
    destroyed(){
      console.log('aa');
      this.$destroy(true);
    }*/,
    methods: {
      init(){

      },
      loadMore () {
        this.$broadcast('child-loadMore');
      },
      titleTotal(obj){
        this.textTitleArray = obj.textTitleArray;
        this.gridTitle = obj.gridTitle;
      }
    },
    filters: {
      textAgline(index,length){
        if(index == 0){
          return 'left';
        }
        if(index == length-1){
          return 'right';
        }
      }
    },
    events:{
      'headtitle':function (obj) {
        this.$set('textTitleArray',obj.textTitleArray);
        this.$set('gridTitle',obj.gridTitle);
      }
    }/*,
    components:{
      [sUrl]:function (resolve, reject) {
        console.log(this.$route.query.url);
        require(['../'+sUrl+'.vue'],resolve);
      }
    }*/
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/variables.less';
  @import "../../assets/less/mixins.less";
 .content{
    position: relative;
    background: #fff;
 }
  .classIfication{
    position: relative;
    height:100%;
  td,th{
    font-weight: normal;
    text-align: center;
  }
  table{
    width: 100%;
    font-size: 0.65rem;
  }
  tr{
  th.left{
    text-align: left;
    padding-left: 0.6rem; 
  }
  th.right{
    text-align: center;
    padding-right: 0.5rem;
  }
  th:nth-child(2){
    position: absolute;
    top: 10px;
    left: 28%;
  }
  th:nth-child(3){
    position: absolute;
    top: 10px;
    left: 50%;
  }
  th:nth-child(4){
    position: absolute;
    top: 10px;
    left: 75%;
  }
  }
  .title{
   /*  position: absolute; */
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: #f4f4f4;
    color: #3d3d3d;
  .hairline(bottom,@color-split);
  .hairline(top,@color-split);
  }
  .table-cont{
    /* padding-top: 38px; */
    height:100%;
    overflow-y: scroll;
  table{
    position: relative;
  .hairline(bottom,@color-split);
  }
  }
  }
</style>
