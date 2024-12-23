<template>
  <div class="content">
    <div class="fund_table">
      <dl class="title">
        <dt><span>证券名称</span></dt>
        <dd><span>当前价</span></dd>
        <dd><span class="icon zf" v-on:click="titleFunc('涨幅')">{{zfClickText}}</span></dd>
      </dl>
      <dl class="part" v-for="items in GRID" @click="clickFunc(items)">
        <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}<em v-if="items.SBGP" class="SBGP"></em><em v-if="items.SBLW" class="SBLW"></em><em v-if="items.SBXQ" class="SBXQ"></em><em v-if="items.SBXZ" class="SBXZ"></em><em v-if="items.ISH" class="ISH"></em><em v-if="items.ISZ" class="ISZ"></em><em v-if="items.RZRQ" class="RZRQ"></em><em v-if="items.Tong" class="Tong"></em><em v-if="items.FXJS" class="FXJS"></em><em v-if="items.TSZL" class="TSZL"></em></small></dt>
        <dd class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</dd>
        <dd class="block_color"><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
      </dl>
    </div>
    <div class="add">
      <p class="add-cont" v-link="{path:'/hq/search'}">+添加自选股</p>
    </div>
  </div>
</template>
<script>
  import tztMarket from '../scripts/tztMarket';
  import tztStockType from '../scripts/tztStockType'
  import tztZXstock from '../scripts/tztZXstock';
  import service_hq_often from '../service/common/service_hq_often';
	export default {
		data() {
		  return {
        Direction:"1",
        AccountIndex:'9',
        GRID:[],
        zdClickCs:0, //涨幅点击次数
        zfClickText:'涨幅'
			}
		},
    attached(){
      tztZXstock.getZXList(this.getZXList);
      this.$TZT.action10077(this);
    },
    methods:{
      dealRefreshTimer(){
        tztZXstock.getZXList(this.getZXList);
      },
      clickFunc(items){
        this.$TZT.action10061(`/hq/ggStockInfo?stockcode=${items.STOCKCODEINDEX}&marketno=${items.NEWMARKETNO}`);
      },
      /**
       * [titleFunc 涨幅排序点击]  点击三次还原  第一次降序
       * @param  {string} item 对应文字
       */
      titleFunc(item){
        this.zdClickCs++;
        if(this.zdClickCs == 1){
          this.Direction = 1;
          this.AccountIndex = '0';
          this.zfClickText = item+'↓';
        }else if(this.zdClickCs == 2){
          this.Direction = 0;
          this.AccountIndex = '0';
          this.zfClickText = item+'↑';
        }else if(this.zdClickCs == 3){
          this.zfClickText = item;
          this.Direction = '1';
          this.AccountIndex = '9';
          this.zdClickCs = 0;
        }
        tztZXstock.getZXList(this.getZXList);
      },
      getZXList(str){
        var list = str.split(',');
        var ln = list.length;
        var grid = [];
        for(var i=0;i<ln;i++){
          var arrayList = list[i].split('|');
          if(arrayList[0] == '' && arrayList[1] == '' && arrayList[2] == ''){
            continue;
          }
          grid.push(arrayList.slice(0,2).join('|'));
          console.log(grid)
        }
        if(grid.length == 0){
          this.$set('GRID',[]);
          return false;
        }
        var obj = {
          Grid:grid.join(','),
          Direction:this.Direction,//0升序1降序
          DeviceType:0,
          AccountIndex:this.AccountIndex,
          StockIndex:1,
          StartPos:0,
          NewMarketNo:0,
          MaxCount:ln
        };
        var that = this;
        service_hq_often.require60(obj)
          .then((data)=> {
            console.log(data);
          if(!data.GRID0){
            return;
          }

        console.log(tztStockType.MakeBlockIndex("4609"))
          let indexData = [];
          var newData = data.GRID0;
          var STOCKPROP = (data.STOCKPROP?data.STOCKPROP.split('|'):[]);
          var NEWMARKETNO = data.NEWMARKETNO.split('|');
          newData.shift();
          newData.forEach((items,index)=>{
            let listData = items.slice(0,-1).split('|');
            let stockArray = {};
            stockArray.STOCKCODEINDEX = listData[data.STOCKCODEINDEX];
            stockArray.NEWPRICEINDEX = listData[data.NEWPRICEINDEX];
            stockArray.UPDOWNPINDEX = listData[data.UPDOWNPINDEX];
            stockArray.STOCKNAMEINDEX = listData[data.STOCKNAMEINDEX].replace(/^\d+./g,'');
            stockArray.NEWMARKETNO = NEWMARKETNO[index];

            if(STOCKPROP[index]){
              stockArray['RZRQ'] = (STOCKPROP[index][3] == 1?true:false) || (STOCKPROP[index][4] == 1?true:false);
              stockArray['Tong'] = (STOCKPROP[index][13] == 1?true:false);
              stockArray['FXJS'] = (STOCKPROP[index][5] == 1?true:false);
              stockArray['TSZL'] = (STOCKPROP[index][6] == 1?true:false);
              stockArray['ISH'] = (STOCKPROP[index][7] == 1?true:false);
              stockArray['ISZ'] = (STOCKPROP[index][8] == 1?true:false);
              stockArray['SBGP'] = (STOCKPROP[index][9] == 'T'?true:false);
              stockArray['SBLW'] = (STOCKPROP[index][9] == 'B'?true:false);
              stockArray['SBXQ'] = (STOCKPROP[index][9] == 'O'?true:false);
              stockArray['SBXZ'] = (STOCKPROP[index][9] == 'P'?true:false);
            }
            indexData.push(stockArray);//listData
          });
          that.$set('GRID',indexData);
        });
      }
    },
    events:{

    }
	}
