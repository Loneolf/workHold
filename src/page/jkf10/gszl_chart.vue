<template>
  <div :class="[contentClass]">
    <div class="div_tab" style="position: relative; z-index: 123">
      <span
        v-for="(item, index) in hyTabs"
        class="tab_item"
        :class="hyTabIndex === index ? 'curr' : ''"
        @click="changeTabs(index, item.type)"
        :key="index"
        >{{ item.name }}</span
      >
    </div>
    <div
      v-show="aHyShowFlag"
      style="
        display: block;
        position: relative;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        min-height: 100px;
        margin: 0.5rem 0;
      "
    >
      <div
        class="canvasCont"
        style="display: block; text-align: center; width: 100%"
      >
        <img
          id="f10AnHy_canvas"
          style="display: none; width: 120px; height: auto"
        />
      </div>
      <!-- <div id="main" style="width: 100%;height:200px;margin-top: -12%;"></div> -->
      <div
        class="wrapper"
        style="
          display: block;
          width: 100%;
          font-size: 0.75rem;
          margin-top: -10%;
        "
      >
        <p style="display: block; width: 100%; line-height: 1.5rem">
          <span
            style="
              display: inline-block;
              width: 50%;
              text-align: left;
              color: #777;
              font-size: 0.7rem;
            "
            >{{ dateFilter(grids.hyGrid)}}</span
          >
          <span
            style="
              display: inline-block;
              width: 50%;
              text-align: right;
              color: #777;
              font-size: 0.7rem;
            "
            >{{ aText[aTextIndex] }}</span
          >
        </p>
        <p
          v-for="(item, index) in grids['hyGrid']"
          :key="index"
          style="display: block; width: 100%; line-height: 1.5rem"
        >
          <span class="cs_tuli" style="width: 55%"
            ><i class="yuanDian" :style="colorFilter(index)"></i
            >{{ item.business_project }}</span
          >
          <span
            class="cs_tuli"
            style="width: 45%"
            >{{formatSrFilter(item.business_income, grids.hyTotalValue, aTextIndex)}}</span
          >
        </p>
      </div>
    </div>
    <div class="noData" v-show="!aHyShowFlag">暂无数据</div>
  </div>
