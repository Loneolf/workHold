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
              <em id="jk" class="{{Open_p | colorDivide Close_p}}">{{Open_p}}</em>
              <em class="info_name">昨收</em>
              <em id="hs">{{Close_p}}</em>
            </span>
      <span class="ggscockinfo_4">
              <em class="info_name">最高</em>
              <em class="{{High_p | colorDivide Close_p}}">{{High_p}}</em>
              <em class="info_name">最低</em>
              <em class="{{Low_p | colorDivide Close_p}}">{{Low_p}}</em>
            </span>
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
        m_lUpPrice:'-.-',
        m_lUpIndex:'-.-',
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
        this.Last_p = data.Last_p;
          if(data.XFlag==2 || data.XFlag==3){//停牌标志; 2-长期停牌  3-临时停牌  其他(通常是1或0)-正常
              this.XFlag = 2;
          }else {
              this.XFlag = 1;
          }
        this.High_p = data.High_p;
        this.Open_p = data.Open_p;
        this.Low_p = data.Low_p;
        this.m_lUpPrice = data.m_lUpPrice;
        this.m_lUpIndex = data.m_lUpIndex;
        this.Close_p = data.Close_p;
      }
    }
	}
</script>
<style  lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/head.less";
  .fund_info2 .info_box .ggscockinfo_1 strong{
    font-size: 1.2rem;
  }
</style>
