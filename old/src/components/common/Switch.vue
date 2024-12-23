<template>
    <div class="van-switch" :class="{'van-switch--on': switchStatus}" @click="changeSwitchStatus">
        <div class="van-switch__node"></div>
    </div>
</template>

<script>
    export default{
        props: ['initStatus'],
        data(){
            return {
                switchStatus: false
            }
        },
        ready(){
           this.switchStatus = this.initStatus;
        },
        watch: {
            initStatus(val, oldVal) {
                this.switchStatus = val;
            }
        },
        methods: {
            changeSwitchStatus(){
                if(this.switchStatus){
                    this.switchStatus = false;
                    this.$emit('off');
                    
                }
                else{
                    this.switchStatus = true;
                    this.$emit('on');                    
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .van-switch {
        position: relative;
        display: inline-block;
        box-sizing: content-box;
        width: 2em;
        height: 1em;
        font-size: 30px;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 1em;
        cursor: pointer;
        -webkit-transition: background-color .3s;
        transition: background-color .3s;
        &.van-switch--on {
            background-color: #1989fa;
            .van-switch__node {
                -webkit-transform: translateX(1em); 
                transform: translateX(1em); 
            }
        }

        .van-switch__node {
            position: absolute;
            top: 0;
            left: 0;
            width: 1em;
            height: 1em;
            background-color: #fff;
            border-radius: 100%;
            box-shadow: 0 3px 1px 0 rgba(0,0,0,.05), 0 2px 2px 0 rgba(0,0,0,.1), 0 3px 3px 0 rgba(0,0,0,.05);
            // -webkit-transition: -webkit-transform .3s cubic-bezier(.3,1.05,.4,1.05);
            // transition: -webkit-transform .3s cubic-bezier(.3,1.05,.4,1.05);
            // transition: transform .3s cubic-bezier(.3,1.05,.4,1.05);
            // transition: transform .3s cubic-bezier(.3,1.05,.4,1.05),-webkit-transform .3s cubic-bezier(.3,1.05,.4,1.05);
        }
    }
    
</style>