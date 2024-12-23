define(function(require, exports, module) {
	
	//接口调用失败后，可以重新调用的时间间隔
	var failTimeMultiInterval = 0.5;
	
	/**
	* read 读取缓存
	* @returns void
	* @author 白玉
	* @modify 武文斌
	* @param {string} cacheName – 缓存的名字，可以是任意字符串
	* @param {number} expiredTimeMs – 缓存的过期时间，单位毫秒。如果按这个参数计算缓存过期了，则会在回调函数的参数中返回过期
	* @param {function} resultFunction - 回调函数格式为：resultFunction(isExist,isExpired,savedObject)
	* isExist：缓存是否存在，true缓存存在 false缓存不存在
	* isExpired：缓存是否过期，ture缓存过期，false缓存没有过期
	* savedObject：缓存对象
	*/
	function read(cacheName,expiredTimeMs, preFailTimeName, resultFunction) {
		var mapName = [];
		mapName.push(cacheName);
		if (preFailTimeName && (typeof preFailTimeName=='string') && preFailTimeName.length != 0){
			mapName.push(preFailTimeName);
			mapName.push(preFailTimeName+'data');
		}
		H5TZT.readMapMesg(mapName,
			function(data) {
				//获取调用接口失败时间
				if (preFailTimeName && data[preFailTimeName.toUpperCase()]){
					var preFailTime = data[preFailTimeName.toUpperCase()];
					var preFailTimeData = data[(preFailTimeName+'data').toUpperCase()];
				}
				var isExist = true;
				var cacheData = data[cacheName.toUpperCase()];
				if (!cacheData) {//不存在或者为空表示无缓存；因为清空保存为空
					isExist = false;
					resultFunction(isExist, true, preFailTime, cacheData, preFailTimeData);
					return;
				}
	            
				var returnmsg = JSON.parse(cacheData);				
				var isExpired = isExpiredCache(expiredTimeMs, returnmsg.datatime);
				var resultObject = returnmsg.dataline;
				resultFunction(isExist, isExpired, preFailTime, resultObject, preFailTimeData);
				return;
			}
		);
	}
	
	/**
	* write 写缓存
	* @returns void
	* @author 白玉
	* @modify 武文斌
	* @param {string} cacheName – 缓存的名字，可以是任意字符串
	* @param {object} object – 缓存对象
	*/
	function write(cacheName,object){
		var nowtime = new Date().getTime();
		var data = {
			"datatime": nowtime,
			"dataline": object
		}
		var obj = {};
		obj[cacheName.toUpperCase()] = JSON.stringify(data);
		H5TZT.saveMapMesg(obj);
	}
	
	
	/**
	* isExpiredCache 判断缓存是否失效
	* @returns true：缓存已经过期 false：缓存正常
	* @author 白玉
	* @param {int||string} expiredTimeMs – 缓存可以保存的时间
	* @param {string} cacheTimeMs – 保存缓存对象时的时间点
	*/
	function isExpiredCache(expiredTimeMs, cacheTimeMs){
		var nowTime    = new Date().getTime();            //当前时间
		expiredTimeMs = (typeof expiredTimeMs=='string') ? parseInt(expiredTimeMs) : expiredTimeMs;
		var expireTime = cacheTimeMs + expiredTimeMs;     //过期时间
		if (nowTime > expireTime) {
			return true;
		}
		else{
			return false;
		}
	}
	
	
	/*
	 * isReCall 判断是否重新调用
	 * @returns true：超过时间间隔可以重新调用 false：没有超过时间间隔
	 * @author 武文斌
	 * @param (string|int) preFailTime上一次失败时间点
	 * @param (string|int) timeInterval 时间间隔
	 */
	function isReCall(preFailTime,timeInterval){
		var nowTime    = new Date().getTime();            //当前时间
		timeInterval = (typeof timeInterval=='string') ? parseInt(timeInterval) : timeInterval;
		preFailTime = (typeof preFailTime=='string') ? parseInt(preFailTime) : preFailTime;
		var expireTime = preFailTime + timeInterval;     //过期时间
		if (nowTime > expireTime) {
			return true;
		}
		else{
			return false;
		}
	}
	
	
	/**
	* fetchNetDataWithCache
	* @returns void
	* @author 白玉
	* @modify 武文斌
	* @param {string} cacheName – 缓存的名字，可以是任意字符串
	* @param {number} expireTime – 缓存的过期时间，单位毫秒。如果按这个参数计算缓存过期了，则会在回调函数的参数中返回过期
	* @param {function} fnNetCall - 调用接口获取数据的函数,函数定义function fnNetCall(oSend, fnSuccess, fnFail)
	* @param {object} oSend - 调用接口的数据，object
	* @param {function} fnSuccess - 正确返回的回调函数
	* @param {function} fnFail - 错误返回的回调函数
	* @param {string} failReCallFlg - 接口调用失败缓存功能，true表示使用此功能，false表示不使用
	* */
	function fetchNetDataWithCache(cacheName, expireTime, fnNetCall, oSend, fnSuccess, fnFail, failReCallFlg){
    	//获取和资金账号关联的缓存名称
    	getFundAccount(function(){
    		if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    		var preFailTimeName = getCacheNameWithFundAccount(cacheName+'Fail');
	    	}
    		cacheName = getCacheNameWithFundAccount(cacheName);
	    	read(cacheName, expireTime, preFailTimeName, function(isExist, isExpire, preFailTime, oData, eData){
	    		if (!isExist){//如果缓存不存在
	    			//如果failReCallFlg传入false，preFailTime就没有定义，不会判断这个逻辑
	    			//缓存不存在情况下，检查上次接口调用是否超过间隔时间，超过间隔时间再调用接口
	    			if (preFailTime && !isReCall(preFailTime, parseInt(parseInt(10*1000)))){
	    				fnFail && fnFail(eData);
	    				return;
	    			}
	    			
	    			//如果缓存不存在，则立即发起网络请求
	    			fnNetCall(oSend, function(data){    				
	    				write(cacheName,data);
	    				//接口成功，记录接口调用失败时间为0
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = 0;
							H5TZT.saveMapMesg(obj);
	    				}    				
	    				fnSuccess && fnSuccess(data);
	    			}, function(data){
	    				//接口失败，记录失败的时间
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = new Date().getTime();
							obj[(preFailTimeName+'data').toUpperCase()] = JSON.stringify(data);
							H5TZT.saveMapMesg(obj);
	    				}    				
	    				fnFail && fnFail(data);
	    			});
	    			return;
	    		}
	    		if (isExpire){//如果缓存过期
	    			//缓存过期情况下，查看上次接口是否报错，如果报错并且在接口报错的超时时间内，直接调用报错回调函数
	    			if (preFailTime && !isReCall(preFailTime, parseInt(parseInt(10*1000)))){
	    				fnFail && fnFail(eData);
	    				return;
	    			}
	    			//缓存超时，并且上次接口失败超时或者上次接口没有报错，再次调用接口
	    			fnNetCall(oSend, function(data){
	    				write(cacheName,data);
	    				//接口成功，记录接口调用失败时间为0
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = 0;
							H5TZT.saveMapMesg(obj);
	    				}
	    				fnSuccess && fnSuccess(data);
	    			}, function(data){
	    				//接口失败，记录失败的时间
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = new Date().getTime();							
							obj[(preFailTimeName+'data').toUpperCase()] = JSON.stringify(data);
							H5TZT.saveMapMesg(obj);
	    				}    				
	    				fnFail && fnFail(data);
	    			});
	    			return;
	    		}
	    		fnSuccess && fnSuccess(oData);
	    	});
    	});
    	
	}

	/**
	* fetchNetDataWithCache
	* @returns void
	* @author 白玉
	* @modify 武文斌
	* @param {string} cacheName – 缓存的名字，可以是任意字符串
	* @param {number} expireTime – 缓存的过期时间，单位毫秒。如果按这个参数计算缓存过期了，则会在回调函数的参数中返回过期
	* @param {function} fnNetCall - 调用接口获取数据的函数,函数定义function fnNetCall(oSend, fnSuccess, fnFail)
	* @param {object} oSend - 调用接口的数据，object
	* @param {function} fnSuccess - 正确返回的回调函数
	* @param {function} fnFail - 错误返回的回调函数
	* @param {string} failReCallFlg - 接口调用失败缓存功能，true表示使用此功能，false表示不使用
	* */
	function fetchNetDataWithCacheNoloading(cacheName, expireTime, fnNetCall, oSend, fnSuccess, fnFail, failReCallFlg){
    	//获取和资金账号关联的缓存名称
    	getFundAccount(function(){
    		if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    		var preFailTimeName = getCacheNameWithFundAccount(cacheName+'Fail');
	    	}
    		cacheName = getCacheNameWithFundAccount(cacheName);
	    	read(cacheName, expireTime, preFailTimeName, function(isExist, isExpire, preFailTime, oData, eData){
	    		if (!isExist){//如果缓存不存在
	    			//如果failReCallFlg传入false，preFailTime就没有定义，不会判断这个逻辑
	    			//缓存不存在情况下，检查上次接口调用是否超过间隔时间，超过间隔时间再调用接口
	    			if (preFailTime && !isReCall(preFailTime, parseInt(parseInt(10*1000)))){
	    				fnFail && fnFail(eData);
	    				return;
	    			}
	    			
	    			//如果缓存不存在，则立即发起网络请求
	    			fnNetCall(oSend, function(data){    				
	    				write(cacheName,data);
	    				//接口成功，记录接口调用失败时间为0
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = 0;
							H5TZT.saveMapMesg(obj);
	    				}    				
	    				fnSuccess && fnSuccess(data);
	    			}, function(data){
	    				//接口失败，记录失败的时间
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = new Date().getTime();
							obj[(preFailTimeName+'data').toUpperCase()] = JSON.stringify(data);
							H5TZT.saveMapMesg(obj);
	    				}    				
	    				fnFail && fnFail(data);
	    			});
	    			return;
	    		}
	    		if (isExpire){//如果缓存过期
	    			//缓存过期情况下，查看上次接口是否报错，如果报错并且在接口报错的超时时间内，直接调用报错回调函数
	    			if (preFailTime && !isReCall(preFailTime, parseInt(parseInt(10*1000)))){
	    				fnFail && fnFail(eData);
	    				return;
	    			}
	    			//缓存超时，并且上次接口失败超时或者上次接口没有报错，再次调用接口
	    			fnNetCall(oSend, function(data){
	    				write(cacheName,data);
	    				//接口成功，记录接口调用失败时间为0
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = 0;
							H5TZT.saveMapMesg(obj);
	    				}
	    				fnSuccess && fnSuccess(data);
	    			}, function(data){
	    				//接口失败，记录失败的时间
	    				if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
	    					var obj = {};
							obj[preFailTimeName.toUpperCase()] = new Date().getTime();							
							obj[(preFailTimeName+'data').toUpperCase()] = JSON.stringify(data);
							H5TZT.saveMapMesg(obj);
	    				}    				
	    				fnFail && fnFail(data);
	    			});
	    			return;
	    		}
	    		fnSuccess && fnSuccess(oData);
	    	});
    	});
	}

	function fetchNetDataWithNoFundAccountCache(cacheName, expireTime, fnNetCall, oSend, fnSuccess, fnFail, failReCallFlg){
		if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
			var preFailTimeName = getCacheNameWithOutFundAccount(cacheName+'Fail');
		}
		cacheName = getCacheNameWithOutFundAccount(cacheName);
		read(cacheName, expireTime, preFailTimeName, function(isExist, isExpire, preFailTime, oData, eData){
			if (!isExist){//如果缓存不存在
				//如果failReCallFlg传入false，preFailTime就没有定义，不会判断这个逻辑
				//缓存不存在情况下，检查上次接口调用是否超过间隔时间，超过间隔时间再调用接口
				if (preFailTime && !isReCall(preFailTime, parseInt(parseInt(10*1000)))){
					fnFail && fnFail(eData);
					return;
				}

				//如果缓存不存在，则立即发起网络请求
				fnNetCall(oSend, function(data){
					write(cacheName,data);
					//接口成功，记录接口调用失败时间为0
					if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
						var obj = {};
						obj[preFailTimeName.toUpperCase()] = 0;
						H5TZT.saveMapMesg(obj);
					}
					fnSuccess && fnSuccess(data);
				}, function(data){
					//接口失败，记录失败的时间
					if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
						var obj = {};
						obj[preFailTimeName.toUpperCase()] = new Date().getTime();
						obj[(preFailTimeName+'data').toUpperCase()] = JSON.stringify(data);
						H5TZT.saveMapMesg(obj);
					}
					fnFail && fnFail(data);
				});
				return;
			}
			if (isExpire){//如果缓存过期
				//缓存过期情况下，查看上次接口是否报错，如果报错并且在接口报错的超时时间内，直接调用报错回调函数
				if (preFailTime && !isReCall(preFailTime, parseInt(parseInt(10*1000)))){
					fnFail && fnFail(eData);
					return;
				}
				//缓存超时，并且上次接口失败超时或者上次接口没有报错，再次调用接口
				fnNetCall(oSend, function(data){
					write(cacheName,data);
					//接口成功，记录接口调用失败时间为0
					if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
						var obj = {};
						obj[preFailTimeName.toUpperCase()] = 0;
						H5TZT.saveMapMesg(obj);
					}
					fnSuccess && fnSuccess(data);
				}, function(data){
					//接口失败，记录失败的时间
					if ((typeof failReCallFlg == 'boolean') && failReCallFlg){
						var obj = {};
						obj[preFailTimeName.toUpperCase()] = new Date().getTime();
						obj[(preFailTimeName+'data').toUpperCase()] = JSON.stringify(data);
						H5TZT.saveMapMesg(obj);
					}
					fnFail && fnFail(data);
				});
				return;
			}
			fnSuccess && fnSuccess(oData);
		});
	}
	
	
	/**
	* clearCache 清除缓存
	* @returns void
	* @author 武文斌
	* @param {string} cacheName – 缓存名称
	*/
	function clearCache(cacheName){
		H5TZT.readLocalMesgSync(['jyloginflag', 'fundaccount', 'fund_account'], function (oLocal) {
            if (oLocal.JYLOGINFLAG > 1) {
                fundaccount = oLocal.FUNDACCOUNT || oLocal.FUND_ACCOUNT;
                //清除接口调用成功保存的数据缓存
                var cacheFailName = getCacheNameWithFundAccount(cacheName+'fail');				
				var obj = {};
				cacheName = getCacheNameWithFundAccount(cacheName);
				obj[cacheFailName.toUpperCase()] = 0;
				obj[cacheName.toUpperCase()] = '';
				H5TZT.saveMapMesgSync(obj/*,function(){
					console.log(cacheName + "clear end!");
				}*/);
            }
            else{
            	
            }
       });
	}
	
	/**
	* getCacheNameWithFundAccount 获取带资金账号的缓存名称
	* @returns string:返回缓存名称
	* @author 武文斌
	* @param {string} preName – 缓存名称前缀
	*/
	function getCacheNameWithFundAccount(preName){
		return preName+fundaccount;
	}

	function getCacheNameWithOutFundAccount(preName){
		return preName;
	}
	/**
	* getFundAccount 获取资金账号
	* @returns void
	* @author 武文斌
	* @notice 异步获取方式
	*/
	function getFundAccount(fn){
		H5TZT.readLocalMesg(['jyloginflag', 'fundaccount', 'fund_account'], function (oLocal) {
            if (oLocal.JYLOGINFLAG > 1) {
                fundaccount = oLocal.FUNDACCOUNT || oLocal.FUND_ACCOUNT;
            }
            fn && fn();
        });
	}
	
	
	/*
	 * setFailTimeInterval 设置接口调用失败后闲置接口调用的间隔时间
	 * @returns void:无返回
	 * @param {sting} timeIntv时间间隔
	 */
	function setFailTimeInterval(timeIntv){
		failTimeMultiInterval = parseInt(timeIntv);
	}
	
	
	/*
	 * setFailTimeInterval 设置接口调用失败后闲置接口调用的间隔时间
	 * @returns int:时间间隔
	 */
	function getFailTimeInterval(){
		return failTimeMultiInterval ;
	}

	
	//加载时获取资金账号，后续可以直接使用
	var fundaccount = '';
	getFundAccount();	
	
	//EXPORT：
	exports.read  = read;
	exports.write = write;	
	exports.fetchNetDataWithCache = fetchNetDataWithCache;
	exports.fetchNetDataWithCacheNoloading = fetchNetDataWithCacheNoloading;
	exports.fetchNetDataWithNoFundAccountCache = fetchNetDataWithNoFundAccountCache;
	exports.clearCache = clearCache;
	exports.setFailTimeInterval = setFailTimeInterval;
	exports.getFailTimeInterval = getFailTimeInterval;
	exports.getFundAccount = getFundAccount;
	//exports.getCacheNameWithFundAccount = getCacheNameWithFundAccount;
});

