// type 0数字 1字符串 2是浮点数 3 gbk字符串
// 股票数据
var TNewStockData = [
    // 股票          //期货、外盘
    { p1: 4 }, // 买一价        //买价           ，单位：厘
    { Q1: 4 }, // 买一量        //买量           ，单位：股
    { p2: 4 }, // 买二价        //总持仓量
    { Q2: 4 }, // 买二量
    { p3: 4 }, // 买三价        //前持仓量(昨持仓量)
    { Q3: 4 }, // 买三量
    { p4: 4 }, // 卖一价        //卖价
    { Q4: 4 }, // 卖一量        //卖量
    { p5: 4 }, // 卖二价        //内盘
    { Q5: 4 }, // 卖二量
    { p6: 4 }, // 卖三价        //外盘
    { Q6: 4 }, // 卖三量
    { p7: 4 }, // 买四价        //日增
    { Q7: 4 }, // 买四量
    { p8: 4 }, // 买五价        //昨收盘价
    { Q8: 4 }, // 买五量        //涨停板
    { p9: 4 }, // 卖四价        //多头开(单位:合约单位)
    { Q9: 4 }, // 卖四量
    { p10: 4 }, // 卖五价        //空头开(单位:合约单位)
    { Q10: 4 }, // 卖五量
    { new_kind: 2 }, // 新类型
    { Reserve: 2 }, // 暂用为国债利息。
    { Last_h: 4 } // 现手，单位：股
];

// 指数数据
var TNewIndexData = [
    { ups: 2 }, // 上涨股票数
    { downs: 2 }, // 下跌股票数
    { x0: 2 },
    { buy_h: 4 }, // 总申买量
    { sale_h: 4 }, // 总申卖量
    { lnAHEAD: 2 }, // 领先指标
    { lnDKZB: 2 }, // 多空指标
    { lnQRD: 2 }, // 强弱度
    { BuyGasMain: 2 }, // 买气总
    { BuyGasTop: 4 }, // 买气
    { SaleGasMain: 2 }, // 卖气总
    { SaleGasTop: 2 }, // 卖气
    { totals: 2 }, // 总股票数
    { lnADL: 4 }, // ADL指标
    { q5a: 2 }, // 未用
    { p6a: 4 }, // 未用
    { q6a: 4 }, // 未用
    { x2: 4 }, // 未用
    { x3: 4 }, // 未用
    { p7a: 4 }, // 未用
    { Q7a: 4 }, // 未用
    { p8a: 4 }, // 未用
    { Q8a: 4 }, // 未用
    { p9a: 4 }, // 未用
    { Q9a: 4 }, // 未用
    { p10a: 4 }, // 未用
    { Q10a: 4 }, // 未用
    { new_kinda: 2 } // 未用
];

