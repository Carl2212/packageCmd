import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingService } from "../../core/providers/loading.service";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastService } from "../../core/providers/toast.service";
import { AuthService } from "../auth.service";
var Profile = (function () {
    function Profile(navCtrl, navParams, loading, pfService, tlService, tsService, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.pfService = pfService;
        this.tlService = tlService;
        this.tsService = tsService;
        this.authService = authService;
    }
    Profile.prototype.ionViewDidLoad = function () {
        this.profilegroup = this.pfService.profilegroup;
    };
    Profile.prototype.loginWithProfile = function (profile) {
        var _this = this;
        this.loading.create().present();
        this.authService.loginWithProfile(profile).then(function (success) {
            _this.pfService.login(profile);
            _this.loading.dismiss();
        }, function (fail) {
            if (fail.error && fail.error == 400) {
                _this.tlService.get('error')
                    .subscribe(function (res) {
                    _this.tsService.error(res[fail.loginInfoError]);
                });
            }
            else {
                _this.tlService.get('http')
                    .subscribe(function (res) {
                    _this.tsService.error(res[fail.error]);
                });
            }
        });
    };
    return Profile;
}());
export { Profile };
Profile.decorators = [
    { type: Component, args: [{
                selector: 'profile',
                template: "\n    <div padding class=\"nav disable-env-top\">\n      <ion-navbar hideBackButton=\"true\" color=\"white\" padding-vertical>\n        <ion-buttons>\n          <button ion-button icon-only clear navPop color=\"primary\">\n            <ion-icon name=\"arrow-back-thin\"></ion-icon>\n          </button>\n        </ion-buttons>\n      </ion-navbar>\n      <ion-list>\n        <ion-item tappable *ngFor=\"let l of profilegroup || null\" (click)=\"loginWithProfile(l)\" >\n          <ion-icon name=\"hand\" item-left color=\"primary\"></ion-icon>\n          <ion-label>\n            <h2>{{l?.name}}</h2>\n            <p>{{l?.user?.Email}}</p>\n          </ion-label>\n        </ion-item>\n      </ion-list>\n\n    </div>\n  ",
            },] },
];
/** @nocollapse */
Profile.ctorParameters = function () { return [
    { type: NavController, },
    { type: NavParams, },
    { type: LoadingService, },
    { type: ProfileService, },
    { type: TranslateService, },
    { type: ToastService, },
    { type: AuthService, },
]; };
//# sourceMappingURL=profile.js.map