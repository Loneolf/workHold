<template>
    <div class="table" id="chicanglist_content_div">
        <div v-for="(gi,item) in gridData" track-by="$index" @click="listFunc($index)"
             class="table-list {{item | isBuy YKINDEX}}" data-shizhi="{{paiXuZhi[gi]['data-shizhi']}}" data-yingkui="{{paiXuZhi[gi]['data-yingkui']}}" data-chicang="{{paiXuZhi[gi]['data-chicang']}}" data-chengben="{{paiXuZhi[gi]['data-chengben']}}"  data-num="{{gi}}">
            <p v-for="(i,trItem) in dateArray"><span v-for="(li,dataList) in trItem" track-by="$index"
                                                     class="{{setFontSize(i,li,item)}} {{huoQuZhuanTai(i,$index,item)}} {{shiZhiYangShi(i,li)}}">
                                                     {{dataList | valueKey item}}<img v-if="li==0 && i==0 && shiFouXinGu[gi]==1" class="chicang-xingutu" src="../../../../assets/hq-icon/shengouzhong.png" >
                                                     </span>
            </p>
        </div>

    </div>
</template>

<script>
    import repoconfig from '../../../deal/scripts/repoconfig'
    import GRID from '../../../deal/scripts/GRID'
    import dealUtil from '../../../deal/scripts/dealUtil'
    import service_ptjy from '../../../deal/service/trade/service_ptjy'

    export default {
        props: ['action', 'viewname'],
        data() {
            return {
                gridData: [],
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
                textTitleArray: []
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
            this.init();
        },
        methods: {
            init() {
                this.listNumber = 0;
                this.loading = false;
                this.loadMore();
            },
            loadMore() {
                maidian.reportEventRandom({baseVal:10000, randomVal: 10},'xtyh_cc_jysy_mmcc');
                var that = this;
                // 如果正在加载，则退出
                if (this.loading) {
                    return;
                }
                this.loading = true;
                $.showPreloader();
                let oSendData = {
                    //起始位置
                    StartPos: this.listNumber == 0 ? this.listNumber : (this.listNumber + 1),
                    //最大条数
                    // MaxCount: repoconfig.config.pagecount
                    MaxCount: 1000
                };

                service_ptjy.require117(oSendData)
                    .then((data) => {
                        console.log(data);
                        $.hidePreloader();
                        if (data.ERRORNO < 0) {
                            $.alert(data.ERRORMESSAGE);
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
                            that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
                            that.INDEX.YKLINDEX = data.YKLINDEX;
                            that.INDEX.DATEFORMINDEX = data.DATEFORMINDEX;
                            that.INDEX.ZZPINDEX = data.ZZPINDEX;
                            that.INDEX.STOCKNAMEINDEX = data.STOCKNAMEINDEX;
                            that.INDEX.STOCKNAMELONGIDXINDEX = data.STOCKNAMELONGIDXINDEX;
                            that.INDEX.STOCKCODE_TYPEINDEX = data.STOCKCODE_TYPEINDEX;
                            that.INDEX.WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX;
                            data.GRID0 && data.GRID0.shift();
                            /*that.$set('textTitleArray',oData.dateTitle);
                            that.$set('gridTitle',oData.textTitle);*/
                            that.$set('dateArray', oData.dateArray);
                            var obj = {
                                textTitleArray: oData.dateTitle,
                                gridTitle: oData.textTitle,
                                dateArray: oData.dateArray
                            };
//              that.$emit('headtitle', obj);
                            this.$dispatch('headtitle', obj);
                            if ((!data.GRID0 || data.GRID0.length <= 0)) {
                                that.$dispatch('noDataBlock');
                                return;
                            }
                        }
                        for (var i = 0; i < data.GRID0.length;) {
                            var aItem = data.GRID0[i].split('|');
                            //持仓列表中不包含天天理财产品
                            // if ((/^(660|670)\d{3}/).test(aItem[data.STOCKCODEINDEX])) {
                            //     data.GRID0.splice(i, 1);
                            //     continue;
                            // }
                            that.chiCangChengBenXianShuJu.push({
                                'stockCode': aItem[data.STOCKCODEINDEX],
                                'stockName': aItem[data.STOCKNAMEINDEX],
                                'stockMarket': aItem[data.WTACCOUNTTYPEINDEX],
                                'chiCangPrice': aItem[data.KEEPPRICEINDEX],
                                'stbLayerFlag': aItem[data.STBLAYERFLAGINDEX]
                            });
                            that.paiXuZhi.push({
                                'data-shizhi': aItem[data.STOCKVALUEINDEX],
                                'data-yingkui': aItem[data.YKINDEX],
                                'data-chicang': aItem[data.STOCKNUMINDEX],
                                'data-chengben': aItem[data.KEEPPRICEINDEX]

                            });
                            // STOCKCODE_TYPEINDEX为证券类别 WTACCOUNTTYPEINDEX为市场类别,合起来判断是否为新三板的新股申购
                            if(aItem[data.STOCKCODE_TYPEINDEX]=='4' && aItem[data.WTACCOUNTTYPEINDEX]=='SBACCOUNT' && aItem[data.STOCKCODEINDEX].substr(0,3)=='889' && parseInt(aItem[data.STOCKNUMINDEX]) > 0 && parseInt(aItem[data.KYINDEX]) == 0){
                               that.shiFouXinGu.push(1);
                            }else{
                               that.shiFouXinGu.push(0);
                            }
                            i++;
                        }
                        if (!data.GRID0) {
                            data.GRID0 = [];
                        } else {
                            that.listNumber += 1000;
                            that.loading = false;
                        }
//            that.$set('gridData',data.GRID0);
                        var newData = that.gridData.concat(data.GRID0);
                        that.$set('gridData', newData);
                        console.log('gridData:',this.gridData);
                        console.log('dateArray:',this.dateArray);
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
            listFunc(index) {
                var listData = this.gridData[index];
                var ArrayList = listData.split('|');
                var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX];
                var wtaccounttype = ArrayList[this.INDEX.WTACCOUNTTYPEINDEX];
                if (this.action) {
                    this.$TZT.tradeaction({
                        action: this.action,
                        stockcode: stockcode,
                        wtaccounttype: wtaccounttype
                    }, this);
                }
            },
            huoQuZhuanTai(i, j, grid) {
                var that = this;
                console.log(i, j);
                var className = '';
                var keyName = '';
                if (i === 0 && j === 1) {
                    keyName = that.YKINDEX
                }
                if (i === 1 && j === 1) {
                    keyName = that.YKLINDEX
                }
                console.log(keyName);
                if (grid && keyName) {
                    var val = grid.split('|')[keyName];
                    if (parseFloat(val) > 0) {
                        className = 'rise'
                    } else if (parseFloat(val) < 0) {
                        className = 'fill'
                    } else {
                        className = '';
                    }
                }
                return className;
            },
            shiZhiYangShi(i, li) {
                var className = '';
                if(i==1 && li==0){
                    className = 'shizhi';
                }
                return className;
            },
            setFontSize(i, li, grid) {
              var className = '';
              if(i==0 && li==0){
                if (grid) {
                  var val = grid.split('|')[this.INDEX.STOCKNAMEINDEX];
                  var val1 = grid.split('|')[this.INDEX.STOCKNAMELONGIDXINDEX];
                  if (val.length > 6 || val1.length > 6) {
                    className = 'spanfont4'
                  }
                }
              }
              return className;
            },
            makeSort(sort_col,sort_type){
                var list_sort_col = {  // 排序用字段
                    '0':'data-shizhi',
                    '1':'data-yingkui',
                    '2':'data-chicang',
                    '3':'data-chengben',
                    '4':'data-num'
                }
                var sort_type_num = -1;  // 升序
                if(sort_type=='1') { // 降序
                    sort_type_num = 1;
                }
                if(sort_type=='0') { // 默认顺序
                    sort_col = '4';
                }
                var chicanglist = $('.table-list');
                var col_name = list_sort_col[sort_col];
                if(!col_name){
                    return;
                }
                chicanglist.sort(function (a, b) {
                  var num1 = 0;
                  var num2 = 0;
                  num1 = parseFloat($(a).attr(col_name));
                  num2 = parseFloat($(b).attr(col_name));
                  if (num2 > num1) {
                    return 1*sort_type_num;
                  }
                  if (num1 > num2) {
                    return -1*sort_type_num;
                  }
                  return 0;
                });
                chicanglist.detach().prependTo('#chicanglist_content_div');
                $("#chicanglist_div").scrollTop(0);
            }
        },
        filters: {
            isBuy(grid, ykl) {
                var className = '';
                if (grid && ykl) {
                    var val = grid.split('|')[ykl];
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
                  var kuowei = this.kuoweipanduanObj(grid.split('|')[this.INDEX.STOCKCODE_TYPEINDEX])
                  let str1 = null;
                  if ((kuowei && kuowei == 'yes') && grid.split('|')[this.INDEX.STOCKNAMELONGIDXINDEX] && grid.split('|')[this.INDEX.STOCKNAMELONGIDXINDEX].replace(/\s+/g,"").length>0) {
                    str1 = grid ? grid.split('|')[this.INDEX.STOCKNAMELONGIDXINDEX] : '';
                  }
                  if (str1&&str1!==' ') {
                    return dealUtil.formatZZDate(str1, index, this.INDEX.ZZPINDEX, this.INDEX.DATEFORMINDEX);
                  }
                }
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
                // let str = grid?grid.split('|')[index]:'';
                // if(str.length<5){
                // }else{
                //   $(this)
                // }
                if (index == 0) {
                    return 'left';
                }
                if (index == length - 1) {
                    return 'right';
                }
            },
            setFont(last, index, grid) {
                let str = grid ? grid.split('|')[index] : '';
                var length = str.length;
                var level = '1';
                var last1 = '';
                if (last) {
                    last1 = last + ' ';
                }
                if (length < 5) {

                } else {
                    if (length < 7) {
                        level = '2';
                    } else if (length < 9) {
                        level = '3';
                    } else {
                        level = '4';
                    }
                }
                return last1 + 'spanfont' + level;
            }
        },
        events: {
            'child-loadMore': function () {
                this.loadMore();
            },
            'child-changeSort':function(num_index,next_status){
                // alert('child-num'+num);
                // makeSort(sort_type,sort_col);
                this.makeSort(num_index,next_status);
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
        font-size: 12px;
    }

    .table-list {
        font-size: 0.6rem;
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid #e9e9e9;
    }

    .table-list p {
        color: #919191;
    }

    .table-list p:first-child {
        font-size: 0.65rem;
        color: #484848;
    }

    .table-list p:first-child span {
        font-weight: bold;
    }

    .table-list p span {
        text-align: right;
    }

    .table-list p span:first-child {
        text-align: left;
    }

    .table-list p span:first-child {
        text-align: left;
    }

    /*.fill p span:nth-child(2) {*/
    /*    color: #01a05f;*/
    /*}*/

    /*.rise p span:nth-child(2) {*/
    /*    color: #f43438;*/
    /*}*/

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
        color:#3D3D3D !important;
        font-weight: bolder !important;
    }
</style>

