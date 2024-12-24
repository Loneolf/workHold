<template>
	<div class="table" id="chicanglist_content_div">
		<div
			v-for="(item, index) in gridData"
			:key="index"
			class="table-list"
			@click="listFunc(item)"
		>
			<div class="cc-piece">
				<p
					:class="item.name.length > 6 ? 'spanfont4' : ''"
					class="mingcheng"
				>
					{{ geshiValue(item.name, INDEX.STOCKNAMEINDEX, item) }}
				</p>
				<p class="shizhi">
					{{ geshiValue(item.shiZhi, INDEX.STOCKVALUEINDEX) }}
				</p>
			</div>
			<div class="cc-piece">
				<p
					:class="[
						parseFloat(item.yingKui) > 0
							? 'rise'
							: parseFloat(item.yingKui) < 0
							? 'fill'
							: '',
					]"
				>
					{{ geshiValue(item.yingKui, INDEX.YKINDEX) }}
				</p>

				<p
					:class="
						parseFloat(item.yingKuiLv) > 0
							? 'rise'
							: parseFloat(item.yingKuiLv) < 0
							? 'fill'
							: ''
					"
				>
					{{ item.yingKuiLv }}%
				</p>
			</div>
			<div class="cc-piece">
				<p>{{ geshiValue(item.chiCang, INDEX.STOCKNUMINDEX) }}</p>
				<p>{{ geshiValue(item.keYong, INDEX.KYINDEX) }}</p>
			</div>
			<div class="cc-piece">
				<p>{{ geshiValue(item.chengBen, INDEX.KEEPPRICEINDEX) }}</p>
				<p>{{ geshiValue(item.shiJia, INDEX.LASTPRICEINDEX) }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import GRID from "~u/GRID";
import dealUtil from "~u/dealUtil";
import service_ptjy from "~s/service_ptjy";
export default {
	props: ["viewname"],
	data() {
		return {
			gridData: [],
			originData: [],
			gridTitle: [],
			dateArray: [],
			chiCangChengBenXianShuJu: [],
			shiFouXinGu: [],
			paiXuZhi: [],
			loading: false,
			items: [],
			listNumber: 0,
			YKINDEX: "",
			YKLINDEX: "",
			INDEX: {
				STOCKCODEINDEX: "",
			},
			textTitleArray: [],
			pagecount: 1001,
			loadtype: this.pagecount,
			REREQ: false,
		};
	},
	mounted: function () {
		this.$nextTick(function () {
			this.gridData = [];
			this.gridTitle = [];
			this.dateArray = [];
			this.chiCangChengBenXianShuJu = [];
			this.loading = false;
			this.items = [];
			this.listNumber = 0;
			this.textTitleArray = [];
			this.INDEX = {
				STOCKCODEINDEX: "",
			};
			this.reQuery();
		});
	},
	methods: {
		geshiValue(name, index, item) {
			return dealUtil.formatZZDate(
				name,
				index,
				this.INDEX.ZZPINDEX,
				this.INDEX.DATEFORMINDEX
			);
		},
		initData(num) {
			this.gridData = [];
			this.listNumber = 0;
			this.loading = false;
			this.REREQ = false;
			this.loadtype = this.pagecount;
			this.loadMore(num);
		},
		reQuery(num) {
			this.initData(num);
		},
		wscroll() {
			var _this = this;
			$(".m-content-3")
				.off()
				.scroll(function () {
					if (_this.REREQ == true) {
						return;
					}
					(viewH = $(this).height()), //可见高度
						(contentH = $(this).get(0).scrollHeight), //内容高度
						(scrollTop = $(this).scrollTop()); //滚动高度
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
			this.loadtype = _this.pagecount - 1;
			this.listNamber += _this.loadtype;
			// this.loadMore();
		},
		loadMore() {
			var that = this;
			// 如果正在加载，则退出
			if (that.loading) {
				return;
			}
			that.loading = true;
			var oSendData = {
				//起始位置
				StartPos:
					that.listNumber == 0
						? that.listNumber
						: that.listNumber + 1,
				//最大条数
				// MaxCount: repoconfig.config.pagecount
				MaxCount: that.pagecount - 1,
				// MaxCount:1000
			};

			service_ptjy
				.require117(oSendData)
				.then((data) => {
					if (data.ERRORNO < 0) {
						$.hidePreloader();
						$(".modal").remove();
						that.gridData = []
						that.$emit("sendErrorF", true);
						return;
					}
					let oData = GRID.htmltitle(data, that.listNumber);
					that.YKINDEX = data.YKINDEX;
					that.YKLINDEX = data.YKLINDEX;

					if (that.listNumber === 0) {
						// data.GRID0 && data.GRID0.shift();
						that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
						that.INDEX.YKLINDEX = data.YKLINDEX;
						that.INDEX.DATEFORMINDEX = data.DATEFORMINDEX;
						that.INDEX.ZZPINDEX = data.ZZPINDEX;
						that.INDEX.STOCKNAMEINDEX = data.STOCKNAMEINDEX;
						that.INDEX.STOCKNAMELONGIDXINDEX =
							data.STOCKNAMELONGIDXINDEX;
						that.INDEX.STOCKCODE_TYPEINDEX =
							data.STOCKCODE_TYPEINDEX;
						that.INDEX.WTACCOUNTTYPEINDEX = data.WTACCOUNTTYPEINDEX;
						that.INDEX.STOCKNUMINDEX = data.STOCKNUMINDEX;
						that.INDEX.KYINDEX = data.KYINDEX;
						that.INDEX.KEEPPRICEINDEX = data.KEEPPRICEINDEX;
						that.INDEX.LASTPRICEINDEX = data.LASTPRICEINDEX;
						that.INDEX.STOCKVALUEINDEX = data.STOCKVALUEINDEX;
						that.INDEX.YKINDEX = data.YKINDEX;
						data.GRID0 && data.GRID0.shift();
						var obj = {
							textTitleArray: oData.dateTitle,
							gridTitle: oData.textTitle,
							dateArray: oData.dateArray,
						};
						that.$emit("headtitle", obj);
						if (!data.GRID0 || data.GRID0.length == 0) {
							$.hidePreloader();
							$(".modal").remove();
							that.$emit("noDataBlock", true);
							return;
						}
					}
					if (data.GRID0 && data.GRID0.length > 0) {
						that.$emit("noDataBlock", false);
						that.$emit("sendErrorF", false);
						var newData = [];
						var newDataArr = [];
						that.chiCangChengBenXianShuJu = [];
						data.GRID0.forEach(function (i, k) {
							var chiCangItem = {
								name: "",
								code: "",
								shiZhi: "",
								yingKui: "",
								yingKuiLv: "",
								chiCang: "",
								keYong: "",
								chengBen: "",
								shiJia: "",
								wtaccounttype: "",
							};
							var _item = data.GRID0[k];
							var _data_arr = _item.split("|");
							// console.log('_data_arr',_data_arr)
							that.chiCangChengBenXianShuJu.push({
								stockCode: _data_arr[data.STOCKCODEINDEX],
								stockName: _data_arr[data.STOCKNAMEINDEX],
								stockMarket: _data_arr[data.WTACCOUNTTYPEINDEX],
								chiCangPrice: _data_arr[data.KEEPPRICEINDEX],
								stbLayerFlag: _data_arr[data.STBLAYERFLAGINDEX],
							});
							// STOCKCODE_TYPEINDEX为证券类别 WTACCOUNTTYPEINDEX为市场类别,合起来判断是否为新三板的新股申购
							if (
								_data_arr[data.STOCKCODE_TYPEINDEX] == "4" &&
								_data_arr[data.WTACCOUNTTYPEINDEX] ==
									"SBACCOUNT" &&
								_data_arr[data.STOCKCODEINDEX].substr(0, 3) ==
									"889" &&
								parseInt(_data_arr[data.STOCKNUMINDEX]) > 0 &&
								parseInt(_data_arr[data.KYINDEX]) == 0
							) {
								that.shiFouXinGu.push(1);
							} else {
								that.shiFouXinGu.push(0);
							}
							var stockname_long_temp =
								_data_arr[data.STOCKNAMELONGIDXINDEX];
							var stockname_temp = _data_arr[data.STOCKNAMEINDEX];
							// chiCangItem.name = stockname_temp;
							if (
								stockname_long_temp &&
								stockname_long_temp.replace(/\s+/g, "").length >
									0
							) {
								_item = _item.replace(
									"|" + stockname_temp + "|",
									"|" + stockname_long_temp + "|"
								);
								data.GRID0[k] = _item;
								chiCangItem.name = stockname_long_temp;
							} else {
								chiCangItem.name = stockname_temp;
							}
							chiCangItem.code =
								_data_arr[
									data.STOCKINDEX || data.STOCKCODEINDEX
								];
							chiCangItem.yingKui = _data_arr[data.YKINDEX];
							chiCangItem.yingKuiLv = _data_arr[data.YKLINDEX];
							chiCangItem.chiCang = _data_arr[data.STOCKNUMINDEX];
							chiCangItem.keYong = _data_arr[data.KYINDEX];
							chiCangItem.chengBen =
								_data_arr[data.KEEPPRICEINDEX];
							chiCangItem.shiJia = _data_arr[data.LASTPRICEINDEX];
							chiCangItem.shiZhi =
								_data_arr[data.STOCKVALUEINDEX];

							chiCangItem.wtaccounttype =
								_data_arr[data.WTACCOUNTTYPEINDEX];
							chiCangItem.stockNamelong =
								_data_arr[data.STOCKNAMELONGIDXINDEX];
							chiCangItem.stockCodeType =
								_data_arr[data.STOCKCODE_TYPEINDEX];
							newDataArr.push(chiCangItem);
						});
						that.originData = JSON.parse(JSON.stringify(newDataArr));
						console.log("aaaanewDataArr", newDataArr);
						that.gridData = newDataArr

						if (!data.GRID0) {
							data.GRID0 = [];
						} else {
							that.loading = false;
						}

						that.$nextTick(function () {
							var _num_index =
								window.sessionStorage.getItem("_num_index");
							if (_num_index != null) {
								that.$parent.changeSort(_num_index, true, false);
							}
							that.$nextTick(function () {
								var tableCountScroll =window.sessionStorage.getItem("TABLECOUNT0");
								console.log("tableCountScroll", tableCountScroll);
								if (
									tableCountScroll &&
									tableCountScroll != "" &&
									tableCountScroll != null
								) {
									$("#chicanglist_div").scrollTop(
										tableCountScroll
									);
								} else {
									$("#chicanglist_div").scrollTop(0);
								}
							});
						});
					}
					$.hidePreloader();
					$(".modal").remove();
				})
				.catch((err) => {});
		},
		kuoweipanduanObj(stockType) {
			var kuoweiStockType_list = [
				"1",
				"2",
				"6",
				"A",
				"B",
				"J",
				"K",
				"L",
				"M",
				"N",
				"O",
				"T",
				"V",
				"i",
				"j",
				"k",
				"l",
				"r",
				"g",
				"e",
			];
			for (var v = 0; v < kuoweiStockType_list.length; v++) {
				if (kuoweiStockType_list[v] == stockType) {
					return "yes";
				}
			}
		},
		listFunc(item) {
			var _this = this;
			var stockcode = item.code;
			var wtaccounttype = item.wtaccounttype;
			var stockName = item.stockNamelong;
			_this.$nextTick(function () {
				$(".table-cont")[0].scrollTop = 0;
				window.nativeTopType = true;
				window.sessionStorage.setItem("TABLECOUNT0", 0);
				window.sessionStorage.setItem("FUNDTABLE3", 0);
				window.sessionStorage.setItem("CHEJINGCLAS2", 0);
				window.sessionStorage.setItem("WEITUOCLAS1", 0);
			});
		},
		setFontSize(grid) {
			var className = "";
			if (grid) {
				if (val.length > 6 || val1.length > 6) {
					className = "spanfont4";
				}
			}
			return className;
		},
		makeSort(sort_col, sort_type, isTop) {
			console.log("sort_type", sort_type);
			console.log("sort_col", sort_col);
			var sortValue = ["shiZhi", "yingKui", "chiCang", "chengBen"];
			if (isTop == true) {
				$("#chicanglist_div").scrollTop(0);
				window.sessionStorage.setItem("TABLECOUNT0", 0);
			}
			if (this.gridData.length > 1) {
				switch (sort_type) {
					case "0":
						this.gridData = JSON.parse(
							JSON.stringify(this.originData)
						);
						return;
					case "1":
						this.gridData.sort(function (a, b) {
							return (
								b[sortValue[sort_col]] - a[sortValue[sort_col]]
							);
						});
						return;
					case "2":
						this.gridData.sort(function (a, b) {
							return (
								a[sortValue[sort_col]] - b[sortValue[sort_col]]
							);
						});
						return;
					default:
						this.gridData = JSON.parse(
							JSON.stringify(this.originData)
						);
						return;
				}
			}
		},
	},
	filters: {
		isBuy(grid, ykl) {
			var className = "";
			if (grid && ykl) {
				var val = grid["yingKui"];
				if (parseFloat(val) > 0) {
					className = "rise";
				} else {
					className = "fill";
				}
			}
			return className;
		},

		valueKey(index, grid) {
			let str = grid ? grid.split("|")[index] : "";
			if (this.INDEX.YKLINDEX == index) {
				return str + "%";
			}
			if (this.INDEX.STOCKNAMEINDEX == index) {
				let str1 = grid
					? grid.split("|")[this.INDEX.STOCKNAMELONGIDXINDEX]
					: "";
				if (str1 && str1 !== " ") {
					return dealUtil.formatZZDate(
						str1,
						index,
						this.INDEX.ZZPINDEX,
						this.INDEX.DATEFORMINDEX
					);
				}
			}

			return dealUtil.formatZZDate(
				str,
				index,
				this.INDEX.ZZPINDEX,
				this.INDEX.DATEFORMINDEX
			);
		},
		showNewPic(index, grid) {
			let flag = 0;
			// STOCKCODE_TYPEINDEX为证券类别 WTACCOUNTTYPEINDEX为市场类别,合起来判断是否为新三板的新股申购
			if (
				(grid.length > 0 && index == this.INDEX.STOCKNAMEINDEX) ||
				true
			) {
				let items = grid.split("|");
				if (
					(items[this.INDEX.STOCKCODE_TYPEINDEX] == "4" &&
						items[this.INDEX.WTACCOUNTTYPEINDEX] == "SBACCOUNT") ||
					true
				) {
					flag = 1;
				}
			}
			return flag;
		},
		textAgline(index, length) {
			if (index == 0) {
				return "left";
			}
			if (index == length - 1) {
				return "right";
			}
		},
	},
	events: {
		"child-loadMore": function () {
			this.loadMore();
		},
		"child-changeSort": function (num_index, next_status, isTop) {
			this.makeSort(num_index, next_status, isTop);
		},
		"child-concatArr": function () {
			var gridDataAll = JSON.parse(JSON.stringify(this.gridDataAll));
			this.gridData = this.gridData.concat(
				gridDataAll.splice(this.gridData.length, 20)
			);
			console.log(this.gridData);
		},
	},
};
</script>
<style lang="less" scoped>
.spanfont1 {
	font-size: 0.67rem;
}

.spanfont2 {
	font-size: 0.63rem;
}

.spanfont3 {
	font-size: 0.6rem;
}

.spanfont4 {
	font-size: 10px;
}

.table{
    position: absolute;
    top: 36px;
    bottom: 0;
    overflow-y: scroll;
    width: 100%;
}

.table-list {
	display: flex;
	// font-size: 0.67rem;
	font-size: 0.28rem;
	// padding: 0.2rem 0.75rem;
	padding: 0.16rem 0.3rem;
	border-bottom: 1px solid #f3f3f3;
}

.table-list .cc-piece {
	color: #222222;
	font-family: PingFangSC-Medium;
	width: 25%;
}
.table-list .cc-piece p {
	text-align: right;
}

.table-list .cc-piece .mingcheng {
	text-align: left !important;
	font-family: PingFangSC-Regular;
	font-weight: 400;
}

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
.shizhi {
	text-align: left !important;
	color: #222222 !important;
	font-weight: 500 !important;
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
</style>

