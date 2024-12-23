<!-- 股东 -->
<template>
  <div class="highranking">
    <share-equity></share-equity>
    <share-holder></share-holder>
    <tradable-share-holders></tradable-share-holders>
    <mechanism></mechanism>
  </div>
</template>

<script>
import shareEquity from '../../ons/shareholder/shareEquity'
import shareHolder from '../../ons/shareholder/shareHolder'
import tradableShareHolders from '../../ons/shareholder/tradableShareHolders'
import mechanism from '../../ons/shareholder/mechanism'
export default {
    data() {
        return {
            gridData :{},
            shareData:{},
            shareTradable:{},
            shareMechanism:{}
        }
    },
    attached() {
    // $.init();
    this.stockcode = this.$route.query.stockcode;
        this.getCustomers();
    },
    methods: {
        getCustomers() {
            this.$set('gridData', {
                '总股本'      :'13.51亿股',
                '流通A股'     :'6.96亿股',
                '流通A股占比'  :'51.51%'
            });
            this.$set('shareData', {
                '股东人数'    :'3.56万户',
                '上期股东人数' :'6.96亿股',
                '较上期变化'  :'51.51%',
                '筹码集中度'  :'筹码非常集中',
                '人均流通股'  :'37903.17股',
                '人均持股金额':'112.19万',
                '机构投资者占比':'87.44%',
            });
            this.$set('shareTradable', [
                {name:'青岛啤酒集团有限公司',zhanbi:'30.83％',biandong:'未变'},
                {name:'香港中央结算（代理人）有限公司',zhanbi:'27.42％',biandong:'-1万股'},
                {name:'朝日集团控股株式会社',zhanbi:'19.99％',biandong:'未变'},
                {name:'中国证券金融股份有限公司',zhanbi:'2.99％',biandong:'未变'}
            ]);
            this.$set('shareMechanism', [
                {name:'青岛啤酒集团有限公司',zhanbi:'30.83％',biandong:'未变'},
                {name:'香港中央结算（代理人）有限公司',zhanbi:'27.42％',biandong:'-1万股'},
                {name:'朝日集团控股株式会社',zhanbi:'19.99％',biandong:'未变'},
                {name:'中国证券金融股份有限公司',zhanbi:'2.99％',biandong:'未变'}
            ]);
            this.notify();
            this.share();
            this.tradable();
            this.mechanism();
        },
        notify() {
            this.$broadcast('parent-shareEquity', this.gridData)
        },
        share(){
            this.$broadcast('parent-shareHolder', this.shareData)
        },
        tradable(){
            this.$broadcast('parent-shareHolderTradable', this.shareTradable)
        },
        mechanism(){
            this.$broadcast('parent-mechanism', this.shareMechanism)
        }
    },
    components:{//组件
        shareEquity,
        shareHolder,
        tradableShareHolders,
        mechanism
    }
}
</script>
