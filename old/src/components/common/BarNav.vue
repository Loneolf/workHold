<template>
  <nav class="bar bar-nav" v-show="bartype | isshow 1">
    <h1 class="title">{{title}}</h1>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 2">
    <h1 class="title">{{title}}</h1>
    <span class="button-nav pull-left" @click="goback()">
        <span class="icon icon-left icon-white"></span>
      </span>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 3">
    <h1 class="title"><span class="block name">{{title}}</span><span class="block code">{{barstockcode}}</span></h1>
    <span class="button-nav pull-left" @click="goback()">
        <span class="icon icon-left icon-white"></span>
      </span>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 4">
    <h1 class="title" style="padding-top: 0.6rem;line-height: normal;"><a href="javascript:void(0);" class="inline-block active">市场</a><a v-link="{path: '/hq/index/zxlist', replace: true}" class="inline-block">自选</a></h1>
    <span class="button-nav pull-right" v-link="{path:'/hq/search'}">
        <span class="icon icon-search icon-white"></span>
      </span>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 5">
    <h1 class="title"><a v-link="{path: '/hq/index', replace: true}" class="inline-block">市场</a><a class="inline-block active">自选</a></h1>
    <span class="button-nav pull-right" v-link="{path:'/hq/search'}">
        <span class="icon icon-search icon-white"></span>
      </span>
    <span class="button-nav pull-left" v-link="{path:'/hq/editzxg'}">
        <span class="icon icon-edit icon-white"></span>
      </span>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 6">
    <h1 class="title"><span class="block name">{{title}}</span><span class="block code"><em v-if="stocktypenew.SBGP" class="SBGP"></em><em v-if="stocktypenew.SBLW" class="SBLW"></em><em v-if="stocktypenew.SBXQ" class="SBXQ"></em><em v-if="stocktypenew.SBXZ" class="SBXZ"></em><em v-if="stocktypenew.ISH" class="ISH"></em><em v-if="stocktypenew.ISZ" class="ISZ"></em><em v-if="stocktypenew.RZRQ" class="RZRQ"></em><em v-if="stocktypenew.Tong" class="Tong"></em><em v-if="stocktypenew.AH" class="AH"></em><em v-if="stocktypenew.FXJS" class="FXJS"></em><em v-if="stocktypenew.TSZL" class="TSZL"></em><em v-if="stocktypenew.ZYZQ" class="ZYZQ"></em>{{barstockcode}}</span></h1>
    <span class="button-nav pull-left" @click="goback()">
        <span class="icon icon-left icon-white"></span>
      </span>
    <span class="button-nav pull-right" v-link="{path:'/hq/search'}">
        <span class="icon icon-search icon-white"></span>
      </span>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 7">
    <!--<h1 class="title"><span class="block name">{{title}}</span><span class="block code">{{accountname}}&nbsp;&nbsp;&nbsp;{{accountcode}}</span></h1>-->
    <h1 class="title"><span class="block name">{{title}}</span><span class="block code">{{{subtitletext}}}</span></h1>
    <span class="button-nav pull-left" @click="goback()">
        <span class="icon icon-left icon-white"></span>
      </span>
  </nav>
  <nav class="bar bar-nav" v-show="bartype | isshow 8">
    <h1 class="title ptjy" style="padding-top: 0.6rem;line-height: normal;"><a href="javascript:void(0);" class="active pt">普通</a><a class="xy" v-link="{path: '/deal/rzrq/index', replace: true}" class="inline-block">信用</a></h1>
    <span class="button-nav pull-right" v-link="{path:'/hq/search'}">
        <span class="icon icon-search icon-white"></span>
      </span>
  </nav>
   <nav class="bar bar-nav" v-show="bartype | isshow 9">
    <h1 class="title rzrq" style="padding-top: 0.6rem;line-height: normal;"><a v-link="{path: '/deal/index', replace: true}" class="active pt">普通</a><a class="xy" href="javascript:void(0);" class="inline-block">信用</a></h1>
    <span class="button-nav pull-right" v-link="{path:'/hq/search'}">
        <span class="icon icon-search icon-white"></span>
      </span>
  </nav>
   <nav class="bar bar-nav" v-show="bartype | isshow 100">
    <h1 class="title gznhg" style="pointer-events:none;
" >{{title}}</h1>
    <span class="button-nav pull-left" @click="goback()">
        <span class="icon icon-left icon-white" ></span>
      </span>
    <span class="button-nav pull-right mychicang">
        <span class="pull-ringt-span" @click="gotochicnag()">我的持仓</span>
    </span>
  </nav>
</template>

