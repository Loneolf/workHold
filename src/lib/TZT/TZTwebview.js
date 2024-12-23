/**
 * Created by zhonglu on 2016/10/19.
 */
import browser from "@u/browser"

var core_strundefined = 'undefined';

window.onJsOverrideUrlLoading = function(str){
  if(browser.browser.versions.winphone){
    window.external.notify(str);
  }else if(browser.browser.versions.android){
    window.MyWebView.onJsOverrideUrlLoading(str);
  }else{
    window.location.href = str;
  }
};

export default {
  changeurl:onJsOverrideUrlLoading,
  //返回前一页10002
  action10002(obj) {

    var tUrl = 'http://action:10002/?';
    if(obj && obj.isExport){
      return tUrl;
    }
    this.changeurl(tUrl);

  },
  //关闭当前页面打开另一个页面1964
  /*
  *@描述 关闭当前页面打开另一个页面1964
  *补充1964webview跳转逻辑  修改时间：20170510
  */
  action1964(obj){
    var config = {};
    if(typeof obj == 'string'){
      config.url = obj;
    }else {
      config.url = obj.url;
    }
    if(config.url.indexOf('/index3.html#!') < 0){
      config.url = '/index3.html#!'+config.url;
    }
    var tUrl = 'http://action:1964/?url=' + encodeURIComponent(config.url);
    if(obj && obj.isExport){
      return tUrl;
    }
    this.changeurl(tUrl);
  },
  //关闭一组webview3413
  action3413(obj){

    var tUrl = 'http://action:3413/?';
    if(obj && obj.isExport){
      return tUrl;
    }
    this.changeurl(tUrl);
  },
  //系统登出
  action10402(str,text){

    var sUrl = '',txt='';
    if(typeof text == 'string'){
      txt = 'context='+text+'&&';
    }else{
      var iscont = false;
      for(var x in text){
        if(x == 'context'){
          iscont = true;
        }
        txt+=x+'='+text[x]+'&&';
      }
      if(!iscont){
        txt+='context=&&';
      }
    }
    if(typeof str != core_strundefined){
      sUrl = txt+'url='+encodeURIComponent(str);
    }
    this.changeurl('http://action:10402/?'+sUrl);
  },
  /*
   *功能：常用判断登陆用action10090全屏打开页面地址
   *参数：url 要打开的url地址 Y
   *参数：fuc 要执行的js方法名
   *参数：logintype @0系统登录@1是普通交易登陆@2是融资融券登陆@8是个股期权登陆@9融资融券担保品划转登录
   */
  action10090(obj){

    var config = {
          logintype:1,
          loginkind:2,
          isExport:false,
          url:'',
          isaction:false
        },
        sUrl = 'http://action:10090/?';
    $.extend(config,obj);
    for(var x in config){
      if (x && config[x] != ''){
        if(x == 'isExport' || x == 'isaction'){
          continue;
        }else{
          sUrl+=x+'='+config[x]+'&&';
        }
      }
    }
    if(config.isExport){
      return sUrl.slice(0,-2);
    }else{
      this.changeurl(sUrl.slice(0,-2));
    }

  },
  /* 打开一个新的webview
   * type/secondtype
   *  @0、个股查询
   *  @1、修改字体(客户端处理)
   *  @2、订阅(后面需要带上订阅点击打开的地址）
   *  @3、修改(需要带上修改所要打开的地址）
   *  @4、我要开户(需要带上开户地址）
   *  @5、在线客服(需要带上在线客服地址）
   *  @6、筛选 （文字）(需要带上筛选链接地址）
   *  @7、筛选1（图片）(需要带上筛选链接地址）
   *  @8、快捷方式@9、右侧没有按钮
   *  @98:自定义(显示对应图片)
   *  @99:自定义(设置为默认底图，显示对应文本)
   * fullScreen@是否全屏展示 0-否，1-是
   * url@当前需要打开的url地址
   * secondurl@右侧按钮根据type不同，返回的链接地址，用于type(或secondtype)对应按钮点击的界面跳转，未设置secondjsfuncname有效
   * secondjsfuncname@页面对应JS函数名(就是函数的调用'js()')
   * firstjsfuncname@页面对应JS函数名
   * firsturl@左侧按钮根据firsttype不同，返回的链接地址，用于firsttype对应按钮点击的界面跳转，未设置firstjsfuncname有效
   * firsttext@firsttype=99时有效，显示对应文本或firsttype=98时有效，显示对应图片
   * skintype:   默认背景色 0-黑色 1-白色，为空，则默认当前使用的主题颜色
   * */
  action10061(obj){
    //打开一个新的webview10061
    var config = {
      secondtype:9,
      fullscreen:1
    },aParam = [];
    if(typeof obj == 'string'){
      config.url = obj;
    }
    if(typeof obj != core_strundefined && (typeof obj != 'string')){
      $.extend(config,obj);
      if('isExport' in config){
        delete config['isExport'];
      }
    }
    var x;
    for(x in config){
      if (x && config[x] != ''){
        if(x == 'url'){
          //hhz 增加http和https判断  修改时间：20171222
          if(config.url.indexOf('/index3.html#!') < 0 && config.url.indexOf('/jy')<0 && config.url.indexOf('.html')<0 && config.url.indexOf('http')<0){
            config.url = '/index3.html#!'+config.url;
          }
          aParam.push(x+"=" + encodeURIComponent(config.url));
          continue;
        }
        aParam.push(x+"=" + config[x]);
      }
    }
    var exportUrl = '';
    if(aParam.length !=0){
      exportUrl = 'http://action:10061/?' + aParam.join('&&') + '&&secondtype=9';
    }
    // this.changeurl(exportUrl); 
    if(typeof obj.isExport == core_strundefined){
      this.changeurl(exportUrl);
    }else{
      return encodeURIComponent(exportUrl);
    }
  },
  //分享渠道 0:微信  1:微信朋友圈  2:QQ好友 3:QQ空间 4:腾讯微博 5:新浪微博 99:客户端选择
  /*
   * @sharetype分享渠道
   * @img_url分享图片URL
   * @url分享的URL
   * @title分享标题
   * @message分享内容
   * */
  action10055(obj){

    var aURL = [];

    if(typeof obj == core_strundefined){
      alert('请写sharetype分享渠道，img_url分享图片URL，url分享的URL，title分享标题，message分享内容');
      return;
    }
    var key;
    for(key in obj){
      if (obj[key] != ''){
        if(key == 'title' || key == 'message'){
          aURL.push(key+"=" + obj[key]);
          continue;
        }
        aURL.push(key+"=" + encodeURIComponent(obj[key]));
      }
    }
    var tUrl = 'http://action:10055/?' + aURL.join('&&');
    if(obj && obj.isExport){
      return tUrl;
    }
    this.changeurl(tUrl);
  },
  //拨打电话
  actiontel(obj){

    if(!obj || !obj.tel){
      alert('请输入拨打的号码！');
      return;
    }
    var tUrl = 'http://tel:' + obj.tel;
    if(obj && obj.isExport){
      return tUrl;
    }
    this.changeurl(tUrl);
  },
  //打开第三方应用
  /*
   * content@下载前的提示内容
   * opentype@调用三方软件方式@0通过scheme打开@1包名打开@2Activity打开
   * appurl@第三方应用调用url
   * activityurl@要打开的第三方应用的activity值
   * downloadurl@下载地址
   * @当opentype等于0或1时activityurl为空，当为2时activityurl为要打开的activity值
   * */
  action10073(obj){

    var config = {
      content:'是否下载',
      opentype:0
    },aParam=[];
    $.extend(config,obj);
    var name;
    for(name in config){
      aParam.push(name+"=" + encodeURIComponent(config[name]));
    }
    var tUrl = 'http://action:10073/?'+aParam.join('&&');
    if(obj && obj.isExport){
      return tUrl;
    }
    this.changeurl(tUrl);
  },
  action10075(obj){
    var str = [];
    for(var n in obj){
      str.push(n+'='+obj[n]);
    }
    this.changeurl('http://action:10075/?'+str.join('&&'));
  },
  action10077(_this){
    window.dealRefreshTimer = function () {
      // alert('开始执行定时器！');
      _this.dealRefreshTimer();
    }
    this.changeurl('http://action:10077/?');
  },
  refreshhistorydata(_this){
    window.refreshhistorydata = function (begindate,enddate) {
      _this.refreshhistorydata(begindate,enddate);
    };
  },
  action10084(obj){
    this.changeurl('http://action:10084/?stockcode='+obj.stockcode+'&&stockname='+obj.stockname);
  },
  /*
   * 通用新版调用交易功能
   * 1、若只要使用客户端界面，则无须传入url，客户端根据是否有url判断是使用页面的方式还是原生的
   * 2、datetype用于日期选择，历史类的查询需要选择日期，页面只传入url，客户端第一次打开，自己补上begindate和enddate作为入参打开，
   *    以后每次修改日期，都执行界面的js，js函数固定refreshhistorydata(开始日期，结束日期)，url不再传入
   * http://tradeaction:原先交易功能号/?title=标题&&stockcode=股票代码&&url=要打开的url&&datetype=1
   * */
  tradeaction(obj){

    var config = {
      title:'',
      stockcode:'',
      url:'',
      datetype:0,
      action:''
    },aParam = '/?';
    $.extend(config,obj);
    for(var x in config){
      if(config[x] == '' || x == 'isExport'){
        delete config[x];
      }else{
        if(x == 'action'){
          continue;
        }
        aParam += x+'='+config[x]+'&&';
      }
    }
    if(!config.action || (typeof config.action == core_strundefined)){
      config.action = '';
    }
    if(aParam.length > 2){
      aParam = aParam.slice(0,-2)
    }
    var exportUrl = 'http://tradeaction:'+config.action+aParam;
    if(typeof obj.isExport == core_strundefined || !obj.isExport){
      this.changeurl(exportUrl);
    }else{
      return exportUrl;
    }
  },
  setContentParams(data,obj){
    var jsonobj = JSON.stringify(obj);
    if(data.TZTWKWEBVIEW == 1){
        window.webkit.messageHandlers.setContentParams.postMessage({
            func: "reqwebcontentparam", //回调函数名
            data: jsonobj //数据
        });
    }else{
        window.MyWebView.setContentParams("reqwebcontentparam",jsonobj);
    };
  }
}
