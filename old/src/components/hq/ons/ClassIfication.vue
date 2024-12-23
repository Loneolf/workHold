<template>
  <div class="classIfication">
    <h2 class="title"><span class="day">1日</span><span class="name">分类账户持仓统计(16年03月15日)</span><span class="unit">单位:万股</span></h2>
    <table>
      <tr><th></th><th>机构</th><th>散户</th></tr>
      <tr><td>持仓比</td><td><p>79.20%</p><p class="block-bodies"><span></span></p></td><td><p>20.80%</p><p class="block-retail"><span></span></p></td></tr>
      <tr><td>持仓数</td><td>194039.26</td><td>50960.74</td></tr>
      <tr><td>增减比</td><td>1.10%</td><td>-1.10%</td></tr>
      <tr><td>增减股</td><td>2703.51</td><td>-2703.51</td></tr>
    </table>
  </div>
</template>

<script>
	export default{
		data(){
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../assets/less/variables.less';
	.classIfication{
		padding: 0 0.75rem 0.75rem;
		.title{
			margin: 0;
			line-height: 1.85rem;
			font-weight: normal;
			padding: 0 0 0.2rem;
			.day{font-size: 0.5rem;background-color: @color-rise;padding: 0 0.1rem;}
			.name{font-size: 0.65rem;padding: 0 0.3rem;}
			.unit{font-size: 0.6rem;color:@color-text-secondary;}
		}
		table{
			width: 100%;
			font-size: 0.65rem;
			border:solid @color-split; border-width:0.05rem 0px 0px 0.05rem;
			.rise{color:@color-rise;}
  			.fill{color:@color-fill;}

		}
		td,th{border:solid @color-split; border-width:0px 0.05rem 0.05rem 0px; padding-left:10px;padding:4px 0 4px 10px;font-weight: normal;}
		.block-bodies{
			width:70%;height: 15px;
			span{display: inline-block;width:80%;background-color: @color-rise;height: 15px;}
		}
		.block-retail{
			width:30%;height: 15px;
			span{display: inline-block;width:80%;background-color: @color-fill;height: 15px;}
		}
	}
</style>
