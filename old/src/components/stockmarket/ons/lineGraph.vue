<template>
    <div class="h5_difference" >
    	{{{difference}}}
    </div>
</template>
<script>
var H5Difference = function(cfg) {
    var component = $('<div></div>');
    component.css({
            'position': 'relative',
            "padding-top": "20px"
        })
        //  绘制网格线 - 背景层
        // 宽高都是放大后的数据，在移动端缩小之后会更清晰
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);

    //新建画布上一层
    var cnst = document.createElement('canvas');
    var ctxt = cnst.getContext('2d');
    cnst.width = ctxt.width = w;
    cnst.height = ctxt.height = h;
    $(cnst).css({
        'zIndex': 2,
        position: 'absolute',
        top: 0,
        left: 0
    });

    //  水平网格线
    var step = 4;
    ctx.beginPath();
    ctx.strokeStyle = '#3e3e3e';
    ctx.lineWidth = 6;
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#3e3e3e';
    ctx.lineWidth = 1;
    // 垂直网格线
    /*step = 5;
    for (var i = 0; i < step + 1; i++) {
        var x = ((w - 20) / step) * i + 10;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    ctx.stroke();*/

    ctx.beginPath();
    ctx.strokeStyle = '#00a9f8';
    ctx.lineWidth = 2;
    var ln = cfg.data.length,
        newdata = [];
    //  取数据

    //日期处理
    var datehtml = $('<div class="h5_difference_date"></div>');

    for (var i = 0; i < ln; i++) {
        newdata.push(cfg.data[i][1]);
        var cls = ''
        if (i == 0) {
            cls = 'left';
        } else if (i == ln -1) {
            cls = 'right'
        }else{
            continue;
        }
        datehtml.append('<span class="' + cls + '">' + (cfg.data[0][0]).slice(4).replace(/(\d{2})(\d{2})/g, '$1-$2') + '</span>');
    }
    //  数据中最大值和最小值
    var max = Math.max.apply({}, newdata);
    var min = Math.min.apply({}, newdata);
    //  走势线
    max = max + 5;
    min = min - 1;

    var point = []
    //ctx.moveTo(10,h-(h/(max-min)*(newdata[0]-min)));
    ctx.lineWidth = 4;
    for (var i = 0; i < ln; i++) {
        var qz = (w - 20) / (ln - 1);
        var x = qz * i + 10;
        // var y = h - (h / (max - min) * (newdata[i] - min));
        var y = h-(h/max*newdata[i]);
        if (i == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
        point.push([x,y]);
    }
    ctx.stroke();

    ctx.beginPath();
    var ln = point.length;
    for (var i = 0; i < ln; i++) {
        if (i == 0) {
            ctx.moveTo(point[i][0], point[i][1]);
        }
        ctx.lineTo(point[i][0], point[i][1]);
    }
    ctx.lineTo(point[ln-1][0], h);
    ctx.lineTo(point[0][0], h);
    ctx.closePath();
    var grd=ctx.createLinearGradient(0,0,0,h);
        grd.addColorStop(0,"#1d3946");
        grd.addColorStop(1,"#09141b");
    ctx.fillStyle=grd;
    ctx.fill();

    //画圆
    for (var i = 0; i < point.length; i++) {
        /*var qz = (w - 20) / (ln - 1);
        var x = qz * i + 10;
        var y = h - (h / (max - min) * (newdata[i] - min));*/
        var x = point[i][0];
        var y = point[i][1];
        ctx.beginPath();
        ctx.fillStyle = '#00a9f8';point[i][1];
        ctx.strokeStyle = '#ff0f0f';
        ctx.lineWidth = .1;
        if (i == 0) {
            ctx.moveTo(10, point[i][1]+2);
            ctx.arc(10, point[i][1]+2, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.moveTo(10, point[i][1]+2);
            ctx.arc(10, point[i][1]+2, 6, 0, 2 * Math.PI);
        } else if(i == ln-1){
            ctx.moveTo(x, y);
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.moveTo(x, y);
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
        }
        ctx.closePath()
        ctx.fill();
        ctx.stroke();
    }

    /*function mouseMoveEvent(x) {
        var barstep = (w - 20) / (ln - 1) / 2 + 5;
        var canvasLeft = component.offset().left;
        var xNum = (x - canvasLeft - 5) / barstep;
        if (xNum > Math.floor(xNum) + 0.5) {
            xNum = Math.ceil(xNum);
        } else {
            xNum = Math.floor(xNum);
        }
        var val = newdata[xNum];

        var r = cnst.getContext("2d");
        r.clearRect(0, 0, w, h);
        r.beginPath();
        r.strokeStyle = '#fff';
        r.lineWidth = 0;
        //r.strokeRect(0, 0, w, h);//strokeRect
        r.stroke();
        r.fillStyle = '#fff';
        r.textAlign = "left";
        r.font = "20px arial";

        var qz = (w - 20) / (ln - 1);
        var x = qz * xNum;
        var y = h - (h / (max - min) * (newdata[xNum] - min));
        if (y < 12) {
            y = 14;
        }
        if (y > 130) {
            y = 110;
        }
        if (y < 110 && y > 100) {
            y = 100;
        }
        r.fillText(val, x, y)
    }*/


    component.append(cns);
    component.append(cnst);
    component.append(datehtml);

    /*component.off().on('click',function(e){
        mouseMoveEvent(e.clientX);
    })*/
    /*if (isMobile()) {
        component.on('touchstart', function(e) {
            mouseMoveEvent(e.changedTouches[0].clientX);
        })
        component.on('touchmove', function(e) {
            mouseMoveEvent(e.changedTouches[0].clientX);
        })
    } else {
        component.on('click', function(e) {
            mouseMoveEvent(e.clientX);
        })
    }

    function isMobile() {
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
    }*/
    return component;
};
/*
var cfg1 = {
            width:($(window).width()-60)*2,
            height:140,
            data:[
                ['20151123','41'],
                ['20151124','40'],
                ['20151125','28'],
                ['20151126','37'],
                ['20151127','31'],
                ['20151128','28']
            ]
        }
        var s1 = H5Difference(cfg1);
        $('.h5_difference').html(s1);
*/
export default {
	ready(){
		var s1 = H5Difference(this.cfg1);
		$('.h5_difference').html(s1);
	},
    data() {
        return {
            cfg1: {
                width: ($(window).width() - 60) * 2,
                height: 140,
                data: [
                    ['20151123', '41'],
                    ['20151124', '40'],
                    ['20151125', '20'],
                    ['20151126', '37'],
                    ['20151127', '21'],
                    ['20151128', '30']
                ]
            },
            difference: ''
        }
    }
}
</script>

<style lang="less">
	.h5_difference canvas {
	    width: 100%;
	    height: 100%;
	}
	.h5_difference .h5_difference_date {
	    position: absolute;
	    bottom: -13px;
	    width: 100%;
	    left: 0;
	    font-size: 14px;
        background-color: #090e11;
	    span{
	    	width: 50%;
		    display: inline-block;
		    text-align: center;
	    }
	    .left {
		    text-align: left;
		}
        .right{
            text-align: right;
        }
	}
	.h5_difference{
		padding-bottom: 18px;
	}
</style>
