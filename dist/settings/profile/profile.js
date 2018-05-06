import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ProfileEdit } from "./Edit/profileEdit";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { CoreStore } from "../../core/core.store";
import { AuthService } from "../../auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../config";
import { LoadingService } from "../../core/providers/loading.service";
var FIRST_LOAD_PROFILE = true;
var Profile = (function () {
    function Profile(navCtrl, pfService, store, authSerivice, tlService, alertCtrl, settingService, loading) {
        this.navCtrl = navCtrl;
        this.pfService = pfService;
        this.store = store;
        this.authSerivice = authSerivice;
        this.tlService = tlService;
        this.alertCtrl = alertCtrl;
        this.settingService = settingService;
        this.loading = loading;
        this.profileEdit = ProfileEdit;
    }
    Profile.isFirstLoad = function () {
        var tmp = FIRST_LOAD_PROFILE;
        FIRST_LOAD_PROFILE = false;
        return tmp;
    };
    Profile.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.settingService.isFirstLaunch && Profile.isFirstLoad()) {
            this.tlService.get('profile')
                .subscribe(function (res) {
                _this.alertCtrl.create({
                    title: res.tipTitle,
                    message: res.tipMessageP1 + " \n " + res.tipMessageP2,
                    buttons: ['ok']
                }).present();
            });
        }
    };
    Profile.prototype.addTypeChange = function (type) {
        var _this = this;
        var profile = null;
        if (type == 1) {
            var loginInfo = this.store.loginInfo;
            var companyRole = this.authSerivice.getCompanyRole();
            profile = {
                name: null,
                user: null,
                server: this.authSerivice.getServer(),
                loginInfo: loginInfo,
                companyRole: companyRole,
                clientContext: this.store.clientContext,
                authentication: this.store.authentication
            };
        }
        var params = { editStatus: 1, profile: profile };
        this.navCtrl.push(ProfileEdit, params);
        setTimeout(function () {
            _this.addType = null;
        }, 0);
    };
    Profile.prototype.del = function (profile) {
        var _this = this;
        this.tlService.get(['profile', 'common', 'http'])
            .subscribe(function (res) {
            var p = _this.alertCtrl.create({
                title: res.profile.delTip,
                buttons: [
                    {
                        text: res.common.cancel,
                        role: 'cancel'
                    },
                    {
                        text: res.common.ok,
                        handler: function () {
                            _this.pfService.delProfile(profile);
                        }
                    }
                ]
            });
            p.present();
        });
    };
    Profile.prototype.toggleProfile = function (profile) {
        var _this = this;
        this.loading.create().present();
        this.authSerivice.loginWithProfile(profile)
            .then(function () {
            _this.pfService.login(profile);
            _this.loading.dismiss();
        })
            .catch(function () { return _this.loading.dismiss(); });
    };
    Profile.prototype.enableProfile = function ($event) {
        var _this = this;
        if ($event) {
            this.pfService.init()
                .then(function (data) {
                _this.pfService.resetLogin();
            }).catch(function () { });
        }
    };
    return Profile;
}());
export { Profile };
Profile.decorators = [
    { type: Component, args: [{
                selector: 'profile',
                template: "\n    <ion-header>\n      <ion-toolbar color=\"white\">\n        <ion-title>{{'setting.profile' | translate}}</ion-title>\n        <ion-buttons end *ngIf=\"store.enableProfile\">\n          <button ion-button clear color=\"primary\" *ngIf=\"pfService?.profilegroup\" (click)=\"del()\" margin-right>\n            <ion-icon name=\"trash\"></ion-icon>\n          </button>\n          <button ion-button clear color=\"primary\" class=\"popover-icon-only\">\n            <ion-icon name=\"plus\"></ion-icon>\n            <ion-select interface=\"popover\" [(ngModel)]=\"addType\" (ngModelChange)=\"addTypeChange($event)\">\n              <ion-option  value=\"1\"> {{'profile.addfromlogin' | translate}}</ion-option>\n              <ion-option  value=\"2\"> {{'profile.addbymanual' | translate}}</ion-option>\n            </ion-select>\n          </button>\n        </ion-buttons>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <ion-list no-margin>\n        <ion-item tappable>\n          <ion-label>{{(!store.enableProfile ? 'profile.disabled' : 'profile.enabled') | translate}}</ion-label>\n          <ion-toggle item-right [(ngModel)]=\"store.enableProfile\" (ngModelChange)=\"enableProfile($event)\"></ion-toggle>\n        </ion-item>\n        <ion-item *ngIf=\"!store.enableProfile\" no-lines text-wrap>\n          <ion-note>\n            {{'profile.description' | translate}}\n          </ion-note>\n        </ion-item>\n        <ng-template [ngIf]=\"store.enableProfile && pfService?.profilegroup\">\n          <ion-item-sliding *ngFor=\"let l of pfService?.profilegroup\" #slidingItem>\n            <ion-item tappable (click)=\"toggleProfile(l)\">\n              <ion-icon color=\"primary\" item-left name=\"globe\">\n                <ion-icon name=\"checkmark-circle-filled\" color=\"balanced\" *ngIf=\"pfService.loginProfileName == l.name\"></ion-icon>\n              </ion-icon>\n              <ion-label> {{l.name}} </ion-label>\n              <ion-icon item-right name=\"arrow-forward-thin\"></ion-icon>\n\n            </ion-item>\n            <ion-item-options side=\"right\">\n              <button ion-button [navPush]=\"profileEdit\" [navParams]=\"{editStatus : 2 , profile : l}\" (click)=\"slidingItem.close()\">\n                <ion-icon name=\"edit\"></ion-icon>\n              </button>\n              <button ion-button color=\"danger\" (click)=\"del(l)\" [disabled]=\"pfService.loginProfileName == l.name\">\n                <ion-icon name=\"trash\"></ion-icon>\n              </button>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ng-template>\n\n      </ion-list>\n      <no-content *ngIf=\"store.enableProfile && !pfService?.profilegroup\"></no-content>\n\n    </ion-content>\n  ",
                styles: ["\n    .popover-icon-only{\n        position: relative;\n    }\n    .popover-icon-only ion-select{\n      width : 100%;\n      height : 100%;\n      position: absolute;\n      z-index : 99;\n      left : 0;\n    }\n    .popover-icon-only .select-text{\n      display: none;\n    }\n  "]
            },] },
];
/** @nocollapse */
Profile.ctorParameters = function () { return [
    { type: NavController, },
    { type: ProfileService, },
    { type: CoreStore, },
    { type: AuthService, },
    { type: TranslateService, },
    { type: AlertController, },
    { type: SettingsService, },
    { type: LoadingService, },
]; };
//# sourceMappingURL=profile.js.map