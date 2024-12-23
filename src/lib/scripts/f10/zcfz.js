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
 * 银行 0
 * 保险 1
 * 证券 2
 * 通用 3
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
	if(!value) return '';
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

const gettyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"流动资产","type":"title","value":"--"},
			"_a1":{"name":"货币资金","value":tjKongFun(grid[data.BALANCE_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"应收票据","value":tjKongFun(grid[data.BALANCE_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"应收账款","value":tjKongFun(grid[data.BALANCE_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"预付款项","value":tjKongFun(grid[data.BALANCE_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"应收利息","value":tjKongFun(grid[data.BALANCE_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"其他应收款","value":tjKongFun(grid[data.BALANCE_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"存货","value":tjKongFun(grid[data.BALANCE_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"其他流动资产","value":tjKongFun(grid[data.BALANCE_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"流动资产合计","type":"title","value":tjKongFun(grid[data.BALANCE_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"非流动资产","type":"title","value":"--"},
			"_a11":{"name":"可供出售金融资产","value":tjKongFun(grid[data.BALANCE_10INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"持有至到期投资","value":tjKongFun(grid[data.BALANCE_11INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"长期应收款","value":tjKongFun(grid[data.BALANCE_12INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"长期股权投资","value":tjKongFun(grid[data.BALANCE_13INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"投资性房地产","value":tjKongFun(grid[data.BALANCE_14INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"固定资产","value":tjKongFun(grid[data.BALANCE_15INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"在建工程","value":tjKongFun(grid[data.BALANCE_16INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"工程物资","value":tjKongFun(grid[data.BALANCE_17INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"固定资产清理","value":tjKongFun(grid[data.BALANCE_18INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"生产性生物资产","value":tjKongFun(grid[data.BALANCE_19INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"无形资产","value":tjKongFun(grid[data.BALANCE_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"开发支出","value":tjKongFun(grid[data.BALANCE_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"商誉","value":tjKongFun(grid[data.BALANCE_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"长期待摊费用","value":tjKongFun(grid[data.BALANCE_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"递延所得税资产","value":tjKongFun(grid[data.BALANCE_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"其他非流动资产","value":tjKongFun(grid[data.BALANCE_25INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"非流动资产合计","type":"title","value":tjKongFun(grid[data.BALANCE_26INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"资产总计","type":"title","value":tjKongFun(grid[data.BALANCE_27INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"流动负债","type":"title","value":"--"},
			"_a30":{"name":"短期借款","value":tjKongFun(grid[data.BALANCE_28INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"应付票据","value":tjKongFun(grid[data.BALANCE_29INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"应付账款","value":tjKongFun(grid[data.BALANCE_30INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"预收款项","value":tjKongFun(grid[data.BALANCE_31INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"应付职工薪酬","value":tjKongFun(grid[data.BALANCE_32INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"应交税费","value":tjKongFun(grid[data.BALANCE_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"应付利息","value":tjKongFun(grid[data.BALANCE_34INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"应付股利","value":tjKongFun(grid[data.BALANCE_35INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"其他应付款","value":tjKongFun(grid[data.BALANCE_36INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"一年内到期的非流动负债","value":tjKongFun(grid[data.BALANCE_37INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"其他流动负债","value":tjKongFun(grid[data.BALANCE_38INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"流动负债合计","type":"title","value":tjKongFun(grid[data.BALANCE_39INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"非流动负债","type":"title","value":"--"},
			"_a43":{"name":"长期借款","value":tjKongFun(grid[data.BALANCE_40INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"长期应付款","value":tjKongFun(grid[data.BALANCE_41INDEX],"_a44",year,oTjKong)},
			"_a45":{"name":"长期应付职工薪酬","value":tjKongFun(grid[data.BALANCE_42INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"专项应付款","value":tjKongFun(grid[data.BALANCE_43INDEX],"_a46",year,oTjKong)},
			"_a47":{"name":"预计负债","value":tjKongFun(grid[data.BALANCE_44INDEX],"_a47",year,oTjKong)},
			"_a48":{"name":"递延收益","value":tjKongFun(grid[data.BALANCE_45INDEX],"_a48",year,oTjKong)},
			"_a49":{"name":"递延所得税负债","value":tjKongFun(grid[data.BALANCE_46INDEX],"_a49",year,oTjKong)},
			"_a50":{"name":"非流动负债合计","type":"title","value":tjKongFun(grid[data.BALANCE_47INDEX],"_a50",year,oTjKong)},
			"_a51":{"name":"负债合计","type":"title","value":tjKongFun(grid[data.BALANCE_48INDEX],"_a51",year,oTjKong)},
			"_a52":{"name":"所有者权益(或股东权益)","type":"title","value":"--"},
			"_a53":{"name":"实收资本（或股本）","value":tjKongFun(grid[data.BALANCE_49INDEX],"_a53",year,oTjKong)},
			"_a54":{"name":"资本公积","value":tjKongFun(grid[data.BALANCE_50INDEX],"_a54",year,oTjKong)},
			"_a55":{"name":"专项储备","value":tjKongFun(grid[data.BALANCE_51INDEX],"_a55",year,oTjKong)},
			"_a56":{"name":"盈余公积","value":tjKongFun(grid[data.BALANCE_52INDEX],"_a56",year,oTjKong)},
			"_a57":{"name":"未分配利润","value":tjKongFun(grid[data.BALANCE_53INDEX],"_a57",year,oTjKong)},
			"_a58":{"name":"归属于母公司股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_54INDEX],"_a58",year,oTjKong)},
			"_a59":{"name":"少数股东权益","value":tjKongFun(grid[data.BALANCE_55INDEX],"_a59",year,oTjKong)},
			"_a60":{"name":"股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_56INDEX],"_a60",year,oTjKong)},
			"_a61":{"name":"负债和股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_57INDEX],"_a61",year,oTjKong)},
	}
}
const getyyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"流动资产","type":"title","value":"--"},
			"_a1":{"name":"货币资金","value":tjKongFun(grid[data.BALANCE_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"应收票据","value":tjKongFun(grid[data.BALANCE_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"应收账款","value":tjKongFun(grid[data.BALANCE_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"预付款项","value":tjKongFun(grid[data.BALANCE_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"应收利息","value":tjKongFun(grid[data.BALANCE_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"应收股利","value":tjKongFun(grid[data.BALANCE_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"其他应收款","value":tjKongFun(grid[data.BALANCE_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"存货","value":tjKongFun(grid[data.BALANCE_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"其他流动资产","value":tjKongFun(grid[data.BALANCE_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"流动资产合计","value":tjKongFun(grid[data.BALANCE_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"非流动资产","type":"title","value":"--"},
			"_a12":{"name":"可供出售金额资产","value":tjKongFun(grid[data.BALANCE_11INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"长期应收款","value":tjKongFun(grid[data.BALANCE_12INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"长期股权投资","value":tjKongFun(grid[data.BALANCE_13INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"投资性房地产","value":tjKongFun(grid[data.BALANCE_14INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"固定资产","value":tjKongFun(grid[data.BALANCE_15INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"在建工程","value":tjKongFun(grid[data.BALANCE_16INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"固定资产清理","value":tjKongFun(grid[data.BALANCE_17INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"无形资产","value":tjKongFun(grid[data.BALANCE_18INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"商誉","value":tjKongFun(grid[data.BALANCE_19INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"长期待摊费用","value":tjKongFun(grid[data.BALANCE_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"递延所得税资产","value":tjKongFun(grid[data.BALANCE_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"其他非流动资产","value":tjKongFun(grid[data.BALANCE_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"非流动资产合计","value":tjKongFun(grid[data.BALANCE_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"资产总计","value":tjKongFun(grid[data.BALANCE_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"流动负债","type":"title","value":"--"},
			"_a27":{"name":"短期借款","value":tjKongFun(grid[data.BALANCE_25INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"应付票据","value":tjKongFun(grid[data.BALANCE_26INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"应付账款","value":tjKongFun(grid[data.BALANCE_27INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"预收账款","value":tjKongFun(grid[data.BALANCE_28INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"应付职工薪酬","value":tjKongFun(grid[data.BALANCE_29INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"应交税费","value":tjKongFun(grid[data.BALANCE_30INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"应付利息","value":tjKongFun(grid[data.BALANCE_31INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"应付股利","value":tjKongFun(grid[data.BALANCE_32INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"其他应付款","value":tjKongFun(grid[data.BALANCE_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"一年内到期的非流动负债","value":tjKongFun(grid[data.BALANCE_34INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"流动负债合计","value":tjKongFun(grid[data.BALANCE_35INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"非流动负债","type":"title","value":"--"},
			"_a39":{"name":"长期借款","value":tjKongFun(grid[data.BALANCE_36INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"应付债券","value":tjKongFun(grid[data.BALANCE_37INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"长期应付款","value":tjKongFun(grid[data.BALANCE_38INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"专项应付款","value":tjKongFun(grid[data.BALANCE_39INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"长期递延收益","value":tjKongFun(grid[data.BALANCE_40INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"递延所得税负债","value":tjKongFun(grid[data.BALANCE_41INDEX],"_a44",year,oTjKong)},
			"_a45":{"name":"其他非流动负债","value":tjKongFun(grid[data.BALANCE_42INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"非流动负债合计","value":tjKongFun(grid[data.BALANCE_43INDEX],"_a46",year,oTjKong)},
			"_a47":{"name":"负债合计","value":tjKongFun(grid[data.BALANCE_44INDEX],"_a47",year,oTjKong)},
			"_a48":{"name":"股东权益","type":"title","value":"--"},
			"_a49":{"name":"实收资本","value":tjKongFun(grid[data.BALANCE_45INDEX],"_a49",year,oTjKong)},
			"_a50":{"name":"资本公积","value":tjKongFun(grid[data.BALANCE_46INDEX],"_a50",year,oTjKong)},
			"_a51":{"name":"盈余公积","value":tjKongFun(grid[data.BALANCE_47INDEX],"_a51",year,oTjKong)},
			"_a52":{"name":"一般风险准备","value":tjKongFun(grid[data.BALANCE_48INDEX],"_a52",year,oTjKong)},
			"_a53":{"name":"未分配利润","value":tjKongFun(grid[data.BALANCE_49INDEX],"_a53",year,oTjKong)},
			"_a54":{"name":"外币报表折算差额","value":tjKongFun(grid[data.BALANCE_50INDEX],"_a54",year,oTjKong)},
			"_a55":{"name":"归属于母公司股东权益合计","value":tjKongFun(grid[data.BALANCE_51INDEX],"_a55",year,oTjKong)},
			"_a56":{"name":"少数股东权益","value":tjKongFun(grid[data.BALANCE_52INDEX],"_a56",year,oTjKong)},
			"_a57":{"name":"所有者权益（或股东权益）合计","value":tjKongFun(grid[data.BALANCE_53INDEX],"_a57",year,oTjKong)},
			"_a58":{"name":"负债和所有者权益（或股东权益）总计","value":tjKongFun(grid[data.BALANCE_54INDEX],"_a58",year,oTjKong)},
	}
}
const getzqField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"资产","type":"title","value":"--"},
			"_a1":{"name":"货币资金","value":tjKongFun(grid[data.BALANCE_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"其中:客户资金存款","value":tjKongFun(grid[data.BALANCE_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"结算备付金","value":tjKongFun(grid[data.BALANCE_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"其中:客户备付金","value":tjKongFun(grid[data.BALANCE_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"融出资金","value":tjKongFun(grid[data.BALANCE_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"以公允价值计量且其变动计入当期损益的金融资产","value":tjKongFun(grid[data.BALANCE_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"衍生金融资产","value":tjKongFun(grid[data.BALANCE_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"买入返售金融资产","value":tjKongFun(grid[data.BALANCE_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"应收利息","value":tjKongFun(grid[data.BALANCE_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"应收款项","value":tjKongFun(grid[data.BALANCE_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"存出保证金","value":tjKongFun(grid[data.BALANCE_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"可供出售金融资产","value":tjKongFun(grid[data.BALANCE_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"持有至到期投资","value":tjKongFun(grid[data.BALANCE_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"长期股权投资","value":tjKongFun(grid[data.BALANCE_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"投资性房地产","value":tjKongFun(grid[data.BALANCE_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"固定资产","value":tjKongFun(grid[data.BALANCE_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"在建工程","value":tjKongFun(grid[data.BALANCE_17INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"无形资产","value":tjKongFun(grid[data.BALANCE_18INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"商誉","value":tjKongFun(grid[data.BALANCE_19INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"递延所得税资产","value":tjKongFun(grid[data.BALANCE_20INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"其他资产","value":tjKongFun(grid[data.BALANCE_21INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"资产总计","type":"title","value":tjKongFun(grid[data.BALANCE_22INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"负债","type":"title","value":"--"},
			"_a24":{"name":"拆入资金","value":tjKongFun(grid[data.BALANCE_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"以公允价值计量且其变动计入当期损益的金融负债","value":tjKongFun(grid[data.BALANCE_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"衍生金融负债","value":tjKongFun(grid[data.BALANCE_25INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"卖出回购金融资产款","value":tjKongFun(grid[data.BALANCE_26INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"代理买卖证券款","value":tjKongFun(grid[data.BALANCE_27INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"客户信用交易代理买卖证券款","value":tjKongFun(grid[data.BALANCE_28INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"应付账款","value":tjKongFun(grid[data.BALANCE_29INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"应付职工薪酬","value":tjKongFun(grid[data.BALANCE_30INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"应交税费","value":tjKongFun(grid[data.BALANCE_31INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"应付利息","value":tjKongFun(grid[data.BALANCE_32INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"应付股利","value":tjKongFun(grid[data.BALANCE_33INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"应付短期融资款","value":tjKongFun(grid[data.BALANCE_34INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"预计负债","value":tjKongFun(grid[data.BALANCE_35INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"应付债券","value":tjKongFun(grid[data.BALANCE_36INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"递延所得税负债","value":tjKongFun(grid[data.BALANCE_37INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"其他负债","value":tjKongFun(grid[data.BALANCE_38INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"负债合计","type":"title","value":tjKongFun(grid[data.BALANCE_39INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"所有者权益(或股东权益)","type":"title","value":"--"},
			"_a42":{"name":"股本","value":tjKongFun(grid[data.BALANCE_40INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"资本公积","value":tjKongFun(grid[data.BALANCE_41INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"盈余公积","value":tjKongFun(grid[data.BALANCE_42INDEX],"_a44",year,oTjKong)},
			"_a45":{"name":"一般风险准备","value":tjKongFun(grid[data.BALANCE_43INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"未分配利润","value":tjKongFun(grid[data.BALANCE_44INDEX],"_a46",year,oTjKong)},
			"_a47":{"name":"归属于母公司股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_45INDEX],"_a47",year,oTjKong)},
			"_a48":{"name":"少数股东权益","value":tjKongFun(grid[data.BALANCE_46INDEX],"_a48",year,oTjKong)},
			"_a49":{"name":"股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_47INDEX],"_a49",year,oTjKong)},
			"_a50":{"name":"负债和股东权益总计","type":"title","value":tjKongFun(grid[data.BALANCE_48INDEX],"_a50",year,oTjKong)},
	}
}
const getbxField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"资产","type":"title","value":"--"},
			"_a1":{"name":"货币资金","value":tjKongFun(grid[data.BALANCE_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"以公允价值计量且其变动计入当期损益的金融资产","value":tjKongFun(grid[data.BALANCE_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"买入返售金融资产","value":tjKongFun(grid[data.BALANCE_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"应收利息","value":tjKongFun(grid[data.BALANCE_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"应收保费","value":tjKongFun(grid[data.BALANCE_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"应收分保账款","value":tjKongFun(grid[data.BALANCE_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"应收分保合同准备金","value":tjKongFun(grid[data.BALANCE_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"其中:应收分保未到期责任准备金","value":tjKongFun(grid[data.BALANCE_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"应收分保未决赔偿准备金","value":tjKongFun(grid[data.BALANCE_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"应收分保寿险责任准备金","value":tjKongFun(grid[data.BALANCE_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"应收分保长期健康险责任准备金","value":tjKongFun(grid[data.BALANCE_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"保户质押贷款","value":tjKongFun(grid[data.BALANCE_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"定期存款","value":tjKongFun(grid[data.BALANCE_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"可供出售金融资产","value":tjKongFun(grid[data.BALANCE_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"持有至到期投资","value":tjKongFun(grid[data.BALANCE_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"应收款项类投资","value":tjKongFun(grid[data.BALANCE_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"长期股权投资","value":tjKongFun(grid[data.BALANCE_17INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"存出资本保证金","value":tjKongFun(grid[data.BALANCE_18INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"投资性房地产","value":tjKongFun(grid[data.BALANCE_19INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"固定资产","value":tjKongFun(grid[data.BALANCE_20INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"在建工程","value":tjKongFun(grid[data.BALANCE_21INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"无形资产","value":tjKongFun(grid[data.BALANCE_22INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"商誉","value":tjKongFun(grid[data.BALANCE_23INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"递延所得税资产","value":tjKongFun(grid[data.BALANCE_24INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"其他资产","value":tjKongFun(grid[data.BALANCE_25INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"独立账户资产","value":tjKongFun(grid[data.BALANCE_26INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"资产总计","type":"title","value":tjKongFun(grid[data.BALANCE_27INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"负债","type":"title","value":"--"},
			"_a29":{"name":"卖出回购金融资产款","value":tjKongFun(grid[data.BALANCE_28INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"吸收存款","value":tjKongFun(grid[data.BALANCE_29INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"预收保费","value":tjKongFun(grid[data.BALANCE_30INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"应付手续费及佣金","value":tjKongFun(grid[data.BALANCE_31INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"应付分保账款","value":tjKongFun(grid[data.BALANCE_32INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"应付职工薪酬","value":tjKongFun(grid[data.BALANCE_33INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"应交税费","value":tjKongFun(grid[data.BALANCE_34INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"应付利息","value":tjKongFun(grid[data.BALANCE_35INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"预计负债","value":tjKongFun(grid[data.BALANCE_36INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"应付赔付款","value":tjKongFun(grid[data.BALANCE_37INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"应付保单红利","value":tjKongFun(grid[data.BALANCE_38INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"保户储金及投资款","value":tjKongFun(grid[data.BALANCE_39INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"保险合同准备金","value":tjKongFun(grid[data.BALANCE_40INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"其中:未到期责任准备金","value":tjKongFun(grid[data.BALANCE_41INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"未决赔款准备金","value":tjKongFun(grid[data.BALANCE_42INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"寿险责任准备金","value":tjKongFun(grid[data.BALANCE_43INDEX],"_a44",year,oTjKong)},
			"_a45":{"name":"长期健康险责任准备金","value":tjKongFun(grid[data.BALANCE_44INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"应付债券","value":tjKongFun(grid[data.BALANCE_45INDEX],"_a46",year,oTjKong)},
			"_a47":{"name":"其中:应付次级债","value":tjKongFun(grid[data.BALANCE_46INDEX],"_a47",year,oTjKong)},
			"_a48":{"name":"递延所得税负债","value":tjKongFun(grid[data.BALANCE_47INDEX],"_a48",year,oTjKong)},
			"_a49":{"name":"其他负债","value":tjKongFun(grid[data.BALANCE_48INDEX],"_a49",year,oTjKong)},
			"_a50":{"name":"独立账户负债","value":tjKongFun(grid[data.BALANCE_49INDEX],"_a50",year,oTjKong)},
			"_a51":{"name":"负债合计","type":"title","value":tjKongFun(grid[data.BALANCE_50INDEX],"_a51",year,oTjKong)},
			"_a52":{"name":"所有者权益(或股东权益)","type":"title","value":"--"},
			"_a53":{"name":"股本","value":tjKongFun(grid[data.BALANCE_51INDEX],"_a53",year,oTjKong)},
			"_a54":{"name":"资本公积","value":tjKongFun(grid[data.BALANCE_52INDEX],"_a54",year,oTjKong)},
			"_a55":{"name":"盈余公积","value":tjKongFun(grid[data.BALANCE_53INDEX],"_a55",year,oTjKong)},
			"_a56":{"name":"一般风险准备","value":tjKongFun(grid[data.BALANCE_54INDEX],"_a56",year,oTjKong)},
			"_a57":{"name":"未分配利润","value":tjKongFun(grid[data.BALANCE_55INDEX],"_a57",year,oTjKong)},
			"_a58":{"name":"归属于母公司股东权益总计","type":"title","value":tjKongFun(grid[data.BALANCE_56INDEX],"_a58",year,oTjKong)},
			"_a59":{"name":"少数股东权益","value":tjKongFun(grid[data.BALANCE_57INDEX],"_a59",year,oTjKong)},
			"_a60":{"name":"股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_58INDEX],"_a60",year,oTjKong)},
			"_a61":{"name":"负债和股东权益总计","type":"title","value":tjKongFun(grid[data.BALANCE_59INDEX],"_a61",year,oTjKong)},
	}
}
const getyhField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"资产","type":"title","value":"--"},
			"_a1":{"name":"现金及存放中央银行款项","value":tjKongFun(grid[data.BALANCE_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"存放同业款项","value":tjKongFun(grid[data.BALANCE_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"贵金属","value":tjKongFun(grid[data.BALANCE_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"拆出资金","value":tjKongFun(grid[data.BALANCE_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"以公允价值计量且其变动计入当期损益的金融资产","value":tjKongFun(grid[data.BALANCE_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"衍生金融资产","value":tjKongFun(grid[data.BALANCE_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"买入返售金融资产","value":tjKongFun(grid[data.BALANCE_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"应收利息","value":tjKongFun(grid[data.BALANCE_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"发放贷款及垫款","value":tjKongFun(grid[data.BALANCE_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"可供出售金融资产","value":tjKongFun(grid[data.BALANCE_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"持有至到期投资","value":tjKongFun(grid[data.BALANCE_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"应收款项类投资","value":tjKongFun(grid[data.BALANCE_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"长期股权投资","value":tjKongFun(grid[data.BALANCE_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"固定资产","value":tjKongFun(grid[data.BALANCE_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"无形资产","value":tjKongFun(grid[data.BALANCE_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"商誉","value":tjKongFun(grid[data.BALANCE_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"递延所得税资产","value":tjKongFun(grid[data.BALANCE_17INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"其他资产","value":tjKongFun(grid[data.BALANCE_18INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"资产总计","type":"title","value":tjKongFun(grid[data.BALANCE_19INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"负债","type":"title","value":"--"},
			"_a21":{"name":"向中央银行借款","value":tjKongFun(grid[data.BALANCE_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"同业和其他金融机构存放款项","value":tjKongFun(grid[data.BALANCE_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"拆入资金","value":tjKongFun(grid[data.BALANCE_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"以公允价值计量且其变动计入当期损益的金融负债","value":tjKongFun(grid[data.BALANCE_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"衍生金融负债","value":tjKongFun(grid[data.BALANCE_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"卖出回购金融资产款","value":tjKongFun(grid[data.BALANCE_25INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"吸收存款","value":tjKongFun(grid[data.BALANCE_26INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"存款证及应付票据","value":tjKongFun(grid[data.BALANCE_27INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"应付职工薪酬","value":tjKongFun(grid[data.BALANCE_28INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"应交税费","value":tjKongFun(grid[data.BALANCE_29INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"应付利息","value":tjKongFun(grid[data.BALANCE_30INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"应付股利","value":tjKongFun(grid[data.BALANCE_31INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"预计负债","value":tjKongFun(grid[data.BALANCE_32INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"递延所得税负债","value":tjKongFun(grid[data.BALANCE_33INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"应付债券","value":tjKongFun(grid[data.BALANCE_34INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"其他负债","value":tjKongFun(grid[data.BALANCE_35INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"负债合计","type":"title","value":tjKongFun(grid[data.BALANCE_36INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"所有者权益(或股东权益)","type":"title","value":"--"},
			"_a39":{"name":"股本","value":tjKongFun(grid[data.BALANCE_37INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"其他权益工具","value":tjKongFun(grid[data.BALANCE_38INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"其中:优先股","value":tjKongFun(grid[data.BALANCE_39INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"资本公积","value":tjKongFun(grid[data.BALANCE_40INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"盈余公积","value":tjKongFun(grid[data.BALANCE_41INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"一般风险准备","value":tjKongFun(grid[data.BALANCE_42INDEX],"_a44",year,oTjKong)},
			"_a45":{"name":"未分配利润","value":tjKongFun(grid[data.BALANCE_43INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"归属于母公司股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_44INDEX],"_a46",year,oTjKong)},
			"_a47":{"name":"少数股东权益","value":tjKongFun(grid[data.BALANCE_45INDEX],"_a47",year,oTjKong)},
			"_a48":{"name":"股东权益合计","type":"title","value":tjKongFun(grid[data.BALANCE_46INDEX],"_a48",year,oTjKong)},
			"_a49":{"name":"负债及股东权益总计","type":"title","value":tjKongFun(grid[data.BALANCE_47INDEX],"_a49",year,oTjKong)},
	}
}


export default {
	getJsonField:getJsonField
}