<template>
    <div class="table" id="chicanglist_content_div" style="overflow:hidden;">
        <div class="listPhantom" :style="{height: listHeight + 'px'}"></div>
        <div class="list" :style="{ transform: getTransform }">
            <div class="top-layer">
                <div class="left-column">
                    <div track-by="domKey" v-for="(gi,item) in visibleData">
                        <!-- <div v-show="accountTypeMap[currAccount].indexOf(item.wtAccountType) > -1"> -->
                            <div class="table-list" @click="listFunc(item)">
                                <i class="peishou-icon" v-if="item.stockCodeType == '3' && currAccount != '0_HK'" @click.stop="onPeiShouAlert()"></i>
                                <i class="b2h-icon" v-if="currAccount == '1' && item.stockCodeType == 'h'" @click.stop="onB2HAlert()"></i>
                                <i class="ggcc-icon" :class="{'ggcc-sh':item.wtAccountType == 'HKACCOUNT','ggcc-sz':item.wtAccountType == 'HKSZACCOUNT'}" v-if="currAccount == '0_HK'"></i>
                                <i class="gz-icon" :class="{'gz-sh':item.code == '888880','gz-sz':item.code == '131990'}" v-if="currAccount == '0' && (item.code == '888880' || item.code == '131990')"></i>
                                <div class="cc-piece">
                                    <p :class="item.stockName.length > 13 ? 'spanfont5' : item.stockName.length > (isSLBOpen ? 4 : 5) ? 'spanfont4' :  ''" class="mingcheng">{{geshiValue(item.stockName,INDEX.STOCKNAMEINDEX)}}</p>
                                    <p class="shizhi" v-if="eyeStatus">{{geshiValue(item.shiZhi,INDEX.STOCKVALUEINDEX,!unitFlag)}}</p>
                                    <p class="shizhi" v-else>****</p>
                                </div>  
                            </div>

                            <div id="opctup" style="background-color:transparent;" class="opctup hq" :class="{'ggt': currAccount == '0_HK' || (currAccount == '1' && item.stockCodeType == 'h'), 'opctup-show': item.isUplistShow}" v-show = "item.isUplistShow" :transition="isSLBOpen ? 'slh-expand' : 'expand'">    
                                
                            </div> 

                            <div style="position:relative; height:5.08rem; background-color:transparent; border-bottom: .08rem solid #F5F6F9;" v-if="switchStatus">
                                
                            </div> 
                        <!-- </div> -->
                        
                    </div>
                </div>
                <div class="right-container">
                    <div class="right-columns">
                        <div track-by="domKey" v-for="(gi,item) in visibleData">
                        <!-- <div v-show="accountTypeMap[currAccount].indexOf(item.wtAccountType) > -1"> -->
                            <div class="table-list" :class="{'ggt': currAccount == '0_HK'}" @click="listFunc(item)">
                                <div class="cc-piece1">
                                    <p :class="[item.yingKui>0?'rise':item.yingKui<0?'fill':'']" v-if="eyeStatus">{{geshiValue(item.yingKui,INDEX.YKINDEX,!unitFlag)}}</p>
                                    <p v-else>****</p>
                                    <p :class="item.yingKuiLv>0?'rise':item.yingKuiLv<0?'fill':''">{{item.yingKuiLv}}%</p>
                                </div>
                                <div class="cc-piece1">
                                    <p v-if="eyeStatus">{{geshiValue(item.chiCang,INDEX.STOCKNUMINDEX,!unitFlag)}}</p>
                                    <p v-else>****</p>
                                    <p v-if="eyeStatus">{{geshiValue(item.keYong,INDEX.KYINDEX,!unitFlag)}}</p>
                                    <p v-else>****</p>
                                </div>
                                <div class="cc-piece1">
                                    <p>{{geshiValue(item.chengBen,INDEX.KEEPPRICEINDEX,!unitFlag)}}<span v-if="currAccount == '1' && item.stockCodeType == 'h'">(港)</span></p>
                                    <p>{{geshiValue(item.assetPrice,INDEX.ASSETPRICEINDEX,!unitFlag)}}<span v-if="currAccount == '1' && item.stockCodeType == 'h'">(港)</span></p>
                                </div>
                                <div class="cc-piece1" v-if="currAccount === '0_HK'">
                                    <p :class="[item.todayPlHKD>0?'rise':item.todayPlHKD<0?'fill':'']" v-if="eyeStatus">{{geshiValue(item.todayPlHKD,INDEX.YKINDEX,!unitFlag)}}</p>
                                    <p v-else>****</p>
                                    <p class="hk-unit">(港)</p>
                                </div>
                                <div class="cc-piece1">
                                    <p :class="[item.todayPl>0?'rise':item.todayPl<0?'fill':'']" v-if="eyeStatus">{{geshiValue(item.todayPl,INDEX.YKINDEX,!unitFlag)}}</p>
                                    <p v-else>****</p>
                                </div>
                                <div class="cc-piece1">
                                    <p>{{item.ratio | ratioFormat}}</p>
                                </div>
                            </div>

                            <div id="opctup" style="background-color:transparent;" class="opctup hq" :class="{'ggt': currAccount == '0_HK' || (currAccount == '1' && item.stockCodeType == 'h'), 'opctup-show': item.isUplistShow}" v-show = "item.isUplistShow" :transition="isSLBOpen ? 'slh-expand' : 'expand'">    
                                
                            </div> 

                            <div style="position:relative; height:5.08rem; background-color:transparent; border-bottom: .08rem solid #F5F6F9;" v-if="switchStatus">
                                
                            </div> 
                        <!-- </div> -->
                    </div>
                    
                    
                </div>
                </div>
                
            </div>
            <div class="bottom-layer">
                <div track-by="domKey" v-for="(gi,item) in visibleData">
                    <!-- <div v-show="accountTypeMap[currAccount].indexOf(item.wtAccountType) > -1"> -->
                        <div class="startline" id="startline" style="width:100%;height:0;" v-if = "item.isUplistShow"></div>
                        <div class="table-list" style="background-color:transparent;">
                            
                            
                        </div>

                        <div id="opctup" class="opctup hq" :class="{'ggt': currAccount == '0_HK' || (currAccount == '1' && item.stockCodeType == 'h'), 'opctup-show': item.isUplistShow}" v-show = "item.isUplistShow" :transition="isSLBOpen ? 'slh-expand' : 'expand'">    
                            <div class="operate-container" v-if = "item.isUplistShow">
                                <ul class="j_operate">
                                    <li data-type="buy" @click="buyFunc(item)">
                                        <div class="opctup1">买入</div>
                                    </li>
                                    <li data-type="sale" @click="sellFunc(item)">
                                        <div class="opctup2">卖出</div>
                                    </li>
                                    <li data-type="hq" @click="jumpToHQ(item)">
                                        <div class="opctup3">行情</div>
                                    </li>
                                    <li data-type="gpfp" class="gpfp_isShow" @click="jumpToGPFP(item)">
                                        <div class="opctup5">复盘</div>
                                    </li>
                                    <li data-type="tjd" class="tjd_b" @click="jumpToTJD(item)">
                                        <div class="tjd opctup6 ">条件单</div>
                                    </li>
                                    <li data-type="xgcbj" class="xgcbj_b" v-if="currAccount != '0_HK' && !(currAccount == '1' && item.stockCodeType == 'h')" @click="onChangeKeepPriceShow()">
                                        <div class="xgcbj opctup7 ">修改成本价</div>
                                    </li>
                                </ul>

                            </div>      
                            <div class="details" v-if = "item.isUplistShow">
                                <div class="left-info" :class="{'w45': item.fundAccount.length > 13}">
                                    <p><span>冻结:</span><em>{{item.frozen}}</em></p>
                                    <p><span>证券代码:</span><em>{{item.code}}({{item.wtAccountTypeName}})</em></p>
                                </div>
                                <div class="right-info" :class="{'pl0': item.fundAccount.length > 11, 'w55': item.fundAccount.length > 13}">
                                    <p><span>股东代码:</span><em>{{item.account}}</em></p>
                                    <p><span>资金账号:</span><em>{{item.fundAccount}}</em></p>
                                </div>
                                <div>
                                    <p v-if="currAccount == '0_HK'"><span>成本(人民币):</span><em>{{item.rmbCostPrice}}</em></p>
                                    <p v-else><span>扩位名称:</span><em>{{item.name}}</em></p>
                                </div>
                                <div>
                                    <p><span>盈亏(不含预估卖出费用):</span><em v-if="eyeStatus">{{item.yingKuiWithoutFare}}</em><em v-else>****</em></p>
                                </div>
                            </div>
                            <div class="endline" id="endline" style="width:100%;height:0;" v-if = "item.isUplistShow"></div>
                        </div> 

                        <div style="position:relative; height:5.08rem; background-color: #FFFFFF; border-bottom: .08rem solid #F5F6F9;" class="hqchart" :stockcode="item.code" :stockname="item.name" :wtaccounttype="item.wtAccountType" :account="item.account" :newmarketno="item.newMarketNo" v-if="switchStatus">
                            <div style="height:100%;" @click="jumpToHQ(item)">
                                <hq-chart :stock-code="accountTypeMap['0_HK'].indexOf(item.wtAccountType) > -1 ? 'H' + item.code : item.code" :wt-account-type="item.wtAccountType" :account="item.account" :new-market-no.sync="item.newMarketNo" :is-active="item.isActive" :stock-code-type="item.stockCodeType" :sub-stock-type="item.subStockType"></hq-chart>
                            </div>
                            
                        </div> 
                    <!-- </div> -->
                    
                </div>
            </div>
        </div>
        
    </div>
    <common-dialog :show.sync="isChangeKeepPriceDialogShow" :id="'keepprice_dialog'" :is-mask-click="false">
        <div class="dialog_header">修改成本价</div>
        <div class="dialog_body">
            <div class="txl pupup txl_content">
                <div class="xgcbj_left_title">证券名称：</div>
                <div class="xgcbj_right_content zqmc_height" style="line-height: 1.5;">{{activeStock.stockName}} {{activeStock.code}}</div>
            </div>
            <div class="txl pupup">
                <div class="xgcbj_left_title">原成本价：</div>
                <div class="xgcbj_right_content" style="height: .68rem">{{activeStock.chengBen}}</div>
            </div>
            <div class="txl pupup">
                <div class="xgcbj_left_title">新成本价：</div>
                <div>
                    <div class="xcbj_div xgcbj_right_content" style="height: .68rem">
                        <input id="xgcbj_xcbj" class="xcbj_input" v-model="newKeepprice" autocomplete="off" autofocus="autofocus" @input="onKeeppriceInput()"/>
                        <img src="../../../../assets/jy/images/close.png" class="xgcbj_input_reset" v-show="newKeepprice.length" @click="onResetKeepprice()"/>
                    </div>
                </div>
            </div>
            <div class="txl alert-tip">成本价修改后无法恢复，您确认要修改？</div>
        </div>
        <div class="dialog_footer">
            <span class="dialog_confirm_button" @click="onKeeppriceConfirm">确定</span>
            <span class="dialog_cancel_button" @click="onCancel">取消</span>
        </div>
    </common-dialog>

    <common-dialog :show.sync="isSbBuyShow" :id="'sbtrade_dialog'">
        <div class="zhbox">
            <p class="list">
                <!-- <span @click="sbTradeFunc('13010')">限价买入</span> -->
                <span @click="sbTradeFunc('13014')">定价买入</span>
                <span @click="sbTradeFunc('cjqrmr')">成交确认买入</span>
                <span @click="sbTradeFunc('13016')">互报成交确认买入</span>
            </p>
            <span class="qx" @click="onCancel()"><em class="shu"></em><em class="heng"></em></span>
        </div>
    </common-dialog>

    <common-dialog :show.sync="isSbSellShow" :id="'sbtrade_dialog'">
        <div class="zhbox">
            <p class="list">
                <!-- <span @click="sbTradeFunc('13011')">限价卖出</span> -->
                <span @click="sbTradeFunc('13015')">定价卖出</span>
                <span @click="sbTradeFunc('cjqrmc')">成交确认卖出</span>
                <span @click="sbTradeFunc('13017')">互报成交确认卖出</span>
            </p>
            <span class="qx" @click="onCancel()"><em class="shu"></em><em class="heng"></em></span>
        </div>
    </common-dialog>

    <common-dialog class="sjsm_dialog" :show.sync="isB2HDialogShow" :id="'sjsm_dialog'" >
        <div class="dialog_header">上海B转H持仓市值说明</div>
        <div class="dialog_body">
            <p>当您持有的上海B股转为H股后，成本和市价的计价方式将从美元转为港币，我司将根据“路透社财经数据”中的“港币对美元的转汇比率”，把您持有的上海B转H股资产由港币转换成美元为您提供市值参考。</p>
            <p>您的每次成交结果以中国证券登记结算有限责任公司的实际清算结果为准。</p>
        </div>
        <div class="dialog_footer">
            <span class="dialog_confirm_button" @click="isB2HDialogShow = false">我知道了</span>
        </div>
    </common-dialog>

    <common-dialog class="sjsm_dialog" :show.sync="isPeiShouDialogShow" :id="'sjsm_dialog'" >
        <div class="dialog_header">配售权益提醒</div>
        <div class="dialog_body">
            <p>因您持仓正股，拥有配股或优先配债权。</p>
            <p>假如您计划认购配股或配债，可在交易页面输入配售代码和数量进行操作。假如您不计划认购，则无需进行操作。</p>
            <p>注意，持仓中展示的是配售权益，不是股票或债券，系统也不会自动扣款。</p>
        </div>
        <div class="dialog_footer">
            <span class="dialog_confirm_button" @click="isPeiShouDialogShow = false">我知道了</span>
        </div>
    </common-dialog>

</template>

