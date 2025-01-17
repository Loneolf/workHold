/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/12/19
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
function createKeyPanelHtml() {
    var c = [];
  c.push('<div id="KeyPanel4" class="keyword_table">');
    c.push('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="abc">');
    c.push("<tbody><tr>");
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="q">q</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="w">w</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="e">e</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="r">r</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="t">t</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="y">y</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="u">u</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="i">i</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="o">o</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="p">p</a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push("<td>&nbsp;</td>");
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="a">a</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="s">s</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="d">d</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="f">f</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="g">g</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="h">h</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="j">j</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="k">k</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="l">l</a></td>');
    c.push("<td>&nbsp;</td>");
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td colspan="3"><a class="caps capital"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">');
    c.push('<path fill="#FFFFFF" d="M16,5l11.5,13H23h-2v2.5V28H11v-7.5V18H9H4.5L16,5 M16,2L0,20h9v10h14V20h9L16,2L16,2z"></path>');
    c.push("< /svg></a > </td>");
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="z">z</a > </td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="x">x</a > </td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="c">c</a > </td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="v">v</a > </td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="b">b</a > </td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="n">n</a > </td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="key" key="m">m</a > </td>');
    c.push('<td colspan="3"><a herf="javascript:void(0)" class="del"><svg version="1.1" xmlns="http:/ / www.w3.org / 2000 / svg " xmlns:xlink="http: //www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 84 84" enable-background="new 0 0 84 84" xml:space="preserve"><rect opacity="0.5" fill="none" width="84" height="84"></rect><g><g><path fill="#E6E6E6" d="M76,25v34H23L8.9,42L23,25H76 M79,22H21.6L5,42l16.6,20H79V22L79,22z"></path></g><polygon fill="#E6E6E6" points="41.3,53 49.6,44.7 57.9,53 60.6,50.3 52.3,42 60.6,33.7 57.9,31 49.6,39.3 41.3,31 38.6,33.7 ');
    c.push('46.9,42 38.6,50.3 	"></polygon></g></svg></a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td colspan="3"><a class="btn n123">123</a></td>');
    c.push('<td colspan="3"><a class="btn hide">隐藏</a></td>');
    c.push('<td colspan="9"><a class="space">&nbsp;</a></td>');
    c.push('<td colspan="5"><a class="btn enter ok">确定</a></td>');
    c.push("</tr>");
    c.push("</tbody></table>");
    c.push("</div>");
  return c.join("");
}
export default {
  createKeyPanelHtml:createKeyPanelHtml,
  keyPanelId:"KeyPanel4"
}
