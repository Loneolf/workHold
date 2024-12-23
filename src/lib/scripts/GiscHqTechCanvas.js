/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：
 * 文件标识：
 * 摘    要：指标
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/11/24
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
//分时坐标位置
function coordinate(p) {
  return min_h/(maxRose_val*2)*(maxVal-p);
}
function coortotal(p,max,min,h_index,total_max) {
  // if(min-0<0){
    p = p-min;
  // }
  if(max && min){
    max = max-min;
  }
  var y = h_index-(h_index/(max || total_max)*p);
  /*if(min-0<0){
   return y - (h_index-(h_index/(max || total_max)*Math.abs(min)));
   }else{
   return y;
   }*/
  return y;
}

/*
 * DrawMACD 画MACD柱线
 *
 * @param rRect 要绘制的范围
 *
 * @param lData 数据
 *
 * @param nMaxDelta 最大值
 *
 * @param lMinValue 最小值
 *
 * @param nColor 颜色
 */
function DrawMACD(canvasID,lData,o_w,h_index,lMaxValue,lMinValue,nUpColor,nDownColor) {
  if (lMaxValue == lMinValue)
    return;

  var tmpData = lData;

  var color;
  for (var i = 0; i < tmpData.length/* lData.length */; i++) {
    canvasID.beginPath();
    var x   = (o_w+2)*i + (o_w/2);
    var h_y ,l_y ;
    let y = coortotal(tmpData[i],lMaxValue,lMinValue,h_index);
    if (tmpData[i] >= 0){
      color = nUpColor;
      h_y = y;
      l_y = coortotal(0,lMaxValue,lMinValue,h_index);
    }else{
      color = nDownColor;
      h_y = coortotal(0,lMaxValue,lMinValue,h_index);
      l_y = y;
    }
    canvasID.strokeStyle = color;
    canvasID.moveTo(x, h_y);
    canvasID.lineTo(x, l_y);
    canvasID.stroke();
  }

}

function DrawBOLL(canvasID,lData,o_w,h_index,lMaxValue,lMinValue,nUpColor,nDownColor) {
  if (lMaxValue == lMinValue)
    return;

  var tmpData = lData;
  var tmpy0, tmpy1, tmpy2, tmpy3;
  for (var i = 0; i < tmpData.length/* lData.length */; i++) {
    var color;
    if (tmpData[i].OpenPrice <= tmpData[i].ClosePrice){
      color = nUpColor;
    }else{
      color = nDownColor;
    }
    tmpy0 = coortotal(tmpData[i].HighPrice,lMaxValue,lMinValue,h_index);
    tmpy1 = coortotal(tmpData[i].LowPrice,lMaxValue,lMinValue,h_index);
    tmpy2 = coortotal(tmpData[i].ClosePrice,lMaxValue,lMinValue,h_index);
    tmpy3 = coortotal(tmpData[i].OpenPrice,lMaxValue,lMinValue,h_index);

    var x   = (o_w+2)*i + (o_w/2);

    canvasID.strokeStyle = color;
    canvasID.beginPath();
    canvasID.moveTo(x, tmpy0);
    canvasID.lineTo(x, tmpy1);
    canvasID.stroke();

    canvasID.beginPath();
    canvasID.moveTo(x+4, tmpy2);
    canvasID.lineTo(x, tmpy2);
    canvasID.stroke();

    canvasID.beginPath();
    canvasID.moveTo(x, tmpy3);
    canvasID.lineTo(x-4, tmpy3);
    canvasID.stroke();
  }
}

function chengjiaol(TkLineData,MAXCOUNT,addCount,key,listVol) {
  var l = [];
  var k = key || 'Total_h';
  if(MAXCOUNT == TkLineData.length-1 || TkLineData.length>listVol){
    TkLineData = TkLineData.slice(addCount);
  }
  TkLineData.forEach((item,index)=>{
    l.push(item[k]);
  });
  var max = Math.max.apply({}, l);
  return max;
}

/*
 * @成交量
 * @ctx 画布
 * @data 数据
 * */
function chengjiaol_canvas(canvasID,MAXCOUNT,TkLineData,o_w,addCount,up_color,low_color,color_line,h_index,total_max,listVol,CONTACTID) {
  //画分时图
  var klineData = TkLineData;
  if(MAXCOUNT == klineData.length-1 || TkLineData.length>listVol){
    klineData = klineData.slice(addCount);
  }
  klineData.forEach((item,index)=>{
    var color = up_color;
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
        if(TkLineData[addCount-1] && parseFloat(TkLineData[addCount].ClosePrice)>parseFloat(item.OpenPrice)){
          color = low_color;
        }if(CONTACTID>parseFloat(item.OpenPrice)){
          color = low_color;
        }
      }
    }

    let y_index = coortotal(item.Total_h,'','',h_index,total_max);
    canvasID.beginPath();
    canvasID.strokeStyle = color;//边框
    if(color == low_color){
      canvasID.fillStyle=color;
      canvasID.fillRect(x_b,y_index,o_w,h_index-y_index);
    }else{
      canvasID.lineWidth = 2;
      canvasID.fillStyle=color_line;
      canvasID.fillRect(x_b+1,y_index+1,o_w,h_index-y_index-1);
      canvasID.strokeRect(x_b,y_index,o_w,h_index-y_index);
    }
  });
}
/*
 * @成交量均线
 * @canvasID画布
 * @data 数据
 * @num 5，10，20
 * @c color，颜色
 * @addCount MA最大20
 * @o_w k的宽度
 * @h_index 画布的高度
 * @total_max
 * */
function chengjiaol_average_canvas(canvasID,data,num,c,addCount,o_w,h_index,total_max) {
  o_w = o_w || 8;
  //画成交量均线
  canvasID.beginPath();
  canvasID.strokeStyle = c;
  canvasID.lineWidth = 1;
  var isS = true;
  var averageData = data.slice(addCount);
  var totalArray = [];
  averageData.every((item,index)=>{
    var isN = true,
        total_all = item.Total_h-0;
    var x_b = (o_w+2)*index;
    for(var i=1;i<num;i++){
      var listData = data[index+addCount-i];
      if(listData){
        total_all +=parseFloat(listData.Total_h);
      }else{
        isN = false;
      }
    }
    if(isN){
      totalArray.push(total_all/num);
      let y = coortotal(total_all/num,'','',h_index,total_max);
      let x = x_b+(o_w/2);
      if(isS){
        canvasID.moveTo(x, y);
        isS = false;
      }else{
        canvasID.lineTo(x, y);
      }
    }else {
      totalArray.push('');
    }
    return true;
  });
  canvasID.stroke();
  return totalArray;
}


