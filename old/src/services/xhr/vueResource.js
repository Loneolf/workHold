/**
 * Created by zhonglu on 2016/10/18.
 */
// VueResource 最大的好处就是可以在组件中直接 this.$http 实现请求
import Vue from 'vue'
import VueResource from 'vue-resource'
import {  errHandler } from './config'

Vue.use(VueResource);

// Vue.http.options.root = rootPath;
Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = { withCredentials: true };
Vue.http.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const xhr = ({ url, body, method = 'post' }) => {
  // 引入了 ES6 的 Promise 实现
  return new Promise((resolve, reject) => {
    Vue.http[method.toLowerCase()](url, body)
      .then((data) => { // 从封装体中解构出data字段
        data = data.json();
        if (!data) // 读取 undefined/null 的属性会报错
          return resolve(null);
        if (data._code)
          return errHandler(data._msg);
        resolve(data)
      }, errHandler)
  })
};

export default xhr
