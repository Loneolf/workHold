<template>
  <div class="hq_main">
    <div class="top_box1">
      <div class="title">
        <h5 @click="funcHide(1)">行业板块</h5>
        <em class="xia_button {{iconButton.xia_button1}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('4661','stock','title=行业板块')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow1}}" id="lzgList">
        <dl class="part" v-for="items in industryModule" @click="list(items.STOCKCODEINDEX)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}</small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd><dd><span>{{items.LEADSTOCKNAMEINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(2)">概念板块</h5>
        <em class="xia_button {{iconButton.xia_button2}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('4662','stock','title=概念板块')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow2}}" id="lzgList">
        <dl class="part" v-for="items in conceptModule" @click="list(items.STOCKCODEINDEX)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}</small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd><dd><span>{{items.LEADSTOCKNAMEINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(3)">风格板块</h5>
        <em class="xia_button {{iconButton.xia_button3}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('4664','stock','title=风格板块')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow3}}" id="lzgList">
        <dl class="part" v-for="items in styleModule" @click="list(items.STOCKCODEINDEX)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}</small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd><dd><span>{{items.LEADSTOCKNAMEINDEX}}</span></dd>
        </dl>
      </div>

      <div class="title">
        <h5 @click="funcHide(4)">地域板块</h5>
        <em class="xia_button {{iconButton.xia_button4}}"></em>
        <a href="javascript:void(0);" class="more" @click="list('4663','stock','title=地域板块')"></a>
      </div>
      <div class="fund_table {{hideShow.hideshow4}}" id="lzgList">
        <dl class="part" v-for="items in regionModule" @click="list(items.STOCKCODEINDEX)">
          <dt><strong>{{items.STOCKNAMEINDEX}}</strong><small>{{items.STOCKCODEINDEX}}</small></dt>
          <dd><span class="{{items.UPDOWNPINDEX | isUP}}">{{items.UPDOWNPINDEX}}</span></dd><dd><span>{{items.LEADSTOCKNAMEINDEX}}</span></dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import service_hq_often from '../../service/common/service_hq_often'
  export default {
    data() {
      return {
        iconButton:{
          xia_button1:'fadeIn',
          xia_button2:'fadeIn',
          xia_button3:'fadeIn',
          xia_button4:'fadeIn'
        },
        hideShow:{
          hideshow1:'fadeIn',
          hideshow2:'fadeIn',
          hideshow3:'fadeIn',
          hideshow4:'fadeIn'
        },
        industryModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        conceptModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        styleModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ],
        regionModule:[
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'},
          {STOCKNAMEINDEX:'--',LEADSTOCKNAMEINDEX:'--',UPDOWNPINDEX:'--',STOCKCODEINDEX:'--'}
        ]
      }
    },
    ready(){
      this.getIndustryData();
      this.getConceptData();
      this.getStyleData();
      this.getRegionData();
    },
    attached(){

      this.$TZT.action10077(this);
    },
    methods: {
      dealRefreshTimer(){
        this.getIndustryData();
        this.getConceptData();
        this.getStyleData();
        this.getRegionData();
      },
      getIndustryData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'4661',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20196(oSendData)
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
                  LEADSTOCKNAMEINDEX:listData[data.LEADSTOCKNAMEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX]
                };
                indexData.push(listObj);
              }
            });
            that.$set('industryModule',indexData);
          })
      },
      getConceptData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'4662',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20196(oSendData)
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
                  LEADSTOCKNAMEINDEX:listData[data.LEADSTOCKNAMEINDEX]?listData[data.LEADSTOCKNAMEINDEX]:'--',
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX]
                };
                indexData.push(listObj);
              }
            });
            that.$set('conceptModule',indexData);
          })
      },
      getStyleData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'4664',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20196(oSendData)
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
                  LEADSTOCKNAMEINDEX:listData[data.LEADSTOCKNAMEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX]
                };
                indexData.push(listObj);
              }
            });
            that.$set('styleModule',indexData);
          })
      },
      getRegionData(){
        var that = this;
        let oSendData = {
          AccountIndex:0,
          DeviceType:0,
          Direction:1,
          Lead:1,
          MaxCount:10,
          NewMarketNo:0,
          StartPos:1,
          StockCode:'4663',
          newindex:1,
          tztshowprocess:1
        };
        service_hq_often.require20196(oSendData)
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
                  LEADSTOCKNAMEINDEX:listData[data.LEADSTOCKNAMEINDEX],
                  STOCKCODEINDEX:listData[data.STOCKCODEINDEX]
                };
                indexData.push(listObj);
              }
            });
            that.$set('regionModule',indexData);
          })
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
