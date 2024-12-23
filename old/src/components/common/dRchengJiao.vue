<template>
  <div class="">
    <div class="tabs  border-bottom-ee">
      <div
        class="dr_wrap_one"
        :class="{ active: tabIndex == 'putong' }"
        tabval="putong"
        @click="weituoTabChange('putong')"
      >
        普通委托
        <!-- <span></span> -->
      </div>
      <div
        class="dr_wrap_two"
        :class="{ active: tabIndex == 'panhou' }"
        tabval="panhou"
        @click="weituoTabChange('panhou')"
      >
        盘后定价委托
      </div>
    </div>
    <div class="chejingClas cont j_chicanglist  m-content-3">
      <div class="clear oneli" v-for="(index, grid) in grids" track-by="$index">
        <div>
          <div class="border-bottom-ee drwtTitle">
            <span :class="grid.mmfxclass" class="slh_drwt_fangxiang">{{
              grid.mmfx
            }}</span>
            <span
              :class="
                grid.gpmc.length > 6
                  ? 'sjxcmc mingcheng small-zoom'
                  : 'sjxcmc mingcheng'
              "
              >{{ grid.gpmc }}</span
            >
            <span
              :class="grid.gpmc.length > 6 ? 'daima small-zoom' : 'daima'"
              >{{ grid.gpdm }}</span
            >
          </div>
          <div class="drwtMain" @click="chedangxiangqing(index)">
            <ul>
              <li>
                <span>成交价格：</span>
                <span class="price_black">{{ grid.cjjg }}</span>
              </li>
              <li>
                <span class="weituoshuliang">成交数量：</span>
                <span class="price_black">{{ grid.cjsl }}</span>
              </li>
              <li>
                <span>成交金额：</span>
                <span class="price_black">{{ grid.cjje }}</span>
              </li>
              <li>
                <span class="weituoshuliang">成交时间：</span>
                <span class="price_black">{{ grid.cjsj }}</span>
              </li>
            </ul>
            <p
              v-if="
                grid.WTACCOUNTTYPEINDEX == 'SHBACCOUNT' &&
                grid.STOCKTYPEINDEX == 'h'
              "
              style="
                font-size: 14px;
                color: #777777;
                line-height: 20px;
                font-weight: 400;
                text-align: justify;
                padding-right: 15px;
                margin-top: 50px;
              "
            >
              注意：上海B转H业务的委托价格、成交价格、成交金额等货币单位均为港币
            </p>
          </div>
        </div>
      </div>
      <div v-if="grids.length < 1 || sendError" class="noData">
        <img src="/newjy/ptjy/images/icon-nodata.png" class="noData-img" />
        {{
          sendError
            ? "获取数据失败，请手动刷新"
            : tabIndex == "putong"
            ? "暂无普通成交"
            : "暂无盘后成交"
        }}
      </div>
    </div>
  </div>
</template>
    
    <script>
