<template>
<div class="slhdrwtNew">
    <div class="tabs  border-bottom-ee">
        <div class="dr_wrap_one" :class="{active:tabIndex=='putong'}" tabval='putong' @click="weituoTabChange('putong')">
            普通委托
            <!-- <span></span> -->
        </div>
        <div class="dr_wrap_two" :class="{active:tabIndex=='panhou'}" tabval='panhou' @click="weituoTabChange('panhou')">
           盘后定价委托
        </div>
    </div>
    <div class="weituoClas cont j_chicanglist  m-content-3">
        <div class="clear oneli" v-for="(index,grid) in grids" track-by="wtbh">
            <div>
                <div class="border-bottom-ee drwtTitle">
                    <span :class="grid.mmfxclass" class="slh_drwt_fangxiang">{{grid.mmfx}}</span>
                    <!-- <span  :class="grid.gpmc.length>6 && grid.wtzt.length>3 ? ' ' : 'sjxcmc mingcheng'" >{{grid.gpmc}}</span> -->
                      <span  :class="grid.gpmc.length>6?grid.wtzt.length>3?'sjxcmc sjxcmc1 mingcheng small-zoom':'sjxcmc mingcheng small-zoom':'sjxcmc mingcheng'">{{grid.gpmc}}</span>
                     <!-- <span  :class="grid.gpmc.length>6?'sjxcmc mingcheng small-zoom':'sjxcmc mingcheng'">{{grid.gpmc}}</span> -->
                     <span :class="grid.gpmc.length>6 ? 'daima small-zoom' : 'daima'">{{grid.gpdm}}</span>
                   <!-- <span class="daima">{{grid.gpdm}}</span> -->
                    <span :class="grid.kcd=='0'? 'op_chedan_gray' : 'op_chedan'" @click="chedangweitou(index)">撤单</span>
                    <span class="zhuangtai_opleft">{{grid.wtzt}}</span>
                </div>
                <div class="drwtMain" @click="chedangxiangqing(index)">
                    <div class="feidan-yuanyin-container" v-if="grid.fdyy != ''">
                        <table class="feidan-yuanyin-table">
                            <tr>
                                <td class="feidan-yuanyin-title">废单原因：</td>
                                <td class="feidan-yuanyin-text">{{grid.fdyy}}</td>
                            </tr>
                        </table>
                    </div>
                    <ul>
                        <li>
                            <span >委托价格：</span>
                            <span class="price_black">{{grid.wtjg}}</span>
                        </li>
                        <li>
                            <span class="weituoshuliang">委托数量：</span>
                            <span class="price_black">{{grid.wtsl}}</span>
                        </li>
                        <li>
                            <span>成交价格：</span>
                            <span class="price_black">{{grid.cjjg}}</span>
                        </li>
                        <li>
                            <span class="weituoshuliang">成交数量：</span>
                            <span class="price_black">{{grid.cjsl}}</span>
                        </li>
                        <li>
                            <span>委托时间：</span>
                            <span class="price_black">{{grid.wtsj}}</span>
                        </li>
                        <li>
                            <span class="weituoshuliang">委托属性：</span>
                            <span :class="grid.wtsxclass" class="price_black">{{grid.wtsx}}</span>
                        </li>
                    </ul>
                    <p v-if="grid.WTACCOUNTTYPEINDEX=='SHBACCOUNT' && grid.STOCKTYPEINDEX=='h'" style="font-size: 14px;color:#777777;line-height: 20px;font-weight: 400;text-align: justify;padding-right:15px;margin-top:70px">注意：上海B转H业务的委托价格、成交价格、成交金额等货币单位均为港币</p>
                </div>
            </div>
        </div>
        <div v-if="grids.length<1 || sendError" class="noData">
            <img src="/newjy/ptjy/images/icon-nodata.png" class="noData-img"/>
            {{sendError?'获取数据失败，请手动刷新':tabIndex=='putong'?'暂无普通委托':'暂无盘后委托'}}
        </div>
    </div>
</div>
</template>

