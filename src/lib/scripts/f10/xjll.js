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

const gettyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"经营活动产生的现金流量","type":"title","value":"--"},
			"_a1":{"name":"销售商品、提供劳务收到的现金","value":tjKongFun(grid[data.CASH_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"收到的税费返还","value":tjKongFun(grid[data.CASH_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"收到其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"经营活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"购买商品、接受劳务支付的现金","value":tjKongFun(grid[data.CASH_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"支付给职工以及为职工支付的现金","value":tjKongFun(grid[data.CASH_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"支付的各项税费","value":tjKongFun(grid[data.CASH_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"支付其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"经营活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"经营活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"投资活动产生的现金流量","type":"title","value":"--"},
			"_a12":{"name":"收回投资收到的现金","value":tjKongFun(grid[data.CASH_11INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"取得投资收益收到的现金","value":tjKongFun(grid[data.CASH_12INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"处置固定资产、无形资产和其他长期资产收回的现金净额","value":tjKongFun(grid[data.CASH_13INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"收到其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_14INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"投资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_15INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"购建固定资产、无形资产和其他长期资产支付的现金","value":tjKongFun(grid[data.CASH_16INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"投资支付的现金","value":tjKongFun(grid[data.CASH_17INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"取得子公司及其他营业单位支付的现金净额","value":tjKongFun(grid[data.CASH_18INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"支付其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_19INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"投资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"投资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"筹资活动产生的现金流量","type":"title","value":"--"},
			"_a24":{"name":"吸收投资收到的现金","value":tjKongFun(grid[data.CASH_22INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"子公司吸收少数股东投资收到的现金","value":tjKongFun(grid[data.CASH_23INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"取得借款收到的现金","value":tjKongFun(grid[data.CASH_24INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"收到其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_25INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"筹资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_26INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"偿还债务支付的现金","value":tjKongFun(grid[data.CASH_27INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"分配股利、利润或偿付利息支付的现金","value":tjKongFun(grid[data.CASH_28INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"支付其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_29INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"筹资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_30INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"筹资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_31INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"汇率变动对现金及现金等价物的影响","type":"title","value":tjKongFun(grid[data.CASH_32INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"现金及现金等价物净增加额","type":"title","value":tjKongFun(grid[data.CASH_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"加:期初现金及现金等价物余额","value":tjKongFun(grid[data.CASH_34INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"期末现金及现金等价物余额","type":"title","value":tjKongFun(grid[data.CASH_35INDEX],"_a37",year,oTjKong)},
	}
}
const getzqField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"经营活动产生的现金流量","type":"title","value":"--"},
			"_a1":{"name":"处置交易性金融资产净增加额","value":tjKongFun(grid[data.CASH_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"收取利息、手续费及佣金的现金","value":tjKongFun(grid[data.CASH_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"拆入资金净增加额","value":tjKongFun(grid[data.CASH_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"回购业务资金净增加额","value":tjKongFun(grid[data.CASH_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"收到其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"经营活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"支付利息、手续费及佣金的现金","value":tjKongFun(grid[data.CASH_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"拆入资金净减少额","value":tjKongFun(grid[data.CASH_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"支付给职工及为职工支付的现金","value":tjKongFun(grid[data.CASH_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"支付的各项税费","value":tjKongFun(grid[data.CASH_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"拆出资金净增加额","value":tjKongFun(grid[data.CASH_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"回购业务资金净减少额","value":tjKongFun(grid[data.CASH_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"代理买卖证券支付的现金净额（净减少额）","value":tjKongFun(grid[data.CASH_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"支付其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"经营活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"经营活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"投资活动产生的现金流量","type":"title","value":"--"},
			"_a18":{"name":"取得投资收益收到的现金","value":tjKongFun(grid[data.CASH_17INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"处置固定资产、无形资产及其他长期资产收回的现金净额","value":tjKongFun(grid[data.CASH_18INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"收到其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_19INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"投资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"投资支付的现金","value":tjKongFun(grid[data.CASH_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"购建固定资产、无形资产和其他长期资产支付的现金","value":tjKongFun(grid[data.CASH_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"投资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"投资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"筹资活动产生的现金流量","type":"title","value":"--"},
			"_a27":{"name":"吸收投资收到的现金","value":tjKongFun(grid[data.CASH_25INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"其中:子公司吸收少数股东投资收到的现金","value":tjKongFun(grid[data.CASH_26INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"发行债券收到的现金","value":tjKongFun(grid[data.CASH_27INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"收到的其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_28INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"筹资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_29INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"偿还债务支付的现金","value":tjKongFun(grid[data.CASH_30INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"分配股利、利润或偿付利息支付的现金","value":tjKongFun(grid[data.CASH_31INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"子公司支付给少数股东的股利、利润","value":tjKongFun(grid[data.CASH_32INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"支付其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"筹资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_34INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"筹资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_35INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"汇率变动对现金及现金等价物的影响","type":"title","value":tjKongFun(grid[data.CASH_36INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"现金及现金等价物净增加额","type":"title","value":tjKongFun(grid[data.CASH_37INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"加:期初现金及现金等价物余额","value":tjKongFun(grid[data.CASH_38INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"期末现金及现金等价物余额","type":"title","value":tjKongFun(grid[data.CASH_39INDEX],"_a41",year,oTjKong)},
	}
}
const getbxField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"经营活动产生的现金流量","type":"title","value":"--"},
			"_a1":{"name":"收到原保险合同保费取得的现金","value":tjKongFun(grid[data.CASH_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"保户储金及投资款净增加额","value":tjKongFun(grid[data.CASH_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"收到的税收返还","value":tjKongFun(grid[data.CASH_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"收到其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"经营活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"支付原保险合同赔付等款项的现金","value":tjKongFun(grid[data.CASH_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"支付再保险业务现金净额","value":tjKongFun(grid[data.CASH_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"支付利息、手续费及佣金的现金","value":tjKongFun(grid[data.CASH_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"支付保单红利的现金","value":tjKongFun(grid[data.CASH_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"支付给职工以及为职工支付的现金","value":tjKongFun(grid[data.CASH_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"支付的各项税费","value":tjKongFun(grid[data.CASH_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"支付其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"经营活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"经营活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"投资活动产生的现金流量","type":"title","value":"--"},
			"_a16":{"name":"收回投资收到的现金","value":tjKongFun(grid[data.CASH_15INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"取得投资收益收到的现金","value":tjKongFun(grid[data.CASH_16INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"处置固定资产、无形资产和其他长期资产收回的现金净额","value":tjKongFun(grid[data.CASH_17INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"处置子公司及其他营业单位收到的现金","value":tjKongFun(grid[data.CASH_18INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"收到的其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_19INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"投资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"投资支付的现金","value":tjKongFun(grid[data.CASH_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"保户质押贷款净增加额","value":tjKongFun(grid[data.CASH_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"购建固定资产、无形资产和其他长期资产所支付的现金","value":tjKongFun(grid[data.CASH_23INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"收购子公司及其他营业单位支付的现金净额","value":tjKongFun(grid[data.CASH_24INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"支付其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_25INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"投资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_26INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"投资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_27INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"筹资活动产生的现金流量","type":"title","value":"--"},
			"_a30":{"name":"吸收投资收到的现金","value":tjKongFun(grid[data.CASH_28INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"收到的其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_29INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"筹资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_30INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"偿还债务所支付的现金","value":tjKongFun(grid[data.CASH_31INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"分配股利、利润或偿付利息支付的现金","value":tjKongFun(grid[data.CASH_32INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"筹资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"筹资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_34INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"汇率变动对现金及现金等价物的影响","type":"title","value":tjKongFun(grid[data.CASH_35INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"现金及现金等价物净增加额","type":"title","value":tjKongFun(grid[data.CASH_36INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"加:期初现金及现金等价物余额","value":tjKongFun(grid[data.CASH_37INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"期末现金及现金等价物余额","type":"title","value":tjKongFun(grid[data.CASH_38INDEX],"_a40",year,oTjKong)},
	}
}
const getyyField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"经营活动产生的现金流量","type":"title","value":"--"},
			"_a1":{"name":"销售商品，提供劳务收到的现金","value":tjKongFun(grid[data.CASH_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"收到的税费返还","value":tjKongFun(grid[data.CASH_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"收到的其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"经营活动现金流入小计","value":tjKongFun(grid[data.CASH_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"购买商品，接受劳务支付的现金","value":tjKongFun(grid[data.CASH_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"支付给职工以及为职工支付的现金","value":tjKongFun(grid[data.CASH_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"支付的各项税费","value":tjKongFun(grid[data.CASH_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"支付的其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"经营活动现金流出小计","value":tjKongFun(grid[data.CASH_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"经营活动产生现金流量净额","value":tjKongFun(grid[data.CASH_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"投资活动产生的现金流量","type":"title","value":"--"},
			"_a12":{"name":"收回投资所收到的现金","value":tjKongFun(grid[data.CASH_11INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"取得投资收益所收到的现金","value":tjKongFun(grid[data.CASH_12INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"处置固定资产，无形资产和其他长期投资所收回的现金净额","value":tjKongFun(grid[data.CASH_13INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"处置子公司及其他营业单位收到的现金净额","value":tjKongFun(grid[data.CASH_14INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"收到的其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_15INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"投资活动现金流入小计","value":tjKongFun(grid[data.CASH_16INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"构建固定资产，无形资产和其他长期投资所支付的现金","value":tjKongFun(grid[data.CASH_17INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"投资所支付的现金","value":tjKongFun(grid[data.CASH_18INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"取得子公司及其他营业单位支付的现金净额","value":tjKongFun(grid[data.CASH_19INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"支付的其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_20INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"投资活动现金流出小计","value":tjKongFun(grid[data.CASH_21INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"投资活动产生的现金流量净额","value":tjKongFun(grid[data.CASH_22INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"筹资活动产生的现金流量","type":"title","value":"--"},
			"_a25":{"name":"吸收投资搜收到的现金","value":tjKongFun(grid[data.CASH_23INDEX],"_a25",year,oTjKong)},
			"_a26":{"name":"其中：子公司吸收小数股东投资收到的现金","value":tjKongFun(grid[data.CASH_24INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"取得借款收到的现金","value":tjKongFun(grid[data.CASH_25INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"收到其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_26INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"筹资活动现金流入小计","value":tjKongFun(grid[data.CASH_27INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"偿还债务支付的现金","value":tjKongFun(grid[data.CASH_28INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"分配股利，利润或偿付利息所支付的现金","value":tjKongFun(grid[data.CASH_29INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"其中：子公司支付给少数股东的股利，利润","value":tjKongFun(grid[data.CASH_30INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"支付其他与筹资活动有关的现金","value":tjKongFun(grid[data.CASH_31INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"筹资活动现金流出小计","value":tjKongFun(grid[data.CASH_32INDEX],"_a34",year,oTjKong)},
			"_a35":{"name":"筹资活动产生的现金流量净额","value":tjKongFun(grid[data.CASH_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"汇率变动对现金及现金等价物的影响","type":"title","value":"--"},
			"_a37":{"name":"汇率变动对现金及现金等物价的影响","value":tjKongFun(grid[data.CASH_34INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"现金及现金等价物净增加额","type":"title","value":"--"},
			"_a39":{"name":"现金及现金等价物的净增加额","value":tjKongFun(grid[data.CASH_35INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"期初现金及现金等价物余额","value":tjKongFun(grid[data.CASH_36INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"期末现金及现金等价物余额","value":tjKongFun(grid[data.CASH_37INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"补充资料","type":"title","value":tjKongFun(grid[data.CASH_38INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"净利润","value":tjKongFun(grid[data.CASH_39INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"加以下","type":"title","value":"--"},
			"_a45":{"name":"资产减值准备","value":tjKongFun(grid[data.CASH_40INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"固定资产折旧，油气资产折耗，生产性物资折旧","value":tjKongFun(grid[data.CASH_41INDEX],"_a46",year,oTjKong)},
			"_a47":{"name":"无形资产摊销","value":tjKongFun(grid[data.CASH_42INDEX],"_a47",year,oTjKong)},
			"_a48":{"name":"长期待摊费用摊销","value":tjKongFun(grid[data.CASH_43INDEX],"_a48",year,oTjKong)},
			"_a49":{"name":"处置固定资产，无形资产和其他长期资产的损失","value":tjKongFun(grid[data.CASH_44INDEX],"_a49",year,oTjKong)},
			"_a50":{"name":"财务费用","value":tjKongFun(grid[data.CASH_45INDEX],"_a50",year,oTjKong)},
			"_a51":{"name":"投资损失","value":tjKongFun(grid[data.CASH_46INDEX],"_a51",year,oTjKong)},
			"_a52":{"name":"递延所得税产减少","value":tjKongFun(grid[data.CASH_47INDEX],"_a52",year,oTjKong)},
			"_a53":{"name":"递延所得税负债增加","value":tjKongFun(grid[data.CASH_48INDEX],"_a53",year,oTjKong)},
			"_a54":{"name":"存货的减少","value":tjKongFun(grid[data.CASH_49INDEX],"_a54",year,oTjKong)},
			"_a55":{"name":"经营性应收项目的减少","value":tjKongFun(grid[data.CASH_50INDEX],"_a55",year,oTjKong)},
			"_a56":{"name":"经营性应付项目的增加","value":tjKongFun(grid[data.CASH_51INDEX],"_a56",year,oTjKong)},
			"_a57":{"name":"经营活动产生现金流量净额","value":tjKongFun(grid[data.CASH_52INDEX],"_a57",year,oTjKong)},
			"_a58":{"name":"现金期末余额","value":tjKongFun(grid[data.CASH_53INDEX],"_a58",year,oTjKong)},
			"_a59":{"name":"减：现金期初余额","value":tjKongFun(grid[data.CASH_54INDEX],"_a59",year,oTjKong)},
	}
}
const getyhField = function(grid,data,year,oTjKong){
	return {"_a0":{"name":"经营活动产生的现金流量","type":"title","value":"--"},
			"_a1":{"name":"客户存款和同业及其他金融机构存放款项净增加额","value":tjKongFun(grid[data.CASH_01INDEX],"_a1",year,oTjKong)},
			"_a2":{"name":"向中央银行借款净增加额","value":tjKongFun(grid[data.CASH_02INDEX],"_a2",year,oTjKong)},
			"_a3":{"name":"存放中央银行和同业款项及其他金融机构净减少额","value":tjKongFun(grid[data.CASH_03INDEX],"_a3",year,oTjKong)},
			"_a4":{"name":"拆入资金及卖出回购金融资产款净增加额","value":tjKongFun(grid[data.CASH_04INDEX],"_a4",year,oTjKong)},
			"_a5":{"name":"其中:拆入资金净增加额","value":tjKongFun(grid[data.CASH_05INDEX],"_a5",year,oTjKong)},
			"_a6":{"name":"收取的利息、手续费及佣金的现金","value":tjKongFun(grid[data.CASH_06INDEX],"_a6",year,oTjKong)},
			"_a7":{"name":"其中:收取利息的现金","value":tjKongFun(grid[data.CASH_07INDEX],"_a7",year,oTjKong)},
			"_a8":{"name":"收取手续费及佣金的现金","value":tjKongFun(grid[data.CASH_08INDEX],"_a8",year,oTjKong)},
			"_a9":{"name":"收到的其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_09INDEX],"_a9",year,oTjKong)},
			"_a10":{"name":"经营活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_10INDEX],"_a10",year,oTjKong)},
			"_a11":{"name":"客户贷款及垫款净增加额","value":tjKongFun(grid[data.CASH_11INDEX],"_a11",year,oTjKong)},
			"_a12":{"name":"存放中央银行和同业及其他金融机构款项净增加额","value":tjKongFun(grid[data.CASH_12INDEX],"_a12",year,oTjKong)},
			"_a13":{"name":"拆入资金及卖出回购金融资产款净减少额","value":tjKongFun(grid[data.CASH_13INDEX],"_a13",year,oTjKong)},
			"_a14":{"name":"其中:拆入资金净减少额","value":tjKongFun(grid[data.CASH_14INDEX],"_a14",year,oTjKong)},
			"_a15":{"name":"交易性金融资产净增加额","value":tjKongFun(grid[data.CASH_15INDEX],"_a15",year,oTjKong)},
			"_a16":{"name":"支付利息、手续费及佣金的现金","value":tjKongFun(grid[data.CASH_16INDEX],"_a16",year,oTjKong)},
			"_a17":{"name":"其中:支付利息的现金","value":tjKongFun(grid[data.CASH_17INDEX],"_a17",year,oTjKong)},
			"_a18":{"name":"支付手续费及佣金的现金","value":tjKongFun(grid[data.CASH_18INDEX],"_a18",year,oTjKong)},
			"_a19":{"name":"支付给职工以及为职工支付的现金","value":tjKongFun(grid[data.CASH_19INDEX],"_a19",year,oTjKong)},
			"_a20":{"name":"支付的各项税费","value":tjKongFun(grid[data.CASH_20INDEX],"_a20",year,oTjKong)},
			"_a21":{"name":"应收账款净增加额","value":tjKongFun(grid[data.CASH_21INDEX],"_a21",year,oTjKong)},
			"_a22":{"name":"支付其他与经营活动有关的现金","value":tjKongFun(grid[data.CASH_22INDEX],"_a22",year,oTjKong)},
			"_a23":{"name":"经营活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_23INDEX],"_a23",year,oTjKong)},
			"_a24":{"name":"经营活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_24INDEX],"_a24",year,oTjKong)},
			"_a25":{"name":"投资活动产生的现金流量","type":"title","value":"--"},
			"_a26":{"name":"收回投资收到的现金","value":tjKongFun(grid[data.CASH_25INDEX],"_a26",year,oTjKong)},
			"_a27":{"name":"取得投资收益收到的现金","value":tjKongFun(grid[data.CASH_26INDEX],"_a27",year,oTjKong)},
			"_a28":{"name":"收到其他与投资活动有关的现金","value":tjKongFun(grid[data.CASH_27INDEX],"_a28",year,oTjKong)},
			"_a29":{"name":"投资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_28INDEX],"_a29",year,oTjKong)},
			"_a30":{"name":"投资支付的现金","value":tjKongFun(grid[data.CASH_29INDEX],"_a30",year,oTjKong)},
			"_a31":{"name":"购建固定资产、无形资产和其他长期资产支付的现金","value":tjKongFun(grid[data.CASH_30INDEX],"_a31",year,oTjKong)},
			"_a32":{"name":"投资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_31INDEX],"_a32",year,oTjKong)},
			"_a33":{"name":"投资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_32INDEX],"_a33",year,oTjKong)},
			"_a34":{"name":"筹资活动产生的现金流量","type":"title","value":"--"},
			"_a35":{"name":"发行债券收到的现金","value":tjKongFun(grid[data.CASH_33INDEX],"_a35",year,oTjKong)},
			"_a36":{"name":"吸收投资所收到的现金","value":tjKongFun(grid[data.CASH_34INDEX],"_a36",year,oTjKong)},
			"_a37":{"name":"其中:子公司吸收少数股东投资收到的现金","value":tjKongFun(grid[data.CASH_35INDEX],"_a37",year,oTjKong)},
			"_a38":{"name":"筹资活动现金流入小计","type":"title","value":tjKongFun(grid[data.CASH_36INDEX],"_a38",year,oTjKong)},
			"_a39":{"name":"偿还债务支付的现金","value":tjKongFun(grid[data.CASH_37INDEX],"_a39",year,oTjKong)},
			"_a40":{"name":"分配股利、利润或偿付利息支付的现金","value":tjKongFun(grid[data.CASH_38INDEX],"_a40",year,oTjKong)},
			"_a41":{"name":"筹资活动现金流出小计","type":"title","value":tjKongFun(grid[data.CASH_39INDEX],"_a41",year,oTjKong)},
			"_a42":{"name":"筹资活动产生的现金流量净额","type":"title","value":tjKongFun(grid[data.CASH_40INDEX],"_a42",year,oTjKong)},
			"_a43":{"name":"汇率变动对现金及现金等价物的影响","type":"title","value":tjKongFun(grid[data.CASH_41INDEX],"_a43",year,oTjKong)},
			"_a44":{"name":"现金及现金等价物净增加额","type":"title","value":tjKongFun(grid[data.CASH_42INDEX],"_a44",year,oTjKong)},
			"_a45":{"name":"加:期初现金及现金等价物余额","value":tjKongFun(grid[data.CASH_43INDEX],"_a45",year,oTjKong)},
			"_a46":{"name":"期末现金及现金等价物余额","type":"title","value":tjKongFun(grid[data.CASH_44INDEX],"_a46",year,oTjKong)},
	}
}

export default {
	getJsonField:getJsonField
}