/*
绘制机构测评
 */
function drawjgcc(options){
    this.option = {
        yText:'#999', //Y轴上刻度值颜色
        xText:'#999', //X轴上刻度值颜色
        xyFontSize:'24', //x,y刻度上文字大小
        xFontHNum:'2', //x轴刻度上的文字
        padding:'20|30|0|30', //区间
        cHeight:'150', //高度 宽度默认是显示当前屏幕宽度
        horizontalLineNum:3, //横线数量
        verticalLineNum:0, //竖线数量
        horizontalLineColor:'#e5e5e5', //横线颜色
        verticalLineColor:'#999999', //竖线颜色
        yInfo:{
            fontColor:'#ff4540',
            fontColor1:'#ff8840',
            fontSize:'24',
            kdTextNum:'3', //4个刻度文字
            unit:''
        },
        xInfo:{
            fontColor:'#999',
            fontSize:'24'
        },
        data:{
            brokenLine:{
                // yData:['20.1','24','30','32','30'],
                // maxValue:'36',
                // minValue:'0',
                lineColor:'#ff4540',
            },
            rectangle:{
                // yData:[{'bgDate':'2016三季报',value:'25000',unit:'户'},
                //       {'bgDate':'2016年报',value:'26000',unit:'户'},
                //       {'bgDate':'2017一季报',value:'30000',unit:'户'},
                //       {'bgDate':'2017中报',value:'35000',unit:'户'},
                //       {'bgDate':'2017三季报',value:'32000',unit:'户'}],
                // maxValue:'40000',
                // minValue:'0',
                jxFillColor:'#ff8840',
            }
        },
        obj:$('#priceKCanvas'),
        ydBgColor:'#ffffff', //原点背景颜色
    }
    if($('body').attr('class').indexOf('theme-dark')>=0){
        this.option.ydBgColor = '#181e24';
    }
    $.extend(this.option,options); //两个对象合并
    this.init(); //调用初始化方法
}

/**
 * [init 初始化方法]
 * @return {[type]} [description]
 */
drawjgcc.prototype.init = function(){
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
    _this.drawZLine(cnstContext,cnst);


    $(_this.option.obj[0]).attr({'src':cnst.toDataURL("image/png")}).show();
    
    // var canvas = _this.option.obj[0];
    // canvas.width = nWidth*2;
    // canvas.height = nHeight*2;
    // _this.option.obj.width(nWidth);
    // _this.option.obj.height(nHeight);
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
    _this.eventTouch(); //监听该事件
}

/**
 * [extendCanvas 扩展canvas的功能 绘制虚线和画矩形]
 * @return {[type]} [description]
 */
