/* eslint-disable */
var SH_KIND_INDEX = 16; // 国内股票-上证证券: 上证指数16 $1100,  上证指数
var SZ_KIND_INDEX = 32; // 国内股票-深证证券：深证指数32    $1200,  深证指数
var WP_INDEX = 90; // 国际指数90    $5100,
var QH_FUTURES_MARKET = 70; // 期货开始
var HS_KIND_STOCKA = 210; // 沪深A股210   $1101,  上证Ａ股
var HS_KIND_STOCKB = 211; // 沪深B股211   $1102,  上证Ｂ股
var BLOCK_INDEX_HY = 51; // 板块指数-行业   $4661,
var BLOCK_INDEX_GN = 52; // 板块指数-概念   $4662,
var WH_FOREIGN_MARKET = 80; // 外汇开始
var WP_MARKET = 90; // 外盘开始
var HK_MARKET = 110; // 港股
var HK_KIND_FUTURES_INDEX = 112;
var HK_KIND_Option = 112;
var QH_HT_STOCKFUND = 113; // //华泰股票型基金113	$4601,
var QH_HT_BONDFUND = 114; // //华泰债券型型基金114	$4602,
var QH_HT_HUNHEFUND = 115; // //华泰混合型基金115	$4603,
var QH_HT_MONEYFUND = 116; // //华泰货币型基金116	$4604,
var HQ_STOCK_MARKET = 0x1000; // 股票
var HQ_SH_BOURSE = 0x0100; // 上海
var HQ_SZ_BOURSE = 0x0200; // 深圳
var HQ_SYSBK_BOURSE = 0x0400; // 系统板块
var HQ_USERDEF_BOURSE = 0x0800; // 自定义（自选股或者自定义板块）
var HQ_KIND_INDEX = 0x0000; // 指数
var HQ_KIND_STOCKA = 0x0001; // A股
var HQ_KIND_STOCKB = 0x0002; // B股
var HQ_KIND_BOND = 0x0003; // 债券
var HQ_KIND_FUND = 0x0004; // 基金
var HQ_BJ_BOURSE = 0x0400; // 北交所
var HQ_KIND_THREEBOAD = 0x0005; // 三板
var HQ_KIND_SMALLSTOCK = 0x0006; // 中小盘股
var HQ_KIND_PLACE = 0x0007; // 配售
var HQ_KIND_KCB = 0x0007; // (科创板)
var HQ_KIND_LOF = 0x0008; // LOF
var HQ_KIND_ETF = 0x0009; // ETF
var HQ_KIND_QuanZhen = 0x000a; // 权证
var HQ_KIND_CYBLOCK = 0x000b; // 创业板
var HQ_KIND_FXBlock = 0x000c; // 风险警示板
var HQ_KIND_OtherIndex = 0x000e; // 第三方行情分类，如:中信指数
var HQ_KIND_USERDEFINE = 0x0010; // 自定义指数
// 港股市场
var HQ_HK_MARKET = 0x2000; // 港股分类
var HQ_HK_BOURSE = 0x0100; // 主板市场
var HQ_GE_BOURSE = 0x0200; // 创业板市场(Growth Enterprise Market)
var HQ_INDEX_BOURSE = 0x0300; // 指数市场
var HQ_HK_KIND_INDEX = 0x0000; // 港指
var HQ_HK_KIND_FUTURES_INDEX = 0x0001; // 港指
var HQ_SYSBK_BOURSE = 0x0400; // 港股板块(H股指数成份股，恒生指数成份股）。
var HQ_USERDEF_BOURSE = 0x0800; // 自定义（自选股或者自定义板块）
var HQ_HK_KIND_BOND = 0x0000; // 债券
var HQ_HK_KIND_MulFund = 0x0001; // 一揽子认股证
var HQ_HK_KIND_FUND = 0x0002; // 基金
var HQ_KIND_WARRANTS = 0x0003; // 认股证
var HQ_KIND_JR = 0x0004; // 金融
var HQ_KIND_ZH = 0x0005; // 综合
var HQ_KIND_DC = 0x0006; // 地产
var HQ_KIND_LY = 0x0007; // 旅游
var HQ_KIND_GY = 0x0008; // 工业
var HQ_KIND_GG = 0x0009; // 公用
var HQ_KIND_QT = 0x000a; // 其它
// 期货大类
var HQ_FUTURES_MARKET = 0x4000; // 期货
var HQ_DALIAN_BOURSE = 0x0100; // 大连
var HQ_KIND_BEAN = 0x0001; // 大连豆类
var HQ_KIND_YUMI = 0x0002; // 大连玉米
var HQ_KIND_SHIT = 0x0003; // 大宗食糖
var HQ_KIND_DZGY = 0x0004; // 大宗工业1
var HQ_KIND_DZGY2 = 0x0005; // 大宗工业2
var HQ_KIND_DOUYOU = 0x0006; // 大连豆油
var HQ_KIND_ZLYOU = 0x0007; // 棕榈油
var HQ_KIND_JYX = 0x0008; // 聚乙烯
var HQ_KIND_JLYX = 0x0009; // 聚氯乙烯
var HQ_SHANGHAI_BOURSE = 0x0200; // 上海
var HQ_ZHENGZHOU_BOURSE = 0x0300; // 郑州
var HQ_HUANGJIN_BOURSE = 0x0400; // 黄金交易所
var HQ_GUZHI_BOURSE = 0x0500; // 股指期货
var HQ_SELF_BOURSE = 0x0600; // 自定义数据
var HQ_KIND_OutFund = 0x0600; // 开放式基金
var HQ_DZGT_BOURSE = 0x0610; // 大宗钢铁数据
var HQ_DLTL_BOURSE = 0x0620; // 大连套利
var HQ_YSJS_BOURSE = 0x0630; // 有色金属
var HQ_KIND_Block_Index = 0x0660; // 板块指数
var HQ_DynamicSelf_BOURSE = 0x0700; // 动态数据类型自定义数据
// 外盘大类
var HQ_WP_MARKET = 0x5000; // 外盘
var HQ_WP_INDEX = 0x0100; // 国际指数 // 不用了
var HQ_WP_LME = 0x0200; // LME // 不用了
var HQ_WP_LME_CLT = 0x0210; // 场内铜
var HQ_WP_LME_CLL = 0x0220; // 场内铝
var HQ_WP_LME_CLM = 0x0230; // 场内镍
var HQ_WP_LME_CLQ = 0x0240; // 场内铅
var HQ_WP_LME_CLX = 0x0250; // 场内锌
var HQ_WP_LME_CWT = 0x0260; // 场内铝
var HQ_WP_LME_CW = 0x0270; // 场外
var HQ_WP_LME_Market = 0x000f; // LME市场
var HQ_WP_LME_SUB = 0x0000; // 场外
var HQ_WP_CBOT = 0x0300; // CBOT
var HQ_WP_NYMEX = 0x0400; // NYMEX
var HQ_WP_NYMEX_YY = 0x0000; // 原油
var HQ_WP_NYMEX_RY = 0x0001; // 燃油
var HQ_WP_NYMEX_QY = 0x0002; // 汽油
var HQ_WP_COMEX = 0x0500; // COMEX
var HQ_WP_TOCOM = 0x0600; // COMEX
var HQ_WP_IPE = 0x0700; // IPE
var HQ_WP_NYBOT = 0x0800; // NYBOT
var HQ_WP_NOBLE_METAL = 0x0800; // 贵金属
var HQ_WP_NOBLE_METAL_XH = 0x0000; // 现货
var HQ_WP_NOBLE_METAL_HJ = 0x0001; // 黄金
var HQ_WP_NOBLE_METAL_BY = 0x0002; // 白银
var HQ_WP_FUTURES_INDEX = 0x0a00; // 期指
var HQ_WP_SICOM = 0x0b00; // SICOM
var HQ_WP_LIBOR = 0x0c00; // LIBOR
var HQ_WP_NYSE = 0x0d00; // NYSE
var HQ_WP_CEC = 0x0e00; // CEC
var HQ_WP_Self_1 = 0x0e10; // ICE1
var HQ_WP_Self_2 = 0x0e20; // ICE2
var HQ_WP_Self_3 = 0x0e30; // CME
var HQ_WP_Self_4 = 0x0e40; // ICE1
var HQ_WP_Self_5 = 0x0e50; // ICE1
var HQ_WP_Self_6 = 0x0e60; // ICE1
var HQ_WP_Self_7 = 0x0e70; // ICE1
var HQ_WP_Self_8 = 0x0e80; // ICE1
var HQ_WP_Self_9 = 0x0e90; // ICE1
var HQ_WP_Self_A = 0x0ea0; // ICE1
var HQ_WP_Self_Begin = HQ_WP_Self_1; //
var HQ_WP_Self_End = HQ_WP_Self_A; //
var HQ_WP_Other_TZTHuanjin = 0x0f10;
var HQ_WP_Other_JinKaiXun = 0x0f20;
var HQ_WP_JKX = HQ_WP_Other_JinKaiXun;
var HQ_WP_XJP = 0x0f30;
var HQ_WP_LYSEE = 0x0f40;
var HQ_WP_INDEX_AZ = 0x0110; // 澳洲
var HQ_WP_INDEX_OZ = 0x0120; // 欧洲
var HQ_WP_INDEX_MZ = 0x0130; // 美洲
var HQ_WP_INDEX_TG = 0x0140; // 泰国
var HQ_WP_INDEX_YL = 0x0150; // 印尼
var HQ_WP_INDEX_RH = 0x0160; // 日韩
var HQ_WP_INDEX_XHP = 0x0170; // 新加坡
var HQ_WP_INDEX_FLB = 0x0180; // 菲律宾
var HQ_WP_INDEX_CCN = 0x0190; // 中国大陆
var HQ_WP_INDEX_TW = 0x01a0; // 中国台湾
var HQ_WP_INDEX_MLX = 0x01b0; // 马来西亚
var HQ_WP_INDEX_SUB = 0x0000; //
// 个股期权分类
var HQ_GGQQ_MARKET = 0x6000; // 个股期权
var HQ_GGQQ_KINDA = 0x0100; //
// 外汇大类
var HQ_FOREIGN_MARKET = 0x8000; // 外汇
var HQ_WH_BASE_RATE = 0x0100; // 基本汇率
var HQ_WH_ACROSS_RATE = 0x0200; // 交叉汇率
var HQ_FX_TYPE_AU = 0x0000; // AU    澳元
var HQ_FX_TYPE_CA = 0x0001; // CA    加元
var HQ_FX_TYPE_CN = 0x0002; // CN    人民币
var HQ_FX_TYPE_DM = 0x0003; // DM    马克
var HQ_FX_TYPE_ER = 0x0004; // ER    欧元
var HQ_FX_TYPE_HK = 0x0005; // HK    港币
var HQ_FX_TYPE_SF = 0x0006; // SF    瑞士
var HQ_FX_TYPE_UK = 0x0007; // UK    英镑
var HQ_FX_TYPE_YN = 0x0008; // YN    日元
var HQ_WH_FUTURES_RATE = 0x0300; // 期汇

