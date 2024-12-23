<template>
	<div>
		<div v-show="sendError || noData" class="noData">
			<img src="/newjy/ptjy/images/icon-nodata.png" class="noData-img" />
			{{ sendError ? "获取数据失败，请手动刷新" : "暂无持仓" }}
		</div>
		<div v-show="!noData && !sendError" class="content native-scroll">
			<div class="classIfication slh_chicangNew">
				<div class="title">
					<p
						v-for="(titleItem, index) in textTitleArray"
						:key="index"
						:sort-col="index"
						v-on:click="changeSort(index, false, true)"
					>
						<span v-if="titleItem[0] != '0'"
							><span :class="'qiangdiaoPx' + index">{{
								gridTitle[titleItem[0]] | qudiaobaifenghao
							}}</span
							>/{{
								gridTitle[titleItem[1]] | qudiaobaifenghao
							}}</span
						>
						<span v-else :class="'qiangdiaoPx' + index">{{
							gridTitle[titleItem[1]] | qudiaobaifenghao
						}}</span>
						<img
							class="paixu_tubiao"
							:id="'paixu_' + index"
							:src="sortImg[index]"
						/>
					</p>
				</div>
				<div
					class="table-cont content infinite-scroll"
					id="chicanglist_div"
					:class="onelist"
				>
					<chicang
						:is="isapp"
						:action="action"
						:viewname="viewname"
						ref="chicang"
						@headtitle="headtitle"
						@noDataBlock="noDataBlock"
						@sendErrorF="sendErrorF"
					></chicang>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import chicang from "./chicang.vue";
