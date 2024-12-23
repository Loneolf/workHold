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
import f from './aes'
import g from './des'
import h from './rsa'
function a(a, b) {
  var c = f.enc.Utf8.parse(a),
    d = f.enc.Utf8.parse(b),
    e = f.enc.Utf8.parse(a),
    g = f.AES.encrypt(d, c, {
      iv: e,
      mode: f.mode.CBC
    });
  return g.toString()
}
function b(a, b) {
  var c = f.enc.Utf8.parse(a),
    d = f.enc.Utf8.parse(a),
    e = f.enc.Base64.parse(b),
    g = f.AES.decrypt({
      ciphertext: e
    }, c, {
      iv: d,
      mode: f.mode.CBC
    });
  return g.toString(f.enc.Utf8)
}
function c(a, b) {
  var c = g.enc.Utf8.parse(a),
    d = g.enc.Utf8.parse(b),
    e = g.DES.encrypt(d, c, {
      mode: g.mode.ECB,
      padding: g.pad.Pkcs7
    });
  return e.toString()
}
function d(a, b) {
  var c = g.enc.Utf8.parse(a),
    d = g.enc.Base64.parse(b),
    e = g.DES.decrypt({
      ciphertext: d
    }, c, {
      mode: g.mode.ECB,
      padding: g.pad.Pkcs7
    });
  return e.toString(g.enc.Utf8)
}
function e(a, b, c) {
  return h.setPublic(a, b), h.encrypt(c)
}
export default{
  aesEncrypt: a,
  aesDecrypt: b,
  desEncrypt: c,
  desDecrypt: d,
  rsaEncrypt: e
}
