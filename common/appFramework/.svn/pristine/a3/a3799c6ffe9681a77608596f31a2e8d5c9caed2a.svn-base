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