import Vue from 'vue'
import aes from '~l/endecrypt/aes'
import browser from './browser'
import localService from '../serve/localService'
import { INIT_WEBVIEW_HEIGHT } from "./config"

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
const fmtDate = function(date, fmt) { //author: meizz
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
const fmtunit = function(num, digit, isunit, isFormat) {
	if(isunit !== 0) {
		isunit = 1;
	}
	var dig = digit || 0;
	if(num == '' || typeof num == 'undefined') {
		return '';
	}
	if(isNaN(num)) {
		return num;
	}
	num = num.toString();
	var arrNum = num.split('.');
	var arrln = arrNum[0].length;
	if(arrln >= 5 && arrln < 9) {
		return(format(num / 10000, dig) + (isunit == 0 ? '' : '万'));
	} else if(arrln >= 9) {
		return(format(num / 100000000, dig) + (isunit == 0 ? '' : '亿'));
	} else {
		if(isFormat) {
			return num;
		} else {
			return(format(num, dig));
		}
	}
}
const f10fmtunit = function(num, digit, isunit, isFormat) {
	if(isunit !== 0) {
		isunit = 1;
	}
	var dig = digit || 0;
	if(isNaN(num)) return num;
	if(typeof num == 'undefined' || (typeof num == 'string' && num == '')) return '--';
	num = num.toString();
	var arrNum = num.split('.');
	var arrln = arrNum[0].length;
	if(arrln >= 5 && arrln < 9) {
		return(toDecimal2(num / 10000, dig) + (isunit == 0 ? '' : '万'));
	} else if(arrln >= 9) {
		return(toDecimal2(num / 100000000, dig) + (isunit == 0 ? '' : '亿'));
	} else {
		if(isFormat) {
			return num;
		} else {
			return(toDecimal2(num, dig));
		}
	}
}
const format = function(num, dig) {
	//数字转换成小数两位
	//return Math.round(num*Math.pow(10,Number(dig)))/Math.pow(10,Number(dig));
	if(!num || isNaN(num)) return num;
	var f = parseFloat(num);
	var s = f.toString();
	var rs = s.indexOf('.');
	if(rs < 0 && dig > 0) {
		rs = s.length;
		s += '.';
	}
	while(s.length <= rs + Number(dig)) {
		s += '0';
	}
	if(rs >= 1 && (f.toString().length - rs > dig)) {

		if(Number(dig) > 0) {
			var l = (num.toString().indexOf('.')) + 1;
			s = num.toString().slice(0, l + Number(dig));
		} else {
			//s = Math.round(num*Math.pow(10,Number(dig)))/Math.pow(10,Number(dig));
			var wz = num.toString().indexOf('.');
			if(wz > 0) {
				s = num.toString().substr(0, wz);
			} else {
				s = num;
			}
		}

	}
	return s;
}
const getMonthBefor = function(n, newdate) { //获取前后几个月的日期，n=3,返回20141215
	var resultDate, yy, mm, dd;
	var currDate = new Date();
	yy = currDate.getFullYear();
	mm = currDate.getMonth() + 1;
	dd = currDate.getDate();
	if(newdate && newdate.length == 8) {
		newdate = newdate.toString();
		yy = parseInt(newdate.slice(0, 4));
		mm = parseInt(newdate.slice(4, 6));
		dd = parseInt(newdate.slice(6, 8));
	}
	var dt = new Date(yy, mm, dd);
	dt.setMonth(dt.getMonth() + n);
	if((dt.getFullYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
		dt = new Date(dt.getFullYear(), dt.getMonth(), 0);
		// dt = new Date(dt.getYear(), dt.getMonth(), 0);
	}
	var year = dt.getFullYear(),
		nMonth = dt.getMonth()+1;
	var month = (nMonth < 10) ? ("0" + nMonth) : nMonth;
	var days = (dt.getDate() < 10) ? ("0" + dt.getDate()) : dt.getDate();
	resultDate = year + String(month) + days;
	return resultDate
}

const manyDays = function(n, newDate) {
	n = parseInt(n);
	let d;
	if(newDate) {
		newDate = ('' + newDate).replace(/-/g, '/');
		d = new Date(newDate);
	} else {
		d = new Date();
	}
	let dd = d.setDate(d.getDate() + n);
	return strTodate(dd);
};
const getYTDS = function(o) { //20140915转换2014-09-15
	var n = String(o)
	var year = n.substr(0, 4),
		months = n.substr(4, 2),
		days = n.substr(6);
	return year + "-" + months + "-" + days
};
const strTodate = function(str) { //
	var startyear = 1970;
	var startmonth = 1;
	var startday = 1;
	var d, s, st;
	var sep = ":";
	d = new Date();
	d.setFullYear(startyear, startmonth, startday);
	d.setTime(0);
	d.setMilliseconds(str);
	s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	st = s.replace(/-$/, "").replace(/\b(\w)\b/g, "0$1").replace(/-/g, "");
	return st
};

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式
	var aDate, aDate2, oDate1, oDate2, iDays;
	sDate2 = sDate2 || getYTDS(manyDays(0));
	aDate = sDate1.replace(/-/g, '/');
	oDate1 = new Date(aDate).getTime(); //转换为12-18-2006格式
	aDate2 = sDate2.replace(/-/g, '/');
	oDate2 = new Date(aDate2).getTime();
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
	return iDays
}
//强制保留pos位小数
const toDecimal2 = function(x, pos) {
	pos = pos || 0;
	var f = parseFloat(x);
	if(isNaN(f)) {
		return x;
	}
	var f = Math.round(x * Math.pow(10, pos)) / Math.pow(10, pos);
	var s = f.toString();
	var rs = s.indexOf('.');

	if(pos) {
		if(rs < 0) {
			rs = s.length;
			s += '.';
		}
	}
	while(s.length <= rs + pos) {
		s += '0';
	}

	if(rs > -1 && s.split('.')[1].length > pos) {
		s = Number(s).toFixed(pos)
	}
	return s;
}

//强制保留pos位小数
const toDecimalPK = function(x, pos,n) {
	pos = pos || 0;
	var f = parseFloat(x);
	if(isNaN(f)) {
		return x;
	}
	if(!f){
		return '--'
	}
	var f = Math.round(x * Math.pow(10, pos)) / Math.pow(10, pos);
	var s = f.toString();
	var rs = s.indexOf('.');

	if(pos) {
		if(rs < 0) {
			rs = s.length;
			s += '.';
		}
	}
	while(s.length <= rs + pos) {
		s += '0';
	}

	if(rs > -1 && s.split('.')[1].length > pos) {
		s = Number(s).toFixed(pos)
	}
	if(n){
		return s+n
	}
	return s;
}
const numTosize = function(num, pos) {
	if(!num) {
		return num;
	}
	pos = pos || 2;
	var floatNum = Number.parseFloat(num);
	var f = 1;
	if(isNaN(floatNum)) {
		return num;
	}
	if(floatNum < 0) {
		f = -1;
		floatNum = Math.abs(floatNum);
	}
	if(floatNum > 10000 && floatNum < 100000000) {
		return toDecimal2(floatNum / 10000 * f, pos) + '万'
	}

	if(floatNum > 100000000) {
		return toDecimal2(floatNum / 100000000 * f, pos) + '亿'
	}
	return floatNum * f;
};

const formatTimeLable = function(datetime, StockIndex) {
	StockIndex = '' + StockIndex;
	datetime = '' + datetime;
	switch(StockIndex) {
		case '1': //03021435
		case '2': //03021435
		case '3':
		case '4': //02291345
		case '9': //02241100
			{
				if(datetime.length == 7) {
					datetime = '0' + datetime;
				}
				var month = datetime.substring(0, 2);
				var date = datetime.substring(2, 4);
				var hour = datetime.substring(4, 6);
				var minute = datetime.substring(6, 8);

				return month + "/" + date + " " + hour + ":" + minute;
				break;
			}
		default:
			{
				if(datetime.length == 8) {
					var year = datetime.substring(0, 4);
					var month = datetime.substring(4, 6);
					var date = datetime.substring(6, 8);
					return year + "/" + month + "/" + date;
				}
				break;
			}
	}
	return datetime;
}

const addcont = function(str, index, ZZPINDEX, DATEFORMINDEX) {
	var numlength = str.replace(/\D/g, '').length;
	if(str.indexOf('.') == 0 && numlength != 0) {
		return '0' + str;
	} else {
		if(!ZZPINDEX || !index) {
			return dateForm(str, index, DATEFORMINDEX);
		}
		var arrIndex = ZZPINDEX.split(','),
			arrNum = [],
			arrSuo = [];
		for(var i = 0; i < arrIndex.length; i++) {
			arrNum[i] = arrIndex[i].split('|')[0];
			arrSuo[i] = arrIndex[i].split('|')[1];
		}
		if(index) {
			var suoindex = arrNum.indexOf(index);
			if(suoindex >= 0) {
				return unit(str, arrSuo[suoindex]);
			} else {
				return dateForm(str, index, DATEFORMINDEX);
			}
		} else {
			return dateForm(str, index, DATEFORMINDEX);
		}
	}
}
const unit = function(num, digit) {
	var dig = digit || 0;
	if(num == '' || typeof num == 'undefined') {
		return '';
	}
	if(isNaN(num)) {
		return num;
	}
	var arrNum = num.split('.');
	var arrln = arrNum[0].length;
	if(!digit) {
		return num;
	}
	if(arrln >= 6 && arrln < 9) {
		return(format(num / 10000, dig) + '万');
	} else if(arrln >= 9) {
		return(format(num / 100000000, dig) + '亿');
	} else {
		return(format(num, dig));
	}
}

const setCookie = function(a) {
	var b = new Date;
	b.setTime(+b + 15552e6);
	document.cookie = "acitve_phone_cookie=" + escape(a) + ";expires=" + b.toGMTString()
};
const getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
};
const setLocalStorage = function(obj) {
	for(var n in obj) {
		// window.localStorage[n] = obj[n];
		var val = obj[n];
		if(typeof val == 'object') {
			val = JSON.stringify(val);
		}
		setLStorageInfo(n, val);
	}
};

