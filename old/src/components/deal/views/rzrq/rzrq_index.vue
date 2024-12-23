<template>
  <div data-type="2" class="rzrq-index">
    <div class="mainBox" id="mainBox">
    <div class="trade-header-logbg">
        <div class="login-button">
           
        </div>
    </div>
    <!-- 资产信息 -->
    <div class="fund-info" id="app" style="display: none;">
        <div class="fund-top">
            <p class="all-fund">总资产(元)<span class="eyes"></span></p>
            <h1 class="hide-fun datamoney"  classTemp="h1-higher">--</h1>
        </div>
        <div class="fund-bottom">
            <ul>
                <li>
                    <span class="hide-fun span-val1"  classTemp="spanBig">--</span>
                    <span>总负债</span>
                </li>
                <li>
                    <span class="hide-fun span-val2"  classTemp="spanBig">--</span>
                    <span>可用保证金</span>
                </li>
                <li>
                    <span class="hide-fun span-val3" classTemp="spanBig">--</span>
                    <span>维持担保比例</span>
                </li>
            </ul>
        </div>
    </div>
    <!-- 头部结束 -->
    <!-- nav开始 -->
    <div class="line-top-bottom"></div>
    <div class="trade-nav">
        <ul class="module">
            <li class="list" data-tradeaction="15010">
                <a href="javascript:void(0)">
                    <div class="icon-containter ">
                        <img src="../../../../assets/jy/jyindex/img/icon_x3.png" alt="">
                    </div>
                    <span class="icon-text">担保品买入</span>
                </a>
            </li>
            <li  class="list" data-tradeaction="15011">
                <a href="javascript:void(0)">
                    <div class="icon-containter ">
                        <img src="../../../../assets/jy/jyindex/img/icon_x4.png" alt="">
                    </div>
                    <span class="icon-text">担保品卖出</span>
                </a>
            </li>
            <li class="list" data-tradeaction="15012">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x10.png" alt="">
                    </div>
                    <span class="icon-text">融资买入</span>
                </a>
            </li>
            <li class="list" data-tradeaction="15013">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x9.png" alt="">
                    </div>
                    <span class="icon-text">融券卖出</span>
                </a>
            </li>
        </ul>
        <ul class="module">
            <li class="list" data-tradeaction="15015">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x8.png" alt="">
                    </div>
                    <span class="icon-text">卖券还款</span>
                </a>
            </li>
            <li class="list" data-tradeaction="15014">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x7.png" alt="">
                    </div>
                    <span class="icon-text">买券还券</span>
                </a>
            </li>
            <li class="list" data-url="/newjy/rzrq/qwtcd.html">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x1.png" alt="">
                    </div>
                    <span class="icon-text">撤单</span>
                </a>
            </li>
            <li class="list" data-url="/newjy/rzrq/qcxchicang.html">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x2.png" alt="">
                    </div>
                    <span class="icon-text">持仓</span>
                </a>
            </li>
          </ul>
          <ul class="module">
              <li class="list" data-url="/newjy/rzrq/qcxwt.html">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x6.png" alt="">
                    </div>
                    <span class="icon-text">当日委托</span>
                </a>
             </li>
             <li class="list" data-url="/newjy/rzrq/qdrcj.html">
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x5.png" alt="">
                    </div>
                    <span class="icon-text">当日成交</span>
                </a>
             </li>
             <li class="list"  data-url='/newjy/rzrq/qcxzc.html'>
                <a href="javascript:void(0)">
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x12.png" alt="">
                    </div>
                    <span class="icon-text">资产</span>
                </a>
             </li>
             <li class="list" data-url="/newjy/rzrq/yzzz.html">
                <a  href="javascript:void(0)" >
                    <div class="icon-containter">
                        <img src="../../../../assets/jy/jyindex/img/icon_x11.png" alt="">
                    </div>
                    <span class="icon-text">银证转账</span>
                </a>
            </li>
        </ul>
    </div>
    <!-- nav结束 -->

    <div class="tab_ul">
         <div class="line-top-bottom"></div>
       <ul class="list_box module a-main ">
            <li class="list split-bottom-line " data-url='/newjy/xgsg/xgsg_indexnew.html?logintype=2'><p class="a-name form-font-color ">新股申购</p><i class="arrow-1"></i><span class="newtip tx"></span></li>
             <li class="list split-bottom-line j_kzz"><p class="a-name form-font-color ">新债申购</p><i class="arrow-1"></i></li> 
        </ul>
        <div class="line-top-bottom"></div>
       <ul class="list_box module a-main ">
            <li class="list split-bottom-line " data-tradeaction="15017"><p class="a-name form-font-color ">直接还款</p><i class="arrow-1"></i></li>
            <li class="list split-bottom-line  j_wtcd" data-tradeaction="15016"><p class="a-name form-font-color ">直接还券</p> <i class="arrow-1"></i></li>
        </ul>
        <div class="line-top-bottom"></div>
        <ul class="list_box module a-main ">
            <li class="list split-bottom-line  j_dbhz" data-action="15020"><p class="a-name form-font-color">担保品划转</p> <i class="arrow-1"></i></li>
            <li class="list split-bottom-line  j_hzcd" data-url="/newjy/rzrq/qhzcd.html"><p class="a-name form-font-color">划转撤单</p> <i class="arrow-1"></i></li>
        </ul>
        <div class="line-top-bottom"></div>
        <ul class="list_box module a-main ">
            <li class="list split-bottom-line  j_search" data-url="/newjy/rzrq/rzrq_search.html"><p class="a-name form-font-color">查询</p> <i class="arrow-1"></i></li>
        </ul>
        <div class="line-top-bottom"></div>
        <ul class="list_box module a-main ">
            <li class="list split-bottom-line  j_newkey" data-url='/newjy/rzrq/setpassword.html'><p class="a-name form-font-color">修改密码</p> <i class="arrow-1"></i></li>
        </ul>
    </div>
    <div class="tab_sign">
      <ul class="a-sign">
            <div class="line01"></div>
          <li data-action="10407">退出</li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
