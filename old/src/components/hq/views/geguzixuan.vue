<template>
    <div v-if="noDate" class="noData">
        <p class="img"></p>
        <span class="block">暂无自选</span>
    </div>
    <div v-else class="content">
        <dl class="title">
            <dt><span>名称/代码</span></dt>
            <dd><span>当前价</span></dd>
            <dd><span>涨跌幅</span></dd>
        </dl>
        <div class="fund_table">
            <dl class="part" v-for="items in GRID" @click="trade(items.STOCKCODEINDEX)">
                <dt><strong>{{items.STOCKNAMEINDEX}}</strong>
                    <small>{{items.STOCKCODEINDEX}}
                        <em v-if="items.SBGP" class="SBGP"></em>
                        <em v-if="items.BJ" class="BJA"></em>
                        <em v-if="items.SBLW" class="SBLW"></em>
                        <em v-if="items.SBXQ" class="SBXQ"></em>
                        <em v-if="items.SBXZ" class="SBXZ"></em>
                        <em v-if="items.ISH" class="ISH"></em>
                        <em v-if="items.ISZ" class="ISZ"></em>
                        <em v-if="items.RZRQ" class="RZRQ"></em>
                        <em v-if="items.Tong" class="Tong"></em>
                        <em v-if="items.FXJS" class="FXJS"></em>
                        <em v-if="items.TSZL" class="TSZL"></em>
                        <em v-if="items.KCB" class="KCB"></em>
                        <em v-if="items.CDR" class="CDR"></em>
                    </small>
                </dt>
                <dd class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</dd>
                <dd class="block_color"><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
            </dl>
        </div>
    </div>
</template>