function setLStorageInfo(key, val) {
	val = null != val ? val : "";
	var obj = {
		value: val,
		time: 0
	};
	try {
		obj = JSON.stringify(obj);
		var e = aes.enc.Utf8.parse("iloveyou"),
			f = aes.enc.Utf8.parse(obj),
			g = aes.enc.Utf8.parse("iloveyou"),
			h = aes.AES.encrypt(f, e, {
				iv: g,
				mode: aes.mode.CBC
			});
		obj = h.toString()
	} catch(i) {}
	try {
		window.localStorage.setItem(key, obj)
	} catch(i) {
		$.alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！")
	}
}
const getLocalStorage = function(array) {
	var obj = {};
	if(array.indexOf('selfstocklist') > -1) {
		array.push('tztZXlist');
	}
	array.forEach((item, index) => {
		obj[item] = getLStorageInfo(item);
	});
	if('tztZXlist' in obj) {
		obj.selfstocklist = obj.tztZXlist;
	}
	return obj
};

function getLStorageInfo(key) {
	var val = null;
	try {
		val = window.localStorage.getItem(key)
	} catch(d) {
		return $.alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！"), null
	}
	if(null === val || "null" === val || "" === val) return val;
	try {
		var e = aes.enc.Utf8.parse("iloveyou"),
			f = aes.enc.Utf8.parse("iloveyou"),
			g = aes.enc.Base64.parse(val),
			h = aes.AES.decrypt({
				ciphertext: g
			}, e, {
				iv: f,
				mode: aes.mode.CBC
			});
		val = "" === h.toString(aes.enc.Utf8) && "" !== c ? JSON.stringify({
			time: 0,
			value: window.localStorage.getItem(key)
		}) : h.toString(aes.enc.Utf8)
	} catch(d) {
		val = JSON.stringify({
			time: 0,
			value: window.localStorage.getItem(key)
		})
	}
	var i = null;
	try {
		val = JSON.parse(val);
		i = val.hasOwnProperty("time") && val.hasOwnProperty("value") ? val.value : val
	} catch(d) {
		0 === d.message.indexOf("Unexpected token") && (i = val)
	}
	return i
}
const setSessionStorage = function(obj) {
	for(var n in obj) {
		var val = obj[n];
		if(typeof val == 'object') {
			val = JSON.stringify(val);
		}
		// window.sessionStorage[n] = val;
		setSStorageInfo(n, val);
	}
};

