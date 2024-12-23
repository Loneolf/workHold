<template>
  <div class="wrapConts">
    <div id="leftTabBox" class="tabBox contents">
      <header class="headBox">
        <div class="u_topmenu">
          <div class="slider_wrap line" id="slider_wrap">
            <div class="u_c_items">
              <div v-for="items in headData" class="zx-head-list {{$index == dIndex?'zx-head-cur':''}}" data-type="{{items.id}}" data-child="all" data-cnn="all">
                <p><span data-href="#/all">{{items.name}}</span></p>
              </div>
            </div>
          </div>
          <div class="u_c_more">
            <div class="more_shadow"></div>
            <span class="more_channel up iconfont" @click="openEdit"></span>
          </div>
        </div>
      </header>
      <section id="mainBox" class="mainBox zx-mainBox">
        <div class="page-group">
          <div class="page page-current" id="page-infinite-scroll-bottom">
            <div class="content infinite-scroll pull-to-refresh-content native-scroll" data-distance="100" data-ptr-distance="55" v-infinite-scroll="loadMore" data-up='1' v-pull-to-refresh="loadOld">
              <div class="pull-to-refresh-layer">
                <div class="preloader"></div>
                <div class="pull-to-refresh-arrow"></div>
              </div>
              <div class="tempWrap">
                <div class="list-block" id="tabBox1-bd">
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData0" style="padding-left: 5.65rem;" @click="goCont($index,0)"><img v-bind:src="items.PICURLINDEX" class="img" onload=this.nextSibling.style.display="none";><img src="../../../assets/images/moren.png" class="none"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>
                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-ssgd" v-for="items in oData1">
                        <p class="ssgddate" v-if="items.isDate"><span>{{items.dedeDate}}</span></p>
                        <div class="zx-list1" style="padding-left: 3.5rem;"><p class="zx-name ">{{items.CONTENTINDEX}}</p><p class="ssgd-time">{{items.dedeTime}}</p><b></b></div>
                      </li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>

                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul v-if="isZXGDATA==false" class="list-container">
                      <li class="zx-list1" v-for="items in oData2" @click="goCont($index,2)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>
                      <div class="infinite-scroll-preloader">
                      </div>
                    </ul>
                    <ul v-if="isZXGDATA" class="list-container">
                      <li style="padding-top: 150px;padding-bottom: 150px;text-align: center;"><p class="ims" v-link="{path:'/hq/search'}"></p></li>
                      <div class="infinite-scroll-preloader">
                      </div>
                    </ul>
                  </div>

                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData3" @click="goCont($index,3)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData4" @click="goCont($index,4)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData5" @click="goCont($index,5)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>

                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData6" @click="goCont($index,6)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData7" @click="goCont($index,7)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>

                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData8" @click="goCont($index,8)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData9" @click="goCont($index,9)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData10" @click="goCont($index,10)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>

                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData11" @click="goCont($index,11)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData12" @click="goCont($index,12)"><p class="zx-name">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData13" @click="goCont($index,13)"><p class="zx-name ">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                  <div class="con"><!-- 高度自适应需添加外层 -->
                    <ul class="list-container">
                      <li class="zx-list1" v-for="items in oData14" @click="goCont($index,'14')"><p class="zx-name">{{items.INFOTITLEINDEX}}</p><p class="zx-date">{{items.DATESINDEX}}</p></li>

                      <div class="infinite-scroll-preloader">

                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="popup popup-about">
      <div class="content-block">
        <edit></edit>
      </div>
    </div>
    <div class="popup-overlay"></div>
  </div>

</template>

