<template>
    <div class="h5_difference_time">
        <div style="position: relative; font-size: 0px;" id="component">
            <canvas style="z-index: 1;" id="cns" style="min-height: 8rem;"></canvas>
        </div>
    </div>
</template>
<script>
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
            var Dom = $('.swipes');
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
                var Dom = $('.swipes');
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
                var b = 20;//留20像素写时间位置
                var color_b = '#e7e7e7';
                var color_line = '#498eff';
                var c_average = '#ff7007';
                var time_h = h - b; //画图高度
                var TYPE = (cfg.data.TYPE ? cfg.data.TYPE : 'min');
                var step = TYPE == 'five' ? 5 : 4;
                var min_h = time_h / 6 * 4;
                var min_h = huoqugaodui(3);
                var total_h = time_h - min_h;
                var ERRORNO = cfg.data.ERRORNO;
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
                    return min_h / (maxRose_val * 2) * (maxVal - p);
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
                    ctx.lineWidth = 1;

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
                    ctx.lineWidth = 1;
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
                                ctx.fillStyle = 'rgba(73,142,225,0.1)';
                                ctx.fill();
                            }
                        }
                    });
                }

                function average_canvas() {
                    //画均线
                    ctx.beginPath();
                    ctx.strokeStyle = c_average;
                    ctx.lineWidth = 1;
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
                    ctx.fillStyle = "#ff4343"; //"#000000" "#32a632"
                    ctx.textAlign = "left";
                    ctx.fillText(maxVal.toFixed(2), 0, 20);
                    ctx.textAlign = "right";
                    ctx.fillText(maxRose.toFixed(2) + '%', w, 20);


                    ctx.fillStyle = "#000000"; //"#000000" "#32a632"
                    ctx.textAlign = "left";
                    ctx.fillText(cfg.data.BINHead.close_p, 0, min_h / 2 + 10);

                    ctx.fillStyle = "#01ac65"; //"#000000" "#32a632"
                    ctx.textAlign = "left";
                    ctx.fillText(min.toFixed(2), 0, min_h - 5);
                    ctx.textAlign = "right";
                    ctx.fillText(minRose.toFixed(2) + '%', w, min_h - 5);
                }

                //成交量
                function volume_canvas() {
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    cfg.data.TIMEHead.struct.forEach((item, index) => {
                        let y = coortotal(item.total_h);
                        let x = w / that.MAXCOUNTS * index;
                        var color = '#ff4343';
                        if (index > 0) {
                            if (parseFloat(cfg.data.TIMEHead.struct[index - 1]['Last_p']) > parseFloat(item.Last_p)) {
                                color = '#01ac65'
                            } else if (parseFloat(cfg.data.TIMEHead.struct[index - 1])['Last_p'] == parseFloat(item.Last_p)) {
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
                    ctx.fillText(cfg.data.TIMEHead.total_max.toFixed(0), 0, min_h + 20);
                    ctx.textAlign = "left";
                    // ctx.fillText((cfg.data.TIMEHead.total_max / 2).toFixed(0), 0, time_h / 6 * 5 + 10);
                    ctx.fillText((cfg.data.TIMEHead.total_max / 2).toFixed(0), 0, huoqugaodui(5) + 10);
                }

                //
                function date_canvas() {
                    //时间或者日期
                    ctx.fillStyle = "#000000";
                    if (cfg.data.BEGINDATE && TYPE == 'min') {
                        var timeArray = cfg.data.BEGINDATE.slice(0, -1).split('|');
                        for (var i = 0; i < timeArray.length; i++) {
                            if (timeArray[i] === '') {
                                continue;
                            }
                            if (i == 0) {
                                ctx.textAlign = "left";
                                ctx.fillText(timeArray[i], 0, h);
                            }
                            if (i == 1 && timeArray.length == 4) {
                                ctx.textAlign = "right";
                                ctx.fillText(timeArray[i] + '/', w / 2, h);
                            }
                            if (i == 1 && timeArray.length == 2) {
                                ctx.textAlign = "right";
                                ctx.fillText(timeArray[i], w, h);
                            }
                            if (i == 2) {
                                ctx.textAlign = "left";
                                ctx.fillText(timeArray[i], w / 2, h);
                            }
                            if (timeArray.length > 4) {
                                if (i == timeArray.length - 1) {
                                    ctx.textAlign = "right";
                                    ctx.fillText(timeArray[i], w, h);
                                }
                            }else {
                                if (i == 3) {
                                    ctx.textAlign = "right";
                                    ctx.fillText(timeArray[i], w, h);
                                }
                            }
                        }
                    }
                    if (cfg.data.ENDDATE && TYPE == 'five') {
                        var endDate = cfg.data.ENDDATE.slice(0, -1).split('|');
                        var wDate = w / 5;
                        endDate.forEach((item, index) => {
                            ctx.textAlign = "center";
                            ctx.fillText(item, (wDate * index + (wDate / 2)), h);
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
            },
            H5Difference1(cfg) {
                //  绘制网格线 - 背景层
                // 宽高都是放大后的数据，在移动端缩小之后会更清晰
                var w = cfg.width;
                var h = cfg.height;
                var b = 20;//留20像素写时间位置
                var color_b = '#e7e7e7';
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
        min-height: 8rem;
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