function setSStorageInfo(key, val) {
	val = null != val ? val : "";
	var obj = {
		value: val,
		time: 0
	};
	try {
		obj = JSON.stringify(obj);
		var f = aes.enc.Utf8.parse("iloveyou"),
			g = aes.enc.Utf8.parse(obj),
			h = aes.enc.Utf8.parse("iloveyou"),
			i = aes.AES.encrypt(g, f, {
				iv: h,
				mode: aes.mode.CBC
			});
		obj = i.toString();
	} catch(j) {}
	try {
		window.sessionStorage.setItem(key, obj);
	} catch(j) {
		$.alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！")
	}
}
const getSessionStorage = function(array) {
	var obj = {};
	array.forEach((item, index) => {
		obj[item] = getSStorageInfo(item);
	});
	return obj
};

function getSStorageInfo(key) {
	var val = null;
	try {
		val = window.sessionStorage.getItem(key); //读取session的指
	} catch(d) {
		return $.alert("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持sessionStorage！"), null
	}
	if(null === val || "null" === val || "" === val) return val;
	try {
		var e = aes.enc.Utf8.parse("iloveyou"),
			f = aes.enc.Utf8.parse("iloveyou"),
			g = aes.enc.Base64.parse(val),
			h = aes.AES.decrypt({
				ciphertext: g
			}, e, {
				iv: f,
				mode: aes.mode.CBC
			});
		val = "" === h.toString(aes.enc.Utf8) && "" !== c ? JSON.stringify({
			time: 0,
			value: window.sessionStorage.getItem(key)
		}) : h.toString(aes.enc.Utf8)
	} catch(d) {
		val = JSON.stringify({
			time: 0,
			value: window.sessionStorage.getItem(key)
		})
	}
	var i = null;
	try {
		val = JSON.parse(val);
		i = val.hasOwnProperty("time") && val.hasOwnProperty("value") ? val.value : val
	} catch(d) {
		0 === d.message.indexOf("Unexpected token") && (i = val)
	}
	return i
}
const removeSessionStorage = function(array) {
	array.forEach((item, index) => {
		window.sessionStorage.removeItem(item);
	});
};
const dateForm = function(str, index, dateform) {
	if(!dateform || !index) {
		return str;
	}
	var arrIndex = dateform.split(','),
		arrNum = [],
		arrSuo = [];
	for(var i = 0; i < arrIndex.length; i++) {
		arrNum[i] = arrIndex[i].split('|')[0];
		arrSuo[i] = arrIndex[i].split('|')[1];
	}
	var suoindex = arrNum.indexOf(index);
	if(suoindex >= 0) {
		if(arrSuo[suoindex] && arrSuo[suoindex].indexOf('yyyy') == '0') {
			var s = arrSuo[suoindex].replace(/yyyy/g, '$1').replace(/mm/g, '$2').replace(/dd/g, '$3');
			return str.replace(/\-/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/i, s);
		} else if(arrSuo[suoindex] && arrSuo[suoindex].indexOf('hh') == '0') {
			if(str.length == 5 || str.length == 7) {
				str = '0' + str;
			}
			var s = arrSuo[suoindex].replace(/hh/g, '$1').replace(/mm/g, '$2').replace(/ss/g, '$3');
			return str.replace(/\:/g, '').substr(0, 6).replace(/^(\d{2})(\d{2})(\d{2})$/i, s);
		} else {
			return str;
		}
	} else {
		return str;
	}
};