function MakeMarket(x) {
    return x & 0xf000;
}

function MakeMainMarket(x) {
    return x & 0xfff0;
}

function MakeMidMarket(x) {
    return x & 0x0f00;
}

function MakeSubMarket(x) {
    return x & 0x000f;
}

function MakeIndexMarketHQ(x) {
    return (
        MakeMarket(x) == HQ_STOCK_MARKET &&
        MakeMidMarket(x) != 0 &&
        (MakeSubMarket(x) == HQ_KIND_INDEX ||
            MakeSubMarket(x) == HQ_KIND_OtherIndex)
    );
}

// 美股
const MakeUSMarket = function (x) {
    return MakeMainMarket(x) == (HQ_WP_MARKET | HQ_WP_LYSEE);
};
// 沪深
const MakeHSMarket = function (x) {
    return MakeMarket(x) == HQ_STOCK_MARKET;
};

// 指数
const MakeIndexMarket = function (x) {
    return (
        x == SH_KIND_INDEX ||
        x == SZ_KIND_INDEX ||
        x == WP_INDEX ||
        MakeIndexMarketHQ(x)
    );
};

// 深证指数
const MakeSZIndexMarket = function (x) {
    return MakeIndexMarketHQ(x);
};

// 股票
const MakeStockMarket = function (x) {
    return (
        (x >= 0 && x < QH_FUTURES_MARKET) ||
        x == HS_KIND_STOCKA ||
        x == HS_KIND_STOCKB ||
        MakeMarket(x) == HQ_STOCK_MARKET
    );
};

