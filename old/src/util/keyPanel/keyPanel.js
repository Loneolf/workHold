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
 * 完成日期：2016/12/17
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
import keyType1 from './keyType1';
import keyType2 from './keyType2';
import keyType3 from './keyType3';
import keyType4 from './keyType4';
import keyType5 from './keyType5';
var s = null;
var keyPanel = null;
function main() {
  return keyPanel = Object.create({
    init: init,
    close: close,
    inputvalue: inputvalue,
    get version() {
      return "1.0.2"
    },
    get updateDate() {
      return "2016-12-17 15:46:40"
    }
  })
}
/**
 * [inputvalue 改变值]
 * @param  {element} a        目标dom对象
 * @param  {String} b         对应值
 * @param  {boolean} inputFlag [需不需要出发input事件]
 */
function inputvalue(a,b,inputFlag){
  var d = b;
  var c= b;
  keyPanel.$input = $(a);
  keyPanel.$inputEM = keyPanel.$input.find("em");
  if(!d){
    keyPanel.$inputEM.html(keyPanel.$input.attr("placeholder"));
    keyPanel.isPassword && keyPanel.$inputEM.html(keyPanel.$input.attr("placeholder"));
  }else{
    keyPanel.$inputEM.html(d);
    keyPanel.isPassword && keyPanel.$inputEM.html(d.replace(/[a-zA-Z0-9\.]/, "*"));
  }
  keyPanel.$input.attr("value", c);
  // (c.length > keyPanel.$input.maxlength || "." === c || c.indexOf(".") != c.lastIndexOf(".")) && i(d, c);
  s && (s = null);
  s = document.createEvent("Event");
  s.initEvent("input", !0, !0);
  s.detail = {
    optType: "normal",
    curValue: b,
    value:c
  };
  if(!inputFlag){
    keyPanel.$input[0].dispatchEvent(s);
  }
}
function init(a, b, f, g) {
  l();
  var h = function() {
    keyPanel.keyPanelType = b;
    keyPanel.config = g || {};
    keyPanel.$input = $(a);
    keyPanel.$inputEM = keyPanel.$input.find("em");
    keyPanel.inputPlaceholder = keyPanel.$input.attr("data-placeholder") || keyPanel.$input.attr("placeholder") || "";
    keyPanel.$input.maxlength = keyPanel.$input.attr("maxlength") || 1e5;
    keyPanel.isPassword = "undefined" == typeof f ? !1 : f;
    creatHtml();
    "function" == typeof keyPanel.config.beforeInitFunc && keyPanel.config.beforeInitFunc();
    e();
    "function" == typeof keyPanel.config.afterInitFunc && keyPanel.config.afterInitFunc()
  };
  h();
}