import service_ptjy from "../deal/service/trade/service_ptjy";
import localService from "../../services/localService";
var oTool = require("../hq/scripts/tools");
var putong_cols_index = {
  mmfx: "BUYDIRECTIONINDEX",
  gpdm: "STOCKCODEINDEX",
  gpmc: "STOCKNAMEINDEX",
  cjjg: "BUSINESSPRICE",
  cjsl: "BUSINESSAMOUNT",
  cjje: "BUSINESSBALANCE",
  cjsj: "BUSINESSTIME",
  wtbh:"CONTACTINDEX",
  gpmc_long: "STOCKNAMELONGIDXINDEX",
  WTACCOUNTTYPEINDEX: "WTACCOUNTTYPEINDEX",
  STOCKTYPEINDEX: "STOCKTYPEINDEX",
};
var panhou_cols_index = {
  mmfx: "BUYDIRECTIONINDEX",
  gpdm: "STOCKCODEINDEX",
  gpmc: "STOCKNAMEINDEX",
  cjjg: "MATCHPRICEINDEX",
  cjsl: "MATCHQTYINDEX",
  cjje: "PROMONEYINDEX",
  cjsj: "REPORTTIMEINDEX",
  wtbh:"CONTACTINDEX",
  gpmc_long: "STOCKNAMELONGIDXINDEX",
  STOCKTYPEINDEX:  'STOCKTYPEINDEX'
};
export default {
  data() {
    return {
      tabIndex: "putong",
      grids: [],
      iTitles: {},
      iArr: [],
      listNamber: 0,
      pagecount: 101,
      REREQ: false,
      loadtype: this.pagecount,
      sendError: false,
    };
  },
  created() {
    // this.huQuDangRiWeiTouJiLu();
    // window.GoBackOnLoad = function () {
    //         this.reQuery();
    // }
  },
  updated() {
    this.wscroll();
  },
  methods: {
    reSetQueryParam() {
      // this.grids = [];
      this.listNamber = 0;
      this.REREQ = false;
      this.loadtype = this.pagecount;
      this.huQuDangRiWeiTouJiLu();
    },
    reQuery() {
      this.reSetQueryParam();
    },
    wscroll() {
      var _this = this;
      $(".m-content-3")
        .off()
        .scroll(function () {
          if (_this.REREQ == true) {
            return;
          }
          var viewH = $(this).height(),//可见高度
              contentH = $(this).get(0).scrollHeight,//内容高度
              scrollTop = $(this).scrollTop();//滚动高度
          if (viewH < $(window).height()) {
            viewH = $(window).height();
          }
          if (scrollTop / (contentH - viewH - 3) >= 1) {
            //到达底部100px时,加载新内容
            _this.wscrollfn();
          }
        });
    },
    wscrollfn() {
      this.REREQ = true;
      this.loadtype = this.pagecount - 1;
      if (this.grids.length >= this.loadtype) {
      this.listNamber += this.loadtype;
        this.huQuDangRiWeiTouJiLu();
      }
    },
    weituoTabChange(index) {
      if (this.tabIndex != index) {
        this.tabIndex = index;
        $(".chejingClas")[0].scrollTop = 0;
        window.sessionStorage.setItem("CHEJINGCLAS2", 0);
        var pagetype = this.$route.query.type||'0';
        var maidianName =
          pagetype == "0"
            ? this.tabIndex == "putong"
              ? "jy_ptmy_drcj_clk"
              : "jy_ptmy_drcjph_clk"
            : this.tabIndex == "putong"
            ? "jy_ptmc_drcj_clk"
            : "jy_ptmc_drcjph_clk";
        maidian.reportEvent(maidianName, {
          appkey: "aa347fba81312f23",
          xwhat: "resource_click",
          title: pagetype == "0" ? "普通买入页面" : "普通卖出页面",
          resource_name:
            this.tabIndex == "putong" ? "当日成交" : "当日成交盘后",
        });
        this.grids = [];
        this.reQuery();
      }
    },
    huQuDangRiWeiTouJiLu() {
      var _this = this;
      var oSend = {
        StartPos:
          _this.listNamber == 0 ? _this.listNamber : _this.listNamber + 1,
        //最大条数
        MaxCount: _this.pagecount - 1,
      };
      $.showPreloader();
      var activeIndex = _this.tabIndex;
      var sAction = activeIndex === "putong" ? "114" : "6423";
      var cols_index =
        activeIndex === "putong" ? putong_cols_index : panhou_cols_index;
      service_ptjy["require" + sAction](oSend)
        .then((oData) => {
          $.hidePreloader();
          $('.modal').remove();
          if(oData.ERRORNO < 0){
            _this.grids = [];
            _this.sendError = true;
          }
          if (sAction == "114") {
            if (oData.GRID0 && oData.GRID0.length > 1) {
              for (var n = 1; n < oData.GRID0.length; n++) {
                var arr = oData.GRID0[n].split("|");
                if (arr[oData.WTACCOUNTTYPENAMEINDEX] == "三板") {
                  arr[oData.WTACCOUNTTYPENAMEINDEX] = "";
                  oData.GRID0[n] = arr.join("|");
                }
              }
            }
          }
          if (_this.listNamber === 0) {
            _this.iTitles = oData.GRID0[0];
            _this.iArr = [];
            oData.GRID0.shift();
          }
          if (!oData.GRID0 || oData.GRID0.length == 0) {
            _this.REREQ = true;
            return;
          }
          _this.REREQ = false;
          _this.sendError = false;
          if (_this.listNamber == 0 && oData.GRID0) {
            var ZZPINDEX = oData.ZZPINDEX || "",
              DATEFORMINDEX = oData.DATEFORMINDEX || "",
              LASTRATEINDEX = oData.LASTRATEINDEX || "",
              CALLRATEINDEX = oData.CALLRATEINDEX || "",
              hidesegment = oData.HIDESEGMENTINDEX || "";
            try {
              localService.saveMapMesg({
                HIDESEGMENTINDEX: hidesegment,
                ZZPINDEX: ZZPINDEX,
                DATEFORMINDEX: DATEFORMINDEX,
                CALLRATEINDEX: CALLRATEINDEX,
                LASTRATEINDEX: LASTRATEINDEX,
              });
            } catch (e) {}
          }

          var grid = [];
          for (var i = 0; i < oData.GRID0.length; i++) {
            var val = oData.GRID0[i];
            var list = val.split("|");
            var obj = {
              mmfx: list[oData[cols_index.mmfx]],
              gpdm: list[oData[cols_index.gpdm]],
              gpmc: list[oData[cols_index.gpmc]],
              cjjg: oTool.baoliuxiaoshu4(list[oData[cols_index.cjjg]]),
              cjsl: list[oData[cols_index.cjsl]],
              cjje: oTool.baoliuxiaoshu2(list[oData[cols_index.cjje]]),
              cjsj: oTool.shijiangeshihua(list[oData[cols_index.cjsj]]),
              mmfxclass: "fangxiang",
              gpmc_long: list[oData[cols_index.gpmc_long]],
              WTACCOUNTTYPEINDEX: list[oData[cols_index.WTACCOUNTTYPEINDEX]],
              STOCKTYPEINDEX: list[oData[cols_index.STOCKTYPEINDEX]],
              wtbh:list[oData[cols_index.wtbh]]
            };
            // // ---股票名称扩位 LMQ s---
            // var kuowei = _this.kuoweipanduanObj(obj.STOCKTYPEINDEX);
            // if((kuowei && kuowei == 'yes') && obj.gpmc_long && obj.gpmc_long.replace(/\s+/g,"").length>0) {
            //     // val = val.replace('|'+obj.gpmc+'|','|'+obj.gpmc_long+'|');
            //     obj.gpmc = obj.gpmc_long;
            //     }
            // // ---股票名称扩位 LMQ e---
            if (obj.gpmc_long && obj.gpmc_long.replace(/\s+/g, "").length > 0) {
              val = val.replace(
                "|" + obj.gpmc + "|",
                "|" + obj.gpmc_long + "|"
              );
              obj.gpmc = obj.gpmc_long;
            }
            obj.mmfxclass =
              obj.mmfx.indexOf("买入") > -1 ? "fangxiang" : "maichu";
            grid.push(obj);
            _this.iArr.push(val);
          }
          var gridArr = JSON.parse(JSON.stringify(grid));
          var gridArr = JSON.parse(JSON.stringify(grid));
          if (oSend.StartPos >= _this.pagecount) {
            _this.grids = _this.grids.concat(gridArr);
          } else {
            _this.grids = gridArr;
          }
          // _this.grids = _this.grids.concat(gridArr);
          _this.$nextTick(function () {
            var chengjiaoScroll = window.sessionStorage.getItem("CHEJINGCLAS2");
            if (
              chengjiaoScroll &&
              chengjiaoScroll != "" &&
              chengjiaoScroll != null
            ) {
              $(".chejingClas")[0].scrollTop = chengjiaoScroll;
            } else {
              $(".chejingClas")[0].scrollTop = 0;
            }
            // if(oSend.StartPos != _this.pagecount){
            //     var chengjiaoScroll =  window.sessionStorage.getItem('CHEJINGCLAS2');
            //     console.log('chengjiaoScroll',chengjiaoScroll)
            //     if(chengjiaoScroll&&chengjiaoScroll!=''&&chengjiaoScroll!=null){
            //         $('.chejingClas')[0].scrollTop = chengjiaoScroll;
            //     }else{
            //         $('.chejingClas')[0].scrollTop = 0;
            //     }
            // }else{
            //     $('.chejingClas')[0].scrollTop = 0;
            //     window.sessionStorage.setItem('CHEJINGCLAS2',0)
            // }
          });
        })
        .catch((err) => {
          // $.hidePreloader();
          // $('.modal').remove();
          // _this.grids = [];
          // _this.sendError = true;
        });
    },
    chedangxiangqing: function (index) {
      var oSave = {
        field: this.iTitles,
        Arr: this.iArr,
      };
      localService.saveMapMesg({ C_DETAIL: JSON.stringify(oSave) });
      this.$TZT.action10061(
        {
          type: "weituo",
          url: "/newjy/qinfo_drcj.html?num=" + index,
        },
        this
      );
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
            initDrcj() {
                if (this.listNamber >= "100") {
          window.sessionStorage.setItem("CHEJINGCLAS2", 0);
        }
                this.reQuery();
                this.wscroll();
            }
        }
};
</script>
    
    <style lang="less" scoped>
@import "../../assets/less/variables.less";
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
    height:28px;
    line-height:27px;
    font-size:12px;
    border: 0.02rem solid rgba(231,231,231,1);
    // font-size:0.57rem;
    font-weight:400;
    color: #777777;
}
.slh .tabs>div {
    line-height: 22px !important;
}
.tabs > div > span {
  display: none;
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
  color: #de2121;
  // background: rgba(249, 208, 208, 0.5);
  background: #FFF4F4;
  border: 0.02rem solid #f9d0d0 !important;
}
.tabs > div.active span {
  display: block;
}
.zhuangtai_opleft {
 float:right;
    // font-size:0.57rem;
    font-size:0.24rem;
    color:#919191;
    // margin-top:2px;
    font-weight: 400;
}
.op_chedan {
  display: inline-block;
  float: right;
  margin: 1px 0 0 8px;
  width: 1.92rem;
  height: 0.96rem;
  line-height: 0.96rem;
  text-align: center;
  font-size: 0.57rem;
  color: #ffffff;
  background: #ff7007;
  box-sizing: border-box;
  border: 1px solid transparent;
  font-weight: 400;
  margin-top: 0.36rem;
}
.op_chedan_gray {
  display: inline-block;
  float: right;
  margin: 1px 0 0 8px;
  width: 1.92rem;
  height: 0.96rem;
  line-height: 0.96rem;
  text-align: center;
  font-size: 0.57rem;
  color: #ffffff;
  background: #bbbbbb;
  box-sizing: border-box;
  font-weight: 400;
  border: 1px solid transparent;
  margin-top: 0.36rem;
}

