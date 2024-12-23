<template>
	<div class="content">
		<div class="optional">
			<p class="title">交易状态</p>
			<div @click="createActions" class="opt-buy">{{tradeType}}</div>
			<p class="title">交易时间</p>
			<div class="opt-date"><input type="text" id="my-input" v-bind:value="value" /></div>
			<p class="opt-list"><span class="list-left"><span class="left-top">价格(元)</span><span class="left-bot">现价:2.94</span></span><span class="list-right"><input type="text" placeholder="输入价格"/></span></p>
			<p class="opt-list"><span class="list-left">数量(股)</span><span class="list-right"><input type="text" placeholder="输入数量"/></span></p>
			<p class="opt-list"><span class="list-left">费率(%)</span><span class="list-right">0.02</span></p>
		</div>
	</div>
</template>
<script>
import dateFilter from '../../../filters/dateTimeFormatter';

var value = dateFilter(new Date().getTime(),2);
export default {
  data () {
    return {
     value:value,
     tradeType:'买入'
    }
  },
  ready(){
  	/*$("#my-input").calendar({
	    value: [value],
	    maxDate:value
	  });*/
    $("#my-input").datetimePicker({
      value: ['2017', '01', '22','12','20']
    });
  },
  methods:{
  	createActions(){
  	let that = this;
	var buttons1 = [
        {
          text: '买入',
          color: 'danger',
          onClick: function() {
          	that.tradeType = '买入';
            //$.alert("你选择了“买入“");
          }
        },
        {
          text: '卖出',
          bold: true,
          onClick: function() {
          	that.tradeType = '卖出';
            //$.alert("你选择了“卖出“");
          }
        }
      ];
      var buttons2 = [
        {
          text: '取消'
        }
      ];
      var groups = [buttons1, buttons2];
      $.actions(groups);
  	}
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
.optional{
	padding: 0 0.5rem;
	.title{
		padding:0.75rem 0 0 ;
		font-size: 0.75rem;
	}
	.opt-buy,.opt-date{
		padding: 0.35rem 1.8rem 0.35rem 0.45rem;
		border:@border-default;
		color:#00a9f8;
	}
	.opt-date{
		input{
			border:none;
			background: none;
		}
	}
	.opt-list{
		border-bottom:@border-default;
		padding: 0.75rem 0;
		position: relative;
		.list-left{
			display: inline-block;
			width: 30%;
			span{
				display:block;
			}
			.left-bot{
				position: absolute;
				font-size: 0.6rem;
				bottom: 2px;
				color: @color-rise;
			}
		}
		.list-right{
			display: inline-block;
			width: 70%;
			text-align: right;
			input{
				width: 100%;
				display: inline-block;
				background:none;
				border:none;
				text-align: right;
			}
		}
	}
}
</style>
