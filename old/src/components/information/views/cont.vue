<template>
  <div class="marginbalance content">
    <div class="head">
      <h1 class="title">{{TITLE}}</h1>
      <p class="descr"><span class="origin">{{MEDIA}}</span><span class="time">{{DATES | date}} {{TIME}}</span></p>
    </div>
    <div class="cont">
      <p v-for="items in contData" track-by="$index">{{{items}}}</p>
    </div>
    <div class="declaraction">
      <p class="dec-cont">免责声明：本栏目所载文章和数据仅供投资者作参考之用，不保证其内容的准确性、完整性，不构成投资建议。投资者据此做出的任何投资决策与德邦证券无关。</p>
    </div>
  </div>
</template>

<script>
  import utils from '../../../util/util'
  import service_index from '../service/index/service_index'
  export default {
    data () {
      return {
        TITLE:'',
        MEDIA:'',
        DATES:'',
        TIME:'',
        menuid:'',
        sId:'',
        cont:'',
        flag:'',
        contData:[]
      }
    },
    ready(){
//    this.getCustomers();
    },
    attached(){
//    $.init();
      this.cont = '';
      this.TITLE = '';
      this.MEDIA = '';
      this.DATES = '';
      this.TIME = '';
      this.inits();
    },
    methods:{
      inits(){
        this.type = this.$route.query.type;
        this.flag = this.$route.query.flag;
        this.sId = this.$route.query.id;
        this.getCustomers();
      },
      getCustomers(){
        var that = this;
        var action = '';
        var obj = {
          id:that.sId
        };
        var typeArray = ['jrtt','ssgd','gsyj','hyyj','qhyj','sbxw','chbg','xgcl','ggxw','rdzj','sbyj','xsb','qqss','ggztc'];
        if(that.type === 'zxg'){
          obj.flag = that.flag;
          obj.menu_id = '20001';
          action = 'require46117';
        }else if(typeArray.indexOf(that.type)>-1){
          action = 'require46119';
        }else {
          return;
        }
        service_index[action](obj)
        .then((oData)=>{
          that.MEDIA = oData.MEDIA;
          that.TITLE = oData.TITLE || oData.INFOTITLE;
          that.DATES = oData.DATES;
          that.TIME  = oData.TIME;
          if(oData.GRID0){
            var reg = /style\s*=(['\"\s]?)[^'\"]*?\1/gi;
            for(var i=0;i<oData.GRID0.length;i++){
              oData.GRID0[i] = oData.GRID0[i].replace(/\http\:\/\/stock\:/g,'/index2.html#!/hq/ggStockInfo?stockcode=').replace("\r\n", "</br>").replace("　　", "").replace( reg , '').trim();
            }
          }
//          that.cont  ='<p>' +oData.GRID0.join('</p><p>')+'</p>';
          that.$set('contData',oData.GRID0);
          that.$nextTick(function () {
            var _w = parseInt($(window).width());//获取浏览器的宽度
            $(".cont img").each(function(i){
              var img = $(this);
              var realWidth;//真实的宽度
              var realHeight;//真实的高度
//这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
              $("<img/>").attr("src", $(img).attr("src")).load(function() {
                /*
                 如果要获取图片的真实的宽度和高度有三点必须注意
                 1、需要创建一个image对象：如这里的$("<img/>")
                 2、指定图片的src路径
                 3、一定要在图片加载完成后执行如.load()函数里执行
                 */
                realWidth = this.width;
                realHeight = this.height;
//如果真实的宽度大于浏览器的宽度就按照100%显示
                if(realWidth>=_w){
                  $(img).css("width","100%").css("height","auto");
                }
                else{//如果小于浏览器的宽度按照原尺寸显示
                  $(img).css("width",realWidth+'px').css("height",realHeight+'px');
                }
              });
            });
          });
        })
      },
      stockFunc(){
        console.log(0);
      }
    },
    filters:{
      filunit(vaule,num){
        return utils.fmtunit(vaule,num);
      },
      date(value){
        return value.replace(/^(\d{4})(\d{2})(\d{2})$/i,'$1-$2-$3');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .head{
    padding: 0.5rem;
    .title{
      margin: 0;
      line-height: 1rem;
      font-size: 0.8rem;
    }
    .descr{
      position: relative;
      .hairline(bottom,#c8c8c8);
      padding: 0.4rem 0;
      font-size: 0.7rem;
      .origin{
        display: inline-block;
        width: 30%;
      }
      .time{
        display: inline-block;
        width: 70%;
        text-align: right;
      }
    }
  }
  .cont{
    padding: 0 0.5rem;
    font-size: 0.7rem;
    p{
      text-indent: 1rem;
    }
  }
  .declaraction{
    padding:0.5rem;
    font-size: .7rem;
  }
  .dec-cont{
    padding: 0.5rem;
    position:relative;
  }
  .dec-cont:before{
     content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: auto;
      top: 2px;
      height: 1px;
      width: 100%;
      background-color: #aaa;
      display: block;
      z-index: 15;
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
   }
</style>
