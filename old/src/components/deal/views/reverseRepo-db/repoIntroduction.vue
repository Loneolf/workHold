<template>
  <div class="content">
    <p>该产品为上交所和深交所的国债逆回购，参与者有三方：</p>
    <p>1.需要钱的一方：</p>
    <p>这一方的手里有国债券，现在需要现金，我们称为正回购方（融资方）</p>
    <p>2.借出钱的一方：</p>
    <p>这一方受理有现金，需要找到能让它增值的地方，我们称为逆回购方（融券方）；</p>
    <p>3.监督方：</p>
    <p>上海证券交易所和深证证券交易所。</p>
    <p>所谓逆回购，可以理解为你主动发起交易请求借出一笔钱出去，同时融资方向你许诺一定的利率，以换得你的现金。到了约定时间，借钱的那一方按照约定利率向你支付本金和利息。整个期间由中间方即监督方冻结住融资方的债券作为质押。</p>
    <h2>门槛</h2>
    <div class="list-text-bgcolor">
      <p><span>沪市：</span><b>10万元起</b>，出借资金必须是<b>10万元或其整数倍</b>；</p>
      <p><span>深市：</span><b>1千元起</b>，出借资金必须是<b>1千元或其整数倍</b>；</p>
    </div>
    <h2>借出去多久</h2>
    <p>借出时间固定，两个市场目前均有1天期、2天期、3天期、4天期、7天期、14天期、28天期、01天期、182天期9种出借周期。</p>
    <p>到期后（如果今日出借1天期品种，到期时间为明日），本金和利息交易所会自动返还到出借方的证券账户中。到期当日T日资金可用，但是转出到银行卡需要在到期日的第二个交易日T+1日才行。如果到期日为非交易日，资金可用将顺延到交易日，并且到期至交易日这段时间不计利息。</p>
    <p>根据国债名称辨别品种天数的方法：</p>
    <p>沪市国债对应的名称是GC开头，GC后面的三个数字就是品种天数。比如1天期204001 GC001；</p>
    <p>深市国债对应的名称是R-开头，R-后面的三个数字就是品种天数。比如1天期131810 R-001</p>
    <h2>收益</h2>
    <p><b>1.年化收益率：</b>行情页面中的最新价就是年化收益率，开盘期间借款方和出借方将利率申报到交易所，同股票交易不同，国债逆回购在成交之后不再承担价格波动的风险，收益率的高低在成交时即确定。所以在下单的时候即可预知收益情况。</p>
    <p><b>2.利息计算：</b>利息四舍五入精确到2位小数。</p>
    <div  class="list-text-bgcolor">
      <p>上交所利息=出借天数*出借金额*年化收益率/360</p>
      <p>深交所利息=出借天数*出借金额*年化收益率/365</p>
    </div>
    <p><b>3.提高收益时间：</b>出借利率受市场利率影响比较大，月末和季末、年末由于银行审计等问题，一般会造成银行资金紧张，市场利率相应提高。</p>
    <h2>风险：极低，几乎为零</h2>
    <p>该产品的风险性从以下两方面看：</p>
    <p>1.资金安全性：出借方在交易所抵押的证券的价值会高于借款的金额，并且借款方在交易所做抵押。如果借款到期后，借款方无力支付本金和利息，交易所将垫付本金和利息支付给出借方，并向借款方追缴本金和利息。</p>
    <p>2.基本无价格波动风险：上面提到，国债交易在成交时即确定了收益率，也即收益，到期后借款方会返还出借方本间和固定利息。</p>
    <h2>交易费用</h2>
    <p>出借操作需要支付一定的佣金，各家券商可能会有所不同，一般情况下按照如下费率支付（无最低5元的限制），而且该费用基本上是远小于出借所得收益的，几乎可忽略不计。交易费用只在出借时收取。</p>
    <table border="1" width="100%">
      <tr>
        <th>品种</th>
        <th>手续费比率</th>
        <th>每十万元手续费</th>
      </tr>
      <tr>
        <td>1天</td>
        <td>成交金额的0.001%</td>
        <td>1</td>
      </tr>
      <tr>
        <td>2天</td>
        <td>成交金额的0.002%</td>
        <td>2</td>
      </tr>
      <tr>
        <td>3天</td>
        <td>成交金额的0.003%</td>
        <td>3</td>
      </tr>
      <tr>
        <td>4天</td>
        <td>成交金额的0.004%</td>
        <td>4</td>
      </tr>
      <tr>
        <td>7天</td>
        <td>成交金额的0.005%</td>
        <td>5</td>
      </tr>
      <tr>
        <td>14天</td>
        <td>成交金额的0.010%</td>
        <td>10</td>
      </tr>
      <tr>
        <td>28天</td>
        <td>成交金额的0.020%</td>
        <td>20</td>
      </tr>
      <tr>
        <td>28天以上</td>
        <td>成交金额的0.030%</td>
        <td>30</td>
      </tr>
    </table>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../assets/less/variables.less';
  .content{
    background-color: @color-bg-threedary;
    padding: 5%;
    font-family: 'Microsoft yahei';
    font-size: 14px;
  }
  h2{
    color: @color-title;
    padding-left: 0.75em;
    font-weight: 700;
    margin:10px;
    position: relative;
  &:before{
     content: '';
     width:3px;
     height: 0.9em;
     display: block;
     position: absolute;
     left: 0;
     top: 7px;
     background-color:@color-title;
   }
  }
  p{
    line-height: 1.5em;
    padding: 5px 0 5px 0;
  span{
    color: @color-title;
  }
  b{font-weight: 700;}

  }
  .list-text-bgcolor{
    background-color: lighten(@color-index,5%);
    padding-left: 5px;
    padding-right: 5px;
    border-radius: @border-radius;
  }
  tr td{
    text-align: center;
  }

</style>
