(function(window, undefined) {
	"use strict";
	var auiCustomCode = function() {};
	var isShow = false;
	auiCustomCode.prototype = {
		params: {
			title: '',
			content : '',
			buttons: ['取消', '确定']
		},
		create: function(params, callback) {
			var self = this;
			var dialogHtml = '';
			var buttonsHtml = '';
			var headerHtml = params.title ? '<div class="aui-dialog-header">' + params.title + '</div>' : '<div class="aui-dialog-header">' + self.params.title + '</div>';

//			var loginHtml = '	<div class="aui-flex-row aui-margin-b-15">' +
//				'		<ul class="aui-list aui-border-l aui-border-r">' +
//				'			<li class="aui-list-item">' +
//				'				<div class="aui-list-item-inner">' +
//				'					<div class="aui-list-item-label-icon">' +
//				'						<i class="aui-iconfont aui-icon-lock"></i>' +
//				'					</div>' +
//				'					<div class="aui-list-item-input">' +
//				'						<input id="customCode" type="password" class="aui-text-center" placeholder="请输入{0}">' +
//				'					</div>' +
//				'				</div>' +
//				'			</li>' +
//				'		</ul>' +
//				'	</div>';
//				loginHtml = loginHtml.replace('{0}',params.title);
			var bodyHtml = '<div class="aui-dialog-body">' + params.content + '</div>';

			var buttons = params.buttons ? params.buttons : self.params.buttons;
			if(buttons && buttons.length > 0) {
				for(var i = 0; i < buttons.length; i++) {
					buttonsHtml += '<div class="aui-dialog-btn" tapmode button-index="' + i + '">' + buttons[i] + '</div>';
				}
			}
			var footerHtml = '<div class="aui-dialog-footer">' + buttonsHtml + '</div>';
			dialogHtml = '<div class="aui-dialog">' + headerHtml + bodyHtml + footerHtml + '</div>';
			document.body.insertAdjacentHTML('beforeend', dialogHtml);
			// listen buttons click
			var dialogButtons = document.querySelectorAll(".aui-dialog-btn");
			if(dialogButtons && dialogButtons.length > 0) {
				for(var ii = 0; ii < dialogButtons.length; ii++) {
					dialogButtons[ii].onclick = function() {
						var body = document.getElementsByClassName('aui-dialog-body');
						var allInputs = body[0].getElementsByTagName('input');
						var result = {};
           	 			for(var i = 0;i<allInputs.length;i++){
           	 				result['input' + i] = allInputs[i].value;
           	 			}
            			
						
						if(callback) {
							callback({
								buttonIndex: parseInt(this.getAttribute("button-index")) + 1,
								customCode: result,
							});
						};
						// self.close();
						return;
					}
				}
			}
			self.open();
		},
		open: function() {
			if(!document.querySelector(".aui-dialog")) return;
			var self = this;
			document.querySelector(".aui-dialog").style.marginTop = "-" + Math.round(document.querySelector(".aui-dialog").offsetHeight / 2) + "px";
			if(!document.querySelector(".aui-mask")) {
				var maskHtml = '<div class="aui-mask"></div>';
				document.body.insertAdjacentHTML('beforeend', maskHtml);
			}

			setTimeout(function() {
				document.querySelector(".aui-mask").classList.add("aui-mask-in");
				document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
			}, 10)
			document.querySelector(".aui-mask").addEventListener("touchmove", function(e) {
				e.preventDefault();
			})
			document.querySelector(".aui-dialog").addEventListener("touchmove", function(e) {
				e.preventDefault();
			})
			return;
		},
		close: function() {
			var self = this;
			document.querySelector(".aui-mask").classList.remove("aui-mask-in");
			document.querySelector(".aui-dialog").classList.remove("aui-dialog-in");
			document.querySelector(".aui-dialog").classList.add("aui-dialog-out");
			if(document.querySelector(".aui-dialog:not(.aui-dialog-out)")) {
				setTimeout(function() {
					if(document.querySelector(".aui-dialog")) document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
					self.open();
					return true;
				}, 200)
			} else {
				document.querySelector(".aui-mask").classList.add("aui-mask-out");
				document.querySelector(".aui-dialog").addEventListener("webkitTransitionEnd", function() {
					self.remove();
				})
				document.querySelector(".aui-dialog").addEventListener("transitionend", function() {
					self.remove();
				})
			}
		},
		remove: function() {
			if(document.querySelector(".aui-dialog")) document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
			if(document.querySelector(".aui-mask")) {
				document.querySelector(".aui-mask").classList.remove("aui-mask-out");
			}
			return true;
		},
		alert: function(params, callback) {
			var self = this;
			return self.create(params, callback);
		},
		prompt: function(params, callback) {
			var self = this;
			params.input = true;
			return self.create(params, callback);
		}
	};
	window.auiCustomCode = auiCustomCode;
})(window);
