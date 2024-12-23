<template>
  <div class="content">
   <!--  <div class="main"> -->
        <div class="title">
            <p class="gztitle">
                <span class="">借出</span>&nbsp;&nbsp;
                <span>{{day}}天期 - {{gzmc}}&nbsp;{{gzdm}}</span>
            </p>
            <p class="rmb">￥{{money}}</p>
        </div>
       <!-- <ul class="product-time">
            <li class="active">
                <h6>申请已受理</h6>
                <p class="j_time">06-03 13:12:12</p>
            </li>
            <li class="ac-color">
                <h6 id="confirmMoney">合约成交</h6>
                <p>06-03 13:12:12</p>
            </li>
            <li class="ac-color">
                <h6>合约到期</h6>
                <p>06-03 13:12:12</p>
            </li>
            <li class="ac-color">
                <h6>资金到账</h6>
                <p>06-03 13:12:12</p>
            </li>
        </ul>-->
        <div class="proess">
            <div class="circle" data-num="1">
                <div class="state">
                    <div class="wtzt">委托中</div>
                    <p class="j_time">{{wttime}}</p>
                </div>
            </div>
            <div class="line">
                <div data-num="1"></div>
                <div data-num="2"></div>
            </div>

            <div class="circle" data-num="2">
                <div class="state1">
                    <div class="wtzt">合约成交</div>
                    <p></p>
                </div>
            </div>
            <div class="line">
                <div data-num="2"></div>
                <div data-num="3"></div>
            </div>

            <div class="circle" data-num="3">
                <div class="state2">
                    <div class="wtzt">资金可用</div>
                    <p></p>
                </div>
            </div>
            <div class="line">
                <div data-num="3"></div>
                <div data-num="4"></div>
            </div>

            <div class="circle" data-num="4">
                <div class="state3">
                    <div class="wtzt">资金可取</div>
                    <p></p>
                </div>
            </div>

        </div>
        <div class="gzdetail">
            <div class="name">
                <p>业务类型:</p>
                <p>委托利率：</p>
                <p>委托金额:</p>
                <p>预期收益:</p>
                <p>资金可用:</p>
            </div>
            <div class="data">
                <p>国债逆回购交易</p>
                <p>{{wtjg}}</p>
                <p>{{money}}元</p>
                <p>{{yqsy}}元</p>
                <p>{{ky}}</p>
            </div>
           <!-- <p><p>业务类型：</p><p>国债逆回购交易</p></p>
            <p><span>委托利率：</span><span>4.010</span></p>
            <p><span>委托金额：</span><span>5000元</span></p>
            <p><span>到期收益：</span><span>50元</span></p>
            <p><span>占用天数：</span><span>2天</span></p>-->
        </div>

    <!-- </div> -->
    <div class="kb"></div>
    
  </div>
  <div class="cancel" @click="doChedan()">
        <p>{{state}}</p>
    </div>
</template>
<script>
  import utils from '../../../../util/util'
  import service_ptjy from '../../../deal/service/trade/service_ptjy'
  import service_deal_often from '../../service/common/service_deal_often'
  import service_hq_often from '../../../hq/service/common/service_hq_often'
  import repoconfig from '../../scripts/repoconfig'
  import tradingconfig from '../../scripts/tradingconfig'
  import localService from '../../../../services/localService'
