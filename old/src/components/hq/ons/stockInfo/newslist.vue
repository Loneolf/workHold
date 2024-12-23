<template>
  <div class="zxin-box">
    <ul class="zxin-main">
      <!--<p class="loadInfo">正在奋力加载中…</p>-->
      <li class="zxin-list" v-for="item in lzgModule" @click="listFunc(item)">
        <h4 class="zxin-title">{{item.title}}</h4>
        <p class="zxin-time">{{item.time | date 2}}</p>
      </li>
    </ul>
    <p class="zxin-more" v-show="isMore" @click="action10061"><a href="javascript:;" class="zxin-btn">点击查看更多…</a></p>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import service_information_often from '../../../information/service/common/service_information_often'
  import tztStockType from '../../../hq/scripts/tztStockType.js';
  export default {
    data() {
      return {
        stockcode:'',
        menuid:'',
        lzgModule:[

        ],
        isMore:false
      }
    },
    attached(){
      this.lzgModule = [];
      this.isMore = false;
    },
    methods: {
      getData(){
        var that = this;
        let oSendData = {
          menu_id:that.menuid,
          MaxCount:5,
          npage:1,
          StockCode: this.stockcode.replace("H","")
        };
        service_information_often.require46116(oSendData)
          .then((data)=> {
            console.log(data);
            if(!data.GRID0){
              return;
            }
            if(data.GRID0.length>=oSendData.MaxCount){
              that.isMore = true;
            }
            let indexData = [];
            data.GRID0.forEach((items,index)=>{
              let listData = items.split('|');
              let listObj = {
                title:listData[data.INFOTITLEINDEX],
                time:listData[data.DATESINDEX],
                id:listData[data.IDINDEX]
              };
              indexData.push(listObj);
            });
            that.$set('lzgModule',indexData);
          })
      },
      listFunc(items){
        this.$TZT.action10061(`/hq/zxInfo?id=${items.id}&menuid=${this.menuid}&stockcode=${this.stockcode}`);
      },
      action10061(){
        this.$TZT.action10061(`/hq/newlists?stockcode=${this.stockcode}&menuid=${this.menuid}`);
      }
    },
    events:{
      'parent-newslist':function (menuid) {
        this.stockcode = this.$route.query.stockcode;
        this.menuid = menuid;
        this.getData();
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .zxin-main {
    width: 100%;
    min-height: 9.5rem;
  .zxin-list {
    padding: 0.6rem 4.25rem 0.6rem 0.25rem;
    position: relative;
  .hairline(bottom,@color-split);
  .zxin-title {
    width: 100%;
    font-size: 0.7rem;
    font-weight: normal;
    line-height: 0.7rem;
    color: @color-bg;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .zxin-time {
    margin: -0.3rem 0 0;
    font-size: 0.6rem;
    text-align: right;
    line-height: 0.6rem;
    color: #8a8d92;
    position: absolute;
    right: 0.25rem;
    top: 50%;
  }
  }
  }
  .zxin-more {
    text-align: center;
  .zxin-btn {
    padding: 0.6rem;
    font-size: 0.6rem;
    line-height: 0.6rem;
    display: inline-block;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: @color-link;
  }
  }

  .clearfix:after {
    clear: both;
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }
  li, ol, ul ,h4{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
