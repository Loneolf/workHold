<template>
  <div>
  <nav class="bar bar-nav">
    <div class="t1" is-stock-input="true" placeholder="输入股票代码/首字母" maxlength="6" value="" @click="keyPanel" v-on:input="clickInput"><em>输入股票代码/首字母</em></div>
    <span class="button-nav pull-right">
      <span class="icon text" @click="goback()">取消</span>
    </span>
  </nav>
  <div class="content">
    <div class="fund_table tableList search_list2">
      <div class="sl_list">
        <ul>
          <li v-for="items in grid"><span class="icon" @click="addzx($index)"><img v-if="items.isshow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyRjM1NzREODk3RkVFNDExQTk3MjkxMTBBODBFQUE4RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzIwNjQwRUEzRDYxMUU1OThEMEU0RDU4QTUwMjQ1QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzIwNjQwREEzRDYxMUU1OThEMEU0RDU4QTUwMjQ1QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1RDYxOUQwQ0NBM0U1MTE4MTJDRDQ3NUUxNTlEMDI1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjM4ZDAxNDgtODZiYS0xMWU1LTkzOTAtYmI3OTc5MTc2MmNlIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3yeYdAAAA95JREFUeNrMmdtLVEEcx2eNSEg3QYiIwoxK88HsAiZ4werBLIRSgh5EE4LC7Eq3vyDKogvZQ4RZPXXRonsvRipdHiq7UCmhUlk91bZroE/1/eF3clxcd896dpsffJmds3vOfPY3v5kz8xuPujyoJmBzoWJoOZQJpUNJ0DToFzQA9UJd0BPoIdRjPuDPhimOGvREASwwNVAltDiKP/kSugQ1yp+KJbB47iC0DfLymnivHeqA3rP+G/JBKdBUej0DKoQKWFfsgQboEKAH3AYuh05BM1m/Qw+1ROHh9eyhNax/heoA3eIGcCK9UMP6ffEI1KYmboXssRLWz0I7AD4YLbB06U124xB0ADqh3LddUD00iaFVBuifoX6cEOJ6Kke0wL6FsmMEK7PEcT7/DZQv7XquDKU6AU5kjOZwKloNdasYGqDfsZ3H0CJpH9CJkQLLP86FXnCwfVFxMED3o6hgu7kcO2GBBXCL3A9VQd9UHA3Q0t5GjpkaeLliPGCZW0/z827GruM2x5BTaAm//aw2ANobClh+NAO6G6sB5gD6JDmmG/CjgGUKq+Xnw8oO0xy18HJKMHAN1wi3XXopuOHlNvIIV3UwcCXLRmWXNbGsMoHncc79CF23iRZebiZXDsJivgZexe87lJ3WznKlBl5mObAeU7kaOJMXuiwF/sByoQaeYyzGnb4UInlJjHsPYjPcy+Uzy9kaOJkXBiz1cIBlsgb2GlsW6wwzhT8Y2G9sLq0zYy0RCAb2WhoSOmT9GriPF9LC7v/Cy/F96HJPmHb1LrtPA+vpLMNSD2eY01sCt0FiRZYCF7J8qoFbeSHfUuAClq0auJfpo3RukWyaIcrJ1YlY7zGXlxdZVlvmXc1zIXg93MR82FpbYhneLSKPz1gX/wP2GdvqfZZ4V3M0IBx8Y21Cj3BbX8r00f/07k5yfCeXMamPzq1JZrGZn3X6yK01QaSwstx9DU2WxAp3HSGBxc5AW5mBKYP6Y7y4MWElnXsLWgKdw3ebI0lVSRLlGW+6Cs2KUxhIO9fYrrRfF0mqSkxcLom5TigPesDwiCVsNtvJY7ulofLEodKtkp+Vw5ZHUBb0ip6PBewePj+L7RUD9keo3yeM8yyZSkoY02LHoHvQCpdYV/B5R42xU2JOYWMv/SI741inhs84dDxL3us8Y86pSUZyE6ctMUnnyhnHjYh6xOEp0l5ouxrOxYl9Yt6gjcvUXu4NA1x4J6mRU6QCKs3oQXFCfSxOkUzz0kOS3loahYefq+FzOukhfzwOFk1LYyzK6F5AbyZTAUq83q1GTkL7onmhuAUctzegtr8CDACTtCkEQCCNKQAAAABJRU5ErkJggg==" width="22" _v-083d3fd8=""><img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyRjM1NzREODk3RkVFNDExQTk3MjkxMTBBODBFQUE4RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MzNGOUQ4MEEzRDYxMUU1OTI4RUQ1RUU2RERDREUwMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MzNGOUQ3RkEzRDYxMUU1OTI4RUQ1RUU2RERDREUwMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1RDYxOUQwQ0NBM0U1MTE4MTJDRDQ3NUUxNTlEMDI1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjM4ZDAxNDgtODZiYS0xMWU1LTkzOTAtYmI3OTc5MTc2MmNlIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PM3M/gAAA+JJREFUeNrMmdtLVEEcx0czEtJNCCLKMKPShMwuYIIXtB7MIihF6EG0fQrUrnT7C6LsThZEmBU9ZGURXV+MVLo8VEZRKaHS/am2XQN9qu+P/R4dl717dp0ffJ2d49kzn/Ob38zO/CZBXRtWE7AFUCm0GsqGMqEUaAb0BxqCBqBe6Bn0GOrXH/CvelpEDSZEASwwTqgGWh7FS76GrkAt8lKxBBbPHYQaIAevife6oG7oA+t/IReUBk2n17OgYqiIdcUeaIYOAXrIbuBK6DQ0h/V79FB7FB7ezB5az/p3qBHQ7XYAJ9MLTtYfikegTjVxK2aPlbN+HtoB8OFogaVL77AbR6AD0MmJDJjRRttG9OouqAmawtDaiOf+DvTdxADXZ3JEC+w7KNcX1i4D3Ak+/y1UKO3ihWZGApzMGM3jVLQO6lMxNEC/ZztPoWXSPqCTwwWWN86HXnGwfVVxMEB/Q1HFdvM5dkICC+A2+T5UC/1QcTRAS3tbOGac8HJVMGCZW8/w827GbtwN0BJ++1ltBrQjELDcNBu6H6sBFgH0KXLM0uDHAcsUVs/Ph5UZZnHUw8tpvsBOrhHu2vSjYIeXO8kjXHW+wDUsW5RZ1sqyVgdeyDn3E3TLJFp4+Sa58hAWiyzgtfx/tzLTuliusYBXGQ5sjal8CzibF3oNBf7Icon8SYLma4vxoCEVYtUV9coNsZoQ5JYvLOdZHk7lhSFDPexhmWoBO7Qti3EG77t9gd3a5tI409YSHl9gh6EhYYWs2wIe5IWMkPs/mySDjAMtIcSAU9oue9ACtqazLEM9nKVPb4ncBomVGApczPK5BdzBC4WGAhex7LCAB5g+yuQWyaQZopJcPYj1fn15eZllnWHetXgu+a6HW5kP22BKLMO7JeRxaeviUWCXtq3eZ4h3LY5mhIPL3yb0CLf1FUwfTaZ3d5LjJ7n87prll6SBn49DSycJNluDbNDWEn4TKZLyPKfF9dw4w0o69yo0FbrALdI4S/LzPUmirOAK/zpUbXe6yt86GtfSUbSx7RdQYzipKjHJv0pirgcqgB4pb3Yxlp7NZTsFbLciUJ44ULpV8rNy2PIEyoHe0POxgN3D5+ewvVLA/gp0f2KQZ8lUItnxs6wfgx5AZTaxlvF5R1mXdsr1Kcz/kjG8M45NynvGkc665L0uQjeiAJWM5FZOW4rjQ844bofVIxGeIu2FtitvLk7sM/MGnVymDnBv6OHCO0WNnSIVURlaD4oTmmJxiqSbgx6S9NbKKDz8UnnP6aSH3PE4WNQtg7Eoo3sxvZlKeSjxep8aOwkd9NlkxhXYjl1xRPf/F2AAQXgXSPPttakAAAAASUVORK5CYII=" width="22"></span><p @click="ggstock($index)"><small class="accounttype">{{items.markettype | marketType}}</small><em class="code">{{items.stockcode}}</em><em class="name">{{items.stockname}}</em></p></li>
          <li class="search_clear" v-show="clearSearch" @click="clearHistory">清除搜素历史</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import tztMarket from '../scripts/tztMarket';
  import keyPanel from '../../../util/keyPanel/keyPanel';
  import service_hq_often from '../service/common/service_hq_often';
  import tztStockType from '../scripts/tztStockType';
  import tztZXstock from '../scripts/tztZXstock';
  import "../../../assets/less/KeyPanel.less";
	export default {
		data() {
		  return {
		    grid:[],
        clearSearch:false,
        val:'',
        main:keyPanel.main(),
        Func: {
          that:this,
          beforeInitFunc: function() {
            $(this.that.$el).find(".tableList").height($(window).height() - 44);
            $(this.that.$el).find(".tableList").css("overflow", "auto")
          },
          afterInitFunc: function() {
            var _this = this;
            setTimeout(function() {
              $(_this.that.$el).find(".tableList").height($(window).height() - 44 - $(".keyword_table").height());
              $(_this.that.$el).find(".tableList").css("overflow", "auto");
            }, 100)
          },
          beforeCloseFunc: function() {
            $(this.that.$el).find(".tableList").height($(window).height() - 44 - $(".keyword_table").height());
            $(this.that.$el).find(".tableList").css("overflow", "auto");
          },
          afterCloseFunc: function() {
            $(this.that.$el).find(".tableList").height($(window).height() - 44);
            $(this.that.$el).find(".tableList").css("overflow", "auto");
          },
          okFunc: function() {
            var a = $(this.that.$el).find(".bar-nav .t1").attr("value");
            console.log(a);
          }
        }
			}
		},
    attached(){
		  this.inits();
      this.val = '';
      var main =  this.main;
      $($(this.$el).find(".bar-nav .t1 em")).text('输入股票代码/首字母');
      main.init($(this.$el).find(".bar-nav .t1")[0],5,!1,this.Func);
    },
    methods:{
      inits(){
        var that = this;
        tztZXstock.getHistoryZx(function (grid) {
          if(grid == ''){
            that.$set('grid',[]);
          }else {
            that.$set('grid',grid);
          }
          if(that.grid.length>0){
            that.clearSearch = true;
          }else {
            that.clearSearch = false;
          }
        });
      },
      goback(){
        this.main.close();
        window.history.back();
      },
      keyPanel(){
        this.main.init($(this.$el).find(".bar-nav .t1")[0],5,!1,this.Func);
      },
      clearHistory(){
        tztZXstock.setHistoryZx('');
        this.inits();
      },
      addzx(index){
        var list = this.grid[index];
        if(list.isshow){
          list.isshow = false;
          tztZXstock.setZXList(list.stockcode,list.markettype,list.stockname);
        }else {
          tztZXstock.delZXList(list.stockcode);
          list.isshow = true;
        }
        this.grid.$set(index, list);
      },
      clickInput(data){
        var val = data.currentTarget.innerText;
        if(this.clearSearch){
          this.grid = [];
        }
        if(val && val.length >= 1){
          this.val = val;
          tztZXstock.getZXList(this.getSearchData,1);
        }
      },
      getSearchData(array){
        var obj = {
          StockCode:this.val,
          Account:1,
          NewMarketNo:0
        };
        var zxArrays = array;
        var that = this;
        that.clearSearch = false;
        service_hq_often.require32(obj).
          then((data)=>{
            console.log(data);
          if(data.BINDATA){
            var grid = data.BINDATA.split('|').slice(0,-1);
            var market = data.NEWMARKETNO.split('|');
            var ln = grid.length;
            var newGrid = [];
            for(var i=0;i<ln;i++){
              var arrayData = {};
              arrayData.stockcode = grid[i];
              arrayData.stockname = grid[i+1];
              arrayData.markettype = market[newGrid.length];
              if(zxArrays.indexOf(arrayData.stockcode)>-1){
                arrayData.isshow = false;
              }else {
                arrayData.isshow = true;
              }
              i++;
              newGrid.push(arrayData);
            }
            that.$set('grid',newGrid);
          }else {
            that.$set('grid',[]);
          }
        });
      },
      ggstock(index){
        console.log(index);
        var list = this.grid[index];
        if(list){
          tztZXstock.setHistoryZx(`${list.stockcode}|${list.markettype}|${list.stockname}`);
          this.$TZT.action1964(`/hq/ggStockInfo?stockcode=${list.stockcode}&marketno=${list.markettype}`);
        }
      }
    },
    filters:{
      marketType(val){
        return tztStockType.getMarketNameByType(val);
      }
    },
    events:{

    },
    route:{
      canDeactivate({next, redirect}) {
//        console.log(5);
        this.main.close();
        next();
      },
      deactivate({next,redirect}){
//        console.log(6);
        next();
      }
    }
	}
