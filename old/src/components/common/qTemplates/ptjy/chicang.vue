<template>
  <div class="table">
    <div v-for="item in gridData" track-by="$index" @click="listFunc($index)" class="table-list {{item | isBuy YKINDEX}}">
      <p v-for="trItem in dateArray"><span v-for="dataList in trItem" track-by="$index" class="{{$index | textAgline trItem.length |setFont dataList item}}">{{dataList | valueKey item}}</span></p>
    </div>

  </div>
</template>

<script>
  import repoconfig from '../../../deal/scripts/repoconfig'
  import GRID from '../../../deal/scripts/GRID'
  import dealUtil from '../../../deal/scripts/dealUtil'
  import service_ptjy from '../../../deal/service/trade/service_ptjy'
  import {hGuDaiMaiLieBiao} from '../../../../config.js';

  export default{
    props: ['action','viewname'],
		data(){
			return {
        gridData:[],
        gridTitle:[],
        dateArray:[],
        loading:false,
        items: [],
        listNumber:0,
        YKINDEX:'',
        INDEX:{
          STOCKCODEINDEX:''
        },
        textTitleArray:[]
			}
		},
    ready(){
//      console.log(1);
    },
    attached(){
      this.gridData = [];
      this.gridTitle = [];
      this.dateArray = [];
      this.loading = false;
      this.items = [];
      this.listNumber = 0;
      this.textTitleArray = [];
      this.INDEX = {
        STOCKCODEINDEX:''
      };
		  this.init();
    },
    methods: {
        clearData() {
            this.gridData = [];
            this.gridTitle = [];
            this.dateArray = [];
            this.loading = false;
            this.items = [];
            this.listNumber = 0;
            this.textTitleArray = [];
            this.INDEX = {
                STOCKCODEINDEX:''
            };
        },
      init(){
        this.clearData();
        this.loadMore();
      },
      loadMore () {
        var that = this;
        // 如果正在加载，则退出
        if(this.loading){
          return;
        }
        this.loading = true;
        $.showPreloader();
        let oSendData = {
          //起始位置
          StartPos: this.listNumber==0 ? this.listNumber : (this.listNumber+1),
          //最大条数
          MaxCount: repoconfig.config.pagecount
        };

        service_ptjy.require117(oSendData)
          .then((data)=>{
            console.log(data);
            $.hidePreloader();
            if(data.ERRORNO<0){
              $.alert(data.ERRORMESSAGE);
              return;
            }
            let oData = GRID.htmltitle(data,that.listNumber);
            that.YKINDEX = data.YKINDEX;
            if(that.listNumber === 0){
              that.INDEX.STOCKCODEINDEX = data.STOCKCODEINDEX;
              that.INDEX.DATEFORMINDEX = data.DATEFORMINDEX;
              that.INDEX.ZZPINDEX = data.ZZPINDEX;
              data.GRID0 && data.GRID0.shift();
              /*that.$set('textTitleArray',oData.dateTitle);
              that.$set('gridTitle',oData.textTitle);*/
              that.$set('dateArray',oData.dateArray);
              var obj = {
                textTitleArray:oData.dateTitle,
                gridTitle:oData.textTitle,
                dateArray:oData.dateArray
              };
//              that.$emit('headtitle', obj);
              this.$dispatch('headtitle', obj);
              if((!data.GRID0 || data.GRID0.length <=0)){
                that.$dispatch('noDataBlock');
                return;
              }
            }
            if(!data.GRID0){
              data.GRID0 = [];
            }else{
              that.listNumber += repoconfig.config.pagecount;
              that.loading = false;
              that.loadMore()
            }
//            that.$set('gridData',data.GRID0);
            var newData = that.gridData.concat(that.filterCode(data.GRID0));
            // var newData = that.gridData.concat(data.GRID0);
              console.log(newData);
              that.$set('gridData',newData);
          });
      },
        filterCode(list){
          let arr = [];
            for (let i = 0; i < list.length; i++) {
                let slist = list[i];
                let alist = slist.split("|");
                if (~hGuDaiMaiLieBiao.indexOf(alist[9])) {
                    arr.push(slist)
                }
            }
            return arr;
        },
      listFunc(index){
        var listData = this.gridData[index];
        var ArrayList = listData.split('|');
        var stockcode = ArrayList[this.INDEX.STOCKCODEINDEX];
        if(this.action == '123111') {
            this.$parent.$parent.$parent.$parent.updateStockcode(stockcode);
            return false;
        }
        if(this.action){
          this.$TZT.tradeaction({action:this.action,stockcode:stockcode},this);
        }
      }
    },
    filters: {
      isBuy(grid,ykl){
        var className = '';
        if(grid && ykl){
          var val = grid.split('|')[ykl];
          if(parseFloat(val)>0){
            className = 'rise'
          }else {
            className = 'fill'
          }
        }
        return className;
      },
      valueKey(index, grid) {
        let str = grid?grid.split('|')[index]:'';
        return dealUtil.formatZZDate(str,index,this.INDEX.ZZPINDEX,this.INDEX.DATEFORMINDEX);
      },
      textAgline(index,length){
        // let str = grid?grid.split('|')[index]:'';
        // if(str.length<5){
        // }else{
        //   $(this)
        // }
        if(index == 0){
          return 'left';
        }
        if(index == length-1){
          return 'right';
        }
      },
      setFont(last,index,grid){
         let str = grid?grid.split('|')[index]:'';
         var length = str.length;
         var level = '1';
         var last1 = '';
         if(last){
          last1 = last+' ';
         }
         if(length<5){

         }else{
            if(length<7){
              level = '2';
            }else if(length<9){
              level = '3';
            }else{
              level = '4';
            }
         }
         return last1+'spanfont'+level;
      }
    },
    events:{
      'child-loadMore':function () {
        this.loadMore();
      },
        'child-init': function () {
            this.init()
        }
    }
	}
</script>
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  @import "../../../../assets/less/template.less";
  .spanfont1{
    font-size: 0.67rem;
  }
  .spanfont2{
    font-size: 0.63rem;
  }
  .spanfont3{
    font-size: 0.60rem;
  }
  .spanfont4{
    font-size: 12px;
  }
</style>

