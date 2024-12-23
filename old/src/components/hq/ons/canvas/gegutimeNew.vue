<template>
    <div class="chart-wrapper" style="height: 100%;">
        <div class="h5_difference_time" style="height: 100%;">
            <div style="position: relative; font-size: 0px;" id="component">
                <canvas style="z-index: 1;" id="cns" style="min-height: 8rem;"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
    import util from "../../../../util/util";
    /*
    * @返回BEGINDATE的时间差
    * return hs0,hs1*/
    function getTime_c(BEGINDATE) {
        var timeArray = BEGINDATE.slice(0, -1).split('|');
        var timeObj = {};
        for (var t = 0; t < timeArray.length; t++) {
            var old = timeArray[t].split(':');
            timeObj['hs' + t] = new Date('1970', '1', '2', old[0], old[1], '0').getTime();
        }
        if (timeArray.length > 4) {
            timeObj['hs3'] = timeObj['hs' + (timeArray.length - 1)]
        }
        return timeObj;
    }

    export default {
        ready() {
            var Dom = $(this.$el).find('.h5_difference_time');
            this.cfg1.width = (Dom.width()) * 2;
            this.cfg1.height = (Dom.height()) * 2;
            this.cfg1.cns = $(this.$el).find('#cns')[0];
            this.H5Difference1(this.cfg1);
            /*var s1 = H5Difference(this.cfg1);
            $('.h5_difference').html(s1);*/
        },
        data() {
            return {
                cfg1: {
                    width: 0,
                    height: 0,
                    data: {}
                },
                difference: '',
                MAXCOUNTS: 0
            }
        },
        events: {
            'parent-chartMindata': function (chartdata) {
//          console.log(chartdata);
                var Dom = $(this.$el).find('.h5_difference_time');
                this.cfg1.width = (Dom.width()) * 2;
                this.cfg1.height = (Dom.height()) * 2;
                this.cfg1.cns = $(this.$el).find('#cns')[0];
                if (chartdata && chartdata.BINHead) {
                    this.cfg1.data = chartdata;
                    this.cfg1.component = $(this.$el).find('#component');
                    this.MAXCOUNTS = 0;
                    this.H5Difference(this.cfg1);
                } else {
                    // var cns = this.cfg1.cns;
                    // var ctx = cns.getContext('2d');
                    // ctx.clearRect(0, 0, this.cfg1.width, this.cfg1.height);
                    this.H5Difference1(this.cfg1);
                }
            }
        },
        methods: {
            H5Difference(cfg) {
                var that = this;
                //  绘制网格线 - 背景层
                // 宽高都是放大后的数据，在移动端缩小之后会更清晰
                var w = cfg.width;
                var h = cfg.height;
                var b = 32;//留23像素写时间位置
                var color_b = '#F5F6F9';
                var color_line = '#448CFC';
                var c_average = '#EBA840';
                var time_h = h - b; //画图高度
                var TYPE = (cfg.data.TYPE ? cfg.data.TYPE : 'min');
                var step = TYPE == 'five' ? 5 : 4;
                var min_h = time_h / 6 * 4;
                var min_h = huoqugaodui(3);
                var total_h = time_h - min_h;
                var ERRORNO = cfg.data.ERRORNO;
                var totalSize = cfg.data.BINHead.total_size
                //最大差值
                var maxRose_val = Math.max.apply({}, [Math.abs(cfg.data.BINHead.close_p - cfg.data.BINHead.max_p), Math.abs(cfg.data.BINHead.close_p - cfg.data.BINHead.Consult)]);
                //界面上最大涨幅的值
                var maxVal = parseFloat(cfg.data.BINHead.close_p) + parseFloat(maxRose_val);
                var maxRose = maxRose_val / cfg.data.BINHead.close_p * 100;
                //界面上最小跌幅的值
                var min = parseFloat(cfg.data.BINHead.close_p) - parseFloat(maxRose_val);
                var minRose = maxRose * (-1);
                var timeObj = getTime_c(cfg.data.BEGINDATE);
                if (!timeObj.hs3) {
                    timeObj.hs3 = 0;
                }
                if (!timeObj.hs2) {
                    timeObj.hs2 = 0;
                }
                var MAXCOUNTS = ((timeObj.hs1 - timeObj.hs0) / (60 * 1000)) + ((timeObj.hs3 - timeObj.hs2) / (60 * 1000)) + 1;
                if (timeObj.hs4 && timeObj.hs5) {
                    MAXCOUNTS = MAXCOUNTS - 5;
                }
                if (TYPE === 'five') {
                    MAXCOUNTS = MAXCOUNTS * 5;
                }
                if (MAXCOUNTS < 0) {
                    MAXCOUNTS = MAXCOUNTS * -1;
                }

                that.MAXCOUNTS = MAXCOUNTS;
//  console.log(maxVal,min,maxRose,minRose);
                //分时坐标位置
                function coordinate(p) {
                    return parseFloat(maxRose_val) ? min_h / (maxRose_val * 2) * (maxVal - p) : min_h / 2;
                }

                //量坐标
                function coortotal(p) {
                    return total_h - (total_h / cfg.data.TIMEHead.total_max * p) + min_h;
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

                function huoqugaodui(step) {
                    var y = 0;
                    for (var i = 1; i < step; i++) {
                        var h = time_h / step;
                        if (i < 5) {
                            h = h * 1.1;
                        } else {
                            h = h * 0.8;
                        }
                        y += h;
                    }
                    return y;
                }

                function transverse() {
                    ctx.beginPath();
                    ctx.strokeStyle = color_b;
                    ctx.lineWidth = 1;
                    step = 6;
                    var y = 0;
                    for (var i = 1; i < step; i++) {
                        var h = time_h / step;
                        if (i < 5) {
                            h = h * 1.1;
                        } else {
                            h = h * 0.8;
                        }
                        y += h;
                        // if (i % 2 === 1) {
                        //     ctx.dashedLineTo(0, y, w, y);
                        //     continue;
                        // }
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
                    if (cfg.data.BEGINDATE && TYPE == 'min') {
                        var timeArray = cfg.data.BEGINDATE.slice(0, -1).split('|');
                        if(timeArray.length == 6) {
                            for (var i = 1; i < 265; i++) {
                                if(i % 60 == 59){
                                    var x = (w / 265) * i;
                                    ctx.beginPath();
                                    ctx.moveTo(x, 0);
                                    ctx.lineTo(x, time_h);
                                    ctx.stroke();
                                }
                            }
                            ctx.stroke();
                            return;
                        }
                    }

                    for (var i = 1; i < step; i++) {
                        var x = (w / step) * i;
                        // if (i % 2) {
                        //     ctx.dashedLineTo(x, 0, x, time_h);
                        //     continue;
                        // }
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
                    ctx.lineWidth = 2;

                    cfg.data.TIMEHead.struct.forEach((item, index) => {
                        if (index < ERRORNO - 0) {
                            let y = coordinate(item.Last_p);
                            let x = w / that.MAXCOUNTS * index;
                            if (index == 0) {
                                ctx.moveTo(x, y);
                            } else {
                                ctx.lineTo(x, y);
                            }
                        }
                    });
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle = 'transparent';
                    ctx.lineWidth = 2;
                    cfg.data.TIMEHead.struct.forEach((item, index) => {
                        if (index < ERRORNO - 0) {
                            let y = coordinate(item.Last_p);
                            let x = w / that.MAXCOUNTS * index;
                            if (index == 0) {
                                ctx.moveTo(x, y);
                            } else {
                                ctx.lineTo(x, y);
                            }
                            // console.log(index);
                            if (index === ERRORNO - 1) {
                                ctx.lineTo(x, min_h);
                                ctx.lineTo(0, min_h);
                                ctx.closePath();
                                var gradient = ctx.createLinearGradient(0,0,0,min_h);
                                gradient.addColorStop(0, "rgba(6,77,221,0.08)");
                                gradient.addColorStop(0.24, "rgba(6,77,221,0.08)");
                                gradient.addColorStop(1, "rgba(255,255,255,0.00)");
                                ctx.fillStyle = gradient;
                                ctx.fill();
                            }
                        }
                    });
                }

                function average_canvas() {
                    //画均线
                    ctx.beginPath();
                    ctx.strokeStyle = c_average;
                    ctx.lineWidth = 2;
                    cfg.data.TIMEHead.struct.forEach((item, index) => {
                        if (index < ERRORNO - 0) {
                            let y = coordinate(item.averprice);
                            let x = w / that.MAXCOUNTS * index;
                            if (index == 0) {
                                ctx.moveTo(x, y);
                            } else {
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
                    ctx.fillStyle = "#E83333"; //"#000000" "#32a632"
                    ctx.textAlign = "left";
                    ctx.fillText(maxVal.toFixed(cfg.data.BINHead.total_size), 10, 20);
                    ctx.textAlign = "right";
                    if(!isNaN(maxRose)){
                        ctx.fillText(maxRose.toFixed(2) + '%', w - 10, 20);
                    }
                    else{
                        ctx.fillText('--', w - 10, 20);
                    }

                    ctx.fillStyle = "#6D7A85"; //"#000000" "#32a632"
                    ctx.textAlign = "left";
                    ctx.fillText(cfg.data.BINHead.close_p, 10, min_h / 2 + 10);

                    ctx.fillStyle = "#169665"; //"#000000" "#32a632"
                    ctx.textAlign = "left";
                    ctx.fillText(min.toFixed(totalSize), 10, min_h - 5);
                    ctx.textAlign = "right";
                    if(!isNaN(minRose)){
                        ctx.fillText(minRose.toFixed(cfg.data.BINHead.total_size) + '%', w - 10, min_h - 5);
                    }
                    else{
                        ctx.fillText('--', w - 10, min_h - 5);
                    }
                }

                //成交量
                function volume_canvas() {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    cfg.data.TIMEHead.struct.forEach((item, index) => {
                        let y = coortotal(item.total_h);
                        let x = w / that.MAXCOUNTS * index;
                        var color = '#E83333';
                        if (index > 0) {
                            if (parseFloat(cfg.data.TIMEHead.struct[index - 1]['Last_p']) > parseFloat(item.Last_p)) {
                                color = '#169665'
                            } else if (parseFloat(cfg.data.TIMEHead.struct[index - 1]['Last_p']) == parseFloat(item.Last_p)) {
                                color = '#AAAAAA'
                            }
                        }
                        ctx.beginPath();
                        ctx.strokeStyle = color;
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, time_h);
                        ctx.stroke();
                    });
                    //成交量显示
                    ctx.fillStyle = "#6D7A85";
                    ctx.textAlign = "right";
                    ctx.fillText(util.numTosize2(cfg.data.TIMEHead.total_max.toFixed(0)), w - 10, min_h + 20);
                    ctx.textAlign = "right";
                    // ctx.fillText((cfg.data.TIMEHead.total_max / 2).toFixed(0), 0, time_h / 6 * 5 + 10);
                    ctx.fillText(util.numTosize2((cfg.data.TIMEHead.total_max / 2).toFixed(0)), w - 10, huoqugaodui(5) + 10);
                    ctx.font = "20px Helvetica";
                    ctx.fillStyle = "#6D7A85";
                    ctx.textAlign = "left";
                    ctx.fillText('量', 10, min_h + 22);
                    ctx.fillStyle = "#EBA840";
                    ctx.textAlign = "left";
                    ctx.fillText(util.numTosize2(cfg.data.TIMEHead.total[ERRORNO - 1]), 38, min_h + 22);
                    if(isGgqqStockType(cfg.data.NEWMARKETNO) || isSanBanStockType(cfg.data.NEWMARKETNO) || isHKStockType(cfg.data.NEWMARKETNO) || isQuoted5StockType(cfg.data.NEWMARKETNO)){
                        ctx.fillStyle = "#6D7A85";
                        ctx.textAlign = "left";
                        ctx.fillText('额', 58 + ctx.measureText(util.numTosize2(cfg.data.TIMEHead.total[ERRORNO - 1])).width, min_h + 22);
                        ctx.fillStyle = "#EBA840";
                        ctx.textAlign = "left";
                        ctx.fillText(util.numTosize2(cfg.data.BUYSELL[ERRORNO - 1].s), 66 + ctx.measureText('额' + util.numTosize2(cfg.data.TIMEHead.total[ERRORNO - 1])).width, min_h + 22);
                    }

                    /**
                     * 1、个股期权类型的股票需要显示买卖栏
                     */
                    function isGgqqStockType(stockType) {
                        try {
                            switch(stockType){
                                case 0x6100: //期权-上证证券
                                case 0x6200: //期权-深证证券
                                    return true;
                                default:
                                    return false;
                            }
                        } catch (e) {
                            return false;
                        }
                    }
                    /**
                     * 2、新三板类型的股票需要显示买卖栏
                     */
                    function isSanBanStockType(stockType) {
                        try {
                            switch(stockType){
                                case 37 : // 深三板37
                                case 26 : // 沪三板26
                                case 42 : // 深三板42,(深证)创业板42
                                case 0x1105 : // 沪三板26
                                case 0x1205 : // 深三板42,(深证)创业板42
                                case 0x120A : // 深三板37
                                    return true;
                                default:
                                    return false;
                            }
                        } catch (e) {
                            return false;
                        }
                    }
                    /**
                     * 3、港股类型的股票需要显示买卖栏（不包含港股指数）
                     */
                    function isHKStockType(stockType) {
                        try {
                            if(stockType >= 0x1000){
                                stockType = stockType & 0xFF00;
                            }
                            switch(stockType){
                                case 110://债券
                                case 111://创业板
                                case 112://港股-指数（所有）
                                case 0x2300://港股-指数（所有）
                                case 0x2100://债券
                                case 0x2200://创业板
                                    return true;
                                default:
                                    stockType = stockType & 0xF000;
                                    if(stockType == 0x2000){
                                        return true;
                                    }  
                                    else{
                                        return false;
                                    }                                  
                            }
                        } catch (e) {
                            return false;
                        }
                    }
                    /**
                     * 4、沪深股票需要显示买卖栏（如果是上海市场或者是深证市场或者是沪B转H、深B转H、北证债券就显示买卖栏）
                     * （1）上海市场类型判断，stockType >= 0x1101 && stockType <= 0x110F，当16进制的市场号范围在0x1101到0x110F范围内的时候就属于上海市场类型
                     * （2）深证市场类型判断，stockType >= 0x1201 && stockType <= 0x120F，当16进制的市场号范围在0x1201到0x120F范围内的时候就属于上海市场类型
                     * （3）其他三种类型（沪B转H、深B转H、北证债券）的股票也需要显示买卖栏，16进制市场代码分别是：0x4680://沪B转H，0x4681://深B转H，0x1403://北证债券
                     */
                    function isQuoted5StockType(stockType) {
                        try {
                            switch(stockType){
                                case 17 : // 上证A股17,
                                case 18 : // 上证B股18
                                case 19 : // 上证债券19
                                case 21 : // 沪权证21
                                case 22 : // 沪中小盘股22
                                case 23 : // 沪开放式基金23
                                case 27 : // 沪退市整理板
                                case 33 : // 深证A股33
                                case 34 : // 深证B股34
                                case 35 : // 深证债券35
                                case 37 : // 深三板37
                                case 38 : // 深中小板38
                                case 39 : // 深开放式基金39
                                case 26 : // 沪三板26
                                case 42 : // 深三板42,(深证)创业板42
                                case 43 : // 深退市整理板
                                case 41 : // 深ETF
                                case 25 : // 上证ETF
                                case 40 : // 深LOF
                                case 24 : // 上证LOF
                                    return true;
                                default:
                                    if(stockType >= 0x1000){
                                        if(stockType >= 0x1101 && stockType <= 0x110F || stockType >= 0x1201 && stockType <= 0x120F || isJingShiStockType(""+stockType))
                                            return true;
                                        else{
                                            stockType = stockType & 0xFFFF;
                                            switch(stockType){
                                                case 0x4680://沪B转H
                                                case 0x4681://深B转H
                                                case 0x1207://新三板债券
                                                case 0x1403://北证债券
                                                    return true;
                                                default:
                                                    return false;
                                            }
                                        }
                                    }
                                    return false;
                            }
                        } catch (e) {
                            return false;
                        }
                    }
                    /**
                     * 5、京市股票需要显示买卖栏
                     * 如果是京市市场类型也是需要显示买卖栏，目前只加了北证A股显示买卖栏的判断，北证A股市场代码，十进制5121，十六进制0x1401
                     */
                    function isJingShiStockType(stockType) {
                        return stockType == "5121";
                    }
                }

                //
                function date_canvas() {
                    //时间或者日期
                    ctx.fillStyle = "#6D7A85";
                    if (cfg.data.BEGINDATE && TYPE == 'min') {
                        var timeArray = cfg.data.BEGINDATE.slice(0, -1).split('|');
                        for (var i = 0; i < timeArray.length; i++) {
                            if (timeArray[i] === '') {
                                continue;
                            }
                            if (i == 0) {
                                ctx.textAlign = "left";
                                ctx.fillText(timeArray[i], 10, h - 3);
                            }
                            if (i == 1 && timeArray.length == 6) {
                                ctx.textAlign = "right";
                                ctx.fillText(timeArray[i] + '/', w * 119 / 265, h - 3);
                            }
                            if (i == 1 && timeArray.length == 4) {
                                ctx.textAlign = "right";
                                ctx.fillText(timeArray[i] + '/', w / 2, h - 3);
                            }
                            if (i == 1 && timeArray.length == 2) {
                                ctx.textAlign = "right";
                                ctx.fillText(timeArray[i], w - 10, h - 3);
                            }
                            if (i == 2) {
                                ctx.textAlign = "left";
                                if(timeArray.length == 6){
                                    ctx.fillText(timeArray[i], w * 119 / 265, h - 3);
                                }
                                else{
                                    ctx.fillText(timeArray[i], w / 2, h - 3);
                                }
                            }
                            if (timeArray.length > 4) {
                                if (i == 3) {
                                    ctx.textAlign = "right";
                                    ctx.fillText(timeArray[i], w * 239 / 265, h - 3);
                                }
                                if (i == timeArray.length - 1) {
                                    ctx.textAlign = "right";
                                    ctx.fillText(timeArray[i], w - 10, h - 3);
                                }
                            }else {
                                if (i == 3) {
                                    ctx.textAlign = "right";
                                    ctx.fillText(timeArray[i], w - 10, h - 3);
                                }
                            }
                        }
                    }
                    if (cfg.data.ENDDATE && TYPE == 'five') {
                        var endDate = cfg.data.ENDDATE.slice(0, -1).split('|');
                        var wDate = w / 5;
                        endDate.forEach((item, index) => {
                            ctx.textAlign = "center";
                            ctx.fillText(item, (wDate * index + (wDate / 2)), h - 3);
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
                //边框
                border_canvas();
                //垂直网格
                vertical();
                // 水平网格线
                transverse();
                //均线
                average_canvas();
                //分时线
                time_canvas();
                

                text_canvas();
                //成交量
                volume_canvas();
//    ctx.textAlign = "right";

                //画成交量

                //时间
                date_canvas();
            },
            H5Difference1(cfg) {
                //  绘制网格线 - 背景层
                // 宽高都是放大后的数据，在移动端缩小之后会更清晰
                var w = cfg.width;
                var h = cfg.height;
                var b = 32;//留23像素写时间位置
                var color_b = '#F5F6F9';
                var time_h = h - b; //画图高度
                var step = 4;

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
                        // if (i % 2 === 1) {
                        //     ctx.dashedLineTo(0, y, w, y);
                        //     continue;
                        // }
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
                        // if (i % 2) {
                        //     ctx.dashedLineTo(x, 0, x, time_h);
                        //     continue;
                        // }
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, time_h);
                        ctx.stroke();
                    }
                    ctx.stroke();
                }


                //  加入一个画布（网格线背景）
                var cns = cfg.cns;
                var ctx = cns.getContext('2d');
                cns.width = ctx.width = w;
                cns.height = ctx.height = h;
                ctx.clearRect(0, 0, w, h);
                //新建画布上一层
                //边框
                border_canvas();
                //垂直网格
                vertical();
                // 水平网格线
                transverse();
            }

        }
    }
</script>

<style lang="less" scoped>
    .h5_difference_time canvas {
        width: 100%;
        height: 100%;
        // max-height: 10.25rem;
        // min-height: 8rem;
    }

    .h5_difference_time .h5_difference_date {
        position: absolute;
        bottom: -27px;
        width: 100%;
        left: 0;
        font-size: 14px;

        span {
            width: 16.5%;
            display: inline-block;
            text-align: center;
        }

        .left {
            text-align: left;
        }
    }
</style>
