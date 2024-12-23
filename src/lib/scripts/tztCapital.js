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
        r = Math.min(this.options.csWidth,this.options.csHeight)-this.options.paddingTB-this.options.lineWidth,
        startAngle = 0,
        endAngle = 0;
    endAngle += Math.PI*2*saveData['主力']['liuru']; //主力流入占比
    canArr[0] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#ff3237",'name':'主力流入','val':(saveData['主力']['liuru']*100).toFixed(1)+'%',
    }
    startAngle = endAngle;
    endAngle += Math.PI*2*saveData['散户']['liuru']; //主力流入占比
    canArr[1] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#ff8e36",'name':'散户流入','val':(saveData['散户']['liuru']*100).toFixed(1)+'%',
    }
    startAngle = endAngle;
    endAngle += Math.PI*2*saveData['散户']['liuchu']; //主力流入占比
    canArr[2] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#b3d950",'name':'散户流出','val':(saveData['散户']['liuchu']*100).toFixed(1)+'%',
    }
    startAngle = endAngle;
    endAngle += Math.PI*2*saveData['主力']['liuchu']; //主力流入占比
    canArr[3] = {
        'x':x,'y':y,'r':r,'startAngle':startAngle,'endAngle':endAngle,
        "color":"#3fb344",'name':'主力流出','val':(saveData['主力']['liuchu']*100).toFixed(1)+'%',
    }
    var nFontWidth = this.getFontWidth(ctx,'主力流出',this.options.tlFontSize); //计算所需宽度
    for(var i=0,len=canArr.length;i<len;i++){
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
    ctx.beginPath();
    ctx.arc(oSector.x, oSector.y, oSector.r, oSector.startAngle, oSector.endAngle, false);
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
    ctx.fillStyle = '#b4afab';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('今日资金',oSector.x,Number(oSector.y)-Number(this.options.zjFontSize)/2-4);
    ctx.fillStyle = '#00aeff';
    ctx.fillText('Capital Flows',oSector.x,Number(oSector.y)+Number(this.options.zjFontSize)/2+4);
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
    ctx.fillStyle=oSector.color;/*设置填充颜色*/
    ctx.fillRect(x,y,maxWidth,this.options.tlFontSize+10);
    ctx.fill();
    ctx.closePath();
    
    ctx.font = this.options.tlFontSize+"px Arial,sans-serif";
    ctx.fillStyle = '#fff';
    ctx.textBaseline="top";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(oSector['val'],sj[0]+maxWidth/2,sj[1]+this.options.tlFontSize/2+5);
    ctx.textAlign="left";
    ctx.textBaseline="alphabetic";
    ctx.fillStyle = oSector.color;
    ctx.fillText(oSector['name'],sj[0],sj[1]+this.options.tlFontSize+24+this.options.tlFontSize/2);
}

/*@作用 计算图例展示需要多宽
*@param strText 文本
*@param fontSize 文字大小
*/
Capital.prototype.getFontWidth = function(ctx,strText,fontSize){
    !!fontSize?(ctx.font=fontSize+'px Tahoma, Arial,sans-serif'):''; //设置文字大小
    return ctx.measureText(strText).width; //返回文本大小
}

export default new Capital();