/**
 * Created by zhonglu on 2016/10/18.
 */

export default {
  /**
   * 颜色比较
   * @param  {String} now 当前值
   * @param  {String} old 之前值
   * @return {String}
   */
  colorDivide(now,old){
    now = parseFloat(now);
    old = parseFloat(old);
    if(isNaN(now) || isNaN(old)){
      return '';
    }
    if(now>old){
      return 'rise';
    }else if(now<old){
      return 'fill';
    }else {
      return ''
    }
  },
  /**
   * 是否是涨
   * @param  {String} now 当前值
   * @return {String}
   */
  isUP(now){
    now = parseFloat(now);
    if(isNaN(now)){
      return '';
    }
    if(now>0){
      return 'rise';
    }else if(now<0){
      return 'fill';
    }else {
      return ''
    }
  }
}
