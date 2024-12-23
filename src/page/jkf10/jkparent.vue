<!-- 简况父组件文件 -->
<template>
  <div :class="[contentClass]">
    <p class="p_more_title">
      <span>主要指标</span
      ><span class="more_text" @click.stop="moreGdzbEvent()">&nbsp;</span>
    </p>
    <div class="zyZbCont zb_list">
      <p class="zhibiao">最新指标</p>
      <div class="list_item">
        <p class="list_item_lr">
          <span class="lr_left">市盈率(动)</span
          ><span class="lr_right">{{ syl }}</span>
        </p>
        <p class="list_item_lr">
          <span class="lr_left">市净率</span
          ><span class="lr_right">{{ sjl }}</span>
        </p>
      </div>
      <p class="zhibiao">{{ dateFilter(grid1002.date, grid1002.kbFlag) }}</p>
      <div class="list_item">
        <p class="list_item_lr">
          <span class="lr_left JKhintSM"
            >每股收益<i
              v-if="isshowHint()"
              class="JKhintBtn"
              @click="hintClick()"
            ></i></span
          ><span class="lr_right">{{ grid1002.mgsy }}元</span>
        </p>
        <p class="list_item_lr">
          <span class="lr_left JKhintSM"
            >每股净资产<i
              v-if="isshowHint()"
              class="JKhintBtn"
              @click="hintClick()"
            ></i></span
          ><span class="lr_right">{{ grid1002.mgjzc }}元</span>
        </p>
      </div>
      <div class="list_item">
        <p class="list_item_lr">
          <span class="lr_left">营业总收入</span
          ><span class="lr_right" :style="styleFilter(grid1002.yyzsr)">{{
            formatSrFilter(grid1002.yyzsr, "0")
          }}</span>
        </p>
        <p class="list_item_lr">
          <span class="lr_left">同比增长</span
          ><span class="lr_right">{{
            formatSrFilter(grid1002.yyzsr_tb, "1")
          }}</span>
        </p>
      </div>
      <div class="list_item">
        <p class="list_item_lr">
          <span class="lr_left">归属净利润</span
          ><span class="lr_right">{{ formatSrFilter(grid1002.jlr, "0") }}</span>
        </p>
        <p class="list_item_lr">
          <span class="lr_left">同比增长</span
          ><span class="lr_right">{{
            formatSrFilter(grid1002.jlr_tb, "1")
          }}</span>
        </p>
      </div>
    </div>
    <p class="lineP"></p>
    <p class="p_more_title">
      <span>公司资料</span
      ><span class="more_text" @click.stop="gszlMoreEvent">&nbsp;</span>
    </p>
    <div class="gsZlCont btBorder">
      <p class="list_item">
        <span class="left_bfb w30">公司名称</span
        ><span class="right_bfb w70">{{ companyInfo.name }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30 mb">注册地址</span
        ><span class="right_bfb w70">{{ companyInfo.zcDizhi }}</span>
      </p>
    </div>
    <div class="gsZlCont btBorder">
      <p class="list_item">
        <span class="left_bfb w30">董事长</span
        ><span class="right_bfb w70">{{ companyInfo.dongSZhang || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30">董秘</span
        ><span class="right_bfb w70">{{ companyInfo.dongMi || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30">实际控制人</span
        ><span class="right_bfb w70">{{ companyInfo.sjkzr || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30">上市日期</span
        ><span class="right_bfb w70">{{ companyInfo3.ssrq || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30">发行价</span
        ><span class="right_bfb w70">{{ companyInfo3.fxPrice || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30 mb">首日开盘价</span
        ><span class="right_bfb w70">{{
          companyInfo3.fristOpenPrice || "--"
        }}</span>
      </p>
    </div>
    <div class="gsZlCont btBorder">
      <p class="list_item">
        <span class="left_bfb w30">所属区域</span
        ><span class="right_bfb w70">{{ companyInfo.ssQy || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30">所属行业</span
        ><span class="right_bfb w70">{{ companyInfo.ssHy || "--" }}</span>
      </p>
      <p class="list_item">
        <span class="left_bfb w30">主营业务</span
        ><span class="right_bfb w70 mb" style="overflow: hidden">{{
          companyInfo.zyYw || "--"
        }}</span>
      </p>
    </div>
    <!-- 公司资料图表 -->
    <gszlchart></gszlchart>
    <p class="lineP"></p>
    <!-- 公司高管 -->
    <!-- <jkgsgg pagetype="1" :st-name="stName"></jkgsgg>
        <p class="lineP"></p> -->
    <!-- 测试高管持股变动 -->
    <!-- <ggcgbd pagetype="1" page="3" :st-name="stName"></ggcgbd>
        <p class="lineP"></p> -->
    <!-- 分红转送 -->
    <!-- <jkfhzs pagetype="1" :st-name="stName"></jkfhzs>
        <p class="lineP"></p> -->
    <!-- 行业对比 -->
    <!-- <jkhydb pagetype="1" :st-name="stName"></jkhydb> -->

    <p class="mzsm_cont">
      免责声明:以上内容仅供参考，不作为投资决策依据。<br />投资有风险，入市需谨慎。
    </p>
  </div>
</template>

<script>
import hqF10v23 from "~s/other/service_hqF10v23";
import util from "~u/util.js";
import tztStockType from "~ls/tztStockType.js";
import browser from "~u/browser";

//导入组件
import gszlchart from "./gszl_chart.vue"; // 按行业、产品、地区图标
// import jkgsgg from './jkgsgg.vue'; //公司高管
// import jkfhzs from './jkfhzs.vue'; //分红转送
// import jkhydb from './jkhydb.vue'; //行业对比
// import ggcgbd from './ggcgbd.vue'

export default {
  components: {
    //组件
    // jkgsgg,
    // jkfhzs,
    // jkhydb,
    gszlchart,
    // ggcgbd
  },
  data() {
    return {
      isKCB: false,
      stockcode: null, //股票代码
      marketno: null, //市场
      contentClass: "jkCont content",
      companyInfo: {
        name: "--", //公司名称
        zcDizhi: "--", //注册地址
        dongSZhang: "--", //董事长
        dongMi: "--", //董秘
        sjkzr: "--", //实际控制人
        ssQy: "--", //所属区域
        ssHy: "--", //所属行业
        zyYw: "--", //主营业务
      },
      companyInfo3: {
        ssrq: "--", //上市日期
        fxPrice: "--", //发行价
        fristOpenPrice: "--", //首日开盘价
      },
      syl: "--", //市赢率
      sjl: "--", //市净率
      mgjzc: "--", //每股净资产
      mgsy: "--", //每股收益
      grid1002: {
        jlr: "--",
        jlr_tb: "--",
        yyzsr: "--",
        yyzsr_tb: "--",
        mgjzc: "--",
        mgsy: "--",
      },
      currTabIndex: 1, //当前处于第几个tab
    };
  },
  props: ["pagetype", "stName"], //moretype=1 表示可以不是单独的页面
  mounted() {
    this.$nextTick(() => {
      if (!!this.pagetype) this.contentClass = "jkCont";
      this.stockcode = this.$route.query.stockcode; //股票代码
      this.marketno = this.$route.query.stocktype; //市场
      this.initData();
      if (browser.browser.versions.webview) {
        this.$TZT.action10077(this);
      }
    });
  },
  destroyed: function () {
    this.stockcode = null;
    this.marketno = null;
  },
  methods: {
    /**
     * [dateFilter 时间过滤函数]
     * @param  {String} aGrid [description]
     * @return {[type]}       [description]
     */
    dateFilter(date, kbFlag) {
      if (!date || date == "--") return "--";
      let sDate = date,
        aT = sDate.split("-");
      let sStr = util.getJiduTextFun(aT[1] + "-" + aT[2], aT[0]);
      if (kbFlag == "1") {
        return sStr.replace(/中报/g, "半年").replace(/报/g, "") + "度快报";
      } else {
        return sStr;
      }
    },
    /**
     * [formatSrFilter 对结果进行处理]
     * @param  {[type]} sIncome    [description]
     * @param  {[type]} totalValue [description]
     * @param  {[type]} aTextIndex [description]
     * @return {[type]}            [description]
     */
    formatSrFilter: function (sIncome, aTextIndex) {
      if (!sIncome || sIncome == "--") return "--";
      if (aTextIndex == "0") {
        return util.f10fmtunit(sIncome, 2);
      } else if (aTextIndex == "1") {
        return util.f10fmtunit(sIncome, 2) + "%";
      }
    },
    styleFilter: function (sIncome) {
      var sStr = "";
      if (!sIncome || sIncome == "--") {
        sStr = "--";
      } else {
        sStr = util.f10fmtunit(sIncome, 2);
      }
      if (sStr.length == 8) {
        return "font-size:.7rem;";
      } else if (sStr.length > 8) {
        return "font-size:12px;";
      }
    },
    hintClick: function () {
      this.$TZT.action10061("/hq/f10v23/mgjzcTS?type=1&isKCB=" + this.isKCB);
    },
    isshowHint: function () {
      const type = tztStockType.getMarketNameByType(this.marketno);
      return [
        "A股",
        "B股",
        "科创板",
        "创业板",
        "科创板CDR",
        "沪深",
        "中小",
      ].includes(type);
    },
    /**
     * [tabItemEvent tab事件点击]
     * @param  {String} index 点击的是第几个tab
     */
    tabItemEvent: function (index) {
      this.currTabIndex = index;
      if (index == 1) {
        this.$emit("parent-jkjgmbj-load-data", true);
      } else if (index == 2) {
        this.$emit("parent-jkjgrating-load-data", true);
        setTimeout(() => {
          this.$emit("parent-jkjgndrating-load-data", true);
        }, 800);
      } else if (index == 3) {
        this.$emit("parent-jkjgyjyc-load-data", true);
      }
    },
    moreEvent: function () {
      this.$TZT.action10061(
        "/hq/f10v23/mbj?stockcode=" +
          this.stockcode +
          "&stocktype=" +
          this.marketno
      );
    },
    /**
     * [dealRefreshTimer 实时刷新]
     * @return {[type]} [description]
     */
    dealRefreshTimer() {
      this.action20109();
    },
    /**
     * [initData 初始化数据]
     * @return {[type]} [description]
     */
    initData: function () {
      let that = this;
      that.action20109();
      that.getMeunId1002(); //利润表
      setTimeout(function () {
        that.getIntroduction();
      }, 500);
      setTimeout(function () {
        that.$emit("parent-jksdltgd-load-data", true);
        that.$emit("parent-jkgsgg-load-data", true);
        that.$emit("parent-jkggcgbd-load-data", true);
      }, 800);
      setTimeout(function () {
        that.$emit("parent-jkjgposition-load-data", true);
        that.$emit("parent-jkfhzs-load-data", true);
        that.$emit("parent-jkhydb-load-data", true);
      }, 1200);
      setTimeout(function () {
        that.$emit("parent-jkjgmbj-load-data", true);
      }, 1500);
    },
    /**
     * [getIntroduction 获取公司简介信息]
     * @return {[type]} [description]
     */
    getIntroduction: function () {
      let that = this,
        oSend = {
          stockcode: that.stockcode,
          menu_id: "1001",
        };
      hqF10v23.require46103(oSend).then((oData) => {
        let oCompany = {
          name: "--", //公司名称
          zcDizhi: "--", //注册地址
          dongSZhang: "--", //董事长
          dongMi: "--", //董秘
          sjkzr: "--", //实际控制人
          ssrq: "--", //上市日期
          fxPrice: "--", //发行价
          fristOpenPrice: "--", //首日开盘价
          ssQy: "--", //所属区域
          ssHy: "--", //所属行业
          zyYw: "--", //主营业务
        };
        if (!!oData.GRID2) {
          //公司中文名称|省份|公司所属证监会行业（无）|经营范围-主营|注册地址|董事长|董秘|实际控制人
          let aItem = oData.GRID2[0].split("|");
          oCompany.name = aItem[0];
          oCompany.zcDizhi = aItem[4];
          oCompany.ssHy = aItem[2];
          oCompany.zyYw = aItem[3];
          oCompany.dongSZhang = aItem[5];
          oCompany.dongMi = aItem[6];
          oCompany.sjkzr = aItem[7];
          oCompany.ssQy = aItem[1] + "-" + aItem[15]; //所属区域（省份+区）
        }

        if (!!oData.GRID3) {
          //A股发行与上市 上市日期|每股发行价（元）|发行量（股）|首日开盘价
          let aItem = oData.GRID3[0].split("|");
          oCompany.ssrq = !!aItem[0]
            ? aItem[0].replace(/(.{10})(.*)/g, "$1")
            : "--";
          oCompany.fxPrice =
            (aItem[1] && util.toDecimal2(parseFloat(aItem[1]), 2) + "元") ||
            "--元";
          oCompany.fristOpenPrice =
            (aItem[3] && util.toDecimal2(parseFloat(aItem[3]), 2) + "元") ||
            "--元";
        }
        that.companyInfo = oCompany;

        that.$nextTick(function () {
          that.$emit("child-setHeight-event", "jkparent");
        });
      });

      let oSend1 = {
        stockcode: that.stockcode,
        menu_id: "1002",
      };
      hqF10v23.require46103(oSend1).then((oData) => {
        let oCompany = {};
        if (!!oData.GRID3) {
          //A股发行与上市 上市日期|每股发行价（元）|发行量（股）|首日开盘价
          let aItem = oData.GRID3[0].split("|");
          oCompany.ssrq = !!aItem[0]
            ? aItem[0].replace(/(.{10})(.*)/g, "$1")
            : "--";
          oCompany.fxPrice =
            (aItem[1] && util.toDecimal2(parseFloat(aItem[1]), 2) + "元") ||
            "--元";
          oCompany.fristOpenPrice =
            (aItem[3] && util.toDecimal2(parseFloat(aItem[3]), 2) + "元") ||
            "--元";
        }
        that.companyInfo3 = oCompany;
      });
    },
    /**
     * [action20109 请求20109数据]
     * @return {[type]} [description]
     */
    action20109: function () {
      let that = this,
        oSendData = {
          stockcode: this.stockcode,
          // Level       :'2',
          startPos: "0",
          NewMarketNo: this.marketno,
        };
      hqF10v23.require20109(oSendData).then((data) => {
        if (!!data.WTHead) {
          that.syl = data.WTHead.m_ldtsyl;
          if (!isNaN(data.WTHead.Last_p) && !isNaN(data.WTHead.m_ljzc)) {
            that.sjl =
              Number(data.WTHead.m_ljzc) == 0
                ? util.toDecimal2(data.WTHead.m_ljzc, 2)
                : util.toDecimal2(data.WTHead.Last_p / data.WTHead.m_ljzc, 2);
          } else {
            that.sjl = "--";
          }
          that.mgjzc = util.toDecimal2(data.WTHead.m_ljzc, 2);
          that.mgsy = util.toDecimal2(data.WTHead.m_mgsy, 2);
        }
        var stockProp = data.STOCKPROP;
        var nsStock = null;
        var nsKCB = null;
        if (stockProp?.length > 30) {
          nsStock = stockProp.slice(30, 31);
        }
        if (stockProp.length > 31) {
          nsKCB = stockProp.slice(31, 32);
        }
        if (
          (nsStock === "0" && nsKCB == "7") ||
          stockProp.substr(29, 3) == "162"
        ) {
          //科创板、科创板cdr
          this.isKCB = true;
        }
      });
    },
    /**
     * [getMeunId1002 获取利润表数据]
     * @return {[type]} [description]
     */
    getMeunId1002: function () {
      let that = this,
        oSend = {
          stockcode: this.stockcode,
          menu_id: "1011",
          maxcount: "1",
        };
      hqF10v23.require46103(oSend).then((oData) => {
        //每股收益 | 净利润-同比|营业总收入-同比
        //2018-03-31|6595000000.000000-6.131316|28026000000.000000-1.082017
        var oT = {};
        if (!!oData && !!oData.GRID0 && oData.GRID0.length > 0) {
          var aItem = oData.GRID0[0].split("|");
          oT.date = aItem[0];
          oT.jlr = that.getFormatValOrTb(aItem[1], 1);
          oT.jlr_tb = that.getFormatValOrTb(aItem[1], 2);
          oT.yyzsr = that.getFormatValOrTb(aItem[2], 1);
          oT.yyzsr_tb = that.getFormatValOrTb(aItem[2], 2);
          oT.mgsy = util.toDecimal2(that.getFormatValOrTb(aItem[3], 1), 2);
          oT.mgjzc = util.toDecimal2(that.getFormatValOrTb(aItem[4], 1) * 1, 2);
          oT.kbFlag = aItem[5];
        }
        console.log(oT);
        that.grid1002 = oT;
      });
    },
    /**
     * [gszlMoreEvent 公司更多资料]
     * @return {[type]} [description]
     */
    gszlMoreEvent: function () {
      let url =
        "/hq/f10v23/companyinfo?stockcode=" +
        this.stockcode +
        "&stocktype=" +
        this.marketno +
        "&syl=" +
        this.syl;
      if (!!this.stName) {
        url +=
          "&myheadfalg=1&headtitletext=" +
          encodeURIComponent(this.stName + "-" + "公司资料");
      }
      this.$TZT.action10061({ url: url, secondtype: 0 });
    },
    /**
     * [moreGdzbEvent 跟多指标]
     * @return {[type]} [description]
     */
    moreGdzbEvent: function () {
      let url =
        "/hq/f10v23/cwf10?stockcode=" +
        this.stockcode +
        "&stocktype=" +
        this.marketno +
        "&currTabIndex=1&currentView=financekeyindex";
      if (!!this.stName) {
        url +=
          "&myheadfalg=1&headtitletext=" +
          encodeURIComponent(this.stName + "-" + "主要指标");
      }
      this.$TZT.action10061({ url: url, secondtype: 0 });
    },
    /**
     * [getFormatValOrTb 格式化value和同比值的问题]
     * @param String valOrTb
     * @param String type 1取值 2取同比
     * @return {[type]} [description]
     */
    getFormatValOrTb: function (valOrTb, type) {
      let number = "";
      let index = valOrTb.indexOf("#");
      if (index == 0) {
        index = valOrTb.indexOf("#", index + 1);
      }
      if (type == 1 && index == -1) index = valOrTb.length;
      if (type == 1) {
        return valOrTb.substring(0, index);
      } else if (type == 2) {
        if (index == -1) {
          number = "";
        } else {
          number = valOrTb.substring(index + 1);
        }
        return number;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./hqF10v2.3.less";
.slh .list_item_lr span {
  font-size: 0.65rem !important;
}
.JKhintSM {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  align-items: center !important;
  -webkit-align-items: center !important;
  box-align: center !important;
  -moz-box-align: center !important;
  -webkit-box-align: center !important;
}
.JKhintBtn {
  display: block;
  width: 0.7rem;
  height: 0.7rem;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABkvfSiAAAD2UlEQVRIDb2WTUhVQRiGvcc/MCRFaqFtzPAKuSmKXCRi0MpSKTGQC6JeFcqgn10YYkiLWhit8h+iDKRApdpEi3CjtKhNkIG1UdskSi2y9F573sOdy3jP8WogDgwz833v975z5nzzE0jZQRkcHDwWjUZrNzY2ygOBQAFtvsLoL9JfoJ1yHGc8HA5/2I4ukAwwMDBQh1APmGAynOWbRbiztbX1uWXb1PUVRKiQmY9Sy4TmC+bpT9C+YjiXk5OzKPvKyoq+tAhfFb4a2kOy05+mNiD8TWO7eAT7+/srCHwBKI8gLVlXbm7uSH19fcQOTOyPjY2lLi8vNxHTTYwmskT/Yltb2zsbu0kwJvYGQDrgydTU1FBLS8svO2B4ePhAJBI5ytL9yc7O/shEftv+oaGhbPxPEK3GvgbPWVs0Lqhl5H+9B5RHfQjoOuCoIYMouL6+fp/xeWPDH4FY/6ujvb39h7Fjc+B7QHsV2xKTO2mW17FAo/S1jJOJYmRpKbOexi+xOTBD1KcQ6l9eon7ShGndgi+KwDVxYcgDJ263uIKA6zCWAVjUMirAAPRv+PJJ/DnYe4qLi0uYUJgaysjIKMb2COxB/CPU+IqJI8alPCiThjhdwVjqp+DoSvxnZKL2XyEELxG5XVlZuW4m09TUtErGdjCeAVPBSpw2PrXiEqf6RsPRpmYchHBe2SinXbCXakyg9qOnKHvBPJMD0hOJAHGKG3tQWg6gWoEgnPBLffx3CQiSFDOJZNb4e6xfYNncrjjFrYG00hiUawCpNrWnILSG8YvHYRngcL8MjlnLHO+KG8wVaTkMzKzm4oj/6LBMR+C4TF3NzMx8vUWoyy0tfaF7EJvjaosAj7mvr28/++sC2+Uezn2Q3WlsbFzwADGIm1NIvy0/zQ+wnY0UP8P/eEx1VwexXjLYzcZkseA2tKT2QZwMH/chpBOngNgp9tpxxG7EnT6d2CEvz3eHzzTLUOSD3cqUj1gkKyvr3E7uQEhcbmnpC6fEyqBqK3Yf+xr4v6FQ6KePz2My3NLivzvjQjCo0THmQfsYiLmF+aaPy2MSp7jlkJZ79pFxnxnrVm9l3w3KuVsF7jBcA9RZuEvcsxTlTgkwk27dZ+onK8pS1WQY+cQlTvWNhiuoNwiOadY6P3Z5unYBEwtCZWTpW1VmfyrRb8ZwOTEuJdi0NOSLE2NsYLwEsJqbv1cBJthu2QZKFF1f0fT09E2vAYNTLBPTBaxbX08Ncbslfn9ptJMnhnA8Mw6rbW5u/qrWLjt+YpigPX1EGVGWY++eiUZULcJ78xC2RdXXTU1W7spT/x/6PEc5tpm6wwAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  margin-left: 0.2rem;
}
.zhibiao {
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}
.mb {
  margin-bottom: 0.35rem;
}
.theme-white {
  .mzsm_cont {
    background-color: @color-bigGb-white;
    color: #999;
  }
  .lr_right,
  .right_bfb {
    color: #222;
  }
}

.theme-dark {
  // .mzsm_cont {
  //     background-color:@color-bigGb-dark;
  //     color:#48535d;
  // }
  .lr_right,
  .right_bfb {
    color: #e8e8e8;
  }
}

.mzsm_cont {
  padding: 1rem;
  font-size: 0.65rem;
  letter-spacing: 0;
  padding-bottom: @paddingLR;
  text-align: center;
  font-weight: 400;
  line-height: 0.95rem;
}
.theme-white .mzsm_cont {
  background-color: #f8f9fa;
  color: #aaaaaa;
  font-size: 0.65rem;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
  line-height: 0.95rem;
}
.zj_list .list_item {
  font-size: 0.7rem !important;
}
</style>
