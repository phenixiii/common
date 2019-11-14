
var phAjax = (function ($) {
    var HOST_COOKIE_NAME = "P-H";
    var PORT_COOKIE_NAME = "P-AP";
    var USER_NUMBER_COOKIE_NAME = "P-UN";
    var KEY_COOKIE_NAME = "P-K";
  
    var AUTHORIZATION_HEADER_NAME = "Phenix-Authorization";
    var METHOD_OVERRIDE_HEADER_NAME = "X-HTTP-Method-Override";
  
    var _getHost = function () {
      var result;
      try {
        result = window.sessionStorage.getItem(HOST_COOKIE_NAME);
      } catch (e) {
        result = $.cookie(HOST_COOKIE_NAME);
      }
      // return typeof result != "undefined" && result != null ? result : "180.166.243.227";//外网
      return typeof result != "undefined" && result != null ? result : "172.20.10.88"; //内网
    };
    var _setHost = function (value) {
      try {
        window.sessionStorage.removeItem(HOST_COOKIE_NAME);
        window.sessionStorage.setItem(HOST_COOKIE_NAME, value);
      } catch (e) {
        $.cookie(HOST_COOKIE_NAME, value, {
          path: '/'
        });
      }
    };
  
    var _getPort = function () {
      var result;
      try {
        result = window.sessionStorage.getItem(PORT_COOKIE_NAME);
      } catch (e) {
        result = $.cookie(PORT_COOKIE_NAME);
      }
      return typeof result != "undefined" && result != null ? result : 8080; //8080/9082
    };
    var _setPort = function (value) {
      try {
        window.sessionStorage.removeItem(PORT_COOKIE_NAME);
        window.sessionStorage.setItem(PORT_COOKIE_NAME, value);
      } catch (e) {
        $.cookie(PORT_COOKIE_NAME, value, {
          path: '/'
        });
      }
    };
  
    var _getUserNumber = function () {
      var result;
      try {
        result = window.sessionStorage.getItem(USER_NUMBER_COOKIE_NAME);
      } catch (e) {
        result = $.cookie(USER_NUMBER_COOKIE_NAME);
      }
      return typeof result != "undefined" && result != null ? result : 'Guest';
    };
    var _setUserNumber = function (value) {
      try {
        window.sessionStorage.removeItem(USER_NUMBER_COOKIE_NAME);
        window.sessionStorage.setItem(USER_NUMBER_COOKIE_NAME, value);
      } catch (e) {
        $.cookie(USER_NUMBER_COOKIE_NAME, value, {
          path: '/'
        });
      }
    };
  
    var _getKey = function () {
      var result;
      try {
        result = window.sessionStorage.getItem(KEY_COOKIE_NAME);
      } catch (e) {
        result = $.cookie(KEY_COOKIE_NAME);
      }
      return typeof result != "undefined" && result != null ? CryptoJS.enc.Hex.parse(result) : CryptoJS.MD5('Guest');
    };
    var _setKey = function (value) {
      try {
        window.sessionStorage.removeItem(KEY_COOKIE_NAME);
        window.sessionStorage.setItem(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null);
      } catch (e) {
        $.cookie(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null, {
          path: '/'
        });
      }
    };
  
    var _encrypt = function (value, key) {
      try {
        if (typeof value != "undefined" && value != null)
          return CryptoJS.AES.encrypt(value, key, {
            iv: key,
            mode: CryptoJS.mode.CBC
          });
        else
          return null;
      } catch (e) {
        return null;
      }
    };
  
    var _formatAuthorizationHeader = function (userNumber, key, contentMD5, contentEncrypted) {
      if (userNumber == null || key == null)
        return null;
      var timestamp = Math.random().toString(36).substring(2) + new Date().toISOString();
      return encodeURIComponent(userNumber) + "," + timestamp + "," + contentMD5 + "," +
        (contentEncrypted ? 1 : 0) + "," + _encrypt(timestamp + contentMD5, key);
    };
  
    var _setAuthorizationHeader = function (XMLHttpRequest, userNumber, key, contentMD5, contentEncrypted) {
      XMLHttpRequest.setRequestHeader(AUTHORIZATION_HEADER_NAME, _formatAuthorizationHeader(userNumber, key, contentMD5, contentEncrypted));
    };
  
    var _initAuthorizationHeader = function (XMLHttpRequest, contentMD5, contentEncrypted) {
      _setAuthorizationHeader(XMLHttpRequest, _getUserNumber(), _getKey(), contentMD5, contentEncrypted);
    };
  
    var _setPutOverrideHeader = function (XMLHttpRequest) {
      XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "PUT");
    };
  
    var _setDeleteOverrideHeader = function (XMLHttpRequest) {
      XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "DELETE");
    };
  
    return {
      get userNumber() {
        return _getUserNumber();
      },
  
      get host() {
        return _getHost();
      },
      set host(value) {
        _setHost(value);
      },
  
      get port() {
        return _getPort();
      },
      set port(value) {
        _setPort(value);
      },
  
      get baseUrl() {
        return "http://" + phAjax.host + ":" + phAjax.port + "/api/";
      },
  
      get securityUrl() {
        return phAjax.baseUrl + "Security";
      },
  
      get dataUrl() {
        return phAjax.baseUrl + "Data";
      },
  
      logOn: function (userNumber, password, onComplete, onError) {
        phAjax.logOnVerify(userNumber, password, new Date().toISOString(), onComplete, onError);
      },
  
      logOnVerify: function (userNumber, password, tag, onComplete, onError) {
        var key = CryptoJS.MD5(password);
        $.ajax({
          type: "POST",
          url: phAjax.securityUrl,
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          crossDomain: true,
          timeout: 3000,
          beforeSend: function (XMLHttpRequest) {
            _setAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
          },
          data: _encrypt(tag, key).toString(),
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status == 200) {
              _setUserNumber(userNumber);
              _setKey(key);
            } else if (typeof onError == "function")
              onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
            if (typeof onComplete == "function")
              onComplete(XMLHttpRequest, textStatus);
          },
        });
      },
  
      changePassword: function (userNumber, password, newPassword, onComplete, onError) {
        var key = CryptoJS.MD5(password);
        $.ajax({
          type: "POST",
          url: phAjax.securityUrl,
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          crossDomain: true,
          timeout: 3000,
          beforeSend: function (XMLHttpRequest) {
            _setAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
            _setPutOverrideHeader(XMLHttpRequest);
          },
          data: _encrypt(newPassword, key).toString(),
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status == 200) {
              _setUserNumber(userNumber);
              _setKey(CryptoJS.MD5(newPassword));
            } else if (typeof onError == "function")
              onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
            if (typeof onComplete == "function")
              onComplete(XMLHttpRequest, textStatus);
          },
        });
      },
  
      logOff: function (userNumber, onComplete) {
        $.ajax({
          type: "POST",
          url: phAjax.securityUrl,
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          crossDomain: true,
          timeout: 3000,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
            _setDeleteOverrideHeader(XMLHttpRequest);
          },
          data: {},
          complete: function (XMLHttpRequest, textStatus) {
            _setUserNumber('Guest');
            _setKey(CryptoJS.MD5('Guest'));
            if (typeof onComplete == "function")
              onComplete(XMLHttpRequest, textStatus);
          },
        });
      },
  
      getSequenceValue: function (options) {
        var defaults = {
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(value)为获取到的64位序号
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        $.ajax({
          type: "GET",
          url: phAjax.dataUrl,
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          cache: false,
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
          },
          data: {},
          success: function (value) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(value);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      fetch: function (options) {
        var defaults = {
          dataName: null, //数据名, 在服务端注册的实体类全名(需实现IEntity接口)
          id: null, //主键值
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(data)为获取到的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        $.ajax({
          type: "GET",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.dataName) +
            "?id=" + options.id +
            "&pageSize=&pageNo=",
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          cache: false,
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
          },
          data: {},
          success: function (data) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(data);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      getRecordCount: function (options) {
        var defaults = {
          dataName: null, //数据名, 在服务端注册的实体集合类全名(需实现IEntityCollection接口)
          masterName: null, //主对象名, 在服务端注册的实体类全名(需实现IEntity接口)
          masterId: null, //主对象主键值
          groupName: null, //分组名, null代表全部
          criteriaName: null, //条件名, 在服务端定义的条件类全名(需实现ICriteria接口)
          criteria: null, //条件对象
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(count)为获取到的记录数
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        $.ajax({
          type: "GET",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.dataName) +
            ":" + (options.masterId != null ? encodeURIComponent(options.masterName) : "") +
            ":" + (options.criteria != null ? encodeURIComponent(options.criteriaName) : "") +
            "?" +
            (options.masterId != null ? "masterId=" + options.masterId + "&groupName=" + (options.groupName != null ? options.groupName : "") + "&" : "") +
            "id=" + (options.criteria != null ? encodeURIComponent(typeof options.criteria == "string" ? options.criteria : JSON.stringify(options.criteria)) : "") +
            "&pageSize=0&pageNo=0",
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          cache: false,
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
          },
          data: {},
          success: function (count) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(count);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      fetchList: function (options) {
        var defaults = {
          dataName: null, //数据名, 在服务端注册的实体集合类全名(需实现IEntityCollection接口)
          masterName: null, //主对象名, 在服务端注册的实体类全名(需实现IEntity接口)
          masterId: null, //主对象主键值
          groupName: null, //分组名, null代表全部
          criteriaName: null, //条件名, 在服务端定义的条件类全名(需实现ICriteria接口)
          criteria: null, //条件对象
          pageSize: null, //分页大小
          pageNo: null, //分页号, 从1起始
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(data)为获取到的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        $.ajax({
          type: "GET",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.dataName) +
            ":" + (options.masterId != null ? encodeURIComponent(options.masterName) : "") +
            ":" + (options.criteria != null ? encodeURIComponent(options.criteriaName) : "") +
            "?" +
            (options.masterId != null ? "masterId=" + options.masterId + "&groupName=" + (options.groupName != null ? options.groupName : "") + "&" : "") +
            "id=" + (options.criteria != null ? encodeURIComponent(typeof options.criteria == "string" ? options.criteria : JSON.stringify(options.criteria)) : "") +
            "&pageSize=" + (options.pageSize != null ? options.pageSize : "") +
            "&pageNo=" + (options.pageNo != null ? options.pageNo : ""),
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          cache: false,
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
          },
          data: {},
          success: function (data) {
            if (typeof options.onSuccess == "function") {
              if (options.pageNo == null || options.pageNo > 1 || options.onSuccess.length == 1)
                options.onSuccess(data);
              else
                phAjax.getRecordCount({
                  dataName: options.dataName,
                  masterName: options.masterName,
                  masterId: options.masterId,
                  groupName: options.groupName,
                  criteriaName: options.criteriaName,
                  criteria: options.criteria,
                  onSuccess: function (count) {
                    options.onSuccess(data, count);
                  },
                  onError: options.onError,
                });
            }
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      save: function (options) {
        var defaults = {
          dataName: null, //数据名, 在服务端注册的实体集合类/实体类全名(需实现IEntityCollection/IEntity接口)
          data: null, //传到服务端的数据, 需包含IsNew、IsSelfDeleted、IsSelfDirty属性以指明对象状态
          dataVerify: false, //数据需核实
          dataEncrypt: false, //数据需加密
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(count)为成功保存的记录数
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        if (typeof options.data != "string")
          options.data = JSON.stringify(options.data);
        $.ajax({
          type: "POST",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.dataName),
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
          },
          data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
          success: function (count) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(count);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      execute: function (options) {
        var defaults = {
          serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
          data: null, //传到服务端的数据
          dataVerify: false, //数据需核实
          dataEncrypt: false, //数据需加密
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        if (typeof options.data != "string")
          options.data = JSON.stringify(options.data);
        $.ajax({
          type: "POST",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.serviceName),
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
          },
          data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
          success: function (result) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(result);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      uploadFiles: function (options) {
        var defaults = {
          serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
          data: null, //传到服务端的数据
          files: null, //传到服务端的文件
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        var formData = new FormData();
        formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
        if (options.files != null)
          for (var i = 0; i < options.files.length; i++) {
            formData.append("file", options.files[i], options.files[i].name);
          }
        $.ajax({
          type: "POST",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.serviceName),
          dataType: "JSON",
          processData: false, //不要对data参数进行序列化处理，默认为true
          contentType: false, //不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
          },
          data: formData,
          success: function (result) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(result);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      uploadBigFiles: function (options) {
        var defaults = {
          serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
          data: null, //传到服务端的数据
          files: null, //传到服务端的文件
          timeout: 30000, //默认超时30秒
          onProgress: null, //执行进度的回调函数, 参数(result, fileName, chunkCount, chunkNumber, chunkSize)中result为返回的数据，函数调用返回值如为false则中止上传
          onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        for (var i = 0; i < options.files.length; i++) {
          var file = options.files[i];
          phAjax.uploadChunkInfo({
            serviceName: options.serviceName,
            data: options.data,
            file: file,
            chunkCount: phUtils.getChunkCount(file.size),
            chunkNumber: 1,
            timeout: options.timeout,
            onProgress: options.onProgress,
            onSuccess: options.onSuccess,
            onError: options.onError,
          });
        };
      },
  
      uploadChunkInfo: function (options) {
        var defaults = {
          serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
          data: null, //传到服务端的数据
          file: null, //传到服务端的文件
          chunkCount: 0, //传到服务端的块数
          chunkNumber: 0, //传到服务端的块号
          timeout: 30000, //默认超时30秒
          onProgress: null, //执行进度的回调函数, 参数(result, fileName, chunkCount, chunkNumber, chunkSize)中result为返回的数据，函数调用返回值如为false则中止上传
          onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        var formData = new FormData();
        formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
        var fileChunkInfo = phUtils.readChunkInfo(options.file, options.chunkCount, options.chunkNumber);
        formData.append("chunkInfo", JSON.stringify({
          FileName: fileChunkInfo.fileName,
          ChunkCount: fileChunkInfo.chunkCount,
          ChunkNumber: fileChunkInfo.chunkNumber,
          ChunkSize: fileChunkInfo.chunkSize
        }));
        if (fileChunkInfo.chunkBuffer != null)
          formData.append("chunkInfo", fileChunkInfo.chunkBuffer, fileChunkInfo.fileName);
        $.ajax({
          type: "POST",
          url: phAjax.dataUrl +
            "/" + encodeURIComponent(options.serviceName),
          dataType: "JSON",
          processData: false, //不要对data参数进行序列化处理，默认为true
          contentType: false, //不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            _initAuthorizationHeader(XMLHttpRequest, "", false);
          },
          data: formData,
          success: function (result) {
            if (options.chunkNumber <= 0)
              return;
            if (typeof options.onProgress == "function")
              if (!options.onProgress(result, fileChunkInfo.fileName, fileChunkInfo.chunkCount, fileChunkInfo.chunkNumber, fileChunkInfo.chunkSize)) {
                options.chunkCount = 0;
                options.chunkNumber = 0;
                phAjax.uploadChunkInfo(options);
                return;
              };
            if (options.chunkNumber >= options.chunkCount) {
              if (typeof options.onSuccess == "function")
                options.onSuccess(result);
              return;
            };
            options.chunkNumber = options.chunkNumber + 1;
            phAjax.uploadChunkInfo(options);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
  
      downloadFile: function (options) {
        var defaults = {
          serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
          data: null, //传到服务端的数据
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(blob)为返回的数据流
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", phAjax.dataUrl + "/" + encodeURIComponent(options.serviceName));
        xhr.responseType = "blob";
        xhr.withCredentials = true;
        xhr.timeout = options.timeout;
        _initAuthorizationHeader(xhr, "", false);
        xhr.onload = function () {
          if (this.status == 200) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(this.response);
          } else if (typeof options.onError == "function")
            options.onError(this, this.textStatus, new Error(this.responseText));
        };
        var formData = new FormData();
        formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
        formData.append("chunkNumber", "0");
        xhr.send(formData);
      },
  
      downloadBigFile: function (options) {
        var defaults = {
          serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
          data: null, //传到服务端的数据
          chunkNumber: 1, //传到服务端的块号
          timeout: 30000, //默认超时30秒
          onProgress: null, //执行进度的回调函数, 参数(fileName, chunkCount, chunkNumber, chunkSize, chunkBuffer)，函数调用返回值如为false则中止上传
          onSuccess: null, //调用成功的回调函数, 参数(fileName, chunkCount)
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", phAjax.dataUrl + "/" + encodeURIComponent(options.serviceName));
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.timeout = options.timeout;
        _initAuthorizationHeader(xhr, "", false);
        xhr.onload = function () {
          if (this.status == 200) {
            var fileChunkInfo = JSON.parse(this.response);
            if (fileChunkInfo == null)
              return;
            if (typeof options.onProgress == "function")
              if (!options.onProgress(fileChunkInfo.FileName, fileChunkInfo.ChunkCount, fileChunkInfo.ChunkNumber, fileChunkInfo.ChunkSize, fileChunkInfo.ChunkBuffer)) {
                return;
              };
            if (fileChunkInfo.ChunkNumber >= fileChunkInfo.ChunkCount) {
              if (typeof options.onSuccess == "function")
                options.onSuccess(fileChunkInfo.FileName, fileChunkInfo.ChunkCount);
              return;
            };
            options.chunkNumber = options.chunkNumber + 1;
            phAjax.downloadBigFile(options);
          } else if (typeof options.onError == "function")
            options.onError(this, this.textStatus, new Error(this.responseText));
        };
        var formData = new FormData();
        formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
        formData.append("chunkNumber", options.chunkNumber);
        xhr.send(formData);
      },
  
      ajax: function (options) {
        var defaults = {
          anonymity: false, //是否匿名访问
          type: "GET", //请求方法(GET/POST/PUT/DELETE), 默认是GET
          uri: null, //标识服务端的ApiController名称及其参数
          data: null, //传到服务端的数据
          dataVerify: false, //数据需核实(匿名访问时无效)
          dataEncrypt: false, //数据需加密(匿名访问时无效)
          timeout: 30000, //默认超时30秒
          onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
          onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
        };
        options = $.extend(defaults, options);
        if (typeof options.data != "string")
          options.data = JSON.stringify(options.data);
        $.ajax({
          type: (options.type == "PUT" || options.type == "DELETE") ? "POST" : options.type,
          url: phAjax.baseUrl + options.uri,
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          crossDomain: true,
          timeout: options.timeout,
          beforeSend: function (XMLHttpRequest) {
            if (!options.anonymity)
              _initAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
            if (options.type == "PUT")
              _setPutOverrideHeader(XMLHttpRequest);
            else if (options.type == "DELETE")
              _setDeleteOverrideHeader(XMLHttpRequest);
          },
          data: !options.anonymity && options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
          success: function (result) {
            if (typeof options.onSuccess == "function")
              options.onSuccess(result);
          },
          complete: function (XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status != 200)
              if (typeof options.onError == "function")
                options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
          },
        });
      },
    }
  })(jQuery);
  
  /*
      工具集
  */
  var phUtils = (function () {
    var CHUNK_MAX_SIZE = 1024 * 1024;
    return {
      getChunkCount: function (fileSize) {
        return Math.ceil(fileSize / CHUNK_MAX_SIZE);
      },
  
      readChunkInfo: function (file, chunkCount, chunkNumber) {
        var result = {
          fileName: null,
          chunkCount: 0,
          chunkNumber: 0,
          chunkSize: 0,
          chunkBuffer: null,
        };
        result.fileName = file.name;
        if (chunkNumber >= 1 && chunkNumber <= chunkCount) {
          result.chunkCount = chunkCount;
          result.chunkNumber = chunkNumber;
          result.chunkSize = chunkNumber < chunkCount ?
            CHUNK_MAX_SIZE :
            file.size - CHUNK_MAX_SIZE * (chunkCount - 1);
          var strat = CHUNK_MAX_SIZE * (chunkNumber - 1);
          result.chunkBuffer = file.slice(strat, strat + result.chunkSize);
        };
        return result;
      },
  
      toObject: function (nameValues) {
        var result = {};
        nameValues.map(function (item) {
          result[item.name] = item.value;
        });
        return result;
      },
    }
  })();
  