// 报价数据 结构
var TNewPriceData = [
    [{ XFlag: 1 }], // 停牌标志; 2-长期停牌  3-临时停牌 4-波动性中断  98-熔断(可恢复) 99-熔断(不可恢复)其他(通常是1或0)-正常
    [{ Name: '16', type: 1 }], // 股票名称，16个字节的字符串，注意：客户端转成ANSI字符串后才是16字节
    [
        { Kind: 1 }, // 类型  上指16,上A17,上B18,上债19;深指32,深A33,深B34,深债35
        { Code: '6', type: 1 }, // 股票代码
        { Close_p: 4 }, // 昨收盘价 //期货时放昨结算价
        { Open_p: 4 }, // 今开盘价
        { High_p: 4 }, // 最高价
        { Low_p: 4 }, // 最低价
        { Last_p: 4 }, // 最新价
        { Total_h: 4 }, // 总成交量 //指数单位：手，其他单位：股
        { Total_m: 4, type: 2 }, // 总成交金额 (3.08), 指数单位：百元，其他单位：元；期货或外盘：总持仓量
        {
            StockData: TNewStockData,
            indexData: TNewIndexData
        },
        { nDecimal: 1 }, // 小数位数，股票、外汇、期货、基金的小数位可能不同
        { nHour: 1 }, // 时间中的时
        { nMin: 1 }, // 时间中的分
        { nHuanshoulv: 4 }, // 换手率，是实际换手率的100倍，如：5表示换手率0.05%  //    指数时无换手率，为0
        { m_lInside: 4 }, // 内盘
        { m_lOutside: 4 }, // 外盘
        { m_lAvgPrice: 4 }, // 股票均价，期货就是结算价。单位和其他价格相同：厘。
    ],
    [
        { m_lUpPrice: 4 }, // 涨跌，即：最新价-昨收盘价
        { m_lUpIndex: 4 }, // 涨跌幅(%)，是实际涨跌幅的100倍，如：528表示5.28%
        { m_lMaxUpIndex: 4 }, // 振幅(%)，是实际振幅的100倍，如：528表示5.28%
        { m_lLiangbi: 4 }, // 量比。量比=现成交总手/过去5个交易日平均每分钟成交量×当日累计开市时间(分)
        { c_userstock: '1', type: 1 } // 自选股标记：减号'-' 是自选股；加号'+' 不是自选股；空格' '未知；
    ],
    [
        { BlockName: '16', type: 1 } // 隶属板块名称，注意：解码为Ansi字符串后才是16字节
    ],
    [
        { BlockCode: '6', type: 1 } // 隶属板块指数代码，如“酿酒食品”板块为991020。
    ],
    [
        { m_lBlockUpIndex: 4 } // 隶属板块指数涨跌幅%，是实际涨跌幅的100倍，如：-528表示-5.28%
    ],
    [
        { m_ldtsyl: 4 }, // 动态市盈率，放大了1000倍，如：52800表示52.8
        { m_ljzc: 4 }, // 每股净资产(元／股)。因为需精确到小数点后4位，所以放大了10000倍，如：52800表示5.28元。显示时有些界面可能只显示2位小数
        { m_zgb: 4 }, // 总股本(万股)
        { m_ltb: 4 } // 流通盘(万股)流通股本
    ],
    [
        { m_blockUps: 4 }, // 对应BlockCode板块上涨数
        { m_blockDowns: 4 }, // 对应BlockCode板块下跌数
        { m_blockFlats: 4 } // 对应BlockCode板块平盘数
    ],
    [
        { c_IsGgt: 1 }, // 港股通标的券 //0-否，1-是，x-无此属性 国内股票是x，港股市场是0或1
        { c_CanBuy: 1 }, // 港股通可买，0-否 1-是 x-无此属性，国内股票是x，港股市场是0或1
        { c_CanSell: 1 }, // 港股通可卖，0-否 1-是 x-无此属性，国内股票是x，港股市场是0或1
        { c_RZBD: 1 }, // 融资标的 0-否 1-是
        { c_RQBD: 1 } // 融券标的 0-否 1-是
    ],
    [
        { m_nWB: 4 }, // 委比，是比率的100倍，如：5表示委比0.05%。板块指数无委比，为0
        { m_nWC: 4 } // 委差，单位：股。板块指数无委差，为0
    ],
    [
        { m_nUnit: 4 } // 每手股数，美股、港股为1，债券为10，其他100。2014-12-10国金首先使用
    ],
    [
        { m_mgsy: 4 }, // 每股收益 单位：十分之一厘 元后保留4位小数
        { m_jtsyl: 4 }, // 静态市盈率 放大1000倍
        { m_jb: 4 }, // 季报年报 3=一季报 6=半年报 9=三季报 12=年报
        { m_zt: 4 }, // 涨停板价
        { m_dt: 4 } // 跌停板价
    ],
    [
        { m_isAH: 1 } // H股是否有对应的A股:    0:不是港股  N:无对应的A股  Y:有对应的A股
    ],
    [
        { m_AHCode: '6', type: 1 } // A股代码。2015-7-27新增
    ],
    [
        { m_AHPrice: 4 }, // AH股最新价，单位：厘
        { m_AHRatio: 4 }, // AH股涨跌，是比率的100倍，如：5表示涨跌0.05%
        { m_AHTime: 8, type: 1 }, // AH股市场时间，格式HH:MM:SS，如：14:42:00
        { m_AHPremiumRate: 4 } // AH溢价(A股最新价/(H股最新价*港元人民币汇率)*100%)，是比率的100倍，如：12305表示溢价123.05%
    ],
    // 个股期权数据
    [
        { m_OptionCode: 10, type: 1 } // 长股票代码，如个股期权代码长度6字节是不够的，放此处
    ],
    [
        { m_OptionName: 38, type: 1 } // 长股票名称，如美股股票名称长度16字节是不够的，放此处
    ],
    [
        { m_OptionType: 1, type: 1 }, // 行权方式，E：欧式期权，A：美式期权
        { m_OptionKind: 1, type: 1 }, // 期权种类，C：认购期权，P：认沽期权
        { m_OptionXQPrice: 4 }, // 行权价格，单位：元 /10000
        { m_OptionXQDate: 8, type: 1 }, // 到期日，格式：YYYYMMDD，如：’20150831’
        { m_OptionRemaindDate: 4 }, // 剩余天数
        { m_OptionNZJZ: 4 }, // 内在价值，单位：元/10000
        { m_OptionSJJZ: 4 }, // 时间价值，单位：元/10000
        { m_OptionYJL: 4 }, // 溢价率，百分比，123表示1.23%
        { m_OptionGGBL: 4 }, // 杠杆比率，百分比，123表示1.23%
        { m_OptionUnit: 4 }, // 合约单位，如：10000
        { m_OptionBDL: 4 }, // 隐含波动率，百分比，123表示1.23%
        { m_OptionDelta: 4 }, // Delta /10000倍
        { m_OptionGamma: 4 }, // Gamma 10000倍
        { m_OptionRho: 4 }, // Rho   10000倍
        { m_OptionTheta: 4 }, // Theta 10000倍
        { m_OptionVega: 4 } // Vega  10000倍
    ],
    [
        { m_nVolUnit: 4 } // 成交量单位，用于总手，现手，委买，委卖单位处理，若无该字段，默认同上面的m_nUnit数据
    ],
    [
        { m_RDTime: 5, type: 1 } // 熔断时间，可恢复熔断时使用，不可恢复直接显示熔断至闭市
    ],
    [
        {
            m_HKState: 8,
            type: 1
        } /* 对于港股：
       第1个字符，代表是否港股是否停牌: Y是，N不是。注：此标志仅为开盘时的状态，盘中会变，所以不使用此字符，而是看报价数据最前面的XFLAG字段。
       第2个字符，代表是否港股市调机制股份: Y是，N否
       第3个字符，代表是否港股收市竞价股份: Y是，N否
       后面5个字符为空格，现在无意义
       对于国内股票：
       第1个字符，是否新股申购：Y是，N否
       第2个字符，代表是否融资标的：Y是，N否
       第3个字符，代表是否融券标的：Y是，N否
       在使用时请先判断是港股、国内股票还是其他*/
    ],
    [
        { m_HKBeginTime: 8, type: 1 } // 市调机制开始时间，格式：HH:NN:SS
    ],
    [
        { m_HKEndTime: 8, type: 1 } // 市调机制结束时间，格式：HH:NN:SS
    ],
    [
        { m_HKReferencePrice: 4 }, // 市调机制参考价，单位：厘
        { m_HKLowPrice: 4 }, // 市调机制下限价，单位：厘 youwenti
        { m_HKHighPrice: 4 }, // 市调机制上限价，单位：厘
        { m_HKCloseRefrencePrice: 4 }, // 收盘集合竞价时段参考价，单位：厘
        { m_HKCloseLowPrice: 4 }, // 收盘集合竞价时段下限价，单位：厘
        { m_HKCLoseHighPrice: 4 }, // 收盘集合竞价时段上限价，单位：厘
        {
            m_HKMisMatchDirection: 1,
            type: 1
        }, /* 不能配对买卖盘方向:       N = 买卖盘量相等，B = 买盘比卖盘多，S = 卖盘比买盘多，<空格> = 不适用(未有参考平衡价格)*/
        { m_HKMisMatchAmount: 4 } // 不能配对买卖盘量，字符串，整数，单位：股
    ],
    [
        {
            m_bIsVCM: 1
        } /* 是否港股通vcm时间段内，Y是，N否，仅港股有效
       市场时间>=市调机制开始时间，且市场时间<市调机制结束时间，是。其他，否
       只判断到分钟，秒无用*/
    ],
    [
        {
            m_bIsCAS: 1
        } /* 是否处于收盘集合竞价时间段内
       是否处于收盘集合竞价时间段内，Y是，N否，仅港股有效
       收盘集合竞价时段参考价>0，且未收到收盘价，且市场时间<16:10，是。其他，否
       判断到秒
       */
    ],
    [
        { m_HGTInitValue: 4 }, // 沪港通余额初始额度 单位：万元
        { m_HGTResidueValue: 4 }, // 沪港通余额剩余额度 单位：万元
        { m_HGTStatus: 1, type: 1 }, // 沪港通余额额度状态 '1'=额度不可用 '2'=额度可用
        { m_SGTInitValue: 4 }, // 深港通余额初始额度 单位：万元
        { m_SGTResidueValue: 4 }, // 深港通余额剩余额度 单位：万元
        { m_SGTStatus: 1, type: 1 } // 深港通余额额度状态  '1'=额度不可用 '2'=额度可用
    ],
    [
        {
            m_nTotalMoney: 8
        }, /** 总成交金额, 指数、板块指数单位：百元，其他单位：元；期货或外盘：总持仓量
     与前半部分中的Total_m: Single值相同，不过没有小数部分
     加此值是为了方便网页使用，网页用浮点数不方便*/
    ],
    [
        { m_OptionChiCang: 4 } // 期权持仓量
    ],
    [
        { m_StockStartStatus: 4 } // 股票开始状态  更改和客户端一致之前是m_StockStartStatus
    ],

    [
        { m_PriceUnit: 4 } // 价格单位
    ],
    [
        { m_totalVolume: 8 } // 总成交量
    ],
    [
        { m_ProductStatusFlag: 4 } // 产品状态标志
    ],
    [
        { m_AppropriateFlag: 4 } // 投资者适当性管理分类
    ],
    [
        { m_bint64Np: 8 } // 内盘
    ],
    [
        { m_bint64Wp: 8 } // 外盘
    ],
    [
        { m_bMaio: 4 } // B秒
    ],
    [
        { m_finshituSf: 1 } // B新分时图时间中的时分
    ],
    [
        { m_jsybzdje: 4 } // 较上一笔涨跌金额
    ],
    [
        { m_GZRefPrice: 4 }, // 参考成交价
        { m_GZMatchVol: 8 }, // 匹配数量
        { m_GZUnMatchVol: 8 }, // 未匹配数量(买或卖)
        { m_GZMatchedVolDir: 4 } // 未匹配量的方向
    ],
    [
        { m_TodayClosePrice: 4 } // 今收盘价
    ],
    [
        { m_also: 1 }, // 停牌标志：1-正常(未停牌)  2-长期停牌  3-临时停牌
        { m_alsoTime: 8 } // 停牌时间戳
    ],
    [
        { m_perShare: 8 } // 计算复合增长率后的每股收益
    ],
    [
        { m_T1zt: 4 }, // 涨停板价
        { m_T1dt: 4 } // 跌停板价
    ],
    [
      { m_sylttm: 4 }
    ],
    [
      { m_drzdf: 4 },//当日涨限制幅度---当日涨跌限制幅度
      { m_T1drzf: 4 },//T1涨限制幅度
      { m_drdf: 4 },//当日跌限制幅度
      { m_T1drdf: 4 },//T1跌限制幅度
      { m_drzdf1000: 4 },//当日涨限制幅度---当日涨跌限制幅度
      { m_T1drzf1000: 4 },//T1涨限制幅度
      { m_drdf1000: 4 },//当日跌限制幅度
      { m_T1drdf1000: 4 },//T1跌限制幅度
    ],
    [
      {m_zssnum:4}//做市商数量
    ]
];
var usQuoteAdd = [
    [
        {
            StockData: [{m_max52: 4},{m_min52: 4}]
        }
    ]
];

