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
	if(value == '-'){
		if(!oTjKong[keyId]) oTjKong[keyId] = [];
		oTjKong[keyId].push(year);
	}else if(value.indexOf('-')>=0){
		var aValue = value.split('-');
		if(!aValue[0]||(!isNaN(aValue[0])&&Number(aValue[0])==0)){
			if(!oTjKong[keyId]) oTjKong[keyId] = [];
			oTjKong[keyId].push(year);
		}
	}
	return value;
}

const getbxField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"营业收入","type":"title","value":tjKongFun(grid[data.P_01INDEX],"_a0",year,oTjKong)},
			"_a1":{"name":"已赚保费","value":tjKongFun(grid[data.P_02INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"其中:保险业务收入","value":tjKongFun(grid[data.P_03INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"分保费收入","value":tjKongFun(grid[data.P_04INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"减:分出保费","value":tjKongFun(grid[data.P_05INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"提取未到期责任准备金","value":tjKongFun(grid[data.P_06INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"加:投资收益","value":tjKongFun(grid[data.P_07INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"其中:对联营企业和合营企业的投资收益/（损失）","value":tjKongFun(grid[data.P_08INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"公允价值变动损益","value":tjKongFun(grid[data.P_09INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"其中:可供出售金融资产公允价值变动损益","value":tjKongFun(grid[data.P_10INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"汇兑损失","value":tjKongFun(grid[data.P_11INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"其他业务收入","value":tjKongFun(grid[data.P_12INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"营业支出","type":"title","value":tjKongFun(grid[data.P_13INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"退保金","value":tjKongFun(grid[data.P_14INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"赔付支出","value":tjKongFun(grid[data.P_15INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"减:摊回赔付支出","value":tjKongFun(grid[data.P_16INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"提取保险责任准备金","value":tjKongFun(grid[data.P_17INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"减:摊回保险责任准备金","value":tjKongFun(grid[data.P_18INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"保单红利支出","value":tjKongFun(grid[data.P_19INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"分保费用","value":tjKongFun(grid[data.P_20INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"营业税金及附加","value":tjKongFun(grid[data.P_21INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"手续费及佣金支出","value":tjKongFun(grid[data.P_22INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"业务及管理费","value":tjKongFun(grid[data.P_23INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"减:摊回分保费用","value":tjKongFun(grid[data.P_24INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"利息支出","value":tjKongFun(grid[data.P_25INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"其他业务成本","value":tjKongFun(grid[data.P_26INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"资产减值损失","value":tjKongFun(grid[data.P_27INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"营业利润","type":"title","value":tjKongFun(grid[data.P_28INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"加:营业外收入","value":tjKongFun(grid[data.P_29INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"减:营业外支出","value":tjKongFun(grid[data.P_30INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"利润总额","type":"title","value":tjKongFun(grid[data.P_31INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"减:所得税","value":tjKongFun(grid[data.P_32INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"净利润","type":"title","value":tjKongFun(grid[data.P_33INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"其中:归属于母公司股东的净利润","value":tjKongFun(grid[data.P_34INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"少数股东损益","value":tjKongFun(grid[data.P_35INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"扣除非经常性损益后的净利润","value":tjKongFun(grid[data.P_36INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"每股收益","type":"title","value":"--"},
			"_a37":{"name":"基本每股收益","value":tjKongFun(grid[data.P_37INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"稀释每股收益","value":tjKongFun(grid[data.P_38INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"其他综合收益","type":"title","value":tjKongFun(grid[data.P_39INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"归属于母公司股东的其他综合收益","value":tjKongFun(grid[data.P_40INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"综合收益总额","type":"title","value":tjKongFun(grid[data.P_41INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"归属于母公司股东的综合收益总额","value":tjKongFun(grid[data.P_42INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"归属于少数股东的综合收益总额","value":tjKongFun(grid[data.P_43INDEX],"_a43",year,oTjKong)},
	}
}
const gettyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"营业总收入","type":"title","value":tjKongFun(grid[data.P_01INDEX],"_a0",year,oTjKong)},
			"_a1":{"name":"营业收入","value":tjKongFun(grid[data.P_02INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"营业总成本","type":"title","value":tjKongFun(grid[data.P_03INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"营业成本","value":tjKongFun(grid[data.P_04INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"营业税金及附加","value":tjKongFun(grid[data.P_05INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"销售费用","value":tjKongFun(grid[data.P_06INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"管理费用","value":tjKongFun(grid[data.P_07INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"财务费用","value":tjKongFun(grid[data.P_08INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"资产减值损失","value":tjKongFun(grid[data.P_09INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"其他经营收益","type":"title","value":"--"},
			"_a10":{"name":"加:投资收益","value":tjKongFun(grid[data.P_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"其中:对联营企业和合营企业的投资收益","value":tjKongFun(grid[data.P_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"营业利润","type":"title","value":tjKongFun(grid[data.P_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"加:营业外收入","value":tjKongFun(grid[data.P_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"减:营业外支出","value":tjKongFun(grid[data.P_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"其中:非流动资产处置净损失","value":tjKongFun(grid[data.P_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"利润总额","type":"title","value":tjKongFun(grid[data.P_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"减:所得税费用","value":tjKongFun(grid[data.P_17INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"净利润","type":"title","value":tjKongFun(grid[data.P_18INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"其中:归属于母公司股东的净利润","value":tjKongFun(grid[data.P_19INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"少数股东损益","value":tjKongFun(grid[data.P_20INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"扣除非经常性损益后的净利润","value":tjKongFun(grid[data.P_21INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"每股收益","type":"title","value":"--"},
			"_a23":{"name":"基本每股收益","value":tjKongFun(grid[data.P_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"稀释每股收益","value":tjKongFun(grid[data.P_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"其他综合收益","type":"title","value":tjKongFun(grid[data.P_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"归属于母公司股东的其他综合收益","value":tjKongFun(grid[data.P_25INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"归属于少数股东的其他综合收益","value":tjKongFun(grid[data.P_26INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"综合收益总额","type":"title","value":tjKongFun(grid[data.P_27INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"归属于母公司所有者的综合收益总额","value":tjKongFun(grid[data.P_28INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"归属于少数股东的综合收益总额","value":tjKongFun(grid[data.P_29INDEX],"_a30",year,oTjKong)},
	}
}
const getyyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"营业总收入","type":"title","value":tjKongFun(grid[data.P_01INDEX],"_a0",year,oTjKong)},
			"_a1":{"name":"营业收入","value":tjKongFun(grid[data.P_02INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"营业总成本","type":"title","value":"--"},
			"_a3":{"name":"营业成本","value":tjKongFun(grid[data.P_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"营业税金及附加","value":tjKongFun(grid[data.P_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"销售费用","value":tjKongFun(grid[data.P_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"管理费用","value":tjKongFun(grid[data.P_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"财务费用","value":tjKongFun(grid[data.P_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"资产减值损失","value":tjKongFun(grid[data.P_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"投资收益","value":tjKongFun(grid[data.P_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"其中：对联营企业和合营企业的投资收益","value":tjKongFun(grid[data.P_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"营业利润","type":"title","value":"--"},
			"_a12":{"name":"加：营业外收入","value":tjKongFun(grid[data.P_11INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"减：营业外收入","value":tjKongFun(grid[data.P_12INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"其中：非流动资产外置损失","value":tjKongFun(grid[data.P_13INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"利润总额","type":"title","value":"--"},
			"_a16":{"name":"减：所得税费用","value":tjKongFun(grid[data.P_14INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"净利润","type":"title","value":"--"},
			"_a18":{"name":"归属于母公司所得者的净利润","value":tjKongFun(grid[data.P_15INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"少数股东损益","value":tjKongFun(grid[data.P_16INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"每股收益","type":"title","value":"--"},
			"_a21":{"name":"（一）基本每股收益","value":tjKongFun(grid[data.P_17INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"（二）稀释每股收益","value":tjKongFun(grid[data.P_18INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"其他综合收益","type":"title","value":"--"},
			"_a24":{"name":"（一）归属于母公司所有者的其他综合收益","value":tjKongFun(grid[data.P_19INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"综合收益总额","value":tjKongFun(grid[data.P_20INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"（一）归属于母公司所有者的综合收益总额","value":tjKongFun(grid[data.P_21INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"（二）归属于少数股东的综合收益总额","value":tjKongFun(grid[data.P_22INDEX],"_a27",year,oTjKong)},
	}
}
const getyhField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"营业收入","type":"title","value":tjKongFun(grid[data.P_01INDEX],"_a0",year,oTjKong)},
			"_a1":{"name":"利息净收入","value":tjKongFun(grid[data.P_02INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"其中:利息收入","value":tjKongFun(grid[data.P_03INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"利息支出","value":tjKongFun(grid[data.P_04INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"手续费及佣金净收入","value":tjKongFun(grid[data.P_05INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"其中:手续费及佣金收入","value":tjKongFun(grid[data.P_06INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"手续费及佣金支出","value":tjKongFun(grid[data.P_07INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"加:投资收益","value":tjKongFun(grid[data.P_08INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"其中:对联营企业和合营企业的投资收益","value":tjKongFun(grid[data.P_09INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"公允价值变动收益","value":tjKongFun(grid[data.P_10INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"汇兑收益","value":tjKongFun(grid[data.P_11INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"其他业务收入","value":tjKongFun(grid[data.P_12INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"营业支出","type":"title","value":tjKongFun(grid[data.P_13INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"营业税金及附加","value":tjKongFun(grid[data.P_14INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"业务及管理费","value":tjKongFun(grid[data.P_15INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"资产减值损失","value":tjKongFun(grid[data.P_16INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"其他业务成本","value":tjKongFun(grid[data.P_17INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"营业利润","type":"title","value":tjKongFun(grid[data.P_18INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"加:营业外收入","value":tjKongFun(grid[data.P_19INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"减:营业外支出","value":tjKongFun(grid[data.P_20INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"利润总额","type":"title","value":tjKongFun(grid[data.P_21INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"减:所得税费用","value":tjKongFun(grid[data.P_22INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"净利润","type":"title","value":tjKongFun(grid[data.P_23INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"其中:归属于母公司股东的净利润","value":tjKongFun(grid[data.P_24INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"少数股东损益","value":tjKongFun(grid[data.P_25INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"扣除非经常性损益后的净利润","value":tjKongFun(grid[data.P_26INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"每股收益","type":"title","value":"--"},
			"_a27":{"name":"基本每股收益","value":tjKongFun(grid[data.P_27INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"稀释每股收益","value":tjKongFun(grid[data.P_28INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"其他综合收益","type":"title","value":tjKongFun(grid[data.P_29INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"归属于母公司股东的其他综合收益","value":tjKongFun(grid[data.P_30INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"归属于少数股东的其他综合收益","value":tjKongFun(grid[data.P_31INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"综合收益总额","type":"title","value":tjKongFun(grid[data.P_32INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"归属于母公司股东的综合收益总额","value":tjKongFun(grid[data.P_33INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"归属于少数股东的综合收益总额","value":tjKongFun(grid[data.P_34INDEX],"_a34",year,oTjKong)},
	}
}
const getzqField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"营业收入","type":"title","value":tjKongFun(grid[data.P_01INDEX],"_a0",year,oTjKong)},
			"_a1":{"name":"手续费及佣金净收入","value":tjKongFun(grid[data.P_02INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"其中:代理买卖证券业务净收入","value":tjKongFun(grid[data.P_03INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"证券承销业务净收入","value":tjKongFun(grid[data.P_04INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"受托客户资产管理业务净收入","value":tjKongFun(grid[data.P_05INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"利息净收入","value":tjKongFun(grid[data.P_06INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"加:投资收益","value":tjKongFun(grid[data.P_07INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"其中:对联营企业和合营企业的投资收益","value":tjKongFun(grid[data.P_08INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"公允价值变动收益","value":tjKongFun(grid[data.P_09INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"其中:可供出售金融资产公允价值变动损益","value":tjKongFun(grid[data.P_10INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"汇兑收益","value":tjKongFun(grid[data.P_11INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"其他业务收入","value":tjKongFun(grid[data.P_12INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"营业支出","type":"title","value":tjKongFun(grid[data.P_13INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"营业税金及附加","value":tjKongFun(grid[data.P_14INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"业务及管理费","value":tjKongFun(grid[data.P_15INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"资产减值损失","value":tjKongFun(grid[data.P_16INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"其他业务成本","value":tjKongFun(grid[data.P_17INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"营业利润","type":"title","value":tjKongFun(grid[data.P_18INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"加:营业外收入","value":tjKongFun(grid[data.P_19INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"减:营业外支出","value":tjKongFun(grid[data.P_20INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"利润总额","type":"title","value":tjKongFun(grid[data.P_21INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"减:所得税费用","value":tjKongFun(grid[data.P_22INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"净利润","type":"title","value":tjKongFun(grid[data.P_23INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"其中:归属于母公司股东的净利润","value":tjKongFun(grid[data.P_24INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"少数股东损益","value":tjKongFun(grid[data.P_25INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"扣除非经常性损益后的净利润","value":tjKongFun(grid[data.P_26INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"每股收益","type":"title","value":"--"},
			"_a27":{"name":"基本每股收益","value":tjKongFun(grid[data.P_27INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"稀释每股收益","value":tjKongFun(grid[data.P_28INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"其他综合收益","type":"title","value":tjKongFun(grid[data.P_29INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"归属于母公司所有者的其他综合收益","value":tjKongFun(grid[data.P_30INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"归属于少数股东的其他综合收益","value":tjKongFun(grid[data.P_31INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"综合收益总额","type":"title","value":tjKongFun(grid[data.P_32INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"归属于母公司股东的综合收益总额","value":tjKongFun(grid[data.P_33INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"归属于少数股东的综合收益总额","value":tjKongFun(grid[data.P_34INDEX],"_a34",year,oTjKong)},
	}
}

export default {
	getJsonField:getJsonField
}