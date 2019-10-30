/**
 * aui-actionsheet.js
 * @author 流浪男
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiActionsheet = function() {
    };
    var isShow = false;
    auiActionsheet.prototype = {
        init: function(params,callback){
            this.frameBounces = params.frameBounces;
            this.title = params.title;
            this.buttons = params.buttons;
            this.cancelTitle = params.cancelTitle;
            this.destructiveTitle = params.destructiveTitle;
            this.maskDiv;
            this.actionsheetDiv;
            var self = this;
            self.open(params,callback);
        },
        open: function(params,callback) {
            var titleHtml='',buttonsHtml='',destructiveHtml='',cancelHtml='',btnHtml='';
        	var self = this;
            if(self.actionsheetDiv || (!self.title && !self.buttons && !self.cancelTitle && !self.destructiveTitle))return;
            if(!self.maskDiv){
                self.maskDiv = document.createElement("div");
                self.maskDiv.className = "aui-mask";
                document.body.appendChild(self.maskDiv);
            }
            self.actionsheetDiv = document.createElement("div");
            self.actionsheetDiv.className = "aui-actionsheet";
            document.body.appendChild(self.actionsheetDiv);
            if(self.title){
                titleHtml = '<div class="aui-actionsheet-title aui-border-b aui-font-size-12">'+self.title+'</div>';
            }
            if(self.buttons && self.buttons.length){
                for(var i = 0; i < self.buttons.length;i++){
                    if(i == self.buttons.length-1){
                        buttonsHtml += '<div class="aui-actionsheet-btn-item">'+self.buttons[i]+'</div>';
                    }else{
                        buttonsHtml += '<div class="aui-actionsheet-btn-item aui-border-b">'+self.buttons[i]+'</div>';
                    }
                }
            }
            if(self.destructiveTitle){
                destructiveHtml = '<div class="aui-actionsheet-btn-item aui-border-t aui-text-danger">'+self.destructiveTitle+'</div>';
            }else{
                var destructiveHtml = '';
            }
            if(self.title || (self.buttons && self.buttons.length)){
                btnHtml = '<div class="aui-actionsheet-btn">'+titleHtml+''+buttonsHtml+''+destructiveHtml+'</div>';
            }
            if(self.cancelTitle){
                cancelHtml = '<div class="aui-actionsheet-btn"><div class="aui-actionsheet-btn-item">'+self.cancelTitle+'</div></div>';
            }
            self.actionsheetDiv.insertAdjacentHTML('beforeend', btnHtml+cancelHtml);
            var actionsheetHeight = document.querySelector(".aui-actionsheet").offsetHeight;
            self.maskDiv.classList.add("aui-mask-in");
            self.actionsheetDiv.style.webkitTransform = self.actionsheetDiv.style.transform = "translate3d(0,0,0)";
            self.actionsheetDiv.style.opacity = 1;
            self.actionsheetDiv.addEventListener("touchmove", function(event){
                event.preventDefault();
            })
            self.maskDiv.addEventListener("touchmove", function(event){
                event.preventDefault();
            })
            if(typeof(api) != 'undefined' && typeof(api) == 'object' && self.frameBounces){
                api.setFrameAttr({
                    bounces:false
                });
            }
            var actionsheetButtons = document.querySelectorAll(".aui-actionsheet-btn-item");
            if(actionsheetButtons && actionsheetButtons.length > 0){
                setTimeout(function(){
                    self.maskDiv.onclick = function(){self.close();return;};
                    for(var ii = 0; ii < actionsheetButtons.length; ii++){
                        (function(e){
                            actionsheetButtons[e].onclick = function(){
                                if(callback){
                                    callback({
                                        buttonIndex: e+1,
                                        buttonTitle: this.textContent
                                    });
                                };
                                self.close();
                                return;
                            }
                        })(ii)
                    }
                }, 350)
            }
        },
        close: function(){
            var self = this;
            if(typeof(api) != 'undefined' && typeof(api) == 'object' && self.frameBounces){
                api.setFrameAttr({
                    bounces:true
                });
            }
            if(self.actionsheetDiv){
                var actionsheetHeight = self.actionsheetDiv.offsetHeight;
                self.actionsheetDiv.style.webkitTransform = self.actionsheetDiv.style.transform = "translate3d(0,"+actionsheetHeight+"px,0)";
                self.maskDiv.style.opacity = 0;
                setTimeout(function(){
                    if(self.maskDiv){
                        self.maskDiv.parentNode.removeChild(self.maskDiv);
                    }
                    self.actionsheetDiv.parentNode.removeChild(self.actionsheetDiv);
                    self.actionsheetDiv = self.maskDiv = false;
                }, 300)
            }
        }
    };
	window.auiActionsheet = auiActionsheet;
})(window);
/**
 * aui-collapse.js
 * @author 流浪男
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiCollapse = function(params) {
        this.init(params);
    };
    auiCollapse.prototype = {
        init: function(params,callback){
            var collapseHeader = document.querySelectorAll(".aui-collapse-header");
            if(collapseHeader.length){
                for(var i=0;i<collapseHeader.length;i++){
                    (function(e){
                        collapseHeader[e].onclick = function(){
                            if(collapseHeader[e].nextSibling.nextElementSibling.className.indexOf("aui-collapse-content") > -1){
                                if(collapseHeader[e].nextSibling.nextElementSibling.className.indexOf("aui-show") > -1){
                                    collapseHeader[e].nextSibling.nextElementSibling.classList.remove("aui-show");
                                    collapseHeader[e].classList.remove("aui-active");
                                }else{
                                    if(params.autoHide){
                                        if(document.querySelector(".aui-collapse-header.aui-active")){
                                            document.querySelector(".aui-collapse-header.aui-active").classList.remove("aui-active");
                                        }
                                        if(document.querySelector(".aui-collapse-content.aui-show")){
                                            document.querySelector(".aui-collapse-content.aui-show").classList.remove("aui-show");
                                        }
                                    }

                                    collapseHeader[e].nextSibling.nextElementSibling.classList.toggle("aui-show");
                                    collapseHeader[e].classList.toggle("aui-active");
                                }
                            }
                        }
                    })(i)
                }
            }
        }
    };
	window.auiCollapse = auiCollapse;
})(window);
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

/**
 * aui-dialog.js
 * @author 流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiDialog = function() {
    };
    var isShow = false;
    auiDialog.prototype = {
        params: {
            title:'',
            msg:'',
            buttons: ['取消','确定'],
            input:false
        },
        create: function(params,callback) {
        	var self = this;
            var dialogHtml = '';
            var buttonsHtml = '';
            var headerHtml = params.title ? '<div class="aui-dialog-header">' + params.title + '</div>' : '<div class="aui-dialog-header">' + self.params.title + '</div>';
            if(params.input){
                params.text = params.text ? params.text: '';
                var msgHtml = '<div class="aui-dialog-body"><input type="text" placeholder="'+params.text+'"></div>';
            }else{
                var msgHtml = params.msg ? '<div class="aui-dialog-body aui-content">' + params.msg + '</div>' : '<div class="aui-dialog-body">' + self.params.msg + '</div>';
            }
            var buttons = params.buttons ? params.buttons : self.params.buttons;
            if (buttons && buttons.length > 0) {
                for (var i = 0; i < buttons.length; i++) {
                    buttonsHtml += '<div class="aui-dialog-btn" tapmode button-index="'+i+'">'+buttons[i]+'</div>';
                }
            }
            var footerHtml = '<div class="aui-dialog-footer">'+buttonsHtml+'</div>';
            dialogHtml = '<div class="aui-dialog">'+headerHtml+msgHtml+footerHtml+'</div>';
            document.body.insertAdjacentHTML('beforeend', dialogHtml);
            // listen buttons click
            var dialogButtons = document.querySelectorAll(".aui-dialog-btn");
            if(dialogButtons && dialogButtons.length > 0){
                for(var ii = 0; ii < dialogButtons.length; ii++){
                    dialogButtons[ii].onclick = function(){
                        if(callback){
                            if(params.input){
                                callback({
                                    buttonIndex: parseInt(this.getAttribute("button-index"))+1,
                                    text: document.querySelector("input").value
                                });
                            }else{
                                callback({
                                    buttonIndex: parseInt(this.getAttribute("button-index"))+1
                                });
                            }
                        };
                        self.close();
                        return;
                    }
                }
            }
            self.open();
        },
        open: function(){
            if(!document.querySelector(".aui-dialog"))return;
            var self = this;
            document.querySelector(".aui-dialog").style.marginTop =  "-"+Math.round(document.querySelector(".aui-dialog").offsetHeight/2)+"px";
            if(!document.querySelector(".aui-mask")){
                var maskHtml = '<div class="aui-mask"></div>';
                document.body.insertAdjacentHTML('beforeend', maskHtml);
            }
            // document.querySelector(".aui-dialog").style.display = "block";
            setTimeout(function(){
                document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
                document.querySelector(".aui-mask").classList.add("aui-mask-in");
                document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
            }, 200)
            document.querySelector(".aui-mask").addEventListener("touchmove", function(e){
                e.preventDefault();
            })
            document.querySelector(".aui-dialog").addEventListener("touchmove", function(e){
                e.preventDefault();
            })
            return;
        },
        close: function(){
            var self = this;
            document.querySelector(".aui-mask").classList.remove("aui-mask-in");
            document.querySelector(".aui-dialog").classList.remove("aui-dialog-in");
            document.querySelector(".aui-dialog").classList.add("aui-dialog-out");
            if (document.querySelector(".aui-dialog:not(.aui-dialog-out)")) {
                setTimeout(function(){
                    if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
                    self.open();
                    return true;
                },200)
            }else{
                document.querySelector(".aui-mask").classList.add("aui-mask-out");
                document.querySelector(".aui-dialog").addEventListener("webkitTransitionEnd", function(){
                    self.remove();
                })
                document.querySelector(".aui-dialog").addEventListener("transitionend", function(){
                    self.remove();
                })
            }
        },
        remove: function(){
            if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if(document.querySelector(".aui-mask")){
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        alert: function(params,callback){
        	var self = this;
            return self.create(params,callback);
        },
        prompt:function(params,callback){
            var self = this;
            params.input = true;
            return self.create(params,callback);
        }
    };
	window.auiDialog = auiDialog;
})(window);
(function(window, undefined) {
	"use strict";
	var auiLogin = function() {};
	var isShow = false;
	auiLogin.prototype = {
		params: {
			title: '',
			buttons: ['取消', '确定']
		},
		create: function(params, callback) {
			var self = this;
			var dialogHtml = '';
			var buttonsHtml = '';
			var headerHtml = params.title ? '<div class="aui-dialog-header">' + params.title + '</div>' : '<div class="aui-dialog-header">' + self.params.title + '</div>';

			var loginHtml = '	<div class="aui-flex-row aui-margin-b-15">' +
				'		<ul class="aui-list aui-border-l aui-border-r">' +
				'			<li class="aui-list-item">' +
				'				<div class="aui-list-item-inner">' +
				'					<div class="aui-list-item-label-icon">' +
				'						<i class="aui-iconfont aui-icon-my"></i>' +
				'					</div>' +
				'					<div class="aui-list-item-input">' +
				'						<input id="userName" type="text" placeholder="用户名/邮箱/手机号">' +
				'					</div>' +
				'				</div>' +
				'			</li>' +
				'			<li class="aui-list-item">' +
				'				<div class="aui-list-item-inner">' +
				'					<div class="aui-list-item-label-icon">' +
				'						<i class="aui-iconfont aui-icon-lock"></i>' +
				'					</div>' +
				'					<div class="aui-list-item-input">' +
				'						<input id="password" type="password" placeholder="密码">' +
				'					</div>' +
				'				</div>' +
				'			</li>' +
				'		</ul>' +
				'	</div>';
			var bodyHtml = '<div class="aui-dialog-body">' + loginHtml + '</div>';

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
						if(callback) {
							callback({
								buttonIndex: parseInt(this.getAttribute("button-index")) + 1,
								userName: document.querySelector("#userName").value,
								password: document.querySelector("#password").value,
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
	window.auiLogin = auiLogin;
})(window);

/**
 * aui-picker.js
 * @author hc
 */