<script>
    //head
    import xhr from '../../../services/xhr/'
    import service_hq_often from '../service/common/service_hq_often'
    import tztStockType from '../scripts/tztStockType'
    import localService from '../../../services/localService'

    export default {
        props: ['action'],
        data() {
            return {
                token: '',
                ziXuanGuList: [],
                Direction: "1",
                AccountIndex: '9',
                noDate: false,
                GRID: [],
                sZiXuanGuList: '',
            }
        },

        attached() {
            $.showPreloader();
            this.getZXG(this.getZXList);
        },
        methods: {
            trade(stock) {
                if (!stock || stock === '1A0001' || stock === '2A01') {
                    return false;
                }
                if (stock.length === 5) {
                    stock = 'H' + stock;
                }
                this.$TZT.tradeaction({action: this.action, stockcode: stock}, this);
            },
            getZXG(fn) {
                var that = this;
                var oSendData = ['selfstocklist'];
                localService.readLocalMesg(oSendData)
                    .then((data) => {
                        var SELF = data.SELFSTOCKLIST || data.selfstocklist;
                        var codelist = [];
                        if (SELF) {
                            var aGrid = SELF.split(','),
                                ln = aGrid.length;
                            for (var i = 0; i < ln; i++) {
                                if (aGrid[i]) {
                                    var aData = aGrid[i].split('|');
                                    if (aData[0] == '' && aData[1] == '') {
                                        continue;
                                    }
                                    codelist.push(aData[0] + '|' + aData[1]);
                                }
                            }
                        }
                        // codelist.push('600000');
                        that.sZiXuanGuList = codelist.join(',');
                        if (that.sZiXuanGuList) {
                            that.noDate = false;
                            fn && fn();
                        } else {
                            that.noDate = true;
                        }
                    });
            },
            getZXList() {
                var list = this.sZiXuanGuList.split(',');
                var ln = list.length;
                var grid = [];
                for (var i = 0; i < ln; i++) {
                    var arrayList = list[i].split('|');
                    if (arrayList[0] == '' && arrayList[1] == '' && arrayList[2] == '') {
                        continue;
                    }
                    grid.push(arrayList.slice(0, 2).join('|'));
                }
                if (grid.length == 0) {
                    this.$set('GRID', []);
                    return false;
                }
                var obj = {
                    Grid: grid.join(','),
                    Direction: this.Direction,//0升序1降序
                    DeviceType: 0,
                    AccountIndex: this.AccountIndex,
                    StockIndex: 1,
                    StartPos: 0,
                    NewMarketNo: 0,
                    MaxCount: ln
                };
                var that = this;
                service_hq_often.require60(obj).then((data) => {
                    $.hidePreloader();
                    if (!data.GRID0) {
                        return;
                    }
                    console.log(tztStockType.MakeBlockIndex("4609"))
                    let indexData = [];
                    var newData = data.GRID0;
                    var shic = data.NEWMARKETNO;
                    var shicArr = shic.split("|");
                    var STOCKPROP = (data.STOCKPROP ? data.STOCKPROP.split('|') : []);
                    var NEWMARKETNO = data.NEWMARKETNO.split('|');
                    newData.shift();
                    console.log(shicArr);
                    var nsStock = '', nsKCB = '';
                    newData.forEach((items, index) => {
                        let listData = items.slice(0, -1).split('|');
                        let stockArray = {};
                        stockArray.STOCKCODEINDEX = listData[data.STOCKCODEINDEX];
                        stockArray.NEWPRICEINDEX = listData[data.NEWPRICEINDEX];
                        stockArray.UPDOWNPINDEX = listData[data.UPDOWNPINDEX];
                        stockArray.STOCKNAMEINDEX = listData[data.STOCKNAMEINDEX].replace(/^\d+./g, '');
                        stockArray.NEWMARKETNO = NEWMARKETNO[index];

                        if (STOCKPROP[index]) {
                            stockArray['RZRQ'] = (STOCKPROP[index][3] == 1 ? true : false) || (STOCKPROP[index][4] == 1 ? true : false);
                            stockArray['Tong'] = (STOCKPROP[index][13] == 1 ? true : false);
                            stockArray['FXJS'] = (STOCKPROP[index][5] == 1 ? true : false);
                            stockArray['TSZL'] = (STOCKPROP[index][6] == 1 ? true : false);
                            stockArray['ISH'] = (STOCKPROP[index][7] == 1 ? true : false);
                            stockArray['ISZ'] = (STOCKPROP[index][8] == 1 ? true : false);
                            stockArray['SBGP'] = (STOCKPROP[index][9] == 'T' ? true : false);
                            stockArray['SBLW'] = (STOCKPROP[index][9] == 'B' ? true : false);
                            stockArray['SBXQ'] = (STOCKPROP[index][9] == 'O' ? true : false);
                            stockArray['SBXZ'] = (STOCKPROP[index][9] == 'P' ? true : false);
                            // stockArray['BJ'] = (shicArr[index] == '5121' ? true : false);
                        }
                        if (shicArr[index] == '5121') {
                            stockArray['BJ'] = true
                            stockArray['SBGP'] = false
                        } else {
                            stockArray['BJ'] = false
                        }
                        // cdr
                        if (
                            tztStockType.MakeCDRMarket(STOCKPROP[index], 1) ||
                            tztStockType.MakeCDRMarket(STOCKPROP[index], 2)
                        ) {
                            stockArray["CDR"] = true;
                        } else {
                            stockArray["CDR"] = false;
                        }
                        // 科创板
                        if (STOCKPROP[index].length >= 32) {
                            if (STOCKPROP[index].length > 30) {
                                nsStock = STOCKPROP[index].slice(30, 31);
                            }
                            if (STOCKPROP[index].length > 31) {
                                nsKCB = STOCKPROP[index].slice(31, 32);
                            }
                            if (nsStock === '0' && nsKCB == '7') {
                                stockArray['KCB'] = true;
                            } else {
                                stockArray['KCB'] = false;
                            }
                        }
                        indexData.push(stockArray);//listData
                    });
                    that.$set('GRID', indexData);
                    console.log(indexData);
                });
            }

        },
        components: {},
        events: {
            zxlist() {
                this.getZXList();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../assets/less/variables.less';
    @import "../../../assets/less/mixins.less";
    @import "../../../assets/less/hq.less";

    .fund_table {
        position: absolute;
        top: 1.7rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        -webkit-transform: translateZ(0px);
    }

    .fund_table dl {
        display: table;
        /*width: 100%;*/
        border-bottom: 1px solid #e9e9e9;
        table-layout: fixed;
        position: relative;
        background: #f4f4f4;
        padding: 0 0.75rem;
    }

    dl {
        display: table;
        /*width: 100%;*/
        border-bottom: 1px solid #e9e9e9;
        table-layout: fixed;
        position: relative;
        background: #f4f4f4;
        padding: 0 0.75rem;
    }

    .title {
        position: absolute;
        top: 0;
        width: 100%;
        padding: 0 0.75rem;
        z-index: 100;
    }

    .title dt {
        padding: .4rem 0;
        text-align: left;
        color: #919191;
        font-size: 0.6rem;
        /*padding-left: 0.2rem;*/
    }

    .title dd {
        display: table-cell;
        vertical-align: middle;
        padding: .4rem 0;
        text-align: center;
        color: #919191;
        font-size: 0.6rem;
    }

    .title dd:last-of-type {
        text-align: right;
    }

    .title dd .icon {
        display: inline-block;
        /*padding-right: 0.55rem;*/
    }

    .fund_table .part .rise {
        color: #f43438;
    }

    .fund_table .part .fill {
        color: #01a05f;
    }

    .fund_table .part dt {
        text-align: left;
        padding: 0.5rem 0;
    }

    .fund_table .part dd {
        font-size: 0.75rem;
        text-align: center;
        font-weight: bold;
    }

    .fund_table .part dd:last-of-type {
        text-align: right;

    }

    .fund_table dl dd, .fund_table dl dt {
        display: table-cell;
        vertical-align: middle;
    }

    .fund_table .block_color span {
        display: inline-block;
    }

    .fund_table .block_color .fill {
        display: inline-block;
        color: #01a05f;
    }

    .fund_table .block_color .rise {
        display: inline-block;
        color: #f43438;
    }

    .fund_table .part dt strong {
        display: block;
        font-size: 0.65rem;
        color: #484848;
        /*font-weight: 400;*/
        font-weight: bold;
    }

    .fund_table .part dt small {
        font-size: 0.6rem;
        color: #919191;
    }

    .fund_table .part dt em {
        margin: 0 !important;
    }

    dl, dt, dd {
        margin: 0;
        padding: 0;
    }

    .noData {
        padding-top: 4rem;
    }

    .noData p {
        display: block;
    }

    .noData .block {
        font-size: 0.9rem;
        color: #919191;
        text-align: center;
        width: 100%;
        display: block;
    }

    .noData .img {
        width: 20%;
        padding-bottom: 20%;
        margin: 0 auto 5px;
        background: url('data:image/png;base64,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') no-repeat;
        background-size: 100%;
    }
</style>


