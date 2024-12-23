<template>
  <div class="hq_main">
    <div class="top_box1">
      <div class="title">
        <h5 @click="funcHide(1)">全球指数</h5>
        <em class="xia_button {{iconButton.xia_button1}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('全球指数','stock','title=全球指数')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow1}}" id="lzgList">
        <dl class="part" v-for="items in globalModule" @click="ggStockInfo(items.STOCKCODEINDEX,items.NEWMARKETNO)">
          <dt class="{{items.classs}}"><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}</small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.NEWPRICEINDEX}}</span></dd><dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import service_hq_often from '../../service/common/service_hq_often'
  import config from '../../scripts/config'
  export default {
    data() {
      return {
        iconButton:{
          xia_button1:'fadeIn'
        },
        hideShow:{
          hideshow1:'fadeIn'
        },
        globalModule:[
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',NEWPRICEINDEX:'--',STOCKCODEINDEX:'--'}
        ]
      }
    },
    ready(){
      this.getGlobalData();
    },
    attached(){
      this.$TZT.action10077(this);
    },
    methods: {
      dealRefreshTimer(){
        this.getGlobalData();
      },
      getGlobalData(){
        var that = this;
        let oSendData = {
          AccountIndex:9,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'全球指数',
          newindex:1,
          tztshowprocess:0
        };
        service_hq_often.require20192(oSendData)
          .then((data)=> {
            console.log(data);
            if(!data.GRID0){
              return;
            }
            let indexData = [];
            let NEWMARKETNO = data.NEWMARKETNO;
            if(NEWMARKETNO){
              NEWMARKETNO = NEWMARKETNO.split('|')
            }else {
              NEWMARKETNO = [];
            }
            data.GRID0.forEach((items,index)=>{
              if(index > 0){
                let listData = items.split('|');
                let listObj = {
                  STOCKNAMEINDEX:listData[data.STOCKNAMEINDEX].replace(/^\d+./g,''),
                  UPDOWNPINDEX:listData[data.UPDOWNPINDEX],
                  NEWPRICEINDEX:listData[data.NEWPRICEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX],
                  NEWMARKETNO:NEWMARKETNO[index-1]
                };
                for(var n in config.nationalFlag){
                  if(config.nationalFlag[n].indexOf(listObj['STOCKCODEINDEX'])>-1){
                    listObj.classs = n;
                  }
                }
                indexData.push(listObj);
              }
            });
            that.$set('globalModule',indexData);
          })
      },
      ggStockInfo(stock,marketno){
        this.$router.go(`/hq/ggStockInfo?stockcode=${stock}&marketno=${marketno}`);
      },
      list(stock,key,parame){
        let keys = key || 'stockcode';
        let para = '';
        if(parame){
          para = '&'+parame;
        }
        this.$router.go(`/hq/list?${keys}=${stock}${para}`);
      },
      funcHide(index){
        var vl = this.hideShow['hideshow'+index];
        if(vl == 'fadeIn'){
          this.hideShow['hideshow'+index] = 'fadeOut';
          this.iconButton['xia_button'+index] = 'fadeOut';
        }else {
          this.hideShow['hideshow'+index] = 'fadeIn';
          this.iconButton['xia_button'+index] = 'fadeIn';
        }
      }
    },
    events:{

    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/hq.less";
</style>
