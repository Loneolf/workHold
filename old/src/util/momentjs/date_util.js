define(function(require, exports, module) {
	var getNowDateStr = function() {
		var myDate = new Date();
		var nowDate = myDate.getFullYear()+'-'+((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):myDate.getMonth()+1)+'-'+(myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate());
		return nowDate;
	}
	
	var getDateStr = function(myDate) {
		if(myDate && myDate instanceof Date){
			var nowDate = myDate.getFullYear()+'-'+((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):myDate.getMonth()+1)+'-'+(myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate());
			return nowDate;
		}
		return "";
	}
	
	exports.getNowDateStr = getNowDateStr;
	exports.getDateStr = getDateStr;
})