export default {
  data () {
    return {
       INDEX: ['STOCKNAMEINDEX', 'NEWPRICEINDEX', 'STOCKCODEINDEX','BONDTERMINDEX','REALOCCDAYSINDEX','EXPIREQINSUANDATEINDEX'],
      availableFunds:'',
      jyloginflag:0,
      money:'',
      gzmc:'',
      gzdm:'',
      wtjg:'--',
      day:'--',
      ky:'--',
      yqsy:'--',
      diffNum:'--',
      total:'',
      state:'撤单',
      CONTACTINDEX:'',
      wttime:''
    }
  },
  ready(){

  },
  attached(){
    this.getCustomers();
  },
  methods:{
     getUrlParameter(parameterName,str){
       //获取url参数值
       var reg = new RegExp("(^|&|\\?)" + parameterName + "=([^&]*)(&|$)", "i"),arr,arr1;
            if(str){
                arr = str.match(reg);
                arr1 = str.match(reg);
            }else{
                arr = location.search.substr(1).match(reg);
                arr1 = location.hash.substr(2).match(reg);
              }
            if (arr) {
                return arr[2];
            }else if(arr1){
                return arr1[2];
            }
      },
    getCustomers(){
       
        this.sy = this.getUrlParameter('num');
        localService.readMapMesg(['C_DETAIL','DATEFORMINDEX','HIDESEGMENTINDEX'])
        .then((data)=>{
          let field = JSON.parse(data.C_DETAIL).Arr[this.sy].split('|');
          console.log(JSON.parse(data.C_DETAIL).Arr[this.sy]);
          console.log(field[0]);
          this.money = tradingconfig.fmoney(field[4]*100,2);
          this.total = field[4]*100;
          this.gzmc = field[1];
          this.gzdm = field[0];
          this.wtjg = field[3];
          this.day = repoconfig.repoData[field[0]];
          this.WTACCOUNT = field[12];
          this.WTACCOUNTTYPEINDEX = field[15];
          this.CONTACTINDEX = field[8];
          this.zt =field[17];
          this.cdbz = field[14];
               if(this.zt==6){
                   this.state = "已撤";
                  // this.draw = 'gray';
                    $(".cancel").addClass("gray")
                }else if(this.zt==8){
                  this.state = "已成";
                  $(".cancel").addClass("gray")
                }else{
                  this.state = "撤单";
                    //listObj.draw = 'chedan';
                };
         // var next = tradingconfig.nextTradeDate(utils.getYTDS(utils.manyDays(repoconfig.repoData[field[0]])));
         // this.ky = next.ky;
         this.getkydate();
          this.wttime = utils.dateForm(field[5],'5','2|yyyy-mm-dd,5|hh:mm:ss');
          console.log(this.ky);
           this.getDay();
           if(this.zt==7||this.zt==8){
              this.states(2);
              $('.state1 div').css('font-weight','bold');
            }else{
              this.states(1);
            }
         
        })
         /*localService.readMapMesg(readmap, function (oData) {
            var oContent = JSON.parse(oData.C_DETAIL);
           
          })*/
    },
     states(num){
      var num = num || '0';
        $('.proess [data-num]').each(function (i, t) {
            var datanum = $(t).data('num');
            if (datanum <= num) {
                $(t).addClass('red');
                //$('h6').addClass('yellow');
            }
        })
     },
     getDay(){
        var that   = this;
        var oSendData = {
          stockcode   :that.gzdm,
          WTACCOUNTTYPE:that.WTACCOUNTTYPEINDEX,
          WTACCOUNT:that.WTACCOUNT,
          price       :that.wtjg,
          PriceType:0,
          accountIndex:2,
          Accountlist:1
        };
       // $.showPreloader();
        service_deal_often.require151(oSendData)
          .then((data)=>{
            //if(!that.diffNum||that.diffNum=="--"){
              that.diffNum = parseInt(data.FUNDUSEDDAYS);
              console.log(that.diffNum);
            //}
           this.yqsy = utils.toDecimal2(that.diffNum*that.wtjg*that.total/36500,2);
          })
      },
       doChedan(){
        // var ele = event.currentTarget;
        // console.log(index);
        var that = this;
       if(that.cdbz == '0'){
            alert('该笔委托不可撤单!');
             return;
       }
        let oSendData = {
          ContactID: that.CONTACTINDEX
        };
        var aWord = [];
        aWord.push('<p>代码:' + that.gzdm +'</p>');
        aWord.push('<p>名称:' + that.day  + '天期</p>');
        aWord.push('<p>价格:' + that.wtjg + '</p>');
        aWord.push('<p>金额:' + that.total +  '</p>');
        aWord.push('<p>您是否确认以上撤单?</p>');
        var str = '<div style="text-align: left;">'+aWord.join('')+'</div>';
        $.confirm(str,'撤单信息',function (){
          service_ptjy.require111(oSendData)
            .then((data)=>{
              alert(data.ERRORMESSAGE);
              if(data.ERRORNO>=0){
              that.state = '已撤单';
              }
              console.log(data);
            })
        })
      },
      getkydate(){
         var that = this;
          var INDEX = that.INDEX;
      var obj = {
        StartPos: 1,
        MaxCount: 100,
        stockcode: '国债逆回购',
        accountIndex: 0,
        deviceType: 0,
        Direction: 1,
        // NEEDCHECK:'1|2|253|254|32|255|',
        NEEDCHECK:'1|2|0|0|32|263|',
        NEEDCHECK2:'1|2|253|254|32|263|',
        lead: 1,
        NewMarketNo: 0
      };
      service_hq_often.require20192(obj)
        .then((oData) => {
          var objSZ = [],
            objSH = [],
            objAll = {};
          oData.GRID0.shift();
          oData.GRID0.forEach((item) => {
            var listItem = item.split('|');
            var listobj = {};
              INDEX.forEach((value) => {
              if (oData[value]) {
                listobj[value] = listItem[oData[value]]
              }
            });
               if(that.gzdm==listobj.STOCKCODEINDEX){
                this.ky = utils.getYTDS(listobj.EXPIREQINSUANDATEINDEX);
               }
           // console.log(listobj.STOCKCODEINDEX);

          
          });
        
      
        })
      }
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../../assets/less/variables.less';
.content {
    background: #fff;
}

.main {
    background: #fff;
}
.main .title{
  /*   border-bottom: 1px solid #f4f4f4; */
}
.title .gztitle {
    padding-left: 20px;
    padding-top: 20px;
}

.title .gztitle span:nth-child(1) {
    background: #ff4342;
    color: #fff;
    width: 34px;
    height: 19px;
    display: inline-block;
    line-height: 19px;
    text-align: center;
    font-size: 12px;
}

.title .gztitle span:nth-child(2) {
    font-size: 16px;
    font-weight: bold;
    color: #484848;
}

.title .rmb {
    font-size: 31px;
    text-align: center;
    padding-top: 20px;
    font-weight: bold;
    color: #484848;
}

.gzdetail {
    padding: 0 15px;
    font-size: 14px;
    color: #5e5e5e;
    height: 150px;
    line-height: 30px;
    border-top: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
}

.name {
    float: left;
}

.data {
    float: right;
}

.data p {
    text-align: right;
}
.kb{
  height: 60px;
  background: #f4f4f4;
}
.gray{
  color: #999 ! important;
}
.cancel {
    text-align: center;
    height: 49px;
    line-height: 49px;
    margin-top: 20px;
    background: #fff;
    font-size: 16px;
    color: #f43438;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    border-top: 1px solid #f4f4f4;
}
.product-time{
    padding-top: 49px;
    padding-bottom: 10px;
}
.product-time .active{
    color: #ff7f1a;
}
.product-time li{
    padding-left: 40px;
    font-size: 15px;
    height: 60px;
}
.product-time li p{
    font-size: 12px;
}
.product-time .j_time{
    font-size: 12px;
    color: #919191;
}
.proess {
    /*width: 20px;*/
    margin-left: 40px;
    padding: 48px 0;
    position: relative;
}

.circle {
    width: 11px;
    height: 11px;
    background: #e7e7e7;
    border-radius: 50%;
    color: #3d3d3d;
}

.line {
    width: 3px;
    margin: 0 4px;
    background: #e7e7e7;
    height: 54px;
}

.line > div {
    height: 50%;
    width: 100%;
}

.red {
    background: #ff7f1a;
    color: #ff7f1a ! important;
}
.state{
    position: absolute;
    top: 44px;
    left: 22px;
     div{
      font-weight: bold;
    }
}
.state1{
    position: absolute;
    top: 110px;
    left: 22px;
   
}
.state2{
    position: absolute;
    top: 175px;
    left: 22px;
   
}
.state3{
    position: absolute;
    top: 240px;
    left: 22px;
   
}
h6{
    font-size: 15px;
}
.state p,.state1 p,.state2 p,.state3 p{
    color: #919191;
    font-size: 12px;
}
.wtzt{
  font-size: 15px;
}
</style>
