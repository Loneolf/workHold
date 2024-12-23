<template>
    <div class="swipes" style="width: 100%;">
        <time></time>
    </div>
</template>

<script>
    import time from '../../ons/canvas/gegutimeNew'
    import service_hq_often from '../../service/common/service_hq_often'
    import tztStockType from '../../scripts/tztStockType.js'
    import util from '../../../../util/util.js';

    export default {
        data() {
            return {
                HKMinData: {},
                WTHead: {},
                stockcode: '',
                NEWMARKETNO: '',
                Last_h: '-.-',
                m_lAvgPrice: '-.-',
                Last_p: '-.-',
                Close_p: '-.-',
                times: '-.-',
                total_h: '-.-',
                m_lUpPrice: '-.-',
                m_lUpIndex: '-.-',
                m_lx: '-.-',
                old_lx: '-.-',
                isshow: false,
                isZS: true,
                zsname: '领先',
                bIndex: true
            }
        },
        attached() {
            console.log('min');
            this.HKMinData = {};
            this.WTHead = {};
            this.Last_h = '-.-';
            this.m_lAvgPrice = '-.-';
            this.Last_p = '-.-';
            this.Close_p = '-.-';
            this.times = '-.-';
            this.total_h = '-.-';
            this.m_lUpPrice = '-.-';
            this.m_lUpIndex = '-.-';
            this.m_lx = '-.-';
            this.old_lx = '-.-';
            this.isshow = false;
            this.NEWMARKETNO = this.$route.query.marketno;
            this.stockcode = this.$route.query.stockcode;
            if (tztStockType.MakeHSMarket(this.NEWMARKETNO)) {
                this.bIndex = true;
                this.isZS = tztStockType.MakeIndexMarket(this.NEWMARKETNO);
                if (this.isZS) {
                    if (this.stockcode == '1A0001' || this.stockcode == '2A01') {
                        this.zsname = '领先';
                    } else {
                        this.zsname = '最新';
                    }
                }
            } else {
                this.bIndex = false;
            }
            // this.$dispatch('child-min');
//    this.queryHKMinDataTime();
        },
        methods: {
            queryHKMinDataTime() {
                var that = this;
                that.stockcode = that.$route.query.stockcode;
                var oSendData = {
                    stockcode: that.stockcode,
                    Level: '2',
                    startPos: '0',
                    NewMarketNo: '0'
                };
                service_hq_often.require20109(oSendData)
                    .then((data) => {
                        var oData = {
                            BINHead: data.BINHead,
                            TIMEHead: data.TIMEHead,
                            AMOUNT: data.AMOUNT,
                            MAXCOUNT: data.MAXCOUNT,
                            BEGINDATE: data.BEGINDATE,
                            ENDDATE: data.ENDDATE,
                            ERRORNO: data.ERRORNO
                        };
                        that.Last_h = data.BINHead.Last_h;
                        that.Close_p = data.BINHead.close_p;
                        that.m_lAvgPrice = data.WTHead.m_lAvgPrice;
                        if (data.TIMEHead.struct[data.ERRORNO - 1]) {
                            if (that.zsname == '最新') {
                                that.old_lx = that.m_lx = data.WTHead.Last_p;
                            } else {
                                that.old_lx = that.m_lx = data.TIMEHead.struct[data.ERRORNO - 1]['averprice'];
                            }
                        }
                        that.NEWMARKETNO = data.NEWMARKETNO;
                        that.$route.router.app.title = data.BINHead.StockName;
                        that.$route.router.app.barstockcode = that.stockcode;
                        that.$set('HKMinData', oData);
                        that.$set('WTHead', data.WTHead);
                        that.notify();
                    });
            },
            //分时组件
            notify() {
                this.$broadcast('parent-chartMindata', this.HKMinData);
//      this.$dispatch('child-min', this.WTHead,this.NEWMARKETNO);
            }
        },
        events: {
            'child-index': function (index, times, isshow) {
                if (isshow) {
                    if (this.HKMinData.TIMEHead && this.HKMinData.TIMEHead.struct[index]) {
                        this.Last_p = this.HKMinData.TIMEHead.struct[index]['Last_p'];
                        if (this.isZS) {
                            if (this.zsname == '最新') {
                                this.m_lx = this.Last_p;
                            } else {
                                this.m_lx = this.HKMinData.TIMEHead.struct[index]['averprice'];
                            }

                        } else {
                            this.m_lAvgPrice = this.HKMinData.TIMEHead.struct[index]['averprice'];
                        }

                        this.total_h = util.numTosize(this.HKMinData.TIMEHead.struct[index]['total_h']);
                        this.m_lUpPrice = this.HKMinData.TIMEHead.struct[index]['m_lUpPrice'];
                        this.m_lUpIndex = this.HKMinData.TIMEHead.struct[index]['m_lUpIndex'];
                    }
                    this.times = times;
                    this.isshow = true;
                } else {
                    if (this.WTHead) {
                        if (this.isZS) {
                            if (this.zsname == '最新') {
                                this.m_lx = this.WTHead.Last_p;
                            } else {
                                this.m_lx = this.old_lx;
                            }
                        } else {
                            this.m_lAvgPrice = this.WTHead.m_lAvgPrice;
                        }
                    }
                    this.isshow = false;
                }
            },
            getHKTime(data) {
                var that = this;
                if (data) {
                    that.Last_h = data.BINHead.Last_h;
                    that.Close_p = data.BINHead.close_p;
                    that.m_lAvgPrice = data.WTHead.m_lAvgPrice;
                    if (data.TIMEHead.struct[data.ERRORNO - 1]) {
                        if (that.zsname == '最新') {
                            that.old_lx = that.m_lx = data.WTHead.Last_p;
                        } else {
                            that.old_lx = that.m_lx = data.TIMEHead.struct[data.ERRORNO - 1]['averprice'];
                        }
                    }
                    that.$set('HKMinData', data);
                    that.$set('WTHead', data.WTHead);
                }else {
                    that.$set('HKMinData', '');
                    that.$set('WTHead', '');
                }
                that.notify();
            }
        },
        components: {
            time
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/less/variables.less';
    @import "../../../../assets/less/mixins.less";

    .h5_difference_time {
        width: 100%;
        height: 100%;
    }

    .h5_difference_time canvas {
        width: 100%;
        height: 100%;
    }

    .time-text {
        font-size: 0.6rem;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 0.5rem;
        line-height: 0.8rem;
        span {
            display: inline-block;
            width: 2rem;
            margin-left: 0.3rem;
        }
        .lx {
            color: @color-warning;
        }
    }

    .time-title {
        font-size: 0.6rem;
        position: absolute;
        top: -2rem;
        left: 0;
        width: 100%;
        background: @color-text;
        height: 2rem;
        white-space: nowrap;
        word-break: break-all;
        line-height: 2rem;
        span {
            margin-left: 0.3rem;
        }
        .rise {
            color: @color-rise;
        }
        .fill {
            color: @color-fill;
        }
    }

    .swipes {
        position: relative;
        height: 100%;
    }
</style>

