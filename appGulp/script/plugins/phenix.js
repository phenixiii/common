﻿/*
    v6.9
    2018-08-30 添加sendMessage、receiveMessage、affirmReceivedMessage、subscribeMessage函数，提供简易的消息收发功能
    2018-09-02 添加CanXXX系列函数，提供控制UI交互权限的功能
 */

/*
    v6.8
    2018-08-02 提供ajax函数，支持匿名或登录用户访问自定义ApiController
 */

/*
    v6.7
    2018-06-18 支持“等保三级”评测认证
 */

/*
    v6.6
    2018-04-22 调整URI格式为贴近RESTful风格
 */

/*
    v6.5
    2017-10-13 为数据处理函数添加timeout参数，调用超时可在onError回调函数中处理
    2017-10-22 添加uploadBigFiles、downloadBigFile服务的客户端接口函数
 */

/*
    v6.4
    2017-09-25 添加uploadFiles、downloadFile服务的客户端接口函数
 */

/*
    v6.3
    2017-08-18 _getUserNumber函数如果获取不到cookie保存的登录用户则返回'Guest'以代表匿名用户
    2017-08-18 _getKey函数如果获取不到cookie保存的登录口令则返回'Guest'以代表匿名用户默认口令
 */

/*
    Phenix Web Client
    Copyright © 2007, 2018 Phenix Studio All rights reserved.

    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/core-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/cipher-core-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/aes-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/md5-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/base64-binary.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/json2.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/jquery.min.js"></script> --v3.2.1
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/jquery.signalR.min.js"></script> --v2.3.0
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/jquery.cookie.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/phenix.js"></script>

 */
