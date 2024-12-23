<template>
<div style="position:relative;background:#FFFFFF;">
    <div v-show="sendError || noData" class="noData">
        <img src="../../assets/jy/images/icon-nodata-new.png" class="noData-img"/>
            {{sendError?'获取数据失败，请手动刷新':'暂无持仓'}}
    </div>
    <div v-show='!noData && !sendError' class="native-scroll">
        <div class="classIfication">
            <div class="title" :class="{'fixed': isTitleFixed}" id="chicang-list-title">
                <div class="left-column">
                    <p v-for="(index,titleItem) in textTitleArray.slice(0, 1)" sort-col="{{index}}" v-on:click="changeSort(index)">
                        <span :class="{'bold': imgStatus[index] > 0}">{{titleItem[0]}}</span>
                        <img class="paixu_tubiao" :src="list_sort_img[imgStatus[index]]"  >
                    </p>
                </div>
                <div class="right-container">
                    <div class="right-columns" :class="{'ggt': currAccount == '0_HK'}">
                        <p v-for="(index,titleItem) in textTitleArray.slice(1, textTitleArray.length)" sort-col="{{index+1}}" v-on:click="changeSort(index+1)">
                            <!-- sort-col="{{index}}" v-on:click="changeSort(index,false)" -->
                            <span v-if="titleItem.length>1"><span :class="{'bold': imgStatus[index+1] > 0}">{{titleItem[0]}}</span><span>/{{titleItem[1]}}</span></span>
                            <span v-else :class="{'bold': imgStatus[index+1] > 0}">{{titleItem[0]}}</span>
                            <img class="paixu_tubiao" :src="list_sort_img[imgStatus[index+1]]"  >
                        </p>
                    </div>
                </div>
                
                 <div v-show="isShowMaskPadding" class="mask-padding"></div>
            </div>
            <div class="table-cont infinite-scroll" :class="{'fixed': isTitleFixed}" id="chicanglist_div" v-bind:class="onelist" >
            <!-- <div>持仓持仓</div> -->
                <!--<component :is='templates' :context-path='path' @widget-active='widgetActive'></component>-->
                <component :is="isapp" :switch-status="switchStatus" :sort-arr="accountSort[currAccount]" :eye-status="eyeStatus" :is-new-today-pl-branch="isShowTitleTodayPl" v-ref:chicang></component>
            </div>
        </div>
    </div>
    <refresh-button @refresh="onRefresh()"></refresh-button>
</div>
</template>

