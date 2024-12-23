<template>
    <div class="adBox1" style="width: 100%;height: 3.56rem; position: relative; background:#FFFFFF">
        <div class="swiper-container" id="swiper-container">
            <div class="swiper-wrapper">
                <template v-for="item in accountList">
                    <div class="swiper-slide" :key="item.bztype" :class="{'swiper-no-swiping': accountList.length < 2, 'ggt-slide': item.bztype == '0_HK'}">
                        <div class="cnyName">
                            <div class="cnyName_tige">
                                <div v-if="item.bztype == '0' || item.bztype == '0_HK'" style="display: flex;align-items: center;">
                                    <img src="../../../../assets/jy/images/rmb-qchicang.png" alt=""><span v-if="item.bztype == '0'">人民币账户 A股</span><span v-else>人民币账户 港股</span>
                                </div>
                                <div v-if="item.bztype == '1'" style="display: flex;align-items: center;">
                                    <img src="../../../../assets/jy/images/usa-qchicang.png" alt=""><span>美元账户</span>
                                </div>
                                <div v-if="item.bztype == '2'" style="display: flex;align-items: center;">
                                    <img src="../../../../assets/jy/images/hk-qchicang.png" alt=""><span>港币账户</span>
                                </div>
                                <div class="ratio">
                                    <div class="progress-bar" :style="{width: (item.ratio == '--' ? '0px' : 100 * item.ratio + '%') }"></div>
                                    <div class="progress-text">
                                        <span style="color: #6D7A85">仓位</span><span class="num">{{item.ratio | ratioFormat}}</span>
                                    </div>                                
                                </div>
                            </div>
                            <div>
                                <ul class="moerysp_ul">
                                    <li>
                                        <div>
                                            <p>资产<span class="little-eye" :class="{'closed': !eyeStatus}"  @click="onChangeEyeStatus()"></span></p>
                                            <span class="{{fontSizeFilter(item.total)}}" v-if="eyeStatus">{{item.total}}</span>
                                            <span v-else>****</span>
                                        </div>
                                        <div>
                                            <p><span class="zyltitle" @click="onZylAlert()"><template v-if="item.bztype == '0_HK'">港股</template>浮动盈亏</span><span class="zylquestion" @click="onZylAlert()"></span>
                                            </p>
                                            <span class="{{item.yl>0?'rise':item.yl<0?'fill':''}} {{fontSizeFilter(item.yl)}}" v-if="eyeStatus">{{item.yl | plFormat}}</span>
                                            <span v-else>****</span>
                                        </div>
                                        <div>
                                            <p><span class="todaypltitle" :class="{'slh-todaypltitle': item.bztype == '0_HK'}" @click="onTodayPlAlert()"><template v-if="item.bztype == '0_HK'">港股</template>当日参考盈亏</span><span class="todayplquestion" @click="onTodayPlAlert()"></span>
                                            </p>
                                            <span class="{{item.todayPl>0?'rise':item.todayPl<0?'fill':''}} {{todayPlFontSizeFilter(item.todayPl)}}" v-if="eyeStatus"><span class="todaypl-data" style="max-width: 2.24rem;" @click="jumpToNewTodayYk(item)">{{item.todayPl | plFormat}}</span><span class="todaypl-icon" style="flex-shrink: 0;" @click="jumpToNewTodayYk(item)"></span></span>
                                            <span v-if="!eyeStatus"><span class="todaypl-data" @click="jumpToNewTodayYk(item)">****</span><span class="todaypl-icon" @click="jumpToNewTodayYk(item)"></span></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p><template v-if="item.bztype == '0_HK'">港股</template>总市值</p>
                                            <span class="{{fontSizeFilter(item.sz)}}" v-if="eyeStatus">{{item.sz}}</span>
                                            <span v-else>****</span>
                                        </div>
                                        <div>
                                            <p><span class="kytitle" :class="{'slh-kyTitle': item.bztype == '0'}" @click="onKyAlert()"><template v-if="item.bztype == '0_HK'">港股</template>可用</span><span class="kyquestion" v-if="item.bztype == '0'" @click="onKyAlert()"></span><span class="guozhai" v-if="item.bztype == '0'" @click="jumpToGuoZhai()">逆回购</span></p>
                                            <span class="{{fontSizeFilter(item.ky)}}" v-if="eyeStatus">{{item.ky}}</span>
                                            <span v-else>****</span>
                                        </div>
                                        <div>
                                            <p>可取<span class="band_over" @click="jumpToYZZZ()">转账</span></p>
                                            <span class="{{fontSizeFilter(item.kq)}}" v-if="eyeStatus">{{item.kq}}</span>
                                            <span v-else>****</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>	
                </template>
                
            </div>
            <div class="swiper-pagination" v-if="accountList.length > 1"></div>
        </div>
        <common-dialog class="sjsm_dialog" :show.sync="isTotalPlDialogShow" :id="'sjsm_dialog'" >
            <div class="dialog_header">数据说明</div>
            <div class="dialog_body">
                <p v-if="accountList[activeIndex].bztype === '0'">浮动盈亏仅为当前账户持仓证券（港股通证券除外）的总盈亏，不包含历史已清仓证券，具体金额仅供参考，以日终清算数据为准。</p>
                <p v-if="accountList[activeIndex].bztype === '0_HK'">浮动盈亏仅为当前账户持仓证券（港股通证券）的总盈亏，不包含历史已清仓证券，具体金额仅供参考，以日终清算数据为准。</p>
                <p v-if="accountList[activeIndex].bztype === '1' || accountList[activeIndex].bztype === '2'">浮动盈亏仅为当前账户持仓证券的总盈亏，不包含历史已清仓证券，具体金额仅供参考，以日终清算数据为准。</p>
            </div>
            <div class="dialog_footer">
                <span class="dialog_confirm_button" @click="isTotalPlDialogShow = false">我知道了</span>
            </div>
        </common-dialog>
        <common-dialog class="sjsm_dialog sjsmDialog" :show.sync="isTodayPlDialogShow" :id="'sjsm_dialog'">
            <div class="dialog_header">数据说明</div>
            <div class="dialog_body" v-if="accountList[activeIndex].bztype === '0'">
                <p>1、当日参考盈亏为当前账户场内持仓证券（不含港股通）的当日参考盈亏，主要根据场内持仓证券的实时价格、上一交易日收盘价、今日买入价、今日卖出价、持仓数量等进行估算，估算时考虑交易费用。</p>
                <p>2、交易日8点前以及非交易日显示上一交易日数据，交易日8点至开盘前不显示，交易日开盘后至24点显示当日数据。</p>
                <p>3、当日参考盈亏数据并不构成投资建议，不作为账户最终变现的保证。您账户的实际盈亏请以交割单、对账单为准。</p>
            </div>
            <div class="dialog_body" v-if="accountList[activeIndex].bztype === '0_HK'">
                <p>1、当日参考盈亏为当前账户场内持仓证券（港股通）的当日参考盈亏，主要根据场内持仓证券的实时价格、上一交易日收盘价、今日买入价、今日卖出价、持仓数量等进行估算，估算时考虑交易费用。</p>
                <p>2、人民币计价的当日参考盈亏，计算时采用的汇率为1港币={{ggtMiddleRate}}人民币。</p>
                <p>3、交易日8点前以及非交易日显示上一交易日数据，交易日8点至开盘前不显示，交易日开盘后至24点显示当日数据。</p>
                <p>4、当日参考盈亏数据并不构成投资建议，不作为账户最终变现的保证。您账户的实际盈亏请以交割单、对账单为准。</p>
            </div>
            <div class="dialog_body" v-if="accountList[activeIndex].bztype === '1'">
                <p>1、当日参考盈亏为当前账户场内持仓证券的当日参考盈亏，主要根据场内持仓证券的实时价格、上一交易日收盘价、今日买入价、今日卖出价、持仓数量等进行估算，估算时考虑交易费用。</p>
                <p>2、B转H证券计算时采用的汇率为1港币={{exchangeRateHKDtoUSD | exchangeRateFormat}}美元。</p>
                <p>3、交易日8点前以及非交易日显示上一交易日数据，交易日8点至开盘前不显示，交易日开盘后至24点显示当日数据。</p>
                <p>4、当日参考盈亏数据并不构成投资建议，不作为账户最终变现的保证。您账户的实际盈亏请以交割单、对账单为准。</p>
            </div>
            <div class="dialog_body" v-if="accountList[activeIndex].bztype === '2'">
                <p>1、当日参考盈亏为当前账户场内持仓证券的当日参考盈亏，主要根据场内持仓证券的实时价格、上一交易日收盘价、今日买入价、今日卖出价、持仓数量等进行估算，估算时考虑交易费用。</p>
                <p>2、交易日8点前以及非交易日显示上一交易日数据，交易日8点至开盘前不显示，交易日开盘后至24点显示当日数据。</p>
                <p>3、当日参考盈亏数据并不构成投资建议，不作为账户最终变现的保证。您账户的实际盈亏请以交割单、对账单为准。</p>
            </div>
            <div class="dialog_footer">
                <span class="dialog_confirm_button" @click="onCloseTodayPlAlert">我知道了</span>
            </div>
        </common-dialog>
        <common-dialog class="sjsm_dialog" :show.sync="isKyDialogShow" :id="'sjsm_dialog'" >
            <div class="dialog_header">数据说明</div>
            <div class="dialog_body">
                <p>可用于交易的资金，包含可用现金、天天利财一天期产品、信金保、现金增值产品，以及到期的天天利财定期类产品及其收益，到期的国债逆回购等。</p>
                <p>如可用资金多于资产，则可能是因为您持有的天天利财定期类产品今日到期，其产生的收益今日可用，但需日终清算后方可计入资产。</p>
            </div>
            <div class="dialog_footer">
                <span class="dialog_confirm_button" @click="isKyDialogShow = false">我知道了</span>
            </div>
        </common-dialog>
    </div>
