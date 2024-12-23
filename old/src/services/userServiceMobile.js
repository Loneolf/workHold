/**
 * Created by zhonglu on 2016/10/18.
 */
import localService from './localService'
import Vue from 'vue'
import TZT from '../TZT/index'
import util from '../util/util'

let vue = new Vue();
/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {

  checkLogin () {
      return localService.readLocalMesg(['JYLOGINFLAG'])
  }

  checkRZRQLogin () {
      return localService.readLocalMesg(['TZTRZRQLOGINFLAG'])
  }

  shin(){
    return new Promise((resolve, reject) => {
      localService.readLocalMesg(['TZTSKINTYPE'])
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve('0');

          resolve( (data.TZTSKINTYPE?data.TZTSKINTYPE : '1') )
        })
    })
  }

  /**
   * @param  {Object} userData
   * @return {Promise}
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/login',
      body: userData
    })
  }

  logout (type) {
    vue.$TZT.action10402(vue.$TZT.action10090({isExport:true,logintype:type}),{logintype:type})
  }

  isActivePhone(){
    var readmap = localService.readLocalMesg('acitve_phone').acitve_phone;
    if(!readmap){
      var acitve_phone = util.getCookie('acitve_phone_cookie');
      if(acitve_phone){
        util.setLocalStorage({acitve_phone:acitve_phone});
        return true;
      }else {
        return false;
      }
    }else {
      util.setSessionStorage({acitve_phone:readmap});
      return true;
    }
  }

}

// 实例化后再导出
export default new UserService()
