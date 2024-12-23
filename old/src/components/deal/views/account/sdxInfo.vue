<!-- 适当性页面 -->
<template>
  <div class="sdxInfo_main" v-show="sdfMainFlag">
    <div class="sdx_title">基本信息</div>
    <div class="sdx_cont">
      <div class="tjCont">
          <ul>
            <li :class="idCardClass" id="j_idCard" :style="idCardShow">
              <em></em>
              <p class="li_cont">
                <span class="li_title">身份证是否过期</span>
                <span class="li_fzText">到期时间：<i id="j_expireDate">--</i></span>
              </p>
              <!--<a class="li_btn" href="tel:4008888128">联系客服</a>-->
            </li>
            <li :class="userInfoClass" id="j_userInfo" :style="userInfoShow">
              <em></em>
              <span class="li_title">用户信息是否完善</span>
              <span class="li_fzText" id="j_userText">信息已完善</span>
              <a class="li_btn" @click.stop="wsInfoEvent">完善信息</a>
            </li>
            <li :class="riskClass" id="j_risk" :style="riskShow">
              <em></em>
              <span class="li_title">风险测评是否过期/最新</span>
              <span class="li_fzText">到期时间：<i id="j_riskDate">--</i></span>
              <a class="li_btn" @click.stop="riskEvent">前往测评</a>
            </li>
          </ul>
          <em class="sLine" :style="slineStyle"></em>
        </div>
    </div>
    <div class="sdx_footer">
      <span class="btn" @click.stop="goEnterEvent">确定</span>
    </div>
  </div>
</template>

