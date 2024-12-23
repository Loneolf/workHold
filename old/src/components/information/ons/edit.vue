<template>
  <section class="mainBox">
    <div class="my_head">
      <p><span>我的栏目</span><span>长按删除(默认栏目不能删除)</span><span class="complete" v-show="isComplete" @click="complete">完成</span></p>
      <i class="arrow-1 roratew rorate" @click="closePopup"></i>
    </div>
    <div class="contents">
      <div class="my_tab ex_tab clear" id="bar">
        <div class="my_tab_list" v-for="items in myTabList">
          <p v-tap.self.long="goOrDel($index, $event)">
            <span data-href="{{items.id}}" v-bind:class="$index==index?'highRed':''">{{items.name}}</span>
          </p>
          <template v-if="$index>3"><i class="close" v-show="isOpen" @click="removeadd($index,0)"></i></template>
        </div>
      </div>
    </div>


    <div class="my_head headone" style="display: block;">
      <p><span>点击添加栏目</span><span></span></p>
    </div>

    <div class="contents headone" style="display: block;">
      <div class="my_tab add_tab clear">
        <div class="my_tab_list" v-for="items in tabList">
          <p @click="removeadd($index,1)">
            <span data-href="{{items.id}}">{{items.name}}</span>
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
<script>
	import utils from '../../../util/util'
  import config from '../scripts/config'
  import vueTap from '../../../util/vueTap'
  import localService from '../../../services/localService'
  import vue from 'vue'
  vue.use(vueTap);
	export default {
		data(){
			return {
        tabList:[

        ],
        myTabList:[

        ],
        isOpen:false,
        isComplete:false,
        index:0
			}
		},
    attached(){

    },
    methods:{
      inits(){
        var that = this;
        localService.readFileMesg(['editData'])
          .then((data)=>{
            var myTabList = [
              {id:'jrtt',name:'今日头条'},
              {id:'ssgd',name:'实时滚动'},
              {id:'zxg',name:'自选股资讯'},
              {id:'gsyj',name:'公司研究'}
            ];
            var tabList = [
              {id:'sbxw',name:'新三板新闻'},
              {id:'hyyj',name:'行业研究'},
              {id:'qhyj',name:'期货研究'},
              {id:'ggxw',name:'港股新闻'},
              {id:'chbg',name:'晨会报告'},
              {id:'sbyj',name:'三板研究'},
              {id:'xgcl',name:'新股策略'},
              {id:'rdzj',name:'热点直击'},
              {id:'ggztc',name:'港股直通车'},
              {id:'xsb',name:'新三板'},
              {id:'qqss',name:'全球市场'}
            ];
            if(data.editData){
              var newObj = JSON.parse(data.editData);
              myTabList = newObj.ex;
              tabList = newObj.add;
            }
            that.$set('tabList',tabList);
            that.$set('myTabList',myTabList);
          });
      },
      closePopup(){
        var obj = {
          ex:this.myTabList,
          add:this.tabList
        };
        localService.saveFileMesg({editData:JSON.stringify(obj)});
        this.$dispatch('child-edit');
        $.closeModal('.popup-about')
      },
      removeadd(index,id){
        if(id == 1 && !this.isOpen){
          var newTabList = this.tabList;
          var addTab = {id:newTabList[index]['id'],name:newTabList[index]['name']};
          this.myTabList.push(addTab);
          newTabList.splice(index,1);
          this.$set('tabList',newTabList);
        }
        if(id == 0){
          var newMyTabList = this.myTabList;
          var addMyTab = {id:newMyTabList[index]['id'],name:newMyTabList[index]['name']};
          this.tabList.unshift(addMyTab);
          newMyTabList.splice(index,1);
          this.$set('myTabList',newMyTabList);
        }
        console.log(index,id);
      },
      goOrDel(index,e){
        if(e.isLong){
          this.isOpen = true;
          this.isComplete = true;
        }else {

        }
      },
      complete(){
        this.isOpen = false;
        this.isComplete = false;
      }
    },
    events: {
      'parent-popup': function(index) {
        this.index = index;
        this.inits();
      }
    }
	}
</script>
<style lang="less" scoped>
@import '../../../assets/less/variables.less';
@import "../../../assets/less/mixins.less";
.mainBox{
  font-size: 0.6rem;
}
.my_head {
  position: relative;
  padding: 10px;
  background: #f3f3f3;
}

.my_head p span:first-child {
  font-size: 14px;
}

.my_head p span:nth-child(2) {
  color: #999999;
  margin-left: 10px
}

.contents {
  padding: 10px 0;
}

.my_tab {
  width: 100%;
  padding: 0 5px;
  margin: 10px 0;
}

.my_tab .my_tab_list {
  position: relative;
  float: left;
  width: 25%;
  padding: 6px 6px;
  margin: 6px 0;
}

.my_tab_list p {
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  text-align: center;
  padding: 8px 1px;
}

.my_tab_list.sortable-ghost {
  opacity: .4;
}

