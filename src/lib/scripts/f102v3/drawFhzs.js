/*
绘制分红转送
 */
function drawFhzs(options){
    this.option = {
        padding:'20|30|50|30', //区间
        cHeight:'150', //高度 宽度默认是显示当前屏幕宽度
        yInfo:{
            fontColor:$("body").attr('class').indexOf('theme-dark') != -1?'#787878':'#777',
            fontSize:'26',
            kdTextNum:'6', //4个刻度文字
            unit:''
        },
        xInfo:{
            fontColor:$("body").attr('class').indexOf('theme-dark') != -1?'#787878':'#777',
            fontSize:'26'
        },
        horizontalLineNum:6, //横线数量
        verticalLineNum:0, //竖线数量
        horizontalLineColor:'#E5E7F2', //横线颜色
        verticalLineColor:'#999999', //竖线颜色
        data:{
            aArrData:[],
            maxValue:'7.5',
            minValue:'0',
        },
        obj:null
    }

    $.extend(this.option,options); //两个对象合并
    this.init(); //调用初始化方法
}

/**
 * [init 初始化方法]
 * @return {[type]} [description]
 */
drawFhzs.prototype.init = function(){
    var _this = this;
    _this.aPadding = TOOLS.padding(_this.option.padding); //对padding值解析
    _this.extendCanvas();
    //创建canvas对象，实现双屏处理。（一个画一个显示，这样有利于交互显示）
    var cnst = document.createElement('canvas'),
        nHeight = _this.option.cHeight,
        nWidth = $(window).width();
    cnst.width = nWidth*2;
    cnst.height = nHeight*2;
    $(cnst).height(nHeight);
    $(cnst).width(nWidth);
    var cnstContext = cnst.getContext('2d');
    cnstContext.clearRect(0,0,nWidth*2,nHeight*2); //清除画布内容

    _this.drawZBX(cnstContext,cnst); //画坐标系
    _this.drawJx(cnstContext,cnst);

    var canvas = _this.option.obj[0];
    canvas.width = nWidth*2;
    canvas.height = nHeight*2;
    _this.option.obj.width(nWidth);
    _this.option.obj.height(nHeight);
    var context = canvas.getContext('2d');
    context.clearRect(0,0,nWidth*2,nHeight*2); //清除画布内容
    context.drawImage(cnst,0,0,nWidth*2,nHeight*2);

    //十字加画布
    _this.cnstCross = document.createElement('canvas');
    _this.cnstCross.width = nWidth*2;
    _this.cnstCross.height = nHeight*2;
    $(_this.cnstCross).height(nHeight);
    $(_this.cnstCross).width(nWidth);
    _this.crossContext = _this.cnstCross.getContext('2d');
    _this.eventTouch(); //监听该事件
}

/**
 * [extendCanvas 扩展canvas的功能 绘制虚线和画矩形]
 * @return {[type]} [description]
 */
drawFhzs.prototype.extendCanvas = function(){
  // 实线
  CanvasRenderingContext2D.prototype.allLineTo = function (fromX, fromY, toX, toY, pattern) {
    // draw dash line
    this.beginPath();
    this.moveTo(fromX, fromY);
    this.lineTo(toX, toY);
    this.stroke();
  };
    //绘制虚线
    CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {
      // default interval distance -> 5px
      if (typeof pattern === "undefined") pattern = 5;

      // calculate the delta x and delta y
      var dx = (toX - fromX);
      var dy = (toY - fromY);
      var distance = Math.floor(Math.sqrt(dx*dx + dy*dy));
      var dashlineInteveral = (pattern <= 0) ? distance : (distance/pattern);
      var deltay = (dy/distance) * pattern;
      var deltax = (dx/distance) * pattern;

      // draw dash line
      this.beginPath();
      for(var dl=0; dl<dashlineInteveral; dl++) {
        if(dl%2) {
          this.lineTo(fromX + dl*deltax, fromY + dl*deltay);
        } else {
          this.moveTo(fromX + dl*deltax, fromY + dl*deltay);
        }
      }
      this.stroke();
    }

    //扩展画矩形
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == "undefined") {
          stroke = true;
        }
        if (typeof radius === "undefined") {
          radius = 5;
        }
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
        if (stroke) {
          this.stroke();
        }
        if (fill) {
          this.fill();
        }
    };
}