const getUrlParameter = function(parameterName, str) {
	//获取url参数值
	var reg = new RegExp("(^|&|\\?)" + parameterName + "=([^&]*)(&|$)", "i"),
		arr, arr1;
	if(str) {
		arr = str.match(reg);
		arr1 = str.match(reg);
	} else {
		arr = location.search.substr(1).match(reg);
		arr1 = location.hash.substr(2).match(reg);
	}
	if(arr) {
		return arr[2];
	} else if(arr1) {
		return arr1[2];
	} else return null;
};

/*@作用 将TZT.js里面的chooseTime对象拿过来用
 */
const styleTime = {
	manyDays: function(n,sDate) {//当天往后加减n天，比如当天是20140915 n=3 20140918
        var d = new Date,days,dd;
        if(typeof sDate == 'string'){
            sDate = sDate.replace(/-/g,'');
            d = new Date(sDate.substr(0,4),sDate.substr(4,2)-1,sDate.substr(6,2),'00','00','00');
        }else if(typeof sDate == 'object'){
            d = sDate;
        }
        dd = d.setDate(d.getDate() + n);
        return this.strTodate(dd)
    },
    manyMonths: function(n,sDate) {//当天往后加减n月，比如当天是20140915 n=3
        var d = new Date,days,dd;
        if(typeof sDate == 'string'){
            sDate = sDate.replace(/-/g,'');
            d = new Date(sDate.substr(0,4),sDate.substr(4,2)-1,sDate.substr(6,2),'00','00','00');
        }else if(typeof sDate == 'object'){
            d = sDate;
        }
        dd = d.setMonth(d.getMonth() + n);
        return this.strTodate(dd)
    },
    manyYears: function(n,sDate) {//当天往后加减n年，比如当天是20140915 n=3
        var d = new Date,days,dd;
        if(typeof sDate == 'string'){
            sDate = sDate.replace(/-/g,'');
            d = new Date(sDate.substr(0,4),sDate.substr(4,2)-1,sDate.substr(6,2),'00','00','00');
        }else if(typeof sDate == 'object'){
            d = sDate;
        }
        dd = d.setYear(d.getFullYear() + n);
        return this.strTodate(dd)
    },
    strTodate: function(str) {//
        var startyear = 1970;
        var startmonth = 1;
        var startday = 1;
        var d, s, st;
        var sep = ":";
        d = new Date();
        d.setFullYear(startyear, startmonth, startday);
        d.setTime(0);
        d.setMilliseconds(str);
        s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        st = s.replace(/-$/, "").replace(/\b(\w)\b/g, "0$1").replace(/-/g, "");
        return st
    },
	getMonthBefor: function(n, newdate) { //获取前后几个月的日期，n=3,返回20141215
		var resultDate, yy, mm, dd;
		var currDate = new Date();
		yy = currDate.getFullYear();
		mm = currDate.getMonth() + 1;
		dd = currDate.getDate();
		if(newdate && newdate.length == 8) {
			newdate = newdate.toString();
			yy = parseInt(newdate.slice(0, 4));
			mm = parseInt(newdate.slice(4, 6));
			dd = parseInt(newdate.slice(6, 8));
		}
		var dt = new Date(yy, mm, dd);
		dt.setMonth(dt.getMonth() + n);
		if((dt.getFullYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
			dt = new Date(dt.getFullYear(), dt.getMonth(), 0);
			// dt = new Date(dt.getYear(), dt.getMonth(), 0);
		}
		var year = dt.getFullYear();
		var month = (dt.getMonth() < 10) ? ("0" + dt.getMonth()) : dt.getMonth();
		var days = (dt.getDate() < 10) ? ("0" + dt.getDate()) : dt.getDate();
		resultDate = year + String(month) + days;
		return resultDate
	},
	aDays: function(n) { //n=3返回前后三天数组[20140915,20140916,20140917]
		var arrays = [],
			i = 1,
			num = Math.abs(n);
		if(n > 0) {
			for(i; i <= num; i++) {
				arrays.push(this.manyDays(i))
			}
		} else {
			for(i; i <= num; i++) {
				arrays.push(this.manyDays(-i))
			}
		}
		return arrays
	},
	getYTD: function(n) { //20140915转换2014年09月15日
		var year = n.substr(0, 4),
			months = n.substr(4, 2),
			days = n.substr(6);
		return year + "年" + months + "月" + days + "日"
	},
	getYTDS: function(n) { //20140915转换2014-09月-日
		var year = n.substr(0, 4),
			months = n.substr(4, 2),
			days = n.substr(6);
		return year + "-" + months + "-" + days
	},
	DateDiff: function(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式 时间相差多少天
		var aDate, oDate1, oDate2, iDays;
		var now = new Date();
		if(!sDate1) {
			sDate1 = this.dayChange(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate());
		}
		if(sDate1.indexOf('-') < 0) {
			sDate1 = this.getYTDS(sDate1);
		}
		if(!sDate2) {
			sDate2 = this.dayChange(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate());
		}
		if(sDate2.indexOf('-') < 0) {
			sDate2 = this.getYTDS(sDate2);
		}
		aDate = sDate1.split("-");
		oDate1 = (new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2])).getTime(); //转换为12-18-2002格式
		aDate = sDate2.split("-");
		oDate2 = (new Date(aDate[0] + '/' + aDate[1] + '/' + aDate[2])).getTime();
		iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
		return iDays
	},
	dayChange: function(yymmdd) { //yyyy-mm-dd 转换成 yyyymmdd
		var days = yymmdd.split('-');
		if(days.length > 1) {
			return days[0] + (days[1] <= 9 ? '0' + parseFloat(days[1]) : days[1]) + (days[2] <= 9 ? '0' + parseFloat(days[2]) : days[2])
		} else {
			return yymmdd;
		}
	},
	getDay: function(date) { //根据日期返回周几
		var now = new Date();
		if(date == 'now') {
			date = this.dayChange(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate());
		}
		var dateg = this.getYTDS(date);
		var ndate = dateg.split('-');
		if(ndate.length > 1) {
			var weekday = new Array(7);
			weekday[0] = "日";
			weekday[1] = "一";
			weekday[2] = "二";
			weekday[3] = "三";
			weekday[4] = "四";
			weekday[5] = "五";
			weekday[6] = "六";
			if(ndate.length == '2') {
				ndate = ndate.unshift('');
			}

			var nowYear = ndate[0] == '' ? now.getFullYear() : ndate[0];
			var time = nowYear + '/' + ndate[1] + '/' + ndate[2];
			var ssdate = new Date(time); //2014,05,11
			var index = ssdate.getDay();
			if(weekday[index] != undefined) {
				return '周' + weekday[index];
			} else {
				return '';
			}
		} else {
			return '';
		}
	},
	timeNow: function(date, sJjf) {
		var oNow = (!!date ? date : (new Date())),
			oMoment = {};
		//日期
		oMoment.year = oNow.getFullYear();
		oMoment.month = doubles(oNow.getMonth() + 1);
		oMoment.day = doubles(oNow.getDate());
		oMoment.week = oNow.getDay();
		oMoment.date = oMoment.year.toString() + (!!sJjf ? sJjf : '') + oMoment.month + (!!sJjf ? sJjf : '') + oMoment.day;
		//时间
		oMoment.hours = doubles(oNow.getHours());
		(oMoment.hours == 0) && (oMoment.hours = 24);
		oMoment.minutes = doubles(oNow.getMinutes());
		oMoment.seconds = doubles(oNow.getSeconds());
		oMoment.times = oMoment.hours + oMoment.minutes + oMoment.seconds;
		oMoment.hmTimes = oNow.getTime();

		//console.log(oMoment);
		return oMoment;
		//一位数变为两位数
		function doubles(num) {
			var sNum = num.toString();
			(sNum.length < 2) && (sNum = "0" + sNum);
			return sNum;
		}
	}
}