// 分时数据
var TNewMinData = [
    [
        {
            StockData: [{ Last_p: 4 }, { averprice: 4 }, { total_h: 4 }]
        }
    ]
];
// 分时数据
var TNewBinData = [
    [{ StockName: '16', type: 1 }],
    [
        { close_p: 4 },
        { Open_p: 4 },
        { total_size: 1 },
        { Units: 1 },
        { Consult: 4 },
        { m: 8 },
        { max_p: 4 },
        { is_rest: 1 },
        { Last_h: 4 }
    ]
];
// 分时数据
var clearBase64 = {
    TNewPriceData: [
        '1',
        '4',
        '5',
        '9',
        '13',
        '14',
        '16',
        '17',
        '20',
        '21',
        '22',
        '23',
        '25',
        '26'
    ],
    TNewBinData: ['0'],
    TkLineHead: ['0'],
    yxgQuotoAdd: ['2', '3', '4']
};

// K线数据 - BINDATA
var TkLineHead = [
    [{ StockName: 16, type: 1 }],
    [
        { total_size: 1 },
        { Units: 1 },
        { HighPrice: 4 },
        { LowPrice: 4 },
        { m: 8 },
        { WeekUp: 4 },
        { MonthUp: 4 },
        { WFSY: 4 },
        { QRNH: 4 }
    ]
];

