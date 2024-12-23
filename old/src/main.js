/**
 * Created by zhonglu on 2016/10/18.
 */
/* 启动文件 */
import Vue from 'vue'
import './directives/'
import './filters/'; //导入全局字符格式化函数
import router from './routes/'
import App from './App'
import VueTzt from "./TZT/index"
require('./sm.js');

// Vue.use(VueTzt);

// 把根组件挂载到 id 为 app 的 DOM 上
router.start(App, '#app');

/**
 * 根据 https://github.com/vuejs/vue-devtools#NOTES
 * Vue 1.0.18 以上版本需要如下配置 devtools
 */
  console.info('[当前环境] 开发环境');
  Vue.config.devtools = true;

