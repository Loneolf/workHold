<template>
  <div class="alert-box-overlay"></div>
  <div v-show="true" class="alert-box">
      <div class="alert-title">请输入普通账号密码</div>
      <div class="alert-body">
        <div class="alert-body-item">
          <p class="item-label">交易账号：</p>
          <p class="item-hd txt">{{account}}</p>
        </div>
        <div class="alert-body-item">
          <p class="item-label">交易密码：</p>
          <p class="item-hd">
            <!-- 密码类型禁止自动完成 -->
            <input type="tel" style="-webkit-text-security:disc;text-security:disc;" onpaste="return false" class="t1 t2"  placeholder="请输入交易密码" id="password" maxlength="6" custom_keybord="0" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="password">
          </p>
        </div>
        <div class="alert-body-item">
          <p class="item-label">验证码：</p>
          <div class="item-hd">
            <p class="item-flex">
              <!-- 验证密码类型禁止自动完成 -->
              <input type="tel" class="t1 t2" placeholder="请输入验证码" id="ticket" custom_keybord="0" autocomplete="off" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="CheckCode" maxlength="4"/><img id="randomImg" class="code_pic" border="0" title="看不清楚换一张" v-bind:src="randomImg" @click="getRandomImg">
            </p>
          </div>
        </div>
      </div>
      <div class="alert-foot">
        <span class="btn" @click="encryption">确认</span><span class="btn grey" @click="cancelEvent">取消</span>
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
        accounttype:'KHBH',
        ischecked:false, //是否检查account
        logintype:'9',
      }
    },
    props: ['url'],
    ready(){

    },
    attached(){
      this.CHECKKEY = '';
      this.password = '';
      this.account = '';
      this.CheckCode = '';
      this.ischecked = false;
      this.isShowIframe=false;
      this.getRandomImg();
      this.inits();
    },
    detached(){ //销毁函数
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
        localService.readMapMesg(['USERCODE','logintype=2']).then((data)=>{
            var account = data.USERCODE;
            if(account){
              that.account = account;
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
          account:util.padNumber(oUserInfo.account,12),
          accounttype:this.accounttype,
          modulus_id:this.modulus_id,
          CheckToken:this.CheckToken,
          CheckCode:this.CheckCode,
          maxcount:100,
          yybcode:service_config.yybcode,
          maxcount:'10',
        };
        var that = this;
        service_deal_often.require100(obj,this.logintype)
          .then((data)=>{
            $.hidePreloader();
            if(!!ifUnifeFlag) that.logintype = 1;
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
          if(data.ERRORNO==-330203){
            $.alert("验证码错误");
          }else if(data.ERRORMESSAGE.indexOf('120047')>=0||data.ERRORMESSAGE.indexOf('140157')>=0){
            $.alert("资金号或密码错误");
          }else if(data.ERRORMESSAGE.indexOf('150015')>=0){
            $.alert(data.ERRORMESSAGE + ",请联系所属营业部！");
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
          localService.saveLocalMesg({account:obj.account,logintype:that.logintype,username:data.USERNAME});
        }
        if(that.logintype == 9){
          data.DBPHZLOGINFLAG = 2; //担保品已经登录
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
        delete data.ACCOUNTLIST;
        delete data.GRID0;
        localService.saveMapMesg(data); //将返回的数据进行存储  是同步的
        that.goEnter();
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
            that.login({account:that.account,endecryp:endecryp});
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
        if(/^[0-9a-zA-Z]{6,12}$/.test(this.password)){
          return !0;
        }else {
//          return($.toast("密码只允许输入0-9且长度为6-12位"),!1);
          return($.toast("密码只允许输入0-9且长度为6位"),!1);
        }
      },
      goEnter(){
        //向上传播事件
        this.$dispatch('dbphzLoginevent',this.url);
      },
      cancelEvent(){
        this.$dispatch('dbphzLoginevent','cancel');
      }
    },
    events:{
      'changeRandomImg':function(){
        this.getRandomImg();
        this.password = '';
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";

  .alert-box-overlay{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 80;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    visibility: visible;
    opacity: 1;
    display: block;
    -webkit-transform:translate3d(0,0,0);
    -moz-transform:translate3d(0,0,0);
    -ms-transform:translate3d(0,0,0);
    transform:translate3d(0,0,0);
  }
  .alert-box{
    display: block;
    position: fixed;
    top: 25%;
    left: 5%;right: 5%;
    // min-height: 205px;
    max-height: 205px;
    background:#f0f0f0;
    border-radius: 5px;z-index: 90;
    color:#333333;
    -webkit-transform:translate3d(0,0,0);
    -moz-transform:translate3d(0,0,0);
    -ms-transform:translate3d(0,0,0);
    transform:translate3d(0,0,0);
    .alert-title{
      display: block;height: 35px;line-height: 35px;text-align: center;
      position: relative;border-bottom: 1px solid #e2e2e2;
    }
    .alert-foot{
      display: inline-block;
      width: 100%;height: 45px;
      padding: 0 10px;
      position: relative;
      .btn{
        display: inline-block;
        position: absolute;
        left: 10px;
        width: 100px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        background-color: #f6494b;
        color: #fff;
        text-align: center;
        &.grey{
          background-color: #c8c5c5;
          color: #333;
          right: 10px;
          left: inherit;
        }
      }
    }
  }
  .alert-body{
    padding: 10px 10px 10px 0;
  }
  .alert-body-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 30px;margin-bottom: 5px;
    position: relative;
    .item-hd {
      -webkit-box-flex:1;
      -webkit-flex:1;
      -ms-flex:1;
      flex:1;
    }
    .item-label {
      display: block;
      width: 100px;
      line-height: 30px;height: 30px;text-align: right;font-size: 0.8rem;
    }
    .item-flex{
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      height: 30px;
      position: relative;
    }
    .t1 {
      width: 100%;
      height: 1.5rem;
      padding: 0.2rem 0 0.2rem 0.2rem;
      line-height: normal;
      border: 0;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      font-size: 0.7rem;
      display: inline-block;
    }
    .code_pic {
      display: block;top: 0;right: 0;position: absolute;width: 4rem;height: 1.5rem;padding-left: 5px;
    }
  }
</style>
