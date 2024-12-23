<template>
	<div class="mainforce">
		<p v-for="item in capital.mainForce" track-by="$index" v-bind:class="item>0?'rise':'fill'"><span class="val">{{item}}</span><span class="block"><em v-bind:style="{height:capital.heights[$index]}"></em></span></p>
		<p class="line"></p>
	</div>
	<p class="main-date"><em class="date-title">日期:</em><span v-for="item in capital.date">{{item}}</span></p>
</template>
<script>
	export default {
		data() {
        	return {
				capital:{
					/*mainForce:['-1908.1','920.8','3908.7','4002.6','682.4'],
					height:['1rem','2rem','0.8rem','2.1rem','1.5rem'],
					date:['02-18','02-19','02-20','02-21','02-22']*/
					mainForce:[],
					heights:[],
					date:[]
				}
			}
		},
	    events:{
	        'parent-mainForce':function(data){
	        	this.capital = data;
	        }
	    }
	}
</script>
<style lang="less" scoped>
	@import '../../../assets/less/variables.less';
	@import "../../../assets/less/mixins.less";
    @border-color:#353535;
	.mainforce{
		height: 4.5rem;
		padding: 0 0.2rem;
		position: relative;
		overflow: hidden;
		p{
			display: inline-block;
			width: 20%;
			font-size: 0;
			text-align: center;
			position: relative;
			height: 4.5rem;
			vertical-align: top;
			.val{
				width: 100%;
				font-size: 0.5rem;
				position: absolute;
				left: 0;
			}

			.block{
				position: relative;
				height: 2.25rem;
				display: inline-block;
				width: 100%;
				em{
					position: absolute;
					/*// height: 1rem;*/
					width: 50%;
					display: inline-block;
					left: 25%;
				}
			}
		}
		.fill{
			.val{
				top: 1.25rem;
			}
			.block{
				top: 2.25rem;
				em{
					background-color: @color-fill;
				}

			}
		}
		.rise{
			.val{
				top: 2.25rem;
			}
			.block{
				bottom: 0rem;
				em{
					bottom: 0rem;
					background-color: @color-rise;
				}
			}
		}
		.line{
			position: absolute;
			top: 50%;
			width: 100%;
			left: 0;
			.hairline(top,@border-color);
			height: 1px;
		}
	}
	.main-date{
		font-size: 0.6rem;
		padding: 0.2rem 0.9rem;
		position: relative;
		.date-title{
			position: absolute;
			left: 0;
			font-style: normal;
		}
		span{
			display: inline-block;
    		width: 20%;
    		text-align: center;
		}
	}
</style>
