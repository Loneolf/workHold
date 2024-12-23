<!-- 龙虎榜 -->
<template>
  <div class="highranking content">
    <ranking-cout></ranking-cout>
  </div>
</template>

<script>
import rankingCout from '../../ons/rankingCout'
import utils from '../../../../util/util'
export default {
  data() {
        return {
            gridData: {},
            keyData:[],
            INDEX: [
                'IDINDEX',//资讯ID
                'DATESINDEX', //日期
                'BUY_SELLINDEX', //买入卖出金额
                'BUY_SELL_TYPEINDEX', //买入卖出类型
                'LOONG_TYPEINDEX', //类型
                'FIVE_NAMEINDEX', //买家名称
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
                    action: '46124',
                    stockcode: that.stockcode,
                    BeginDate:utils.getMonthBefor(-12,now),
                    enddate:now,
                    ReqlinkType: 2
                })
                .then((response) => {
                    var oData = response.json();
                    var obj = {},newObj={},date = [];
                    if(!oData.GRID0){
                        alert(oData.ERRORMESSAGE || '暂无数据');
                        return;
                    }
                    oData.GRID0.forEach((item) => {
                        var listItem = item.split('|');
                        var listobj = {};


                        if(!(listItem[oData.LOONG_TYPEINDEX] in obj)){
                            obj[listItem[oData.LOONG_TYPEINDEX]] = {
                                'gridData':[]
                            }
                            date.push([listItem[oData.DATESINDEX],listItem[oData.LOONG_TYPEINDEX]]);
                        }

                        INDEX.forEach((value) => {
                            if (oData[value]) {
                                listobj[value] = listItem[oData[value]]
                            }
                        });
                        obj[listItem[oData.LOONG_TYPEINDEX]]['gridData'].push(listobj);

                    });
                    //console.log(obj);
                    for(var item in obj){
                        var BUY_AMOUNTINDEX = 0;//买入金额
                        var SELL_AMOUNTINDEX = 0;//卖出金额
                        obj[item].gridData.forEach((arrayItem)=>{
                            if(arrayItem.BUY_SELL_TYPEINDEX === '11'){// 11=买入  13=卖出
                                BUY_AMOUNTINDEX+=parseFloat(arrayItem.BUY_SELLINDEX);
                                if(!('BUY_DATA' in obj[item])){
                                    obj[item].BUY_DATA = [];
                                }
                                obj[item].BUY_DATA.push(arrayItem);
                            }else{
                                SELL_AMOUNTINDEX+=parseFloat(arrayItem.BUY_SELLINDEX);
                                if(!('SELL_DATA' in obj[item])){
                                    obj[item].SELL_DATA = [];
                                }
                                obj[item].SELL_DATA.push(arrayItem);
                            }
                            obj[item].BUY_AMOUNTINDEX = BUY_AMOUNTINDEX;
                            obj[item].SELL_AMOUNTINDEX = SELL_AMOUNTINDEX;
                        });
                        delete obj[item].gridData;
                    }
                    that.$set('gridData', obj);
                    that.$set('keyData', date);
                    that.notify();
                })
        },
        notify() {
            this.$broadcast('parent-rankingcout', this.gridData,this.keyData)
        }
    },
    components:{
        rankingCout
    }
}
</script>






