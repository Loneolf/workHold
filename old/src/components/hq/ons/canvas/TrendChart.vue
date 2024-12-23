<template>
    <div class="h5_trendChart" >
    	{{{trendchart}}}
    </div>
</template>
<script>
var H5TrendChart = function(cfg) {
    var component = $('<div></div>');
    //  绘制网格线 - 背景层
    // 宽高都是放大后的数据，在移动端缩小之后会更清晰
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    $(cns).css('zIndex',1);

    //  水平网格线
    var step = 4;
    ctx.beginPath();
    ctx.strokeStyle='#eee';
    ctx.lineWidth = 1;
    for(var i=0;i<step+1;i++){
        var y = (h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    // 垂直网格线
    step = 4;
    for(var i=0;i<step+1;i++){
        var x = (w/step)*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle='#ff0f0f';
    ctx.lineWidth = 4;
    var ln = cfg.data.length,newdata = [];
    //  取数据
    for(var i=0;i<ln;i++){
        newdata.push(cfg.data[i][1]);
    }
    //  数据中最大值和最小值
    var max = Math.max.apply({},newdata);
    var min = Math.min.apply({},newdata);
    //  走势线
    ctx.moveTo(0,h-(h/(max-min)*(newdata[0]-min)));
    for(var i=1;i<ln;i++){
        ctx.lineTo((w/ln)*i+(w/ln),h-(h/(max-min)*(newdata[i]-min)));
    }
    ctx.stroke();

    //日期处理
    var datehtml = $('<div class="h5_trendChart_date"></div>');
    datehtml.append('<span class="left">'+cfg.data[0][0]+'</span>');
    datehtml.append('<span>'+cfg.data[Math.floor((ln-1)/2)][0]+'</span>');
    datehtml.append('<span class="right">'+cfg.data[ln-1][0]+'</span>');
    //左边数值处理
    var unit = $('<div class="h5_trendChart_unit"></div>');
    unit.append('<span>'+max+'</span>');
    unit.append('<span>'+Math.floor(min+(max-min) *0.75)+'</span>');
    unit.append('<span>'+Math.floor(min+(max-min) /2)+'</span>');
    unit.append('<span>'+Math.floor(min+(max-min) /2/2)+'</span>');
    unit.append('<span>'+min+'</span>');

    component.append(cns);
    component.append(datehtml);
    component.append(unit);

    return component;
};

export default {
	/*ready(){
		var s1 = H5TrendChart(this.cfg1);
		$('.h5_trendChart').html(s1);
	},*/
    data() {
        return {
            cfg1: {
                width:($(window).width()-43)*2,
	            height:300,
	            data:[]
            },
            trendchart: ''
        }
    },
    events: {
        'parent-chartData': function(chartData) {
            this.cfg1.data = chartData;
            var s1 = H5TrendChart(this.cfg1);
//            $('.h5_trendChart').html(s1);
          $(this.$el).html(s1);
        }
    }
}
</script>

<style lang="less">
	.h5_trendChart .h5_trendChart_date {
	    position: absolute;
	    bottom: 5px;
	    width: 100%;
	    left: 0;
	    padding: 0 8px 0 15px;
	    font-size: 14px;
	}
	.h5_trendChart .h5_trendChart_unit {
	    position: absolute;
	    left: 0;
	    top: 0px;
	    width: 35px;
	    font-size: 14px;
	}
	.h5_trendChart_unit span {
	    display: block;
	    text-align: center;
	    line-height: 34px;
	}

	.h5_trendChart_date span {
	    width: 33%;
	    display: inline-block;
	    text-align: center;
	}
	.h5_trendChart_date .left {
	    text-align: left;
	}
	.h5_trendChart_date .right {
	    text-align: right;
	}
	.h5_trendChart canvas {
	    width: 100%;
	    height: 100%;
	    background-color: #131313;
	}
</style>