<script>
  require('../../../../static2/TouchSlide1.1.js');
  require('../../../../static2/zepto_adapter');
  import edit from '../ons/edit.vue'
  import service_index from '../service/index/service_index'
  import localService from '../../../services/localService'
  export default {
    data () {
      return {
        headData:[
          {id:'jrtt',name:'今日头条'},
          {id:'ssgd',name:'实时滚动'},
          {id:'zxg',name:'自选股资讯'},
          {id:'gsyj',name:'公司研究'}
        ],
        oData0:[],
        oData1:[],
        oData2:[],
        oData3:[],
        oData4:[],
        oData5:[],
        oData6:[],
        oData7:[],
        oData8:[],
        oData9:[],
        oData10:[],
        oData11:[],
        oData12:[],
        oData13:[],
        oData14:[],
        ssgddate:'',
        dIndex:0,
        lastIndex:0,
        isLeg:true,
        StartPos:1,
        sType:'',
        menuId:'',
        nMaxNum:20,
        loading:false,
        isZXGDATA:false,
        index:0
      }
    },
    ready(){

    },
    attached(){
      console.log(0);
      $.init();
      this.inits();
    },
    methods:{
      inits(){
        var that = this;
        localService.readFileMesg(['editData'])
          .then((data)=>{
            var myTabList = [
              {id:'jrtt',name:'今日头条'},
              {id:'ssgd',name:'实时滚动'},
              {id:'zxg',name:'自选股资讯'},
              {id:'gsyj',name:'公司研究'}
            ];
            if(data.editData){
              var newObj = JSON.parse(data.editData);
              myTabList = newObj.ex;
            }
            that.$set('headData',myTabList);
            that.$nextTick(function () {
              that.int();
            })
          });
      },
      int(){
        var that = this;
        window.TouchSlide({
          slideCell:"#leftTabBox" ,
          titCell:".u_c_items div",
          mainCell:".list-block",
          titOnClassName:"zx-head-cur",
          defaultIndex:that.dIndex,  //从第几个开始
          startFun:function(i,c){

          },
          endFun:function(i,c){
            //pageHeight();
            /*T.saveMapMesg({'defaultIndex':i},function(oData){
             });*/
            //console.log( "第"+(i+1)+"个效果开始，同时执行startFun函数。当前分页状态："+(i+1)+"/"+c+"\r\n");
            that.sType = $(that.$el).find(".zx-head-list").eq(i).attr("data-type");
            //tab滚动
            var wid=$(that.$el).find('.zx-head-list').width();
            if(Number(i)>=1){
              $(that.$el).find(".slider_wrap").scrollLeft((i+1-3)*wid);
            }
            if(Number(i)==0){
              $(that.$el).find(".slider_wrap").scrollLeft(0);
            }
            that.lastIndex=0;
            $(that.$el).find(".content").scrollTop(0);
            that.isLeg =true;
            that.StartPos = 1;
            if(i != that.index){
              that.loading =false;
            }
            that.index=i;
            that.dIndex = i;
            $.attachInfiniteScroll(($(that.$el).find('.infinite-scroll')));
            $(".infinite-scroll-preloader").html('<div class="preloader"></div>').show();
            that.getData(that.sType);
          }
        });
      },
      loadMore(){
        if(this.loading){
          return;
        }
        this.StartPos++;
        this.getData(this.sType);
      },
      loadOld(){
        if(this.loading){
          return;
        }
        this.int();
      },
      getData(sType){
        if(this.loading){
          return;
        }
        this.loading = true;
        switch (sType)
        {
          case 'jrtt':      //今日头条
            this.sType = 'jrtt';
            this.menuId = '20001';
            this.getTT(this.StartPos,this.menuId);
            break;
          case 'ssgd':       //实时滚动
            this.sType = 'ssgd';
            this.getSSGD(this.StartPos);
            break;
          case 'zxg':          // 自选股
            this.sType = 'zxg';
            this.getZXG();
            break;
          case 'gsyj':       //公司研究
            this.sType = 'gsyj';
            this.menuId = '20002';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'hyyj':       // 行业研究
            this.sType = 'hyyj';
            this.menuId = '20003';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'qhyj':       // 期货研究
            this.sType = 'qhyj';
            this.menuId = '20014';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'sbxw':       // 三板新闻
            this.sType = 'sbxw';
            this.menuId = '20006';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'chbg':      //晨会报告
            this.sType = 'chbg';
            this.menuId = '20004';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'xgcl':      // 新股策略
            this.sType = 'xgcl';
            this.menuId = '20007';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'ggxw':      //港股新闻
            this.sType = 'ggxw';
            this.menuId = '20005';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'rdzj':      //热点直击
            this.sType = 'rdzj';
            this.menuId = '20009';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'sbyj':      //三板研究
            this.sType = 'sbyj';
            this.menuId = '20012';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'xsb':     //新三板
            this.sType = 'xsb';
            this.menuId = '20010';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'qqss':   //全球市场
            this.sType = 'qqss';
            this.menuId = '20011';
            this.getZB(this.StartPos,this.menuId);
            break;
          case 'ggztc':   //港股直通车
            this.sType = 'ggztc';
            this.menuId = '20008';
            this.getZB(this.StartPos,this.menuId);
            break;
        }
      },
      getTT(page,menuId){
        var that = this;
        var oSendData = {
          'nPage':page,
          'maxcount':this.nMaxNum,
          'menu_id':menuId
        };
        service_index.require46118(oSendData)
          .then((data)=>{
            $.pullToRefreshDone('.pull-to-refresh-content');
            that.loading = false;
            if(data.ERRORNO<=0 || !data.GRID0){
              $.detachInfiniteScroll($(that.$el).find('.infinite-scroll'));
              $(that.$el).find('.infinite-scroll-preloader').eq(that.index).html("无更多数据");
              return;
            }
            var gridData = page == 1 ? [] : that.oData0;

            data.GRID0.forEach((items,index)=>{

              var listData = items.split('|');
              let listObj = {
                IDINDEX:listData[data.IDINDEX],
                INFOTITLEINDEX:listData[data.INFOTITLEINDEX],
                DATESINDEX:listData[data.DATESINDEX],
                MEDIAINDEX:listData[data.MEDIAINDEX],
                // PICURLINDEX:listData[data.PICURLINDEX].replace(/http:\/\/img\.huijuzx\.com\.cn/g,('https://'+window.location.host+'/images')),
                PICURLINDEX:listData[data.PICURLINDEX],
                CONTENTINDEX:listData[data.CONTENTINDEX]
              };
              gridData.push(listObj);

            });

            that.$set('oData0',gridData);
            that.$nextTick(function () {
              that.pageHeight();
            })
          })
      },
      getSSGD(page){
        var that = this;
        var oSendData = {
          'nPage':page,
          'maxcount':this.nMaxNum
        };
        service_index.require46127(oSendData)
          .then((data)=>{
            $.pullToRefreshDone('.pull-to-refresh-content');
            that.loading = false;
            if(data.ERRORNO<=0 || !data.GRID0){
              $.detachInfiniteScroll($(that.$el).find('.infinite-scroll'));
              $(that.$el).find('.infinite-scroll-preloader').eq(that.index).html("无更多数据");
              return;
            }
            var gridData = page == 1 ? [] : that.oData1;
            if(gridData.length == 0){
              that.ssgddate = '';
            }
            data.GRID0.forEach((items,index)=>{

              var listData = items.split('|');

              let listObj = {
                IDINDEX:listData[data.IDINDEX],
                DATESINDEX:listData[data.DATESINDEX],
                MEDIAINDEX:listData[data.MEDIAINDEX],
                CONTENTINDEX:listData[data.CONTENTINDEX]
              };
              if(listObj.DATESINDEX){
                var dede=listObj.DATESINDEX.replace(/\s+/,"&").split("&");//日期
                var dedeDate=dede[0].replace(/-/,"&").split("&")[1];  //日期
                var dedeTime=dede[1].substring(0, dede[1].lastIndexOf(':'));//时间
                listObj.dedeDate = dedeDate;
                listObj.dedeAllDate = dede[0];
                listObj.dedeTime = dedeTime;
                if(that.ssgddate != listObj.dedeAllDate){
                  listObj.isDate = true;
                  that.ssgddate = listObj.dedeAllDate;
                }else {
                  listObj.isDate = false;
                }
              }

              gridData.push(listObj);
            });
//            console.log(gridData);
            that.$set('oData1',gridData);
            that.$nextTick(function () {
              that.pageHeight();
            })
          })
      },
      getZXG(){
        var that = this;
        var oSendData = ['selfstocklist'];
        localService.readLocalMesg(oSendData)
          .then((data)=>{
          var SELF = data.SELFSTOCKLIST || data.selfstocklist;
          var	str = '',strtype='';
          if(SELF){
            var aGrid = SELF.split(','),
              ln = aGrid.length;
            for (var i=0; i<ln; i++){
              var aData = aGrid[i].split('|');
              if(aData[0] == '' && aData[1] == ''){
                continue;
              }
              str += aData[0].replace('H','').replace('h','')+ ',';
              strtype += aData[1] + ',';
            }
          }
        var StockCode = str;
        var StockCodetype = strtype;
        //读取自选信息
        that.getZX(that.StartPos,StockCode,StockCodetype);
        });
      },
      getZX(page,StockCode,StockCodetype){
//        console.log(page,StockCode,StockCodetype);
        var that = this;
        var oSendData = {
          'menu_id':'20001',
          'Stockcode':StockCode,
          'StockCodeType':StockCodetype,
          'nPage':page,
          'maxcount':this.nMaxNum
        };
        service_index.require46116(oSendData)
          .then((data)=>{
            $.pullToRefreshDone('.pull-to-refresh-content');
            that.loading = false;
            if(data.ERRORNO<=0 || !data.GRID0){
              if(page == 1){
                that.isZXGDATA = true;
                $(that.$el).find('.infinite-scroll-preloader').eq(that.index).html("");
              }else {
                $(that.$el).find('.infinite-scroll-preloader').eq(that.index).html("无更多数据");
              }
              $.detachInfiniteScroll($(that.$el).find('.infinite-scroll'));
              return;
            }
            that.isZXGDATA = false;
            var gridData = page == 1 ? [] : that.oData2;

            data.GRID0.forEach((items,index)=>{

              var listData = items.split('|');
              let listObj = {
                IDINDEX:listData[data.IDINDEX],
                INFOTITLEINDEX:listData[data.INFOTITLEINDEX],
                FASTCACHE:listData[data.FASTCACHE],
                DATESINDEX:listData[data.DATESINDEX],
                FLAGINDEX:listData[data.FLAGINDEX],
                MEDIAINDEX:listData[data.MEDIAINDEX]
              };
              gridData.push(listObj);
            });
//            console.log(gridData);
            that.$set('oData2',gridData);
            that.$nextTick(function () {
              that.pageHeight();
            })
          })
      },
      getZB(page,menuId){
        var that = this;
        var oSendData = {
          'menu_id':menuId,
          'nPage':page,
          'maxcount':this.nMaxNum
        };
        service_index.require46118(oSendData)
          .then((data)=>{
            $.pullToRefreshDone('.pull-to-refresh-content');
            that.loading = false;
            if(data.ERRORNO<=0 || !data.GRID0){
              $.detachInfiniteScroll($(that.$el).find('.infinite-scroll'));
              $(that.$el).find('.infinite-scroll-preloader').html("无更多数据");
              return;
            }
            var gridData = page == 1 ? [] : that['oData'+that.index];

            data.GRID0.forEach((items,index)=>{

              var listData = items.split('|');
              let listObj = {
                IDINDEX:listData[data.IDINDEX],
                INFOTITLEINDEX:listData[data.INFOTITLEINDEX],
                DATESINDEX:listData[data.DATESINDEX],
                MEDIAINDEX:listData[data.MEDIAINDEX],
                PICURLINDEX:listData[data.PICURLINDEX]
              };
              gridData.push(listObj);
            });
            that.$set('oData'+that.index,gridData);
            that.$nextTick(function () {
              that.pageHeight();
            })
          })
      },
      pageHeight() {
        $.refreshScroller();
        var bd = document.getElementById("tabBox1-bd");
        if(!bd){
          return;
        }
        bd.parentNode.style.height = bd.children[this.index].children[0].offsetHeight+"px";
        $(".tempWrap").height(bd.parentNode.style.height);
        //可视区域高度屏幕高度-tab栏高度
        //不足一屏幕隐藏上拉刷新
        var contentHeigth=Number(bd.children[this.index].children[0].offsetHeight);
        var cliHeight=Number($(window).height())-Number($(".u_topmenu").height());
        if(contentHeigth<=cliHeight){
          $.detachInfiniteScroll($('.infinite-scroll'));
          $(".infinite-scroll-preloader").hide();
        }
        if(this.index>0)bd.parentNode.style.transition="200ms";//添加动画效果
      },
      openEdit(){
        this.$broadcast('parent-popup',this.index);
        $.popup('.popup-about');
      },
      goCont(i,index){
        var type = this.sType;
        var id = this['oData'+index][i]['IDINDEX'];
        var flag = this['oData'+index][i]['FLAGINDEX'];
        var url = `/information/cont?type=${type}&id=${id}`;
        if(type == 'zxg'){
          url += '&flag='+flag;
        }
        this.$TZT.action10061({url:url});
      }
    },
    events: {
      'child-edit': function() {
        this.inits();
        console.log('index');
      }
    },
    components:{
      edit
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  /*头部*/
  .u_topmenu {
    height: 2rem;
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    z-index: 1;
    max-width: 1080px;
    opacity: 1;
    top: 0;
    -webkit-transition: .3s all;
    transition: .3s all;
  }

  .u_topmenu .slider_wrap.line {
    height: 2rem;
    overflow: hidden;
    overflow-x: scroll;
    width: 90%;
    -webkit-overflow-scrolling: touch;
  }

  .u_topmenu .u_c_items {
    height: 2rem;
    width: 100%;
    white-space: nowrap;
  }

  .u_topmenu .slider_wrap.line .zx-head-list {
    width: 25%;
    display: inline-block;
    height: 2rem;
    overflow: hidden;
    position: relative;
    text-align: center;
  }

  .u_topmenu .zx-head-list span {
    font-size: 0.75rem;
    color: #555;
    margin: 0.625rem 0;
    line-height: .75rem;
    white-space: nowrap;
    display: block;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-align: center;
    cursor: pointer;
  }

  .u_topmenu .zx-head-list p {
    font-size: 0.5rem;
    line-height: 0.8rem;
    color: #7C7C7C;
    display: inline-block;
  }

  .u_topmenu .zx-head-cur p {
    border-bottom: 0.1rem solid #00a9f8;
    height: 2rem;
  }

  .u_topmenu .zx-head-cur p span {
    color: #00a9f8;
  }

  .u_topmenu .u_c_more {
    width: 10%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .u_topmenu .u_c_more .more_channel {
    display: inline-block;
    transform: rotate(-90deg);
  }

  .u_c_more .iconfont {
    width: 1rem;
    height: 1rem;
    margin: -0.5rem 0 0 -0.5rem;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZWM5ZTQ1Yy0wNTNjLTZjNGItYjM1Mi01ZjIxMzY4MmYwNWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxREM3ODQ0ODlGMTFFNkIwQjRFNjNGRjM2NzVBQUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTAxREM3ODM0ODlGMTFFNkIwQjRFNjNGRjM2NzVBQUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGQyODAzOWMtZDAxZC01YzQzLTkxMDgtYTE0MTFlODFlZTI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRlYzllNDVjLTA1M2MtNmM0Yi1iMzUyLTVmMjEzNjgyZjA1YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnxOwbkAAAC2SURBVHja7NbbCQQhDAXQRLEfEbEla7IlEbEfERcHZr5k2Q9HZLkpIJz4IJd773RyMYAA/hOwlNJzzmSMIa01r+gpVk4bY6RaK6WUlvVcCrxvo7V2JvCNAhBAAAEE8PCahoWx9Mc+XbmyvpWUkqy104AxPcGduHt3jxT08xWPacZU296ZEFdEez0PhhCeZt57xi8GEEAAAQQQwL1AZn7i05FA5xwppa409GpgPT5RAwjgxvoIMAD/AFcaM4s75gAAAABJRU5ErkJggg==") no-repeat center;
    background-size: 1rem 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .u_topmenu .slider_wrap.line {
    background: #eeeded;
  }
  .u_c_more {
    background: #eeeded;
  }
  .u_c_more .more_shadow {
    position: absolute;
    width: 1rem;
    height: 2rem;
    left: -0.95rem;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABXCAQAAACjUt0DAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABIAAABXAK421QoAAAFiSURBVEjH1ZbbtoMgDERnKP//yaYPVSAhF077dHQtamU7k0RKAxwcPCF4ItF+tWMNsVZS91uJhNlRX7FGPMgizOrEObJSiZUUAnRkR6q0qnErm7Lhc9UDBaXUt0kN0FOaOo4SQ5BRCahOA3HT5KwTE50GZhV37VazJKYljjE2SE+sPsittC1XW/FmgNVsZJcvuhvrAbLqffNadPXLYgaLzs8wWSo6rk9FYdeBUW/x1DRswfS6ysuNlcDZ7ssTSCpIfDsZn/J8b+Omh8pjR/X8DkuWndwnINpOlukFbtvzVslAEmF+TCMaCC4fkr8oKUgVzmQ4IBojHfqFqwd28O0S6AXA7ib2P+HOTlzLcXZ3+tFz6yRObiOmGY+3k6ev5XN97Uq7FoCXkl5HTrT6tQiw2u1aY/TrZF551jyMFPZiOqW1O5zXiJx1PV/2Tw52tD8ddYc/9Zlq7qhBrlrtuhX/98cbycGBFpNaiv0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDItMjdUMTc6NDQ6NDErMDg6MDDFbrv7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAyLTI3VDE3OjQ0OjQxKzA4OjAwtDMDRwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=") no-repeat center right;
    background-size: contain;
    background-color: rgba(238,237,237,.3);
  }
  .mainBox {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .zx-mainBox {
    top: 2rem;
  }
  .infinite-scroll-preloader {
    margin: 0.5rem;
    text-align: center;
    font-size: 0.8rem;
  }
  .list-block {
    font-size: 0.85rem;
  }
  .list-block ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .list-block ul:before {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }

    .list-block ul:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: auto;
      right: auto;
      height: 1px;
      width: 100%;
      /*background-color: #e7e7e7;*/
      display: block;
      z-index: 15;
      -webkit-transform-origin: 50% 0%;
      transform-origin: 50% 0%;
    }
    .list-block ul .ss-border-none:nth-child(n+2):before {
      height: 0px;
    }
  }
  .list-block li {
    box-sizing: border-box;
    position: relative;
  }
  .list-block .item-content {
    box-sizing: border-box;
    padding-left: 0.75rem;
    min-height: 2.2rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .list-block .item-inner {
    padding-right: 0.75rem;
    position: relative;
    width: 100%;
    padding-top: 0.4rem;
    padding-bottom: 0.35rem;
    min-height: 2.2rem;
    overflow: hidden;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .list-block .item-title {
    -webkit-flex-shrink: 1;
    -ms-flex: 0 1 auto;
    -webkit-flex-shrink: 1;
    flex-shrink: 1;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .list-container .zx-list1 {
    padding: 0.85rem 0.7rem 0.9rem 0.75rem;
    background: #fff;
    position: relative;
  }

  .zx-list1 img {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    margin: -1.625rem 0 0;
    width: 4.15rem;
    height: 3.25rem;
  }
  .zx-list1 .zx-media {
    padding: 0 0 0.5rem 0;
  }
  .zx-list1 .zx-name {
    font-size: 0.8rem;
    line-height: 1rem;
    color: #303030;
  }

  .zx-list1 .zx-date {
    padding: 0.55rem 0 0;
    font-size: 0.55rem;
    line-height: 0.55rem;
    color: #b7b7b7;
    text-align: right;
  }

  .list-block ul .zx-ssgd:nth-child(n+2):before {
    width: 80%;
    left: 20%;
  }

  .zx-list1 .ssgd-time {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    color: #00a9f8;
  }

  .zx-main .zx-list2 {
    padding: 0.5rem 0.5rem 0.5rem 4rem;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
  }

  .zx-list2 .zx-info {
    width: 3rem;
    text-align: center;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }

  .zx-list2 .zx-date {
    margin: 0 0 1rem;
    padding: 0.25rem;
    background: #990;
    border-radius: 0.15rem;
    display: none;
  }

  .zx-list2 .zx-date span {
    font-size: 0.9rem;
    line-height: 1rem;
    color: #fff;
    display: inline-block;
  }

  .zx-list2 .zx-date span i {
    font-size: 0.7rem;
    display: inline-block;
  }

  .zx-list2 .zx-time {
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: #b7b7b7;
  }

  .zx-list2 .zx-title {
    font-size: 0.8rem;
    line-height: 1rem;
    color: #303030;
  }

  .zx-list2 .zx-cont {
    padding: 0.5rem 0 0;
  }

  .zx-list2 .zx-cont p {
    font-size: 0.6rem;
    line-height: 1rem;
    color: #999;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min--moz-device-pixel-ratio: 2.0),
  only screen and (-o-min-device-pixel-ratio: 200/100),
  only screen and (min-device-pixel-ratio: 2.0){
    .list-block ul li:nth-child(n+2):before {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .list-block ul li:nth-child(n+2):before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: auto;
      right: auto;
      height: 1px;
      width: 100%;
      background-color: #e7e7e7;
      display: block;
      z-index: 15;
      -webkit-transform-origin: 50% 0%;
      transform-origin: 50% 0%;
    }
    .list-block ul .ss-border-none:nth-child(n+2):before {
      height: 0px;
    }
  }
  .zx-ssgd b{
    position: absolute;
    top:1.9rem;
    left:1.9rem;
    border-left: 1px solid #d4d3d8;
    display: inline-block;
    height: 70%;
    z-index: 100;
  }
  .ssgddate{background: #fff;padding: 0.4rem 0 0 0.75rem;}
  .ssgddate span{
    display: inline-block;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAApCAYAAABupZRPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZWM5ZTQ1Yy0wNTNjLTZjNGItYjM1Mi01ZjIxMzY4MmYwNWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUZBNUQ3MEE1OTM4MTFFNjlFRjJDMERERUNDQjUzMEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUZBNUQ3MDk1OTM4MTFFNjlFRjJDMERERUNDQjUzMEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTgxNGIxYWQtZWUxMC0yZjQ3LWJmYWEtODE0NDE2YTZhYTliIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZmJhODRjMTctZmM5NS0xMWU1LTg2Y2EtZWU5MmIwOTNlZjhmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ngm6lgAAAY5JREFUeNrsmjFLAzEYhtNSpTiIOAui5+DiUkUcHF06urk5iEEEJwuC4mQdHDoq3Imom7/ASXQVhy6CWKit/gXBpdzg+51B00Lt1cVA3hceuEBCLs99yd1wmTAMVcrMgwpYAG/gCJwq97IOdsA4uAfb4KFbZ63193Uu5QTT4A4MmXYAIjAAThwSsQmOrfaiue9Z8NxrcMaqjAJYBVNgsKPfhBFwBc5MW2S8/2b9HyLVOywPHDTBClgDL6ZtpwXq4BLVUbUrYw8ciJwek72CGzBj2jLxkoNbRbbHI5izKjno0ncriqJ9CDkUGcugrPyNFEAZQp6yuCgpRlLKmbMibUbAJBhzfGFyfx9gtI8xBZGR72PAhsH1XP9hTD7L3aHavjMCaviR0fBZQOcXaOizDLxS22RobpCv8AClDMqgDMqgDMqgDMqgDMqgDMqgDMqgDMqgDMqgDMqgDMrwXkZMDUlikdGkhyQNkXFOD0kuRIb8znjruQhZf0VkyF9vRbALah6dIbFZr6y7qLVufQowAOJmRHplf9q4AAAAAElFTkSuQmCC") no-repeat center;
    width: 2.5rem;
    height: 1.55rem;
    background-size: 2.5rem 1.55rem;
    color: #fff;
    text-align: center;
    font-size: 0.8rem;
    line-height: 2rem;
  }
  .zx-list1 .zx-name{color: #333;}
  .zx-list1 .zx-read-name{color: #999;}
  .zx-list1 .zx-date{color: #999;}

  .ims {
    display: inline-block;
    width: 80%;
    height: 80%;
    padding-bottom: 20%;
    margin: 0 auto;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAABWCAYAAACQLW4KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNTMzREExODM0NzJFNTExQTUwM0RCN0NERUM0Q0QxRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMUEyNEQyMTQ4OUUxMUU2QjE3NkYyMDUyNTVCMTVBNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMUEyNEQyMDQ4OUUxMUU2QjE3NkYyMDUyNTVCMTVBNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyYTc0OGYxZS0yNDkzLTkwNGMtYmFjZS0yNjQxMjRiZjkxNDkiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MzQ1MzJiZi04YzI0LTExZTUtOGRlOC1jNWMy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") no-repeat center;
    background-size: 80% 80%;
  }
  .wrapConts .contents {
    top: 2.2rem;
    bottom: 2.5rem;
    position: absolute;
    right: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
  }
  .popup,.popup-overlay{top:2.2rem;}

  ::-webkit-scrollbar {  
    width:3px;  
    height:3px;
    border-radius:5px;
    -webkit-border-radius:5px;
    background:#2b2b2b;
    display: none;
  } 
    
  ::-webkit-scrollbar-track,  
  ::-webkit-scrollbar-thumb {  
    border-radius:999px;  
    border:3px solid transparent;  
  }  
    
  ::-webkit-scrollbar-track {  
    box-shadow:1px 1px 5px rgba(0,0,0,0.5) inset; display:none;
  }  
    
  ::-webkit-scrollbar-thumb {  
    min-height:20px;  
    background-clip:content-box;  
    box-shadow:0 0 0 5px rgba(0,0,0,.2) inset;  
  }  
    
  ::-webkit-scrollbar-corner {  
    background:transparent;  
  }
</style>
