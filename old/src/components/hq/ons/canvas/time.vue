<template>
    <div class="h5_difference_time" >
      <div style="position: relative; font-size: 0px;" id="component">
        <canvas style="z-index: 1;" id="cns"></canvas>
        <canvas style="z-index: 2; position: absolute; top: 0px; left: 0px;" id="cnst"></canvas>
      </div>
    </div>
</template>
<script>
  import canvas from '../../../../util/canvas'
  import util from '../../../../util/util';
  import browser from '../../../../util/browser'
/*
* @返回BEGINDATE的时间差
* return hs0,hs1*/
function getTime_c(BEGINDATE) {
  var timeArray = BEGINDATE.slice(0,-1).split('|');
  var timeObj = {};
  for(var t=0;t<timeArray.length;t++){
    var old = timeArray[t].split(':');
    timeObj['hs'+t] = new Date('1970', '1', '2', old[0], old[1], '0').getTime();
  }
  return timeObj;
}

export default {
	ready(){
		/*var s1 = H5Difference(this.cfg1);
		$('.h5_difference').html(s1);*/
	},
    data() {
        return {
            cfg1: {
                width : 0,
                height: 0,
                data  : {}
            },
            difference: '',
          MAXCOUNTS:0
        }
    },
    events:{
        'parent-chartMindata':function(chartdata){
//          console.log(chartdata);
          var Dom = $('.swipes');
          this.cfg1.width = (Dom.width()) * 2;
          this.cfg1.height = (Dom.height()) * 2;
          this.cfg1.cns = $(this.$el).find('#cns')[0];
          this.cfg1.cnst = $(this.$el).find('#cnst')[0];
          if(chartdata.BINHead){
            this.cfg1.data = chartdata;
            this.cfg1.component = $(this.$el).find('#component');
            this.MAXCOUNTS = 0;
            this.H5Difference(this.cfg1);
          }else {
            var cns = this.cfg1.cns;
            var ctx = cns.getContext('2d');
            ctx.clearRect(0, 0, this.cfg1.width, this.cfg1.height);
            var cnst = this.cfg1.cnst;
            var ctxt = cnst.getContext('2d');
            ctxt.clearRect(0, 0, this.cfg1.width, this.cfg1.height);
          }
        }
    },
  methods:{
    H5Difference(cfg) {
      var that = this;
    //  绘制网格线 - 背景层
    // 宽高都是放大后的数据，在移动端缩小之后会更清晰
    var w           = cfg.width;
    var h           = cfg.height;
    var b           = 20;//留20像素写时间位置
    var color_b     = '#3e3e3e';
    var color_line  = '#00a9f8';
    var c_average   = '#f8b526';
    var time_h      = h-b; //画图高度
    var TYPE        = (cfg.data.TYPE ? cfg.data.TYPE : 'min');
    var step        = TYPE == 'five'?5:4;
    var min_h       = time_h/6*4;
    var total_h     = time_h-min_h;
    var ERRORNO     = cfg.data.ERRORNO;
    //最大差值
    var maxRose_val = Math.max.apply({}, [Math.abs(cfg.data.BINHead.close_p-cfg.data.BINHead.max_p),Math.abs(cfg.data.BINHead.close_p-cfg.data.BINHead.Consult)]);
    //界面上最大涨幅的值
    var maxVal      = parseFloat(cfg.data.BINHead.close_p) + parseFloat(maxRose_val);
    var maxRose     = maxRose_val/cfg.data.BINHead.close_p*100;
    //界面上最小跌幅的值
    var min         = parseFloat(cfg.data.BINHead.close_p) - parseFloat(maxRose_val);
    var minRose     = maxRose*(-1);
    var timeObj     = getTime_c(cfg.data.BEGINDATE);
      if(!timeObj.hs3){
        timeObj.hs3 = 0;
      }
      if(!timeObj.hs2){
        timeObj.hs2 = 0;
      }
    var MAXCOUNTS   = ((timeObj.hs1-timeObj.hs0)/(60*1000))+((timeObj.hs3-timeObj.hs2)/(60*1000))+1;
    if(TYPE === 'five'){
      MAXCOUNTS = MAXCOUNTS*5;
    }
    if(MAXCOUNTS<0){
      MAXCOUNTS = MAXCOUNTS*-1;
    }
    that.MAXCOUNTS = MAXCOUNTS;
//  console.log(maxVal,min,maxRose,minRose);
    //分时坐标位置
    function coordinate(p) {
      return min_h/(maxRose_val*2)*(maxVal-p);
    }
    //量坐标
    function coortotal(p) {
      return total_h-(total_h/cfg.data.TIMEHead.total_max*p)+min_h;
    }
    //边框
    function border_canvas() {
      //  水平网格线
      ctx.beginPath();
      ctx.strokeStyle = color_b;
      ctx.lineWidth = 1;
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w, time_h);
      ctx.lineTo(0, time_h);
      ctx.closePath();
      ctx.stroke();
    }

    function transverse() {
      ctx.beginPath();
      ctx.strokeStyle = color_b;
      ctx.lineWidth = 1;
      step = 6;
      for (var i = 1; i < step; i++) {
        var y = (time_h / step) * i;
        if(i%2 === 1){
          ctx.dashedLineTo(0, y,w, y);
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.stroke();
    }

    function vertical() {
      // 垂直网格线
      ctx.beginPath();
      ctx.strokeStyle = color_b;
      ctx.lineWidth = 1;
      for (var i = 1; i < step; i++) {

        var x = (w / step) * i;
        if(i%2){
          ctx.dashedLineTo(x, 0,x, time_h);
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, time_h);
        ctx.stroke();
      }
      ctx.stroke();
    }

    function time_canvas() {
      //画分时图
      ctx.beginPath();
      ctx.strokeStyle = color_line;
      ctx.lineWidth = 1;
      cfg.data.TIMEHead.struct.forEach((item,index)=>{
        if(index < ERRORNO-0){
          let y = coordinate(item.Last_p);
          let x = w/that.MAXCOUNTS*index;
          if(index == 0){
            ctx.moveTo(x, y);
          }else{
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    }

    function average_canvas() {
      //画均线
      ctx.beginPath();
      ctx.strokeStyle = c_average;
      ctx.lineWidth = 1;
      cfg.data.TIMEHead.struct.forEach((item,index)=>{
        if(index < ERRORNO-0){
          let y = coordinate(item.averprice);
          let x = w/that.MAXCOUNTS*index;
          if(index == 0){
            ctx.moveTo(x, y);
          }else{
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    }

    function text_canvas() {
      //最大小涨幅/昨收价
      ctx.beginPath();
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "#fc312a"; //"#000000" "#32a632"
      ctx.textAlign = "left";
      ctx.fillText(maxVal.toFixed(2),0,20);
      ctx.textAlign = "right";
      ctx.fillText(maxRose.toFixed(2)+'%',w,20);


      ctx.fillStyle = "#000000"; //"#000000" "#32a632"
      ctx.textAlign = "left";
      ctx.fillText(cfg.data.BINHead.close_p,0,min_h/2+10);

      ctx.fillStyle = "#32a632"; //"#000000" "#32a632"
      ctx.textAlign = "left";
      ctx.fillText(min.toFixed(2),0,min_h-5);
      ctx.textAlign = "right";
      ctx.fillText(minRose.toFixed(2)+'%',w,min_h-5);
    }

    //成交量
    function volume_canvas() {
      ctx.beginPath();
      ctx.lineWidth = 2;
      cfg.data.TIMEHead.struct.forEach((item,index)=>{
        let y = coortotal(item.total_h);
        let x = w/that.MAXCOUNTS*index;
        var color = '#fc312a';
        if(index > 0){
          if(parseFloat(cfg.data.TIMEHead.struct[index-1]['Last_p'])>parseFloat(item.Last_p)){
            color = '#32a632'
          }else if(parseFloat(cfg.data.TIMEHead.struct[index-1])['Last_p'] == parseFloat(item.Last_p)){
            color = '#000000'
          }
        }
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x, y);
        ctx.lineTo(x, time_h);
        ctx.stroke();
      });
      //成交量显示
      ctx.fillStyle = "#000000";
      ctx.textAlign = "left";
      ctx.fillText(cfg.data.TIMEHead.total_max.toFixed(0),0,min_h+20);
      ctx.textAlign = "left";
      ctx.fillText((cfg.data.TIMEHead.total_max/2).toFixed(0),0,time_h/6*5+10);
    }

    //
    function date_canvas() {
      //时间或者日期
      ctx.fillStyle = "#000000";
      if(cfg.data.BEGINDATE && TYPE == 'min'){
        var timeArray = cfg.data.BEGINDATE.slice(0,-1).split('|');
        for(var i = 0;i<timeArray.length;i++){
          if(timeArray[i]===''){
            continue;
          }
          if(i==0){
            ctx.textAlign = "left";
            ctx.fillText(timeArray[i],0,h);
          }
          if(i==1 && timeArray.length == 4){
            ctx.textAlign = "right";
            ctx.fillText(timeArray[i]+'/',w/2,h);
          }
          if(i==1 && timeArray.length == 2){
            ctx.textAlign = "right";
            ctx.fillText(timeArray[i],w,h);
          }
          if(i==2){
            ctx.textAlign = "left";
            ctx.fillText(timeArray[i],w/2,h);
          }
          if(i==3){
            ctx.textAlign = "right";
            ctx.fillText(timeArray[i],w,h);
          }

        }
      }
      if(cfg.data.ENDDATE && TYPE == 'five'){
        var endDate = cfg.data.ENDDATE.slice(0,-1).split('|');
        var wDate   = w/5;
        endDate.forEach((item,index)=>{
          ctx.textAlign = "center";
          ctx.fillText(item,(wDate*index+(wDate/2)),h);
        })
      }
    }
    //  加入一个画布（网格线背景）
    var cns = cfg.cns;
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    ctx.clearRect(0, 0, w, h);
    //新建画布上一层
    var cnst = cfg.cnst;
    var ctxt = cnst.getContext('2d');
    cnst.width = ctxt.width = w;
    cnst.height = ctxt.height = h;
    //边框
    border_canvas();
    //垂直网格
    vertical();
    // 水平网格线
    transverse();
    //分时线
    time_canvas();
    //均线
    average_canvas();

    text_canvas();
    //成交量
    volume_canvas();
//    ctx.textAlign = "right";

    //画成交量

    //时间
    date_canvas();

    //根据索引得到对应的分时
    function getDateTime(index) {
      if(TYPE === 'five'){
        index = index % (that.MAXCOUNTS/5);
      }
      index = parseInt(index);
      if(!cfg.data.BEGINDATE){
        return;
      }
      var timeArray = cfg.data.BEGINDATE.slice(0,-1).split('|');
      if(timeArray){
        var m = Math.abs(timeObj.hs0-(new Date('1970', '1', '2', '0', '0', '0').getTime()))/(60*1000);
        var q = Math.abs(timeObj.hs1-timeObj.hs0)/(60*1000);
        var z = Math.abs(timeObj.hs2-timeObj.hs1)/(60*1000);

        if(index>q){
          m =  m+z+index;
        }else{
          m = m+index;
        }
        var g = Math.floor(m / 60);
        10 > g && (g = "0" + g);
        var t = Number(m % 60);
        10 > t && (t = "0" + t);
        return (g + ":" + t)
      }
    }

    function mouseMoveEvent(fromx) {
      var index = cfg.component.width()/that.MAXCOUNTS;
      var i = (fromx/index).toFixed(0);
      if(parseInt(i)<0 || parseInt(i)>=parseInt(cfg.data.ERRORNO)){
        console.log('-----');
        return false;
      }
      if(TYPE === 'five'){
        that.$dispatch('child-index-five', i,true);
      }else {
        that.$dispatch('child-index', i,getDateTime(i),true);
      }
      var Last_p = '';
      var y = '';
      if(cfg.data.TIMEHead.struct[i]){
        Last_p = cfg.data.TIMEHead.struct[i]['Last_p'];
        y = coordinate(Last_p);
      }
      var x = w/that.MAXCOUNTS*i;
      var r = cnst.getContext("2d");
      r.clearRect(0, 0, w, h);
      r.beginPath();
      r.fillStyle = "#000000";
      r.moveTo(0, y);
      r.lineTo(w, y);
      r.moveTo(x, 0);
      r.lineTo(x, time_h);
      r.stroke();
      r.beginPath();
      r.arc(x,y,5,0,360,false);
      r.fillStyle="red";//填充颜色,默认是黑色
      r.fill();//画实心圆
      r.closePath();
      //画弧度的矩形
      r.fillStyle=color_line;
      r.font = "20px Helvetica";
      //竖坐标
      if(x-30<0){
        x = 30;
      }
      if(x+30>w){
        x = w-30;
      }
      r.roundRect(x-30, h-20, 60, 20, 5, true);
      r.fillStyle = "#fff";
      r.textAlign = "left";
      r.fillText(getDateTime(i),x-27,h-3);
      if(y-10<0){
        y = 10;
      }
      if(y+10>min_h){
        y = min_h - 10;
      }
      r.fillStyle=color_line;
      var roundw = 60;
      if(Last_p.length>4){
        roundw = Last_p.length*12;
      }
      r.roundRect(0, y-10, roundw, 20, 5, true);
      r.fillStyle = "#fff";
      r.textAlign = "left";
      r.fillText(Last_p,2,y+6);
    }

//    component.append(datehtml);

    if (browser.isMobile() && !cfg.data.isNoTouch) {
      cfg.component.on('touchstart', function(e) {
        mouseMoveEvent(e.changedTouches[0].clientX);
      })
      cfg.component.on('touchmove', function(e) {
        mouseMoveEvent(e.changedTouches[0].clientX);
      })
      cfg.component.on('touchend', function(e) {
        if(TYPE === 'five'){
          that.$dispatch('child-index-five', '',false);
        }else {
          that.$dispatch('child-index', '','',false);
        }
        var r = cnst.getContext("2d");
        r.clearRect(0, 0, w, h);
      });
    } else {
      cfg.component.unbind().on('click', function(e) {
        mouseMoveEvent(e.clientX);
      })
    }
  }
  }
}
</script>

<style lang="less" scoped>
	.h5_difference_time canvas{
	    width: 100%;
	    height: 100%;
	}
	.h5_difference_time .h5_difference_date {
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
</style>
