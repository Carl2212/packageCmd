import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DesService } from '../core/providers/des.service';
import { CoreStore } from '../core/core.store';
var AuthService = (function () {
    function AuthService(desService, http, store) {
        this.desService = desService;
        this.http = http;
        this.store = store;
        this.stateChange = new EventEmitter();
        this.setHeader();
        this.setState();
    }
    AuthService.prototype.setState = function () {
        this.state = 1;
        if (this.checkContext()) {
            this.state = 3;
        }
        else if (this.checkServer()) {
            this.state = 2;
        }
    };
    AuthService.prototype.setHeader = function () {
        var context = this.store.clientContext;
        var token = this.store.authentication || null;
        if (token) {
            token = this.getSessionToken(token);
        }
        var headers = new HttpHeaders()
            .set("Client-Context", JSON.stringify(context))
            .set('Authorization', token);
        this.store.headers = headers;
    };
    AuthService.prototype.checkServer = function () {
        console.log(this.store.user, this.store.server);
        if (this.store.server) {
            return true;
        }
        else {
            console.log('checkServer', this.store.server);
            return false;
        }
    };
    AuthService.prototype.setServer = function (server) {
        this.store.server = server;
    };
    AuthService.prototype.getServer = function () {
        return this.store.server;
    };
    AuthService.prototype.checkToken = function () {
        var token = this.store.authentication;
        if (token) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.setToken = function (token) {
        this.store.authentication = token;
        this.setHeader();
    };
    AuthService.prototype.getSessionToken = function (token) {
        return "Bearer " + token;
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var params = new HttpParams()
            .set('username', username)
            .set('password', password);
        return new Promise(function (resolve, reject) {
            _this.http.get('login', { params: params })
                .subscribe(function (res) {
                _this.setToken(res);
                _this.state = 2;
                _this.stateChange.emit(2);
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthService.prototype.logout = function () {
        this.store.reset();
    };
    AuthService.prototype.getUser = function () {
        return this.store.user;
    };
    AuthService.prototype.setUser = function () {
        var _this = this;
        this.http.get('userInfo')
            .subscribe(function (user) {
            _this.store.user = user;
        });
    };
    AuthService.prototype.setLoginInfo = function (user) {
        if (user) {
            var encodePwd = user.password;
            if (user.password.length <= 20) {
                encodePwd = this.desService.encrypt(user.password);
            }
            var loginInfo = {
                name: user.name,
                password: encodePwd
            };
            this.store.loginInfo = loginInfo;
        }
        else {
            this.store.loginInfo = null;
        }
    };
    AuthService.prototype.getLoginInfo = function () {
        var info = this.store.loginInfo;
        if (info && info.password) {
            info.password = this.desService.decrypt(info.password);
        }
        return info;
    };
    AuthService.prototype.setCompanyRole = function (company, role) {
        this.store.companyRole = {
            company: company,
            role: role
        };
    };
    AuthService.prototype.getCompanyRole = function () {
        return this.store.companyRole;
    };
    AuthService.prototype.checkCompany = function (companyCode, companyId, clientId, roleId) {
        var _this = this;
        var context = this.store.clientContext;
        context.companyCode = companyCode;
        context.signedInClientId = companyId;
        context.clientId = clientId;
        context.permissionClientId = clientId;
        context.permissionRoleId = roleId;
        var params = new HttpParams()
            .set('requestedCompanyId', clientId.toString())
            .set('requestedPermissionClientId', clientId.toString())
            .set('requestedSignedInCompanyId', companyId.toString())
            .set('requestedRoleId', roleId.toString());
        return new Promise(function (resolve, reject) {
            _this.http.get('checkCompany', { params: params })
                .subscribe(function (res) {
                if (res.isValid) {
                    resolve(true);
                    _this.state = 3;
                    if (_this.checkContext()) {
                        _this.stateChange.emit(32);
                    }
                    else {
                        _this.stateChange.emit(_this.state);
                    }
                    _this.store.clientContext = context;
                    _this.setHeader();
                }
                else {
                    resolve(false);
                }
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthService.prototype.checkContext = function () {
        var context = this.store.clientContext;
        if (context && context['signedInClientId'] !== 0) {
            return {
                clientId: context['signedInClientId'],
                roleId: context['permissionRoleId']
            };
        }
        else {
            return false;
        }
    };
    AuthService.prototype.changeLang = function (language, culture) {
        var context = this.store.clientContext;
        context.language = language;
        context.culture = culture;
        this.store.clientContext = context;
        this.store.language = language;
        //this.setHeader();
    };
    //登录或者切换账号
    AuthService.prototype.loginWithProfile = function (profile) {
        var _this = this;
        this.setServer(profile.server);
        var password = this.desService.decrypt(profile.loginInfo.password);
        return this.login(profile.loginInfo.name, password)
            .then(function () {
            if (profile.clientContext.companyCode) {
                var _a = profile.clientContext, companyCode = _a.companyCode, signedInClientId = _a.signedInClientId, clientId = _a.clientId, permissionRoleId = _a.permissionRoleId;
                return _this.checkCompany(companyCode, signedInClientId, clientId, permissionRoleId);
            }
            else {
                return new Promise(function (resolve) { resolve(true); });
            }
        })
            .then(function () { return new Promise(function (resolve) {
            _this.setUser();
            _this.setLoginInfo(profile.loginInfo);
            _this.setCompanyRole(profile.companyRole.company, profile.companyRole.role);
            resolve(true);
        }); });
    };
    return AuthService;
}());
export { AuthService };
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = function () { return [
    { type: DesService, },
    { type: HttpClient, },
    { type: CoreStore, },
]; };
//# sourceMappingURL=auth.service.js.map