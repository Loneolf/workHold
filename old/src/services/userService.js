/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：用户服务请求
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/12/13
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
import browser from "../util/browser"
import userServiceWebView from './userServiceWebView'
import userServiceMobile from './userServiceMobile'

var localService = {};
if(browser.browser.versions.webview){
  localService = userServiceWebView;
}else {
  localService = userServiceMobile;
}

export default localService
