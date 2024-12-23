/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：行情配置文件
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/12/20
 *
 * 备    注：
 *
 * 修改记录： 
 *
 *******************************************************************************/
import CONFIG from './config.js';

/**
 * [getJsonField 根据不同证券类型返回对应数据]
 * @param  {Array} grid [数组源]
 * @param  {Object} data [数据对象]
 * @param  {String} type [需要选择的类型]
 * @return {Object}      [返回一个JSON对象]
 */
const getJsonField = function(grid,data,type,year,oTjKong){
	if(CONFIG.f10Config == 'dcf10'){
		return gettyField(grid,data,year,oTjKong);
	}else{
		console.log('取银行专项指标字段有误，请检查代码');
		return false;
	}
}

const tjKongFun = function(value,keyId,year,oTjKong){
	if(!value) return '--';
	if(value == '#'){
		if(!oTjKong[keyId]) oTjKong[keyId] = [];
		oTjKong[keyId].push(year);
	}else if(value.indexOf('#')>=0){
		var aValue = value.split('#');
		if(!aValue[0]||(!isNaN(aValue[0])&&Number(aValue[0])==0)){
			if(!oTjKong[keyId]) oTjKong[keyId] = [];
			oTjKong[keyId].push(year);
		}
	}
	return value;
}

const gettyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"银行专项指标","type":"title","value":"--"},
			"_a1":{"name":"资本充足率","formatType":"1","value":tjKongFun(grid[data.YHZXZB_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"核心资本充足率","formatType":"1 ","value":tjKongFun(grid[data.YHZXZB_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"拨备覆盖率","formatType":"1","value":tjKongFun(grid[data.YHZXZB_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"存款总额","value":tjKongFun(grid[data.YHZXZB_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"贷款总额","value":tjKongFun(grid[data.YHZXZB_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"存贷款比例","formatType":"1 ","value":tjKongFun(grid[data.YHZXZB_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"不良贷款余额","value":tjKongFun(grid[data.YHZXZB_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"不良贷款率","formatType":"1 ","value":tjKongFun(grid[data.YHZXZB_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"单一最大客户贷款比例","formatType":"1","value":tjKongFun(grid[data.YHZXZB_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"最大十家客户贷款比例","formatType":"1","value":tjKongFun(grid[data.YHZXZB_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"资本净值","type":"title","value":tjKongFun(grid[data.YHZXZB_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"核心资本净额","value":tjKongFun(grid[data.YHZXZB_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"加权风险资产净额","value":tjKongFun(grid[data.YHZXZB_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"短期资产流动性比例","formatType":"1","value":tjKongFun(grid[data.YHZXZB_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"非利息收入","value":tjKongFun(grid[data.YHZXZB_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"非利息收入占比","formatType":"1","value":tjKongFun(grid[data.YHZXZB_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"净息差","formatType":"1","value":tjKongFun(grid[data.YHZXZB_17INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"净利差","formatType":"1","value":tjKongFun(grid[data.YHZXZB_18INDEX],"_a18",year,oTjKong)},
	}
}

export default {
	getJsonField:getJsonField
}