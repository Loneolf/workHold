<template>
    <div class="swiper"
         :class="[direction, {'dragging': dragging}]"
         @touchstart="_onTouchStart"
         @mousedown="_onTouchStart"
         @wheel="_onWheel">
        <div class="swiper-wrap"
             v-el:swiper-wrap
             :style="{
                'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
                'transition-duration': transitionDuration + 'ms'
             }"
             @transitionend="_onTransitionEnd"
            >
            <slot></slot>
        </div>
        <div class="swiper-pagination"
             v-show="paginationVisible">
            <span class="swiper-pagination-bullet"
                  :class="{'active': $index+1===currentPage}"
                  v-for="slide in slideEls"
                  @click="paginationClickable && setPage($index+1)"></span>
        </div>
    </div>
</template>
<style lang="less" src="./vue-swiper.less"></style>
<script type="text/babel">
import localService from '../services/localService'
    const VERTICAL = 'vertical';
    const HORIZONTAL = 'horizontal';

    export default {
        props: {
            direction: {
                type: String,
                default: VERTICAL,
                validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
            },
            mousewheelControl: {
                type: Boolean,
                default: true
            },
            performanceMode: {
                type: Boolean,
                default: false
            },
            paginationVisible: {
                type: Boolean,
                default: false
            },
            paginationClickable: {
                type: Boolean,
                default: false
            },
            loop: {
                type: Boolean,
                default: false
            },
            speed: {
                type: Number,
                default: 500
            }
        },
        data() {
            return {
                currentPage: 1,
                lastPage: 1,
                translateX: 0,
                translateY: 0,
                startTranslate: 0,
                delta: 0,
                dragging: false,
                startPos: null,
                transitioning: false,
                slideEls: [],
                translateOffset: 0,
                transitionDuration: 0,
                touchType:true,
            };
        },
        ready() {
            this._onTouchMove = this._onTouchMove.bind(this);
            this._onTouchEnd = this._onTouchEnd.bind(this);
            this.slideEls = [].map.call(this.$els.swiperWrap.children, el => el);
            if (this.loop) {
                this.$nextTick(function () {
                    this._createLoop();
                    this.setPage(this.currentPage, true);
                });
            } else {
                this.setPage(this.currentPage);
            }
            var arr = ['.table-cont','.weituoClas','.chejingClas','.fund_table'];
            var _this = this;
            window.scrollLimitsToWeb = function(){
                window.nativeTopType = false;
            }
			for(let i=0;i<arr.length;i++){
				var dom = $('.swiper-wrap>div')[i]
				if(dom){
					var fund_table = dom.querySelector(arr[i])
                    console.log('fund_table',fund_table)
					if(fund_table != undefined){
						fund_table.addEventListener('scroll',function(ev){
                            console.log('evev123',ev.target.scrollTop);
                            // if(ev.target.scrollTop>300){
                            //     _this.saveScrollTop(i,ev.target.scrollTop)
                            // }
							if(ev.target.scrollTop == 0){
								// console.log('调取原生')
								// CiticsNative.NativeCall('setListDataPosition',[]);
							}else{
                                _this.saveScrollTop(i,ev.target.scrollTop)
                            }
						})
					}
				}
				
			}
        },
        methods: {
            saveScrollTop(i,scrollTop){
                switch(i){
                    case 0:
                    // localService.saveMapMesg({TABLECOUNT0:scrollTop});
                    window.sessionStorage.setItem('TABLECOUNT0',scrollTop)
                    break;
                    case 1:
                    // localService.saveMapMesg({WEITUOCLAS1:scrollTop});
                    window.sessionStorage.setItem('WEITUOCLAS1',scrollTop)
                    break;
                    case 2:
                    // localService.saveMapMesg({CHEJINGCLAS2:scrollTop});
                    window.sessionStorage.setItem('CHEJINGCLAS2',scrollTop)
                    break;
                    case 3:
                    // localService.saveMapMesg({FUNDTABLE3:scrollTop});
                    window.sessionStorage.setItem('FUNDTABLE3',scrollTop)
                    break;
                }
            },
            next() {
                var page = this.currentPage;
                if (page < this.slideEls.length || this.loop) {
                    this.setPage(page + 1);
                } else {
                    this._revert();
                }
            },
            prev() {
                var page = this.currentPage;
                if (page > 1 || this.loop) {
                    this.setPage(page - 1);
                } else {
                    this._revert();
                }
            },
            setPage(page, noAnimation) {
                var self = this;
                this.lastPage = this.currentPage;
                if (page === 0) {
                    this.currentPage = this.slideEls.length;
                } else if (page === this.slideEls.length + 1) {
                    this.currentPage = 1;
                } else {
                    this.currentPage = page;
                }

                if (this.loop) {
                    if (this.delta === 0) {
                        this._setTranslate(self._getTranslateOfPage(this.lastPage));
                    }
                    setTimeout(function () {
                        self._setTranslate(self._getTranslateOfPage(page));
                        if (noAnimation) return;
                        self._onTransitionStart();
                    }, 0);
                } else {
                    this._setTranslate(this._getTranslateOfPage(page));
                    if (noAnimation) return;
                    this._onTransitionStart();
                }
            },
            isHorizontal() {
                return this.direction === HORIZONTAL;
            },
            isVertical() {
                return this.direction === VERTICAL;
            },
            _onTouchStart(e) {
                console.log('e.touches',e.touches)
                this.startPos = this._getTouchPos(e);
                this.delta = 0;
                window.huadongY = e.touches[0].pageY
				console.log(e.touches[0].pageY)
                this.startTranslate = this._getTranslateOfPage(this.currentPage);
                this.startTime = new Date().getTime();
                this.dragging = true;
                this.transitionDuration = 0;
                this.touchType = true
                document.addEventListener('touchmove', this._onTouchMove, false);
                document.addEventListener('touchend', this._onTouchEnd, false);
                document.addEventListener('mousemove', this._onTouchMove, false);
                document.addEventListener('mouseup', this._onTouchEnd, false);
            },
            _onTouchMove(e) {
                console.log('movemove',e.target.scrollTop)
                this.delta = this._getTouchPos(e) - this.startPos;
                var paged = this.currentPage-1;
				// console.log(window.huadongY-e.touches[0].pageY)
				// console.log( this._getTouchPos(e),this.startPos)
				// console.log(this.delta)
				var scrolltops = window.huadongY-e.touches[0].pageY
				if(scrolltops<=-10){
					if(location.href.indexOf('/hq/geguhangqingNew') != -1){
						var arr = ['.table-cont','.weituoClas','.chejingClas','.fund_table']
						var arr2 = ['.noData','.noData','.noData','.noData']
						var dom = $('.swiper-wrap>div')[paged]
						var fund_table = dom.querySelector(arr[paged])
						var fund_table2 = dom.querySelector(arr2[paged])
						if(fund_table != undefined){
							if(fund_table.scrollTop == 0){
								console.log('调取原生1')
								CiticsNative.NativeCall('setListDataPosition',[]);
                                window.nativeTopType = true;
							}
						}else if(fund_table2 != undefined){
							if(fund_table2.scrollTop == 0){
								console.log('调取原生2')
								CiticsNative.NativeCall('setListDataPosition',[]);
                                window.nativeTopType = true;
							}
						}
					}
				}
				// 修改1
                console.log(this.delta);
                if (!this.performanceMode) {
                    // this._setTranslate(this.startTranslate + this.delta);
                    this.$emit('slider-move', this._getTranslate());
                }
                if (this.isVertical() || this.isHorizontal() && Math.abs(this.delta) > 100) {
                    e.preventDefault();
                }
            },
            _onTouchEnd(e) {
                console.log('eeee',e.target.scrollTop)
                this.dragging = false;
                this.transitionDuration = this.speed;
                // var isQuickAction = new Date().getTime() - this.startTime < 1000;
                // if (this.delta < -200 || (isQuickAction && this.delta < -100)) {
                //     this.next();
                // } else if (this.delta > 200 || (isQuickAction && this.delta > 100)) {
                //     this.prev();
                // } else {
                //     this._revert();
                // }
                document.removeEventListener('touchmove', this._onTouchMove);
                document.removeEventListener('touchend', this._onTouchEnd);
                document.removeEventListener('mousemove', this._onTouchMove);
                document.removeEventListener('mouseup', this._onTouchEnd);
            },
            _onWheel(e) {
                if (this.mousewheelControl) {
                    // TODO Support apple magic mouse and trackpad.
                    if (!this.transitioning) {
                        if (e.deltaY > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                    if (this._isPageChanged()) {
                        e.preventDefault();
                    }

                }
            },
            _revert() {
                this.setPage(this.currentPage);
            },
            _getTouchPos(e) {
                var key = this.isHorizontal() ? 'pageX' : 'pageY';
                return e.changedTouches ? e.changedTouches[0][key] : e[key];
            },
            _onTransitionStart() {
                this.transitioning = true;
                this.transitionDuration = this.speed;
                if (this._isPageChanged()) {
                    this.$emit('slide-change-start', this.currentPage);
                } else {
                    this.$emit('slide-revert-start', this.currentPage);
                }
            },
            _onTransitionEnd() {
                this.transitioning = false;
                this.transitionDuration = 0;
                this.delta = 0;
                if (this._isPageChanged()) {
                    this.$emit('slide-change-end', this.currentPage);
                } else {
                    this.$emit('slide-revert-end', this.currentPage);
                }
            },
            _isPageChanged() {
                return this.lastPage !== this.currentPage;
            },
            _setTranslate(value) {
                var translateName = this.isHorizontal() ? 'translateX' : 'translateY';
                this[translateName] = value;
            },
            _getTranslate(){
                var translateName = this.isHorizontal() ? 'translateX' : 'translateY';
                return this[translateName];
            },
            _getTranslateOfPage(page) {
                if (page === 0) return 0;

                var propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight';
                return -[].reduce.call(this.slideEls, function (total, el, i) {
                        return i > page - 2 ? total : total + el[propName];
                    }, 0) + this.translateOffset;
            },
            _createLoop() {
                var propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight';
                var swiperWrapEl = this.$els.swiperWrap;
                var duplicateFirstChild = swiperWrapEl.firstElementChild.cloneNode(true);
                var duplicateLastChild = swiperWrapEl.lastElementChild.cloneNode(true);
                swiperWrapEl.insertBefore(duplicateLastChild, swiperWrapEl.firstElementChild);
                swiperWrapEl.appendChild(duplicateFirstChild);
                this.translateOffset = -duplicateLastChild[propName];
            }
        }
    };
</script>
