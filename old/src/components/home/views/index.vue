<template>
  <div class="explain content native-scroll">
    <div class="swipe">
      <swipe class="my-swipe" :speed="500" :auto="0" :show-indicators="true" :no-drag="true">
        <swipe-item class="slide1"><div class="swiper-slide swiper-slide-active" style="width: 320px;"><img class="image" src="../../../assets/images/banner_04.jpg"></div></swipe-item>
        <swipe-item class="slide2"><div class="swiper-slide swiper-slide-active" style="width: 320px;"><img class="image" src="../../../assets/images/banner_04.jpg"></div></swipe-item>
        <swipe-item class="slide3"><div class="swiper-slide swiper-slide-active" style="width: 320px;"><img class="image" src="../../../assets/images/banner_04.jpg"></div></swipe-item>
      </swipe>
    </div>
    <div class="home_tab">
      <ul class="product_main clear">
        <li class="product_list">
          <img width="83px" height="65px" class="product_img" src="../../../assets/images/product_i.jpg">
          <p class="product_name">易方达货币E</p>
          <p class="product_code">511801</p>
          <p class="product_sm">用闲钱去赚零花钱<span class="product_sms">7日年化收益率</span></p>
          <p class="product_pencent">2.64%</p>
        </li>
        <li class="product_list">
          <img width="83px" height="65px" class="product_img" src="../../../assets/images/product_i.jpg">
          <p class="product_name">易方达货币E</p>
          <p class="product_code">511801</p>
          <p class="product_sm">用闲钱去赚零花钱<span class="product_sms">7日年化收益率</span></p>
          <p class="product_pencent">2.64%</p>
        </li>
      </ul>
    </div>

    <div class="home_tab">
      <ul class="home_main clear">
        <li class="home_list">
          <i class="znxg"></i><p>智能选股</p>
        </li>
        <li class="home_list">
          <i class="lhb"></i><p>龙虎榜</p>
        </li>
        <li class="home_list">
          <i class="zlcc"></i><p>主力持仓</p>
        </li>
        <li class="home_list">
          <i class="lrgm"></i><p>两融规模</p>
        </li>

        <li class="home_list">
          <i class="dzjy"></i><p>大宗交易</p>
        </li>
        <li class="home_list">
          <i class="wykh"></i><p>我要开户</p>
        </li>
        <li class="home_list">
          <i class="ywbl"></i><p>业务办理</p>
        </li>
        <li class="home_list">
          <i class="zdy"></i><p>自定义</p>
        </li>
      </ul>
    </div>

    <div class="home_tab">
      <ul class="zx_main">
        <p class="tz"><span class="vline"></span><span>通知公告</span><span class="all">查看全部</span><i class="arrow-1"></i></p>
        <li class="zx_list">
          <p class="zx_name">收益凭证-融银27号公告成立</p>
          <p class="zx_date">2016-10-20 14:00</p>
        </li>
        <li class="zx_list">
          <p class="zx_name">收益凭证-融银27号公告成立</p>
          <p class="zx_date">2016-10-20 14:00</p>
        </li>
      </ul>
    </div>

    <div class="home_tab">
      <ul class="zx_main">
        <p class="tz"><span class="vline"></span><span>资讯</span><span class="all">查看全部</span><i class="arrow-1"></i></p>
        <li class="zx_list">
          <p class="zx_name">国家质检总局：物联网传感器时代中国要掌握“五权”</p>
          <p class="zx_date">2016-10-20 11:14:09</p>
        </li>
        <li class="zx_list">
          <p class="zx_name">工信部：前三季钢煤去产能完成全年目标80%以上</p>
          <p class="zx_date">2016-10-20 11:14:09</p>
        </li>
        <li class="zx_list">
          <p class="zx_name">长城电脑：重组关联企业产品被神舟项目采用</p>
          <p class="zx_date">2016-10-20 11:14:09</p>
        </li>
        <li class="zx_list">
          <p class="zx_name">六方面推进网络强国建设 推动5G研发</p>
          <p class="zx_date">2016-10-20 11:14:09</p>
        </li>
      </ul>
    </div>

    <div class="home_tabs">
      <ul class="zx_main">
        <p class="tz"><span class="vline"></span><span>我要吐槽</span></p>
      </ul>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  require('vue-swipe/dist/vue-swipe.css');
  export default{
    data(){
      return {

      }
    },
    ready(){

    },
    attached(){

    },
    methods: {
      goOut(){
        this.isBtn = false;
        this.$TZT.action10402();
      },
      action10090(url){
        this.$TZT.action10090({url:url});
      },
      action10061(url){
        this.$TZT.action10061({url:url});
      },
      tradeaction(action){
        this.$TZT.tradeaction({action:action});
      }
    },
    components:{
      Swipe,
      SwipeItem
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .swipe{
    height: 121px;
    position: relative;
  }
  .swipe-items-wrap .image {
    width: 100%;
    display: block;
    margin: 0 auto;
    text-align: center;
    vertical-align: top;
  }
  .home_tab{margin-top: 0.5rem;}
  .home_tabs{margin-top: 0.5rem;margin-bottom:0.1rem;}

  .product_main .product_list{position: relative;padding: 0.5rem 0.7rem 0.5rem 5.65rem;border-bottom: 1px solid #e6e5e5;}
  .product_list .product_img{position: absolute; left: 0.16rem;top: 50%;margin: -1.65rem 0 0;}
  .product_list .product_name {  font-size: 0.8rem;line-height: 1rem;color: #333;padding-bottom: 0.1rem;}
  .product_list .product_code{display: inline-block;background: #00A9F8;color: #333;padding: 0.1rem;}
  .product_list .product_sm{padding-top: 0.1rem;font-size: 0.6rem;color: #434343;}
  .product_list .product_sms{float: right;font-size: 0.6rem;color: #434343;}
  .product_list .product_pencent{
    position: absolute; right: 0.7rem;top: 50%;margin: -1.25rem 0 0;
    font-size: 1.04rem;
    color: #ff0000;
  }
  .home_main .home_list{  float: left;  width: 25%;  text-align: center;  padding: 0.5rem 0;font-size: 0.7rem;color: #333}

  .home_list i{width: 2.25rem;height: 2.25rem;display: inline-block;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAFoCAYAAAD+RtHSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUQ0QzRDRjM5NjhGMTFFNkIxM0I4RjJFNzJDNUM1MzQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUQ0QzRDRjI5NjhGMTFFNkIxM0I4RjJFNzJDNUM1MzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc2ODI3QUFGODZCODExRTY5MjA1RDg3MjQ0M0FDMDlDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc2ODI3QUIwODZCODExRTY5MjA1RDg3MjQ0M0FDMDlDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XcRb9gAARntJREFU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") no-repeat;
    background-size: 4.5rem 9rem;}
  .home_list .lhb{background-position: -2.25rem 0;}
  .home_list .zlcc{background-position: 0 -2.25rem;}
  .home_list .lrgm{background-position: -2.25rem -2.25rem;}
  .home_list .dzjy{background-position: -2.25rem -4.5rem;}
  .home_list .wykh{background-position: 0 -4.5rem;}
  .home_list .ywbl{background-position: 0 -6.75rem;}
  .home_list .zdy{background-position: -2.25rem -6.75rem;}

  .zx_main .tz {padding: 0.5rem 1.5rem 0.5rem 0.75rem;font-size: 14px;position: relative;color: #333;}
  .home_tabs .zx_main .tz{padding: 0.5rem 0 0.5rem 0.75rem;}
  .zx_main .tz .vline {
    display: inline-block;
    width: 0.25rem;
    height: 0.65rem;
    background: #ff8c2f;
    margin-right: 0.25rem;
  }
  .zx_main .tz .all{display: inline-block;float: right;color: #999999}
  .zx_main .tz .arrow-1{
    width: 10px;
    height: 18px;
    margin: -9px 0 0;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAwCAYAAAACYxrZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODI2NDBBNURBNkQyMTFFNDgyMkFBQUM2MDMzMzFGMDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODI2NDBBNUVBNkQyMTFFNDgyMkFBQUM2MDMzMzFGMDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MjY0MEE1QkE2RDIxMUU0ODIyQUFBQzYwMzMzMUYwMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MjY0MEE1Q0E2RDIxMUU0ODIyQUFBQzYwMzMzMUYwMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm7HRbgAAAJbSURBVHja7JhPSJRRFMVnnBTCReCulSBt2uXCnVgpDlmJMxomJpokkmkiCgYGpaBQoJGhIgkJ4kIQxYWVjRpqIkmkCCLYRsEWLsQSyb/oeB6cgcunEMi7A4IPfsx372IO7833zr133MFg0BXOFeEK8wq74IXQQyAQMB+PQTw/rZ211+s9LohVBNqAGxyAUpuiJx1pEsXMKgHNIlYRLAQ9In4K3mgKmmPMA70iVwGaNN9SI/oA9IlcJXiteS32QS4YELlq0KB5D/fAfTAocjWgTvPiG9Es8FnkXoCXmk5jRP3gi8jVguea1rZL0WGRqwfPNL10G/jAV5F7Bao0zXsLpINxkWvkXVWrFkb0DpgUOeNG5Zrl6R+4DaYYG799C55o1sNNin4Xoi2gWLMAb4Bb4IcQbQePNCu+ETXV9acQfc/Ko9Zi/KXorPjODpCv2dOsU3SOsQd8YBFQa6LWQCqYF6JdIFuza4t09ElGNOfErs3CiqX1xYncJ6egrR1eARNCbI+tpp/PVnd4FYyCy6K63HMUb2s7vAbGhFjI4Af/23mfYiWAIRAj7O4uj9a60ySyIMc4Lv+Ehpcmc2eXxP1LEUZuVTCNv08041VwE8xo1EMfe9WLjH+DG8JZrArmcASIYrzM4WdRo6d5CLrFG/2LYksaXVsJXd/DeAFcBysafakZYlrFjDhLsVWNzruGY1pIbJqv/prGbNHgmJS+8VL/sfqnAnfTyKMMrRGQQY902RZ8B8pE/JGuv6M1ARu3OORzP8i0LebcYSeP1XhlAcdv68t9/l/bmRc8EmAAITh+NNiZhksAAAAASUVORK5CYII=") no-repeat center;
    background-size: 12px 21px;
    position: absolute;
    top: 50%;
    right: 10px;
  }

  .zx_main .zx_list{
    padding: 0.5rem 1.75rem 0.5rem 0.75rem;
    background: #fbfbfb;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
  }
  .zx_list .zx_name {
    font-size: 0.8rem;
    line-height: 1rem;
    color: #333;
  }
  .zx_list .zx_date {
    padding: 0.4rem 0 0;
    font-size: 0.6rem;
    line-height: 0.6rem;
    color: #b7b7b7;
  }
  .clear:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
  }
</style>
