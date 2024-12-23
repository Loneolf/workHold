/**
 * [Capital 绘制资金图]
 */
 function Capital(){
    this.options = {
        $canvas:'', //canvas对象
        $images:'', //canvas对象
        padding:0, //左右间距
        paddingTB:0, //上下间距
        tlFontSize:0, //图例文字大小
        zjFontSize:0, //中间文字大小
        oData:'', //20131功能号返回的数据
        csWidth:0, //canvas 宽度
        csHeight:0, //canvas 高度
        lineWidth:60, //环形图颜色区分
        fontColor1:'#666666',
        fontColor:'#333333',
        jmrAccount: 0.00
    }
}
/**
 * [init 调用初始化方法]
 * @param {Object} options 配置字段
 */
Capital.prototype.init = function(option){
    this.options = $.extend(this.options,option); //合并参数
    if(this.options.$images.length<=0) return;
    this.parseddata(this.options.oData);
}

/**
 * [parseddata 对getData返回数据进行处理]
 * @param  {Object} oData [description]
 * @return {[type]}       [description]
 */
Capital.prototype.parseddata = function(oData){
    if(!oData || oData.length<=1) return;
    this.initcanvas(); //绘制canvas  
}

Capital.prototype.initcanvas = function(){
    var _this = this,
        canvas=document.createElement('canvas');
    _this.options.csWidth = (_this.options.csWidth?_this.options.csWidth:document.body.clientWidth);
    var x = this.options.csWidth*2,
        y = this.options.csHeight*2;
    canvas.width = x; //设置高度
    canvas.height = y; //设置高度
    canvas.style.width = _this.options.csWidth;
    canvas.style.height = _this.options.csHeight;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, x, y); //清除画布
    this.drawCanvas(ctx);
    _this.options.$images.attr({'src':canvas.toDataURL("image/png"),'width':_this.options.csWidth+'px','height':(_this.options.csHeight+'px')});
}

/**
 * [drawCanvas 绘制canvas]
 * @return {[type]} [description]
 */
Capital.prototype.drawCanvas = function(ctx){
    var data = this.options.oData.GRID0,
        saveData = {},
        all = 0; //用于计算百分比
    if(data.length<=1) return;
    for(var i=1,len=data.length;i<len;i++){
        if(data[i].indexOf('主力')>=0 || data[i].indexOf('散户')>=0){
            var listDate = data[i].split('|');
            saveData[listDate[0]] = {'流入':listDate[1],'流出':listDate[2]};
            saveData.length = i;
            listDate[1] && listDate[2] ? all +=parseFloat(listDate[1])+parseFloat(listDate[2]):!1;
        }
    }
    for(var x in saveData){
        if(!saveData[x] || typeof saveData[x] != 'object') continue;
        saveData[x]['liuru']=((saveData[x]['流入']/all) || 0).toFixed(3) || 0;
        saveData[x]['liuchu']=((saveData[x]['流出']/all) || 0).toFixed(3) || 0;
    }
    var canArr = [],
        x = this.options.csWidth,
        y = this.options.csHeight,
        // r = Math.min(this.options.csWidth,this.options.csHeight)-this.options.paddingTB-this.options.lineWidth-35,
        r = 100,
        startAngle = 0,
        endAngle = 0;
    endAngle += Math.PI*2*saveData['散户']['liuru']; //主力流入占比
    canArr[0] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#fc9999",'color1':'#e56a39','name':'散户流入','val':(saveData['散户']['liuru']*100).toFixed(1)+'%','yVal':saveData['散户']['流入']
    }
    startAngle = endAngle;
    endAngle += Math.PI*2*saveData['散户']['liuchu']; //主力流入占比
    canArr[1] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#bbf0b8","color1":"#01aa6c",'name':'散户流出','val':(saveData['散户']['liuchu']*100).toFixed(1)+'%','yVal':saveData['散户']['流出']
    }
    startAngle = endAngle;
    endAngle += Math.PI*2*saveData['主力']['liuchu']; //主力流入占比
    canArr[2] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#529C4F","color1":"#059761",'name':'主力流出','val':(saveData['主力']['liuchu']*100).toFixed(1)+'%','yVal':saveData['主力']['流出']
    }
    startAngle = endAngle;
    endAngle += Math.PI*2*saveData['主力']['liuru']; //主力流入占比
    canArr[3] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#de2121","color1":'#e53e39','name':'主力流入','val':(saveData['主力']['liuru']*100).toFixed(1)+'%','yVal':saveData['主力']['流入']
    }
    var nFontWidth = this.getFontWidth(ctx,'主力流出流出',this.options.tlFontSize); //计算所需宽度
    for(var i=0,len=canArr.length;i<len;i++){
        if(!canArr[i].color1) continue;
        this.drawSectorFun(ctx,canArr[i]);
        this.drawTL(ctx,canArr[i],i,nFontWidth);
    }
    if(all==0) this.drawSectorFun(ctx,{'x':x,'y':y,'r':r,'startAngle':0,'endAngle':Math.PI*2,color:'#eeeeee'});
    this.drawCenterText(ctx,{'x':x,'y':y,'r':r-this.options.lineWidth/2,'startAngle':0,'endAngle':Math.PI*2}); //绘制中心文字
}

