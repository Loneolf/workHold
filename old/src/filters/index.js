/**
 * Created by zhonglu on 2016/10/18.
 */
/**
 * 此处须把所有过滤器全局化
 */
import Vue from 'vue'
import color from './color'
import util from './util'

Vue.filter('date', require('./dateTimeFormatter').default);
Vue.filter('colorDivide', color.colorDivide);
Vue.filter('isUP', color.isUP);
Vue.filter('unescape', util.unescape);
