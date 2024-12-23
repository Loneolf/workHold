<template>
	<div class="thermometer">
		<h2 class="ther_title"><span>价值区间温度计</span><span class="ther_text" @click="func">详细说明>></span></h2>
		<div class="mometer">
			<span class="cir"><em class="spot"></em></span>
			<div class="mometer-title-block"><p class="mometer-block"><span></span><span></span><span></span><span></span></p></div>
			<p class="mometer-title"><span>低估区</span><span>价值区</span><span>波动区</span><span>风险区</span></p>
			<div class="price"><p class="price-block"><span>{{gridData.price[0]}}元</span><span>{{gridData.price[1]}}元</span><span>{{gridData.price[2]}}元</span></p></div>
			<span class="line-price"><em v-bind:style="{width:gridData.width}"></em><span class="vertical"></span></span>
			<div class="vertical"><p class="vertical-line"><span><em></em></span><span><em></em></span><span><em></em></span></p></div>
		</div>
		<p class="notice">（注：为了便于分析，各个区间并不是按照真实比例绘制，图示仅供参考）</p>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				gridData:{
					price:[],
					width:0
				}
			}
		},
    methods: {
      func(){
        $.alert(
          '<div class="xnotice" style="font-size: 12px;text-align: left;"><p>按总股本划分3类</p><p>a、总股本大于10亿股</p><p>b、总股本在3-10亿股之间</p><p>c、总股本在3亿股以内</p><p style="height: 5px;"> </p><p>a、动态市盈率达到8以内  低估区</p><p>a、动态市盈率达到8-12   价值区</p> <p>a、动态市盈率达到12-20  波动区</p><p>a、动态市盈率达到20以上 风险区</p><p style="height: 5px;"> </p><p>b、动态市盈率达到15以内  低估区</p><p>b、动态市盈率达到15-25   价值区</p><p>b、动态市盈率达到25-45  波动区</p><p>b、动态市盈率达到45以上 风险区</p><p style="height: 5px;"> </p><p>c、动态市盈率达到20以内  低估区</p><p>c、动态市盈率达到20-30   价值区</p><p>c、动态市盈率达到30-50  波动区</p><p>c、动态市盈率达到50以上 风险区</p></div>',
          '价值区间温度计说明'
        );
      }
    },
	    events: {
	        'parent-thermometer': function(Data) {
	        	var aPrice = {
	        		a:[8,12,20],
	        		b:[15,25,45],
	        		c:[20,30,50]
	        	}
	        	var
	        		zgb   = parseFloat(Data.m_zgb),
	        		price = parseFloat(Data.m_ldtsyl),
	        		grid  = {};
	        	if(zgb>1000000000){
	        		grid.price = aPrice.a;
	        		if(price<8){
	        			grid.width = '20%';
	        		}else if(price>=8 && price < 12){
	        			grid.width = '40%';
	        		}else if(price>=12 && price < 20){
	        			grid.width = '64%';
	        		}else{
	        			grid.width = '85%';
	        		}
	        	}else if(zgb>300000000 && zgb<=1000000000){
	        		grid.price = aPrice.b;
	        		if(price<15){
	        			grid.width = '20%';
	        		}else if(price>=15 && price < 25){
	        			grid.width = '40%';
	        		}else if(price>=25 && price < 45){
	        			grid.width = '64%';
	        		}else{
	        			grid.width = '85%';
	        		}
	        	}else{
	        		grid.price = aPrice.c;
	        		if(price<20){
	        			grid.width = '20%';
	        		}else if(price>=20 && price < 30){
	        			grid.width = '40%';
	        		}else if(price>=30 && price < 50){
	        			grid.width = '64%';
	        		}else{
	        			grid.width = '85%';
	        		}
	        	}
	        	console.log(grid);
	            this.gridData = grid;
	        }
	    }
	}
</script>

<style lang="less" scoped>
	@import '../../../assets/less/variables.less';
	.thermometer{
		padding: 0 0.75rem 0.75rem;
		.ther_title{
		    line-height: 1.9rem;
		    margin: 0;
		    font-size: 0.7rem;
		    font-weight: normal;
		    span{width:50%;display:inline-block;}
		}
	  	.ther_text{
	    	color: @color-text-secondary;
	    	text-align: right;
		}
		.notice{
			color:@color-text-secondary;
			font-size:0.6rem;
		}
	}
	.mometer{
		position: relative;
		margin-top: 20px;
		height: 100px;
		.cir{
			position: absolute;
			left: 0;
			top: 0;
			border: @border-default;
			display: inline-block;
			width: 64px;
			height: 64px;
			border-radius: 32px;
			z-index: 1;
			.spot{
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 5px;
				background-color: @color-rise;
				position: absolute;
				left: 27px;
				top: 27px;
				z-index: 2;
			}

		}
		.mometer-title-block{
			position: absolute;
			width: 100%;
			padding-left: 59px;
			height: 32px;
			top: 16px;
			z-index: 3;
		}
		.mometer-block{
			width: 100%;
			height: 32px;
			padding:9px 9px 9px 0;
			border:@border-default;
			border-left: none;
			border-top-right-radius: 16px;
			border-bottom-right-radius: 16px;
			:last-child{
				border-top-right-radius: 6px;
				border-bottom-right-radius: 6px;
			}
			span{
				display: inline-block;
				width: 25%;
				height: 12px;
				background-color: #dfe3a0;
				vertical-align: top;
			}
			:nth-child(2){
				background-color: #57bae2;
			}
			:nth-child(3){
				background-color: #f77c31;
			}
			:nth-child(4){
				background-color: #e64843;
			}
		}
		.mometer-title{
			position: absolute;
			width: 100%;
			padding-left: 59px;
			padding-right: 9px;
			height: 20px;
			top: -5px;
			z-index: 3;
			font-size: 12px;
			span{
				display: inline-block;
				width: 25%;
				text-align: center;
			}
		}
		.price{
			width: 100%;
			position: absolute;
			top: 64px;
			padding-left: 59px;
			padding-right: 9px;
			height: 20px;
			.price-block{
				width: 100%;
				position: relative;
				span{
					position: absolute;
					font-size: 12px;
					font-weight: normal;
					top: 0;
					left: 0;
					display:inline-block;
					width: 50%;
					text-align: center;
				}
				:nth-child(2){
					left: 25%;
				}
				:nth-child(3){
					left: 50%;
				}
			}
		}
		.vertical{
			width: 100%;
			position: absolute;
			top: 38px;
			padding-left: 59px;
			padding-right: 9px;
			height: 27px;
			z-index: 15;
			.vertical-line{
				width: 100%;
				position: relative;
				span{
					position: absolute;
					top: 0;
					left: 0;
					display:inline-block;
					width: 50%;
					text-align: center;
					em{
						height:27px;
						display: inline-block;
						width: 1px;
						border-left: 1px dotted #71d1b8;
					}
				}
				:nth-child(2){
					left: 25%;
					em{
						border-left-color: #f77c31;
					}
				}
				:nth-child(3){
					left: 50%;
					em{
						border-left-color:#fd362f;
					}

				}
			}
		}
		.line-price{
			width: 100%;
			position: absolute;
			top: 32px;
			padding-left: 37px;
			height: 2px;
			z-index: 20;
			display: inline-block;
			em{
				display: inline-block;
				height: 1px;
				background-color: @color-rise;
				vertical-align: top;
			}
			.vertical{
				height: 12px;
				width: 1px;
				padding:0;
				background-color: #347088;
				vertical-align: top;
				position: inherit;
				top: -6px;

			}
		}
	}
</style>
