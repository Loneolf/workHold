<template>
	<div class="content">
		<div class="switch-title"><span class="title-text">股市心情弹窗开关</span><div class="title-input"><label class="label-switch"><input type="checkbox"><div class="checkbox"></div></label></div></div>
		<p class="gainloss"><span class="gainloss-title">持仓盈亏</span><span class="gainloss-val">-156.00</span><span class="gainloss-scale">-9.62%</span></p>
		<ul class="stocklist">
			<li><span class="list-title">当日盈亏</span><span class="list-val">-155.99</span></li>
			<li><span class="list-title">持股市值</span><span class="list-val">1465.00</span></li>
			<li><span class="list-title">摊薄成本</span><span class="list-val">3.24</span></li>
			<li><span class="list-title">每股盈亏</span><span class="list-val">-0.31</span></li>
			<li><span class="list-title">持股数量</span><span class="list-val">500股</span></li>
			<li><span class="list-title">持仓成本</span><span class="list-val">3.24</span></li>
		</ul>
		<div class="linegraph">
			<line-graph></line-graph>
		</div>
		<div class="details">
			<p class="details-title"><span class="title-name">成交明细</span><span class="title-add">添加</span><span class="title-updata">编辑</span></p>
			<ul>
				<li><span>2016-02-24</span><span>买入</span><span>500股</span><span>3.24</span></li>
				<li><span>2016-02-24</span><span>买入</span><span>500股</span><span>3.24</span></li>
				<li><span>2016-02-24</span><span>买入</span><span>500股</span><span>3.24</span></li>
				<li><span>2016-02-24</span><span>买入</span><span>500股</span><span>3.24</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
import lineGraph from '../ons/lineGraph'
export default {
  data () {
    return {

    }
  },
  ready(){

  },
  components:{
  	lineGraph
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
@import "../../../assets/less/mixins.less";
@border-color:#353535;
.switch-title{
	padding: 0.5rem 0.75rem;
	.title-text,.title-input{
		display: inline-block;
		width: 50%;
	}
	.title-input{
		text-align: right;
	}
}
.gainloss{
	padding: 0.75rem 0.75rem 0.6rem;
	background: #0e1519;
	position: relative;
	.hairline(bottom,@border-color);
	.hairline(top,@border-color);
	span{
		display: inline-block;
		width: 35%;
	}
	.gainloss-title{
		width: 30%;

	}
	.gainloss-scale{
		text-align: right;
	}
	.gainloss-val{
		text-align: center;
	}
}
.stocklist{
	background: #0e1519;
	position: relative;
	.hairline(bottom,@border-color);
	margin: 0;
	padding: 0 0.75rem 0.3rem;
	font-size: 0;
	li{
		width: 35%;
		display: inline-block;
		list-style: none;
		font-size: 0.75rem;
		padding: 0.65rem 0 0;
		span{
			display: block;
		}
	}
	li:nth-child(3n-2){
		width: 30%;
	}
	li:nth-child(3n){
		text-align: right;
	}
	li:nth-child(3n-1){
		text-align: center;
	}
}
.details{
	padding: 0 0.375rem 0.8rem;
	.details-title{
		line-height: 1.5rem;
		position: relative;
		span{
			display: inline-block;
			width: 33%;
			text-align: right;
		}
		:nth-child(1){
			width: 34%;
			text-align: left;
		}
		.hairline(bottom,@border-color);
	}
	ul{
		margin: 0;
		padding: 0;
		li{
			list-style: none;
			position: relative;
			padding:0.5rem 0;
			.hairline(bottom,@border-color);
			span{
				display: inline-block;
				width: 25%;
				text-align: right;
			}
			:nth-child(1){
				width: 30%;
				text-align: left;
			}
			:nth-child(2){
				width: 20%;
			}
		}
	}
}
</style>
