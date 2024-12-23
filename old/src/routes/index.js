/**
 * Created by zhonglu on 2016/10/18.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import browser from "../util/browser"
import routesMap from './map' // 路由映射

import util from '../util/util'
import dateFilter from '../filters/dateTimeFormatter';
import localService from '../services/localService'

// 在这里访问不了根组件的 this.$root.userData，但服务照常无障碍访问
import userService from '../services/userService'

Vue.use(VueRouter);

const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true // 开发环境下
  // suppressTransitionError: true // 生产环境下
})
router.map(routesMap);

// router.redirect({
//   '/': '/hq/index'
// })
// ========================================
// 中间件
// ========================================
// 简单的路由跳转 Logger
router.beforeEach(({ to, from, abort, redirect, next }) => {
  $.showPreloader();
  console.info(`[RouteLogger] ${decodeURI(from.path)} => ${decodeURI(to.path)}`);
  // console.log(to.matched[0].handler.path);
  let toPath = to.matched[0].handler.path;
  localService.readMapMesg(['hqshow','dealshow','zxshow'])
      .then((local)=>{
        if(local.hqshow!='hq'){
          if(!toPath || toPath === '' || toPath === '/'){
            router.go({path:'/hq/geguhangqing'});
          }
        }else if(local.hqshow=='hq'&& local.dealshow!='deal'){
          if(!toPath || toPath === '' || toPath === '/'){
            router.go({path:'/deal/index'});
          }
        }else if(local.hqshow=='hq'&&local.dealshow=='deal'&& local.zxshow!='zx'){
          if(!toPath || toPath === '' || toPath === '/'){
            router.go({path:'/information/index'});
          }
        }

      });

  let queryParams = to.matched.queryParams;
  //console.log(to.meta.name);
  let title = '',logintype = 1; //默认普通登录
  if(to.meta && 'name' in to.meta){
    title = to.meta.name;
  }
  //对股转做特殊处理 添加时间：20170829
  if(toPath === '/deal/gz/stock_alone'){
    if(queryParams.tab === '0'){
      title = '互报成交确认买入';
    }else if(queryParams.tab === '1'){
      title = '互报成交确认卖出';
    }
  }else if(toPath === '/deal/gz/stock_cjalone'){
    if(queryParams.tab === '0'){
      title = '成交确认买入';
    }else if(queryParams.tab === '1'){
      title = '成交确认卖出';
    }
  }else if(toPath === '/deal/rzrqstock_alone'){
    if(queryParams.tab === '0'){
      title = '买券还券';
    }else if(queryParams.tab === '1'){
      title = '卖券还款';
    }
  }
  if (toPath === '/hq/hggStockInfo') {
      if (queryParams.hstockname) {
        title = queryParams.hstockname
    }
  }
  if(toPath === '/deal/login'){
    if(!userService.isActivePhone()){
      router.go({path:'/deal/activePhone?logintype='+(queryParams.logintype||1),replace:true});
    }
    if(queryParams.logintype == 2){
      title = '融资融券登录';
    }
  }
  if(queryParams && queryParams.datetype==1){
    var beidate = util.manyDays('-7');
    var beiginValue = (util.getYTDS(beidate)).replace(/-/g,'');
    var endValue = (dateFilter(new Date().getTime(),2)).replace(/-/g,'');
    queryParams.begindate = beiginValue;
    queryParams.enddate = endValue;
    router.app.isBarDate = true;
  }else {
    router.app.isBarDate = false;
  }
  document.getElementsByTagName('title')[0].innerHTML = title || '行情';
  router.app.title = title;
  router.app.barstockcode = '';
  router.app.stocktypenew = '';
  router.app.baraccountname = '';
  router.app.baraccountcode = '';
  if(
    toPath === '/hq/index' ||
    toPath === '/hq/index/zxlist' ||
    toPath === '/home/index' ||
    toPath === '/deal/index' ||
    toPath === '/deal/stock' ||
    toPath === '/deal/gz/stock' ||
    toPath === '/deal/gz/stock_alone' ||
    toPath === '/deal/gz/stock_cjalone' ||
    toPath === '/deal/ggtstock' || toPath === '/deal/ggtstock_alone' ||
    toPath === '/information/index' ||
    toPath === '/deal/ztindex'||
    toPath === '/deal/reverseRepo/repoList'){
    router.app.isIndex = true;
    router.app.isBarNav = true;
    if(toPath === '/hq/index'){
      router.app.barType = 4;
    }else if(toPath === '/deal/reverseRepo/repoList'){
      router.app.isIndex = false;
      if(location.href.indexOf('chicang=1')>0){
        router.app.barType = 100;
      }else{
        router.app.barType = 101;
      }
    }else if(toPath === '/hq/index/zxlist'){
      router.app.barType = 5;
    }else if(toPath === '/deal/stock' || toPath === '/deal/gz/stock' || toPath === '/deal/gz/stock_alone' || toPath === '/deal/gz/stock_cjalone' || toPath === '/deal/ggtstock' || toPath === '/deal/ggtstock_alone'){
      router.app.barType = 7;
    }else if(toPath === '/deal/index'){
      router.app.isIndex = true;
      router.app.jyUrl = '/deal/index';
      localService.saveMapMesg({routerPush:'/deal/login?logintype=1'});
      localService.readMapMesg(['jyloginflag'])
          .then((local)=>{
            if(local.jyloginflag && local.jyloginflag >= 1){
              router.app.isBtnPt = false;
            }else{
              router.app.isBtnPt = true;
            }
          });
      router.app.barType = 8;
    }else {
      router.app.barType = 1;
    }
  }else {
    router.app.isIndex = false;
    router.app.isBarNav = true;
    if(toPath === '/hq/list'||toPath === '/hq/hlist'){
      if(to.query.stockcode){
        router.app.barType = 3;
      }else {
        router.app.barType = 2;
      }
    }else if(toPath === '/deal/rzrq/index'){
      router.app.isIndex = true;
      router.app.jyUrl = '/deal/rzrq/index';
      localService.saveMapMesg({routerPush:'/deal/login?logintype=2'});
      localService.readMapMesg(['tztrzrqloginflag','logintype=2'])
          .then((local)=>{
            if(local.tztrzrqloginflag && local.tztrzrqloginflag >= 1){
               router.app.isBtnRzrq = false;
            }else {
               router.app.isBtnRzrq = true;
            }
          });
      router.app.barType = 9;
    }else if(toPath === '/hq/ggStockInfo' || toPath === '/hq/hggStockInfo'){
      router.app.barType = 6;
    }else if(toPath === '/hq/editzxg' || toPath === '/hq/search' || toPath === '/deal/views/ptjy/ons/stockHoldingNew'){
      router.app.isBarNav = false;
    }else if(toPath === '/deal/rzrqstock' || toPath === '/deal/rzrqstock_alone'){
      logintype = 2; //两融
      router.app.barType = 7;
    }else {
      router.app.barType = 2;
    }
  }
  //交易部分设置姓名和客户号
  if(router.app.barType === 7 && logintype>=1){
    localService.readMapMesg(['USERCODE','USERNAME',('logintype='+logintype)]).then((data)=> {
      if(!!data&&data.USERCODE&&data.USERNAME){
        let account1 = '客户号:' + data.USERCODE.substring(3,0)+'**'+data.USERCODE.substring(9),
            username1 = data.USERNAME.substring(1,0) +"**",
            subtitletext = username1+"&nbsp;&nbsp;&nbsp;"+account1;
        router.app.subtitletext = subtitletext;
      }else{
        router.app.subtitletext = '';
      }
    })
  }

  if(window.setIntervalID){
    window.clearInterval(window.setIntervalID);
  }
  let dark = 'theme-white';
  if(browser.browser.versions.webview){
    router.app.isIndex = false;
    router.app.isBarNav = false;
    if(toPath === '/hq/capitalflows' || toPath === '/hq/finance' || toPath === '/hq/introduction' || toPath === '/hq/shareholder' || toPath === '/hq/positions'){
      dark += ' no-iscroll';
    }
  }
  /*userService.shin()
    .then(function (data) {
      let dark = data === '0' ? 'theme-dark' : 'theme-white';
      let body = document.getElementsByTagName("body")[0];
      body.setAttribute('class',dark);
      next();
    })*/
  let body = document.getElementsByTagName("body")[0];
  body.setAttribute('class',dark);
  console.log(toPath)
  if(toPath === '/hq/geguhangqing' || toPath === '/hq/geguhangqingNew' || toPath === '/deal/views/ptjy/ons/stockHoldingNew'){
    localService.readLocalMesg(['isSLBOpen']).then((data)=>{
      let body = document.getElementsByTagName("body")[0];
      let isIphone = browser.browser.versions.iPhone
      if(data.ISSLBOPEN == '1'){
        if(isIphone){
            body.style['-webkit-text-size-adjust'] = '120%'
        }
        body.classList.add('slh')
        var new_element = document.createElement('link');
        new_element.setAttribute('rel', 'stylesheet');
        new_element.setAttribute('href', '/hq/skin/slhCss.css');
        document.body.appendChild(new_element);
      }
    })
  }
  next();
});

// 权限拦截
router.beforeEach(({ to, from, abort, redirect, next }) => {
  if((to.path.indexOf('/jy')>-1 || to.path.indexOf('/zt')>-1) && to.path.indexOf('.htm')>-1){
    // window.location.href = to.path;
    window.location.replace(to.path);
    return abort();
  }
  if (to.needToLogin /*&& !userService.data*/) {
    alert('需要登录后才能访问')
    console.info('[Auth:Failed] 中断跳转')
    return abort()
  }
  next()
})

router.afterEach(function (transition) {
  $.hidePreloader();
  console.log('成功浏览到: ' + transition.to.path)
});

export default router
