(function(win){
	
	function maidianObj(){
		
		//debug模式，埋点后，在console中输出埋点信息，辅助测试
		var debug = false;
		//埋点开关，false表示关闭埋点，true表示打开埋点
		var maidianFlg = true;
		//页面埋点，关闭页面是的属性参数，格式是数组，每个元素格式是：属性：属性值
		var _disParams = [];
		//页面appear埋点判断开关，初始值为false，页面js加载完调用埋点后设置成true
		var appearFlag = false;
		function reportRecordLabel(event){
			var recLabelName = '';
			var recParamObj = null;
			var element = event.target;
			while (element!=window.document.body){
				if(element.attributes.recLabel){
					recLabelName = element.attributes.recLabel.nodeValue;
					if (event.target.tagName=='SELECT' && event.type=='click'){
						break;
					}
					if (event.target.tagName=='INPUT' && event.type=='change'){
						break;
					}
					if (element.attributes.recParam){	
						var params = element.attributes.recParam.nodeValue.split('|');
						var paramNV = '';
						recParamObj = {};
						for(var i=0; i<params.length; i++){
							paramNV = params[i].split(':');
							if (paramNV.length == 2){
								recParamObj[paramNV[0]] = paramNV[1];
							}
						}
					}
				}
				if (recLabelName!=''){
					//调用上报事件的原生接口
					if (recParamObj){
						trackEventWithParam(recLabelName,recParamObj);
					}
					else{
						trackEvent(recLabelName);
					}
					if (debug){
						console.log('maidian:'+recLabelName+';recParam:'+(recParamObj?recParamObj.toString():''));	
					}
					
					break;
				}
			    element = element.parentElement; 
		   }
		}
		
		function trackEvent(action){
			trackEventWithParam(action,{});
	    }
	    function trackEventWithParam(action,param){	    	
	    	try{
	    		if(typeof action === 'undefined' || !CiticsNative.isSupportNativeBridge()){
	    			return;
	    		}
				//alert(action);
	    		var param = [{"action":action,"param":param}];
				CiticsNative.NativeCall("sendEventInfo",JSON.stringify(param));	
	    	}catch(e){
	    	}
	    }


		function addEvent(eventType, functionName,object){
			if (object.addEventListener){
				object.addEventListener(eventType,functionName,false);
			}
			else{
				object.attachEvent('on'+eventType,functionName);
			}
		}
		
		function delEvent(eventType, functionName,object){
			if ( object.addEventListener ) {
				object.removeEventListener(eventType, functionName, false);
			} else {  
			    object.detachEvent("on"+eventType, functionName);  
			}  
		}
		
		function appear(){
			if (appearFlag){
				try{
					var url = document.URL.replace(/^http(s)?:\/\/(\w)+:(\d)+/,'').replace(/\?+.*$/,'');
					CiticsNative.NativeCall("startTracPage",[url]);
				}
				catch(e){					
				}
			}			
		};
			
		function disappear(){	
			var obj = {};
			try{
				//控制页面被遮挡或者关闭后，标志位true
				appearFlag = true;
				obj.url = document.URL.replace(/^http(s)?:\/\/(\w)+:(\d)+/,'').replace(/\?+.*$/,'');
				var disParams = [];
				try{
					disParams = document.body.attributes.disParam.nodeValue.split('|');
				}
				catch(e){
					disParams = _disParams;
				}
				if (disParams.length>0){
					for (var i=0; i<disParams.length; i++){
						var paramNV = disParams[i].split(':');
						if (paramNV.length == 2){
							obj[paramNV[0]] = paramNV[1];
						}
					}
				}
				CiticsNative.NativeCall("endTracPage",[obj]);
			}
			catch(e){
				appearFlag = true;
			}
		};

		function addEventListener(){
			if (maidianFlg){
				var maidianEvent = '';
				try{
					maidianEvent = document.body.attributes.maidian.nodeValue.toLowerCase();
				}
				catch(e){
					maidianEvent = '';
				}
				
				if (maidianEvent.indexOf('click')>-1){
					addEvent('click', reportRecordLabel, document.body);
				}
				if (maidianEvent.indexOf('change')>-1){
					addEvent('change', reportRecordLabel, document.body);
				}
				if(maidianEvent.indexOf('appear')>-1){					
					//为了解决客户端无法获取页面加载完成状态，主动调用页面埋点
					if (!appearFlag){
						try{							
							var url = document.URL.replace(/^http(s)?:\/\/(\w)+:(\d)+/,'').replace(/\?+.*$/,'');
							CiticsNative.NativeCall("startTracPage",[url]);
						}
						catch(e){
						}
					}
					win.onAppear = appear;
				}
				if(maidianEvent.indexOf('disappear')>-1){
					win.onDisappear = disappear;
				}
				if(maidianEvent.indexOf('debug')>-1){
					debug = true;
				}
			}
			
		};
		
		
		
		/*当无法使用页面元素属性埋点时，使用如下函数在js中进行埋点
		//参数：
		//action:事件埋点字符串
		//param：事件埋点属性的对象{属性1：属性值1,属性2：属性值2,...}
		*/
		this.reportEvent = function(action,param){
			if (maidianFlg){
				if (arguments.length==1 && typeof arguments[0]=='string'){
					trackEvent(action);
				}
				else if (arguments.length==2 && typeof arguments[0]=='string'){
					trackEventWithParam(action,param)
				}
				else{
					console.log('parameter error')
				}
				if (debug){
					console.log('maidian:'+action+';recParam:'+(param?param.toString():''));	
				}
			}
		}
		
		//埋点开关设置函数
		this.closeMaidian = function(){
			maidianFlg = false;
		}
		this.openMaidian = function(){
			maidianFlg = true;
		}
		
		//页面埋点属性值设置函数
		//当属性无法再页面中指定时，调用这个函数在页面初始化时调用
		//参数：
		//value：格式为'|'分割的字符串，例如：'属性1：属性值1|属性2：属性值2|...'
		this.setDisParams = function(value){
			_disParams = value.split('|');
		}
		
		//解析页面设置的埋点类型
		addEventListener();
		
	};
	
	
	win.maidian = new maidianObj();
	
})(window)
/*
//useage method:
//本js依赖
//<script type="text/javascript" src="/z_modules/native/native_bridge.js"></script>
//native_bridge.js文件依赖jQuery库，所以需要引用jQuery库

//方法如下：
//1.页面埋点
//<body maidian="appear|disappear" disParam="a:1|b:2">
//在body节点上添加属性maidian，值为添加的事件埋点的类型，现在有appear值，disappear值；
//在页面消失前，给页面添加消失时传给宏路的页面消失记录参数，是一个object,设置一下如下对象即可:
//在body节点上添加属性disParam，属性值使用"|"分割，每个属性，使用key:value的方式；
//属性值无法在页面加载时确定，需要调用如下函数设置页面消失的属性值
//maidian.setDisParams('a:1|b:2');

//2.事件埋点
//在body节点上添加属性maidian，值为添加的事件埋点的类型，现在有click值，change值；

//3.主动给宏路报告一个事件，可以添加两个参数，第一个参数是事件名称，第二个参数是传的参数
maidian.reportEvent('a',{'a':'1'});*/