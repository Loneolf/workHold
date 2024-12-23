<!--简况-->
<template>
  <div class="highranking">
    <company-profile></company-profile>
    <div>
      <h3 class="title"><span>概念题材</span></h3>
      <p>涉及概念</p>
      <p>{{gridText}}</p>
    </div>
    <main-core></main-core>
    <dividend></dividend>
  </div>
</template>

<script>
import companyProfile from '../../ons/profile/companyProfile'
import dividend from '../../ons/profile/dividend'
import mainCore from '../../ons/profile/mainCore'

export default {
    data() {
        return {
            gridProfile :{},
            gridText:'',
            gridDividend:[],
            gridMainCore:{}
        }
    },
    attached() {
    // $.init();
    this.stockcode = this.$route.query.stockcode;
        this.getCustomers();
    },
    methods: {
        getCustomers() {
            this.$set('gridProfile', {
                '公司名称'      :'青岛啤酒股份有限公司',
                '所在地'     :'山东省',
                '行业'  :'啤酒',
                '上市时间'  :'1993-08-27',
                '发行价格'  :'6.38元',
                '发行数量'  :'10000',
                '主营业务'  :'啤酒制造以及与之相关业务'
            });
            this.$set('gridText', '沪港通概念，融券标的股，融资融券，融资标的股');

            this.$set('gridDividend',[
              {year:'2015',cont:'10派3.90元',date:'20160712'},
              {year:'2014',cont:'10派3.90元',date:'20160712'},
              {year:'2013',cont:'10派3.90元',date:'20160712'},
              {year:'2012',cont:'10派3.90元',date:'20160712'},
              {year:'2011',cont:'10派3.90元',date:'20160712'},
              {year:'2010',cont:'10派3.90元',date:'20160712'},
              {year:'2009',cont:'10派3.90元',date:'20160712'}
            ]);
            this.$set('gridMainCore', {
              '销售啤酒'      :'72.08亿元'
            });
            this.notify();
            this.dividendfunc();
            this.mainCorefunc();
        },
        notify() {
            this.$broadcast('parent-companyProfile', this.gridProfile)
        },
        dividendfunc(){
            this.$broadcast('parent-dividend', this.gridDividend)
        },
        mainCorefunc(){
            this.$broadcast('parent-mainCore', this.gridMainCore)
        }
    },
    components:{//组件
        companyProfile,
        dividend,
        mainCore
    }
}
</script>