/*@action 画坐标系
*@param cnstContext 2d上下文对象
*@param cnst canvas对象
*/
drawFhzs.prototype.drawZBX = function(cnstContext,cnst){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4),
        nWidth = cnst.width-TOOLS.getARRType(_this.aPadding,5),
        yKdMaxC = Number((_this.option.data.maxValue.length>_this.option.data.minValue.length?_this.option.data.maxValue:_this.option.data.minValue)).toFixed(1)+_this.option.yInfo.unit;

    var twoLineHeight = Number(_this.option.xInfo.fontSize)+10, //底部需要用到的文字高度
        yMaxTextWidth = _this.getFontWidth(cnstContext,yKdMaxC,_this.option.yInfo.fontSize)+10;

    _this.yMaxTextWidth = yMaxTextWidth;
    _this.twoLineHeight = twoLineHeight;

    //y轴刻度信息
    var yMaxValue = _this.option.data.maxValue,
        yMinValue = _this.option.data.minValue,
        nChazhi = Number(yMaxValue)-Number(yMinValue),
        yStValue = nChazhi/(_this.option.yInfo.kdTextNum-1),
        yStep = (nHeight-twoLineHeight)/(Number(_this.option.yInfo.kdTextNum)-1);

    //绘制Y轴上的文字
    var basicY = Number(cnst.height)-Number(TOOLS.getARRType(_this.aPadding,2))-Number(twoLineHeight);
    for(var i=0;i<_this.option.yInfo.kdTextNum;i++){
        var nY = basicY - i*yStep,
            sText = (Number(_this.option.data.minValue)+Number(i*yStValue)).toFixed(1),
            oFont = {
                fontX:TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth-10,
                fontY:nY,
                fontColor:_this.option.yInfo.fontColor,
                fontSize:_this.option.yInfo.fontSize,
                fontText:sText+_this.option.yInfo.unit
            };
        _this.drawFillText(cnstContext,oFont,'center');
    }

    for(var i=0;i<_this.option.horizontalLineNum;i++){
        //绘制虚线横线
        cnstContext.strokeStyle= $("body").attr('class').indexOf('theme-dark') != -1?'#333':'#E5E7F2';
        // cnstContext.strokeStyle= _this.option.horizontalLineColor;
        var fromX = TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth,
            fromY = basicY-i*yStep,
            toX = cnst.width - TOOLS.getARRType(_this.aPadding,3),
            toY = basicY-i*yStep;
        // cnstContext.allLineTo(fromX,fromY,toX,toY);
        cnstContext.dashedLineTo(fromX,fromY,toX,toY);
    }

    var basicW = cnst.width - TOOLS.getARRType(_this.aPadding,5) - yMaxTextWidth,
        xKdNum = _this.option.data.aArrData.length,
        sKdStep = (basicW-xKdNum*(36*2+8))/(xKdNum+1);
    // 绘制X轴的刻度值
    for(var i=0;i<xKdNum;i++){
        var sValue = _this.option.data.aArrData[i].text,
            nY = basicY+30, //X轴数据和X轴距离
            nX = TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth+(i+1)*sKdStep + i*(36*2+8) + (36*2+8)/2;

        var oFont = {
                fontX:nX,
                fontY:nY+Number(_this.option.xInfo.fontSize)/2,
                fontColor:_this.option.xInfo.fontColor,
                fontSize:_this.option.xInfo.fontSize,
                fontText:sValue
            };

        _this.drawFillText(cnstContext,oFont,'center');
    }
}

/**
 * [drawJx 绘制矩形]
 * @param  {Object} ctx 画布对象
 * @return {[type]}     [description]
 */
