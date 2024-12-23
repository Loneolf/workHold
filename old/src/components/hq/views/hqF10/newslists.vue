<template>
  <div class="content native-scroll" v-infinite-scroll="getData">
    <div class="zxin-box">
      <ul class="zxin-main">
        <!--<p class="loadInfo">正在奋力加载中…</p>-->
        <li class="zxin-list" v-for="item in lzgModule" @click="listFunc(item)">
          <h4 class="zxin-title">{{item.title}}</h4>
          <p class="zxin-time">{{item.time | date 2}}</p>
        </li>
        <div class="infinite-scroll-preloader" v-show="isInfinite">
          <div class="preloader"></div>
        </div>
      </ul>
    </div>
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
        isLoading:false,
        npage:0,
        isInfinite:true
      }
    },
    attached(){
      this.stockcode = this.$route.query.stockcode;
      this.menuid = this.$route.query.menuid;
      this.lzgModule = [];
      this.isLoading = false;
      this.isInfinite = true;
      this.npage = 0;
      this.getData();
    },
    methods: {
      getData(){
        var that = this;
        if(that.isLoading){
          return;
        }
        this.npage++;
        that.isLoading = true;
        let oSendData = {
          menu_id:that.menuid,
          MaxCount:20,
          npage:this.npage,
          StockCode:this.stockcode.replace("H","")
        };
        service_information_often.require46116(oSendData)
          .then((data)=> {
            that.isLoading = false;
            console.log(data);
            if(!data.GRID0){
              that.isInfinite = false;
              return;
            }
            if(data.GRID0.length>=oSendData.MaxCount){
              that.isInfinite = true;
            }else {
              that.isInfinite = false;
            }
            let indexData = [].concat(that.lzgModule);
            if(oSendData.npage == 1){
              indexData = [];
            }
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
