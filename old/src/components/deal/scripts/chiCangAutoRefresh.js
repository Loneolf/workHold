import service_ptjy from '../../deal/service/trade/service_ptjy'

var fundAccount = '';

function getSwitchStatus(fnSuccess, fnFail) {
    if(fundAccount){
        try {
            var typeName = 'AutoRefresh' + fundAccount;
            var param = [typeName,''];
            var result = CiticsNative.NativeCall('getCSValueForKey',param) || '{}';
            console.log('自动刷新开关状态--', CiticsNative.NativeCall('getCSValueForKey',param));
            var res = JSON.parse(result);
            fnSuccess && fnSuccess(res.result);
            
        } catch(e) {
            console.log(e, '开关状态获取失败，默认关闭');
            fnFail && fnFail();
        }
    }
    else{
        getClientLocalMesg(function(oLocal){
            try {
                var typeName = 'AutoRefresh' + oLocal.FUNDACCOUNT;
                var param = [typeName,''];
                var result = CiticsNative.NativeCall('getCSValueForKey',param) || '{}';
                console.log('自动刷新开关状态--', CiticsNative.NativeCall('getCSValueForKey',param));
                var res = JSON.parse(result);
                fnSuccess && fnSuccess(res.result);
                
            } catch(e) {
                console.log(e, '开关状态获取失败，默认关闭');
                fnFail && fnFail();
            }
        }); 
    }
}

function isNoFareClient(khBranch, fnSuccess, fnFail){
    var baseParams = {
        sysNo: 'cs118',
        version: '1.0',
        functionNo: '005',
        extendJson: JSON.stringify({'branchNo': khBranch})
    }
    service_ptjy.require48230({
        path: 'ae',
        PostString: JSON.stringify(baseParams)
    }).then((oData) => {
        if (oData.ERRORNO < 0) {
            console.log('特殊营业部接口报错');
            fnFail && fnFail();  
            return;
        }
        try{
            var data = JSON.parse(oData.BINDATA);
            if (data && data.code == '0') {
                var isNoFareClient = true;
                if(data.data == '1'){  
                    fnSuccess && fnSuccess(isNoFareClient);
                }
                else if(data.data == '0'){
                    isNoFareClient = false;
                    fnSuccess && fnSuccess(isNoFareClient);
                }
                else{
                    fnFail && fnFail();
                }
            } else {
                console.warn(data.ERRORMESSAGE);
                fnFail && fnFail();
            }
        } catch(e){
            fnFail && fnFail();
        } 
    });
}

function getClientLocalMesg(fnSuccess, fnFail) {
    H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'KHBRANCH', 'fundaccount', 'tzttradeaccount', 'fund_account', 'USERCODE', 'tzttraderights'], function(oLocal){
        fnSuccess && fnSuccess(oLocal);
    });
}

function commissionModeCheck(fnSuccess, fnFail) {
    var baseParams = {
        sysNo: 'cs118',
        version: '1.0',
        functionNo: '002'
    }
    service_ptjy.require48230({
        path: 'ae',
        PostString: JSON.stringify(baseParams)
    }).then((oData) => {
        if (oData.ERRORNO < 0) {
            console.log('佣金接口报错');
            fnFail && fnFail();  
            return;
        }
        try{
            var data = JSON.parse(oData.BINDATA);
            if (data && data.code == '0') {
                if(data.data && data.data.has_set_brokerage != undefined){
                    var has_set_brokerage = String(data.data.has_set_brokerage);
                    fnSuccess && fnSuccess(has_set_brokerage);
                }
                else{
                    fnFail && fnFail();
                }
            } else {
                console.warn(data.ERRORMESSAGE);
                fnFail && fnFail();
            }
        } catch(e){
            fnFail && fnFail();
        } 
    });
}

function initAutoRefresh(fnSuccess, fnFail){
    getClientLocalMesg(function(oLocal){
        fundAccount = oLocal.FUNDACCOUNT;       
        // 客户有q权限——静态佣金，禁用持仓自动刷新
        if(oLocal.TZTTRADERIGHTS && oLocal.TZTTRADERIGHTS.indexOf('q') >= 0){
            console.log('q权限，默认关闭');
            fnFail && fnFail();
            return;
        }
        commissionModeCheck(function(has_set_brokerage){
            if(has_set_brokerage === '0') {
                console.log('当日佣金未调整');
                getSwitchStatus(function(switchStatus){
                    if(switchStatus) {
                        if(switchStatus === 'KAI'){
                            isNoFareClient(oLocal.KHBRANCH, function(isNoFareClient){
                                fnSuccess && fnSuccess(isNoFareClient);
                            }, function(){
                                fnFail && fnFail();
                            });
                        }
                        else{
                            fnFail && fnFail();
                        }
                    }
                    else {
                        isNoFareClient(oLocal.KHBRANCH, function(isNoFareClient){
                            fnSuccess && fnSuccess(isNoFareClient);
                        }, function(){
                            fnFail && fnFail();
                        });
                    }
                }, function(){
                    fnFail && fnFail();
                });
            } else {
                console.log('当日佣金调整客户');
                fnFail && fnFail();
            }
        }, function(){
            fnFail && fnFail();
        });
    });
}

function setSwitchStatus(switchStatus){
    if(fundAccount){
        try {
            var typeName = 'AutoRefresh' + fundAccount;
            var param = [typeName, switchStatus];
            CiticsNative.NativeCall('setCSValueForKey',param);
            
        } catch(e) {
            console.log(e, '开关状态设置失败');
        }
    }
    else{
        getClientLocalMesg(function(oLocal){
            try {
                var typeName = 'AutoRefresh' + oLocal.FUNDACCOUNT;
                var param = [typeName, switchStatus];
                CiticsNative.NativeCall('setCSValueForKey',param);
                
            } catch(e) {
                console.log(e, '开关状态设置失败');
            }
        }); 
    } 
}

export default {
    initAutoRefresh: initAutoRefresh,
    setSwitchStatus: setSwitchStatus
}
