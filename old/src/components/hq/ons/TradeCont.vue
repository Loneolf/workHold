<template>
	<div class="trade-cont" v-for="datalist in gridData">
        <h3 class="tarde-date">{{datalist.DATESINDEX | date}}</h3>
        <div class="quota">
            <p class="quota-left"><span>成交价</span><span>{{datalist.TRA_PRICEINDEX | filunit 2}}元</span></p>
            <p class="quota-cont"><span>成交量</span><span>{{datalist.TRA_VOLUMEINDEX | filunit 2}}股</span></p>
            <p class="quota-right"><span>成交额</span><span>{{datalist.TRA_AMOUNTINDEX | filunit 2}}元</span></p>
        </div>
        <ul class="tarde-list">
            <li>
                <span>买方</span>
                <span>{{datalist.BUYERINDEX}}</span>
            </li>
            <li>
                <span>卖方</span>
                <span>{{datalist.SELLERINDEX}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
	import utils from '../../../util/util'
	export default {
		data(){
			return {
				gridData:{}
			}
		},
	    events: {
	        'parent-blocktrade': function(Data) {
	            this.gridData = Data;
	        }
	    },
	    filters: {
	        filunit(vaule, num) {
	            return utils.fmtunit(vaule, num);
	        },
            date(value){
                return value.replace(/^(\d{4})(\d{2})(\d{2})$/i,'$1-$2-$3');
            }
	    }
	}
</script>
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
@import "../../../assets/less/mixins.less";
.trade-cont {
    margin-top: 0.5rem;
    position: relative;
    .hairline(bottom,@color-split);
    .tarde-date {
        font-size: 0.7rem;
        line-height: 1.6rem;
        padding: 0 0.75rem;
        margin: 0;
        font-weight: normal;
        position: relative;
        .hairline(bottom,@color-split);
        .hairline(top,@color-split);
    }
    .quota {
        padding: 0.4rem 0.75rem;
        font-size: 0;
        p {
            display: inline-block;
            font-size: 0.7rem;
            span {
                display: block;
                line-height: 1.2rem;
            }
        }
        .quota-left {
            width: 24%;
        }
        .quota-cont {
            width: 38%;
            text-align: center;
            position: relative;
    		.hairline(left,@color-split);
    		.hairline(right,@color-split);
        }
        .quota-right {
            width: 38%;
            text-align: right;
        }
    }
    .tarde-list {
        padding: 0 0.75rem;
        margin: 0;
        padding-bottom: 0.5rem;
        li {
            list-style: none;
            font-size: 0;
            padding-top: 0.5rem;
            span {
                display: inline-block;
                font-size: 0.7rem;
                vertical-align: top;
            }
            :nth-child(1) {
                width: 20%;
            }
            :nth-child(2) {
                width: 80%;
            }
        }
        li:nth-child(1) {
            position: relative;
    		.hairline(top,@color-split);
        }
    }
}
</style>