drawjgcc.prototype.extendCanvas = function(){
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
drawjgcc.prototype.drawZBX = function(cnstContext,cnst){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4),
        nWidth = cnst.width-TOOLS.getARRType(_this.aPadding,5),
        yKdMaxC = (_this.option.data.brokenLine.maxValue.length>_this.option.data.brokenLine.minValue.length?_this.option.data.brokenLine.maxValue:_this.option.data.brokenLine.minValue)+_this.option.yInfo.unit;

    yKdMaxC = TOOLS.format(yKdMaxC,(_this.option.yLeftUnit?_this.option.yLeftUnit:0));

    var twoLineHeight = _this.option.xInfo.fontSize*2+10, //底部需要用到的文字高度
        yMaxTextWidth = _this.getFontWidth(cnstContext,yKdMaxC,_this.option.yInfo.fontSize);
        
    _this.yMaxTextWidth = yMaxTextWidth;
    _this.twoLineHeight = twoLineHeight;

    //y轴刻度信息
    var yMaxValue = _this.option.data.rectangle.maxValue,
        yMinValue = _this.option.data.rectangle.minValue,
        nChazhi = Number(yMaxValue)-Number(yMinValue),
        yStValue = nChazhi/(_this.option.yInfo.kdTextNum-1),
        yStep = (nHeight-twoLineHeight)/(Number(_this.option.yInfo.kdTextNum)-1);
    
    //绘制Y轴左边的文字
    var basicY = Number(cnst.height)-Number(TOOLS.getARRType(_this.aPadding,2))-Number(twoLineHeight);
    for(var i=0;i<_this.option.yInfo.kdTextNum;i++){
        var nY = basicY - i*yStep,
            sText = TOOLS.format((Number(_this.option.data.brokenLine.minValue)+Number(i*yStValue)),(_this.option.yLeftUnit?_this.option.yLeftUnit:0)),
            oFont = {
                fontX:TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth-10,
                fontY:nY,
                fontColor:_this.option.yInfo.fontColor,
                fontSize:_this.option.yInfo.fontSize,
                fontText:sText+_this.option.yInfo.unit
            };
        _this.drawFillText(cnstContext,oFont,'end');
    }

    var yRightTextWidth = _this.getFontWidth(cnstContext,TOOLS.format(_this.option.data.brokenLine.maxValue,(_this.option.yRightUnit?_this.option.yRightUnit:0)),_this.option.yInfo.fontSize);
    yMaxValue = _this.option.data.brokenLine.maxValue;
    yMinValue = _this.option.data.brokenLine.minValue;
    nChazhi = Number(yMaxValue) - Number(yMinValue);
    yStValue = nChazhi/(_this.option.yInfo.kdTextNum-1);
    yStep = (nHeight-twoLineHeight)/(Number(_this.option.yInfo.kdTextNum)-1);
    //绘制Y轴右边的刻度文字
    basicY = Number(cnst.height)-Number(TOOLS.getARRType(_this.aPadding,2))-Number(twoLineHeight);
    for(var i=0;i<_this.option.yInfo.kdTextNum;i++){
        var nY = basicY - i*yStep,
            sText = TOOLS.format((Number(_this.option.data.brokenLine.minValue)+Number(i*yStValue)),(_this.option.yRightUnit?_this.option.yRightUnit:0)),
            oFont = {
                fontX:cnst.width - TOOLS.getARRType(_this.aPadding,3),
                fontY:nY,
                fontColor:_this.option.yInfo.fontColor1,
                fontSize:_this.option.yInfo.fontSize,
                fontText:sText
            };
        _this.drawFillText(cnstContext,oFont,'end');
    }

    for(var i=0;i<_this.option.horizontalLineNum;i++){
        //绘制虚线横线
        cnstContext.strokeStyle= _this.option.horizontalLineColor;
        var fromX = TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth,
            fromY = basicY-i*yStep,
            toX = cnst.width - TOOLS.getARRType(_this.aPadding,3) - 65,
            toY = basicY-i*yStep;
        cnstContext.dashedLineTo(fromX,fromY,toX,toY);
    }

    var basicW = cnst.width - TOOLS.getARRType(_this.aPadding,5) - yMaxTextWidth,
        xKdNum = _this.option.data.rectangle.yData.length,
        sKdStep = (basicW - xKdNum*36)/(xKdNum+1);
    // 绘制X轴的刻度值
    for(var i=0;i<xKdNum;i++){
        var sValue = _this.option.data.rectangle.yData[i].bgDate,
            sText1 = sValue.substr(0,4),
            sText2 = sValue.substr(4),
            nY = basicY+10,
            nX = TOOLS.getARRType(_this.aPadding,1)+yMaxTextWidth+(i+1)*sKdStep + i*36 + 36/2;

        var oFont = {
                fontX:nX,
                fontY:nY+Number(_this.option.xInfo.fontSize)/2,
                fontColor:_this.option.xInfo.fontColor,
                fontSize:_this.option.xInfo.fontSize,
                fontText:sText1
            };

        _this.drawFillText(cnstContext,oFont,'center');
        oFont.fontY = (oFont.fontY + Number(_this.option.xInfo.fontSize));
        oFont.fontText = sText2;
        _this.drawFillText(cnstContext,oFont,'center');
    }
}

/**
 * [drawJx 绘制矩形]
 * @param  {Object} ctx 画布对象
 * @return {[type]}     [description]
 */
