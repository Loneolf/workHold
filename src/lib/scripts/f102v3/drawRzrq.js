/*
绘制融资融券余额差值走势图
 */
function drawRzrq(options){
    this.option = {
        padding:'20|30|10|30', //区间
        cHeight:'150', //高度 宽度默认是显示当前屏幕宽度
        yInfo:{
            fontColor:$("body").attr('class').indexOf('theme-dark') != -1?'#787878':'#777',
            fontSize:'24',
            kdTextNum:'7', //4个刻度文字
            unit:'',
            nFixed:2,
        },
        xInfo:{
            fontColor:$("body").attr('class').indexOf('theme-dark') != -1?'#787878':'#777',
            fontSize:'24'
        },
        horizontalLineNum:7, //横线数量
        verticalLineNum:0, //竖线数量
        horizontalLineColor:$("body").attr('class').indexOf('theme-dark') != -1?'#333333':'#E5E7F2', //横线颜色
        verticalLineColor:$("body").attr('class').indexOf('theme-dark') != -1?'#333333':'#E5E7F2', //竖线颜色
        data:{
            arrData:[],
            lineColor:'#ff8480',
            maxValue:'0',
            minValue:'0',
        },
        obj:$('#priceKCanvas'),
        touchEventFlag:true,
    }

    $.extend(this.option,options); //两个对象合并
    this.init(); //调用初始化方法
}

/**
 * [init 初始化方法]
 * @return {[type]} [description]
 */
drawRzrq.prototype.init = function(){
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
    _this.drawZLine(cnstContext,cnst,_this.option.data.arrData,_this.option.data.lineColor);


    $(_this.option.obj[0]).attr({'src':cnst.toDataURL("image/png")}).show();

    // var canvas = _this.option.obj[0];
    // canvas.width = nWidth*2;
    // canvas.height = nHeight*2;
    // _this.option.obj.width(nWidth);
    // _this.option.obj.height(nHeight);

    //     _this.options.obj.find('img').attr({'src':canvas.toDataURL("image/png"),'width':'auto','height':(Number(nHeight)/2+'px')});
    // }else{ 
    //     _this.options.obj.html('<img src="'+canvas.toDataURL("image/png")+'" style="width: '+Number(nWidth)/2+'px;height: '+Number(nHeight)/2+'px;"></img>').show();
    // }

    // var context = canvas.getContext('2d');
    // context.clearRect(0,0,nWidth*2,nHeight*2); //清除画布内容
    // context.drawImage(cnst,0,0,nWidth*2,nHeight*2);

    //十字加画布
    _this.cnstCross = document.createElement('canvas');
    _this.cnstCross.width = nWidth*2;
    _this.cnstCross.height = nHeight*2;
    $(_this.cnstCross).height(nHeight);
    $(_this.cnstCross).width(nWidth);
    _this.crossContext = _this.cnstCross.getContext('2d');
    _this.option.touchEventFlag && _this.eventTouch(); //监听该事件
}

/**
 * [extendCanvas 扩展canvas的功能 绘制虚线和画矩形]
 * @return {[type]} [description]
 */
