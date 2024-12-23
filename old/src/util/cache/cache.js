define(function(require, exports, module) {
	
	/**
	* read 读取缓存
	* @returns void
	* @author 白玉
	* @param {string} cacheName – 缓存的名字，可以是任意字符串
	* @param {number} expiredTimeMs – 缓存的过期时间，单位毫秒。如果按这个参数计算缓存过期了，则会在回调函数的参数中返回过期
	* @param {function} resultFunction - 回调函数格式为：resultFunction(isExist,isExpired,savedObject)
	* isExist：缓存是否存在
	* isExpired：缓存是否过期
	* savedObject：缓存对象
	*/
	function read(cacheName,expiredTimeMs, resultFunction) {
		H5TZT.readFileMesg(cacheName,
			function(data) {
				var isExist = true;
				if (!data) {
					isExist = false;
					resultFunction(isExist, true, null);
					return;
				}
	            
				var returnmsg = JSON.parse(decodeURIComponent(data));				
				var isExpired = isExpiredCache(expiredTimeMs, returnmsg.datatime);
				var resultObject = returnmsg.dataline;
	
				resultFunction(isExist, isExpired, resultObject);
				return;
			}
		);
	}
	
	/**
	* write 写缓存
	* @returns void
	* @author 白玉
	* @param {string} cacheName – 缓存的名字，可以是任意字符串
	* @param {object} object – 缓存对象
	*/
	function write(cacheName,object){
		var nowtime = new Date().getTime();
		var data = {
			"datatime": nowtime,
			"dataline": object
		}
		H5TZT.saveFileMesg(data, cacheName, 
			function(result) {
			}
		);
	}
	
	/**
    * write 清除缓存
    * @returns void
    * @author 白玉
    * @param {string} cacheName – 缓存的名字，可以是任意字符串
    */
    function clear(cacheName){
        var nowtime = new Date().getTime();
        var data = '';
        H5TZT.saveFileMesg(data, cacheName, 
            function(result) {
            }
        );
    }
	
	function isExpiredCache(expiredTimeMs, cacheTimeMs){
		var nowTime    = new Date().getTime();            //当前时间
		var expireTime = cacheTimeMs + expiredTimeMs;     //过期时间
		if (nowTime > expireTime) {
			return true;
		}
		else{
			return false;
		}
	}
	
	//EXPORT：
	exports.read  = read;
	exports.write = write;	
    exports.clear = clear; 
});

