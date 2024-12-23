/**
 * [MoveRuler 绘制辅助指标]
 * @param  {Object}   option 传递数据
 * @param  {Function} fn     [回调函数]
 */
function MoveRuler(){
    this.options = {
        data:[/*{name:'20170929',type:'1'},
            {name:'价：',value:'11041.87',color:'#000000'},
            {name:'涨：',value:'-27.95',color:'#000000'},
            {name:'幅：',value:'-0.25%',color:'#000000'},
            {name:'量：',value:'749306',color:'#000000'},
            {name:'均：',value:'11073.42',color:'#000000'}*/],
        padding:0, //左右间距
        padTPing:0, //上下间距
        nHeight:32, //默认高度32px 跟tab切换高度保持一致
        nWidth:0, //默认宽度，不传取body的宽度
        fontSize:20,
        columnCount:5,
        idImg:'', //#testTime
    }
}

/**
 * [init 初始化方法]
 */
MoveRuler.prototype.init = function(option,fn){
    this.options = $.extend(this.options,option);
    var _this = this,
        _canvas = $(_this.options.idImg),
        canvas=_canvas[0],
        nWidth=(_this.options.nWidth?_this.options.nWidth:document.body.clientWidth),
        nHeight=_this.options.nHeight;
    _this.options.width = nWidth*2;
    _this.options.height = nHeight*2;
    canvas.width = _this.options.width; //设置高度
    canvas.height = _this.options.height; //设置高度
    _canvas.css({'width':nWidth+'px','height':nHeight+'px'});
    var ctx = canvas.getContext('2d'),
        x=nWidth*2,y=nHeight*2;
    ctx.clearRect(0, 0, x, y); //清除
    _this.drawMain(ctx);
    // if($(_this.options.idImg).size()>0){
    //     $(_this.options.idImg).attr({'src':canvas.toDataURL("image/png"),'width':'auto','height':(nHeight+'px')});
    // }
    fn && fn();
}


/*@作用 主体逻辑
*@param ctx 绘制上下文
*/
MoveRuler.prototype.drawMain = function(ctx){
    var _self = this,
        timeWidth = _self.getFontWidth(ctx,_self.options.data[0].name,_self.options.fontSize)+10,
        nStepWidth = (_self.options.width-_self.options.padding*2-timeWidth)/_self.options.columnCount; //每列宽度
    var nTempHeight = (_self.options.height-_self.options.padTPing*2-_self.options.fontSize)/2,//实际上下间距
        nTempX = _self.options.padding; //第一个点x轴距离

    for(var i=0,len=_self.options.data.length;i<len;i++){
        var oItem = _self.options.data[i],
            sName = (typeof oItem.name != 'undefined' && typeof oItem.name != 'null'?oItem.name:''),
            sValue = (typeof oItem.value != 'undefined' && typeof oItem.value != 'null'?oItem.value:''),
            sColor = (typeof oItem.color != 'undefined' && typeof oItem.color != 'null'?oItem.color:''),
            sType = (typeof oItem.type != 'undefined' && typeof oItem.type != 'null'?oItem.type:'');
        //距离
        var x = nTempX,
            y = _self.options.padTPing+nTempHeight+_self.options.fontSize;
        if(!sValue){ //没有value
            !!sType?(nTempX += timeWidth):(nTempX += nStepWidth);
            _self.drawFontText(ctx,{'x':x,'y':y,'text':sName,'color':'','fontSize':_self.options.fontSize});
        }else{
            _self.drawFontText(ctx,{'x':x,'y':y,'text':sName,color:'','fontSize':_self.options.fontSize});
            var nTemp=_self.getFontWidth(ctx,sName,_self.options.fontSize),
                nTempStepWidth=nStepWidth-nTemp-10,
                nTempFontSize=(nTempStepWidth*2)/Math.ceil(_self.getStringWidth(sValue));
            _self.drawFontText(ctx,{'x':(x+nTemp),'y':y,'text':sValue,'color':sColor,'fontSize':(nTempFontSize>_self.options.fontSize?_self.options.fontSize:nTempFontSize)});
            nTempX += nStepWidth;
        }
    }
}

/*@作用 绘制文字
*@param ctx 绘制上下文环境
*@param oFont {x:,y:,text:,color:'',fontSize:''} 绘制文字对象
*/
MoveRuler.prototype.drawFontText = function(ctx,oFont){
    var _self = this;
    if(oFont.color == 'rise'){
      oFont.color = '#fd362f';
    }else if(oFont.color == 'fill'){
      oFont.color = '#4cd964';
    }
    ctx.fillStyle = (oFont.color?oFont.color:'#000000');
    ctx.font = oFont.fontSize+"px Arial,sans-serif";
    ctx.fillText(oFont.text,oFont.x,oFont.y);
}

/*@作用 算大概的宽度
*@param str 字符
*/
MoveRuler.prototype.getStringWidth = function(str){
    var width = str.length;
    for(let i=0,ln=str.length;i<ln;i++){
        if(str.charCodeAt(i)>=57) width++;
    }
    return width;
}

/*@action 计算图例展示需要多宽
*@param strText 文本
*@param fontSize 文字大小
*/
MoveRuler.prototype.getFontWidth = function(ctx,strText,fontSize){
    !!fontSize?(ctx.font=fontSize+'px Tahoma, Arial,sans-serif'):''; //设置文字大小
    return ctx.measureText(strText).width; //返回文本大小
}

export default new MoveRuler();