// K线数据 -GRID0
var TkLineData = [
    [
        {
            StockData: [
                { Time: 4 },
                { OpenPrice: 4 },
                { HighPrice: 4 },
                { LowPrice: 4 },
                { ClosePrice: 4 },
                { Total_h: 4 }
            ]
        }
    ]
];

var afterCloseData = [
    [
        {
            StockData: [{ m_nVolume: 8 }, { m_nTurnover: 8 }]
        }
    ]
];

// 成交明细 -GRID0
var DetailedData = [
    [
        {
            StockData: [
                { Time: 1 },
                { Minutes: 1 },
                { dealPrice: 4 },
                { dealVolume: 4 },
                { falg: 1 }
            ]
        }
    ]
];

// 分价量表 -GRID0
var ThePriceData = [
    [
        {
            StockData: [{ Price: 4 }, { Hands: 4 }]
        }
    ]
];
// 分价量表 -GRID0
var Level2BinData = [
    [
        {
            StockData: [{ s: 1 }]
        }
    ]
];
// 表格颜色 -GRID0
var ColorData = [
    [
        {
            StockData: [{ time: 2, isone: 1 }, { color: 1 }]
        }
    ]
];
// 优先股
var yxgQuotoAdd = [
    [
        { valueDate: 4 } // 起息日
    ],
    [
        { dividendYield: 4 } // 股息率 是百分比的1000倍，如：1560表示1.56%
    ],
    [
        { isKehuis: 1 } // 是否可回售 Y是  N否
    ],
    [
        { isKezhuangg: 1 } // 是否可转股 Y是  N否
    ],
    [
        { ysStockcode: 6, type: 1 } // 原始股票代码
    ]
];
// 质押占款天数 - QUOTEADD
var dayQuoteAdd = [
    // [
    //     { averPrice: 4 },
    //     { averPriceBP: 4 },
    //     { oldAverPrice: 4 },
    //     { RepurDay: 4 },
    //     { possesDay: 4 },
    //     { RepurDate: 4 },
    //     { latestPriceBP: 4 },
    // ],
    
    [   
        { m_GZa11: 4 },
        { m_GZa12: 4 },
        { m_GZa13: 4 },
        { m_GZa14: 4 },
        { m_GZa15: 4 },
        { m_GZa16: 4 }
    ],
    [  { m_GZa21: 4 }],
    [   
        { m_GZa31: 4 },
        { m_GZa32: 4 },
        { m_GZa33: 4 }
    ],
    [   { m_GZa41: 4 }],
    [   { m_GZa51: 4 }],
    [   { m_GZa61: 4 }],
    [   { m_GZa71: 4 }]
    // 加权平均价:          0
    // 加权平均价涨跌BP:          0
    // 昨收盘加权平均价:          0
    //         回购期限:          3
    //     实际占款天数:          1
    //       到期交收日:   20230718
    //     最近:价涨跌BP         -5
    //       首次清算日:   20230714
    //       到期清算日:   20230717
    //       首次交收日:   20230717
    //         市场日期:   20230713
    // 计算占款天数日期:   20230714
    //   加权平均价涨跌:          0
    //       最近价涨跌:        -45
    
];