drawjgcc.prototype.drawJx = function(cnstContext,cnst){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4),
        nYStep = (nHeight - _this.twoLineHeight)/Number(_this.option.data.rectangle.maxValue); //每一个值对应刻度

    var basicW = cnst.width - TOOLS.getARRType(_this.aPadding,5) - _this.yMaxTextWidth,
        xKdNum = _this.option.data.rectangle.yData.length,
        sKdStep = basicW/(xKdNum+1);

    //绘制Y轴上的文字
    var basicY = Number(cnst.height)-Number(TOOLS.getARRType(_this.aPadding,2))-Number(_this.twoLineHeight);
    for(var i=0;i<xKdNum;i++){
        var sValue = _this.option.data.rectangle.yData[i].value,
            nY = basicY,
            nX = TOOLS.getARRType(_this.aPadding,1)+_this.yMaxTextWidth+(i+1)*sKdStep-18,
            nJxHeight = nYStep*Number(sValue);
        console.log("nX：" + nX + "nY：" + nY);
        cnstContext.fillStyle = _this.option.data.rectangle.jxFillColor;
        cnstContext.roundRect(nX, nY-Number(nJxHeight), 36, nJxHeight, 0, true);
    }
}

/**
 * [drawZLine 绘制折线]
 * @param cnstContext 2d上下文对象
 * @param cnst canvas对象
 */