(function( window, undefined ) {
    "use strict";
    var auiPicker = function() {
    };
    var isShow = false;
    auiPicker.prototype = {
        init: function(params,callback){
            this.frameBounces = params.frameBounces;
            this.col = params.col;
            this.buttons = params.buttons;
            this.cancelTitle = params.cancelTitle;
            this.okTitle = params.okTitle;
            this.maskDiv;
            this.pickerDiv;
            var self = this;
            self.open(params,callback);
        },
        open: function(params,callback) {
            var pickerHtml='',buttonsHtml = '';
        	var self = this;
            if(self.pickerDiv || !self.buttons)return;
            if(!self.maskDiv){
                self.maskDiv = document.createElement("div");
                self.maskDiv.className = "aui-mask";
                document.body.appendChild(self.maskDiv);
            }
            self.pickerDiv = document.createElement("div");
            self.pickerDiv.className = "aui-sharebox";
            document.body.appendChild(self.pickerDiv);
            
            var title = '<div class="aui-row aui-padded-10 aui-border-b">'+
            				'<div class = "aui-btn close-btn aui-pull-left">取消</div>'+
            				'<div class = "aui-btn ok-btn aui-pull-right aui-btn-info">确认</div>'+
        				'</div>';
            
            if(self.buttons && self.buttons.length){
              buttonsHtml = title + '<div style="height:10rem;overflow-y: scroll;">';
                for(var i = 0; i < self.buttons.length;i++){
                	if(i == 2 || i == 3)
                		buttonsHtml += '<hr class="c-hr">';
                    buttonsHtml += '<div class="aui-text-center aui-padded-10">'+self.buttons[i].text+'</div>';
                }
              buttonsHtml += '</div>';
            }
            
            self.pickerDiv.innerHTML = buttonsHtml;
            var actionsheetHeight = self.pickerDiv.offsetHeight;
            self.maskDiv.classList.add("aui-mask-in");
            self.pickerDiv.style.webkitTransform = self.pickerDiv.style.transform = "translate3d(0,0,0)";
            self.pickerDiv.style.opacity = 1;
            
//          self.maskDiv.addEventListener("touchmove", function(event){
//              event.preventDefault();
//          })
    
            var pickerButtons = document.querySelectorAll(".aui-picker-btn");
            if(pickerButtons && pickerButtons.length > 0){
                setTimeout(function(){
                    self.maskDiv.onclick = function(){self.close();return;};
                    for(var ii = 0; ii < pickerButtons.length; ii++){
                        (function(e){
                            pickerButtons[e].onclick = function(){
                                if(self.buttons[e].value){
                                    var _value = self.buttons[e].value;
                                }else{
                                    var _value = null;
                                }
                                if(callback){
                                    callback({
                                        buttonIndex: e+1,
                                        buttonValue:_value
                                    });
                                };
                                self.close();
                                return;
                            }
                        })(ii)
                    }
                }, 350)

            }
            document.querySelector(".close-btn").onclick = function(){self.close();return;};
        },
        close: function(){
            var self = this;

            if(self.pickerDiv){
                var actionsheetHeight = self.pickerDiv.offsetHeight;
                self.pickerDiv.style.webkitTransform = self.pickerDiv.style.transform = "translate3d(0,"+actionsheetHeight+"px,0)";
                self.maskDiv.style.opacity = 0;
                setTimeout(function(){
                    if(self.maskDiv){
                        self.maskDiv.parentNode.removeChild(self.maskDiv);
                    }
                    self.pickerDiv.parentNode.removeChild(self.pickerDiv);
                    self.maskDiv = self.pickerDiv = false;
                }, 300)
            }
        }
    };
	window.auiPicker = auiPicker;
})(window);
/**
 * aui-popup.js
 * @author 流浪男
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiPopup = function() {
    };
    var isShow = false;
    auiPopup.prototype = {
        init: function(params,callback){
            this.frameBounces = params.frameBounces;
            this.location = params.location;
            this.buttons = params.buttons;
            this.maskDiv;
            this.popupDiv;
            var self = this;
            self.open(params,callback);
        },
        open: function(params,callback) {
            var buttonsHtml='',locationClass = 'aui-popup-top';
        	var self = this;
            if(self.popupDiv){
                self.close();
                return;
            }
            if(!self.maskDiv){
                self.maskDiv = document.createElement("div");
                self.maskDiv.className = "aui-mask";
                document.body.appendChild(self.maskDiv);
            }
            switch (self.location) {
                case "top":
                    locationClass = 'aui-popup-top';
                    break;
                case "top-left":
                    locationClass = 'aui-popup-top-left';
                    break;
                case "top-right":
                    locationClass = 'aui-popup-top-right';
                    break;
                case "bottom":
                    locationClass = 'aui-popup-bottom';
                    break;
                case "bottom-left":
                    locationClass = 'aui-popup-bottom-left';
                    break;
                case "bottom-right":
                    locationClass = 'aui-popup-bottom-right';
                    break;
                default:
                    locationClass = 'aui-popup-top';
                    break;
            }
            self.popupDiv = document.createElement("div");
            self.popupDiv.className = "aui-popup "+locationClass;
            self.popupDiv.innerHTML = '<div class="aui-popup-arrow"></div><div class="aui-popup-content"></div>';
            document.body.appendChild(self.popupDiv);
            if(self.buttons && self.buttons.length){
                buttonsHtml += '<ul class="aui-list aui-list-noborder">';
                for(var i = 0; i < self.buttons.length;i++){
                    buttonsHtml += '<li class="aui-list-item aui-list-item-middle">';
                    buttonsHtml += '<div class="aui-list-item-label-icon"><img src="'+self.buttons[i].image+'"></div>';
                    buttonsHtml += '<div class="aui-list-item-inner">'+self.buttons[i].text+'</div>';
                    buttonsHtml += '</li>';
                }
                buttonsHtml += '</ul>';
            }
            document.querySelector(".aui-popup .aui-popup-content").insertAdjacentHTML('beforeend', buttonsHtml);
            var actionsheetHeight = document.querySelector(".aui-popup").offsetHeight;
            self.maskDiv.classList.add("aui-mask-in");
            self.popupDiv.classList.add("aui-popup-in");
            self.popupDiv.addEventListener("touchmove", function(event){
                event.preventDefault();
            })
            self.maskDiv.addEventListener("touchmove", function(event){
                event.preventDefault();
            })
            if(typeof(api) != 'undefined' && typeof(api) == 'object' && self.frameBounces){
                api.setFrameAttr({
                    bounces:false
                });
            }
            var popupButtons = document.querySelectorAll(".aui-popup .aui-list-item");
            if(popupButtons && popupButtons.length > 0){
                setTimeout(function(){
                    self.maskDiv.onclick = function(){self.close();return;};
                    for(var ii = 0; ii < popupButtons.length; ii++){
                        (function(e){
                            popupButtons[e].onclick = function(){
                                if(self.buttons[e].value){
                                    var _value = self.buttons[e].value;
                                }else{
                                    var _value = null;
                                }
                                if(callback){
                                    callback({
                                        buttonIndex: e+1,
                                        buttonTitle: this.textContent,
                                        buttonValue: _value
                                    });
                                };
                                self.close();
                                return;
                            }
                        })(ii)
                    }
                }, 350)
            }
        },
        close: function(){
            var self = this;
            if(typeof(api) != 'undefined' && typeof(api) == 'object' && self.frameBounces){
                api.setFrameAttr({
                    bounces:true
                });
            }
            if(self.popupDiv){
                var actionsheetHeight = self.popupDiv.offsetHeight;
                self.popupDiv.classList.add("aui-popup-out");
                self.maskDiv.style.opacity = 0;
                setTimeout(function(){
                    if(self.maskDiv){
                        self.maskDiv.parentNode.removeChild(self.maskDiv);
                    }
                    self.popupDiv.parentNode.removeChild(self.popupDiv);
                    self.maskDiv = self.popupDiv = false;
                }, 300)
            }
        }
    };
	window.auiPopup = auiPopup;
})(window);
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
/**
 * aui-scroll.js
 * @author  流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window) {
	'use strict';
	var isToBottom = false,isMoved = false;
	var auiScroll = function (params,callback) {
		this.extend(this.params, params);
		this._init(params,callback);
	}
	auiScroll.prototype = {
		params: {
			listren:false,
            distance: 100
        },
		_init : function(params,callback) {
			var self = this;
			if(self.params.listen){
				document.body.addEventListener("touchmove", function(e){
					self.scroll(callback);
				});
				document.body.addEventListener("touchend", function(e){
					self.scroll(callback);
				});
			}
			window.onscroll = function(){
				self.scroll(callback);
			}
		},
		scroll : function (callback) {
			var self = this;
			var clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
			var scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
			var scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;

			if (scrollHeight-scrollTop-self.params.distance <= window.innerHeight) {
	        	isToBottom = true;
	        	if(isToBottom){
	        		callback({
	        			"scrollTop":scrollTop,
	        			"isToBottom":true
	        		})
	        	}
	        }else{
	        	isToBottom = false;
	        	callback({
        			"scrollTop":scrollTop,
        			"isToBottom":false
        		})
	        }
		},
        extend: function(a, b) {
			for (var key in b) {
			  	if (b.hasOwnProperty(key)) {
			  		a[key] = b[key];
			  	}
		  	}
		  	return a;
		}
	}
	window.auiScroll = auiScroll;
})(window);
(function(window, undefined) {
	var auiSearch = function() {};

	auiSearch.prototype = {
		init: function(params) {
			this.onSearchCompleted = params.onSearchCompleted;
			this.onClearCompleted = params.onClearCompleted;
			var self = this;

			var searchBar = document.querySelector(".aui-searchbar");
			var searchBarInput = document.querySelector(".aui-searchbar input");
			var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
			var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");
			searchBarBtn.style.marginRight = 0;
			if(searchBar) {				
				searchBarInput.oninput = function() {
					if(this.value.length)
						searchBarClearBtn.style.display = 'block';
					else
						searchBarClearBtn.style.display = 'none';
				}
			}
			searchBarClearBtn.onclick = function(callback) {
				this.style.display = 'none';
				searchBarInput.value = '';
				if(self.onClearCompleted && typeof self.onClearCompleted == 'function')
					self.onClearCompleted();
			}
			searchBarBtn.onclick = function(callback) {
				var keywords = searchBarInput.value;
				searchBarInput.blur();
				
				if(self.onSearchCompleted && typeof self.onSearchCompleted == 'function')
					self.onSearchCompleted(keywords);
			}
		}
	};

	window.auiSearch = auiSearch;
})(window);
(function(window, undefined) {
		var auiSearch = function() {};

		auiSearch.prototype = {
			init: function(params) {
				this.onSearchCompleted = params.onSearchCompleted;
				this.onClearCompleted = params.onClearCompleted;
				var self = this;

				var searchBar = document.querySelector(".aui-searchbar");
				var searchBarInput = document.querySelector(".aui-searchbar input");
				var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
				var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");
				if(searchBar) {
					searchBarInput.onclick = function() {
						searchBarBtn.style.marginRight = 0;
					}
					searchBarInput.oninput = function() {
						if(this.value.length) {
							searchBarClearBtn.style.display = 'block';
							searchBarBtn.classList.add("aui-text-warning");
							searchBarBtn.textContent = "搜索";
						} else {
							searchBarClearBtn.style.display = 'none';
							searchBarBtn.classList.remove("aui-text-warning");
							searchBarBtn.textContent = "取消";
							if(self.onClearCompleted && typeof self.onClearCompleted == 'function')
								self.onClearCompleted();
						}
					}
				}
				searchBarClearBtn.onclick = function(callback) {
					this.style.display = 'none';
					searchBarInput.value = '';
					searchBarBtn.classList.remove("aui-text-warning");
					searchBarBtn.textContent = "取消";
					if(self.onClearCompleted && typeof self.onClearCompleted == 'function')
						self.onClearCompleted();
				}
				searchBarBtn.onclick = function(callback) {
					var keywords = searchBarInput.value;
					if(keywords.length) {
						searchBarInput.blur();
						if(self.onSearchCompleted && typeof self.onSearchCompleted == 'function')
							self.onSearchCompleted(keywords);
					} else {
						this.style.marginRight = "-" + this.offsetWidth + "px";
						searchBarInput.value = '';
						searchBarInput.blur();
					}
				}
			}
		};

		window.auiSearch = auiSearch;
	})(window);
/**
 * aui-slide.js 轮播组件
 * @author 流浪男
 * http://www.auicss.com
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window) {
	"use strict";

	var translateVal,
		firstTouchX,
		firstTouchY,
		touchXDelta,
		handleTranslateVal;
	var touchStartTime; //开始触摸事件
	var offsetX,
		offsetY,
		isScrolling;
	// CLASS 组装
	var	CLASS_SLIDER_NODE = "aui-slide-node",
		CLASS_SLIDE_PAGE_WRAP = "aui-slide-page-wrap",
		CLASS_SLIDE_PAGE = "aui-slide-page",
		CLASS_SLIDE_PAGE_ACTIVE = "aui-slide-page-active",
		CLASS_SLIDE_PAGE_DOT = "aui-slide-page-dot",
		CLASS_SLIDE_PAGE_LINE = "aui-slide-page-line";

	var __SLIDER_NODE = "."+CLASS_SLIDER_NODE,
		__SLIDE_PAGE_WRAP = "."+CLASS_SLIDE_PAGE_WRAP,
		__SLIDE_PAGE = "."+CLASS_SLIDE_PAGE,
		__SLIDE_PAGE_ACTIVE = "."+CLASS_SLIDE_PAGE_ACTIVE;

	auiSlide.prototype.options = {
		container:'',
		width:'auto',
		height:'auto',
		speed: 300, //滑动速速
		autoPlay: 0, //自动播放
		pageShow: true, //是否显示分页器
		pageStyle: 'dot',
		dotPosition: 'center',
		friction:1, //阻力
		loop:true,
		currentPage:false,
		PageCount:false
	};
	auiSlide.prototype._init = function(options) {
		extend(this.options, options);
		if(!this.options.container){
			return;
		}
		this.index = 0; //索引值
		this.continuous = true;//用于判断长度为2时的特殊处理
		this.container = this.options.container;
		// console.log(this.options.loop);
		this.loop = this.options.loop;
		this.speed = this.options.speed;
		this.container.style.position = "relative";
		this.container.style.width = this.options.width+"px";
		this.container.style.height = this.options.height+"px";

		var element = this.container.children[0];
		this.slideWrap = element;
		this.slideNodeList = this.slideWrap.querySelectorAll(__SLIDER_NODE);
		if(!element || !this.slideNodeList){
			return;
		}
		// this.options.pageCount(this.slideNodeList.length);
		this.slideWrapWidth = this.slideWrap.offsetWidth;
		this.slideNodeListLength = this.slideNodeList.length;

		if (this.slideNodeListLength == 2) { //当长度为2时作特殊处理
			element.appendChild(this.slideWrap.children[0].cloneNode(true));
			element.appendChild(this.slideWrap.children[1].cloneNode(true));
			this.slideWrap = element;
			this.slideNodeList = this.slideWrap.querySelectorAll(__SLIDER_NODE);
	    	this.slideNodeListLength = this.slideNodeList.length;
	    	this.continuous = false;
	    }
		for (var i = 0; i < this.slideNodeListLength; i++) {
			this.slideNodeList[i] && (this.slideNodeList[i].style.webkitTransform = this.slideNodeList[i].style.transform = "translate3d("+(this.slideWrapWidth*i)+"px,0,0)");
		}

		if(this.slideNodeListLength > 1) {
			if(this.options.pageShow){
				this.createPagination(0);
				this.setPageDotPosition();
			}
			if(this.options.autoPlay > 500 && this.loop){
				this.autoPlay(0);
			}
			this.slideWrap.addEventListener('touchstart', this.touchStart.bind(this), false);
			this.slideWrap.addEventListener('touchmove', this.touchMove.bind(this), false);
			this.slideWrap.addEventListener('touchend', this.touchEnd.bind(this), false);
		}
	};
	// 当分页器为圆点时位置设置
	auiSlide.prototype.setPageDotPosition = function(){
		var self = this;
		var pageDotPosition = self.options.dotPosition;
		this.container.querySelector(__SLIDE_PAGE_WRAP).style.textAlign = pageDotPosition;
	};
	// 自动播放
	auiSlide.prototype.autoPlay = function (index) {
		var self = this;
		setInterval(function(){
			self.slideTo(self.getCircle(self.index-1), -self.slideWrapWidth, 0);
	        self.slideTo(self.getCircle(self.index+2), self.slideWrapWidth, 0);
	        self.slideTo(self.index, -self.slideWrapWidth, self.options.speed);
	        self.slideTo(self.getCircle(self.index+1), 0, self.options.speed);
	        self.index = self.getCircle(self.index+1);
	        self.setPaginationActive(self.index);
		}, self.options.autoPlay)
	};
	// 设置当前分页
	auiSlide.prototype.setPaginationActive = function(index){
		var self = this;
		if(self.options.currentPage){
			self.options.currentPage(index);
		}
		if(!this.container.querySelector(__SLIDE_PAGE_WRAP)){
			return;
		}
		var pageList = this.container.querySelectorAll(__SLIDE_PAGE);
		if(this.container.querySelector(__SLIDE_PAGE+__SLIDE_PAGE_ACTIVE)){
			this.container.querySelector(__SLIDE_PAGE+__SLIDE_PAGE_ACTIVE).classList.remove(CLASS_SLIDE_PAGE_ACTIVE);
		}
		if(!this.continuous){
			if(this.index == 3){
				pageList[1].classList.add(CLASS_SLIDE_PAGE_ACTIVE);
			}else if(this.index==2){
				pageList[0].classList.add(CLASS_SLIDE_PAGE_ACTIVE);
			}else{
				pageList[this.index].classList.add(CLASS_SLIDE_PAGE_ACTIVE);
			}
		}else{
			pageList[this.index].classList.add(CLASS_SLIDE_PAGE_ACTIVE);
		}

	};
	// 创建分页器
	auiSlide.prototype.createPagination = function(index){
		var self = this;
		var pageWrap = this.container.querySelector(__SLIDE_PAGE_WRAP);
		if(!pageWrap){
			return;
		}
		pageWrap.innerHTML = '';
		var pageShowHtml = '';
		switch (self.options.pageStyle) {
			case "dot":// 原点
						if (!this.continuous) {
							for (var i = 0; i < 2; i++) {
								pageShowHtml += '<span class="'+CLASS_SLIDE_PAGE+' '+CLASS_SLIDE_PAGE_DOT+'"></span>';
							}
						}else{
							for (var i = 0; i < this.slideNodeListLength; i++) {
								pageShowHtml += '<span class="'+CLASS_SLIDE_PAGE+' '+CLASS_SLIDE_PAGE_DOT+'"></span>';
							}
						}
						pageWrap.innerHTML = pageShowHtml;
						self.setPaginationActive(0);
				break;
			case "line":// 线条
						if (!this.continuous) {
							for (var i = 0; i < 2; i++) {
								pageShowHtml += '<span class="'+CLASS_SLIDE_PAGE+' '+CLASS_SLIDE_PAGE_LINE+'" style="width:50%"></span>';
							}
						}else{
							for (var i = 0; i < this.slideNodeListLength; i++) {
								pageShowHtml += '<span class="'+CLASS_SLIDE_PAGE+' '+CLASS_SLIDE_PAGE_LINE+'" style="width:'+(100/this.slideNodeListLength)+'%"></span>';
							}
						}
						pageWrap.innerHTML = pageShowHtml;
						self.setPaginationActive(0);
				break;
		}
	};
	// 总页数
	auiSlide.prototype.pageCount = function() {
		var self = this;
		return self.slideNodeList.length;
	};
	auiSlide.prototype.touchStart = function(event) {
		touchStartTime = new Date() * 1;
		firstTouchX = parseInt(event.changedTouches[0].pageX);
		firstTouchY = parseInt(event.changedTouches[0].pageY);
		isScrolling = undefined;
	};
	auiSlide.prototype.touchMove = function(event) {
		var touchMoveObj = event.changedTouches[0],
				touchX = parseInt(touchMoveObj.pageX);
			touchXDelta = touchX - firstTouchX;
			handleTranslateVal = touchXDelta/this.options.friction;
		//  滑动位移
		offsetX = parseInt(touchMoveObj.pageX) - firstTouchX;
        offsetY = parseInt(touchMoveObj.pageY) - firstTouchY;
        var direction = this.getDirection(offsetX,offsetY);
        if ( typeof isScrolling == 'undefined') {
			isScrolling = !!( isScrolling || Math.abs(offsetX) < Math.abs(offsetY) );
		}
		if(!isScrolling){
			event.preventDefault();
			if(!this.loop){ //不循环
				if(!this.continuous && this.index==1 && direction=='left'){
					return;
				}
				if(!this.continuous && this.index==0 && direction=='right'){
					return;
				}
				if(this.index == this.slideNodeList.length-1){
					if(handleTranslateVal <= 0){
						return;
					}
					this.setTranslate(this.getCircle(this.index-1), handleTranslateVal - this.slideWrapWidth, 0);
				}else if(this.index == 0){
					if(handleTranslateVal >= 0){
						return;
					}
					this.setTranslate(this.getCircle(this.index+1), this.slideWrapWidth, 0);
				}
			}

			this.setTranslate(this.getCircle(this.index-1), handleTranslateVal - this.slideWrapWidth, 0);
			this.setTranslate(this.index, handleTranslateVal , 0);
			this.setTranslate(this.getCircle(this.index+1), handleTranslateVal + this.slideWrapWidth, 0);

		}
	};
	auiSlide.prototype.touchEnd = function(event) {
		var touchEndObj = event.changedTouches[0];
		var touchEndX = parseInt(touchEndObj.pageX) - firstTouchX;
        var touchEndY = parseInt(touchEndObj.pageY) - firstTouchY;
		var touchEndxy = {
				x: touchEndObj.pageX || 0,
				y: touchEndObj.pageY || 0
			};
		var moveDirection = this.getDirection(touchEndX,touchEndY); //滑动方向
		var boundary = this.slideWrapWidth/4;
		var duration = (new Date() * 1) - touchStartTime;
		var isValid = Number(duration) < 250 && Math.abs(offsetX) > 20 || Math.abs(offsetX) > boundary;
		if (isScrolling) {
			return;
		}
        if(isValid){
			if(offsetX < 0){
				if(!this.loop && this.index == this.slideNodeList.length-1){
					return;
				}

				if(!this.loop && !this.continuous && this.index==1){
					return;
				}

	        	if(offsetX < -boundary && moveDirection == 'left'){
	        		// left
					this.slideTo(this.getCircle(this.index-1), -this.slideWrapWidth, 0);
		            this.slideTo(this.getCircle(this.index+2), this.slideWrapWidth, 0);
		            this.slideTo(this.index, -this.slideWrapWidth, this.speed);
		            this.slideTo(this.getCircle(this.index+1), 0, this.speed);
		            this.index = this.getCircle(this.index+1);
				}else{
					// this.slideTo(this.getCircle(this.index-1), -this.slideWrapWidth, this.speed);
		            this.slideTo(this.index, 0, this.speed);
		            this.slideTo(this.getCircle(this.index+1), this.slideWrapWidth, this.speed);
				}
	        }else if(offsetX > 0){
	        	if(!this.loop && this.index == 0){
					return;
				}
				if(!this.loop && !this.continuous && this.index==0){
					return;
				}
	        	if(offsetX > boundary && moveDirection == 'right'){
	        		// right
		        	this.slideTo(this.getCircle(this.index+1), this.slideWrapWidth, 0);
		            this.slideTo(this.getCircle(this.index-2), -this.slideWrapWidth, 0);
		            this.slideTo(this.index, this.slideWrapWidth, this.speed);
		            this.slideTo(this.getCircle(this.index-1), 0, this.speed);
		            this.index = this.getCircle(this.index-1);
	        	}else{
	        		// this.slideTo(this.getCircle(this.index-1), -this.slideWrapWidth, this.speed);
		            this.slideTo(this.index, 0, this.speed);
		            this.slideTo(this.getCircle(this.index+1), this.slideWrapWidth, this.speed);
	        	}
	        }
        }else{
        	if(offsetX){
        		this.slideTo(this.getCircle(this.index-1), -this.slideWrapWidth, this.speed);
	            this.slideTo(this.index, 0, this.speed);
	            this.slideTo(this.getCircle(this.index+1), this.slideWrapWidth, this.speed);
        	}

        }
        this.setPaginationActive(this.index);
	};
	auiSlide.prototype.setTranslate = function (index,dist,speed){
		if(this.slideNodeList[index]){
			this.slideNodeList[index].style.webkitTransitionDuration =
	    	this.slideNodeList[index].style.transitionDuration = speed + 'ms';
	    	this.slideNodeList[index].style.webkitTransform =
	    	this.slideNodeList[index].style.transform = "translate3d("+dist+"px,0,0)";
		}
	};
	auiSlide.prototype.slideTo = function (index, dist, speed) {
		this.setTranslate(index, dist, speed);
		// index = dist;
	};
	auiSlide.prototype.getCircle = function (index) {
	    return (this.slideNodeListLength + (index % this.slideNodeListLength)) % this.slideNodeListLength;
	};
	auiSlide.prototype.getDirection = function(x, y) {
		if (x === y) { return '';}
		if (Math.abs(x) >= Math.abs(y)) {
            return x > 0 ? 'right' : 'left';
        } else {
           	return y > 0 ? 'down' : 'up';
        }
	}
	function extend (a, b) {
		for (var key in b) {
		  	if (b.hasOwnProperty(key)) {
		  		a[key] = b[key];
		  	}
	  	}
	  	return a;
	}
	function auiSlide (options) {
		this._init(options);
	}
	window.auiSlide = auiSlide;
})(window);
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
/**
 * aui-tab.js
 * @author 流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiTab = function(params,callback) {
    	this.extend(this.params, params);
        this._init(callback);
    };
    var tabItems;
    auiTab.prototype = {
        params: {
            element: false,
            index: 1, //默认选中
            repeatClick: false //是否允许重复点击
        },
        _init: function(callback) {
        	var self = this;
        	if(!self.params.element || self.params.element.nodeType!=1){
        		return;
        	}
        	tabItems = self.params.element.children;
        	if(tabItems){
        		self.setActive();
        		for(var i=0; i<tabItems.length; i++){
        			tabItems[i].setAttribute("tapmode","");
        			tabItems[i].setAttribute("data-item-order",i);
        			tabItems[i].onclick = function(e){
                        if(!self.params.repeatClick){
                            if(this.className.indexOf("aui-active") > -1)return;
                        }
                        if(this.parentNode.querySelector(".aui-active"))this.parentNode.querySelector(".aui-active").classList.remove("aui-active");
                        this.classList.add("aui-active");
        				if(callback){
                            callback({
                                index: parseInt(this.getAttribute("data-item-order"))+1,
                                dom:this
                            })
                        };

        			}
        		}
        	}
        },
        setRepeat:function(value){
            var self = this;
            self.params.repeatClick = value ? value : false;
        },
        setActive: function(index){
        	var self = this;
        	index = index ? index : self.params.index;
        	var _tab = tabItems[index-1];
        	if(_tab.parentNode.querySelector(".aui-active"))_tab.parentNode.querySelector(".aui-active").classList.remove("aui-active");
        	_tab.classList.add("aui-active");
        },
        extend: function(a, b) {
			for (var key in b) {
			  	if (b.hasOwnProperty(key)) {
			  		a[key] = b[key];
			  	}
		  	}
		  	return a;
		}
    };
	window.auiTab = auiTab;
})(window);
/**
 * aui-popup.js
 * @author 流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function( window, undefined ) {
    "use strict";
    var auiToast = function() {
        // this.create();
    };
    var isShow = false;
    auiToast.prototype = {
        create: function(params,callback) {
            var self = this;
            var toastHtml = '';
            switch (params.type) {
                case "success":
                    var iconHtml = '<i class="aui-iconfont aui-icon-correct"></i>';
                    break;
                case "fail":
                    var iconHtml = '<i class="aui-iconfont aui-icon-close"></i>';
                    break;
                case "custom":
                    var iconHtml = params.html;
                    break;
                case "loading":
                    var iconHtml = '<div class="aui-toast-loading"></div>';
                    break;
            }

            var titleHtml = params.title ? '<div class="aui-toast-content">'+params.title+'</div>' : '';
            //增加显示时，不可点击
            var maskHtml = '<div class="aui-mask aui-mask-in toast-mask"></div>';
            toastHtml = '<div class="aui-toast">'+iconHtml+titleHtml+'</div>' + maskHtml;
            if(document.querySelector(".aui-toast"))return;
            document.body.insertAdjacentHTML('beforeend', toastHtml);
            var duration = params.duration ? params.duration : "2000";
            self.show();
            if(params.type == 'loading'){
                if(callback){
                    callback({
                        status: "success"
                    });
                };
            }else{
                setTimeout(function(){
                    self.hide();
                }, duration)
            }
        },
        show: function(){
            var self = this;
            document.querySelector(".aui-toast").style.display = "block";
            document.querySelector(".aui-toast").style.marginTop =  "-"+Math.round(document.querySelector(".aui-toast").offsetHeight/2)+"px";
            if(document.querySelector(".aui-toast"))return;
        },
        hide: function(){
            var self = this;
            if(document.querySelector(".aui-toast")){
                document.querySelector(".aui-toast").parentNode.removeChild(document.querySelector(".aui-toast"));
            }
            
            if(document.querySelector(".toast-mask")){
                document.querySelector(".toast-mask").parentNode.removeChild(document.querySelector(".toast-mask"));
            }
        },
        remove: function(){
            if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if(document.querySelector(".aui-mask")){
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        success: function(params,callback){
            var self = this;
            params.type = "success";
            return self.create(params,callback);
        },
        fail: function(params,callback){
            var self = this;
            params.type = "fail";
            return self.create(params,callback);
        },
        custom:function(params,callback){
            var self = this;
            params.type = "custom";
            return self.create(params,callback);
        },
        loading:function(params,callback){
            var self = this;
            params.type = "loading";
            return self.create(params,callback);
        },
        changeTitle : function(params){
        	var el = document.querySelector(".aui-toast-content");
        	if(el)
        		el.innerText = params.title;
        }
    };
    window.auiToast = auiToast;
})(window);

//datePicker日期控件 v1.0

//var calendar = new datePicker();
//calendar.init({
//    'trigger': '#demo1', /*选择器，触发弹出插件*/
//    'type': 'date',/*date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择*/
//    'minDate':'1900-1-1',/*最小日期*/
//    'maxDate':new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),/*最大日期*/
//    'onSubmit':function(){/*确认时触发事件*/
//        var theSelectData=calendar.value;
//    },
//    'onClose':function(){/*取消时触发事件*/
//    }
//});

