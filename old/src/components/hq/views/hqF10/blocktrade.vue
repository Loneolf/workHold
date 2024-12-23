<!-- 大宗交易 -->
<template>
    <div class="content">
        <trade-cont></trade-cont>
    </div>
</template>
<script>
import TradeCont from '../../ons/TradeCont'
import utils from '../../../../util/util'
export default {
    data() {
        return {
            gridData: {},
            INDEX: [
                'DATESINDEX', //日期
                'TRA_PRICEINDEX', //成交价
                'TRA_AMOUNTINDEX', //成交量
                'TRA_VOLUMEINDEX', //成交额
                'BUYERINDEX', //买方
                'SELLERINDEX', //卖方
                'BALANCE_DIFFINDEX' //余额差值
            ],
            stockcode: this.$route.query.stockcode || '000009'
        }
    },
    ready() {
        // $.init();
//        this.getCustomers();
    },
    attached() {
      this.stockcode = this.$route.query.stockcode;
      this.getCustomers();
    },
    methods: {
        getCustomers() {
            var that = this;
            var INDEX = that.INDEX;
            var now = (utils.fmtDate(new Date(),"yyyy-MM-dd")).replace(/-/g,'');
            that.$http.post('/reqxml?', {
                    action: '46123',
                    stockcode: that.stockcode,
                    BeginDate:utils.getMonthBefor(-6,now),
                    enddate:now,
                    nPage: 1,
                    maxcount: 10,
                    ReqlinkType: 2
                })
                .then((response) => {
                    var oData = response.json();
                    var obj = [];
                    if(!oData.GRID0){
                        alert(oData.ERRORMESSAGE || '暂无数据');
                        return;
                    }
                    oData.GRID0.forEach((item) => {
                        var listItem = item.split('|');
                        var listobj = {};

                        // console.log(INDEX);
                        INDEX.forEach((value) => {
                            if (oData[value]) {
                                listobj[value] = listItem[oData[value]]
                            }
                        });
                        obj.push(listobj);
                    })
                    that.$set('gridData', obj);
                    that.notify();
                    // $.refreshScroller();
                })
        },
        notify() {
            this.$broadcast('parent-blocktrade', this.gridData)
        }
    },
    components:{
        TradeCont
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

