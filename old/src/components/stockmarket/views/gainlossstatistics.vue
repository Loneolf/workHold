<template>
	<div class="content">
		<h3 class="statistics-title">股民盈亏统计</h3>
		<div class="gain-statistics">
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics1"></em>盈利100%:</em><em class="left-pople">5人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics2"></em>盈利50%~100%:</em><em class="left-pople">15人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics3"></em>盈利20%~50%:</em><em class="left-pople">20人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics4"></em>盈利10%~20%:</em><em class="left-pople">65人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics5"></em>盈利0~10%:</em><em class="left-pople">80人</em></span><span class="list-right"><em class="right-width"></em></span></p>
		</div>
		<div class="loss-statistics">
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics6"></em>亏损0~10%:</em><em class="left-pople">5人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics7"></em>亏损10%~20%:</em><em class="left-pople">15人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics8"></em>亏损20%~50%:</em><em class="left-pople">20人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics9"></em>亏损50%~80%:</em><em class="left-pople">65人</em></span><span class="list-right"><em class="right-width"></em></span></p>
			<p class="statis-list"><span class="list-left"><em class="left-text"><em class="left-img statistics10"></em>亏损80%~100%:</em><em class="left-pople">80人</em></span><span class="list-right"><em class="right-width"></em></span></p>
		</div>
		<div class="notice">
			<p>提示：</p>
			<p>股民盈亏统计是设置了该股关注价的所有股民的盈亏区间统计图</p>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
.statistics-title{
	line-height: 1.85rem;
	font-size: 0.85rem;
	text-align: center;
	background-color: @color-bg-secondary;
	font-weight: normal;
	margin: 0;
}
.gain-statistics{
	padding: 0 0.4rem;
	:last-child.statis-list{
		border-bottom: @border-default;
	}
}
.loss-statistics{
	padding: 0 0.4rem;
	:last-child.statis-list{
		border-bottom: @border-default;
	}
}
.statis-list{
	padding-top: 0.5rem;
	.list-left{
		width: 70%;
		display: inline-block;
		padding-right: 3px;
		.left-text{
			display: inline-block;
			width: 72%;
			font-style: normal;
			.left-img{
				display: inline-block;
				width: 17px;
				height: 17px;
				background:url('../../../assets/img/statistics.png') no-repeat;
				background-size: 17px;
				margin-right: 5px;
			}
			.statistics1{
				background-position: 0 -136px;
			}
			.statistics2{
				background-position: 0 -153px;
			}
			.statistics3{
				background-position: 0 -119px;
			}
			.statistics4{
				background-position: 0 -102px;
			}
			.statistics5{
				background-position: 0 -85px;
			}
			.statistics6{
				background-position: 0 -68px;
			}
			.statistics7{
				background-position: 0 -51px;
			}
			.statistics8{
				background-position: 0 -34px;
			}
			.statistics9{
				background-position: 0 -17px;
			}
		}
		.left-pople{
			display: inline-block;
			width: 28%;
			font-style: normal;
			text-align: right;
		}
	}
	.list-right{
		width: 30%;
		display: inline-block;
		.right-width{
			display: inline-block;
			width: 40%;
			background-color: #f1ae0d;
			height: 0.7rem;
			border-radius: @border-radius;
		}
	}
}
.loss-statistics{
	.list-right{
		.right-width{
			background-color: #3399cc;
		}
	}
}
.notice{
	padding: 1rem 0.75rem 0.95rem;
	color: @color-text-secondary;
}
</style>