window.datePicker = (function() {
    var MobileCalendar = function() {
        this.gearDate;
        this.minY = 1900;
        this.minM = 1;
        this.minD = 1;
        this.maxY = 2099;
        this.maxM = 12;
        this.maxD = 31;
        this.value="";
    };
    
    var cssHtm='.gearYM,.gearDate,.gearDatetime,.gearTime{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;background-color:rgba(0,0,0,0.2);display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:9900;overflow:hidden;-webkit-animation-fill-mode:both;animation-fill-mode:both}.date_ctrl{vertical-align:middle;background-color:#d5d8df;color:#000;margin:0;height:auto;width:100%;position:absolute;left:0;bottom:0;z-index:9901;overflow:hidden;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.slideInUp{animation:slideInUp .3s ease;-webkit-animation:slideInUp .3s ease;}@-webkit-keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.ym_roll,.date_roll,.datetime_roll,.time_roll{display:-webkit-box;width:100%;height:auto;overflow:hidden;font-weight:bold;background-color:transparent;-webkit-mask:-webkit-gradient(linear,0% 50%,0% 100%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(top,#debb47 50%,rgba(36,142,36,0))}.ym_roll>div,.date_roll>div,.datetime_roll>div,.time_roll>div{font-size:2.3em;height:6em;float:left;background-color:transparent;position:relative;overflow:hidden;-webkit-box-flex:4}.ym_roll>div .gear,.date_roll>div .gear,.datetime_roll>div .gear,.time_roll>div .gear{width:100%;float:left;position:absolute;z-index:9902;margin-top:-6em}.date_roll_mask{-webkit-mask:-webkit-gradient(linear,0% 40%,0% 0%,from(#debb47),to(rgba(36,142,36,0)));-webkit-mask:-webkit-linear-gradient(bottom,#debb47 50%,rgba(36,142,36,0));padding:0 0 3em 0}.date_roll>div:nth-child(2){-webkit-box-flex:2}.date_roll>div:nth-child(1),.datetime_roll>div:nth-child(1){-webkit-box-flex:4}.datetime_roll>div:first-child{-webkit-box-flex:6}.datetime_roll>div:last-child{-webkit-box-flex:6}.date_grid{position:relative;top:2em;width:100%;height:2em;margin:0;box-sizing:border-box;z-index:0;border-top:1px solid #abaeb5;border-bottom:1px solid #abaeb5}.date_grid>div{color:#000;position:absolute;right:0;top:0;font-size:.8em;line-height:2.5em}.date_roll>div:nth-child(3) .date_grid>div{left:42%}.datetime_roll>div .date_grid>div{right:0}.datetime_roll>div:first-child .date_grid>div{left:auto;right:0%}.datetime_roll>div:last-child .date_grid>div{left:50%}.time_roll>div:nth-child(1) .date_grid>div{right:1em}.ym_roll>div:nth-child(1) .date_grid>div{right:.1em}.ym_roll>div .date_grid>div,.time_roll>div .date_grid>div{right:5em}.date_btn{color:#0575f2;font-size:1.6em;font-weight:bold;line-height:1em;text-align:center;padding:.8em 1em}.date_btn_box:before,.date_btn_box:after{content:"";position:absolute;height:1px;width:100%;display:block;background-color:#96979b;z-index:15;-webkit-transform:scaleY(0.33);transform:scaleY(0.33)}.date_btn_box{display:-webkit-box;-webkit-box-pack:justify;-webkit-box-align:stretch;background-color:#f1f2f4;position:relative}.date_btn_box:before{left:0;top:0;-webkit-transform-origin:50% 20%;transform-origin:50% 20%}.date_btn_box:after{left:0;bottom:0;-webkit-transform-origin:50% 70%;transform-origin:50% 70%}.date_roll>div:nth-child(1) .gear{text-indent:20%}.date_roll>div:nth-child(2) .gear{text-indent:-20%}.date_roll>div:nth-child(3) .gear{text-indent:-55%}.datetime_roll>div .gear{width:100%;text-indent:-25%}.datetime_roll>div:first-child .gear{text-indent:-10%}.datetime_roll>div:last-child .gear{text-indent:-50%}.ym_roll>div .gear,.time_roll>div .gear{width:100%;text-indent:-70%}.ym_roll>div:nth-child(1) .gear,.time_roll>div:nth-child(1) .gear{width:100%;text-indent:10%}.tooth{height:2em;line-height:2em;text-align:center}';
    var cssEle = document.createElement("style");
	cssEle.type = "text/css";
	cssEle.appendChild(document.createTextNode(cssHtm));
	document.getElementsByTagName("head")[0].appendChild(cssEle);
	
    MobileCalendar.prototype = {
        init: function(params) {
            this.type = params.type;
            this.trigger = document.querySelector(params.trigger);
            if (this.trigger.getAttribute("data-lcalendar") != null) {
                var arr = this.trigger.getAttribute("data-lcalendar").split(',');
                var minArr = arr[0].split('-');
                this.minY = ~~minArr[0];
                this.minM = ~~minArr[1];
                this.minD = ~~minArr[2];
                var maxArr = arr[1].split('-');
                this.maxY = ~~maxArr[0];
                this.maxM = ~~maxArr[1];
                this.maxD = ~~maxArr[2];
            };
            if (params.minDate) {
                var minArr = params.minDate.split('-');
                this.minY = ~~minArr[0];
                this.minM = ~~minArr[1];
                this.minD = ~~minArr[2];
            };
            if (params.maxDate) {
                var maxArr = params.maxDate.split('-');
                this.maxY = ~~maxArr[0];
                this.maxM = ~~maxArr[1];
                this.maxD = ~~maxArr[2];
            };
            this.onClose= params.onClose;
            this.onSubmit= params.onSubmit;
            this.onChange= params.onChange;
            this.bindEvent(this.type);
        },
        bindEvent: function(type) {
            var _self = this;
            var isTouched = false , isMoved = false;
            var pree;
            //呼出日期插件
            function popupDate(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="date_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                    '<div class="date_grid">' +
                    '<div>日</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                dateCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileDate);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeMobileCalendar);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                var date_dd = _self.gearDate.querySelector(".date_dd");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_dd.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_dd.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                date_dd.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeMobileCalendar);
                lcalendar_finish.addEventListener('click', finishMobileDate);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_mm.addEventListener('mousedown', gearTouchStart);
                date_dd.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_mm.addEventListener('mousemove', gearTouchMove);
                date_dd.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                date_mm.addEventListener('mouseup', gearTouchEnd);
                date_dd.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化年月日插件默认值
            function dateCtrlInit() {
                var date = new Date();
                var dateArr = {
                    yy: date.getYear(),
                    mm: date.getMonth(),
                    dd: date.getDate() - 1
                };
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                    dateArr.dd = rs[2].replace(/-/g, "") - 1;
                } else {
                    dateArr.yy = dateArr.yy + 1900 - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                _self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
                setDateGearTooth();
            }
            //呼出年月插件
            function popupYM(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="ym_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                ymCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileYM);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeMobileCalendar);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeMobileCalendar);
                lcalendar_finish.addEventListener('click', finishMobileYM);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_mm.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_mm.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                date_mm.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化年月插件默认值
            function ymCtrlInit() {
                var date = new Date();
                var dateArr = {
                    yy: date.getYear(),
                    mm: date.getMonth()
                };
                if (/^\d{4}-\d{1,2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                } else {
                    dateArr.yy = dateArr.yy + 1900 - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                setDateGearTooth();
            }
            //呼出日期+时间插件
            function popupDateTime(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDatetime";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="datetime_roll">' +
                    '<div>' +
                    '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                    '<div class="date_grid">' +
                    '<div>年</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>月</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                    '<div class="date_grid">' +
                    '<div>日</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                    '<div class="date_grid">' +
                    '<div>时</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>分</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' + //date_roll
                    '</div>' + //date_roll_mask
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                dateTimeCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileDateTime);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeMobileCalendar);
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var date_mm = _self.gearDate.querySelector(".date_mm");
                var date_dd = _self.gearDate.querySelector(".date_dd");
                var time_hh = _self.gearDate.querySelector(".time_hh");
                var time_mm = _self.gearDate.querySelector(".time_mm");
                date_yy.addEventListener('touchstart', gearTouchStart);
                date_mm.addEventListener('touchstart', gearTouchStart);
                date_dd.addEventListener('touchstart', gearTouchStart);
                time_hh.addEventListener('touchstart', gearTouchStart);
                time_mm.addEventListener('touchstart', gearTouchStart);
                date_yy.addEventListener('touchmove', gearTouchMove);
                date_mm.addEventListener('touchmove', gearTouchMove);
                date_dd.addEventListener('touchmove', gearTouchMove);
                time_hh.addEventListener('touchmove', gearTouchMove);
                time_mm.addEventListener('touchmove', gearTouchMove);
                date_yy.addEventListener('touchend', gearTouchEnd);
                date_mm.addEventListener('touchend', gearTouchEnd);
                date_dd.addEventListener('touchend', gearTouchEnd);
                time_hh.addEventListener('touchend', gearTouchEnd);
                time_mm.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeMobileCalendar);
                lcalendar_finish.addEventListener('click', finishMobileDateTime);
                date_yy.addEventListener('mousedown', gearTouchStart);
                date_mm.addEventListener('mousedown', gearTouchStart);
                date_dd.addEventListener('mousedown', gearTouchStart);
                time_hh.addEventListener('mousedown', gearTouchStart);
                time_mm.addEventListener('mousedown', gearTouchStart);
                date_yy.addEventListener('mousemove', gearTouchMove);
                date_mm.addEventListener('mousemove', gearTouchMove);
                date_dd.addEventListener('mousemove', gearTouchMove);
                time_hh.addEventListener('mousemove', gearTouchMove);
                time_mm.addEventListener('mousemove', gearTouchMove);
                date_yy.addEventListener('mouseup', gearTouchEnd);
                date_mm.addEventListener('mouseup', gearTouchEnd);
                date_dd.addEventListener('mouseup', gearTouchEnd);
                time_hh.addEventListener('mouseup', gearTouchEnd);
                time_mm.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化年月日时分插件默认值
            function dateTimeCtrlInit() {
                var date = new Date();
                var dateArr = {
                    yy: date.getYear(),
                    mm: date.getMonth(),
                    dd: date.getDate() - 1,
                    hh: date.getHours(),
                    mi: date.getMinutes()
                };
                if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|-|\s|:)\d{1,4}/g);
                    dateArr.yy = rs[0] - _self.minY;
                    dateArr.mm = rs[1].replace(/-/g, "") - 1;
                    dateArr.dd = rs[2].replace(/-/g, "") - 1;
                    dateArr.hh = parseInt(rs[3].replace(/\s0?/g, ""));
                    dateArr.mi = parseInt(rs[4].replace(/:0?/g, ""));
                } else {
                    dateArr.yy = dateArr.yy + 1900 - _self.minY;
                }
                _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                _self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
                setDateGearTooth();
                _self.gearDate.querySelector(".time_hh").setAttribute("val", dateArr.hh);
                _self.gearDate.querySelector(".time_mm").setAttribute("val", dateArr.mi);
                setTimeGearTooth();
            }
            //呼出时间插件
            function popupTime(e) {
                _self.gearDate = document.createElement("div");
                _self.gearDate.className = "gearDate";
                _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                    '<div class="date_btn_box">' +
                    '<div class="date_btn lcalendar_cancel">取消</div>' +
                    '<div class="date_btn lcalendar_finish">确定</div>' +
                    '</div>' +
                    '<div class="date_roll_mask">' +
                    '<div class="time_roll">' +
                    '<div>' +
                    '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                    '<div class="date_grid">' +
                    '<div>时</div>' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                    '<div class="date_grid">' +
                    '<div>分</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' + //time_roll
                    '</div>' +
                    '</div><div class="date_bg" style="width:100%;height:100%;"></div>';
                document.body.appendChild(_self.gearDate);
                timeCtrlInit();
                var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                lcalendar_finish.addEventListener('touchstart', finishMobileTime);
                var lcalendar_bg = _self.gearDate.querySelector(".date_bg");
                lcalendar_bg.addEventListener('click', closeMobileCalendar);
                var time_hh = _self.gearDate.querySelector(".time_hh");
                var time_mm = _self.gearDate.querySelector(".time_mm");
                time_hh.addEventListener('touchstart', gearTouchStart);
                time_mm.addEventListener('touchstart', gearTouchStart);
                time_hh.addEventListener('touchmove', gearTouchMove);
                time_mm.addEventListener('touchmove', gearTouchMove);
                time_hh.addEventListener('touchend', gearTouchEnd);
                time_mm.addEventListener('touchend', gearTouchEnd);
                //-------------------------------------------------------------
                lcalendar_cancel.addEventListener('click', closeMobileCalendar);
                lcalendar_finish.addEventListener('click', finishMobileTime);
                time_hh.addEventListener('mousedown', gearTouchStart);
                time_mm.addEventListener('mousedown', gearTouchStart);
                time_hh.addEventListener('mousemove', gearTouchMove);
                time_mm.addEventListener('mousemove', gearTouchMove);
                time_hh.addEventListener('mouseup', gearTouchEnd);
                time_mm.addEventListener('mouseup', gearTouchEnd);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseleave', gearTouchOut);
                _self.gearDate.querySelector(".date_roll_mask").addEventListener('mouseup', gearTouchOut);
            }
            //初始化时分插件默认值
            function timeCtrlInit() {
                var d = new Date();
                var e = {
                    hh: d.getHours(),
                    mm: d.getMinutes()
                };
                if (/^\d{2}:\d{2}$/.test(_self.trigger.value)) {
                    rs = _self.trigger.value.match(/(^|:)\d{2}/g);
                    e.hh = parseInt(rs[0].replace(/^0?/g, ""));
                    e.mm = parseInt(rs[1].replace(/:0?/g, ""))
                }
                _self.gearDate.querySelector(".time_hh").setAttribute("val", e.hh);
                _self.gearDate.querySelector(".time_mm").setAttribute("val", e.mm);
                setTimeGearTooth();
            }
            //重置日期节点个数
            function setDateGearTooth() {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = _self.gearDate.querySelector(".date_yy");
                var itemStr = "";
                if (date_yy && date_yy.getAttribute("val")) {
                    //得到年份的值
                    var yyVal = parseInt(date_yy.getAttribute("val"));
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p <= passY - 1; p++) {
                        itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
                    }
                    date_yy.innerHTML = itemStr;
                    var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
                    if (!isNaN(top)) {
                        top % 2 == 0 ? (top = top) : (top = top + 1);
                        top > 8 && (top = 8);
                        var minTop = 8 - (passY - 1) * 2;
                        top < minTop && (top = minTop);
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
                        date_yy.setAttribute('top', top + 'em');
                        yyVal = Math.abs(top - 8) / 2;
                        date_yy.setAttribute("val", yyVal);
                    } else {
                        date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
                        date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
                    }
                } else {
                    return;
                }
                var date_mm = _self.gearDate.querySelector(".date_mm");
                if (date_mm && date_mm.getAttribute("val")) {
                    itemStr = "";
                    //得到月份的值
                    var mmVal = parseInt(date_mm.getAttribute("val"));
                    var maxM = 11;
                    var minM = 0;
                    //当年份到达最大值
                    if (yyVal == passY - 1) {
                        maxM = _self.maxM - 1;
                    }
                    //当年份到达最小值
                    if (yyVal == 0) {
                        minM = _self.minM - 1;
                    }
                    //p 当前节点前后需要展示的节点个数
                    for (var p = 0; p < maxM - minM + 1; p++) {
                        itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
                    }
                    date_mm.innerHTML = itemStr;
                    if (mmVal > maxM) {
                        mmVal = maxM;
                        date_mm.setAttribute("val", mmVal);
                    } else if (mmVal < minM) {
                        mmVal = maxM;
                        date_mm.setAttribute("val", mmVal);
                    }
                    date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
                    date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
                } else {
                    return;
                }
                var date_dd = _self.gearDate.querySelector(".date_dd");
                if (date_dd && date_dd.getAttribute("val")) {
                    itemStr = "";
                    //得到日期的值
                    var ddVal = parseInt(date_dd.getAttribute("val"));
                    //返回月份的天数
                    var maxMonthDays = calcDays(yyVal, mmVal);
                    //p 当前节点前后需要展示的节点个数
                    var maxD = maxMonthDays - 1;
                    var minD = 0;
                    //当年份月份到达最大值
                    if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
                        maxD = _self.maxD - 1;
                    }
                    //当年、月到达最小值
                    if (yyVal == 0 && _self.minM == mmVal + 1) {
                        minD = _self.minD - 1;
                    }
                    for (var p = 0; p < maxD - minD + 1; p++) {
                        itemStr += "<div class='tooth'>" + (minD + p + 1) + "</div>";
                    }
                    date_dd.innerHTML = itemStr;
                    if (ddVal > maxD) {
                        ddVal = maxD;
                        date_dd.setAttribute("val", ddVal);
                    } else if (ddVal < minD) {
                        ddVal = minD;
                        date_dd.setAttribute("val", ddVal);
                    }
                    date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
                    date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
                } else {
                    return;
                }
            }
            //重置时间节点个数
            function setTimeGearTooth() {
                var time_hh = _self.gearDate.querySelector(".time_hh");
                if (time_hh && time_hh.getAttribute("val")) {
                    var i = "";
                    var hhVal = parseInt(time_hh.getAttribute("val"));
                    for (var g = 0; g <= 23; g++) {
                        i += "<div class='tooth'>" + g + "</div>";
                    }
                    time_hh.innerHTML = i;
                    time_hh.style["-webkit-transform"] = 'translate3d(0,' + (8 - hhVal * 2) + 'em,0)';
                    time_hh.setAttribute('top', 8 - hhVal * 2 + 'em');
                } else {
                    return
                }
                var time_mm = _self.gearDate.querySelector(".time_mm");
                if (time_mm && time_mm.getAttribute("val")) {
                    var i = "";
                    var mmVal = parseInt(time_mm.getAttribute("val"));
                    for (var g = 0; g <= 59; g++) {
                        i += "<div class='tooth'>" + g + "</div>";
                    }
                    time_mm.innerHTML = i;
                    time_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
                    time_mm.setAttribute('top', 8 - mmVal * 2 + 'em');
                } else {
                    return
                }
            }
            //求月份最大天数
            function calcDays(year, month) {
                if (month == 1) {
                    year += _self.minY;
                    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
                        return 29;
                    } else {
                        return 28;
                    }
                } else {
                    if (month == 3 || month == 5 || month == 8 || month == 10) {
                        return 30;
                    } else {
                        return 31;
                    }
                }
            }
            //触摸开始
            function gearTouchStart(e) {
            	if (isMoved || isTouched) return;            	
                isTouched = true;
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                };
                pree=e;
            }
            //手指移动
            function gearTouchMove(e) {
            	if (!isTouched) return;
            	isMoved = true;
                e.preventDefault();
                if(pree) var target = pree.target; else
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches ? e.targetTouches[0].screenY : e.pageY;
                target["n_t_" + target.id] = (new Date()).getTime();
                //var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / target.clientHeight;
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
            }
            //离开屏幕
            function gearTouchEnd(e) {
            	if (!isTouched || !isMoved) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
                e.preventDefault();
                if(pree) var target = pree.target; else
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
                pree=null;
            };
            //离开区域
            function gearTouchOut(e) {
            	gearTouchEnd(pree);
            };
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;
                var passY = _self.maxY - _self.minY + 1;
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.1 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {} else {
                        speed = 0.1;
                        var b = Math.round(pos / 2) * 2;
                        if (Math.abs(pos - b) < 0.05) {
                            stopGear = true;
                        } else {
                            if (pos > b) {
                                pos -= speed
                            } else {
                                pos += speed
                            }
                        }
                    }
                    if (pos > 8) {
                        pos = 8;
                        stopGear = true;
                    }
                    switch (target.dataset.datetype) {
                        case "date_yy":
                            var minTop = 8 - (passY - 1) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "date_mm":
                            var date_yy = _self.gearDate.querySelector(".date_yy");
                            //得到年份的值
                            var yyVal = parseInt(date_yy.getAttribute("val"));
                            var maxM = 11;
                            var minM = 0;
                            //当年份到达最大值
                            if (yyVal == passY - 1) {
                                maxM = _self.maxM - 1;
                            }
                            //当年份到达最小值
                            if (yyVal == 0) {
                                minM = _self.minM - 1;
                            }
                            var minTop = 8 - (maxM - minM) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2 + minM;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "date_dd":
                            var date_yy = _self.gearDate.querySelector(".date_yy");
                            var date_mm = _self.gearDate.querySelector(".date_mm");
                            //得到年份的值
                            var yyVal = parseInt(date_yy.getAttribute("val"));
                            //得到月份的值
                            var mmVal = parseInt(date_mm.getAttribute("val"));
                            //返回月份的天数
                            var maxMonthDays = calcDays(yyVal, mmVal);
                            var maxD = maxMonthDays - 1;
                            var minD = 0;
                            //当年份月份到达最大值
                            if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
                                maxD = _self.maxD - 1;
                            }
                            //当年、月到达最小值
                            if (yyVal == 0 && _self.minM == mmVal + 1) {
                                minD = _self.minD - 1;
                            }
                            var minTop = 8 - (maxD - minD) * 2;
                            if (pos < minTop) {
                                pos = minTop;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2 + minD;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "time_hh":
                            if (pos < -38) {
                                pos = -38;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        case "time_mm":
                            if (pos < -110) {
                                pos = -110;
                                stopGear = true;
                            }
                            if (stopGear) {
                                var gearVal = Math.abs(pos - 8) / 2;
                                setGear(target, gearVal);
                                clearInterval(target["int_" + target.id]);
                            }
                            break;
                        default:
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                if (/date/.test(target.dataset.datetype)) {
                    setDateGearTooth();
                } else {
                    setTimeGearTooth();
                }
            }
            //取消
            function closeMobileCalendar(e) {
                e.preventDefault();
                isTouched = isMoved = false;
                if(_self.onClose) _self.onClose();
                var evt = new CustomEvent('input');
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gearDate);
            }
            //日期确认
            function finishMobileDate(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeMobileCalendar(e);
            }
            //年月确认
            function finishMobileYM(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeMobileCalendar(e);
            }
            //日期时间确认
            function finishMobileDateTime(e) {
                var passY = _self.maxY - _self.minY + 1;
                var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeMobileCalendar(e);
            }
            //时间确认
            function finishMobileTime(e) {
                var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                _self.trigger.value = (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                _self.value = _self.trigger.value;
                if(_self.onSubmit) _self.onSubmit();
                closeMobileCalendar(e);
            }
            _self.trigger.addEventListener('click', {
                "ym": popupYM,
                "date": popupDate,
                "datetime": popupDateTime,
                "time": popupTime
            }[type]);
        }
    }
    return MobileCalendar;
})();

