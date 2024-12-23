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
 * 完成日期：2017/1/5
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
function a(a, b) {
  return a.test(b)
}
function b(a) {
  return a = $.trim(a), 0 == a.length
}
function c(a) {
  return !b(a)
}
function d(a) {
  if (b(a)) return !1;
  var c = a.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (null == c) return !1;
  var d = new Date(c[1], c[3] - 1, c[4]);
  return d.getFullYear() == c[1] && d.getMonth() + 1 == c[3] && d.getDate() == c[4]
}
function e(a) {
  var b = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,
    c = a.match(b);
  if (null == c) return !1;
  var d = new Date(c[1], c[3] - 1, c[4], c[5], c[6], c[7]);
  return d.getFullYear() == c[1] && d.getMonth() + 1 == c[3] && d.getDate() == c[4] && d.getHours() == c[5] && d.getMinutes() == c[6] && d.getSeconds() == c[7]
}
function f(c) {
  if (b(c)) return !1;
  var d = /^[A-Za-z0-9]+$/;
  return a(d, c)
}
function g(b) {
  var c = /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/;
  return a(c, b)
}
function h(b) {
  var c = /^[_0-9a-zA-Z]+$/;
  return a(c, b)
}
function i(c) {
  if (b(c)) return !1;
  var d = /^[\u4E00-\u9FA5]+$/;
  return a(d, c)
}
function j(c) {
  if (b(c)) return !1;
  var d = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return a(d, c)
}
function k(c) {
  if (b(c)) return !1;
  var d = /^[+-]?\d+(,\d{3})*(\.\d+)?$/;
  return a(d, c)
}
function l(c) {
  if (b(c)) return !1;
  var d = /^[0-9]*$/;
  return a(d, c)
}
function m(c) {
  if (b(c)) return !1;
  var d = /^\d+(\.\d+)?$/;
  return a(d, c)
}
function n(c) {
  if (b(c)) return !1;
  var d = /^(13|14|15|17|18)[0-9]{9}$/;
  return a(d, c)
}
function o(c) {
  if (b(c)) return !1;
  var d = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  return a(d, c)
}
function p(c) {
  if (b(c)) return !1;
  var d = /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^(13|14|15|17|18)[0-9]{9}$)/;
  return a(d, c)
}
function q(c) {
  if (b(c)) return !1;
  var d = /(^\d{6}$)/;
  return a(d, c)
}
function r(c) {
  if (b(c)) return !1;
  var d = /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/;
  return a(d, c)
}
function s(a) {
  for (; a.length > 1 && "0" == a.substring(0, 1);) a = a.substring(1, a.length);
  return parseInt(a)
}
function t(c) {
  if (b(c)) return !1;
  c = c.toUpperCase();
  var d = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    },
    e = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  if (a(e, c) === !1) return !1;
  var f = c.substr(0, 2);
  if (void 0 == d[f]) return !1;
  var g = c.length;
  if (15 == g) {
    var h = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/,
      i = c.match(h),
      j = s("19" + i[2]),
      k = s(i[3]),
      l = s(i[4]),
      m = new Date("19" + j + "/" + k + "/" + l);
    m.setFullYear(j), m.setMonth(k - 1), m.setDate(l);
    var n = new Date,
      o = n.getFullYear();
    if (m.getFullYear() != j || m.getMonth() + 1 != k || m.getDate() != l) return !1;
    var p = o - j;
    if (!(p >= 3 && 100 >= p)) return !1
  }
  if (18 == g) {
    var q = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
      i = c.match(q),
      j = s(i[2]),
      k = s(i[3]),
      l = s(i[4]),
      m = new Date(j + "/" + k + "/" + l);
    m.setFullYear(j), m.setMonth(k - 1), m.setDate(l);
    var n = new Date,
      o = n.getFullYear();
    if (m.getFullYear() != j || m.getMonth() + 1 != k || m.getDate() != l) return !1;
    var p = o - j;
    if (!(p >= 3 && 100 >= p)) return !1
  }
  if (15 == c.length) {
    var r, t = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
      u = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
      v = 0;
    for (c = c.substr(0, 6) + "19" + c.substr(6, c.length - 6), r = 0; 17 > r; r++) v += c.substr(r, 1) * t[r];
    c += u[v % 11]
  }
  if (18 == c.length) {
    var r, w, t = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
      u = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
      v = 0;
    for (r = 0; 17 > r; r++) v += parseInt(c.substr(r, 1)) * t[r];
    if (w = u[v % 11], w != c.substr(17, 1)) return !1
  }
  return !0
}
function u(a, c) {
  /*var d = require("layerUtils"),
    e = a.val();
  return b(e) ? (d.iTips(c, a), !1) : (d.iTipsClose(), !0)*/
}
function v(a) {
  if (a = $.trim(a), !l(a)) return !1;
  var b = a.length;
  if (12 > b) return !1;
  if (b > 19 || 18 == b) return !0;
  for (var c = !0, d = 0, e = 0, f = 0; b - 1 > d;) e += parseInt(a.charAt(d)), d++, f = 2 * parseInt(a.charAt(d)), d++, e = Math.floor(f / 10) + f % 10;
  if (c = e % 10 == 0 ? !0 : parseInt(a.charAt(b - 1)) == 10 - e % 10, !c) {
    var g = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,63,64,65,68,69,84,87,88,90,91,92,93,94,95,96,97,98,99";
    if (-1 == g.indexOf(a.substring(0, 2))) return !1;
    for (var h = a.substr(a.length - 1, 1), i = a.substr(0, a.length - 1), j = [], d = i.length - 1; d > -1; d--) j.push(i.substr(d, 1));
    for (var k = [], m = [], n = [], o = 0; o < j.length; o++)(o + 1) % 2 == 1 ? 2 * parseInt(j[o]) < 9 ? k.push(2 * parseInt(j[o])) : m.push(2 * parseInt(j[o])) : n.push(j[o]);
    for (var p = [], q = [], r = 0; r < m.length; r++) p.push(parseInt(m[r]) % 10), q.push(parseInt(m[r]) / 10);
    for (var s = 0, t = 0, u = 0, v = 0, w = 0, x = 0; x < k.length; x++) s += parseInt(k[x]);
    for (var y = 0; y < n.length; y++) t += parseInt(n[y]);
    for (var z = 0; z < p.length; z++) u += parseInt(p[z]), v += parseInt(q[z]);
    w = parseInt(s) + parseInt(t) + parseInt(u) + parseInt(v);
    var A = parseInt(w) % 10 == 0 ? 10 : parseInt(w) % 10,
      B = 10 - A;
    c = h == B || B % h == 0 || h % B == 0
  }
  return c
}
function w(c) {
  if (b(c)) return !1;
  var d = /^[1-9]\d{4,9}$/;
  return a(d, c)
}
function x(a, c) {
  if (b(a)) return !1;
  c = "undefined" != typeof c ? c : 2;
  var d = new RegExp("^[0-9]+.[0-9]{" + c + "}$");
  return d.test(a)
}
export default {
  executeExp: a,
  isEmpty: b,
  isNotEmpty: c,
  isDate: d,
  isDateTime: e,
  isAlphaNumeric: f,
  isCnAndEnNumeric: g,
  isEnNumeric: h,
  isCnAndEn: i,
  isEmail: j,
  isMoney: k,
  isNumeric: l,
  isNumberFloat: m,
  isMobile: n,
  isPhone: p,
  isTel: o,
  isPostalCode: q,
  isURL: r,
  isCardID: t,
  commonCheckEmpty: u,
  isQq: w,
  isBankCode: v,
  isFormatNumber: x
}
