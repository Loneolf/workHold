<template>
<div class="explain content native-scroll">
  <div class="buttons-tab fixed-tab buttons-fixed" data-offset="44">
    <a href="#tab1" class="tab-link button active"><span class="active">深市(1千起)</span></a>
    <a href="#tab2" class="tab-link button"><span class="">沪市(10万起)</span></a>
  </div>
 
  <div class="tabs">
   <div class="gd"></div>
   <div class="explain-ul explain-ul-title">
   <table>
     <tr><th>品种</th><th><p>年化收益率%</p><!-- <p>实际占款天数</p> --></th><th>每10万收益</th><th>可用日期</th><th>占用天数</th></tr>
   </table>
   </div>
    <div id="tab1" class="tab content infinite-scroll active">
      <div class="explain-ul explain-uls">
         <table>
          <!-- <tr><th>品种</th><th><p>年化收益率%</p><p>实际占款天数</p></th><th>每10万收益</th><th>可用日期</th><th>占用天数</th></tr> -->
          <tr v-for="item in gridSZ" @click="listFunc(item)">
            <td class="gzpz"><p>{{item.name}}</p><p class="gray">{{item.STOCKCODEINDEX}}</p></td><td class="red"><p>{{item.yearsyl}}</p><!-- <p>{{item.diff}}天</p> --></td><td class="">{{item.sy}}</td><td class="">{{item.usabledate}}</td><td>{{item.diff}}天</td>
          </tr>
        </table>
      </div>
    </div>
    <div id="tab2" class="tab content infinite-scroll">
      <div class="explain-ul explain-uls">
       <table>
       <!--    <tr><th>品种</th><th><p>年化收益率%</p><p>实际占款天数</p></th><th>每10万收益</th><th>可用日期</th><th>占用天数</th></tr> -->
          <tr v-for="item in gridSH" @click="listFunc(item)">
            <td class="gzpz"><p>{{item.name}}</p><p class="gray">{{item.STOCKCODEINDEX}}</p></td><td class="red"><p>{{item.yearsyl}}</p><!-- <p>{{item.diff}}天</p> --></td><td class="">{{item.sy}}</td><td>{{item.usabledate}}</td><td>{{item.diff}}天</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import utils from '../../../../util/util'