</template>
<script>
  import Big from 'big.js';
  import service_otc from '../../../deal/service/trade/service_otc';
  import util from '../../../../util/util';
  import Swiper from '../../../../swiper/js/swiper.min.js';
  import CommonDialog from '../../CommonDialog.vue';
  import service_ptjy from '../../../deal/service/trade/service_ptjy';
  
  require('../../../../util/rem.js');
  require('../../../../swiper/css/swiper.min.css');

  export default{
    data(){
      return {
        accountList: [{
            bztype: '0',
            total: '--',
            sz: '--',
            kq: '--',
            ky: '--',
            yl: '--',
            todayPl: '--',
            ratio: '--'
        }],         

        swiper: '',
        bztype: '0',
        activeIndex: '0',
        fromType: '',
        accountTypeMap: {
            '0': ['SHACCOUNT', 'SZACCOUNT', 'SBACCOUNT'],
            '0_HK': ['HKACCOUNT', 'HKSZACCOUNT'],
            '1': ['SHBACCOUNT', 'SBBACCOUNT'],
            '2': ['SZBACCOUNT','R']
        },
        moneyTypeMap: {
            '0': '人民币账户A股',
            '0_HK': '人民币账户港股',
            '1': '美元账户',
            '2': '港币账户'
        },
        bzTypeMap: {
            'SHACCOUNT': '0',
            'SZACCOUNT': '0',
            'SBACCOUNT': '0',
            'HKACCOUNT': '0_HK',
            'HKSZACCOUNT': '0_HK',
            'SHBACCOUNT': '1',
            'SBBACCOUNT': '1',
            'SZBACCOUNT': '2',
            'R': '2'
        },
        eyeStatus: true,
        isTotalPlDialogShow: false,
        isTodayPlDialogShow: false,
        isKyDialogShow: false,
        ggtMiddleRate: '',
        exchangeRateHKDtoUSD: ''
      }
    },
    ready(){

    },
    attached(){
      this.inits();
    },
    watch: {
        isTodayPlDialogShow(val, oldVal){
            if(!val){
                this.$nextTick(()=>{
                    document.querySelector('.sjsmDialog .dialog_body').scrollTop = 0;
                }); 
            }
        }
    },
    filters:{
        ratioFormat: function(value){
            if (value === '--') {
                return '--';
            }
            return new Big(value).times(new Big(100)).toFixed(2).toString() + '%';
        },
        plFormat: function(value){
            if (value === '--') {
                return '--';
            }
            if(value > 0){
                return '+' + value;
            }
            return value;
        },
        exchangeRateFormat: function(value){
            if(value === '' || isNaN(value)){
                return value;
            }
            return parseFloat(value);
        }
    },
    methods: {
      inits(){
        var that = this;
        that.bztype = util.getUrlParameter('bztype') || '0';
        that.fromType = util.getUrlParameter('fromType') || 'hsj';
        that.accountList[0].bztype = that.bztype;
        H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
            H5TZT.readFileMesg('stockHoldingEyeStatus' + oData.USERCODE, function(oData){
                if(oData === ''){
                    that.eyeStatus = true;
                    that.$dispatch('setEyeStatus', that.eyeStatus);
                    return;
                }
                that.eyeStatus = JSON.parse(decodeURIComponent(oData));
                that.$dispatch('setEyeStatus', that.eyeStatus);
            });
        }); 
      },
      action10061(url){
        this.$TZT.action10061({
          type: 'weituo',
          url: url
        });
      },
      onChangeEyeStatus(){
        var that = this;
        if(that.accountList.length == 1){
            that.eyeStatus = !that.eyeStatus;
            that.$dispatch('setEyeStatus', that.eyeStatus);
            H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
                H5TZT.saveFileMesgSync(JSON.stringify(that.eyeStatus), 'stockHoldingEyeStatus' + oData.USERCODE, function(){});
            });        
        }
      },
      changeEyeStatus(){
        var that = this;
        that.eyeStatus = !that.eyeStatus;
        that.$dispatch('setEyeStatus', that.eyeStatus);
        that.$nextTick(()=>{
            var slides = Array.from(document.querySelectorAll('.swiper-slide'));
            Array.prototype.forEach.call(document.querySelectorAll('.swiper-slide-duplicate'), function(o, i){
                if(i == 0){
                    o.innerHTML = slides[slides.length - 2].innerHTML;
                }
                else{
                    o.innerHTML = slides[1].innerHTML;
                }
            });
        });
        H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
            H5TZT.saveFileMesgSync(JSON.stringify(that.eyeStatus), 'stockHoldingEyeStatus' + oData.USERCODE, function(){});
        });    
      },
      onZylAlert(){
        if(this.accountList.length == 1){
            this.isTotalPlDialogShow = true;
        }
      },
      zylAlert(){
        this.isTotalPlDialogShow = true;
      },
      onTodayPlAlert(){
        if(this.accountList.length == 1){
            if(this.accountList[this.activeIndex].bztype === '0_HK' && !this.ggtMiddleRate){
                this.getHKStockExchangeRate(()=>{
                    this.isTodayPlDialogShow = true;
                });
            }
            else if(this.accountList[this.activeIndex].bztype === '1' && !this.exchangeRateHKDtoUSD){
                this.getExchangeRateHKDtoUSD(()=>{
                    this.isTodayPlDialogShow = true;
                });
            }
            else{
                this.isTodayPlDialogShow = true;
            }
        }
      },
      onCloseTodayPlAlert() {
        this.isTodayPlDialogShow = false;
      },
      todayPlAlert(){
        if(this.accountList[this.activeIndex].bztype === '0_HK' && !this.ggtMiddleRate){
            this.getHKStockExchangeRate(()=>{
                this.isTodayPlDialogShow = true;
            });
        }
        else if(this.accountList[this.activeIndex].bztype === '1' && !this.exchangeRateHKDtoUSD){
            this.getExchangeRateHKDtoUSD(()=>{
                this.isTodayPlDialogShow = true;
            });
        }
        else{
            this.isTodayPlDialogShow = true;
        }
      },
      onKyAlert(){
        if(this.accountList.length == 1 && this.accountList[this.activeIndex].bztype === '0'){
            // alert('可用于交易的资金，包含可用现金、天天利财一天期产品、信金保、现金增值产品，以及到期的天天利财定期类产品及其收益，到期的国债逆回购等。\n\n如可用资金多于总资产，则可能是因为您持有的天天利财定期类产品今日到期，其产生的收益今日可用，但需日终清算后方可计入总资产。');
            this.isKyDialogShow = true;
        }
      },
      kyAlert(){
        if(this.accountList[this.activeIndex].bztype === '0'){
            this.isKyDialogShow = true;
        } 
      },
      jumpToYZZZ(){
        if(this.accountList.length == 1){
            if(this.accountList[this.activeIndex].bztype === '0_HK'){
                this.action10061('/newjy/dcgyh/dcg_index.html?type=0');
                return;
            }
            this.action10061('/newjy/dcgyh/dcg_index.html?type=' + this.accountList[this.activeIndex].bztype);
        }
      },
      jumpToGuoZhai(){
         if(this.accountList.length == 1){
            this.action10061('/newjy/guozhainihuigou/index.html');
        }
      },
      fontSizeFilter(str){
        str= str.split('.')[0]+'';
        if(str.length <= 7) {
            return 'font32';
        }else if( str.length > 7 &&str.length < 9){
            return 'font30';
        }else if(str.length > 8 && str.length < 10) {
            return 'font28';
        }else if(str.length > 9 && str.length < 11) {
            return 'font26';
        }
        else{
            return 'font24';
        }
      },
      todayPlFontSizeFilter(str){
        str= str.split('.')[0]+'';
        if(str.length <= 6) {
            return 'font32';
        }else if( str.length > 6 &&str.length < 8){
            return 'font30';
        }else if(str.length > 7 && str.length < 9) {
            return 'font28';
        }else if(str.length > 8 && str.length < 10) {
            return 'font26';
        }
        else{
            return 'font24';
        }
      },
      getOTCData(fnSuccess){
        H5TZT.readLocalMesg(['tzttraderights'], function(localMesg){
            if(!(localMesg.TZTTRADERIGHTS && localMesg.TZTTRADERIGHTS.indexOf('l') < 0)){
                service_otc.huoQuOTCchiangHeOTCxiuZhengWithCache({}, function (OTCShuJu) {
                    var OTCchiCangShiZhi = OTCShuJu != undefined ? OTCShuJu.OTCChiCang.value : 0;
                    var OTCzaiTuZiJin = OTCShuJu != undefined ? OTCShuJu.OTCXiuZheng.value : 0;
                    var OTCData = new Big(OTCchiCangShiZhi).plus(new Big(OTCzaiTuZiJin)).toString();
                    fnSuccess && fnSuccess(OTCData);
                }, function (err) {
                    fnSuccess && fnSuccess(undefined, false);
                });
            }else{
                fnSuccess && fnSuccess();
            }
        });
      },
      computeAccountData(gridData, oData, oData1, OTCData, OTCStatus){
        var that = this;
        that.accountList.length = 0;
        if(that.fromType != 'ggt'){
            oData.GRID2.shift();
            //个人资产
            $.each(oData.GRID2, function (o, oitem) {
                var aIt = oitem.split('|');
                //币种 人民币  美元 港币
                var type = aIt[oData['2_MONEYTYPECODEINDEX']] || aIt[oData['2_MONEYTYPEINDEX']];
                //可取
                var sKq = aIt[oData['2_AVAILABLEINDEX']];
                //可用
                var sKy = aIt[oData['2_USABLEINDEX']];
                var accountItem = {};
                if (type == '0' || type =='RMB' || type=='rmb') {
                    accountItem.bztype = '0';
                    var rmbHoldingList = gridData.filter((o)=>{
                        return that.accountTypeMap[accountItem.bztype].indexOf(o.wtAccountType) > -1;
                    });
                    try{
                        if(OTCStatus == false){
                            accountItem.total = '--';
                        }
                        else{
                            accountItem.total = new Big(oData.TOTALASSET_RMB).plus(new Big(OTCData || 0)).toFixed(2).toString();
                        }
                    }
                    catch(e){
                        accountItem.total = '--';
                    }
                    try{
                        // 市值 = 证券市值（沪深京、港股、天天利财） - 天天利财市值
                        accountItem.sz = new Big(oData.MKTVAL_RMB).minus(new Big(oData['MKTVAL_ONEDAYBJHG'] || '0')).minus(new Big(oData['MKTVAL_MULTIDAYBJHG'] || '0')).toFixed(2).toString();  
                    }
                    catch(e){
                        accountItem.sz = '--';
                    }
                    // 人民币持仓为空时展示为--
                    if(accountItem.sz == 0 && (!rmbHoldingList || !rmbHoldingList.length)){ 
                        accountItem.sz = '--';
                    }
                    accountItem.kq = sKq;
                    accountItem.ky = sKy;
                    // 人民币持仓为空时展示为--
                    if(oData.TOTALYK_RMB == 0 && (!rmbHoldingList || !rmbHoldingList.length)){ 
                        accountItem.yl = '--';
                    }
                    else{
                        var val = '';
                        try{
                            // 浮动盈亏 = 沪深京总盈亏（不含港股） - 天天利财盈亏
                            val = new Big(oData.TOTALYK_RMB).minus(new Big(oData['TOTALYK_ONEDAYBJHG'] || '0')).minus(new Big(oData['TOTALYK_MULTIDAYBJHG'] || '0')).toFixed(2).toString();
                        }
                        catch(e){
                            val = '--';
                        }
                        accountItem.yl = val;
                    }

                    // 人民币持仓为空时展示为--
                    if(!rmbHoldingList || !rmbHoldingList.length){ 
                        accountItem.todayPl = '--';
                    }
                    else{
                        var isTodayPlValid = false;
                        var todayPl = '0.00';
                        try{
                            rmbHoldingList.forEach(function(o){
                                if(o.todayPl != '--'){
                                    isTodayPlValid = true;
                                    todayPl = new Big(todayPl).plus(new Big(o.todayPl)).toFixed(2).toString();
                                }  
                            });
                            if(!isTodayPlValid){
                                todayPl = '--';
                            }
                            accountItem.todayPl = todayPl;
                        }
                        catch(e){
                            console.error(e)
                            accountItem.todayPl = '--';
                        }
                    }

                    try{
                        accountItem.ratio = new Big(accountItem.sz).div(new Big(accountItem.total)).toFixed(4).toString();
                    }
                    catch(e){
                        accountItem.ratio = '--';
                    }
                    that.accountList.push(accountItem);
                }
                //美元
                else if (type == '1' || type =='USD' || type=='usd') {
                    accountItem.bztype = '1';
                    var usdHoldingList = gridData.filter((o)=>{
                        return that.accountTypeMap[accountItem.bztype].indexOf(o.wtAccountType) > -1;
                    });
                    accountItem.total = oData.TOTALASSET_USD;
                    try{
                        // 美元持仓为空时展示为--
                        if(oData.MKTVAL_USD == 0 && (!usdHoldingList || !usdHoldingList.length)){ 
                            accountItem.sz = '--';
                        }
                        else{
                            accountItem.sz = new Big(oData.MKTVAL_USD).toFixed(2).toString();
                        }  
                    }
                    catch(e){
                        accountItem.sz = '--';
                    }
                    accountItem.kq = sKq;
                    accountItem.ky = sKy;
                    try{
                        // 美元持仓为空时展示为--
                        if(oData.TOTALYK_USD == 0 && (!usdHoldingList || !usdHoldingList.length)){ 
                            accountItem.yl = '--';
                        }
                        else{
                            var val = oData.TOTALYK_USD;
                            accountItem.yl = new Big(val).toFixed(2).toString();
                        }                           
                    }
                    catch(e){
                        accountItem.yl = '--';
                    }

                    // 美元持仓为空时展示为--
                    if(!usdHoldingList || !usdHoldingList.length){ 
                        accountItem.todayPl = '--';
                    }
                    else{
                        var isTodayPlValid = false;
                        var todayPl = '0.00';
                        try{
                            usdHoldingList.forEach(function(o){
                                if(o.todayPl != '--'){
                                    isTodayPlValid = true;
                                    todayPl = new Big(todayPl).plus(new Big(o.todayPl)).toFixed(2).toString();
                                }     
                            });
                            if(!isTodayPlValid){
                                todayPl = '--';
                            }
                            accountItem.todayPl = todayPl;
                        }
                        catch(e){
                            accountItem.todayPl = '--';
                        }
                    }
                
                    try{
                        accountItem.ratio = new Big(accountItem.sz).div(new Big(accountItem.total)).toFixed(4).toString();
                    }
                    catch(e){
                        accountItem.ratio = '--';
                    }
                    that.accountList.push(accountItem);
                }
                //港币
                else if (type == '2' || type =='HK' || type=='hk') {
                    accountItem.bztype = '2';
                    var hkHoldingList = gridData.filter((o)=>{
                        return that.accountTypeMap[accountItem.bztype].indexOf(o.wtAccountType) > -1;
                    });
                    accountItem.total = oData.TOTALASSET_HK;
                    try{
                        // 港币持仓为空时展示为--
                        if(oData.MKTVAL_HK == 0 && (!hkHoldingList || !hkHoldingList.length)){ 
                            accountItem.sz = '--';
                        }
                        else{
                            accountItem.sz = new Big(oData.MKTVAL_HK).toFixed(2).toString();
                        }   
                    }
                    catch(e){
                        accountItem.sz = '--';
                    }
                    accountItem.kq = sKq;
                    accountItem.ky = sKy;
                    try{
                        // 港币持仓为空时展示为--
                        if(oData.TOTALYK_HK == 0 && (!hkHoldingList || !hkHoldingList.length)){ 
                            accountItem.yl = '--';
                        }
                        else{
                            var val = oData.TOTALYK_HK;
                            accountItem.yl = new Big(val).toFixed(2).toString();
                        }  
                    }
                    catch(e){
                        accountItem.yl = '--';
                    }

                    // 港币持仓为空时展示为--
                    if(!hkHoldingList || !hkHoldingList.length){ 
                        accountItem.todayPl = '--';
                    }
                    else{
                        var isTodayPlValid = false;
                        var todayPl = '0.00';
                        try{
                            hkHoldingList.forEach(function(o){
                                if(o.todayPl != '--'){
                                    isTodayPlValid = true;
                                    todayPl = new Big(todayPl).plus(new Big(o.todayPl)).toFixed(2).toString();
                                }      
                            });
                            if(!isTodayPlValid){
                                todayPl = '--';
                            }
                            accountItem.todayPl = todayPl;
                        }
                        catch(e){
                            accountItem.todayPl = '--';
                        }
                    }
                    
                    try{
                        accountItem.ratio = new Big(accountItem.sz).div(new Big(accountItem.total)).toFixed(4).toString();
                    }
                    catch(e){
                        accountItem.ratio = '--';
                    }
                    that.accountList.push(accountItem);  
                }  
            }); 
        }

        if(oData1){
            var accountItem = {};
            accountItem.bztype = '0_HK';
            var rmbHKHoldingList = gridData.filter((o)=>{
                return that.accountTypeMap[accountItem.bztype].indexOf(o.wtAccountType) > -1;
            });
            try{
                if(OTCStatus == false){
                    accountItem.total = '--';
                }
                else{
                    accountItem.total = new Big(oData.TOTALASSET_RMB).plus(new Big(OTCData || 0)).toFixed(2).toString();
                }
            }
            catch(e){
                accountItem.total = '--';
            }
            try{
                // 港股持仓为空时展示为--
                if(oData1.MKTVAL_HK == 0 && (!rmbHKHoldingList || !rmbHKHoldingList.length)){
                    accountItem.sz = '--';
                }
                else{
                    accountItem.sz = new Big(oData1.MKTVAL_HK).toFixed(2).toString();
                }
            }
            catch(e){
                accountItem.sz = '--';
            }
            try{
                // 港股持仓为空时展示为--
                if(oData1.MKTVAL_HK == 0 && (!rmbHKHoldingList || !rmbHKHoldingList.length)){
                    accountItem.yl = '--';
                }
                else{
                    var val = oData1.TOTALYK_HK;
                    accountItem.yl =  new Big(val).toFixed(2).toString();
                }
            }
            catch(e){
                accountItem.yl = '--';
            }
            try{
                accountItem.kq = new Big(oData1.AVAILABLE).toFixed(2).toString();
            }
            catch(e){
                accountItem.kq = '--';
            }
            try{
                accountItem.ky = new Big(oData1.USABLE).toFixed(2).toString();
            }
            catch(e){
                accountItem.ky = '--';
            }

            // 港股持仓为空时展示为--
            if(!rmbHKHoldingList || !rmbHKHoldingList.length){ 
                accountItem.todayPl = '--';
            }
            else{
                var isTodayPlValid = false;
                var todayPl = '0.00';
                try{
                    rmbHKHoldingList.forEach(function(o){
                        if(o.todayPl != '--'){
                            isTodayPlValid = true;
                            todayPl = new Big(todayPl).plus(new Big(o.todayPl)).toFixed(2).toString();
                        }                             
                    });
                    if(!isTodayPlValid){
                        todayPl = '--';
                    }
                    accountItem.todayPl = todayPl;
                }
                catch(e){
                    accountItem.todayPl = '--';
                }
            }
            
            try{
                accountItem.ratio = new Big(accountItem.sz).div(new Big(accountItem.total)).toFixed(4).toString();
            }
            catch(e){
                accountItem.ratio = '--';
            }
            var rmbIndex = that.accountList.findIndex(function(o){
                return o.bztype == '0';
            });
            that.accountList.splice(rmbIndex + 1, 0, accountItem);
        }  

        console.log(that.accountList);     
        // 初始化
        if(!that.swiper){
            that.initSlide();    
        } 
        else{
            that.swiper.destroy();
            that.initSlide(that.activeIndex);    
        }
        that.$dispatch('accountReady', that.accountList , 'hs');  
      },
      initSlide(activeIndex){
        var that = this;
        var initialSlide = 0;
        that.$nextTick(function(){
            var index = that.accountList.findIndex(function(o){
                return o.bztype == that.bztype;
            });
            if(index > -1){
                initialSlide = index;
            }
            if(activeIndex !== undefined && activeIndex !== ''){
                initialSlide = activeIndex;
            }
            that.swiper = new Swiper('.swiper-container', {
                initialSlide: initialSlide,
                noSwiping: that.accountList.length > 1 ? false : true,
                direction: 'horizontal',
                loop: that.accountList.length > 1 ? true : false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: false
                },
                on:{
                    init: function(){
                        that.activeIndex = this.realIndex;
                        if(that.accountList.length == 1){
                            that.$dispatch('slideChangeTransitionEnd', that.accountList[this.realIndex].bztype);
                        }    
                    },
                    tap: function(e){
                        if(that.accountList.length > 1){
                            if(e.target.className.indexOf('little-eye')> -1){
                                that.changeEyeStatus();
                            }
                            if(e.target.className === 'zylquestion' || e.target.className === 'zyltitle'){
                                that.zylAlert();
                            }
                            if(e.target.className === 'todayplquestion' || e.target.className.indexOf('todaypltitle') > -1){
                                that.todayPlAlert();
                            }
                            if(e.target.className === 'kyquestion' || e.target.className.indexOf('kytitle') > -1){
                                that.kyAlert();
                            }
                            if(e.target.className === 'guozhai'){
                                that.action10061('/newjy/guozhainihuigou/index.html');
                            }
                            if(e.target.className === 'band_over'){
                               if(that.accountList[that.activeIndex].bztype === '0_HK'){
                                    that.action10061('/newjy/dcgyh/dcg_index.html?type=0');
                                    return;
                                }
                                that.action10061('/newjy/dcgyh/dcg_index.html?type=' + that.accountList[that.activeIndex].bztype);
                            }
                            if(e.target.className === 'todaypl-data' || e.target.className === 'todaypl-icon' || e.target.className === 'todaypl-click'){
                                maidian.reportEvent('wtjy_cc_drckyk', {
                                    'appkey': 'aa347fba81312f23',
                                    'record_cluster': 'xet_HMA',
                                    'xwhat': 'btn_click',
                                    'title': '委托交易',
                                    'btn_name': '当日参考盈亏',
                                    'btn_module': '持仓',
                                    'btn_module_sub': that.moneyTypeMap[that.accountList[that.activeIndex].bztype],
                                    'function_module': '交易',
                                    'function': '普通沪深京全屏交易'
                                });
                                that.action10061('/vue/ui6/ptjy/today-profit-loss/html/today-profit-loss.html?moneytype=' + that.accountList[that.activeIndex].bztype);
                            }
                        }    
                    },
                    sliderMove: function(){
                        that.$dispatch('slideChangeTransitionStart');
                    },
                    slideChangeTransitionEnd: function(){             
                        that.activeIndex = this.realIndex;
                        console.log(that.activeIndex)         
                        that.$dispatch('slideChangeTransitionEnd', that.accountList[this.realIndex].bztype);
                        console.log('————账户切换到',that.accountList[this.realIndex].bztype, this.realIndex);
                    }
                }
            });
        });      
      },
      // 跳转新当日预估收益
      jumpToNewTodayYk(item){
        if(this.accountList.length == 1){
            maidian.reportEvent('wtjy_cc_drckyk', {
                'appkey': 'aa347fba81312f23',
                'record_cluster': 'xet_HMA',
                'xwhat': 'btn_click',
                'title': '委托交易',
                'btn_name': '当日参考盈亏',
                'btn_module': '持仓',
                'btn_module_sub': this.moneyTypeMap[item.bztype],
                'function_module': '交易',
                'function': '普通沪深京全屏交易'
            });
            this.action10061('/vue/ui6/ptjy/today-profit-loss/html/today-profit-loss.html?moneytype=' + item.bztype);
        }
      },
      getHKStockExchangeRate(fnSuccess, fnFail) {
            var that = this;
            var oSendData = {
                wtaccounttype: 'HKSZACCOUNT'
            }
            service_ptjy.require5107(oSendData).then(function(data){
                if (data.ERRORNO < 0) {
                    that.ggtMiddleRate = '--';
                    alert(data.ERRORMESSAGE);
                    fnSuccess && fnSuccess();
                    return;
                }
                if(!data.GRID0 || data.GRID0.length < 2){
                    that.ggtMiddleRate = '--';
                    fnSuccess && fnSuccess();
                    return;
                }
                that.ggtMiddleRate = '--';
                data.GRID0.shift();
                data.GRID0.forEach((o)=>{
                    var exchangeRateInfo = o.split('|');
                    var buyRate = new Big(exchangeRateInfo[data.BUYRATEINDEX]).toFixed(4).toString();
                    var sellRate = new Big(exchangeRateInfo[data.SELLRATEINDEX]).toFixed(4).toString();
                    that.ggtMiddleRate = new Big(buyRate).plus(new Big(sellRate)).div(2).toFixed(4).toString(); 
                });
                fnSuccess && fnSuccess();
            });
        },
        getExchangeRateHKDtoUSD(fnSuccess, fnFail){
            var that = this;
            var oSendData = {
                moneytype: '2',
                destmoneytype: '1'
            };
            service_ptjy.require5696(oSendData).then((data)=>{
                if (data.ERRORNO < 0) {
                    that.exchangeRateHKDtoUSD = '--';
                    alert(data.ERRORMESSAGE);   
                    fnSuccess && fnSuccess();
                    return;
                }
                if(!data.GRID0 || data.GRID0.length < 2){
                    that.exchangeRateHKDtoUSD = '--';
                    fnSuccess && fnSuccess();
                    return;
                }
                try{
                    that.exchangeRateHKDtoUSD = data.GRID0[1].split('|')[data.BILL_RATEINDEX];
                }
                catch(e){
                    that.exchangeRateHKDtoUSD = '--';
                }
                finally{
                    fnSuccess && fnSuccess();
                }   
            });
        },
	getAllZongZiChan(data, fn) {
            var mzZichanRmb = 0, mzZichanAllRmb;
            var mzZichanUSD = 0, mzZichanAllUSD;
            var mzZichanHK = 0, mzZichanAllHK;
            if (data.GRID2 && data.GRID2.length > 1) {
                data.GRID2.shift();
                var mzzhFlag = data.GRID2.some(function (i) {
                    i = i.split('|');
                    return i[data['2_FUNDACCOUNTTYPEINDEX']] == '1'
                });
                if (mzzhFlag) {
                    service_ptjy.require116({}).then((zhhData) => {
                        console.log('zhhData', zhhData);
                        if (zhhData.GRID0 && zhhData.GRID0.length > 1) {
                            zhhData.GRID0.shift();
                            for (var j = 0; j < zhhData.GRID0.length; j++) {
                                var itemV = zhhData.GRID0[j].split('|');
                                if (itemV[zhhData.FUNDACCOUNTTYPEINDEX] == '2') {
                                    if (itemV[zhhData.MONEYTYPEINDEX] == '0') {
                                        try {
                                            mzZichanRmb = new Big(mzZichanRmb).plus(new Big(Number(itemV[zhhData.ASSETTOTALINDEX]))).toString();
                                            mzZichanAllRmb = new Big(data.TOTALASSET_RMB).plus(new Big(mzZichanRmb)).toString();
                                        } catch (e) {
                                            mzZichanAllRmb = data.TOTALASSET_RMB ? data.TOTALASSET_RMB : '--';
                                        }
                                    } else if (itemV[zhhData.MONEYTYPEINDEX] == '1') {
                                        try {
                                            mzZichanUSD = new Big(mzZichanUSD).plus(new Big(Number(itemV[zhhData.ASSETTOTALINDEX]))).toString();
                                            mzZichanAllUSD = new Big(data.TOTALASSET_USD).plus(new Big(mzZichanUSD)).toString();
                                        } catch (e) {
                                            mzZichanAllUSD = data.TOTALASSET_USD ? data.TOTALASSET_USD : '--';
                                        }
                                    } else if (itemV[zhhData.MONEYTYPEINDEX] == '2') {
                                        try {
                                            mzZichanHK = new Big(mzZichanHK).plus(new Big(Number(itemV[zhhData.ASSETTOTALINDEX]))).toString();
                                            mzZichanAllHK = new Big(data.TOTALASSET_USD).plus(new Big(mzZichanHK)).toString();
                                        } catch (e) {
                                            mzZichanAllHK = data.TOTALASSET_HK ? data.TOTALASSET_HK : '--';
                                        }
                                    } else {
                                        mzZichanAllRmb = data.TOTALASSET_RMB ? data.TOTALASSET_RMB : '--';
                                        mzZichanAllUSD = data.TOTALASSET_USD ? data.TOTALASSET_USD : '--';
                                        mzZichanAllHK = data.TOTALASSET_HK ? data.TOTALASSET_HK : '--';
                                    };

                                }
                            };
                            data.TOTALASSET_RMB = mzZichanAllRmb ? mzZichanAllRmb : data.TOTALASSET_RMB ? data.TOTALASSET_RMB : '--';
                            data.TOTALASSET_USD = mzZichanAllUSD ? mzZichanAllUSD : data.TOTALASSET_USD ? data.TOTALASSET_USD : '--';
                            data.TOTALASSET_HK = mzZichanAllHK ? mzZichanAllHK : data.TOTALASSET_HK ? data.TOTALASSET_HK : '--';
                        };
                        fn && fn(data);
                    }).catch(function () {
                        fn && fn(data);
                    })
                } else {
                    fn && fn(data);
                }
            } else {
                fn && fn(data);
            }
        },
    },
    events:{
      'initAccount':function (gridData, oData, oData1, exchangeRateList) {
        var that = this;
        if(exchangeRateList && exchangeRateList.ggtMiddleRate){
            that.ggtMiddleRate = exchangeRateList.ggtMiddleRate;
        }
        if(exchangeRateList && exchangeRateList.exchangeRateHKDtoUSD){
            that.exchangeRateHKDtoUSD = exchangeRateList.exchangeRateHKDtoUSD;
        }

        if(!oData.GRID2){
            return;
        }
        // A5柜台
        if(oData.APEX_A5_SPECFLAG && oData.APEX_A5_SPECFLAG == '1'){
            service_ptjy.require5735({}).then(function(data){
                if (data.ERRORNO < 0) {
                    alert(data.ERRORMESSAGE);
                    oData.TOTALASSET_RMB = '--';
                    oData.TOTALASSET_USD = '--';
                    oData.TOTALASSET_HK = '--';
                    that.computeAccountData(gridData, oData, oData1, undefined, false);
                    return;
                }
                data.GRID0.shift();            
                data.GRID0.forEach((o)=>{
                    var arr = o.split('|');
                    switch(arr[data.MONEYTYPEINDEX]){
                        case '0':
                            oData.TOTALASSET_RMB = new Big(oData.TOTALASSET_RMB).plus(new Big(arr[data.PRODMARKETVALUEINDEX])).toFixed(2).toString();
                            break;
                        case '1':
                            oData.TOTALASSET_USD = new Big(oData.TOTALASSET_USD).plus(new Big(arr[data.PRODMARKETVALUEINDEX])).toFixed(2).toString();
                            break;
                        case '2':
                            oData.TOTALASSET_HK = new Big(oData.TOTALASSET_HK).plus(new Big(arr[data.PRODMARKETVALUEINDEX])).toFixed(2).toString();
                            break;
                        default:
                            break;
                    }
                });
                that.getOTCData(function(OTCData, OTCStatus){
                    that.computeAccountData(gridData, oData, oData1, OTCData, OTCStatus);
                });
            });
        }
        else{
            var _oData = JSON.parse(JSON.stringify(oData));
            that.getAllZongZiChan(_oData,function(data){
                oData.TOTALASSET_RMB =  data.TOTALASSET_RMB;
                oData.TOTALASSET_USD =  data.TOTALASSET_USD;
                oData.TOTALASSET_HK =  data.TOTALASSET_HK;
                that.getOTCData(function(OTCData, OTCStatus){
                    that.computeAccountData(gridData, oData, oData1, OTCData, OTCStatus);
                });
            });
        }
      },
      'updateAccount':function (gridData) {
        var that = this;
        console.warn(that.accountList)
        var accountListTemp = JSON.parse(JSON.stringify(that.accountList));
        accountListTemp.forEach((o)=>{
            for(var k in o){
                if(k === 'sz' || k === 'yl' || k === 'todayPl' || k === 'ratio'){
                    o[k] = '--';
                }   
            }
        });
        gridData.forEach((o1)=>{
            try{
                var accountItem = accountListTemp.find((o2)=>{
                    return o2.bztype == that.bzTypeMap[o1.wtAccountType];
                });
                if(accountItem){
                    if(o1.sz != '--'){
                        if(accountItem.sz === '--'){
                            accountItem.sz = new Big(0).plus(new Big(o1.shiZhi)).toFixed(2).toString();
                        }
                        else{
                            accountItem.sz = new Big(accountItem.sz).plus(new Big(o1.shiZhi)).toFixed(2).toString();
                        }
                    }             
                    if(o1.yingKui != '--'){
                        if(accountItem.yl === '--'){
                            accountItem.yl = new Big(0).plus(new Big(o1.yingKui)).toFixed(2).toString();
                        }
                        else{
                            accountItem.yl = new Big(accountItem.yl).plus(new Big(o1.yingKui)).toFixed(2).toString();
                        }
                    }

                    if(o1.todayPl != '--'){
                        if(accountItem.todayPl === '--'){
                            accountItem.todayPl = new Big(0).plus(new Big(o1.todayPl)).toFixed(2).toString();
                        }
                        else{
                            accountItem.todayPl = new Big(accountItem.todayPl).plus(new Big(o1.todayPl)).toFixed(2).toString();
                        }
                    }   
                }   
            }
            catch(e){
                console.error(e);
            }
        });
        accountListTemp.forEach((o, i)=>{
            if(o.bztype == '0' || o.bztype == '0_HK'){
                try{
                    var rmbIndex = that.accountList.findIndex((item)=>{
                        return item.bztype == '0'; 
                    });
                    var rmbHKIndex = that.accountList.findIndex((item)=>{
                        return item.bztype == '0_HK'; 
                    });
                    var rmbSzDiffer = '0.00';
                    try{
                        rmbSzDiffer = new Big(accountListTemp[rmbIndex].sz).minus(new Big(that.accountList[rmbIndex].sz));
                    }
                    catch(e){
                        rmbSzDiffer = '0.00';
                    }
                    var rmbHKSzDiffer = '0.00';
                    try{
                        rmbHKSzDiffer = new Big(accountListTemp[rmbHKIndex].sz).minus(new Big(that.accountList[rmbHKIndex].sz));
                    }
                    catch(e){
                        rmbHKSzDiffer = '0.00';
                    }
                    o.total = new Big(o.total).plus(new Big(rmbSzDiffer)).plus(new Big(rmbHKSzDiffer)).toFixed(2).toString();
                }
                catch(e){
                    o.total = '--';
                }
            }
            else{
                try{
                    var szDiffer = '0.00';
                    try{
                        szDiffer = new Big(o.sz).minus(new Big(that.accountList[i].sz));
                    }
                    catch(e){
                        szDiffer = '0.00';
                    }
                    o.total = new Big(o.total).plus(new Big(szDiffer)).toFixed(2).toString();
                }
                catch(e){
                    o.total = '--';
                }
            }
            try{
                o.ratio = new Big(o.sz).div(new Big(o.total)).toFixed(4).toString();
            }
            catch(e){
                o.ratio = '--';
            }
        });
        that.$set('accountList', accountListTemp);
        that.$dispatch('accountReady', that.accountList, 'hq');
        if(that.accountList.length > 1){
            that.$nextTick(()=>{
                var slides = Array.from(document.querySelectorAll('.swiper-slide'));
                Array.prototype.forEach.call(document.querySelectorAll('.swiper-slide-duplicate'), function(o, i){
                    if(i == 0){
                        o.innerHTML = slides[slides.length - 2].innerHTML;
                    }
                    else{
                        o.innerHTML = slides[1].innerHTML;
                    }
                });
            });
        } 
      }
    },
    components:{
        CommonDialog
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
    @font-face {
        font-family: CITIC-Numbers-Medium;
        font-style: normal;
        font-weight: 500;
        src: url(/z_modules/font/CITIC-Numbers-Medium.ttf) format('trueType');
    }
    .font32 {
        font-size: 0.32rem!important;
    }
    .font30 {
        font-size: 0.30rem!important;
    }
    .font28 {
        font-size: 0.28rem!important;
    }
    .font26{
        font-size: 0.26rem!important;
    }
    .font24{
        font-size: 0.24rem!important;
    }
    .cnyName .cnyName_tige {
        width: 6.9rem;
        height: 0.84rem;
        line-height: 0.84rem;
        border-bottom: 0.02rem solid #EBEDEE!important;
        font-family: PingFangSC-Regular;
        font-size: .28rem;
        color: #222222;
        letter-spacing: 0;
        font-weight: 400;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 .3rem;
        img {
            width: 0.36rem;
            height: 0.36rem;
            margin-right: 0.16rem ;
            vertical-align: text-bottom;
        }
        span {
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            line-height: .32rem;
            color: #222222;
        }
        .ratio{
            position: relative;
            width: 1.56rem;
            height: .37rem;
            line-height: .35rem;
            border: .01rem solid rgba(230,230,230,1);
            border-radius: .04rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC-Regular;
            font-size: .22rem;
            color: #6D7A85;
            letter-spacing: 0;
            text-align: center;
            font-weight: 400;
            box-sizing: border-box;
            span {
                font-size: .22rem;
            }
            .num{
                margin-left: .04rem;
                font-family: PingFangSC-Regular;
                color: #6D7A85;
                letter-spacing: 0;
                text-align: center;
                font-weight: 400;
            }
            .progress-bar{
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0,0,0,0.08);
                height: .36rem;
                width: 0;
                z-index: 0;
                transition: all .3s ease-in-out;
                border-radius: .04rem;
            }
            .progress-text{
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: 1;
            }
        }
    }

    .slh{
        .cnyName .cnyName_tige {
            width: auto;
            .ratio{   
                width: 1.84rem;
            }
        }
    }
    
    .slh .ggt-slide .moerysp_ul li{
        padding: 0.32rem 0.4rem 0 0.3rem;
    }

  .moerysp_ul li {
    padding: 0.32rem 0.3rem 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    > div{
        width: 33.3%;
        > p{
            height: .36rem;
            font-family: PingFangSC-Regular;
            font-size: 0.24rem;
            color: #6D7A85;
            font-weight: 400;
            text-align: left;
            white-space: nowrap;
            display: flex;
            align-items: center;
            overflow: visible;
            .zylquestion, .todayplquestion, .kyquestion {
                display: inline-block;
                width: 0.24rem;
                height: 0.24rem;
                background: url(../../../../assets/jy/images/icon-question.png) no-repeat;
                background-repeat: no-repeat;
                background-size: contain;
                margin-left: .1rem;
                flex-shrink: 0;
            }
            .little-eye{
                display: inline-block;
                width: .32rem;
                height: .32rem;
                background: url(../../../../assets/jy/images/open-eye.png) no-repeat;
                background-repeat: no-repeat;
                background-size: contain;
                margin-left: .08rem;
                &.closed {
                    background: url(../../../../assets/jy/images/close-eye.png) no-repeat;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
            } 
        }
        > span{
            display: flex;
            align-items: center;
            font-family: CITIC-Numbers-Medium;
            font-size: 0.36rem;
            color: #222222;
            letter-spacing: 0;
            font-weight: 500;
            text-align: left;
            margin-top: 0.02rem;
            width: 2.3rem;
            /* word-break: break-all; */
            height: 0.48rem;
            line-height: 0.48rem;
            .todaypl-icon {
                width: 0.28rem;
                height: 0.28rem;
                background: url(../../../../assets/jy/images/icon-godetail-new.png) no-repeat;
                background-repeat: no-repeat;
                background-size: 100%;
                margin-top: .02rem;
            }
        }
    }
    .rise{
        color: #E83333 !important;
    }
    .fill {
        color: #169665 !important;
    }
  }
  .band_over, .guozhai{
    display: flex;
    align-items: center;
    justify-content: center;
    width: .76rem;
    height: .36rem;
    line-height: .36rem;
    background: #FDECEC;
    box-sizing: content-box;
    border-radius: .2rem;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: .22rem;
    color: #E83333;
    letter-spacing: 0;
    font-weight: 400;
    margin-left: .08rem;
    // transform: translateX(-25%) scale(0.63);
    flex-shrink: 0;
  }

  .guozhai{
    // width: 1.56rem!important;
    margin-left: .16rem;
  }

  .slh .guozhai {
    width: .9rem;
  }

  .slh-kyTitle {
    min-width: .48rem;
  }

  .todaypl-click {
    width: 1.91rem;
    height: .56rem;
    line-height: .56rem;
    background: #FFFFFF;
    border: 1px solid rgba(222,33,33,1);
    box-sizing: content-box;
    border-radius: .28rem;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: .35rem;
    color: #E83333;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    margin-left: .25rem;
    transform: translateX(-25%) scale(0.63);
  }

  .slh{
    .adBox1{
        // height: 3.13rem!important;
        .band_over, .guozhai {
            // line-height: 0.46rem!important;
        }
        .slh-kyTitle {
            display: inline-block;
            min-width: .48rem!important;
            -ms-flex-negative: 0;
            flex-shrink: 0;
        }
        .slh-todaypltitle {
            display: inline-block;
            -ms-flex-negative: 0;
            flex-shrink: 0;
        }
    }
  }
</style>
<style lang="less">
    .swiper-container{
        height: 100%;
        .swiper-pagination-bullets {
            bottom: .08rem!important;
            font-size: .08rem;
            line-height: 1;
            .swiper-pagination-bullet{
                width: .08rem;
                height: .08rem;
                background: #000000;
                opacity: .15;
                margin: 0 .05rem!important;
            }
            .swiper-pagination-bullet-active{
                background: #222222;
                opacity: .6;
            }
        }
    }

    @media only screen and (min-aspect-ratio: 3/4){
        #sjsm_dialog{
            -webkit-transform: translate3d(-50%,-50%,0) scale(0.8);
                    transform: translate3d(-50%,-50%,0) scale(0.8);
        }
    }

    @media only screen and (min-aspect-ratio: 1/1){
        #sjsm_dialog{
            -webkit-transform: translate3d(-50%,-50%,0) scale(0.6);
                    transform: translate3d(-50%,-50%,0) scale(0.6);
        }
    }

    #sjsm_dialog{
        background-color: #FFFFFF;
        border-radius: .16rem;
        width: 5.92rem;
        top: 50%;
        overflow: hidden; 
        .dialog_header {
            padding-top: 0.4rem;
            padding-bottom: 0.3rem;
            font-family: PingFangSC-Medium;
            font-size: .36rem;
            color: #222222;
            letter-spacing: 0;
            text-align: center;
            font-weight: 500;
            line-height: .36rem;
        }
        .dialog_body {
            padding: 0 0.4rem 0.4rem;
            max-height: 6.88rem;
            overflow-y: auto;
            > p{
                font-family: PingFangSC-Regular;
                font-size: .26rem;
                color: #222222;
                line-height: .4rem;
                font-weight: 400;
                margin-bottom: 0.16rem;
            }
            > p:last-child{
                margin-bottom: 0;
            }
        }
        .dialog_footer {
            position: relative;
            // border-top: 1px solid #E5E5E5;
            padding: 0;
            display: -webkit-flex;
            display: flex;
            text-align: center;
            height: 0.88rem;
            line-height: .88rem;
            -webkit-text-size-adjust: none;
            .dialog_confirm_button {
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                color: #FD242A;
                letter-spacing: 0;
                text-align: center;
                font-weight: 400;
                margin: 0 auto;
            }
        }
        .dialog_footer::after{
            display: block;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #E5E5E5;
            transform: scaleY(0.5);
        }
    } 
</style>