export default {
	props: ["url", "action", "viewname"],
	components: {
		chicang,
	},
	data() {
		var app = this.url || this.$route.query.url || "rzrq/chicang";
		return {
			textTitleArray: [],
			gridTitle: [],
			sortImg: [],
			imgStatus: [],
			path: "",
			app: "",
			onelist: "",
			isExample: false,
			isapp: app,
			noData: false,
			list_sort_img: {
				// 排序用图标
				0: "/newjy/ptjy/images/icon-order.png",
				1: "/newjy/ptjy/images/icon-des.png",
				2: "/newjy/ptjy/images/icon-asc.png",
			},
			list_sort_type: {
				// 排序类型
				0: "moren",
				1: "jiangxu",
				2: "shengxu",
			},
			_num_index: "",
			sendError: false,
		};
	},
	created() {
		this.textTitleArray = [];
		this.onelist = "";
		this.gridTitle = "";
		var sUrl = this.isapp;
		Vue.component(this.isapp, function (resolve, reject) {
			require(["./qTemplates/" + sUrl + ".vue"], resolve);
		});
		this.isExample = false;
		this.isExample = true;
	},
	methods: {
		headtitle: function (obj) {
			if (obj.textTitleArray.length == 1) {
				this.onelist = "onelist";
			} else {
				this.onelist = "";
			}
			var arr = [];
			var img_arr = [];
			var img_status_arr = [];
			for (var i = 0; i < obj.textTitleArray[0].length; i++) {
				arr.push([obj.textTitleArray[0][i], obj.textTitleArray[1][i]]);
				img_arr.push(this.list_sort_img["0"]);
				img_status_arr.push("0");
			}
			this.$set("textTitleArray", arr);
			this.$set("sortImg", img_arr);
			this.$set("imgStatus", img_status_arr);
			this.$set("gridTitle", obj.gridTitle);
		},
		noDataBlock: function (flag) {
			this.noData = flag;
		},
		sendErrorF: function (flag) {
			this.sendError = flag;
		},
		chicangNewData() {
			// console.log('持仓')
			this.$refs.chicang.reQuery();
		},
		loadMore() {},
		titleTotal(obj) {
			this.textTitleArray = obj.textTitleArray;
			this.gridTitle = obj.gridTitle;
		},
		changeSort(num, flag, isTop) {
			console.log("排序之前", new Date());
			this._num_index = parseInt(num);
			var _status_index = this._num_index;
			var imgStatus;
			if (flag == true) {
				var imgStatusPaixu = JSON.parse(
					window.sessionStorage.getItem("imgStatusPaixu")
				);
				if (imgStatusPaixu) {
					imgStatusPaixu.forEach((i, idx) => {
						imgStatusPaixu[idx] =
							Number(imgStatusPaixu[idx]) - 1 + "";
					});
					imgStatus = imgStatusPaixu;
				}
			} else {
				imgStatus = this.imgStatus;
			}
			var _status = imgStatus[_status_index];
			var next_status = this.huoQuXiaGePaiXuTu(_status) + "";
			$(".qiangdiaoPx" + _status_index).css("color", "#444444");
			var result = [];
			this.textTitleArray.forEach(function (i, idx) {
				if (_status_index != idx) {
					result.push(idx);
				}
			});
			for (var i = 0; i < this.sortImg.length; i++) {
				if (i == this._num_index) {
					this.sortImg[i] = this.list_sort_img[next_status];
					this.imgStatus[i] = next_status;

					$("#paixu_" + i).attr("src", this.sortImg[i]);
					next_status == "0"
						? $(".qiangdiaoPx" + i).css("color", "#999999")
						: $(".qiangdiaoPx" + i).css("color", "#444444");
					result.forEach(function (i) {
						$(".qiangdiaoPx" + i).css("color", "#999999");
					});
					continue;
				}
				this.sortImg[i] = this.list_sort_img["0"];
				$("#paixu_" + i).attr("src", this.sortImg[i]);
				this.imgStatus[i] = "0";
			}
			window.sessionStorage.setItem(
				"imgStatusPaixu",
				JSON.stringify(this.imgStatus)
			);
			window.sessionStorage.setItem("_num_index", this._num_index);
			this.$broadcast(
				"child-changeSort",
				this._num_index,
				next_status,
				isTop
			);
		},
		// 获取点击排序图标后应变更为的排序图标信息
		huoQuXiaGePaiXuTu(num) {
			var next_num = 0;
			try {
				next_num = parseInt(num) + 1;
				var next_tubiao = this.list_sort_img[next_num];
				if (!next_tubiao) {
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
				return "left";
			}
			if (index == length - 1) {
				return "right";
			}
		},
		qudiaobaifenghao: function (val) {
			if (~val.indexOf("%")) {
				return val.replace(/%/, "").replace(/\(\)/, "");
			} else {
				return val;
			}
		},
	},
	events: {
		chicangNewData: function () {
			this.chicangNewData();
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../assets/less/variables.less";
@import "../../assets/less/mixins.less";
.content {
	-webkit-transform: translateZ(0px);
}
.classIfication {
	position: relative;
	height: 100%;

	p,
	span {
		font-weight: normal;
		text-align: center;
	}

	.title {
		width: 100%;
		font-size: 0;
		height: 0.7rem;
		line-height: 0.7rem;
		padding: 0 0.3rem;
		border-bottom: 1px solid #f3f3f3;
		color: #999;
		background-color: #ffffff;
		white-space: nowrap;
		font-family: PingFangSC-Regular;
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
		top: 0.7rem;
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
		width: 0.12rem;
		height: 0.24rem;
		margin: 0 0 -0.02rem 0rem;
	}
}
.classIfication .title p:nth-child(2) {
	width: 29% !important;
	padding-right: 0.2rem;
}
.classIfication .title p:nth-child(3) {
	width: 25% !important;
	padding-right: 0.2rem;
}
.classIfication .title p:nth-child(4) {
	width: 22% !important;
	// padding-right:0.15rem;
}
/*没有数据*/
.noData {
	text-align: center;
	padding-top: 1.5rem;
	color: #777777;
	font-size: 0.28rem;
}

.noData p {
	display: block;
}

.noData .block {
	font-size: 0.9rem;
	color: #919191;
}

.noData-img {
	display: block;
	margin: auto;
	height: 1.78rem;
}
</style>
