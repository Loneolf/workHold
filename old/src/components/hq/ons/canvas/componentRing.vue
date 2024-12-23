<template>
    <div class="h5_componentRing" style="height:215px;">
        <canvas id="hqF10Capital" height="200"></canvas>
    </div>
</template>
<script>
import capital from '../../../hq/scripts/tztCapital.js';
export default {
    data(){
        return {
            GRID0:["分类|流入(万元)|流出(万元)|净流入(万元)|","主力|0.00|0.00|0.00|","机构|0.00|0.00|0.00|","大户|0.00|0.00|0.00|","散户|0.00|0.00|0.00|"] //默认值
        }
    },
    ready(){
        var _this = this;
        capital.init({
            $canvas:$('#hqF10Capital'), //canvas对象
            csHeight:'200',
            oData:{GRID0:_this.GRID0},
            zjFontSize:28,
            tlFontSize:24,
        })
    },
    events:{
        'parent-ring':function(data){
            capital.init({
                $canvas:$('#hqF10Capital'), //canvas对象
                csHeight:'200',
                oData:{GRID0:data},
                zjFontSize:28,
                tlFontSize:24,
            })
        }
    }
}
</script>
<style lang="less">
	.h5_componentRing{padding: 0 15px 30px 15px;position: relative;width: 100%;font-size: 0;}
	.h5_componentRing canvas{
	    position: absolute;
	    left: 0;
	    top: 10px; /* 用canvas做动画，会进行分层，要用到  z-index */
	    width: 100%;
	    height: 100%;
	}
</style>


