<!-- 持仓 -->
<template>
    <div class="">
        <class-ification></class-ification>
        <p class="h-gb"></p>
        <thermometer></thermometer>
        <p class="h-gb"></p>
        <div class="newData">
            <h2 class="title">最新数据</h2>
            <div class="rzrq-data">
                <h3 class="name" v-on:click="clickdata(0)">融资融券数据</h3>
                <div class="difference"><h4 class="diff-title">差值曲线</h4><p class="diff-name">(融资余额-融券余额)</p></div>
                <broken-line></broken-line>
            </div>
            <div class="makes">
                <div class="block" v-on:click="clickdata(1)"><p class="title">大宗交易数据</p><p class="cont">近6个月交易数</p><p class="num">{{blocktradenum}}</p></div>
                <div class="block block-other" v-on:click="clickdata(2)"><p class="title">龙虎榜数据</p><p class="cont">近一年上榜次数</p><p class="num">{{highrankingnum}}</p></div>
            </div>
            <p class="disclaimer">免责声明：以上数据仅供参考，据此产生的盈亏自负，与**证券公司无关。股票有风险，投资需谨慎！</p>
        </div>
    </div>
</template>
<script>
import ClassIfication from '../../ons/ClassIfication';
import Thermometer from '../../ons/Thermometer';
import BrokenLine from '../../ons/canvas/BrokenLine';
import utils from '../../../../util/util';
import service_hq_often from '../../service/common/service_hq_often';
import service_hqF10 from '../../../information/service/hq/service_hqF10';
export default {
    data() {
        return {
            highrankingnum:'',//龙虎榜数据
            blocktradenum:'',//大宗交易数据
            stockcode: this.$route.query.stockcode,
            INDEX:[
                'BALANCE_DIFFINDEX'//余额差值
            ],
            chartData:[],
            priceData:{}
        }
    },
    attached() {
    // $.init();
        this.stockcode = this.$route.query.stockcode;
        this.getHighrank();
        this.getBlockTrade();
        this.getBrokenLine();
        this.newpricedata();
    },
    methods: {
        getHighrank() {
            var that = this;
            var INDEX = that.INDEX;
            var now = (utils.fmtDate(new Date(),"yyyy-MM-dd")).replace(/-/g,'');
            var obj = {
              stockcode: that.stockcode,
              BeginDate:utils.getMonthBefor(-12,now),
              enddate:now,
            };
            service_hqF10.require46124(obj)
                .then((oData) => {
                    if(!oData){
                      return;
                    }
                    var obj = {},newObj={},date = [];
                    if(!oData.GRID0){
                        //alert(oData.ERRORMESSAGE || '暂无数据');
                        that.$set('highrankingnum', date.length);
                        return;
                    }
                    oData.GRID0.forEach((item) => {
                        var listItem = item.split('|');
                        var listobj = {};
                        if(!(listItem[oData.LOONG_TYPEINDEX] in obj)){
                            obj[listItem[oData.LOONG_TYPEINDEX]] = {
                                'gridData':[]
                            }
                            date.push(listItem[oData.LOONG_TYPEINDEX]);
                        }
                        obj[listItem[oData.LOONG_TYPEINDEX]]['gridData'].push(listobj);
                    });
                    that.$set('highrankingnum', date.length);
                })
        },
        getBlockTrade() {
            var that = this;
            var INDEX = that.INDEX;
            var now = (utils.fmtDate(new Date(),"yyyy-MM-dd")).replace(/-/g,'');
            var obj = {
              stockcode: that.stockcode,
              BeginDate:utils.getMonthBefor(-6,now),
              enddate:now,
              nPage: 1,
              maxcount: 10,
            };
            service_hqF10.require46123(obj)
                .then((oData) => {
                    if(!oData){
                      return;
                    }
                    if(!oData.GRID0){
                        that.$set('blocktradenum', 0);
                        return;
                    }
                    that.$set('blocktradenum', oData.GRID0.length);
                    // $.refreshScroller();
                })
        },
        getBrokenLine(){
            var that = this;
            var now = (utils.fmtDate(new Date(),"yyyy-MM-dd")).replace(/-/g,'');
            var INDEX = that.INDEX;
            var obj = {
              stockcode:that.stockcode,
              /*BeginDate:utils.getMonthBefor(-2,now),
               enddate:now,*/
              maxcount:6,
              nPage:1
            };
            service_hqF10.require46122(obj)
              .then((oData)=>{
                if(!oData){
                  return;
                }
                var obj = {};
                var date = [];
                var chart = [];
                oData.GRID0.forEach((item) =>{
                    var listItem = item.split('|');
                    var listobj = {};
                    INDEX.forEach((value)=>{
                        if(oData[value]){
                            listobj[value] = listItem[oData[value]]
                        }
                    });
                    obj[listItem[oData.DATESINDEX]] = listobj;
                    date.push(listItem[oData.DATESINDEX]);
                    //融资余额-融券余额
                    var balance = listItem[oData.BALANCE_DIFFINDEX];
                    chart.push([listItem[oData.DATESINDEX],utils.fmtunit(balance,0,0)]);
                });

                that.$set('chartData',chart.slice(0,6).reverse());
                that.notify();
            })
        },
        newpricedata(){
            var that = this;
          var obj = {
            stockcode:that.stockcode,
            newmarketno:0,
            accountindex:1,
            ReqlinkType: 0
          };
          service_hq_often.require43(obj)
            .then((data)=>{
              var priceData = data.WTHead;
              that.$set('priceData',{m_ldtsyl:priceData.m_ldtsyl,m_zgb:priceData.m_zgb});
              that.priceFunc();
            });
        },
        notify() {
            this.$broadcast('parent-chartdata', this.chartData)
        },
        priceFunc() {
            this.$broadcast('parent-thermometer', this.priceData)
        },
        clickdata(val){
            console.log(val);
            if(val === 0 && this.chartData.length > 0){
                this.$TZT.action10061('/hq/marginbalance?stockcode='+this.stockcode);
            }else if(val === 1 && this.blocktradenum > 0){
                this.$TZT.action10061('/hq/blocktrade?stockcode='+this.stockcode);
            }else if(this.highrankingnum > 0){
                this.$TZT.action10061('/hq/highranking?stockcode='+this.stockcode);
            }
        }
    },
    components: {
        ClassIfication,
        Thermometer,
        BrokenLine
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import '../../../../assets/less/variables.less';
    .plate-item {
        width: 50%;
        display: inline-block;
    }
    .h-gb{
        width: 100%;
        height: 8px;
    }
    .newData{
        padding: 0 0.75rem;
        .disclaimer{
            font-size: 0.7rem;
            color: @color-text-secondary;
            padding: 1rem 0 0.85rem;
        }
        .title{
            line-height: 1.9rem;
            margin: 0;
            font-weight: normal;
            font-size: 0.7rem;
        }
        .rzrq-data{
            text-align: center;
            border:@border-default;
            padding:0 15px;
            .name{
                margin:0;
                font-weight: normal;
                font-size: 0.8rem;
                line-height: 1.5rem;
                border-bottom: @border-default;
            }
            .difference{
                .diff-title{
                    margin:0;
                    font-size: 0.7rem;
                    font-weight: normal;
                    color: @color-text-secondary;
                }
                .diff-name{
                    font-size: 0.6rem;
                    color: @color-text-secondary;
                }
            }

        }
    }
    .makes{
        font-size: 0;
        margin-top: 0.5rem;
        .block{
            width: 48%;display: inline-block;text-align: center;border:@border-default;padding: 0 0.75rem;margin-right: 2%;
            vertical-align: top;
            &:nth-child(2){margin-right: 0;}
            .title{
                line-height: 1.35rem;
                border-bottom: @border-default;
                font-size: 0.7rem;
            }
            .cont{
                font-size: 0.6rem;
                line-height: 1rem;
            }
            .num{
                font-weight: bold;
                padding: 0.3rem 0 0.5rem;
                font-size: 0.85rem;
                height: 2.05rem;
            }
        }
        .block-other{margin-right: 0;margin-left: 2%;}
    }
</style>
