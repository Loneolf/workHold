<template>
    <div class="h5_componentRing" >
    	{{{difference}}}
    </div>
</template>
<script>

/**
 * Created by zztzt on 16/7/27.
 */
var H5ComponentRing =function (cfg ) {

    var component = $('<div></div>');
    component.css({'position':'relative',height:cfg.height/2})

    //  绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    $(cns).css('zIndex',2);
    component.append(cns);

    var r =w/2-20;
    var r1  = h/2-20;

    //  加入一个底图层
    ctx.beginPath();
    ctx.fillStyle='#fff';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = 1;
    ctx.arc(r,r1,r1-60,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //  绘制一个数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    $(cns).css('zIndex',1);
    component.append(cns);

    var colors = ['#ff3237','#ff8e36','#b3d950','#3fb344','orange']; //  备用颜色
    var sAngel = 2 * Math.PI; //  设置开始的角度在 12 点位置
    var eAngel = 0; //  结束角度
    var aAngel = Math.PI*2; //  100%的圆结束的角度 2pi = 360

    var step = cfg.data.length;
    var isH = true;
    for(var n=0;n<step;n++){
      var items  = cfg.data[n];
      if(items[1] != 0){
        isH = false;
      }
    }
    for(var i=0;i<step;i++){

      if(isH && i==0){
        ctx.beginPath();
        ctx.fillStyle='#e0e0e0';
        ctx.strokeStyle='#e0e0e0';
        ctx.lineWidth = .1;

        ctx.moveTo(r,r1);
        ctx.arc(r,r1,r1,sAngel,sAngel + aAngel * 1);
        ctx.fill();
        ctx.stroke();
      }
      var item  = cfg.data[i];
      var color = item[2] || ( item[2] = colors[i] );
      if(!isH){
        //pop()
        eAngel = sAngel + aAngel * item[1];

        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineWidth = .1;

        ctx.moveTo(r,r1);
        ctx.arc(r,r1,r1,sAngel,eAngel);
        ctx.fill();
        ctx.stroke();
        sAngel = eAngel;
      }



        //  加入所有的项目文本以及百分比

        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );
        var per =  $('<div class="per">');
        per.text( Number(cfg.data[i][1]*100).toFixed(0) +'%'  );
        text.append(per);

        var x = r + Math.sin( .5 * Math.PI - sAngel ) * r1;
        var y = r1 + Math.cos( .5 * Math.PI - sAngel ) * r1;

         /*text.css('left',x/2);
         text.css('top',y/2);*/
        /*if(x > w/2){
            text.css('left',x/2-20);
        }else{
            text.css('right',(w-x)/2+20);
        }
        if(y > h/2){
            text.css('top',y/2+10);
        }else{
            text.css('bottom',(h-y)/2+10);
        }*/
        if( cfg.data[i][2] ){
            text.css('color',cfg.data[i][2]);
        }
        switch (i){
          case 0:
            text.css({'bottom':'10px',right:0});
            break;
          case 1:
            text.css({'bottom':'10px',left:0});
            break;
          case 2:
            text.css({'top':'10px',left:0});
            break;
          case 3:
            text.css({'top':'10px',right:0});
            break;
        }
        component.append(text);

    }
    return component;
}
export default {
	ready(){
		var s1 = H5ComponentRing(this.cfg1);
		$('.h5_componentRing').html(s1);
	},
    data() {
        return {
            cfg1: {
                width: ($(window).width() - 60) * 2,
                height: 400,
                data: [
	                /*['主力流入' , .6  ,'#ff7676'],
	                ['主力流出' , .1 ],
	                ['散户流入' , .1],
	                ['散户流出' , .2 ],*/
	            ]
            },
            difference: ''
        }
    },
    events:{
        'parent-ring':function(data){
            console.log(data);
            this.cfg1.data = data;
            var s1 = H5ComponentRing(this.cfg1);
//            $('.h5_componentRing').html(s1);
//            $('.h5_componentRing').append('<p class="ring-cont"><span class="ring-name">今日资金</span><span class="ring-english">Capital Flows</span></p>');
              $(this.$el).html(s1);
              $(this.$el).append('<p class="ring-cont"><span class="ring-name">今日资金</span><span class="ring-english">Capital Flows</span></p>');
        }
    }
}
</script>
<style lang="less">
	.h5_componentRing{padding: 0 15px 30px 15px;position: relative;width: 100%;font-size: 0;}
	.h5_componentRing canvas{
	    position: absolute;
	    left: 0;
	    top: 10px; /* 用canvas做动画，会进行分层，要用到  z-index */
	    width: 100%;
	    height: 100%;
	}

	.h5_componentRing .text{
	    position: absolute;
	    z-index: 99;
	    text-align: center;
	    height: 24px;
	    /*transition:all 1s;*/
	    font-size: 14px;color: #fff;
	}
    .ring-cont{
        position: absolute;
        width: 100%;
        text-align: center;
        top: 50%;
        margin-top: -1.5rem;
        left: 0;
        font-size: 0.7rem;
        z-index: 3;
        span{
            display: block;
            color: #ccc;
            text-indent: -0.7rem;
        }
        .ring-name{
            color: #000;
            font-size: 0.7rem;
        }
    }
</style>