// 北交所市场
const MakeJAStockMarket = function (x) {
    return x & HQ_BJ_BOURSE;
};

// 个股期权
const MakeGGQQMarket = function (x) {
    return MakeMarket(x) == HQ_GGQQ_MARKET && MakeMidMarket(x) == HQ_GGQQ_KINDA;
};

// 沪深个股
const MakeStockMarketStock = function (x) {
    return (
        MakeStockMarket(x) &&
        x != SH_KIND_INDEX &&
        x != SZ_KIND_INDEX &&
        x != BLOCK_INDEX_HY &&
        x != BLOCK_INDEX_GN &&
        MakeSubMarket(x) != HQ_KIND_INDEX &&
        MakeSubMarket(x) != HQ_KIND_USERDEFINE &&
        MakeSubMarket(x) != HQ_KIND_OtherIndex
    );
};

// 板块指数
const MakeBlockIndex = function (x) {
    return MakeMainMarket(x) == (HQ_FUTURES_MARKET | HQ_SELF_BOURSE | 0x0060);
};

// 股票板块
const MakeStockBlock = function (x) {
    return x >= 0 && (x == BLOCK_INDEX_HY || x == BLOCK_INDEX_GN);
};

// 期货
const MakeQHMarket = function (x) {
    return (
        ((x >= QH_FUTURES_MARKET && x < WH_FOREIGN_MARKET) ||
            MakeMarket(x) == HQ_FUTURES_MARKET) &&
        MakeMidMarket(x) != HQ_KIND_OutFund
    );
};