<script>
import service_ptjy from '../deal/service/trade/service_ptjy'
import localService from '../../services/localService'
var oTool = require('../hq/scripts/tools');
var putong_cols_index = {
    mmfx: 'BUYDIRECTIONINDEX',
    wtsj: 'REPORTTIME',
    wtbh: 'CONTACTINDEX',
    gpdm: 'STOCKCODEINDEX',
    gpmc: 'STOCKNAMEINDEX',
    wtzt: 'ENTRUSTTYPENAME',
    wtjg: 'ENTRUSTPRICE',
    wtsl: 'AMOUNTINDEX',
    cjjg: 'BUSINESSPRICE',
    cjsl: 'BUSINESSAMOUNT',
    wtsx: 'PRICECODEINDEX',
    kcd: 'DRAWINDEX',
    fdyy: 14,
    gpmc_long: 'STOCKNAMELONGIDXINDEX',
    WTACCOUNTTYPEINDEX:  'WTACCOUNTTYPEINDEX',
    STOCKTYPEINDEX:  'STOCKTYPEINDEX',
    weituoshuxing:  'PRICETYPEINDEX',
};
var panhou_cols_index = {
    mmfx: 'BUYDIRECTIONINDEX',
    wtsj: 'ORDERTIMEINDEX',
    wtbh: 'CONTACTINDEX',
    gpdm: 'STOCKCODEINDEX',
    gpmc: 'STOCKNAMEINDEX',
    wtzt: 'ENTRUSTTYPENAMEINDEX',
    wtjg: 'PROPRICEINDEX',
    wtsl: 'PROAMOUNTINDEX',
    cjjg: 'MATCHPRICEINDEX',
    cjsl: 'MATCHQTYINDEX',
    wtsx: 'BUSINESSNAMEINDEX',
    kcd: 'DRAWINDEX',
    fdyy: 'CANCELINFOINDEX',
    gpmc_long: 'STOCKNAMELONGIDXINDEX',
    STOCKTYPEINDEX:  'STOCKTYPEINDEX'
}
export default {
    data(){
        return{
            tabIndex: 'putong',
            grids: [],
            iTitles: {},
            iArr:[],
            listNamber: 0,
            pagecount:101,
            REREQ: false,
            loadtype: this.pagecount-1,
            dangqianweituobianhao:'',
            wtaccount:'',
            weituoshuxing:'',
            zhaiquanleibie:'',
            sendError:false
        }
    },
    created(){
        // this.huQuDangRiWeiTouJiLu();
        // window.GoBackOnLoad = function () {
        //         this.reQuery();
        // }

    },
    mounted(){
        // this.wscroll();
    },
    methods:{
        reSetQueryParam(){
                // this.grids = [];
                this.listNamber = 0;
                this.REREQ = false;
                this.loadtype = this.pagecount;
                this.huQuDangRiWeiTouJiLu();
            },
            reQuery(){
                this.reSetQueryParam();
            },
        wscroll(){
                var _this = this;
                $('.m-content-3').off().scroll(function () {
                    if (_this.REREQ == true) {
                        return;
                    }
                    var viewH = $(this).height(),//可见高度
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
                this.loadtype = this.pagecount - 1;
                if(this.grids.length >= this.loadtype){
                this.listNamber += this.loadtype;
                    this.huQuDangRiWeiTouJiLu();
                }
                
                
            },
        weituoTabChange(index) {
                if(this.tabIndex!=index){
                    this.tabIndex = index;
                    $('.weituoClas')[0].scrollTop = 0;
                    window.sessionStorage.setItem('WEITUOCLAS1',0);
                    var pagetype = this.$route.query.type || '0';
                    var maidianName = pagetype=='0'?this.tabIndex == 'putong'?'jy_ptmy_drwt_clk':'jy_ptmy_drwtph_clk':this.tabIndex == 'putong'?'jy_ptmc_drwt_clk':'jy_ptmc_drwtph_clk';
                    maidian.reportEvent(maidianName, {
                        'appkey': 'aa347fba81312f23',
                        'xwhat': 'resource_click',
                        'title': pagetype=='0'?'普通买入页面':'普通卖出页面',
                        'resource_name':this.tabIndex == 'putong'?'当日委托':'当日委托盘后'
                    });
                    this.grids = [];
                    this.reQuery();
                }
        },
        huQuDangRiWeiTouJiLu() {
                var _this = this;
                var oSend = {
                    StartPos: _this.listNamber==0?_this.listNamber:_this.listNamber+1,
                    //最大条数
                    MaxCount: _this.pagecount - 1,
                };
                $.showPreloader();
                var activeIndex = _this.tabIndex;
                var sAction = activeIndex === 'putong' ? '113' : '6422';
                var cols_index = activeIndex === 'putong' ? putong_cols_index : panhou_cols_index;
                service_ptjy['require'+sAction](oSend).then((oData)=>{
                    $.hidePreloader();
                    $('.modal').remove();
                    if(oData.ERRORNO < 0){
                        _this.grids = [];
                        _this.sendError = true;
                        return;
                    }
                    if (oData.GRID0 && oData.GRID0.length > 0) {
                        oData.HIDESEGMENTINDEX = oData.GRID0[0].split('|').length;
                    }
                    if (sAction == '113') {
                        if (oData.GRID0 && oData.GRID0.length > 1) {
                            for (var n = 1; n < oData.GRID0.length; n++) {
                                var arr = oData.GRID0[n].split('|');
                                 oData.HIDESEGMENTINDEX = arr.length;
                                if (arr[13] == '三板' ) {
                                    arr[13] = '';
                                    oData.GRID0[n] = arr.join('|');
                                }
                            }
                        }
                    }
                    if (_this.listNamber === 0) {
                        _this.iTitles = oData.GRID0[0];
                        if(sAction == '113'){
                            var iTitles = _this.iTitles.split('|');
                            var iTitlesArr = iTitles.splice(oData.ORDERDATEINDEX,1);
                            var iTitlesArr2 = iTitles.splice(5,0,iTitlesArr[0]);
                            _this.iTitles = iTitles.join('|');
                        }
                        _this.iArr = [];
                        oData.GRID0.shift();
                    }
                    if (!oData.GRID0 || oData.GRID0.length == 0) {
                        _this.REREQ = true;
                        return;
                    }
                    _this.REREQ = false;
                    _this.sendError = false;
                    if(_this.listNamber == 0 && oData.GRID0){
                        var ZZPINDEX = oData.ZZPINDEX || '',
                            // DATEFORMINDEX = oData.DATEFORMINDEX || '',
                            LASTRATEINDEX = oData.LASTRATEINDEX || '',
                            CALLRATEINDEX = oData.CALLRATEINDEX || '',
                            // hidesegment = sAction == '113'?'16':oData.HIDESEGMENTINDEX?oData.HIDESEGMENTINDEX:'';
                            hidesegment = oData.HIDESEGMENTINDEX || '';
                            var DATEFORMINDEX;
                            if(sAction == '113'){
                                if(oData.DATEFORMINDEX){
                                    var dateIndex = oData.DATEFORMINDEX.split(',');
                                    dateIndex.pop();
                                    var dateIndexItem = [];
                                    dateIndex.forEach(i=>{
                                        dateIndexItem.push(i.split('|'))
                                    })
                                    dateIndexItem[0][0]='5';
                                    dateIndexItem[1][0]='6';
                                    var dateIndexItem1 = [];
                                    dateIndexItem.forEach(j=>{
                                        dateIndexItem1.push(j.join('|'));
                                    })
                                    DATEFORMINDEX = dateIndexItem1.join(',');
                                }else{
                                    DATEFORMINDEX = '';
                                }
                            }else{
                               DATEFORMINDEX = oData.DATEFORMINDEX || '';
                            }
                        try{
                            localService.saveMapMesg({HIDESEGMENTINDEX:hidesegment,ZZPINDEX:ZZPINDEX,DATEFORMINDEX:DATEFORMINDEX,CALLRATEINDEX:CALLRATEINDEX,LASTRATEINDEX:LASTRATEINDEX});
                        }catch (e){
                    
                        }
                    }

                    var grid = [];
                    for(var i=0; i<oData.GRID0.length; i++){
                        var val = oData.GRID0[i];
                        var list = val.split('|');
                        var _fdyy_index_num = parseInt(cols_index.fdyy) || -1;
                        var _fdyy_index = oData[cols_index.fdyy];
                        if(_fdyy_index_num > -1) {
                            _fdyy_index = _fdyy_index_num;
                        }
                        var obj = {
                            mmfx: list[oData[cols_index.mmfx]],
                            wtsj: oTool.shijiangeshihua(list[oData[cols_index.wtsj]]),
                            wtbh: list[oData[cols_index.wtbh]],
                            gpdm: list[oData[cols_index.gpdm]],
                            gpmc: list[oData[cols_index.gpmc]],
                            gpmc_long: list[oData[cols_index.gpmc_long]],
                            wtzt: list[oData[cols_index.wtzt]],
                            wtjg: oTool.baoliuxiaoshu4(list[oData[cols_index.wtjg]]),
                            wtsl: list[oData[cols_index.wtsl]],
                            cjjg: oTool.baoliuxiaoshu4(list[oData[cols_index.cjjg]]),
                            cjsl: list[oData[cols_index.cjsl]],
                            wtsx: list[oData[cols_index.wtsx]],
                            kcd: list[oData[cols_index.kcd]],
                            fdyy: '',
                            mmfxclass: 'fangxiang',
                            WTACCOUNTTYPEINDEX: list[oData[cols_index.WTACCOUNTTYPEINDEX]],
                            STOCKTYPEINDEX: list[oData[cols_index.STOCKTYPEINDEX]],
                            weituoshuxing:  list[oData[cols_index.weituoshuxing]]
                        };
                        // ---股票名称扩位 LMQ s---
                        // var kuowei = _this.kuoweipanduanObj(obj.STOCKTYPEINDEX);
                        // if((kuowei && kuowei == 'yes') && obj.gpmc_long && obj.gpmc_long.replace(/\s+/g,"").length>0) {
                        //     // val = val.replace('|'+obj.gpmc+'|','|'+obj.gpmc_long+'|');
                        //     obj.gpmc = obj.gpmc_long;
                        //     }
                        // // ---股票名称扩位 LMQ e---
                        if(sAction == '113'){
                                var valArr = val.split('|');
                                var varrArr1 = valArr.splice(oData.ORDERDATEINDEX,1);
                                valArr.splice(5,0,varrArr1[0]);
                                val = valArr.join('|');
                        }
                        if(obj.gpmc_long && obj.gpmc_long.replace(/\s+/g,"").length>0) {
                            val = val.replace('|'+obj.gpmc+'|','|'+obj.gpmc_long+'|');
                            obj.gpmc = obj.gpmc_long;
                        }
                        obj.mmfxclass = obj.mmfx.indexOf('买入') > -1 ? 'fangxiang' : 'maichu';
                        obj.wtsx = obj.wtsx == '=' ? '融资行权卖券还款' : obj.wtsx;
                        obj.wtsxclass = (obj.wtsx && obj.wtsx.length && obj.wtsx.length>5) ? 'wtsxlong' : 'wtsxnormal';
                        if(obj.wtzt=='废单'){
                            var fendanstr = list[_fdyy_index];
                            if(fendanstr){
                                var start_index = fendanstr.indexOf('][');
                                var end_index = fendanstr.lastIndexOf(']');
                                if(start_index>0 && end_index-start_index>2){
                                    fendanstr=fendanstr.substring(start_index+2,end_index);
                                }
                                if(fendanstr && fendanstr=='产品状态资源访问授权不足'){
                                    fendanstr = '产品可能处于临时停牌、连续停牌状态或被交易所限制交易';
                                }
                            }
                            obj.fdyy = fendanstr;
                        }
                        grid.push(obj);
                        _this.iArr.push(val);
                    }
                    
                    var gridArr = JSON.parse(JSON.stringify(grid))
                    if(oSend.StartPos>=_this.pagecount){
                        _this.grids = _this.grids.concat(gridArr);
                    }else{
                        _this.grids = gridArr;
                    }
                    _this.$nextTick(function(){
                        var weituoScroll =  window.sessionStorage.getItem('WEITUOCLAS1');
                            if(weituoScroll&&weituoScroll!=''&&weituoScroll!=null){
                                $('.weituoClas')[0].scrollTop = weituoScroll;
                            }else{
                                $('.weituoClas')[0].scrollTop = 0;
                            }
                        // if(oSend.StartPos != _this.pagecount){
                        //     var weituoScroll =  window.sessionStorage.getItem('WEITUOCLAS1');
                        //     console.log('weituoScroll',weituoScroll)
                        //     if(weituoScroll&&weituoScroll!=''&&weituoScroll!=null){
                        //         $('.weituoClas')[0].scrollTop = weituoScroll;
                        //     }else{
                        //         $('.weituoClas')[0].scrollTop = 0;
                        //     }
                        // }else{
                        //     $('.weituoClas')[0].scrollTop = 0;
                        //     window.sessionStorage.setItem('WEITUOCLAS1',0)
                        // }
                    })
                }).catch(err=>{
                    // $.hidePreloader();
                    // $('.modal').remove();
                    // _this.grids = [];
                    // _this.sendError = true;
                })
                
        },
        chedangxiangqing(index) {
            var oSave = {
                field: this.iTitles,
                Arr: this.iArr
            };
            localService.saveMapMesg({ C_DETAIL: JSON.stringify(oSave)});
            if(this.tabIndex == 'putong'){
                this.$TZT.action10061({
                        type:'weituo',
                        url:'/newjy/qinfoNew.html?num=' + index
                    }, this);
            }else{
                 this.$TZT.action10061({
                        type:'weituo',
                        url:'/newjy/qinfo.html?num=' + index
                    }, this);
            }
           
        },
        chedangweitou(index){
            var pagetype = this.$route.query.type || '0';
            var maidianName = pagetype=='0'?'jy_ptmy_drwtcd_clk':'jy_ptmc_drwtcd_clk';
            maidian.reportEvent(maidianName, {
                'appkey': 'aa347fba81312f23',
                'xwhat': 'resource_click',
                'title': pagetype=='0'?'普通买入页面':'普通卖出页面',
                'resource_name':'当日委托撤单'
            });
            var _this = this;
            var list = _this.grids[index];
            var _keche = list.kcd;
            _this.dangqianweituobianhao = list.wtbh;
            _this.wtaccount = list.WTACCOUNTTYPEINDEX;
            _this.zhaiquanleibie = list.STOCKTYPEINDEX;
            _this.weituoshuxing = list.weituoshuxing;
            var json = { 
                style: 3.1, 
                title: "委托撤单确认",
                closeBtn: false, 
                content: "您是否确认以上撤单？", 
                itemBeans: [
                    { itemStr: list.mmfx, itemTitle: "操作" }, 
                    { itemStr: list.gpdm, itemTitle: "代码" }, 
                    { itemStr: list.gpmc, itemTitle: "名称" },
                    { itemStr: list.wtjg, itemTitle: "价格" },
                    { itemStr: list.wtsl, itemTitle: "数量" }
                ], 
                primaryButtonStr: "确认", 
                secondaryButtonStr: "取消" 
            }
            CiticsNative.NativeCall('alertCSDialog', JSON.stringify(json), function (oData) {
                // var oData = JSON.parse(oData)
                var result = JSON.parse(oData.result);
                        if(result.buttonKey == 'primaryButton'){
                            var oSend = {
                                CONTACTID: list.wtbh
                            };
                            var activeIndex = _this.tabIndex;
                            var sAction =''
                            if(_this.wtaccount=='SBACCOUNT' && (_this.weituoshuxing=='7' || _this.weituoshuxing=='8') && _this.zhaiquanleibie=='y'){
                                sAction='5067'
                            }else{
                                sAction = activeIndex === 'putong' ? '111' : '6426';
                            }
                            service_ptjy['require'+sAction](oSend).then((data)=>{
                                var json1 = { 
                                    style: 1.1, 
                                    title: data.ERRORNO>='0'?'委托撤单确认':"温馨提示",
                                    closeBtn: false, 
                                    content: data.ERRORNO>='0'?'撤单申请已提交，撤单是否成功请以委托查询结果为准。':data.ERRORMESSAGE, 
                                    primaryButtonStr: "确定"
                                }
                                
                                CiticsNative.NativeCall('alertCSDialog',JSON.stringify(json1),function(oData){
                                    console.log('oData',oData)
                                    if(data.ERRORNO>='0'){
                                    CiticsNative.NativeCall('reFreshCanBuyAndSellDataByWeb',[]);
                                }
                                    _this.reQuery();
                                })
                            })
                        }
            });
        },
        // 扩位需求
        kuoweipanduanObj(stockType){
                var kuoweiStockType_list = ['1','2','6','A','B','J','K','L','M','N','O','T','V','i','j','k','l','r','g','e'];
                    for (var v = 0; v < kuoweiStockType_list.length; v++) {
                        if (kuoweiStockType_list[v] == stockType) {
                            return 'yes';
                        }
                    }   
        }

    },
    events: {
            initDrwt() {
                if (this.listNamber >= "100") {
                window.sessionStorage.setItem("WEITUOCLAS1", 0);
                }
                this.reQuery();
                this.wscroll();
            }
        }
}
</script>

<style lang="less" scoped>
    @import '../../assets/less/variables.less';
    @import "../../assets/less/mixins.less";
/* tab点击栏 */
.tabs {
    position: relative;
    width: 100%;
    // height:2.16rem;
    // line-height: 2.16rem;
    // font-size:0.72rem;
      height:0.9rem;
    line-height: 0.9rem;
    font-size:0.24rem;
    color: #777777;
    // font-weight: bold;
    font-weight: 500;
    text-align: center;
    // margin-top: 15px;
    border-bottom: 1px solid #F3F3F3;
    display: flex;
    align-items: center;
    justify-content: center;
}
.tabs > div {
    position: relative;
    float: left;
    // width:4.94rem;
    // height:1.34rem;
    // line-height:1.34rem;
    width:2.06rem;
    // height:0.56rem;
    // line-height:0.56rem;
    height:28px;
    line-height:27px;
    font-size:12px;
    border: 0.02rem solid rgba(231,231,231,1);
    // font-size:0.57rem;
    font-weight:400;
    color: #777777;
}
.slh .slhdrwtNew .tabs>div {
    line-height: 22px !important;
}
.tabs > div > span {
    display:none;
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 0.096rem;
    width: 0.96rem;
    background: #333333;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
.tabs > div.active {
    color: #DE2121;
    // background:rgba(249,208,208,0.5);
        background: #FFF4F4;
    border: 0.02rem solid #F9D0D0 !important;
}
// .tabs > div.active span {
//     display: block;
// }
.zhuangtai_opleft{ 
    float:right;
    // font-size:0.57rem;
    font-size:0.24rem;
    color:#919191;
    // margin-top:2px;
    font-weight: 400;
}
.op_chedan{
    display:inline-block;
    float:right;
    margin:1px 0 0 8px;
    // width: 1.92rem;
    // height:0.96rem;
    // line-height:0.96rem;
    width:0.8rem;
    height:0.4rem;
    line-height:0.4rem;
    text-align:center;
    // font-size:0.57rem;
    font-size:0.24rem;
    color:#FFFFFF;
    background:#FF7007;
    box-sizing: border-box;
    border: 1px solid transparent;
    font-weight:400;
    margin-top:0.22rem;
}
.op_chedan_gray{
    display:inline-block;
    float:right;
    margin:1px 0 0 8px;
    width:0.8rem;
    height:0.4rem;
    line-height:0.4rem;
    text-align:center;
    font-size:0.24rem;
    color:#FFFFFF;
    background:#BBBBBB;
    box-sizing: border-box;
    font-weight:400;
    border: 1px solid transparent;
    margin-top:0.22rem;
}
.fenge_border {
    border-bottom: 12px solid #F3F3F3 !important;
    height: 56px !important;
}
.m-content-3 {
    // overflow-y:scroll;
    overflow: scroll;
    // height:100%;
    position: absolute;
    // top:2.16rem;
    top:0.9rem;
    bottom: 0;
    left: 0;
    right: 0;
    -webkit-overflow-scrolling: touch;
}
// .cont .oneli{
//     border-bottom: 1px solid #e3e3e3;
//     padding: 10px 0px;
//     // background: #fff;
//     color: #484848;
// }
.j_chicanglist .oneli{
    font-size: 0;
    height: auto;
    padding: 0;
    border: none;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F3F3;
}
.j_chicanglist .oneli div,.infonav div{
	display: block;
	float: left;
	width: 25%;
	text-align: center;
	font-size: 14px;
}

.j_chicanglist .oneli div, .infonav div{
    width:100%;
    display: block;
}
.j_chicanglist .oneli div.drwtTitle{
    text-align:left;
    // margin: 0 15px;
    // width: 92%;
    padding:0 12px;
    // height:1.68rem;
    // line-height:1.68rem;
    height:0.8rem;
    line-height:0.8rem;
    border-bottom: 1px solid #F3F3F3;
}
.j_chicanglist .oneli div.drwtTitle span{ 
    vertical-align: middle;
    display: inline-block;
    margin-right: 2px;
}
.j_chicanglist .oneli div.drwtTitle span.zhuangtai{ 
    margin-right:0px;
}
.fangxiang{ 
    display:inline-block;
    vertical-align: text-bottom;
    // width: 1.34rem;
    // line-height: 0.66rem;
    // height: 0.67rem;
    width:0.56rem;
    line-height: 0.28rem;
    height: 0.28rem;
    text-align:center;
    font-size:0.24rem;
    color: #fff;
    background: #FF4343;
    box-sizing: border-box;
    border: 1px solid transparent;
    font-family: PingFangSC-Regular;
    // font-size:0.57rem;
    font-weight: 400;
}
.maichu{
    display:inline-block;
    vertical-align: 
    text-bottom;
    width:0.56rem;
    line-height: 0.28rem;
    height: 0.28rem;
    text-align:center;
    // font-size: 11px;
    color:#fff;
    background:#136EF2;
    box-sizing: border-box;
    border: 1px solid transparent;
    font-family: PingFangSC-Regular;
    font-size:0.24rem;
    font-weight: 400;
}
.mingcheng{
    color: #222222;
    // font-size:0.67rem;
    font-size:0.28rem;
    font-weight: 400;
    font-family: PingFangSC-Regular;
}
.zhuangtai{ 
    float:right;
    font-size:14px;
    color:#919191
}
.j_chicanglist .oneli div.drwtMain{ 
    padding-left:15px;
    padding-top: 8px;
    // padding-left:0.72rem;
    // font-size:0.57rem;
    font-size:0.24rem;
    color: #777777;
}
.j_chicanglist .oneli div.drwtMain li{ 
        line-height:0.36rem;
    }
.daima{
    color:#919191;
    // font-size:0.62rem;
    font-size:0.26rem;
    font-family: PingFangSC-Regular;
}
.j_chicanglist .oneli div li{
    width:49%;
    display:inline-block;
    text-align: left;
    float:left;
}
.opctup li{ 
    height:32px;
    line-height:26px;
}
.opctup li div.opctup1{
    font-size:15px;
    color: #FF7007;
}
.opctup li div.opctup2{
    font-size:15px;
}

// .weituoshuliang{
//     display: inline-block;
//     width:70px
// }
// .j_chicanglist .oneli div.drwtMain li span:nth-child(1){ 
//     display: inline-block;
//     width:2.88rem;
// }
.price_black{
    color: #222222;
}
.j_chicanglist .oneli div li.time{
    width:100%
}
.j_chicanglist .oneli div, .infonav div{
    display: inline-block;
    float: none;
    vertical-align: middle;
}
.j_chicanglist .wtsxlong{
    display: inline-block;
    font-size:0.22rem;
}
.j_chicanglist .wtsxnormal{
    display: inline-block;
    // font-size: 0.57rem;
    font-size: 0.24rem;
}
.small-zoom {
  font-size:0.24rem;
}
.dr_wrap_one{
    border-radius: 4px 0px 0px 4px;
    border-right:0 !important
}
.dr_wrap_two{
    border-radius: 0px 4px 4px 0px;
    border-left:0 !important
}
.noData{
    padding-top:1.5rem;
    text-align: center;
    font-size: 0.28rem;
    color:#777777;
    // line-height:1rem;
}
.noData-img{
    display: block;
    margin: auto;
    height: 1.78rem;
    width:2.3rem;
}
// .sjxcmc{
//     max-width:2.5rem;
//     line-height:1.1;
//     // overflow: hidden;
//     // text-overflow: ellipsis;
//     // white-space: nowrap;
// }
.sjxcmc{
    max-width:3rem;
    // line-height:1.1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.sjxcmc1{
    max-width:2.5rem;
}
.feidan-yuanyin-title{
    width:1.25rem;
    vertical-align: top !important;
    color: #777777 !important;
    // font-size:0.57rem;
    font-size:0.24rem;
}
.feidan-yuanyin-text{
    vertical-align: top !important;
    color: #FF7007 !important;
    // font-size:0.57rem;
    font-size:0.24rem;
    padding-right: 10px
}
.feidan-yuanyin-container{
    text-align: left !important;
}
</style>