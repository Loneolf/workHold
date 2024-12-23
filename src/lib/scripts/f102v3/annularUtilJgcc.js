/*
绘制环形图
 */
function drawAnnular(options){
    this.option = {
        yText:'#999', //Y轴上刻度值颜色
        xText:'#999', //X轴上刻度值颜色
        xyFontSize:'24', //x,y刻度上文字大小
        xFontHNum:'2', //x轴刻度上的文字
        padding:'20|30|0|30', //区间
        cWidth:'150', //宽度
        cHeight:'150', //高度 宽度默认是显示当前屏幕宽度
        data:[{value:'149.30',yhColor2:'#ff4540',yhColor1:'#e53e39'},
            {value:'49.30',yhColor2:'#ff8840',yhColor1:'#e57a39'},
            {value:'29.30',yhColor2:'#01bd78',yhColor1:'#01aa6c'}],
        totalValue:'227.9',
        lineWidth:100,
        obj:$('#priceKCanvas')
    }

    $.extend(this.option,options); //两个对象合并
    //对传入的数据进行处理
    // var aColor = [{yhColor1:'#e53e39',yhColor2:'#ff4540'},
    //               {yhColor1:'#e57a39',yhColor2:'#ff8840'},
    //               {yhColor1:'#39a3e5',yhColor2:'#40b5ff'},
    //               {yhColor1:'#01aa6c',yhColor2:'#01bd78'}];

    var aColor = [{yhColor1:'#e53e39',yhColor2:'#ff4540'},
                  {yhColor1:'#e57a39',yhColor2:'#ff8840'},
                  {yhColor1:'#01aa6c',yhColor2:'#01bd78'},
                  {yhColor1:'#39a3e5',yhColor2:'#40b5ff'},
                  {yhColor1:'#8F64FF',yhColor2:'#8F64FF'},
                  {yhColor1:'#FDC374',yhColor2:'#FDC374'},
                  {yhColor1:'#4B47C0',yhColor2:'#4B47C0'}];
    if(!!this.option.data[0] && this.option.data[0].business_income){
        var aT = [],
            totalValue = 0;
        for(var i=0,len=this.option.data.length;i<len;i++){
            var oItem = this.option.data[i];
            if(!!Number(oItem.business_income) && Number(oItem.business_income)>0){
                totalValue += Number(oItem.business_income);
            }
            aT.push({
                value:Number(oItem.business_income),
                yhColor1:aColor[i].yhColor1,
                yhColor2:aColor[i].yhColor2
            })
        }
        this.option.data = aT;
        this.option.totalValue = totalValue;
    }

    this.init(); //调用初始化方法
}

/**
 * [init 初始化方法]
 * @return {[type]} [description]
 */
drawAnnular.prototype.init = function(){
    var _this = this;
    _this.aPadding = TOOLS.padding(_this.option.padding); //对padding值解析
    //创建canvas对象，实现双屏处理。（一个画一个显示，这样有利于交互显示）
    var cnst = document.createElement('canvas'),
        nHeight = _this.option.cHeight,
        nWidth = (_this.option.cWidth?Number(_this.option.cWidth):$(window).width());
    cnst.width = nWidth*2;
    cnst.height = nHeight*2;
    $(cnst).height(nHeight);
    $(cnst).width(nWidth);
    var cnstContext = cnst.getContext('2d');
    cnstContext.clearRect(0,0,nWidth*2,nHeight*2); //清除画布内容

    _this.option.data.length>0?_this.drawHx(cnstContext,cnst):'';

    $(_this.option.obj[0]).attr({'src':cnst.toDataURL("image/png")}).show();


    // var canvas = _this.option.obj[0];
    // canvas.width = nWidth*2;
    // canvas.height = nHeight*2;
    // _this.option.obj.width(nWidth);
    // _this.option.obj.height(nHeight);
    // var context = canvas.getContext('2d');
    // context.clearRect(0,0,nWidth*2,nHeight*2); //清除画布内容
    // context.drawImage(cnst,0,0,nWidth*2,nHeight*2);
}

/*@action 画坐标系
*@param cnstContext 2d上下文对象
*@param cnst canvas对象
*/
drawAnnular.prototype.drawHx = function(cnstContext,cnst){
    var _this = this,
        nWidth = cnst.width - TOOLS.getARRType(_this.aPadding,4),
        nHeight = cnst.height - TOOLS.getARRType(_this.aPadding,5),
        yX = cnst.width/2,
        yH = cnst.height/2,
        yR = Math.min(yX,yH),
        startAngle = 0,
        endAngle = 0;
    for(var i=0,len=_this.option.data.length;i<len;i++){
        startAngle = endAngle;
        var oItem = _this.option.data[i],
            valueZb = Number(oItem.value)/Number(_this.option.totalValue);
        if(valueZb<0) valueZb = 0;
        endAngle += Math.PI*2*valueZb;
        var r1 = yR - Number(_this.option.lineWidth),
            r2 = yR - Number(_this.option.lineWidth)*0.625,
            oSector = {
                x:yX,
                y:yH,
                r:r1,
                startAngle:startAngle,
                endAngle:endAngle,
                stockColor:oItem.yhColor1,
                lineWidth:Number(_this.option.lineWidth)*0.375
            }
        // this.drawSectorFun(cnstContext,oSector);
        oSector.r = r2;
        oSector.lineWidth = 50;
        oSector.stockColor = oItem.yhColor2;
        this.drawSectorFun(cnstContext,oSector);
    }
}

/*@作用 画环形图
*@param ctx 2d画图环境
*@param oSector:{x:,y:,r,startAngle:,endAngle:,color:}
*/
drawAnnular.prototype.drawSectorFun = function(ctx,oSector){
    ctx.beginPath();
    ctx.arc(oSector.x, oSector.y, oSector.r, oSector.startAngle, oSector.endAngle, false);
    ctx.strokeStyle = oSector.stockColor;
    ctx.lineWidth = oSector.lineWidth;
    ctx.stroke();
    ctx.closePath();
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
    }
}

export default drawAnnular;