var jsFiles = (function() {

	//将File或Blob转换为DOMString,DOMString可以直接赋值给img标签（推荐使用）
	var _createObjectURL = function(fileObj) {

		var str = URL.createObjectURL(fileObj);
		return str;
	}
	//删除domString
	var _revokeObjectURL = function(domString) {

		URL.revokeObjectURL(domString);
	}
	//将File或Blob转换为base64，base64可以直接赋值给img标签（android 4.4以下存在兼容问题）
	var _getFileToBase64Reader = function(fileObj, fn) {

		var reader = new FileReader();
		reader.onloadend = function(e) {
			fn(e.target.result);
		};
		reader.readAsDataURL(fileObj);
	}

	var _urltoImage = function(url, fn) {
		var img = new Image();
		img.src = url;
		img.onload = function() {
			fn(img);
		}
	};

	var _imagetoCanvas = function(image) {
		var cvs = document.createElement("canvas");
		var ctx = cvs.getContext('2d');
		cvs.width = image.width;
		cvs.height = image.height;
		ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
		return cvs;
	};
	
	var _canvasResizetoDataURL = function(canvas,quality){
  		var dateUrl = canvas.toDataURL('image/jpeg',quality);
  		canvas = null;
  		return dateUrl;
	};

	var _canvasResizetoFile = function(canvas, quality, fn) {
		canvas.toBlob(function(blob) {
			fn(blob);
			canvas = null;
		}, 'image/jpeg', quality);
	};

	//base64转换为文件,(存在兼容性问题)
	var _getBase64ToFile = function(blob, filename) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while(n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {
			type: mime
		});
	}
	//base64转为Blob类型文件对象，可直接上传，但上传时候需增加文件名(推荐使用)
	var _getBase64ToFileBlob = function(urlData, filename) {
		//去掉url的头，并转换为byte
		var bytes = window.atob(urlData.split(',')[1]);

		//处理异常,将ascii码小于0的转换为大于0
		var ab = new ArrayBuffer(bytes.length);
		var ia = new Uint8Array(ab);
		for(var i = 0; i < bytes.length; i++) {
			ia[i] = bytes.charCodeAt(i);
		}
		var blob = new Blob([ab], {
			type: 'image/png'
		});

		blob.name = filename;
		return blob;
	}
	
	//将文件图片为Base64，带压缩，取值0-1
	var _getFileToBase64 = function(fileObj,quality,callback){
		var dataUrl = _createObjectURL(fileObj);
		_urltoImage(dataUrl,function(img){
			var qUrl = _canvasResizetoDataURL(_imagetoCanvas(img),quality);
			callback(qUrl);
		});
	}
	
	//将网络图片转换为Base64，带压缩，取值0-1
	var _getUrlImgToBase64 = function(url, quality, callback) {
		_urltoImage(url,function(img){
			var dataUrl = _canvasResizetoDataURL(_imagetoCanvas(img),quality);
			callback(dataUrl);
		});
	}

	//将网络图片转换为Blob类型文件，带压缩，取值0-1
	var _getUrlImgToFileBlob = function(url, quality, callback) {
		var img = new Image();
		var filename = url.substring(url.lastIndexOf('/') + 1);
		_urltoImage(url,function(img){
			_canvasResizetoFile(_imagetoCanvas(img),quality,function(blob){
				blob.name = filename;
				callback(blob);
			});	
		});
	}

	return {
		createObjectURL: _createObjectURL,
		revokeObjectURL: _revokeObjectURL,
		
		getFileToBase64Reader: _getFileToBase64Reader,
		getFileToBase64 : _getFileToBase64,
		
		getBase64ToFile: _getBase64ToFile,
		getBase64ToFileBlob: _getBase64ToFileBlob,
		
		getUrlImgToBase64: _getUrlImgToBase64,
		getUrlImgToFileBlob : _getUrlImgToFileBlob,
	}
})();