// 外汇
const MakeWHMarket = function (x) {
    return (
        (x >= WH_FOREIGN_MARKET && x < WP_MARKET) ||
        MakeMarket(x) == HQ_FOREIGN_MARKET
    );
};

// 外盘
const MakeWPMarket = function (x) {
    return (x >= WP_MARKET && x < HK_MARKET) || MakeMarket(x) == HQ_WP_MARKET;
};

// 三板
const MakeThreeBordMarket = function (x) {
    return (
        MakeMarket(x) == HQ_STOCK_MARKET && MakeSubMarket(x) == HQ_KIND_THREEBOAD
    );
};

// 港股
const MakeHKMarket = function (x) {
    return (x >= HK_MARKET && x < 113) || MakeMarket(x) == HQ_HK_MARKET;
};

// 港股个股
const MakeHKMarketStock = function (x) {
    return MakeHKMarket(x) && MakeMidMarket(x) != HQ_INDEX_BOURSE;
};

// 京市新三板可转债
const MakeBJBondMarket = function (x) {
    return (
        MakeMarket(x) === HQ_STOCK_MARKET &&
        MakeMidMarket(x) === HQ_BJ_BOURSE &&
        MakeSubMarket(x) === HQ_KIND_BOND
    );
};

// 新三板可转债
const MakeSBBondMarket = function (x) {
    return (
        MakeMarket(x) === HQ_STOCK_MARKET &&
        MakeMidMarket(x) === HQ_SZ_BOURSE &&
        MakeSubMarket(x) === HQ_KIND_KCB
    );
};

const MakeHTFundMarket = function (x) {
    return (
        (x >= QH_HT_STOCKFUND && x <= QH_HT_MONEYFUND) ||
        MakeMainMarket(x) == (HQ_FUTURES_MARKET | HQ_KIND_OutFund)
    );
};

// 科创板 + 创业板
const MakeKCBMarket = function (stockProp) {
    if (!stockProp) return
    // 小于32位直接返回NO
    if (stockProp.length < 32) return false;

    var nsStock = '';
    var nsKCB = '';
    if (stockProp.length > 30) {
        nsStock = stockProp.slice(30, 31);
    }

    if (nsStock.length > 0 && nsStock[0] === '0') {
        if (stockProp.length > 31) {
            nsKCB = stockProp.slice(31, 32);
        }
        if (nsKCB.length > 0 && (nsKCB == '7' || nsKCB == '3')) {
            return true;
        }
    }

    return false;
};

