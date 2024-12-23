/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：deal请求
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
import browser from "../../../../util/browser"
import service_mobile from './service_mobile'
import service_webview from './service_webview'

var Service = {};
if(browser.browser.versions.webview){
  Service = service_webview;
}else {
  Service = service_mobile;
}

export default Service
