<template>
  <div class="chart-wrapper" style="height: 100%;">
    <div class="h5_difference" style="width: 100%;padding: 0;" id="component">
      <div style="position: relative; font-size: 0px;">
        <canvas style="z-index: 1;" id="cns"></canvas>
        <canvas style="z-index: 2; position: absolute; top: 0px; left: 0px;" id="cnst"></canvas></div>
    </div>
    <div class="h5_quota" id="component_index">
      <div style="position: relative; font-size: 0px;">
        <canvas style="z-index: 1;" id="cns_index"></canvas>
        <canvas style="z-index: 2; position: absolute; top: 0px; left: 0px;" id="cnst_index"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
  import canvas from '../../../../util/canvas'
  import util from '../../../../util/util';
  import browser from '../../../../util/browser'
  import GiscHqTechCanvas from '../../scripts/GiscHqTechCanvas';
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
          data  : {},
          stockVal:'成交量',
          stockIndex:['成交量','MACD','KDJ','RSI','WR','BOLL','CCI','ROC','ASI','WVAD','BIAS','EMV','DMI','DMA','TRIX','BRAR','VR','OBV']
        },
        difference: '',
        StockMinIndex: '',
        Line1:'-.-',
        Line2:'',
        Line3:'',
        Line4:'',
        oLine1:'',
        oLine2:'',
        oLine3:'',
        oLine4:'',
        selectName:'成交量',
        VOLTitle:true,
        MACDTitle:false,
        KDJTitle:false,
        RSITitle:false,
        WRTitle:false,
        BOLLTitle:false,
        CCITitle:false,
        ROCTitle:false,
        ASITitle:false,
        WVADTitle:false,
        BIASTitle:false,
        EMVTitle:false,
        DMITitle:false,
        DMATitle:false,
        TRIXTitle:false,
        BRARTitle:false,
        VRTitle:false,
        OBVTitle:false,
        newDATA:{},
        is_select:false,
        addCount:0,
        listVol:64,
        gridData:[],
        defaultzb:'成交量'
      }
    },
    attached(){
      this.is_select = false;
      this.addCount = 0;
      this.newDATA = {};
      this.gridData = {};
      this.cfg1.data = {};
    },
    methods:{
      H5Difference(cfg) {
        console.log(cfg.data)
        var that = this;
        //  绘制网格线 - 背景层
        // 宽高都是放大后的数据，在移动端缩小之后会更清晰
        var w           = cfg.width;
        var h           = cfg.height;
        var h_index     = cfg.height_index;
        var b           = 20;//留20像素写时间位置
        var color_b     = '#E5E7F2';
        var color_line  = '#fff';
        var c_average   = '#000';
        var up_color    = '#DE2121';
        var low_color   = '#529C4F';
        var kLine_h     = h-b; //画图高度
        var unit        = cfg.data.TkLineHead.Units || 0;
        var units       = Math.pow(10,(unit));
        var HighPrice   = cfg.data.TkLineHead.HighPrice;
        var LowPrice    = cfg.data.TkLineHead.LowPrice;
        var o_w         = 8;
        var MAXCOUNTS   = Math.floor(w/10);
        this.listVol    = MAXCOUNTS;
        var total_max   = cfg.data.total_max;
        var addCount    = this.cfg1.data.TkLineData.length-MAXCOUNTS;
        if(addCount<0){
          addCount = 0;
        }
        this.addCount = addCount;
        var average_c_a = ['#f8b526','#ff6666','#4aa6f6','#c25cf1'];
        var k_val       = 9;
        var total_size  = cfg.data.TkLineHead.total_size;

        var average5,average10,average20;

        HighPrice = GiscHqTechCanvas.chengjiaol(this.cfg1.data.TkLineData,this.cfg1.data.MAXCOUNT,addCount,'HighPrice');

//  console.log(maxVal,min,maxRose,minRose);
        //k线坐标位置
        function coordinate(p) {
          return kLine_h/(HighPrice-LowPrice)*(HighPrice-p);
        }
        //边框
        function border_canvas() {
          //  水平网格线
          ctx.beginPath();
          ctx.strokeStyle = color_b;
          ctx.lineWidth = 1;
          ctx.moveTo(0, 0);
          ctx.lineTo(w, 0);
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.closePath();
          ctx.stroke();
        }
        //指标边框
        function border_canvas_index() {
          //  水平网格线
          ctx_index.beginPath();
          ctx_index.strokeStyle = color_b;
          ctx_index.lineWidth = 1;
          ctx_index.moveTo(0, 0);
          ctx_index.lineTo(w, 0);
          ctx_index.lineTo(w, h_index);
          ctx_index.lineTo(0, h_index);
          ctx_index.closePath();
          ctx_index.stroke();
        }
        //水平网格线
        function transverse() {
          ctx.beginPath();
          ctx.strokeStyle = color_b;
          ctx.lineWidth = 1;
          var step = 5;
          for (var i = 1; i < step; i++) {
            var y = (kLine_h / (step-1)) * i;
            if(i<step-1){
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
        function kline_canvas() {
          //k线图
          ctx.lineWidth = 1;
          var klineData = cfg.data.TkLineData;
          if(cfg.data.MAXCOUNT == cfg.data.TkLineData.length-1 || cfg.data.TkLineData.length>that.listVol){
            klineData = klineData.slice(addCount);
          }
          that.gridData = klineData;
          klineData.forEach((item,index)=>{
            ctx.beginPath();
            var color = up_color;
            var f_h_y = 0;
            var f_l_y = 0;
            var x_b   = (o_w+2)*index;
            if(parseFloat(item.OpenPrice)>parseFloat(item.ClosePrice)){
              color = low_color;
            }
            if(parseFloat(item.OpenPrice) == parseFloat(item.ClosePrice)){
              if(index>0){
                if(parseFloat(klineData[index-1].ClosePrice)>parseFloat(item.OpenPrice)){
                  color = low_color;
                }
              }else {
                if(cfg.data.TkLineData[addCount-1] && parseFloat(cfg.data.TkLineData[addCount].ClosePrice)>parseFloat(item.OpenPrice)){
                  color = low_color;
                }else {
                  if(cfg.data.CONTACTID>parseFloat(item.OpenPrice)){
                    color = low_color;
                  }
                }
              }
            }
            f_h_y = coordinate(item.ClosePrice);
            f_l_y = coordinate(item.OpenPrice);
            ctx.strokeStyle = color;
            let h_y = coordinate(item.HighPrice);
            let l_y = coordinate(item.LowPrice);
            let x   = x_b+(o_w/2);
            ctx.moveTo(x, h_y);
            ctx.lineTo(x, l_y);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = color;//边框
            let c_val = parseFloat(f_l_y)-parseFloat(f_h_y);
            if(c_val == 0){
              c_val = 1;
            }
            // if(color == low_color){
              ctx.fillStyle=color;
              ctx.fillRect(x_b,f_h_y,o_w,c_val);
            // }else{
            //   ctx.lineWidth = 2;
            //   // ctx.fillStyle=color_line;
            //   ctx.fillStyle=color;
            //   ctx.fillRect(x_b-1,f_h_y-1,o_w,c_val-1);
            //   ctx.strokeRect(x_b,f_h_y,o_w,c_val);
            // }
            ctx.font = "20px Helvetica";
            ctx.fillStyle = c_average;
            ctx.textAlign = "left";
            if(index == 0){
              ctx.fillText(util.formatTimeLable(item.Time,that.StockMinIndex),2,h-3);
            }
            if(index == Math.floor((parseFloat(that.listVol))/2)){
              ctx.fillText(util.formatTimeLable(item.Time,that.StockMinIndex),x_b-40,h-3);
            }
            if(index == that.listVol-1){
              ctx.textAlign = "right";
              ctx.fillText(util.formatTimeLable(item.Time,that.StockMinIndex),x_b,h-3);
            }
//        chengjiaol_canvas(item,x_b,o_w,color);
          });
        }

        function average_canvas(num,c) {
          //画均线
          ctx.beginPath();
          ctx.strokeStyle = c;
          ctx.lineWidth = 1;
          var averageData = cfg.data.TkLineData.slice(addCount);
          var isS = true;
          var averageArray = [];
          averageData.every((item,index)=>{
            var isN = true,price_all = item.ClosePrice-0;
            var x_b = (o_w+2)*index;
            for(var i=1;i<num;i++){
              var listData = cfg.data.TkLineData[index+addCount-i];
              if(listData){
                price_all +=parseFloat(listData.ClosePrice);
              }else{
                isN = false;
              }
            }
            if(isN){
              var average_price = price_all/num;
              let y = coordinate(average_price);
              let x = x_b+(o_w/2);
              averageArray.push(average_price);
              if(isS){
                ctx.moveTo(x, y);
                isS = false;
              }else{
                ctx.lineTo(x, y);
              }
            }else {
              averageArray.push('');
            }
            return true;
          });
          ctx.stroke();
          return averageArray;
        }

        function text_canvas() {
          //最大小价
          ctx.font = "20px Helvetica";
          ctx.fillStyle = c_average; //"#000000" "#32a632"
          ctx.textAlign = "left";
          var h_p = util.toDecimal2(HighPrice/units,total_size);
          var l_p = util.toDecimal2(LowPrice/units,total_size);
          ctx.fillText(h_p,0,20);
          ctx.fillText(l_p,0,kLine_h-5);
        }


        //根据索引得到对应的分时
        function getDateTime(index) {
          if(TYPE === 'five'){
            index = index % (MAXCOUNTS/5);
          }
          index = parseInt(index);
          if(!cfg.data.BEGINDATE){
            return;
          }
          var timeArray = cfg.data.BEGINDATE.slice(0,-1).split('|');
          if(timeArray.length == 4){

            var m = (timeObj.hs0-(new Date('1970-1-2 00:00:00').getTime()))/(60*1000);
            var q = (timeObj.hs1-timeObj.hs0)/(60*1000);
            var z = (timeObj.hs2-timeObj.hs1)/(60*1000);

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
        //  加入一个画布 指标
        var cns_index = cfg.cns_index;
        var ctx_index = cns_index.getContext('2d');
        cns_index.width = ctx_index.width = w;
        cns_index.height = ctx_index.height = h_index;

        //新建画布上一层
        var cnst_index = cfg.cnst_index;
        var ctxt_index = cnst_index.getContext('2d');
        cnst_index.width = ctxt_index.width = w;
        cnst_index.height = ctxt_index.height = h_index;

        //边框
        border_canvas();
        border_canvas_index();
        // 水平网格线
        transverse();
        //k线
        kline_canvas();
        //均线
        average5  = average_canvas(5,average_c_a[0]);
        average10 = average_canvas(10,average_c_a[1]);
        average20 = average_canvas(20,average_c_a[2]);

        var ararageObj = {
          averprice5:util.toDecimal2(average5[average5.length-1]/units,total_size),
          averprice10:util.toDecimal2(average10[average10.length-1]/units,total_size),
          averprice20:util.toDecimal2(average20[average20.length-1]/units,total_size)
        };
        if(ararageObj.averprice5 == '' || parseFloat(ararageObj.averprice5) == 0){
          ararageObj.averprice5 = '--';
        }
        if(ararageObj.averprice10 == '' || parseFloat(ararageObj.averprice10) == 0){
          ararageObj.averprice10 = '--';
        }
        if(ararageObj.averprice20 == '' || parseFloat(ararageObj.averprice20) == 0){
          ararageObj.averprice20 = '--';
        }
        that.$dispatch('child-index-dayKLine', ararageObj,'',1);

        that.stockIndexList(that.defaultzb);
        text_canvas();
        //时间
//    date_canvas();

        function mouseMoveEvent(fromx,fromy) {
          var index = cfg.component.width()/MAXCOUNTS;
          var i = (fromx/index).toFixed(0);
          if(i.indexOf('-')==0 || parseInt(i)<0 || parseInt(i)>=parseInt(MAXCOUNTS) || parseInt(i)>=cfg.data.TkLineData.length){
            console.log('-----');
            return false;
          }
          var listData = that.gridData[i];
          var x = w/MAXCOUNTS*i;
          var y = coordinate(listData.OpenPrice);
          var r = cnst.getContext("2d");
          var r_index = cnst_index.getContext("2d");
          r.clearRect(0, 0, w, h);
          r_index.clearRect(0, 0, w, h_index);
          r.beginPath();
          r_index.beginPath();
          r.fillStyle = "#000000";
          //横线
          r.moveTo(0, y);
          r.lineTo(w, y);
          //竖线
          r.moveTo(x+4, 0);
          r.lineTo(x+4, h);
          r_index.moveTo(x+4, 0);
          r_index.lineTo(x+4, h_index);
          r.stroke();
          r_index.stroke();

          //画弧度的矩形
          r.fillStyle="RGBA(100,255,100, 1)";
          r.font = "20px Helvetica";
          //竖坐标
          var dateRoundW = 60;
          if(that.StockMinIndex){
            dateRoundW = 110;
          }
          if(x-(dateRoundW/2)<0){
            x = (dateRoundW/2);
          }
          if(x+(dateRoundW/2)>w){
            x = w-(dateRoundW/2);
          }

          r.roundRect(x-(dateRoundW/2), h-20, dateRoundW, 18, 5, true);
          r.fillStyle = "#000000";
          r.textAlign = "left";
          var date = (''+listData.Time).slice(4);
          date = date.replace(/(\d{2})(\d{2})/g,'$1-$2');
          if(that.StockMinIndex){
            date = util.formatTimeLable(listData.Time,that.StockMinIndex);
          }

          r.fillText(date,x-(dateRoundW/2-3),h-3);
          if(y-10<0){
            y = 10;
          }
          if(y+10>fromy){
            y = fromy - 10;
          }
          var roundw = 60;
          var openPrice = util.toDecimal2(listData.OpenPrice/units,total_size);
          if(openPrice.length>4){
            roundw = openPrice.length*12;
          }
          r.fillStyle="RGBA(100,255,100, 1)";
          r.roundRect(0, y-10, roundw, 18, 5, true);
          r.fillStyle = "#000000";
          r.textAlign = "left";
          r.fillText(openPrice,2,y+6);

          listData.average={
            averprice5:util.toDecimal2(average5[i]/units,total_size),
            averprice10:util.toDecimal2(average10[i]/units,total_size),
            averprice20:util.toDecimal2(average20[i]/units,total_size)
          };
          listData.closeprice = util.toDecimal2(listData.ClosePrice/units,total_size);
          listData.highprice = util.toDecimal2(listData.HighPrice/units,total_size);
          listData.lowprice = util.toDecimal2(listData.LowPrice/units,total_size);
          listData.openprice = util.toDecimal2(listData.OpenPrice/units,total_size);
          listData.total_h = util.numTosize(listData.Total_h);
          var z_closeprice = 0;
          if(i == 0){
            if(cfg.data.MAXCOUNT == cfg.data.TkLineData.length-1){
              z_closeprice = cfg.data.TkLineData[i+addCount-1].ClosePrice;
            }else {
              z_closeprice = cfg.data.CONTACTID;
            }
          }else {
            z_closeprice = that.gridData[i-1].ClosePrice;
          }
          if(z_closeprice == 0){
            z_closeprice = cfg.data.CONTACTID;
          }
          if(z_closeprice == 0){
            listData.m_lUpPrice='--';
            listData.m_lUpIndex='0.00%';
          }else {
            listData.m_lUpPrice=util.toDecimal2((listData.ClosePrice-z_closeprice)/units,total_size);
            listData.m_lUpIndex=util.toDecimal2((listData.ClosePrice-z_closeprice)/z_closeprice*100,total_size)+'%';

          }
          listData.z_closeprice = util.toDecimal2(z_closeprice/units,total_size);
          that.$dispatch('child-index-dayKLine', listData,true);
          that.quota(i);
        }
        if (browser.isMobile()) {
          var endTime = 0;
          cfg.component.on('touchstart', function(e) {
            //endTime = new Date().getTime();
            /*timer = setInterval(function(){
              i+=10;
              if(i >= 1000){
                i = 0;
                lognPress();
              } else {
                //这里写onclick要执行的事件
              }
            },10)*/
            // mouseMoveEvent(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
          });
          cfg.component.on('touchmove', function(e) {
            /*var newTime = new Date().getTime();
            if(newTime-endTime<2000){
              that.$dispatch('child-index-dayKLine', '',false);
              var r = cnst.getContext("2d");
              r.clearRect(0, 0, w, h);
            }else {*/
              // mouseMoveEvent(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
            //}
          });
          cfg.component.on('touchend', function(e) {
            /*var newTime = new Date().getTime();
            if(newTime-endTime<2000){*/
              that.$dispatch('child-index-dayKLine', ararageObj,false,1);
              that.quota(-1);
              var r = cnst.getContext("2d");
              r.clearRect(0, 0, w, h);
              var r_index = cnst_index.getContext("2d");
              r_index.clearRect(0, 0, w, h_index);
            /*}else {
              mouseMoveEvent(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
            }*/
          });
        } else {
          cfg.component.on('click', function(e) {
            mouseMoveEvent(e.clientX,e.clientY);
          });
        }

      },
      selectFunc(){
        if(this.is_select){
          this.is_select = false;
        }else {
          this.is_select = true;
        }
      },
      stockIndexList(index) {
        var cns_index = this.cfg1.cns_index;
        var ctx_index = cns_index.getContext('2d');
        var w           = this.cfg1.width;
        var h_index     = this.cfg1.height_index;
        var addCount    = this.addCount;
        var o_w         = 8;
        var color_b     = '#3e3e3e';
        var color_line  = '#fff';
        var up_color    = '#DE2121';
        var low_color   = '#529C4F';
        var unit        = this.cfg1.data.TkLineHead.Units || 0;
        var HighPrice   = this.cfg1.data.TkLineHead.HighPrice;
        var LowPrice    = this.cfg1.data.TkLineHead.LowPrice;
        var average_c_a = ['#f8b526','#ff6666','#4aa6f6','#c25cf1'];
        this.defaultzb = index;
        ctx_index.clearRect(0,0,w,h_index);
        ctx_index.beginPath();
        ctx_index.strokeStyle = color_b;
        ctx_index.lineWidth = 1;
        ctx_index.moveTo(0, 0);
        ctx_index.lineTo(w, 0);
        ctx_index.lineTo(w, h_index);
        ctx_index.lineTo(0, h_index);
        ctx_index.closePath();
        ctx_index.stroke();
        var newDATA,nMaxDelta,lMinValue,total_maxs,Line1,Line2,Line3,Line4;
        switch (index) {
          case '成交量':// Volume
            total_maxs = GiscHqTechCanvas.chengjiaol(this.cfg1.data.TkLineData,this.cfg1.data.MAXCOUNT,addCount,'',this.listVol);
            GiscHqTechCanvas.chengjiaol_canvas1(ctx_index,this.cfg1.data.MAXCOUNT,this.cfg1.data.TkLineData,o_w,addCount,up_color,low_color,color_line,h_index,total_maxs,this.listVol,this.cfg1.data.CONTACTID);
            //成交量均线
            var m_iLine1 = GiscHqTechCanvas.chengjiaol_average_canvas(ctx_index,this.cfg1.data.TkLineData,5,average_c_a[0],addCount,o_w,h_index,total_maxs);
            var m_iLine2 = GiscHqTechCanvas.chengjiaol_average_canvas(ctx_index,this.cfg1.data.TkLineData,10,average_c_a[1],addCount,o_w,h_index,total_maxs);
            var m_iLine3 = GiscHqTechCanvas.chengjiaol_average_canvas(ctx_index,this.cfg1.data.TkLineData,20,average_c_a[2],addCount,o_w,h_index,total_maxs);
            newDATA = {
              m_iLine1:m_iLine1,
              m_iLine2:m_iLine2,
              m_iLine3:m_iLine3,
            };
            nMaxDelta = util.numTosize(total_maxs);
            lMinValue = 0;
            Line1 = util.numTosize(m_iLine1.slice(m_iLine1.length-1));
            Line2 = util.numTosize(m_iLine2.slice(m_iLine2.length-1));
            Line3 = util.numTosize(m_iLine3.slice(m_iLine3.length-1));
            GiscHqTechCanvas.DrawText(ctx_index,nMaxDelta,'',color_b,h_index); //原来''表示0  因测试人员说要优化这个固直接将0 写成空
            this.newDATA = newDATA;
            break;
          case 'MACD':
            var MACDDATA = GiscHqTechCanvas.CalculatMACD(this.cfg1.data.TkLineData,addCount,this.listVol,[12,26,9]);
            newDATA = MACDDATA.m_iLine1.concat(MACDDATA.m_iLine2).concat(MACDDATA.m_iLine3);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = MACDDATA.m_iLine1.slice(MACDDATA.m_iLine1.length-1);
            Line2 = MACDDATA.m_iLine2.slice(MACDDATA.m_iLine2.length-1);
            Line3 = MACDDATA.m_iLine3.slice(MACDDATA.m_iLine3.length-1);
            this.newDATA = MACDDATA;
            GiscHqTechCanvas.DrawMACD(ctx_index,MACDDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,up_color,low_color);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,MACDDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[2]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,MACDDATA.m_iLine3,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            break;
          case 'KDJ':
            var KDJDATA = GiscHqTechCanvas.CalculatKDJ(this.cfg1.data.TkLineData,addCount,this.listVol,[9,3,3]);
            newDATA = KDJDATA.m_iLine1.concat(KDJDATA.m_iLine2).concat(KDJDATA.m_iLine3);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = KDJDATA.m_iLine1.slice(KDJDATA.m_iLine1.length-1);
            Line2 = KDJDATA.m_iLine2.slice(KDJDATA.m_iLine2.length-1);
            Line3 = KDJDATA.m_iLine3.slice(KDJDATA.m_iLine3.length-1);
            this.newDATA = KDJDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,KDJDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,KDJDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,KDJDATA.m_iLine3,o_w,h_index,nMaxDelta,lMinValue,average_c_a[2]);
            break;
          case 'RSI':
            var RSIDATA = GiscHqTechCanvas.CalculatRSI(this.cfg1.data.TkLineData,addCount,this.listVol,[6,12,24],unit);
            newDATA = RSIDATA.m_iLine1.concat(RSIDATA.m_iLine2).concat(RSIDATA.m_iLine3);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = RSIDATA.m_iLine1.slice(RSIDATA.m_iLine1.length-1);
            Line2 = RSIDATA.m_iLine2.slice(RSIDATA.m_iLine2.length-1);
            Line3 = RSIDATA.m_iLine3.slice(RSIDATA.m_iLine3.length-1);
            this.newDATA = RSIDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,RSIDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,RSIDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,RSIDATA.m_iLine3,o_w,h_index,nMaxDelta,lMinValue,average_c_a[2]);
            break;
          case 'WR':
            var WRDATA = GiscHqTechCanvas.CalculatWR(this.cfg1.data.TkLineData,addCount,this.listVol,[10],unit);
            newDATA = WRDATA.m_iLine1;
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            this.newDATA = WRDATA;
            Line1 = WRDATA.m_iLine1.slice(WRDATA.m_iLine1.length-1);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,WRDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;
          case 'BOLL':
            var BOLLDATA = GiscHqTechCanvas.CalculatBOLL(this.cfg1.data.TkLineData,addCount,this.listVol,[20,2],unit);
            newDATA = BOLLDATA.m_iLine1.concat(BOLLDATA.m_iLine2).concat(BOLLDATA.m_iLine3);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(BOLLDATA);
            Line1 = BOLLDATA.m_iLine1.slice(BOLLDATA.m_iLine1.length-1);
            Line2 = BOLLDATA.m_iLine2.slice(BOLLDATA.m_iLine2.length-1);
            Line3 = BOLLDATA.m_iLine3.slice(BOLLDATA.m_iLine3.length-1);
            this.newDATA = BOLLDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BOLLDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BOLLDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BOLLDATA.m_iLine3,o_w,h_index,nMaxDelta,lMinValue,average_c_a[2]);

            GiscHqTechCanvas.DrawBOLL(ctx_index,this.cfg1.data.TkLineData.slice(addCount),o_w,h_index,HighPrice,LowPrice,up_color,low_color);
            break;
          case 'CCI':
            var CCIDATA = GiscHqTechCanvas.CalculatCCI(this.cfg1.data.TkLineData,addCount,this.listVol,[14],unit);
            newDATA = CCIDATA.m_iLine1;
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            this.newDATA = CCIDATA;
            Line1 = CCIDATA.m_iLine1.slice(CCIDATA.m_iLine1.length-1);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,CCIDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;
          case 'ROC':
            var ROCDATA = GiscHqTechCanvas.CalculatROC(this.cfg1.data.TkLineData,addCount,this.listVol,[12],unit);
            newDATA = ROCDATA.m_iLine1.concat(ROCDATA.m_iLine2);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            this.newDATA = ROCDATA;
            Line1 = ROCDATA.m_iLine1.slice(ROCDATA.m_iLine1.length-1);
            Line2 = ROCDATA.m_iLine2.slice(ROCDATA.m_iLine2.length-1);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,ROCDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,ROCDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            break;
          case 'ASI':
            var ASIDATA = GiscHqTechCanvas.CalculatASI(this.cfg1.data.TkLineData,addCount,this.listVol);
            newDATA = ASIDATA.m_iLine1;
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            this.newDATA = ASIDATA;
            Line1 = ASIDATA.m_iLine1.slice(ASIDATA.m_iLine1.length-1);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,ASIDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;
          case 'WVAD':
            var WVADDATA = GiscHqTechCanvas.CalculatWVAD(this.cfg1.data.TkLineData,addCount,this.listVol,[6]);
            newDATA = WVADDATA.m_iLine1;
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            this.newDATA = WVADDATA;
            Line1 = WVADDATA.m_iLine1.slice(WVADDATA.m_iLine1.length-1);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,WVADDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;
          case 'BIAS':
            var BIASDATA = GiscHqTechCanvas.CalculatBIAS(this.cfg1.data.TkLineData,addCount,this.listVol,[6,12,24],unit);
            newDATA = BIASDATA.m_iLine1.concat(BIASDATA.m_iLine2).concat(BIASDATA.m_iLine3);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = BIASDATA.m_iLine1.slice(BIASDATA.m_iLine1.length-1);
            Line2 = BIASDATA.m_iLine2.slice(BIASDATA.m_iLine2.length-1);
            Line3 = BIASDATA.m_iLine3.slice(BIASDATA.m_iLine3.length-1);
            this.newDATA = BIASDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BIASDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BIASDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BIASDATA.m_iLine3,o_w,h_index,nMaxDelta,lMinValue,average_c_a[2]);
            break;
          case 'EMV':
            var EMVDATA = GiscHqTechCanvas.CalculatEMV(this.cfg1.data.TkLineData,addCount,this.listVol,[14,9],unit);
            newDATA = EMVDATA.m_iLine1.concat(EMVDATA.m_iLine2);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = EMVDATA.m_iLine1.slice(EMVDATA.m_iLine1.length-1);
            Line2 = EMVDATA.m_iLine2.slice(EMVDATA.m_iLine2.length-1);
            this.newDATA = EMVDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,EMVDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,EMVDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            break;
          case 'DMI':
            var DMIDATA = GiscHqTechCanvas.CalculatDMI(this.cfg1.data.TkLineData,addCount,this.listVol,[7],unit);
            newDATA = DMIDATA.m_iLine1.concat(DMIDATA.m_iLine2).concat(DMIDATA.m_iLine3).concat(DMIDATA.m_iLine4);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = DMIDATA.m_iLine1.slice(DMIDATA.m_iLine1.length-1);
            Line2 = DMIDATA.m_iLine2.slice(DMIDATA.m_iLine2.length-1);
            Line3 = DMIDATA.m_iLine3.slice(DMIDATA.m_iLine3.length-1);
            Line4 = DMIDATA.m_iLine4.slice(DMIDATA.m_iLine4.length-1);
            this.newDATA = DMIDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,DMIDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,DMIDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,DMIDATA.m_iLine3,o_w,h_index,nMaxDelta,lMinValue,average_c_a[2]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,DMIDATA.m_iLine4,o_w,h_index,nMaxDelta,lMinValue,average_c_a[3]);
            break;
          case 'DMA':
            var DMADATA = GiscHqTechCanvas.CalculatDMA(this.cfg1.data.TkLineData,addCount,this.listVol,[10,50],unit);
            newDATA = DMADATA.m_iLine1.concat(DMADATA.m_iLine2);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = DMADATA.m_iLine1.slice(DMADATA.m_iLine1.length-1);
            Line2 = DMADATA.m_iLine2.slice(DMADATA.m_iLine2.length-1);
            this.newDATA = DMADATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,DMADATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,DMADATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            break;
          case 'TRIX':
            var TRIXDATA = GiscHqTechCanvas.CalculatTRIX(this.cfg1.data.TkLineData,addCount,this.listVol,[12,20],unit);
            newDATA = TRIXDATA.m_iLine1.concat(TRIXDATA.m_iLine2);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = TRIXDATA.m_iLine1.slice(TRIXDATA.m_iLine1.length-1);
            Line2 = TRIXDATA.m_iLine2.slice(TRIXDATA.m_iLine2.length-1);
            this.newDATA = TRIXDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,TRIXDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,TRIXDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            break;
          case 'VR':
            var VRDATA = GiscHqTechCanvas.CalculatVR(this.cfg1.data.TkLineData,addCount,this.listVol,[24],unit);
            newDATA = VRDATA.m_iLine1;
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            this.newDATA = VRDATA;
            Line1 = VRDATA.m_iLine1.slice(VRDATA.m_iLine1.length-1);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,VRDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;
          case 'BRAR':
            var BRARDATA = GiscHqTechCanvas.CalculatBRAR(this.cfg1.data.TkLineData,addCount,this.listVol,[26,0],unit);
            newDATA = BRARDATA.m_iLine1.concat(BRARDATA.m_iLine2);
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = BRARDATA.m_iLine1.slice(BRARDATA.m_iLine1.length-1);
            Line2 = BRARDATA.m_iLine2.slice(BRARDATA.m_iLine2.length-1);
            this.newDATA = BRARDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BRARDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[1]);
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,BRARDATA.m_iLine2,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;
          case 'OBV':
            var OBVDATA = GiscHqTechCanvas.CalculatOBV(this.cfg1.data.TkLineData,addCount,this.listVol);
            newDATA = OBVDATA.m_iLine1;
            nMaxDelta = Math.max.apply({}, newDATA);
            lMinValue = Math.min.apply({}, newDATA);
            console.log(nMaxDelta,lMinValue);
            Line1 = OBVDATA.m_iLine1.slice(OBVDATA.m_iLine1.length-1);
            this.newDATA = OBVDATA;
            GiscHqTechCanvas.DrawIndicateLine(ctx_index,OBVDATA.m_iLine1,o_w,h_index,nMaxDelta,lMinValue,average_c_a[0]);
            break;

        }
        if(index !== '成交量'){
          var max = util.toDecimal2(nMaxDelta/1000,2);
          var min = util.toDecimal2(lMinValue/1000,2);
          GiscHqTechCanvas.DrawText(ctx_index,max,min,color_b,h_index);
          if(Line1){
            Line1 = util.toDecimal2(Line1/1000,2);
          }
          if(Line2){
            Line2 = util.toDecimal2(Line2/1000,2);
          }
          if(Line3){
            Line3 = util.toDecimal2(Line3/1000,2);
          }
          if(Line4){
            Line4 = util.toDecimal2(Line4/1000,2);
          }
          this.selectName = index;
        }else {
          this.selectName = '成交量';
        }
        this.oLine1 = Line1;
        this.oLine2 = Line2;
        this.oLine3 = Line3;
        this.oLine4 = Line4;
        if(Line1==''|| !Line1){
          this.Line1= '--';
        }else{
          this.Line1 = Line1;
        }
        if(Line2==''|| !Line2){
          this.Line2= '--';
        }else{
          this.Line2 = Line2;
        }
        if(Line3==''|| !Line3){
          this.Line3= '--';
        }else{
          this.Line3 = Line3;
        }
        if(Line4==''|| !Line4){
          this.Line4= '--';
        }else{
          this.Line4 = Line4;
        }
        this.titleShow(index);
      },
      vuleFunc(i){
        this.stockIndexList(this.cfg1.stockIndex[i]);
        if(i==0){
          this.selectName = '成交量';
        }else{
          this.selectName = this.cfg1.stockIndex[i];
        }
        this.is_select = false;
      },
      quota(i){
        if(i<0){
          this.Line1 = this.oLine1;
          this.Line2 = this.oLine2;
          this.Line3 = this.oLine3;
          this.Line4 = this.oLine4;
        }else {
          var index = this.cfg1.stockIndex.indexOf(this.selectName);
          if(index<0 || this.selectName == '成交量'){
            this.Line1 = util.numTosize(this.newDATA.m_iLine1[i]);
            this.Line2 = util.numTosize(this.newDATA.m_iLine2[i]);
            this.Line3 = util.numTosize(this.newDATA.m_iLine3[i]);
          }else {
            if(this.newDATA.m_iLine1){
              this.Line1 = util.toDecimal2(this.newDATA.m_iLine1[i]/1000,2);
            }
            if(this.newDATA.m_iLine2){
              this.Line2 = util.toDecimal2(this.newDATA.m_iLine2[i]/1000,2);
            }
            if(this.newDATA.m_iLine3){
              this.Line3 = util.toDecimal2(this.newDATA.m_iLine3[i]/1000,2);
            }
            if(this.newDATA.m_iLine4){
              this.Line4 = util.toDecimal2(this.newDATA.m_iLine4[i]/1000,2);
            }
          }
        }
      },
      titleShow(i){
        console.log(i);
        var stock_index = i.indexOf(this.cfg1.stockIndex);
        var that = this;
        that.cfg1.stockIndex.forEach((item,index)=>{

          if(item == i){
            if(item == '成交量'){
              item = 'VOL';
            }
            that[item+'Title'] = true;
          }else {
            if(item == '成交量'){
              item = 'VOL';
            }
            that[item+'Title'] = false;
          }
        })
      }
    },
    events:{
      'parent-chartKLinedata':function(chartdata){
        var Dom = $(this.$el).find('.h5_difference');
        var Dom_index = $(this.$el).find('.h5_quota');
        this.StockMinIndex = chartdata.StockIndex;
        this.addCount = 0;
        this.cfg1.width = (Dom.width()) * 2;
        this.cfg1.height = (Dom.height()) * 2;
        this.cfg1.height_index = Dom_index.height() * 2;
        this.cfg1.data = chartdata;
        this.cfg1.index = chartdata;
        this.cfg1.cns = $(this.$el).find('#cns')[0];
        this.cfg1.cnst = $(this.$el).find('#cnst')[0];
        this.cfg1.component = $(this.$el).find('#component');

        this.cfg1.cns_index = $(this.$el).find('#cns_index')[0];
        this.cfg1.cnst_index = $(this.$el).find('#cnst_index')[0];
        this.cfg1.component_index = $(this.$el).find('#component_index');
        this.H5Difference(this.cfg1);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .chart-wrapper {
    display: flex;
    flex-direction: column;
    .h5_difference {
      flex: 1;
    }
  }
  .h5_difference {
    height: 150px;
    width: 100%;
  }
  .h5_quota{
    height: 75px;
    width: 100%;
  }
  .h5_difference canvas ,.h5_quota canvas{
    width: 100%;
    height: 100%;
  }
  .h5_content{
    position: relative;
    font-size: 0.5rem;
    white-space: nowrap;
    .select-vule{
      position: absolute;
      left: 2rem;
      top: -5rem;
      height: 10rem;
      overflow-y: scroll;
      background: @color-text;
      z-index: 3;
      border: 1px solid @color-primary-active;
      /*border-radius: 5px;*/
      width: 3rem;
      span{
        display: block;
        text-align: center;
        line-height: 1.5rem;
        position: relative;
        .hairline(bottom,@color-split);
      }
    }
    .cont-left{
      display: inline-block;
      width: 85%;
      .select{
        color: @color-primary;
      }
    }
    .title{
      display: inline-block;
      width: 70%;
      span{
        margin-right: 0.25rem;
      }
      .line1{
        color: #f8b526;
      }
      .line2{
        color: #ff6666;
      }
      .line3{
        color: #4aa6f6;
      }
      .line4{
        color: #c25cf1;
      }
    }
    .fuquan{
      display: inline-block;
      width: 15%;
    }
    .dot-bottom {
      font-size: 0;
      line-height: 0;
      border-width: 4px;
      border-color: @color-primary;
      border-bottom-width: 0;
      border-style: dashed;
      border-top-style: solid;
      border-left-color: transparent;
      border-right-color: transparent;
      vertical-align: middle;
      margin: 0 2px;
    }
  }

</style>