// 期权
var qiquan = [
    [
        { m_Option01: 1 } // 开仓限制标记
    ],
    [
        { m_Option02: 1, type: 1 }, // 行权方式，E：欧式期权，A：美式期权
        { m_Option03: 1, type: 1 }, // 期权种类，C：认购期权，P：认沽期权
        { m_Option04: 4 }, // 行权价格，单位：元 /10000
        { m_Option05: 8, type: 1 }, // 到期日，格式：YYYYMMDD，如：’20150831’
        { m_Option06: 4 }, // 剩余天数
        { m_Option07: 4 }, // 内在价值，单位：元/10000
        { m_Option08: 4 }, // 时间价值，单位：元/10000
        { m_Option09: 4 }, // 溢价率，百分比，123表示1.23%
        { m_Option10: 4 }, // 杠杆比率，百分比，123表示1.23%
        { m_Option11: 4 }, // 合约单位，如：10000
        { m_Option12: 4 }, // 隐含波动率，百分比，123表示1.23%
        { m_Option13: 4 }, // Delta /10000倍
        { m_Option14: 4 }, // Gamma 10000倍
        { m_Option15: 4 }, // Rho   10000倍
        { m_Option16: 4 }, // Theta 10000倍
        { m_Option17: 4 }  // Vega  10000倍
    ],
    [
        { m_Option18: 4 }, // 历史波动率
        { m_Option19: 4 }, // 理论价
        { m_Option20: 4 }  // 真实杠杆
        
    ]
]
// 股转 集合竞价这块内容
var gzcallDate = [
    [
        {
            StockData: [
                { price: 4 }, // 虚拟-成交加
                { matchedVol: 8 }, // 匹配量（虚拟成交量）
                { nonMatchedVolBuy: 8 }, // 未匹配量（买方）
                { nonMatchedVolSell: 8 } // 未匹配量（卖方）
            ]
        }
    ]
];