drawFhzs.prototype.drawJx = function(cnstContext,cnst){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4),
        nYStep = (nHeight - _this.twoLineHeight)/Number(_this.option.data.maxValue)-Number(_this.option.data.minValue); //每一个值对应刻度

    var basicW = cnst.width - TOOLS.getARRType(_this.aPadding,5) - _this.yMaxTextWidth,
        xKdNum = _this.option.data.aArrData.length,
        sKdStep = (basicW - xKdNum*(36*2+8))/(xKdNum+1);

    //绘制Y轴上的文字
    var basicY = Number(cnst.height)-Number(TOOLS.getARRType(_this.aPadding,2))-Number(_this.twoLineHeight);
    for(var i=0;i<xKdNum;i++){
        var oItem = _this.option.data.aArrData[i],
            nY = basicY,
            nX = TOOLS.getARRType(_this.aPadding,1)+_this.yMaxTextWidth+(i+1)*sKdStep+i*(36*2+8);
        var nJxHeight = 0;
        if(!!oItem.gjj && oItem.gjj.value && !!oItem.wfplr && oItem.wfplr.value){
            nJxHeight = nYStep*(Number(oItem.gjj.value)-Number(_this.option.data.minValue));

            cnstContext.fillStyle = oItem.gjj.color;
            cnstContext.roundRect(nX, nY-Number(nJxHeight), 36, nJxHeight, 0, true);

            nJxHeight = nYStep*(Number(oItem.wfplr.value)-Number(_this.option.data.minValue));

            cnstContext.fillStyle = oItem.wfplr.color;
            cnstContext.roundRect(nX+(36+8), nY-Number(nJxHeight), 36, nJxHeight, 0, true);
        }else{
            var nValue = null,sTempColor=null;
            if(!!oItem.gjj && oItem.gjj.value){
                nValue = oItem.gjj.value;
                sTempColor = oItem.gjj.color;
            }else if(!!oItem.wfplr && oItem.wfplr.value){
                nValue = oItem.wfplr.value;
                sTempColor = oItem.wfplr.color;
            }else{
                continue;
            }
            nJxHeight = nYStep*(Number(nValue)-Number(_this.option.data.minValue));

            cnstContext.fillStyle = sTempColor;
            cnstContext.roundRect(nX+22, nY-Number(nJxHeight), 36, nJxHeight, 0, true);
        }
    }
}

/*@作用 填充文字
*@param ctx 2d画图环境
*@param oFont:{fontText:文字内容,fontSize:文字大小,fontColor:文字颜色,fontX:x坐标,fontY:y坐标}
*/
drawFhzs.prototype.drawFillText = function(ctx,oFont,sTextAlign){
    ctx.textBaseline = 'middle'; //起点在文字中间
    ctx.textAlign = (!!sTextAlign?sTextAlign:'center');
    ctx.font = oFont.fontSize + "px Tahoma, Arial,sans-serif";
    ctx.fillStyle = oFont.fontColor;
    ctx.fillText(oFont.fontText, oFont.fontX, oFont.fontY);
}

/*@action 计算图例展示需要多宽
*@param strText 文本
*@param fontSize 文字大小
*/
drawFhzs.prototype.getFontWidth = function(ctx,strText,fontSize){
    !!fontSize?(ctx.font=fontSize+'px Tahoma, Arial,sans-serif'):''; //设置文字大小
    return ctx.measureText(strText).width; //返回文本大小
}