/*@作用 画环形图
*@param ctx 2d画图环境
*@param oSector:{x:,y:,r,startAngle:,endAngle:,color:}
*/
Capital.prototype.drawSectorFun = function(ctx,oSector){
    // ctx.beginPath();
    // ctx.arc(oSector.x, oSector.y, oSector.r, oSector.startAngle, oSector.endAngle, false);
    // ctx.strokeStyle = oSector.color1;
    // ctx.lineWidth = 20;
    // ctx.stroke();
    // ctx.closePath();

    ctx.beginPath();
    ctx.arc(oSector.x, oSector.y, oSector.r+20, oSector.startAngle, oSector.endAngle, false);
    ctx.strokeStyle = oSector.color;
    ctx.lineWidth = this.options.lineWidth;
    ctx.stroke();
    ctx.closePath();
}

/**
 * [drawCenterText 绘制中文文案]
 * @param  {Object} ctx     画布对象
 * @param  {Object} oSector 绘制位置
 */
Capital.prototype.drawCenterText = function(ctx,oSector){
    ctx.font = this.options.zjFontSize+"px Arial,sans-serif";
    ctx.fillStyle = this.options.fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    console.log(this.options.oData);
    ctx.fillText('净买入',oSector.x,Number(oSector.y)-Number(this.options.zjFontSize)/2-4);
    ctx.save();
    ctx.fillStyle = this.options.aColor;
    ctx.fillText(fmtunit(this.options.jmrAccount, 2) || '0.00', oSector.x,Number(oSector.y)+Number(this.options.zjFontSize)/2+4);
    ctx.restore();
}

/**
 * [drawTL 绘制图例]
 * @param  {Object} ctx     画布对象
 * @param  {Object} oSector 绘制参数
 * @param  {ini} i       绘制象限
 * @param {int} maxWidth 最大宽度
 */
Capital.prototype.drawTL = function(ctx,oSector,i,maxWidth){
    var sj = [],
        allWidth = this.options.csWidth*2,
        allHeight = this.options.csHeight*2,
        nPadd = 40,x=0,y=0,nPaddTB=20;
    switch(i){
        case 0: //第2象限
            x = allWidth - this.options.padding - nPadd - maxWidth;
            y = allHeight - this.options.paddingTB - nPaddTB - (this.options.tlFontSize*2+14);
            break;
        case 1: //第3象限
            x = nPadd;
            y = allHeight - this.options.paddingTB - nPaddTB - (this.options.tlFontSize*2+14);
            break;
        case 2: //第4象限
            x = nPadd;
            y = this.options.paddingTB+nPaddTB;
            break;
        case 3: //第1象限
            x = allWidth - this.options.padding - nPadd - maxWidth;
            y = this.options.paddingTB+nPaddTB;
            break;
    }
    sj = [x,y];
    ctx.beginPath();
    ctx.arc(x,y,8,0,Math.PI*2,false);
    ctx.fillStyle=oSector.color;//填充颜色,默认是黑色
    ctx.fill();//画实心圆
    ctx.closePath();
    ctx.font = this.options.tlFontSize+"px Arial,sans-serif";
    ctx.textAlign="left";
    ctx.textBaseline="middle";
    ctx.fillStyle = this.options.fontColor1;
    ctx.fillText(oSector['name'],sj[0]+16,sj[1]);
    //百分比值
    ctx.font = this.options.tlFontSize*1.2+"px Arial,sans-serif";
    ctx.fillStyle = oSector.color;
    ctx.textBaseline="middle";
    ctx.textAlign="left";
    ctx.fillText(oSector['val'],sj[0]+16,sj[1]+this.options.tlFontSize+10);
    //具体值
    ctx.font = this.options.tlFontSize+"px Arial,sans-serif";
    ctx.textAlign="left";
    ctx.textBaseline="middle";
    ctx.fillStyle = this.options.fontColor;
    ctx.fillText(fmtunit(oSector['yVal'],2)+'元',sj[0]+16,sj[1]+this.options.tlFontSize*2+24);
}

/*@作用 计算图例展示需要多宽
*@param strText 文本
*@param fontSize 文字大小
*/
Capital.prototype.getFontWidth = function(ctx,strText,fontSize){
    !!fontSize?(ctx.font=fontSize+'px Tahoma, Arial,sans-serif'):''; //设置文字大小
    return ctx.measureText(strText).width; //返回文本大小
}


var fmtunit = function(num, digit, isunit, isFormat) {
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
    num = Number(num)*10000+'';
    num = num.toString();
    var arrNum = num.split('.');
    var arrln = arrNum[0].length;
    if(arrln >= 6 && arrln < 9) {
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
var format = function(num, dig) {
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

export default new Capital();