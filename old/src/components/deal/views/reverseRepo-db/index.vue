<template>
  <div class="content">
    <div class="header">
      <p class="index">当前可用资金(元)</p>
      <p class="price">{{availableFunds}}</p>
    </div>
    <div class="list">
      <p @click="clickdata(0)"><span class="listImg listOut"></span><span>撤单</span></p><p @click="clickdata(1)"><span class="listImg listQuery"></span><span>查询</span></p><p @click="clickdata(2)"><span class="listImg listIntroduce"></span><span>产品介绍</span></p><p @click="clickdata(3)"><span class="listImg listHelp"></span><span>交易帮助</span></p>
    </div>
    <div class="btn" @click="clickdata(4)">
      <p><span class="listImg listBtn"></span>开始放贷</p>
    </div>
  </div>
</template>

<script>
  import service_deal_often from '../../service/common/service_deal_often'
export default {
  data () {
    return {
      availableFunds:'',
      jyloginflag:0
    }
  },
  ready(){

  },
  attached(){
    this.getCustomers();
  },
  methods:{
    getCustomers(){
      var that      = this;
      service_deal_often.require116()
        .then((data)=>{
          data[0] && data[0][1]['USABLEINDEX'] && that.$set('availableFunds',data[0][1]['USABLEINDEX'])
        })
    },
    clickdata(index){
      let urlArray = [
        '/deal/reverseRepo/repoQuery',
        '/deal/reverseRepo/repoQuery?tab=1',
        '/deal/reverseRepo/repoIntroduction',
        '/deal/reverseRepo/repoHelp',
        '/deal/reverseRepo/repoList'
      ];
      this.$TZT.action10061({url:urlArray[index]});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../../assets/less/variables.less';
.header{
  height: 8rem;
  background: @color-indexbg;
  text-align: center;
  padding: 2.5rem 0 0;
  .index{
    color: @color-index;
    font-size: 0.7rem;
  }
  .price{
    font-size: 1.5rem;
    color: @color-text;
  }
}
.list{
  height: 4.5rem;
  background: @color-text-gray-more;
  p{
    display: inline-block;
    width: 25%;
    text-align: center;
    font-size:0;
    padding:1rem 0 0;
    span{
      display: block;
      font-size: 0.7rem;
    }
    .listImg {
      display: inline-block;
    }
  }
}
.listImg{
  height: 1.5rem;
  width: 2rem;
  display: inline-block;
  background: url("../../../../assets/img/repo.png");
  background-size: 10rem;
}
.listQuery{
  background-position: -2rem;
}
.listIntroduce{
  background-position: -6rem;
}
.listHelp{
  background-position: -4rem;
}
.btn{
  padding: 0.7rem 0.6rem 0;
  p{
    height: 2.2rem;
    line-height: 2.2rem;
    width: 100%;
    text-align: center;
    background: @color-danger;
    vertical-align: middle;
    color: @color-text;

    .listBtn{
      background-position: -8rem;
      vertical-align: middle;
    }
  }
}
</style>