<script>
    // import Swiper from '../../../../vue-swipe/vue-swiper'
    import GRID from '../../../deal/scripts/GRID'
    import dealUtil from '../../../deal/scripts/dealUtil'
    import service_ptjy from '../../../deal/service/trade/service_ptjy'
    import {browser} from '../../../../util/browser'
    import service_hq_often from '../../../hq/service/common/service_hq_often'
    import service_information_often from '../../../information/service/common/service_information_often'
    import chiCangAutoRefresh from '../../../deal/scripts/chiCangAutoRefresh'
    import CommonDialog from '../../CommonDialog.vue'
    import util from '../../../../util/util'
    import hqChart from '../../../hq/views/chicanghangqingchart.vue'
    import Big from 'big.js'
    import BScroll from '../../../../better-scroll/bscroll.min.js'
    import cache from '../../../../util/cache/cacheDecorator.js'
    import { cacheTime } from '../../../../util/cache/config.js'
    import moment from '../../../../util/momentjs/index.js';

    export default {
        props: ['switchStatus', 'sortArr', 'eyeStatus'],
        data() {
            return {
                gridData: [],
                originData:[],
                gridTitle: [],
                dateArray: [],
                chiCangChengBenXianShuJu: [],
                hkChiCangChengBenXianShuJu: [],
                shiFouXinGu: [],
                paiXuZhi: [],
                loading: false,
                isTJDClicked: false,
                isChangeKeepPriceClicked: false,
                items: [],
                listNumber: 0,
                INDEX: {
                    STOCKCODEINDEX: ''
                },
                HKINDEX:{},
                textTitleArray: [],
                pagecount: 10000,
                loadtype: this.pagecount,
                REREQ: false,
                sbAccount: ['9','三板','SBACCOUNT','SBBACCOUNT'],
                chiCangHqDaiCha:[],
                hq_clicked: 0,
                isChangeKeepPriceDialogShow: false,
                activeStock: {},
                newKeepprice: '',
                isSbBuyShow: false,
                isSbSellShow: false,
                currAccount: '',
                accountTypeMap: {
                    '0': ['SHACCOUNT', 'SZACCOUNT', 'SBACCOUNT'],
                    '0_HK': ['HKACCOUNT', 'HKSZACCOUNT'],
                    '1': ['SHBACCOUNT', 'SBBACCOUNT'],
                    '2': ['SZBACCOUNT','R'],
                },
                A_ARR: [],
                S_FIELD: '',
                hqTimer: '',
                previousReqTime: 0,
                hsTimer: '',
                fareMap: {},
                exchangeTypeMap: {
                    '上海': 'SHACCOUNT',
                    '深圳': 'SZACCOUNT',
                    '特转A': 'SBACCOUNT',
                    '特转B': 'SBBACCOUNT',
                    '沪Ｂ': 'SHBACCOUNT',
                    '深Ｂ': 'SZBACCOUNT',
                    '沪HK': 'HKACCOUNT',
                    '深HK': 'HKSZACCOUNT',
                    'H股全流通': 'R'
                },
                hsExchangeTypeMap: {
                    '1': 'SHACCOUNT',
                    '2': 'SZACCOUNT',
                    '9': 'SBACCOUNT',
                    'A': 'SBBACCOUNT',
                    'D': 'SHBACCOUNT',
                    'H': 'SZBACCOUNT',
                    'G': 'HKACCOUNT',
                    'S': 'HKSZACCOUNT',
                    'R': 'R'
                },
                hsExchangeTypeReverseMap: {
                    'SHACCOUNT': '1',
                    'SZACCOUNT': '2',
                    'SBACCOUNT': '9',
                    'SBBACCOUNT': 'A',
                    'SHBACCOUNT': 'D',
                    'SZBACCOUNT': 'H',
                    'HKACCOUNT': 'G',
                    'HKSZACCOUNT': 'S',
                    'R': 'R'
                },
                unitFlag: true,
                fromType: '',
                scrollTimer: '',
                oldScrollTop: 0,
                newScrollTop: 0,
                isScrolling: false,
                isSLBOpen: false,
                HKStockExchangeRateList: {},
                exchangeRateHKDtoUSD: '',
                isAutoRefresh: false,
                isNoFareClient: false,
                systemDate: '00000000',
                systemTime: '',
                isB2HDialogShow: false,
                isPeiShouDialogShow: false,
                isShowHKDExchangeRate: false,
                isExchangeRateError: false,
                //可视区域高度
                screenHeight: 0,
                //偏移量
                startOffset: 0,
                //起始索引
                startIndex: 0,
                listHeight: 0,
                listOffsetTop: 0,
                listData: [],
                rem: window.rem,
                startX: 0
            }
        },
        computed:{
            // listData(){
            //     var currAccountList = this.gridData.filter((item)=>{
            //         return this.accountTypeMap[this.currAccount].indexOf(item.wtAccountType) > -1;
            //     });
            //     return currAccountList;
            // },
            //计算可见范围内显示列表数据
            visibleData(){
                return this.listData.slice(this.startIndex, Math.min(this.endIndex, this.listData.length));
            },
            //列表总高度
            listHeight(){
                if(JSON.stringify(this.activeStock) === '{}'){
                    return this.listData.length * this.itemHeight;
                }
                else{
                    return this.listData.length * this.itemHeight + this.upListHeight;
                }
            },
            // 每项高度
            itemHeight(){
                return this.switchStatus ? 6.2 * this.rem : 1.12 * this.rem;
            },
            upListHeight(){
                return (this.isSLBOpen ? 3.24 : 3.04) * this.rem;
            },
            //可显示的列表项数
            visibleCount(){
                return Math.ceil(this.screenHeight * 3/2 / this.itemHeight);
            },
            //偏移量对应的style
            getTransform(){
                return `translate3d(0,${this.startOffset}px,0)`;
            },
            endIndex(){
                return this.startIndex + this.visibleCount;
            }
        },
        watch: {
            currAccount(val, oldVal){
                if(oldVal){
                    this.gridData.forEach((o) => {
                        o.isUplistShow = false; 
                    });
                    this.activeStock = {};
                    // this.$dispatch('changeAccount', val);
                    var windowWidth = document.body.clientWidth;  
                    if(this.startX < -0.5 * windowWidth){
                        this.startX = -0.5 * windowWidth;
                    }
                    this.onNoDataShow();
                }  
            }
        },
        filters:{
            ratioFormat: function(value){
                if (value == '--') {
                    return '--';
                }
                return new Big(value).times(new Big(100)).toFixed(2).toString() + '%';
            }
        },
        ready() {
            var that = this;
            this.gridData = [];
            this.gridTitle = [];
            this.dateArray = [];
            this.chiCangChengBenXianShuJu = [];
            this.hkChiCangChengBenXianShuJu = [];
            this.loading = false;
            this.items = [];
            this.listNumber = 0;
            this.textTitleArray = [];
            this.INDEX = {
                STOCKCODEINDEX: ''
            };
            this.currAccount = util.getUrlParameter('bztype') || '0';
            this.fromType = util.getUrlParameter('fromType') || 'hsj';
            
            window.onDisappear = function(){
                console.log('调用onDisappear_parent');
                if(that.hqTimer){
                    clearInterval(that.hqTimer);
                }
                if(that.hsTimer){
                    clearInterval(that.hsTimer);
                }
                that.visibleData.forEach((item)=>{
                    item.isActive = false;
                }); 
            }
            window.GoBackOnLoad = function(){
                console.log('调用GoBackOnLoad_parent');
                that.loadMore();
                // 刷新持仓展开行情开关状态
                that.$dispatch('refreshInitStatus')
            }
            window.onReshow = function(){
                H5TZT.readLocalMesg(["softversion"], function(oData) {
                    var _appversion = navigator.appVersion.toLocaleLowerCase();
                    if(_appversion.indexOf("android") > 0) {
                        if(oData.SOFTVERSION < '5.01.001') {
                            console.log('调用onReshow_parent');
                            that.loadMore();
                        }
                    }
                }); 
            }
            window.timeoutfn = function(){
                that.loadingEnd();
            }
            // window.onresize = function(){
            //     window.location.reload();
            // }

            document.getElementById('app').addEventListener('scroll', function(){   
                that.$dispatch('onScroll');
                if(that.isAutoRefresh && that.hqTimer){
                    clearInterval(that.hqTimer);
                }
                that.isScrolling = true;
                if(that.scrollTimer){
                    clearTimeout(that.scrollTimer);
                }                  
                that.scrollTimer = setTimeout(that.isScrollEnd, 50);
                that.oldScrollTop = document.getElementById('app').scrollTop;
                that.scrollEvent(false);
            });
        },
        attached() {
            this.$dispatch('initTemplate');
            this.initVirtualList();
        },
        methods: {
            scrollEvent(isListFunc) {
                //当前滚动位置
                var scrollTop = document.getElementById('app').scrollTop;
                if(scrollTop > this.listOffsetTop){
                    console.log(this.activeStock)
                    if(JSON.stringify(this.activeStock) !== '{}'){
                        var activeIndex = this.listData.findIndex((o)=>{
                            return this.activeStock.code == o.code && this.activeStock.wtAccountType == o.wtAccountType && this.activeStock.account == o.account;
                        });

                        var maxStartIndex = this.listData.length - this.visibleCount;
                        if(maxStartIndex < 0){
                            maxStartIndex = 0;
                        }
                        if(activeIndex > -1){
                            if(this.startIndex > activeIndex){
                                //此时的开始索引
                                this.startIndex = Math.floor((scrollTop - this.listOffsetTop - this.upListHeight) / this.itemHeight);
                                //此时的结束索引
                                // this.endIndex = this.startIndex + this.visibleCount;
                                if(this.startIndex + this.visibleCount > this.listData.length){
                                    this.startIndex = maxStartIndex;
                                    if(this.startIndex > activeIndex){
                                        if(isListFunc){
                                            this.startIndex = activeIndex;
                                            //此时的偏移量
                                            this.startOffset = this.startIndex * this.itemHeight;
                                        }
                                        else{
                                            //此时的偏移量
                                            this.startOffset = this.startIndex * this.itemHeight + this.upListHeight;
                                        } 
                                    }
                                    else if(this.startIndex == activeIndex){
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    else{
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    return;
                                }
                                if(this.startIndex > activeIndex){
                                    if(isListFunc){
                                        this.startIndex = activeIndex;
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    else{
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight + this.upListHeight;
                                    } 
                                }
                                else if(this.startIndex == activeIndex){
                                    //此时的偏移量
                                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop - this.itemHeight * this.startIndex) % (this.itemHeight + (this.isSLBOpen ? 3.24 : 3.04) * rem));
                                    this.startOffset = this.startIndex * this.itemHeight;
                                }
                                else{
                                    //此时的偏移量
                                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop) % this.itemHeight);
                                    this.startOffset = this.startIndex * this.itemHeight;
                                }
                                return;
                            }
                            else if(this.startIndex == activeIndex){
                                //此时的开始索引
                                this.startIndex += Math.floor((scrollTop - this.listOffsetTop - this.itemHeight * this.startIndex) / (this.itemHeight + this.upListHeight));
                                //此时的结束索引
                                // this.endIndex = this.startIndex + this.visibleCount;
                                if(this.startIndex + this.visibleCount > this.listData.length){
                                    this.startIndex = maxStartIndex;
                                    if(this.startIndex > activeIndex){
                                        if(isListFunc){
                                            this.startIndex = activeIndex;
                                            //此时的偏移量
                                            this.startOffset = this.startIndex * this.itemHeight;
                                        }
                                        else{
                                            //此时的偏移量
                                            this.startOffset = this.startIndex * this.itemHeight + this.upListHeight;
                                        } 
                                    }
                                    else if(this.startIndex == activeIndex){
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    else{
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    return;
                                }
                                if(this.startIndex > activeIndex){
                                    if(isListFunc){
                                        this.startIndex = activeIndex;
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    else{
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight + this.upListHeight;
                                    } 
                                }
                                else if(this.startIndex == activeIndex){
                                    //此时的偏移量
                                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop - this.itemHeight * this.startIndex) % (this.itemHeight + (this.isSLBOpen ? 3.24 : 3.04) * rem));
                                    this.startOffset = this.startIndex * this.itemHeight;
                                }
                                else{
                                    //此时的偏移量
                                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop) % this.itemHeight);
                                    this.startOffset = this.startIndex * this.itemHeight;
                                }
                                return;
                            }
                            else{
                                //此时的开始索引
                                this.startIndex = Math.floor((scrollTop - this.listOffsetTop) / this.itemHeight);
                                //此时的结束索引
                                // this.endIndex = this.startIndex + this.visibleCount;
                                if(this.startIndex + this.visibleCount > this.listData.length){
                                    this.startIndex = maxStartIndex;
                                    if(this.startIndex > activeIndex){
                                        if(isListFunc){
                                            this.startIndex = activeIndex;
                                            //此时的偏移量
                                            this.startOffset = this.startIndex * this.itemHeight;
                                        }
                                        else{
                                            //此时的偏移量
                                            this.startOffset = this.startIndex * this.itemHeight + this.upListHeight;
                                        } 
                                    }
                                    else if(this.startIndex == activeIndex){
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    else{
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    return;
                                }
                                if(this.startIndex > activeIndex){
                                    if(isListFunc){
                                        this.startIndex = activeIndex;
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight;
                                    }
                                    else{
                                        //此时的偏移量
                                        this.startOffset = this.startIndex * this.itemHeight + this.upListHeight;
                                    } 
                                }
                                else if(this.startIndex == activeIndex){
                                    //此时的偏移量
                                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop - this.itemHeight * this.startIndex) % (this.itemHeight + (this.isSLBOpen ? 3.24 : 3.04) * rem));
                                    this.startOffset = this.startIndex * this.itemHeight;
                                }
                                else{
                                    //此时的偏移量
                                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop) % this.itemHeight);
                                    this.startOffset = this.startIndex * this.itemHeight;
                                }
                                return;
                            }
                        }
                    }
                    //此时的开始索引
                    this.startIndex = Math.floor((scrollTop - this.listOffsetTop) / this.itemHeight);
                    //此时的结束索引
                    // this.endIndex = this.startIndex + this.visibleCount;
                    var maxStartIndex = this.listData.length - this.visibleCount;
                    if(maxStartIndex < 0){
                        maxStartIndex = 0;
                    }
                    if(this.startIndex + this.visibleCount > this.listData.length){
                        this.startIndex = maxStartIndex;
                        //此时的偏移量
                        this.startOffset = this.startIndex * this.itemHeight;
                        return;
                    }
                    //此时的偏移量
                    // this.startOffset = (scrollTop - this.listOffsetTop) - ((scrollTop - this.listOffsetTop) % this.itemHeight);
                    this.startOffset = this.startIndex * this.itemHeight;
                }
                else{
                    //此时的开始索引
                    this.startIndex = 0;
                    //此时的结束索引
                    // this.endIndex = this.startIndex + this.visibleCount;
                    //此时的偏移量
                    this.startOffset = 0;
                }
            },
            //页面初始化
            initVirtualList(){
                this.screenHeight = document.body.clientHeight;//客户端高度
                this.listOffsetTop = $('#chicanglist_content_div').offset().top;
                this.startIndex = 0;//列表开始索引
                // this.endIndex = this.startIndex + this.visibleCount;//列表结束索引      
            },
            initScrollSlider(){
                var that = this;                         
                var titleScroll = document.querySelector('.title .right-container');
                var scrollList = document.querySelector('.table .top-layer .right-container');
                window.slider && window.slider.destroy();
                window.titleSlider && window.titleSlider.destroy();

                if(!that.listData.length){
                    return;
                }
                window.slider = new BScroll(scrollList, {
                    click: false,
                    startX: that.startX,
                    scrollX: true,
                    bounce: {
                        left: false,
                        right: false
                    },
                    momentum: false,
                    probeType: 3,
                    eventPassthrough: 'vertical'
                });

                window.titleSlider = new BScroll(titleScroll, {
                    click: false,
                    startX: that.startX,
                    scrollX: true,
                    bounce: {
                        left: false,
                        right: false
                    },
                    momentum: false,
                    probeType: 3,
                    eventPassthrough: 'vertical'
                });

                window.titleSlider.disable();

                window.slider.on('beforeScrollStart', function () {
                    window.slider.on('scroll', scrollEvent);
                });
                window.slider.on('scrollStart', function () {
                    if(that.isAutoRefresh && that.hqTimer){
                        clearInterval(that.hqTimer);
                    }
                    that.$dispatch('setShowMaskPadding', false);
                });

                window.slider.on('touchEnd', function (pos) {
                    window.slider.off('scroll', scrollEvent);
                    if(pos.x == 0){
                        that.startX = 0;
                        that.$dispatch('setShowMaskPadding', true);
                    }
                    var windowWidth = document.body.clientWidth;       
                    if(pos.x < 0 && pos.x > -0.125 * windowWidth){
                        window.slider.scrollTo(0, 0, 500);
                        window.titleSlider.scrollTo(0, 0, 500);                       
                        that.startX = 0;
                    }
                    if(pos.x < -0.125 * windowWidth && pos.x > -0.375 * windowWidth){
                        window.slider.scrollTo(-0.25 * windowWidth, 0, 500);
                        window.titleSlider.scrollTo(-0.25 * windowWidth, 0, 500);
                        that.startX = -0.25 * windowWidth;
                    }
                    if(pos.x < -0.375 * windowWidth && pos.x > -0.625 * windowWidth){
                        window.slider.scrollTo(-0.5 * windowWidth, 0, 500);
                        window.titleSlider.scrollTo(-0.5 * windowWidth, 0, 500);
                        that.startX = -0.5 * windowWidth;
                    }
                    if(pos.x < -0.625 * windowWidth && pos.x > -0.875 * windowWidth){
                        window.slider.scrollTo(-0.75 * windowWidth, 0, 500);
                        window.titleSlider.scrollTo(-0.75 * windowWidth, 0, 500);
                        that.startX = -0.75 * windowWidth;
                    }   
                    setTimeout(()=>{
                        if(window.slider.x == 0){
                            that.$dispatch('setShowMaskPadding', true);
                        }
                    }, 500);

                });
                window.slider.on('scrollEnd', function () {
                    if(that.isAutoRefresh){
                        that.setHqInterval(true);
                    } 
                });

                function scrollEvent(pos){
                    window.titleSlider.scrollTo(pos.x, 0);
                }
            },
            isScrollEnd() {
                var that = this;
                that.newScrollTop = document.getElementById('app').scrollTop;
                if(that.newScrollTop == that.oldScrollTop){
                    that.isScrolling = false;
                    // console.log('滚动结束了', that.isScrolling)
                    if(that.isAutoRefresh){
                        that.setHqInterval(true);
                    } 
                }
            },
            huoQuBanBenHao(val, fn) {
                H5TZT.readLocalMesg(["softversion"], function (oData) {
                    //版本号
                    var result = '';
                    if (oData.SOFTVERSION >= val) {
                        result = true;
                    } else {
                        result = false;
                    }
                    fn && fn(result);
                });
            },
            // 跳转买入
            buyFunc(item){
                var that = this;
                // 三板
                if(that.sbAccount.indexOf(item.wtAccountType) > -1){
                    // 新三板、北交所优先股
                    if(item.stockCodeType == 'z' && (item.subStockType == 'z2' || item.subStockType == 'z4')){
                        that.isSbBuyShow = true;
                    }
                    // 新三板、北交所可转债
                    else if(item.stockCodeType == 'y'){
                        that.$TZT.action10061({
                            type: 'weituo',
                            url: '/newjy/jskzz/html/chengJiaoHuBaoMaiMai.html?direction=buy&type=' + (item.stbLayerFlag == '3' ? 'jskzz' : 'xsb')
                        });
                    }
                    else{
                        // 新三板普通股
                        if(item.stbLayerFlag != '3'){
                            that.huoQuBanBenHao('5.00.001', function(type) {
                                if(type){
                                    // 最新版本
                                    that.$TZT.tradeaction({
                                        action: '12310',
                                        stockcode: item.code,
                                        wtaccount: item.account,
                                        wtaccounttype: item.wtAccountType
                                    }, that);
                                }else{
                                    // 旧版
                                    onJsOverrideUrlLoading("http://action:10090/?url=" + encodeURIComponent('http://action:13010/?stockcode='+item.code+'&&wtaccount='+item.account+'&&wtaccounttype='+item.wtAccountType));
                                }
                            })
                        }
                        // 北交所普通股
                        else{
                            that.$TZT.tradeaction({
                                action: '12310',
                                stockcode: item.code,
                                wtaccount: item.account,
                                wtaccounttype: item.wtAccountType
                            }, that);
                        }
                    }
                    return;
                }
                that.$TZT.tradeaction({
                    action: that.currAccount == '0_HK' ? '16010' : '12310',
                    stockcode: item.code,
                    wtaccount: item.account,
                    wtaccounttype: item.wtAccountType
                }, that);
            },
            // 跳转卖出
            sellFunc(item){
                var that = this;
                // 三板
                if(that.sbAccount.indexOf(item.wtAccountType) > -1){
                    // 新三板、北交所优先股
                    if(item.stockCodeType == 'z' && (item.subStockType == 'z2' || item.subStockType == 'z4')){
                        that.isSbSellShow = true;
                    }
                    // 新三板、北交所可转债
                    else if(item.stockCodeType == 'y'){
                        that.$TZT.action10061({
                            type: 'weituo',
                            url: '/newjy/jskzz/html/chengJiaoHuBaoMaiMai.html?direction=sell&type=' + (item.stbLayerFlag == '3' ? 'jskzz' : 'xsb')
                        });
                    }
                    else{
                        // 新三板普通股
                        if(item.stbLayerFlag != '3'){
                            that.huoQuBanBenHao('5.00.001', function(type) {
                                if(type){
                                    // 最新版本
                                    that.$TZT.tradeaction({
                                        action: '12311',
                                        stockcode: item.code,
                                        wtaccount: item.account,
                                        wtaccounttype: item.wtAccountType
                                    }, that);
                                }else{
                                    // 旧版
                                    onJsOverrideUrlLoading("http://action:10090/?url=" + encodeURIComponent('http://action:13011/?stockcode='+item.code+'&&wtaccount='+item.account+'&&wtaccounttype='+item.wtAccountType));
                                }
                            })
                            
                        }
                        // 北交所普通股
                        else{
                            that.$TZT.tradeaction({
                                action: '12311',
                                stockcode: item.code,
                                wtaccount: item.account,
                                wtaccounttype: item.wtAccountType
                            }, that);
                        }
                    }
                    return;
                }
                that.$TZT.tradeaction({
                    action: that.currAccount == '0_HK' ? '16011' : '12311',
                    stockcode: item.code,
                    wtaccount: item.account,
                    wtaccounttype: item.wtAccountType
                }, that);
            },
            // 三板交易
            sbTradeFunc(action){
                this.onCancel();
                if(action){
                    if(action === 'cjqrmr'){
                        this.$TZT.action10061({
                            type: 'weituo',
                            url: '/newjy/gz/gz_gjqr.html?sType=0'
                        }); 
                        return; 
                    }
                    if(action === 'cjqrmc'){
                        this.$TZT.action10061({
                            type: 'weituo',
                            url: '/newjy/gz/gz_gjqr.html?sType=1'
                        }); 
                        return; 
                    }
                    onJsOverrideUrlLoading("http://action:10090/?url=" + encodeURIComponent('http://action:'+action+'/?stockcode='+this.activeStock.code+'&&wtaccount='+this.activeStock.account+'&&wtaccounttype='+this.activeStock.wtAccountType));
                }   
            },
            // 跳转股票复盘
            jumpToGPFP(item){
                var that = this;
                var url = '/newjy/gupiaofupan/chiCangGu/index.html?gupiaoType=0&stockCode='+item.code+'&stockName='+encodeURIComponent(item.stockName)+'&stockType='+item.stockCodeType;
                if(that.currAccount == '0_HK'){
                    url = '/newjy/gupiaofupan/chiCangGu/index.html?gupiaoType=1&stockCode='+item.code+'&stockName='+encodeURIComponent(item.stockName);
                }
                H5TZT.saveMapMesg({C_DETAIL: JSON.stringify(item.oWTINFO)}, function(oData){
                    that.$TZT.action10061({
                        type: 'weituo',
                        url: url,
                        secondtype: '99',
                        secondtext: '更多建仓',
                        secondjsfuncname: 'jump_moreJianCang()'
                    });
                });
            },
            // 跳转行情
            jumpToHQ(item){
                var that = this;
                that.isNeedHqDeal(function(needFlag){
                    if(needFlag) {
                        if(that.hq_clicked == 0) {
                            that.hq_clicked = 1;
                            that.getHqInfo(false, function(){
                                // 取不到市场代码走旧方法
                                if(!item.newMarketNo || item.newMarketNo == '0' || item.newMarketNo == 'undefined') {
                                    that.hq_clicked = 0;
                                    that.toStockDetails(item.code, item.wtAccountType);
                                    return;
                                }
                                var stockList = [];
                                var _appversion = navigator.appVersion.toLocaleLowerCase();
                                that.gridData.forEach(function(o){
                                    if(that.accountTypeMap[that.currAccount].indexOf(o.wtAccountType) > -1){
                                        var status = '0';
                                        if(o.code && o.code == item.code && o.wtAccountType == item.wtAccountType) {
                                            status = '1';
                                        }
                                        if(that.currAccount == '0_HK'){
                                            var idx = stockList.findIndex((o1)=>{
                                                return o1.split('|')[0] == 'H' + o.code;
                                            });
                                            // 去除沪深港通重复代码
                                            if(idx == -1){
                                                if(_appversion.indexOf("iphone") > 0) {
                                                    stockList.push('H' + o.code + '|' + o.newMarketNo + '|' + status + '|' + o.stockProCode);
                                                } else if(_appversion.indexOf("android") > 0) {
                                                    stockList.push('H' + o.code + '|' + o.newMarketNo + '|' + status);
                                                }
                                            }  
                                            else{
                                                // 当前选中的 删除之前重复的代码
                                                if(o.code && o.code == item.code && o.wtAccountType == item.wtAccountType && o.account == item.account) {
                                                    stockList.splice(idx, 1);
                                                    if(_appversion.indexOf("iphone") > 0) {
                                                        stockList.push('H' + o.code + '|' + o.newMarketNo + '|' + status + '|' + o.stockProCode);
                                                    } else if(_appversion.indexOf("android") > 0) {
                                                        stockList.push('H' + o.code + '|' + o.newMarketNo + '|' + status);
                                                    }
                                                }
                                            }     
                                        }
                                        else{
                                            var idx = stockList.findIndex((o1)=>{
                                                return o1.split('|')[0] == o.code && o1.split('|')[1] == o.newMarketNo;
                                            });
                                            // 去除沪深京重复市场代码（不同股东号）
                                            if(idx == -1){
                                                if(_appversion.indexOf("iphone") > 0) {
                                                    stockList.push(o.code + '|' + o.newMarketNo + '|' + status + '|' + o.stockProCode);
                                                } else if(_appversion.indexOf("android") > 0) {
                                                    stockList.push(o.code + '|' + o.newMarketNo + '|' + status);
                                                }
                                            } 
                                            else{
                                                // 当前选中的 删除之前重复的代码
                                                if(o.code && o.code == item.code && o.wtAccountType == item.wtAccountType && o.account == item.account) {
                                                    stockList.splice(idx, 1);
                                                    if(_appversion.indexOf("iphone") > 0) {
                                                        stockList.push(o.code + '|' + o.newMarketNo + '|' + status + '|' + o.stockProCode);
                                                    } else if(_appversion.indexOf("android") > 0) {
                                                        stockList.push(o.code + '|' + o.newMarketNo + '|' + status);
                                                    }
                                                }  
                                            }     
                                        }
                                    }  
                                });
                                that.hq_clicked = 0;
                                console.log(stockList)
                                that.toStockDetailsNew(stockList);
                            });
                        }else{
                            console.log('重复点击');
                        }
                    }else{
                        that.toStockDetails(item.code, item.wtAccountType);
                    }
                });
            },
            // 跳转条件单
            jumpToTJD(item){
                var that = this;
                if(!that.isTJDClicked){
                    that.isTJDClicked = true;
                    maidian.reportEvent('jy_pt_cc_tjd');//条件单
                    
                    /*条件单*/
                    var oSendData ={
                        StockCode: that.currAccount == '0_HK'? 'H' + item.code : item.code,
                    };
                    if(that.currAccount != '0_HK'){
                        oSendData.WTACCOUNTTYPE = item.wtAccountType;
                    }
                    service_hq_often.require33(oSendData).then((oData)=> {
                        if(!oData || oData.ERRORNO < 0 || !oData.BUYSELL){
                            alert(oData.ERRORMESSAGE);
                            that.isTJDClicked = false;
                            return;
                        }
                        // 限制标的范围
                        var _stockprop = oData.STOCKPROP.split("");
                        var stockMarketEn = that.getStockMarketEn('', oData.NEWMARKETNO, _stockprop);
                        if (stockMarketEn == '') {
                            alert('该证券不支持条件单操作。');
                        } else {
                            // 港股通
                            if(that.currAccount == '0_HK'){
                                that.$TZT.action10061({
                                    type: 'weituo',
                                    url: '/newjy/newtjd/quanXian/html/jump.html?stockcode=H' + item.code + '&stockmkt=' + item.wtAccountType + '&stockname=' + encodeURIComponent(oData.STOCKNAME)
                                });
                            }
                            else{
                                that.$TZT.action10061({
                                    type: 'weituo',
                                    url: '/newjy/newtjd/quanXian/html/jump.html?stockcode=' + item.code + '&stockmkt=' + stockMarketEn + '&stockname=' + encodeURIComponent(oData.STOCKNAME)
                                });
                            }    
                        }
                        that.isTJDClicked = false;
                    }).catch((e)=>{
                        console.err(e);
                        that.isTJDClicked = false; 
                    });
                }
            },
            //获取市场英文标志
            getStockMarketEn(_maket_flag, newmarketno, _stockprop) {
                var _stockmarket = '';
                if(newmarketno=='8450') {//港股ETF
                    _stockmarket = '';
                }
                else if(_maket_flag==1) {
                    _stockmarket = 'SHACCOUNT';
                }else if(_maket_flag==2) {
                    _stockmarket = 'SZACCOUNT';
                }else if(newmarketno == '4353' || newmarketno=='4359'){//沪市
                    _stockmarket = 'SHACCOUNT';
                }else if(newmarketno == '4609' || newmarketno == '4619' || newmarketno == '4614'){//深市
                    _stockmarket = 'SZACCOUNT';
                }else if(newmarketno=='4617'){//深圳ETF
                    _stockmarket = 'SZACCOUNT';
                }else if(newmarketno=='4361'){//上海ETF
                    _stockmarket = 'SHACCOUNT';
                }else if(newmarketno=='4616'){//深圳LOF
                    _stockmarket = 'SZACCOUNT';
                }else if(newmarketno=='4360'){//上海LOF
                    _stockmarket = 'SHACCOUNT';
                }else if(newmarketno=='4621'){//深圳CDR
                    _stockmarket = 'SZACCOUNT';
                }else if(newmarketno=='4365'){//上海CDR
                    _stockmarket = 'SHACCOUNT';
                }else if(_stockprop.length>0 && _stockprop[29]=='1' && _stockprop[30]=='2' && _stockprop[31]=='6'){ //上海可转债
                    _stockmarket = 'SHACCOUNT';
                }else if(_stockprop.length>0 && _stockprop[29]=='2' && _stockprop[30]=='2' && _stockprop[31]=='4'){ //深圳可转债
                    _stockmarket = 'SZACCOUNT';
                }
                else if(_stockprop.length>0 && _stockprop[0]=='1'){ //港股通
                    var ggt_market = '';
                    if(_stockprop.length>7) {
                        if(_stockprop[7] == '1') {
                            ggt_market += 'HKACCOUNT';
                        }
                    }
                    if(_stockprop.length>8) {
                        if(_stockprop[8] == '1') {
                            ggt_market += 'HKSZACCOUNT';
                        }
                    }
                    _stockmarket = ggt_market;
                }
                return _stockmarket;
            },
            // 点击修改成本价
            onChangeKeepPriceShow(){
                this.newKeepprice = '';
                this.isChangeKeepPriceDialogShow = !this.isChangeKeepPriceDialogShow;
            },
            // 修改成本价输入控制
            onKeeppriceInput(){
                var that = this;
                that.newKeepprice = that.newKeepprice.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                if(that.newKeepprice && that.newKeepprice.length > 0) {
                    if(that.newKeepprice.substr(0,1)=='.') {
                        that.newKeepprice = that.newKeepprice.substr(1);
                    }
                    var _val_arr = that.newKeepprice.split('.');
                    if(_val_arr[1] && _val_arr[1].length > 3) {
                        that.newKeepprice = _val_arr[0] + '.' + _val_arr[1].substr(0,3);
                    }
                }
            },
            // 修改成本价输入清空
            onResetKeepprice(){
                this.newKeepprice = '';
            },
            // 修改成本价弹框确定
            onKeeppriceConfirm(){
                var that = this;
                if(!that.isChangeKeepPriceClicked){
                    that.isChangeKeepPriceClicked = true;
                    var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
                    if(!re.test(that.newKeepprice)) { 
                        alert('请输入数字');
                        that.isChangeKeepPriceClicked = false;
                        return;
                    }
                    if(+that.newKeepprice*1000 < 1) {
                        alert("新成本价必须大于0");
                        that.isChangeKeepPriceClicked = false;
                        return;
                    }
                    if(+that.newKeepprice*1000>100000*1000) {
                        alert("新成本价必须小于100000");
                        that.isChangeKeepPriceClicked = false;
                        return;
                    }
                    var oSendData = {
                        price: that.newKeepprice,
                        stockcode: that.activeStock.code,
                        WTACCOUNTTYPE: that.activeStock.wtAccountType,
                        WTACCOUNT : that.activeStock.account
                    }
                    that.changeKeepprice(oSendData, function(){
                        that.onCancel();
                        that.isChangeKeepPriceClicked = false;
                    }, function(){
                        that.isChangeKeepPriceClicked = false;
                    }); 
                }
            },
            // 修改成本价请求 5175
            changeKeepprice(oSend, fnSuccess, fnFail) {
                var that = this;
                service_ptjy.require5175(oSend)
                .then((oData) => {
                    if (oData.ERRORNO < 0) {
                        fnFail && fnFail();  
                        return;
                    }
                    alert("成本价修改成功");
                    that.loadMore();
                    fnSuccess && fnSuccess();   
                });
            },
             // 三板买入卖出、修改成本价弹框取消
            onCancel(){
                this.isSbBuyShow = false;
                this.isSbSellShow = false;
                this.isChangeKeepPriceDialogShow = false;
            },
            // 新版跳转行情
            toStockDetailsNew(stockList){
                onJsOverrideUrlLoading("http://action:58320/?stocklist=" + stockList.join(','));
            },
             // 旧版跳转行情
            toStockDetails(stockCode, wtAccountType) {
                // 港股通行情
                if(this.currAccount == '0_HK'){
                    onJsOverrideUrlLoading("http://action:12051/?stockcode=H" + stockCode);
                }
                onJsOverrideUrlLoading("http://action:12051/?stockcode=" + stockCode + "&&wtaccounttype=" + wtAccountType);
            },
            // 市场类型转换
            changeMarketType(marketType){
                return marketType==='SHACCOUNT'?'SSE':marketType==='SZACCOUNT'?'SZSE':'';
            },
             // 判断是否需要行情处理
            isNeedHqDeal(fnSuccess) {   
                var currHoldingList = this.gridData.filter((item)=>{
                    return this.accountTypeMap[this.currAccount].indexOf(item.wtAccountType) > -1;
                });
                if(!currHoldingList.length || currHoldingList.length > 200){
                    fnSuccess && fnSuccess(false);
                    return;
                }
                try{
                    H5TZT.readLocalMesg(["softversion"], function(oData) {
                        var result = false;
                        var _appversion = navigator.appVersion.toLocaleLowerCase();
                        if(_appversion.indexOf("iphone") > 0) {
                            if(oData.SOFTVERSION >= '4.01.009') {
                                result = true;
                            } else {
                            result = false;
                            }
                        } else if(_appversion.indexOf("android") > 0) {
                            if(oData.SOFTVERSION >= '4.01.011') {
                                result = true;
                            } else {
                                result = false;
                            }
                        }
                        fnSuccess && fnSuccess(result);
                    });
                }catch(e){
                    fnSuccess && fnSuccess(false);
                }
            },
            setHsInterval(isImmediate, fnSuccess, fnFail){
                var that = this;
                if(that.hsTimer){
                    clearInterval(that.hsTimer);
                }
                if(isImmediate){
                    that.loadMore();
                }

                that.hsTimer = setInterval(function(){
                    that.loadMore();
                }, 5*60*1000);  
            },
            setHqInterval(isImmediate, fnSuccess, fnFail){
                var that = this;
                
                if(that.hqTimer){
                    clearInterval(that.hqTimer);
                }
                if(isImmediate){
                    var currTime = new Date().getTime();
                    if(currTime - that.previousReqTime >= 5000){
                        that.previousReqTime = currTime;
                        getHqFunc();
                    }  
                }

                that.hqTimer = setInterval(function(){
                    getHqFunc();
                }, 5000);  
                
                function getHqFunc(){
                    // 如果117正在加载，则退出
                    if (that.loading) {
                        return;
                    }
                    // 随行情一同刷新行情图
                    that.$broadcast('refreshHKMinDataTime')
                    that.getHqInfo(true, function(){
                        that.$dispatch('setComputedHoldingData', that.gridData);
                    });
                }   
            },
            getClientFare(fnSuccess, fnFail) {
                var that = this;
                H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
                    var fileName = 'clientFare' + oData.USERCODE;
                    H5TZT.readFileMesg(fileName, function(oFile){
                        if(oFile){
                            var data = JSON.parse(decodeURIComponent(oFile));
                            if(that.systemDate == data.updateDate){
                                that.fareMap = JSON.parse(JSON.stringify(data.clientFare));
                                console.log(that.fareMap);
                                fnSuccess && fnSuccess(); 
                                return;
                            }
                        }
                        
                        var oSendData = {
                            direction: '2',
                            sourcekind: '0,1,104'
                        };
                        service_ptjy.require5850(oSendData)
                            .then((data) => {
                                if (data.ERRORNO < 0) {
                                    fnFail && fnFail();
                                    // $.alert(data.ERRORMESSAGE);
                                    return;
                                }
                                if(data.GRID0 && data.GRID0.length > 0){
                                    for(var n = 1; n < data.GRID0.length; n++){
                                        var arr = data.GRID0[n].split('|');
                                        // 只取来源类别为0，1，104的费率
                                        if(arr[data.SOURCEKINDINDEX] != '0' && arr[data.SOURCEKINDINDEX] != '1' && arr[data.SOURCEKINDINDEX] != '104'){
                                            continue;
                                        }
                                        // 股转、京市只取来源类别为104的费用
                                        if(arr[data.EXCHANGETYPEINDEX] == '特转A' || arr[data.EXCHANGETYPEINDEX] == '特转B'){
                                            if(arr[data.SOURCEKINDINDEX] != '104'){
                                                continue;
                                            } 
                                        } 
                                        // 港股通只取来源类别为0的费用
                                        else if(arr[data.EXCHANGETYPEINDEX] == '沪HK' || arr[data.EXCHANGETYPEINDEX] == '深HK'){
                                            if(arr[data.SOURCEKINDINDEX] != '0'){
                                                continue;
                                            }  
                                        }
                                        // 沪深AB股及H股全流通基金只取来源类别为1的费用
                                        else{
                                            // 生产已有使用来源类别为1的证券类别
                                            var ofStockTypeList = ['1','3','A','D','F','K','L','M','N','T','V','i','k','l','r'];
                                            if(ofStockTypeList.indexOf(arr[data.STOCKTYPEODEINDEX]) > -1 && arr[data.SOURCEKINDINDEX] != '1'){
                                                continue;
                                            }
                                        }
                                        // 只取委托方式、委托类别、委托属性为全部的费率
                                        if(arr[data.WTFSINDEX] != '!' || arr[data.ENTRUSTTYPEINDEX] != '!' || arr[data.ENTRUSTPROPINDEX] != '!'){
                                            continue; 
                                        }
                                        if(that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]){
                                            if(!that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]]){
                                                that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]] = {};
                                            }
                                            if(!that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]]){
                                                that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]] = {};
                                            }
                                            if(!that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]]){
                                                that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]] = {};
                                            }
                                            else{
                                                // 优先采用非9999费用类型的费用串
                                                if(arr[data.FAREKINDINDEX] == '9999'){
                                                    continue;
                                                }
                                            }
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare0 = arr[data.COMMISIONINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare0_par = arr[data.FARE0PARINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].min_fare0 = arr[data.MINFARE0INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].max_fare0 = arr[data.MAXFARE0INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare1 = arr[data.FARE1INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare1_par = arr[data.FARE1PARINDEX || '17'];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].min_fare1 = arr[data.MINFARE1INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].max_fare1 = arr[data.MAXFARE1INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare2 = arr[data.FARE2INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare2_par = arr[data.FARE2PARINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].min_fare2 = arr[data.MINFARE2INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].max_fare2 = arr[data.MAXFARE2INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare3 = arr[data.FARE3RATIOINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].fare3_par = arr[data.FARE3PARINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].min_fare3 = arr[data.MINFARE3INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].max_fare3 = arr[data.MAXFARE3INDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].farex = arr[data.FAREXRATIOINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].farex_par = arr[data.FAREXPARINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].min_farex = arr[data.MINFAREXINDEX];
                                            that.fareMap[that.exchangeTypeMap[arr[data.EXCHANGETYPEINDEX]]][arr[data.STOCKTYPEODEINDEX]][arr[data.SUBSTOCKTYPEINDEX]].max_farex = arr[data.MAXFAREXINDEX];
                                        }   
                                    }
                                    console.log(that.fareMap);
                                    var file = {};
                                    file.updateDate = that.systemDate;
                                    file.clientFare = JSON.parse(JSON.stringify(that.fareMap));

                                    H5TZT.saveFileMesg(JSON.stringify(file), fileName, function(oData){
                                       fnSuccess && fnSuccess();
                                    });
                                }
                                else{
                                     fnFail && fnFail();
                                }
                        }).catch((err)=>{
                            console.error(err);
                            fnFail && fnFail();
                        });
                    },function(){
                        fnFail && fnFail();
                    });
                }, function(){
                    fnFail && fnFail();
                });   
            },
            getExchangeRateHKDtoUSD(fnSuccess, fnFail){
                var that = this;
                that.exchangeRateHKDtoUSD = '';
                var oSendData = {
                    moneytype: '2',
                    destmoneytype: '1'
                };
                service_ptjy.require5696(oSendData).then((data)=>{
                    if (data.ERRORNO < 0) {
                        that.isExchangeRateError = true;
                        that.exchangeRateHKDtoUSD = '--';
                        alert(data.ERRORMESSAGE);   
                        fnSuccess && fnSuccess();
                        return;
                    }
                    if(!data.GRID0 || data.GRID0.length < 2){
                        that.isExchangeRateError = true;
                        that.exchangeRateHKDtoUSD = '--';
                        fnSuccess && fnSuccess();
                        return;
                    }
                    try{
                        that.exchangeRateHKDtoUSD = data.GRID0[1].split('|')[data.BILL_RATEINDEX];
                    }
                    catch(e){
                        that.isExchangeRateError = true;
                        that.exchangeRateHKDtoUSD = '--';
                    }
                    finally{
                        fnSuccess && fnSuccess();
                    }   
                });
            },
            // 行情请求 60
            getHqInfo(isHqPrice, fnSuccess){
                var that = this;
                that.chiCangHqDaiCha.length = 0;

                var currHoldingList = [];
                if(isHqPrice && (that.currAccount == '0' || that.currAccount == '0_HK')){
                    currHoldingList = that.gridData.filter((item)=>{
                        return that.accountTypeMap['0'].indexOf(item.wtAccountType) > -1 || that.accountTypeMap['0_HK'].indexOf(item.wtAccountType) > -1;
                    });  
                }
                else{
                    currHoldingList = that.gridData.filter((item)=>{
                        return that.accountTypeMap[that.currAccount].indexOf(item.wtAccountType) > -1;
                    });
                }

                currHoldingList.forEach((o)=>{
                    if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1){
                        if(that.chiCangHqDaiCha.indexOf('H' + o.code) == -1){
                            that.chiCangHqDaiCha.push('H' + o.code);
                        }
                    }
                    else{
                        if(that.chiCangHqDaiCha.indexOf(o.code + '|' + o.wtAccountType) == -1){
                            that.chiCangHqDaiCha.push(o.code + '|' + o.wtAccountType);
                        }
                    }
                    
                });
                
                var gridstr = that.chiCangHqDaiCha.join(',');
                // console.log('gridstr === ',gridstr);
                var obj = currHoldingList.find(function(o){
                    return o.newMarketNo === undefined || o.stockProCode === undefined;
                });
                if(!gridstr){
                    return;
                }
                if(isHqPrice || obj) {
                    that.gridData.forEach(function(o){
                        if(that.accountTypeMap[that.currAccount].indexOf(o.wtAccountType) > -1){
                            o.newMarketNo = '0';
                            o.stockProCode = '0';
                        }  
                    });
                    var oSendData = {
                        GRID: gridstr,
                        StartPos: 1,
                        MaxCount: 9999,
                        Stockindex: 6,
                        Accountindex: 9,
                        NeedCheck: '1|2|32'
                    };
                    service_hq_often.require60(oSendData).then((oData)=> {
                        if (oData.ERRORNO < 0) {
                            that.isAutoRefresh = false;
                            if(that.hqTimer){
                                clearInterval(that.hqTimer);
                            }
                            return;
                        }
                        try{
                            // console.log('getHqInfo === :',oData.NEWMARKETNO);
                            if(oData.NEWMARKETNO && oData.NEWMARKETNO.length>0) {
                                var newmarket_arr = oData.NEWMARKETNO.split('|');
                                var stock_pro_arr = oData.STOCKPROP.split('|');
                                if(oData.GRID0 && oData.GRID0.length>0){
                                    oData.GRID0.shift();
                                    for(var i=0; i<oData.GRID0.length; i++) {
                                        var item = oData.GRID0[i].split('|');
                                        var code = item[oData.STOCKCODEINDEX]+'';
                                        that.gridData.forEach((o)=>{
                                            if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1){
                                                if(!!o.code && 'H' + o.code == code){
                                                    var newMarketNo = newmarket_arr[i];
                                                    var stockProCode = stock_pro_arr[i];
                                                    o.newMarketNo = newMarketNo;
                                                    o.stockProCode = stockProCode;
                                                }
                                            }
                                            else{
                                                if(!!o.code && o.code == code){
                                                    var newMarketNo = newmarket_arr[i];
                                                    var stockProCode = stock_pro_arr[i];
                                                    if(service_hq_often.checkMarketAva(o.wtAccountType, newMarketNo)){
                                                        o.newMarketNo = newMarketNo;
                                                        o.stockProCode = stockProCode;
                                                    }
                                                }
                                            }
                                            
                                        });

                                        if(isHqPrice){
                                            try{
                                                var newPrice = item[oData.NEWPRICEINDEX];
                                                if(!newPrice || isNaN(newPrice) || !parseFloat(newPrice)){
                                                    continue;
                                                }
                                                that.gridData.forEach((o)=>{
                                                    // 人民币A股或港股通
                                                    if(that.currAccount == '0' || that.currAccount == '0_HK'){
                                                        // 美元港币 不重新计算
                                                        if(that.accountTypeMap['1'].indexOf(o.wtAccountType) > -1 || that.accountTypeMap['2'].indexOf(o.wtAccountType) > -1){
                                                            return;
                                                        }
                                                    }
                                                    else{
                                                        if(that.accountTypeMap[that.currAccount].indexOf(o.wtAccountType) == -1){
                                                            return;
                                                        }
                                                    } 
                                                    // 港股通
                                                    if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1 ){
                                                        if(!!o.code && !!o.account && 'H' + o.code == code){
                                                            // 特定业务 或 市价不变 不重新计算
                                                            if(!that.isComputeCostPrice(o) || parseFloat(newPrice) == parseFloat(o.shiJia)){
                                                                return;
                                                            }
                                                            // 新市值价 = 原市值价 - 原最新价 + 新最新价
                                                            o.assetPrice = new Big(o.assetPrice).minus(new Big(o.shiJia)).plus(newPrice).toFixed(4).toString();
                                                            o.shiJia = newPrice;
                                                            // 市值 = 市值价 * 持仓
                                                            var marketValue = new Big(o.assetPrice).times(new Big(o.chiCang)).toFixed(2).toString();
                                                            o.shiZhi = new Big(marketValue).times(new Big(that.HKStockExchangeRateList[o.wtAccountType].middleRate)).toFixed(2).toString();
                                                            
                                                            if(parseFloat(o.chengBen) > 0){
                                                                o.yingKuiLv = new Big(o.assetPrice).minus(new Big(o.chengBen)).times(100).div(new Big(o.chengBen)).toFixed(2).toString();
                                                            }
                                                            else{
                                                                o.yingKuiLv = '0.00';
                                                            }
                                                            try{
                                                                var fare = '0';
                                                                if(!that.isNoFareClient && !!o.wtAccountType && !!that.fareMap[o.wtAccountType] && !!that.fareMap[o.wtAccountType][o.stockCodeType]){                                                             
                                                                    if(o.chiCang > 0){
                                                                        var totalFare = {};
                                                                        if(!!that.fareMap[o.wtAccountType][o.stockCodeType][o.subStockType]){
                                                                            totalFare = that.fareMap[o.wtAccountType][o.stockCodeType][o.subStockType];
                                                                        }
                                                                        else{
                                                                            totalFare = that.fareMap[o.wtAccountType][o.stockCodeType]['!'];
                                                                        }
                                                                        var fare0 = new Big(totalFare.fare0).times(new Big(marketValue)).plus(new Big(totalFare.fare0_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare0 = new Big(fare0).gt(new Big(totalFare.min_fare0)) ? fare0 : totalFare.min_fare0;
                                                                        if(totalFare.max_fare0 > 0){
                                                                            fare0 = new Big(fare0).lt(new Big(totalFare.max_fare0)) ? fare0 : totalFare.max_fare0;
                                                                        }
                                                                        var fare1 = new Big(totalFare.fare1).times(new Big(marketValue)).plus(new Big(totalFare.fare1_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare1 = new Big(fare1).gt(new Big(totalFare.min_fare1)) ? fare1 : totalFare.min_fare1;
                                                                        if(totalFare.max_fare1 > 0){
                                                                            fare1 = new Big(fare1).lt(new Big(totalFare.max_fare1)) ? fare1 : totalFare.max_fare1;
                                                                        }
                                                                        fare1 = Math.ceil(fare1);
                                                                        var fare2 = new Big(totalFare.fare2).times(new Big(marketValue)).plus(new Big(totalFare.fare2_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare2 = new Big(fare2).gt(new Big(totalFare.min_fare2)) ? fare2 : totalFare.min_fare2;
                                                                        if(totalFare.max_fare2 > 0){
                                                                            fare2 = new Big(fare2).lt(new Big(totalFare.max_fare2)) ? fare2 : totalFare.max_fare2;
                                                                        }
                                                                        var fare3 = new Big(totalFare.fare3).times(new Big(marketValue)).plus(new Big(totalFare.fare3_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare3 = new Big(fare3).gt(new Big(totalFare.min_fare3)) ? fare3 : totalFare.min_fare3;
                                                                        if(totalFare.max_fare3 > 0){
                                                                            fare3 = new Big(fare3).lt(new Big(totalFare.max_fare3)) ? fare3 : totalFare.max_fare3;
                                                                        }
                                                                        var farex = new Big(totalFare.farex).times(new Big(marketValue)).plus(new Big(totalFare.farex_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        farex = new Big(farex).gt(new Big(totalFare.min_farex)) ? farex : totalFare.min_farex;
                                                                        if(totalFare.max_farex > 0){
                                                                            farex = new Big(farex).lt(new Big(totalFare.max_farex)) ? farex : totalFare.max_farex;
                                                                        }
                                                                        
                                                                        fare = new Big(fare0).plus(new Big(fare1)).plus(new Big(fare2)).plus(new Big(fare3)).plus(new Big(farex)).toFixed(2).toString();
                                                                        fare = new Big(fare).times(new Big(that.HKStockExchangeRateList[o.wtAccountType].middleRate)).toFixed(2).toString();
                                                                    }        
                                                                }
                                                                o.yingKui = new Big(o.shiZhi).minus(new Big(o.costBalance)).minus(new Big(fare)).toFixed(2).toString();
                                                            }
                                                            catch(e){
                                                                console.error(e)
                                                                o.yingKui = '--'; 
                                                            }
                                                            finally{
                                                                o.oWTINFO.shiZhiIndex = o.shiZhi;
                                                                o.oWTINFO.yingkuiIndex = o.yingKui;
                                                                try{
                                                                    o.yingKuiWithoutFare = new Big(o.shiZhi).minus(new Big(o.costBalance)).toFixed(2).toString(); 
                                                                }
                                                                catch(e){
                                                                    o.yingKuiWithoutFare = '--'; 
                                                                }
                                                                finally{
                                                                    try{
                                                                        if(!o.preDrPrice || isNaN(o.preDrPrice) || !parseFloat(o.preDrPrice)){
                                                                            return;
                                                                        }
                                                                        var todayBuyPl = new Big(new Big(o.realBuyAmount).times(new Big(o.assetPrice))).minus(new Big(o.realBuyBalance).div(new Big(that.HKStockExchangeRateList[o.wtAccountType].sellRate))).toFixed(2).toString();
                                                                        var todaySellPl = new Big(o.realSellBalance).div(new Big(that.HKStockExchangeRateList[o.wtAccountType].buyRate)).minus(new Big(new Big(o.realSellAmount).times(new Big(o.preDrPrice)))).toFixed(2).toString();
                                                                        var todayHoldPl = new Big(o.chiCang).minus(new Big(o.realBuyAmount)).times(new Big(o.assetPrice).minus(new Big(o.preDrPrice))).toFixed(2).toString();
                                                                        o.todayPlHKD = new Big(todayBuyPl).plus(new Big(todaySellPl)).plus(new Big(todayHoldPl)).toFixed(2).toString();
                                                                        o.todayPl = new Big(o.todayPlHKD).times(that.HKStockExchangeRateList[o.wtAccountType].middleRate).toFixed(2).toString();
                                                                    }
                                                                    catch(e){
                                                                        o.todayPlHKD = '--';
                                                                        o.todayPl = '--';
                                                                    }
                                                                    finally{
                                                                        o.oWTINFO.todayPlHKD = o.todayPlHKD;
                                                                        o.oWTINFO.todayPl = o.todayPl;
                                                                    }
                                                                } 
                                                                
                                                            } 
                                                        }
                                                    }
                                                    else{
                                                        if(!!o.code && !!o.wtAccountType && !!o.account && o.code == code && o.wtAccountType == that.chiCangHqDaiCha[i].split('|')[1]){
                                                            // 特定业务 或 市价不变 不重新计算
                                                            if(!that.isComputeCostPrice(o) || parseFloat(newPrice) == parseFloat(o.shiJia)){
                                                                return;
                                                            }
                                                            // 新市值价 = 原市值价 - 原最新价 + 新最新价
                                                            o.assetPrice = new Big(o.assetPrice).minus(new Big(o.shiJia)).plus(newPrice).toFixed(4).toString();
                                                            o.shiJia = newPrice;
                                                            // 市值 = 市值价（含利息）* 持仓
                                                            var marketValue = new Big(o.assetPrice).times(new Big(o.chiCang)).toFixed(2).toString();
                                                            // 沪B转H市值 = 市值价（含利息）* 持仓 * 汇率
                                                            if(that.accountTypeMap['1'].indexOf(o.wtAccountType) > -1 && o.stockCodeType === 'h'){                                                             
                                                                o.shiZhi = new Big(marketValue).times(new Big(that.exchangeRateHKDtoUSD)).toFixed(2).toString();
                                                            }
                                                            else{
                                                                o.shiZhi = marketValue;
                                                            }
                                                            
                                                            if(parseFloat(o.chengBen) > 0){
                                                                o.yingKuiLv = new Big(o.assetPrice).minus(new Big(o.chengBen)).times(100).div(new Big(o.chengBen)).toFixed(2).toString();
                                                            }
                                                            else{
                                                                o.yingKuiLv = '0.00';
                                                            }
                                                            try{
                                                                var fare = '0';
                                                                if(!that.isNoFareClient && !!o.wtAccountType && !!that.fareMap[o.wtAccountType] && !!that.fareMap[o.wtAccountType][o.stockCodeType]){
                                                                    if(o.chiCang > 0){
                                                                        var totalFare = {};
                                                                        if(!!that.fareMap[o.wtAccountType][o.stockCodeType][o.subStockType]){
                                                                            totalFare = that.fareMap[o.wtAccountType][o.stockCodeType][o.subStockType];
                                                                        }
                                                                        else{
                                                                            totalFare = that.fareMap[o.wtAccountType][o.stockCodeType]['!'];
                                                                        }
                                                                        var fare0 = new Big(totalFare.fare0).times(new Big(marketValue)).plus(new Big(totalFare.fare0_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare0 = new Big(fare0).gt(new Big(totalFare.min_fare0)) ? fare0 : totalFare.min_fare0;
                                                                        if(totalFare.max_fare0 > 0){
                                                                            fare0 = new Big(fare0).lt(new Big(totalFare.max_fare0)) ? fare0 : totalFare.max_fare0;
                                                                        }
                                                                        var fare1 = new Big(totalFare.fare1).times(new Big(marketValue)).plus(new Big(totalFare.fare1_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare1 = new Big(fare1).gt(new Big(totalFare.min_fare1)) ? fare1 : totalFare.min_fare1;
                                                                        if(totalFare.max_fare1 > 0){
                                                                            fare1 = new Big(fare1).lt(new Big(totalFare.max_fare1)) ? fare1 : totalFare.max_fare1;
                                                                        }
                                                                        // H股全流通、B转H印花税向上取整
                                                                        if(o.wtAccountType === 'R' || o.stockCodeType === 'h'){
                                                                            fare1 = Math.ceil(fare1);
                                                                        }
                                                                        var fare2 = new Big(totalFare.fare2).times(new Big(marketValue)).plus(new Big(totalFare.fare2_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare2 = new Big(fare2).gt(new Big(totalFare.min_fare2)) ? fare2 : totalFare.min_fare2;
                                                                        if(totalFare.max_fare2 > 0){
                                                                            fare2 = new Big(fare2).lt(new Big(totalFare.max_fare2)) ? fare2 : totalFare.max_fare2;
                                                                        } 
                                                                        var fare3 = new Big(totalFare.fare3).times(new Big(marketValue)).plus(new Big(totalFare.fare3_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        fare3 = new Big(fare3).gt(new Big(totalFare.min_fare3)) ? fare3 : totalFare.min_fare3;
                                                                        if(totalFare.max_fare3 > 0){
                                                                            fare3 = new Big(fare3).lt(new Big(totalFare.max_fare3)) ? fare3 : totalFare.max_fare3;
                                                                        }                                                                 
                                                                        var farex = new Big(totalFare.farex).times(new Big(marketValue)).plus(new Big(totalFare.farex_par).times(new Big(o.chiCang)).times(new Big(o.parValue))).toFixed(2).toString();
                                                                        farex = new Big(farex).gt(new Big(totalFare.min_farex)) ? farex : totalFare.min_farex;
                                                                        if(totalFare.max_farex > 0){
                                                                            farex = new Big(farex).lt(new Big(totalFare.max_farex)) ? farex : totalFare.max_farex;
                                                                        }   
                                                                        
                                                                        fare = new Big(fare0).plus(new Big(fare1)).plus(new Big(fare2)).plus(new Big(fare3)).plus(new Big(farex)).toFixed(2).toString();
                                                                        // 沪B转H
                                                                        if(that.accountTypeMap['1'].indexOf(o.wtAccountType) > -1 && o.stockCodeType === 'h'){
                                                                            fare = new Big(fare).times(new Big(that.exchangeRateHKDtoUSD)).toFixed(2).toString();
                                                                        }
                                                                    }
                                                                }
                                                                o.yingKui = new Big(o.shiZhi).minus(new Big(o.costBalance)).minus(new Big(fare)).toFixed(2).toString();
                                                            }
                                                            catch(e){
                                                                console.error(e)
                                                                o.yingKui = '--'; 
                                                            }
                                                            finally{
                                                                o.oWTINFO.shiZhiIndex = o.shiZhi;
                                                                o.oWTINFO.yingkuiIndex = o.yingKui;
                                                                try{
                                                                    o.yingKuiWithoutFare = new Big(o.shiZhi).minus(new Big(o.costBalance)).toFixed(2).toString(); 
                                                                }
                                                                catch(e){
                                                                    o.yingKuiWithoutFare = '--'; 
                                                                }
                                                                finally{
                                                                    if(!o.preDrPrice || isNaN(o.preDrPrice) || !parseFloat(o.preDrPrice)){
                                                                        return;
                                                                    }
                                                                    // 沪B转H
                                                                    if(that.accountTypeMap['1'].indexOf(o.wtAccountType) > -1 && o.stockCodeType === 'h'){ 
                                                                        try{
                                                                            var todayBuyPl = new Big(new Big(o.realBuyAmount).times(new Big(o.assetPrice))).minus(new Big(o.realBuyBalance).div(new Big(that.exchangeRateHKDtoUSD))).toFixed(2).toString();
                                                                            var todaySellPl = new Big(o.realSellBalance).div(new Big(that.exchangeRateHKDtoUSD)).minus(new Big(new Big(o.realSellAmount).times(new Big(o.preDrPrice)))).toFixed(2).toString();
                                                                            var todayHoldPl = new Big(o.chiCang).minus(new Big(o.realBuyAmount)).times(new Big(o.assetPrice).minus(new Big(o.preDrPrice))).toFixed(2).toString();
                                                                            o.todayPl = new Big(todayBuyPl).plus(new Big(todaySellPl)).plus(new Big(todayHoldPl)).toFixed(2).toString();
                                                                            o.todayPl = new Big(o.todayPl).times(that.exchangeRateHKDtoUSD).toFixed(2).toString();
                                                                        }
                                                                        catch(e){
                                                                            o.todayPl = '--';
                                                                        }
                                                                        finally{
                                                                            o.oWTINFO.todayPl = o.todayPl;
                                                                        }
                                                                    }
                                                                    else{ 
                                                                        try{
                                                                            var todayBuyPl = new Big(o.realBuyAmount).times(new Big(o.assetPrice)).minus(new Big(o.realBuyBalance)).toFixed(2).toString();
                                                                            var todaySellPl = new Big(o.realSellBalance).minus(new Big(o.realSellAmount).times(new Big(o.preDrPrice))).toFixed(2).toString();
                                                                            var todayHoldPl = new Big(o.chiCang).minus(new Big(o.realBuyAmount)).times(new Big(o.assetPrice).minus(new Big(o.preDrPrice))).toFixed(2).toString();
                                                                            o.todayPl = new Big(todayBuyPl).plus(new Big(todaySellPl)).plus(new Big(todayHoldPl)).toFixed(2).toString();
                                                                        }
                                                                        catch(e){
                                                                            o.todayPl = '--';
                                                                        }
                                                                        finally{
                                                                            o.oWTINFO.todayPl = o.todayPl;
                                                                        }
                                                                    }
                                                                } 
                                                            }   
                                                        }
                                                    }     
                                                });
                                            }
                                            catch(e){
                                                console.error(e);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        catch(e){

                        }
                        finally{
                            fnSuccess && fnSuccess();
                        }   
                    });
                }
                else{
                    fnSuccess && fnSuccess();
                }
            },
            isComputeCostPrice(obj) {
                // 代码黑名单
                if((obj.code == '161838' || obj.code == '161022') && obj.wtAccountType == 'SZACCOUNT'){
                    return false;
                }
                // 标准券不记盈亏
                if(obj.code == '888886' || obj.code == '200000'|| obj.code == '131990' || obj.code == '131991' || obj.code == '888880'){
                    return false;
                }
                // 深圳的特殊业务, 深圳-基金认购'K'-159代码段不计算盈亏
                if(obj.wtAccountType == 'SZACCOUNT' && (obj.stockCodeType == '8' || (obj.stockCodeType == 'K' && obj.code.startsWith('159')))){
                    return false;
                }
                // 上海-证券类别为M、K、S、L不计算盈亏
                if(obj.wtAccountType == 'SHACCOUNT' && (obj.stockCodeType == 'M' || obj.stockCodeType == 'K' || obj.stockCodeType == 'S' || obj.stockCodeType == 'L' || (obj.stockCodeType == 'A' && obj.code.startsWith('519')))){
                    return false;
                }
                // 沪深京
                // 1.标准券（888886，200000，131990，131991，888880）
                // 2.报价回购（stock_type=Z&& sub_stock_type=z1）
                // 3.配股权证（stock_type=3）
                // 4.普通申购（stock_type=4）
                // 5.债券申购（stock_type=G）
                if(obj.stockCodeType == '3' || obj.stockCodeType == '4' || obj.stockCodeType == 'G' || (obj.stockCodeType == 'Z' && obj.subStockType == 'z1')){
                    return false;
                }
                return true;
            },
            isComputeTodayPl(obj) {
                // 标准券不记盈亏
                if(obj.code == '888886' || obj.code == '200000'|| obj.code == '131990' || obj.code == '131991' || obj.code == '888880'){
                    return false;
                }
                // 深圳的特殊业务, 深圳-基金认购'K'-159代码段不计算盈亏
                if(obj.wtAccountType == 'SZACCOUNT' && (obj.stockCodeType == '8' || (obj.stockCodeType == 'K' && obj.code.startsWith('159')))){
                    return false;
                }
                // 上海-证券类别为M、K、S不计算盈亏
                if(obj.wtAccountType == 'SHACCOUNT' && (obj.stockCodeType == 'M' || obj.stockCodeType == 'K' || obj.stockCodeType == 'S' || (obj.stockCodeType == 'A' && obj.code.startsWith('519')))){
                    return false;
                }
                // 沪深京
                // 1.标准券（888886，200000，131990，131991，888880）
                // 2.报价回购（stock_type=Z&& sub_stock_type=z1）
                // 3.配股权证（stock_type=3）
                // 4.普通申购（stock_type=4）
                // 5.债券申购（stock_type=G）
                if(obj.stockCodeType == '3' || obj.stockCodeType == '4' || obj.stockCodeType == 'G' || (obj.stockCodeType == 'Z' && obj.subStockType == 'z1')){
                    return false;
                }
                return true;
            },
            geshiValue(name, index, noUnit){
                if(!name || name === '--'){
                    return '--';
                }
                if(name.indexOf('-') > -1 || name.indexOf('+') > -1){
                    return name.substr(0, 1) + dealUtil.formatZZDate(name.substr(1, name.length),index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX, noUnit);
                }
                return dealUtil.formatZZDate(name, index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX, noUnit);
            },
            init() {
                var that = this;
                that.listNumber = 0;
                that.loading = false;
                that.REREQ = false;
                that.loadtype = that.pagecount;
                H5TZT.readLocalMesg(['isSLBOpen'], function(data){
                    if(data.ISSLBOPEN == '1'){
                        that.isSLBOpen = true;
                    }
                    that.loadMore();
                });
            },
            wscroll(){
                var _this = this;
                $('.m-content-3').off().scroll(function () {
                    if (_this.REREQ == true) {
                        return;
                    }
                    viewH = $(this).height(),//可见高度
                        contentH = $(this).get(0).scrollHeight,//内容高度
                        scrollTop = $(this).scrollTop();//滚动高度
                    if (viewH < $(window).height()) {
                        viewH = $(window).height();
                    }
                    if (scrollTop / (contentH - viewH - 3) >= 1) { //到达底部100px时,加载新内容
                        _this.wscrollfn();
                    }
                });
            },
            wscrollfn(){
                this.REREQ = true;
                this.loadtype = _this.pagecount - 1;
                this.listNamber += _this.loadtype;
                // this.loadMore();
            },
            loadMore() {
                console.log('browser',browser)
                maidian.reportEventRandom({baseVal:10000, randomVal: 10},'xtyh_cc_jysy_mmcc');
                var that = this;
                // 如果正在加载，则退出
                if (that.loading) {
                    return;
                }
                that.previousReqTime = new Date().getTime();
                that.loading = true;
                $.showPreloader();
                Array.from(document.querySelectorAll('#app>div')).forEach(function(item) {
                    item.style.pointerEvents = 'none';
                });
                if(window.slider){
                    window.slider.disable();
                }
                var newDataArr = [];
                that.getUnitFlag(function(){                    
                    initStockHolding();                       
                    that.$broadcast('GoBackOnLoad')                    
                });  
                
                function initStockHolding(){
                    // 港股通持仓单独入口
                    if(that.fromType == 'ggt'){
                        that.getHolding(newDataArr, function(oData1){
                            H5TZT.readLocalMesg(["softversion"], function(oData) {
                                var _appversion = navigator.appVersion.toLocaleLowerCase();
                                if(_appversion.indexOf("android") > 0) {
                                    if(oData.SOFTVERSION >= '4.03.037') {
                                        CiticsNative.NativeCall("setChiCangPriceList", JSON.stringify(that.chiCangChengBenXianShuJu));
                                    }
                                    else{
                                        H5TZT.reqsofttodo({'setChiCangPriceList': JSON.stringify(that.chiCangChengBenXianShuJu)});
                                    }
                                }
                                else{
                                    H5TZT.reqsofttodo({'setChiCangPriceList': JSON.stringify(that.chiCangChengBenXianShuJu)});
                                }
                            }); 
                            that.isShowHKDExchangeRate = true;
                            that.getHKHolding(newDataArr, function(oData3){
                                H5TZT.reqsofttodo({'setHKChiCangPriceList': JSON.stringify(that.hkChiCangChengBenXianShuJu)});                                                                  
                                that.initTodayPl(newDataArr, function(){
                                    var exchangeRateList = {};                             
                                    if(that.HKStockExchangeRateList['HKSZACCOUNT'] && that.HKStockExchangeRateList['HKSZACCOUNT'].middleRate){
                                        exchangeRateList.ggtMiddleRate = that.HKStockExchangeRateList['HKSZACCOUNT'].middleRate;
                                    }
                                    that.$dispatch('getHoldingData', newDataArr, oData1, oData3, exchangeRateList);
                                });                   
                            }, function(){
                                that.failCallback();
                            });             
                        }, function(){
                            that.failCallback();
                        });
                        return;
                    }
                    that.getHolding(newDataArr, function(oData1){
                        H5TZT.readLocalMesg(["softversion"], function(oData) {
                            var _appversion = navigator.appVersion.toLocaleLowerCase();
                            if(_appversion.indexOf("android") > 0) {
                                if(oData.SOFTVERSION >= '4.03.037') {
                                    CiticsNative.NativeCall("setChiCangPriceList", JSON.stringify(that.chiCangChengBenXianShuJu));
                                }
                                else{
                                    H5TZT.reqsofttodo({'setChiCangPriceList': JSON.stringify(that.chiCangChengBenXianShuJu)});
                                }
                            }
                            else{
                                H5TZT.reqsofttodo({'setChiCangPriceList': JSON.stringify(that.chiCangChengBenXianShuJu)});
                            }
                        }); 
                        H5TZT.readLocalMesg(['ishkaccount', 'ishkszaccount'], function (oLocal) {
                            if (oLocal.ISHKACCOUNT == '1' || oLocal.ISHKSZACCOUNT == '1') {
                                that.isShowHKDExchangeRate = true;
                                that.getHKHolding(newDataArr, function(oData3){
                                    H5TZT.reqsofttodo({'setHKChiCangPriceList': JSON.stringify(that.hkChiCangChengBenXianShuJu)});     
                                    that.initTodayPl(newDataArr, function(){
                                        var exchangeRateList = {};                             
                                        if(that.HKStockExchangeRateList['HKSZACCOUNT'] && that.HKStockExchangeRateList['HKSZACCOUNT'].middleRate){
                                            exchangeRateList.ggtMiddleRate = that.HKStockExchangeRateList['HKSZACCOUNT'].middleRate;
                                        }
                                        if(that.exchangeRateHKDtoUSD){
                                            exchangeRateList.exchangeRateHKDtoUSD = that.exchangeRateHKDtoUSD;
                                        }
                                        that.$dispatch('getHoldingData', newDataArr, oData1, oData3, exchangeRateList);
                                    });     
                                }, function(){
                                    that.failCallback();
                                });
                            }  
                            else{
                                that.isShowHKDExchangeRate = false;
                                that.initTodayPl(newDataArr, function(){
                                    var exchangeRateList = {};                             
                                    if(that.exchangeRateHKDtoUSD){
                                        exchangeRateList.exchangeRateHKDtoUSD = that.exchangeRateHKDtoUSD;
                                    }
                                    that.$dispatch('getHoldingData', newDataArr, oData1, undefined, exchangeRateList);
                                });                      
                            } 
                        });  
                    }, function(){
                        that.failCallback();
                    });
                }
            },
            initTodayPl(newDataArr, fnSuccess){
                var that = this;
                that.$dispatch('sendError', false);

                if(!newDataArr.length){
                    that.isAutoRefresh = false;
                    if(that.hqTimer){
                        clearInterval(that.hqTimer);
                    }
                    if(that.hsTimer){
                        clearInterval(that.hsTimer);
                    }
                    that.originData = JSON.parse(JSON.stringify(newDataArr));
                    fnSuccess && fnSuccess();
                    return;
                }
                
                var promiseArr = [];
                var getHKStockExchangeRate = function(){
                    return new Promise((resolve, reject)=>{
                        that.getHKStockExchangeRate(resolve, reject);
                    });
                };
                var getExchangeRateHKDtoUSD = function(){
                    return new Promise((resolve, reject)=>{
                        that.getExchangeRateHKDtoUSD(resolve, reject);
                    });
                }

                if(!that.HKStockExchangeRateList['HKACCOUNT'] || !that.HKStockExchangeRateList['HKSZACCOUNT']){
                    var isNeedGetHKStockExchangeRate = newDataArr.some((item)=>{
                        return that.accountTypeMap['0_HK'].indexOf(item.wtAccountType) > -1;
                    });
                    if(isNeedGetHKStockExchangeRate){
                        promiseArr.push(getHKStockExchangeRate());
                    }
                }
                if(that.fromType !== 'ggt' && !that.exchangeRateHKDtoUSD){
                    var isNeedGetExchangeRateHKDToUSD = newDataArr.some((item)=>{
                        return that.accountTypeMap['1'].indexOf(item.wtAccountType) > -1 && item.stockCodeType === 'h';
                    });
                    if(isNeedGetExchangeRateHKDToUSD){
                        promiseArr.push(getExchangeRateHKDtoUSD());
                    }
                }
                
                isTradeDateWithCache({}, function(oData){
                    // 交易日
                    if(oData && oData.IS_TRADE_DATE && oData.IS_TRADE_DATE == '1'){
                        getSystemTime(function(){
                            if(that.systemTime >= '180000' || that.systemTime < '080000'){
                                that.isAutoRefresh = false;
                                if(that.hqTimer){
                                    clearInterval(that.hqTimer);
                                }
                                if(that.hsTimer){
                                    clearInterval(that.hsTimer);
                                }
                                that.getClientStockBussinessDataWithCache(newDataArr, {}, function(data){
                                    Promise.all(promiseArr).then(()=>{
                                        newDataArr.forEach((o)=>{
                                            that.getTodayPl(o, data);
                                        });
                                        that.originData = JSON.parse(JSON.stringify(newDataArr));
                                        fnSuccess && fnSuccess();
                                    }); 
                                }, function(){
                                    newDataArr.forEach((o)=>{
                                        // 港股通
                                        if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1){
                                            o.oWTINFO.todayPlHKD = o.todayPlHKD;
                                        } 
                                        o.oWTINFO.todayPl = o.todayPl;
                                    });
                                    that.originData = JSON.parse(JSON.stringify(newDataArr));
                                    fnSuccess && fnSuccess();
                                });                       
                            }
                            // 交易日 08:00:00 - 09:10:00 不计算当日盈亏
                            else if(that.systemTime >= '080000' && that.systemTime < '091000'){
                                that.isAutoRefresh = false;
                                if(that.hqTimer){
                                    clearInterval(that.hqTimer);
                                }
                                if(that.hsTimer){
                                    clearInterval(that.hsTimer);
                                }
                                newDataArr.forEach((o)=>{
                                    // 港股通
                                    if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1){
                                        o.oWTINFO.todayPlHKD = o.todayPlHKD;
                                    } 
                                    o.oWTINFO.todayPl = o.todayPl;
                                });
                                that.originData = JSON.parse(JSON.stringify(newDataArr));
                                fnSuccess && fnSuccess();
                            }
                            // 交易日 09:10:00 - 16:00:00 期间进入自动刷新流程
                            else if(that.systemTime >= '091000' && that.systemTime <= '160000'){
                                Promise.all(promiseArr).then(()=>{
                                    newDataArr.forEach((o)=>{
                                        that.getTodayPl(o, {});
                                    });
                                    that.originData = JSON.parse(JSON.stringify(newDataArr));
                                    fnSuccess && fnSuccess();
                                    if(that.isExchangeRateError){
                                        that.isAutoRefresh = false;
                                        if(that.hqTimer){
                                            clearInterval(that.hqTimer);
                                        }
                                        if(that.hsTimer){
                                            clearInterval(that.hsTimer);
                                        }
                                        return;
                                    } 
                                    H5TZT.readLocalMesg(['softversion'], function(oData) {
                                        if(oData.SOFTVERSION < '5.01.001') {
                                            that.isAutoRefresh = false;
                                            if(that.hqTimer){
                                                clearInterval(that.hqTimer);
                                            }
                                            if(that.hsTimer){
                                                clearInterval(that.hsTimer);
                                            }
                                            return;
                                        }        
                                        that.initAutoRefresh(newDataArr);
                                    }); 
                                });  
                            }
                            else{
                                that.isAutoRefresh = false;
                                if(that.hqTimer){
                                    clearInterval(that.hqTimer);
                                }
                                if(that.hsTimer){
                                    clearInterval(that.hsTimer);
                                }
                                Promise.all(promiseArr).then(()=>{
                                    newDataArr.forEach((o)=>{
                                        that.getTodayPl(o, {});
                                    });
                                    that.originData = JSON.parse(JSON.stringify(newDataArr));
                                    fnSuccess && fnSuccess();
                                });   
                            }
                        });
                    } 
                    // 非交易日
                    else{
                        that.isAutoRefresh = false;
                        if(that.hqTimer){
                            clearInterval(that.hqTimer);
                        }
                        if(that.hsTimer){
                            clearInterval(that.hsTimer);
                        }
                        that.getClientStockBussinessDataWithCache(newDataArr, {}, function(data){
                            Promise.all(promiseArr).then(()=>{
                                newDataArr.forEach((o)=>{
                                    that.getTodayPl(o, data);
                                });
                                that.originData = JSON.parse(JSON.stringify(newDataArr));
                                fnSuccess && fnSuccess();
                            }); 
                        }, function(){
                            newDataArr.forEach((o)=>{
                                // 港股通
                                if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1){
                                    o.oWTINFO.todayPlHKD = o.todayPlHKD;
                                } 
                                o.oWTINFO.todayPl = o.todayPl;
                            });
                            that.originData = JSON.parse(JSON.stringify(newDataArr));
                            fnSuccess && fnSuccess();
                        });
                    }
                }, function(){
                    that.isAutoRefresh = false;
                    if(that.hqTimer){
                        clearInterval(that.hqTimer);
                    }
                    if(that.hsTimer){
                        clearInterval(that.hsTimer);
                    }
                    newDataArr.forEach((o)=>{
                        // 港股通
                        if(that.accountTypeMap['0_HK'].indexOf(o.wtAccountType) > -1){
                            o.oWTINFO.todayPlHKD = o.todayPlHKD;
                        } 
                        o.oWTINFO.todayPl = o.todayPl;
                    });
                    that.originData = JSON.parse(JSON.stringify(newDataArr));
                    fnSuccess && fnSuccess();
                });   

                function isTradeDateWithCache(oSendData, fnSuccess, fnFail){
                    cache.fetchNetDataWithNoFundAccountCache('isTradeDate', parseInt(cacheTime.isTradeDate), isTradeDate, oSendData, fnSuccess, fnFail, false);
                }

                function isTradeDate(oSend, fnSuccess, fnFail){
                    service_information_often.require41083({}).then((data)=>{
                        if(data.ERRORNO < 0){
                            fnFail && fnFail();
                            return;
                        }
                        fnSuccess && fnSuccess(data);
                    });
                }

                function getSystemTime(fnSuccess, fnFail){
                    service_information_often.require5({}).then((data)=>{
                        if(data.ERRORNO < 0){
                            var time = moment().format('YYYY-MM-DD HH:MM:SS');
                            that.systemDate = time.split(' ')[0].replace(/-/g,'');
                            that.systemTime = time.split(' ')[1].replace(/:/g,'');
                            fnSuccess && fnSuccess();
                            return;
                        }
                        that.systemDate = data.TIME.split(' ')[0].replace(/-/g,'');
                        that.systemTime = data.TIME.split(' ')[1].replace(/:/g,'');
                        fnSuccess && fnSuccess();
                    });
                }
            },
            getTodayPl(chiCangItem, data){
                var that = this;   
                if(data.list && data.list.length){
                    var obj = data.list.find((o)=>{
                        return o.stock_code == chiCangItem.code && that.hsExchangeTypeMap[o.exchange_type] == chiCangItem.wtAccountType && o.stock_account == chiCangItem.account;
                    });
                    if(obj){
                        chiCangItem.realBuyAmount = obj.real_buy_amount;
                        chiCangItem.realBuyBalance = obj.real_buy_balance;
                        chiCangItem.realSellAmount = obj.real_sell_amount;
                        chiCangItem.realSellBalance = obj.real_sell_balance;
                    }
                }
                
                if(data.price_list && data.price_list.length){
                    var obj = data.price_list.find((o)=>{
                        return o.stock_code == chiCangItem.code && that.hsExchangeTypeMap[o.exchange_type] == chiCangItem.wtAccountType;
                    });
                    if(obj){
                        chiCangItem.preDrPrice = obj.pre_dr_price;
                    }
                }

                // 港股通
                if(that.accountTypeMap['0_HK'].indexOf(chiCangItem.wtAccountType) > -1){ 
                    // 不计算当日参考盈亏
                    if(!chiCangItem.assetPrice || isNaN(chiCangItem.assetPrice) || !parseFloat(chiCangItem.assetPrice) || !chiCangItem.preDrPrice || isNaN(chiCangItem.preDrPrice) || !parseFloat(chiCangItem.preDrPrice) || !that.isComputeTodayPl(chiCangItem)){
                        chiCangItem.todayPlHKD = '--';
                        chiCangItem.todayPl = '--';
                        chiCangItem.oWTINFO.todayPlHKD = chiCangItem.todayPlHKD;
                        chiCangItem.oWTINFO.todayPl = chiCangItem.todayPl;
                        return;
                    }
                    try{
                        var todayBuyPl = new Big(new Big(chiCangItem.realBuyAmount).times(new Big(chiCangItem.assetPrice))).minus(new Big(chiCangItem.realBuyBalance).div(new Big(that.HKStockExchangeRateList[chiCangItem.wtAccountType].sellRate))).toFixed(2).toString();
                        var todaySellPl = new Big(chiCangItem.realSellBalance).div(new Big(that.HKStockExchangeRateList[chiCangItem.wtAccountType].buyRate)).minus(new Big(new Big(chiCangItem.realSellAmount).times(new Big(chiCangItem.preDrPrice)))).toFixed(2).toString();
                        var todayHoldPl = new Big(chiCangItem.chiCang).minus(new Big(chiCangItem.realBuyAmount)).times(new Big(chiCangItem.assetPrice).minus(new Big(chiCangItem.preDrPrice))).toFixed(2).toString();
                        chiCangItem.todayPlHKD = new Big(todayBuyPl).plus(new Big(todaySellPl)).plus(new Big(todayHoldPl)).toFixed(2).toString();
                        chiCangItem.todayPl = new Big(chiCangItem.todayPlHKD).times(that.HKStockExchangeRateList[chiCangItem.wtAccountType].middleRate).toFixed(2).toString();
                    }
                    catch(e){
                        chiCangItem.todayPlHKD = '--';
                        chiCangItem.todayPl = '--';
                    }  
                    finally{
                        chiCangItem.oWTINFO.todayPlHKD = chiCangItem.todayPlHKD;
                        chiCangItem.oWTINFO.todayPl = chiCangItem.todayPl;
                    } 
                }
                else{
                    // 不计算当日参考盈亏
                    if(!chiCangItem.assetPrice || isNaN(chiCangItem.assetPrice) || !parseFloat(chiCangItem.assetPrice) || !chiCangItem.preDrPrice || isNaN(chiCangItem.preDrPrice) || !parseFloat(chiCangItem.preDrPrice) || !that.isComputeTodayPl(chiCangItem)){
                        chiCangItem.todayPl = '--';
                        chiCangItem.oWTINFO.todayPl = chiCangItem.todayPl;
                        return;
                    }
                    // 沪B转H
                    if(that.accountTypeMap['1'].indexOf(chiCangItem.wtAccountType) > -1 && chiCangItem.stockCodeType === 'h'){ 
                        try{
                            var todayBuyPl = new Big(new Big(chiCangItem.realBuyAmount).times(new Big(chiCangItem.assetPrice))).minus(new Big(chiCangItem.realBuyBalance).div(new Big(that.exchangeRateHKDtoUSD))).toFixed(2).toString();
                            var todaySellPl = new Big(chiCangItem.realSellBalance).div(new Big(that.exchangeRateHKDtoUSD)).minus(new Big(new Big(chiCangItem.realSellAmount).times(new Big(chiCangItem.preDrPrice)))).toFixed(2).toString();
                            var todayHoldPl = new Big(chiCangItem.chiCang).minus(new Big(chiCangItem.realBuyAmount)).times(new Big(chiCangItem.assetPrice).minus(new Big(chiCangItem.preDrPrice))).toFixed(2).toString();
                            chiCangItem.todayPl = new Big(todayBuyPl).plus(new Big(todaySellPl)).plus(new Big(todayHoldPl)).toFixed(2).toString();
                            chiCangItem.todayPl = new Big(chiCangItem.todayPl).times(that.exchangeRateHKDtoUSD).toFixed(2).toString();
                        }
                        catch(e){
                            chiCangItem.todayPl = '--';
                        }
                        finally{
                            chiCangItem.oWTINFO.todayPl = chiCangItem.todayPl;
                        } 
                    }
                    else{
                        try{
                            var todayBuyPl = new Big(chiCangItem.realBuyAmount).times(new Big(chiCangItem.assetPrice)).minus(new Big(chiCangItem.realBuyBalance)).toFixed(2).toString();
                            var todaySellPl = new Big(chiCangItem.realSellBalance).minus(new Big(chiCangItem.realSellAmount).times(new Big(chiCangItem.preDrPrice))).toFixed(2).toString();
                            var todayHoldPl = new Big(chiCangItem.chiCang).minus(new Big(chiCangItem.realBuyAmount)).times(new Big(chiCangItem.assetPrice).minus(new Big(chiCangItem.preDrPrice))).toFixed(2).toString();
                            chiCangItem.todayPl = new Big(todayBuyPl).plus(new Big(todaySellPl)).plus(new Big(todayHoldPl)).toFixed(2).toString();
                        }
                        catch(e){
                            chiCangItem.todayPl = '--';
                        }
                        finally{
                            chiCangItem.oWTINFO.todayPl = chiCangItem.todayPl;
                        } 
                    }
                } 
            },
            initAutoRefresh(newDataArr){
                var that = this;
                chiCangAutoRefresh.initAutoRefresh(function(isNoFareClient){  
                    // 持仓超出500条关闭刷新
                    if(newDataArr.length > 500){
                        that.isAutoRefresh = false;
                        if(that.hqTimer){
                            clearInterval(that.hqTimer);
                        }
                        if(that.hsTimer){
                            clearInterval(that.hsTimer);
                        }
                        chiCangAutoRefresh.setSwitchStatus('GUAN');
                        $.toast('当前持仓的所有证券数量超过500条，已关闭数据自动刷新功能。', 3000, 'chicang-toast');
                        return;
                    }   
                    that.isAutoRefresh = true;                                  
                    that.isNoFareClient = isNoFareClient;
                    if(that.isNoFareClient){                                            
                        that.setHsInterval(false);  
                        that.setHqInterval(false);                               
                    }
                    else{
                        that.getClientFare(function(){
                            that.setHsInterval(false);  
                            that.setHqInterval(false);                               
                        }, function(){
                            that.isAutoRefresh = false;
                            if(that.hqTimer){
                                clearInterval(that.hqTimer);
                            }
                            that.setHsInterval(false);
                        });  
                    }
                }, function(){
                    that.isAutoRefresh = false;
                    if(that.hqTimer){
                        clearInterval(that.hqTimer);
                    }
                    that.setHsInterval(false);
                });
            },
            onNoDataShow(){
                var that = this;
                that.makeSort();
                that.$nextTick(()=>{
                    if ($('.table-list') && $('.table-list').length > 0 && that.isSLBOpen) {
                        that.rem = window.rem * 1.12 * 1.1 < $('.table-list')[0].offsetHeight ? window.rem * 1.2 : window.rem
                    }
                    that.initScrollSlider();
                    that.scrollEvent(false);
                });
            },
            failCallback(){
                var that = this;
                that.$set('originData', []);
                that.$set('gridData', []);
                
                that.$dispatch('sendError', true);
                that.loadingEnd();
            },
            loadingEnd(){
                this.$nextTick(()=>{
                    Array.from(document.querySelectorAll('#app>div')).forEach(function(item) {
                        item.style.pointerEvents = '';
                    });
                    $.hidePreloader();
                    this.loading = false;    
                }); 
            },
            getUnitFlag(fnSuccess, fnFail){
                var that = this;
                H5TZT.readLocalMesgSync(['fundaccount', 'tokentype=0'], function (oData) {
                    H5TZT.readFileMesgSync('PUTONG' + oData.FUNDACCOUNT, function(data){
                        if(data){
                            if(data == 'KAI'){
                                that.unitFlag = true;
                            }else if(data == 'GUAN'){
                                that.unitFlag = false;
                            }
                        }
                        fnSuccess && fnSuccess();
                    })
                });
            },
            // 简称扩位
            isStockLongName(stockCodeType) {
                var longNameStockTypeList = ['1','2','6','A','B','J','K','L','M','N','O','T','V','i','j','k','l','r','g','e'];
                if(longNameStockTypeList.indexOf(stockCodeType) > -1){
                    return true;
                }
                return false;
            },
            getHolding(newDataArr, fnSuccess, fnFail) {
                var that = this;
                var oSendData = {
                    //起始位置
                    StartPos: that.listNumber == 0 ? that.listNumber : (that.listNumber + 1),
                    //最大条数
                    // MaxCount: repoconfig.config.pagecount
                    MaxCount: that.pagecount - 1
                    // MaxCount:1000
                };

                service_ptjy.require117(oSendData)
                    .then((data) => {
                        var _data = JSON.parse(JSON.stringify(data));
                        // that.$dispatch('getHoldingData', data);
                        if (data.ERRORNO < 0) {
                            fnFail && fnFail();
                            // $.alert(data.ERRORMESSAGE);
                            return;
                        }
                        // let oData = GRID.htmltitle(data, that.listNumber);
                        if (that.listNumber === 0) {
                            that.chiCangChengBenXianShuJu.length = 0;
                            // that.chiCangHqDaiCha.length = 0;
                            // data.GRID0 && data.GRID0.shift();
                            that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
                            that.INDEX.YKLINDEX = data.YKLINDEX;
                            that.INDEX.DATEFORMINDEX = data.DATEFORMINDEX;
                            that.INDEX.ZZPINDEX = data.ZZPINDEX;
                            that.INDEX.STOCKNAMEINDEX = data.STOCKNAMEINDEX;
                            that.INDEX.STOCKNAMELONGIDXINDEX = data.STOCKNAMELONGIDXINDEX;
                            that.INDEX.STOCKCODE_TYPEINDEX = data.STOCKCODE_TYPEINDEX;
                            that.INDEX.WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX;
                            that.INDEX.WTACCOUNTTYPENAMEINDEX = data.WTACCOUNTTYPENAMEINDEX;
                            that.INDEX.STOCKNUMINDEX = data.STOCKNUMINDEX;
                            that.INDEX.KYINDEX = data.KYINDEX;
                            that.INDEX.KEEPPRICEINDEX = data.KEEPPRICEINDEX;
                            that.INDEX.LASTPRICEINDEX = data.LASTPRICEINDEX;
                            that.INDEX.STOCKVALUEINDEX = data.STOCKVALUEINDEX;
                            that.INDEX.YKINDEX = data.YKINDEX;
                            that.INDEX.FROZENINDEX = data.FROZENINDEX;
                            that.INDEX.DELISTFLAGNAMEINDEX = data.DELISTFLAGNAMEINDEX;
                            that.INDEX.ACCOUNTINDEX = data.ACCOUNTINDEX;
                            that.INDEX.FUNDACCOUNTINDEX = data.FUNDACCOUNTINDEX;
                            that.INDEX.YKWITHOUTFAREINDEX = '16';
                            that.INDEX.STBLAYERFLAGINDEX = data.STBLAYERFLAGINDEX;
                            that.INDEX.ASSETPRICEINDEX = data.ASSETPRICEINDEX;
                            that.INDEX.SUBSTOCKTYPEINDEX = data.SUBSTOCKTYPEINDEX;
                            that.INDEX.COSTBALANCEINDEX = data.COSTBALANCEINDEX;
                            that.INDEX.PARVALUEINDEX = data.PARVALUEINDEX;
                            that.INDEX.PREDRPRICEINDEX = data.PREDRPRICEINDEX;
                            data.GRID0 && data.GRID0.shift();
                            // that.$set('dateArray', oData.dateArray);
                            // var obj = {
                            //     textTitleArray: oData.dateTitle,
                            //     gridTitle: oData.textTitle,
                            //     dateArray: oData.dateArray
                            // };
                            // that.$dispatch('headtitle', obj, that.currAccount);
                            if ((!data.GRID0 || data.GRID0.length == 0)) {
                                fnSuccess && fnSuccess(_data);
                                // that.$dispatch('noDataBlock');
                                return;
                            }
                        }
                        if(data.GRID0 && data.GRID0.length > 0){
                            data.GRID0.forEach((i, k)=>{
                                var _item = data.GRID0[k];
                                var _data_arr = _item.split('|');
                                var chiCangItem = that.gridData.find(function(o){
                                    return o.code == _data_arr[data.STOCKCODEINDEX] && o.wtAccountType == _data_arr[data.WTACCOUNTTYPEINDEX] && o.account == _data_arr[data.ACCOUNTINDEX];
                                }) || {};
                                //持仓列表中不包含天天理财产品
                                if ((/^(660|670)\d{3}/).test(_data_arr[data.STOCKCODEINDEX]) || ((/^(680)\d{3}/).test(_data_arr[data.STOCKCODEINDEX]) && _data_arr[data.WTACCOUNTTYPEINDEX] == 'SZACCOUNT')){
                                    return;
                                }
                                // console.log('_data_arr',_data_arr)
                                that.chiCangChengBenXianShuJu.push({
                                    'stockCode': _data_arr[data.STOCKCODEINDEX],
                                    'stockName': _data_arr[data.STOCKNAMEINDEX],
                                    'stockMarket': _data_arr[data.WTACCOUNTTYPEINDEX],
                                    'chiCangPrice': _data_arr[data.KEEPPRICEINDEX],
                                    'stbLayerFlag': _data_arr[data.STBLAYERFLAGINDEX]
                                });
                                
                                // STOCKCODE_TYPEINDEX为证券类别 WTACCOUNTTYPEINDEX为市场类别,合起来判断是否为新三板的新股申购
                                if(_data_arr[data.STOCKCODE_TYPEINDEX]=='4' && _data_arr[data.WTACCOUNTTYPEINDEX]=='SBACCOUNT' && _data_arr[data.STOCKCODEINDEX].substr(0,3)=='889' && parseInt(_data_arr[data.STOCKNUMINDEX]) > 0 && parseInt(_data_arr[data.KYINDEX]) == 0){
                                    that.shiFouXinGu.push(1);
                                }else{
                                    that.shiFouXinGu.push(0);
                                }
                                
                                chiCangItem.code=_data_arr[data.STOCKINDEX || data.STOCKCODEINDEX];
                                chiCangItem.yingKui=_data_arr[data.YKINDEX];
                                chiCangItem.yingKuiLv= _data_arr[data.YKLINDEX];
                                chiCangItem.chiCang= _data_arr[data.STOCKNUMINDEX];
                                chiCangItem.keYong=_data_arr[data.KYINDEX];
                                chiCangItem.chengBen=_data_arr[data.KEEPPRICEINDEX];
                                chiCangItem.shiJia=_data_arr[data.LASTPRICEINDEX];
                                chiCangItem.shiZhi=_data_arr[data.STOCKVALUEINDEX];
                                chiCangItem.wtAccountType = _data_arr[data.WTACCOUNTTYPEINDEX];
                                chiCangItem.stbLayerFlag = _data_arr[data.STBLAYERFLAGINDEX];
                                chiCangItem.stockName = _data_arr[data.STOCKNAMEINDEX];
                                if(chiCangItem.code == '888880' || chiCangItem.code == '131990'){
                                    chiCangItem.stockName = '国债逆回购标准券';
                                }
                                chiCangItem.stockNameLongId = _data_arr[data.STOCKNAMELONGIDXINDEX];

                                if(chiCangItem.wtAccountType == 'SBACCOUNT' && chiCangItem.stbLayerFlag == '3'){
                                    chiCangItem.wtAccountTypeName = '北京A';
                                }
                                else{
                                    chiCangItem.wtAccountTypeName = _data_arr[data.WTACCOUNTTYPENAMEINDEX];
                                }

                                chiCangItem.frozen = _data_arr[data.FROZENINDEX];
                                chiCangItem.delistFlagName = _data_arr[data.DELISTFLAGNAMEINDEX];
                                chiCangItem.account = _data_arr[data.ACCOUNTINDEX];
                                chiCangItem.fundAccount = _data_arr[data.FUNDACCOUNTINDEX];
                                chiCangItem.yingKuiWithoutFare = _data_arr[16];
                                
                                chiCangItem.stockCodeType = _data_arr[data.STOCKCODE_TYPEINDEX];
                                chiCangItem.assetPrice = _data_arr[data.ASSETPRICEINDEX];
                                chiCangItem.subStockType = _data_arr[data.SUBSTOCKTYPEINDEX];
                                chiCangItem.costBalance = _data_arr[data.COSTBALANCEINDEX];

                                chiCangItem.realBuyBalance = _data_arr[data.REALBUYBALANCEINDEX];
                                chiCangItem.realSellBalance = _data_arr[data.REALSELLBALANCEINDEX];
                                chiCangItem.realBuyAmount = _data_arr[data.REALBUYAMOUNTINDEX];
                                chiCangItem.realSellAmount = _data_arr[data.REALSELLAMOUNTINDEX];
                                chiCangItem.parValue = _data_arr[data.PARVALUEINDEX];
                                chiCangItem.preDrPrice = _data_arr[data.PREDRPRICEINDEX];

                                var stockname_long_temp = chiCangItem.stockNameLongId;
                                var stockname_temp = chiCangItem.stockName;
                                if(stockname_long_temp && stockname_long_temp.replace(/\s+/g,"").length>0) {
                                    _item = _item.replace('|'+stockname_temp+'|','|'+stockname_long_temp+'|');
                                    data.GRID0[k] = _item;
                                    chiCangItem.name = that.geshiValue(stockname_long_temp,data.STOCKNAMELONGIDXINDEX);
                                } else {
                                    chiCangItem.name = that.geshiValue(stockname_temp,data.STOCKNAMEINDEX);
                                };

                                chiCangItem.ratio = chiCangItem.ratio || '--';

                                chiCangItem.oWTINFO = {
                                    ACCOUNTINDEX: chiCangItem.account,
                                    WTACCOUNTTYPEINDEX: chiCangItem.wtAccountType,
                                    STOCKCODE_TYPEINDEX: chiCangItem.stockCodeType,
                                    STOCKINDEX: chiCangItem.code,
                                    STOCKNAMEINDEX: chiCangItem.stockName,
                                    shiZhiIndex: chiCangItem.shiZhi,
                                    yingkuiIndex: chiCangItem.yingKui ,
                                    chengbenjiaIndex: chiCangItem.chengBen,
                                    chicangNumIndex: chiCangItem.chiCang
                                };
                                chiCangItem.isUplistShow = chiCangItem.isUplistShow || false;
                                chiCangItem.newMarketNo = chiCangItem.newMarketNo;
                                chiCangItem.stockProCode = chiCangItem.stockProCode;

                                chiCangItem.domKey = chiCangItem.code + '|' + chiCangItem.wtAccountType + '|' + chiCangItem.account;
                                chiCangItem.todayPl = chiCangItem.todayPl || '--';                

                                chiCangItem.isActive = true;
                                newDataArr.push(chiCangItem);
                            });
                            fnSuccess && fnSuccess(_data);
                        }
                        else{
                            fnSuccess && fnSuccess(_data);
                        }
                    
                }).catch((err)=>{
                    console.error(err)
                    fnFail && fnFail();
                });
            },
            getHKHolding(newDataArr, fnSuccess, fnFail) {
                var that = this;
                var oSendData = {
                    //起始位置
                    StartPos: that.listNumber == 0 ? that.listNumber : (that.listNumber + 1),
                    //最大条数
                    // MaxCount: repoconfig.config.pagecount
                    MaxCount: that.pagecount - 1,
                    // MaxCount:1000
                    wtaccounttype: '!'
                };

                service_ptjy.require5106(oSendData)
                    .then((data) => {
                        var _data = JSON.parse(JSON.stringify(data));
                        // that.$dispatch('getHKHoldingData', data);
                        if (data.ERRORNO < 0) {
                            fnFail && fnFail();
                            // $.alert(data.ERRORMESSAGE);
                            return;
                        }

                        if (that.listNumber === 0) {
                            that.hkChiCangChengBenXianShuJu.length = 0;
                            // data.GRID0 && data.GRID0.shift();
                            that.HKINDEX.STOCKCODEINDEX = data.STOCKCODEINDEX || '3';
                            that.HKINDEX.YKLINDEX = data.YKRATEINDEX || '26';
                            that.HKINDEX.STOCKNAMEINDEX = data.STOCKNAMEINDEX || '4';
                            that.HKINDEX.STOCKCODE_TYPEINDEX = data.STOCKTYPECODEINDEX || '28';
                            that.HKINDEX.WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX || '27';
                            that.HKINDEX.WTACCOUNTTYPENAMEINDEX = data.WTACCOUNTTYPENAMEINDEX || '1';
                            that.HKINDEX.STOCKNUMINDEX = data.FROZENINDEX || '7';
                            that.HKINDEX.KYINDEX = data.KEINDEX || '8';
                            that.HKINDEX.KEEPPRICEINDEX = data.KEEPPRICEINDEX || '15';
                            that.HKINDEX.LASTPRICEINDEX = data.LASTPRICEINDEX || '14';
                            that.HKINDEX.STOCKVALUEINDEX = data.STOCKVALUEINDEX || '18';
                            that.HKINDEX.YKINDEX = data.YKINDEX || '17';
                            that.HKINDEX.FROZENINDEX = data.FROZENAMOUNTINDEX || '25';
                            that.HKINDEX.DELISTFLAGNAMEINDEX = data.DELISTFLAGNAMEINDEX || '22';
                            that.HKINDEX.ACCOUNTINDEX = data.ACCOUNTINDEX || '2';
                            that.HKINDEX.FUNDACCOUNTINDEX = data.FUNDACCOUNTINDEX || '0';
                            that.HKINDEX.COSTBALANCEINDEX = data.COSTBALANCEINDEX || '21';
                            that.HKINDEX.YKWITHOUTFAREINDEX = data.INCOMEBALANCENOFAREINDEX || '31';
                            that.HKINDEX.REALBUYBALANCEINDEX = data.REALBUYBALANCEINDEX || '29';
                            that.HKINDEX.REALSELLBALANCEINDEX = data.REALSELLBALANCEINDEX || '30';
                            that.HKINDEX.REALBUYAMOUNTINDEX = data.REALBUYAMOUNTINDEX || '9';
                            that.HKINDEX.REALSELLAMOUNTINDEX = data.REALSELLAMOUNTINDEX || '10';
                            that.HKINDEX.PARVALUEINDEX = data.PARVALUEINDEX || '24';
                            that.HKINDEX.ASSETPRICEINDEX = data.ASSETPRICEINDEX;
                            that.HKINDEX.RMBCOSTPRICEINDEX = data.RMBCOSTPRICEINDEX;
                            that.HKINDEX.PREDRPRICEINDEX = data.PREDRPRICEINDEX;
                            if(data.GRID0){
                                that.S_FIELD = data.GRID0[0];
                                data.GRID0.shift();  
                            }
                            // that.$set('dateArray', oData.dateArray);
                            if ((!data.GRID0 || data.GRID0.length == 0)) {
                                fnSuccess && fnSuccess(_data);
                                // that.$dispatch('noDataBlock');
                                return;
                            }
                        }
                        if(data.GRID0 && data.GRID0.length > 0){
                            that.A_ARR = JSON.parse(JSON.stringify(data.GRID0));
                            data.GRID0.forEach(function(i, k){                              
                                var _item = data.GRID0[k];
                                var _data_arr = _item.split('|');
                                var chiCangItem = that.gridData.find(function(o){
                                    return o.code == _data_arr[that.HKINDEX.STOCKCODEINDEX] && o.wtAccountType == _data_arr[that.HKINDEX.WTACCOUNTTYPEINDEX] && o.account == _data_arr[that.HKINDEX.ACCOUNTINDEX];
                                }) || {};

                                chiCangItem.initIndex = k;
                                chiCangItem.code=_data_arr[that.HKINDEX.STOCKCODEINDEX];
                                chiCangItem.yingKui=_data_arr[that.HKINDEX.YKINDEX];
                                chiCangItem.yingKuiLv= _data_arr[that.HKINDEX.YKLINDEX];
                                chiCangItem.chiCang= _data_arr[that.HKINDEX.STOCKNUMINDEX];
                                chiCangItem.keYong=_data_arr[that.HKINDEX.KYINDEX];
                                chiCangItem.chengBen=_data_arr[that.HKINDEX.KEEPPRICEINDEX];
                                chiCangItem.shiJia=_data_arr[that.HKINDEX.LASTPRICEINDEX];
                                chiCangItem.shiZhi=_data_arr[that.HKINDEX.STOCKVALUEINDEX];
                                chiCangItem.wtAccountType = _data_arr[that.HKINDEX.WTACCOUNTTYPEINDEX];
                                chiCangItem.stockName = _data_arr[that.HKINDEX.STOCKNAMEINDEX];

                                chiCangItem.wtAccountTypeName = _data_arr[that.HKINDEX.WTACCOUNTTYPENAMEINDEX];
                                chiCangItem.frozen = _data_arr[that.HKINDEX.FROZENINDEX];
                                chiCangItem.delistFlagName = _data_arr[that.HKINDEX.DELISTFLAGNAMEINDEX];
                                chiCangItem.account = _data_arr[that.HKINDEX.ACCOUNTINDEX];
                                chiCangItem.fundAccount = _data_arr[that.HKINDEX.FUNDACCOUNTINDEX];
                                chiCangItem.yingKuiWithoutFare = _data_arr[that.HKINDEX.YKWITHOUTFAREINDEX];
                                
                                chiCangItem.stockCodeType = _data_arr[that.HKINDEX.STOCKCODE_TYPEINDEX];
                                chiCangItem.costBalance = _data_arr[that.HKINDEX.COSTBALANCEINDEX];

                                chiCangItem.realBuyBalance = _data_arr[that.HKINDEX.REALBUYBALANCEINDEX];
                                chiCangItem.realSellBalance = _data_arr[that.HKINDEX.REALSELLBALANCEINDEX];
                                chiCangItem.realBuyAmount = _data_arr[that.HKINDEX.REALBUYAMOUNTINDEX];
                                chiCangItem.realSellAmount = _data_arr[that.HKINDEX.REALSELLAMOUNTINDEX];
                                chiCangItem.parValue = _data_arr[that.HKINDEX.PARVALUEINDEX];
                                chiCangItem.preDrPrice = _data_arr[that.HKINDEX.PREDRPRICEINDEX];

                                chiCangItem.assetPrice = _data_arr[that.HKINDEX.ASSETPRICEINDEX];
                                chiCangItem.rmbCostPrice = _data_arr[that.HKINDEX.RMBCOSTPRICEINDEX];

                                chiCangItem.name = that.geshiValue(chiCangItem.stockName,that.HKINDEX.STOCKNAMEINDEX);

                                chiCangItem.todayPlHKD = chiCangItem.todayPlHKD || '--';
                                chiCangItem.todayPl = chiCangItem.todayPl || '--';

                                chiCangItem.ratio = chiCangItem.ratio || '--';

                                chiCangItem.oWTINFO = {
                                    ACCOUNTINDEX: chiCangItem.account,
                                    WTACCOUNTTYPEINDEX: chiCangItem.wtAccountType,
                                    // STOCKCODE_TYPEINDEX: chiCangItem.stockCodeType,
                                    STOCKINDEX: chiCangItem.code,
                                    STOCKNAMEINDEX: chiCangItem.stockName,
                                    shiZhiIndex: chiCangItem.shiZhi,
                                    yingkuiIndex: chiCangItem.yingKui ,
                                    chengbenjiaIndex: chiCangItem.chengBen,
                                    chicangNumIndex: chiCangItem.chiCang
                                };
                                chiCangItem.isUplistShow = chiCangItem.isUplistShow || false;

                                chiCangItem.domKey = chiCangItem.code + '|' + chiCangItem.wtAccountType + '|' + chiCangItem.account;

                                chiCangItem.isActive = true;
                                newDataArr.push(chiCangItem);
                                // that.chiCangHqDaiCha.push('H' + chiCangItem.code + '|' + chiCangItem.wtAccountType);
                                if (chiCangItem.fundAccount === '资产账户') {
                                    return;
                                }
                                that.hkChiCangChengBenXianShuJu.push({
                                    'ziChanZhangHu': chiCangItem.fundAccount,
                                    'jiaoYiLeiBie': chiCangItem.wtAccountTypeName,
                                    'shiChangLeiBie': chiCangItem.wtAccountType,
                                    'guDongZhangHao': chiCangItem.account,
                                    'zhengQuanDaiMa': chiCangItem.code,
                                    'zhengQuanLeiXing': chiCangItem.stockCodeType,
                                    'zhengQuanMingCheng': chiCangItem.name,
                                    'chiCangShuLiang': chiCangItem.chiCang,
                                    'chiCangChengBenJia': chiCangItem.chengBen,
                                    'keYong': chiCangItem.keYong
                                });
                            });
                            fnSuccess && fnSuccess(_data);        
                        }
                        else{
                            fnSuccess && fnSuccess(_data);
                        }
                }).catch((err)=>{
                    console.error(err)
                    that.hkChiCangChengBenXianShuJu.length = 0;
                    H5TZT.reqsofttodo({'setHKChiCangPriceList': JSON.stringify(that.hkChiCangChengBenXianShuJu)})
                    fnFail && fnFail();
                });
            },
            getHKStockExchangeRate(fnSuccess, fnFail) {
                var that = this;
                that.HKStockExchangeRateList = {};
                var oSendData = {
                    wtaccounttype: '!'
                }
                service_ptjy.require5107(oSendData).then(function(data){
                    if (data.ERRORNO < 0) {
                        that.isExchangeRateError = true;
                        that.HKStockExchangeRateList['HKACCOUNT'] = {};
                        that.HKStockExchangeRateList['HKACCOUNT'].buyRate = '--';
                        that.HKStockExchangeRateList['HKACCOUNT'].sellRate = '--';
                        that.HKStockExchangeRateList['HKACCOUNT'].middleRate = '--';
                        that.HKStockExchangeRateList['HKSZACCOUNT'] = {};
                        that.HKStockExchangeRateList['HKSZACCOUNT'].buyRate = '--';
                        that.HKStockExchangeRateList['HKSZACCOUNT'].sellRate = '--';
                        that.HKStockExchangeRateList['HKSZACCOUNT'].middleRate = '--';
                        alert(data.ERRORMESSAGE);
                        fnSuccess && fnSuccess();
                        return;
                    }
                    if(!data.GRID0 || data.GRID0.length < 2){
                        that.isExchangeRateError = true;
                        that.HKStockExchangeRateList['HKACCOUNT'] = {};
                        that.HKStockExchangeRateList['HKACCOUNT'].buyRate = '--';
                        that.HKStockExchangeRateList['HKACCOUNT'].sellRate = '--';
                        that.HKStockExchangeRateList['HKACCOUNT'].middleRate = '--';
                        that.HKStockExchangeRateList['HKSZACCOUNT'] = {};
                        that.HKStockExchangeRateList['HKSZACCOUNT'].buyRate = '--';
                        that.HKStockExchangeRateList['HKSZACCOUNT'].sellRate = '--';
                        that.HKStockExchangeRateList['HKSZACCOUNT'].middleRate = '--';
                        fnSuccess && fnSuccess();
                        return;
                    }
                    data.GRID0.shift();
                    data.GRID0.forEach((o)=>{
                        var exchangeRateInfo = o.split('|');
                        var exchangeType = exchangeRateInfo[data.WTACCOUNTTYPEINDEX];
                        if(!that.HKStockExchangeRateList[exchangeType]){
                            that.HKStockExchangeRateList[exchangeType] = {};
                        }
                        that.HKStockExchangeRateList[exchangeType].buyRate = new Big(exchangeRateInfo[data.BUYRATEINDEX]).toFixed(4).toString();
                        that.HKStockExchangeRateList[exchangeType].sellRate = new Big(exchangeRateInfo[data.SELLRATEINDEX]).toFixed(4).toString();
                        that.HKStockExchangeRateList[exchangeType].middleRate = new Big(that.HKStockExchangeRateList[exchangeType].buyRate).plus(new Big(that.HKStockExchangeRateList[exchangeType].sellRate)).div(2).toFixed(4).toString();
                    });
                    console.log(that.HKStockExchangeRateList)
                    fnSuccess && fnSuccess();
                });
            },
            getClientStockBussinessDataWithCache(newDataArr, oSendData, fnSuccess, fnFail){
                var that = this;
                var stockCodeArr = [];
                newDataArr.forEach((item)=>{
                    var stockCodeItem = item.code + '.' +that.hsExchangeTypeReverseMap[item.wtAccountType];
                    // 标的去重
                    if(stockCodeArr.indexOf(stockCodeItem) == -1){
                        stockCodeArr.push(stockCodeItem);
                    }   
                });
                var stockCodeStr = stockCodeArr.join('|');
                cache.fetchNetDataWithCache('allStockBussinessData', parseInt(cacheTime.stockBussinessData), getClientStockBussinessData, oSendData, fnSuccess, fnFail, false);

                function getClientStockBussinessData(oSend, _fnSuccess, fnFail){
                    var baseParams = {
                        sysNo: 'cs118',
                        version: '1.0',
                        functionNo: '006',
                        extendJson: JSON.stringify({'stockCodes': stockCodeStr})
                    };
                    service_ptjy.require48230({
                        path: 'ae',
                        PostString: JSON.stringify(baseParams)
                    }).then((oData) => {
                        if (oData.ERRORNO < 0) {
                            console.warn('盘后成交数据接口报错');
                            fnFail && fnFail();  
                            return;
                        }
                        try{
                            var data = JSON.parse(oData.BINDATA);
                            if (data && data.code == '0') {
                                if(data.data){
                                    _fnSuccess && _fnSuccess(data.data);
                                }
                                else{
                                    fnFail && fnFail();
                                }
                            } else {
                                console.warn(data.msg);
                                fnFail && fnFail();
                            }
                        } catch(e){
                            fnFail && fnFail();
                        } 
                    });
                }
            },      
            listFunc(item) {
                if(item.isUplistShow){
                    item.isUplistShow = false;
                    this.activeStock = {};
                    return;
                }
                
                this.activeStock.isUplistShow = false;
                // 更新展开的证券对象
                this.activeStock = item;
                
                item.isUplistShow = true;
                this.$nextTick(()=>{
                    this.scrollEvent(true);
                    setTimeout(()=>{
                        var scrollTop = document.getElementById('app').scrollTop;
                        var windowHeight = document.body.clientHeight;
                        var endlineTop = document.getElementById('endline').getBoundingClientRect().top;
                        if(endlineTop > windowHeight){
                            document.getElementById('app').scrollTop = scrollTop - windowHeight + endlineTop; 
                        } 
                    }, 150);
                    setTimeout(()=>{
                        var scrollTop = document.getElementById('app').scrollTop;
                        var offsetTop = document.getElementById('chicang-list-title').clientHeight;
                        var startlineTop = document.getElementById('startline').getBoundingClientRect().top;
                        if(startlineTop < offsetTop){
                            console.log(scrollTop, offsetTop, startlineTop);
                            document.getElementById('app').scrollTop = scrollTop - offsetTop + startlineTop; 
                        } 
                    }, 150);
                    setTimeout(()=>{
                        this.scrollEvent(false); 
                    }, 150);
                });  
            },
            makeSort(){
                var that = this;
                var currAccountList = that.gridData.filter((item)=>{
                    return that.accountTypeMap[that.currAccount].indexOf(item.wtAccountType) > -1;
                });
                var sortValue = [];
                sortValue = that.currAccount === '0_HK' ? ['shiZhi', 'yingKui', 'chiCang', 'chengBen', 'todayPlHKD', 'todayPl', 'ratio'] : ['shiZhi', 'yingKui', 'chiCang', 'chengBen', 'todayPl', 'ratio'];
                
                if(currAccountList.length) {
                    var sort_col = that.sortArr.findIndex(function(o){
                        return o > 0;
                    });
                    if(sort_col == -1){
                        currAccountList.sort(function(a, b){
                            return a.sortIndex - b.sortIndex;
                        });
                        that.$set('listData', currAccountList);
                        that.$dispatch('setNoData', false);
                        return;
                    }
                    var sort_type = that.sortArr[sort_col];
                    console.log('sort_type',sort_type)
                    console.log('sort_col',sort_col)   
                    switch (sort_type) {
                        case '0':
                            currAccountList.sort(function(a, b){
                                return a.sortIndex - b.sortIndex;
                            });
                            break;
                        case '1':
                            currAccountList.sort(function(a, b){
                                if(a[sortValue[sort_col]] === '--' &&  b[sortValue[sort_col]] !== '--'){
                                    return 1;
                                }
                                if(a[sortValue[sort_col]] !== '--' &&  b[sortValue[sort_col]] === '--'){
                                    return -1;
                                }
                                if(a[sortValue[sort_col]] == b[sortValue[sort_col]]){
                                    return a.sortIndex - b.sortIndex;
                                }
                                return b[sortValue[sort_col]] - a[sortValue[sort_col]];
                            });
                            break;
                        case '2':
                            currAccountList.sort(function(a, b){
                                if(a[sortValue[sort_col]] === '--' &&  b[sortValue[sort_col]] !== '--'){
                                    return 1;
                                }
                                if(a[sortValue[sort_col]] !== '--' &&  b[sortValue[sort_col]] === '--'){
                                    return -1;
                                }
                                if(a[sortValue[sort_col]] == b[sortValue[sort_col]]){
                                    return a.sortIndex - b.sortIndex;
                                }
                                return a[sortValue[sort_col]] - b[sortValue[sort_col]];
                            });
                            break;
                        default:
                            currAccountList.sort(function(a, b){
                                return a.sortIndex - b.sortIndex;
                            });
                            break;
                    }
                    that.$set('listData', currAccountList);
                    that.$dispatch('setNoData', false);
                } 
                else{
                    that.$set('listData', []);
                    that.$dispatch('setNoData', true);
                }                  
            },
            onB2HAlert(){
                // alert('当您持有的上海B股转为H股后，成本和市价的计价方式将从美元转为港币，我司将根据“路透社财经数据”中的“港币对美元的转汇比率”，把您持有的上海B转H股资产由港币转换成美元为您提供市值参考。\n\n您的每次成交结果以中国证券登记结算有限责任公司的实际清算结果为准。');
                this.isB2HDialogShow = true;
            },
            onPeiShouAlert(){
                // alert('因您持仓正股，拥有配股或优先配债权。\n\n假如您计划认购配股或配债，可在交易页面输入配售代码和数量进行操作。假如您不计划认购，则无需进行操作。\n\n注意，持仓中展示的是配售权益，不是股票或债券，系统也不会自动扣款。');
                this.isPeiShouDialogShow = true;
            }
        },
        events: {
            'child-loadMore': function () {
                // console.log('loadMore')
                this.loadMore();
            },
            'child-changeSort':function(){
                this.makeSort();
            },
            'child-concatArr':function(){
                // this.listNamber = 0;
                var gridDataAll = JSON.parse(JSON.stringify(this.gridDataAll))
                this.gridData = this.gridData.concat(gridDataAll.splice(this.gridData.length,20));
                console.log(this.gridData)
                // this.$set('gridData',this.gridData)
           },
           'clearHqTimer': function(){
                if(this.isAutoRefresh && this.hqTimer){
                    clearTimeout(this.hqTimer);
                }   
            },
           'changeAccount': function(account){
                this.currAccount = account;
                this.$nextTick(()=>{
                    if(this.isAutoRefresh){
                        this.setHqInterval(true);
                    }   
                });   
           },
           'onRefresh': function(){
                this.loadMore();
           },
           'initStockHoldingList': function(){
                this.init();
           },
           'loadingEnd': function(accountList, type){
                var that = this; 
                if(type === 'hs'){
                    var newDataArr = JSON.parse(JSON.stringify(that.originData));
                    newDataArr.forEach((o1, i)=>{
                        Object.keys(that.accountTypeMap).forEach((k)=>{
                            if(that.accountTypeMap[k].indexOf(o1.wtAccountType) > -1){
                                var account = accountList.find((o2)=>{
                                    return o2.bztype === k;
                                });
                                if(account){
                                    var totalAsset = account.total;
                                    try{
                                        o1.ratio = new Big(o1.shiZhi).div(new Big(totalAsset)).toFixed(4).toString();
                                    }
                                    catch(e){
                                        o1.ratio = '--';
                                    }
                                }         
                            }
                        });
                        o1.sortIndex = i;
                        if(o1.isUplistShow){
                            that.activeStock = o1;
                        }
                    });
                    that.$set('gridData', newDataArr); 
                    console.log('gridData------', that.gridData);
                }
                else{
                    that.gridData.forEach((o1, i)=>{
                        Object.keys(that.accountTypeMap).forEach((k)=>{
                            if(that.accountTypeMap[k].indexOf(o1.wtAccountType) > -1){
                                var account = accountList.find((o2)=>{
                                    return o2.bztype === k;
                                });
                                if(account){
                                    var totalAsset = account.total;
                                    try{
                                        o1.ratio = new Big(o1.shiZhi).div(new Big(totalAsset)).toFixed(4).toString();
                                    }
                                    catch(e){
                                        o1.ratio = '--';
                                    }
                                }         
                            }
                        });
                    });
                }
                that.onNoDataShow();
                that.$nextTick(()=>{
                    that.loadingEnd();
                });   
            }
        },
        components:{
            // Swiper,
            CommonDialog,
            hqChart
        }
    }
</script>
<style lang="less" scoped>
    // @import '../../../../assets/less/variables.less';
    // @import "../../../../assets/less/mixins.less";
    // @import "../../../../assets/less/template.less";
    @font-face {
        font-family: CITIC-Numbers-Medium;
        font-style: normal;
        font-weight: 500;
        src: url(/z_modules/font/CITIC-Numbers-Medium.ttf) format('trueType');
    }
    .spanfont1 {
        font-size: 0.67rem;
    }

    .spanfont2 {
        font-size: 0.63rem;
    }

    .spanfont3 {
        font-size: 0.60rem;
    }

    .spanfont4 {
        font-size: 0.2rem!important;
    }

    .spanfont5 {
        font-size: .18rem!important;
    }

    .height68 {
        height: 1.36rem!important;
    }
    .slh {
        .height68 {
            line-height: .4rem!important;
        }
    }
    .slh {
        .height16 {
            line-height: .32rem!important;
        }
    }

    .table{
        position: relative;
        .listPhantom {
            position: relative;
            z-index: -1;
        }
        .list{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index:10;
        }
        .top-layer{
            position: relative;
            display: flex;
            z-index: 1;

            .left-column{
                width: 25%;  
                .table-list {
                    height: 1.12rem;
                    background: #FFFFFF;
                    display: flex;
                    font-size: 0.3rem;
                    padding: 0.16rem 0 0.16rem 0.3rem;
                    border-bottom: 1px solid #EBEDEE;
                    align-items: center;
                    .ggcc-icon{
                        display: none;
                        height: .46rem;
                        width: .24rem;
                        margin-left: -0.3rem;
                        margin-right: .06rem;
                        border: 0;
                        &.ggcc-sh{
                            display: inline-block;
                            background: url(../../../../assets/jy/images/ggcc_h.png) no-repeat;
                            background-size: contain;
                        }
                        &.ggcc-sz{
                            display: inline-block;
                            background: url(../../../../assets/jy/images/ggcc_s.png) no-repeat;
                            background-size: contain;
                        }
                    }
                    .gz-icon{
                        display: none;
                        height: .26rem;
                        width: .25rem;
                        margin-left: -0.3rem;
                        margin-right: .05rem;
                        margin-top: -0.42rem;
                        border: 0;
                        &.gz-sh{
                            display: inline-block;
                            background: url(../../../../assets/jy/images/shgz-icon.png) no-repeat;
                            background-size: 100%;
                        }
                        &.gz-sz{
                            display: inline-block;
                            background: url(../../../../assets/jy/images/szgz-icon.png) no-repeat;
                            background-size: 100%;
                        }
                    }
                    .b2h-icon{
                        display: inline-block;
                        height: .86rem;
                        width: .26rem;
                        margin-left: -0.3rem;
                        margin-right: .04rem;
                        border: 0;
                        background: url(../../../../assets/jy/images/b2h-icon.png) no-repeat;
                        background-size: contain;
                    }
                    .peishou-icon{
                        display: inline-block;
                        height: .68rem;
                        width: .26rem;
                        margin-left: -0.3rem;
                        margin-right: .04rem;
                        border: 0;
                        background: url(../../../../assets/jy/images/peishou-icon.png) no-repeat;
                        background-size: contain;
                    }
                }
            }

            .right-container{
                width: 75%;  
                overflow-x: hidden;
                // -webkit-overflow-scrolling: touch;
                .right-columns{
                    width: fit-content;
                    >div{
                        width: fit-content;
                        .table-list {
                            width: fit-content;
                            height: 1.12rem;
                            background: #FFFFFF;
                            display: flex;
                            font-size: 0.3rem;
                            padding: 0.16rem 0;
                            border-bottom: 1px solid #EBEDEE;
                            align-items: center;
                        }
                    }
                }
            }

            .right-container::-webkit-scrollbar {
                display: none;
            }
            
            .table .table-list:last-child {
                border-bottom: none;
            }

            .table-list .cc-piece {
                color: #222222;
                font-family: PingFangSC-Medium;
                width: 100%;
                p{
                    font-family: CITIC-Numbers-Medium;
                    font-size: .28rem;
                    line-height: .28rem;
                    text-align: right;
                    font-weight: 500;
                    &:first-child {
                       margin-bottom: .12rem; 
                    }
                }
                .mingcheng{
                    text-align: left !important;
                    font-family: PingFangSC-Regular!important;
                    font-weight: 400;
                    font-size: .28rem;
                    line-height: .28rem;
                }
            }

            .table-list .cc-piece1 {
                color: #222222;
                font-family: PingFangSC-Medium;
                padding-right: .3rem;
                flex-shrink: 0;
                p{
                    font-family: CITIC-Numbers-Medium;
                    font-size: .28rem;
                    line-height: .28rem;
                    text-align: right;
                    font-weight: 500;
                    white-space: nowrap;
                    &:first-child {
                        margin-bottom: .12rem;
                    }
                    &.hk-unit{
                       font-family: SourceHanSansSC-Regular;
                        font-size: .24rem;
                        color: #777777;
                        letter-spacing: 0;
                        text-align: right;
                        font-weight: 400; 
                    }
                }
                .mingcheng{
                    font-size: .28rem;
                    font-weight: 400;
                }
                &:first-child{
                    width: 25vw;
                }
                &:nth-child(2){
                    width: 25vw;
                }
                &:nth-child(3){
                     width: 25vw;
                }
                &:nth-child(4){
                    width: 25vw;
                }
                &:last-child{
                    width: 25vw;
                    padding-right: .3rem;
                }
            }
            
            .table-list.ggt .cc-piece1{
                &:nth-child(4){
                    width: 25vw;
                }
                &:nth-child(5){
                    width: 25vw;
                }
            }
        }
        .bottom-layer{
            position: absolute;
            z-index: 2;
            top: 0;
            width: 100%;
            pointer-events:none;
            .table-list {
                height: 1.12rem;
                background: #FFFFFF;
                display: flex;
                font-size: 0.3rem;
                padding: 0.16rem 0.3rem;
                border-bottom: 1px solid #EBEDEE;
                
                align-items: center;
                .ggcc-icon{
                    display: none;
                    height: .46rem;
                    width: .24rem;
                    margin-left: -0.3rem;
                    margin-right: .06rem;
                    border: 0;
                    &.ggcc-sh{
                        display: inline-block;
                        background: url(../../../../assets/jy/images/ggcc_h.png) no-repeat;
                        background-size: contain;
                    }
                    &.ggcc-sz{
                        display: inline-block;
                        background: url(../../../../assets/jy/images/ggcc_s.png) no-repeat;
                        background-size: contain;
                    }
                }
            }
            
            .table .table-list:last-child {
                border-bottom: none;
            }

            .table-list .cc-piece {
                color: #222222;
                font-family: PingFangSC-Medium;
                width:25%;
                p{
                    font-family: CITIC-Numbers-Medium;
                    font-size: .28rem;
                    text-align: right;
                    font-weight: 500;
                }
                .mingcheng{
                    font-size: .28rem;
                    text-align: left !important;
                    font-family: PingFangSC-Regular!important;
                    font-weight: 400;
                }
            }
            
            .opctup{
                pointer-events: auto;
            }

            .hqchart{
                pointer-events: auto;
            }
        }
    }
    
    .table .fill {
       color: #169665!important;
    }

    .table .rise {
        color: #E83333!important;
    }
    .chicang-xingutu {
       width: 25%;
       vertical-align: inherit;
       margin-left: 3px;
       display: none;
    }
    .shizhi{
        text-align:left !important;
        color:#222222!important;
        font-weight:500 !important;
    }
    .m-content-3 {
        overflow: scroll;
        position: absolute;
        // top:1.68rem;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-overflow-scrolling: touch;
    }
    .opctup {
        width: 100%;
        border-bottom: 0;
        background: #F7F7F7;
        display: block;
        // height: 3.02rem;
        .details {
            overflow: hidden;
            background: #F7F7F7;
            > div {
                padding: .22rem 0 0 .36rem;
                width: 50%;
                float: left;
                font-size: .24rem;
                p:not(:last-child) {
                    margin-bottom: .12rem;
                }

                p{ 
                    text-align: left;
                    white-space: nowrap;
                    span, em{
                        width: auto;
                        font-family: PingFangSC-Regular;
                        font-size: 0.24rem;
                        color: #777777;
                        letter-spacing: 0;
                        font-weight: 400;
                    }     
                    em{
                        color: #222222!important;
                    }
                }
                &:nth-child(3){
                    width: 100%;
                    padding: .12rem 0 0 .36rem;
                }
                &:last-child{
                    width: 100%;
                    padding: .12rem 0 .16rem .36rem;
                }
            }
            &.ggt {
                > div:last-child {
                    padding-top: 0!important;
                }
            }
        }
        &.ggt {
            li {
                width: 20%!important;
                >div{
                    padding: 0;
                }
            }
        }
    }

    .slh{
        .pl0 {
            padding-left: 0!important;
        }
        .w45 {
            width: 45%!important;
        }
        .w55 {
            width: 55%!important;
        }
    } 
    
    .opctup .j_operate {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: justify;
        -moz-justify-content: space-between;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        border-bottom: 1px solid rgba(230,230,230,1);
        background: #F7F7F7;
        padding-left: 0!important;
        li {
            // width: 20%;
            background: #F7F7F7;
            color: #767676;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            border-left: none!important;
            margin: 0;
            padding: 0.18rem 0;
            &:first-child{
                >div{
                    padding-left: .3rem;
                }  
            }
            &:last-child{
                >div{
                    padding-right: .3rem;
                }     
            }
            > div {
                font-family: PingFangSC-Regular;
                font-size: 0.26rem;
                color: #222222;
                letter-spacing: 0;
                font-weight: 400;
                width: 100%;
                height: 100%;
                letter-spacing: 0;
                border-left: 1px solid rgba(234,234,234,1);
                padding: 0 .252rem; 
                white-space: nowrap;
                &.opctup1 {
                    color: #DE2121;
                    border-left: 0;
                }
                &.opctup2 {
                    color: #136EF2;
                }
                & .opctup4.xin {
                    width: 0.48rem;
                    height: 0.48rem;
                    background: url(../../../../assets/jy/images/icon_xin.png) no-repeat;
                    background-size: 0.48rem 0.48rem;
                    margin: auto;
                    margin-top: -0.03rem;
                    i {
                        display: block;
                        width: .4rem;
                        height: .4rem;
                        float: left;
                    }
                }
                &.op1 {
                    border-left: 0;
                }
                &.opctup8, &.opctup9 {
                    border-left: 0;
                }
            }
        }
        .next_icon {
            display: block;
            width: 0.6rem;
            height: 100%;
            border: 0;
            margin: 0 !important;
            padding: 0 !important;
            i {
                display: block;
                background: url(../../../../assets/jy/images/icon_right.png);
                width: 0.6rem;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
        .prev_icon {
            display: block;
            width: 0.6rem;
            height: 100%;
            border: 0;
            margin: 0 !important;
            padding: 0 !important;
            i {
                display: block;
                background: url(../../../../assets/jy/images/icon_left.png);
                width: 0.6rem;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
        
    }
    .expand-transition {
        transition: all .1s ease;
        height: 3.04rem; 
        opacity: 1;
    }
    .expand-enter, .expand-leave {
        height: 0;
        opacity: 0;
    }
    .slh-expand-transition {
        transition: all .1s ease;
        height: 3.24rem; 
        opacity: 1;
    }
    .slh-expand-enter, .slh-expand-leave {
        height: 0;
        opacity: 0;
    }
    .ggt-expand-transition {
        transition: all .1s ease;
        height: 2.54rem; 
        opacity: 1;
    }
    
    .ggt-expand-enter, .ggt-expand-leave {
        height: 0;
        opacity: 0;
    }
    .slh-ggt-expand-transition {
        transition: all .1s ease;
        height: 2.74rem; 
        opacity: 1;
    }
    .slh-ggt-expand-enter, .slh-ggt-expand-leave {
        height: 0;
        opacity: 0;
    }

    .slh .opctup .j_operate1 .xgcbj_b {
        width: 25%!important;
    }
    .slh .j_operate1 .xgcbj_b  .xgcbj{
        width: 100%;
    }

    .slh .xgcbj_right_content{
        position: relative;
    }
    .slh .xgcbj_right_content .xcbj_input{
        position:absolute;
        top: 0;
    }
    .slh {
        .opctup .j_operate li > div {
            padding: 0 .186rem;
        }
        .opctup .j_operate li:first-child > div {
            padding-left: .2rem;
        }
        .opctup .j_operate li:last-child > div {
            padding-right: .2rem;
        }
    }
    .slh .table .top-layer{
        .left-column{
            width: 25%;          
        }

        .right-container{
            width: 75%;  
        }

        .table-list .cc-piece1 {
            color: #222222;
            font-family: PingFangSC-Medium;
            padding-right: .3rem;
            flex-shrink: 0;
            p{
                font-family: CITIC-Numbers-Medium;
                font-size: .28rem;
                text-align: right;
                font-weight: 500;
            }
            &:first-child{
                width: 25vw;
            }
            &:nth-child(2){
                width: 25vw;
            }
            &:nth-child(3){
                width: 25vw;
            }
            &:nth-child(4){
                width: 25vw;
            }
            &:last-child{
                width: 25vw;
                padding-right: .3rem;
            }
        }

        .table-list.ggt .cc-piece1{
            &:nth-child(4){
                width: 25vw;
            }
            &:nth-child(5){
                width: 25vw;
            }
        }
    }

    .slh .table .bottom-layer {
        .opctup {
            .details > div {
                &:last-child{
                    padding: .12rem 0 0 .36rem;
                }
            }
        }
    }
    
    @media screen and (max-width:360px) {
        .slh {
            .opctup .j_operate li > div {
                padding: 0 .14rem;
            }
            .opctup .j_operate li:first-child > div {
                padding-left: .2rem;
            }
            .opctup .j_operate li:last-child > div {
                padding-right: .2rem;
            }
        }
    }
</style>

<style lang="less">

    #app::-webkit-scrollbar {
        display: none;
    }
    #keepprice_dialog {
        background-color: #FFFFFF;
        border-radius: .32rem;
        width: 90%;
        top: 3.5rem;
        overflow: hidden; 
        .dialog_header {
            height: .96rem;
            font-family: PingFangSC-Medium;
            font-size: .44rem;
            color: #222222;
            letter-spacing: 0;
            text-align: center;
            font-weight: 500;
            border: 0;
            padding: .5rem 0 .4rem;
        }
        .dialog_body {
            line-height: .44rem;
            font-size: .28rem;
            padding: .3rem 10% .1rem;
            .pupup {
                display: -webkit-flex;
                display: flex;
                font-size: .26rem !important;
                align-items: center;
                .xgcbj_left_title {
                    height: .68rem;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #777777;
                    letter-spacing: 0;
                    line-height: .68rem;
                    font-weight: 400;
                }
                > div:last-of-type {
                    -webkit-flex: 1;
                    flex: 1;
                }
                .xgcbj_right_content {
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #222222;
                    letter-spacing: 0;
                    line-height: .68rem;
                    font-weight: 400;
                }
                .xcbj_div {
                    position: relative;
                    width: 90%;
                    border: 2px solid #E5E5E5;
                    border-radius: .16rem;
                    .xcbj_input {
                        position: absolute;
                        top: 50%;
                        width: 70%;
                        outline: none;
                        -webkit-appearance: none;
                        border-radius: 0;
                        border: 0;
                        margin: 0 0.1rem;
                        height: 90%;
                        transform: translateY(-50%);
                        -webkit-transform: translateY(-50%);
                    }
                    .xgcbj_input_reset {
                        position: absolute;
                        top: 50%;
                        height: .4rem;
                        right: .1rem;
                        transform: translateY(-50%);
                        -webkit-transform: translateY(-50%);
                    }
                }
            }
            .txl {
                text-align: left;
            }
            .alert-tip {
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                color: #777777;
                letter-spacing: 0;
                line-height: .6rem;
                font-weight: 400;
                padding: .16rem 0;
            }
        }
        .dialog_footer {
            border-top: 1px solid #E5E5E5;
            padding: 0;
            display: -webkit-flex;
            display: flex;
            text-align: center;
            font-size: 0;
            -webkit-text-size-adjust: none;
            .dialog_confirm_button {
                display: inline-block;
                font-size: .3rem;
                width: 50%;
                border-right: 1px solid rgb(229, 229, 229);
                padding: .3rem 0px;
                font-family: PingFangSC-Regular;
                color: rgb(215, 0, 10);
                letter-spacing: 0px;
                text-align: center;
                font-weight: 400;
                background: initial;
                line-height: initial;
                height: initial;
                margin: 0;
            }
            .dialog_cancel_button {
                display: inline-block;
                font-size: .3rem;
                width: 50%;
                padding: .3rem 0px;
                font-family: PingFangSC-Regular;
                color: rgb(68, 68, 68);
                letter-spacing: 0px;
                text-align: center;
                font-weight: 400;
                background: initial;
                line-height: initial;
                height: initial;
                margin: 0;
            }
        }
    } 

    #sbtrade_dialog {
        width: 60%;
        border-radius: .06rem;
        overflow: visible;
        .list {
            padding: 0 .4rem;
            span {
                display: block;
                font-size: .28rem;
                height: .8rem;
                line-height: .8rem;
                border-bottom: 1px solid #ccc;
                text-align: center;
                color: #222222;
                &:last-child {
                    border: none;
                }
            }
        }
        .qx {
            position: absolute;
            right: -0.18rem;
            top: -0.18rem;
            display: inline-block;
            width: .6rem;
            height: .6rem;
            border-radius: .3rem;
            background: #ccc;
            font-size: 0;
            z-index: 102;
            -webkit-transform: translateZ(102px);
            transform: translateZ(102px);
            .shu, .heng {
                display: inline-block;
                width: 100%;
                height: 1px;
                background: #F45E5E;
                position: relative;
                top: .3rem;
                left: 0;
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
            }
            .heng {
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
                top: .26rem;
                left: 0;
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

    .modal{
        width: 100%;
        position: fixed;
        margin: 0!important;
        left: 50%;
        transform: translate3d(-50%, -50%, 0)!important;
        -webkit-transform: translate3d(-50%, -50%, 0)!important;
        pointer-events: none;
        &.modal-in{
            transform: translate3d(-50%, -50%, 0)!important;
            -webkit-transform: translate3d(-50%, -50%, 0)!important;
        }
        &.modal-out{
            transform: translate3d(-50%, -50%, 0)!important;
            -webkit-transform: translate3d(-50%, -50%, 0)!important;
        }
        .preloader {
            width: 0.68rem;
            height: 0.68rem;
        }
    } 

    .chicang-toast {
        font-family: PingFangSC-Regular;
        background: rgba(0, 0, 0, 0.85);
        border-radius: .1rem;
        color: white;
        padding: 0.24rem 0.48rem;
        height: auto;
        line-height: 1.5; 
        font-size: 0.3rem;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
        width: 72%!important;
    }

    .swipe {
        .swipe-items-wrap {
            > div {
                padding-bottom: 0.2rem!important;
            }
        }
        .swipe-indicators {
            bottom: 0.32rem!important;
            line-height: 0.2rem!important;
            .swipe-indicator {
                width: 0.08rem!important;
                height: 0.08rem!important;
                margin: 0 3px;
            }
            .swipe-indicator.active {
                width: 0.16rem!important;
                border-radius: 0.08rem!important;
            }
        }
    }

</style>