/*!
 * mobileSelect.js
 * (c) 2017-present onlyhom
 * Released under the MIT License.
 */

(function() {
	function getClass(dom,string) {
		return dom.getElementsByClassName(string);
	}
	//构造器
	function MobileSelect(config) {
		this.mobileSelect;
		this.wheelsData = config.wheels;
		this.jsonType =  false;
		this.cascadeJsonData = [];
		this.displayJson = [];
		this.curValue = null;
		this.curIndexArr = [];
		this.cascade = false;
		this.startY;
		this.moveEndY;
		this.moveY;
		this.oldMoveY;
		this.offset = 0;
		this.offsetSum = 0;
		this.oversizeBorder;
		this.curDistance = [];
		this.clickStatus = false;
		this.isPC = true;
		this.init(config);
	}
	MobileSelect.prototype = {
		constructor: MobileSelect,
		init: function(config){
			var _this = this;
			_this.keyMap = config.keyMap ? config.keyMap : {id:'id', value:'value', childs:'childs'};
			_this.checkDataType();
			_this.renderWheels(_this.wheelsData, config.cancelBtnText, config.ensureBtnText);
			_this.trigger = document.querySelector(config.trigger);
			if(!_this.trigger){
				console.error('mobileSelect has been successfully installed, but no trigger found on your page.');
				return false;
			}
			_this.wheel = getClass(_this.mobileSelect,'wheel');
			_this.slider = getClass(_this.mobileSelect,'selectContainer');
			_this.wheels = _this.mobileSelect.querySelector('.wheels');
			_this.liHeight = _this.mobileSelect.querySelector('li').offsetHeight;
			_this.ensureBtn = _this.mobileSelect.querySelector('.ensure');
			_this.cancelBtn = _this.mobileSelect.querySelector('.cancel');
			_this.grayLayer = _this.mobileSelect.querySelector('.grayLayer');
			_this.popUp = _this.mobileSelect.querySelector('.content');
			_this.callback = config.callback || function(){};
			_this.transitionEnd = config.transitionEnd || function(){};
			_this.onShow = config.onShow || function(){};
			_this.onHide = config.onHide || function(){};
			_this.initPosition = config.position || [];
			_this.titleText = config.title || '';
			_this.connector = config.connector || ' ';
			_this.triggerDisplayData = !(typeof(config.triggerDisplayData)=='undefined') ? config.triggerDisplayData : true;
			_this.trigger.style.cursor='pointer';
			_this.setStyle(config);
			_this.setTitle(_this.titleText);
			_this.checkIsPC();
			_this.checkCascade();
			_this.addListenerAll();

			if (_this.cascade) {
				_this.initCascade();
			}
			//定位 初始位置
			if(_this.initPosition.length < _this.slider.length){
				var diff = _this.slider.length - _this.initPosition.length;
				for(var i=0; i<diff; i++){
					_this.initPosition.push(0);
				}
			}

			_this.setCurDistance(_this.initPosition);


			//按钮监听
			_this.cancelBtn.addEventListener('click',function(){
				_this.hide();
		    });

		    _this.ensureBtn.addEventListener('click',function(){
				_this.hide();
			    if(!_this.liHeight) {
			        _this.liHeight =  _this.mobileSelect.querySelector('li').offsetHeight;
			    }
				var tempValue ='';
		    	for(var i=0; i<_this.wheel.length; i++){
		    		i==_this.wheel.length-1 ? tempValue += _this.getInnerHtml(i) : tempValue += _this.getInnerHtml(i) + _this.connector;
		    	}
		    	if(_this.triggerDisplayData){
		    		_this.trigger.innerHTML = tempValue;
		    	}
		    	_this.curIndexArr = _this.getIndexArr();
		    	_this.curValue = _this.getCurValue();
		    	_this.callback(_this.curIndexArr, _this.curValue);
		    });

		    _this.trigger.addEventListener('click',function(){
		    	_this.show();
		    });
		    _this.grayLayer.addEventListener('click',function(){
				_this.hide();
		    });
		    _this.popUp.addEventListener('click',function(){
		    	event.stopPropagation();
		    });

			_this.fixRowStyle(); //修正列数
		},

		setTitle: function(string){
			var _this = this;
			_this.titleText = string;
			_this.mobileSelect.querySelector('.title').innerHTML = _this.titleText;
		},

		setStyle: function(config){
			var _this = this;
			if(config.ensureBtnColor){
				_this.ensureBtn.style.color = config.ensureBtnColor;
			}
			if(config.cancelBtnColor){
				_this.cancelBtn.style.color = config.cancelBtnColor;
			}
			if(config.titleColor){
				_this.title = _this.mobileSelect.querySelector('.title');
				_this.title.style.color = config.titleColor;
			}
			if(config.textColor){
				_this.panel = _this.mobileSelect.querySelector('.panel');
				_this.panel.style.color = config.textColor;
			}
			if(config.titleBgColor){
				_this.btnBar = _this.mobileSelect.querySelector('.btnBar');
				_this.btnBar.style.backgroundColor = config.titleBgColor;
			}
			if(config.bgColor){
				_this.panel = _this.mobileSelect.querySelector('.panel');
				_this.shadowMask = _this.mobileSelect.querySelector('.shadowMask');
				_this.panel.style.backgroundColor = config.bgColor;
				_this.shadowMask.style.background = 'linear-gradient(to bottom, '+ config.bgColor + ', rgba(255, 255, 255, 0), '+ config.bgColor + ')';
			}
			if(!isNaN(config.maskOpacity)){
				_this.grayMask = _this.mobileSelect.querySelector('.grayLayer');
				_this.grayMask.style.background = 'rgba(0, 0, 0, '+ config.maskOpacity +')';
			}
		},

		checkIsPC: function(){
			var _this = this;
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
			    _this.isPC = false;
			}
		},

 		show: function(){
			this.mobileSelect.classList.add('mobileSelect-show');
			if (typeof this.onShow === 'function') {
				this.onShow(this);
			}
  		},

	    hide: function() {
			this.mobileSelect.classList.remove('mobileSelect-show');
			if (typeof this.onHide === 'function') {
				this.onHide(this);
			}
	    },

		renderWheels: function(wheelsData, cancelBtnText, ensureBtnText){
			var _this = this;
			var cancelText = cancelBtnText ? cancelBtnText : '取消';
			var ensureText = ensureBtnText ? ensureBtnText : '确认';
			_this.mobileSelect = document.createElement("div");
			_this.mobileSelect.className = "mobileSelect";
			_this.mobileSelect.innerHTML =
		    	'<div class="grayLayer"></div>'+
		        '<div class="content">'+
		            '<div class="btnBar">'+
		                '<div class="fixWidth">'+
		                    '<div class="cancel">'+ cancelText +'</div>'+
		                    '<div class="title"></div>'+
		                    '<div class="ensure">'+ ensureText +'</div>'+
		                '</div>'+
		            '</div>'+
		            '<div class="panel">'+
		                '<div class="fixWidth">'+
		                	'<div class="wheels">'+
			                '</div>'+
		                    '<div class="selectLine"></div>'+
		                    '<div class="shadowMask"></div>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
		    document.body.appendChild(_this.mobileSelect);

			//根据数据长度来渲染

			var tempHTML='';
			for(var i=0; i<wheelsData.length; i++){
			//列
				tempHTML += '<div class="wheel"><ul class="selectContainer">';
				if(_this.jsonType){
					for(var j=0; j<wheelsData[i].data.length; j++){
					//行
						tempHTML += '<li data-id="'+wheelsData[i].data[j][_this.keyMap.id]+'">'+wheelsData[i].data[j][_this.keyMap.value]+'</li>';
					}
				}else{
					for(var j=0; j<wheelsData[i].data.length; j++){
					//行
						tempHTML += '<li>'+wheelsData[i].data[j]+'</li>';
					}
				}
				tempHTML += '</ul></div>';
			}
			_this.mobileSelect.querySelector('.wheels').innerHTML = tempHTML;
		},

		addListenerAll: function(){
			var _this = this;
			for(var i=0; i<_this.slider.length; i++){
				//手势监听
				(function (i) {
					_this.addListenerWheel(_this.wheel[i], i);
				})(i);
			}
		},

		addListenerWheel: function(theWheel, index){
			var _this = this;
			theWheel.addEventListener('touchstart', function () {
				_this.touch(event, this.firstChild, index);
			},false);
			theWheel.addEventListener('touchend', function () {
				_this.touch(event, this.firstChild, index);
			},false);
			theWheel.addEventListener('touchmove', function () {
				_this.touch(event, this.firstChild, index);
			},false);

			if(_this.isPC){
				//如果是PC端则再增加拖拽监听 方便调试
				theWheel.addEventListener('mousedown', function () {
					_this.dragClick(event, this.firstChild, index);
				},false);
				theWheel.addEventListener('mousemove', function () {
					_this.dragClick(event, this.firstChild, index);
				},false);
				theWheel.addEventListener('mouseup', function () {
					_this.dragClick(event, this.firstChild, index);
				},true);
			}
		},

		checkDataType: function(){
			var _this = this;
			if(typeof(_this.wheelsData[0].data[0])=='object'){
				_this.jsonType = true;
			}
		},

		checkCascade: function(){
			var _this = this;
			if(_this.jsonType){
				var node = _this.wheelsData[0].data;
				for(var i=0; i<node.length; i++){
					if(_this.keyMap.childs in node[i] && node[i][_this.keyMap.childs].length > 0){
						_this.cascade = true;
						_this.cascadeJsonData = _this.wheelsData[0].data;
						break;
					}
				}
			}else{
				_this.cascade = false;
			}
		},

		generateArrData: function (targetArr) {
			var tempArr = [];
			var keyMap_id = this.keyMap.id;
			var keyMap_value = this.keyMap.value;
			for(var i=0; i<targetArr.length; i++){
				var tempObj = {};
				tempObj[keyMap_id] = targetArr[i][this.keyMap.id];
				tempObj[keyMap_value] = targetArr[i][this.keyMap.value];
				tempArr.push(tempObj);
			}
			return tempArr;
		},

		initCascade: function(){
			var _this = this;
			_this.displayJson.push(_this.generateArrData(_this.cascadeJsonData));
			if(_this.initPosition.length>0){
				_this.initDeepCount = 0;
				_this.initCheckArrDeep(_this.cascadeJsonData[_this.initPosition[0]]);
			}else{
				_this.checkArrDeep(_this.cascadeJsonData[0]);
			}
			_this.reRenderWheels();
		},

		initCheckArrDeep: function (parent) {
			var _this = this;
			if(parent){
				if (_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
					_this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs]));
					_this.initDeepCount++;
					var nextNode = parent[_this.keyMap.childs][_this.initPosition[_this.initDeepCount]];
					if(nextNode){
						_this.initCheckArrDeep(nextNode);
					}else{
						_this.checkArrDeep(parent[_this.keyMap.childs][0]);
					}
				}
			}
		},

		checkArrDeep: function (parent) {
			//检测子节点深度  修改 displayJson
			var _this = this;
			if(parent){
				if (_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
					_this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs])); //生成子节点数组
					_this.checkArrDeep(parent[_this.keyMap.childs][0]);//检测下一个子节点
				}
			}
		},

		checkRange: function(index, posIndexArr){
			var _this = this;
			var deleteNum = _this.displayJson.length-1-index;
			for(var i=0; i<deleteNum; i++){
				_this.displayJson.pop(); //修改 displayJson
			}
			var resultNode;
			for (var i = 0; i <= index; i++){
				if (i == 0)
					resultNode = _this.cascadeJsonData[posIndexArr[0]];
				else {
					resultNode = resultNode[_this.keyMap.childs][posIndexArr[i]];
				}
			}
			_this.checkArrDeep(resultNode);
			//console.log(_this.displayJson);
			_this.reRenderWheels();
			_this.fixRowStyle();
			_this.setCurDistance(_this.resetPosition(index, posIndexArr));
		},

		resetPosition: function(index, posIndexArr){
			var _this = this;
			var tempPosArr = posIndexArr;
			var tempCount;
			if(_this.slider.length > posIndexArr.length){
				tempCount = _this.slider.length - posIndexArr.length;
				for(var i=0; i<tempCount; i++){
					tempPosArr.push(0);
				}
			}else if(_this.slider.length < posIndexArr.length){
				tempCount = posIndexArr.length - _this.slider.length;
				for(var i=0; i<tempCount; i++){
					tempPosArr.pop();
				}
			}
			for(var i=index+1; i< tempPosArr.length; i++){
				tempPosArr[i] = 0;
			}
			return tempPosArr;
		},

		reRenderWheels: function(){
			var _this = this;
			//删除多余的wheel
			if(_this.wheel.length > _this.displayJson.length){
				var count = _this.wheel.length - _this.displayJson.length;
				for(var i=0; i<count; i++){
					_this.wheels.removeChild(_this.wheel[_this.wheel.length-1]);
				}
			}
			for(var i=0; i<_this.displayJson.length; i++){
			//列
				(function (i) {
					var tempHTML='';
					if(_this.wheel[i]){
						//console.log('插入Li');
						for(var j=0; j<_this.displayJson[i].length; j++){
						//行
							tempHTML += '<li data-id="'+_this.displayJson[i][j][_this.keyMap.id]+'">'+_this.displayJson[i][j][_this.keyMap.value]+'</li>';
						}
						_this.slider[i].innerHTML = tempHTML;

					}else{
						var tempWheel = document.createElement("div");
						tempWheel.className = "wheel";
						tempHTML = '<ul class="selectContainer">';
						for(var j=0; j<_this.displayJson[i].length; j++){
						//行
							tempHTML += '<li data-id="'+_this.displayJson[i][j][_this.keyMap.id]+'">'+_this.displayJson[i][j][_this.keyMap.value]+'</li>';
						}
						tempHTML += '</ul>';
						tempWheel.innerHTML = tempHTML;

						_this.addListenerWheel(tempWheel, i);
				    	_this.wheels.appendChild(tempWheel);
					}
					//_this.·(i);
				})(i);
			}
		},

		updateWheels:function(data){
			var _this = this;
			if(_this.cascade){
				_this.cascadeJsonData = data;
				_this.displayJson = [];
				_this.initCascade();
				if(_this.initPosition.length < _this.slider.length){
					var diff = _this.slider.length - _this.initPosition.length;
					for(var i=0; i<diff; i++){
						_this.initPosition.push(0);
					}
				}
				_this.setCurDistance(_this.initPosition);
				_this.fixRowStyle();
			}
		},

		updateWheel: function(sliderIndex, data){
			var _this = this;
			var tempHTML='';
	    	if(_this.cascade){
	    		console.error('级联格式不支持updateWheel(),请使用updateWheels()更新整个数据源');
				return false;
	    	}
	    	else if(_this.jsonType){
				for(var j=0; j<data.length; j++){
					tempHTML += '<li data-id="'+data[j][_this.keyMap.id]+'">'+data[j][_this.keyMap.value]+'</li>';
				}
				_this.wheelsData[sliderIndex] = {data: data};
	    	}else{
				for(var j=0; j<data.length; j++){
					tempHTML += '<li>'+data[j]+'</li>';
				}
				_this.wheelsData[sliderIndex] = data;
	    	}
			_this.slider[sliderIndex].innerHTML = tempHTML;
		},

		fixRowStyle: function(){
			var _this = this;
			var width = (100/_this.wheel.length).toFixed(2);
			for(var i=0; i<_this.wheel.length; i++){
				_this.wheel[i].style.width = width+'%';
			}
		},

	    getIndex: function(distance){
	        return Math.round((2*this.liHeight-distance)/this.liHeight);
	    },

	    getIndexArr: function(){
	    	var _this = this;
	    	var temp = [];
	    	for(var i=0; i<_this.curDistance.length; i++){
	    		temp.push(_this.getIndex(_this.curDistance[i]));
	    	}
	    	return temp;
	    },

	    getCurValue: function(){
	    	var _this = this;
	    	var temp = [];
	    	var positionArr = _this.getIndexArr();
	    	if(_this.cascade){
		    	for(var i=0; i<_this.wheel.length; i++){
		    		temp.push(_this.displayJson[i][positionArr[i]]);
		    	}
	    	}
	    	else if(_this.jsonType){
		    	for(var i=0; i<_this.curDistance.length; i++){
		    		temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])]);
		    	}
	    	}else{
		    	for(var i=0; i<_this.curDistance.length; i++){
		    		temp.push(_this.getInnerHtml(i));
		    	}
	    	}
	    	return temp;
	    },

	    getValue: function(){
	    	return this.curValue;
	    },

	    calcDistance: function(index){
			return 2*this.liHeight-index*this.liHeight;
	    },

	    setCurDistance: function(indexArr){
	    	var _this = this;
	    	var temp = [];
	    	for(var i=0; i<_this.slider.length; i++){
	    		temp.push(_this.calcDistance(indexArr[i]));
	    		_this.movePosition(_this.slider[i],temp[i]);
	    	}
	    	_this.curDistance = temp;
	    },

	    fixPosition: function(distance){
	        return -(this.getIndex(distance)-2)*this.liHeight;
	    },

	    movePosition: function(theSlider, distance){
	        theSlider.style.webkitTransform = 'translate3d(0,' + distance + 'px, 0)';
	        theSlider.style.transform = 'translate3d(0,' + distance + 'px, 0)';
	    },

	    locatePosition: function(index, posIndex){
	    	var _this = this;
  	    	this.curDistance[index] = this.calcDistance(posIndex);
  	    	this.movePosition(this.slider[index],this.curDistance[index]);
	        if(_this.cascade){
		    	_this.checkRange(index, _this.getIndexArr());
			}
	    },

	    updateCurDistance: function(theSlider, index){
	        if(theSlider.style.transform){
				this.curDistance[index] = parseInt(theSlider.style.transform.split(',')[1]);
	        }else{
				this.curDistance[index] = parseInt(theSlider.style.webkitTransform.split(',')[1]);
	        }
	    },

	    getDistance:function(theSlider){
	    	if(theSlider.style.transform){
	    		return parseInt(theSlider.style.transform.split(',')[1]);
	    	}else{
	    		return parseInt(theSlider.style.webkitTransform.split(',')[1]);
	    	}
	    },

	    getInnerHtml: function(sliderIndex){
	    	var _this = this;
	    	var index = _this.getIndex(_this.curDistance[sliderIndex]);
	    	return _this.slider[sliderIndex].getElementsByTagName('li')[index].innerHTML;
	    },

	    touch: function(event, theSlider, index){
	    	var _this = this;
	    	event = event || window.event;
	    	switch(event.type){
	    		case "touchstart":
			        _this.startY = event.touches[0].clientY;
			        _this.startY = parseInt(_this.startY);
			        _this.oldMoveY = _this.startY;
	    			break;

	    		case "touchend":

			        _this.moveEndY = parseInt(event.changedTouches[0].clientY);
			        _this.offsetSum = _this.moveEndY - _this.startY;
					_this.oversizeBorder = -(theSlider.getElementsByTagName('li').length-3)*_this.liHeight;

					if(_this.offsetSum == 0){
						//offsetSum为0,相当于点击事件
						// 0 1 [2] 3 4
						var clickOffetNum = parseInt((document.documentElement.clientHeight - _this.moveEndY)/50);
						if(clickOffetNum!=2){
							var offset = clickOffetNum - 2;
							var newDistance = _this.curDistance[index] + (offset*_this.liHeight);
							if((newDistance <= 2*_this.liHeight) && (newDistance >= _this.oversizeBorder) ){
								_this.curDistance[index] = newDistance;
								_this.movePosition(theSlider, _this.curDistance[index]);
								_this.transitionEnd(_this.getIndexArr(),_this.getCurValue());
							}
						}
					}else{
						//修正位置
						_this.updateCurDistance(theSlider, index);
						_this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
						_this.movePosition(theSlider, _this.curDistance[index]);

				        //反弹
				        if(_this.curDistance[index] + _this.offsetSum > 2*_this.liHeight){
				            _this.curDistance[index] = 2*_this.liHeight;
				            setTimeout(function(){
				                _this.movePosition(theSlider, _this.curDistance[index]);
				            }, 100);

				        }else if(_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder){
				            _this.curDistance[index] = _this.oversizeBorder;
				            setTimeout(function(){
				                _this.movePosition(theSlider, _this.curDistance[index]);
				            }, 100);
				        }
						_this.transitionEnd(_this.getIndexArr(),_this.getCurValue());
					}

 			        if(_this.cascade){
				        _this.checkRange(index, _this.getIndexArr());
				    }

	    			break;

	    		case "touchmove":
			        event.preventDefault();
			        _this.moveY = event.touches[0].clientY;
			        _this.offset = _this.moveY - _this.oldMoveY;

			        _this.updateCurDistance(theSlider, index);
			        _this.curDistance[index] = _this.curDistance[index] + _this.offset;
			        _this.movePosition(theSlider, _this.curDistance[index]);
			        _this.oldMoveY = _this.moveY;
	    			break;
	    	}
	    },

	    dragClick: function(event, theSlider, index){
	    	var _this = this;
	    	event = event || window.event;
	    	switch(event.type){
	    		case "mousedown":
			        _this.startY = event.clientY;
			        _this.oldMoveY = _this.startY;
			        _this.clickStatus = true;
	    			break;

	    		case "mouseup":

			        _this.moveEndY = event.clientY;
			        _this.offsetSum = _this.moveEndY - _this.startY;
					_this.oversizeBorder = -(theSlider.getElementsByTagName('li').length-3)*_this.liHeight;

					if(_this.offsetSum == 0){
						var clickOffetNum = parseInt((document.documentElement.clientHeight - _this.moveEndY)/50);
						if(clickOffetNum!=2){
							var offset = clickOffetNum - 2;
							var newDistance = _this.curDistance[index] + (offset*_this.liHeight);
							if((newDistance <= 2*_this.liHeight) && (newDistance >= _this.oversizeBorder) ){
								_this.curDistance[index] = newDistance;
								_this.movePosition(theSlider, _this.curDistance[index]);
								_this.transitionEnd(_this.getIndexArr(),_this.getCurValue());
							}
						}
					}else{
						//修正位置
						_this.updateCurDistance(theSlider, index);
						_this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
						_this.movePosition(theSlider, _this.curDistance[index]);

						//反弹
						if(_this.curDistance[index] + _this.offsetSum > 2*_this.liHeight){
						    _this.curDistance[index] = 2*_this.liHeight;
						    setTimeout(function(){
						        _this.movePosition(theSlider, _this.curDistance[index]);
						    }, 100);

						}else if(_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder){
						    _this.curDistance[index] = _this.oversizeBorder;
						    setTimeout(function(){
						        _this.movePosition(theSlider, _this.curDistance[index]);
						    }, 100);
						}
						_this.transitionEnd(_this.getIndexArr(),_this.getCurValue());

					}

			        _this.clickStatus = false;
 			        if(_this.cascade){
				        _this.checkRange(index, _this.getIndexArr());
			    	}
	    			break;

	    		case "mousemove":
			        event.preventDefault();
			        if(_this.clickStatus){
				        _this.moveY = event.clientY;
				        _this.offset = _this.moveY - _this.oldMoveY;
				        _this.updateCurDistance(theSlider, index);
				        _this.curDistance[index] = _this.curDistance[index] + _this.offset;
				        _this.movePosition(theSlider, _this.curDistance[index]);
				        _this.oldMoveY = _this.moveY;
			        }
	    			break;
	    	}
	    }

	};

	if (typeof exports == "object") {
		module.exports = MobileSelect;
	} else if (typeof define == "function" && define.amd) {
		define([], function () {
			return MobileSelect;
		})
	} else {
		window.MobileSelect = MobileSelect;
	}
})();

