//profile 标示 用于在各种地方区分的字段
import { HttpHeaders } from "@angular/common/http";
import { CONTEXT } from "../../core.store";
import { Injectable } from "@angular/core";
import { DesService } from "../des.service";
import { deepCopy } from "ionic-angular/es2015/util/util";
export var PROFILETICKET = '@PROFILETICKET';
var ProfileStore = (function () {
    function ProfileStore(desService) {
        this.desService = desService;
        this._headers = new HttpHeaders();
        this._clientContext = CONTEXT;
        this._authentication = '';
    }
    ProfileStore.prototype.init = function (profile) {
        if (profile) {
            this._name = deepCopy(profile.name);
            this._server = deepCopy(profile.server);
            this._user = deepCopy(profile.user);
            this._loginName = deepCopy(profile.loginInfo.name);
            this._password = deepCopy(this.desService.decrypt(profile.loginInfo.password));
            this._company = deepCopy(profile.companyRole.company);
            this._role = deepCopy(profile.companyRole.role);
            this._clientContext = deepCopy(profile.clientContext);
            this._authentication = deepCopy(profile.authentication);
            this._headers = new HttpHeaders();
        }
        else {
            this.reset();
        }
        this._userAction = null;
    };
    ProfileStore.prototype.reset = function () {
        this._name = null;
        this._server = null;
        this._user = null;
        this._loginName = null;
        this._password = null;
        this._company = null;
        this._role = null;
        this._headers = new HttpHeaders();
        this._clientContext = CONTEXT;
        this._authentication = '';
    };
    Object.defineProperty(ProfileStore.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (data) {
            this._name = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (data) {
            this._user = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "loginName", {
        get: function () {
            return this._loginName;
        },
        set: function (data) {
            this._loginName = data;
            this._userAction = 'loginName';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (data) {
            this._password = data;
            this._userAction = 'password';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "server", {
        get: function () {
            return this._server;
        },
        set: function (data) {
            this._server = data;
            this._userAction = 'server';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "company", {
        get: function () {
            return this._company;
        },
        set: function (data) {
            this._company = data;
            this._userAction = 'company';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "role", {
        get: function () {
            return this._role;
        },
        set: function (data) {
            this._role = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (data) {
            this._headers = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "authentication", {
        get: function () {
            return this._authentication;
        },
        set: function (data) {
            this._authentication = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "clientContext", {
        get: function () {
            return this._clientContext;
        },
        set: function (data) {
            this._clientContext = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileStore.prototype, "userAction", {
        get: function () {
            return this._userAction;
        },
        enumerable: true,
        configurable: true
    });
    ProfileStore.prototype.getCurrentStruct = function () {
        return {
            name: this.name,
            user: this.user,
            loginInfo: { name: this.loginName, password: this.desService.encrypt(this.password) },
            server: this.server,
            companyRole: { company: this.company, role: this.role },
            authentication: this.authentication,
            clientContext: this.clientContext
        };
    };
    return ProfileStore;
}());
export { ProfileStore };
ProfileStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ProfileStore.ctorParameters = function () { return [
    { type: DesService, },
]; };
//# sourceMappingURL=profile.store.js.map