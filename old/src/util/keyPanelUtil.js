/** 
* 投资堂 tztui 当前版本：0.0.1 
* Created by：杭州中焯信息技术股份有限公司 
* 构建时间：20170718
 */
/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：
 * 文件标识：
 * 摘    要：纯数字键盘，只带确认按钮
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
function createKeyPanelHtml1() {
    var c = [''];
    c.push('<div id="KeyPanel1" class="keyword_table">');
    c.push('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="random">');
    c.push("<tbody><tr>");
    c.push('<td><a herf="javascript:void(0)">1</a></td>');
    c.push('<td><a herf="javascript:void(0)">2</a></td>');
    c.push('<td><a herf="javascript:void(0)">3</a></td>');
    c.push('<td><a herf="javascript:void(0)">4</a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)">5</a></td>');
    c.push('<td><a herf="javascript:void(0)">6</a></td>');
    c.push('<td><a herf="javascript:void(0)">7</a></td>');
    c.push('<td><a herf="javascript:void(0)" class="del"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 84 84" enable-background="new 0 0 84 84" xml:space="preserve"><rect opacity="0.5" fill="none" width="84" height="84"></rect><g><g><path fill="#E6E6E6" d="M76,25v34H23L8.9,42L23,25H76 M79,22H21.6L5,42l16.6,20H79V22L79,22z"></path></g><polygon fill="#E6E6E6" points="41.3,53 49.6,44.7 57.9,53 60.6,50.3 52.3,42 60.6,33.7 57.9,31 49.6,39.3 41.3,31 38.6,33.7 ');
    c.push('46.9,42 38.6,50.3 	"></polygon></g></svg></a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)">8</a></td>');
    c.push('<td><a herf="javascript:void(0)">9</a></td>');
    c.push('<td><a herf="javascript:void(0)">0</a></td>');
    c.push('<td><a herf="javascript:void(0)" class="btn ok">确定</a></td>');
    c.push("</tr></tbody>");
    c.push("</table>");
    c.push("</div>");
  return c.join("");
}
var keyType1 = {
  createKeyPanelHtml:createKeyPanelHtml1,
  keyPanelId:"KeyPanel1"
}

