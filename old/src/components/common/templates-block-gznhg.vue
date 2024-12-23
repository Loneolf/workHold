<template>
  <div class="table-cont content infinite-scroll" v-infinite-scroll="loadMore">
    <component :is="isapp"></component>
  </div>
</template>

<script>
  import localService from '../../services/localService'
  import util from '../../util/util'
  import Vue from 'vue'
  /*let sUrl = util.getUrlParameter('url');
  if(sUrl){
    sUrl = decodeURIComponent(sUrl);
  }else {
    sUrl = 'deal/views/rzrq/ons/chicang'
  }*/
  export default{
    props: ["url"],
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
        require(['./qTemplates-block/'+sUrl+'.vue'],resolve);
      });
      this.isExample = false;
      this.isExample = true;
    },
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
      'parentData':function (oData) {
        var ZZPINDEX = oData.ZZPINDEX,
            DATEFORMINDEX = oData.DATEFORMINDEX,
            hidesegment = oData.HIDESEGMENTINDEX || '';
        var savemapobj = {
          HIDESEGMENTINDEX:hidesegment,
          ZZPINDEX:ZZPINDEX || '',
          DATEFORMINDEX:DATEFORMINDEX || ''
        };
        localService.saveMapMesg(savemapobj);
      }
    }
  }
</script>