<script>
  // import localService from '../../../../services/localService'
  // import util from '../../../../util/util'
  // import service_deal_often from '../../service/common/service_deal_often'
  // import service_config from '../../service/common/service_config'
  // import validatorUtil from '../../../../util/validatorUtil'
  // import endecryptUtil from '../../../../util/endecrypt/endecryptUtil'
  export default{
    data(){
      return {
        sdfMainFlag:false, //隐藏
        oLocal:{},
        slineStyle:'',
        idCardClass:'',
        idCardShow:'display:none;',
        userInfoClass:'yes',
        userInfoShow:'display:block;',
        riskClass:'',
        riskShow:'display:none;',
        sTransmitType:'h5',
        sTokenType:'0',
      }
    },
    attached(){
      this.clearData();
    },
    detached(){ //销毁函数
      this.clearData();
    },
    methods: {
      inits(oTemp){
        let oLocal = this.oLocal,
            oDom = {
              j_idCard:$('#j_idCard'),
              j_userInfo:$('#j_userInfo'),
              j_risk:$('#j_risk'),
              j_risk_four:$('#j_risk_four'),
              j_dzqm:$('#j_dzqm'),
              j_riskDate:$('#j_riskDate'),
              j_userText:$('#j_userText'),
            };
        !!oTemp?(oLocal=oTemp):'';
        var nTempCount = 0;
        if(oLocal.ORGANPROPFLAG == '0'){
          this.idCardShow = 'display:block;'
          if(oLocal.IDNO.length<18 || oLocal.ISIDEXPIRED == '1'){
            this.idCardClass = ''; //no
            oDom.j_idCard.find('.li_fzText').html((oLocal.IDNO.length<18?'您的身份证不足18位，请前往营业厅进行升位':'您的身份证已过期，请前往营业厅进行更新'));
          }else{
            this.idCardClass = 'yes'; //yes
            oDom.j_idCard.find('.li_fzText').html('到期时间：<i>'+(!!oLocal.IDEXPIREDATE?oLocal.IDEXPIREDATE.replace(/([\d]{4})([\d]{2})([\d]{2})/g,'$1-$2-$3'):'')+'</i>');
          }
          nTempCount++;
        }else{
          this.idCardShow = 'display:none;'
        }
        var sStrFlag = '';
        if(oLocal.ISPERSONALINFOCOMPLETED){
          sStrFlag = this.analysisInfo(oLocal.ISPERSONALINFOCOMPLETED)
        }
        if(!!sStrFlag || !oLocal.ISPERSONALINFOCOMPLETED || oLocal.ISPERSONALINFOCOMPLETED.indexOf('0')>= 0){
          this.userInfoClass = '';
           if(oLocal.ORGANPROPFLAG === '1'){
              oDom.j_userInfo.addClass('noBtn');
              oDom.j_userText.html("您的用户信息不完善，请您至营业部完善信息。");
           }else{
              oDom.j_userInfo.removeClass('noBtn');
              oDom.j_userText.html("您的用户信息不完善，请您完善信息");
           }
        }else{
          this.userInfoClass = 'yes';
          oDom.j_userText.html("信息已完善");
        }
        nTempCount++;
        if(!!oLocal.ISPROFESSIONALINVESTOR&&decodeURIComponent(oLocal.ISPROFESSIONALINVESTOR)!= '1'){
          this.riskShow = 'display:block;';
          if(oLocal.ISRISKEVALUATIONCOMPLETED == '0'){ 
            this.riskClass = '';
            var sStr = '未完成风险测评/风险测评已过期';
            oDom.j_risk.find('.li_fzText').html(sStr);
          }else{
            this.riskClass = 'yes';
            oDom.j_risk.find('.li_fzText').html('到期时间：<i>'+(!!oLocal.RISKEVALUATIONENDDATE?oLocal.RISKEVALUATIONENDDATE.replace(/([\d]{4})([\d]{2})([\d]{2})/g,'$1-$2-$3'):'')+'</i>');
          }
          nTempCount++;
        }else{
          this.riskShow = 'display:none;';
        }
        let _self = this;
        this.$nextTick(function () {
          let nHeight = $('.tjCont ul li[style="display: block;"]:last-child').outerHeight(true);
          _self.slineStyle = 'bottom:'+(nHeight-25)+'px;';
        })
      },
      yesOrNoShow(oTemp,type){
          if(type == 'no'){
            oTemp.removeClass('yes');
          }else if(type == 'yes'){
            oTemp.addClass('yes');
          }
      },
      /*@作用 解析个人信息不完善情况
      *@param  perInfoCom 个人信息情况
      *1.姓名、2.性别、3.出生日期、4.国籍、5.实际控制投资者的自然人姓名、6.实际控制投资者的自然人手机号、7.交易的实际受益人姓名、8.交易的实际受益人手机号、9.职业、10.工作单位、11.职务、12.学历、13.诚信记录、14.身份证件类型、15.身份证号、16.证件有效期、17.固定电话、18.手机号码、19.联系地址、20.邮政编码、21.Email、22.本人是否实际受益人 、23.受益人情况、24.本人是否实际控制人、25.控制人情况、26.资质、27.办公地址、28.注册地址
      */
      analysisInfo(perInfoCom){
        var aText = ['姓名','性别','出生日期','国籍','实际控制投资者的自然人姓名','实际控制投资者的自然人手机号','交易的实际受益人姓名','交易的实际受益人手机号','职业','工作单位','职务','学历','诚信记录','身份证件类型','身份证号','证件有效期','固定电话','手机号码','联系地址','邮政编码','Email','本人是否实际受益人','受益人情况','本人是否实际控制人','控制人情况','资质','办公地址','注册地址'],aJson=[];
        for(var i=0,len=perInfoCom.length;i<len;i++){
          var sStr = perInfoCom.substr(i,1);
          if(sStr == '0') aJson.push(aText[i]);
        }
        return aJson.join('、');
      },
      wsInfoEvent(){
        if(this.userInfoClass=='yes') return false;
        if(this.ORGANPROPFLAG == '1') return false;
        this.$TZT.action1964({url:'/c_modules/nodeControl/nodePage/personalInfo.html?transmitType='+this.sTransmitType+'&tokentype=' + this.sTokenType});
      },
      riskEvent(){
        if(this.riskClass=='yes') return false;
        this.$TZT.action1964({url:'/c_modules/nodeControl/nodePage/riskTip.htm?transmitType='+sTransmitType+'&tokentype=' + sTokenType}); //如果是两融需要普通登录
      },
      goEnterEvent(){
        this.clearData();
        this.$dispatch('sdxParentEvent',true);
      },
      clearData(){
        this.sdfMainFlag=false; //隐藏
        this.oLocal={};
        this.slineStyle='';
        this.idCardClass='';
        this.idCardShow='display:none;';
        this.userInfoClass='yes';
        this.userInfoShow='display:block;';
        this.riskClass='';
        this.riskShow='display:none;';
        this.sTransmitType='h5';
        this.sTokenType='0';
      }
    },
    events:{
      'sdxEvent':function(obj){
        this.oLocal = {
          ISPROFESSIONALINVESTOR:obj['IsProfessionalInvestor'], //专业投资者
          ORGANPROPFLAG:obj['OrganPropFlag'], //是否机构用户
          ISIDEXPIRED:obj['IsIDExpired'], //身份证是否过期
          IDEXPIREDATE:obj['IDExpireDate']||'',//身份证到期日
          ISPERSONALINFOCOMPLETED:obj['IsPersonalInfoCompleted']||'',//个人信息是否完善
          ISRISKEVALUATIONCOMPLETED:obj['IsRiskEvaluationCompleted']||'',//风险测评是否完成
          RISKEVALUATIONDATE:obj['RiskEvaluationDate']||'',//风险测评日
          RISKEVALUATIONENDDATE:obj['RiskEvaluationEndDate']||'',//风险测评到期日
          IDNO:obj['IDNO']||'',
        }
        this.sdfMainFlag = true; //显示
        this.inits();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .sdxInfo_main{
    position: absolute;
    top: 9%;
    left:45%;
    width:300px;
    margin-left: -135px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e2e2e2;
    color: #333;
    .sdx_title{
      height: 44px;
      line-height: 44px;
      background: #f24957;
      position: relative;
      display: inline-block;width: 100%;
      text-align: center;
      color: #fff;
    }
    .sdx_footer{
      display: block;width: 100%;text-align: center;padding-top: 10px;
      .btn {
        display: inline-block;
        width: 100px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        background-color: #f6494b;
        color: #fff;
        text-align: center;
      }
    }
  }
  
  .tjCont{background-color: #fff;position: relative;margin: 0;border-bottom:1px solid #ddd}
  .tjCont ul li{margin-left: 50px;padding: 10px 90px 0 7.5px;display: block;position: relative;border-bottom: 1px solid #e4e4e4;}
  .tjCont ul li.noBtn{padding-right: 10px;}
  .tjCont ul li.noBtn .li_btn{width: 0;height: 0;}
  .tjCont ul li .li_title{font-size: 14px;display: block;width: 100%;margin-bottom: 5px;}
  .tjCont ul li .li_fzText{color: #828282;display: block;width: 100%;font-size:13px}
  .tjCont ul li .li_fzText.red{color: #cb2323;}
  .tjCont ul li .li_fzText.blue{color: #4592da;}
  .tjCont ul li .li_subText{color: #828282;position: absolute;bottom: 1px;right: 12px;text-align: right;}
  .tjCont ul li .li_btn{border-radius:3px;background-color: #4592da;line-height: 30px;padding:0 10px;font-size: 14px;position: absolute;top: 10px;color: #fff;text-align: center;right: 12px;}
  .tjCont ul li em{background:url('data:image/png;base64,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') no-repeat;width: 20px;height: 20px;background-size: 20px auto;position: absolute;left: -34px;top: 10px;z-index:10;background-position: 0 1px;}
  .tjCont ul li.yes em{background-repeat: no-repeat;background-size: 20px auto;background-position: 0 -20px;z-index:2}
  .tjCont ul li.yes .li_btn{background-color: #f0f0f0;color: #666;}
  .tjCont ul li:last-child{border-bottom:0}
  .tjCont .sLine{position: absolute;width: 2px;background-color: #ddd;left: 25px;top: 15px;bottom: 30px;}
</style>