drawRzrq.prototype.extendCanvas = function(){
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
drawRzrq.prototype.drawZBX = function(cnstContext,cnst){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4),
        nWidth = cnst.width-TOOLS.getARRType(_this.aPadding,5),
        yKdMaxC = Number((_this.option.data.maxValue.length>_this.option.data.minValue.length?_this.option.data.maxValue:_this.option.data.minValue)).toFixed(_this.option.yInfo.nFixed)+_this.option.yInfo.unit;

    var twoLineHeight = Number(_this.option.xInfo.fontSize)+20, //底部需要用到的文字高度
        yMaxTextWidth = _this.getFontWidth(cnstContext,yKdMaxC,_this.option.yInfo.fontSize);

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
            sText = (Number(_this.option.data.minValue)+Number(i*yStValue)).toFixed(_this.option.yInfo.nFixed),
            oFont = {
                fontX:TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth-10,
                fontY:nY,
                fontColor:_this.option.yInfo.fontColor,
                fontSize:_this.option.yInfo.fontSize,
                fontText:sText+_this.option.yInfo.unit
            };
        _this.drawFillText(cnstContext,oFont,'right');
    }

    for(var i=0;i<_this.option.horizontalLineNum;i++){
        var fromX = TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth,
            fromY = basicY-i*yStep,
            toX = cnst.width - TOOLS.getARRType(_this.aPadding,3),
            toY = basicY-i*yStep;
        if(i==0){
            cnstContext.beginPath();
            cnstContext.strokeStyle = _this.option.horizontalLineColor;
            cnstContext.moveTo(fromX,fromY);
            cnstContext.lineTo(toX,toY);
            cnstContext.stroke();
            cnstContext.closePath();

            cnstContext.strokeStyle = _this.option.horizontalLineColor;
            cnstContext.beginPath();
            cnstContext.moveTo(fromX,fromY),
            cnstContext.lineTo(fromX,fromY+10);
            cnstContext.stroke();

            cnstContext.beginPath();
            cnstContext.moveTo(toX,toY),
            cnstContext.lineTo(toX,toY+10);
            cnstContext.stroke();
        }else{
            //绘制虚线横线
            cnstContext.strokeStyle= _this.option.horizontalLineColor;
            cnstContext.dashedLineTo(fromX,fromY,toX,toY);
        }
    }

    var nY = cnst.height - TOOLS.getARRType(_this.aPadding,3) + 15,
        nX = TOOLS.getARRType(_this.aPadding,1) + _this.yMaxTextWidth,
        oFont = {
            fontX:nX,
            fontY:nY,
            fontColor:_this.option.xInfo.fontColor,
            fontSize:_this.option.xInfo.fontSize,
            fontText:_this.option.data.arrData[0].date.replace(/([\d]{4})-([\d]{2})-([\d]{2}).*/g,'$1-$2-$3')
        };
    _this.drawFillText(cnstContext,oFont,'left');
    oFont.fontX = cnst.width - TOOLS.getARRType(_this.aPadding,1);
    oFont.fontText = _this.option.data.arrData[_this.option.data.arrData.length-1].date.replace(/([\d]{4})-([\d]{2})-([\d]{2}).*/g,'$1-$2-$3');
    _this.drawFillText(cnstContext,oFont,'right');
}

/**
 * [drawZLine 绘制折线]
 * @param cnstContext 2d上下文对象
 * @param cnst canvas对象
 */
drawRzrq.prototype.drawZLine = function(cnstContext,cnst,data,lineColor){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4) - _this.twoLineHeight,
        yMaxValue = Number(_this.option.data.maxValue),
        yMinValue = Number(_this.option.data.minValue),
        nChazhi = yMaxValue-yMinValue,
        yStep = nHeight/nChazhi,
        len = data.length,
        basicW = cnst.width - TOOLS.getARRType(_this.aPadding,5) - _this.yMaxTextWidth,
        sKdStep = basicW/(len-1);

    var nXFrist = TOOLS.getARRType(_this.aPadding,1) + _this.yMaxTextWidth,
        fristValue = Number(data[0].yhcz),
        nBasicY = cnst.height - TOOLS.getARRType(_this.aPadding,2) - _this.twoLineHeight,
        nFrist = nBasicY - Math.abs(yMinValue - fristValue)*yStep;

    cnstContext.beginPath();
    cnstContext.lineWidth = 1.5;
    cnstContext.strokeStyle = lineColor;
    var aArc = [{x:nXFrist,y:nFrist}];
    console.log("x:" + nXFrist);
    //绘制第一个点
    cnstContext.moveTo(nXFrist, nFrist); //起始点
    for(var i=1;i<len;i++){
        var yValue = Number(data[i].yhcz),
            nY = nBasicY - Math.abs(yMinValue - yValue)*yStep,
            nX = nXFrist + i*sKdStep;
        aArc.push({
            x:nX,
            y:nY
        })
        cnstContext.lineTo(nX,nY);
    }
    //封闭区域
    cnstContext.stroke();
    cnstContext.closePath();
}

