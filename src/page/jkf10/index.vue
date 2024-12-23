<!-- 必读信息 -->
<template>
  <div class="content" id="aaa" ref="contentEl">
    <div class="div_tab" style="padding-top: 0.75rem; padding-bottom: 0rem">
      <span
        :class="['tab_item', currTabIndex == 1 ? 'curr' : '']"
        @click="tabItemEvent('1')"
        >公司简况</span
      ><span
        :class="['tab_item', currTabIndex == 2 ? 'curr' : '']"
        @click="tabItemEvent('2')"
        >股东股本</span
      ><span
        :class="['tab_item leftBorder', currTabIndex == 3 ? 'curr' : '']"
        @click="tabItemEvent('3')"
        >财务数据</span
      >
    </div>
    <div class="jkf10_cont">
      <!-- 公司简况 -->
      <div :class="['jk_cont', currTabIndex == 1 ? '' : 'none']">
        <jkparent pagetype="1" :st-name="stockName"></jkparent>
      </div>
      <!-- 股东股本 -->
      <!-- <div :class="['gqzy_cont',currTabIndex==2?'':'none']">
                  <gdgb pagetype="1" :st-name="stockName"></gdgb>
              </div> -->
      <!-- 财务数据 -->
      <!-- <div :class="['f10_cont',currTabIndex==3?'':'none']">
                  <f10parent pagetype="1" :st-name="stockName"></f10parent>
              </div> -->
    </div>
  </div>
</template>
  
  <script>
import localService from "~s/localService";
import hqF10v23 from "~s/other/service_hqF10v23";
import util from "~u/util.js";
import browser from "~u/browser";
import { INIT_WEBVIEW_HEIGHT } from "~u/config";

//组件
import jkparent from "./jkparent.vue"; //简况
//   import f10parent from './jkf10-one/f10parent.vue'; //财务数据
//   import gdgb from './jkf10-one/f10gdgb.vue'; //股东股本

export default {
  data() {
    return {
      stockcode: null, //股票代码
      marketno: null, //市场
      currTabIndex: 1,
      titleName: "",
      totalHeight: 0,
      sgpType: "",
      setIntervalTime: null,
      stockName: "",
      tab2DataFlag: false,
    };
  },
  created() {
    util.setWebviewHeight(INIT_WEBVIEW_HEIGHT);
  },
  mounted() {
	this.$nextTick(()=> {
		//插入 DOM 时调用
		var _this = this;
		this.stockcode = this.$route.query.stockcode; //股票代码
		this.marketno = this.$route.query.stocktype; //市场
		this.stockName = this.$route.query.stockName; // 证券名称
		window.doTztWebView = function () {
		  var obj = {};
		  obj.contentheight = 0;
		  var cEl = _this.$refs.contentEl.children;
		  for (let i = 0; i < cEl.length; i++) {
			obj.contentheight += +cEl[i].offsetHeight;
		  }
		  if (util.notSetHeightIos(obj.contentheight)) return;
		  obj.contentheight = String(obj.contentheight);
		  localService.readLocalMesg(["tztwkwebview"]).then((data) => {
			_this.$TZT.setContentParams(data, obj);
		  });
		};
		// this.setIntervalFun();
	})
  },
  destroyed() {
	this.$nextTick(()=> {
		//从 DOM 中删除时调用
		this.stockcode = null;
		this.marketno = null;
		this.titleName = "";
		this.sgpType = "";
		this.tab2DataFlag = false;
		this.setIntervalTime && clearInterval(this.setIntervalTime);
	})
  },
  methods: {
    /**
     * [setIntervalFun 设置定时器]
     */
    setIntervalFun: function () {
      let that = this; //5s钟刷新，重新执行高度
      that.setIntervalTime = setInterval(function () {
        that.$emit("child-setHeight-event", "totalPage");
      }, 5000);
    },
    /**
     * [tabItemEvent tab事件点击]
     * @param  {String} index 点击的是第几个tab
     */
    tabItemEvent: function (index) {
      let that = this;
      if (index == 3 && !this.titleName) {
        $.showPreloader();
        that.getStockType(that.titleName, function (sTitleName, sgpType) {
          that.titleName = sTitleName;
          that.sgpType = sgpType;
          $.hidePreloader();
        //   that.$emit("parent-f10-set-titlename", sTitleName, sgpType);
          that.currTabIndex = index;
        //   that.$emit("parent-f10-load-data", true, sgpType);

          that.$nextTick(function () {
            that.totalHeight = 0;
            that.$emit("child-setHeight-event", "totalJkf10");
          });
        });
      } else if (index == 2 && !that.tab2DataFlag) {
        // that.$emit("parent-f10gddb-load-data", true);
        that.tab2DataFlag = true;
        that.currTabIndex = index;
        that.$nextTick(function () {
          that.totalHeight = 0;
          that.$emit("child-setHeight-event", "totalJkf10");
        });
      } else {
        that.currTabIndex = index;
      }

      that.$nextTick(function () {
        that.totalHeight = 0;
        that.$emit("child-setHeight-event", "totalJkf10");
      });
    },
    /**
     * [getStockType 探测当前股票类型]
     * @return {[type]} [description]
     */
    getStockType: function (titleName, fn) {
      if (!!titleName) {
        fn && fn(titleName);
        return false;
      }
      let that = this,
        oSend = {
          stockcode: this.stockcode,
          npage: "1",
          maxcount: "20",
          stype: "1",
        };
      hqF10v23.require46134(oSend).then((oData) => {
        let sTitleNanme = "毛利率",
          sgpType = "ty"; //默认通用类型
        if (!!oData.STYPE) {
          /*
			127000000606280264 = 银行
			127000000606280720 = 保险
			127000000606281107 = 证券
		*/
          if (oData.STYPE.indexOf("127000000606280264") >= 0) {
            sTitleNanme = "净利率";
            sgpType = "yh";
          } else if (oData.STYPE.indexOf("127000000606280720") >= 0) {
            sTitleNanme = "净利率";
            sgpType = "bx";
          } else if (oData.STYPE.indexOf("127000000606281107") >= 0) {
            sTitleNanme = "净利率";
            sgpType = "zq";
          }
        }
        fn && fn(sTitleNanme, sgpType);
      });
    },
  },
  components: {
    //组件
    jkparent: jkparent,
    //   f10parent:f10parent,
    //   gdgb
  },
  events: {
    /**
     * [设置高度]
     * @return {[type]} [description]
     */
    "child-setHeight-event": function (type) {
      var that = this,
        obj = {};
      obj.contentheight = 0;
      var cEl = this.$refs.contentEl.children;
      for (let i = 0; i < cEl.length; i++) {
        obj.contentheight += +cEl[i].offsetHeight;
      }
      if (util.notSetHeightIos(obj.contentheight)) return;
      if (browser.browser.versions.webview) {
        //对特殊类型进行处理
        if (
          type == "jksdltgd" ||
          type == "totalJkf10" ||
          type == "f10parent" ||
          type == "totalPage" ||
          type == "doTztWebView"
        ) {
          that.totalHeight = 0; //处理为空的个情况
        }
        if (obj.contentheight > that.totalHeight) {
          // alert("在测试：" + obj.contentheight);
          obj.contentheight = String(obj.contentheight);
          localService.readLocalMesg(["tztwkwebview"]).then((data) => {
            that.$TZT.setContentParams(data, obj);
          });
          that.totalHeight = obj.contentheight;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./hqF10v2.3.less";
.content{
  position: relative;
  height: 100%;
  overflow: scroll;
}
</style>