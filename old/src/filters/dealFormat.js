/**
 * Created by zhonglu on 2016/10/18.
 * 交易里面字符格式化，将TZT.js里面字符格式的逻辑迁移过来
 */

export default {
  /**
   * [format 字符格式化]
   * @param  {String} num   需要格式的字符串
   * @param  {String} digit 保留几位小数
   * @return {String}       返回格式化后字符串
   */
  format(num,dig) {
      //数字转换成小数两位
      //return Math.round(num*Math.pow(10,Number(dig)))/Math.pow(10,Number(dig));
      var f = parseFloat(num);
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs < 0 && dig>0) {
          rs = s.length;
          s += '.';
      }
      while (s.length <= rs + Number(dig)) {
          s += '0';
      }
      if(rs>=1 && (f.toString().length-rs>dig)){

          if(Number(dig)>0){
              var l = (num.toString().indexOf('.'))+1;
              s = num.toString().slice(0,l+Number(dig));
          }else{
              //s = Math.round(num*Math.pow(10,Number(dig)))/Math.pow(10,Number(dig));
              var wz = num.toString().indexOf('.');
              if(wz > 0){
                  s = num.toString().substr(0,wz);
              }else{
                  s = num;
              }
          }

      }
      return s;
  },
  /**
   * [unit 数量字符格式化]
   * @param  {String} num   需要格式的字符串
   * @param  {String} digit 保留几位小数
   * @return {String}       返回格式化后字符串
   */
  unit(num,digit){
      var dig = digit || 0;
      if(num=='' || typeof num == core_strundefined){
          return '';
      }
      if(isNaN(num)){
          return num;
      }
      var arrNum = num.split('.');
      var arrln = arrNum[0].length;
      if(!digit){
          return num;
      }
      if(arrln>=6 && arrln<9){
          return (this.format(num/10000,dig)+'万');
      }else if(arrln>=9){
          return (this.format(num/100000000,dig)+'亿');
      }else{
          return (this.format(num,dig));
      }
  },
  /**
   * [zzpindex 金额格式化入口]
   * @param  {String} str   需要格式的字符串
   * @param  {String} index 改字符所对应的索引
   * @param  {String} ZZPINDEX 后台返回的ZZPINDEX字符串
   * @return {String}       格式化后字符串
   */
  zzpindex(str,index,ZZPINDEX){
      if(!ZZPINDEX){
          return str;
      }
      var arrIndex = ZZPINDEX.split(','),arrNum=[],arrSuo=[];
      for(var i=0;i<arrIndex.length;i++){
          arrNum[i]=arrIndex[i].split('|')[0];
          arrSuo[i]=arrIndex[i].split('|')[1];
      }
      if(index){
          var suoindex = arrNum.indexOf(index);
          if(suoindex>=0){
              return this.unit(str,arrSuo[suoindex]);
          }else{
              return str;
          }
      }
  },
  /**
   * [dateform 日期格式函数]
   * @param  {String} str   需要格式的字符串
   * @param  {String} index 改字符所对应的索引
   * @param  {String} DATEFORMINDEX 后台返回的DATEFORMINDEX字符串
   * @return {String}       格式化后字符串
   */
  dateform(str,index,DATEFORMINDEX){
      if(!DATEFORMINDEX || !index){
          return str;
      }
      var arrIndex = DATEFORMINDEX.split(','),arrNum=[],arrSuo=[];
      for(var i=0;i<arrIndex.length;i++){
          arrNum[i]=arrIndex[i].split('|')[0];
          arrSuo[i]=arrIndex[i].split('|')[1];
      }
      var suoindex = arrNum.indexOf(index);
      if(suoindex>=0){
          if(arrSuo[suoindex] && arrSuo[suoindex].indexOf('yyyy')=='0'){
              var s = arrSuo[suoindex].replace(/yyyy/g,'$1').replace(/mm/g,'$2').replace(/dd/g,'$3');
              return str.replace(/\-/g,'').replace(/^(\d{4})(\d{2})(\d{2})$/i,s);
          }else if(arrSuo[suoindex] && arrSuo[suoindex].indexOf('hh')=='0'){
              if(str.length==5 || str.length == 7){
                  str='0'+str;
              }
              var s = arrSuo[suoindex].replace(/hh/g,'$1').replace(/mm/g,'$2').replace(/ss/g,'$3');
              return str.replace(/\:/g,'').substr(0,6).replace(/^(\d{2})(\d{2})(\d{2})$/i,s);
          }else{
              return str;
          }
      }else{
          return str;
      }
  }
}