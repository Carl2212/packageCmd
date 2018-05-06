import { HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { deepCopy } from 'ionic-angular/util/util';
export var CONTEXT = {
    "companyCode": "",
    "signedInClientId": 0,
    "clientId": 0,
    "permissionClientId": 0,
    "permissionRoleId": 0,
    "dataLanguageId": 1,
    "language": "en",
    "culture": "en-gb"
};
var CoreStore = (function () {
    function CoreStore() {
        this._server = '';
        this._clientContext = CONTEXT;
        this._authentication = '';
        this._loginInfo = null;
        this._user = null;
        this._headers = new HttpHeaders();
        this._language = '';
        this._isShowWelcome = null;
        this._lastAppVersion = null;
        this._enableProfile = null;
        this._companyRole = null;
        this.onChange = new EventEmitter();
        this.tokenExpire = new EventEmitter();
    }
    Object.defineProperty(CoreStore.prototype, "api", {
        get: function () {
            return deepCopy(this._api);
        },
        set: function (api) {
            this._api = api;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "time", {
        get: function () {
            return deepCopy(this._time);
        },
        set: function (time) {
            this._time = time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (headers) {
            this._headers = headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "server", {
        get: function () {
            return deepCopy(this._server);
        },
        set: function (server) {
            this._server = server;
            this.onChange.emit({
                name: 'server',
                value: server
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "clientContext", {
        get: function () {
            return deepCopy(this._clientContext);
        },
        set: function (context) {
            this._clientContext = context;
            this.onChange.emit({
                name: 'clientContext',
                value: context
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "authentication", {
        get: function () {
            return deepCopy(this._authentication);
        },
        set: function (token) {
            this._authentication = token;
            this.onChange.emit({
                name: 'authentication',
                value: token
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "loginInfo", {
        get: function () {
            return deepCopy(this._loginInfo);
        },
        set: function (loginInfo) {
            this._loginInfo = loginInfo;
            this.onChange.emit({
                name: 'loginInfo',
                value: loginInfo
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "user", {
        get: function () {
            return deepCopy(this._user);
        },
        set: function (user) {
            this._user = user;
            this.onChange.emit({
                name: 'user',
                value: user
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "language", {
        get: function () {
            return deepCopy(this._language);
        },
        set: function (lang) {
            this._language = lang;
            this.onChange.emit({
                name: 'language',
                value: lang
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "isShowWelcome", {
        get: function () {
            return deepCopy(this._isShowWelcome);
        },
        set: function (show) {
            this._isShowWelcome = show;
            this.onChange.emit({
                name: 'isShowWelcome',
                value: show
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "lastAppVersion", {
        get: function () {
            return deepCopy(this._lastAppVersion);
        },
        set: function (data) {
            this._lastAppVersion = data;
            this.onChange.emit({
                name: 'lastAppVersion',
                value: data
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "enableProfile", {
        get: function () {
            return deepCopy(this._enableProfile);
        },
        set: function (enable) {
            this._enableProfile = enable;
            this.onChange.emit({
                name: 'enableProfile',
                value: enable
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStore.prototype, "companyRole", {
        get: function () {
            return deepCopy(this._companyRole);
        },
        set: function (data) {
            this._companyRole = data;
            this.onChange.emit({
                name: 'companyRole',
                value: data
            });
        },
        enumerable: true,
        configurable: true
    });
    CoreStore.prototype.reset = function () {
        this.clientContext = CONTEXT;
        this.authentication = '';
        this.loginInfo = null;
        this.user = null;
        this.headers = new HttpHeaders();
    };
    CoreStore.prototype.new = function (property) {
        var _this = this;
        var name = "_" + property;
        Object.defineProperty(this, property, {
            set: function (data) {
                _this[name] = data;
                _this.onChange.emit({
                    name: property,
                    value: data
                });
            },
            get: function () {
                return _this[name];
            },
            enumerable: true,
            configurable: true
        });
    };
    return CoreStore;
}());
export { CoreStore };
//# sourceMappingURL=core.store.js.map