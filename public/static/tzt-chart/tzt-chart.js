/**
 * Created by 中焯（Kite) on 2018/06/13.
 * parameter t 传入参数
 */
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

;(function ($) {
	// 创建一个线段生成器
	function svgLine(xScale, yScale, smooth) {
		var line = d3.svg.line().x(function (d) {
			return xScale(d[0]) + xScale.rangeBand() / 2;
		}).y(function (d) {
			return yScale(d[1]);
		});
		if (smooth) {
			// 生成平滑曲线
			line.interpolate('basis');
		}
		return line;
	};
	// 创建一个区域生成器
	function svgArea() {
		return d3.svg.area();
	};
	// 创建一个饼图渲染器
	function svgPie() {
		return d3.layout.pie();
	};

	var w = document.documentElement.clientWidth;
	// 绘图默认参数
	var series = {
		// 数据名称
		name: '',
		// 数据类型
		type: 'line',
		// 数据
		data: [],
		// 数据索引
		index: 0,
		// 柱间距 type等于'bar'时使用
		barGap: 2,
		// 是否显示柱上文字提示 type等于'bar'时使用
		isText: false,
		// 保留小数位数
		barDecimal: 2,
		// 数值与矩形之间的距离 type等于'bar'时使用
		textGap: [-w * .2 / 10, w * .48 / 10],
		// 柱子是否叠加 type等于'bar'时使用
		isSuperpose: false,
		// 折线颜色 type等于'line'时使用
		color: ['#999'],
		// 是否展示分隔区域颜色填充 type等于'line'时使用 使用分隔区域时不建议使用平滑曲线
		filler: false,
		// 分隔区域颜色 type等于'line'时使用
		fillerColor: ['#ccc'],
		// 是否添加圆点 type等于'line'时使用
		isDot: false,
		// 圆点半径 type等于'line'时使用
		radius: 4,
		// 是否空心 type等于'line'时使用
		isHollow: true,
		// 是否显示平滑曲线 type等于'line'时使用
		smooth: false,
		// 是否显示多空信号图表 type等于'k-line'时使用
		signal: false,
		// 昨收价 tips.type等于't-line'时使用
		close: 0,
	};
	// 画布默认留白
	var margin = {
		// 上
		top: w * .2 / 10,
		// 右
		right: w * .6 / 10,
		// 下
		bottom: w * .8 / 10,
		// 左
		left: w * .6 / 10
	};
	// x/y轴默认值
	var axis = {
		// 是否展示x/y轴
		show: true,
		// 是否展示x/y轴边线
		side: true,
		// 是否展示虚线
		dashed: false,
		// 坐标轴名称与轴线之间的距离
		nameGap: 0,
		// 缩放
		zoom: 0,
		// x/y轴数值回调
		callBackFn: null,
		// 是否使用默认水平对齐
		levelText: true,
	};
	// x轴默认值扩展
	var xExtend = {
		// x轴位移值
		shift: w * .8 / 10
	};
	// y轴默认值扩展
	var yExtend = {
		// y轴的位置 left,right
		float: 'left',
		// 坐标轴的分割段数
		split: 5,
		// 保留小数位数
		decimal: 0,
		// 是否使用nice
		isNice: true
	};
	// 提示层展示
	var tips = {
		// 是否展示提示
		show: true,
		// 提示类型
		type: 'base',
		// 是否显示x线
		xLine: false,
		// 是否显示y线
		yLine: false,
		// y线是否随动
		yCasual: false,
		// 字体颜色
		color: '#fff',
		// 背景颜色
		backgroundColor: 'rgba(64,158,255,.7)',
		// 提示回调
		callBackFn: null,
		// 是否展示图标
		isIcon: false,
	};

	// 加载比率图
	function ratioChartLoad(d) {
		// 构建svg画布
		addDom('', d.svg);
		// dom绑定
		var dom = d.svg.select('svg');
		// 刷新Dom
		dom.selectAll('g').remove();

		// 获取数据数组
		var value = [];
		var name = [];
		for (var i = 0; i < d.data.length; i++) {
			value.push(d.data[i].value);
		}
		// 最大数据
		var max = d3.max(value);

		// 初始高度
		var xNum = 0;
		// 单个高度
		var n = d.barHeight;
		// 空隙高度
		var m = d.barGap;

		for (var i = 0; i < d.data.length; i++) {
			var _ratioDom$append$attr;

			var di = d.data[i];
			var name = 'tzt-chart-ratio-' + i;
			// 生成比率图
			addDom(name, d.svg);
			var ratioDom = d.svg.select('.' + name).attr({
				transform: 'translate(0,' + xNum + ')'
			});

			var mainWidth = d.width - d.left - d.right;

			ratioDom.append('text').attr((_ratioDom$append$attr = {
				class: 'tzt-chart-ratio-text text-middle',
				x: d.left,
				y: m / 2 + d.fontSize / 2 + 2,
				fill: d.colorBar,
				// 字体过长时等比缩小
				'font-size': d.fontSize * (mainWidth > widthFn(di.name, d.fontSize) ? 1 : mainWidth / widthFn(di.name, d.fontSize))
			}, _defineProperty(_ratioDom$append$attr, 'fill', d.colorSize), _defineProperty(_ratioDom$append$attr, 'data-info', JSON.stringify(di)), _ratioDom$append$attr)).text(di.name + (di.code ? '(' + di.code + ')' : ''));
			ratioDom.append('rect').attr({
				x: d.left,
				y: m,
				width: mainWidth * di.value / max,
				height: d.barHeight,
				fill: d.colorBar
			});

			var xText = d.left + mainWidth * di.value / max - widthFn(di.value, d.fontSize) - d.fontSize / 2;
			var color = '#fff';
			if (mainWidth / 3 > mainWidth * di.value / max) {
				xText = d.left + mainWidth * di.value / max + d.fontSize / 2;
				color = d.colorBar;
			}
			ratioDom.append('text').attr({
				class: 'text-middle',
				x: xText,
				y: m + n / 2,
				'font-size': d.fontSize,
				fill: color
			}).text(di.value + '%');

			xNum += n + m;
		}

		// 画布尺寸
		d.svg.select('svg').attr({
			// 画布宽度
			width: d.width,
			// 画布高度
			height: xNum
		});
		// 外部盒子高度回调
		d.boxHeightFn && d.boxHeightFn(xNum);

		// 模块点击回调
		$('.tzt-chart-ratio-text').off().on('click', function () {
			var _info = $(this).attr('data-info');
			// 点击回调
			d.callBackFn && d.callBackFn(_info);
		});
	}

	// 加载关联图
	function relateChartLoad(d) {
		// console.log(d);
		// 构建svg画布
		addDom('', d.svg);

		// 初始高度
		var xNum = 0;
		// 单个高度
		var n = d.singleHeight;
		// 空隙高度
		var m = w * .16 / 10;

		for (var x in d.data) {
			var dx = d.data[x];

			var name = 'tzt-chart-relate-' + x;

			var baseType = 'left';

			var leftNum = 0,
				rightNum = 0,
				leftHeight = 0,
				rightHeight = 0;
			// 生成关联图节点
			addDom(name, d.svg);

			xNum += w * .4 / 10;

			// dom绑定
			var relateDom = d.svg.select('.' + name).attr({
				transform: 'translate(0,' + xNum + ')'
			});
			// 刷新Dom
			relateDom.selectAll('g').remove();
			relateDom.selectAll('path').remove();
			relateDom.selectAll('circle').remove();

			// 展示数据长度
			if (d.isBreviary) {
				leftNum = dx.left.length > d.leftNum ? d.leftNum + 1 : dx.left.length;
				rightNum = dx.right.length > d.rightNum ? d.rightNum + 1 : dx.right.length;
			} else {
				leftNum = dx.left.length;
				rightNum = dx.right.length;
			}

			// 每组数据高度
			leftHeight = leftNum * (n + m) - m;
			rightHeight = rightNum * (n + m) - m;

			// 获取累加高度
			if (leftNum < rightNum) {
				baseType = 'right';
				xNum += rightHeight;
			} else {
				xNum += leftHeight;
			}

			// 曲线x、y轴中心点
			var xCore = (d.width - d.left - d.right - d.leftWidth - d.rightWidth) / 2 + d.left + d.leftWidth,
				yCore = baseType == 'left' ? leftHeight / 2 : rightHeight / 2;

			// 左侧加载
			var t = 0;
			if (baseType == 'right') {
				t = (rightHeight / leftNum - n) / 2;
			}
			for (var i = 0; i < leftNum; i++) {
				var di = dx.left[i];
				// 小模块加载
				relateDom.append('g').attr({
					class: name + '-lift' + i,
					transform: 'translate(' + d.left + ',' + t + ')'
				});
				// 左侧曲线加载
				var M = 'M ' + (d.leftWidth + d.left) + ' ' + (t + n / 2);
				var Q = 'Q ' + (d.leftWidth + d.left + (xCore - (d.leftWidth + d.left)) / 4) + ' ' + (t + n / 2) + ' ' + (d.leftWidth + d.left + (xCore - (d.leftWidth + d.left)) / 2) + ' ' + (yCore > t + n / 2 ? t + n / 2 + Math.abs(yCore - (t + n / 2)) / 2 : yCore + Math.abs(yCore - (t + n / 2)) / 2);
				var T = 'T ' + xCore + ' ' + yCore;
				relateDom.append('path').attr({
					d: M + Q + T,
					stroke: d.lineColor
				});

				// 小模块绑定
				var relateLeftDom = d.svg.select('.' + name + '-lift' + i);
				// 背景加载
				relateLeftDom.append('rect').attr({
					x: 0,
					y: 0,
					rx: 4,
					ry: 4,
					width: d.leftWidth,
					height: d.singleHeight,
					fill: d.leftBackgroundColor
				});
				// 文本加载
				relateLeftDom.append('text').attr({
					class: 'tzt-chart-relate-text text-left-' + x + '' + i,
					x: d.leftWidth / 2,
					y: d.singleHeight / 2,
					'data-info': JSON.stringify(d.leftNum < leftNum && i == d.leftNum ? dx : dx.left[i]),
					'data-type': d.leftNum < leftNum && i == d.leftNum ? 'more' : 'info',
					'data-float': 'left'
				});
				// 文本绑定
				var relateLeftTextDom = d.svg.select('.text-left-' + x + '' + i);
				// 内部文本处理
				if (di.code) {
					if (d.isBreviary && d.leftNum < leftNum && i == d.leftNum) {
						relateLeftTextDom.append('tspan').attr({
							class: 'text-middle',
							x: d.leftWidth / 2,
							y: d.singleHeight / 2,
							'text-anchor': 'middle',
							'fill': d.leftSizeColor,
							'font-size': w * .28 / 10
						}).text('查看全部' + dx.left.length + '家');
					} else {
						relateLeftTextDom.append('tspan').attr({
							class: 'text-middle',
							x: d.leftWidth / 2,
							y: d.singleHeight / 2 - d.leftNameSize / 2,
							'text-anchor': 'middle',
							'fill': d.leftSizeColor,
							'font-size': d.leftNameSize
						}).text(di.name);
						relateLeftTextDom.append('tspan').attr({
							class: 'text-middle',
							x: d.leftWidth / 2,
							y: d.singleHeight / 2 + d.leftCodeSize / 2 + w * .14 / 10,
							'text-anchor': 'middle',
							'fill': d.leftSizeColor,
							'font-size': d.leftCodeSize
						}).text(di.code);
					}
				} else {
					// 字体长度处理
					var aLn = sizeLengthFn(d.leftWidth, d.leftNameSize, di.name);
					var arr = [];
					if (1 == aLn.length) {
						arr.push(d.singleHeight * .5);
					} else if (2 == aLn.length) {
						arr.push(d.singleHeight * .5 - d.leftNameSize * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize * .5);
					} else if (3 == aLn.length) {
						arr.push(d.singleHeight * .5 - d.leftNameSize);
						arr.push(d.singleHeight * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize);
					} else if (4 == aLn.length) {
						arr.push(d.singleHeight * .5 - d.leftNameSize * 1.5);
						arr.push(d.singleHeight * .5 - d.leftNameSize * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize * 1.5);
					}
					for (var j = 0; j < aLn.length; j++) {
						var dj = aLn[j];
						relateLeftTextDom.append('tspan').attr({
							class: 'text-middle',
							x: 4,
							y: arr[j],
							'text-anchor': 'start',
							'fill': d.leftSizeColor,
							'font-size': d.leftNameSize
						}).text(dj);
					}
				}
				if (baseType == 'right') {
					t += rightHeight / leftNum;
				} else {
					t += n + m;
				}
			}

			// 右侧加载
			var f = 0;
			if (baseType == 'left') {
				f = (leftHeight / rightNum - n) / 2;
			}
			for (var i = 0; i < rightNum; i++) {
				var di = dx.right[i];
				// 小模块加载
				relateDom.append('g').attr({
					class: name + '-right' + i,
					transform: 'translate(' + (d.width - d.right - d.rightWidth) + ',' + f + ')'
				});
				// 右侧曲线加载
				var M = 'M ' + xCore + ' ' + yCore;
				var Q = 'Q ' + (xCore + (d.width - d.right - d.rightWidth - xCore) / 4) + ' ' + yCore + ' ' + (xCore + (d.width - d.right - d.rightWidth - xCore) / 2) + ' ' + (yCore > f + n / 2 ? f + n / 2 + Math.abs(yCore - (f + n / 2)) / 2 : yCore + Math.abs(yCore - (f + n / 2)) / 2);
				var T = 'T ' + (d.width - d.right - d.rightWidth - (d.isIcon ? w * .2 / 10 : 0)) + ' ' + (f + n / 2);
				relateDom.append('path').attr({
					d: M + Q + T,
					stroke: d.lineColor
				});
				// 是否展示图标
				if (d.isIcon) {
					relateDom.append('circle').attr({
						cx: d.width - d.right - d.rightWidth - w * .2 / 10,
						cy: f + n / 2,
						r: w * .2 / 10,
						fill: d.isIconColor[0]
					});
					relateDom.append('circle').attr({
						cx: d.width - d.right - d.rightWidth - w * .2 / 10,
						cy: f + n / 2,
						r: w * .1 / 10,
						fill: d.isIconColor[1]
					});
				}
				// 小模块绑定
				var relateRightDom = d.svg.select('.' + name + '-right' + i);
				// 背景加载
				relateRightDom.append('rect').attr({
					x: 0,
					y: 0,
					rx: 4,
					ry: 4,
					width: d.rightWidth,
					height: d.singleHeight,
					fill: d.rightBackgroundColor,
					stroke: d.rightBorderColor ? d.rightBorderColor : 'none'
				});
				// 文本加载
				relateRightDom.append('text').attr({
					class: 'tzt-chart-relate-text text-right-' + x + '' + i,
					x: d.rightWidth / 2,
					y: d.singleHeight / 2,
					'data-info': JSON.stringify(d.rightNum < rightNum && i == d.rightNum ? dx : dx.right[i]),
					'data-type': d.rightNum < rightNum && i == d.rightNum ? 'more' : 'info',
					'data-float': 'right'
				});
				// 文本绑定
				var relateRightTextDom = d.svg.select('.text-right-' + x + '' + i);
				// 内部文本处理
				if (di.code) {
					if (d.isBreviary && d.rightNum < rightNum && i == d.rightNum) {
						relateRightTextDom.append('tspan').attr({
							class: 'text-middle',
							x: d.rightWidth / 2,
							y: d.singleHeight / 2,
							'text-anchor': 'middle',
							'fill': d.rightSizeColor,
							'font-size': w * .28 / 10
						}).text('查看全部' + dx.right.length + '家');
					} else {
						relateRightTextDom.append('tspan').attr({
							class: 'text-middle',
							x: d.rightWidth / 2,
							y: d.singleHeight / 2 - d.rightNameSize / 2,
							'text-anchor': 'middle',
							'fill': d.rightSizeColor,
							'font-size': d.rightNameSize
						}).text(di.name);
						relateRightTextDom.append('tspan').attr({
							class: 'text-middle',
							x: d.rightWidth / 2,
							y: d.singleHeight / 2 + d.rightCodeSize / 2 + w * .14 / 10,
							'text-anchor': 'middle',
							'fill': d.rightSizeColor,
							'font-size': d.rightCodeSize
						}).text(di.code);
					}
				} else {
					// 字体长度处理
					var aLn = sizeLengthFn(d.rightWidth, d.rightNameSize, di.name);
					var arr = [];
					if (1 == aLn.length) {
						arr.push(d.singleHeight * .5);
					} else if (2 == aLn.length) {
						arr.push(d.singleHeight * .5 - d.leftNameSize * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize * .5);
					} else if (3 == aLn.length) {
						arr.push(d.singleHeight * .5 - d.leftNameSize);
						arr.push(d.singleHeight * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize);
					} else if (4 == aLn.length) {
						arr.push(d.singleHeight * .5 - d.leftNameSize * 1.5);
						arr.push(d.singleHeight * .5 - d.leftNameSize * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize * .5);
						arr.push(d.singleHeight * .5 + d.leftNameSize * 1.5);
					}
					for (var j = 0; j < aLn.length; j++) {
						var dj = aLn[j];
						relateRightTextDom.append('tspan').attr({
							class: 'text-middle',
							x: 4,
							y: arr[j],
							'text-anchor': 'start',
							'fill': d.rightSizeColor,
							'font-size': d.rightNameSize
						}).text(dj);
					}
				}
				if (baseType == 'left') {
					f += leftHeight / rightNum;
				} else {
					f += n + m;
				}
			}
		}

		// 外部盒子高度回调
		d.boxHeightFn && d.boxHeightFn(xNum);

		// 画布尺寸
		d.svg.select('svg').attr({
			// 画布宽度
			width: d.width,
			// 画布高度
			height: xNum
		});

		// 模块点击回调
		$('.tzt-chart-relate-text').off().on('click', function () {
			var _info = $(this).attr('data-info');
			var _type = $(this).attr('data-type');
			var _float = $(this).attr('data-float');
			// 点击回调
			d.callBackFn && d.callBackFn(_info, _type, _float);
		});
	}

	// 加载高管图
	function governorChartLoad(d) {
		// console.log(d);
		// 构建svg画布
		addDom('', d.svg);

		// 初始高度
		var xNum = 0;
		// 单个高度
		var n = d.rightHeight;
		// 空隙高度
		var m = w * .64 / 10;

		for (var i = 0; i < d.data.length; i++) {
			var di = d.data[i];

			var name = 'tzt-chart-governor-' + i;
			// 生成关联图节点
			addDom(name, d.svg);
			// dom绑定
			var governorDom = d.svg.select('.' + name).attr({
				transform: 'translate(0,' + xNum + ')'
			});

			xNum += m;

			var rightNum = 0,
				rightHeight = 0;

			var middleWidth = d.width - d.left - d.leftWidth - d.rightWidth - d.right;

			// 是否展示简图
			if (d.isBreviary) {
				rightNum = di.info.length >= 2 ? 2 : di.info.length;

				di.info.sort(function (a, b) {
					if (a.code == d.code) {
						return 0;
					} else {
						return 1;
					}
				});
			} else {
				rightNum = di.info.length;
			}
			rightHeight = rightNum * (n + m) - m;

			xNum += rightHeight;

			// 基础交汇点
			var xCore = d.left + d.leftWidth / 2,
				yCore = rightHeight / 2;

			/* ---------- 右侧 ---------- */
			var y = 0;
			for (var j = 0; j < rightNum; j++) {
				var dj = di.info[j];
				// 小模块加载
				governorDom.append('g').attr({
					class: name + '-right' + j,
					transform: 'translate(' + (d.width - d.right - d.rightWidth) + ',' + y + ')'
				});
				// 折线加载
				var M = 'M ' + xCore + ' ' + yCore;
				var L = 'L ' + xCore + ' ' + (y + d.rightHeight / 2) + 'L ' + (d.width - d.rightWidth - d.right) + ' ' + (y + d.rightHeight / 2);
				governorDom.append('path').attr({
					d: M + L,
					stroke: d.lineColor
				});

				var post = d.isBreviary && j > 0 ? '其他' : dj.post;

				// 背景加载
				governorDom.append('rect').attr({
					x: d.left + d.leftWidth + middleWidth / 2 - (w * .32 / 10 * post.length + 10) / 2,
					y: y + d.rightHeight / 2 - w * .2 / 10,
					width: w * .32 / 10 * post.length + 10,
					height: w * .4 / 10,
					fill: '#fff'
				});
				// 职位
				governorDom.append('text').attr({
					class: 'text-centre text-middle',
					x: d.left + d.leftWidth + middleWidth / 2,
					y: y + d.rightHeight / 2,
					'fill': '#333',
					'font-size': w * .32 / 10
				}).text(post);

				// 小模块绑定
				var governorRightDom = d.svg.select('.' + name + '-right' + j);
				// 背景加载
				governorRightDom.append('rect').attr({
					x: 0,
					y: 0,
					rx: 4,
					ry: 4,
					width: d.rightWidth,
					height: d.rightHeight,
					fill: d.rightBackgroundColor,
					stroke: d.rightBorderColor ? d.rightBorderColor : 'none'
				});
				// 文本加载
				governorRightDom.append('text').attr({
					class: 'tzt-chart-governor-text text-right-' + i + '' + j,
					x: d.rightWidth / 2,
					y: d.rightHeight / 2,
					'data-info': JSON.stringify(d.isBreviary && j > 0 ? di : dj),
					'data-type': d.isBreviary && j > 0 ? 'more' : 'info',
					'data-float': 'right'
				});
				// 文本绑定
				var governorRightTextDom = d.svg.select('.text-right-' + i + '' + j);

				if (d.isBreviary && j > 0) {
					governorRightTextDom.append('tspan').attr({
						class: 'text-centre text-middle',
						x: d.rightWidth / 2,
						y: d.rightHeight / 2 - d.rightNameSize / 2,
						'fill': d.rightSizeColor,
						'font-size': d.rightNameSize
					}).text('其他');
					governorRightTextDom.append('tspan').attr({
						class: 'text-centre text-middle',
						x: d.rightWidth / 2,
						y: d.rightHeight / 2 + d.rightCodeSize / 2 + w * .14 / 10,
						'fill': d.rightSizeColor,
						'font-size': d.rightCodeSize
					}).text(di.info.length - 1 + '家公司任职');
				} else {
					governorRightTextDom.append('tspan').attr({
						class: 'text-centre text-middle',
						x: d.rightWidth / 2,
						y: d.rightHeight / 2 - d.rightNameSize / 2,
						'fill': d.rightSizeColor,
						'font-size': d.rightNameSize
					}).text(dj.name);
					governorRightTextDom.append('tspan').attr({
						class: 'text-centre text-middle',
						x: d.rightWidth / 2,
						y: d.rightHeight / 2 + d.rightCodeSize / 2 + w * .14 / 10,
						'fill': d.rightSizeColor,
						'font-size': d.rightCodeSize
					}).text(dj.code);
				}

				y += n + m;
			}

			/* ---------- 左侧 ---------- */
			// 小模块加载
			governorDom.append('g').attr({
				class: name + '-left' + i,
				transform: 'translate(' + d.left + ',' + (rightHeight / 2 - d.leftHeight / 2) + ')'
			});
			// 小模块绑定
			var governorLeftDom = d.svg.select('.' + name + '-left' + i);
			// 背景加载
			governorLeftDom.append('rect').attr({
				x: 0,
				y: 0,
				rx: d.leftRadius,
				ry: d.leftRadius,
				width: d.leftWidth,
				height: d.leftHeight,
				fill: d.leftBackgroundColor
			});
			// 文本加载
			governorLeftDom.append('text').attr({
				class: 'text-centre text-middle',
				x: d.leftWidth / 2,
				y: d.leftHeight / 2,
				'fill': d.leftSizeColor,
				'font-size': d.leftNameSize * (d.leftWidth > widthFn(di.name, d.leftNameSize) ? 1 : d.leftWidth / widthFn(di.name, d.leftNameSize))
			}).text(di.name);
		}

		// 外部盒子高度回调
		d.boxHeightFn && d.boxHeightFn(xNum);

		// 画布尺寸
		d.svg.select('svg').attr({
			// 画布宽度
			width: d.width,
			// 画布高度
			height: xNum
		});

		// 模块点击回调
		$('.tzt-chart-governor-text').off().on('click', function () {
			var _info = $(this).attr('data-info');
			var _type = $(this).attr('data-type');
			var _float = $(this).attr('data-float');
			// 点击回调
			d.callBackFn && d.callBackFn(_info, _type, _float);
		});
	}

	// 字体长度处理
	function sizeLengthFn(width, size, name) {
		var s = '',
			a = [],
			n = 0;
		var regular = /^[\u4e00-\u9fa5]+$/;
		for (var i = 0; i < name.length; i++) {
			if (regular.test(name[i])) {
				n += size;
			} else {
				n += size / 2;
			}
			if (width > n) {
				s += name[i];
				if (i == name.length - 1) {
					a.push(s);
				}
			} else {
				a.push(s);
				s = name[i];
				if (regular.test(name[i])) {
					n = size;
				} else {
					n = size / 2;
				}
				if (i == name.length - 1) {
					a.push(s);
				}
			}
		}
		return a;
	}

	// 加载饼图
	function pieChartLoad(d) {
		// console.log(d);
		// 构建svg画布
		addDom('', d.svg);
		// 画布尺寸
		d.svg.select('svg').attr({
			// 画布宽度
			width: d.width,
			// 画布高度
			height: d.width
		});
		var dom = d.svg.select('svg');

		var color = [];
		for (var i = 0; i < d.data.length; i++) {
			var di = d.data[i];
			color.push(di.color);
		}

		// 生产饼图渲染器
		var pie = svgPie().sort(null).value(function (t) {
			return t.value;
		});
		// 饼图赋值-数据转换
		var piedata = pie(d.data);

		var arc = d3.svg.arc() // 弧生成器
		.innerRadius(d.innerRadius) // 设置内半径
		.outerRadius(d.outerRadius); // 设置外半径

		var arcs = dom.selectAll('g').data(piedata).enter().append('g').attr({
			transform: 'translate(' + d.width / 2 + ', ' + d.width / 2 + ')'
		});

		arcs.append('path').attr({
			d: function (t) {
				return arc(t); //调用弧生成器，得到路径值
			},
			style: function (t, i) {
				return 'fill:' + color[i];
			}
		});
	}

	// 特殊图表处理
	function chartTypeFn(o, that) {
		// 绘制比率图
		if (o.type == 'ratioChart') {
			// 比率图默认参数
			var config = {
				// 画布宽度
				width: document.documentElement.clientWidth,
				// 左侧留空
				left: w * .4 / 10,
				// 右侧留空
				right: w * .4 / 10,
				// 数据
				data: [],
				// 柱形高度
				barHeight: w * .5 / 10,
				// 字体大小
				fontSize: w * .30 / 10,
				// 字体颜色
				colorSize: '#333',
				// 矩形颜色
				colorBar: '#ff8840',
				// 矩形内文字回调
				textBarFn: null,
				// 矩形间留空
				barGap: w * .88 / 10,
				// 点击回调
				callBackFn: null,
				// 外部盒子高度回调
				boxHeightFn: null
			};
			var ratio = $.extend({}, config, o);
			ratio.svg = d3.select(that.selector);
			if (ratio.data.length == 0) {
				console.log('data不能为空');return;
			}
			// 加载比率图
			ratioChartLoad(ratio);
			return true;
		}
		// 绘制关联图
		if (o.type == 'relateChart') {
			// 比率图默认参数
			var config = {
				// 画布宽度
				width: document.documentElement.clientWidth,
				// 是否展示简图
				isBreviary: true,
				// 左侧留空
				left: w * .4 / 10,
				// 右侧留空
				right: w * .4 / 10,
				// 数据
				data: [],
				// 左侧宽度
				leftWidth: w * 2 / 10,
				// 左侧简图个数
				leftNum: 999,
				// 左侧name对象字体大小
				leftNameSize: w * .4 / 10,
				// 左侧code对象字体大小
				leftCodeSize: w * .32 / 10,
				// 左侧字体颜色
				leftSizeColor: '#333',
				// 左侧背景颜色
				leftBackgroundColor: '#fff',
				// 右侧宽度
				rightWidth: w * 2 / 10,
				// 左侧简图个数
				rightNum: 999,
				// 右侧name对象字体大小
				rightNameSize: w * .4 / 10,
				// 右侧code对象字体大小
				rightCodeSize: w * .32 / 10,
				// 右侧字体颜色
				rightSizeColor: '#333',
				// 右侧背景颜色
				rightBackgroundColor: '#fff',
				// 右侧边框颜色
				rightBorderColor: '',
				// 单体高度
				singleHeight: w * 1.32 / 10,
				// 线条颜色
				lineColor: '#333',
				// 是否展示图标
				isIcon: false,
				// 图标颜色
				isIconColor: ['rgba(255,136,64,.2)', '#ff8840'],
				// 点击回调
				callBackFn: null,
				// 外部盒子高度回调
				boxHeightFn: null
			};
			var relate = $.extend({}, config, o);
			relate.svg = d3.select(that.selector);
			if (relate.data.length == 0) {
				console.log('data不能为空');return;
			}
			// 加载关联图
			relateChartLoad(relate);
			return true;
		}
		// 绘制高管图
		if (o.type == 'governorChart') {
			// 高管图默认参数
			var config = {
				// 画布宽度
				width: document.documentElement.clientWidth,
				// 是否展示简图
				isBreviary: true,
				// 左侧留空
				left: w * .4 / 10,
				// 右侧留空
				right: w * .4 / 10,
				// 数据
				data: [],
				// 公司代码
				code: '',
				// 左侧宽度
				leftWidth: w * 2 / 10,
				// 左侧高度
				leftHeight: w * 2 / 10,
				// 左侧name对象字体大小
				leftNameSize: w * .4 / 10,
				// 左侧字体颜色
				leftSizeColor: '#fff',
				// 左侧圆角弧度
				leftRadius: w * .4 / 10,
				// 左侧背景颜色
				leftBackgroundColor: '#ff8840',
				// 右侧宽度
				rightWidth: w * 2 / 10,
				// 右侧高度
				rightHeight: w * 2 / 10,
				// 右侧name对象字体大小
				rightNameSize: w * .4 / 10,
				// 右侧code对象字体大小
				rightCodeSize: w * .32 / 10,
				// 右侧字体颜色
				rightSizeColor: '#333',
				// 右侧背景颜色
				rightBackgroundColor: '#fff',
				// 右侧边框颜色
				rightBorderColor: '',
				// 线条颜色
				lineColor: '#ff8840',
				// 点击回调
				callBackFn: null,
				// 外部盒子高度回调
				boxHeightFn: null
			};
			var governor = $.extend({}, config, o);
			governor.svg = d3.select(that.selector);
			if (governor.data.length == 0) {
				console.log('data不能为空');return;
			}
			// 加载高管图
			governorChartLoad(governor);
			return true;
		}
		// 饼图绘制
		if (o.type == 'pie') {
			// 饼图默认参数
			var config = {
				// 画布宽度
				width: document.documentElement.clientWidth / 2,
				// 外半径
				outerRadius: document.documentElement.clientWidth / 4,
				// 内半径
				innerRadius: document.documentElement.clientWidth / 8,
				// 数据
				data: [],
			};
			var pie = $.extend({}, config, o);
			pie.svg = d3.select(that.selector);
			if (pie.data.length == 0) {
				console.log('data不能为空');return;
			}
			// 加载饼图
			pieChartLoad(pie);
			return true;
		}
		return false;
	}
	/*
 * o.type 比率图-'ratioChart' 关联图-'relateChart' 高管图-'governorChart' 饼图-'pie'
  */
	$.fn.tztChart = function (o) {
		// 检测用户传进来的参数是否合法
		if (!isValid(o)) {
			return this;
		}

		var that = $(this);
		// 特殊图表
		if (chartTypeFn(o, that)) {
			return;
		}

		// 画布尺寸
		var main = {
			// 画布宽度
			width: document.documentElement.clientWidth,
			// 画布比率-宽高比
			ratio: .5
		};
		// 获取画布尺寸
		main = changeFn('main', main, o.main);
		// 绘图参数
		var data = changeFn('', series, o.series);
		for (var i = 0; i < data.length; i++) {
			if (data[i].data.length == 0) {
				console.log($(this).selector);
				$($(this).selector).html('<span class="tzt-none">今日无数据！</span>');
				console.log('series.data不能为空');return;
			} else if ($($(this).selector + ' span').hasClass('tzt-none')) {
				$($(this).selector + ' span').remove();
			}
		}
		// 数据处理-获取最大/最小值
		var a = dataDeal(data);
		// 获取画布留白
		var margins = changeFn('', $.extend({}, margin, main[0]), o.margin, a);
		// x轴参数
		var xAxis = changeFn('x', $.extend({}, xExtend, axis), o.xAxis, a, margins);
		// y轴参数
		var yAxis = changeFn('y', $.extend({}, yExtend, axis), o.yAxis, a, margins);
		// 提示层参数
		var t = changeFn('', tips, o.tips, a)[0];

		// 绑定svg
		main[0].svg = d3.select($(this).selector);
		// 构建svg画布
		addDom('', main[0].svg);
		main[0].svg.select('svg').attr({
			width: main[0].width,
			height: main[0].height
		});

		// 基础dom构建
		baseDom(main[0].svg, margins, xAxis, yAxis, data, t);
	};
	/*
 * @name 基础dom构建
 * @svg  绘制图表父级
 * @m    画布留白及长宽尺寸
 * @x    画布x坐标系参数
 * @y    画布y坐标系参数
 * @d    画布绘制内容
 * @t    画布提示层
  */
	function baseDom(svg, m, x, y, d, t) {
		var xIndex = [];
		// 构建x轴
		for (var i = 0; i < x.length; i++) {
			var name = 'tzt-axis-x-' + i;
			if (x[i].show) {
				xIndex.push(i);
				// 生成x轴
				addDom(name, svg, ['line']);
				// 构建坐标轴
				axisFn(svg, m[i], x[i], name);
			}
		}
		// 清除x轴
		removeDom('tzt-axis-x', svg, xIndex);

		var yIndex = [];
		// 构建y轴
		for (var i = 0; i < y.length; i++) {
			var name = 'tzt-axis-y-' + i;
			if (y[i].show) {
				yIndex.push(i);
				// 生成y轴
				addDom(name, svg, ['line']);
				// 构建坐标轴
				axisFn(svg, m[i], x[i], name, y[i]);
			}
		}
		// 清除y轴
		removeDom('tzt-axis-y', svg, yIndex);

		var barLn = {};
		if (JSON.stringify(d).indexOf('bar') > 0) {
			for (var i = 0; i < d.length; i++) {
				if (d[i].type == 'bar') {
					if (!barLn[d[i].index]) {
						barLn[d[i].index] = {};
						barLn[d[i].index]['n'] = [];
						barLn[d[i].index]['n'].push(i);
						barLn[d[i].index]['index'] = -1;
					} else {
						barLn[d[i].index]['n'].push(i);
					}
				}
			}
		}

		var barIndex = [];
		var lineIndex = [];
		var lineFillerIndex = [];
		var kLineIndex = [];
		var kLineSignalIndex = [];
		// 构建图表
		for (var i = 0; i < d.length; i++) {
			var name = '';
			if (d[i].type == 'bar') {
				name = 'tzt-chart-bar-' + i;
				barIndex.push(i);
				barLn[d[i].index]['index']++;
				if (d[i].isSuperpose) {
					barLn[d[i].index]['index'] = 0;
					barLn[d[i].index]['n'] = [0];
				}
			}
			if (d[i].type == 'line') {
				name = 'tzt-chart-line-' + i;
				lineIndex.push(i);
				if (d[i].filler) {
					var fillerName = 'tzt-chart-line-filler-' + i;
					lineFillerIndex.push(i);
					// 生成折线分隔区域
					addDom(fillerName, svg);
					// 构建图表-折线分隔区域
					chartFn(svg, m[d[i].index], x[d[i].index], y[d[i].index], d[i], fillerName);
				}
			}
			if (d[i].type == 'k-line') {
				name = 'tzt-chart-kline-' + i;
				kLineIndex.push(i);
				if (d[i].signal) {
					var signalName = 'tzt-chart-kline-signal-' + i;
					kLineSignalIndex.push(i);
					// 生成折线分隔区域
					addDom(signalName, svg);
					// 构建图表-多空信号
					chartFn(svg, m[d[i].index], x[d[i].index], y[d[i].index], d[i], signalName);
				}
			}
			// 生成图表
			addDom(name, svg);
			// 构建图表
			chartFn(svg, m[d[i].index], x[d[i].index], y[d[i].index], d[i], name, barLn);
		}
		// 清除图表-柱形图
		removeDom('tzt-chart-bar', svg, barIndex);
		// 清除图表-折线图
		removeDom('tzt-chart-line', svg, lineIndex);
		// 清除图表-折线图分隔区域
		removeDom('tzt-chart-line-filler', svg, lineFillerIndex);
		// 清除图表-K线图
		removeDom('tzt-chart-kline', svg, kLineIndex);
		// 清除图表-K线多空信号
		removeDom('tzt-chart-kline-signal', svg, kLineSignalIndex);

		if (t.show) {
			if (t.type == 't-line') {
				// 生成分时定点提示层
				addDom('tzt-chart-k-line-text', svg);
				tipsTopFn(svg, d);
			} else {
				// 清除分时定点提示层
				removeDom('tzt-chart-k-line-text', svg);
			}
			svg.on({
				touchstart: function () {
					var _this = $(this),
						_axis = d3.mouse(this);

					if (_this.find('.tzt-tips-text').css('display') == 'inline') {
						tipsAddFn('remove');
						tipsTopFn(svg, d);
					} else {
						// 提示dom添加/删除
						tipsAddFn('add');
						// 提示信息处理
						tipsFn(svg, m, x, y, d, t, _axis);
					}
				},
				touchmove: function () {
					var _this = $(this),
						_axis = d3.mouse(this);

					// 提示dom添加/删除
					tipsAddFn('add');
					// 提示信息处理
					tipsFn(svg, m, x, y, d, t, _axis);
				}
			});
		} else {
			// 清除图表-K线图
			removeDom('tzt-tips-text', svg);
		}
		// 提示dom添加/删除
		function tipsAddFn(way) {
			if (way == 'add') {
				if (t.xLine) {
					// 生成提示
					addDom('tzt-tips-line', svg, ['line']);
				}
				if (t.yLine) {
					// 生成提示
					addDom('tzt-tips-line-y', svg, ['line']);
				}
				// 生成提示
				addDom('tzt-tips-text', svg, ['rect']);
				if (t.type == 't-line') {
					// 生成提示
					addDom('tzt-tips-text-y', svg, ['rect']);
				}
			} else {
				// 清除提示
				removeDom('tzt-tips-line', svg);
				removeDom('tzt-tips-line-y', svg);
				removeDom('tzt-tips-text', svg);
				removeDom('tzt-tips-text-y', svg);
			}
		}
	};
	// 提示信息处理
	function tipsFn(svg, m, x, y, d, t, _axis) {
		var _xAxisDot = _axis[0] - m[0].left;
		// 获取数据索引
		var _index = (_xAxisDot / x[0].xScaleTips.rangeBand()).toFixed(0);
		_index = _index <= 0 ? 0 : _index > d[0].data.length - 1 ? d[0].data.length - 1 : _index;
		var array = [];
		array.push({
			date: x[0].data[_index]
		});
		for (var i = 0; i < d.length; i++) {
			if (d[i].type == 'k-line') {
				for (var j = 0; j < d[i].data[_index].length; j++) {
					array.push({
						name: d[i].name[j],
						data: d[i].data[_index][j]
					});
				}
			} else {
				array.push({
					name: d[i].name,
					data: d[i].data[_index] || (d[i].data[_index] == 0 ? d[i].data[_index] : '--'),
					close: d[i].close,
					color: t.isIcon ? d[i].color[0] : ''
				});
			}
		}
		var xy = [x[0].data[_index], d[0].data[_index]];
		if (d[0].type == 'k-line') {
			xy[1] = d[0].data[_index][3];
		}

		if (t.callBackFn) {
			array = t.callBackFn(array);
		}

		tipsLoad(svg, m, x, y, t, array, xy);

		if (t.xLine) {
			var xLineDom = svg.select('.tzt-tips-line');
			// x轴垂直线
			xLineDom.select('line').attr({
				class: 'tips-line',
				x1: x[0].xScale(x[0].data[_index]) + x[0].xScale.rangeBand() / 2 + m[0].left,
				x2: x[0].xScale(x[0].data[_index]) + x[0].xScale.rangeBand() / 2 + m[0].left,
				y1: 0,
				y2: m[0].height - x[0].shift
			});
		}
		if (t.yLine) {
			var yLineDom = svg.select('.tzt-tips-line-y');
			var _yLine = '';
			if (t.yCasual) {
				_yLine = _axis[1];
			} else {
				_yLine = (d[0].type == 'k-line' ? y[0].yScale(d[0].data[_index][3]) : y[0].yScale(d[0].data[_index])) + m[0].top;
			}
			// y轴垂直线
			yLineDom.select('line').attr({
				class: 'tips-line',
				x1: m[0].left,
				x2: m[0].width - m[0].right,
				y1: _yLine,
				y2: _yLine
			});
		}
	};
	// 提示内容展示
	function tipsLoad(svg, m, x, y, t, a, xy) {
		var _x = .14,
			_y = .14 + .28,
			_w = 0,
			_w1 = 0,
			_w2 = 0,
			_h = 0;
		var textDom = svg.select('.tzt-tips-text');
		var yTextDom = svg.select('.tzt-tips-text-y');

		if (t.type == 'base') {
			// 刷新展示数据
			textDom.selectAll('text').remove();
			if (t.isIcon) {
				textDom.selectAll('circle').remove();
			}
			_h++;
			for (var i = 1; i < a.length; i++) {
				var wFn1 = widthFn(a[i].name);
				var wFn2 = widthFn(a[i].data);
				_w1 = wFn1 > _w1 ? wFn1 : _w1;
				_w2 = wFn2 > _w2 ? wFn2 : _w2;
			}
			for (var i = 0; i < a.length; i++) {
				// if (i > 0 && t.isIcon) {
				// 	_x = .14 + .28;
				// }
				if (i == 0) {
					var wFn = widthFn(a[i].date);
					_w = wFn + .14;
					textDom.append('text').attr({
						class: 'size-21',
						fill: t.color,
						x: w * _x / 10,
						y: w * _y / 10
					}).text(a[i].date);
				} else {
					_y += .14 + .28;
					_w = _w > _w1 + _w2 ? _w : _w1 + _w2;
					if (t.isIcon) {
						textDom.append('circle').attr({
							style: function () {
								return 'fill:' + a[i].color;
							},
							cx: w * .2 / 10,
							cy: w * _y / 10 - w * .12 / 10,
							r: w * .07 / 10
						});
					}
					textDom.append('text').attr({
						class: 'size-21',
						fill: t.color,
						x: w * (_x + (t.isIcon ? .28 : 0)) / 10,
						y: w * _y / 10
					}).text(a[i].name);
					textDom.append('text').attr({
						class: 'size-21',
						fill: t.color,
						x: w * (_w1 + (t.isIcon ? .28 : 0)) / 10,
						y: w * _y / 10
					}).text(a[i].data);
				}
			}
			if (t.isIcon) {
				_w = _w + .28;
			}
			var	_obj = {
				w: w * _w / 10,
				h: w * (_h * _y + .2) / 10,
			}
			textDom.select('rect').attr({
				fill: t.backgroundColor,
				rx: 3,
				ry: 3,
				width: _obj.w,
				height: _obj.h
			});

			var x1 = x[0].xScale(xy[0]) + x[0].xScale.rangeBand() / 2 + m[0].left - _obj.w / 2,
				y1 = y[0].yScale(xy[1]) - _obj.h + m[0].top - w * .12 / 10;
			// 处理超出边界的情况
			x1 = x1 < 0 ? 0 : x1 + w * _w / 10 > m[0].width ? m[0].width - w * _w / 10 : x1;
			y1 = y1 < 0 ? 0 : y1;
			// 浮框移动
			textDom.attr({
				transform: 'translate(' + x1 + ',' + y1 + ')'
			});
		} else if (t.type == 't-line') {
			// 刷新展示数据
			textDom.selectAll('text').remove();
			yTextDom.selectAll('text').remove();
			var wx = widthFn(a[0].date);
			var wy = widthFn(a[1].data);
			textDom.append('text').attr({
				class: 'size-21 text-centre text-middle',
				fill: t.color,
				x: m[0].width * wx / 20,
				y: m[0].width * .28 / 10
			}).text(a[0].date);
			textDom.select('rect').attr({
				fill: t.backgroundColor,
				rx: 3,
				ry: 3,
				width: m[0].width * wx / 10,
				height: m[0].width * .5 / 10
			});
			textDom.attr({
				transform: 'translate(' + (x[0].xScale(xy[0]) + m[0].left - m[0].width * wx / 20) + ', ' + (m[0].height - m[0].bottom) + ')'
			});
			yTextDom.append('text').attr({
				class: 'size-21 text-centre text-middle',
				fill: t.color,
				x: m[0].width * wy / 20,
				y: m[0].width * .28 / 10
			}).text(a[1].data);
			yTextDom.select('rect').attr({
				fill: t.backgroundColor,
				rx: 3,
				ry: 3,
				width: m[0].width * wy / 10,
				height: m[0].width * .5 / 10
			});
			yTextDom.attr({
				transform: 'translate(0 , ' + (y[0].yScale(xy[1]) + m[0].top - m[0].width * .5 / 20) + ')'
			});
			// 构建顶部提示
			tipsTopFn(svg, '', a);
		}
	};
	/*
 * @name tipsTopFn 构建顶部提示
 * @本函数为tips.type = 't-line'时使用
  */
	function tipsTopFn(svg, d, a) {
		var _n = .4;
		var tipsTopDom = svg.select('.tzt-chart-k-line-text');
		tipsTopDom.attr({
			transform: 'translate(0, 0)'
		});
		tipsTopDom.selectAll('text').remove();
		if (d) {
			for (var i = 1; i < d.length; i++) {
				var _d = d[i].data[d[i].data.length - 1];
				var wn = widthFn(d[i].name);
				var wd = widthFn(_d);
				tipsTopDom.append('text').attr({
					class: 'size-21 color-gray',
					x: w * _n / 10,
					y: w * .4 / 10
				}).text(d[i].name);
				_n += wn;
				tipsTopDom.append('text').attr({
					class: 'size-21 ' + (_d > d[i].close ? 'color-red' : _d < d[i].close ? 'color-green' : 'color-gray'),
					x: w * _n / 10,
					y: w * .4 / 10
				}).text(_d);
				_n += wd;
			}
		} else if (a) {
			for (var i = 2; i < a.length; i++) {
				var wn = widthFn(a[i].name);
				var wd = widthFn(a[i].data);
				tipsTopDom.append('text').attr({
					class: 'size-21 color-gray',
					x: w * _n / 10,
					y: w * .4 / 10
				}).text(a[i].name);
				_n += wn;
				tipsTopDom.append('text').attr({
					class: 'size-21 ' + (a[i].data > a[i].close ? 'color-red' : a[i].data < a[i].close ? 'color-green' : 'color-gray'),
					x: w * _n / 10,
					y: w * .4 / 10
				}).text(a[i].data);
				_n += wd;
			}
		}
	}
	// 构建图表
	function chartFn(svg, m, x, y, d, name, ln) {
		var xDom = svg.select('.' + name);
		if (d.type == 'bar') {
			// 绘制柱形图
			barLoad(xDom, m, x, y, d, ln);
		}
		if (d.type == 'line') {
			if (name.indexOf('filler') > 0) {
				// 绘制折线图分隔区域
				lineLoad(xDom, m, x, y, d, true);
			} else {
				// 绘制折线图
				lineLoad(xDom, m, x, y, d);
			}
		}
		if (d.type == 'k-line') {
			if (name.indexOf('signal') > 0) {
				// 绘制多空信号
				kLineSignalLoad(xDom, m, x, y, d);
			} else {
				// 绘制K线图
				kLineLoad(xDom, m, x, y, d);
			}
		}
	};
	// 绘制多空信号
	function kLineSignalLoad(dom, m, x, y, d) {
		dom.attr({
			transform: 'translate(' + m.left + ', ' + m.top + ')'
		});
		// 多空指标刷新
		dom.selectAll('text').remove();
		dom.selectAll('line').remove();
		dom.selectAll('path').remove();

		var _bull = [],
			_bullTemp = [],
			_bullChange = [],
			_bear = [],
			_bearTemp = [],
			_bearChange = [];
		// 绘制信号点
		for (var i = 0; i < x.data.length; i++) {
			var dData = d.data[i],
				xData = x.data[i];
			if (1 == dData[4]) {
				dom.append('text').attr({
					class: 'color-buy size-15 font-bold',
					x: x.xScale(xData) - 3,
					y: y.yScale(dData[2]) + 20
				}).text('D');
				dom.append('line').attr({
					class: 'line-buy',
					x1: x.xScale(xData) + x.xScale.rangeBand() / 2,
					x2: x.xScale(xData) + x.xScale.rangeBand() / 2,
					y1: y.yScale(dData[2]) + 8,
					y2: y.yScale(dData[2]) + 2
				});
			} else if (2 == dData[4]) {
				dom.append('text').attr({
					class: 'color-sell size-15 font-bold',
					x: x.xScale(xData) - 3,
					y: y.yScale(dData[0]) - 10
				}).text('K');
				dom.append('line').attr({
					class: 'line-sell',
					x1: x.xScale(xData) + x.xScale.rangeBand() / 2,
					x2: x.xScale(xData) + x.xScale.rangeBand() / 2,
					y1: y.yScale(dData[0]) - 8,
					y2: y.yScale(dData[0]) - 2
				});
			}

			_bullTemp = [];
			_bearTemp = [];
			if (0 !== dData[4]) {
				if (1 == dData[4]) {
					_bullTemp.push([xData, (dData[0] + dData[2]) / 2]);
					_bullChange = [xData, dData[0]];
					for (var j = i; j < x.data.length; j++) {
						var dData1 = d.data[j],
							xData1 = x.data[j];
						if (dData1[0] > _bullChange[1] && (_bullChange = [xData1, dData1[0]]), 2 == dData1[4]) {
							_bullTemp.push(_bullChange);
							_bullTemp.push([xData1, (dData1[0] + dData1[2]) / 2]);
							_bull.push(_bullTemp);
							break;
						}
					}
				} else if (2 == dData[4]) {
					_bearTemp.push([xData, (dData[0] + dData[2]) / 2]);
					_bearChange = [xData, dData[2]];
					for (var k = i; k < x.data.length; k++) {
						var dData2 = d.data[k],
							xData2 = x.data[k];
						if (dData2[2] < _bearChange[1] && (_bearChange = [xData2, dData2[2]]), 1 == dData2[4]) {
							_bearTemp.push(_bearChange);
							_bearTemp.push([xData2, (dData2[0] + dData2[2]) / 2]);
							_bear.push(_bearTemp);
							break;
						}
					}
				}
			}
		}

		// 创建一个区域生成器
		var area = svgArea();

		// 绘制区域
		var A,
			W,
			F,
			X = x.xScale.rangeBand() / 2;
		for (var a = 0; a < _bull.length; a++) {
			A = [x.xScale(_bull[a][0][0]) + X, y.yScale(_bull[a][0][1])];
			W = [x.xScale(_bull[a][1][0]) + X, y.yScale(_bull[a][1][1])];
			F = [x.xScale(_bull[a][2][0]) + X, y.yScale(_bull[a][2][1])];
			dom.append('path').attr({
				class: 'triangle-buy',
				d: area([[A[0], A[1]], [W[0], W[1]], [F[0], F[1]], [A[0], A[1]]])
			});
		}
		for (var a = 0; a < _bear.length; a++) {
			A = [x.xScale(_bear[a][0][0]) + X, y.yScale(_bear[a][0][1])];
			W = [x.xScale(_bear[a][1][0]) + X, y.yScale(_bear[a][1][1])];
			F = [x.xScale(_bear[a][2][0]) + X, y.yScale(_bear[a][2][1])];
			dom.append('path').attr({
				class: 'triangle-sell',
				d: area([[A[0], A[1]], [W[0], W[1]], [F[0], F[1]], [A[0], A[1]]])
			});
		}
	};
	// 绘制K线图
	function kLineLoad(dom, m, x, y, d) {
		dom.attr({
			transform: 'translate(' + m.left + ', ' + m.top + ')'
		});
		// K线刷新
		dom.selectAll('line').remove();
		dom.selectAll('rect').remove();

		for (var i = 0; i < x.data.length; i++) {
			var dData = d.data[i],
				xData = x.data[i];
			dom.append('line').attr({
				// 开盘价 <= 收盘价 ? 红色 : 绿色
				class: dData[1] <= dData[3] ? 'kline-line-rise' : 'kline-line-drop',
				x1: x.xScale(xData) + x.xScale.rangeBand() / 2,
				x2: x.xScale(xData) + x.xScale.rangeBand() / 2,
				// 最高价
				y1: y.yScale(d3.max(dData.slice(0, 4))),
				// 最低价
				y2: y.yScale(d3.min(dData.slice(0, 4)))
			});
			dom.append('rect').attr({
				// 开盘价 <= 收盘价 ? 红色 : 绿色
				class: dData[1] <= dData[3] ? 'kline-bar-rise' : 'kline-bar-drop',
				x: x.xScale(xData),
				// 开盘价、收盘价最大值
				y: y.yScale(d3.max([dData[1], dData[3]])),
				width: x.xScale.rangeBand(),
				height: function () {
					// 开盘价和收盘价的差值
					var _abs = Math.abs(y.yScale(dData[1]) - y.yScale(dData[3]));
					return .5 > _abs && (_abs = dData[1] <= dData[3] ? .5 : 1), _abs;
				}
			});
		}
	};
	// 绘制折线图
	function lineLoad(dom, m, x, y, d, is) {
		dom.attr({
			transform: 'translate(' + m.left + ', ' + m.top + ')'
		});
		// 创建一个线段生成器
		var lineMachine = svgLine(x.xScale, y.yScale, d.smooth);
		// 数据处理-线段使用
		var lineData = lineChange(x.data, d.data);

		// 折线刷新
		dom.selectAll('path').remove();
		dom.selectAll('path').data(lineData).enter().append('path').attr({
			style: function () {
				return is ? 'fill:' + d.fillerColor[0] : 'stroke:' + d.color[0];
			},
			d: function (d) {
				if (is) {
					d.line.splice(0, 0, [d.line[0][0], y.min]);
					d.line.push([d.line[d.line.length - 1][0], y.min]);
				}
				return lineMachine(d.line);
			}
		});
		if (!is && d.isDot) {
			// 添加点
			dom.selectAll('circle').remove();
			dom.selectAll('circle').data(lineData[0].line).enter().append('circle').attr({
				cx: function (d) {
					return x.xScale(d[0]) + x.xScale.rangeBand() / 2;
				},
				cy: function (d) {
					return y.yScale(d[1]);
				},
				r: d.radius,
				fill: d.isHollow ? '#fff' : d.color[0],
				stroke: d.isHollow ? d.color[0] : ''
			});
		}
	};
	// 绘制柱形图
	function barLoad(dom, m, x, y, d, ln) {
		var lng = ln[d.index].n.length,
			ide = ln[d.index].index;
		// 柱形图刷新
		dom.selectAll('rect').remove();
		dom.selectAll('text').remove();
		for (var i = 0; i < x.data.length; i++) {
			var xd = x.data[i];
			var dd = d.data[i];
			if (dd || dd == 0) {
				dom.append('rect').attr({
					class: dd < 0 ? 'bar-drop' : 'bar-rise',
					transform: 'translate(' + m.left + ',' + m.top + ')',
					x: x.xScale(xd) + d.barGap / 2 + (x.xScale.rangeBand() - d.barGap) / lng * ide,
					y: y.yScale(dd >= 0 ? dd : 0),
					width: (x.xScale.rangeBand() - d.barGap) / lng,
					height: function () {
						var _d = y.min <= 0 && dd >= 0 ? dd + y.min : -dd + y.min;
						return m.height - m.top - m.bottom - y.yScale(_d);
					}
				});

				if (d.isText) {
					dom.append('text').attr({
						class: (dd < 0 ? 'color-green' : 'color-red') + ' size-24 text-centre',
						transform: 'translate(' + m.left + ',' + m.top + ')',
						x: x.xScale(xd) + d.barGap / 2 + (x.xScale.rangeBand() - d.barGap) / lng * ide + (x.xScale.rangeBand() - d.barGap) / (lng * 2),
						y: y.yScale(dd) + (dd >= 0 ? d.textGap[0] : d.textGap[1])
					}).text(dd.toFixed(d.barDecimal));
				}
			}
		}
	};
	// 构建坐标轴
	function axisFn(svg, m, x, name, y) {
		var xDom = svg.select('.' + name);
		if (name.indexOf('-x') > 0) {
			xAxisLoad(xDom, m, x);
		}
		if (name.indexOf('-y') > 0) {
			yAxisLoad(xDom, m, x, y);
		}
	};
	// 绘制x轴
	function xAxisLoad(dom, m, x) {
		// x轴文本是否要换行
		var isTspan = false;
		// 定义坐标轴x
		var xSet = d3.svg.axis() // 创建一个默认的轴
		.scale(x.xScale).tickSize(6).tickValues(x.date || x.data).tickFormat(function (d) {
			var d = d + '';
			if (x.callBackFn) {
				d = x.callBackFn(d);
			}
			if (isType(d) == 'Array') {
				// x轴文本是否要换行
				isTspan = true;
			}
			return d;
		}).tickPadding(x.nameGap);

		// DOM处理
		dom.attr({
			transform: 'translate(' + m.left + ',' + (m.height - x.shift) + ')'
		}).call(xSet);
		dom.selectAll('line').attr({
			class: 'axis-line',
			y2: x.dashed ? -(m.height - 20) : '4'
		});
		dom.selectAll('text').attr({
			class: 'color-gray size-21',
		})
		// 回调数组数值处理-上下结构
		if (isTspan) {
			dom.selectAll('text').html(function (d) {
				var sTspan = '';
				var n = 5;
				d = x.callBackFn(d);
				if (isType(d) == 'Array') {
					for (var i = 0; i < d.length; i++) {
						sTspan += '<tspan y=' + n + ' x=0>' + d[i] + '</tspan>';
						n += 20;
					}
				} else {
					sTspan = d;
				}
				return sTspan;
			});
		}
		if (!x.levelText) {
			dom.selectAll('text').attr({
				style: '',
			});
		}

		if (x.side) {
			var side = dom.select('line').attr({
				class: 'axis-side-x',
				x1: 0,
				x2: m.width - m.left - m.right,
				y1: 0,
				y2: 0
			});
		}
	};
	// 绘制y轴
	function yAxisLoad(dom, m, x, y) {
		// 计算Y轴展示数据
		var min = y.min,
			max = y.max,
			mean = (max - min) / (y.split - 1),
			yData = [min];
		for (var a = 0; a < y.split - 1; a++) {
			yData.push(min + mean * (a + 1));
		}
		if (y.data && y.data.length > 0) {
			yData = y.data;
		}

		// 定义坐标轴y
		var ySet = d3.svg.axis() // 创建一个默认的轴
		.scale(y.yScale).tickSize(6).orient(y.float);

		if (y.data && y.data.length > 0) {
			ySet.tickValues(y.data);
		} else {
			ySet.ticks(y.split);
		}

		ySet.tickFormat(function (d) {
			if (y.callBackFn) {
				d = y.callBackFn(d);
			} else {
				d = d.toFixed(y.decimal);
			}
			return d;
		}).tickPadding(y.nameGap);

		/* ---------- DOM处理 ----------*/
		dom.attr({
			transform: 'translate(' + (y.float == 'right' ? m.width - m.right : m.left) + ',' + m.top + ')'
		}).call(ySet);
		dom.selectAll('line').attr({
			class: 'axis-line',
			x2: y.dashed ? (m.width - m.left - m.right) * (y.float == 'right' ? -1 : 1) : '4'
		});
		dom.selectAll('text').attr({
			class: 'color-gray size-21',
		});
		if (!y.levelText) {
			dom.selectAll('text').attr({
				style: '',
				y: -3,
			});
		}

		if (y.side) {
			var side = dom.select('line').attr({
				class: 'axis-side-y',
				x1: 0,
				x2: 0,
				y1: 0,
				y2: m.height - m.top - x.shift
			});
		}
	};

	// 计算提示文字宽度
	function widthFn(_s, _size) {
		var regular = /^[\u4e00-\u9fa5]+$/;
		var _s = _s + '',
			_n = 0;
		for (var i = 0; i < _s.length; i++) {
			if (regular.test(_s[i])) {
				_n += _size ? _size : .28;
			} else {
				_n += _size ? _size / 2 : .14;
			}
		}
		_n += _size ? _size : .28;
		return _n;
	};
	// 默认值与扩展对象合并新属性
	function changeFn(type, a, b, am, m) {
		var array = [];
		if (b && isType(b)) {
			if (isType(b) == 'Object') {
				b = [b];
			}
			if (isType(a) == 'Object') {
				a = [a];
			}
			for (var i = 0; am ? i < am.length : i < b.length; i++) {
				array.push($.extend({}, valDeal(a, i), b[i]));
				// 合并扩展特殊处理
				changeTypeFn(type, array[i], m ? m[i] : '', am ? am[i] : '');
			}
		} else {
			array.push(a);
			// 合并扩展特殊处理
			changeTypeFn(type, array[0], m ? m[0] : '', am ? am[0] : '');
		}
		return array;
	};
	// 合并扩展特殊处理
	function changeTypeFn(type, o, m, am) {
		if (type == 'main') {
			// 画布高度
			o.height = o.width * o.ratio;
		}
		if (type == 'x') {
			// 数据占比
			o.size = o.data.length / (o.num || o.data.length);
			// x轴的比例尺
			o.xScale = d3.scale.ordinal() // 构造一个序数比例尺
			.domain(o.data.map(function (d) {
				return d;
			})).rangeBands([0, (m.width - m.left - m.right) * o.size], o.zoom);
			// x轴的比例尺-提示用
			o.xScaleTips = d3.scale.ordinal() // 构造一个序数比例尺
			.domain(o.data.map(function (d) {
				return d;
			})).rangeBands([0, (m.width - m.left - m.right) * o.size], 0);
		}
		if (type == 'y') {
			if (!o.min && o.min != 0) {
				// 数据最小值
				o.min = Number(am.split('|')[0]);
			}
			if (!o.max) {
				// 数据最大值
				o.max = Number(am.split('|')[1]);
			}
			// 数据最小值
			o.min = o.min < 0 ? o.min / (1 - o.zoom) : o.min * (1 - o.zoom);
			// 数据最大值
			o.max = o.max * (1 + o.zoom);
			// y轴的比例尺
			o.yScale = d3.scale.linear() // 构建一个线性比例尺
			.domain([o.min, o.max]).range([m.height - m.top - m.bottom, 0]);
			if (o.isNice) {
				o.yScale = o.yScale.nice();
			}
		}
	};
	// 数据处理-获取最大/最小值
	function dataDeal(data) {
		var a = [],
			n = {},
			m = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].type == 'k-line') {
				var _min = d3.min(data[i].data, function (d) {
					return d3.min(d.slice(0, 4));
				});
				var _max = d3.max(data[i].data, function (d) {
					return d3.max(d.slice(0, 4));
				});
			} else {
				var _min = data[i].type == 'bar' && d3.min(data[i].data) > 0 ? 0 : d3.min(data[i].data);
				var _max = data[i].type == 'bar' && d3.max(data[i].data) < 0 ? 0 : d3.max(data[i].data);
			}
			if (a.indexOf(data[i].index) < 0) {
				n[data[i].index] = {};
				var _n = n[data[i].index];
				if (!_n.min || _n.min > _min) {
					_n.min = _min;
				}
				if (!_n.max || _n.max < _max) {
					_n.max = _max;
				}
				a.push(data[i].index);
			} else {
				if ((!_n.min && _n.min != 0) || _n.min > _min) {
					_n.min = _min;
				}
				if (!_n.max || _n.max < _max) {
					_n.max = _max;
				}
			}
		}
		for (var i = 0; i < a.length; i++) {
			var k = n[a[i]];
			m.push(k.min + '|' + k.max);
		}
		return m;
	};
	// 取值处理
	function valDeal(a, i) {
		var s;
		if (a[i]) {
			s = a[i];
		} else {
			s = a[0];
		}
		return s;
	};
	// 判断传入数据类型
	function isType(x) {
		if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
			if (typeof x.length === 'number') {
				return 'Array';
			} else {
				return 'Object';
			}
		}
		return false;
	};

	// 扩展元素构建
	function addDom(name, svg, array) {
		if (!name && svg.select('svg')[0][0] == null) {
			svg.append('svg');
		} else if (name && svg.select('svg').select('.' + name)[0][0] == null) {
			svg.select('svg').append('g').attr({
				class: name
			});
			if (!array || array.lenth == 0) {
				return false;
			}
			for (var a = 0; a < array.length; a++) {
				svg.select('.' + name).append(array[a]);
			}
		}
	};
	// 扩展元素清除
	function removeDom(name, svg, index) {
		if (index) {
			for (var i = 0; i < 10; i++) {
				if (index.indexOf(i) < 0) {
					svg.select('.' + name + '-' + i).remove();
				}
			}
		} else {
			svg.select('.' + name).remove();
		}
	};
	// 数据处理-线段使用
	function lineChange(x, d) {
		var array = [],
			array1 = [];
		for (var i = 0; i < x.length; i++) {
			if (d[i] || 0 == d[i]) {
				array1.push([x[i], d[i]]);
			}
		}
		array.push({
			line: array1
		});
		return array;
	};

	//私有方法，检测参数是否合法
	function isValid(o) {
		return !o || o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" ? true : false;
	}

	window.tztChart = {
		/*
  * @name 分时时间数组获取
  * @item [["09:30", "11:30", "13:00", "15:00"],[20170702,20170703,20170704,20170705,20170706]]
  * @item 第一位为分时时间段-必传
  * @item 第二位为5日分时日期-非必传
  * @max 分时最大数据条数
   */
		timeChange: function (item, max) {
			var that = this;
			var t = [],
				h = Number(item[0][0].split(':')[0]),
				m = Number(item[0][0].split(':')[1]),
				isload = false,
				_date = [];
			for (var a = 0; a < max; a++) {
				var _timeUp = timeUp(item[0]);
				t.push(_timeUp);
				if (_timeUp == item[0][3]) {
					break;
				}
			}
			function timeUp(time) {
				var _t = '';
				if (time[0] == that.doubles(h) + ':' + that.doubles(m)) {
					_t = that.doubles(h) + ':' + that.doubles(m);
					isload = true;
					if (m < 59) {
						m++;
					} else {
						m = 0;
						h++;
					}
				} else {
					if (m < 59 && !isload) {
						m++;
					} else if (!isload) {
						m = 0;
						h++;
					}
					isload = false;
					_t = that.doubles(h) + ':' + that.doubles(m);
					if (_t == time[1]) {
						h = Number(time[2].split(':')[0]);
						m = Number(time[2].split(':')[1]);
						_t = _t + '/' + time[2];
					}
				}
				return _t;
			}
			_date = [item[0][0], item[0][1] + '/' + item[0][2], item[0][3]];
			// 5日分时
			if (item[1]) {
				var _year = [],
					_date = [];
				for (var a = 0; a < item[1].length; a++) {
					_date.push(item[1][a] + ' ' + item[0][1] + '/' + item[0][2]);
					for (var b = 0; b < t.length; b++) {
						_year.push(item[1][a] + ' ' + t[b]);
					}
				}
				t = _year;
			}
			return [t, _date, item[1] || ''];
		},
		//一位数变为两位数
		doubles: function (n) {
			var _n = n.toString();
			_n.length < 2 && (_n = '0' + _n);
			return _n;
		}
	};
})(Zepto);