/**
 * Created by yanghuiyu on 2023/06/01.
 */
import service_common from '../common/service_common';
import cache from '../../../../util/cache/cacheDecorator.js';
import { cacheTime } from '../../../../util/cache/config.js';

/**
 * 对应后端涉及到普通交易的 API
 */
class service_otc {
    // 获取OTC session
    static huoQuOTCToken(obj, fnSuccess, fnFail) {
        let Param1 = {
            FuncNo: 'Sign',
            Data: {
                IDTIUSER: 'citicsotc',
                IDTIPASS: 'citicsotc',
                Source: '0',
                UserID: '($usercode)',
            },
        };
        $.extend(Param1, obj);
        let oSendData = {
            action: '6130',
            Param1: JSON.stringify(Param1),
            Maxcount: 1,
            Channel: '7',
            IsCheckToken: 1,
        };
        return service_common
            .getData({
                oSendData: oSendData,
                isload: false,
            })
            .then((oData) => {
                if (oData.ERRORNO != '0') {
                    // TS錯誤
                    alert(oData.ERRORMESSAGE);
                    fnFail && fnFail();
                    return;
                }
                var sessionID = service_otc._analysisSessionID(oData);
                if (sessionID == undefined) {
                    fnFail && fnFail();
                    return;
                }
                fnSuccess && fnSuccess(sessionID);
            });
    }

    // 20190610改接口 6130 T10013
    static huoQuOTCChiCang(obj, fnSuccess, fnFail) {
        var Param1 = {
            FuncNo: 'T10013',
            Data: {
                CUST_CODE: '($usercode)',
                CUACCT_CODE: '($fundaccount)',
            },
        };
        
        let oSendData = {
            action: '6130',
            Param1: JSON.stringify(Param1),
            Maxcount: 1,
            Channel: '7',
            IsCheckToken: 1,
        };
        oSendData.SessionID = obj.SessionID;
        return service_common
            .getData({
                oSendData: oSendData,
                isload: false,
            })
            .then((oData) => {
                var OTCdata = {};
                var res = {};
                res.OTCXiuZhengRawData = oData;
                if (oData.ERRORNO != '0') {
                    // TS錯誤
                    OTCdata.isSuccess = false;
                    alert(oData.ERRORMESSAGE);
                    fnFail && fnFail();
                    return;
                }
                oData = service_otc._analysisT10013(oData);
                if (oData == undefined) {
                    fnFail && fnFail();
                    return;
                }
                res.value = parseFloat(oData.OTCPositionList) || 0;
                OTCdata.OTCChiCang = res;
                fnSuccess && fnSuccess(OTCdata);
            });
    }

    // 获取OTC修正 6130 T10012
    // static huoQuOTCXiuZheng(obj, fnSuccess, fnFail) {
    //     // 20190708 otc接口升级 L2611326 市值包含在途
    //     OTCdata.OTCXiuZheng = {
    //         value: 0,
    //         OTCXiuZhengList: [],
    //     };
    //     OTCdata.isSuccess = true;
    //     fnSuccess && fnSuccess(OTCdata);
    // }

    huoQuOTCchiangHeOTCxiuZheng(obj, fnSuccess, fnFail) {
        service_otc.huoQuOTCToken({}, function (sessionID) {
            service_otc.huoQuOTCChiCang({SessionID: sessionID}, function (OTCdata) {
                OTCdata.OTCXiuZheng = {
                    value: 0,
                    OTCXiuZhengList: [],
                };
                OTCdata.isSuccess = true;
                fnSuccess && fnSuccess(OTCdata);
            }, fnFail);
        }, fnFail);
    }

    huoQuOTCchiangHeOTCxiuZhengWithCache(oSendData, fnSuccess, fnFail){
        cache.fetchNetDataWithCache('OTCchiangHeOTCxiuZheng', parseInt(cacheTime.OTCchiangHeOTCxiuZheng), this.huoQuOTCchiangHeOTCxiuZheng, oSendData, fnSuccess, fnFail, false);
    }

    static _analysisSessionID(rawData) {
        if (rawData == undefined) {
            return;
        }
        var _sessionID;
        var data = JSON.parse(rawData['RESULT1']);
        if (data[0] && data[0].length === 5 && data[0][0] != 0) {
            if (data[0][1].indexOf('后台统一认证失败') >= 0) {
            } else {
                console.log(data[0][1]);
            }
            alert(data[0][1]);
            return;
        }
        var jData = {};
        jData.count = data[0][3];
        jData.data = [];
        jData.title = [];
        var title = data[2];
        var jTle = {};
        for (var j = 0; j < title.length; j++) {
            jTle[title[j][1]] = title[j][2];
        }
        jData.title.push(jTle);
        for (var j = 3; j < data.length; j++) {
            var index = data[1];
            var lists = data[j];
            var jObj = {};
            for (var k = 0; k < lists.length; k++) {
                var list = lists[k];
                jTle[title[k][1]] = title[k][2];
                jObj[index[k]] = list;
            }
            jData.data.push(jObj);
        }
        jData.count = jData.data.length;

        if (jData.RESULT1) {
            _sessionID = jData.RESULT1[0].SSO;
        } else {
            _sessionID = jData.data[0].SSO;
        }
        return _sessionID;
    }

    static _analysisT10013(rawData) {
        var data = {};
        var _rawData = JSON.parse(rawData.RESULT1) || {};
        data.middleWareResCode = rawData.ERRORNO || 999;
        if (_rawData[0][0] == '-1' || _rawData[0][0] != 0) {
            alert(_rawData[0][1]);
            return undefined;
        }
        for (var i = 0; i < _rawData.length; i++) {
            for (var j = 0; j < _rawData[i].length; j++) {
                if (_rawData[i][j] == 'OTC_PROD') {
                    data.OTCPositionList = _rawData[i][0];
                }
            }
        }
        return data;
    }
}

// 实例化后再导出
export default new service_otc();
