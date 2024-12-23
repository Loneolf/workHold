<template>
  <div class="fund_info2" id="hs_pk" style="display: block;">
    <div class="info_box ared">
           <span class="ggscockinfo_1">
             <span class="stat"></span>
             <strong id="xj" class="{{Last_p | colorDivide Close_p}}">{{Last_p}}</strong>
             <span v-if="XFlag==2"><em >停牌</em></span>
             <span v-if="XFlag!=2" id="zd" style="margin-right: 0.4rem;" class="{{m_lUpPrice | isUP}}">{{m_lUpPrice}}</span>
             <span v-if="XFlag!=2" id="zdf" class="{{m_lUpIndex | isUP}}">{{m_lUpIndex}}</span>
           </span>
      <span class="ggscockinfo_2" style="visibility: hidden;"><a class="add" v-show="isadd" @click="zxFunc" href="javascript:void(0);" style="width: 32px; height: 60px; display: inline;"><em><img src="../../../../assets/img/TZTNavAddStock@2x.png" width="22"></em></a><a v-show="isdel" @click="zxFunc" href="javascript:void(0);" style="width: 32px; height: 60px;" class="del"><em><img src="../../../../assets/img/TZTNavDelStock@2x.png" width="22"></em></a>
      </span>
      <span class="ggscockinfo_3">
              <em class="info_name">今开</em>
              <em class="info_name">昨收</em>
            </span>
      <span class="ggscockinfo_4">
              <em class="info_name {{Open_p | colorDivide Close_p}}">{{Open_p}}</em>
              <em class="info_name {{Close_p | colorDivide Close_p}}">{{Close_p}}</em>
            </span>
    </div>
    <div class="more_box">
      <table width="100%" border="1" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
          <td>
            <span>现量</span>
            <p class="">{{Last_h}}股</p>
          </td>
          <td>
            <span>总量</span>
            <p id="np" class="">{{Total_h}}股</p>
          </td>
          <td>
            <span>均价</span>
            <p class="{{m_lAvgPrice | colorDivide Close_p}}">{{m_lAvgPrice}}</p>
          </td>
          <td>
            <span>量比</span>
            <p id="cjl">{{m_lLiangbi}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <span>最高</span>
            <p id="zg" class="{{High_p | colorDivide Close_p}}">{{High_p}}</p>
          </td>
          <td>
            <span>最低</span>
            <p id="zdi" class="{{Low_p | colorDivide Close_p}}">{{Low_p}}</p>
          </td>
          <td>
            <span>委比</span>
            <p class="{{m_nWB | isUP}}">{{m_nWB}}</p>
          </td>
          <td>
            <span>委差</span>
            <p class="{{m_nWC | isUP}}">{{m_nWC}}股</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import util from '../../../../util/util';
  import tztZXstock from '../../scripts/tztZXstock';
	export default {
		data() {
		  return {
        Last_p:'-.-',
        High_p:'-.-',
        Open_p:'-.-',
        Low_p:'-.-',
        Total_h:'-.-',
        Total_m:'-.-',
        m_nWB:'-.-',
        m_nWC:'-.-',
        m_lAvgPrice:'-.-',
        m_lUpPrice:'-.-',
        m_lUpIndex:'-.-',
        m_lLiangbi:'-.-',
        Last_h:'-.-',
        Close_p:'-.-',
        isadd:true,
        isdel:false,
        stockcode:'',
        stockname:'',
        XFlag:'',  //停牌标识
        markettype:''
			}
		},
    attached(){
      this.getZX();
    },
    methods:{
      zxFunc(){
        if(this.stockname == ''){
          return;
        }
        if(this.isdel){
          tztZXstock.delZXList(this.stockcode);
          this.isadd = true;
          this.isdel = false;
        }else {
          tztZXstock.setZXList(this.stockcode,this.markettype,this.stockname);
          this.isadd = false;
          this.isdel = true;
        }
      },
      getZX(){
        this.stockcode = this.$route.query.stockcode;
        this.markettype = this.$route.query.marketno;
        var that = this;
        tztZXstock.getZXList(function (array) {
          if(!array){
            that.isadd = true;
            that.isdel = false;
          }else {
            if(array.indexOf(that.stockcode)>-1){
              that.isadd = false;
              that.isdel = true;
            }else {
              that.isadd = true;
              that.isdel = false;
            }
          }
        });
      }
    },
    events:{
      'parent-minStockInfo':function (data) {
        console.log(data);
        this.stockname = data.Name;
        if(data.XFlag==2 || data.XFlag==3){//停牌标志; 2-长期停牌  3-临时停牌  其他(通常是1或0)-正常
          this.XFlag = 2;
        }else {
          this.XFlag = 1;
        }
        this.Last_p = data.Last_p;
        this.High_p = data.High_p;
        this.Open_p = data.Open_p;
        this.Total_h = util.numTosize(data.Total_h);
        this.Low_p = data.Low_p;
        this.Total_m = util.numTosize(data.Total_m);
        this.m_nWB = data.m_nWB;
        this.m_lAvgPrice = data.m_lAvgPrice;
        this.m_nWC = util.numTosize(data.m_nWC);
        this.m_lUpPrice = data.m_lUpPrice;
        this.m_lUpIndex = data.m_lUpIndex;
        this.m_lLiangbi = data.m_lLiangbi;
        if(data.StockData){
          this.Last_h = util.numTosize(data.StockData.Last_h);
        }
        this.Close_p = data.Close_p;
      }
    }
	}
</script>
<style  lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/head.less";
  .fund_info2 .info_box .ggscockinfo_3 .info_name, .fund_info2 .info_box .ggscockinfo_4 .info_name{
    padding-top: 1rem;
  }
</style>