/**
 1 是否CDR股票 2 是否沪伦通CDR
 @param stockProp 股票属性
 */
const MakeCDRMarket = function (stockProp) {
    var nsCDR = '';
    var cCDR = '';

    if (stockProp.length < 1) return false;

    if (stockProp.length >= 31) {
        nsCDR = stockProp.slice(29, 31);
    }

    cCDR = nsCDR;

    // 上证CDR
    if (cCDR[0] == 1 && cCDR[1] == 6) {
        return true;
    }

    // 深证CDR
    if (cCDR[0] == 2 && cCDR[1] == 6) {
        return true;
    }

    return false;
};

// 优先股
const MakeyxgMarket = function (stockProp) {
    var nsStock;
    if (stockProp.length > 18) {
        nsStock = stockProp.slice(19, 20);
    }
    if (nsStock == '1') return true;
    return false;
};

// 创业板
const MakeCYBMarket = function (stockProp) {
    if (!stockProp) return false;
    // 小于32位直接返回NO
    if (stockProp.length < 32) return false;
    var nsStock = '';
    var nsKCB = '';
    if (stockProp.length > 30) {
        nsStock = stockProp.slice(30, 31);
    }
    if (stockProp.length > 31) {
        nsKCB = stockProp.slice(31, 32);
    }
    if (nsStock === '0' && nsKCB == '3') {
        return true;
    }
};

// 创业板注册
const MakeCYBZCType = function (stockProp) {
    return stockProp.length > 33 && stockProp[33] == 1;
};

// 新三板各类型
const MakeXSBType = function (stockProp) {
    if (stockProp.length <= 0) return false;

    const resStockProp = stockProp.slice(10, 11);
    const JUDGE_BIT = resStockProp[0];

    if (JUDGE_BIT === 'T') {
        return 'XY';
    } else if (JUDGE_BIT === 'M') {
        return 'ZS';
    } else if (JUDGE_BIT === 'B') {
        return 'LX';
    } else if (JUDGE_BIT === 'C') {
        return 'JH';
    } else if (JUDGE_BIT === 'O') {
        return 'OTHER';
    }
};

// 北交所股票 > stockProp
const MakeJAstockType = function (stockProp) {
    return stockProp && stockProp[29] == 7;
};

// 北交所股票 > marketType
const MakeJAMarketType = function (nMarketType) {
    const nMarket = MakeMarket(nMarketType);
    const nMainMarket = MakeMidMarket(nMarketType);

    return nMarket == HQ_STOCK_MARKET && nMainMarket == HQ_BJ_BOURSE;
};

// 债券类型判断
const MakeBoundStockType = function (nMarketType) {
    return MakeSubMarket(nMarketType) === HQ_KIND_BOND;
};