function DrawText(canvasID,nMaxDelta,lMinValue,nColor,h_index) {
  //最大小价
  canvasID.font = "20px Helvetica";
  canvasID.fillStyle = nColor; //"#000000" "#32a632"
  canvasID.textAlign = "left";
  canvasID.fillText(nMaxDelta,0,20);
  canvasID.fillText(lMinValue,0,h_index-5);
}

/**
 * DrawIndicate 画指标线
 * @param canvasID 画布
 * @param data 数据
 * @param o_w k线的宽度
 * @param h_index 画布的高度
 * @param nMaxDelta 最大值
 * @param lMinValue 最小值
 * @param nColor 颜色
 */
function DrawIndicateLine(canvasID,data,o_w,h_index,nMaxDelta,lMinValue,nColor){
  var isS = true;
  canvasID.beginPath();
  canvasID.strokeStyle = nColor;
  canvasID.lineWidth = 1;
  data.forEach((item,index)=>{
    var x_b = (o_w+2)*index;
    let y = coortotal(item,nMaxDelta,lMinValue,h_index);
    let x = x_b+(o_w/2);
    if(isS){
      canvasID.moveTo(x, y);
      isS = false;
    }else{
      canvasID.lineTo(x, y);
    }
  });
  canvasID.stroke();
}
/*********************************************
 * 函数名称：CalculatMACD 编写时间：2016-11-25 返回数据类型：void 函数功能：生成MACD数据 其他说明：十二日平滑系数
 * 1538 / 10000 其他说明：二十六日平滑系数 741 / 10000
 *********************************************/
