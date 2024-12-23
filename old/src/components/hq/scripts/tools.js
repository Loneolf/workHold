define(function (require, exports, module) {
    function padding(num, length) {
        var str = num + '';
        for (var len = str.length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    var _Tool = {};
    _Tool.baoliuxiaoshu0 = function (value) {
        var num = +value;
        if (isNaN(num)) {
            num = 0;
        }
        return num.toFixed(0)
    };
    _Tool.baoliuxiaoshu2 = function (value) {
        var num = +value;
        if (isNaN(num)) {
            num = 0;
        }
        return num.toFixed(2)
    };
    _Tool.baoliuxiaoshu3 = function (value) {
        var num = +value;
        if (isNaN(num)) {
            num = 0;
        }
        return num.toFixed(3)
    };
    _Tool.baoliuxiaoshu4 = function (value) {
        var num = +value;
        if (isNaN(num)) {
            num = 0;
        }
        return num.toFixed(4)
    };
    _Tool.riqigeshihua = function (value) {
        var str = value + '';
        return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1年$2月$3日');
    };
    _Tool.shijiangeshihua = function (value) {
        var str = value + '';
        str = padding(str, 6);
        return str.replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2:$3');
    };
    _Tool.jiaoyisuo = function (value) {
        var result = '';
        if (~value.indexOf('SH')) {
            result = '上交所';
        } else {
            result = '深交所'
        }
        return result;
    };
    _Tool.changeCursorPos = function (inputId) {
        var inpObj = document.getElementById(inputId);
        if (inpObj.setSelectionRange) {
            inpObj.setSelectionRange(inpObj.value.length, inpObj.value.length);
        }
    };
    module.exports = _Tool;
});