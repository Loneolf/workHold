<template>
  <div class="handicap">
    <div class="handicap_cont">
    	<span v-for="item in plates" class="plate-item"><span v-if="item.fontsize" v-bind:style="{fontSize:'0.6rem','whiteSpace':'nowrap'}">{{item.name}}:</span><span v-else>{{item.name}}:</span><span v-if="item.istype === 1" class="{{item.val | colorDivide Close_p}}">{{item.val}}</span><template v-else><span v-if="item.istype === 2" class="{{item.val | isUP}}">{{item.val}}</span><template v-else><span v-if="item.istype === 3" class="fill">{{item.val}}</span><span v-else>{{item.val}}</span></template></template></span>
    </div>
  </div>
</template>

<script>
  import util from '../../../../util/util';
  import tztStockType from '../../../hq/scripts/tztStockType.js';
export default {
  data () {
    return {
      NEWMARKETNO:'',
      plates: [

      ],
      gzList:[
        {name:'今开',val:'-.-',istype:1},
        {name:'昨收',val:'-.-'},
        {name:'涨停',val:'-.-',istype:1},
        {name:'跌停',val:'-.-',istype:1},
        {name:'成交额',val:'-.-'},
        {name:'量比',val:'-.-'},
        {name:'外盘',val:'-.-'},
        {name:'内盘',val:'-.-'},
        {name:'市盈(动)',val:'-.-'},
        {name:'市盈(静)',val:'-.-'},
        {name:'净资产',val:'-.-'},
        {name:'市净率',val:'-.-'},
        {name:'总股本',val:'-.-'},
        {name:'总市值',val:'-.-'},
        {name:'流通股本',val:'-.-'},
        {name:'流通市值',val:'-.-'},
        {name:'收益(三)',val:'-.-'},
        {name:'较上一笔涨跌',val:'-.-',fontsize:'0.6'},
      ],
      ggList:[
        {name:'今开',val:'-.-',istype:1},
        {name:'昨收',val:'-.-'},
        {name:'涨停',val:'-.-',istype:1},
        {name:'跌停',val:'-.-',istype:1},
        {name:'成交额',val:'-.-'},
        {name:'量比',val:'-.-'},
        {name:'外盘',val:'-.-'},
        {name:'内盘',val:'-.-'},
        {name:'市盈(动)',val:'-.-'},
        {name:'市盈(静)',val:'-.-'},
        {name:'净资产',val:'-.-'},
        {name:'市净率',val:'-.-'},
        {name:'总股本',val:'-.-'},
        {name:'总市值',val:'-.-'},
        {name:'流通股本',val:'-.-'},
        {name:'流通市值',val:'-.-'},
        {name:'收益(三)',val:'-.-'}
      ],
      HKList:[
        {name:'今开',val:'-.-',istype:1},
        {name:'昨收',val:'-.-'},
        {name:'现量',val:'-.-'},
        {name:'总量',val:'-.-'},
        {name:'量比',val:'-.-'},
        {name:'委比',val:'-.-',istype:2},
        {name:'沪港通余额',val:'-.-',fontsize:'0.6'},
        {name:'额度状态(沪)',val:'-.-',fontsize:'0.6'},
        {name:'深港通余额',val:'-.-',fontsize:'0.6'},
        {name:'额度状态(深)',val:'-.-',fontsize:'0.6'},
        {name:'委差',val:'-.-',istype:2},
        {name:'参考价',val:'-.-',istype:1}
      ],
      IndexList:[
        {name:'成交量',val:'-.-'},
        {name:'昨收',val:'-.-'},
        {name:'委买',val:'-.-',istype:2},
        {name:'委卖',val:'-.-',istype:3},
        {name:'量比',val:'-.-'},
        {name:'换手',val:'-.-'}
      ]
    }
  },
  attached(){
    this.NEWMARKETNO = this.$route.query.marketno;
    //港股
    if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
      this.plates = this.HKList;
    }else if(tztStockType.MakeThreeBordMarket(this.NEWMARKETNO)){ //股转代码
      this.plates = this.gzList;
    }else if(tztStockType.MakeIndexMarket(this.NEWMARKETNO) || tztStockType.MakeBlockIndex(this.NEWMARKETNO)){ //指数
      this.plates = this.IndexList;
    }else{
      this.plates = this.ggList;
    }
  },
  methods:{

  },
  detached(){ //销毁函数
    this.plates = [];
  },
  events:{
    'parent-minStockInfo':function (data) {
      this.Close_p          = data.Close_p;
      if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
        this.plates[0]['val'] = data.Open_p;
        this.plates[1]['val'] = data.Close_p;
        this.plates[2]['val'] = util.numTosize(data.StockData.Last_h)+'股';
        this.plates[3]['val'] = util.numTosize(data.Total_h,'0')+'股';
        this.plates[4]['val'] = data.m_lLiangbi;
        this.plates[5]['val'] = data.m_nWB;
        this.plates[6]['val'] = util.numTosize(data.m_HGTResidueValue*10000);
        if(data.m_HGTStatus == 1){
          this.plates[7]['val'] = '额度不可用';
        }
        if(data.m_HGTStatus == 2){
          this.plates[7]['val'] = '额度可用';
        }
        this.plates[8]['val'] = util.numTosize(data.m_SGTResidueValue*10000);
        if(data.m_SGTStatus == 1){
          this.plates[9]['val'] = '额度不可用';
        }
        if(data.m_SGTStatus == 2){
          this.plates[9]['val'] = '额度可用';
        }
        this.plates[10]['val'] = util.numTosize(data.m_nWC)+'股';
        this.plates[11]['val'] = util.toDecimal2(data.m_HKCloseRefrencePrice/1000,3);
      }else if(tztStockType.MakeIndexMarket(this.NEWMARKETNO) || tztStockType.MakeBlockIndex(this.NEWMARKETNO)){
        this.plates[0]['val'] = util.numTosize(data.Total_h*100);
        this.plates[1]['val'] = data.Close_p;
        this.plates[2]['val'] = util.numTosize(data.indexData.buy_h);
        this.plates[3]['val'] = util.numTosize(data.indexData.sale_h);
        this.plates[4]['val'] = data.m_lLiangbi;
        this.plates[5]['val'] = data.nHuanshoulv;
      }else {
        this.plates[0]['val'] = data.Open_p;
        this.plates[1]['val'] = data.Close_p;
        this.plates[2]['val'] = data.m_zt;
        this.plates[3]['val'] = data.m_dt;
        this.plates[4]['val'] = util.numTosize(data.Total_m);
        this.plates[5]['val'] = data.m_lLiangbi;
        this.plates[6]['val'] = util.numTosize(data.m_lOutside);
        this.plates[7]['val'] = util.numTosize(data.m_lInside);
        this.plates[8]['val'] = data.m_ldtsyl;
        this.plates[9]['val'] = data.m_jtsyl;
        this.plates[10]['val'] = data.m_ljzc;
        this.plates[11]['val'] = +data.m_ljzc?util.toDecimal2(data.Last_p/data.m_ljzc,2) : '0.00';
        this.plates[12]['val'] = util.numTosize(data.m_zgb);
        this.plates[13]['val'] = util.numTosize(data.m_zgb*data.Last_p);
        this.plates[14]['val'] = util.numTosize(data.m_ltb);
        this.plates[15]['val'] = util.numTosize(data.m_ltb*data.Last_p);
        this.plates[16]['val'] = util.toDecimal2(data.m_mgsy,2);
        var strTitle = '收益';
        switch (data.m_jb){
          case 3:
            strTitle = "收益(一)";
            break;
          case 6:
            strTitle = "收益(二)";
            break;
          case 9:
            strTitle = "收益(三)";
            break;
          case 12:
            strTitle = "收益(四)";
            break;
          default:
            strTitle = "收益";
            break;
        }
        this.plates[16]['name'] = strTitle;
        if(!!this.plates[17]){
          let sVal = '-.-';
          if(typeof data.m_jsybzdje != 'undefined' && typeof data.m_jsybzdje != 'null'){
            sVal = data.m_jsybzdje;
          }
          this.plates[17]['val'] = sVal;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../../assets/less/variables.less';
.plate-item{
	width: 48%;
	display: inline-block;
  line-height: 1.2rem;
  margin:0 2% 0 0;
  font-size:0.7rem;
  span{display: inline-block;width: 50%;}
  span:nth-child(2n){
    text-align: right;
  }
  .rise{color:@color-rise;}
  .fill{color:@color-fill;}
}
.plate-item:nth-child(2n){
  margin-left: 2%;
  margin-right:0;
}
  .handicap_cont{
    padding: 0 0.5rem;
    font-size: 0;
  }
</style>
