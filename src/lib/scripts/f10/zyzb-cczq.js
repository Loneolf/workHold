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
 * 2018-12-19 将存货周转率字段调整到运营能力里面  用于长城证券，如果有券商有这样反馈也可以使用该文件
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
	if(CONFIG.f10Config == 'dcf10' && !!type){
		switch(type){
			case '0':
				return getyhField(grid,data,year,oTjKong);
				break;
			case '2':
				return getzqField(grid,data,year,oTjKong);
				break;
			case '1':
				return getbxField(grid,data,year,oTjKong);
				break;
			default:
				return gettyField(grid,data,year,oTjKong);
				break;
		}
	}else{
		return getyyField(grid,data,year,oTjKong);
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

const getnewyyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"每股指标","type":"title","value":"--"},
			"_a1":{"name":"基本每股收益","value":tjKongFun(grid[data.K_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"扣非每股收益","value":tjKongFun(grid[data.K_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"稀释每股收益","value":tjKongFun(grid[data.K_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"每股净资产","value":tjKongFun(grid[data.K_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"每股资本公积","value":tjKongFun(grid[data.K_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"每股未分配利润","value":tjKongFun(grid[data.K_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"每股经营现金流","value":tjKongFun(grid[data.K_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"成长能力指标","type":"title","value":"--"},
			"_a9":{"name":"营业总收入","value":tjKongFun(grid[data.K_08INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"归属净利润","value":tjKongFun(grid[data.K_09INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"扣非净利润","value":tjKongFun(grid[data.K_10INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"营业总收入同比增长","value":tjKongFun(grid[data.K_11INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"归属净利润同比增长","value":tjKongFun(grid[data.K_12INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"扣非净利润同比增长","value":tjKongFun(grid[data.K_13INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"营业总收入滚动环比增长","value":tjKongFun(grid[data.K_14INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"归属净利润滚动环比增长","value":tjKongFun(grid[data.K_15INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"扣非净利润滚动环比增长","value":tjKongFun(grid[data.K_16INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"盈利能力指标","type":"title","value":"--"},
			"_a19":{"name":"净资产收益率","value":tjKongFun(grid[data.K_17INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"净资产收益率","value":tjKongFun(grid[data.K_18INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"总资产收益率","value":tjKongFun(grid[data.K_19INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"净利率","value":tjKongFun(grid[data.K_20INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"财务风险指标","type":"title","value":"--"},
			"_a24":{"name":"资产负债率","value":tjKongFun(grid[data.K_21INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"权益乘数","value":tjKongFun(grid[data.K_22INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"产权比率","value":tjKongFun(grid[data.K_23INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"专项指标","type":"title","value":"--"},
			"_a28":{"name":"净资本","value":tjKongFun(grid[data.K_24INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"净资产","value":tjKongFun(grid[data.K_25INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"净资本/净资产","value":tjKongFun(grid[data.K_26INDEX],"_a30",year,oTjKong)},
	}
}
const gettyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"关键指标","type":"title","value":"--"},
			"_a1":{"name":"营业收入","formatType":"0","value":tjKongFun(grid[data.K_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"归属净利润","formatType":"9","value":tjKongFun(grid[data.K_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"扣非净利润","formatType":"9","value":tjKongFun(grid[data.K_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"每股指标","type":"title","value":"--"},
			"_a5":{"name":"每股收益","formatType":"9","value":tjKongFun(grid[data.K_04INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"每股净资产","formatType":"9","value":tjKongFun(grid[data.K_05INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"每股资本公积金","formatType":"9","value":tjKongFun(grid[data.K_06INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"每股未分配利润","formatType":"9","value":tjKongFun(grid[data.K_07INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"每股经营现金流","formatType":"9","value":tjKongFun(grid[data.K_08INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"盈利能力","type":"title","value":"--"},
			"_a11":{"name":"净资产收益率","formatType":"1","value":tjKongFun(grid[data.K_09INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"净资产收益率-摊薄","formatType":"1","value":tjKongFun(grid[data.K_10INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"毛利率","formatType":"1","value":tjKongFun(grid[data.K_11INDEX],"_a13",year,oTjKong)},
			"_a15":{"name":"资本结构","type":"title","value":"--"},
			"_a16":{"name":"资产负债率","formatType":"1","value":tjKongFun(grid[data.K_13INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"权益乘数","value":tjKongFun(grid[data.K_14INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"偿债能力","type":"title","value":"--"},
			"_a19":{"name":"流动比率","value":tjKongFun(grid[data.K_15INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"速动比率","value":tjKongFun(grid[data.K_16INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"营运能力","type":"title","value":"--"},
			"_a22":{"name":"总资产周转率","formatType":"3","value":tjKongFun(grid[data.K_17INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"应收账款周转天数","formatType":"2","value":tjKongFun(grid[data.K_18INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"存货周转率","formatType":"3","value":tjKongFun(grid[data.K_12INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"成长能力","type":"title","value":"--"},
			"_a26":{"name":"营业收入同比增长率","formatType":"1","value":tjKongFun(grid[data.K_19INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"净利润同比增长率","formatType":"1","value":tjKongFun(grid[data.K_20INDEX],"_a27",year,oTjKong)},
	}
}
const getyhField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"关键指标","type":"title","value":"--"},
			"_a1":{"name":"营业收入","formatType":"0","value":tjKongFun(grid[data.K_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"归属净利润","formatType":"9","value":tjKongFun(grid[data.K_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"扣非净利润","formatType":"9","value":tjKongFun(grid[data.K_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"每股指标","type":"title","value":"--"},
			"_a5":{"name":"每股收益","formatType":"9","value":tjKongFun(grid[data.K_04INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"每股净资产","formatType":"9","value":tjKongFun(grid[data.K_05INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"每股资本公积金","formatType":"9","value":tjKongFun(grid[data.K_06INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"每股未分配利润","formatType":"9","value":tjKongFun(grid[data.K_07INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"每股经营现金流","formatType":"9","value":tjKongFun(grid[data.K_08INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"盈利能力","type":"title","value":"--"},
			"_a11":{"name":"净资产收益率","formatType":"1","value":tjKongFun(grid[data.K_09INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"净资产收益率-摊薄","formatType":"1","value":tjKongFun(grid[data.K_10INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"净利率","formatType":"1","value":tjKongFun(grid[data.K_11INDEX],"_a13",year,oTjKong)},
			"_a15":{"name":"资本结构","type":"title","value":"--"},
			"_a16":{"name":"资产负债率","formatType":"1","value":tjKongFun(grid[data.K_13INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"权益乘数","value":tjKongFun(grid[data.K_14INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"偿债能力","type":"title","value":"--"},
			"_a19":{"name":"流动比率","value":tjKongFun(grid[data.K_15INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"速动比率","value":tjKongFun(grid[data.K_16INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"营运能力","type":"title","value":"--"},
			"_a22":{"name":"总资产周转率","formatType":"3","value":tjKongFun(grid[data.K_17INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"应收账款周转天数","formatType":"2","value":tjKongFun(grid[data.K_18INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"存货周转率","formatType":"3","value":tjKongFun(grid[data.K_12INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"成长能力","type":"title","value":"--"},
			"_a26":{"name":"营业收入同比增长率","formatType":"1","value":tjKongFun(grid[data.K_19INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"净利润同比增长率","formatType":"1","value":tjKongFun(grid[data.K_20INDEX],"_a27",year,oTjKong)},
	}
}
const getbxField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"关键指标","type":"title","value":"--"},
			"_a1":{"name":"营业收入","formatType":"0","value":tjKongFun(grid[data.K_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"归属净利润","formatType":"9","value":tjKongFun(grid[data.K_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"扣非净利润","formatType":"9","value":tjKongFun(grid[data.K_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"每股指标","type":"title","value":"--"},
			"_a5":{"name":"每股收益","formatType":"9","value":tjKongFun(grid[data.K_04INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"每股净资产","formatType":"9","value":tjKongFun(grid[data.K_05INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"每股资本公积金","formatType":"9","value":tjKongFun(grid[data.K_06INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"每股未分配利润","formatType":"9","value":tjKongFun(grid[data.K_07INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"每股经营现金流","formatType":"9","value":tjKongFun(grid[data.K_08INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"盈利能力","type":"title","value":"--"},
			"_a11":{"name":"净资产收益率","formatType":"1","value":tjKongFun(grid[data.K_09INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"净资产收益率-摊薄","formatType":"1","value":tjKongFun(grid[data.K_10INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"净利率","formatType":"1","value":tjKongFun(grid[data.K_11INDEX],"_a13",year,oTjKong)},
			"_a15":{"name":"资本结构","type":"title","value":"--"},
			"_a16":{"name":"资产负债率","formatType":"1","value":tjKongFun(grid[data.K_13INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"权益乘数","value":tjKongFun(grid[data.K_14INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"偿债能力","type":"title","value":"--"},
			"_a19":{"name":"流动比率","value":tjKongFun(grid[data.K_15INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"速动比率","value":tjKongFun(grid[data.K_16INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"营运能力","type":"title","value":"--"},
			"_a22":{"name":"总资产周转率","formatType":"3","value":tjKongFun(grid[data.K_17INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"应收账款周转天数","formatType":"2","value":tjKongFun(grid[data.K_18INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"存货周转率","formatType":"3","value":tjKongFun(grid[data.K_12INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"成长能力","type":"title","value":"--"},
			"_a26":{"name":"营业收入同比增长率","formatType":"1","value":tjKongFun(grid[data.K_19INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"净利润同比增长率","formatType":"1","value":tjKongFun(grid[data.K_20INDEX],"_a27",year,oTjKong)},
	}
}
const getyyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"每股指标","type":"title","value":"--"},
			"_a1":{"name":"基本每股收益","value":tjKongFun(grid[data.K_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"扣非每股收益","value":tjKongFun(grid[data.K_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"稀释每股收益","value":tjKongFun(grid[data.K_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"每股净资产","value":tjKongFun(grid[data.K_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"每股资本公积","value":tjKongFun(grid[data.K_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"每股未分配利润","value":tjKongFun(grid[data.K_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"每股经营现金流","value":tjKongFun(grid[data.K_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"盈利能力","type":"title","value":"--"},
			"_a9":{"name":"净资产收益率（加权）","value":tjKongFun(grid[data.K_08INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"总资产收益率","value":tjKongFun(grid[data.K_09INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"销售净利率","value":tjKongFun(grid[data.K_10INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"资本结构","type":"title","value":"--"},
			"_a13":{"name":"资产负债率","value":tjKongFun(grid[data.K_11INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"权益乘数","value":tjKongFun(grid[data.K_12INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"偿债能力","type":"title","value":"--"},
			"_a16":{"name":"流动比率","value":tjKongFun(grid[data.K_13INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"速动比率","value":tjKongFun(grid[data.K_14INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"营运能力","type":"title","value":"--"},
			"_a19":{"name":"总资产周转率","value":tjKongFun(grid[data.K_15INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"应收账款周转天数","value":tjKongFun(grid[data.K_16INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"成长能力","type":"title","value":"--"},
			"_a22":{"name":"营业收入","value":tjKongFun(grid[data.K_17INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"营业收入同比增长率","value":tjKongFun(grid[data.K_18INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"净利润","value":tjKongFun(grid[data.K_19INDEX],"_a24",year,oTjKong)},
	}
}
const getzqField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"关键指标","type":"title","value":"--"},
			"_a1":{"name":"营业收入","formatType":"0","value":tjKongFun(grid[data.K_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"归属净利润","formatType":"9","value":tjKongFun(grid[data.K_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"扣非净利润","formatType":"9","value":tjKongFun(grid[data.K_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"每股指标","type":"title","value":"--"},
			"_a5":{"name":"每股收益","formatType":"9","value":tjKongFun(grid[data.K_04INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"每股净资产","formatType":"9","value":tjKongFun(grid[data.K_05INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"每股资本公积金","formatType":"9","value":tjKongFun(grid[data.K_06INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"每股未分配利润","formatType":"9","value":tjKongFun(grid[data.K_07INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"每股经营现金流","formatType":"9","value":tjKongFun(grid[data.K_08INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"盈利能力","type":"title","value":"--"},
			"_a11":{"name":"净资产收益率","formatType":"1","value":tjKongFun(grid[data.K_09INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"净资产收益率-摊薄","formatType":"1","value":tjKongFun(grid[data.K_10INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"净利率","formatType":"1","value":tjKongFun(grid[data.K_11INDEX],"_a13",year,oTjKong)},
			"_a15":{"name":"资本结构","type":"title","value":"--"},
			"_a16":{"name":"资产负债率","formatType":"1","value":tjKongFun(grid[data.K_13INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"权益乘数","value":tjKongFun(grid[data.K_14INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"偿债能力","type":"title","value":"--"},
			"_a19":{"name":"流动比率","value":tjKongFun(grid[data.K_15INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"速动比率","value":tjKongFun(grid[data.K_16INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"营运能力","type":"title","value":"--"},
			"_a22":{"name":"总资产周转率","formatType":"3","value":tjKongFun(grid[data.K_17INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"应收账款周转天数","formatType":"2","value":tjKongFun(grid[data.K_18INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"存货周转率","formatType":"3","value":tjKongFun(grid[data.K_12INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"成长能力","type":"title","value":"--"},
			"_a26":{"name":"营业收入同比增长率","formatType":"1","value":tjKongFun(grid[data.K_19INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"净利润同比增长率","formatType":"1","value":tjKongFun(grid[data.K_20INDEX],"_a27",year,oTjKong)},
	}
}

export default {
	getJsonField:getJsonField
}