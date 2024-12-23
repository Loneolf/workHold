/**
 * Created by zhonglu on 2016/10/18.
 */

export default {
  /**
   * html里的内容再次编译
   * @param  {String} html 当前值
   * @return {String}
   */
  unescape(html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;/g, "\'");
  }
}
