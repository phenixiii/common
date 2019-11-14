/**
 * aui-slideout.js
 * @author zgghc
 * 边侧栏，一般用于显示APP用户信息
 */
(function(window, undefined) {
	"use strict";
	var auiSlideout = function() {};
	var isShow = false;
	auiSlideout.prototype = {
		init: function(params, callback) {
			this.frameBounces = params.frameBounces;
			this.location = params.location;
			this.title = params.title;
			this.buttons = params.buttons;
			this.cancelTitle = params.cancelTitle;
			this.maskDiv;
			this.slideoutDiv;
			var self = this;
			self.open(params, callback);
		},
		open: function(params, callback) {
			var slideoutHtml = '',
				titleHtml = '',
				buttonsHtml = '',
				cancelHtml = '';
			var self = this;
			if(self.slideoutDiv || !self.buttons) return;
			if(!self.maskDiv) {
				self.maskDiv = document.createElement("div");
				self.maskDiv.className = "aui-mask";
				document.body.appendChild(self.maskDiv);
			}
			self.slideoutDiv = document.createElement("div");

			self.slideoutDiv.className = self.location == 'right' ? 'aui-slideout-right c-card-left' : 'aui-slideout-left c-card-right';

			document.body.appendChild(self.slideoutDiv);

			if(self.title) {
				titleHtml = '<div class="aui-flex-row aui-flex-center">';
				titleHtml += '<div class="aui-slideout-title aui-flex-row c-user aui-bg-primary aui-text-white">';
				titleHtml += '<i class="aui-iconfont aui-icon-my aui-font-size-20"></i>';
				titleHtml += '</div>';
				titleHtml += '<div>' + self.title.text + '</div>';
				titleHtml += '</div><br />';
			}

			if(self.buttons && self.buttons.length) {
				buttonsHtml = '<ul class="aui-list aui-list-in aui-margin-10">';
				for(var i = 0; i < self.buttons.length; i++) {
					buttonsHtml += '<li class="aui-list-item aui-slideout-buttons" tapmode>';
					buttonsHtml += '<div class="aui-list-item-label-icon">';
					buttonsHtml += '<i class="aui-iconfont ' + self.buttons[i].icon + '"></i>';
					buttonsHtml += '</div>';

					buttonsHtml += '<div class="aui-list-item-inner aui-list-item-arrow">';
					buttonsHtml += '<div class="aui-list-item-title">' + self.buttons[i].text + '</div>';
					buttonsHtml += '</div>';
					buttonsHtml += '</li>';
				}
				buttonsHtml += '</ul>';
			}
			if(self.cancelTitle) {
				cancelHtml += '<div class="aui-padded-10"><div class="aui-slideoutCancel-btn aui-btn aui-btn-block aui-btn-primary">' + this.cancelTitle + '</div></div>';
			}
			self.slideoutDiv.innerHTML = titleHtml + buttonsHtml + cancelHtml;
			var actionsheetWidth = self.slideoutDiv.offsetWidth;
			self.maskDiv.classList.add("aui-mask-in");
			self.slideoutDiv.style.webkitTransform = self.slideoutDiv.style.transform = "translate(0,0)";
			self.slideoutDiv.style.opacity = 1;
			self.slideoutDiv.addEventListener("touchmove", function(event) {
				event.preventDefault();
			})
			self.maskDiv.addEventListener("touchmove", function(event) {
				event.preventDefault();
			})

			var slideoutTitle = document.querySelector(".aui-slideout-title");
			if(slideoutTitle) {
				slideoutTitle.onclick = function() {
					if(self.title.value) {
						var _value = self.title.value;
					} else {
						var _value = null;
					}
					if(callback) {
						callback({
							buttonValue: _value
						});
					};
					self.close();
					return;
				}
			}

			var slideoutButtons = document.querySelectorAll(".aui-slideout-buttons");
			if(slideoutButtons && slideoutButtons.length > 0) {
				setTimeout(function() {
					self.maskDiv.onclick = function() {
						self.close();
						return;
					};
					for(var ii = 0; ii < slideoutButtons.length; ii++) {
						(function(e) {
							slideoutButtons[e].onclick = function() {
								if(self.buttons[e].value) {
									var _value = self.buttons[e].value;
								} else {
									var _value = null;
								}
								if(callback) {
									callback({
										buttonValue: _value
									});
								};
								self.close();
								return;
							}
						})(ii)
					}
				}, 300)

			}

			document.querySelector(".aui-slideoutCancel-btn").onclick = function() {
				self.close();
				return;
			};
		},
		close: function() {
			var self = this;
			if(self.slideoutDiv) {
				var actionsheetWidth = self.slideoutDiv.offsetWidth;
				self.slideoutDiv.style.webkitTransform = self.slideoutDiv.style.transform = self.location == 'right' ? "translate(" + actionsheetWidth + "px,0)" : "translate(-" + actionsheetWidth + "px,0)";
				self.maskDiv.style.opacity = 0;
				setTimeout(function() {
					if(self.maskDiv) {
						self.maskDiv.parentNode.removeChild(self.maskDiv);
					}
					self.slideoutDiv.parentNode.removeChild(self.slideoutDiv);
					self.maskDiv = self.slideoutDiv = false;
				}, 300)
			}
		}
	};
	window.auiSlideout = auiSlideout;
})(window);

//demo
//var auiSlideout = new auiSlideout();
//
//auiSlideout.init({
//	location: 'left',
//	title: {
//		text: 'admin',
//		value: 'user'
//	},
//	buttons: [{
//		icon: 'aui-icon-paper aui-text-danger',
//		text: '电子小票',
//		value: 'wx' //可选
//	}, {
//		icon: 'aui-icon-paper aui-text-info',
//		text: '其他',
//		value: 'other'
//	}],
//	cancelTitle: '关闭' //可选,当然也可以采用下面的方式使用图标
//	// cancelTitle:'<i class="aui-iconfont aui-icon-close aui-font-size-16"></i>'//可选
//}, function(ret) {
//	if(ret) {
//		alert(ret.buttonValue);
//	}
//});