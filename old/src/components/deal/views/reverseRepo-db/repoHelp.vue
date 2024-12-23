<template>
  <div class="content">
    <h2>交易规则</h2>
    <p>1.交易品种分为<b>10万元起（沪市）</b>和<b>1千元起（深市）</b>两类，并且借出金额上交所必须为10万元的整数倍，深交所必须为1千元的整数倍。单笔借出资金最多1千万元。</p>
    <p>2.申报利率上交所最小变动单位为0.005，深交所最小变动单位为0.001。</p>
    <h2>交易品种列表中的每万元日收益是如何计算的</h2>
    <p>这个将资金的实际占用天数考虑进去了。当到期日期为非交易日的时候就会出现出借周期和实际占用天数不一致的情况，比如周五出借1天期，周六到账，但是资金实际可用的是下周一，资金实际占用了3天。</p>
    <p>沪市的每个品种：</p>
    <div class="list-text-bgcolor">
      <p>10万收益=（10万*年化收益率/360)*出借周期，</p>
      <p>每万元日收益=10万收益/10/实际占用天数</p>
    </div>
    <p>深市的每个品种：</p>
    <div class="list-text-bgcolor">
      <p>1千收益=（1千*年化收益率/365)*出借周期，</p>
      <p>每万元日收益=1千收益*10/实际占用天数</p>
    </div>
    <h2>如何查询出借记录和收益</h2>
    <p>国债逆回购的借款记录请从交易首页>查询中进入。</p>
    <p>成交价=年化收益率，成交额=出借金额，成交量=出借金额/国债面值，国债单位为张，沪市为1000元一张，深市为100元一张。所以，如果是出借沪市10万元，张数就是10万张/1000=100张；出借深市1000元，数量就是1000/100=10张。</p>
    <p>出借资金成功，到期后本金和利息会自动到账，无需手动操作。有的券商会将出借资金的操作称为融券，资金利息自动到账的操作称为融券购回；而有的 券商会称作质押回购和拆出质押。</p>
    <p>如何知道收益？有的会在资金到账里面体现出来，比如上面第1张图的这家券商，购回操作比融券操作多了1.07就是利息。而有的券商比如上面第2张图中券商，在成交中体现不出来，需要到资金流水或者交割单中查询（这个手机上暂不支持。别急，后面会尽快支持的！）。</p>
    <h2>如何撤销出借操作</h2>
    <p>国债逆回购的可撤单列表和普通股票交易实在一起的，请从交易首页>撤单或者交易首页>国债逆回购>撤单中进入，在国债逆回购交易页面也有撤单的入口，方便在交易的时候快速撤单。</p>
    <h2>借款成功后，持仓变化</h2>
    <p>出借资金后，交易所会将借款方的抵押证明给出借方，抵押证明就是标准券，1个标的券就是100元的抵押证明。根据券商显示风格不同，有的券商会在持仓中显示标准券。</p>
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
    margin: 10px;
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
  b{font-weight: 700;}
  }
  .list-text-bgcolor{
    background-color: lighten(@color-index,5%);
    padding-left: 5px;
    padding-right: 5px;
    border-radius: @border-radius;
  }

</style>
