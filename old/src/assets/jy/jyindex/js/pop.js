/*
* date:20140912
* @Author 九指神丐
*
* */
;(function(window,$){
    function Window(){//Window的类
        this.cfg={
            content:'',             //内容
            title:'系统消息',       //标题
            hasCloseBtn:false,      //是否显示关闭按钮
            customContent:'',       //自定义内容
            hasMask:true,           //是否显示遮罩
            skinClassName:null,     //皮肤
            text4AlertBtn:'确定',   //alert按钮文字
            text4ConfrimBtn:'确定', //ConfrimBtn按钮文字
            text4CancelBtn:'取消',  //CancelBtn按钮文字
            handler4AlertBtn:null,  //Alert事件之后调用函数
            handler4CloseBtn:null,  //Close事件之后调用函数
            handler4ConfrimBtn:null,//Confrim事件之后调用函数
            handler4CancelBtn:null,  //Cance事件之后调用函数
            callBack:null
        };
    }
    Window.prototype = {
        renderUI : function(){//界面
            var footerContent = '';
            var _this = this;
            switch(this.cfg.winType){
                case 'alert':
                    footerContent = '<span class="window_alertBtn" >'+this.cfg.text4AlertBtn+'</span>';
                    break;
                case 'confirm':
                    footerContent = '<span class="window_ConfrimBtn" >'+this.cfg.text4ConfrimBtn+'</span><span class="window_CancelBtn" >'+this.cfg.text4CancelBtn+'</span>';
                    break;
            }
            this.boundingBox = $(
                    '<div class="window_boundingBox">'+
                    '<div class="window_header">'+this.cfg.title+'</div>'+
                    '<div class="window_body'+(_this.cfg.bodyClass ?' '+_this.cfg.bodyClass : '')+'">'+this.cfg.content+'</div>'+
                    '<div class="window_footer">'+footerContent+'</div>'+
                    '</div>'
            );
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
                this._mask.css('top',document.body.scrollTop);
                var that = this;
                document.body.addEventListener("touchmove", that.ban, false);
            }
            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }
            this.boundingBox.appendTo(document.body);
            this.cfg.callBack && this.cfg.callBack();
            this.cfg.callBack=null;

        },
        custom : function(){//自定义页面
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }
            this.boundingBox = $('<div class="window_custon">'+this.cfg.customContent+'</div>');
            this.boundingBox.appendTo(document.body);
            var that = this;
            //document.body.addEventListener("touchmove", that.ban, false);
            this.cfg.callBack && this.cfg.callBack();
        },
        destructor:function(){//取消遮罩
            this._mask && this._mask.remove();
        },
        on:function(type,handler){//添加事件
            if(typeof this.handlers[type] == 'undefined'){
                this.handlers[type]=[];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){//事件处理
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for (var i=0,len = handlers.length;i<len;i++) {
                    handlers[i](data)
                }
            }
        },
        bindUI:function(){//界面绑定事件
            var that = this;
            this.boundingBox.delegate('.window_alertBtn','click',function(){
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn','click',function(){
                that.fire('close');
                that.destroy();
            }).delegate('.window_ConfrimBtn','click',function(){
                that.fire('confirm');
                //that.destroy();
            }).delegate('.window_CancelBtn','click',function(){
                that.fire('cancel');
                that.destroy();
            });
            if(this.cfg.handler4AlertBtn){
                this.on('alert',this.cfg.handler4AlertBtn);
            }
            if(this.cfg.handler4CloseBtn){
                this.on('close',this.cfg.handler4CloseBtn);
            }
            if(this.cfg.handler4ConfrimBtn){
                this.on('confirm',this.cfg.handler4ConfrimBtn);
            }
            if(this.cfg.handler4CancelBtn){
                this.on('cancel',this.cfg.handler4CancelBtn);
            }
        },
        destroy:function(){//弹出层取消
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
            var that =this;
            document.body.removeEventListener("touchmove", that.ban, false)
        },
        syncUI : function(cfg){//添加样式
            this.boundingBox.css({
                left:(this.cfg.x || (window.innerWidth-this.boundingBox.width())/2)+'px',
                top:(this.cfg.y || (window.innerHeight-(cfg ? cfg.height : this.boundingBox.height()))/2 + document.body.scrollTop-40)+'px'
            });
            //$('body').css('height',window.innerHeight);
            if(this.cfg.skinClassName){
                boundingBox.addClass(this.cfg.skinClassName);
            }
        },
        render:function(container){//初始化加载
            this.renderUI();
            this.handlers={};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
            var that = this;
            //document.body.addEventListener("touchmove", that.ban, false);
        },
        alert : function (cfg){//alert模块
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm : function (cfg){//confirm模块
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        },
        prompt : function (cfg){//prompt模块
            this.handlers={};
            $.extend(this.cfg,cfg,{winType:'prompt'});
            this.custom();
            this.bindUI();
            return this;
        },
        ban : function(e){
            e = e || event;
            e.preventDefault();
        }
    };
    var _pop = {window:Window};
    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        //支持amd写法
        module.exports = Window;
    } else {
        //支持cmd写法
        if ( typeof define === "function" /*&& define.amd*/ ) {
            define(/* "TZT", [], */function () { return _pop; } );
        }
    }
    if ( typeof window === "object" && typeof window.document === "object" ) {
        window.pop=_pop;
    }
})(window,$);
 /*define(function(require,exports,module){
    //var $ = require('jquery-1.7.1.min.js');
    function Window(){//Window的类
        this.cfg={
            content:'',             //内容
            title:'系统消息',       //标题
            hasCloseBtn:false,      //是否显示关闭按钮
            customContent:'',       //自定义内容
            hasMask:true,           //是否显示遮罩
            skinClassName:null,     //皮肤
            text4AlertBtn:'确定',   //alert按钮文字
            text4ConfrimBtn:'确定', //ConfrimBtn按钮文字
            text4CancelBtn:'取消',  //CancelBtn按钮文字
            handler4AlertBtn:null,  //Alert事件之后调用函数
            handler4CloseBtn:null,  //Close事件之后调用函数
            handler4ConfrimBtn:null,//Confrim事件之后调用函数
            handler4CancelBtn:null,  //Cance事件之后调用函数
            callBack:null
        };
    }
    Window.prototype = {
        renderUI : function(){//界面
            var footerContent = '';
            switch(this.cfg.winType){
                case 'alert':
                    footerContent = '<span class="window_alertBtn" >'+this.cfg.text4AlertBtn+'</span>';
                    break;
                case 'confirm':
                    footerContent = '<span class="window_ConfrimBtn" >'+this.cfg.text4ConfrimBtn+'</span><span class="window_CancelBtn" >'+this.cfg.text4CancelBtn+'</span>';
                    break;
            }
            this.boundingBox = $(
                    '<div class="window_boundingBox">'+
                    '<div class="window_header">'+this.cfg.title+'</div>'+
                    '<div class="window_body">'+this.cfg.content+'</div>'+
                    '<div class="window_footer">'+footerContent+'</div>'+
                    '</div>'
            );
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
                this._mask.css('top',document.body.scrollTop);
                var that = this;
                document.body.addEventListener("touchmove", that.ban, false);
            }
            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }
            this.boundingBox.appendTo(document.body);
            this.cfg.callBack && this.cfg.callBack();
            this.cfg.callBack=null;

        },
        custom : function(){//自定义页面
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }
            this.boundingBox = $('<div class="window_custon">'+this.cfg.customContent+'</div>');
            this.boundingBox.appendTo(document.body);
            var that = this;
            document.body.addEventListener("touchmove", that.ban, false);
            this.cfg.callBack && this.cfg.callBack();
        },
        destructor:function(){//取消遮罩
            this._mask && this._mask.remove();
        },
        on:function(type,handler){//添加事件
            if(typeof this.handlers[type] == 'undefined'){
                this.handlers[type]=[];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){//事件处理
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for (var i=0,len = handlers.length;i<len;i++) {
                    handlers[i](data)
                }
            }
        },
        bindUI:function(){//界面绑定事件
            var that = this;
            this.boundingBox.delegate('.window_alertBtn','click',function(){
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn','click',function(){
                that.fire('close');
                that.destroy();
            }).delegate('.window_ConfrimBtn','click',function(){
                that.fire('confirm');
                that.destroy();
            }).delegate('.window_CancelBtn','click',function(){
                that.fire('cancel');
                that.destroy();
            });
            if(this.cfg.handler4AlertBtn){
                this.on('alert',this.cfg.handler4AlertBtn);
            }
            if(this.cfg.handler4CloseBtn){
                this.on('close',this.cfg.handler4CloseBtn);
            }
            if(this.cfg.handler4ConfrimBtn){
                this.on('confirm',this.cfg.handler4ConfrimBtn);
            }
            if(this.cfg.handler4CancelBtn){
                this.on('cancel',this.cfg.handler4CancelBtn);
            }
        },
        destroy:function(){//弹出层取消
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
            var that =this;
            document.body.removeEventListener("touchmove", that.ban, false)
        },
        syncUI : function(cfg){//添加样式
            this.boundingBox.css({
                left:(this.cfg.x || (window.innerWidth-this.boundingBox.width())/2)+'px',
                top:(this.cfg.y || (window.innerHeight-(cfg ? cfg.height : this.boundingBox.height()))/2 + document.body.scrollTop)+'px'
            });
            //$('body').css('height',window.innerHeight);
            if(this.cfg.skinClassName){
                boundingBox.addClass(this.cfg.skinClassName);
            }
        },
        render:function(container){//初始化加载
            this.renderUI();
            this.handlers={};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
            var that = this;
            document.body.addEventListener("touchmove", that.ban, false);
        },
        alert : function (cfg){//alert模块
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm : function (cfg){//confirm模块
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        },
        prompt : function (cfg){//prompt模块
            this.handlers={};
            $.extend(this.cfg,cfg,{winType:'prompt'});
            this.custom();
            this.bindUI();
            return this;
        },
        ban : function(e){
            e = e || event;
            e.preventDefault();
        }
    };
    exports.window = Window;//pop的入口
     if ( typeof module === "object" && module && typeof module.exports === "object" ) {
         //支持amd写法
         module.exports = TZT;
     } else {
         //支持cmd写法
         if ( typeof define === "function" *//*&& define.amd*//* ) {
             define(*//* "TZT", [], *//*function () { return TZT; } );
         }
     }
     if ( typeof window === "object" && typeof window.document === "object" ) {
         window.TZT = window.T = TZT;
     }
});*/
