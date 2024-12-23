<template>
        <div>
            <div class="mask" v-show="show" transition="fade" @click="onMaskClick"></div>
            <div class="dialog" v-show="show" :id="id" transition="scale">
                <slot></slot>
            </div>
        </div>
        
</template>

<script>
    export default{
        props: {
            id: {
                type: String,
                default: 'default-dialog',
            },
            show: {
                type: Boolean,
                default: false
            },
            isMaskClick: {
                type: Boolean,
                default: false
            }
        },
        attached(){
             this.$nextTick(function(){
                if(document.body.append){
                    document.body.append(this.$el);
                    
                }
                else{
                    document.body.appendChild(this.$el);
                }
            });
        },
        watch:{
            show(val){
                var that = this;
                if(val){
                    setTimeout(function(){
                        that.$el.querySelector('.mask').classList.add('click');
                        that.isMaskClick = true;
                    },300);
                    
                }
                else{
                    that.$el.querySelector('.mask').classList.remove('click');
                    that.isMaskClick = false;
                }
            }
        },
        methods: {
            onMaskClick() {
                if(this.isMaskClick){
                    this.show = false;  
                }  
            }
        }     
    }
</script>
<style lang="less" scoped>
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,.7);
        z-index: 2001;
        width: 100%;
        height: 100%;
        pointer-events: none;
        &.click{
            pointer-events: all;
        }
    }

    .dialog {
        position: fixed;
        top: 45%;
        left: 50%;
        width: 6.4rem;
        overflow: hidden;
        font-size: .32rem;
        background-color: #fff;
        border-radius: 0;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        z-index: 2002;
    }

    .fade-transition {
        -webkit-transition: .3s;
        transition: .3s;
        -webkit-transition-property: opacity;
        transition-property: opacity;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }

    .scale-transition {
        -webkit-transition: .3s;
        transition: .3s;
        -webkit-transition-property: opacity,-webkit-transform;
        transition-property: opacity,-webkit-transform;
        transition-property: transform,opacity;
        transition-property: transform,opacity,-webkit-transform;
    }
    .scale-enter, .scale-leave {
        opacity: 0;
        -webkit-transform: translate(-50%, -50%) scale(0.5);
                transform: translate(-50%, -50%) scale(0.5);
    }
</style>

