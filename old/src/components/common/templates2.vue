<template>
<div>
    <div v-show="sendError || noData" class="noData">
        <img src="/newjy/ptjy/images/icon-nodata.png" class="noData-img"/>
            {{sendError?'获取数据失败，请手动刷新':'暂无持仓'}}
    </div>
    <div v-show='!noData && !sendError' class="content native-scroll">
        <div class="classIfication slh_chicangNew">
            <!-- slh_classIfication -->
            <div class="title">
                <p v-for="(index,titleItem) in textTitleArray"  sort-col="{{index}}" v-on:click="changeSort(index,false,true)">
                    <!-- sort-col="{{index}}" v-on:click="changeSort(index,false)" -->
                    <span v-if="titleItem[0] !='0'"><span :class="'qiangdiaoPx'+index">{{gridTitle[titleItem[0]]|qudiaobaifenghao}}</span>/{{gridTitle[titleItem[1]]|qudiaobaifenghao}}</span>
                    <span v-else :class="'qiangdiaoPx'+index">{{gridTitle[titleItem[1]]|qudiaobaifenghao}}</span>
                    <img class="paixu_tubiao" :id="'paixu_'+index" :src="sortImg[index]"  >
                </p>
            </div>
            <div class="table-cont content infinite-scroll" id="chicanglist_div" v-bind:class="onelist" >
            <!-- <div>持仓持仓</div> -->
                <!--<component :is='templates' :context-path='path' @widget-active='widgetActive'></component>-->
                <component :is="isapp" v-bind:action="action" v-bind:viewname="viewname" v-ref:chicang></component>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import util from '../../util/util'
    import Vue from 'vue'
    /*let sUrl = util.getUrlParameter('url');
    if(sUrl){
      sUrl = decodeURIComponent(sUrl);
    }else {
      sUrl = 'deal/views/rzrq/ons/chicang'
    }*/
    export default {
        props: ["url", 'action', 'viewname'],
        data() {
            var app = this.url || this.$route.query.url || 'rzrq/chicang';
            return {
                textTitleArray: [],
                gridTitle: [],
                sortImg: [],
                imgStatus:[],
                path: '',
                app: '',
                onelist: '',
                isExample: false,
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
                sendError:false
            }
        },
        created() {
            this.textTitleArray = [];
            this.onelist = '';
            this.gridTitle = '';
            var sUrl = this.isapp;
            Vue.component(this.isapp, function (resolve, reject) {
                require(['./qTemplates/' + sUrl + '.vue'], resolve);
            });
            this.isExample = false;
            this.isExample = true;
        }/*,
    destroyed(){
      console.log('aa');
      this.$destroy(true);
    }*/,
        methods: {
            init() {
                this.$broadcast('child-init');
            },
            chicangNewData(){
                // console.log('持仓')
                this.$refs.chicang.reQuery();
            },
            chicangArrData(){
                this.$broadcast('child-gridData');
            },
            loadMore() {
                // v-infinite-scroll="loadMore"
                // var _this = this;
                // $('.table-cont').off().scroll(function () {
                //         var viewH = $(this).height();
                //         var contentH = $(this).get(0).scrollHeight;
                //         var scrollTop = $(this).scrollTop();
                //         console.log('viewH',viewH)
                //         console.log('contentH',contentH)
                //         console.log('scrollTop',scrollTop)
                //         console.log(scrollTop / (contentH - viewH - 3))
                //         if (scrollTop / (contentH - viewH - 3) >= 0.6) { //到达底部100px时,加载新内容
                //            _this.$broadcast('child-concatArr');
                //         }
                //     });
                // if(this.$refs.chicang.gridData.length >= 1000){
                //     this.$broadcast('child-loadMore');
                // }
            },
            titleTotal(obj) {
                this.textTitleArray = obj.textTitleArray;
                this.gridTitle = obj.gridTitle;
            },
            changeSort(num,flag,isTop){
                console.log('排序之前',new Date())
                this._num_index = parseInt(num);
                var _status_index = this._num_index;
                var imgStatus;
                if(flag == true){
                    var imgStatusPaixu =JSON.parse(window.sessionStorage.getItem('imgStatusPaixu'));
                    if(imgStatusPaixu){
                        imgStatusPaixu.forEach((i,idx)=>{
                            imgStatusPaixu[idx] = Number(imgStatusPaixu[idx])-1+'';
                        })
                        imgStatus = imgStatusPaixu;
                    }
                }else{
                    imgStatus = this.imgStatus;
                }
                var _status = imgStatus[_status_index];
                var next_status = this.huoQuXiaGePaiXuTu(_status)+'';
                $('.qiangdiaoPx'+_status_index).css('color','#444444')
                var result = [];
                this.textTitleArray.forEach(function(i,idx){
                    if(_status_index != idx){
                        result.push(idx);
                    }
                })
                for(var i=0; i<this.sortImg.length; i++){
                    if(i==this._num_index){
                        this.sortImg[i] = this.list_sort_img[next_status];
                        this.imgStatus[i] = next_status;
                    
                        $('#paixu_'+i).attr('src',this.sortImg[i]);
                        next_status == '0'?$('.qiangdiaoPx'+i).css('color','#999999'):$('.qiangdiaoPx'+i).css('color','#444444');
                        result.forEach(function(i){
                            $('.qiangdiaoPx'+i).css('color','#999999')
                        })
                        continue;
                    }
                    this.sortImg[i] = this.list_sort_img['0'];
                    $('#paixu_'+i).attr('src',this.sortImg[i]);
                    this.imgStatus[i] = '0';
                }
                window.sessionStorage.setItem('imgStatusPaixu',JSON.stringify(this.imgStatus))
                window.sessionStorage.setItem('_num_index',this._num_index);
                this.$broadcast('child-changeSort',this._num_index,next_status,isTop);
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
        },
        filters: {
            textAgline(index, length) {
                if (index == 0) {
                    return 'left';
                }
                if (index == length - 1) {
                    return 'right';
                }
            },
            qudiaobaifenghao: function (val) {
                if (~val.indexOf('%')) {
                    return val.replace(/%/, '').replace(/\(\)/, '');
                } else {
                    return val;
                }
            }
        },
        events: {
            'headtitle': function (obj) {
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
                    img_status_arr.push('0');
                }
                this.$set('textTitleArray', arr);
                this.$set('sortImg', img_arr);
                this.$set('imgStatus', img_status_arr);
                this.$set('gridTitle', obj.gridTitle);
            },
            noDataBlock: function (flag) {
                this.noData = flag;
            },
            sendError:function(flag){
                this.sendError = flag;
            },
            chicangNewData:function(){
                this.chicangNewData();
            }
        }/*,
    components:{
      [sUrl]:function (resolve, reject) {
        console.log(this.$route.query.url);
        require(['../'+sUrl+'.vue'],resolve);
      }
    }*/
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
            width: 100%;
            font-size: 0;
            // height: 1.68rem;
            // line-height: 1.68rem;
            height:0.7rem;
            line-height:0.7rem;
            // padding: 0 0.72rem;
            padding: 0 0.3rem;
            border-bottom: 1px solid #F3F3F3;
            color: #999;
            background-color: #ffffff;
            white-space:nowrap;
            font-family: PingFangSC-Regular;
            // font-size: 0.62rem;
            font-size: 0.26rem;
            font-weight: 400;
            text-align: right;
        }

        p {
            display: inline-block;
            width: 24%;
            // font-size: 0.62rem;
            font-size: 0.26rem;
            text-align: right;
            color: #999999;
            font-family: PingFangSC-Regular;
            &:first-child {
                text-align: left;
            }
        }

        .title {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 100;
        }

        .table-cont {
            position: absolute;
            // top: 1.75rem;
            top:0.7rem;
            bottom: 0;
            /*height: 100%;*/
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;

            .table {
                position: relative;
                .hairline(bottom, @color-split);
            }
        }

        .onelist {
            padding-top: 20px;
        }
        .paixu_tubiao {
            // width: 0.28rem;
            // height: 0.57rem;
            // margin: 0 0 -0.08rem 0rem;
            width: 0.12rem;
            height: 0.24rem;
            margin: 0 0 -0.02rem 0rem;
        }
    }
    .classIfication .title p:nth-child(2){
        width:29% !important;
        padding-right:0.2rem;
    }
    .classIfication .title p:nth-child(3){
        width:25% !important;
        padding-right:0.2rem;
    }
    .classIfication .title p:nth-child(4){
        width:22% !important;
        // padding-right:0.15rem;
    }
    /*没有数据*/
    .noData {
        text-align: center;
        padding-top:1.5rem;
        color: #777777;
        // font-size:0.72rem;
        // line-height:1rem;
        font-size:0.28rem;
    }

    .noData p {
        display: block;
    }

    .noData .block {
        font-size: 0.9rem;
        color: #919191;
    }

    // .noData .img {
    //     width: 20%;
    //     padding-bottom: 20%;
    //     margin: 0 auto 5px;
    //     background: url('data:image/png;base64,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') no-repeat;
    //     background-size: 100%;
    // }
    .noData-img{
    display: block;
    margin: auto;
    height:1.78rem;
    // width:6.48rem;
}
</style>