</script>
<style lang="less" scoped>
  @import '../../../assets/less/variables.less';
  @import "../../../assets/less/mixins.less";
  .bar-nav .t1 {
    padding-left: 30px;
    color: #ccc;
    height: 30px;
    line-height: normal;
    border: 0;
    width: 90%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK/SURBVFhH7VdNSxxBEF0CCQRCDIkRvSvkkEsQ8jcSEOJNxYN4ESQHr0N+wB6GXfYzy2z05ICsXnLKPxERdRGE4AiaGD+y8b2hepm4M9PdM5tbFoqena5+9bq6+1VPoaD5eZ73rNFoLNRqtQ4sgPVo9Xr9j9gZ++hDXx2ecT/BAOxJsN9obxHwF9oLtOdof8AuYVfSRx+Sw9CcRKrV6jsEOYUR9AptF9bGLD80m81JPI+4rvsUflPon8X/z/TB8zXHcCwxjGcbdQSIIzO5RbsLmy8Wi491YPSB7xLsIJIRRzfur34GlxncoN3IkspKpTIGnE1rEpJ2pu8Ggz9ZMb/n7DjOA2C4gtXTLgdnKmvO4K08wdVYIbGj9kRqNrlzxXG/VCq9GAYBYshyHMlm9mJxZfbc7ddI1dywgisc4K4Smxs7NgsUEJl91/f9R8MmUC6XnwD/O2Mw1gA+Ora5Y2HNYQePZCE8FbDOQAy8DKhw2p2agx21RBQziCNA+bygwuWIkToU2NOIQenuJRKgtP4rApRuTpLFK5YAOn5mUT1TwpwcY8QS4Eth98oU0NYPevAGMS6TMhBuQtiMLbCpvxQpVtWzuCXoULNhX0wBbf2A7SceQyVELKMUDVtwnT/LdKoQyc2HR5EpWtQB2vYDc01VxcSNHilGe61W66VtkCR/ZHQcwU9SixEHR8oxi9KgXGZgJOX4q6x9oD3mYPmeSiXpcjPE7A+R4GGJJ6axzMM5vJLJdcrH86gtEYydwLhvxOG5F2sb4ygSQuQY/1fw/FAHIJv5I3wP1cwjBEjEnARTJlUyvCPyGOH/OqsaVO01pRUF5jn83uLdMvq3xKd/LeeSMmhmEnEfJpRTyrZUNlY3Pqd+mOQioU6IiBUvLv1PM24uMb5L/TTLTUK3/ib9/0moLN3LhPnJMEmzqY+QCIPfAT8g7PmqU7E9AAAAAElFTkSuQmCC) no-repeat 8px center;
    background-size: 16px 16px;
    vertical-align: top;
    float: left;
    margin-top: 7px;
  }
  .bar-nav .t1 em {
    height: 30px;
    line-height: 30px;
    display: inline-block;
    border: none;
    font-size: 14px;
    position: relative;
  }
  .bar-nav .t1 em:before {
    content: '';
    width: 2px;
    height: 16px;
    position: absolute;
    top: 7px;
    right: 132px;
    background: #999;
    opacity: 0;
  }
  .bar-nav .t1 em:before {
    opacity: 1;
    animation: light 1s 0s infinite;
    -moz-animation: light 1s 0s infinite;
    -webkit-animation: light 1s 0s infinite;
  }
  .bar-nav .t1.active em:before {
    content: '';
    width: 2px;
    height: 16px;
    position: absolute;
    top: 7px;
    right: -3px;
    background: #999;
    opacity: 0;
  }
  @keyframes light {
    0% {
      opacity: 0
    }

    100% {
      opacity: 1
    }
  }
  @-moz-keyframes light {
    0% {
      opacity: 0
    }

    100% {
      opacity: 1
    }
  }

  @-webkit-keyframes light {
    0% {
      opacity: 0
    }

    100% {
      opacity: 1
    }
  }
  .button-nav .text{
    font-size: .7rem;
  }

  .search_list2 .sl_list ul li {
    line-height: 36px;
    padding: 0 20px 0 10px;
    border-bottom: 1px solid #CCC;
    position: relative
  }

  .search_list2 .sl_list ul li small{
    background: #00a9f8;
    color: #fff;
    width: 45px;
    display: inline-block;
    height: 16px;
    line-height: 16px;
    text-align: center;
  }
  .search_list2 .sl_list ul li .code{
    display: inline-block;
    padding-left: 10px;
    width: 30%;
  }


  .search_list2 .sl_list ul li p {
    line-height: 36px;
    font-size: 16px;
    color: #333;
    white-space: nowrap;
    word-wrap: break-word;
  }

  .search_list2 .sl_list ul li span {
    float: right;
    height: 31px;
    line-height: 31px;
    margin-top: 5px;
    width: 60px;
    color: #999;
    text-align: right;
  }

  .search_list2 .sl_list ul li.search_clear {
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    color: #9c9c9c;
  }

  dl,dt,dd{
    margin: 0;
    padding: 0;
  }
</style>
