<template>
    <div class="table" id="chicanglist_content_div">
        
        <div v-for="(gi,item) in gridData" track-by="$index"  class="table-list" @click="listFunc(item)">
            <div class="cc-piece">
                <p :class="item.name.length>6?'spanfont4':''" class="mingcheng">
                    {{geshiValue(item.name,INDEX.STOCKNAMEINDEX,item)}}</p>
                <p class="shizhi">{{geshiValue(item.shiZhi,INDEX.STOCKVALUEINDEX)}}</p>
              </div>
              <div class="cc-piece">
                
                    <p :class="[parseFloat(item.yingKui) > 0? 'rise':parseFloat(item.yingKui) < 0?'fill':'']">{{geshiValue(item.yingKui,INDEX.YKINDEX)}}</p>
                
                <p :class="parseFloat(item.yingKuiLv) > 0? 'rise':parseFloat(item.yingKuiLv)<0?'fill':''">{{item.yingKuiLv}}%</p>
              </div>
              <div class="cc-piece">
                <p>{{geshiValue(item.chiCang,INDEX.STOCKNUMINDEX)}}</p>
                <p>{{geshiValue(item.keYong,INDEX.KYINDEX)}}</p>
              </div>
              <div class="cc-piece">
                <p>{{geshiValue(item.chengBen,INDEX.KEEPPRICEINDEX)}}</p>
                <p>{{geshiValue(item.shiJia,INDEX.LASTPRICEINDEX)}}</p>
              </div>
        </div>
    </div>
</template>