import repoconfig from '../../scripts/repoconfig'
import tradingconfig from '../../scripts/tradingconfig'
import service_hq_often from '../../../hq/service/common/service_hq_often'
import localService from '../../../../services/localService'
export default {
  data() {
    return {
      gridSH: [],
      gridSZ: [],
      INDEX: ['STOCKNAMEINDEX', 'NEWPRICEINDEX', 'STOCKCODEINDEX','BONDTERMINDEX','REALOCCDAYSINDEX','EXPIREQINSUANDATEINDEX']
    }
  },
  ready() {
  },
  attached() {
    this.$TZT.action10077(this);
    this.getCustomers();
  },
  methods: {
    dealRefreshTimer() {
      this.getCustomers();
    },
    getCustomers() {
      var that = this;
      var INDEX = that.INDEX;
      var obj = {
        StartPos: 1,
        MaxCount: 100,
        stockcode: '国债逆回购',
        accountIndex: 0,
        deviceType: 0,
        Direction: 1,
        // NEEDCHECK:'1|2|253|254|32|255|',
        NEEDCHECK:'1|2|0|0|32|263|',
        NEEDCHECK2:'1|2|253|254|32|263|',
        lead: 1,
        NewMarketNo: 0
      };
      service_hq_often.require20192(obj)
        .then((oData) => {
          if(oData.ERRORNO<0){
            alert(oData.ERRORMESSAGE);
            return;
          }
          var objSZ = [],
            objSH = [],
            objAll = {};
          oData.GRID0.shift();
          oData.GRID0.forEach((item) => {
            var listItem = item.split('|');
            var listobj = {};
            INDEX.forEach((value) => {
              if (oData[value]) {
                listobj[value] = listItem[oData[value]]
              }
            });

            console.log(listobj);

            var day = listobj.BONDTERMINDEX;    //期数
            var daydiff = listobj.REALOCCDAYSINDEX;//实际占款天数
            listobj.name = (listobj.BONDTERMINDEX||repoconfig.repoData[listobj.STOCKCODEINDEX]) + '天期';
            listobj.yearsyl = listobj.NEWPRICEINDEX;
            listobj.diff = listobj.REALOCCDAYSINDEX||'--';
             //var next = tradingconfig.nextTradeDate(utils.getYTDS(utils.manyDays(day)));
             var gzkyrq = utils.getYTDS(listobj.EXPIREQINSUANDATEINDEX);

             listobj.usabledate = gzkyrq.substring(5,7)+'.'+gzkyrq.substring(8,10)||'--';

            //var day = repoconfig.repoData[listobj.STOCKCODEINDEX];
            //listobj.name = repoconfig.repoData[listobj.STOCKCODEINDEX] + '天期';
            //listobj.yearsyl = listobj.NEWPRICEINDEX + '%';

            //获取下一个交易日
            //var next = tradingconfig.nextTradeDate(utils.getYTDS(utils.manyDays(1)));
            //获取 下一个交易日+days 的交易日
            //var lastnext = tradingconfig.nextTradeDate(utils.getYTDS(utils.manyDays(day, next.ky)))
            //var diff = utils.DateDiff(next.ky, lastnext.ky);
            //实际占款天数
            //listobj.diff = diff;
            
            var sType = listobj.STOCKCODEINDEX.substr(0,3);
            if(sType === '204'){
              listobj.sy = utils.toDecimal2(listobj.NEWPRICEINDEX / 100 * 100000 / 365 * daydiff, 2)||'--';
              listobj.dsyl = utils.toDecimal2(listobj.sy / 10 / daydiff, 4)||'--';
            }else if(sType === '131'){
              //listobj.sy = utils.toDecimal2(listobj.NEWPRICEINDEX / 100 * 1000 / 365 * daydiff, 2)||'--';
              listobj.sy = utils.toDecimal2(listobj.NEWPRICEINDEX / 100 * 100000 / 365 * daydiff, 2)||'--';
              listobj.dsyl = utils.toDecimal2(listobj.sy * 10 / daydiff, 4)||'--';
            }


            listobj.sType = listobj.STOCKCODEINDEX.substr(0, 3);



            objAll[listobj.STOCKCODEINDEX] = listobj;
            /*var sType = listobj.STOCKCODEINDEX.substr(0,3);
             if(sType === '204'){
             objSH.push(listobj);
             }else if(sType === '131'){
             objSZ.push(listobj);
             }*/
          });
          repoconfig.repoSZ.forEach((value) => {
            if (objAll[value]) {
              objSZ.push(objAll[value]);
            }
          });
          repoconfig.repoSH.forEach((value) => {
            if (objAll[value]) {
              objSH.push(objAll[value]);
            }
          });
          that.$set('gridSH', objSH);
          that.$set('gridSZ', objSZ);
          localService.saveMapMesg({list: objSH})
          /*localService.readMapMesg('list').then((data)=>{
               alert(data.list)
          })*/
      
        })
    },
    listFunc(item) {
      this.$TZT.action10061(`/deal/reverseRepo/repoLending?stockcode=${item.STOCKCODEINDEX}&diff=${item.diff}`);
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/variables.less';
@import "../../../../assets/less/mixins.less";

.tabs .tab {
    display: none;
}
.tabs .tab.active {
    display: block;
   /*  padding: 2rem 0 0; */
    padding: 3rem 0 0;
}
.explain-ul-title{
  margin-top: 60px;
  background: #fff;
    position: fixed;
    width: 100%;
    z-index: 1000;
}
.explain-uls{
  margin-top: 45px;

}
.explain {
    /*.native-data{padding:2rem 0.5rem 0;}*/
    font-size: 0.85rem;
    .title {
        padding: 0 0.75rem;
        margin: 0;
        font-weight: normal;
        font-size: 0.8rem;
        line-height: 1.6rem;
        position: relative;
        .hairline(bottom,@color-split);
        .hairline(top,@color-split);
        span {
            display: inline-block;
        }
        :nth-child(1) {
            width: 50%;
        }
        :nth-child(2) {
            width: 50%;
            text-align: right;
        }
    }
    .button span {
        display: inline-block;
        font-weight: 600;
    }
    .buttons-tab .button.active span {
        color: @color-primary;
        z-index: 100;
        border: 0;
       /*  border-bottom: 2px solid transparent; */
        border-radius: 0;
        border-color: @color-primary;
        height: 2rem;
    }
    .native-data {
        table {
            width: 100%;
            :last-child {
                border-bottom: none;
            }
        }
        tr {
            list-style: none;
            font-size: 0.7rem;
            display: block;
            position: relative;
            .hairline(bottom,@color-split);
            td,
            th {
                display: inline-block;
                padding: 0.5rem 0;
                text-align: left;

            }
            :nth-child(1) {
                width: 40%;
            }
            :nth-child(2) {
                width: 20%;
                vertical-align: middle;
            }
            :nth-child(3) {
                width: 20%;
                vertical-align: middle;
            }
            :nth-child(4) {
                width: 20%;
                vertical-align: middle;
            }
        }
    }
    .explain-ul {
        table {
            width: 100%;
        }
        table tr {
            width: 100%;
           /*  padding: 0 0.5rem; */
            display: inline-block;
            position: relative;
           /*  border-bottom: 1px solid #f4f4f4; */
            th {
                font-size: 0.5rem;
                font-weight: normal;
                color: #919191;
            }
            td,
            th {
                display: inline-block;
                padding: 0.2rem 0;
                text-align: center;
                width: 20%;
                vertical-align: middle;
                font-weight: 500;
            }
            td:nth-child(3) {
                color: #5e5e5e;
            }
            td:nth-child(4) {
                text-align: right;
                color: #5e5e5e;
                padding-right: 10px;
            }
            td:nth-child(5) {
                color: #5e5e5e;
                text-align: right;
                margin-left: -15px;
            }
            th:nth-child(1) {
                width: 16%;
                 font-size: 13px;
            }
            th:nth-child(2) {
                width: 20%;
                text-align: center;
                 font-size: 13px;
            }
            th:nth-child(3) {
                width: 20%;
                text-align: center;
                 font-size: 13px;
            }
            th:nth-child(4) {
                width: 20%;
                text-align: right;
                 font-size: 13px;
            }
            th:nth-child(5) {
                width: 20%;
                text-align: right;
                 font-size: 13px;
            }
        }
         table tr:after{
            content: '';
            position: absolute;
            width: 200%;
            height: 1px;
            background: #eee;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            z-index: 1;
      }
        table tr:after{
          bottom: 0;
          left: 0;
          -webkit-transform-origin: 0 100%;
          transform-origin: 0 100%;

        }
    }
}
/* table tr:nth-child(1){
  position: fixed ! important;
  z-index: 1000;
  background: #fff;
}
table tr:nth-child(2){
  margin-top: 40px;
} */
.theme-dark {
  .explain{
    .explain-ul{
      table tr{
        border-bottom: 1px solid #414141;
      }
    }
  }
}
.tab .more_title {
    line-height: 1.9rem;
    margin: 0;
    font-size: 0.8rem;
    font-weight: normal;
    span {
        width: 50%;
        display: inline-block;
    }
}
.tab .more_text {
    color: @color-text-secondary;
    text-align: right;
}
.red {
    color: #ec2f1f;
    font-weight: 600 ! important;
}
.gray {
    font-size: 0.7rem;
    color: @color-text-secondary;
}
.gzpz{
  font-weight: 600 ! important;
  color: #3d3d3d;
}
.gd{
    height: 10px;
    position: absolute;
    top: 50px;
    background: #f3f3f3;
    width: 100%;
    z-index: 1000;
}
</style>
