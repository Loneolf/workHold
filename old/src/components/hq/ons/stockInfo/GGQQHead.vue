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
      <span class="ggscockinfo_2"><a class="add" v-show="isadd" @click="zxFunc" href="javascript:void(0);" style="width: 32px; height: 60px; display: inline;"><em><img src="../../../../assets/img/TZTNavAddStock@2x.png" width="22"></em></a><a v-show="isdel" @click="zxFunc" href="javascript:void(0);" style="width: 32px; height: 60px;" class="del"><em><img src="../../../../assets/img/TZTNavDelStock@2x.png" width="22"></em></a>
      </span>
      <span class="ggscockinfo_3">
              <em class="info_name">行权方式</em>
              <em>{{m_OptionType}}</em>
              <em class="info_name">期权种类</em>
              <em>{{m_OptionKind}}</em>
            </span>
      <span class="ggscockinfo_4">
              <em class="info_name">行权价格</em>
              <em id="bk" class="{{m_lBlockUpIndex | isUP}}">{{m_OptionXQPrice}}</em>
              <em class="info_name">持仓</em>
              <em id="cje">{{m_OptionChiCang}}</em>
            </span>
    </div>
    <div class="more_box">
      <table width="100%" border="1" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
          <td>
            <span>总手</span>
            <p>{{Total_h}}</p>
          </td>
          <td>
            <span>现手</span>
            <p id="np" class="">{{Last_h}}</p>
          </td>
          <td>
            <span>最高</span>
            <p id="zg" class="{{High_p | colorDivide Close_p}}">{{High_p}}</p>
          </td>
          <td>
            <span>最低</span>
            <p id="zdi" class="{{Low_p | colorDivide Close_p}}">{{Low_p}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <span>杠杆比率</span>
            <p>{{m_OptionGGBL}}</p>
          </td>
          <td>
            <span>内在价值</span>
            <p class="{{m_OptionNZJZ | colorDivide Close_p}}">{{m_OptionNZJZ}}</p>
          </td>
          <td>
            <span>时间价值</span>
            <p class="{{m_OptionSJJZ | colorDivide Close_p}}">{{m_OptionSJJZ}}</p>
          </td>
          <td>
            <span>溢价率</span>
            <p>{{m_OptionYJL}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <span>合约单位</span>
            <p>{{m_OptionUnit}}</p>
          </td>
          <td>
            <span>隐含波动率</span>
            <p>{{m_OptionBDL}}</p>
          </td>
          <td>
            <span>Delta</span>
            <p>{{m_OptionDelta}}</p>
          </td>
          <td>
            <span>Gamma</span>
            <p>{{m_OptionGamma}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <span>Rho</span>
            <p>{{m_OptionRho}}</p>
          </td>
          <td>
            <span>Theta</span>
            <p>{{m_OptionTheta}}</p>
          </td>
          <td>
            <span>Vega</span>
            <p>{{m_OptionVega}}</p>
          </td>
          <td>

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
        m_lUpPrice:'-.-',
        m_lUpIndex:'-.-',
        Close_p:'-.-',
        m_OptionType:'-.-',
        m_OptionKind:'-.-',
        m_OptionXQPrice:'-.-',
        m_OptionChiCang:'-.-',
        Total_h:'-.-',
        Last_h:'-.-',
        m_OptionGGBL:'-.-',
        m_OptionNZJZ:'-.-',
        m_OptionSJJZ:'-.-',
        m_OptionYJL:'-.-',
        m_OptionUnit:'-.-',
        m_OptionBDL:'-.-',
        m_OptionDelta:'-.-',
        m_OptionGamma:'-.-',
        m_OptionRho:'-.-',
        m_OptionTheta:'-.-',
        m_OptionVega:'-.-',
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
        this.m_OptionChiCang = util.numTosize(data.m_OptionChiCang);
        this.m_lUpPrice = data.m_lUpPrice;
        this.m_lUpIndex = data.m_lUpIndex;
        this.Close_p = data.Close_p;
        if(data.m_OptionType == 'E'){
          this.m_OptionType='欧式期权';
        }
        if(data.m_OptionType == 'A'){
          this.m_OptionType='美式期权';
        }
        if(data.m_OptionKind == 'C'){
          this.m_OptionKind='认购期权';
        }
        if(data.m_OptionKind == 'P'){
          this.m_OptionKind='认沽期权';
        }
        this.m_OptionXQPrice = util.toDecimal2(data.m_OptionXQPrice/10000,4);
        if(data.StockData){
          this.Last_h = data.StockData.Last_h;
        }
        this.m_OptionGGBL = util.toDecimal2(data.m_OptionGGBL/100,2)+'%';
        this.m_OptionNZJZ = util.toDecimal2(data.m_OptionNZJZ/10000,4);
        this.m_OptionSJJZ = util.toDecimal2(data.m_OptionSJJZ/10000,4);
        this.m_OptionYJL = util.toDecimal2(data.m_OptionYJL/100,2)+'%';
        this.m_OptionUnit = data.m_OptionUnit;
        this.m_OptionBDL = util.toDecimal2(data.m_OptionBDL/100,2)+'%';
        this.m_OptionDelta = util.toDecimal2(data.m_OptionDelta/10000,4);
        this.m_OptionGamma = util.toDecimal2(data.m_OptionGamma/10000,4);
        this.m_OptionRho = util.toDecimal2(data.m_OptionRho/10000,4);
        this.m_OptionTheta = util.toDecimal2(data.m_OptionTheta/10000,4);
        this.m_OptionVega = util.toDecimal2(data.m_OptionVega/10000,4);
      }
    }
	}
</script>
<style  lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/head.less";
</style>