<script>
    import Vue from 'vue'
    import RefreshButton from './RefreshButton.vue';
    import util from '../../util/util';
    // import commonData from '../../util/common/commonData.js';
    export default {
        props: ['url', 'switchStatus', 'eyeStatus'],
        data() {
            var app = this.url || this.$route.query.url || 'rzrq/chicang';
            return {
                textTitleArray: (util.getUrlParameter('bztype') || '0') === '0_HK' ? [['市值'],['盈亏'],['持仓','可用'],['成本','市价'],['当日盈亏'],['当日盈亏'],['个股仓位']] : [['市值'],['盈亏'],['持仓','可用'],['成本','市价'],['当日盈亏'],['个股仓位']],
                imgStatus:[],
                path: '',
                app: '',
                onelist: '',
                isapp: app,
                noData: false,
                list_sort_img : {  // 排序用图标
                    '0':'/newjy/ptjy/images/icon-order.png',
                    '1':'/newjy/ptjy/images/icon-des.png',
                    '2':'/newjy/ptjy/images/icon-asc.png'
                },
                list_sort_type : {  // 排序类型
                    '0':'moren',
                    '1':'jiangxu',
                    '2':'shengxu'
                },
                _num_index:'',
                sendError:false,
                accountSort: {},
                currAccount: util.getUrlParameter('bztype') || '0',
                offSetTop: 0,
                isTitleFixed: false,
                isSortListValid: true,
                isShowMaskPadding: true
            }
        },
        watch:{
            currAccount(val){
                this.textTitleArray = val === '0_HK' ? [['市值'],['盈亏'],['持仓','可用'],['成本','市价'],['当日盈亏'],['当日盈亏'],['个股仓位']] : [['市值'],['盈亏'],['持仓','可用'],['成本','市价'],['当日盈亏'],['个股仓位']];
            }
        },
        created() {
            var that = this;
            that.onelist = '';
            var sUrl = that.isapp;
            Vue.component(that.isapp, function (resolve, reject) {
                require(['./qTemplates/' + sUrl + '.vue'], resolve);
            }); 
        },
        attached() {    
        },
        methods: {
            init(){
                var that = this;
                H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE', 'KHBRANCH', 'FUNDACCOUNT'], function (oLocal) {
                    H5TZT.readFileMesg('stockHoldingSortList' + oLocal.USERCODE, function(data){
                        if(!data){
                            that.accountSort = {
                                '0': ['1', '0', '0', '0', '0', '0'],
                                '0_HK': ['1', '0', '0', '0', '0', '0', '0'],
                                '1': ['1', '0', '0', '0', '0', '0'],
                                '2': ['1', '0', '0', '0', '0', '0']
                            };
                            H5TZT.saveFileMesg(JSON.stringify(that.accountSort), 'stockHoldingSortList' + oLocal.USERCODE, function(){
                                that.imgStatus = that.accountSort[that.currAccount];
                                that.$broadcast('initStockHoldingList');
                            });                               
                            return;
                        }   
                        try{
                            var _data = JSON.parse(decodeURIComponent(data));
                            if(isSortListValid(_data)){
                                that.$set('accountSort', _data);
                                // 灰度外的缓存
                                if(that.accountSort['0'].length < 6){
                                    Object.keys(that.accountSort).forEach((k)=>{
                                        if(k === '0_HK'){
                                            that.accountSort[k].splice(-1, 0, '0');
                                            that.accountSort[k].splice(-1, 0, '0');
                                            return;
                                        }
                                        that.accountSort[k].splice(-1, 0, '0');
                                    });
                                }
                                H5TZT.saveFileMesg(JSON.stringify(that.accountSort), 'stockHoldingSortList' + oLocal.USERCODE, function(){
                                    that.imgStatus = that.accountSort[that.currAccount];
                                    that.$broadcast('initStockHoldingList');
                                }); 
                            }
                            // 非法缓存视作无缓存
                            else{
                                that.isSortListValid = false;
                                that.accountSort = {
                                    '0': ['1', '0', '0', '0', '0', '0'],
                                    '0_HK': ['1', '0', '0', '0', '0', '0', '0'],
                                    '1': ['1', '0', '0', '0', '0', '0'],
                                    '2': ['1', '0', '0', '0', '0', '0']
                                };

                                that.imgStatus = that.accountSort[that.currAccount];
                                that.$broadcast('initStockHoldingList');
                                // commonData.feedBack(oLocal.FUNDACCOUNT, data);   
                            }
                        }
                        // 有任何报错视作无缓存
                        catch(e){
                            that.isSortListValid = false;
                            that.accountSort = {
                                '0': ['1', '0', '0', '0', '0', '0'],
                                '0_HK': ['1', '0', '0', '0', '0', '0', '0'],
                                '1': ['1', '0', '0', '0', '0', '0'],
                                '2': ['1', '0', '0', '0', '0', '0']
                            };

                            that.imgStatus = that.accountSort[that.currAccount];
                            that.$broadcast('initStockHoldingList');    
                            // commonData.feedBack(oLocal.FUNDACCOUNT + ' ' + e, data);                             
                        }
                    }); 
                });  

                function isSortListValid(sortList){
                    try{
                        var sortListKeyArray = Object.keys(sortList);
                        var validKeyArray = ['0', '0_HK', '1', '2'];
                        for(var i=0; i < validKeyArray.length; i++){
                            var k = validKeyArray[i];
                            // 校验key是否存在
                            if(sortListKeyArray.indexOf(k) == -1){
                                return false;
                            }
                            // 校验value数组长度是否正确
                            if(k === '0_HK'){
                                if(sortList[k].length != 5 && sortList[k].length != 7){
                                    return false;
                                }
                            }
                            else{
                                if(sortList[k].length != 5 && sortList[k].length != 6){
                                    return false;
                                }
                            }
                            // 校验value数组值是否有效
                            var validValueArray = ['0', '1', '2'];
                            for(var i=0; i< sortList[k].length; i++){
                                if(validValueArray.indexOf(sortList[k][i]) == -1){
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    catch(e){
                        return false;
                    }
                }
            },
            changeSort(index){
                var that = this;
                var img_status_arr = [];
                var scrollTop = document.getElementById('app').scrollTop;
                that.imgStatus.forEach(function(o, i){
                    if(i == index){
                        img_status_arr.push(that.huoQuXiaGePaiXuTu(that.imgStatus[index])+'');
                        return;
                    }
                    img_status_arr.push('0');
                });  
                that.$set('imgStatus', img_status_arr);
                that.accountSort[that.currAccount] = img_status_arr;
                if(that.isSortListValid){
                    H5TZT.readLocalMesg(['jyloginflag', 'logintype=1', 'USERCODE'], function (oData) {
                        H5TZT.saveFileMesgSync(JSON.stringify(that.accountSort), 'stockHoldingSortList' + oData.USERCODE, function(data){});
                        that.$broadcast('child-changeSort');
                        that.$nextTick(()=>{
                            console.log(scrollTop, that.offSetTop);
                            if(scrollTop > that.offSetTop){
                                document.getElementById('app').scrollTop = that.offSetTop + 1;
                            } 
                        });
                    }); 
                }
                // 非法缓存不写新缓存
                else{
                    that.$broadcast('child-changeSort');
                    that.$nextTick(()=>{
                        console.log(scrollTop, that.offSetTop);
                        if(scrollTop > that.offSetTop){
                            document.getElementById('app').scrollTop = that.offSetTop + 1;
                        } 
                    });
                }
                
            },
            // 获取点击排序图标后应变更为的排序图标信息
            huoQuXiaGePaiXuTu(num){
                var next_num = 0;
                try{
                    next_num = parseInt(num)+1;
                    var next_tubiao = this.list_sort_img[next_num];
                    if(!next_tubiao){
                        next_num = 0;
                    }
                } catch (e) {
                    next_num = 0;
                }
                return next_num;
            },
            onRefresh(){
                this.$broadcast('onRefresh');
            }       
        },
        events: {
            'headtitle': function (obj, currAccount) {
                var that = this;
                that.currAccount = currAccount;
                if (obj.textTitleArray.length == 1) {
                    this.onelist = 'onelist';
                } else {
                    this.onelist = '';
                }
                var arr = [];
                var img_arr = [];
                var img_status_arr = [];
                for (var i = 0; i < obj.textTitleArray[0].length; i++) {
                    arr.push([obj.textTitleArray[0][i], obj.textTitleArray[1][i]]);
                    img_arr.push(this.list_sort_img['0']);
                    if(i == 0){
                        img_status_arr.push('1');
                        continue;
                    }
                    img_status_arr.push('0');
                }
                // 表头相同不初始化排序
                if(this.textTitleArray.toString() !== arr.toString() || this.gridTitle.toString() !==  obj.gridTitle.toString()){
                    Object.keys(that.accountSort).forEach((k)=>{
                        that.accountSort[k] = img_status_arr;
                    });
                    this.$set('imgStatus', this.accountSort[this.currAccount]);
                }     
                this.$set('textTitleArray', arr);
                this.$set('gridTitle', obj.gridTitle);
            },
            'setNoData': function (isNoData) {
                this.noData = isNoData;
            },
            'sendError': function(sendError){
                this.sendError = sendError;
            },
            'getHoldingData': function(gridData, oData1, oData2, exchangeRateList){
                this.$dispatch('setHoldingData', gridData, oData1, oData2, exchangeRateList);
            },
            'getCurrAccount': function(currAccount){
                this.currAccount = currAccount;
                this.$set('imgStatus', this.accountSort[this.currAccount]);
                this.$broadcast('changeAccount', currAccount);
                console.log(this.imgStatus)
            },
            'onScroll': function(){
                if(!this.offSetTop){
                    this.offSetTop = document.getElementById('chicang-list-container').offsetTop + document.getElementById('chicang-title').clientHeight;
                }
                if(document.getElementById('app').scrollTop >= this.offSetTop){
                    this.isTitleFixed = true;
                }
                else{
                    this.isTitleFixed = false;
                }
            },
            'initTemplate': function(){
                this.init();
            },
            'setShowMaskPadding': function(isShowMaskPadding){
                this.isShowMaskPadding = isShowMaskPadding;
            }
        },
        components:{
            RefreshButton
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/less/variables.less';
    @import "../../assets/less/mixins.less";
    .content {
        -webkit-transform: translateZ(0px);
    }
    .classIfication {
        position: relative;
        height: 100%;

        p, span {
            font-weight: normal;
            text-align: center;
        }

        .title {
            position: relative;
            width: 100%;
            font-size: 0;
            height: .64rem;
            line-height: .64rem;
            // border-bottom: 1px solid #F3F3F3;
            color: #777777;
            background-color: #ffffff;
            white-space:nowrap;
            font-family: PingFangSC-Regular;
            font-size: 0.26rem;
            font-weight: 400;
            text-align: right;
            display: flex;
            flex-direction: row;
            align-items: center;
            .mask-padding{
                position: absolute;
                top: 0;
                right: 0;
                width: .24rem;
                height: 100%;
                background: url("../../assets/jy/images/arrow-right.png");
                background-repeat: no-repeat;
                background-size: 100%;
            }
            .left-column {
                width: 25%;
                p {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    width: 100%;
                    padding-left: .3rem;
                    font-size: 0.24rem;
                    text-align: left;
                    color: #6D7A85;
                    font-family: PingFangSC-Regular;
                    .bold {
                        color: #FD242A;
                    }
                    .paixu_tubiao {
                        margin-left: .12rem;
                    }
                }
            }
            .right-container{
                width: 75%;
                overflow-x: hidden;
                .right-columns{
                    width: fit-content;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    p {
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                        font-size: 0.24rem;
                        text-align: right;
                        padding-right: .3rem;
                        color: #6D7A85;
                        font-family: PingFangSC-Regular;
                        .bold {
                            color: #FD242A;
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
                }
                .right-columns.ggt{
                    p {
                        &:nth-child(4){
                            width: 25vw;
                        }
                        &:nth-child(5){
                            width: 25vw;
                        }
                    }
                }
            }
        }

        .title {
            width: 100%;
            &.fixed{
                position: fixed;
                top: 0;
                left: 0;
                z-index: 99;
                -webkit-transform: translateZ(99px);
                transform: translateZ(99px);
            }
        }

        .table-cont {
            /*height: 100%;*/
            overflow-x: hidden;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;

            .table {
                position: relative;
                .hairline(bottom, @color-split);
            }
            &.fixed {
                padding-top: .68rem;
            }
        }

        .onelist {
            padding-top: 20px;
        }
        .paixu_tubiao {
            width: 0.24rem;
            height: 0.24rem;
            margin-left: .04rem;
            flex-shrink: 0;
        }
    }

    /*没有数据*/
    .noData {
        font-family: PingFangSC-Regular;
        text-align: center;
        padding: .3rem 0;
        color: #9BA4AC;
        font-size: .28rem;
        line-height: .28rem;
    }

    .noData p {
        display: block;
    }

    .noData .block {
        font-size: 0.9rem;
        color: #919191;
    }
    .noData-img{
        display: block;
        margin: 0 auto .08rem;
        height: 2.8rem;
        width: 4.2rem;
    }

    .slh {
        .classIfication {
            .title {
                line-height: .58rem!important;
                .left-column{
                    width: 25%;          
                }

                .right-container{
                    width: 75%;  
                    .right-columns p {
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
                }
                .right-columns.ggt{
                    p {
                        &:nth-child(4){
                            width: 25vw;
                        }
                        &:nth-child(5){
                            width: 25vw;
                        }
                    }
                }
            }
        }
        
    }
</style>
