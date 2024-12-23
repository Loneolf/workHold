define(function(require, exports) {
    require('/c/TZT.js');
    require('/newjy/gsuitability/js/sui_main.js');
    var tzt = T;
    var nat = require('../../../z_modules/native/native.js');
    FastClick.attach(document.body);


    /*utils*/
    /*
     * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
     * @param fn {function}  需要调用的函数
     * @param delay  {number}    延迟时间，单位毫秒
     * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
     * @return {function}实际调用函数
     */
    var throttle = function(fn, delay, immediate, debounce) {
        var curr = +new Date(), //当前事件
            last_call = 0,
            last_exec = 0,
            timer = null,
            diff, //时间差
            context, //上下文
            args,
            exec = function() {
                last_exec = curr;
                fn.apply(context, args);
            };
        return function() {
            curr = +new Date();
            context = this,
                args = arguments,
                diff = curr - (debounce ? last_call : last_exec) - delay;
            clearTimeout(timer);
            if (debounce) {
                if (immediate) {
                    timer = setTimeout(exec, delay);
                } else if (diff >= 0) {
                    exec();
                }
            } else {
                if (diff >= 0) {
                    exec();
                } else if (immediate) {
                    timer = setTimeout(exec, -diff);
                }
            }
            last_call = curr;
        }
    };




    //template
    function template(text, interpolate) {
        var settings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/;
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
        var escapeChar = function(match) {
            return '\\' + escapes[match];
        };

        function _template(text) {
            if (!settings && oldSettings)
                settings = oldSettings;
            var matcher = RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');
            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset).replace(escaper, escapeChar);
                index = offset + match.length;
                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                } else if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                } else if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }
                return match;
            });

            source += "';\n";
            if (!settings.variable)
                source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __t,__p='',__j=Array.prototype.join," +
                "print=function(){__p+=__j.call(arguments,'');};\n" +
                source + 'return __p;\n';
            try {
                var render = new Function(settings.variable || 'obj', '_', source);
            } catch (e) {
                e.source = source;
                throw e;
            }
            var template = function(data) {
                return render.call(this, data);
            };
            var argument = settings.variable || 'obj';
            template.source = 'function(' + argument + '){\n' + source + '}';
            return template;
        };
        return _template(text)
    }

    /*separated by commas*/
    function toDemi(str) {
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /*effects*/
    /*show hide the fund*/
    var showPro = function(el) {
        this.el = el;
        $('body').off('click').on('click', '.eyes', this.mainFun)
    }

    showPro.prototype.mainFun = function() {
        var $this = $(this);
        T.readFileMesg('eyeStatus', function(result) {
            var res = JSON.parse(decodeURIComponent(result));
            res.eyeStatus = !res.eyeStatus;
            T.saveFileMesg(res, 'eyeStatus',
                function() {
                    $this.toggleClass('close-eye');
                    var protects = $('.hide-fun');
                    protects.each(function() {
                        var $this = $(this);
                        var temp = $this.data('pas');
                        var cls = $this.attr('classTemp');
                        $this.toggleClass(cls);
                        $this.data('pas', $(this).text());
                        $this.text(temp);
                    })
                }
            );
        })

    }



    /*dropdown*/
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.down-arrow,.down-arrow-h1')
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();
        $next.stop(true).slideToggle();
        $this.toggleClass('arrow-change');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }
    var accordion = new Accordion($('#accordion'), false);

    //checkVersion
    function checkVersion(ver, columns) {
        this.ver = ver;
        for (var prop in columns) {
            this[prop] = $(columns[prop]);
        }
        this.checkVersion();
    }

    checkVersion.prototype.checkVersion = function() {
        var _this = this;
        T.readLocalMesg(["softversion"], function(oData) {
            oDom.softversion = oData.SOFTVERSION;
            oData.SOFTVERSION <= _this.ver ? _this.lower.show() : _this.higher.show()
        });
    }
    //比较版本号


    function showColumn(ver, column) {
        this.ver = ver;
        this.column = column;
        this.showfun();
    }


    showColumn.prototype.compareVersion = function(v1, v2) {
        var arr1 = v1.replace(/[-_]/g, '.').split('.');
        var arr2 = v2.replace(/[-_]/g, '.').split('.');
        var len = Math.max(arr1.length, arr2.length);
        for (var i = 0; i < len; i++) {
            if (parseInt(arr1[i]) == parseInt(arr2[i])) continue;
            return parseInt(arr1[i]) > parseInt(arr2[i]) ? true : false;
        }
        return false;
    }

    showColumn.prototype.showfun = function() {
        var _this = this;
        $column = $(_this.column);
        T.readLocalMesg(["softversion"], function(data) {
            var nowVer = data.SOFTVERSION;
            if (_this.compareVersion(nowVer, _this.ver)) {
                $column.show();
            } else {

            }
        });
    }



    //foos
    var oDom = {
        //买入
        buy: $('.j_bug'),
        //卖出
        sell: $('.j_sell'),
        //撤单
        chedan: $('.j_chedan'),
        //查询资金
        qfund: $('.j_qfund'),
        //我的持仓
        mypositon: $('.j_mypositon'),
        //当日委托
        dayorder: $('.j_dayorder'),
        //当日成交
        daydeal: $('.j_daydeal'),
        //更多
        morefunc: $('.j_morefunc'),
        //银证转帐
        yzindex: $('.j_yzindex'),
        //融资融券
        rzrq: $('.j_rzrq'),
        //开放基金
        kfjj: $('.j_kfjj'),
        //退出登录
        tcdl: $('.j_jyout'),
        //场内基金
        cnjj: $('.j_cnjj'),
        //实时货币基金
        sshbjj: $('.j_sshbjj'),
        //融微贷
        wrd: $('.j_wrd'),
        //股转业务
        gz: $('.j_gz'),
        //沪港通交易
        zqnhg: $('.j_zqnhg')
        //债券逆回购
    };

    //check login
    function checkLogin() {
        var $login = $('.trade-header-logbg'),
            $info = $('.fund-info');
        T.readLocalMesg(['jyloginflag'], function(olocal) {
            if (olocal.JYLOGINFLAG <= 1) {
                $(document).off('click').on('click', '.login-button', function() {
                    T.readFileMesg('eyeStatus', function(result) {
                        var res;
                        if (result == '') {
                            res = {
                                eyeStatus: true
                            }
                            T.saveFileMesg(res, 'eyeStatus',
                                function() {
                                    T.fn.action10090({
                                        'jsfuncname': 'showFund()'
                                    });
                                }
                            );
                        } else {
                            res = JSON.parse(decodeURIComponent(result));
                            if (res.eyeStatus) {
                                T.fn.action10090({
                                    'jsfuncname': 'showFund()'
                                });
                            } else {
                                T.fn.action10090({
                                    'jsfuncname': 'showHide()'
                                });
                            }
                        };
                    })
                });
                $('#login-out').hide();
                $info.hide();
                $login.show();
            } else {
                $info.show();
                $('.trade-header-logbg').hide();
                $('#login-out').show();
                T.readFileMesg('eyeStatus', function(result) {
                    var res;
                    if (result == '') {
                        res = {
                            eyeStatus: true
                        }
                        T.saveFileMesg(res, 'eyeStatus',
                            function() {
                                showFund();
                            }
                        );
                    } else {
                        res = JSON.parse(decodeURIComponent(result));
                        if (res.eyeStatus) {
                            showFund();
                        } else {
                            showHide();
                        }
                    };
                })

            }
        })
    }


    /*查询资产信息*/
    function showFund() {
        var oSendData = {
            action: 117
        };
        $.getData({
            oSendData: oSendData,
            isload: false,
            fnSuccess: function(oData) {
                var TOTALYK_RMB;
                if (oData.GRID0.length == 1) {
                    oData.TOTALYK_RMB = '0.00';
                }
                var data;
                try {
                    data = {
                        allMoney: +oData.TOTALASSET_RMB,
                        allFund: toDemi(oData.TOTALASSET_RMB),
                        fundArr: [{
                            val: toDemi(oData.TOTALYK_RMB),
                            realVal: oData.TOTALYK_RMB,
                            name: '浮动收益'
                        }, {
                            val: toDemi(oData.USABLE),
                            realVal: oData.USABLE,
                            name: '可用资金'
                        }, {
                            val: toDemi(oData.GRID2[1].split('|')[2]),
                            realVal: oData.GRID2[1].split('|')[2],
                            name: '可取资金'
                        }],
                        flag: false
                    }
                } catch (e) {
                    data = {
                        allMoney: 0,
                        allFund: '0.00',
                        fundArr: [{
                            val: '0',
                            realVal: '0.00',
                            name: '浮动收益'
                        }, {
                            val: '0',
                            realVal: '0.00',
                            name: '可用资金'
                        }, {
                            val: '0',
                            realVal: '0.00',
                            name: '可取资金'
                        }],
                        flag: false
                    }
                }
                data.fundArr.forEach(function(item) {
                    if (item.realVal > 1000000000) data.flag = true;
                });
                var compiled = template($('#trade_header').html());
                var fundDiv = compiled(data);
                var $info = $('.fund-info');
                if (data.flag) {
                    $info.height($info.height());
                }
                $info.html(fundDiv);
            }
        });
    }

    function showHide() {
        var oSendData = {
            action: 117
        };
        $.getData({
            oSendData: oSendData,
            isload: false,
            fnSuccess: function(oData) {
                var TOTALYK_RMB;
                if (oData.GRID0.length == 1) {
                    oData.TOTALYK_RMB = '0.00';
                }
                var data;
                try {
                    data = {
                        allMoney: +oData.TOTALASSET_RMB,
                        allFund: toDemi(oData.TOTALASSET_RMB),
                        fundArr: [{
                            val: toDemi(oData.TOTALYK_RMB),
                            realVal: oData.TOTALYK_RMB,
                            name: '浮动收益'
                        }, {
                            val: toDemi(oData.USABLE),
                            realVal: oData.USABLE,
                            name: '可用资金'
                        }, {
                            val: toDemi(oData.GRID2[1].split('|')[2]),
                            realVal: oData.GRID2[1].split('|')[2],
                            name: '可取资金'
                        }],
                        flag: false
                    }
                } catch (e) {
                    data = {
                        allMoney: 0,
                        allFund: '0.00',
                        fundArr: [{
                            val: '0',
                            realVal: '0.00',
                            name: '浮动收益'
                        }, {
                            val: '0',
                            realVal: '0.00',
                            name: '可用资金'
                        }, {
                            val: '0',
                            realVal: '0.00',
                            name: '可取资金'
                        }],
                        flag: false
                    }
                }

                data.fundArr.forEach(function(item) {
                    if (item.realVal > 1000000000) data.flag = true;
                })
                var compiled = template($('#trade_header_hide').html());
                var fundDiv = compiled(data);
                var $info = $('.fund-info');
                if (data.flag) {
                    $info.height($info.height());
                }
                $info.html(fundDiv);
            }
        });
    }

    window.showFund = showFund;
    window.showHide = showHide;

    function renderNav() {
        var compiled = template($('#navTemplate').html());
        var data = {
            "navArr": [
                [{
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAzCAYAAAA0CE5FAAADJElEQVR42uyau2sUQRzHPzcGTKFiESvbFIqFGHPGf0KjhQ9EJIWm1c5H5aPz0aZXS0kXUl57D0+9iEbEKwJJEY0GD8Khx120mYNlszezszuze9nsFw4C89iZz87vNZvCVvEEKemfYf9CGosU5MoB5YByQDmgHFAOKAeUA8qVA0oP0JwsHUx+UUoTk9/cMAG6A5SG6MWX5JqGBlAHuAI0hwBOE7gq1zRUPugncAFopQinBVwENobVSX8GrgO9FOD05LM/2XbSqxpnN2M45wJwPwVAD+SzTTSj2fuqACqaSaYiLPYZ8CpBOK+BpxHGndG0VwRQ1nQqRlz0LaCaAJwqcDPiWB2gmgDqmk4ngdGIkW0aWHMIZ00GhigRa1TuTQm/D6ir6DQCTETcwHfgPNB2AKctX8B6xPETcm+D1AXqQj5oKeZRVOmDxxnaUj94vI8xh851LAHtfph34ai9egM8tgjoiZwzjnR7qnjzIB2gSQubegTMW5hnHnhoYZ6iTUDjwJgFs7gBNGLM0ZBzxDXXMbknZQTzAmoCm47Cvd+xngN+RBi7Ice2Ezg9m8A3f6lRjWmzLkOz7ZRBF3Sq/VMq/DbnKJL5VQZmDfrPhkhorTtoP6ByAibm1UvgeYh+L2Rfm5oM8QJ3AKoB2zEdm6nuAYuK9kXgruVnjgNHFO3bfQftB9QCviQQ7v1XFNeA5YC2ZdnWS/j0fMVzpyWCQptCZx2UDC3pgH/5osg0bi7fdP6n6r8PwiCSFXGjJnBZ1j9d4BLurm+1Vxz+QhSDSNYv8LoOFl4Cbnv+dqER4JQJoILvP8z2Ab+BAxobfsfu1GnN9c4WcNjr90SA06ylZGZJSOega/6gIHRHzGFGnYZ0QWaHDxaDirSEMuqkpTv9b8MA0kWyY8ChXQjnIHA8bAatArQOrCgmEQ4SxqROj+o74AoB17ciTKjLiJmFuiDby4CmbAIqZxCQbs3lQZllkBrAX2D/gPaj2P1KkbY6wEeTE9RB/ykoS2oAf0wAhTGzLKmsCtlGTiujquSAHAAKTJwyKGViLKLaZoakrD11gOp7AJCy9vw/AKIV01L/mao9AAAAAElFTkSuQmCC",
                    "name": "买入",
                    "data": "data-acid=12310"
                }, {
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAyCAYAAAD/VJ3gAAAC/0lEQVR42uyZO0wUQRjHf7cHiCRK4QmFlJf4wAQhItR0Bjq1FKmppZVSWwsbtVCjidr4Kuxsd++8AoyJMVqQ0FiRmBAiBNHivkvultuZ2cfd7c7yTza53Mx+u/PLzPfawtkHu6REc8BH+X0V+JSGl3JSAqcMvAQG5Hol/x0BAoaBN8Dppv9KwFsZyzWgIvAcuNhmbFzGinkGdBdYUIwvyJxcAroJrBjMWwEW8wZoBngcYv4juScXgMaAdxKtTDUg94zZDmhIFjoa4d5R4L3YsBJQAXgCTMWwMQk8FVvWAboD3EjAznWxZRWga8BqgvZWBZQVgC4BzxI+FgU5apNZBzQCfOiQYx0Spz2SVUDdCM1RUobQgDaBf4prKaLth8BsF47wrCSSUbSkWfumA3gGWW9Y3QZudTFCLhqWLX5d0Yx7DuBqJk2HfOg8cK9Hhe98woCqDlDTTJoABg0feAF40aMWRVGePW44f1DWplKlAWhfManPMPs9JQ6zl02uYeqNtpLB3ClZW5D2gZoD7ADrMbdiP/CadLRJy9Rbtv0xXcc6sNMI83Ed9X3qTfe0aE7eKc6avOY8SAfosmZ8WbLbMFeU7DnMtRxzB4UCVDY811lRycAdVJsB/QS2Eg73aZZuLVvAD3+pUelAwphW6YJORTLpFkBeTKNZkpGD9gNyc3TEdEHHbQeoChzEdGxZUJnWr7h+HTQctB/Qb+BbTPI27J7vwuIQIJrJKVoLtvuflmDlqAYt9UPaFocKkC6S6Qq8tKsPfR9bCegrsB2zRZBmTQDHFePbwiAQ0F8DP5TUMet07RbFQVeFQSCgJCr7NEsXZA75YCeoSLM0o9bt/s8mgHSR7BxwMoNwTgDnTTNoFaBfwIbCiJPRhHEa9XfADVm7FpCthatRgyzPgGaSBORaCEj3zm5QZtlOa8AucCxg/AzSULJEe8CXMDtoD/2nIJu0BvwJA8jkmNkkVxWyQzktS+UdAeoAoLaJk4VSJsZO1LNpkZS1pw5QLQeAlLXn/wEAY5GQeMM7+vwAAAAASUVORK5CYII=",
                    "name": "卖出",
                    "data": "data-acid=12311"
                }, {
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA2CAMAAABUWfHRAAAAbFBMVEX6pwD////6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwD6pwC7NIfIAAAAI3RSTlMAAAEDBgkNEhgeJS02P0lUYHmGk5+rtsDJ0trh5+3y9vn8/mGRx1gAAACwSURBVEjH7dXHEsIwDARQhRZCDRB6CbD//4+cExfJeyAX6+iZN+OxrJVIv8YH0atwTmYnMK66gnGrBxi3bcG43ReEmzQA4cozGLe4gXHrJxhXv0G40R4g3PQIxs0vSK5CZHkH4zYvUO6D/zr2nuy70H1I6nvHJfyzrrP/676zzpHjjHPrOltOeJwpl3zOkoN+p+duwKk5H3LaXgk6ZY+FXXxvRly0sstuIJee19kN735ke6GJp9AklAAAAABJRU5ErkJggg==",
                    "name": "撤单",
                    "data": "data-acid=12340"
                }, {
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA2AQMAAABKntNUAAAABlBMVEX9bSr9bSoUsnMRAAAAAXRSTlMAQObYZgAAADVJREFUGNNjYGCo////DwMIkMZgYKQ5gzyHwRgkgP////+w////H5mMfwzMP+wbGGjJoMyFAIU3yuyQ0LeeAAAAAElFTkSuQmCC",
                    "name": "持仓",
                    "data": "data-href9=/newjy/qchicang.html"
                }],
                [{
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAwAQMAAACVLJAzAAAABlBMVEX9bSr9bSoUsnMRAAAAAXRSTlMAQObYZgAAABZJREFUGNNj+A8BDxiozqA6GHXq/wcAvtHrb+nrLtMAAAAASUVORK5CYII=",
                    "name": "委托",
                    "data": "data-href9=/newjy/ptjy/qdrwt.html"
                }, {
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA0CAYAAADbsStYAAACn0lEQVR42uya24tNURzHP4ed6yAJ/8OUkgflbkTDRAgPpChyzTx4UMqDeVCEeJgyzWSIB9JoyG1yLUkpSSmZpqZBSHiYZOQyHS/fKZ2cPb89Z619Lta3zsM5+9c6v09rr9/6fdfemf491VnSUYYiahj/iQJoAA2gAbQkFJXiVhBm9N+aBdwDJlYy6BygA1gE3AUmVSLoPEGO1/cZgp1cSaALBVmV8/t03cZTKgF0MXADGJPn+jTgATC1nEFrgasxkAOqBi6UK+gy4IoBEuA9sLMcQZcLcpQh9q3WcGe5ga4ELgMjDLFvBNnlsxjVGpNJojXAJeO4PcACoNvn9rILuAVcdAi7LsF43ZrJHp8NQz3QqP54NdDmAHa9qmZkiO0S5GufLeBe4GSOCVgBtAMjhzjmRuA8MNwQ2wnUqAB5a+r3AcfzOJ067XejE465GThrhHwlyHc+3ct+4IijzX1AW4DTRsiXul0/+LZpY41xS4DrBthtQIsxnxeC/JiGHz0AHDTG1qgiV8VU7Caj2X8uS/YpTePdIGCL5gt2XEzFHkzP1NB/LsYJwyGtV4vmylpNiKnY+fRUkF+GmmhE4ToM/AaOGmJnA7dlsxqM4z9RYestJEkXoADHgP6Y7eZvzdTHosfaqnoLTdBlr3tCa87VQ6tHwFIXkD7cSyOw2wHsQ0F+dZWYD5t2CthRAOx9mexvLpPy5Uebga1at0l0R71yn+uEfBrvVjUD1pntkMnu85GM7xOGZiPsTWAV8N1XImkcpTQB22Ngr8nH/vCZRFpnRi1yJ7lrth1YC/z0nUBEejoj0FZZsTZgA/DL4X9kSwEU4Jxg64BNah1TUSbP6zfl+nw0W+w1WnQF0AAaQEtbUdLqFWY0gAbQABpAA+jg+jMAqnF9PL2b78cAAAAASUVORK5CYII=",
                    "name": "成交",
                    "data": "data-href9=/newjy/ptjy/qdrcj.html"
                }, {
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA6CAMAAAAjmzGqAAAAmVBMVEX9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSr9bSotXgupAAAAMnRSTlMAAQIEBQgMDRIYGSApMTI8PUdIU1VhYn+Ajo+QnZ6qrLe4wsPNztbf5uft8vP3+vv9/oeJ2P0AAADySURBVEjHvdXHEoJAEEXRFgyYFXNWRMzp/f/HubHcWI5wF/QS5lQN0z0Ps3Q18QyVliXmFAXMKakzp2OLOV1C5nQbMKfniDlp7jOndZk5xdWvR+lq32BOpw5zuvaZ0yNfB/cJz+Xdh6x939XQvGwqaM4WRTTX4wK5R/dhnjkBcwnm4NaVu97kl1u5cr601I83M9d/JYgk8A31RMQ1DyKuexZxg5uIGz0FnD//3JMsrLwWcdVYxDX2mZPJzKx9EnG9q5B7KF/Xh/u0DjsX3AfcdzxnZsUFc1YYM2c2vDNn4YU5ax2ZozmIc9eV83/Km6Zc+AImbdbWCkM0QgAAAABJRU5ErkJggg==",
                    "name": "银证转账",
                    "data": "data-href9=/newjy/dcgyh/dcg_index.html"
                }, {
                    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAyAgMAAAB5bYCsAAAACVBMVEX9bSr////9bSqCqEi7AAAAAnRSTlMAAHaTzTgAAAAgSURBVCjPYwhFBQEMowKoAqtWrVrAgEwOa4HR2KdUAABckyyIiooBDwAAAABJRU5ErkJggg==",
                    "name": "更多",
                    "data": "data-href9=undefined"
                }]
            ]
        }
        var fundDiv = compiled(data);
        $('.trade-nav').html(fundDiv);
    }


    //表单模板 采用递归
    //暂不使用，待后台配置JSON后可使用
    //数据格式  字段意义：show为true则展示，open为true默认打开下拉菜单 con为名称 href为链接
    var listArr = [{
        con: '场内交易',
        show: true,
        children: [{
            con: '新股申购',
            href: '/newjy/xgsg/xgsg_indexnew.html',
            show: true
        }, {
            con: '港股通',
            show: false
        }, {
            con: '沪港通',
            href: '/newjy/ggt/jysy.html',
            show: false
        }, {
            con: '场内基金',
            des: '包含深圳LOF、上海LOF',
            children: [{
                con: '深圳LOF',
                href: '/newjy/cnjj/cnjj_index.html',
                show: true
            }, {
                con: '上海LOF',
                href: '/newjy/lof/lof_index.html',
                show: true
            }],
            open: true,
            show: true
        }]
    }, {
        con: '中信理财',
        show: true,
        children: [{
            open: false,
            con: '现金理财',
            show: true,
            des: '包含天天利财、现金增值、信金保',
            children: [{
                con: '天天理财',
                href: '/newjy/lof/lof_index.html',
                show: true
            }, {
                con: '信金保',
                show: true
            }, {
                con: '现金增值',
                href: '/newjy/lof/lof_index.html',
                show: true
            }]
        }, {
            con: '开放式基金',
            href: '/newjy/kfjj/funindex.htm',
            show: true
        }, {
            con: '其他产品',
            show: true,
            href: '/newjy/otc_new/otc_index.html',
            des: '包含私募、资管、收益凭证等'
        }]
    }, {
        con: '更多',
        open: false,
        show: true,
        children: [{
            con: '股转业务',
            href: '/newjy/gz/gz_index.html',
            show: true
        }, {
            con: '新易融',
            href: '/newjy/xed/index_new.html',
            show: true
        }, {
            con: '快易融',
            href: '/newjy/xed/index_new.html?funderno=2',
            show: true
        }, {
            con: '网络投票',
            href: '/newjy/wltp/wltp_index.html',
            show: true
        }, {
            con: '实时货币基金',
            href: '/newjy/sshbjj/index.html',
            show: true
        }, {
            con: '基金盘后业务',
            href: '/newjy/jjphyw/jjphyw_index.html',
            show: true
        }]
    }];


    function isShow(show) {
        return show ? "" : " style=\"display:none\"";
    }

    function reDes(des) {
        return des ? '<i class="gray-i">' + des + '</i>' : '';
    }

    function reHref(href) {
        return href ? " data-href9=\"" + href + '\"' : ''
    }

    //递归方法
    function createList(json, deep, open, show) {
        var str = '<ul' + ((open == void 0 || open == true) ? "" + isShow(show) + "" : " style=\"display:none\"") + '>';
        json.forEach(function(item) {
            if (deep === 1 && !item.hasOwnProperty('open')) {
                str += '<li class="form-block-area" ' + isShow(item.show) + '><div class="form-title ">' + item.con + reDes(item.des || "") + '</div>';
            } else if (deep === 1 && item.hasOwnProperty('open')) {
                return str += '<li class="form-block-area">' + createList([item].slice(), 2, true, item.show) + '</li>';
            } else {
                if (item.hasOwnProperty('open')) {
                    str += '<li class="accordion' + (item.open ? " arrow-change" : "") + isShow(item.show) + '"><div class="down-arrow">' + item.con + reDes(item.des || "") + '</div>';
                } else {
                    str += '<li' + isShow(item.show) + reHref(item.href || "") + '>' + (deep === 2 ? '<span></span>' : '') + item.con + reDes(item.des || "");
                }
            }
            if (item.children) {
                str += createList(item.children, deep++, item.open, item.show);
            }
            str += '</li>'
        })
        str += '</ul>';
        return str
    }

    /*new share*/
    function newShare() {
        var oSendData = {
            action: 686,
            nPage: 1,
            maxcount: 100,
            ReqlinkType: '1'
        };
        $.getData({
            oSendData: oSendData,
            isToken: false,
            isload: false,
            fnSuccess: function(oData) {
                var aGrid = oData.GRID0;
                var sStr = aGrid.length;
                var n = sStr - 1;
                if (n == 0) {
                    $(".new-share").html('');
                } else {
                    $(".new-share").html('今日有' + n + '支新股可申购');
                }
            },
            oConfig: function(oData) {
                if (oData.ERRORNO < 0) {
                    return;
                }
            }
        })
    }



    function pageEvent() {
        var $attrs = $('li,.skip-to-column');
        tzt.attrUrl($attrs);
        window.OnCheckXjb = function() {
            T.readLocalMesg(['jyloginflag'], function(oLocal) {
                if (oLocal.JYLOGINFLAG <= 1) {
                    T.fn.action10061('/newjy/xjb/xjb_index.html');
                } else {
                    require.async('/newjy/xjb/js/checkRight.js', function(f) {
                        f.getRight();
                    })
                }
            })
            _paq.push(['trackEvent', '交易', '交易_信金保']);
        }

        window.OnCheckXJ = function() {
            T.readLocalMesg(['jyloginflag'], function(oLocal) {
                if (oLocal.JYLOGINFLAG > 1) {
                    var obj = {};
                    var oSend = {
                        'action': 5801
                    };
                    obj["oSendData"] = oSend;
                    obj["oSendData"] = oSend;
                    obj["fnSuccess"] = function(oData) {
                        var productinfo = oData.GRID0;
                        if (productinfo.length > 1) {
                            var product = productinfo[1];
                            var fundCode = product.split('|')[7];
                            var status = product.split('|')[8];
                            if (fundCode == '900016') {
                                //已经登录已经注册现金增值跳转详情页
                                var secondUrl = "http://action:10061/?secondtype=9&&url=/finance/views/setting.html";
                                var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/finance/views/manager.html&&secondtype=99&&secondtext=更多&&secondurl=" + encodeURIComponent(secondUrl);
                                T.fn.action10061({
                                    url: url
                                });
                            } else {
                                T.saveMapMesg({
                                    'userInfo900016': JSON.stringify(oData)
                                });
                                var url = '/finance/views/loading.html';
                                T.fn.action10061({
                                    url: url
                                });
                            }
                        } else {
                            var url = '/finance/views/loading.html';
                            T.saveMapMesg({
                                'userInfo900016': JSON.stringify(oData)
                            });
                            T.fn.action10061({
                                url: url
                            });
                        }
                    }
                    $.getData(obj)

                } else {
                    var url = '/finance/views/loading.html';
                    T.fn.action10061({
                        url: url
                    });
                }
            })
            _paq.push(['trackEvent', '交易', '现金增值']);
        }

        window.OnCheckQx = function() {
            T.readLocalMesg(['ishkaccount', 'ishkszaccount'], function(data) {
                if (data.ISHKACCOUNT == '1' || data.ISHKSZACCOUNT == '1') {
                    T.fn.action10061('/newjy/ggtnew/ggt_index2.0.html');
                } else {
                    require('/c_modules/pop/pop.js');
                    var pop = new(window.pop.window)();
                    pop.cfg.text4ConfrimBtn = '取消';
                    pop.cfg.text4CancelBtn = '免费开通';
                    pop.cfg.text4ConfrimBtn = '开通沪港通交易权限';
                    pop.cfg.text4CancelBtn = '开通深港通交易权限';
                    pop.confirm({
                        hasCloseBtn: 'true',
                        title: '',
                        content: '您好，您还未开通沪港通和深港通交易权限，请选择开通交易权限',
                        handler4ConfrimBtn: function() {
                            pop.destroy();
                            T.fn.action10061("/newzt/zt/ggtkt/ggtkt_index.html");
                        },
                        handler4CancelBtn: function() {
                            pop.destroy();
                            T.fn.action10061("/newzt/zt/sgtkt/sgtkt_index.html");
                        },
                        callBack: function() {
                            $('.window_CancelBtn').css({
                                'backgroundColor': '#f96268',
                                'color': '#FFFFFF',
                                'display': 'block',
                                'width': '100%'
                            });
                            $('.window_ConfrimBtn').css({
                                'backgroundColor': '#f96268',
                                'color': '#FFFFFF',
                                'display': 'block',
                                'width': '100%',
                                'margin-bottom': '15px'
                            });
                            $('.window_boundingBox .window_footer').css({
                                'padding': '0px 5% 1rem'
                            });
                            $(".window_closeBtn").css({
                                'font-size': '14px',
                                'top': '5px',
                                'position': 'absolute',
                                'width': '30px',
                                'display': 'block',
                                'text-align': 'center',
                                'right': '0'
                            })

                        }
                    });

                }
            });
        };
        window.OnGzCheckQx=function(){
            var data ={
                action : 122
            };
            $.getData({oSendData:data,isload:false,fnSuccess:function(oData){
                if(oData.ERRORNO < 0){
                    alert(oData.ERRORMESSAGE);
                    return ;
                }
                var grid0 = oData.GRID0;
                var shaArr=[],szaArr=[],shbArr=[],szbArr=[];
                var shaqxArr='',szaqxArr='',shbqxArr='',szbqxArr='';
                for (var x=1; x < grid0.length; x++){
                    var aItem = grid0[x].split('|');
                    var wtacount = aItem[oData.WTACCOUNTTYPEINDEX].toUpperCase();
                    var acounttype = aItem[oData.HOLDERKINDINDEX];
                    if (wtacount == "SHACCOUNT") {
                        if (acounttype == '0') {
                            shaArr.push(aItem[oData.STOCKACCOUNT]);
                            shaqxArr = aItem[oData.RIGHTSINDEX];
                            console.log(shaqxArr)
                        }else if (acounttype == '4') {
                            shbArr.push(aItem[oData.STOCKACCOUNT]);
                            shbqxArr = aItem[oData.RIGHTSINDEX];
                        }
                    }
                    if(wtacount == "SZACCOUNT"){
                        if (acounttype == '0') {
                            szaArr.push(aItem[oData.STOCKACCOUNT]);
                            szaqxArr=aItem[oData.RIGHTSINDEX];
                            console.log(szaqxArr)
                        }else if (acounttype == '4') {
                            szbArr.push(aItem[oData.STOCKACCOUNT]);
                            szbqxArr=aItem[oData.RIGHTSINDEX];
                        }
                    }
                }
                if (shaArr.length == 0 && shbArr.length == 0&&szaArr.length == 0 && szbArr.length == 0) {
                    alert("您未在上交所和深交易所开通有效的股东账户，请到营业部开户！");
                    return;
                }else if(shaArr.length != 0&&shaqxArr.indexOf('f')>=0&&szaArr.length != 0&&szaqxArr.indexOf('f')>=0){
                    //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
                    var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
                    T.fn.action10090({url:T.fn.action10061({url:url,isExport:true})});
                    return;
                }else if(shaArr.length != 0&&shaqxArr.indexOf('f')>=0&&szaArr.length == 0) {
                    //.fn.action10061('/index.html#!/deal/reverseRepo/index');
                    var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
                    T.fn.action10090({url:T.fn.action10061({url:url,isExport:true})});
                    return;
                }else if(szaArr.length != 0&&szaqxArr.indexOf('f')>=0&&shaArr.length == 0) {
                    //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
                    var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
                    T.fn.action10090({url:T.fn.action10061({url:url,isExport:true})});
                    return;
                }else if(shaArr.length != 0&&shaqxArr.indexOf('f')==-1&&szaArr.length == 0){
                    //1代表沪，2代表深，3代表沪深
                    T.saveMapMesg({'gznhglh':1},function(){});
                    gznhgPOP();
                    return;
                }else if(szaArr.length != 0&&szaqxArr.indexOf('f')==-1&&shaArr.length == 0){
                    T.saveMapMesg({'gznhglh':2},function(){});
                    gznhgPOP();
                    return;
                }else if(shaArr.length != 0&&shaqxArr.indexOf('f')==-1&&szaArr.length != 0&&szaqxArr.indexOf('f')==-1){
                    T.saveMapMesg({'gznhglh':3},function(){});
                    gznhgPOP();
                    return;
                }else if(shaArr.length != 0&&shaqxArr.indexOf('f')>=0&&szaArr.length != 0&&szaqxArr.indexOf('f')==-1){
                    T.saveMapMesg({'gznhglh':2},function(){});
                    gznhgPOP();
                    return;
                }else if(shaArr.length != 0&&shaqxArr.indexOf('f')==-1&&szaArr.length != 0&&szaqxArr.indexOf('f')>=0){
                    T.saveMapMesg({'gznhglh':1},function(){});
                    gznhgPOP();
                    return;
                }else if(shbArr.length != 0&&shbqxArr.indexOf('f')>=0&&szbArr.length != 0&&szbqxArr.indexOf('f')>=0){
                    //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
                    var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
                    T.fn.action10090({url:T.fn.action10061({url:url,isExport:true})});
                    return;
                }else if(shbArr.length != 0&&shbqxArr.indexOf('f')>=0&&szbArr.length == 0) {
                    //T.fn.action10061('/index.html#!/deal/reverseRepo/index');
                    var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
                    T.fn.action10090({url:T.fn.action10061({url:url,isExport:true})});
                    return;
                }else if(szbArr.length != 0&&szbqxArr.indexOf('f')>=0&&shbArr.length == 0) {
                    // T.fn.action10061('/index.html#!/deal/reverseRepo/index');
                    var secondUrl = "http://action:10061/?secondtype=9&&url=/index.html#!/deal/reverseRepo/newchicang";
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/index.html#!/deal/reverseRepo/repoList&&secondtype=99&&secondtext=我的持仓&&secondurl="+encodeURIComponent(secondUrl);
                    T.fn.action10090({url:T.fn.action10061({url:url,isExport:true})});
                    return;
                }else if(shbArr.length != 0&&shbqxArr.indexOf('f')==-1&&szbArr.length == 0){
                    T.saveMapMesg({'gznhglh':1},function(){});
                    gznhgPOP();
                    return;
                }else if(szbArr.length != 0&&szbqxArr.indexOf('f')==-1&&shbArr.length == 0){
                    T.saveMapMesg({'gznhglh':2},function(){});
                    gznhgPOP();
                    return;
                }else if(shbArr.length != 0&&shbqxArr.indexOf('f')==-1&&szbArr.length != 0&&szbqxArr.indexOf('f')==-1){
                    T.saveMapMesg({'gznhglh':3},function(){});
                    gznhgPOP();
                    return;
                }else if(shbArr.length != 0&&shbqxArr.indexOf('f')>=0&&szbArr.length != 0&&szbqxArr.indexOf('f')==-1){
                    T.saveMapMesg({'gznhglh':2},function(){});
                    gznhgPOP();
                    return;
                }else if(shbArr.length != 0&&shbqxArr.indexOf('f')==-1&&szbArr.length != 0&&szbqxArr.indexOf('f')>=0){
                    T.saveMapMesg({'gznhglh':1},function(){});
                    gznhgPOP();
                    return;
                }
            }});

        };
        window.xgsgtc = function () {
            T.readLocalMesg(["softversion"], function(oData) {
                function versionUrl(link) {
                    var url = "http://action:10061/?type=1&&fullscreen=1&&firsttype=10&&firsttext=tzt_navbarbackbg&&url=/" + link + "/xgsg/xgsg_indexnew.html&&secondtype=9";
                    window.location.href = "http://action:10090/?loginType=1&&loginKind=1&&url=" + encodeURIComponent(url);
                }

                if(oData.SOFTVERSION >= '3.00.000'){
                    T.fn.action10061({url:'/newjy/purchase_new_share/html/purchase_index.html'});
                } else {
                    if (oData.SOFTVERSION >= '2.04.001') {
                        versionUrl('newjy')
                    } else {
                        versionUrl('jy')
                    }
                }
            });
        }
        function loginOut() {
            if (confirm('是否退出当前账号?')) {
                T.fn.changeurl('http://action:10402/?');
                checkLogin();
                $('.trade-header-logbg').show();
                $('.fund-info').hide();
            } else {

            }
        }

        function goToFund() {
            T.fn.action10090({
                'jsfuncname': 'goFund()',
                logintype: '1'
            });
        };
        window.goFund = function() {
            T.fn.action10061({
                url: '/fund/fund/my_financial_asset.html'
            });
        };
        $(".j_ggtjy").on("click", function(e) {
            T.fn.action10090({
                'jsfuncname': 'OnCheckQx()',
                logintype: '1'
            });
        });
        $('.j_kzz').on('click',function(){
           T.fn.action10061({url:'/newjy/kzzsg/kzzsg_index.html'});
        });
        $(".j_zqnhg").on("click", function(e) {
            T.fn.action10090({
                'jsfuncname': 'OnGzCheckQx()',
                logintype: '1'
            });
        });

        $('#assetSet').click(function() {//  /investment/product_list/html/product_list_index.html?type=zg
            T.fn.action10090({
                url: T.fn.action10061({//
                    url: '/investment/asset_manage_set/asset_manage_prolists.html',
//                  secondtype: '9', //自定义图片
//                  secondtext: 'tzt_titlesearch.png', //自定义图片名称
//                  secondurl: encodeURIComponent('http://action:10061/?secondtype=9&&url=/investment/search/html/licai_search.html'), //图片跳转地址
                  isExport: true
                })
            });
        });

        $(".j_xjb").off().on("click", throttle(function() {
            OnCheckXjb()
        }, 1000));
        $("#xjzz").off().on("click", OnCheckXJ);
        $('#fundSearch').off().on('click', goToFund);
        $('#login-out').off().on('click', loginOut);
    }

    function gznhgPOP() {
        var pop = new(window.pop.window)();
        pop.cfg.text4ConfrimBtn = '确定';
        pop.cfg.text4CancelBtn = '取消';
        pop.confirm({
            hasCloseBtn: false,
            title: '尚未开通',
            content: '您尚未签署债券质押式逆回购委托协议，是否现在签署？',
            handler4ConfrimBtn: function() {
                pop.destroy();
                T.saveMapMesg({'yessdx':'0','jjbz':'gznhg','jjcode':'','jjdjgsdm':''},function(){
                    masterstroke.CustomerTnformation(function(){
                        T.fn.action10061("/newjy/gznhg/gznhg_kt.html");
                    });
                });
            },
            handler4CancelBtn: function() {

            },
            callBack: function() {
                $('.window_ConfrimBtn').css({
                    'backgroundColor': 'rgb(249, 98, 104)'
                });
            }
        });

    }
    window.GoBackOnLoad = function() {
    	var uaipone = JSON.parse(cNative.getDeviceInfo());
    	var platform= uaipone.platform.toLowerCase();
        T.readLocalMesg(["softversion"],function(oData){ //版本号
	        if(oData.SOFTVERSION >='3.00.005'){
	        	if(cNative.isEmployee() == '1'){//判断员工登录
	        		if(platform == 'ios'){
	        			alert('《证券法》规定证券从业人员在执业期间不得直接或者以化名、借他人名义持有、买卖股票，也不得收受他人赠送的股票。信e投APP不对公司内部员工开放场内股票、债券、基金交易的功能，但您可以正常购买理财板块的理财产品。有关公司员工投资行为管理的要求请参见《中信证券股份有限公司员工证券投资行为管理规定》。');
	        		}else if(platform == 'android'){
	        			cNative.onEmployeeWarn();
	        		}
	        	}
		        
		        checkLogin();
	        }else{
	        	checkLogin();
	        }
	    });
    };

    function init() {
        checkLogin();
        newShare();
        pageEvent();
        new checkVersion('2.01.004', {
            lower: '.j_hgtjy',
            higher: '.j_ggtjy'
        });
        //new showColumn('2.04.005', '#assetSet')
        new showPro($('.fund-info'));
        T.saveMapMesg({'gznhglh':''},function(){});
    }
    init();

})
