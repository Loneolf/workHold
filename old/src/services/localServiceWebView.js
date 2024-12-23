/**
 * Created by zhonglu on 2016/10/18.
 */
import xhr from './xhr/index'
/**
 * 对应客户端端的所有 API
 */
class localService {
  /**
   * 读取本地数据 readLocalMesg
   * @param  {String} sArray   字符串
   * @param  {Array} sArray  数组
   * @return {Promise}
   */
  readLocalMesg (sArray) {

    let sSendURL = "";

    if(typeof sArray == 'string'){
      sSendURL = sArray;
    }else{
      for (var x = 0; x < sArray.length; x++) {

        if(sArray[x].indexOf('=')>0){
          sSendURL += sArray[x]+"&";
        }else{
          sSendURL += sArray[x] + "=" + "&";
        }

      }
      sSendURL = sSendURL.slice(0, -1);
    }

    let url = `/reqlocal?${sSendURL}`;

    return xhr({ url })
  }

  /**
   * 保存数据到缓存 saveMapMesg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  saveMapMesg (msgBody) {
    return xhr({
      method: 'post',
      url: '/reqsavemap?',
      body: msgBody
    })
  }

  /**
   * 读取缓存数据 readmapMesg
   * @param  {String} sArray   字符串
   * @param  {Array} sArray  数组
   * @return {Promise}
   */
  readMapMesg (sArray) {
    let sSendURL = "";

    if(typeof sArray == 'string'){
      sSendURL = sArray;
    }else{
      for (var x = 0; x < sArray.length; x++) {

        if(sArray[x].indexOf('=')>0){
          sSendURL += sArray[x]+"&";
        }else{
          sSendURL += sArray[x] + "=" + "&";
        }

      }
      sSendURL = sSendURL.slice(0, -1);
    }

    let url = `/reqreadmap?${sSendURL}`;

    return xhr({ url })
  }

  getAccountList (obj,type) {
    var newArray = ['ACCOUNTLIST'];
    if(obj){
      for(var x in obj){
        if(obj[x] && obj[x] != ''){
          newArray.push(x+'='+obj[x]);
        }else{
          newArray.push(x);
        }
      }
    }
    var _this = this;
    return new Promise((resolve, reject) => {
      _this.readLocalMesg(newArray)
        .then((oData)=>{
          var acclist = oData.ACCOUNTLIST.replace(/\r\n/g,'&').replace(/\3/g,'&').split('&');
          var account={};
          if(acclist){
            for(var i=0;i<acclist.length;i++){
              var list = acclist[i].split('|');
              if(list[0] && list[0]!= '' && list[2] && list[2] != ''){
                if(!(list[0] in account)){
                  if(type){
                    account[list[0]] = {
                      wtaccount:list[1],
                      name:list[2],
                      wtaccounttype:list[0],
                    }
                  }else {
                    account[list[0]] = list[2];
                  }

                }
              }
            }
          }
          resolve (account);
        });
    });
  }
}

// 实例化后再导出
export default new localService()