/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：
 * 文件标识：
 * 摘    要：数字键盘，带有切换英文键盘
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
function createKeyPanelHtml2() {
    var c = [];
    c.push('<div id="KeyPanel2" class="keyword_table">');
    c.push('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="stock">');
    c.push("<tbody><tr>");
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
var keyType2 = {
  createKeyPanelHtml:createKeyPanelHtml2,
  keyPanelId:"KeyPanel2"
}

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
function createKeyPanelHtml3() {
    var c = [];
  c.push('<div id="KeyPanel3" class="keyword_table">');
    c.push('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="number">');
    c.push("<tbody><tr>");
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
    c.push('<td><a herf="javascript:void(0)" class="btn half">一半</a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)">7</a></td>');
    c.push('<td><a herf="javascript:void(0)">8</a></td>');
    c.push('<td><a herf="javascript:void(0)">9</a></td>');
    c.push('<td><a herf="javascript:void(0)" class="btn max">最大</a></td>');
    c.push("</tr>");
    c.push("<tr>");
    c.push('<td><a herf="javascript:void(0)" class="point">·</a></td>');
    c.push('<td><a herf="javascript:void(0)">0</a></td>');
    c.push('<td colspan="2"><a herf="javascript:void(0)" class="btn ok">确 定</a></td>');
    c.push("</tr>");
    c.push("</tbody></table>");
    c.push("</div>");
  return c.join("");
}
var keyType3 = {
  createKeyPanelHtml:createKeyPanelHtml3,
  keyPanelId:"KeyPanel3"
}

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
function createKeyPanelHtml4() {
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
var keyType4 = {
  createKeyPanelHtml:createKeyPanelHtml4,
  keyPanelId:"KeyPanel4"
}

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
function createKeyPanelHtml5() {
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
var keyType5 = {
  createKeyPanelHtml:createKeyPanelHtml5,
  keyPanelId:"KeyPanel5"
}

/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：app上软键盘处理
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/12/17
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
// import keyType1 from './keyType1';
// import keyType2 from './keyType2';
// import keyType3 from './keyType3';
// import keyType4 from './keyType4';
// import keyType5 from './keyType5';
function keyMain(){
  this.options = { //键盘主体配置对象
    keyPanelType:null, //键盘类型
    config:{}, //配置
    $input:null, //类似input输入框
    $inputEM:null, //光标
    $inputMain:null, //暂时未知
    $keyPanel:null, //键盘dom
    inputPlaceholder:'', //输入框辅助说明文字
    maxlength:null, //input最大可输入内容
    isPassword:false, //是否是密码类型，默认为false
    keyPanelHtml:'', //键盘dom字符串
    keyPanelId:'', //键盘dom id
  };

  //输入框定义
  //is-stock-input  是否锁定股票输入数字键盘  如果锁定，由英文切换到数字，始终是数字键盘
  //data-placeholder  输入框提示语 placeholder
  //data-maxlength 输入框最长输入字符
  //max-value 当类型为3时，需要设置max-value值，否则报错
  //data-paneltype 定义键盘类型
  //data-ispwd 是否是密码
  //data-mydy 是否需要自己定义点击事件
}
/**
 * [init 键盘初始化]
 * @param  {string} a [对应dom元素]
 * @param  {String} panelType [键盘类型]
 * @param  {string} ifPwd [是否是密码类型 有值就行 建议传true]
 * @param  {Object} config [键盘配置文件]
 */
keyMain.prototype.init = function(dom, panelType, ifPwd, config) {
  var _this = this;
  _this.initInput();
  var initOptions = function() {
    _this.options.keyPanelType = panelType;
    _this.options.config = config||{};
    _this.options.$input = $(dom);
    _this.options.$inputEM = _this.options.$input.find('em');
    _this.options.inputPlaceholder = _this.options.$input.attr("data-placeholder")||_this.options.$input.attr("placeholder")||"";
    _this.options.maxlength = _this.options.$input.attr('data-maxlength')||_this.options.$input.attr('maxlength')||1e5;
    _this.options.isPassword = (void 0) == typeof ifPwd ? !1 : ifPwd;
    _this.creatHtml(); //开始建造键盘dom
    "function" == typeof _this.options.config.beforeInitFunc && _this.options.config.beforeInitFunc();
    _this.arousePanel(); //唤起键盘
    "function" == typeof _this.options.config.afterInitFunc && _this.options.config.afterInitFunc();
  };
  initOptions();
}

keyMain.prototype.initInput = function(){
  var _this = this;
  if(_this.options.$input && _this.options.$input.length >0){
    var sValue = _this.options.$input.attr('value');

    if('DIV' !== _this.options.$input[0].tagName || "" !== sValue && null !== sValue && "undefined" != typeof sValue || (_this.options.$input.attr("data-placeholder", _this.options.$input.attr("placeholder")), _this.options.$inputEM.html(_this.options.$input.attr("placeholder"))), _this.options.$input.removeClass("active"), _this.options.$inputMain && _this.options.$inputMain.length > 0 && _this.options.inputMainExtraOffset > 0){
      var nMTop = _this.options.$inputMain.css("margin-top").slice(0, -2);
      _this.options.$inputMain.css("margin-top", +nMTop + _this.options.inputMainExtraOffset + "px");
      _this.options.$inputMain = null;
      _this.options.inputMainExtraOffset = 0;
    }
  }
}

/**
 * [creatHtml 创建键盘的dom元素]
 * @return {[type]} [description]
 */
keyMain.prototype.creatHtml = function(){
  var _this = this;
  _this.options.keyPanelType = _this.options.keyPanelType || "1";
  switch (Number(_this.options.keyPanelType)) {
    case 1: //纯数字键盘
      _this.options.keyPanelHtml = keyType1.createKeyPanelHtml();
      _this.options.keyPanelId   = keyType1.keyPanelId;
      break;
    case 2: //可以切换到英文数字键盘
      _this.options.keyPanelHtml = keyType2.createKeyPanelHtml();
      _this.options.keyPanelId   = keyType2.keyPanelId;
      break;
    case 3: //第三种数字键盘  一半  最大  需要设置max-value值
      _this.options.keyPanelHtml = keyType3.createKeyPanelHtml();
      _this.options.keyPanelId   = keyType3.keyPanelId;
      break;
    case 4: //英文键盘
      _this.options.keyPanelHtml = keyType4.createKeyPanelHtml();
      _this.options.keyPanelId   = keyType4.keyPanelId;
      break;
    case 5: //证券代码键盘
      _this.options.keyPanelHtml = keyType5.createKeyPanelHtml();
      _this.options.keyPanelId   = keyType5.keyPanelId
  }
}

/**
 * [arousePanel 唤起键盘dom]
 * @return {[type]} [description]
 */
keyMain.prototype.arousePanel = function () {
  var _this = this;
  _this.options.$keyPanel = $("#" + _this.options.keyPanelId);
  if("DIV" == _this.options.$input[0].tagName && 0 == _this.options.$inputEM.length){
    _this.options.$input.html("<em></em>");
    _this.options.$inputEM = _this.options.$input.find("em")
  }else {
    if("DIV" == _this.options.$input[0].tagName && 1 == _this.options.$inputEM.length && _this.options.$inputEM.html() == _this.options.inputPlaceholder){
      _this.options.$inputEM.html("");
      _this.options.$input.attr("value", "");
    }
  }
  if(_this.options.$keyPanel.length <= 0){
    var sHtml = '';
    if($('.keyPanel-overlay').size()<=0) sHtml = '<div class="keyPanel-overlay"></div>';
    _this.options.$keyPanel = $(_this.options.keyPanelHtml);
    // $("body").append(sHtml); //暂时还没有好的方法控制点击其他区域，收起软键盘
    $("body").append(_this.options.$keyPanel);
  }
  _this.options.$keyPanel.css("display", "block");
  setTimeout(function(){
    _this.addAnimate(_this);
  }, 20); //延迟20毫秒架子啊
  _this.options.$input.removeAttr("data-placeholder").attr("placeholder", _this.options.inputPlaceholder);
  _this.options.$input.addClass("active");
  _this.options.$keyPanel.siblings(".keyword_table").css("display", "none");
  _this.bindKeyClick(); //绑定按钮点击事件
}

/**
 * [addAnimate 添加光标动画]
 * @description key-panel-main属性暂时不知道
 */
keyMain.prototype.addAnimate = function (_this) {
  var a = _this.options.$input.parents('[key-panel-main="true"]');
  if (a && a.length > 0) {
    var b = _this.options.$input.offset().top,
      c = _this.options.$input.height(),
      d = _this.options.$keyPanel.offset().top,
      e = b + c + 20 - d,
      f = a.css("margin-top").slice(0, -2);
    _this.options.inputMainExtraOffset = e;
    _this.options.$inputMain = a;
    if(e>0){
      _this.options.$inputMain.animate({
        marginTop: +f - _this.options.inputMainExtraOffset + "px"
      }, 200, "linear");
    }
  }
}

/**
 * [bindKeyClick 面板按钮点击事件]
 * @return {[type]} [description]
 */
keyMain.prototype.bindKeyClick = function() {
  var _this = this;
  _this.options.$keyPanel.find("a").unbind().on('click',function () {
    _this.keyHandle($(this));
  });
}

/**
 * [keyHandle 按键处理事件]
 * @param  {object} currDom 当前按下dom元素 
 */
keyMain.prototype.keyHandle = function(currDom) {
  var _this = this,  
      sKeyText = currDom.html(), //按键值    b  currDom a
      sValue = null, //值
      d = null,
      oEvent = null;
  if(_this.options.$inputEM.length < 1){
    _this.options.$inputEM = $("<em></em>");
    _this.options.$input.attr("value", "");
  }
  d = _this.options.$inputEM.html();
  sValue = null === _this.options.$input.attr("value") || "undefined" == typeof _this.options.$input.attr("value") ? "" : _this.options.$input.attr("value");

  if(currDom.hasClass("hide")){ //隐藏按钮
    _this.close();
  }else if(currDom.hasClass("space")){ //空格
    d += sKeyText;
    sValue += " ";
    _this.options.$inputEM.html(d);
    _this.options.$input.attr("value", c);
    _this.options.isPassword && _this.options.$inputEM.html(d.replace(/(&nbsp;)$/, "*"));
    sValue.length > _this.options.$input.maxlength && _this.setValue(d, c);
    oEvent && (oEvent = null);
    oEvent = document.createEvent("Event");
    oEvent.initEvent("input", !0, !0);
    oEvent.detail = {
      optType: "space",
      curValue: " "
    };
    _this.options.$input[0].dispatchEvent(oEvent);
  }else if(currDom.hasClass("del")){ //删除按钮
    _this.setValue(d, sValue);
    oEvent && (oEvent = null);
    oEvent = document.createEvent("Event");
    oEvent.initEvent("input", !0, !0);
    oEvent.detail = {
      optType: "del"
    };
    _this.options.$input[0].dispatchEvent(oEvent);
  }else if(currDom.hasClass("max") || currDom.hasClass("half")){ //最大和一半
    var sMaxValue = _this.options.$input.attr("max-value"); //e
    for (sMaxValue = null === sMaxValue || "undefined" == typeof sMaxValue ? 100 : +sMaxValue, sKeyText = currDom.hasClass("max") ? sMaxValue : sMaxValue / 2, _this.options.$inputEM.html(sKeyText), _this.options.$input.attr("value", sKeyText), _this.options.isPassword && _this.options.$inputEM.html(_this.options.$inputEM.html().replace(/[a-zA-Z0-9\.]/g, "*")); sValue.length > _this.options.maxlength;){
      _this.setValue(d, sValue);
      sValue = _this.options.$input.attr("value");
      d = _this.options.$inputEM.html();
    }
    oEvent && (oEvent = null);
    oEvent = document.createEvent("Event");
    oEvent.initEvent("input", !0, !0);
    oEvent.detail = {
      optType: "normal",
      curValue: sKeyText
    };
    _this.options.$input[0].dispatchEvent(oEvent); //触发该事件  input事件
  }else if (currDom.hasClass("n123")){ //切换数字
    "true" === _this.options.$input.attr("is-stock-input") ? _this.init(_this.options.$input[0], 5, _this.options.isPassword, _this.options.config) : _this.init(_this.options.$input[0], 2, _this.options.isPassword, _this.options.config);
  }else if (currDom.hasClass("abc")){ //切换字符
    _this.init(_this.options.$input[0], 4, _this.options.isPassword, _this.options.config);
  }else if (currDom.hasClass("ok")){ //确认按钮
    _this.close();
    "function" == typeof _this.options.config.okFunc && _this.options.config.okFunc();
  }else if (currDom.hasClass("clear")){
    _this.options.$inputEM.html("");
    _this.options.$input.attr("value", "");
    oEvent && (oEvent = null);
    oEvent = document.createEvent("Event");
    oEvent.initEvent("input", !0, !0);
    oEvent.detail = {
      optType: "clear",
      curValue: ""
    };
    _this.options.$input[0].dispatchEvent(oEvent);
  }else if (currDom.hasClass("capital")){
    currDom.toggleClass("active");
    _this.setKey(currDom);
  }else if (/^\d{3}$/g.test(sKeyText) && 3 === sKeyText.length) {
    for (d += sKeyText, sValue += sKeyText, _this.options.$inputEM.html(d), _this.options.$input.attr("value", sValue), _this.options.isPassword && _this.options.$inputEM.html(d.replace(/\d$/, "*")); sValue.length > _this.options.maxlength;){
      _this.setValue(d, sValue);
      sValue = _this.options.$input.attr("value");
      d = _this.options.$inputEM.html();
    }
    oEvent && (oEvent = null);
    oEvent = document.createEvent("Event");
    oEvent.initEvent("input", !0, !0);
    oEvent.detail = {
      optType: "stock",
      curValue: sKeyText
    };
    _this.options.$input[0].dispatchEvent(oEvent)
  } else {
    sKeyText = "·" === sKeyText ? "." : sKeyText;
    d += sKeyText;
    sValue += sKeyText;
    _this.options.$inputEM.html(d);
    _this.options.$input.attr("value", sValue);
    _this.options.isPassword && _this.options.$inputEM.html(d.replace(/[a-zA-Z0-9\.]/, "*"));
    (sValue.length > _this.options.maxlength || "." === sValue || sValue.indexOf(".") != sValue.lastIndexOf(".")) && _this.setValue(d, sValue);
    oEvent && (oEvent = null);
    oEvent = document.createEvent("Event");
    oEvent.initEvent("input", !0, !0);
    oEvent.detail = {
      optType: "normal",
      curValue: sKeyText,
      value:sValue
    };
    _this.options.$input[0].dispatchEvent(oEvent);
  }
}

/**
 * [h description]
 * @param  {[type]} a [description]
 * @return {[type]}   [description]
 */
keyMain.prototype.setKey = function(a){
  var _this = this;
  var b = _this.options.$keyPanel.find("a");
  b.each(function() {
    var b = $(this).html();
    if(1 === b.length && /[a-zA-Z]/.test(b)){
      b = a.hasClass("active") ? b.toUpperCase() : b.toLowerCase();
      $(this).html(b).attr("key", b)
    }
  })
}

/**
 * [setValue 设置value]
 * @param {[type]} a [description]
 * @param {[type]} b [description]
 */
keyMain.prototype.setValue = function(a, b) {
  var _this = this;
  if(a.length > 0){
    a = /.*&nbsp;+$/.test(a) ? a.slice(0, -6) : a.slice(0, -1);
    b = b.slice(0, -1);
    _this.options.$inputEM.html(a);
    _this.options.$input.attr("value", b);
  }
}

/**
 * [close 隐藏软键盘]
 * @type {[type]}
 */
keyMain.prototype.close = function() {
  var _this = this;
  if(_this.options.$keyPanel && _this.options.$keyPanel.length > 0){
    _this.initInput();
    if("function" == typeof _this.options.config.beforeCloseFunc){
      _this.options.config.beforeCloseFunc();
    }
    if(_this.options.config.isSaveDom || "undefined" == typeof _this.options.config.isSaveDom){
      _this.hidePanel();
    }else {
      _this.options.$keyPanel.remove();
      $('.keyPanel-overlay').remove();
    }
    _this.options.$keyPanel = null;
    if("function" == typeof _this.options.config.afterCloseFunc){
      _this.options.config.afterCloseFunc();
    }
  }
}

keyMain.prototype.showPanel = function(){
  this.options.$keyPanel.css("display", "block");
  $('.keyPanel-overlay').css("display", "block");
}

keyMain.prototype.hidePanel = function(){
  this.options.$keyPanel.css("display", "none");
  $('.keyPanel-overlay').css("display", "none");
}

/**
 * [inputvalue 设置输入框的值]
 * @param  {string} a [选择的dom用]
 * @param  {string} b [值]
 */
keyMain.prototype.inputvalue = function(currDom,sKeyText){
  var d = sKeyText;
  var sValue= sKeyText;
  _this.options.$input = $(currDom);
  _this.options.$inputEM = keyPanel.$input.find("em");
  _this.options.$inputEM.html(d);
  _this.options.$input.attr("value", sValue);
  _this.options.isPassword && keyPanel.$inputEM.html(d.replace(/[a-zA-Z0-9\.]/, "*"));
  // (c.length > keyPanel.$input.maxlength || "." === c || c.indexOf(".") != c.lastIndexOf(".")) && i(d, c);
  oEvent && (oEvent = null);
  oEvent = document.createEvent("Event");
  oEvent.initEvent("input", !0, !0);
  oEvent.detail = {
    optType: "normal",
    curValue: sKeyText,
    value:sValue
  };
  _this.options.$input[0].dispatchEvent(oEvent);
}

/**
 * [version 获取键盘版本号]
 * @return {[type]} [description]
 */
keyMain.prototype.version = function(){
  return '1.0.2';
}

/**
 * [updateDate 更新数据]
 * @return {[type]} [description]
 */
keyMain.prototype.updateDate = function(){
  return "2016-12-17 15:46:40";
}


$.fn.keyPanel = function(){
  var _this = this,sPanelType = _this.attr('data-paneltype'),sPwd = _this.attr('data-ispwd'),sMydy = _this.attr('data-mydy');
  var main = new keyMain();
  if(!!sMydy){
    return main;
  }else{
    /* 进行初始化 */
    if(!!sPanelType) sPanelType = 2; //默认数字键盘
    if('undefined' ==  typeof sPwd || 'null' == typeof sPwd) sPwd = 0;
    _this.unbind().on('click',function(event){
      main.init(_this[0],sPanelType,sPwd);
    })
    return main;
  }
}