function EMA( x, n, y) {
  return (2 * x + (n - 1) * y) / (n + 1);
}
/*
* 计算macd
* @lData 数据
* @nStart 开始画
* @nLen 一屏幕可以显示多少条
* @默认12，26，9
* */
function CalculatMACD(lData,nStart,nLen,nCircles) {
  if(lData == null)
    return ;

  if (nCircles == null || nCircles.length != 3)
    return;

  var nIndex = 0,
      m_pResultData = {
        m_iLine1:[],
        m_iLine2:[],
        m_iLine3:[]
      };
  var AX = 0,
      BX = 0,
      CX = 0;
  for (var i = 0; i < lData.length; i++) {
    if (i > 0) {
      AX = EMA(lData[i].ClosePrice, nCircles[0], AX);
      BX = EMA(lData[i].ClosePrice, nCircles[1], BX);
      CX = EMA((AX - BX), nCircles[2], CX);
    } else {
      AX = EMA(lData[i].ClosePrice, nCircles[0], lData[i].ClosePrice);
      BX = EMA(lData[i].ClosePrice, nCircles[1], lData[i].ClosePrice);
      CX = EMA((AX - BX), nCircles[2], (AX - BX));
    }
    if (i >= nStart) {
      m_pResultData.m_iLine3[nIndex] = AX - BX;
      m_pResultData.m_iLine2[nIndex] = CX;
      m_pResultData.m_iLine1[nIndex] = (2 * (m_pResultData.m_iLine3[nIndex] - m_pResultData.m_iLine2[nIndex]));
      // TztLog.i("",i+";MACD:"+(2*(AX - BX -
      // CX))+";DEA:"+CX+";DIFF:"+(AX - BX));
      nIndex++;
      if (nIndex >= nLen)
        break;
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltKDJ
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成KDJ数据
 *********************************************/
function SMA(x,n,m,y) {
  return (m * x + (n - m) * y) / n;
}

function CalculatKDJ(lData,nStart, nLen, nCircles) {
  if(lData == null)
  {
    return ;
  }
  var nIndex = 0;
  var lLine1 = 0,
      lLine2 = 0,
      lLine3 = 0;
  var lMax = 0, lMin = 0;
  var lRSV = 0;
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[],
    m_iLine3:[]
  };
  for (var i = 0; i < lData.length; i++) {
    if (i < nCircles[0] - 1) {
      if (lData[i].HighPrice != lData[i].LowPrice) {
        lRSV = ((lData[i].ClosePrice - lData[i].LowPrice) * 10000) / (lData[i].HighPrice - lData[i].LowPrice);
      } else {
        lRSV = 0;
      }
      lLine1 = 5000;//SMA(lRSV, nCircles[1], 1, 0);
      lLine2 = 5000;//SMA(lLine1, nCircles[2], 1, 0);
      lLine3 = 3 * lLine1 - 2 * lLine2;
    } else if (i == nCircles[0] - 1) {
      for (var j = 0; j <= i; j++) {
        if (j == 0) {
          lMax = lData[j].HighPrice;
          lMin = lData[j].LowPrice;
        } else {
          if (lMax < lData[j].HighPrice) {
            lMax = lData[j].HighPrice;
          }
          if (lMin > lData[j].HighPrice) {
            lMin = lData[j].HighPrice;
          }
        }
      }
      if (lMax != lMin) {
        lRSV = (((lData[i].ClosePrice - lMin) * 10000) / (lMax - lMin));
      } else {
        lRSV = 0;
      }
      lLine1 = SMA(lRSV, nCircles[1], 1, lLine1);
      lLine2 = SMA(lLine1, nCircles[2], 1, lLine2);
      lLine3 = 3 * lLine1 - 2 * lLine2;
    } else {
      for (var j = i + 1 - nCircles[0]; j <= i; j++) {
        if (j == i + 1 - nCircles[0]) {
          lMax = lData[j].HighPrice;
          lMin = lData[j].LowPrice;
        } else {
          if (lMax < lData[j].HighPrice) {
            lMax = lData[j].HighPrice;
          }
          if (lMin > lData[j].LowPrice) {
            lMin = lData[j].LowPrice;
          }
        }
      }
      if (lMax != lMin) {
        lRSV = (((lData[i].ClosePrice - lMin) * 10000) / (lMax - lMin));
      } else {
        lRSV = 0;
      }
      lLine1 = SMA(lRSV, nCircles[1], 1, lLine1);
      lLine2 = SMA(lLine1, nCircles[2], 1, lLine2);
      lLine3 = 3 * lLine1 - 2 * lLine2;
    }
    if (i >= nStart) {
      m_pResultData.m_iLine1[nIndex] = lLine1*10;
      m_pResultData.m_iLine2[nIndex] = lLine2*10;
      m_pResultData.m_iLine3[nIndex] = lLine3*10;
      // TztLog.i("",";Line1:"+m_pResultData.m_iLine1[nIndex]+";Line2:"+m_pResultData.m_iLine2[nIndex]+";Line3:"+m_pResultData.m_iLine3[nIndex]);
      nIndex++;
      if (nIndex >= nLen)
        break;
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CalculatRSI
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成RSI数据
 *********************************************/
function CalculatRSI(lData,nStart,nLen,nCircles,m_lMultiples) {
  if(lData == null)
  {
    return ;
  }

  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[],
    m_iLine3:[]
  }
  // var nMultiples = Pub.g_lMulti[m_lMultiples + 1];// 因为计算结果被除10了
  var nMultiples = Math.pow(10,(m_lMultiples + 1));
  var nIndex = 0;

  var upsum1 = 0, downsum1 = 0;
  var upsum2 = 0, downsum2 = 0;
  var AX1 = 0, BX1 = 0;
  var AX2 = 0, BX2 = 0;
  for (var i = 0; i < lData.length; i++) {
    if (i == 0) {
      m_pResultData.m_iLine1[nIndex] = 0;
      m_pResultData.m_iLine2[nIndex] = 0;
    } else {
      // calculate RSI 1
      if (i < nCircles[0]) {
        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          upsum1 += lData[i].ClosePrice - lData[i - 1].ClosePrice;
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          downsum1 += lData[i - 1].ClosePrice - lData[i].ClosePrice;
        }
        m_pResultData.m_iLine1[nIndex] = 0;
      } else if (i == nCircles[0]) {
        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          upsum1 += lData[i].ClosePrice - lData[i - 1].ClosePrice;
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          downsum1 += lData[i - 1].ClosePrice - lData[i].ClosePrice;
        }

        AX1 = upsum1 * 10 / nCircles[0];
        BX1 = downsum1 * 10 / nCircles[0];
        if ((AX1 + BX1) != 0) {
          m_pResultData.m_iLine1[nIndex] = ((upsum1 * nMultiples / (upsum1 + downsum1) + 5) / 10)*100;
        } else {
          m_pResultData.m_iLine1[nIndex] = 0;
        }
      } else {

        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          AX1 = AX1 * (nCircles[0] - 1) + (lData[i].ClosePrice - lData[i - 1].ClosePrice) * 10;
          BX1 = BX1 * (nCircles[0] - 1);
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          AX1 = AX1 * (nCircles[0] - 1);
          BX1 = BX1 * (nCircles[0] - 1) + (lData[i - 1].ClosePrice - lData[i].ClosePrice) * 10;
        } else {
          AX1 = AX1 * (nCircles[0] - 1);
          BX1 = BX1 * (nCircles[0] - 1);
        }
        AX1 = AX1 / nCircles[0];
        BX1 = BX1 / nCircles[0];
        if ((AX1 + BX1) != 0) {
          m_pResultData.m_iLine1[nIndex] = ((AX1 * nMultiples / (AX1 + BX1) + 5) / 10)*100;
        } else {
          m_pResultData.m_iLine1[nIndex] = 0;
        }
      }

      // calculate RSI 2
      if (i < nCircles[1]) {
        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          upsum2 += lData[i].ClosePrice - lData[i - 1].ClosePrice;
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          downsum2 += lData[i - 1].ClosePrice - lData[i].ClosePrice;
        }
        m_pResultData.m_iLine2[nIndex] = 0;
      } else if (i == nCircles[1]) {
        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          upsum2 += lData[i].ClosePrice - lData[i - 1].ClosePrice;
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          downsum2 += lData[i - 1].ClosePrice - lData[i].ClosePrice;
        }
        AX2 = (upsum2 * 10 / nCircles[1]);
        BX2 = (downsum2 * 10 / nCircles[1]);
        if ((AX2 + BX2) != 0) {
          m_pResultData.m_iLine2[nIndex] = ((upsum2 * nMultiples / (upsum2 + downsum2) + 5) / 10)*100;
        } else {
          m_pResultData.m_iLine2[nIndex] = 0;
        }
      } else {

        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          AX2 = AX2 * (nCircles[1] - 1) + (lData[i].ClosePrice - lData[i - 1].ClosePrice) * 10;
          BX2 = BX2 * (nCircles[1] - 1);
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          AX2 = AX2 * (nCircles[1] - 1);
          BX2 = BX2 * (nCircles[1] - 1) + (lData[i - 1].ClosePrice - lData[i].ClosePrice) * 10;
        } else {
          AX2 = AX2 * (nCircles[1] - 1);
          BX2 = BX2 * (nCircles[1] - 1);
        }
        AX2 = AX2 / nCircles[1];
        BX2 = BX2 / nCircles[1];
        if ((AX2 + BX2) != 0) {
          m_pResultData.m_iLine2[nIndex] = (( AX2 * nMultiples / (AX2 + BX2) + 5) / 10)*100;
        } else {
          m_pResultData.m_iLine2[nIndex] = 0;
        }
      }

      // calculate RSI 3
      if (i < nCircles[2]) {
        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          upsum2 += lData[i].ClosePrice - lData[i - 1].ClosePrice;
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          downsum2 += lData[i - 1].ClosePrice - lData[i].ClosePrice;
        }
        m_pResultData.m_iLine3[nIndex] = 0;
      } else if (i == nCircles[2]) {
        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          upsum2 += lData[i].ClosePrice - lData[i - 1].ClosePrice;
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          downsum2 += lData[i - 1].ClosePrice - lData[i].ClosePrice;
        }
        AX2 = (upsum2 * 10 / nCircles[2]);
        BX2 = (downsum2 * 10 / nCircles[2]);
        if ((AX2 + BX2) != 0) {
          m_pResultData.m_iLine3[nIndex] = ((upsum2 * nMultiples / (upsum2 + downsum2) + 5) / 10)*100;
        } else {
          m_pResultData.m_iLine3[nIndex] = 0;
        }
      } else {

        if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
          AX2 = AX2 * (nCircles[2] - 1) + (lData[i].ClosePrice - lData[i - 1].ClosePrice) * 10;
          BX2 = BX2 * (nCircles[2] - 1);
        } else if (lData[i].ClosePrice < lData[i - 1].ClosePrice) {
          AX2 = AX2 * (nCircles[2] - 1);
          BX2 = BX2 * (nCircles[2] - 1) + (lData[i - 1].ClosePrice - lData[i].ClosePrice) * 10;
        } else {
          AX2 = AX2 * (nCircles[2] - 1);
          BX2 = BX2 * (nCircles[2] - 1);
        }
        AX2 = AX2 / nCircles[2];
        BX2 = BX2 / nCircles[2];
        if ((AX2 + BX2) != 0) {
          m_pResultData.m_iLine3[nIndex] = (( AX2 * nMultiples / (AX2 + BX2) + 5) / 10)*100;
        } else {
          m_pResultData.m_iLine3[nIndex] = 0;
        }
      }
    }
    if (i >= nStart) {
      // TztLog.i("",";Line1:"+m_pResultData.m_iLine1[nIndex]+";Line2:"+m_pResultData.m_iLine2[nIndex]);
      nIndex++;
      if (nIndex >= nLen)
        break;
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CalculatWR
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成WR数据
 *********************************************/
function CalculatWR(lData, nStart, nLen, nCircles,m_lMultiples) {
  if(lData == null)
    return ;

  if(m_lMultiples < 2)
  {
    return ;
  }

  if(lData == null)
  {
    return ;
  }
  var m_pResultData = {
    m_iLine1:[]
  };
  var nMultiples = Math.pow(10,(m_lMultiples - 2));
  var nIndex = 0;

  var lMax = 0, lMin = 0;
  for (var i = 0; i < 1; i++) {
    if (nCircles[i] <= 0) {
      for (var j = 0; j < lData.length; j++) {
        m_pResultData.m_iLine1[nIndex] = 0;
      }
      continue;
    }
    for (var j = 0; j < lData.length; j++) {
      if (j < nCircles[i] - 1) {
        m_pResultData.m_iLine1[nIndex] = 0;
      } else {
        for (var k = j + 1 - nCircles[i]; k <= j; k++) {
          if (k == j + 1 - nCircles[i]) {
            lMax = lData[k].HighPrice;
            lMin = lData[k].LowPrice;
          } else {
            if (lMax < lData[k].HighPrice) {
              lMax = lData[k].HighPrice;
            }
            if (lMin > lData[k].LowPrice) {
              lMin = lData[k].LowPrice;
            }
          }
        }
        if (lMax != lMin) {
          m_pResultData.m_iLine1[nIndex] = ((lMax - lData[j].ClosePrice) * 100) / (lMax - lMin);
        } else {
          m_pResultData.m_iLine1[nIndex] = 0;
        }
      }
      if (j >= nStart) {
        m_pResultData.m_iLine1[nIndex] *= nMultiples*100;
        // TztLog.i("",";nIndex:"+nIndex+";Line1:"+m_pResultData.m_iLine1[nIndex]);
        nIndex++;
        if (nIndex >= nLen)
          break;
      }
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CalculatPSY
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成PSY数据
 * PSY=N日内上涨天数/N*100
 *********************************************/
function  CalculatPSY(lData, nStart, nLen, nCircles,m_lMultiples) {
  if(lData == null)
  {
    return ;
  }

  var nMultiples = m_lMultiples;
  var m_pResultData = {
    m_iLine1:[]
  }

  var nDays = nCircles[0] - 1;
  var nIndex = 0;
  var nBegin = nStart - nDays;

  var j;
  var totalUP = 0; // n日内总上涨天数

  for (var m = 0; m < nDays + nLen; m++) {
    if (m >= lData.length || nIndex >= m_pResultData.m_iLine1.length)
      break;

    totalUP = 0;
    if (m >= nDays) {
      for (j = m - nDays; j <= m; j++) {
        if (nBegin + j > 0 && nBegin + j < lData.length && lData[nBegin + j].ClosePrice > lData[nBegin + j - 1].ClosePrice) {
          totalUP++;
        }
      }
      m_pResultData.m_iLine1[nIndex] = (nMultiples * totalUP / nCircles[0]);
      nIndex++;
    } else {
      if (nBegin + m < 0) {
        if (m == 0)
          totalUP++;
        for (j = 1; j <= m; j++) {
          if (j < lData.length && lData[j].ClosePrice > lData[j - 1].ClosePrice) {
            totalUP++;
          }
        }
        m_pResultData.m_iLine1[nIndex] = (nMultiples * totalUP / (m + 1));
        nIndex++;
      }
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltBOLL
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成BOLL数据
 *********************************************/
function CalculatBOLL(lData, nStart, nLen, nCircles) {
  // Sqrt sqrt = new Sqrt();
  // var nMultiples = (Pub.g_lMulti[m_lMultiples - 2]);
  if(lData == null)
  {
    return ;
  }

  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[],
    m_iLine3:[]
  };

  var nDays = nCircles[0] - 1;
  var nIndex = 0;
  var nBegin = nStart - nDays;

  var j;
  var lTotalPrice;
  var lTotalDev;
  for (var m = 0; m < nDays + nLen; m++) {
    if (m >= lData.length)
      break;

    if (m < nCircles[0] - 1) {
      m_pResultData.m_iLine1[nIndex] = 0x00000000;
      m_pResultData.m_iLine2[nIndex] = 0x00000000;
      m_pResultData.m_iLine3[nIndex] = 0x00000000;
    } else {
      lTotalPrice = 0;
      for (j = m - nDays; j <= m; j++) {
        if (nBegin + j >= 0 && nBegin + j < lData.length)
          lTotalPrice += lData[nBegin + j].ClosePrice;
      }
      m_pResultData.m_iLine1[nIndex] = lTotalPrice / nCircles[0];

      lTotalDev = 0;
      for (j = m - nDays; j <= m; j++) {
        if (nBegin + j >= 0 && nBegin + j < lData.length)
          lTotalDev += (lData[nBegin + j].ClosePrice - m_pResultData.m_iLine1[nIndex])
            * (lData[nBegin + j].ClosePrice - m_pResultData.m_iLine1[nIndex]);
      }
      lTotalDev = lTotalDev / nCircles[0];
      lTotalDev = Math.sqrt(lTotalDev);
      // lTotalDev = Pub.parsevar(sqrt.Sqrt(lTotalDev+"", 2,
      // 0));//MathFP.sqrt(lTotalDev,2);
      // m_pResultData.m_iLine1[nIndex] *= nMultiples;
      m_pResultData.m_iLine2[nIndex] = m_pResultData.m_iLine1[nIndex] + (lTotalDev * nCircles[1]);// *nMultiples;
      m_pResultData.m_iLine3[nIndex] = m_pResultData.m_iLine1[nIndex] - (lTotalDev * nCircles[1]);// *nMultiples;
      // TztLog.i("",";nIndex:"+nIndex+";Line1:"+m_pResultData.m_iLine1[nIndex]+";Line2:"+m_pResultData.m_iLine2[nIndex]+";Line3:"+m_pResultData.m_iLine3[nIndex]);
      nIndex++;
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltCCI
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成CCI数据
 *********************************************/
function CalculatCCI(lData, nStart, nLen, nCircles,m_lMultiples) {
  if(lData == null)
  {
    return ;
  }
  var m_pResultData = {
    m_iLine1:[]
  };
  var nMultiples = Math.pow(10,m_lMultiples);
  try {
    //var nDays = nCircles[0] - 1;
    var nIndex = 0;
    //var nBegin = nStart - nDays;

    var j;
    var lPriceTotal, lAveragePrice, D;
    for (var i = nStart; i < nStart + nLen; i++) {
      if (i >= lData.length)
        break;
      if (i < nCircles[0] - 1) {
        m_pResultData.m_iLine1[nIndex] = 0x00000000;
      } else {
        lPriceTotal = 0;

        for (j = i + 1 - nCircles[0]; j <= i; j++) {
          lPriceTotal += (lData[j].ClosePrice + lData[i].OpenPrice + lData[j].HighPrice + lData[j].LowPrice) / 4;
        }

        lAveragePrice = lPriceTotal / nCircles[0];
        D = 0;

        for (j = i + 1 - nCircles[0]; j <= i; j++)
          D += Math.abs(( lData[j].ClosePrice + lData[i].OpenPrice + lData[j].HighPrice + lData[j].LowPrice) / 4
        - lAveragePrice);

        D = D / nCircles[0];

        if (D > 0)
          m_pResultData.m_iLine1[nIndex] = ((( lData[i].ClosePrice + lData[i].OpenPrice + lData[i].HighPrice + lData[i].LowPrice) / 4 - lAveragePrice) * 1000 * nMultiples / (15 * D));
      else
        m_pResultData.m_iLine1[nIndex] = 0;
        nIndex++;
      }
    }
    return m_pResultData;
  } catch (e) {
    return;
  }
}

/*********************************************
 * 函数名称：CaltROC
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成ROC数据
 * ROC=(当天的收盘价－N天前的收盘价)/N天前的收盘价
 *********************************************/
function CalculatROC(lData, nStart, nLen, nCircles,m_lMultiples) {
  if (lData == null)
    return;

  var nIndex = 0;
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[]
  };
  /*var nMultiples = Math.pow(10,m_lMultiples);
  for (var i = nStart; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (i < nCircles[0]) {
      m_pResultData.m_iLine1[nIndex] = 0x00000000;
    }
    else {
      m_pResultData.m_iLine1[nIndex] = nMultiples * 100
        * (lData[i].ClosePrice - lData[i - nCircles[0]].ClosePrice) / lData[i - nCircles[0]].ClosePrice;
    }
    nIndex++;
  }
  return m_pResultData;*/
  var roc= [];
  var N=nCircles[0];
  for (var i = 0; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (i < nCircles[0]) {
      roc[i] = 0x00000000;
    }
    else {
      roc[i] = 10000 * (lData[i].ClosePrice - lData[i - nCircles[0]].ClosePrice) / lData[i - nCircles[0]].ClosePrice;
    }
  }

  for (var i = nStart; i < nStart + nLen; i++) {
    m_pResultData.m_iLine1[i-nStart] = roc[i]*10;
  }
  //MAROC是6天
  var sum=0;
  for(var i=0;i<nStart + nLen && i<6;i++){
    sum+=roc[i];
  }
  var maroc = [];
  for(var i=0;i<nStart + nLen;i++){
    if(i<6)
      maroc[i]=0x00000000;
    else{
      sum=sum+roc[i]-roc[i-6];
      maroc[i]=sum/6;
    }
  }
  for (var i = nStart; i < nStart + nLen; i++) {
    m_pResultData.m_iLine2[i-nStart] = maroc[i]*10;
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltDMI
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成DMI数据
 *********************************************/
function CalculatDMI(lData, nStart, nLen, nCircles,m_lMultiples) {
  if (lData == null)
    return;
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[],
    m_iLine3:[],
    m_iLine4:[]
  };
  var nMultiples = Math.pow(10,m_lMultiples);
  var M1 = nCircles[0];
  var M2 = nCircles[0];
  var HD = [];
  var LD = [];
  var TRi = [];
  var index = 0;
  for (var i = nStart - M1 - M2 - M2- M2; i < nStart + nLen; i++) {
    if (i >= lData.length) break;
    if (i <= 0) {
      HD[index] = 0;
      LD[index] = 0;
      TRi[index] = 0;
    }
    else {
      HD[index] = lData[i].HighPrice - lData[i - 1].HighPrice > 0 ? lData[i].HighPrice - lData[i - 1].HighPrice : 0;
      LD[index] = lData[i - 1].LowPrice - lData[i].LowPrice > 0 ? lData[i - 1].LowPrice - lData[i].LowPrice : 0;
      if (HD[index] > LD[index])
        LD[index] = 0;
      else if (HD[index] < LD[index])
        HD[index] = 0;
      else
        HD[index] = LD[index] = 0;
      // TR[i]
      var A = lData[i].HighPrice - lData[i].LowPrice;
      var B = Math.abs(lData[i].HighPrice - lData[i - 1].ClosePrice);
      var C = Math.abs(lData[i].LowPrice - lData[i - 1].ClosePrice);
      if (A >= B && A >= C)
        TRi[index] = A;
      else if (B >= A && B >= C)
        TRi[index] = B;
      else
        TRi[index] = C;
    }
    index++;
  }

  // var DMP = new long[nLen + M2 + M2];
  // var DMM = new long[nLen + M2 + M2];
  // var TR = new long[nLen + M2 + M2];
  var DI1 = [];
  var DI2 = [];
  var DMP = 0, DMM = 0, TR = 0;
  for (var i = 0; i < M1; i++) {
    DMP += HD[i] > LD[i] ? HD[i] : 0;
    DMM += LD[i] > HD[i] ? LD[i] : 0;
    TR += TRi[i];
  }
  for (var i = 0; i < nLen + M2 + M2 + M2; i++) {
    DMP = DMP + HD[i + M1] - HD[i];
    DMM = DMM + LD[i + M1] - LD[i];
    TR = TR + TRi[i + M1] - TRi[i];
    DI1[i] = TR == 0 ? 0 : DMP  * nMultiples / TR;
    DI2[i] = TR == 0 ? 0 : DMM  * nMultiples / TR;
    if (i >= M2 + M2 + M2) {
      // DI1
      m_pResultData.m_iLine1[i - M2 - M2 - M2] = DI1[i]*100;
      // DI2
      m_pResultData.m_iLine2[i - M2 - M2 - M2] = DI2[i]*100;
    }
  }

  // ADX: MA(ABS(DI2-DI1)/(DI2+DI1)*100, M2)
  /*var ADX = [];
  var sum = 0;
  for (var i = 0; i < M2; i++) {
    if (DI2[i] + DI1[i] != 0)
      sum += Math.abs(DI2[i] - DI1[i]) * 100 / (DI2[i] + DI1[i]);
  }
  for (var i = 0; i < nLen + M2; i++) {
    var A = DI2[i + M2] + DI1[i + M2];
    var B = DI2[i] + DI1[i];
    var C = A != 0 ? Math.abs(DI2[i + M2] - DI1[i + M2]) * 100 * nMultiples / A : 0;
    var D = B != 0 ? Math.abs(DI2[i] - DI1[i]) * 100 * nMultiples / B : 0;
    sum = sum + C - D;
    ADX[i] = sum / M2;
    if (i >= M2)
      m_pResultData.m_iLine3[i - M2] = ADX[i];
  }
  // ADXR: (ADX+REF(ADX,M2))/2
  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine4[i] = (ADX[i] + ADX[i + M2]) / 2;
  }*/
  var adx= [];
  for (var i = 0; i < nLen + M2 + M2+M2; i++) {
    var B = DI2[i] + DI1[i];
    var D;
    if(B != 0){
      D = Math.abs(DI2[i] - DI1[i]) * 100
    }else {
      D = 0;
    }
    // var D = B != 0 ? Math.abs(DI2[i] - DI1[i]) * 10000 / B : 0;
    adx[i] = D;
  }

  var sum=0;
  for (var i = 0; i < M2+M2; i++) {
    sum += adx[i];
  }

  var ladx=[];
  for (var i = 0; i < nLen + M2 + M2+M2; i++) {
    if(i<M2+M2){
      ladx[i]=0;
    }else if(i==M2+M2){
      ladx[i]= sum/M2;
    }else{
      ladx[i]=(ladx[i-1]*(M2-1)+adx[i])/M2;
    }
  }

  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine3[i] = ladx[i+M2+M2+M2]*2;
  }

  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine4[i]=(ladx[i+M2+M2+M2]+ladx[i+M2+M2])/2*2;
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltDMA
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 * Tested:Yes
 * DMA: MA(CLOSE, M1) - MA(CLOSE, M2);
 * AMA: MA(DMA, M1);
 *********************************************/
function CalculatDMA(lData, nStart, nLen, nCircles) {
  if (lData == null)
    return;

  var M1 = nCircles[0],
      M2 = nCircles[1];
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[]
  };
  var index = 0;
  var sum1 = 0,
      sum2 = 0;
  var DMA = [];
  for (var i = nStart - M1; i < nStart + nLen; i++) {
    if (i >= lData.length) break;
    if (i < M2 - 1) {
      DMA[index] = 0x00000000;
    }
    else {
      if (sum1 == 0 && sum2 == 0) {
        for (var j = 0; j < M1; j++) {
          sum1 += lData[i - j].ClosePrice;
        }
        sum2 = sum1;
        for (var k = 0; k < M2 - M1; k++) {
          sum2 += lData[i - M1 - k].ClosePrice;
        }
      }
      else {
        sum1 = sum1 + lData[i].ClosePrice - lData[i - M1].ClosePrice;
        sum2 = sum2 + lData[i].ClosePrice - lData[i - M2].ClosePrice;
      }
      DMA[index] = sum1 / M1 - sum2 / M2;
    }
    index++;
  }
  // DMA
  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine1[i] = DMA[i + M1];
  }
  // AMA
  var sumDMA = 0;
  for (var i = 0; i < M1; i++) {
    sumDMA += DMA[i];
  }
  var startIndex = nStart;
  for (var i = 0; i < nLen; i++) {
    sumDMA = sumDMA + DMA[i + M1] - DMA[i];
    if (startIndex < M1 + M2 - 2) {
      m_pResultData.m_iLine2[i] = 0x00000000;
    }
    else {
      m_pResultData.m_iLine2[i] = sumDMA / M1;
    }
    startIndex++;
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltTRIX
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 * TR= EMA(EMA(EMA(CLOSE,M1),M1),M1);
 * TRIX: (TR-REF(TR,1))/REF(TR,1) *100;
 * TRMA: MA(TR,M2);
 *********************************************/
function CalculatTRIX(lData, nStart, nLen, nCircles,m_lMultiples) {
  if (lData == null)
    return;

  var M1 = nCircles[0],
      M2 = nCircles[1];
  var AX = [];
  var BX = [];
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[]
  };
  var nMultiples = Math.pow(10,m_lMultiples);
  AX[0] = lData[0].ClosePrice;
  for (var i = 1; i < nStart + nLen; i++) {
    if (i >= lData.length) break;
    AX[i] = (lData[i].ClosePrice * 2 + AX[i - 1] * (M1 - 1)) / (M1 + 1);
  }
  BX[0] = AX[0];
  for (var i = 1; i < nStart + nLen; i++) {
    BX[i] = (AX[i] * 2 + BX[i - 1] * (M1 - 1)) / (M1 + 1);
  }
  // TR
  AX[0] = BX[0];
  for (var i = 1; i < nStart + nLen; i++) {
    AX[i] = (BX[i] * 2 + AX[i - 1] * (M1 - 1)) / (M1 + 1);
  }
  // TRMA
  var TRIX = [];
  var TRindex = 0;
  for (var i = nStart - M2; i < nStart + nLen; i++) {
    if (i <= 0 || AX[i - 1] == 0)
      TRIX[TRindex] = 0;
    else
      TRIX[TRindex] = 100 * nMultiples * (AX[i] - AX[i - 1]) / AX[i - 1];
    TRindex++;
  }
  var sumTR = 0;
  for (var i = 0; i < M2; i++) {
    sumTR += TRIX[i];
  }
  for (var i = 0; i < nLen; i++) {
    sumTR = sumTR + TRIX[i + M2] - TRIX[i];
    if (nStart + i >= M2)
      m_pResultData.m_iLine2[i] = sumTR / M2;
    else
      m_pResultData.m_iLine2[i] = 0;
  }
  // TRIX
  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine1[i] = TRIX[i + M2];
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltBRAR
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatBRAR(lData, nStart, nLen, nCircles,m_lMultiples) {
  if (lData == null) {
    return;
  }
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[]
  };
  var nMultiples = Math.pow(10,m_lMultiples);
  var index = 0;
  for (var i = nStart; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (i < nCircles[0] + 1) {
      m_pResultData.m_iLine1[index] = 0x00000000;
      m_pResultData.m_iLine2[index] = 0x00000000;
    }
    else {
      var sumAR1 = 0, sumAR2 = 0;
      var sumBR1 = 0, sumBR2 = 0;
      for (var j = 0; j < nCircles[0]; j++) {
        sumAR1 += lData[i - j].HighPrice - lData[i - j].OpenPrice;
        sumAR2 += lData[i - j].OpenPrice - lData[i - j].LowPrice;
        sumBR1 += (lData[i - j].HighPrice - lData[i - j - 1].ClosePrice) > 0 ? (lData[i - j].HighPrice - lData[i
        - j - 1].ClosePrice) : 0;
        sumBR2 += (lData[i - j - 1].ClosePrice - lData[i - j].LowPrice) > 0 ? (lData[i - j - 1].ClosePrice - lData[i - j].LowPrice) : 0;
      }
      m_pResultData.m_iLine1[index] = sumAR2 == 0 ? 0 : nMultiples * sumAR1 / sumAR2;
      m_pResultData.m_iLine2[index] = sumBR2 == 0 ? 0 : nMultiples * sumBR1 / sumBR2;
    }
    index++;
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltVR
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatVR(lData, nStart, nLen, nCircles,m_lMultiples) {
  if (lData == null) {
    return;
  }
  var nIndex = 0;
  var m_pResultData = {
    m_iLine1:[]
  };
  var nMultiples = Math.pow(10,m_lMultiples);
  for (var i = nStart; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (i < nCircles[0]) {
      m_pResultData.m_iLine1[nIndex] = 0x00000000;
    }
    else {
      var avs = 0, bvs = 0, cvs = 0;
      for (var j = 0; j < nCircles[0]; j++) {
        if (lData[i - j].ClosePrice > lData[i - j - 1].ClosePrice) {
          avs += lData[i - j].Total_h;
        }
        else if (lData[i - j].ClosePrice < lData[i - j - 1].ClosePrice) {
          bvs += lData[i - j].Total_h;
          ;
        }
        else {
          cvs += lData[i - j].Total_h;
          ;
        }
      }
      m_pResultData.m_iLine1[nIndex] = 100 * nMultiples * (avs + cvs / 2) / (bvs + cvs / 2);
    }
    nIndex++;
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltOBV
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatOBV(lData, nStart, nLen, nCircles) {
  if (lData == null)
    return;
  var obv = 0;
  var m_pResultData = {
    m_iLine1:[]
  };
  for (var i = 0; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (i == 0) {
      obv = 0;
    }
    else if (lData[i].ClosePrice > lData[i - 1].ClosePrice) {
      obv += lData[i].Total_h;
    }
    else {
      obv -= lData[i].Total_h;
    }
    if (i >= nStart && i < nStart + nLen) {
      m_pResultData.m_iLine1[i - nStart] = obv;
    }
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltASI
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatASI(lData, nStart, nLen, nCircles) {
  if (lData == null)
    return;

  var SI = [];
  var m_pResultData = {
    m_iLine1:[0]
  };
  var A, B, C, D, E, F, G, R, X, K, L;
  // calculate SI[]
  SI[0] = 0;
  for (var i = 1; i < nStart + nLen; i++) {
    if (i >= lData.length) break;
    A = Math.abs(lData[i].HighPrice - lData[i - 1].ClosePrice);
    B = Math.abs(lData[i].LowPrice - lData[i - 1].ClosePrice);
    C = Math.abs(lData[i].HighPrice - lData[i - 1].LowPrice);
    D = Math.abs(lData[i - 1].ClosePrice - lData[i - 1].OpenPrice);
    if (A >= B && A >= C) {
      R = A + B / 2 + D / 4;
    }
    else if (B >= A && B >= C) {
      R = B + A / 2 + D / 4;
    }
    else {
      R = C + D / 4;
    }
    E = lData[i].ClosePrice - lData[i - 1].ClosePrice;
    F = lData[i].ClosePrice - lData[i].OpenPrice;
    G = lData[i - 1].ClosePrice - lData[i - 1].OpenPrice;
    X = E + F / 2 + G;
    K = A > B ? A : B;
    L = 3;
    SI[i] = 50 * X * K / R / L;
  }
  // ASI = SUM(SI,0)
  for (var i = 0; i < nStart; i++) {
    m_pResultData.m_iLine1[0] += SI[i];
  }
  for (var i = 1; i < nLen; i++) {
    m_pResultData.m_iLine1[i] = m_pResultData.m_iLine1[i - 1] + SI[nStart + i - 1];
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltEMV
 * 编写时间：2015-08-22
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatEMV(lData, nStart, nLen, nCircles) {
  if (lData == null)
    return;
  var N = nCircles[0];
  var M = nCircles[1];
  var EM = [];
  var EMV = [];
  var MAEMV = [];
  var A, B, C;
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[]
  };
  EM[0] = 0;
  for (var i = 1; i < nStart + nLen; i++) {
    if (i >= lData.length) break;
    A = (lData[i].HighPrice + lData[i].LowPrice) / 2;
    B = (lData[i - 1].HighPrice + lData[i - 1].LowPrice) / 2;
    C = lData[i].HighPrice - lData[i].LowPrice;
    EM[i] = 100 * (A - B) * C / lData[i].Total_h;
  }
  var sumEM = 0;
  for (var i = 0; i < N && i<EM.length; i++) {
    sumEM += EM[i];
  }
  for (var i = 0; i < nStart + nLen; i++) {
    if (i >= N) {
      sumEM = sumEM + EM[i] - EM[i - N];
      EMV[i] = sumEM;
    }
    else
      EMV[i] = 0;
  }
  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine1[i] = EMV[i + nStart];
  }
  var sumEMV = 0;
  for (var i = 0; i < M && i<EM.length; i++) {
    sumEMV += EM[i];
  }
  for (var i = M; i < nStart + nLen; i++) {
    sumEMV = sumEMV + EMV[i] - EMV[i - M];
    MAEMV[i] = sumEMV / M;
  }
  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine2[i] = MAEMV[i + nStart];
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltWVAD
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatWVAD(lData, nStart, nLen, nCircles) {
  /*if (lData == null)
    return;
  var m_pResultData = {
    m_iLine1:[]
  };
  var nIndex = 0;
  for (var i = nStart; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (lData[i].HighPrice - lData[i].LowPrice == 0)
      m_pResultData.m_iLine1[nIndex] = 0;
    else
      m_pResultData.m_iLine1[nIndex] = (lData[i].ClosePrice - lData[i].OpenPrice) * lData[i].Total_h
        / (lData[i].HighPrice - lData[i].LowPrice);
    nIndex++;
  }
  return m_pResultData;*/
  if (lData == null)
    return;
  var m_pResultData = {
    m_iLine1:[]
  };
  var N=nCircles[0];
  var nIndex = 0;
  var wvad= [];
  var WVAD = [];
  for (var i = 0; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    if (lData[i].HighPrice - lData[i].LowPrice == 0)
      wvad[nIndex] = 0;
    else
      wvad[nIndex] = (lData[i].ClosePrice - lData[i].OpenPrice) * lData[i].Total_h
        // (lData[i].HighPrice - lData[i].LowPrice) * 100;
    nIndex++;
  }
  var sumEM = 0;
  for (var i = 0; i < N && i<wvad.length; i++) {
    sumEM += wvad[i];
  }
  for (var i = 0; i < nStart + nLen; i++) {
    if (i >= N) {
      sumEM = sumEM + wvad[i] - wvad[i - N];
      WVAD[i] = sumEM/N;
    }

    else
      WVAD[i] = 0;
  }
  for (var i = 0; i < nLen; i++) {
    m_pResultData.m_iLine1[i] =WVAD[i + nStart]*1000;
  }
  return m_pResultData;
}

/*********************************************
 * 函数名称：CaltBIAS
 * 编写时间：2016-11-25
 * 返回数据类型：object
 * 函数功能：生成数据
 *********************************************/
function CalculatBIAS(lData, nStart, nLen, nCircles,m_lMultiples) {
  if (lData == null)
    return;
  var nIndex = 0;
  var m_pResultData = {
    m_iLine1:[],
    m_iLine2:[],
    m_iLine3:[]
  };
  var nMultiples = Math.pow(10,m_lMultiples);
  for (var i = nStart; i < nStart + nLen; i++) {
    if (i >= lData.length)
      break;
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    // BIAS 6
    if (i < nCircles[0]) {
      m_pResultData.m_iLine1[nIndex] = 0x00000000;
    }
    else {
      sum1 = 0;
      for (var j = 0; j < nCircles[0]; j++) {
        sum1 += lData[i - j].ClosePrice;
      }
      var average1 = sum1 / nCircles[0];
      m_pResultData.m_iLine1[nIndex] = (lData[i].ClosePrice - average1) * 100 * nMultiples / average1;
    }
    // BIAS 12
    if (i < nCircles[1]) {
      m_pResultData.m_iLine2[nIndex] = 0x00000000;
    }
    else {
      sum2 = sum1;
      for (var j = 0; j < nCircles[1] - nCircles[0]; j++) {
        sum2 += lData[i - j - nCircles[0]].ClosePrice;
      }
      var average2 = sum2 / nCircles[1];
      m_pResultData.m_iLine2[nIndex] = (lData[i].ClosePrice - average2) * 100 * nMultiples / average2;
    }
    // BIAS 24
    if (i < nCircles[2]) {
      m_pResultData.m_iLine3[nIndex] = 0x00000000;
    }
    else {
      sum3 = sum2;
      for (var j = 0; j < nCircles[2] - nCircles[1]; j++) {
        sum3 += lData[i - j - nCircles[1]].ClosePrice;
      }
      var average3 = sum3 / nCircles[2];
      m_pResultData.m_iLine3[nIndex] = (lData[i].ClosePrice - average3) * 100 * nMultiples / average3;
    }
    nIndex++;
  }
  return m_pResultData;
}

export default {
  chengjiaol_average_canvas:chengjiaol_average_canvas,
  chengjiaol:chengjiaol,
  chengjiaol_canvas:chengjiaol_canvas,
  DrawText:DrawText,
  DrawIndicateLine:DrawIndicateLine,
  DrawMACD:DrawMACD,
  DrawBOLL:DrawBOLL,
  CalculatMACD:CalculatMACD,
  CalculatKDJ:CalculatKDJ,
  CalculatRSI:CalculatRSI,
  CalculatBIAS:CalculatBIAS,
  CalculatWR:CalculatWR,
  CalculatPSY:CalculatPSY,
  CalculatBOLL:CalculatBOLL,
  CalculatCCI:CalculatCCI,
  CalculatROC:CalculatROC,
  CalculatDMI:CalculatDMI,
  CalculatDMA:CalculatDMA,
  CalculatTRIX:CalculatTRIX,
  CalculatBRAR:CalculatBRAR,
  CalculatVR:CalculatVR,
  CalculatOBV:CalculatOBV,
  CalculatASI:CalculatASI,
  CalculatEMV:CalculatEMV,
  CalculatWVAD:CalculatWVAD
}