.clear {
  overflow: hidden;
}

.close {
  width: 0.8rem;
  height: 0.8rem;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUI1Q0UzOTE1ODU2MTFFNjg0MTJEOTU0NjdFNjc1MUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUI1Q0UzOTI1ODU2MTFFNjg0MTJEOTU0NjdFNjc1MUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QjVDRTM4RjU4NTYxMUU2ODQxMkQ5NTQ2N0U2NzUxRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QjVDRTM5MDU4NTYxMUU2ODQxMkQ5NTQ2N0U2NzUxRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnSGOCgAAAJ4SURBVHjatJY7ayJRFMfPXGcQBB+dLMqKRYqtkjIRsdIUwTYQgvkENkmzH2KbTbH5BCMhkMIuhYKCgkmZVClSuQirjc2Ar/Wx5wx3wuxw78yN6x74V965P8/zHs00TQgwHXWMOkEdofZQUf6bhXpDPaIeUI1KpbL0u0zzARqoKuor6hOo2S/UN9QNgn+LDjDJhweoF9T3D8CAn6VvXmq12oEq8BT1hPoC2xt9+4TQ0yAgHbhDheHfje6480KZJ4ymT5i3MbrLdIeXuQrkdkeeiTy9RajhBlZlOTMMQ80VxkDXdb+cVp22oFM/RdUYi8WgXC5Dv9+HXq8Hm81GeFskEoFisQihUAjq9bpfy3xmvKmFpT+fz2E2m0E2m4VcLgeapglhpVLJ/nPj8TioZY4ZnyAgAzabTZhMJkKoA4tGozAYDKDb7QZF/oTxcSU1y7L+gubzeTtfXlin04H1eh0EPNL5bAQVKAEymYxdHBRCgg2HQ9szBRjZHnMNYlD1NJVKvcPa7TasVivVFol+qMkXi4Utx5bLpbRy/SaBpdS94bAd0kQiAaPRyPY4nU5DoVCwc6poFuPvmTKMwthqtezwbgF9Y/zxVIY5OaNcbgF9ZPylBtlYE8Ec80KpZQLsgYANPnaEUyQej/tWoxuaTCaDtoGGs2Jc8pdaCJ1Op4HVSL1JIXVXsceucO24doJ+g3oVnSIPVEqfWsQH9soZ788TLTznND7/w3tId547S5W7rJ5RF6j1DmF01wXCnmU7zT3qbEee0h1nCLsP2trowKEsp4pG3x56YX57KYVgnypL1jI+pU/f7LvD6F3jZUZJvkb92OWq/0eAAQDAfiEK/93OjQAAAABJRU5ErkJggg==") no-repeat center;
  background-size: 0.8rem 0.8rem;
  position: absolute;
  top: 0%;
  left: -0.025rem;
}

.arrow-1 {
  width: 1rem;
  height: 1rem;
  margin: -0.5rem 0 0;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZWM5ZTQ1Yy0wNTNjLTZjNGItYjM1Mi01ZjIxMzY4MmYwNWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxREM3ODQ0ODlGMTFFNkIwQjRFNjNGRjM2NzVBQUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTAxREM3ODM0ODlGMTFFNkIwQjRFNjNGRjM2NzVBQUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGQyODAzOWMtZDAxZC01YzQzLTkxMDgtYTE0MTFlODFlZTI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRlYzllNDVjLTA1M2MtNmM0Yi1iMzUyLTVmMjEzNjgyZjA1YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnxOwbkAAAC2SURBVHja7NbbCQQhDAXQRLEfEbEla7IlEbEfERcHZr5k2Q9HZLkpIJz4IJd773RyMYAA/hOwlNJzzmSMIa01r+gpVk4bY6RaK6WUlvVcCrxvo7V2JvCNAhBAAAEE8PCahoWx9Mc+XbmyvpWUkqy104AxPcGduHt3jxT08xWPacZU296ZEFdEez0PhhCeZt57xi8GEEAAAQQQwL1AZn7i05FA5xwppa409GpgPT5RAwjgxvoIMAD/AFcaM4s75gAAAABJRU5ErkJggg==") no-repeat center;
  background-size: 1rem 1rem;
  position: absolute;
  top: 50%;
  right: 0.5rem;
}

.complete {
  color: #d93131;
  border: 1px solid #d93131;
  /*display: inline-block;*/
  padding: 1px 12px;
  float: right;
  margin-right: 40px;
  border-radius: 10px;
}
.roratew{
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.rorate{
  -webkit-transform:rotate(45deg);
  -moz-transform:rotate(45deg);
  -ms-transform:rotate(45deg);
  -o-transform:rotate(45deg);
  transform:rotate(45deg);
}
.my_head {
  background: #f3f3f3;
}

.my_head p span:first-child {
  color: #000;
}

.my_head p span:nth-child(2) {
  color: #999999;
}

.my_tab_list p {
  border: 1px solid #b0b0b0;
  color: #000;
}

.highRed {
  color: #f24957;
}
</style>