// CDR数据，现仅用于沪伦通
var cdrQuoteAdd = [
    [
        { cdrNation: 1, type: 1 }, // /**CDR新增*/ CDR国家(市场) 1 美国(纽约交易所) 2 英国(伦敦交易所、沪伦通)
        { cdrTrans: 8 }, // CDR证券转换基数
        { cdrBaseTrans: 8 }, // 基础证券转换基数
        { cdrDepCode: 12, type: 1 }, // 存托机构代码
        { cdrDepName: 20, type: 1 }, // 存托机构简称
        { cdrStartDate: 8, type: 1 }, // 初始流动性生成起始日，格式YYMMDD
        { cdrEnddate: 8, type: 1 }, // 初始流动性生成终止日，格式YYMMDD
        { cdrMarketDate: 8, type: 1 }, // 上市日期，格式YYMMDD
        { cdrUnderlyingSecurityID: 10, type: 1 }, // 基础证券代码
        { cdrUnderlyingSecurityName: 50, type: 1 }, // 基础证券简称
        { cdrTotalChangeVolume: 8 }, // 累计变更数量，整数，0 表示不变，正数表示增加，负数表示减少
        { cdrTotalValume: 8 } // 市场流通总量，单位为份
    ]
];

// 科创板数据，现仅用于沪深 备注:如果即是科创板又是CDR   科创板数据结构｜CDR数据结构
var kcbQuoteAdd = [
    [
        { m_nLimitOrderUp: 4 }, // 限价申报数量上限
        { m_nLimitOrderDown: 4 }, // 限价申报数量下限
        { m_nMarketOrderUp: 4 }, // 市价申报数量上限
        { m_nMarketOrderDown: 4 }, // 市价申报数量下限
        { m_nMinOrderPriceUnit: 4 }, // 申报价格最小变动单位，单位“厘”
        { m_nAfterCloseVolume: 8 }, // 盘后量 单位“股”
        { nAfterCloseTurnover: 8 } // 盘后额 单位“元”
    ]
];

