<template>
  <div class="explain content native-scroll">
    <div class="buttons-tab fixed-tab buttons-fixed" data-offset="44">
      <a href="#tab1" class="tab-link button active"><span class="active">沪市(10万起)</span></a>
      <a href="#tab2" class="tab-link button"><span class="">深市(1千起)</span></a>
    </div>
    <div class="tabs">
      <div id="tab1" class="tab content infinite-scroll active">
        <div class="explain-ul">
          <table>
            <tr><th>品种</th><th>年收益率</th><th>每万元收益(元)</th><th>10万元收益(元)</th></tr>
            <tr v-for="item in gridSH" @click="listFunc(item)"><td><p>{{item.name}}</p><p class="gray">{{item.STOCKCODEINDEX}}</p></td><td class="">{{item.yearsyl}}</td><td class="">{{item.dsyl}}</td><td class="red">{{item.sy}}</td></tr>
          </table>
        </div>
      </div>
      <div id="tab2" class="tab content infinite-scroll">
        <div class="explain-ul">
          <table>
            <tr><th>品种</th><th>年收益率</th><th>每万元收益(元)</th><th>10万元收益(元)</th></tr>
            <tr v-for="item in gridSZ" @click="listFunc(item)"><td><p>{{item.name}}</p><p class="gray">{{item.STOCKCODEINDEX}}</p></td><td class="">{{item.yearsyl}}</td><td class="">{{item.dsyl}}</td><td class="red">{{item.sy}}</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../../../util/util'
  import repoconfig from '../../scripts/repoconfig'
  import service_hq_often from '../../../hq/service/common/service_hq_often'
  export default {
    data(){
      return {
        gridSH:[],
        gridSZ:[],
        INDEX:['STOCKNAMEINDEX','NEWPRICEINDEX','STOCKCODEINDEX']
      }
    },
    ready(){

    },
    attached(){
      this.$TZT.action10077(this);
      this.getCustomers();
    },
    methods:{
      dealRefreshTimer(){
        this.getCustomers();
      },
      getCustomers(){
        var that = this;
        var INDEX = that.INDEX;
        var obj = {
          StartPos     :1,
          MaxCount     :100,
          stockcode    :'国债逆回购',
          accountIndex :0,
          deviceType   :0,
          Direction    :1,
          lead         :1,
          NewMarketNo  :0
        };
        service_hq_often.require20192(obj)
          .then((oData)=>{
            var objSZ = [],objSH = [],objAll = {};
            oData.GRID0.forEach((item) =>{
              var listItem = item.split('|');
              var listobj = {};
              INDEX.forEach((value)=>{
                if(oData[value]){
                  listobj[value] = listItem[oData[value]]
                }
              });
              var day = repoconfig.repoData[listobj.STOCKCODEINDEX];
              listobj.name    = repoconfig.repoData[listobj.STOCKCODEINDEX]+'天期';
              listobj.yearsyl = listobj.NEWPRICEINDEX+'%';
              listobj.sy      = utils.toDecimal2(listobj.NEWPRICEINDEX/100*100000/365*day,4);
              listobj.dsyl    = utils.toDecimal2(listobj.sy/10,4);
              listobj.sType   = listobj.STOCKCODEINDEX.substr(0,3);

              objAll[listobj.STOCKCODEINDEX] = listobj;
              /*var sType = listobj.STOCKCODEINDEX.substr(0,3);
               if(sType === '204'){
               objSH.push(listobj);
               }else if(sType === '131'){
               objSZ.push(listobj);
               }*/
            });
            repoconfig.repoSZ.forEach((value)=>{
              if(objAll[value]){
                objSZ.push(objAll[value]);
              }
            });
            repoconfig.repoSH.forEach((value)=>{
              if(objAll[value]){
                objSH.push(objAll[value]);
              }
            });
            that.$set('gridSH',objSH);
            that.$set('gridSZ',objSZ);
          })
      },
      listFunc(item){
        this.$TZT.action10061(`/deal/reverseRepo/repoLending?stockcode=${item.STOCKCODEINDEX}`);
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .tabs .tab {
    display: none;
  }
  .tabs .tab.active {
    display: block;
    padding:2rem 0 0;
  }
  .explain{
  /*.native-data{padding:2rem 0.5rem 0;}*/
  .title{
    padding: 0 0.75rem;
    margin: 0;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 1.6rem;
    position: relative;
  .hairline(bottom,@color-split);
  .hairline(top,@color-split);
  span{
    display: inline-block;
  }
  :nth-child(1){
    width: 50%;
  }
  :nth-child(2){
    width: 50%;
    text-align: right;
  }
  }
  .button span{
    display: inline-block;
  }
  .buttons-tab .button.active span{
    color: @color-primary;
    z-index: 100;
    border: 0;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    border-color: @color-primary;
    height: 2rem;
  }
  .native-data{
  table{
    width: 100%;
  :last-child{
    border-bottom:none;
  }
  }
  tr{
    list-style: none;
    font-size: 0.7rem;
    display:block;
    position: relative;
  .hairline(bottom,@color-split);
  td,th{
    display: inline-block;
    padding: 0.5rem 0;
    text-align: left;

  }
  :nth-child(1){
    width: 40%;
  }
  :nth-child(2){
    width: 20%;
    vertical-align: middle;
  }
  :nth-child(3){
    width: 20%;
    vertical-align: middle;
  }
  :nth-child(4){
    width: 20%;
    vertical-align: middle;
  }
  }
  }
  .explain-ul{
  table{
    width: 100%;
  }
  table tr{
    width: 100%;
    padding:0 0.5rem;
    display:inline-block;
    border-bottom: 1px solid #ddd;
  th{font-size: 0.5rem;font-weight: normal;}
  td,th{
    display: inline-block;
    padding: 0.2rem 0;
    text-align: left;
    width: 25%;
    vertical-align: middle;
    font-weight: 500;
  }
  td:nth-child(4){
    text-align: right;
  }
  th:nth-child(1){
    width: 18%;
  }
  th:nth-child(2){
    width: 22%;
    text-align: center;
  }
  th:nth-child(3){
    width: 32%;
    text-align: center;
  }
  th:nth-child(4){
    width: 28%;
    text-align: right;
  }
  }
  }
  }

  .tab .more_title{
    line-height: 1.9rem;
    margin: 0;
    font-size: 0.8rem;
    font-weight: normal;
  span{width:50%;display:inline-block;}
  }
  .tab .more_text{
    color: @color-text-secondary;
    text-align: right;
  }
  .red{
    color: #ec2f1f;
  }
  .gray{
    font-size:0.7rem;
    color: @color-text-secondary;
  }
</style>