const hqF10Uint = function(number,formatType){
	let fsFlag = false;
    number = parseFloat(number);
    if(number<0){
      number = number*-1;
      fsFlag = true;
    } 
    if(number>=1000000000000){ //万亿
        let n = (number/1000000000000),
            nLen = (n+'').split('.')[0].length;
        if(nLen==4){
          return (!!fsFlag?(n*-1):n).toFixed(0) + "万亿";
        }else if(nLen==3){
          return (!!fsFlag?(n*-1):n).toFixed(1) + '万亿';
        }else if(nLen==1){
          return (!!fsFlag?(n*-1):n).toFixed(3) + '万亿';
        }else{
          return (!!fsFlag?(n*-1):n).toFixed(2) +'万亿';
        }
    }else if(number>=100000000 && number<1000000000000){ //亿
        let n = (number/100000000),
            nLen = (n+'').split('.')[0].length;
        if(nLen==4){
          return (!!fsFlag?(n*-1):n).toFixed(0) + "亿";
        }else if(nLen==3){
          return (!!fsFlag?(n*-1):n).toFixed(1) + '亿';
        }else if(nLen==1){
          return (!!fsFlag?(n*-1):n).toFixed(3) + '亿';
        }else{
          return (!!fsFlag?(n*-1):n).toFixed(2) +'亿';
        }
    }else if(number > 10000 && number < 100000000){
        let n = (number/10000),
            nLen = (n+'').split('.')[0].length;
        if(nLen==4){
          return (!!fsFlag?(n*-1):n).toFixed(0) + "万";
        }else if(nLen==3){
          return (!!fsFlag?(n*-1):n).toFixed(1) + '万';
        }else if(nLen==1){
          return (!!fsFlag?(n*-1):n).toFixed(3) + '万';
        }else{
          return (!!fsFlag?(n*-1):n).toFixed(2) + '万';
        }
    }else{
        let n = number,
            nLen = (n+'').split('.')[0].length,
            sResult = ''
        if(nLen==4){
          sResult = (!!fsFlag?(n*-1):n).toFixed(0);
        }else if(nLen==3){
          sResult = (!!fsFlag?(n*-1):n).toFixed(1);
        }else if(nLen==1){
          sResult = (!!fsFlag?(n*-1):n).toFixed(3);
        }else{
          sResult = (!!fsFlag?(n*-1):n).toFixed(2);
        }
        if(formatType == 1 && !isNaN(sResult)) return (!!fsFlag?(n*-1):n).toFixed(2)+'%';
        if(formatType == 2 && !isNaN(sResult)) return (!!fsFlag?(n*-1):n).toFixed(2)+'天';
        if(formatType == 3 && !isNaN(sResult)) return (!!fsFlag?(n*-1):n).toFixed(2)+'次';
        if(formatType == 9 && !isNaN(sResult)) return sResult+'元';
        
        return sResult;
    }
}