</script>
<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  @import "../../../assets/less/hq.less";
  .fund_table dl {
    display: table;
    width: 100%;
    border-bottom: 1px solid #cbcbcb;
    table-layout: fixed;
    position: relative;
    background: #FFF;
  }
  .fund_table .title dt {
    padding: .25rem 0;
    text-align: left;
    color: #999;
    font-size: 0.6rem;
    padding-left: 0.2rem;
  }
  .fund_table .title dd {
    display: table-cell;
    vertical-align: middle;
    padding: .25rem 0;
    text-align: right;
    color: #999;
    font-size: 0.6rem;
  }
  .fund_table .title dd .icon {
    display: inline-block;
    padding-right: 0.55rem;
  }
  .fund_table .part .rise{
    color:@color-rise;
  }
  .fund_table .part .fill{
    color:@color-fill;
  }
  .fund_table .part dt {
    text-align: left;
    line-height: 0.9rem;
    padding: 0.2rem 0;
    padding-left: 0.2rem;
  }
  .fund_table .part dd {
    font-size: 0.9rem;
  }
  .fund_table .part .block_color {
    padding-right: 0.2rem;
  }
  .fund_table dl dd, .fund_table dl dt {
    display: table-cell;
    text-align: right;
    vertical-align: middle;
  }
  .fund_table .block_color span {
    background: #aaa;
    display: inline-block;
    border-radius: 3px;
    width: 80%;
    color: #fff;
    text-align: center;
  }
  .fund_table .block_color .fill {
    background: @color-fill;
    display: inline-block;
    border-radius: 3px;
    width: 80%;
    color: #fff;
    text-align: center;
  }
  .fund_table .block_color .rise {
    background: @color-rise;
    display: inline-block;
    border-radius: 3px;
    width: 80%;
    color: #fff;
    text-align: center;
  }
  .fund_table .part dt strong {
    display: block;
    font-size: 0.7rem;
    color: #000;
    font-weight: 400;
  }
  .fund_table .part dt small {
    font-size: 0.6rem;
    color: #999;
  }
  .add{
    padding: 0.5rem 0;
    text-align: center;
    .add-cont{
      font-size:0.8rem;
      padding:0.2rem 2rem;
      border:1px dashed #ccc;
      display: inline-block;
    }
  }
  dl,dt,dd{
    margin: 0;
    padding: 0;
  }
</style>
