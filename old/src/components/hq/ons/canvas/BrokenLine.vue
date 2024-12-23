<template>
  <div class="h5_difference" >
    <div style="position: relative; font-size: 0px;" id="component">
      <canvas style="z-index: 1;" id="cns"></canvas>
      <canvas style="z-index: 2; position: absolute; top: 0px; left: 0px;" id="cnst"></canvas>
    </div>
  </div>
</template>
<script>
  import browser from '../../../../util/browser'
var H5Difference = function(cfg) {
        //  绘制网格线 - 背景层
        // 宽高都是放大后的数据，在移动端缩小之后会更清晰
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个画布（网格线背景）
    var cns = cfg.cns;
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    //新建画布上一层
    var cnst = cfg.cnst;
    var ctxt = cnst.getContext('2d');
    cnst.width = ctxt.width = w;
    cnst.height = ctxt.height = h;

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
    step = 5;
    for (var i = 0; i < step + 1; i++) {
        var x = ((w - 20) / step) * i + 10;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#ff0f0f';
    ctx.lineWidth = 2;
    var ln = cfg.data.length,
        newdata = [];
    //  取数据

    //日期处理
    var datehtml = $('<div class="h5_difference_date"></div>');

    for (var i = 0; i < ln; i++) {
        newdata.push(cfg.data[i][1]);
        var cls = ''
        if (i == 0 || i == 1) {
            cls = 'left';
        } else if (i == 4 || i == 5) {
            cls = 'right'
        }
        datehtml.append('<span class="' + cls + '">' + (cfg.data[i][0]).slice(4).replace(/(\d{2})(\d{2})/g, '$1-$2') + '</span>');
    }
    //  数据中最大值和最小值
    var max = Math.max.apply({}, newdata);
    var min = Math.min.apply({}, newdata);
    //  走势线
    max = max + 1;
    min = min - 1;

    //ctx.moveTo(10,h-(h/(max-min)*(newdata[0]-min)));

    for (var i = 0; i < ln; i++) {
        var qz = (w - 20) / (ln - 1);
        var x = qz * i + 10;
        var y = h - (h / (max - min) * (newdata[i] - min));
        if (i == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    //画圆
    for (var i = 0; i < ln; i++) {
        var qz = (w - 20) / (ln - 1);
        var x = qz * i + 10;
        var y = h - (h / (max - min) * (newdata[i] - min));
        ctx.beginPath();
        ctx.fillStyle = '#ff0f0f';
        ctx.strokeStyle = '#ff0f0f';
        ctx.lineWidth = .1;
        if (i == 0) {
            ctx.moveTo(10, h - (h / (max - min) * (newdata[0] - min)));
            ctx.arc(10, h - (h / (max - min) * (newdata[0] - min)), 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.moveTo(10, h - (h / (max - min) * (newdata[0] - min)));
            ctx.arc(10, h - (h / (max - min) * (newdata[0] - min)), 6, 0, 2 * Math.PI);
        } else {
            ctx.moveTo(x, y);
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.moveTo(x, y);
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
        }
        ctx.closePath()
        ctx.fill();
        ctx.stroke();
    }

    function mouseMoveEvent(x) {
        var barstep = (w - 20) / (ln - 1) / 2 + 5;
        var canvasLeft = cfg.component.offset().left;
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
    }

    /*component.off().on('click',function(e){
        mouseMoveEvent(e.clientX);
    })*/
    if (browser.isMobile()) {
      cfg.component.unbind().on('touchstart', function(e) {
            mouseMoveEvent(e.changedTouches[0].clientX);
        })
      cfg.component.unbind().on('touchmove', function(e) {
            mouseMoveEvent(e.changedTouches[0].clientX);
        })
    } else {
      cfg.component.unbind().on('click', function(e) {
            mouseMoveEvent(e.clientX);
        })
    }
};

export default {
	ready(){
		/*var s1 = H5Difference(this.cfg1);
		$('.h5_difference').html(s1);*/
	},
    data() {
        return {
            cfg1: {
                width: ($(window).width() - 60) * 2,
                height: 140,
                data: []
            },
            difference: ''
        }
    },
    events:{
        'parent-chartdata':function(chartdata){
            this.cfg1.data = chartdata;
            this.cfg1.cns = $(this.$el).find('#cns')[0];
            this.cfg1.cnst = $(this.$el).find('#cnst')[0];
            this.cfg1.component = $(this.$el).find('#component');
            H5Difference(this.cfg1)
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
	    bottom: -27px;
	    width: 100%;
	    left: 0;
	    font-size: 14px;
	    span{
	    	width: 16.5%;
		    display: inline-block;
		    text-align: center;
	    }
	    .left {
		    text-align: left;
		}
	}
	.h5_difference{
		padding-bottom: 36px;
	}
</style>