<script>
  import localService from '../../services/localService'
  export default {
    methods:{
      goback(){
        if($("#KeyPanel5").attr("display","block")){
          $("#KeyPanel5").css("display","none");
        }
        $(".mr-box").css("display","none");
        $(".mc-box").css("display","none");
        window.history.back();
//        window.history.go(-1);
      },
      gotochicnag(){
        console.log('持仓');
        this.$TZT.tradeaction({action:'12343'});
      },
      test(){
        console.log('测试');
      }
    },
    props: {
      title: '',
      bartype:'',
      barstockcode:'',
      stocktypenew:'',
      subtitletext:'', //第二行文字
    },
    filters: {
      isshow(type,index) {
        if(type==100||type==101){
          if(index == 100){
            if(type==100)
            $('.bar-nav .mychicang').show();
            else
            $('.bar-nav .mychicang').hide();
            return true;
          }else{
            return false;
          }
        }else{
          if(type == index){
            return true;
          }else {
            return false;
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .ptjy{
      position: absolute;
      width: 50%;
      margin: left;
      margin-left: 23%;
      height: 1.8rem;
      top: 0.2rem;
      border-radius: 0.1rem;
      .pt{
        position: absolute;
        top: 0.05rem;
        width: 50%;
        left: 0;
        height: 1.7rem;
        line-height: 1.7rem;
        font-size: 0.8rem;
        border-top-left-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
        background-color: #686e7d;
        color: #fff;
      }
      .xy{
        position: absolute;
        top: 0.05rem;
        width: 49%;
        right: 0.05rem;
        height: 1.7rem;
        line-height: 1.7rem;
        font-size: 0.8rem;
        border-top: 1px solid #666;
        border-right: 1px solid #666;
        border-bottom: 1px solid #666;
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        background-color: #3d4256;
        color:#91a1ab;
      }
  }
  .ptlogin{
    font-size: 0.5rem;
    padding-right: 0.6rem;
  }
  .rzrq{
      position: absolute;
      width: 50%;
      margin: left;
      margin-left: 23%;
      height: 1.8rem;
      top: 0.2rem;
      border-radius: 0.1rem;
      .pt{
        position: absolute;
        top: 0.05rem;
        width: 50%;
        left: 0;
        height: 1.7rem;
        line-height: 1.7rem;
        font-size: 0.8rem;
        border-top: 1px solid #666;
        border-left: 1px solid #666;
        border-bottom: 1px solid #666;
        border-top-left-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
        background-color: #3d4256;
        color:#91a1ab;
      }
      .xy{
        position: absolute;
        top: 0.05rem;
        width: 49%;
        right: 0.05rem;
        height: 1.7rem;
        line-height: 1.7rem;
        font-size: 0.8rem;
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        background-color: #686e7d;
        color: #fff;
      }
  }
  .rzrqlogin{
    font-size: 0.5rem;
    padding-right: 0.6rem;
  }
  .bar-nav {
    .title{
      .code{
        vertical-align:middle;
        .RZRQ{
          background: url("../../assets/hq-icon/tzt_gjsc_stocktitleicon_rong.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .Tong{
          background: url("../../assets/hq-icon/tztTitleTong@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .AH{
          background: url("../../assets/hq-icon/tztTitleAH@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 1.1rem;
          display: inline-block;
          vertical-align:middle;
        }
        .FXJS{
          background: url("../../assets/hq-icon/tztTitleFXJS@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .TSZL{
          background: url("../../assets/hq-icon/TZTTSZLIcon@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .SBGP{
          background: url("../../assets/hq-icon/tztTitleSBGP@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .SBLW{
          background: url("../../assets/hq-icon/tztTitleSBLW@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .SBXQ{
          background: url("../../assets/hq-icon/tztTitleSBXQ@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .SBXZ{
          background: url("../../assets/hq-icon/tztTitleSBXZ@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .ISH{
          background: url("../../assets/hq-icon/tztTitleHGT@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .ISZ{
          background: url("../../assets/hq-icon/tztTitleSGT@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
        .SBGP{
          background: url("../../assets/hq-icon/tztTitleSBGP@2x.png") no-repeat;
          background-size: auto 0.7rem;
          width: 1.4rem;
        }
        .SBLW{
          background: url("../../assets/hq-icon/tztTitleSBLW@2x.png") no-repeat;
          background-size: auto 0.7rem;width: 1.4rem;
        }
        .SBXQ{
          background: url("../../assets/hq-icon/tztTitleSBXQ@2x.png") no-repeat;
          background-size: auto 0.7rem;width: 1.4rem;
        }
        .SBXZ{
          background: url("../../assets/hq-icon/tztTitleSBXZ@2x.png") no-repeat;
          background-size: auto 0.7rem;width: 1.4rem;
        }
        .ZYZQ{
          background: url("../../assets/hq-icon/tztTitleQ@2x.png") no-repeat;
          background-size: auto 0.7rem;
          height: 0.7rem;
          width: 0.7rem;
          display: inline-block;
          vertical-align:middle;
        }
      }
    }
  }
  .gznhg{

  }
  .pull-ringt-span{
    line-height: 2.2rem;
    font-size: 0.5rem;
    padding-right: 0.3rem;
  }
</style>