</template>
<script>
import hqF10v23 from "~s/other/service_hqF10v23";
import util from "~u/util.js";
import echarts from "~ls/f102v3/echarts.min.js";
import drawAnnular from "~ls/f102v3/annularUtil.js";
export default {
  data() {
    return {
      colors: [],
      hyTabs: [
        { name: "按行业", type: "10" },
        { name: "按产品", type: "20" },
        { name: "按地区", type: "30" },
      ],
      contentClass: "jksdltgdCont",
      hyTabIndex: 0,
      stockcode: "",
      marketno: "",
      syl: "",
      aHyShowFlag: true,
      aText: ["收入", "收入比例"],
      aTextIndex: 0, //默认只展示收入
      grids: {
        hyYGrid: [
          {
            zhValue: 0,
            grid: [],
            yGrid: [],
            moreFlag: false,
            moreText: "点击查看更多",
          },
        ],
        hyGrid: [],
        hyTotalValue: 0,
      },
    };
  },
  mounted() {
    this.$nextTick(()=> {
        //插入 DOM 时调用
        this.stockcode = this.$route.query.stockcode; //股票代码
        this.marketno = this.$route.query.stocktype; //市场
        this.syl = this.$route.query.syl || "--"; //市赢率
        this.changeTabs(0, "10");
        console.log('aaabody', $("body").attr("class"))
        this.colors = ["#e54c4b", "#ff9066", "#7daff9", "#65b768"];
        // if ($("body").attr("class").indexOf("theme-dark") != -1) {
        //   this.colors = ["#D03F3E", "#E57F58", "#507FC3", "#3f9442"];
        // } else {
        // }
    })
  },
  methods: {
    /**
     * [nullFilter 空值校验]
     * @param  {String} sValue 具体值
     * @return {[type]}        [description]
     */
     nullFilter: function (sValue) {
      if (!sValue || sValue == "undefined") return "--";
      return sValue;
    },
    /**
     * [dateFilter 时间过滤函数]
     * @param  {[type]} aGrid [description]
     * @return {[type]}       [description]
     */
    dateFilter(aGrid) {
      if (!aGrid || !aGrid[0] || !aGrid[0].dates) return "--";
      let sDate = aGrid[0].dates,
        aT = sDate.split("-");
      return util.getJiduTextFun(aT[1] + "-" + aT[2], aT[0]);
    },
    /**
     * [formatSrFilter 对结果进行处理]
     * @param  {[type]} sIncome    [description]
     * @param  {[type]} totalValue [description]
     * @param  {[type]} aTextIndex [description]
     * @return {[type]}            [description]
     */
    formatSrFilter: function (sIncome, totalValue, aTextIndex) {
      if (aTextIndex == "0") {
        return util.hqF10Uint(sIncome) + "元";
      } else if (aTextIndex == "1") {
        if (!Number(totalValue) || !Number(sIncome)) return "--";
        return util.toDecimal2((sIncome * 100) / totalValue, 2) + "%";
      }
    },
    /**
     * [colorFilter 获取颜色]
     * @return {[type]} [description]
     */
    colorFilter: function (index) {
      var aColor = [
        { yhColor1: this.colors[0], yhColor2: this.colors[0] },
        { yhColor1: this.colors[1], yhColor2: this.colors[1] },
        { yhColor1: this.colors[2], yhColor2: this.colors[2] },
        { yhColor1: this.colors[3], yhColor2: this.colors[3] },
      ];
      return "background-color:" + aColor[index].yhColor2 + ";";
    },
    huitu(newhyGrid) {
      console.log(newhyGrid);
      var that = this;
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        series: [
          {
            hoverAnimation: false, //禁止鼠标悬停放大区域
            type: "pie",
            radius: ["20%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor:
                $("body").attr("class").indexOf("theme-dark") != -1
                  ? "#13191f"
                  : "#fff",
              borderWidth: 1,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "12",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: newhyGrid,
          },
        ],
      };
      myChart.setOption(option);
    },
    /**
     * [pxFun 对数据排序]
     * @param  {[type]} grid [description]
     * @return {[type]}      [description]
     */
    pxFun: function (grid, type) {
      let oT = [],
        tempObject = [].concat(grid);
      //冒泡排序
      for (var j = 0, len1 = tempObject.length; j < len1 - 1; j++) {
        for (var i = 0, len2 = tempObject.length; i < len2 - 1 - j; i++) {
          let val1 = Number(tempObject[i].business_income),
            val2 = Number(tempObject[i + 1].business_income);
          if (val1 < val2) {
            var temp = tempObject[i];
            tempObject[i] = tempObject[i + 1];
            tempObject[i + 1] = temp;
          }
        }
      }

      oT = [].concat(tempObject);
      if (oT.length > 4) {
        let aTemp = oT.slice(0, 3),
          oTemp = {
            protype: oT[3].protype,
            business_project: "其他收入之和",
            stockcode: oT[3].stockcode,
            business_income: 0,
            business_cost: 0,
            dates: oT[3].dates,
          };
        for (var i = 3, len = oT.length; i < len; i++) {
          oTemp.business_income += Number(oT[i].business_income);
          oTemp.business_cost += Number(oT[i].business_cost);
        }
        aTemp.push(oTemp);
        oT = [].concat(aTemp);
      }
      return { oT: oT, tempObject: tempObject };
    },
    /**
     * [changeTabs tabs点击]
     * @param  {[index]} 当前TABS选中下标 [description]
     * @param  {[type]}  当前TABS选中类别 [description]
     */
    changeTabs(index, type) {
      this.hyTabIndex = index;
      let that = this;
      this.action46130(type, function (oT, gridLen) {
        if (gridLen > 0) {
          that.aHyShowFlag = true;
        } else {
          return (that.aHyShowFlag = false);
        }
        var tempTabs = [],
          aHyGrid = [];
        for (var x in oT) {
          let aDate = x.split("-"),
            aItem = oT[x];
          let temp = [],
            zhValue = 0,
            totalValue = 0;
          for (let i = 0, len = aItem.length; i < len; i++) {
            if (aItem[i].business_project == "合计") {
              zhValue = Number(aItem[i].business_income);
              continue;
            }
            totalValue += Number(aItem[i].business_income);
            temp.push(aItem[i]);
          }
          let oTemp = {
            zhValue: zhValue,
            totalValue: totalValue,
            grid: temp,
            moreText: "点击查看更多",
          };
          if (temp.length > 10) {
            oTemp.yGrid = temp;
            oTemp.grid = [].concat(temp.slice(0, 10));
            oTemp.moreFlag = true;
          } else {
            oTemp.yGrid = temp;
            oTemp.moreFlag = false;
          }
          aHyGrid.push(oTemp);
        }
        //默认显示第一个
        var o1 = that.pxFun(aHyGrid[0].yGrid),
          maxValue = aHyGrid[0].zhValue;
        if (!maxValue) {
          maxValue = aHyGrid[0].totalValue;
        }
        if (o1.tempObject.length > 10) {
          aHyGrid[0].grid = [].concat(o1.tempObject).slice(0, 10);
          aHyGrid[0].yGrid = [].concat(o1.tempObject);
        } else {
          aHyGrid[0].grid = [].concat(o1.tempObject);
          aHyGrid[0].yGrid = [].concat(o1.tempObject);
        }
        that.grids.hyGrid = o1.oT; //排序后的
        that.grids.hyTotalValue = maxValue;
        that.grids.hyYGrid = aHyGrid;
        var newhyGrid = [];
        for (var j = 0; j < that.grids.hyGrid.length; j++) {
          var a = that.grids.hyGrid[j];
          if (a.business_income > 0) {
            var obj = {
              value: a.business_income,
              name: a.business_project,
              itemStyle: {
                normal: { color: that.colors[j] },
                emphasis: { color: that.colors[j] },
              },
            };
            newhyGrid.push(obj);
          }
        }
        // that.huitu(newhyGrid)
        that.$nextTick(function () {
          that.drawImageFun({
            dom: $("#f10AnHy_canvas"),
            data: o1.oT,
            maxValue: maxValue,
          });
        });
      });
    },
    /**
     * [action46130 获取公司数据]
     * @param  {[protype]} 类别 [description]
     * @fun    {[fn]}      回调 [description]
     */
    action46130: function (protype, fn) {
      let that = this,
        oSend = {
          stockcode: this.stockcode,
          protype: protype,
          menu_id: "3",
        };
      hqF10v23.require46130(oSend).then((oData) => {
        let oT = {},
          zhValue = 0;
        if (oData.GRID0 && oData.GRID0.length >= 1) {
          for (let i = 0, len = oData.GRID0.length; i < len; i++) {
            let aItem = oData.GRID0[i].split("|"),
              protype = aItem[oData["PROTYPEINDEX"]],
              date = aItem[oData["DATESINDEX"]];
            if (!oT[date]) oT[date] = [];
            oT[date].push({
              protype: protype,
              business_project: aItem[oData["BUSINESS_PROJECTINDEX"]],
              stockcode: aItem[oData["STOCKCODEINDEX"]],
              business_income: aItem[oData["BUSINESS_INCOMEINDEX"]], //业务收入
              business_cost: aItem[oData["BUSINESS_COSTINDEX"]], //业务成本
              dates: aItem[oData["DATESINDEX"]],
              mlr: !!aItem[oData["GROSSPROFITRATEINDEX"]]
                ? util.toDecimal2(aItem[oData["GROSSPROFITRATEINDEX"]], 2) + "%"
                : "--",
              srbl: !!aItem[oData["PCTMBREVENUE"]]
                ? util.toDecimal2(aItem[oData["PCTMBREVENUE"]], 2) + "%"
                : "--",
            });
          }
        }
        let oTemp = {},
          nCount = 0;
        for (var x in oT) {
          //循环截断
          if (nCount >= 4) break;
          oTemp[x] = oT[x];
          nCount++;
        }
        fn && fn(oTemp, !!oData.GRID0 ? oData.GRID0.length : 0);
      });
    },
    drawImageFun: function (obj) {
      new drawAnnular({
        obj: obj.dom,
        cHeight: 100,
        cWidth: 120,
        lineWidth: 46,
        data: obj.data,
        totalValue: obj.maxValue,
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./hqF10v2.3.less";
.yuanDian {
  width: 9px;
  height: 9px;
  border-radius: 1px;
  border-radius: unset;
}
.div_tab {
  .tab_item {
    width: 3.35rem;
  }
}

.theme-white {
  .cs_tuli {
    color: #222;
  }
}

.theme-dark {
  .cs_tuli {
    color: @color-font-dark;
  }
}

.notBorder {
  padding-left: @paddingL;
  &:before {
    display: none;
  }
}

.wrapper {
  & > p {
    white-space: nowrap;
  }
  & > p > span:first-of-type {
    white-space: pre-wrap;
  }
}
.cs_tuli {
  display: inline-block;
  width: 50%;
  text-align: left;
  vertical-align: top;
}
.cs_tuli:last-child {
  text-align: right;
}
</style>
