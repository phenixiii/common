/**
 * aui-toast.js
 * @author HC
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
                    var iconHtml = '<div class="aui-flex-col-2"><div class="aui-toast-loading"></div></div>';
                    break;
                case "toast":
                	var iconHtml = '';
                    break;
            }

            var titleHtml = params.title ? '<div class="aui-flex-item-10" style="font-size:15px;padding:5px;">'+params.title+'</div>' : '';
            //增加显示时，不可点击
            var maskHtml = '<div class="aui-mask aui-mask-in toast-mask"></div>';
            toastHtml = '<div class="aui-toast aui-padded-15" style="width:200px;margin-left:-100px;"><div class="aui-flex-col aui-flex-middle aui-flex-center">'+iconHtml+titleHtml+'</div></div>' + maskHtml;
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
        toast:function(params,callback){
            var self = this;
            params.type = "toast";
            return self.create(params,callback);
        },
        
    };
    window.auiToast = auiToast;
})(window);