const getMarketNameByType = function (nMarketType) {
    var strValue = '';

    switch (MakeMarket(nMarketType)) {
        case HQ_STOCK_MARKET:
            if (MakeSubMarket(nMarketType) == HQ_KIND_STOCKA) {
                if (MakeMidMarket(nMarketType) == HQ_SZ_BOURSE) {
                    strValue = '深A';
                } else if (MakeMidMarket(nMarketType) == HQ_SH_BOURSE) {
                    strValue = '沪A';
                }
            } else if (MakeSubMarket(nMarketType) == HQ_KIND_STOCKB) {
                if (MakeMidMarket(nMarketType) == HQ_SZ_BOURSE) {
                    strValue = '深B';
                } else if (MakeMidMarket(nMarketType) == HQ_SH_BOURSE) {
                    strValue = '沪B';
                }
            } else {
                switch (MakeSubMarket(nMarketType)) {
                    case HQ_KIND_INDEX:
                        strValue = '指数';
                        break;
                    case HQ_KIND_STOCKA:
                        strValue = '沪A';
                        break;
                    case HQ_KIND_STOCKB:
                        strValue = 'B股';
                        break;
                    case HQ_KIND_BOND:
                        strValue = '债券';
                        break;
                    case HQ_KIND_FUND:
                        strValue = '基金';
                        break;
                    case HQ_KIND_THREEBOAD:
                        strValue = '新三板';
                        break;
                    case HQ_KIND_SMALLSTOCK:
                        strValue = 'A股'; // 中小改成A股（正常情况下，更新一下后台，这里不改也是可以的）
                        break;
                    case HQ_KIND_LOF:
                        strValue = 'LOF';
                        break;
                    case HQ_KIND_ETF:
                        strValue = 'ETF';
                        break;
                    case HQ_KIND_QuanZhen:
                        strValue = '权证';
                        break;
                    case HQ_KIND_CYBLOCK:
                        strValue = '创业板';
                        break;
                    case HQ_KIND_FXBlock:
                        strValue = '警示板';
                        break;
                    case HQ_KIND_KCB:
                        strValue = '科创板';
                        break;
                    default:
                        strValue = '沪深';
                        break;
                }
            }
            break;
        case HQ_HK_MARKET:
            strValue = '港股';
            break;
        case HQ_WP_MARKET:
            {
                if (MakeUSMarket(nMarketType)) strValue = '美股';
                else strValue = '外盘';
            }
            break;
        case HQ_FOREIGN_MARKET:
            strValue = '外汇';
            break;
        case HQ_FUTURES_MARKET:
            {
                // 板块指数
                if (
                    MakeMainMarket(nMarketType) ==
                    (HQ_KIND_Block_Index | HQ_FUTURES_MARKET)
                ) {
                    // strValue = "指数";
                    strValue = '板块';
                } else {
                    if (MakeHTFundMarket(nMarketType)) strValue = '基金';
                    if (MakeQHMarket(nMarketType)) strValue = '期货';
                    // else strValue = "期货";
                    else strValue = '板块';
                }
            }
            break;
        case HQ_GGQQ_MARKET:
            strValue = '期权';
            break;

        default:
            break;
    }
    return strValue;
};

const getStockCategoryNameByMarket = function (nMarketType) {
    const stockCatrgory = { label: '', value: '' };
    switch (MakeMarket(nMarketType)) {
        case HQ_STOCK_MARKET:
            {
                if (MakeJAStockMarket(nMarketType)) {
                    stockCatrgory.label = '京A';
                    stockCatrgory.value = 'JA';
                } else if (MakeSubMarket(nMarketType) === HQ_KIND_THREEBOAD) {
                    stockCatrgory.label = '新三板';
                    stockCatrgory.value = 'XSB';
                } else if (MakeMidMarket(nMarketType) === HQ_SH_BOURSE) {
                    stockCatrgory.label = '沪';
                    stockCatrgory.value = 'HG';
                } else if (MakeMidMarket(nMarketType) === HQ_SZ_BOURSE) {
                    stockCatrgory.label = '深';
                    stockCatrgory.value = 'SG';
                }
            }
            break;
        case HQ_HK_MARKET:
            stockCatrgory.label = '港股';
            stockCatrgory.value = 'GG';
            break;
        case HQ_WP_MARKET:
            {
                if (MakeUSMarket(nMarketType)) {
                    stockCatrgory.label = '美股';
                    stockCatrgory.value = 'MG';
                } else {
                    stockCatrgory.label = '外盘';
                    stockCatrgory.value = 'WP';
                }
            }
            break;
        case HQ_FOREIGN_MARKET:
            stockCatrgory.label = '外汇';
            stockCatrgory.value = 'WH';
            break;
        case HQ_FUTURES_MARKET:
            {
                // 板块指数
                if (
                    MakeMainMarket(nMarketType) ==
                    (HQ_KIND_Block_Index | HQ_FUTURES_MARKET)
                ) {
                    stockCatrgory.label = '指数';
                    stockCatrgory.value = 'ZS';
                } else {
                    if (MakeHTFundMarket(nMarketType)) {
                        stockCatrgory.label = '基金';
                        stockCatrgory.value = 'JG';
                    } else {
                        stockCatrgory.label = '期货';
                        stockCatrgory.value = 'QH';
                    }
                }
            }
            break;
        case HQ_GGQQ_MARKET:
            stockCatrgory.label = '期权';
            stockCatrgory.value = 'QQ';
            break;
        default:
            break;
    }
    return stockCatrgory;
};

