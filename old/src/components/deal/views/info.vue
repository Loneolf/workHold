<template>
  <div class="explain content native-scroll">
     <div class="wapper">
          <table class="detInfo j_info newtable">
                  <tr class="list"  v-for="(key,value) in dataObj"><td class="w30 name">{{key}}</td><td class="w70 cont">{{value}}</td></tr>
          </table>
    </div>
    <div class="updw clear">
        <span @click='preList()'>上一条</span>
        <span @click='nextList()'>下一条</span>
    </div>
  </div>
</template>

<script>
  import localService from '../../../services/localService'
	export default{
		data(){
			return {
        num: 0,
        dataObj: {},
        aList: [],//列表数据
        sField: '',//字段名
        MAXCount: 0
			}
		},
    ready(){
      this.init();
    },
    methods: {
      init(){
        this.info();
      },
      getUrlParameter(parameterName,str){
       //获取url参数值
       var reg = new RegExp("(^|&|\\?)" + parameterName + "=([^&]*)(&|$)", "i"),arr,arr1;
            if(str){
                arr = str.match(reg);
                arr1 = str.match(reg);
            }else{
                arr = location.search.substr(1).match(reg);
                arr1 = location.hash.substr(2).match(reg);
              }
            if (arr) {
                return arr[2];
            }else if(arr1){
                return arr1[2];
            }
      },
      info () {
        var that = this;
        // $.hidePreloader();
        that.num = that.getUrlParameter('num');
        localService.readMapMesg(['C_DETAIL'])
        .then((data)=>{
          let field = JSON.parse(data.C_DETAIL).field;
          let Arr = JSON.parse(data.C_DETAIL).Arr;
          var maxcount = Arr.length-1;
          // console.log(field);
          // console.log(Arr);
          that.$set('aList',Arr);
          that.$set('sField',field);
          that.$set('MAXCount',maxcount);
          that.showinfo(field, Arr[that.num]);
        })
      },
      showinfo (field, sinfo) {
        var aItem = sinfo.split('|');
        var aField = field.split('|');
        var listObj={};
        aField.forEach((value,index)=>{
          if(value){
            listObj[value] = aItem[index];
          }
          })
          // console.log(listObj);
          this.$set('dataObj',listObj);
      },
      //上一条和下一条
      preList () {
        if (this.num == 0) {
                alert('当前页第一条记录！'); return;
            }
            this.num--;
            this.showinfo(this.sField, this.aList[this.num]);
       },
      nextList () {
        if (this.num == this.MAXCount) {
                alert('当前页最后一条记录！'); return;
            }
            // console.log(this.MAXCount)
            this.num++;
            this.showinfo(this.sField, this.aList[this.num]);
      }

    }
	}
</script>

<style lang="less" scoped>
	@import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
.wapper{padding-bottom: 44px;overflow:scroll;height: 100%;}
.detInfo li{
    position: relative;
    border-bottom: 1px solid #373737;
    /*border-top: 1px solid #282828;
    margin-left: 2px;*/
    min-height: 43px;
    background: #D7D5D5;
    font-size: 0;
    /*line-height: 42px;*/
}
.detInfo li span{
    width: 30%;
    font-size: 14px;
    color: #7b7b7b;
    min-height: 42px;
    display: inline-block;
    vertical-align: top;
    padding: 15px 0 15px 8px;
    line-height: 16px;
}
.detInfo li .jtInfo{
    width: 70%;
    background-color: #fff;
    color: #000;
    font-size: 12px;
    padding: 15px 10px 15px 10px;
    min-height: 42px;
    line-height: 16px;
    display: inline-block;
    overflow-wrap: break-word;
}
.box .updw{
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    width: 100%
}
.updw{
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    width: 100%;
    border-top: 1px solid #e4e4e4;
}
.updw .j_pre{border-right: 1px solid #ffffff;}
.updw span{
    display: inline-block;
    float: left;
    height: 44px;
    text-align: center;
    width: 50%;
    font-size: 14px;
    color: #555;
    line-height: 44px;
    background-color: #e7e7e7;
}
.w30{width: 35%;}
.w70{width: 65%;}
.newtable{width: 100%;background-color: #f9f9f9;}
.newtable .list{min-height: 42px;border-bottom: 1px solid #e4e4e4;}
.newtable .list:nth-child(even){background-color: #f3f3f3;}
.newtable .list.child-nth{background-color: #f3f3f3;}
.newtable .name{font-size: 14px;color: #000;padding: 15px 5px 15px 8px;line-height: 16px;/*background: #D7D5D5;*/border-right:1px solid #dadada;text-align: right;}
.newtable .cont{font-size: 14px;padding: 15px 10px 15px 10px;line-height: 16px;/*background-color: #fff;*/color: #000;}
</style>
