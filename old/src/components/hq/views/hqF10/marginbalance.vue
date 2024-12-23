<template>
  <div class="marginbalance content">
    <h2 class="title">融资余额与融券余额差值</h2>
    <p class="unit">单位(亿元)</p>
    <trend-chart></trend-chart>
    <div class="explain">
        <h3 class="title"><span>交易日期</span><span><input type="text" id='picker' v-model="message"/></span></h3>
        <div class="explain-ul">
            <table>
                <tr><td>融资买入额</td><td>{{marginvalue.BUYING_AMOUNTINDEX | filunit 2}}</td></tr>
                <tr><td>融资偿还额</td><td>{{marginvalue.REPAYMENT_AMOUNTINDEX | filunit 2}}</td></tr>
                <tr><td>融资余额</td><td>{{marginvalue.FINANCING_BALANCEINDEX | filunit 2}}</td></tr>
                <tr><td>融券卖出量</td><td>{{marginvalue.SELLING_VOLUMEINDEX | filunit 2}}</td></tr>
                <tr><td>融券偿还量</td><td>{{marginvalue.AMOUNT_VOLUMEINDEX | filunit 2}}</td></tr>
                <tr><td>融券余额</td><td>{{marginvalue.MARGIN_VOLUMEINDEX | filunit 2}}</td></tr>
                <tr><td>余额差值</td><td>{{marginvalue.BALANCE_DIFFINDEX | filunit 2}}</td></tr>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import TrendChart from '../../ons/canvas/TrendChart';
import utils from '../../../../util/util'
export default {
  data () {
    return {
        gridData:{},
        datelist:[],
        chartData:[],
        marginvalue:{
            BUYING_AMOUNTINDEX:'',//融资买入额
            REPAYMENT_AMOUNTINDEX:'',//融资偿还额
            'FINANCING_BALANCEINDEX':'',//融资余额
            'SELLING_VOLUMEINDEX':'',//融券卖出量
            'AMOUNT_VOLUMEINDEX':'',//融券偿还量
            'MARGIN_VOLUMEINDEX':'',//融券余额
            'BALANCE_DIFFINDEX':''//余额差值
        },
        INDEX:[
            'BUYING_AMOUNTINDEX',//融资买入额
            'REPAYMENT_AMOUNTINDEX',//融资偿还额
            'FINANCING_BALANCEINDEX',//融资余额
            'SELLING_VOLUMEINDEX',//融券卖出量
            'AMOUNT_VOLUMEINDEX',//融券偿还量
            'MARGIN_VOLUMEINDEX',//融券余额
            'BALANCE_DIFFINDEX'//余额差值
        ],
        message:'',
        stockcode:this.$route.query.stockcode || '000009'
    }
  },
  ready(){

  },
  attached() {
    this.stockcode = this.$route.query.stockcode;
    this.getCustomers();
  },
  methods:{
    getCustomers(){
        var that = this;
        // var now = (utils.fmtDate(new Date(),"yyyy-MM-dd")).replace(/-/g,'');
        that.$http.post('/reqxml?',
            {action:'46122',
            stockcode:that.stockcode,
            ReqlinkType:2,
            // BeginDate:utils.getMonthBefor(-3,now),
            // enddate:now
            nPage:1,
            maxcount:60
        }).then((response)=>{
            var oData = response.json();
            var obj = {};
            var date = [];
            var chart = [];
            oData.GRID0.forEach((item) =>{
                var listItem = item.split('|');
                var listobj = {};
                var INDEX = that.$get('INDEX');
                INDEX.forEach((value)=>{
                    if(oData[value]){
                        listobj[value] = listItem[oData[value]]
                    }
                });
                obj[that.$options.filters.date(listItem[oData.DATESINDEX])] = listobj;
                date.push(that.$options.filters.date(listItem[oData.DATESINDEX]));
                //融资余额-融券余额
                // var balance = listItem[oData.FINANCING_BALANCEINDEX] - listItem[oData.MARGIN_VOLUMEINDEX];
                var balance = listItem[oData.BALANCE_DIFFINDEX];
                chart.push([listItem[oData.DATESINDEX],utils.fmtunit(balance,0,0)]);
            });
            that.$set('chartData',chart.reverse());
            that.notify();
            that.$set('gridData',obj);
            that.$set('datelist',date);
            that.$set('message',date[0]);
            that.picker();
        })
    },
    picker(){
        var that = this;
        $("#picker").picker({
          toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">确定</button>\
              <h1 class="title">选择日期</h1>\
              </header>',
          cols: [
            {
              textAlign: 'center',
              values: that.datelist
            }
          ],
          onClose(){

          }
        });
    },
    notify() {
        if (this.chartData.length>1) {
            this.$broadcast('parent-chartData', this.chartData)
        }
    }
  },
  watch:{
    message(val, oldVal){
        this.marginvalue = this.gridData[val]
    }
  },
  filters:{
    filunit(vaule,num){
        return utils.fmtunit(vaule,num);
    },
    date(value){
        return value.replace(/^(\d{4})(\d{2})(\d{2})$/i,'$1-$2-$3');
    }
  },
  components: {
    TrendChart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../../assets/less/variables.less';
@import "../../../../assets/less/mixins.less";
.marginbalance{
    padding-top: .5rem;
    .title{
        text-align: center;
        margin: 0;
        font-size: 0.75rem;
    }
    .unit{
        text-align: center;
        margin:0;
        font-size: 0.6rem;
        color: @color-text-secondary;
    }
}
.h5_trendChart{
    padding: 10px 8px 30px 35px;
    position: relative;
    width: 100%;
    font-size: 0;
    min-height:9.5rem;
}
.explain{
    position: relative;
    .hairline(bottom,@color-split);
    margin-top: 0.5rem;
    .title{
        position: relative;
        padding: 0 0.75rem;
        margin: 0;
        font-weight: normal;
        font-size: 0.8rem;
        line-height: 1.6rem;
        .hairline(bottom,@color-split);
        .hairline(top,@color-split);
        span{
            display: inline-block;
            input{
                background: none;
                border:none;
                width: 100%;
                display: inline-block;
                text-align: right;
            }
        }
        span:nth-child(1){
            width: 50%;
            text-align: left;
        }
        :nth-child(2){
            width: 50%;
            text-align: right;
        }
    }
    .explain-ul{
        padding: 0 0.75rem;
        margin: 0;
    }
    table{
        width: 100%;
        :last-child{
            border-bottom:none;
        }
    }
    tr{
        list-style: none;
        font-size: 0.7rem;
        display:block;
        position: relative;
        .hairline(bottom,@color-split);
        td{
            position: relative;
            display: inline-block;
            padding: 0.5rem 0;

        }
        :nth-child(1){
            width: 40%;
            color: @color-text-secondary;
        }
        :nth-child(2){
            width: 60%;
            vertical-align: middle;
            text-align: right;
        }
    }
}
.picker-modal header.bar{
    background-color: #f7f7f8;
}
</style>