const getStockTypeClsByMarketNo = function (marketNo) {
    var cls;

    if (MakeSubMarket(marketNo) === HQ_KIND_THREEBOAD) {
        cls = 'XSB';
    } else if (MakeMidMarket(marketNo) === HQ_SH_BOURSE) {
        cls = 'HG';
    } else if (MakeMidMarket(marketNo) === HQ_SZ_BOURSE) {
        cls = 'SG';
    }

    return cls;
};

const getStockTypeClsByStockProp = function (stockProp) {
    var cls = '';

    if (!stockProp) return cls;

    if (MakeXSBType(stockProp)) {
        cls = MakeXSBType(stockProp);
    } else if (MakeJAstockType(stockProp)) {
        cls = 'JA';
    } else if (MakeCYBZCType(stockProp)) {
        cls = 'ZC';
    } else if (MakeKCBMarket(stockProp)) {
        cls = 'KC';
    } else if (MakeCDRMarket(stockProp)) {
        cls = 'CDR';
    }

    return cls;
};

// 根据 MARKETSTATUS和 SUSPFLAG 来展示交易状态
const tradeStatusName = function (marketStatus, suspflag) {
    var status = Number(marketStatus);
    var flag = Number(suspflag) == 2 || Number(suspflag) == 3; // 2-长期停牌  3-临时停牌
    switch (status) {
        case 1:
            return '未开市';
        case 2:
            // 需要先判断是否为停牌，停牌状态下需显示停牌
            if (flag) {
                // 2-长期停牌  3-临时停牌
                return '停牌';
            }
            return '开盘集合竞价';
        case 3:
            // 需要先判断是否为停牌，停牌状态下需显示停牌
            if (flag) {
                return '停牌';
            }
            return '交易中'; // "连续竞价";
        case 4:
            return '停牌';
        case 5:
            // 需要先判断是否为停牌，停牌状态下需显示停牌
            if (flag) {
                // 2-长期停牌  3-临时停牌
                return '停牌';
            }
            return '收盘集合竞价';
        case 6:
            return '闭市';
        case 7:
            // 需要先判断是否为停牌，停牌状态下需显示停牌
            if (flag) {
                // 2-长期停牌  3-临时停牌
                return '停牌';
            }
            return '盘后交易';
        case 8:
            return '休市';
        case 9:
            // 需要先判断是否为停牌，停牌状态下需显示停牌
            if (flag) {
                // 2-长期停牌  3-临时停牌
                return '停牌';
            }
            return '开盘集合竞价后';
        default:
            return '';
    }
};

// 沪市判断
function MakeSHMarket(nMarketType) {
    var nMarket = MakeMarket(nMarketType);
    var nMainMarket = MakeMidMarket(nMarketType);
    return (nMarket == HQ_STOCK_MARKET) && (nMainMarket == HQ_SH_BOURSE);
}

// 深市判断
function MakeSZMarket(nMarketType) {
    var nMarket = MakeMarket(nMarketType);
    var nMainMarket = MakeMidMarket(nMarketType);
    return (nMarket == HQ_STOCK_MARKET) && (nMainMarket == HQ_SZ_BOURSE);
}

export {
    MakeUSMarket,
    MakeIndexMarket,
    MakeStockMarket,
    MakeGGQQMarket,
    MakeBlockIndex,
    MakeStockMarketStock,
    MakeStockBlock,
    MakeQHMarket,
    MakeWHMarket,
    MakeWPMarket,
    MakeThreeBordMarket,
    MakeHKMarket,
    MakeSZIndexMarket,
    MakeHKMarketStock,
    MakeMarket,
    MakeSubMarket,
    MakeMainMarket,
    MakeHTFundMarket,
    getMarketNameByType,
    MakeHSMarket,
    MakeSHMarket,
    MakeSZMarket,
    getStockCategoryNameByMarket,
    MakeKCBMarket,
    MakeyxgMarket,
    MakeCDRMarket,
    tradeStatusName,
    MakeXSBType,
    MakeBJBondMarket,
    MakeBoundStockType,
    MakeJAMarketType,
    MakeSBBondMarket
};
/* eslint-enable */