/*@作用 填充文字
*@param ctx 2d画图环境
*@param oFont:{fontText:文字内容,fontSize:文字大小,fontColor:文字颜色,fontX:x坐标,fontY:y坐标}
*/
drawRzrq.prototype.drawFillText = function(ctx,oFont,sTextAlign){
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
drawRzrq.prototype.getFontWidth = function(ctx,strText,fontSize){
    !!fontSize?(ctx.font=fontSize+'px Tahoma, Arial,sans-serif'):''; //设置文字大小
    return ctx.measureText(strText).width; //返回文本大小
}

/*@action 监听触摸动作
*/
drawRzrq.prototype.eventTouch = function(){
    var _this = this,nX = 0,qDianX = 0;
    if (TOOLS.isMobile()) {
        $("#rzrqye_canvas").longPress(function(e){
            _this.beginZbFlag = false; //开始指标是否绘制了
            //长按事件触发
            _this.crossFlag = true;
            nX = e.changedTouches[0].clientX;
            if(nX == qDianX) return;
            qDianX = nX;
            var display=$('#rzrqye_canvas_cross').css("display");
            if(display=='none'){
                _this.mouseMoveEvent(nX,function(){
                    $('#rzrqye_canvas_cross').css("display",'block');
                },'begin');
                TOOLS.lockAandroidTouchFun(true);
            }else{
                TOOLS.lockAandroidTouchFun(true);
            }
        })
        $("#rzrqye_hover").on('touchmove', function (e) {
            // console.log("_this.crossFlag：" + _this.crossFlag);
            // if(_this.crossFlag){
            var nCurrX = e.targetTouches[0].clientX;
            _this.mouseMoveEvent(nCurrX,function(){
                $('#rzrqye_canvas_cross').css("display",'block');
            });
            e.preventDefault();
            // }
        })
        // $("#rzrqye_hover").delegate('#rzrqye_canvas','touchend', function (e) {
        //     _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
        //     $('#rzrqye_canvas_cross').css("display",'none');
        //     _this.oSwiper && _this.oSwiper.attachEvents(); //启动滑动
        //     _this.crossFlag = false;
        //     TOOLS.lockAandroidTouchFun(false);
        // })
        // $("#rzrqye_hover").delegate('#rzrqye_canvas','touchcancel', function (e) {
        //     _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
        //     $('#rzrqye_canvas_cross').css("display",'none');
        //     _this.crossFlag = false;
        //     TOOLS.lockAandroidTouchFun(false);
        // })

        $("#rzrqye_hover").on('click', function (e) {
            _this.mouseMoveEvent(e.clientX,function(){
                $('#rzrqye_canvas_cross').css("display",'block')
            });
        })
    } else {
        $("#rzrqye_hover").delegate('#rzrqye_canvas','click', function (e) {
            var display=$('#rzrqye_canvas_cross').css("display");
            if(display=='none'){
               _this.mouseMoveEvent(e.clientX,function(){
                 $('#rzrqye_canvas_cross').css("display",'block')
               });
            }else{
                _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
                $('#rzrqye_canvas_cross').css("display",'none');
                TOOLS.lockAandroidTouchFun(false);
            }
        })
    }

    document.addEventListener('touchstart',function(e){
        if(e.target.nodeName != 'CANVAS'){
            _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
            $('#rzrqye_canvas_cross').css("display",'none');
            TOOLS.lockAandroidTouchFun(false);
        }
    })
}
/*@action 画十字加
*@param x  x轴距离
*@param fn 回调函数
*/
drawRzrq.prototype.mouseMoveEvent=function(x,fn,flag) {
    var _this = this;
    if(flag=='begin' && _this.beginZbFlag) return;
    if(flag=='begin') _this.beginZbFlag = true;
    var canvasLeft = $("#rzrqyeKDiv").find("img").offset().left, //left距离
        nWidth = _this.cnstCross.width - TOOLS.getARRType(_this.aPadding,5),
        nHeight = _this.cnstCross.height - TOOLS.getARRType(_this.aPadding,4),
        barstep = (Number(nWidth)-Number(_this.yMaxTextWidth))/(_this.option.data.arrData.length-1),
        nXFrist = TOOLS.getARRType(_this.aPadding,3)+Number(_this.yMaxTextWidth); //第一个点X轴数值
    if(x<(canvasLeft+nXFrist/2)) return;
    var xNum = TOOLS.getFloorFun((x-canvasLeft-nXFrist/2)/(barstep/2)); //取整点
    if(!_this.option.data.arrData[xNum]) return false;

    //开始绘制
    _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
    var nX = nXFrist + xNum*barstep,
        nY = _this.cnstCross.height - TOOLS.getARRType(_this.aPadding,2) - _this.twoLineHeight;
    //绘制熟悉
    _this.crossContext.beginPath();
    _this.crossContext.strokeStyle = 'rgba(19,110,242,0.8)';
    _this.crossContext.lineWidth = '2';
    _this.crossContext.moveTo(nX, nY); //起始点 横线
    _this.crossContext.lineTo(nX,TOOLS.getARRType(_this.aPadding,0));
    _this.crossContext.stroke();
    _this.crossContext.closePath();
    //绘制半透明的矩形（280*150）
    var nCzX = _this.cnstCross.width-Number(TOOLS.getARRType(_this.aPadding,1)) - Number(nX),
        textAlign = '';
    if(nCzX>280) { //表示右边够绘制矩形
        _this.crossContext.fillStyle = 'rgba(19,110,242,0.8)';
        _this.crossContext.beginPath();
        _this.crossContext.moveTo(nX,nY-30);
        _this.crossContext.lineTo(nX-10,nY-40);
        _this.crossContext.lineTo(nX-30,nY-40);
        _this.crossContext.lineTo(nX-30,nY-190);
        _this.crossContext.lineTo(nX+260,nY-190);
        _this.crossContext.lineTo(nX+260,nY-40);
        _this.crossContext.lineTo(nX+10,nY-40);
        _this.crossContext.lineTo(nX,nY-30);
        _this.crossContext.fill();
        _this.crossContext.closePath();
        textAlign = 'left';
    }else if(nX>200) { //表示左边够绘制矩形
        _this.crossContext.fillStyle = 'rgba(19,110,242,0.8)';
        _this.crossContext.beginPath();
        _this.crossContext.moveTo(nX,nY-30);
        _this.crossContext.lineTo(nX+10,nY-40);
        _this.crossContext.lineTo(nX+30,nY-40);
        _this.crossContext.lineTo(nX+30,nY-190);
        _this.crossContext.lineTo(nX-260,nY-190);
        _this.crossContext.lineTo(nX-260,nY-40);
        _this.crossContext.lineTo(nX-10,nY-40);
        _this.crossContext.lineTo(nX,nY-30);
        _this.crossContext.fill();
        _this.crossContext.closePath();
        textAlign = 'right';
    }else{ //采取以该点中间绘制
        _this.crossContext.fillStyle = 'rgba(19,110,242,0.8)';
        _this.crossContext.beginPath();
        _this.crossContext.moveTo(nX,nY-30);
        _this.crossContext.lineTo(nX+10,nY-40);
        _this.crossContext.lineTo(nX+180,nY-40);
        _this.crossContext.lineTo(nX+180,nY-190);
        _this.crossContext.lineTo(nX-200,nY-190);
        _this.crossContext.lineTo(nX-200,nY-40);
        _this.crossContext.lineTo(nX-10,nY-40);
        _this.crossContext.lineTo(nX,nY-30);
        _this.crossContext.fill();
        _this.crossContext.closePath();
        textAlign = 'center';
    }
    // 文字
    var oDian = _this.option.data.arrData[xNum],
        oFont = {
            fontSize:'24',
            fontColor:'#ffffff',
            fontText:oDian.date.substr(0,10),
            fontX:nX,
            fontY:nY-190+30
        }

    if(_this.option.gqzySstFlag){ //股票质押走势图标记
        _this.drawFillText(_this.crossContext,oFont,textAlign);
        oFont.fontText = '质押比例：' + (!isNaN(oDian.yhcz)?TOOLS.format(oDian.yhcz+'',2)+'%':'--');
        oFont.fontY = oFont.fontY+35;
        _this.drawFillText(_this.crossContext,oFont,textAlign);
    }else{
        _this.drawFillText(_this.crossContext,oFont,textAlign);
        oFont.fontText = '融资余额：' + (!isNaN(oDian.financing_balance)?(TOOLS.fmtunit(oDian.financing_balance+'',2)+'元'):'--');
        oFont.fontY = oFont.fontY+35;
        _this.drawFillText(_this.crossContext,oFont,textAlign);
        oFont.fontText = '融券余额：' + (!isNaN(oDian.margin_ye)?(TOOLS.fmtunit(oDian.margin_ye+'',2)+'元'):'--');
        oFont.fontY = oFont.fontY+25;
        _this.drawFillText(_this.crossContext,oFont,textAlign);
        oFont.fontText = '余额差值：' + (!isNaN(oDian.balance_diff)?(TOOLS.fmtunit(oDian.balance_diff+'',2)+'元'):'--');
        oFont.fontY = oFont.fontY+25;
        _this.drawFillText(_this.crossContext,oFont,textAlign);
    }
    $("#rzrqye_canvas_cross").html(_this.cnstCross);
    fn && fn(oDian);
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
            }, 500);
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
    /**
     * [tjAddYUnit 统一添加亿单位]
     * @param  {[type]} num   [description]
     * @param  {[type]} digit [description]
     * @return {[type]}       [description]
     */
    tjAddYUnit:function(num,digit){
        if(num == '' || typeof num == 'undefined') {
            return '--';
        }
        if(isNaN(num)) {
            return num;
        }
        return(this.format(num / 100000000, digit) + '亿元');
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
        } else if(arrln >= 1) {
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
    }
}

export default drawRzrq;