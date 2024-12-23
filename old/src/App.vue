<template>
  <div class="page page-current">
    <bar-nav v-if="isBarNav" v-bind:bartype="barType" v-bind:title="title" v-bind:stocktypenew="stocktypenew" v-bind:barstockcode="barstockcode" ></bar-nav>
    <bar-date v-if="isBarDate"></bar-date>
    <bar v-if="isIndex">
      <!--<bar-item path="/home/index" label="首页" icon="home"></bar-item>-->
      <bar-item v-show="hqshow" v-bind:path="hqUrl" label="行情" icon="browser"></bar-item>
      <bar-item v-show="dealshow" v-bind:path="jyUrl" label="交易" icon="menu"></bar-item>
      <bar-item v-show="zxshow" path="/information/index" label="资讯" icon="picture"></bar-item>
      <!-- <bar-item v-show="dealshow" path="/deal/ztindex" label="我的" icon="me"></bar-item> -->
    </bar> 
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
  import Bar from './components/common/Bar'
  import BarItem from './components/common/BarItem'
  import BarNav from './components/common/BarNav'
  import BarDate from './components/common/BarDate.vue'
  import localService from './services/localService'
  export default {
    ready () {

    },
    attached(){
      this.inits();
       document.addEventListener('contextmenu', function(e){
        e.preventDefault();
      });
    },
    methods: {
      inits(){
        var dealshow=this.getUrlParameter('dealshow');
        var hqshow=this.getUrlParameter('hqshow');
        var zxshow=this.getUrlParameter('zxshow');
        var channels=this.getUrlParameter('channels');
        if(!!channels){
          localService.saveMapMesg({'channels':channels})
        }
        if(!!dealshow){
          localService.saveMapMesg({'dealshow':dealshow})
          if(dealshow=="deal"){
            this.dealshow=false;
          }
        }else {
          localService.saveMapMesg({'dealshow':""})
        }
        if(!!hqshow){
          localService.saveMapMesg({'hqshow':hqshow})
          if(hqshow=="hq"){
            this.hqshow=false;
          }
        }else {localService.saveMapMesg({'hqshow':""})}
        if(!!zxshow){
          localService.saveMapMesg({'zxshow':zxshow})
          if(zxshow=="zx"){
            this.zxshow=false;
          }
        }else {localService.saveMapMesg({'zxshow':""})}

      },
      getUrlParameter(parameterName){
        var reg = new RegExp("(^|&|\\?)" + parameterName + "=([^&]*)(&|$)", "i"),arr,arr1;
        arr = location.search.substr(1).match(reg);
        arr1 = location.hash.substr(2).match(reg);
        if (arr) {
           return arr[2].replace(/</g,'&lt;').replace(/>/g,'&gt;');
        }else if(arr1){
           return arr1[2].replace(/</g,'&lt;').replace(/>/g,'&gt;');
        } else return null;
      }
    },
    data () {
      return {
        isIndex: true,
        isBarNav:false,
        isBarDate:false,
        title:'行情',
        barType:'1',
        barstockcode:'',
        stocktypenew:'',
        accounttitle:'',
        accounttitle1:'',
        dealshow:true,
        hqshow:true,
        zxshow:true,
        isBtnPt:false,
        isBtnRzrq:false,
        jyUrl:'/deal/index',
        hqUrl:'/hq/index'
      }
    },
    components: {
      Bar,
      BarItem,
      BarNav,
      BarDate
    }
  }
</script>
<style src="./assets/less/sm.less" lang="less"></style>
<style>
[v-cloak] {
  display: none;
}
.fade-transition {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
</style>
