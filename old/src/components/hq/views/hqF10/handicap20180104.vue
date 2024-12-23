<template>
  <div class="handicap">
    <div class="handicap_cont">
    	<span v-for="item in plates" class="plate-item"><span v-if="item.fontsize" v-bind:style="{fontSize:'0.6rem'}">{{item.name}}:</span><span v-else>{{item.name}}:</span><span v-if="item.istype === 1" class="{{item.val | colorDivide Close_p}}">{{item.val}}</span><template v-else><span v-if="item.istype === 2" class="{{item.val | isUP}}">{{item.val}}</span><template v-else><span v-if="item.istype === 3" class="fill">{{item.val}}</span><span v-else>{{item.val}}</span></template></template></span>
      <div v-if="isSZqprod">
        <div v-for="item in zqList" class="zqList">
          <span class="plate-item">{{item.name}}:</span><span class="plate-item" v-if="item.istype === 1" class="{{item.val | colorDivide Close_p}}">{{item.val}}</span><span class="plate-item" v-else>{{item.val}}</span>
        </div>
      </div>
    </div>
    <p v-if="isAppropriateTip" class="apprTip">* {{AppropriateTip}}</p>
  </div>
</template>

<script>
  import util from '../../../../util/util';
  import tztStockType from '../../../hq/scripts/tztStockType.js';
export default {
  data () {
    return {
      NEWMARKETNO:'',
      stockcode:'',
      isSZqprod:false,
      isAppropriateTip:false,
      AppropriateTip:'',
      plates: [

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
      ],
      zqList:[
        {name:'实时加权平均利率',val:'-.-',istype:1},
        {name:'加权平均价涨跌BP',val:'-.-'},
        {name:'昨收盘加权平均利率',val:'-.-',istype:1},
        {name:'最近价涨跌BP',val:'-.-'}
      ]
    }
  },
  attached(){
    this.isSZqprod = false;
    this.isAppropriateTip = false;
    this.AppropriateTip = '';
    this.NEWMARKETNO = this.$route.query.marketno;
    this.stockcode = this.$route.query.stockcode;
    if(tztStockType.MakeHKMarketStock(this.NEWMARKETNO)){
      this.plates = this.HKList;
    }else if(tztStockType.MakeIndexMarket(this.NEWMARKETNO) || tztStockType.MakeBlockIndex(this.NEWMARKETNO)){
      this.plates = this.IndexList;
    }else {
      this.plates = this.ggList;
    }
    if (this.NEWMARKETNO == '4611' && this.stockcode.indexOf('131')>=0) {
      this.isSZqprod = true;
    }
  },
  methods:{

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
        this.plates[11]['val'] = data.m_ljzc=="0.0000"?"0.00":util.toDecimal2(data.Last_p/data.m_ljzc,2);
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
      }
      if (this.isSZqprod) {
        this.zqList[0]['val'] = data.quotedata.averPrice;
        this.zqList[1]['val'] = data.quotedata.averPriceBP;
        this.zqList[2]['val'] = data.quotedata.oldAverPrice;
        this.zqList[3]['val'] = data.quotedata.latestPriceBP;
      }
      if ([1,2].indexOf(data.m_AppropriateFlag) > -1 ) {
        this.isAppropriateTip = true;
        this.AppropriateTip = (data.m_AppropriateFlag == 1) ? '仅合格投资者可以认购和交易' : '仅合格投资者中的机构投资者可以认购和交易'
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
  .zqList .plate-item:nth-child(2n){
    text-align: right;
  }
  .apprTip{
    height: 1.6rem;
    line-height: 1.6rem;
    color: #000;
    font-size: 0.75rem;
    padding: 0 0.5rem;
  }
</style>
