import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { deepEqual, deepCopy } from "ionic-angular/es2015/util/util";
import { CoreStore } from "../../core.store";
import { ProfileShareService } from "./profileShare.service";
import { ProfileStore, PROFILETICKET } from "./profile.store";
import { NativeStorage } from "@ionic-native/native-storage";
import { Platform } from "ionic-angular";
var ProfileService = (function () {
    function ProfileService(pfStore, http, profileShareService, store, nativeStorage, platform) {
        this.pfStore = pfStore;
        this.http = http;
        this.profileShareService = profileShareService;
        this.store = store;
        this.nativeStorage = nativeStorage;
        this.platform = platform;
        this.encryptionKey = 'MobilityProfile';
        this.accountName = 'ItwoProfile';
        this.accountPassword = 'PROFILE';
        this.accountType = 'com.two.mobility.shareAccount'; //
        this.group = 'R3XEVK9SPG.com.two.mobility.shareAccount';
        this.checkCompanySuccess = new EventEmitter();
        this.profileDataKey = ['loginProfileName', 'profilegroup'];
    }
    Object.defineProperty(ProfileService.prototype, "profilegroup", {
        get: function () {
            return this._profilegroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileService.prototype, "loginProfileName", {
        get: function () {
            return this._loginProfileName;
        },
        enumerable: true,
        configurable: true
    });
    //before all store usage
    ProfileService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.store.enableProfile) {
                _this.init().then(function (data) {
                    var profile = _this._profilegroup
                        .find(function (p) { return p.name == _this._loginProfileName; });
                    if (profile && profile.authentication != _this.store.authentication) {
                        for (var k in profile) {
                            _this.store[k] = profile[k];
                        }
                    }
                    resolve(true);
                }, function (err) { return resolve(true); });
            }
            else {
                resolve(true);
            }
        });
    };
    ProfileService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.profileShareService.initPlatform(_this.encryptionKey, _this.accountType, _this.group);
            var promiseArray = [];
            _this.profileDataKey.forEach(function (key) {
                var promise = _this.profileShareService.getDataFromKey(key);
                promiseArray.push(promise);
                promise.then(function (data) { return _this["_" + key] = JSON.parse(data); }, function (err) { return _this["_" + key] = null; });
            });
            return _this.profileShareService.getUserAccount()
                .then(function () { return Promise.all(promiseArray); })
                .then(function (data) {
                console.log('registerAccount', data);
                _this.backups();
                resolve(data);
            }, function (error) {
                console.log('registerAccount', error);
                _this.profileShareService.registerAccount(_this.accountName, _this.accountPassword)
                    .then(function (data) {
                    console.log('registerAccount', data);
                    _this.restoreBackups();
                });
                reject(error);
            });
        });
    };
    ProfileService.prototype.restoreBackups = function () {
        var _this = this;
        if (this.platform.is('android')) {
            this.nativeStorage.getItem(this.accountName)
                .then(function (data) {
                if (data) {
                    _this.profileShareService
                        .setUserData(data)
                        .then(function () { return _this.init(); });
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    ProfileService.prototype.backups = function () {
        var _this = this;
        if (this.platform.is('android')) {
            var data_1 = {};
            this.profileDataKey.forEach(function (v) {
                data_1[v] = JSON.stringify(_this["_" + v]);
            });
            this.nativeStorage.setItem(this.accountName, data_1);
        }
    };
    ProfileService.prototype.setProfileData = function () {
        var _this = this;
        var data = {};
        this.profileDataKey.forEach(function (v) {
            data[v] = JSON.stringify(_this["_" + v]);
        });
        return this.profileShareService
            .setUserData(data);
    };
    ProfileService.prototype.createProfile = function (profile) {
        if (profile === void 0) { profile = null; }
        //激发一个实例
        this._actionIndex = null;
        this.pfStore.init(profile);
        if (profile && profile.name) {
            this._actionIndex = this._profilegroup.findIndex(function (p) { return p.name == profile.name; });
        }
    };
    ProfileService.prototype.saveProfile = function () {
        var _this = this;
        var store = this.pfStore.getCurrentStruct();
        if (this.isUnique(store, this.getUniqueCompareProfilegroup()) > -1) {
            return new Promise(function (resolve, reject) { return reject(1); });
        }
        var promise;
        if (this.pfStore.userAction != 'company') {
            //checklogin
            promise = this.checklogin(this.pfStore.server, this.pfStore.loginName, this.pfStore.password);
            //checkcompany
            if (this.pfStore.clientContext) {
                var l_1 = this.pfStore.clientContext;
                promise = promise.then(function () {
                    return _this.checkCompany(l_1.companyCode, l_1.signedInClientId, l_1.clientId, l_1.permissionRoleId);
                });
            }
        }
        //setUser
        if (promise) {
            promise = promise.then(function () { return _this.setUser(); });
        }
        else {
            promise = this.setUser();
        }
        //setProfileData
        promise.then(function (data) {
            store = _this.pfStore.getCurrentStruct();
            _this._profilegroup = _this._profilegroup || [];
            _this._actionIndex = _this._actionIndex || _this.profilegroup.length;
            _this._profilegroup[_this._actionIndex] = store;
            _this.setProfileData();
        }).catch(function (err) { console.log(err); });
        return promise;
    };
    ProfileService.prototype.delProfile = function (profile) {
        if (!profile) {
            this._profilegroup = null;
            this._loginProfileName = null;
            return this.profileShareService.removeAccount(this.accountType);
        }
        else {
            var index = this.profilegroup.findIndex(function (p) { return p.name == profile.name; });
            this.profilegroup.splice(index, 1);
            return this.setProfileData();
        }
    };
    ProfileService.prototype.getUniqueCompareProfilegroup = function () {
        if (this._actionIndex) {
            var p = deepCopy(this._profilegroup);
            p.splice(this._actionIndex, 1);
            return p;
        }
        return this._profilegroup;
    };
    ProfileService.prototype.login = function (profile) {
        profile.authentication = this.store.authentication;
        this._loginProfileName = profile.name;
        return this.setProfileData();
    };
    ProfileService.prototype.resetLogin = function () {
        this._loginProfileName = null;
    };
    ProfileService.prototype.checklogin = function (server, username, password) {
        var _this = this;
        var params = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.get("login" + PROFILETICKET, { params: params })
            .toPromise()
            .then(function (res) { return new Promise(function (resolve) {
            _this.setToken(res);
            resolve(res);
        }); });
    };
    ProfileService.prototype.setCompanyRole = function (company, role) {
        this.pfStore.company = company;
        this.pfStore.role = role;
    };
    ProfileService.prototype.checkCompany = function (companyCode, companyId, clientId, roleId) {
        var _this = this;
        var context = this.pfStore.clientContext;
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
        return this.http.get("checkCompany" + PROFILETICKET, { params: params })
            .toPromise()
            .then(function (res) { return new Promise(function (resolve) {
            if (res.isValid) {
                _this.pfStore.clientContext = context;
                _this.setHeader();
                _this.checkCompanySuccess.emit(true);
                resolve(true);
            }
            else {
                resolve(false);
            }
        }); });
    };
    ProfileService.prototype.checkContext = function () {
        var context = this.pfStore.clientContext;
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
    ProfileService.prototype.getUser = function () {
        return this.pfStore.user;
    };
    ProfileService.prototype.setUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('userInfo')
                .subscribe(function (user) {
                _this.pfStore.user = user;
                resolve(true);
            }, function (err) {
                reject(err);
            });
        });
    };
    ProfileService.prototype.setToken = function (token) {
        this.pfStore.authentication = token;
        this.setHeader();
    };
    ProfileService.prototype.getSessionToken = function (token) {
        return "Bearer " + token;
    };
    ProfileService.prototype.setHeader = function () {
        var context = this.pfStore.clientContext;
        var token = this.pfStore.authentication || null;
        if (token) {
            token = this.getSessionToken(token);
        }
        var headers = new HttpHeaders()
            .set("Client-Context", JSON.stringify(context))
            .set('Authorization', token);
        this.pfStore.headers = headers;
    };
    ProfileService.prototype.isUnique = function (profile, sourceProfiles) {
        if (sourceProfiles === void 0) { sourceProfiles = this._profilegroup; }
        sourceProfiles = sourceProfiles || [];
        var index = sourceProfiles.findIndex(function (p) {
            return (deepEqual(p.loginInfo, profile.loginInfo) &&
                p.server == profile.server &&
                p.clientContext.clientId == profile.clientContext.clientId &&
                p.clientContext.permissionRoleId == profile.clientContext.permissionRoleId);
        });
        return index;
    };
    return ProfileService;
}());
export { ProfileService };
ProfileService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ProfileService.ctorParameters = function () { return [
    { type: ProfileStore, },
    { type: HttpClient, },
    { type: ProfileShareService, },
    { type: CoreStore, },
    { type: NativeStorage, },
    { type: Platform, },
]; };
//# sourceMappingURL=profile.service.js.map