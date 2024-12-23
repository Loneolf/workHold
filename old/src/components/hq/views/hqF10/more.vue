<template>
  <div class="more content">
    <h2 class="more_title" v-show="isMoreTitle"><span>所属板块</span><span class="more_text" @click="moreFunc">更多>></span></h2>
    <div class="more_cont">
      <span v-for="item in plates" v-on:click="clickdata($index)" class="plate-item"><span>{{item.STOCKNAMEINDEX}}</span><span :class="item.UPDOWNPINDEX.indexOf('-')>-1?'fill':'rise'">{{item.UPDOWNPINDEX}}</span></span>
    </div>
  </div>
</template>

<script>
  import service_hq_other from '../../service/other/service_hq_other'
  export default {
    data () {
      return {
        plates: [],
        INDEX:[
          'UPDOWNPINDEX',//涨幅
          'STOCKNAMEINDEX',//股票名称
          'STOCKCODEINDEX'//股票代码
        ],
        stockcode:this.$route.query.stockcode,
        MaxCount:8,
        isMoreTitle:true
      }
    },
    attached(){
      $.init();
      this.plates = [];
      this.stockcode = this.$route.query.stockcode;
      this.MaxCount = this.$route.query.MaxCount || 8;
      if(this.$route.query.MaxCount){
        this.isMoreTitle = false;
      }else {
        this.isMoreTitle = true;
      }
      this.getCustomers();
    },
    methods:{
      getCustomers(){
        var that = this;
        var INDEX = that.INDEX;
        var objQuery = {
          stockcode:that.stockcode,
          StartPos:1,
          MaxCount:that.MaxCount,
          NEEDCHECK:'32|4|1|'
        };
        service_hq_other.require20604(objQuery)
          .then((oData)=>{
            var obj = [];
            if(oData.GRID0 && oData.GRID0.length>1){
              oData.GRID0.shift();
            }else{
              return false;
            }
            oData.GRID0.forEach((item) =>{
              var listItem = item.split('|');
              var listobj = {};

              // console.log(INDEX);
              INDEX.forEach((value)=>{
                if(oData[value]){
                  listobj[value] = listItem[oData[value]]
                }
              });
              obj.push(listobj);
            })
            that.$set('plates',obj);
          })
      },
      clickdata(index){
        var itemObj = this.plates[index];
//        this.$TZT.action10002();
        this.$TZT.action10084({stockcode:itemObj.STOCKCODEINDEX.split('.')[1],stockname:itemObj.STOCKNAMEINDEX});
      },
      moreFunc(){
        this.$TZT.action10061('/hq/more?stockcode='+this.stockcode+'&MaxCount=100');
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
    line-height: 1.6rem;
    text-align: center;
    border:@border-default;
    margin-bottom: 0.75rem;
    margin-right: 2%;
    white-space: nowrap;
    font-size:0.8rem;
  .rise{color:@color-rise;margin-left: 0.5rem;}
  .fill{color:@color-fill;margin-left: 0.5rem;}
  }
  .plate-item:nth-child(2n){
    margin-left: 2%;
    margin-right:0;
  }
  .more{
    font-size: 0.8rem;padding: 0 15px;
    .more_title{
      padding-top: 0.4rem;
      line-height: 1rem;
      margin: 0;
      font-size: 0.7rem;
      font-weight: normal;
    span{width:50%;display:inline-block;}
  }
  .more_text{
    color: @color-text-secondary;
    text-align: right;
  }
  .more_cont{
    font-size:0;
    min-height: 9.8rem;
    padding-top: 0.5rem;
  }
  }
</style>
