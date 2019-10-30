// JavaScript Document
(function($) {
	$.fn.myScroll = function(options) {
		//默认配置
		var defaults = {
			speed: 40, //滚动速度,值越大速度越慢
			rowHeight: 24 //每行的高度
		};
		var isPause = false;
		var opts = $.extend({}, defaults, options),
			intId = [];

		function marquee(obj, step) {
			
			obj.find("ul").animate({
				marginTop: '-=1'
			}, 0, function() {
				var s = Math.abs(parseInt($(this).css("margin-top")));
				var eli = $(this).find("li").slice(0, 1);
				if(s >= eli.height()) {
					eli.appendTo($(this));
					$(this).css("margin-top", 0);
				}
			});
		}

		this.each(function(i) {
			var sh = opts["rowHeight"],
				speed = opts["speed"],
				_this = $(this);
			
			//清理事件
			_this.unbind();
			clearInterval(intId[i]);
				
			intId[i] = setInterval(function() {
				
				if(_this.find("ul").height() <= _this.height() || isPause) {
//					clearInterval(intId[i]);
				} else {
					marquee(_this, sh);
				}
			}, speed);
			
			
			
			_this.hover(function() {
				isPause = true;
				_this.css("margin-top", 0);
			}, function() {
				isPause = false;
			});

		});

	}

})(jQuery);