var vueAction = {
	str : ['<div style="display: none;">',
		'			<div class="aui-mask aui-mask-in"  onclick="vueAction.toggleHisDiv(\'hide\')"></div>',
		'			<div id = "historyDiv" v-cloak class="c-bg-white aui-margin-l-15 aui-margin-r-15 " style="position: fixed;left: 0rem;right:0rem;z-index: 99;max-height: 16rem;overflow-y: auto;display: none;">',
		'				<div v-for="x in infoHis" class="aui-flex-col aui-padded-15 aui-border-b" v-on:click="selectHis(x)">					',
		'						<div class="aui-flex-auto aui-text-center " >{{x.name}}</div>		',
		'				</div>',
//		'				<div class="aui-padded-15 aui-text-center aui-border-b" tapmode v-on:click="clearCache()">',
//		'					<i class="aui-iconfont aui-icon-trash"></i>',
//		'				</div>',
		'			</div>',
		'			',
		'		</div>'
	].join(""),

	//当前组件对象
	cur : {},
	//当前存储路径
	curRes : '',
	//回调方法
	callback : function(){},
	//初始化
	init : function(res,data, callback) {
		
		vueAction.curRes = res;
		
		vueAction.callback = callback;
		// 注册
		Vue.component('zgghis', {
			template: vueAction.str,
			data: function() {
				return {
					infoHis: data
				}
			},
			mounted: function() {
				vueAction.cur = this;
			},
			methods: {
				selectHis: function(ret) {
					console.log(JSON.stringify(ret));
					
					vueAction.callback(ret);

					vueAction.toggleHisDiv('hide');
				},
				deleteHis: function(ret) {
					this.infoHis.splice($.inArray(ret, this.infoHis), 1);
				},
				clearCache: function() {

					this.infoHis = [];

					vueAction.toggleHisDiv('hide');
				}
			}
		});

		new Vue({
			el: '#vueHis'
		});

	},
	
	//数据重置
	resetData : function(str,data,callback){
		vueAction.curRes = str;
		vueAction.cur.infoHis = data;
		vueAction.callback = callback;
	},

	addHis : function(ret) {

		var tmpHis = vueAction.cur.infoHis;

		var q = Enumerable.From(tmpHis).FirstOrDefault(null, "x=>x.name=='" + ret + "'");

		if(q == null)
			tmpHis.unshift({
				name: ret
			});

		while(tmpHis.length > 10)
			tmpHis.pop();

		vueAction.cur.infoHis = tmpHis;

	},

	toggleHisDiv : function(str) {
		if(vueAction.cur.infoHis.length == 0){
			
			$('#historyDiv').parent().hide();
			$('#historyDiv').animate({
				height: 'hide'
			});
			return;
			
		}
			
		if(!str)
			str = 'toggle';

		$('#historyDiv').parent().toggle();

		$('#historyDiv').animate({
			height: str
		});
	}
};
var vueSearch = {
	searchStr: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" style="line-height:1.6rem;background-color: #dbdcde;" type="date" v-model="criteria.TranTimeStart" />',
		'						</div> ',
		'						<div class="aui-flex-item-1 aui-text-center">-</div> ',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default"> ',
		'							<input class="aui-text-center aui-font-size-14" type="date" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.TranTimeEnd" />',
		'						</div>',
		'					</div> ',		
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入证件号码" v-model="criteria.TaxIDNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入订单号" v-model="criteria.OrderNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员名" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.NickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.Tel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	searchPro: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" style="line-height:1.6rem;background-color: #dbdcde;" type="date" v-model="criteria.TranTimeStart" />',
		'						</div> ',
		'						<div class="aui-flex-item-1 aui-text-center">-</div> ',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default"> ',
		'							<input class="aui-text-center aui-font-size-14" type="date" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.TranTimeEnd" />',
		'						</div>',
		'					</div> ',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入订单号" v-model="criteria.OrderNo" style=";background-color: #dbdcde;" />',
		'						</div>',

		'					</div>',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="收款方名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.InNickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="收款方电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.InTel" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="付款方名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.OutNickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="付款方电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.OutTel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	searchUser: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" style="line-height:1.6rem;background-color: #dbdcde;" type="date" v-model="criteria.RegisterTimeStart" />',
		'						</div> ',
		'						<div class="aui-flex-item-1 aui-text-center">-</div> ',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default"> ',
		'							<input class="aui-text-center aui-font-size-14" type="date" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.RegisterTimeEnd" />',
		'						</div>',
		'					</div> ',		
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入证件号" v-model="criteria.TaxIDNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="请输入邮箱" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.Email" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.NickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.Tel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	searchAgreemt: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入协议号" v-model="criteria.TaxIDNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.NickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.Tel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	
};

// 注册查询组件
Vue.component("zgg-search", {
	template: vueSearch.searchStr,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.OrderNo = null;
				criteria.TaxIDNo = null;
			}
			this.$emit('zggsearch');
		}
	},
});

// 注册组件pro
Vue.component("zgg-search-pro", {
	template: vueSearch.searchPro,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.OrderNo = null;
				criteria.InNickName = null;
				criteria.InTel = null;
			}
			this.$emit('zggsearch');
		}
	},
});

// 用户查询组件user
Vue.component("zgg-search-user", {
	template: vueSearch.searchUser,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.TaxIDNo = null;
				criteria.Email = null;
			}
			this.$emit('zggsearch');
		}
	},
});


// 协议查询组件
Vue.component("zgg-search-agreemt", {
	template: vueSearch.searchAgreemt,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.TaxIDNo = null;
			}
			this.$emit('zggsearch');
			debugger
		}
	},
});
