<template>
    <div class="ck_jrsy">
        <div class="jrsy_left">
            <span class="text">{{title}}</span>
            <span class="question" v-if="isQuesIcon" @click.stop="onClickQuestion"></span>
            <slot></slot>
        </div>
        <div class="j_ggck" @click="onClickDetail">
            <span class="text">{{rightText}}</span>
            <span class="icon" v-if="isRightIcon"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'isQuesIcon', 'rightText', 'isRightIcon'],
        methods: {
            onClickQuestion: function(){
                this.$emit('question-click');
            },
            onClickDetail: function(){
                this.$emit('detail-click');
            }
        }     
    }
</script>
<style lang="less" scoped>
    .ck_jrsy {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -moz-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        // width: 100%;
        height: .68rem;
        line-height: 0.68rem;
        padding: 0 0.3rem;
        background-color: #fff;
        overflow: hidden;
        border-bottom: 1px solid #f3f3f3;
        .jrsy_left {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            .text {
                font-family: PingFangSC-Medium;
                font-size: .26rem;
                color: #222222;
                font-weight: 400;
            }
            .question {
                display: inline-block;
                width: 0.28rem;
                height: 0.28rem;
                margin-left: .08rem;
                background: url(../../../../assets/jy/images/icon-question.png) no-repeat;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
        .j_ggck {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            .icon {
                width: 0.36rem;
                height: 0.36rem;
                background: url(../../../../assets/jy/images/icon-godetail.png) no-repeat;
                background-repeat: no-repeat;
                background-size: 100%;
                margin-top: .02rem;
            }
            .text {
                font-family: PingFangSC-Regular;
                font-size: 0.24rem;
                color: #777777;
                letter-spacing: 0;
                text-align: right;
                font-weight: 400;
            }
        }
    }

    .ck_jrsy.zaitu,.ck_jrsy.qingcang {
        border: none;
        .jrsy_left .text {
            font-family: PingFangSC-Regular;
            font-size: .32rem;
            color: #222222;
            line-height: .32rem;
            font-weight: 400;
        }
    }
    .ck_jrsy.zaitu {
        margin-top: .2rem;
        position: relative;
    }
    .ck_jrsy.zaitu::after {
        position: absolute;
        display: block;
        content: '';
        width: 6.9rem;
        height: 1px;
        bottom: 0;
        left: 0.3rem;
        background-color: #f3f3f3;
    }
    .ck_jrsy.zaitu.noBottomLine {
        margin-bottom: .5rem;
    }
    .ck_jrsy.zaitu.noBottomLine::after {
        display: none;
    }
    .zaitu,.qingcang {
        height: .96rem!important;
        line-height: 0.96rem!important;
    }
    #chicang-title {
        height: .8rem;
        line-height: .8rem;
        .jrsy_left .text {
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #222222;
            line-height: .8rem;
            font-weight: 400;
        }
    }
</style>