// 可转债
var kzzQuoteAdd = [
    [
        { UnderlyingSecurityID: 10, type: 1 }, // 正股代码
        { TransferPrice: 4 }, // 转股价
        { UnderlyingPrice: 4 }, // 正股价
        { TransferWorth: 4 }, // 转股价值=100*正股价/转股价，放大1000倍保存
        { Premium: 4 }, // 转股溢价率 = 可转债最新价 * 100% / 转股价值 - 100%，放大1000保存，如：2345表示2.345%

        { UnderlyingUpDownPCT: 4 }, // 正股涨跌幅
        { UnderlyingName: 38, type: 3 }, // 正股名称
        { BondPrice: 4 }, // 可转债最新价
        { BondUpDownPCT: 4 }, // 可转债涨跌幅

        { BondCode: 10, type: 1 }, // 可转债代码
        { BondName: 38, type: 3 }, // 可转债名称
        { Type: 4 }, // 本证券类型
        { UnderlyingDec: 1 }, // 正股价格要显示的小数位数
        { BondDec: 1 }, // 可转债要显示的小数位数
        { NonTrdQty: 1 }, // 非交易数据个数

        { FjyType1: 4 }, // 业务类型
        { FjyBeginDate1: 4 }, // 非交易开始日期
        { FjyEndDate1: 4 }, // 非交易终止日期
        { FjyPrice1: 4 }, // 非交易价格

        { FjyType2: 4 }, // 业务类型
        { FjyBeginDate2: 4 }, // 非交易开始日期
        { FjyEndDate2: 4 }, // 非交易终止日期
        { FjyPrice2: 4 }, // 非交易价格

        { FjyType3: 4 }, // 业务类型
        { FjyBeginDate3: 4 }, // 非交易开始日期
        { FjyEndDate3: 4 }, // 非交易终止日期
        { FjyPrice3: 4 }, // 非交易价格

        { FjyType4: 4 }, // 业务类型
        { FjyBeginDate4: 4 }, // 非交易开始日期
        { FjyEndDate4: 4 }, // 非交易终止日期
        { FjyPrice4: 4 }, // 非交易价格

        { FjyType5: 4 }, // 业务类型
        { FjyBeginDate5: 4 }, // 非交易开始日期
        { FjyEndDate5: 4 }, // 非交易终止日期
        { FjyPrice5: 4 }, // 非交易价格

        { SubsDate: 4 }, // 申购日期
        { WinPubDate: 4 }, // 中签结果公布日期
        { SubsPrice: 4 }, // 申购价格
        { BondRating: 6, type: 1 }, // 债券评级
        { ConvBegDate: 4 }, // 转股日期
        { ListingDate: 4 }, // 上市日期
        { ExpiryDate: 4 }, // 到期日期
        { PutBackFromDate: 4 }, // 回售起始日
        { RedemptionFromDate: 4 }, // 赎回起始日
        { PutBackPrice: 4 }, // 回售价格
        { PutBackRegBeginDate: 4 }, // 回售登记开始日
        { PutBackRegEndDate: 4 }, // 回售登记结束日
        { PutBackCancelBeginDate: 4 }, // 回售撤销开始日
        { nPutBackCancelEndDate: 4 }, // 回售撤销结束日
        { PutBackMoneyDate: 4 }, // 回售资金到账日
        { RedemptionPrice: 4 }, // 赎回价格
        { RedemptionRegBeginDate: 4 }, // 赎回登记日
        { RedemptionMoneyDate: 4 }, // 赎回资金到账日
        { BondValue: 4 }, // 纯债价值（单位：厘）
        { PretaxRate: 4 }, // 税前收益率
        { PutBackTriggerPrice: 4 }, // 回售触发价（单位：厘）
        { RedemptionTriggerPrice: 4 }, // 强赎触发（单位：厘）
        { ResidualScale: 8 }, // 剩余规模(单位：份)
        { IsResale: 1 }, // 是否可回售（1是0不是）
        { IsCB: 1 }, // 是否可转债(1是0不是)
        { UnderlyingUpDown: 4 }, // 正股涨跌
        { UnderlyingPB: 4 }, // 正股市净率
        { MarketId: 4 }, // 所在市场号
        { ParValue: 4 }, // 面值（单位：厘）
        { PaymentDate: 4 }, // 付息日，YYYYMMDD
        { acRateType: 30, type: 3 }, // 利率类型 如："累进利率"
        { BondType: 30, type: 3 }, // 债券类型
        { CouponRate: 4 }, // 票面利率，是实际票面利率的100倍，如：528表示5.28%
        { PDPremiumRate: 4 }, // 纯在溢价率，是实际纯在溢价率的100倍，如：528表示5.28%
        { ExpiryLeftYears: 4 }, // 剩余年限，是实际剩余年限的100倍，如：528表示5.28
        { PaymentLeftDays: 4 }, // 距付息日
        { nBondPeriod: 4 }, // 债券期限  年因有小数放大100000倍存放
        { nIssuanceScale: 8 }, // 发行规模 亿
        { nIssuePrice: 4 }, // 发行价 厘
        { nValueDate: 4 }, // 起息日 格式YYYYMMDD
        { acPaymentFrequency: 30, type: 3 }, // 付息频率, 如：1年1次
        { acCouponType: 30, type: 3 } // 票息品种 如："附息"
    ]
];