import localService from '../../../../services/localService'
import service_deal_rzrq from '../../service/common/service_deal_rzrq'
  export default{
    data(){
      return {
        isBtn:false,
        searchType:0
      }
    },
    ready(){
    },
    attached(){
        var that = this;
        //融资融券、新股申购，各个模块的首页都在使用
        /*
        * @融资融券需要在body节点上加个data-type为2，是为了让logintype传值
        * @data-type为2的时候每个url地址后面都加了logintype=2方便区分是普通交易还是融资融券界面
        * */
        $(function () {
            init();
        //  $('.trade-header-logbg').height($('.fund-info').height());
            
            //判断登陆
           GoBackOnLoad();
           $(".a-sign li").off().on("click",function(){
            var url = $(this).attr("data-action");
            if (confirm('是否退出当前账号?')) {
                    onJsOverrideUrlLoading('http://action:'+ url+'/?context='+encodeURIComponent('退出融资融券'));  
                    GoBackOnLoad();
                } else {
                    
                }
           
        //       $('.trade-header-logbg').show();
        //      $('.fund-info').hide();
        //       $(".a-sign").hide();
                
            });
        });
        function init() {
            pageEvent();
            ts();
            var protects = $('.hide-fun');
          $('.eyes').click(function(){
            var $this=$(this);
            localService.readFileMesg(['RzStatus']).then((result)=>{
            // T.readFileMesg('RzStatus', function(result) {
              var res = JSON.parse(decodeURIComponent(result));
              res.RzStatus = !res.RzStatus;
              localService.saveFileMesg(res);
               $this.toggleClass('close-eye');
                  $('.hide-fun').each(function() {
                      var $this = $(this);
                      var temp = $this.data('pas');
                      var cls=$this.attr('classTemp');
                      $this.toggleClass(cls);
                      $this.data('pas', $(this).text());
                      $this.html(temp);
                  })
               // T.saveFileMesg(res, 'RzStatus',function(){
               //    $this.toggleClass('close-eye');
               //    $('.hide-fun').each(function() {
               //        var $this = $(this);
               //        var temp = $this.data('pas');
               //        var cls=$this.attr('classTemp');
               //        $this.toggleClass(cls);
               //        $this.data('pas', $(this).text());
               //        $this.html(temp);
               //    })
               // })
            })
          })
        }
           function ts(){
                var oSendData = {
                    action:686,
                    nPage:1,
                    maxcount:100,
                    ReqlinkType: '1'
                };
                $.showPreloader();
                service_deal_rzrq.require686(oSendData).then((oData)=>{
                    $.hidePreloader();
                    if(oData.ERRORNO<0){
                        return ;
                    }
                    var aGrid = oData.GRID0;
                    var sStr = aGrid.length;
                    var n = sStr -1;
                    if(n==0){
                        $(".tx").html('');
                    }else{
                        $(".tx").html('今日有'+n+'支新股可申购');
                    }
                })
                // $.getData({oSendData:oSendData,isToken:false,isload:false, fnSuccess:function (oData) {
                //     var aGrid = oData.GRID0;
                //     var sStr = aGrid.length;
                //     var n = sStr -1;
                //     if(n==0){
                //         $(".tx").html('');
                //     }else{
                //         $(".tx").html('今日有'+n+'支新股可申购');
                //     }
                // },oConfig:function(oData){
                //     if(oData.ERRORNO<0){
                //         return ;
                //     }
                // }})
            }
        function pageEvent() {  
            $('.modulenew .j_dbmr,.module li').on("click",function(){
                var _this = $(this);
                var type = $('body').attr('data-type') || '2';
                var oSend ={fullscreen:1, secondtype:9, firsttype:10};
                if(_this.attr("data-tradeaction")){
                    oSend = {};
                    oSend["action"] = _this.attr("data-tradeaction");
                    if(_this.attr("data-url")){
                        oSend["url"] = _this.attr("data-url");
                        if(oSend["url"].indexOf('?')>0 && type == '2'){
                            oSend["url"] = oSend["url"]+'&logintype='+type;
                        }else if(type == '2'){
                            oSend["url"] = oSend["url"]+'?logintype='+type;
                        }
                        oSend['url'] = encodeURIComponent(oSend['url']);
                    }
                    if(_this.attr("data-type")){
                        oSend["datetype"] = _this.attr("data-type");
                    }
                    if(_this.attr("data-title")){
                        oSend["title"] = _this.attr("data-title");
                    }else{
                        if(oSend["url"] && oSend["url"].indexOf('title')>0){
                            oSend["title"] = T.getUrlParameter('title',decodeURIComponent(oSend["url"]).split('?')[1]);
                        }
                    }
                    that.$TZT.tradeaction(oSend);
                }else if(_this.attr("data-action")){
                    oSend["url"] = 'http://action:'+_this.attr("data-action")+'/?';
                    oSend["logintype"] = type;
                    that.$TZT.action10090(oSend);
                }else if(_this.attr("data-url")){
                    oSend["url"] = _this.attr("data-url");
                    if(oSend["url"].indexOf('?')>0 && type == '2'){
                        oSend["url"] = oSend["url"]+'&logintype='+type;
                    }else if(type == '2'){
                        oSend["url"] = oSend["url"]+'?logintype='+type;
                    }
                    oSend["isExport"]=true;
                    if(type == '2'){
                        oSend["tzttitletype"]='1';//跟tokentype一致
                    }
                    that.$TZT.action10090({'url': that.$TZT.action10061(oSend),logintype:type});
                }
            });
            $('.j_kzz').on('click',function(){
                that.$TZT.action10061({url:'/newjy/kzzsg/kzzsg_index.html?logintype=2'});
            })
        }

        //退出按钮是否显示
        function GoBackOnLoad(){ 
        //  var sArray = ['tztrzrqloginflag'];
        //  T.readLocalMesg(sArray,function(oData){
        //      if(oData.TZTRZRQLOGINFLAG > 0){// 用户登录，1代表登录，0代表未登录
        //          $(".a-sign").show();
        //      }else{
        //          $(".a-sign").hide();
        //      };
        //  })
        //T.readLocalMesg(["softversion"],function(oData){ //版本号
        //  T.readLocalMesg(["softversion"],function(oData){ //版本号
        //          if(oData.SOFTVERSION >='3.00.005'){
        //              if(cNative.isEmployee() == '1'){//判断员工登录
        //                  alert('信e投APP限制内部员工进行场内股票、基金、债券等交易，但您可以正常购买理财板块的理财产品，请自觉遵守公司操作规范避免股票交易。');
        //              }
        //          }
        //      });
        //});
        localService.readLocalMesg(['tztrzrqloginflag','logintype=2']).then((olocal)=>{
         // T.readLocalMesg(['tztrzrqloginflag'], function(olocal) { 
                if (olocal.tztrzrqloginflag > 0) {// 用户登录，1代表登录，0代表未登录
                    $('.trade-header-logbg').hide();
                    $('.fund-info').show();
                    $(".a-sign").show();
                    localService.readFileMesg(['RzStatus']).then((result)=>{
                    // T.readFileMesg('RzStatus', function(result) {
                        var res;
                            if (!result||!result.RzStatus) {
                                res = {
                                    RzStatus: true
                                }
                                // T.saveFileMesg(res, 'RzStatus',
                                //     function() {
                                //         showFund();
                                //     }
                                // );
                                localService.saveFileMesg(res);
                                showFund(); 
                                // localService.saveFileMesg(res).then((result)=>{
                                //     showFund(); 
                                // });
                            } else {
                                // res = JSON.parse(decodeURIComponent(result));
                                res = result;
                                if (res.RzStatus) {
                                    showFund();
                                } else {
                                    showHide();
                                }
                            };
                    })    
                } else {
                    $('.trade-header-logbg').show();
                    $('.fund-info').hide();
                     $(".a-sign").hide();
                     $('.rzrq-index .login-button').click(function(){     
                      localService.readFileMesg(['RzStatus']).then((result)=>{
                      // T.readFileMesg('RzStatus', function(result) {
                        var res;
                            if (result == '') {
                                res = {
                                    RzStatus: true
                                }
                                // T.saveFileMesg(res, 'RzStatus',
                                //     function() {
                                            
                                //     }
                                // );
                                localService.saveFileMesg(res);
                                showFund();
                                // localService.saveFileMesg(res).then((result)=>{
                                //      that.$TZT.action10090({
                                //             'jsfuncname': 'showFund()',
                                //             'logintype':'2'
                                //         });
                                // });
                            } else {
                                // res = JSON.parse(decodeURIComponent(result));
                                res = result;
                                if (res.RzStatus) {
                                     that.$TZT.action10090({
                                        'jsfuncname': 'showFund()',
                                        'logintype':'2'
                                    });
                                } else {
                                     that.$TZT.action10090({
                                        'jsfuncname': 'showHide()',
                                        'logintype':'2'
                                    });
                                }
                            };
                    })             
                })
                }
            })
        };

        function showHide(){
          $('.eyes').addClass('close-eye');
          $('.trade-header-logbg').hide();
          $('.fund-info').show();
          senData(true);
          sendMoney(true);
        }

        function showFund(){
          $('.eyes').removeClass('close-eye');
          $('.trade-header-logbg').hide();
          $('.fund-info').show();
          senData();
          sendMoney();
        }
        window.showFund=showFund;
        window.showHide=showHide;
        function toDemi(str) {
            return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        function fmoney(s, n)   
        {   
           n = n > 0 && n <= 20 ? n : 2;   
           s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
           var l = s.split(".")[0].split("").reverse(),   
           r = s.split(".")[1];   
           t = "";   
           for(i = 0; i < l.length; i ++ )   
           {   
              t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
           }   
           return t.split("").reverse().join("") + "." + r;   
        }
        function senData(hide){
           // var StartPos 
           // var oSend = {
           //      StartPos: startPos==0 ? startPos : (startPos+1),
           //      //最大条数
           //      MaxCount: pagecount,
           //  };
           service_deal_rzrq.require406().then((oData)=>{
            var result = oData.GRID0;
              if(hide){
                setDetailData(result,true)
              }else{
                setDetailData(result)
              }
          })
            // func.ms406(oSend, function (oData) {
            //   var result = oData.GRID0;
            //   if(hide){
            //     setDetailData(result,true)
            //   }else{
            //     setDetailData(result)
            //   }
            // },function(){},false);
        }
        function setDetailData(result,hide){
          var arrData=result[1].split('|');
              if(hide){
                 $('.span-val1').data('pas',toDemi(arrData[2]));
                 $('.span-val1').html('&nbsp');
                 $('.span-val1').addClass('spanBig');
                 $('.span-val2').html('&nbsp');
                 $('.span-val2').data('pas',toDemi(arrData[4]));
                 $('.span-val2').addClass('spanBig');
                 var numData=accMul(arrData[3],100);
                 $('.span-val3').data('pas',toDemi(numData)+'%');
                 $('.span-val3').html('&nbsp');
                 $('.span-val3').addClass('spanBig');
              }else{
                 $('.span-val1').text(toDemi(arrData[2]));
                 $('.span-val1').data('pas','&nbsp');
                 $('.span-val1').removeClass('spanBig');
                 $('.span-val2').text(toDemi(arrData[4]));
                 $('.span-val2').data('pas','&nbsp');
                 $('.span-val2').removeClass('spanBig');
                 var numData=accMul(arrData[3],100);
                 $('.span-val3').text(toDemi(numData)+'%');
                 $('.span-val3').data('pas','&nbsp');
                 $('.span-val3').removeClass('spanBig');
              }

        }
        function sendMoney(hide){
           // var oSend = {
           //      StartPos: startPos==0 ? startPos : (startPos+1),
           //      //最大条数
           //      MaxCount: pagecount
           //  };
            service_deal_rzrq.require402().then((oData)=>{
            // func.ms402(oSend, function (oData) {
             var result = eval(oData.GRID0);
                  if(hide){
                     setDetail(result,hide);
                  }else{
                     setDetail(result);
                  }
                REREQ = false;
            },function(){},false);

        }
        function accMul(arg1,arg2)  
        {  
            var m=0,s1=arg1.toString(),s2=arg2.toString();  
            try{m+=s1.split(".")[1].length}catch(e){}  
            try{m+=s2.split(".")[1].length}catch(e){}  
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)  
        }
        function setDetail(result,hide){
          var arrMoney=result[1].split('|');
          var numMoney=arrMoney[4];
            if(numMoney>1000000000){
              $('.fund-top h1').css("font-size","0.7rem")
            }
            if(hide){
                $('.datamoney').data('pas',toDemi(arrMoney[4]));
                $('.datamoney').text('******');
            }else{
                $('.datamoney').text(toDemi(arrMoney[4]));
                $('.datamoney').data('pas',"******");
            }
            // $('.span-val1').text(fmoney(arrData[2],2));
          
        }
    },
    methods: {
    },
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/jy/jyindex/css/base-min.css";
  @import "../../../../assets/jy/jyindex/css/trade_index";
  @import "../../../../assets/jy/jyindex/css/rzrq_index";
  @import "../../../../assets/jy/jyindex/css/pop.css";
  .explain .content{
    padding-top: 1.6rem;
  }
  .j_refresh{
        display: none;
  }
  .a-sign{
        display: none;
  }
</style>