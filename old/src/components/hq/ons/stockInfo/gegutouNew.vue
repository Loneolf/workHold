<template>
  <div class="fund_info2" id="hs_pk" style="display: block">
    <div class="info_box ared">
      <div
        v-for="(index, item) in tabs"
        :class="{ tab: true, active: selected === index }"
        @click.stop="changeTab(index, true)"
        :key="index"
      >
        <div v-if="item.length > 4">{{ item.substr(0, 4) }}<div>...</div></div>
        <div v-else>{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import util from "../../../../util/util";

export default {
  props: ["type"],
  data() {
    return {
      hasBanKuai: true,
      Last_p: "00.00",
      High_p: "-.-",
      Open_p: "-.-",
      Low_p: "-.-",
      Total_h: "-.-",
      Total_m: "-.-",
      nHuanshoulv: "-.-",
      m_lInside: "-.-",
      m_lOutside: "-.-",
      m_lUpPrice: "0.00",
      m_lUpIndex: "0.00%",
      m_lLiangbi: "-.-",
      m_ldtsyl: "-.-",
      zsz: "-.-",
      BlockName: "-.-",
      m_lBlockUpIndex: "-.-",
      Close_p: "-.-",
      BlockCode: "",
      isadd: true,
      isdel: false,
      stockcode: "",
      stockname: "----",
      currentstockname: "个股分时",
      XFlag: "", //停牌标识
      markettype: "",
      tabs: ["个股分时", "上证指数", "深证成指"],
      selected: 0,
      //   chartType: 0,
    };
  },
  attached() {},
  methods: {
    changeTab(i, flag) {
      if (i === 0) {
        maidian.reportEvent("wtjyxf_hq_fs");
      }
      if (i === 1) {
        maidian.reportEvent("wtjyxf_hq_szzs");
      }
      if (i === 2) {
        maidian.reportEvent("wtjyxf_hq_szcz");
      }
      if (this.selected !== i) {
        this.selected = i;
        var arr = ["min", "minsh", "minsz"];
        this.$dispatch("child-changestock", i);
        this.$dispatch("child-choose", arr[i]);
      } 
    },
    list() {
      var blockcode = this.BlockCode;
      if (blockcode) {
        blockcode = blockcode.replace(/ /g, "");
      }
      if (blockcode == "" || !blockcode) {
        return;
      }
      this.$TZT.action10061(`/hq/list?stockcode=${blockcode}`);
    },
    chushihua: function () {
      this.tabs = ["个股分时", "上证指数", "深证成指"];
      this.Last_p = "00.00";
      this.High_p = "-.-";
      this.Open_p = "-.-";
      this.Low_p = "-.-";
      this.Total_h = "-.-";
      this.Total_m = "-.-";
      this.nHuanshoulv = "-.-";
      this.m_lInside = "-.-";
      this.m_lOutside = "-.-";
      this.m_lUpPrice = "0.00";
      this.m_lUpIndex = "0.00%";
      this.m_lLiangbi = "-.-";
      this.m_ldtsyl = "-.-";
      this.zsz = "-.-";
      this.BlockName = "-.-";
      this.m_lBlockUpIndex = "-.-";
      this.Close_p = "-.-";
      this.currentstockname = "个股分时";
    },
  },
  events: {
    "parent-minStockInfo": function (data) {
      this.stockname = data.stockname || "----";
      if (!data) {
        this.chushihua();
        return;
      }
      if (!(data.stockname === "上证指数" || data.stockname === "深证成指")) {
        this.currentstockname = this.stockname;
      }
      this.tabs = [this.currentstockname, "上证指数", "深证成指"];
      if (data.XFlag == 2 || data.XFlag == 3) {
        //停牌标志; 2-长期停牌  3-临时停牌  其他(通常是1或0)-正常
        this.XFlag = 2;
      } else {
        this.XFlag = 1;
      }
      this.Last_p = data.Last_p;
      this.High_p = data.High_p;
      this.Open_p = data.Open_p =='0.00'?'--':data.Open_p;
      this.Total_h = util.numTosize(data.Total_h);
      this.Low_p = data.Low_p;
      this.Total_m = util.numTosize(data.Total_m);
      this.nHuanshoulv = data.nHuanshoulv;
      this.m_lOutside = util.numTosize(data.m_lOutside);
      this.m_lInside = util.numTosize(data.m_lInside);
      this.m_lUpPrice = data.m_lUpPrice;
      this.m_lUpIndex = data.m_lUpIndex;
      this.m_lLiangbi = data.m_lLiangbi;
      this.m_ldtsyl = data.m_ldtsyl;
      this.zsz = util.numTosize(data.m_zgb * data.Last_p);
      this.BlockName = data.BlockName;
      this.BlockCode = data.BlockCode;
      this.m_lBlockUpIndex = data.m_lBlockUpIndex;
      this.Close_p = data.Close_p;
      if (!data.BlockName) {
        this.hasBanKuai = false;
      }
    },
    "parent-changeTab": function (num) {
      this.changeTab(num);
      // this.type = 0;
    },
    // "parent-type": function (type) {
    //   this.type = type || 0;
    // },
  },
};
</script>
<style lang="less" scoped>
@import "../../../../assets/less/variables.less";
@import "../../../../assets/less/mixins.less";
@import "../../../../assets/less/head.less";

.fund_info2 {
  height: 100%;
}

.fund_info2 .info_box {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.fund_info2 .fill {
  color: #01a05f;
}

.fund_info2 .rise {
  color: #f43438;
}

#noData {
  padding-top: 0.5rem;
  min-height: 1.9rem;
  line-height: 1.4rem;
}

.tab {
  position: relative;
  text-align: center;
  border: 0.8px solid rgba(229,229,229,1);
  width: 100%;
  height: 1.8rem;
  font-size: 0.65rem;
  line-height: normal;
  margin-top: 0.55rem;
  color: #5e5e5e;
  font-weight: bold;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 0.7rem;
  div{
    div{
      line-height: 0.5;
    }
  }
}

.info_box .tab:first-child{
  margin-top: 0;
}

.active {
  background: rgba(222,33,33,0.08);;
  color: #DE2121;
}
</style>