function creatHtml() {
  keyPanel.keyPanelType = keyPanel.keyPanelType || "1";
  switch (Number(keyPanel.keyPanelType)) {
    case 1:
      keyPanel.keyPanelHtml = keyType1.createKeyPanelHtml();
      keyPanel.keyPanelId   = keyType1.keyPanelId;
      break;
    case 2:
      keyPanel.keyPanelHtml = keyType2.createKeyPanelHtml();
      keyPanel.keyPanelId   = keyType2.keyPanelId;
      break;
    case 3:
      keyPanel.keyPanelHtml = keyType3.createKeyPanelHtml();
      keyPanel.keyPanelId   = keyType3.keyPanelId;
      break;
    case 4:
      keyPanel.keyPanelHtml = keyType4.createKeyPanelHtml();
      keyPanel.keyPanelId   = keyType4.keyPanelId;
      break;
    case 5:
      keyPanel.keyPanelHtml = keyType5.createKeyPanelHtml();
      keyPanel.keyPanelId   = keyType5.keyPanelId
  }
}
function e() {
  keyPanel.$keyPanel = $("#" + keyPanel.keyPanelId);
  if("DIV" == keyPanel.$input[0].tagName && 0 == keyPanel.$inputEM.length){
    keyPanel.$input.html("<em></em>");
    keyPanel.$inputEM = keyPanel.$input.find("em")
  }else {
    if("DIV" == keyPanel.$input[0].tagName && 1 == keyPanel.$inputEM.length && keyPanel.$inputEM.html() == keyPanel.inputPlaceholder){
      keyPanel.$inputEM.html("");
      keyPanel.$input.attr("value", "");
    }
  }
  if(keyPanel.$keyPanel.length <= 0){
    keyPanel.$keyPanel = $(keyPanel.keyPanelHtml);
    $("body").append(keyPanel.$keyPanel);
  }
  keyPanel.$keyPanel.css("display", "block");
  setTimeout(k, 20);
  keyPanel.$input.removeAttr("data-placeholder").attr("placeholder", keyPanel.inputPlaceholder);
  keyPanel.$input.addClass("active");
  keyPanel.$keyPanel.siblings(".keyword_table").css("display", "none");
  f()
}
function f() {
  keyPanel.$keyPanel.find("a").unbind().on('click',function () {
    g($(this));
  });
}
function g(a) {
  var b = a.html(),
    c = null,
    d = null;
  if(keyPanel.$inputEM.length < 1){
    keyPanel.$inputEM = $("<em></em>");
    keyPanel.$input.attr("value", "");
  }
  d = keyPanel.$inputEM.html();
  c = null === keyPanel.$input.attr("value") || "undefined" == typeof keyPanel.$input.attr("value") ? "" : keyPanel.$input.attr("value");

  if(a.hasClass("hide")){
    close();
  }else if(a.hasClass("space")){
    d += b;
    c += " ";
    keyPanel.$inputEM.html(d);
    keyPanel.$input.attr("value", c);
    keyPanel.isPassword && keyPanel.$inputEM.html(d.replace(/(&nbsp;)$/, "*"));
    c.length > keyPanel.$input.maxlength && i(d, c);
    s && (s = null);
    s = document.createEvent("Event");
    s.initEvent("input", !0, !0);
    s.detail = {
      optType: "space",
      curValue: " "
    };
    keyPanel.$input[0].dispatchEvent(s);
  }else if(a.hasClass("del")){
    i(d, c);
    s && (s = null);
    s = document.createEvent("Event");
    s.initEvent("input", !0, !0);
    s.detail = {
      optType: "del"
    };
    keyPanel.$input[0].dispatchEvent(s);
  }else if(a.hasClass("max") || a.hasClass("half")){
    var e = keyPanel.$input.attr("max-value");
    for (e = null === e || "undefined" == typeof e ? 100 : +e, b = a.hasClass("max") ? e : e / 2, keyPanel.$inputEM.html(b), keyPanel.$input.attr("value", b), keyPanel.isPassword && keyPanel.$inputEM.html(keyPanel.$inputEM.html().replace(/[a-zA-Z0-9\.]/g, "*")); c.length > keyPanel.$input.maxlength;){
      i(d, c);
      c = keyPanel.$input.attr("value");
      d = keyPanel.$inputEM.html();
    }
    s && (s = null);
    s = document.createEvent("Event");
    s.initEvent("input", !0, !0);
    s.detail = {
      optType: "normal",
      curValue: b
    };
    keyPanel.$input[0].dispatchEvent(s);
  }else if (a.hasClass("n123")){
    "true" === keyPanel.$input.attr("is-stock-input") ? keyPanel.init(keyPanel.$input[0], 5, keyPanel.isPassword, keyPanel.config) : keyPanel.init(keyPanel.$input[0], 2, keyPanel.isPassword, keyPanel.config);
  }else if (a.hasClass("abc")){
    keyPanel.init(keyPanel.$input[0], 4, keyPanel.isPassword, keyPanel.config);
  }else if (a.hasClass("ok")){
    close();
    "function" == typeof keyPanel.config.okFunc && keyPanel.config.okFunc();
  }else if (a.hasClass("clear")){
    keyPanel.$inputEM.html("");
    keyPanel.$input.attr("value", "");
    s && (s = null);
    s = document.createEvent("Event");
    s.initEvent("input", !0, !0);
    s.detail = {
      optType: "clear",
      curValue: ""
    };
    keyPanel.$input[0].dispatchEvent(s);
  }else if (a.hasClass("capital")){
    a.toggleClass("active");
    h(a);
  }else if (/^\d{3}$/g.test(b) && 3 === b.length) {
    for (d += b, c += b, keyPanel.$inputEM.html(d), keyPanel.$input.attr("value", c), keyPanel.isPassword && keyPanel.$inputEM.html(d.replace(/\d$/, "*")); c.length > keyPanel.$input.maxlength;){
      i(d, c);
      c = keyPanel.$input.attr("value");
      d = keyPanel.$inputEM.html();
    }
    s && (s = null);
    s = document.createEvent("Event");
    s.initEvent("input", !0, !0);
    s.detail = {
      optType: "stock",
      curValue: b
    };
    keyPanel.$input[0].dispatchEvent(s)
  } else {
    b = "·" === b ? "." : b;
    d += b;
    c += b;
    keyPanel.$inputEM.html(d);
    keyPanel.$input.attr("value", c);
    keyPanel.isPassword && keyPanel.$inputEM.html(d.replace(/[a-zA-Z0-9\.]/, "*"));
    (c.length > keyPanel.$input.maxlength || "." === c || c.indexOf(".") != c.lastIndexOf(".")) && i(d, c);
    s && (s = null);
    s = document.createEvent("Event");
    s.initEvent("input", !0, !0);
    s.detail = {
      optType: "normal",
      curValue: b,
      value:c
    };
    keyPanel.$input[0].dispatchEvent(s);
  }
}
function h(a) {
  var b = keyPanel.$keyPanel.find("a");
  b.each(function() {
    var b = $(this).html();
    if(1 === b.length && /[a-zA-Z]/.test(b)){
      b = a.hasClass("active") ? b.toUpperCase() : b.toLowerCase();
      $(this).html(b).attr("key", b)
    }
  })
}
function i(a, b) {
  if(a.length > 0){
    a = /.*&nbsp;+$/.test(a) ? a.slice(0, -6) : a.slice(0, -1);
    b = b.slice(0, -1);
    keyPanel.$inputEM.html(a);
    keyPanel.$input.attr("value", b);
  }
}
function close() {
  if(keyPanel.$keyPanel && keyPanel.$keyPanel.length > 0){
    l();
    if("function" == typeof keyPanel.config.beforeCloseFunc){
      keyPanel.config.beforeCloseFunc();
    }
    if(keyPanel.config.isSaveDom || "undefined" == typeof keyPanel.config.isSaveDom){
      keyPanel.$keyPanel.css("display", "none")
    }else {
      keyPanel.$keyPanel.remove();
    }
    keyPanel.$keyPanel = null;
    if("function" == typeof keyPanel.config.afterCloseFunc){
      keyPanel.config.afterCloseFunc(keyPanel.$input.attr("value"));
    }
  }
}
function k() {
  var a = keyPanel.$input.parents('[key-panel-main="true"]');
  if (a && a.length > 0) {
    var b = keyPanel.$input.offset().top,
      c = keyPanel.$input.height(),
      d = keyPanel.$keyPanel.offset().top,
      e = b + c + 20 - d,
      f = a.css("margin-top").slice(0, -2);
    keyPanel.inputMainExtraOffset = e;
    keyPanel.$inputMain = a;
    if(e>0){
      keyPanel.$inputMain.animate({
        marginTop: +f - keyPanel.inputMainExtraOffset + "px"
      }, 200, "linear");
    }
  }
}
function l() {
  if (keyPanel && keyPanel.$input && keyPanel.$input.length > 0) {
    var a = keyPanel.$input.attr("value");
    if ("DIV" !== keyPanel.$input[0].tagName || "" !== a && null !== a && "undefined" != typeof a || (keyPanel.$input.attr("data-placeholder", keyPanel.$input.attr("placeholder")), keyPanel.$inputEM.html(keyPanel.$input.attr("placeholder"))), keyPanel.$input.removeClass("active"), keyPanel.$inputMain && keyPanel.$inputMain.length > 0 && keyPanel.inputMainExtraOffset > 0) {
      var b = keyPanel.$inputMain.css("margin-top").slice(0, -2);
      keyPanel.$inputMain.css("margin-top", +b + keyPanel.inputMainExtraOffset + "px");
      keyPanel.$inputMain = null;
      keyPanel.inputMainExtraOffset = 0;
    }
  }
}

export default {
  main:main
}
