/**
 * aui-pull-refresh.js
 * @author HC
 */
(function(window) {
	'use strict';
	/**
	 * Extend obj function
	 *
	 * This is an object extender function. It allows us to extend an object
	 * by passing in additional variables and overwriting the defaults.
	 */
	var auiPullToRefresh = function(params, callback) {
		this.extend(this.params, params);
		this._init(callback);
	}
	var pullDownOrUp = 'down';
	var curCallback;
	var touchYDelta;
	var isLoading = false;
	var docElem = window.document.documentElement,
		loadWrapH, win = {
			width: window.innerWidth,
			height: window.innerHeight
		},
		winfactor = 0.2,
		translateVal, isMoved = false,
		firstTouchY, initialScroll;
	auiPullToRefresh.prototype = {
		params: {
			container: document.querySelector('.aui-refresh-content'),
			friction: 2.5,
			triggerDistance: 55,
			allowUp: true,
			callback: false
		},
		_init: function(callback) {
			var self = this;
			curCallback = callback;
			var loadingHtml = '<div class="aui-refresh-load"><div class="aui-refresh-pull-arrow"></div></div>';
			self.params.container.insertAdjacentHTML('afterbegin', loadingHtml);

			var moreHtml = '<div class="aui-refresh-more"><div class="aui-refresh-more-arrow"></div></div>';
			if(self.params.allowUp)
				self.params.container.insertAdjacentHTML('beforeEnd', moreHtml);

			self.params.container.addEventListener('touchstart', function(ev) {
				self.touchStart(ev)
			});
			self.params.container.addEventListener('touchmove', function(ev) {
				self.touchMove(ev)
			});
			self.params.container.addEventListener('touchend', function(ev) {
				self.touchEnd(ev, callback);
			});
		},
		touchStart: function(ev) {

			// this.params.container.classList.remove("refreshing");
			if(isLoading) {
				return;
			}
			isMoved = false;
			this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '0ms';
			touchYDelta = '';
			var touchobj = ev.changedTouches[0];
			// register first touch "y"
			firstTouchY = parseInt(touchobj.clientY);
			initialScroll = this.scrollY();
		},
		touchMove: function(ev) {
			if(isLoading) {
				if(ev.cancelable)
					ev.preventDefault();
				return;
			}
			var self = this;
			var moving = function() {
				var touchobj = ev.changedTouches[0], // reference first touch point for this event
					touchY = parseInt(touchobj.clientY);
				touchYDelta = touchY - firstTouchY;

				//向下滑
				if(touchYDelta > 0) {
					if(self.scrollY() === 0) {
						if(ev.cancelable)
							ev.preventDefault();
					}
					else if(initialScroll > 0 || self.scrollY() > 0) {
						firstTouchY = touchY;
						return;
					}

					translateVal = Math.pow(Math.abs(touchYDelta), 0.85);

					pullDownOrUp = 'down';
					self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0, ' + translateVal + 'px, 0)';

					isMoved = true;

					if(touchYDelta > self.params.triggerDistance) {
						self.params.container.classList.add("aui-refresh-pull-up");
						self.params.container.classList.remove("aui-refresh-pull-down");
					} else {
						self.params.container.classList.add("aui-refresh-pull-down");
						self.params.container.classList.remove("aui-refresh-pull-up");
					}

				} else if(touchYDelta < 0 && self.params.allowUp) {
					if(docElem.scrollHeight < window.innerHeight || docElem.scrollHeight - window.innerHeight == self.scrollY()) {
						if(ev.cancelable)
							ev.preventDefault();
					} else {
						firstTouchY = touchY;
						return;
					}

					translateVal = Math.pow(Math.abs(touchYDelta), 0.85);
					isMoved = true;
					pullDownOrUp = 'up';
					translateVal = -translateVal;
					self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0, ' + translateVal + 'px, 0)';
					
				}
			};
			this.throttle(moving(), 20);
		},
		touchEnd: function(ev, callback) {
			var self = this;

			if(isLoading || !isMoved) {
				isMoved = false;
				return;
			}
			var el = document.querySelector(".aui-refresh-more");
			if(el != null)
				el.style.display = 'block';

			// 根据下拉高度判断是否加载
			if(Math.abs(touchYDelta) >= this.params.triggerDistance) {
				isLoading = true;
				//正在加载中
				if(ev.cancelable)
					ev.preventDefault();
				this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '300ms';

				if(touchYDelta >= 0) {
					this.params.container.style.webkitTransform = this.params.container.style.transform = 'translate3d(0,2.2rem,0)';
					document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '0ms';
					self.params.container.classList.add("aui-refreshing");
				} else if(self.params.allowUp){
					this.params.container.style.webkitTransform = this.params.container.style.transform = 'translate3d(0,-2.2rem,0)';
					document.querySelector(".aui-refresh-more-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-more-arrow").style.transitionDuration = '0ms';
					self.params.container.classList.add("aui-more");
				}

				if(callback) {
					callback({
						status: "success",
						pullDownOrUp: pullDownOrUp
					});
				}
			} else {
				this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '300ms';
				this.params.container.style.webkitTransform = this.params.container.style.transform = 'translate3d(0,0,0)';
				if(callback) {
					self.cancelLoading();
					callback({
						status: "fail",
						pullDownOrUp: pullDownOrUp
					});
				}
			}
			isMoved = false;
			return;

		},
		loading: function() {
			this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '300ms';
			this.params.container.style.webkitTransform = this.params.container.style.transform = 'translate3d(0,2.2rem,0)';
			document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '0ms';
			this.params.container.classList.add("aui-refreshing");
			this.params.container.classList.add("aui-refresh-pull-up");
			if(curCallback) {
				curCallback({
					status: "success",
					pullDownOrUp: pullDownOrUp
				});
			}
		},
		cancelLoading: function() {
			var self = this;
			isLoading = false;
			self.params.container.classList.remove("aui-refreshing");
			document.querySelector(".aui-refresh-pull-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '300ms';
			this.params.container.style.webkitTransitionDuration = this.params.container.style.transitionDuration = '0ms';
			self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0,0,0)';

			self.params.container.classList.remove("aui-refresh-pull-up");
			self.params.container.classList.remove("aui-refresh-pull-down");

			if(self.params.allowUp) {
				self.params.container.classList.remove("aui-more");
				document.querySelector(".aui-refresh-more-arrow").style.webkitTransitionDuration = document.querySelector(".aui-refresh-pull-arrow").style.transitionDuration = '300ms';
				document.querySelector(".aui-refresh-more").style.display = 'none';
			}

			//			self.params.container.classList.remove("aui-refresh-more-up");
			//			self.params.container.classList.remove("aui-refresh-more-down");
			return;
		},
		scrollY: function() {

			return window.pageYOffset || docElem.scrollTop;
		},
		throttle: function(fn, delay) {
			var allowSample = true;
			return function(e) {
				if(allowSample) {
					allowSample = false;
					setTimeout(function() {
						allowSample = true;
					}, delay);
					fn(e);
				}
			};
		},
		winresize: function() {
			var resize = function() {
				win = {
					width: window.innerWidth,
					height: window.innerHeight
				};
			};
			throttle(resize(), 10);
		},
		extend: function(a, b) {
			for(var key in b) {
				if(b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
			return a;
		}
	}
	window.auiPullToRefresh = auiPullToRefresh;

})(window);