var kzzQuoteAdd2 = [
    [
        { BondCode: 10, type: 1 },
        { BondName: 38, type: 3 },
        { TransferPrice: 4 },
        { TransferWorth: 4 },
        { Premium: 4 },

        { BondPrice: 4 },
        { BondUpDownPCT: 4 },
        { BondDec: 1 },
        { NonTrdQty: 1 },

        { FjyType1: 4 },
        { FjyBeginDate1: 4 },
        { FjyEndDate1: 4 },
        { FjyPrice1: 4 },

        { FjyType2: 4 },
        { FjyBeginDate2: 4 },
        { FjyEndDate2: 4 },
        { FjyPrice2: 4 },

        { FjyType3: 4 },
        { FjyBeginDate3: 4 },
        { FjyEndDate3: 4 },
        { FjyPrice3: 4 },

        { FjyType4: 4 },
        { FjyBeginDate4: 4 },
        { FjyEndDate4: 4 },
        { FjyPrice4: 4 },

        { FjyType5: 4 },
        { FjyBeginDate5: 4 },
        { FjyEndDate5: 4 },
        { FjyPrice5: 4 },

        { SubsDate: 4 }, // 申购日期
        { WinPubDate: 4 }, // 中签结果公布日期
        { SubsPrice: 4 }, // 申购价格
        { BondRating: 6 }, // 债券评级
        { ConvBegDate: 4 }, // 转股日期
        { ListingDate: 4 }, // 上市日期
        { ExpiryDate: 4 }, // 到期日期
        { PutBackFromDate: 4 }, // 回售起始日
        { RedemptionFromDate: 4 }, // 赎回起始日
        { PutBackPrice: 4 }, // 回售价格
        { PutBackRegBeginDate: 4 }, // 回售登记开始日
        { PutBackRegEndDate: 4 }, // 回售登记结束日
        { PutBackCancelBeginDate: 4 }, // 回售撤销开始日
        { nPutBackCancelEndDate: 4 }, // 回售撤销结束日
        { PutBackMoneyDate: 4 }, // 回售资金到账日
        { RedemptionPrice: 4 }, // 赎回价格
        { RedemptionRegBeginDate: 4 }, // 赎回登记日
        { RedemptionMoneyDate: 4 }, // 赎回资金到账日
        { BondValue: 4 }, // 赎回资金到账日
        { PretaxRate: 4 },	//	税前收益率
        { PutBackTriggerPrice: 4 }, //	回售触发价（单位：厘）
        { RedemptionTriggerPrice: 4 }, //	强赎触发（单位：厘）
        { ResidualScale: 8 }, //	剩余规模(单位：份)
        { IsResale: 1 }, //	是否可回售（1是0不是）
        { IsCB: 1 }, //	是否可转债(1是0不是)
        // { UnderlyingUpDown: 4 },//	正股涨跌
        // { UnderlyingPB: 4 },//	正股市净率
        { MarketId: 4 }, //	所在市场号（债券）
        { m_acUnderlyingSecurityID: 10, type: 1 }, //	正股代码
        { m_nUnderlyingMarketId: 4 }, //	正股市场号
        { ParValue: 4 }, //	面值（单位：厘）
        { PaymentDate: 4 }, //	付息日，YYYYMMDD
        { acRateType: 30, type: 1 }, //	利率类型 如："累进利率"
        { BondType: 30, type: 1 }, //	债券类型
        { CouponRate: 4 }, //	票面利率，是实际票面利率的100倍，如：528表示5.28%
        { PDPremiumRate: 4 }, //	纯在溢价率，是实际纯在溢价率的100倍，如：528表示5.28%
        { ExpiryLeftYears: 4 }, //	剩余年限，是实际剩余年限的100倍，如：528表示5.28
        { PaymentLeftDays: 4 }, //	距付息日
        { nBondPeriod: 4 }, //	债券期限  年因有小数放大100000倍存放
        { nIssuanceScale: 8 }, //	发行规模 亿
        { nIssuePrice: 4 }, //	发行价 厘
        { nValueDate: 4 }, //	起息日 格式YYYYMMDD
        { acPaymentFrequency: 30, type: 3 }, //	付息频率, 如：“如：1年1次”
        { acCouponType: 30, type: 3 }, //	票息品种 如："附息"
        { BondValue: 4 }// 纯债价值（单位：厘）
    ]
];

var kzzQuoteAdd3 = [
    [
        { breathDay: 4 }, // 优先股：起息日
        { dividendYield: 4 }, // 优先股：股息率
        { whetherCanBeSoldBack: 1 }, // 优先股：是否可回售
        { whetherConvertibleShares: 1 }, // 优先股：是否可转股
        { originalStockCode: 10 } // 优先股：原始股票代码
    ]
];

var TbuySell = [
    [
        {
            StockData: [{ volume: 8 }]
        }
    ]
];

var ChiCangL = [
    [
        {
            StockData: [{ chicangl: 4 }]
        }
    ]
];

export {
    TNewPriceData,
    TNewMinData,
    TNewBinData,
    clearBase64,
    TkLineHead,
    TkLineData,
    DetailedData,
    ThePriceData,
    ColorData,
    Level2BinData,
    dayQuoteAdd,
    yxgQuotoAdd,
    gzcallDate,
    cdrQuoteAdd,
    kcbQuoteAdd,
    kzzQuoteAdd,
    kzzQuoteAdd2,
    afterCloseData, // 盘后数据
    TbuySell,
    kzzQuoteAdd3,
    ChiCangL,
    usQuoteAdd,
    qiquan
};
