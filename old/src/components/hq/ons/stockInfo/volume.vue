<template>
  <div class="fund_table" id="lzgList">
      <dl class="part" v-for="items in lzgModule">
        <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}</small></dt>
        <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span>{{items.TOTALHINDEX}}</span></dd>
      </dl>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import service_hq_often from '../../service/common/service_hq_often'
  import tztStockType from '../../../hq/scripts/tztStockType.js';
	export default {
		data() {
		  return {
		    stockcode:'',
        NEWMARKETNO:'',
        lzgModule:[
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--',TOTALHINDEX:'--'}
        ]
			}
		},
    attached(){
		  this.stockcode = this.$route.query.stockcode;
      this.NEWMARKETNO = this.$route.query.marketno;
      this.getlzgData();
    },
    methods: {
      getlzgData(){
        var that = this;
        var stock = '';
        var action = 'require20191';
        if(this.stockcode == '1A0001'){//上证
          stock = '1101';
        }else if(this.stockcode == '2A01' || this.stockcode == '399300' || this.stockcode == '399005'){//深证
          stock = '1201,1206';
        }else if(this.stockcode == '399006'){//上证
          stock = '120B';
        }else if(this.stockcode == '899002'){//三板做市
          stock = '新三板_转让类型_做市';
          action = 'require20192';
        }else if(this.stockcode == '899001' || this.stockcode == '899006'){//三板成指、创业板成指
          stock = '1105,1205';
        }else if(this.stockcode == 'HSI'){//恒生指数
          stock = '恒指成份';
          action = 'require20192';
        }else if(this.stockcode == 'HSCEI'){//恒生指数
          stock = '国企股';
          action = 'require20192';
        }else if(this.stockcode == 'HSCCI'){//恒生指数
          stock = '红筹股';
          action = 'require20192';
        }else {//其他
          if(tztStockType.MakeSZIndexMarket(this.NEWMARKETNO)){
            stock = '1101';
          }else if(tztStockType.MakeBlockIndex(this.NEWMARKETNO)){
            stock = this.stockcode;
            action = 'require20199';
          }else {
            stock = '120B';
          }
        }

        let oSendData = {
          AccountIndex:2,
          DeviceType:0,
          Direction:1,
          Lead:0,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:stock,
          newindex:1
        };
        service_hq_often[action](oSendData)
          .then((data)=> {
            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  TOTALHINDEX:listData[data.TOTALHINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX]
                };
                indexData.push(listObj);
              }
            });
            that.$set('lzgModule',indexData);
          })
      }
    },
    events:{

    }
	}
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .fund_table dl {
    display: table;
    width: 100%;
    border-bottom: 1px solid #cbcbcb;
    table-layout: fixed;
    position: relative;
    background: #FFF;
    margin: 0;
    .rise{
      color: @color-rise;
    }
    .fill{
      color: @color-fill;
    }
  }
  .fund_table dl dd, .fund_table dl dt {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .fund_table .part dt strong {
    display: block;
    font-size: 0.7rem;
    color: #000;
    font-weight: 400;
  }
  .fund_table .part dt {
    text-align: left;
    line-height: 0.9rem;
    padding: 0.2rem 0;
    padding-left: 1rem;
  }
  .fund_table .part dt small {
    font-size: 0.6rem;
    color: #999;
  }

  .clearfix:after {
    clear: both;
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }
  li, ol, ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
