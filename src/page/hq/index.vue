<template>
	<div class="content">
		<div class="headTabs slh_putong_cc">
			<div
				v-for="(item, index) in headTabs"
				:key="index"
				:class="{ tab: true, active: hselected === index }"
				@click="changTab(index)"
			>
				{{ item }}
			</div>
		</div>
		<swiper ref="swiper" direction="horizontal" :speed="250">
			<div
				class="swiper-slide swiper-no-swiping"
				v-for="(item, idx) in headTabs"
				:key="item"
			>
				<!-- 持仓 -->
				<div v-if="idx == '0'">
					<templatechicang
						url="ptjy/chicang2"
						ref="chicangnew"
						:action="action"
						:viewname="viewname"
					></templatechicang>
				</div>
				<!-- 当日委托 -->
				<!-- <div v-if="idx == '1'">
					<drweituo ref="drweituo"></drweituo>
				</div> -->
				<!-- 当日成交 -->
				<!-- <div v-if="idx == '2'">
					<drchengjiao ref="drchengjiao"></drchengjiao>
				</div> -->
				<!--自选 -->
				<!-- <div v-if="idx == '3'">
					<zixuan :action="action" ref="zixuanNew"></zixuan>
				</div> -->
			</div>
		</swiper>
	</div>
</template>
    
<script>
import templatechicang from "./template.vue";
// import Swiper from "../../../vue-swipe/vue-swiper-native";
// import drweituo from "../../../components/common/dRweiTuo.vue";
// import drchengjiao from "../../../components/common/dRchengJiao.vue";
// import zixuan from "./geguzixuan1";

var last = 0;
export default {
	data() {
		return {
			headTabs: ["持仓", "当日委托", "当日成交", "自选"],
			hselected: 0,
			pagetype: "0",
			action: "12310",
			viewname: "view_buy",
		};
	},
	watch: {
		hselected(i) {
			this.updateTab(i);
		},
	},
	mounted() {
		var that = this;
		this.$TZT.action10077(this);
		this.pagetype = this.$route.query.type || "0";
		if (this.pagetype === "0") {
			this.action = "12310";
			this.viewname = "view_buy";
		} else {
			this.action = "12311";
			this.viewname = "view_sell";
		}

		// 交易提交成功后需刷新H5数据更新页面
		window.entrustOrderSucess = function () {
			that.updateTab(that.hselected);
		};
		// 交易页面用户点击刷新按钮刷新H5页面
		window.refreshWebPageData = function () {
			that.updateTab(that.hselected);
		};
		// 返回tab页更新数据
		window.GoBackOnLoad = function () {
			that.updateTab(that.hselected);
		};
	},
	methods: {
		updateTab(i) {
			CiticsNative.NativeCall("reFreshCanBuyAndSellDataByWeb", []);
			if (i === 0) {
				this.goTop(i);
				this.$broadcast("chicangNewData");
			}
			// if (i === 1) {
			// 	this.goTop(i);
			// 	this.$broadcast("initDrwt");
			// }
			// if (i === 2) {
			// 	this.goTop(i);
			// 	this.$broadcast("initDrcj");
			// }
			// if (i === 3) {
			// 	this.goTop(i);
			// 	this.$broadcast("zxlistNew");
			// }
		},
		goTop(i) {
			if (window.nativeTopType && window.nativeTopType == true) {
				switch (i) {
					case 0:
						window.sessionStorage.setItem("TABLECOUNT0", 0);
						break;
					case 1:
						window.sessionStorage.setItem("WEITUOCLAS1", 0);
						break;
					case 2:
						window.sessionStorage.setItem("CHEJINGCLAS2", 0);
						break;
					case 3:
						window.sessionStorage.setItem("FUNDTABLE3", 0);
						break;
				}
			}
		},
		onSlideChangeEnd(currentPage) {
			this.hselected = currentPage - 1;
		},
		changTab(i) {
			this.$refs.swiper && this.$refs.swiper.setPage(+i + 1);
			this.hselected = i;
		},
		// 节流
		throttle(fn, delay) {
			return (function (...args) {
				var nowTime = Date.now();
				if (nowTime - last > delay) {
					last = nowTime;
					fn.call(this, args);
				}
			})();
		},
		dealRefreshTimer() {
			if (this.hselected == 3) {
				this.$broadcast("zxlist");
			}
		},
	},

	components: {
		templatechicang,
		// Swiper,
		// zixuan,
		// drweituo,
		// drchengjiao,
	},
	events: {},
	route: {},
};
</script>
    