.fenge_border {
  border-bottom: 12px solid #f3f3f3 !important;
  height: 56px !important;
}
.m-content-3 {
  // overflow-y:scroll;
  overflow: scroll;
  // height:100%;
  position: absolute;
  // top: 2.16rem;
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
.j_chicanglist .oneli {
  font-size: 0;
  height: auto;
  padding: 0;
  border: none;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;
}
.j_chicanglist .oneli div,
.infonav div {
  display: block;
  float: left;
  width: 25%;
  text-align: center;
  font-size: 14px;
}

.j_chicanglist .oneli div,
.infonav div {
  width: 100%;
  display: block;
}
.j_chicanglist .oneli div.drwtTitle {
  // padding: 12px 0;
  text-align: left;
  // margin: 0 15px;
  // width: 92%;
  padding: 0 12px;
  height:0.8rem;
    line-height:0.8rem;
  border-bottom: 1px solid #f3f3f3;
}
.j_chicanglist .oneli div.drwtTitle span {
  vertical-align: middle;
  display: inline-block;
  margin-right: 2px;
}
.j_chicanglist .oneli div.drwtTitle span.zhuangtai {
  margin-right: 0px;
}
.fangxiang {
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
.maichu {
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
.mingcheng {
  color: #222222;
    // font-size:0.67rem;
    font-size:0.28rem;
    font-weight: 400;
    font-family: PingFangSC-Regular;
}
.zhuangtai {
  float: right;
  font-size: 14px;
  color: #919191;
}
.j_chicanglist .oneli div.drwtMain {
  padding-left: 15px;
  padding-top: 8px;
  // padding-left:0.72rem;
  font-size:0.24rem;
  color: #777777;
}
.j_chicanglist .oneli div.drwtMain li {
  line-height: 0.36rem;
}
.daima {
  color:#919191;
    // font-size:0.62rem;
    font-size:0.26rem;
    font-family: PingFangSC-Regular;
}
.j_chicanglist .oneli div li {
  width: 49%;
  display: inline-block;
  text-align: left;
  float: left;
}
.opctup li {
  height: 32px;
  line-height: 26px;
}
.opctup li div.opctup1 {
  font-size: 15px;
  color: #ff7007;
}
.opctup li div.opctup2 {
  font-size: 15px;
}

// .weituoshuliang{
//     display: inline-block;
//     width:70px
// }
.price_black {
  color: #222222;
}
.j_chicanglist .oneli div li.time {
  width: 100%;
}
.j_chicanglist .oneli div,
.infonav div {
  display: inline-block;
  float: none;
  vertical-align: middle;
}
.j_chicanglist .wtsxlong {
  display: inline-block;
  font-size: 0.57rem;
}
.j_chicanglist .wtsxnormal {
  display: inline-block;
  font-size: 0.67rem;
}
.small-zoom {
  font-size:0.24rem;
}
.dr_wrap_one {
  border-radius: 4px 0px 0px 4px;
  border-right: 0 !important;
}
.dr_wrap_two {
  border-radius: 0px 4px 4px 0px;
  border-left: 0 !important;
}
.noData {
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.28rem;
  color: #777777;
  // line-height: 1rem;
}
.noData-img {
  display: block;
  margin: auto;
  height: 1.78rem;
  width: 2.3rem;
}
</style>