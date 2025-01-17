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
  c.push('<div id="KeyPanel5" class="keyword_table">');
    c.push('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="stock">');
    c.push("<tbody><tr>");
    c.push('<td rowspan="4" class="pre"><a herf="javascript:void(0)">600</a><a herf="javascript:void(0)">601</a><a herf="javascript:void(0)">000</a><a herf="javascript:void(0)">002</a><a herf="javascript:void(0)">300</a></td>');
    c.push('<td><a herf="javascript:void(0)">1</a></td>');
    c.push('<td><a herf="javascript:void(0)">2</a></td>');
    c.push('<td><a herf="javascript:void(0)">3</a></td>');
    c.push('<td><a herf="javascript:void(0)" class="del"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 84 84" enable-background="new 0 0 84 84" xml:space="preserve"><rect opacity="0.5" fill="none" width="84" height="84"></rect><g><g><path fill="#E6E6E6" d="M76,25v34H23L8.9,42L23,25H76 M79,22H21.6L5,42l16.6,20H79V22L79,22z"></path></g><polygon fill="#E6E6E6" points="41.3,53 49.6,44.7 57.9,53 60.6,50.3 52.3,42 60.6,33.7 57.9,31 49.6,39.3 41.3,31 38.6,33.7 ');
    c.push('46.9,42 38.6,50.3 	"></polygon></g></svg></a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)">4</a></td>');
    c.push('<td><a herf="javascript:void(0)">5</a></td>');
    c.push('<td><a herf="javascript:void(0)">6</a></td>');
    c.push('<td><a herf="javascript:void(0)" class="btn clear">清空</a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)">7</a></td>');
    c.push('<td><a herf="javascript:void(0)">8</a></td>');
    c.push('<td><a herf="javascript:void(0)">9</a></td>');
    c.push('<td><a herf="javascript:void(0)" class="btn hide">隐藏</a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)" class="btn abc">ABC</a></td>');
    c.push('<td><a herf="javascript:void(0)">0</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="btn ok">确定</a></td>');
    c.push("</tr></tbody>");
    c.push("</table>");
    c.push("</div>");
  return c.join("");
}
export default {
  createKeyPanelHtml:createKeyPanelHtml,
  keyPanelId:"KeyPanel5"
}
