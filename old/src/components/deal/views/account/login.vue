<template>
  <div class="explain content native-scroll">
    <div class="input_form login_form mt10">
      <div class="input_text">
        <span class="icon_check" style="position: absolute;top: 0;right: 0" id="saveAcc" @click="checkFunc"><input type="checkbox" class="c1" v-bind:checked="ischecked"><label>记住账号</label></span><i class="icon icon_user"></i><input type="tel" class="t1 t2" placeholder="请输入客户号" id="account" maxlength="18" autocomplete="off" custom_keybord="0" v-model="account">
      </div>
      <div class="input_text">
        <i class="icon icon_pass"></i><input type="tel" style="-webkit-text-security:disc;text-security:disc;" onpaste="return false" class="t1 t2"  placeholder="请输入交易密码" id="password" maxlength="6" autocomplete="off" custom_keybord="0" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="password">
      </div>
      <div class="input_text">
        <i class="icon icon_code"></i><input type="tel" class="t1 t2" placeholder="请输入验证码" id="ticket" custom_keybord="0" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="CheckCode" maxlength="4"><img id="randomImg" class="code_pic" border="0" title="看不清楚换一张" v-bind:src="randomImg" @click="getRandomImg">
      </div>
      <div class="ce_btn" style="margin-top:40px">
        <a href="javascript:void(0);" id="login" @click="encryption">登 录</a>
      </div>
      <view-sdxinfo></view-sdxinfo>
      <!-- 将原有的适当性弹窗去掉 -->
      <!-- <div v-show="isShowIframe" class="alert-box">
        <div class="alert-body"><iframe v-bind:src="appropUrl" style="width:100%;border:0 none;"></iframe></div>
        <div class="alert-foot"><span class="btn" @click="closeAlert">确认</span></div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import localService from '../../../../services/localService'
  import util from '../../../../util/util'
  import service_deal_often from '../../service/common/service_deal_often'
  import service_config from '../../service/common/service_config'
  import validatorUtil from '../../../../util/validatorUtil'
  import endecryptUtil from '../../../../util/endecrypt/endecryptUtil'
  import sdxInfo from './sdxInfo';
  export default{
    data(){
      return {
        randomImg:'',
        account:'',
        password:'',
        CheckToken:'',
        CheckCode:'',
        modulusKey:'',
        modulus_id:'',
        accounttype:'ZJACCOUNT',
        ischecked:false, //是否检查account
        logintype:'1',
        sdxwarnflag : false,
        // 基本信息统一入口
        isShowIframe : false,
        appropUrlOne : service_config.appropUrl.tzturl_suitable_userInfocheck,
        appropUrl : "",
        unifieFlag:false, //是否开启普通和两融的统一登录  true开启，false不开启
      }
    },
    ready(){

    },
    attached(){
      let _self = this;
      this.CHECKKEY = '';
      this.password = '';
      this.$set('account','');
      this.CheckCode = '';
      this.logintype = this.$route.query.logintype || '1';
      this.loginRight = this.$route.query.loginRight || '';
      this.ischecked = false;
      this.isShowIframe=false;
      this.getRandomImg();
      this.inits();
      this.getGgInfo();
    },
    detached(){ //销毁函数
      this.account = '';
      this.password = '';
      this.CheckCode = '';
    },
    methods: {
      inits(){
        var that = this;
        localService.readLocalMesg(['acitve_phone']).then((data)=>{
            if(data.acitve_phone){
              localService.saveMapMesg({
                acitve_phone:data.acitve_phone,
                logintype:that.logintype
              });
            }
        });
        //同时报错统一登录所需的手机号
        let sLoginType = '1';
        if(that.logintype == '1'){
          sLoginType = '2';
        }else if(that.logintype == '2'){
          sLoginType = '1';
        }
        localService.readLocalMesg(['acitve_phone']).then((data)=>{
            if(data.acitve_phone){
              localService.saveMapMesg({
                acitve_phone:data.acitve_phone,
                logintype:sLoginType
              });
            }
        });
        localService.readLocalMesg(['account','logintype='+this.logintype]).then((data)=>{
            if(data.account){
              that.$set('account',data.account);
              that.ischecked = true;
            }
        })
      },
      getRandomImg(){
        var that = this;
        service_deal_often.require41092()
          .then((data)=>{
            if(data.MESSAGE){
              that.randomImg = data.MESSAGE;
            }
            if(data.CHECKTOKEN){
              that.CheckToken = data.CHECKTOKEN
            }
            that.CheckCode = '';
          })
      },
      checkFunc(){
        if(this.ischecked){
          this.ischecked = false;
        }else {
          this.ischecked = true;
        }
      },
      /**
       * [login 回调函数]
       * @param  {object}   oUserInfo 用户信息
       * @param  {Function} fn       回调函数
       * @param  {boolean} ifUnifeFlag 是否统一登录回调
       */
      login(oUserInfo,fn,ifUnifeFlag){
        var obj = {
          password:oUserInfo.endecryp,
          // account:util.padNumber(oUserInfo.account,12),
          account:oUserInfo.account,
          accounttype:(!!oUserInfo.accounttype?oUserInfo.accounttype:this.accounttype),
          modulus_id:this.modulus_id,
          CheckToken:this.CheckToken,
          CheckCode:this.CheckCode,
          maxcount:100,
          yybcode:service_config.yybcode,
          maxcount:'10',
        };
        var that = this;
        service_deal_often.require100(obj)
          .then((data)=>{
            $.hidePreloader();
            if(!!ifUnifeFlag) that.logintype = 1;
            that.submit(data,obj,fn,ifUnifeFlag);
          })
      },
      /**
       * [rzrq_login 两融登录]
       * @param  {object}   oUserInfo 用户信息
       * @param  {Function} fn       回调函数
       * @param  {boolean} ifUnifeFlag  是否统一登录回调
       */         
      rzrq_login(oUserInfo,fn,ifUnifeFlag){
        var obj = {
          password:oUserInfo.endecryp,
          account:util.padNumber(oUserInfo.account,12),
//          accounttype:'RZRQ'+this.accounttype,
          accounttype:(!!oUserInfo.accounttype?oUserInfo.accounttype:'RZRQZJACCOUNT'),
          modulus_id:this.modulus_id,
          CheckToken:this.CheckToken,
          CheckCode:this.CheckCode,
          maxcount:100,
          yybcode:service_config.rzrqyybcode
        };
        var that = this;
        service_deal_often.require104(obj)
          .then((data)=>{
            $.hidePreloader();
            if(!!ifUnifeFlag) that.logintype = 2;
            that.submit(data,obj,fn,ifUnifeFlag);
          })
      },
      /**
       * [submit 登录后数据处理]
       * @param  {object}   data 接口返回JSON对象数据
       * @param  {object}   obj  请求的参数集合
       * @param  {Function} fn   回调函数
       * @param  {boolean} errorFlag  错误是否显示
       */
      submit(data,obj,fn,ifUnifeFlag){
        var that = this;
        if(data.ERRORNO<0){
          if(!!ifUnifeFlag){ //表示错误不用显示
            fn && fn();
            return;
          }
          if(data.ERRORNO==-330203){
            $.alert("验证码错误");
          }else if(data.ERRORMESSAGE.indexOf('120047')>=0||data.ERRORMESSAGE.indexOf('140157')>=0){
            $.alert("资金号或密码错误");
          }else if(data.ERRORMESSAGE.indexOf('150015')>=0){
            $.alert(data.ERRORMESSAGE + ",请联系所属营业部！");
            // $.confirm("您尚未开通以此种委托方式办理此项业务，请尽快至所属营业部或下载德邦证券高端版办理,是否前往下载！",'系统提示',function () {
            //   window.location.href = "https://kaihu.tebon.com.cn/download/zzapp/GDB/download.htm?from=singlemessage&isappinstalled=0";
            // });
          }else {
            $.alert(data.ERRORMESSAGE);
          }
          that.getRandomImg();
          return false;
        }
        if(!('account' in data)){
          if(that.ischecked){
            data.account = obj.account;
          }else {
            obj.account = '';
          }
          /*统一登录  去掉account处理*/
          localService.saveLocalMesg({account:obj.account,logintype:that.logintype,username:data.USERNAME});
        }
        if(that.logintype == 1){
          data.jyloginflag = 2;
        }
        if(that.logintype == 2){
          data.tztrzrqloginflag = 2;
        }
        data.logintype = that.logintype;
        for(var key in data){
          if(key == 'account'){
            continue;
          }
          if(service_config.tztRemoveKey.indexOf(key)<0){
            service_config.tztRemoveKey.push(key);
          }
        }
        console.log(data)
        if(!!data.ACCOUNTLIST) data.ACCOUNTLIST = data.ACCOUNTLIST.replace(/\/g,'\r\n');
        localService.saveMapMesg(data); //将返回的数据进行存储  是同步的
        if(!!ifUnifeFlag){
          fn && fn();
          return;
        }
        fn && fn();
        if (data.SDXFLAG == '1') {
          //获取适当性信息
          // that.getAppropInfo();
          that.goEnter();
        }else{
          that.goEnter();
        }
      },
      encryption(){
        if(!this.check()){
          return false;
        }
        var that = this;
        service_deal_often.require40141()
          .then((data)=>{
            if(data.ERRORNO<0){
              $.alert(data.ERRORMESSAGE);
              return false;
            }
            that.modulusKey = data.MODULUS;
            that.modulus_id = data.MODULUS_ID;
            util.setSessionStorage({modulusKey:that.modulusKey,modulus_id:that.modulus_id,rzrq_modulus_id:that.modulus_id,rzrq_modulusKey:that.modulusKey});
            util.setLocalStorage({modulusKey:that.modulusKey,modulus_id:that.modulus_id,rzrq_modulus_id:that.modulus_id,rzrq_modulusKey:that.modulusKey});
            let endecryp = endecryptUtil.rsaEncrypt(that.modulusKey,'10001', $.trim(that.password));
            $.showPreloader();
            if(that.logintype == 1){
              that.login({account:that.account,endecryp:endecryp},function(){
                that.unifieLogin('rzrq_login',that.modulusKey,that.logintype);
              });
            }else if(that.logintype == 2){
              that.rzrq_login({account:that.account,endecryp:endecryp},function(){
                that.unifieLogin('login',that.modulusKey,that.logintype);
              });
            }
          })
      },
      /**
       * [unifieLogin 两融和普通统一登录检查]
       * @param  {[type]} loginName 函数名
       * @param  {String} modulusKey
       * @param  {String} logintype 表示要取当前什么数据
       * @description {String} 前提是普通交易和两融交易的交易密码相同采用客户号登录
       */
      unifieLogin(loginName,modulusKey,logintype){
        let that = this;
        if(!this.unifieFlag) return; //检验是否开启统一登录
        localService.readMapMesg(['UNIFIELOGINFLAG','UNIFIELOGINUSERCODE']).then((data1)=>{
          if(!data1) return; //取值错误排查
          localService.readMapMesg(['USERCODE','logintype='+logintype]).then((data)=>{
              data = $.extend(data,data1);
              if(!data.USERCODE) return; //没有取到客户号 结束掉
              if(data.UNIFIELOGINFLAG === '1' && !!data.UNIFIELOGINUSERCODE && data.UNIFIELOGINUSERCODE == data.USERCODE) {
                return; //已经做过一次统一登录
              }else{
                let endecryp = endecryptUtil.rsaEncrypt(modulusKey,'10001', $.trim(that.password)),accounttypes = ['KHBH','RZRQZJACCOUNT'];
                that[loginName]({account:data.USERCODE,endecryp:endecryp,accounttype:accounttypes[logintype-1]},function(){
                  let oSave = {
                    'UNIFIELOGINFLAG':'1',
                    'UNIFIELOGINUSERCODE':data.USERCODE
                  }
                  localService.saveMapMesg(oSave);
                },true);
              }
          })
        })
      },
      check(){
        if(validatorUtil.isEmpty(this.account)){
          return ($.toast("登录账号不能为空"),!1);
        }
        if(validatorUtil.isEmpty(this.password)){
          return ($.toast("密码不能为空"),!1);
        }
        if(validatorUtil.isEmpty(this.CheckCode)){
          return ($.toast("验证码不能为空"),!1);
        }
        if(isNaN(this.account)){
          return ($.toast("登录账号格式有误"),!1);
        }
        if(/^[0-9a-zA-Z]{6,12}$/.test(this.password)){
          return !0;
        }else {
//          return($.toast("密码只允许输入0-9且长度为6-12位"),!1);
          return($.toast("密码只允许输入0-9且长度为6位"),!1);
        }

      },
      getAppropInfo(){
        var that = this;
        var oSend = {};
        if (that.logintype == 2) {
          oSend = {
            action:'7212',
            logintype:2
          }
        }
        service_deal_often.require6796(oSend)
          .then((data)=>{
            if(data.ERRORNO < 0){ //做容错处理
              that.goEnter();
              return;
            }
            var oAppropInfo = {
              IsIDExpired:data.ISIDEXPIRED, //身份证是否过期（0:未过期;1:已过期;2:即将过期[距离两个月])
              IDExpireDate:data.IDEXPIREDATE, //身份证到期日（返回8位日期）
              IsPersonalInfoCompleted:data.ISPERSONALINFOCOMPLETED, //0101010101格式,一位一个信息（1.姓名、2.性别、3.出生日期、4.国籍、5.实际控制投资者的自然人姓名、6.实际控制投资者的自然人手机号、7.交易的实际受益人姓
              IsRiskEvaluationCompleted:data.ISRISKEVALUATIONCOMPLETED, //风险测评是否完成（0:未完成;1:已完成;2:即将过期[距离15天])
              RiskEvaluationDate:data.RISKEVALUATIONDATE, //风险测评日（返回8位日期）
              RiskEvaluationEndDate:data.RISKEVALUATIONENDDATE,//风险测评到期日（返回8位日期）
              IDNO:data.IDNO, //身份证号
              IsElectronicSignatureSigned:data.ISELECTRONICSIGNATURESIGNED,//电子签名约定书是否签署（0:否;1:是）
              OrganPropFlag:data.ORGANPROPFLAG, //是否机构户（0:个人;1:机构)（金证暂无）
              IsProfessionalInvestor:data.ISPROFESSIONALINVESTOR,  //是否是专业投资者（0:否;1:是)
              tokentype: (that.logintype == 2)? '2':'1'//１普通交易2融资融券8股转
            }
            if (data.ISPERSONALINFOCOMPLETED.indexOf('0')>=0) {
              that.sdxwarnflag = true;
            }
            if (data.ORGANPROPFLAG != '1') {//专业投资者
              if (data.IDNO.length != 18) {//身份证号长度不满18位
                that.sdxwarnflag = true;
              }
              if (data.ISIDEXPIRED != '0') {
                that.sdxwarnflag = true;
              }
            }
            if (data.ISPROFESSIONALINVESTOR == '0' && data.ISRISKEVALUATIONCOMPLETED == '0') {
              that.sdxwarnflag = true;
            }
            if (that.sdxwarnflag) {
              var param = '';
              that.$broadcast('sdxEvent',oAppropInfo);

              // for (var x in oAppropInfo) {
              //   param += '&'+x+'='+oAppropInfo[x];
              // }
              // that.appropUrl = that.appropUrlOne+param;
              // that.isShowIframe = true;
            }else{
              that.goEnter();
            }
        })
      },
      goEnter(){
        var that = this;
        // var session = util.getSessionStorage(['routerPush']);

         var session = util.getLocalStorage(['routerPush']);
        var sUrl = '/deal/index';
        console.log('routerPush'+session.routerPush);
        if(session.routerPush&&session.routerPush.indexOf('deal/login')<0){
          sUrl = session.routerPush;
        }
        
        if(!!this.loginRight && this.loginRight == 'ggt'){ //判断港股通权限
          localService.readMapMesg(['ISHKACCOUNT','ISHKSZACCOUNT','jyloginflag']).then((data)=>{
            if(data.jyloginflag && data.jyloginflag >= 1){
              if(data.ISHKACCOUNT=='0' && data.ISHKSZACCOUNT=='0'){
                localService.removemapMesg(['footerStockcode','footerWtaccountType']);
                that.$TZT.action10002();
                $.alert(service_config.TIPINFO['ggt']);
              }else{
                that.$TZT.action1964({url:sUrl});
              }
            }else{
              that.$TZT.action1964({url:sUrl});
            }
          })
        }else{
          that.$TZT.action1964({url:sUrl});
        }
      },
      closeAlert(){
        this.isShowIframe=false;
        this.appropUrl= "";
        this.goEnter();
      },
      /**
       * [getGgInfo 获取后台公告信息]
       * @return {[type]} [description]
       */
      getGgInfo(){
        var that = this;
        service_deal_often.require41097({}).then((data)=>{
          if(data.ERRORNO<0 || !data.GRID0 || data.GRID0.length<3 || !data.GRID0[0]) return;
          /*
          GRID0 有三条信息  第一条 公告有效期  第二条 公告标题  第三条 公告内容
           */
          let validDateBegin = that.getTimeFun(data.GRID0[0].split('|')[0]), //公告有效开始时间
              validDateEnd = that.getTimeFun(data.GRID0[0].split('|')[1]), //公告有效开始时间
              currDate = (new Date()).getTime(),
              ggTitle = (!!data.GRID0[1]?data.GRID0[1]:'');/*'<div style="width:100%;text-indent: 20px;text-align:left;word-break: break-all;word-wrap: break-word;text-align: justify;">'+data.GRID0[2]+'</div>';*/
          if(validDateBegin>currDate || currDate>validDateEnd) return;
          let ggCont = ['<div style="width:100%;text-align:left;word-break: break-all;word-wrap: break-word;text-align: justify;">'];
          for(let i=2,len=data.GRID0.length;i<len;i++){
            var sStyle = (data.GRID0[i].indexOf('尊敬的投资者:')>=0?'':'text-indent: 20px;');
            if(data.GRID0[i].indexOf('<p>')>=0){
              ggCont.push(data.GRID0[i]);
            }else{
              ggCont.push('<p style="width:100%;'+sStyle+'">'+data.GRID0[i]+'</p>');
            }
          }
          ggCont.push('</div>');
          $.alert(ggCont.join(''),ggTitle,function(){
            console.log('公告已经展示');
          })
        })
      },
      /**
       * [getTimeFun 解析时间 解析有效开始日期和有效结束日期]
       * @param  {String} 日期字符
       * @return {Int} 毫秒数
       */
      getTimeFun(sDate){
        if(sDate.length < 17) return console.log('参数有误');
        var oTempDate = new Date(sDate.substr(0,4),Number(sDate.substr(4,2))-1,sDate.substr(6,2),sDate.substr(9,2),sDate.substr(12,2),sDate.substr(15,2));
        return oTempDate.getTime();
      }
    },
    watch: {
      account:function(val,old){
        if(val == old) return;
        let v = ''+val.replace(/[^\d]/g,''),
            _self = this;
        console.log(v);
        this.$nextTick(function () { _self.account = v; })
      }
    },
    components:{
      'view-sdxinfo':sdxInfo,
    },
    events:{
      'sdxParentEvent':function (flag) {
        if(!!flag){
          this.closeAlert();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  .mt10 {
    margin-top: 0.5rem;
  }
  .login_form {
    padding: 1rem 0.5rem;
  }
  .input_form {
    border: 0;
  }
  .input_text {
    margin-bottom: 0.25rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border: 1px solid #CCC;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    position: relative;
  }
  .input_text .t1 {
    width: 100%;
    height: 1.5rem;
    padding: 0.4rem 2.5rem;
    line-height: normal;
    background: 0 0;
    border: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 0.7rem;
  }
  .login_form .input_text .t1 {
    padding: 0.4rem 0.5rem 0.4rem 2rem;
  }
  .login_form .input_text .code_pic {
    width: 4rem;
    height: 1.4rem;
    position: absolute;
    right: .05rem;
    top: 0;
  }
  .login_form .input_text .icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    top: 0;
  }
  .login_form .input_text .icon.icon_user {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8wOC8xNSeAT5IAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAACrklEQVR4nO2ZwW3bMBSG/xQ9FnCADpB0gniDagRvEOXEqzeoM0F9fae6GzgbqBvEE9Q+BwVqoHf3oCdYJiD9cROSKfB/F4bM4zPzhSYp6uJwOEAM8670AN46EkSQIIIEESSIIEEECSJIEEGCCBJEkCCCBBEkiCBBBAkiSBBBgggSRJAgggQRJIjwvvQAACCEMAUwi5rXZvZYYjx9Lkq+9gkhzAAsAVwNhOwAzM1snW9UpxQTFEJYAPjSa9oB2PrP1ziVdm9mixzjiikiKIRQA/jm1Q3aWdJEMRXa2XXjTXdmtsozwiPZBYUQrgH89OoGQGVmvwdiLwE0OEr6ZGbbxEM8ocQutvByjxE5AOC/qzy23zcbJQRVXq7G5HR4zCrqm40SgrrF95ydqYsd2u2SoYMiQYIIJQTtvIxPzmN0sbvRqASUENR4Wfs2PorH1FHfbJTc5icAmjFJvXPQJOqbjeyC/KB359UbtJKqOM7bGpyepLfJBxjxlp7F9gC6c9EljrMGKPgsVmQX632tnnrNE7TnnCucynmK+mSlxLNYjfYhtC/hD4BfUehHAB969T2AOvfVR1ZBIYQVgNte03cAy6GLMb9Im8d9zKxONcaYbIIiORsAs+cuun4DsMZxwc4mKYugEMIcwFev/vMfF0nOcj+UXJD/9x/Rrjk/zKx6Yb4GwGe0a9I09dafYxdboJWzx3mPF0PMPNcEGQ6OSQX51tx9JZbPuf9heI6lV29Tb/+pZ1B/xiwHo86nn+s1ZuUguQQ9vMbs6fBcD9FnJCG1oKmXKV4Adjmno1EvJLWg7oq0SZC7y5n0Gjb1q+d7L7cJcm97+ZNR9NXz/4DupAkSRJAgggQRJIggQQQJIkgQQYIIEkSQIIIEESSIIEEECSJIEEGCCBJEkCCCBBEkiPAXqE7RNyLk248AAAAASUVORK5CYII=) no-repeat center;
    background-size: 1.8rem;
  }
  .login_form .input_text .icon.icon_pass {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8wOC8xNSeAT5IAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAADX0lEQVR4nO2av2sUQRSAv/OMiIinoBFB0c5ChGBpI6QRBM2JvbF7naQSuyP4D8TC4oGFYOMPJNEuhdrZiQpqp5yggqIYU/gj8XIWMyab5M6XNTe7h7wPDu52Z2bffbczu+/dVtrtNk53NpQdQL/jggxckIELMnBBBi7IwAUZuCADF2TgggxckIELMnBBBi7IwAUZuCADF2Tgggw2lnFQEcl+HAXq8ZVlCrgLXMtuVNWUoa2icEEZOduBB8AQ0AZ+AANx3wJwChgBzgPDwEyhgUbKmmLbgVcEOd+B68AJYBuwEzgO3AJ+xjavY5/CKWWKEc6cHcA74JSqPsns+wY8BB6KyCHgPjAY+xwpOtAyzqBRls6ckyvkLENVXxDOpu+xz2ghEWYoQ9A5oAXcUNWnVmNVfQbciX3OJY2sA2UIOgbMAVdy9LkJzMe+hVLWIj0HvMzR/nnsUzhlCWqp6o8c7d8Dv1IF8zfKEpTrgQBVnSdc/guP11MNAxdk4IIMXJBBJeUDVJnE9ADQAE4DtbjtXw/8lZDpjwNNSJvhF5GLDRHyqBrhZm+OkK3nvWxXgCqwFThLyPSHAfNufD2kFnSAJTlN4CIwDczm/dXj2bgDOANcAnazlMA2exPualKvQQ2CnDfAUVW9DczmHSQzVb+o6lXgMPCRUAJp9CbUzqQWVCckmQ1V/ZDdsaKqmAtV/QRcIEzTlZXInpJaUI1Q9JpOMPYjQhWyZjVcD0Vc5lvApwTjviUs+kkpQtCCqi502pGdZiJSF5F2fNU7tckSk93kD3mXVXJdJCNgIrN5QkSm1tA9uaB+upPe3+V9qfSToL6knwS96fJ+kaL/NIQS1qBuX1JExoDJ+HGsDBmdKEJQZS2NVHVqrW0BRGSAkJslpYgptlFEtiQYdx+wKcG4y0gtaBbYDJxMMPYIQdDXBGMvklrQZDzGZRHZ26tBReQgoTJQJdSGkpF6DRon/NKDwGMRuQjcU9XPeQcSkSqwh1ALGiP8yzETj5GM1IKahKLWA2AXoISzqUX+u+AqId4/i/NMHLvZo1g7UsRV7CmhqNUglCbWm32vKrmmJGlN+n+gn+6k+xIXZOCCDFyQgQsycEEGLsjABRm4IAMXZOCCDFyQgQsycEEGLsjABRm4IAMXZPAbD9nE2cjGUuMAAAAASUVORK5CYII=) no-repeat center;
    background-size: 1.8rem;
  }
  .login_form .input_text .icon.icon_code {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8wOC8xNSeAT5IAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAEBklEQVR4nO2bTY4bRRSAPxNIJKSQYcEOZN9gzFzAvgG+AUYsnoSQcDQ7NvYoCyRWXiCkJzbOCQgniHOByD4AjGeHWM0IFlFC4izqdbrtabsG0l1u0Pskq93V1a6az/X3qj2t9XqNs5t3Dl2BpuOCIrigCC4ogguK4IIiuKAILiiCC4rggiK4oAguKIILiuCCIrigCC4ogguK4IIiuKAI71b9gSKSvR0DXwBtO69r8/sCmAFnAKpa6YdXLsh4CnSBl8DfwCvgecVltAj1/4TwZXwGnFRcRi2CxgQ5z4DvgJ9U9fcaykFE7gIT4Gvg2Mo+q7KMOgQNCa3me1V9sCuTiIyAI2CmqquS6x1gRJANsACmxbyq+idwKiLvAV9Z2Y0X1Ab+An4su2h/+JTQJQDmwGorT9fS7xWSe8BQRPqqutj62B+AL8nHu8qoaxZ7oap/bCdaqzknl7OLKUHOEvjUXktLm5Tk/xV48Rb13Uldgl7tSD+y485uYC2sZ6cDVV1YixlZWnf7HlV9uafMtyL1OmgGfKiqkz15joAnwJOtsaljxxUJqWuaL6VsMC7JswD6xTQbk6Z2Oq+6Xvto/EpaRAbkA/aSXFQSGi1IRKbAzwQ5vwB9Vb1MWYekXeymiMgRodUcW9J9VU3acjIaKYjQjY6BK0Kr2V73JKNxgmya/9xOL4FpIQAGQFX7qerTOEHk0zmElXHlq+N/wsEEqWprR/qcEKk3guSCbhKEltzTBQbASlVnNVdxg6TTvK1pzoFvCOFEz96fi0h/xz0dwow2JkTrSTlEqAHwkM0gFMqDUIBHbEb1SUnWxayF3ANQ1WEhfQQ83nHPjDDdL8nXRElJJmjP4Duw48YKWUSGhOl+SRizSiXWzcFmMRGZE6b0NmHjfVK4lgWnV4TA9doWRyoOGYv1KFnjWJiRjTuD1LHXNgcTpKotWwudEUTN7dLUzs+sWx6UZIJEZCgic4vQ31DYPMtmqo4dxyKyFpE1+fjTs7QJiUjZgi7JN96zrddsMC6ywHYUC69sKXBl56ua6/qGugbpa7OVqj4SkQtC91lZS+qQB6YPLd9o+15bIjwGFnsC1Vq+7Lpa0B0R+agkfUD+dGLMppxrYm6KrbZv/9v791FHC7oAPgbuA98WL9i+Ttem8aybrWJ71fsCWBFpWTl3rOxKqUPQjNA6TkXkA8IDxN9U9VmWoYoNMHua2gZOCT+SaJGHMpXRqvo/Dm1z6ykhNFgTntE/Jzy3qqqwFmF4uE1oObcIg/vJf+XXHSfk0XcbeL+mcmDr5y9VU3kL+r/R6Mc+TcAFRXBBEVxQBBcUwQVFcEERXFAEFxTBBUVwQRFcUAQXFMEFRXBBEVxQBBcUwQVFcEERXgMFhSKWUJsrDAAAAABJRU5ErkJggg==) no-repeat center;
    background-size: 1.8rem;
  }
  .icon_check .c1 {
    display: none;
  }
  .icon_check label {
    display: block;
    padding-left: 1.2rem;
    position: relative;
    font-size: 0.7rem;
  }
  .icon_check label:before {
    content: "";
    width: 1rem;
    height: 1rem;
    border: 1px solid silver;
    -moz-border-radius: .15rem;
    -webkit-border-radius: .15rem;
    border-radius: .15rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -0.5rem;
  }
  .icon_check label:after {
    content: none;
    width: 1rem;
    height: 1rem;
    -moz-border-radius: .15rem;
    -webkit-border-radius: .15rem;
    border-radius: .15rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -0.5rem;
    transition: all .5s ease-in 0s;
    -moz-opacity: 0;
    -webkit-opacity: 0;
    opacity: 0;
  }
  .icon_check label:after {
    border: 1px solid #FB4F4F;
    background: #FB4F4F url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEUSURBVEhLvZTBEYIwEEW5OSYHvJhcLcESLMESLIESKMESLIES7EAPSq6WYAeaT4xG2BAGF5nhwoT9uy9/f5YxP7XUlZHqwFzWlbvO1dZI/cBrhc6nPF+wCaFYLfTdC3gRNgGHxnUfTFGxCIRo3sXtNCyIKDQQgShL939HYy16mxSNxbOZDo3Qe5bilGsmR3MRyzVL95RrLPeyt3jjZWziTK/6DpILZTMn2TmCqckOlyWkC2ILlUSDaG1nCDXyKDQYzXdPBZVfGNI1Qh2TaHAARSJTNJkOZJ0YBsrEfXXEgYVA9RW/nxhWxaDu24eM0Lt2tx3RoWhiHcAVMRF85wuyl3XDCdgynrp82HQU99RPtVTFL2ieCaFGYF8OIJAAAAAASUVORK5CYII=) no-repeat center;
    background-size: 1rem 1rem;
  }
  .icon_check .c1[checked]+label:after {
    content: "";
    -moz-opacity: 1;
    -webkit-opacity: 1;
    opacity: 1;
  }
  .ce_btn a {
    width: 100%;
    background: #f24957;
    height: 2rem;
    line-height: 2rem;
    border: 0;
    text-align: center;
    font-size: 0.9rem;
    color: #FFF;
    display: block;
    text-decoration: none;
  }
  .alert-box{
    position:absolute;
    top:30%;
    left:45%;
    width:300px;
    height:320px;
    margin-left: -135px;
    margin-top: -110px;
    background:#fff;
    border-radius: 5px;
    border:1px solid #e2e2e2;
    color:#333333;
    .alert-title{
      height:35px;
      border-bottom: 1px solid #e2e2e2;
      line-height: 35px;
      text-align: center;
      position: relative;
      span{
        position: absolute;
        width: 15px;
        height: 15px;
        line-height: 15px;
        right: 10px;
        top:8px;
        color: #e2e2e2;
      }
    }
    .alert-body{
      width: 100%;
      height: 272px;
      iframe{
        width: 100%;
        height: 100%;
      }
    }
    .alert-foot{
      height: 45px;
      text-align: center;
      .btn{
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
</style>