<script>
    import repoconfig from '../../../deal/scripts/repoconfig'
    import GRID from '../../../deal/scripts/GRID'
    import dealUtil from '../../../deal/scripts/dealUtil'
    import service_ptjy from '../../../deal/service/trade/service_ptjy'
    import localService from '../../../../services/localService'
    export default {
        props: ['action', 'viewname'],
        data() {
            return {
                gridData: [],
                originData:[],
                gridTitle: [],
                dateArray: [],
                chiCangChengBenXianShuJu: [],
                shiFouXinGu: [],
                paiXuZhi: [],
                loading: false,
                items: [],
                listNumber: 0,
                YKINDEX: '',
                YKLINDEX: '',
                INDEX: {
                    STOCKCODEINDEX: ''
                },
                textTitleArray: [],
                pagecount:1001,
                loadtype: this.pagecount,
                REREQ:false
            }
        },
        ready() {
//      console.log(1);
        },
        attached() {
            this.gridData = [];
            this.gridTitle = [];
            this.dateArray = [];
            this.chiCangChengBenXianShuJu = [];
            this.loading = false;
            this.items = [];
            this.listNumber = 0;
            this.textTitleArray = [];
            this.INDEX = {
                STOCKCODEINDEX: ''
            };
            this.reQuery();
        },
        methods: {
            geshiValue(name,index,item){
                return dealUtil.formatZZDate(name,index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX);
                // if(this.INDEX.STOCKNAMEINDEX == index){
                //     var kuowei = this.kuoweipanduanObj(item.stockCodeType)
                //   let str1 = null;
                //   if ((kuowei && kuowei == 'yes') && item.stockNamelong && item.stockNamelong.replace(/\s+/g,"").length>0) {
                //     str1 = item ? item.stockNamelong: '';
                //   }else{
                //     str1 = name
                //   }
                //   return dealUtil.formatZZDate(str1,index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX);
                // }else{
                //     return dealUtil.formatZZDate(name,index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX);
                // }
                
                
            },
            init(num) {
                // this.gridData = [];
                this.listNumber = 0;
                this.loading = false;
                this.REREQ = false;
                this.loadtype = this.pagecount;
                this.loadMore(num);
            },
            reQuery(num){
                this.init(num);
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
                maidian.reportEventRandom({baseVal:10000, randomVal: 10},'xtyh_cc_jysy_mmcc');
                var that = this;
                // 如果正在加载，则退出
                if (that.loading) {
                    return;
                }
                that.loading = true;
                $.showPreloader();
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
                        if (data.ERRORNO < 0) {
                            $.hidePreloader();
                            $('.modal').remove();
                            that.$set('gridData', []);
                            that.$dispatch('sendError',true);
                            return;
                        }
                        let oData = GRID.htmltitle(data, that.listNumber);
                        that.YKINDEX = data.YKINDEX;
                        that.YKLINDEX = data.YKLINDEX;
                        // if((!data.GRID0 || data.GRID0.length ==1)){
                        //   this.$dispatch('noDataBlock');
                        //   //return;
                        // }
                        if (that.listNumber === 0) {
                            // data.GRID0 && data.GRID0.shift();
                            that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
                            that.INDEX.YKLINDEX = data.YKLINDEX;
                            that.INDEX.DATEFORMINDEX = data.DATEFORMINDEX;
                            that.INDEX.ZZPINDEX = data.ZZPINDEX;
                            that.INDEX.STOCKNAMEINDEX = data.STOCKNAMEINDEX;
                            that.INDEX.STOCKNAMELONGIDXINDEX = data.STOCKNAMELONGIDXINDEX;
                            that.INDEX.STOCKCODE_TYPEINDEX = data.STOCKCODE_TYPEINDEX;
                            that.INDEX.WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX;
                            that.INDEX.STOCKNUMINDEX=data.STOCKNUMINDEX;
                            that.INDEX.KYINDEX = data.KYINDEX;
                            that.INDEX.KEEPPRICEINDEX = data.KEEPPRICEINDEX;
                            that.INDEX.LASTPRICEINDEX = data.LASTPRICEINDEX;
                            that.INDEX.STOCKVALUEINDEX = data.STOCKVALUEINDEX;
                            that.INDEX.YKINDEX = data.YKINDEX;
                            data.GRID0 && data.GRID0.shift();
                            // that.$set('dateArray', oData.dateArray);
                            var obj = {
                                textTitleArray: oData.dateTitle,
                                gridTitle: oData.textTitle,
                                dateArray: oData.dateArray
                            };
                            that.$dispatch('headtitle', obj);
                            if ((!data.GRID0 || data.GRID0.length == 0)) {
                                $.hidePreloader();
                                $('.modal').remove();
                                that.$dispatch('noDataBlock',true);
                                return;
                            }
                        }
                            if(data.GRID0&&data.GRID0.length>0){
                                that.$dispatch('noDataBlock',false);
                                that.$dispatch('sendError',false);
                                var newData = [];
                                var newDataArr = [];
                                that.chiCangChengBenXianShuJu = [];
                                data.GRID0.forEach(function(i,k){
                                    var chiCangItem = {
                                        name:'',
                                        code:'',
                                        shiZhi: '',
                                        yingKui: '',
                                        yingKuiLv: '',
                                        chiCang: '',
                                        keYong: '',
                                        chengBen: '',
                                        shiJia: '',
                                        wtaccounttype:''
                                    }
                                    var _item = data.GRID0[k];
                                    var _data_arr = _item.split('|');
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
                                    var stockname_long_temp = _data_arr[data.STOCKNAMELONGIDXINDEX];
                                    var stockname_temp = _data_arr[data.STOCKNAMEINDEX];
                                    // chiCangItem.name = stockname_temp;
                                    if(stockname_long_temp && stockname_long_temp.replace(/\s+/g,"").length>0) {
                                        _item = _item.replace('|'+stockname_temp+'|','|'+stockname_long_temp+'|');
                                        data.GRID0[k] = _item;
                                        chiCangItem.name = stockname_long_temp;
                                    } else {
                                        chiCangItem.name = stockname_temp;
                                    };
                                        chiCangItem.code=_data_arr[data.STOCKINDEX || data.STOCKCODEINDEX];
                                        chiCangItem.yingKui=_data_arr[data.YKINDEX];
                                        chiCangItem.yingKuiLv= _data_arr[data.YKLINDEX];
                                        chiCangItem.chiCang= _data_arr[data.STOCKNUMINDEX];
                                        chiCangItem.keYong=_data_arr[data.KYINDEX];
                                        chiCangItem.chengBen=_data_arr[data.KEEPPRICEINDEX];
                                        chiCangItem.shiJia=_data_arr[data.LASTPRICEINDEX];
                                        chiCangItem.shiZhi=_data_arr[data.STOCKVALUEINDEX];
                                        // chiCangItem.WTACCOUNTTYPEINDEX = _data_arr[data.WTACCOUNTTYPEINDEX];
                                        // chiCangItem.STOCKNAMELONGIDXINDEX = _data_arr[data.STOCKNAMELONGIDXINDEX];
                                        // chiCangItem.STOCKCODE_TYPEINDEX = _data_arr[data.STOCKCODE_TYPEINDEX];
                                        chiCangItem.wtaccounttype = _data_arr[data.WTACCOUNTTYPEINDEX];
                                        chiCangItem.stockNamelong = _data_arr[data.STOCKNAMELONGIDXINDEX];
                                        chiCangItem.stockCodeType= _data_arr[data.STOCKCODE_TYPEINDEX];
                                        newDataArr.push(chiCangItem);

                                })
                                that.originData = JSON.parse(JSON.stringify(newDataArr));
                                console.log('aaaanewDataArr',newDataArr)
                                newData = newDataArr;
                                that.$set('gridData', newData); 

                        //     for (var i = 0; i < data.GRID0.length;i++) {
                        //     var aItem = data.GRID0[i].split('|');
                        //     //持仓列表中不包含天天理财产品
                        //     // if ((/^(660|670)\d{3}/).test(aItem[data.STOCKCODEINDEX])) {
                        //     //     data.GRID0.splice(i, 1);
                        //     //     continue;
                        //     // }
                        //     that.chiCangChengBenXianShuJu.push({
                        //         'stockCode': aItem[data.STOCKCODEINDEX],
                        //         'stockMarket': aItem[data.WTACCOUNTTYPEINDEX],
                        //         'chiCangPrice': aItem[data.KEEPPRICEINDEX]
                        //     });
                        //     // that.paiXuZhi.push({
                        //     //     'data-shizhi': aItem[data.STOCKVALUEINDEX],
                        //     //     'data-yingkui': aItem[data.YKINDEX],
                        //     //     'data-chicang': aItem[data.STOCKNUMINDEX],
                        //     //     'data-chengben': aItem[data.KEEPPRICEINDEX]

                        //     // });
                        //     // STOCKCODE_TYPEINDEX为证券类别 WTACCOUNTTYPEINDEX为市场类别,合起来判断是否为新三板的新股申购
                        //     if(aItem[data.STOCKCODE_TYPEINDEX]=='4' && aItem[data.WTACCOUNTTYPEINDEX]=='SBACCOUNT' && aItem[data.STOCKCODEINDEX].substr(0,3)=='889' && parseInt(aItem[data.STOCKNUMINDEX]) > 0 && parseInt(aItem[data.KYINDEX]) == 0){
                        //        that.shiFouXinGu.push(1);
                        //     }else{
                        //        that.shiFouXinGu.push(0);
                        //     }
                        //     // i++;
                        // }
                        if (!data.GRID0) {
                            data.GRID0 = [];
                        } else {
                            // that.listNumber += 1000;
                            // if(ty == '1'){
                            //     that.listNumber=0;
                            // }else{
                            //     that.listNumber += 1000;
                            // }
                            that.loading = false;
                        }
                        
                        
                        
                        that.$nextTick(function(){
                            var _num_index = window.sessionStorage.getItem('_num_index')
                            if(_num_index!=null){
                                that.$parent.changeSort(_num_index,true,false);
                            }
                            that.$nextTick(function(){
                                var tableCountScroll =  window.sessionStorage.getItem('TABLECOUNT0');
                                console.log('tableCountScroll',tableCountScroll)
                                if(tableCountScroll&&tableCountScroll!=''&&tableCountScroll!=null){
                                        $("#chicanglist_div").scrollTop(tableCountScroll);
                                    }else{
                                        $("#chicanglist_div").scrollTop(0);
                                    }
                                
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
                            })
                            
                        })
                        
                        }
                        $.hidePreloader();
                        $('.modal').remove();
                        
                    }).catch((err)=>{
                        // $.hidePreloader();
                        // $('.modal').remove();
                        // that.$set('gridData', []);
                        // that.$dispatch('sendError');
                    });
            },
            kuoweipanduanObj(stockType) {
                var kuoweiStockType_list = ['1','2','6','A','B','J','K','L','M','N','O','T','V','i','j','k','l','r','g','e'];
                for (var v = 0; v < kuoweiStockType_list.length; v++) {
                    if (kuoweiStockType_list[v] == stockType) {
                        return 'yes';
                    }
                }
            },
            listFunc(item) {
                var _this = this;
                // var listData = _this.gridData[index];
                // var ArrayList = listData.split('|');
                // var stockcode = ArrayList[_this.INDEX.STOCKCODEINDEX];
                // var wtaccounttype = ArrayList[_this.INDEX.WTACCOUNTTYPEINDEX];
                // var stockName = ArrayList[_this.INDEX.STOCKNAMELONGIDXINDEX];
                var stockcode= item.code;
                var wtaccounttype= item.wtaccounttype;
                var stockName  = item.stockNamelong;
                _this.$nextTick(function(){
                    $('.table-cont')[0].scrollTop = 0;
                    window.nativeTopType = true;
                    window.sessionStorage.setItem('TABLECOUNT0',0)
                     window.sessionStorage.setItem("FUNDTABLE3", 0);
                      window.sessionStorage.setItem("CHEJINGCLAS2", 0);
                      window.sessionStorage.setItem("WEITUOCLAS1", 0);
                    var pagetype = this.$route.query.type || '0';
                    var maidianName = pagetype=='0'?'jy_ptmy_ctgp_clk':'jy_ptmc_ctgp_clk';
                    maidian.reportEvent(maidianName, {
                        'appkey': 'aa347fba81312f23',
                        'xwhat': 'resource_click',
                        'title': pagetype=='0'?'普通买入页面':'普通卖出页面',
                        'resource_name':'持仓股票',
                        'product_market_code':stockcode,
                        'product_name':stockName
                    });
                    if (_this.action) {
                        _this.$TZT.tradeaction({
                        action: _this.action,
                        stockcode: stockcode,
                        wtaccounttype: wtaccounttype
                        }, _this);
                    }
                })
            },
            // huoQuZhuanTai(i, j, grid) {
            //     var that = this;
            //     var className = '';
            //     var keyName = '';
            //     if (i === 0 && j === 1) {
            //         keyName = that.YKINDEX
            //     }
            //     if (i === 1 && j === 1) {
            //         keyName = that.YKLINDEX
            //     }
            //     if (grid && keyName) {
            //         var val = grid.split('|')[keyName];
            //         if (parseFloat(val) > 0) {
            //             className = 'rise'
            //         } else if (parseFloat(val) < 0) {
            //             className = 'fill'
            //         } else {
            //             className = '';
            //         }
            //     }
            //     return className;
            // },
            // shiZhiYangShi(i, li) {
            //     var className = '';
            //     if(i==1 && li==0){
            //         className = 'shizhi';
            //     }
            //     return className;
            // },
            setFontSize(grid) {
              var className = '';
                if (grid) {
                  if (val.length > 6 || val1.length > 6) {
                    className = 'spanfont4'
                  }
                }
              return className;
            },
            makeSort(sort_col,sort_type,isTop){
                console.log('sort_type',sort_type)
                console.log('sort_col',sort_col)
                var sortValue = ['shiZhi', 'yingKui', 'chiCang', 'chengBen'];
                if(isTop == true){
                    $("#chicanglist_div").scrollTop(0);
                    window.sessionStorage.setItem('TABLECOUNT0',0)
                }
              if(this.gridData.length > 1) {
                switch (sort_type) {
                  case '0':
                    this.gridData = JSON.parse(JSON.stringify(this.originData));
                    return;
                  case '1':
                     this.gridData.sort(function(a, b){
                      return b[sortValue[sort_col]] - a[sortValue[sort_col]]
                    });
                    return;
                  case '2':
                    this.gridData.sort(function(a, b){
                      return a[sortValue[sort_col]] - b[sortValue[sort_col]]
                    });
                    return;
                  default:
                    this.gridData = JSON.parse(JSON.stringify(this.originData));
                    return;
                }
              }
                
            },
            // refreshList(){
            //     this.gridData = [];
            //     this.init();
            // }
        },
        filters: {
            isBuy(grid, ykl) {
                var className = '';
                if (grid && ykl) {
                    var val = grid['yingKui'];
                    if (parseFloat(val) > 0) {
                        className = 'rise'
                    } else {
                        className = 'fill'
                    }
                }
                return className;
            },
            
            valueKey(index, grid) {
                let str = grid ? grid.split('|')[index] : '';
                if (this.INDEX.YKLINDEX == index) {
                    return str + '%';
                }
                if (this.INDEX.STOCKNAMEINDEX == index) {
                  let str1 = grid ? grid.split('|')[this.INDEX.STOCKNAMELONGIDXINDEX] : '';
                  if (str1&&str1!==' ') {
                    return dealUtil.formatZZDate(str1, index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX);
                  }
                }
                // if(index == '1'){
                //     console.log('strstr111111',str);
                // }
                return dealUtil.formatZZDate(str, index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX);
            },
            showNewPic(index,grid) {
                let flag = 0;
                // STOCKCODE_TYPEINDEX为证券类别 WTACCOUNTTYPEINDEX为市场类别,合起来判断是否为新三板的新股申购
                if(grid.length>0 && index==this.INDEX.STOCKNAMEINDEX || true){
                    let items = grid.split('|');
                    if(items[this.INDEX.STOCKCODE_TYPEINDEX]=='4' && items[this.INDEX.WTACCOUNTTYPEINDEX]=='SBACCOUNT' || true) {
                        flag = 1;
                    }
                }
                return flag;
            },
            textAgline(index, length) {
                if (index == 0) {
                    return 'left';
                }
                if (index == length - 1) {
                    return 'right';
                }
            }
        },
        events: {
            'child-loadMore': function () {
                // console.log('loadMore')
                this.loadMore();
            },
            'child-changeSort':function(num_index,next_status,isTop){
                // alert('child-num'+num);
                // makeSort(sort_type,sort_col);
                this.makeSort(num_index,next_status,isTop);
            },
            'child-concatArr':function(){
                // this.listNamber = 0;
                var gridDataAll = JSON.parse(JSON.stringify(this.gridDataAll))
                this.gridData = this.gridData.concat(gridDataAll.splice(this.gridData.length,20));
                console.log(this.gridData)
                // this.$set('gridData',this.gridData)
           }
    }
    }
