/**
 * Created by zhonglu on 2016/10/18.
 */
/**
 * 此处须把所有指令全局化
 */
import Vue from 'vue'
import pullToRefresh from './pullToRefresh'
import infiniteScroll from './infiniteScroll'

Vue.directive('pullToRefresh', pullToRefresh);
Vue.directive('infiniteScroll', infiniteScroll);
