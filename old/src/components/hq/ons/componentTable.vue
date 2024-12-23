<template>
	<div class="table-cont">
		<p class="table-title"><span>分类</span><span>流入(万元)</span><span>流出(万元)</span><span>净流入(万元)</span></p>
		<p class="table-list"><span>主力</span><span class="rise"><em class="rise"></em>{{capital['mainForce'][0]}}</span><span class="fill"><em class="fill"></em>{{capital['mainForce'][1]}}</span><span v-bind:class="capital['mainForce'][2]>0?'rise':'fill'">{{capital['mainForce'][2]}}</span></p>
		<p class="table-list"><span>散户</span><span class="rise"><em class="rises"></em>{{capital['retail'][0]}}</span><span class="fill"><em class="fills"></em>{{capital['retail'][1]}}</span><span v-bind:class="capital['retail'][2]>0?'rise':'fill'">{{capital['retail'][2]}}</span></p>
	</div>
</template>
<script>
	export default {
		data() {
        	return {
				capital:{
					mainForce:[],//'20138','19014','1123.45'
					retail:[]//'-49033','50157','-1124.44'
				}
			}
		},
	    events:{
	        'parent-table':function(data){
	            this.capital = data;
	        }
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import '../../../assets/less/variables.less';
    @import "../../../assets/less/mixins.less";
    @border-color:#353535;
    .table-cont{
    	position: relative;
    	.hairline(top,@border-color);
    }
    .table-title{
        font-size: 0.7rem;
    }
    .table-title,.table-list{
    	padding-top: 0.3rem;
    	span{
    		display: inline-block;
    		width: 29%;
    	}
    	span:nth-child(1){
    		width: 13%;
    		text-align: left;
    	}
    	span:nth-child(4){
    		text-align: right;
    	}
    }
    .table-list{
        font-size: 0.6rem;
    	em{
    		display: inline-block;
    		width: 0.5rem;
    		height: 0.5rem;
    		margin-right: 0.3rem;
    	}
    	em.rise{
    		background-color: @color-rise;
    	}
    	em.fill{
    		background-color: @color-fill;
    	}
      em.rises{
    		background-color: #ff8e36;
    	}
    	em.fills{
    		background-color: #b3d950;
    	}
    	.rise{
    		color: @color-rise;
    	}
    	.fill{
    		color: @color-fill;
    	}
      .rises{
    		color: #ff8e36;
    	}
    	.fills{
    		color: #b3d950;
    	}
    }
</style>