;
$.support.cors = true;
/*
    配套WabAPI服务(Bin.Top目录下Host服务程序)
*/
var phAjax = (function($) {
    var HOST_COOKIE_NAME = "eharboradmin-P-H";
    var PORT_COOKIE_NAME = "eharboradmin-P-P";
    
    var MESSAGE_HOST_COOKIE_NAME = "eharboradmin-P-MH";
    var MESSAGE_PORT_COOKIE_NAME = "eharboradmin-P-MP";
    
    var USER_NUMBER_COOKIE_NAME = "eharboradmin-P-UN";
    var KEY_COOKIE_NAME = "eharboradmin-P-K";

    var AUTHORIZATION_HEADER_NAME = "Phenix-Authorization";
    var METHOD_OVERRIDE_HEADER_NAME = "X-HTTP-Method-Override";

    var _getHost = function() {
        var result;
        try {
            result = window.localStorage.getItem(HOST_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(HOST_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'http://localhost';
    };
    var _setHost = function(value) {
        try {
            window.localStorage.removeItem(HOST_COOKIE_NAME);
            window.localStorage.setItem(HOST_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(HOST_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getPort = function() {
        var result;
        try {
            result = window.localStorage.getItem(PORT_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(PORT_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 8080;
    };
    var _setPort = function(value) {
        try {
            window.localStorage.removeItem(PORT_COOKIE_NAME);
            window.localStorage.setItem(PORT_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(PORT_COOKIE_NAME, value, { path: '/' });
        }
    };
    
    var _getMessageHost = function() {
        var result;
        try {
            result = window.localStorage.getItem(MESSAGE_HOST_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(MESSAGE_HOST_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'http://localhost';
    };
    var _setMessageHost = function(value) {
        try {
            window.localStorage.removeItem(MESSAGE_HOST_COOKIE_NAME);
            window.localStorage.setItem(MESSAGE_HOST_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(MESSAGE_HOST_COOKIE_NAME, value, { path: '/' });
        }
    };
    
    var _getMessagePort = function () {
        var result;
        try {
            result = window.localStorage.getItem(MESSAGE_PORT_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(MESSAGE_PORT_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 8081;
    };
    var _setMessagePort = function (value) {
        try {
            window.localStorage.removeItem(MESSAGE_PORT_COOKIE_NAME);
            window.localStorage.setItem(MESSAGE_PORT_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(MESSAGE_PORT_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getUserNumber = function() {
        var result;
        try {
            result = window.localStorage.getItem(USER_NUMBER_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(USER_NUMBER_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'Guest';
    };
    var _setUserNumber = function(value) {
        try {
            window.localStorage.removeItem(USER_NUMBER_COOKIE_NAME);
            window.localStorage.setItem(USER_NUMBER_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(USER_NUMBER_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getKey = function() {
        var result;
        try {
            result = window.localStorage.getItem(KEY_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(KEY_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? CryptoJS.enc.Hex.parse(result) : CryptoJS.MD5('Guest');
    };
    var _setKey = function(value) {
        try {
            window.localStorage.removeItem(KEY_COOKIE_NAME);
            window.localStorage.setItem(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null);
        } catch (e) {
            $.cookie(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null, { path: '/' });
        }
    };

    var _encrypt = function(value, key) {
        try {
            if (typeof value != "undefined" && value != null)
                return CryptoJS.AES.encrypt(value, key, { iv: key, mode: CryptoJS.mode.CBC });
            else
                return null;
        } catch (e) {
            return null;
        }
    };

    var _formatSimpleAuthorization = function() {
        var timestamp = Math.random().toString(36).substring(2) + new Date().toISOString();
        return AUTHORIZATION_HEADER_NAME + '=' + encodeURIComponent(_getUserNumber()) + "," + timestamp + "," + _encrypt(timestamp, _getKey());
    };

    var _formatComplexAuthorization = function(userNumber, key, contentMD5, contentEncrypted) {
        if (userNumber == null || key == null)
            return null;
        var timestamp = Math.random().toString(36).substring(2) + new Date().toISOString();
        return encodeURIComponent(userNumber) + "," + timestamp + "," + contentMD5 + "," +
            (contentEncrypted ? 1 : 0) + "," + _encrypt(timestamp + contentMD5, key);
    };

    var _initComplexAuthorizationHeader = function(XMLHttpRequest, userNumber, key, contentMD5, contentEncrypted) {
        XMLHttpRequest.setRequestHeader(AUTHORIZATION_HEADER_NAME, _formatComplexAuthorization(userNumber, key, contentMD5, contentEncrypted));
    };

    var _setComplexAuthorizationHeader = function(XMLHttpRequest, contentMD5, contentEncrypted) {
        _initComplexAuthorizationHeader(XMLHttpRequest, _getUserNumber(), _getKey(), contentMD5, contentEncrypted);
    };

    var _setPutOverrideHeader = function(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "PUT");
    };

    var _setDeleteOverrideHeader = function(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "DELETE");
    };

    return {
        get userNumber() {
            return _getUserNumber();
        },
        set userNumber(value) {
            _setUserNumber(value);
        },
        
        set key(value){
        	_setKey(value);
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
        
        get messageHost() {
            return _getMessageHost();
        },
        set messageHost(value) {
            _setMessageHost(value);
        },

        get messagePort() {
            return _getMessagePort();
        },
        set messagePort(value) {
            _setMessagePort(value);
        },

        get baseUrl() {
            return phAjax.host + ":" + phAjax.port + "/api/";
        },

        get baseMessageUrl() {
            return phAjax.messageHost + ":" + phAjax.messagePort;
        },

        get securityUrl() {
            return phAjax.baseUrl + "Security";
        },

        get dataUrl() {
            return phAjax.baseUrl + "Data";
        },

        get messageUrl() {
            return phAjax.baseUrl + "Message";
        },

        getIdentity: function(options) {
            var defaults = {
                onSuccess: null, //调用成功的回调函数, 参数(result)为用户身份信息
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        isByDeny: function(options) {
            var defaults = {
                typeName: null, //标识服务端type名称
                actionName: null, //标识服务端type的action名称
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否拒绝访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.securityUrl +
                    "?typeName=" + encodeURIComponent(options.typeName) + "&actionName=" + encodeURIComponent(options.actionName),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        logOn: function(userNumber, password, onComplete, onError) {
            phAjax.logOnVerify(userNumber, password, new Date().toISOString(), onComplete, onError);
        },

        logOnVerify: function(userNumber, password, tag, onComplete, onError) {
            var key = CryptoJS.MD5(password);
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _initComplexAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
                },
                data: _encrypt(tag, key).toString(),
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        _setUserNumber(userNumber);
                        _setKey(key);
                    } else {
                        if (typeof onError == "function")
                            onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        changePassword: function(userNumber, password, newPassword, onComplete, onError) {
            var key = CryptoJS.MD5(password);
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _initComplexAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
                    _setPutOverrideHeader(XMLHttpRequest);
                },
                data: _encrypt(newPassword, key).toString(),
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        _setUserNumber(userNumber);
                        _setKey(CryptoJS.MD5(newPassword));
                    } else {
                        if (typeof onError == "function")
                            onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        logOff: function(onComplete) {
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                    _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: {},
                complete: function(XMLHttpRequest, textStatus) {
                    _setUserNumber('Guest');
                    _setKey(CryptoJS.MD5('Guest'));
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        getSequenceValue: function(options) {
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
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(value) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(value);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        canFetch: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体/实体集合类全名(须实现IEntity/IEntityCollection接口)
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.dataName,
                actionName: "Fetch",
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        fetch: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体类全名(须实现IEntity接口)
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
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(data) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(data);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        getRecordCount: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类全名(须实现IEntityCollection接口)
                masterName: null, //主对象名, 在服务端注册的实体类全名(须实现IEntity接口)
                masterId: null, //主对象主键值
                groupName: null, //分组名, null代表全部
                criteriaName: null, //条件名, 在服务端定义的条件类全名(须实现ICriteria接口)
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
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(count) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(count);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        fetchList: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类全名(须实现IEntityCollection接口)
                masterName: null, //主对象名, 在服务端注册的实体类全名(须实现IEntity接口)
                masterId: null, //主对象主键值
                groupName: null, //分组名, null代表全部
                criteriaName: null, //条件名, 在服务端定义的条件类全名(须实现ICriteria接口)
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
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(data) {
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
                                onSuccess: function(count) {
                                    options.onSuccess(data, count);
                                },
                                onError: options.onError,
                            });
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        canSave: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体/实体集合类全名(须实现IEntity/IEntityCollection接口)
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.dataName,
                actionName: "All",
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        save: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类/实体类全名(须实现IEntityCollection/IEntity接口)
                data: null, //传到服务端的数据, 须包含IsNew、IsSelfDeleted、IsSelfDirty属性以指明对象状态
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
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function(count) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(count);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        canExecute: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.serviceName,
                actionName: "Update",
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        execute: function(options) {
            var defaults = {
            	disHead : false,	//是否禁用头
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
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
                beforeSend: function(XMLHttpRequest) {
                	if(!options.disHead)
                    	_setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        uploadFiles: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                files: null, //传到服务端的文件(须是FileList/File对象(如果APP应用是本地图片，要么转成base64->File对象，要么转成网络图片->base64->File对象))
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            if (options.files != null)
                if (options.files instanceof FileList) {
                    for (var i = 0; i < options.files.length; i++) {
                        formData.append("file", options.files[i], options.files[i].name);
                    };
                } else {
                    formData.append("file", options.files, options.files.name);
                };
            $.ajax({
                type: "POST",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.serviceName),
                dataType: "JSON",
                processData: false, //不要对data参数进行序列化处理，默认为true
                contentType: false, //不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: formData,
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        uploadBigFiles: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                files: null, //传到服务端的文件(须是FileList/File对象(如果APP应用是本地图片，要么转成base64->File对象，要么转成网络图片->base64->File对象))
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(result, fileName, chunkCount, chunkNumber, chunkSize)中result为返回的数据，函数调用返回值如为false则中止上传
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (options.files != null)
                if (options.files instanceof FileList) {
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
                } else {
                    phAjax.uploadChunkInfo({
                        serviceName: options.serviceName,
                        data: options.data,
                        file: options.files,
                        chunkCount: phUtils.getChunkCount(options.files.size),
                        chunkNumber: 1,
                        timeout: options.timeout,
                        onProgress: options.onProgress,
                        onSuccess: options.onSuccess,
                        onError: options.onError,
                    });
                };
        },

        uploadChunkInfo: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                file: null, //传到服务端的文件(须是File对象(如果APP应用是本地图片，要么转成base64->File对象，要么转成网络图片->base64->File对象))
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
            formData.append("chunkInfo", JSON.stringify({ FileName: fileChunkInfo.fileName, ChunkCount: fileChunkInfo.chunkCount, ChunkNumber: fileChunkInfo.chunkNumber, ChunkSize: fileChunkInfo.chunkSize }));
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
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: formData,
                success: function(result) {
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
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        downloadFile: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
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
            _setComplexAuthorizationHeader(xhr, "", false);
            xhr.onload = function() {
                if (this.status == 200) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(this.response);
                } else {
                    if (typeof options.onError == "function")
                        options.onError(this, this.textStatus, new Error(this.responseText));
                }
            };
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            formData.append("chunkNumber", "0");
            xhr.send(formData);
        },

        downloadBigFile: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                chunkNumber: 1, //传到服务端的块号
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(fileName, chunkCount, chunkNumber, chunkSize, chunkBuffer)，函数调用返回值如为false则中止下载
                onSuccess: null, //调用成功的回调函数, 参数(fileName, chunkCount)
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", phAjax.dataUrl + "/" + encodeURIComponent(options.serviceName));
            xhr.responseType = "json";
            xhr.withCredentials = true;
            xhr.timeout = options.timeout;
            _setComplexAuthorizationHeader(xhr, "", false);
            xhr.onload = function() {
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
                } else {
                    if (typeof options.onError == "function")
                        options.onError(this, this.textStatus, new Error(this.responseText));
                }
            };
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            formData.append("chunkNumber", options.chunkNumber);
            xhr.send(formData);
        },

        sendMessage: function(options) {
            var defaults = {
                receiver: null, //接收工号
                content: null, //消息内容
                dataVerify: false, //数据需核实
                dataEncrypt: false, //数据需加密
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (typeof options.content != "string")
                options.content = JSON.stringify(options.content);
            $.ajax({
                type: "POST",
                url: phAjax.messageUrl +
                    "?receiver=" + encodeURIComponent(options.receiver),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.content) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.content, _getKey()).toString() : options.content,
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        if (typeof options.onSuccess == "function")
                            options.onSuccess();
                    } else {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        receiveMessage: function(options) {
            var defaults = {
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(messages)为返回的消息id(key)+content(array[key])数据字典集合
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.messageUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(messages) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(messages);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        affirmReceivedMessage: function(options) {
            var defaults = {
                id: null,  //消息id, 即receive函数onSuccess事件参数messages的key值
                burn: true, //默认阅后即焚
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "POST",
                url: phAjax.messageUrl +
                    "?id=" + options.id + "&burn=" + options.burn,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                    _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: {},
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        if (typeof options.onSuccess == "function")
                            options.onSuccess();
                    } else {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        subscribeMessage: function(options) {
            var defaults = {
                onReceived: null, //处理收到消息, 参数(messages)为消息id(key)+content(array[key])数据字典集合
                onError: null, //处理收到错误消息, 参数(text)为错误消息文本
                onDone: null, //调用成功的回调函数
                onFail: null, //调用失败的回调函数, 参数(error)
            };
            options = $.extend(defaults, options);
            var connection = $.hubConnection(phAjax.baseMessageUrl);
            connection.qs = _formatSimpleAuthorization();
            connection.createHubProxy('messageHub')
                .on('onReceived',
                    function(messages) { if (typeof options.onReceived == "function") options.onReceived(messages); })
                .on('onError',
                    function(text) { if (typeof options.onError == "function") options.onError(text); });
            connection.start()
                .done(function() { if (typeof options.onDone == "function") options.onDone(); })
                .fail(function(error) { if (typeof options.onFail == "function") options.onFail(error); });
        },

        canCall: function(options) {
            var defaults = {
                controllerName: null, //标识服务端ApiController名称
                actionName: "Get", //标识服务端ApiController函数名
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.controllerName,
                actionName: options.actionName,
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        ajax: function(options) {
            var defaults = {
                anonymity: false, //是否匿名访问
                type: "GET", //请求方法(GET/POST/PUT/DELETE)
                uri: null, //标识服务端ApiController名称/函数名及其参数(名称/函数名?参数1=值&参数2=值...)
                data: null, //传到服务端的数据
                dataVerify: false, //数据需核实(匿名访问时无效)
                dataEncrypt: false, //数据需加密(匿名访问时无效)
                cache: false, //默认不缓存
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onComplete: null, //调用完整的回调函数, 参数(XMLHttpRequest, textStatus)
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
                cache: options.cache,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    if (!options.anonymity)
                        _setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                    if (options.type == "PUT")
                        _setPutOverrideHeader(XMLHttpRequest);
                    else if (options.type == "DELETE")
                        _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: !options.anonymity && options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                    if (typeof options.onComplete == "function")
                        options.onComplete(XMLHttpRequest, textStatus);
                },
            });
        },
    }
})(jQuery);

/*
    工具集
*/
var phUtils = (function() {
    var CHUNK_MAX_SIZE = 1024 * 1024;
    return {
        getChunkCount: function(fileSize) {
            return Math.ceil(fileSize / CHUNK_MAX_SIZE);
        },

        readChunkInfo: function(file, chunkCount, chunkNumber) {
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
                result.chunkSize = chunkNumber < chunkCount
                    ? CHUNK_MAX_SIZE
                    : file.size - CHUNK_MAX_SIZE * (chunkCount - 1);
                var strat = CHUNK_MAX_SIZE * (chunkNumber - 1);
                result.chunkBuffer = file.slice(strat, strat + result.chunkSize);
            };
            return result;
        },

        toObject: function(nameValues) {
            var result = {};
            nameValues.map(function(item) { result[item.name] = item.value; });
            return result;
        },
    }
})();