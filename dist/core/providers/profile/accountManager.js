var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Plugin, IonicNativePlugin, Cordova } from "@ionic-native/core";
var AccountManager = (function (_super) {
    __extends(AccountManager, _super);
    function AccountManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountManager.prototype.initWithKey = function (encryptionKey) { return; };
    AccountManager.prototype.registerAccount = function (userName, password, accountType, group, userData) { return; };
    /**
     *  remove an account from Account Manager (Android) and remove all data from keychain (iOS)
     * @param accountType
     */
    AccountManager.prototype.removeAccount = function (accountType) { return; };
    AccountManager.prototype.getUserAccount = function (accountType, group, returnKey) { return; };
    AccountManager.prototype.getPassword = function (accountType, group, key) { return; };
    AccountManager.prototype.getDataFromKey = function (accountType, group, key) { return; };
    AccountManager.prototype.setUserData = function (accountType, group, data) { return; };
    AccountManager.prototype.setPassword = function (accountType, group, newPassword) { return; };
    AccountManager.prototype.resetPassword = function (accountType, group) { return; };
    return AccountManager;
}(IonicNativePlugin));
AccountManager.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AccountManager.ctorParameters = function () { return []; };
__decorate([
    Cordova({
        successIndex: 1,
        errorIndex: 2
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "initWithKey", null);
__decorate([
    Cordova({
        successIndex: 5,
        errorIndex: 6
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "registerAccount", null);
__decorate([
    Cordova({
        successIndex: 1,
        errorIndex: 2
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "removeAccount", null);
__decorate([
    Cordova({
        successIndex: 3,
        errorIndex: 4
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "getUserAccount", null);
__decorate([
    Cordova({
        successIndex: 3,
        errorIndex: 4
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "getPassword", null);
__decorate([
    Cordova({
        successIndex: 3,
        errorIndex: 4
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "getDataFromKey", null);
__decorate([
    Cordova({
        successIndex: 3,
        errorIndex: 4
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "setUserData", null);
__decorate([
    Cordova({
        successIndex: 3,
        errorIndex: 4
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "setPassword", null);
__decorate([
    Cordova({
        successIndex: 2,
        errorIndex: 3
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "resetPassword", null);
AccountManager = __decorate([
    Plugin({
        pluginName: 'AccountManager',
        plugin: 'cordova-plugin-kunder-accountmanager',
        pluginRef: 'AccountManager',
        platforms: ['Android', 'iOS']
    })
], AccountManager);
export { AccountManager };
//# sourceMappingURL=accountManager.js.map