/*@action 监听触摸动作
*/
drawFhzs.prototype.eventTouch = function(){
    var _this = this,
        nX = 0,
        qDianX = 0,
        oTouchPoint = {};
    if (TOOLS.isMobile()) {
        $("#"+_this.option.canvasId).longPress(function(e){
            _this.beginZbFlag = false; //开始指标是否绘制了
            //长按事件触发
            _this.crossFlag = true;
            nX = e.changedTouches[0].clientX;
            oTouchPoint.nY = e.changedTouches[0].pageY;
            oTouchPoint.nX = e.changedTouches[0].pageX;
            console.log('oTouchPoint.nY：' + oTouchPoint.nY);
            if(nX == qDianX) return;
            qDianX = nX;
            var display=$(("#"+_this.option.crossId)).css("display");
            if(display=='none'){
                _this.mouseMoveEvent(nX,function(){
                    $(("#"+_this.option.crossId)).css("display",'block');
                },'begin');
                TOOLS.lockAandroidTouchFun(true);
            }
        })
        $("#"+_this.option.hoverId).on('touchmove', function (e) {
            // console.log("_this.crossFlag：" + _this.crossFlag);
            if(/*_this.crossFlag*/true){
                var nCurrX = e.targetTouches[0].clientX,
                    nY = e.targetTouches[0].pageY,
                    nX = e.targetTouches[0].pageX,
                    deltaY = 0,
                    deltaX = null;
                _this.mouseMoveEvent(nCurrX,function(){
                    $(("#"+_this.option.crossId)).css("display",'block');
                })
                e.preventDefault();
            }
        })
        // $("#"+_this.option.hoverId).delegate(("#"+_this.option.canvasId),'touchend', function (e) {
        //     _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
        //     $(("#"+_this.option.crossId)).css("display",'none');
        //     _this.oSwiper && _this.oSwiper.attachEvents(); //启动滑动
        //     _this.crossFlag = false;
        //     TOOLS.lockAandroidTouchFun(false);
        // })
        // $("#"+_this.option.hoverId).delegate(("#"+_this.option.canvasId),'touchcancel', function (e) {
        //     _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
        //     $(("#"+_this.option.crossId)).css("display",'none');
        //     _this.crossFlag = false;
        //     TOOLS.lockAandroidTouchFun(false);
        // })
        $("#"+_this.option.hoverId).on('click', function (e) {
            _this.mouseMoveEvent(e.clientX,function(){
                $(("#"+_this.option.crossId)).css("display",'block')
            });
        })
    } else {
        $("#"+_this.option.hoverId).delegate(("#"+_this.option.canvasId),'click', function (e) {
            var display=$('#jkgdgb_canvas_cross').css("display");
            if(display=='none'){
               _this.mouseMoveEvent(e.clientX,function(){
                 $(("#"+_this.option.crossId)).css("display",'block')
               });
            }else{
                _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
                $(("#"+_this.option.crossId)).css("display",'none');
            }
        })
    }

    document.addEventListener('touchstart',function(e){
        if(e.target.nodeName != 'CANVAS'){
            _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
            $(("#"+_this.option.crossId)).css("display",'none');
            TOOLS.lockAandroidTouchFun(false);
        }
    })
}
/*@action 画十字加
*@param x  x轴距离
*@param fn 回调函数
*/
drawFhzs.prototype.mouseMoveEvent=function(x,fn,flag) {
    var _this = this;
    if(flag=='begin' && _this.beginZbFlag) return;
    if(flag=='begin') _this.beginZbFlag = true;
    var canvasLeft = $("#"+_this.option.parentCanvasId).find("canvas").offset().left, //left距离
        nWidth = _this.cnstCross.width - TOOLS.getARRType(_this.aPadding,5),
        basicW = Number(nWidth) - Number(_this.yMaxTextWidth),
        nHeight = _this.cnstCross.height - TOOLS.getARRType(_this.aPadding,4),
        xKdNum = _this.option.data.aArrData.length,
        sKdStep = (basicW-xKdNum*(36*2+8)) /(xKdNum+1), //空白间距
        nXFrist = TOOLS.getARRType(_this.aPadding,3)+Number(_this.yMaxTextWidth)+sKdStep; //第一个点X轴数值
    if(x<(canvasLeft+nXFrist/2)) return; //小于第一个点
    var nT = (x-canvasLeft-nXFrist/2)%(sKdStep/2+(36*2+8)/2), //取余数
        nT1 = (x-canvasLeft-nXFrist/2)/(sKdStep/2+(36*2+8)/2),
        xNum = -1,
        nTFlag = false;
    if(nT <= 36*2+8){ //表明在画图位置
        nTFlag = true;
    }
    if(!nTFlag || Math.floor(nT1)>=xKdNum) return false;
    xNum = Math.floor(nT1);
    if(!_this.option.data.aArrData[xNum]) return false;
    //开始绘制
    _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
    var nX = nXFrist + xNum*(sKdStep+(36*2+8))+40, //中间点
        nY = _this.cnstCross.height - TOOLS.getARRType(_this.aPadding,2) - _this.twoLineHeight - 150;

    //绘制熟悉
    _this.crossContext.beginPath();
    _this.crossContext.strokeStyle = 'rgba(19,110,242,0.8)';
    _this.crossContext.lineWidth = '2';
    _this.crossContext.moveTo(nX, nY+150); //起始点 横线
    _this.crossContext.lineTo(nX,TOOLS.getARRType(_this.aPadding,0));
    _this.crossContext.stroke();
    _this.crossContext.closePath();

    //绘制区域
    _this.crossContext.fillStyle = 'rgba(19,110,242,0.8)';
    _this.crossContext.beginPath();
    _this.crossContext.moveTo(nX-140,nY+40);
    _this.crossContext.lineTo(nX+140,nY+40);
    _this.crossContext.lineTo(nX+140,nY-40);
    _this.crossContext.lineTo(nX-140,nY-40);
    _this.crossContext.lineTo(nX-140,nY+40);
    _this.crossContext.fill();
    _this.crossContext.closePath();
    // 文字
    var oDian = _this.option.data.aArrData[xNum],
        oFont = {
            fontSize:'24',
            fontColor:'#ffffff',
            fontText:oDian.gjj.text+":"+(!!oDian.gjj.value&&!isNaN(oDian.gjj.value)?TOOLS.fourUnitFun(oDian.gjj.value):'--')+'元',
            fontX:nX,
            fontY:nY-12
        }
    _this.drawFillText(_this.crossContext,oFont,'center');
    oFont.fontText = oDian.wfplr.text+":"+(!!oDian.wfplr.value&!isNaN(oDian.wfplr.value)?TOOLS.fourUnitFun(oDian.wfplr.value):'--')+'元';
    oFont.fontY = oFont.fontY + 30;
    _this.drawFillText(_this.crossContext,oFont,'center');

    $(("#"+_this.option.crossId)).html(_this.cnstCross);
    fn && fn();
}

