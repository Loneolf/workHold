/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：GRID.js
 * 文件标识：
 * 摘    要：对返回的数据grid进行处理
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/11/1
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/

var htmltitle = function (data, num) {
	let dateArray = [[], []];
	let dateTitle = [];
	let textTitle = data.GRID0 ? data.GRID0[0].split("|") : [];
	let textNum = 0;

	if (!data.HTMLTITLE) {
		data.HTMLTITLE = "";
	}
	let TitleArray = data.HTMLTITLE.split(",");
	TitleArray.forEach((item, index) => {
		if (item !== "") {
			let datelist = item.split("/");
			if (textTitle.length > 0) {
				textNum += textTitle[datelist[0]].length;
				datelist[1] && (textNum += textTitle[datelist[1]].length);
			}
			dateTitle.push(datelist);
			datelist[0] && dateArray[0].push(datelist[0]);
			datelist[1] && dateArray[1].push(datelist[1]);
		}
	});
	if (dateArray[1].length < 1) {
		dateArray.length = 1;
	}
	if (textNum >= 16) {
		dateTitle = dateArray;
	}
	return {
		dateTitle: dateTitle,
		textTitle: textTitle,
		dateArray: dateArray,
	};
};

export default {
	htmltitle: htmltitle,
};
