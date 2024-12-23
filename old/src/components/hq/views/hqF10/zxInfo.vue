<template>
  <div class="marginbalance content">
    <div class="head">
      <h1 class="title">{{TITLE}}</h1>
      <p class="descr"><span class="origin">{{MEDIA}}</span><span class="time">{{DATES | date}} {{TIME}}</span><span v-if="URL" class="pdf"><a href="{{{URL}}}" target="_blank">PDF</a></span></p>
    </div>
    <div class="cont"> {{{cont}}}</div>
  </div>
</template>

<script>
  import utils from '../../../../util/util'
  import service_hqF10 from '../../../information/service/hq/service_hqF10'
  import tztStockType from '../../../hq/scripts/tztStockType.js';
  export default {
    data () {
      return {
        TITLE:'',
        MEDIA:'',
        DATES:'',
        TIME:'',
        URL:'',
        menuid:'',
        sId:'',
        cont:'',
        stockcodetype:'',
        stockcode:''//this.$route.query.stockcode
      }
    },
    ready(){
//    this.getCustomers();
    },
    attached(){
//    $.init();
      this.cont = '';
      this.TITLE = '';
      this.MEDIA = '';
      this.DATES = '';
      this.TIME = '';
      this.URL = '';
      this.inits();
    },
    methods:{
      inits(){
        this.stockcodetype = this.$route.query.stockcodetype;
        this.stockcode = this.$route.query.stockcode;
        this.menuid = this.$route.query.menuid;
        this.sId = this.$route.query.id;
        var title = '';
        switch (this.menuid){
          case '30001':
            title = '经济要闻';
            break;
          case '30002':
            title = '自选股自选';
            break;
          case '30003':
            title = '研报资讯';
            break;
          case '30004':
            title = '港股市场';
            break;
          case '30005':
            title = '海外市场';
            break;
          case '20001':
            title = '新闻';
            break;
          case '20002':
            title = '公告';
            break;
          case '20003':
            title = '研报';
            break;
          case '30000':
            title = '今日要闻';
            break;
        }
        this.$route.router.app.title = title;
        this.getCustomers();
      },
      getCustomers(){
        var that = this;//
        var action = 'require46102';
        var obj = {
          id:that.sId
        };
        if(this.stockcode.indexOf('H')>=0 && that.menuid === '20002'){
          action = 'require46115';
        }
        if(that.menuid === '30000'){
          action = 'require44080';
        }else {
          obj.menu_id = that.menuid;
        }
        service_hqF10[action](obj)
        .then((oData)=>{

          if(this.stockcode.indexOf('H')>=0 && that.menuid === '20002'){
          that.MEDIA = oData.MEDIA;
          that.TITLE = oData.INFOTITLE;
          that.DATES = oData.INFOPUBLDATE;
          that.URL = oData.URL;
          that.cont  = oData.CONTENT;
          }else{
            that.MEDIA = oData.MEDIA;
            that.TITLE = oData.TITLE;
            that.DATES = oData.DATES;
            that.TIME  = oData.TIME;
            if(oData.GRID0){
              for(var i=0;i<oData.GRID0.length;i++){
                oData.GRID0[i] = oData.GRID0[i].replace(/\http\:\/\/stock\:/g,'/index2.html#!/hq/ggStockInfo?stockcode=').replace("\r\n", "</br>").replace("　　", "");
              }
            }
            that.cont  ='<p>' +oData.GRID0.join('</p><p>')+'</p>';
          }

          console.log(oData);
        })
      },
      stockFunc(){
        console.log(0);
      }
    },
    filters:{
      filunit(vaule,num){
        return utils.fmtunit(vaule,num);
      },
      date(value){
        return value.replace(/^(\d{4})(\d{2})(\d{2})$/i,'$1-$2-$3');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .head{
    padding: 0.5rem;
    .title{
      margin: 0;
      line-height: 1rem;
      font-size: 0.8rem;
    }
    .descr{
      position: relative;
      .hairline(bottom,#c8c8c8);
      padding: 0.4rem 0;
      font-size: 0.7rem;
      .origin{
        display: inline-block;
        width: 30%;
      }
      .time{
        display: inline-block;
        width: 50%;
        text-align: right;
      }
      .pdf{
        display: inline-block;
        width: 20%;
        text-align:center;
        color: #213dd0;
      }
    }
  }
  .cont{
    padding: 0 0.5rem;
    font-size: 0.7rem;
    p{
      text-indent: 1rem;
    }
  }
</style>