//触发长按事件
$.fn.longPress = function(fn) {
    var timeout = undefined
    var $this = this;
    $this[0].addEventListener('touchstart', function(event) {
        if(typeof timeout == 'undefined') {
            timeout = setTimeout(function(){
                clearTimeout(timeout);
                timeout = undefined;
                fn && fn(event);
            }, 100);
        }
    }, false);
    $this[0].addEventListener('touchend', function(event) {
        clearTimeout(timeout);
        timeout = undefined;
    }, false);
}


/*@action TOOLS 一些公用的工具函数
*/
var TOOLS = {
    /*@action 对padding值进行解析
    *@param padding
    *return [] 返回一个数组
    */
    padding:function(sPadding){
        var aTemp = [0,0,0,0]; //如果sPadding数据格式有误，取默认值
        if(!!sPadding && sPadding.indexOf('|')>-1){
            aTemp = sPadding.split('|');
        }
        return aTemp;
    },
    /*@action 获取数组中最大值和最下值
    *@param data [{value:data}] 数据源
    *return {maxValue:,minValue:,}
    */
    getMaxAndMin:function(data){
        var maxarr = [],minarr=[];
        for(var i= 0,j=data.length; i<j; i++){
            maxarr.push(Math.max.apply(null,data[i]['value']))
            minarr.push(Math.min.apply(null,data[i]['value']))
        };
        return {maxValue:Math.max.apply(null,maxarr),minValue:Math.min.apply(null,minarr)};
    },
    /*@action 指定取什么距离
    *@param aArr 数组源
    *@param 0 上 1 左 2 下 3 右 4 上下和 5 左右和
    *return int类型
    */
    getARRType:function(aArr,type){
        var n = 0;
        switch(type){
            case 0:
            case 1:
            case 2:
            case 3:
                n = Number(aArr[type]);
                break;
            case 4:
                n = Number(aArr[0])+Number(aArr[2]);
                break;
            case 5:
                n = Number(aArr[1])+Number(aArr[3]);
                break;
        }
        return n;
    },
    /*@action 是否是手机
    */
    isMobile:function() {
        var sUserAgent = navigator.userAgent.toLowerCase(),
            bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
            bIsMidp = sUserAgent.match(/midp/i) == "midp",
            bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
            bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
            bIsAndroid = sUserAgent.match(/android/i) == "android",
            bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
            bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
            bIsWebview = sUserAgent.match(/webview/i) == "webview";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    },
    /*@action 取整数据
    *@param xNum 数据
    */
    getFloorFun:function(xNum){
        if (xNum > Math.floor(xNum) + 0.5) {  //1.5
            xNum = Math.ceil(xNum);
        } else {
            xNum = Math.floor(xNum);
        }
        return xNum;
    },
    fmtunit:function(num, digit, isunit, isFormat) {
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
        if(arrln >= 6 && arrln < 9) {
            return(this.format(num / 10000, dig) + (isunit == 0 ? '' : '万'));
        } else if(arrln >= 9) {
            return(this.format(num / 100000000, dig) + (isunit == 0 ? '' : '亿'));
        } else {
            if(isFormat) {
                return num;
            } else {
                return(this.format(num, dig));
            }
        }
    },
    format:function(x, pos) {
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
    },
    /**
     * [lockAandroidTouchFun 锁定android滑动]
     * @param  {Boolean} flag false|true
     * @return {[type]}      [description]
     */
    lockAandroidTouchFun:function(flag){
        window.MyWebView && window.MyWebView.tztRequestDisallowInterceptTouchEvent && window.MyWebView.tztRequestDisallowInterceptTouchEvent(flag);
    },
    /**
     * [fourUnitFun 保留四位有效数字]
     * @param  {[type]} number [description]
     * @return {[type]}        [description]
     */
    fourUnitFun:function(number){
        let fsFlag = false;
        number = parseFloat(number);
        if(number<0){
          number = number*-1;
          fsFlag = true;
        }

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

        return sResult;
    }
}

export default drawFhzs;