drawjgcc.prototype.drawZLine = function(cnstContext,cnst){
    var _this = this,
        nHeight = cnst.height-TOOLS.getARRType(_this.aPadding,4) - _this.twoLineHeight,
        yMaxValue = Number(_this.option.data.brokenLine.maxValue),
        yMinValue = Number(_this.option.data.brokenLine.minValue),
        nChazhi = yMaxValue-yMinValue,
        yStep = nHeight/nChazhi,
        yKdNum = _this.option.data.brokenLine.yData.length;

    var basicW = cnst.width - TOOLS.getARRType(_this.aPadding,5) - _this.yMaxTextWidth,
        xKdNum = _this.option.data.rectangle.yData.length,
        sKdStep = basicW/(xKdNum+1);

    var nXFrist = TOOLS.getARRType(_this.aPadding,1) + _this.yMaxTextWidth + sKdStep,
        fristValue = Number(_this.option.data.brokenLine.yData[0]),
        nBasicY = cnst.height - TOOLS.getARRType(_this.aPadding,2) - _this.twoLineHeight,
        nFrist = nBasicY - Math.abs(yMinValue - fristValue)*yStep;

    cnstContext.beginPath();
    cnstContext.lineWidth = 2;
    cnstContext.strokeStyle = _this.option.data.brokenLine.lineColor;
    var aArc = [{x:nXFrist,y:nFrist}];
    //绘制第一个点
    cnstContext.moveTo(nXFrist, nFrist); //起始点
    for(var i=1;i<yKdNum;i++){
        var yValue = Number(_this.option.data.brokenLine.yData[i]),
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

    //画圆点
    for(var i=0,len=aArc.length;i<len;i++){
      var oXy = aArc[i];
      cnstContext.beginPath();
      console.log("y:" + oXy.y);
      cnstContext.arc(oXy.x,oXy.y,5,0,360,false);
      cnstContext.fillStyle=_this.option.ydBgColor;//填充颜色,默认是黑色
      cnstContext.fill();//画实心圆
      cnstContext.strokeStyle=_this.option.data.brokenLine.lineColor;
      cnstContext.stroke();
      cnstContext.closePath();
    }
}

/*@作用 填充文字
*@param ctx 2d画图环境
*@param oFont:{fontText:文字内容,fontSize:文字大小,fontColor:文字颜色,fontX:x坐标,fontY:y坐标}
*/
drawjgcc.prototype.drawFillText = function(ctx,oFont,sTextAlign){
    // console.log(ctx,oFont,sTextAlign);
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
drawjgcc.prototype.getFontWidth = function(ctx,strText,fontSize){
    !!fontSize?(ctx.font=fontSize+'px Tahoma, Arial,sans-serif'):''; //设置文字大小
    return ctx.measureText(strText).width; //返回文本大小
}

/*@action 监听触摸动作
*/
drawjgcc.prototype.eventTouch = function(){
    var _this = this,nX = 0,qDianX = 0,clearTime = null;
    if (TOOLS.isMobile()) {
        $("#"+_this.option.canvasId).longPress(function(e){
            clearTimeout(clearTime);
            _this.beginZbFlag = false; //开始指标是否绘制了
            //长按事件触发
            _this.crossFlag = true;
            nX = e.changedTouches[0].clientX;
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
                var nCurrX = e.targetTouches[0].clientX;
                _this.mouseMoveEvent(nCurrX,function(){
                    clearTimeout(clearTime);
                    $(("#"+_this.option.crossId)).css("display",'block');
                });
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
        $("#"+_this.option.hoverId).on('touchend', function (e) {
            clearTimeout(clearTime);
            clearTime = setTimeout(function(){
                _this.crossContext && _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
                $(("#"+_this.option.crossId)).css("display",'none');
                TOOLS.lockAandroidTouchFun(false);
            },2000);
        })
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
            clearTimeout(clearTime);
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
drawjgcc.prototype.mouseMoveEvent=function(x,fn,flag) {
    var _this = this;
    if(flag=='begin' && _this.beginZbFlag) return;
    if(flag=='begin') _this.beginZbFlag = true;
    var canvasLeft = $("#"+_this.option.parentCanvasId).find("img").offset().left, //left距离
        nWidth = _this.cnstCross.width - TOOLS.getARRType(_this.aPadding,5),
        basicW = Number(nWidth) - Number(_this.yMaxTextWidth),
        nHeight = _this.cnstCross.height - TOOLS.getARRType(_this.aPadding,4),
        xKdNum = _this.option.data.rectangle.yData.length,
        sKdStep = basicW /(xKdNum+1),
        nXFrist = TOOLS.getARRType(_this.aPadding,3)+Number(_this.yMaxTextWidth)+sKdStep; //第一个点X轴数值
    if(x<(canvasLeft+nXFrist/2)) return;
    var xNum = TOOLS.getFloorFun((x-canvasLeft-nXFrist/2)/(sKdStep/2)); //取整点
    if(!_this.option.data.rectangle.yData[xNum]) return false;

    //开始绘制
    _this.crossContext.clearRect(0,0,_this.cnstCross.width,_this.cnstCross.height); //清空画布
    var nX = nXFrist + xNum*sKdStep,
        nY = _this.cnstCross.height - TOOLS.getARRType(_this.aPadding,2) - _this.twoLineHeight - 150;

    //绘制熟悉
    _this.crossContext.beginPath();
    // _this.crossContext.strokeStyle = 'rgba(19,110,242,0.8)';
    _this.crossContext.strokeStyle = 'rgba(19,110,242,0)';
    _this.crossContext.lineWidth = '2';
    _this.crossContext.moveTo(nX, TOOLS.getARRType(_this.aPadding,0)); //起始点 横线
    _this.crossContext.lineTo(nX,(_this.cnstCross.height - TOOLS.getARRType(_this.aPadding,2) - _this.twoLineHeight));
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
    var oDian = _this.option.data.rectangle.yData[xNum],
        oFont = {
            fontSize:'24',
            fontColor:'#ffffff',
            fontText:(!!_this.option.data.brokenLine['text']?(_this.option.data.brokenLine['text']+': '):'')+TOOLS.format(oDian['value'],2)+oDian.unit,
            fontX:70+xNum*sKdStep,
            fontY:nY-12
        }
    _this.drawFillText(_this.crossContext,oFont,'left');
    oFont.fontText = (!!_this.option.data.rectangle['text']?(_this.option.data.rectangle['text']+': '):'')+TOOLS.format(oDian['price'],2)+'元';
    oFont.fontY = oFont.fontY + 30;
    _this.drawFillText(_this.crossContext,oFont,'left');

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
    }
}

export default drawjgcc;