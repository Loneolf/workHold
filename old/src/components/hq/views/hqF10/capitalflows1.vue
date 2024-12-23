<!-- 资金流向 -->
<template>
    <div class="content">
        <p class="capital-title">当日资金流向</p>
        <component-ring></component-ring>
        <div class="capital-table">
            <component-table></component-table>
        </div>
        <h2 class="h-gb"></h2>
        <p class="capital-title">最近5日主力增减仓</p>
        <div class="capital-main">
            <main-force></main-force>
            <div class="capital-text"><span class="text-cont"><span class="text-left"><em class="air-fill"></em>资金流出</span><span><em class="air-rise"></em>资金流入</span></span><span class="text-unit">单位（万元）</span></div>
        </div>
    </div>
</template>
<script>
import componentRing from '../../ons/canvas/componentRing'
import mainForce from '../../ons/mainForce'
import componentTable from '../../ons/componentTable'
import utils from '../../../../util/util'
import service_hq_often from '../../service/common/service_hq_often'
export default {
    data() {
        return {
            stockcode: this.$route.query.stockcode,
            mainForceData:{

            },
            table:{

            },
            ring:[]
        }
    },
    attached() {
      if(this.$parent.currentView2 == ''){
        return;
      }
        // $.init();
        this.stockcode = this.$route.query.stockcode;
        this.getCustomers();
    },
    methods: {
        getCustomers() {
            var that = this;
            that.stockcode = that.$route.query.stockcode;
            var obj = {
              stockcode: that.stockcode,
              StartPos:999999
            };
            service_hq_often.require20131(obj)
                .then((oData) => {
                    var obj = [];
                    if(oData.GRID0 && oData.GRID0.length>1){
                        oData.GRID0.shift();
                        var tableData = {
                            mainForce:[],//主户
                            retail:[]//散户
                        };
                        var ringName = ['主力流入','散户流入','散户流出','主力流出'];
                        var ringdata = [];
                        var ringnewData = [];
                        var sumAll = 0;
                        oData.GRID0.forEach((item) => {
                            var listItem = item.split('|');
                            if(listItem[0] == '主力'){
                                listItem.shift();
                                tableData.mainForce = listItem;
                            }else if(listItem[0] == '散户'){
                                listItem.shift();
                                tableData.retail = listItem;
                            }
                        });
                        that.$set('table', tableData);
                        that.notifytable();

                        ringdata.push(tableData.mainForce[0]);
                        ringdata.push(tableData.retail[0]);
                        ringdata.push(tableData.retail[1]);
                        ringdata.push(tableData.mainForce[1]);

                        ringdata.forEach((item)=>{
                            sumAll+=parseFloat(item);
                        });
                        ringdata.forEach((item,index)=>{
                            var val = (sumAll==0?0:Number(item/sumAll).toFixed(2));
                            ringnewData.push([ringName[index],val]);
                        });
                        that.$set('ring', ringnewData);
                        that.notifyRing();
                    }
                    if(oData.GRID3 && oData.GRID3.length>1){
                        oData.GRID3.shift();
                        var forceData = {
                            mainForce:[],
                            heights:[],
                            date:[]
                        };
                        var newforceval=[];
                        oData.GRID3.forEach((item) => {
                            var listItem = item.split('|');
                            forceData.date.push(listItem[0].slice(4).replace(/^(\d{2})(\d{2})/g,'$1-$2'));
                            forceData.mainForce.push(listItem[1]);
                            newforceval.push(Math.abs(listItem[1]));
                        });
                        var maxval = Math.max.apply(null, newforceval);
                        newforceval.forEach((item)=>{
                            forceData.heights.push(2.25/maxval*item+'rem');
                        });
                        that.$set('mainForceData', forceData);
                        that.notify();
                    }
                    /*oData.GRID0.forEach((item) => {
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
                    that.notify();*/
                    // $.refreshScroller();
                })
        },
        notify() {
            this.$broadcast('parent-mainForce', this.mainForceData)
        },
        notifytable() {
            this.$broadcast('parent-table', this.table)
        },
        notifyRing() {
            this.$broadcast('parent-ring', this.ring)
        }
    },
    components:{
        componentRing,
        mainForce,
        componentTable
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import '../../../../assets/less/variables.less';
    @import "../../../../assets/less/mixins.less";
    .capital-title{
        line-height: 1.9rem;
        margin: 0;
        font-weight: normal;
        font-size: 0.7rem;
    }
    .h-gb{
        margin: 0;
        width: 100%;
        height: 8px;
    }
    .capital-main,.capital-title{
        padding: 0 0.75rem;
    }
    .capital-table{
        padding: 0 0.75rem 0.5rem;
    }
    .capital-text{
        font-size: 0.7rem;
        .text-left{
            margin-right: 0.5rem;
        }
        .text-cont,.text-unit{
            width: 60%;
            display: inline-block;
        }
        .text-unit{
            width: 40%;
            text-align: right;
        }
        .air-fill,.air-rise{
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            background-color: @color-fill;
            border-radius: 0.2rem;
            margin-right: 0.25rem;
        }
        .air-rise{
            background-color: @color-rise;
        }
    }

</style>

