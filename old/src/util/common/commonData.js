import service_information_often from '../../components/information/service/common/service_information_often'

/**
 * 用户反馈接口
 * @param {String} message 
 * @param {String} SDKLog 
 */
function feedBack(message, SDKLog) {
    if (typeof message != 'string') {
        return;
    }
    if (typeof SDKLog != 'string') {
        SDKLog = '';
    }
    var deviveInfo = '';
    if (typeof NativeBridge != 'undefined') {
        try {
            var result = CiticsNative.NativeCall('getDeviceInfo') || '{}';
            var res = JSON.parse(result);
            deviveInfo = res.result;           
        } catch(e) {
            deviveInfo = '';
        }
    }

    var oSend = {
        function: '11001',
        SDKLog: SDKLog,
        message: message.slice(0, 100),
        deviceInfo: typeof deviveInfo == 'string' ? deviveInfo : ''
    };
    service_information_often.require49001(oSend).then((data)=>{
        if(data.ERRORNO < 0){
            console.error(oSend);
            return;
        }
        console.log('提交成功', oSend);
    });
}

export default {
    feedBack: feedBack
}