<style lang="less" scoped>
@import "../../../assets/less/variables.less";
@import "../../../assets/less/mixins.less";
body {
	color: red !important;
}
.swiper {
	position: absolute;
	top: 0.68rem;
	bottom: 0;
	right: 0;
	left: 0;
}

.AH {
	margin: 0.2rem 0.2rem 0;
	border: 1px solid #e2e2e2;
	font-size: 0.6rem;
	padding: 0 0.2rem;

	.left {
		display: inline-block;
		width: 60%;

		.AHfudu,
		.AHprice {
			margin-left: 1rem;
		}
	}

	.right {
		display: inline-block;
		width: 40%;
		text-align: right;
	}

	.fill {
		color: @color-fill;
	}

	.rise {
		color: @color-rise;
	}
}

.stock_tab {
	padding: 0 5px;
	background: #fff;
	margin-top: 6px;
	position: relative;
	border-top: 1px solid #e2e2e2;

	ul {
		height: 32px;
		line-height: 32px;
		width: 100%;
		display: table;
		border-bottom: 1px solid #ddd;

		li {
			position: relative;
			display: table-cell;

			a {
				display: block;
				text-align: center;
				font-size: 16px;
				color: #000;
				text-decoration: none;
			}

			.dot-bottom {
				font-size: 0;
				line-height: 0;
				border-width: 4px;
				border-color: #000;
				border-bottom-width: 0;
				border-style: dashed;
				border-top-style: solid;
				border-left-color: transparent;
				border-right-color: transparent;
				vertical-align: middle;
				position: absolute;
				top: 40%;
			}
		}

		li.active a {
			color: #00a9f8;
			border-bottom: 2px solid #00a9f8;

			.dot-bottom {
				border-color: #00a9f8;
				border-left-color: transparent;
				border-right-color: transparent;
			}
		}
	}

	.select-vule {
		position: absolute;
		background: #fff;
		right: 0.5rem;
		top: 1.2rem;
		width: 4rem;
		height: 8rem;
		z-index: 10;
		overflow-y: scroll;
		border: 1px solid #00a9f8;
		border-radius: 0.25rem;

		span {
			display: block;
			text-align: center;
			line-height: 1.6rem;
			font-size: 0.7rem;
			position: relative;
			.hairline(bottom, #ccc);
		}

		span.active {
			color: #00a9f8;
		}
	}
}

.tabs .content {
	position: inherit;
}

.swipe-indicators {
	bottom: -5px;
}

.footer ~ .content {
	bottom: 49px;
}

.zq_box {
	border: 1px solid #e2e2e2;
	font-size: 0.65rem;
	margin: 0.25rem;

	p {
		display: inline-block;
		width: 50%;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
	}

	.red {
		color: #f00;
	}
}

.tabs {
	/*float: left;*/
	width: 65.3%;
	/*height: 10.25rem;*/
}

.tabs1 {
	width: 34.7%;
	padding-left: 0.25rem;
}

.content {
	background-color: #ffffff;
	border-top: 0.7px solid #e5e5e5;
}
.headTabs {
	height: 0.68rem;
	line-height: 0.68rem;
	margin: 0 auto;
	border-bottom: 0.7px solid #e5e5e5;
	display: flex;
	align-items: center;
}

.tab {
	display: inline-block;
	// width: 33.3%;
	width: 30%;
	text-align: center;
	// font-size: 0.62rem;
	font-size: 0.26rem;
	color: #777777;
	font-weight: 400;
	font-family: PingFangSC-Regular;
}
.tab:first-child {
	width: 20%;
}
.tab:last-child {
	width: 20%;
}
.tab.active {
	color: #de2121;
	position: relative;
	font-weight: 500;
	font-family: PingFangSC-Medium;
}
.content-body {
	display: flex;
	height: 100%;
	// max-height: 10.25rem;
	min-height: 8rem;
}
</style>
  <style>
.modal {
	width: 100% !important;
	transform: translate(-50%, 0) !important;
	margin-left: 0 !important;
}
.modal .preloader {
	width: 0.7rem !important;
	height: 0.7rem !important;
}
</style>
    
    