</script>
<style lang="less" scoped>
    @import '../../../../assets/less/variables.less';
    @import "../../../../assets/less/mixins.less";
    @import "../../../../assets/less/template.less";

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
        font-size: 10px;
    }

    .table-list {
        display:flex;
        // font-size: 0.67rem;
        font-size: 0.28rem;
        // padding: 0.2rem 0.75rem;
        padding: 0.16rem 0.3rem;
        border-bottom: 1px solid #F3F3F3;
    }

    .table-list .cc-piece {
        color: #222222;
        font-family: PingFangSC-Medium;
        width:25%;
    }
    .table-list .cc-piece p{
        text-align:right;
    }
        

    .table-list .cc-piece .mingcheng{
        text-align: left !important;
        font-family: PingFangSC-Regular;
        font-weight:400;
    }
    // .table-list p:first-child {
    //     // font-size: 0.65rem;
    //     color: #484848;
    // }

    // .table-list p:first-child span {
    //     font-weight: bold;
    // }

    // .table-list span {
    //     text-align: right;
    //     font-weight:500;
    // }

    // .table-list p span:first-child {
    //     text-align: left;
    //     font-family: PingFangSC-Regular;
    //     font-weight:400;
    //     // font-size:0.72rem;
    // }

    // .table-list p span:first-child {
    //     text-align: left;
    // }

    /*.fill p span:nth-child(2) {*/
    /*    color: #01a05f;*/
    /*}*/

    /*.rise p span:nth-child(2) {*/
    /*    color: #f43438;*/
    /*}*/
    .table .fill {
       color: #01a05f;
    }

    .table .rise {
        color: #f43438;
    }
    .table-list span.rese {
        color: #f43438;
    }

    .table-list span.fill {
        color: #01a05f;
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
    // .j_refresh{
    //     width: 36px;
    //     height: 36px;
    //     background:#4f4f4f url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAnCAYAAABwtnr/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0ExNTRFRDQwMDVDMTFFNUFCQzdFOEM1RjMxMENGMzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0ExNTRFRDUwMDVDMTFFNUFCQzdFOEM1RjMxMENGMzQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQTE1NEVEMjAwNUMxMUU1QUJDN0U4QzVGMzEwQ0YzNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQTE1NEVEMzAwNUMxMUU1QUJDN0U4QzVGMzEwQ0YzNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po2SrKAAAAZYSURBVHjavFltTFNn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') center center no-repeat;
    //     background-size: 23px 20px;
    //     position: fixed;right: 16px;
    //     bottom: 21px;
    //     opacity: 0.3;
    //     border-radius: 5px
    // }
</style>