/**
 * [getStringWidth 获取字符宽度]
 * @param  {[String} str 字符宽度
 */
const getStringWidth = function(str){
	let ln = str.length,
		width = ln;
    for(var i=0;i<ln;i++){
        if(str.charCodeAt(i)>=57){
            width++;
        }
    }
    return width;
}

 /**
 * [getJiduTextFun 获取对应季度的文字]
 * @param  {String} monthDay 月份
 * @param  {String} year     年
 * @return {String}          返回字符串
 */
const getJiduTextFun = function(monthDay,year){
    if(monthDay == '12-31' || monthDay == '12-30'){
        return year+'年年报';
    }else if(monthDay == '09-30'){
        return year+'年三季报';
    }else if(monthDay == '06-30'){
        return year+'年中报';
    }else if(monthDay == '03-31' || monthDay == '03-30'){
        return year+'年一季报';
    }else if(!!monthDay){
        return year+monthDay.replace(/-/g,'');
    }else{
        return '--';
    }
}

const extend = function(){
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if ( typeof target !== "object" && !$.isFunction(target) ) {
        target = {};
    }
    if ( length === i ) {
        target = this;
        --i;
    }
    for ( ; i < length; i++ ) {
        if ( (options = arguments[ i ]) != null ) {
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];
                if ( target === copy ) {
                    continue;
                }
                if ( deep && copy && ( $.isPlainObject(copy) || (copyIsArray = $.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && $.isArray(src) ? src : [];
                    } else {
                        clone = src && $.isPlainObject(src) ? src : {};
                    }
                    target[ name ] = TZT.extend( deep, clone, copy );
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }
    return target;
}

 /**
 * 设置webView的高度
 * @param  {number|String} height 高度
 */
  const setWebviewHeight = function(height) {
	// 非webbview 和 iOS直接return
	if (!browser.browser.versions.webview || $.device.os !== 'ios') return
	localService.readLocalMesg(["tztwkwebview"]).then((data)=>{
		// TZT是挂在在Vue的prototype上，所以用Vue.prototype.$TZT调用设置高度函数
		Vue.prototype.$TZT.setContentParams(data, {contentheight: `${height}`});
	});
}

// ios，判断是否设置webView高度，低于800的初始值，不设置webView 高度
	const notSetHeightIos = function (contentheight) {
		return $.device.os === 'ios' && contentheight < INIT_WEBVIEW_HEIGHT
	}

export default {
	format: format,
	fmtunit: fmtunit,
	f10fmtunit:f10fmtunit,
	fmtDate: fmtDate,
	DateDiff: DateDiff,
	getMonthBefor: getMonthBefor,
	toDecimal2: toDecimal2,
	numTosize: numTosize,
	manyDays: manyDays,
	getYTDS: getYTDS,
	dateForm: dateForm,
	getUrlParameter: getUrlParameter,
	formatTimeLable: formatTimeLable,
	setCookie: setCookie,
	getCookie: getCookie,
	setLocalStorage: setLocalStorage,
	getLocalStorage: getLocalStorage,
	setSessionStorage: setSessionStorage,
	getSessionStorage: getSessionStorage,
	removeSessionStorage: removeSessionStorage,
	styleTime: styleTime,
	addcont: addcont,
	hqF10Uint: hqF10Uint,
	getStringWidth:getStringWidth,
	getJiduTextFun:getJiduTextFun,
	extend:extend, //深copy
	toDecimalPK:toDecimalPK, 
	setWebviewHeight:setWebviewHeight, 
	notSetHeightIos:notSetHeightIos, 
}