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
    
        <div class="proess">
            <div class="circle" data-num="1">
                <div class="state">
                    <div class="wtzt">委托中</div>
                    <p class="j_time"></p>
                </div>
            </div>
            <div class="line">
                <div data-num="1"></div>
                <div data-num="2"></div>
            </div>

            <div class="circle" data-num="2">
                <div class="state1">
                    <div class="wtzt">合约成交</div>
                   <p>{{cjrq}}</p>
                </div>
            </div>
            <div class="line">
                <div data-num="2"></div>
                <div data-num="3"></div>
            </div>

            <div class="circle" data-num="3">
                <div class="state2">
                    <div class="wtzt">资金可用</div>
                    <p>{{kyrqs}}</p>
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
                <p>成交利率：</p>
                <p>成交金额:</p>
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
      remark:'',
      kyrq:'--',
      cjrq:'',
      kyrqs:'',
      ztyqsy:'--'
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
          this.money = tradingconfig.fmoney(field[4],2);
          this.total = field[4];
          this.gzmc = field[1];
          this.gzdm = field[0];
          this.wtjg = field[3];
          this.day = repoconfig.repoData[field[0]];
          this.WTACCOUNT = field[9];
          this.WTACCOUNTTYPEINDEX = field[5];
          this.remark = field[10];
          this.kyrq = field[8];
          this.ztyqsy = field[11];
          if(field[6]!=''){
              this.cjrq = field[6].substring(0,4)+'-'+field[6].substring(4,6)+'-'+field[6].substring(6,8);
          }
          var next = tradingconfig.nextTradeDate(utils.getYTDS(utils.manyDays(repoconfig.repoData[field[0]])));
          if(this.remark == 1){
            this.ky = this.kyrq.substring(0,4)+'-'+this.kyrq.substring(4,6)+'-'+this.kyrq.substring(6,8);
          }else{
             this.getkydate();
          }
         
          console.log(this.ky);
           this.getDay();
            if(this.remark == 1&&this.dateCompare(this.kyrq)){
                  this.state(3);
                  this.kyrqs = field[8].substring(0,4)+'-'+field[8].substring(4,6)+'-'+field[8].substring(6,8);
                  $('.state2 div').css('font-weight','bold');
            }else{
              this.state(2);
            }
          
        })
    },
    dateCompare(rq){
        if(!rq){
          return false;
        }
             var date = new Date();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var nowdate = date.getFullYear()+''+month+''+strDate;
         if(rq>nowdate){
            return false;
         }else{
          return true;
         }

     },
     state(num){
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
            if(that.remark==1){
                 this.yqsy = that.ztyqsy;
            }else{
                  this.yqsy = utils.toDecimal2(that.diffNum*that.wtjg*that.total/36500,2);

            }
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
    div{
      font-weight: bold;
    }
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
/* h6{
    font-size: 15px;
} */
.state p,.state1 p,.state2 p,.state3 p{
    color: #919191;
    font-size: 12px;
}
.wtzt{
  font-size: 15px;
}
</style>
