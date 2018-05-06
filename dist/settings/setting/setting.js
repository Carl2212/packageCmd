import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { App } from 'ionic-angular';
import { Auth } from "../../auth/auth";
import { AuthService } from "../../auth/auth.service";
import { Language } from "../language/language";
import { About } from "../about/about";
import { SettingCompany } from "../company/setting-company";
import { CoreStore } from "../../core/core.store";
import { SettingsService } from "../config";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { SettingProfile } from "../profile/setting-profile";
import { TranslateService } from "@ngx-translate/core";
var Setting = (function () {
    function Setting(appCtrl, authService, store, cfr, stService, pfService, tlService) {
        this.appCtrl = appCtrl;
        this.authService = authService;
        this.store = store;
        this.cfr = cfr;
        this.stService = stService;
        this.pfService = pfService;
        this.tlService = tlService;
        this.about = About;
        this.settingCompany = SettingCompany;
        this.language = Language;
        this.SettingProfile = SettingProfile;
        this.user = {};
    }
    Setting.prototype.loadComponent = function (comp) {
        if (!this.compRef) {
            var factory = this.cfr.resolveComponentFactory(comp);
            this.compRef = this.ioncontent.createComponent(factory);
        }
    };
    Setting.prototype.initUser = function () {
        var user = this.store.user;
        if (user) {
            this.user = {
                name: user.UserName,
                mail: user.Email
            };
        }
    };
    Setting.prototype.getLanguage = function (currentLang) {
        var language = this.stService.langList.find(function (l) { return l.lang == currentLang; });
        return language ? "language." + language.lang : '';
    };
    Setting.prototype.ngOnInit = function () {
        this.initUser();
        if (this.stService.dynamicComponent) {
            this.loadComponent(this.stService.dynamicComponent);
        }
        if (!this.store.clientContext.companyCode) {
            this.settingCompany = null;
        }
        this.showWelcome = this.store.isShowWelcome;
    };
    Setting.prototype.logout = function () {
        this.appCtrl.getRootNav().setRoot(Auth);
        this.authService.logout();
        this.pfService.resetLogin();
    };
    Setting.prototype.setShowWelcome = function () {
        this.store.isShowWelcome = this.showWelcome;
    };
    return Setting;
}());
export { Setting };
Setting.decorators = [
    { type: Component, args: [{
                selector: 'setting',
                template: "\n    <ion-header>\n      <setting-navbar></setting-navbar>\n    </ion-header>\n\n    <ion-content>\n      <div text-center padding-vertical margin-top>\n        <avatar [name]=\"user.name\"></avatar>\n        <p>\n          <ion-note>{{user.name}}<br>{{user.mail}}</ion-note>\n        </p>\n      </div>\n      <ion-list class=\"disable-env-right\">\n        <ion-item tappable *ngIf=\"settingCompany\" [navPush]=\"settingCompany\">\n          <ion-icon name=\"company\" color=\"primary\" item-left></ion-icon>\n          <ion-label  class=\"font-small gray\">{{'setting.company' | translate}}</ion-label>\n          <ion-label color=\"darkgray\" text-right>{{store?.companyRole?.company}}</ion-label>\n          <ion-icon name=\"arrow-forward-thin\" item-right></ion-icon>\n        </ion-item>\n        <ion-item tappable [navPush]=\"language\">\n          <ion-icon name=\"globe\" color=\"primary\" item-left></ion-icon>\n          <ion-label>{{'setting.language' | translate}}</ion-label>\n          <ion-label color=\"darkgray\"  text-right>{{getLanguage(tlService.currentLang) | translate}}</ion-label>\n          <ion-icon name=\"arrow-forward-thin\" item-right></ion-icon>\n        </ion-item>\n        <ion-item tappable [navPush]=\"SettingProfile\">\n          <ion-icon name=\"paper\" color=\"primary\" item-left></ion-icon>\n          <ion-label>{{'setting.profile' | translate}}</ion-label>\n          <ion-label color=\"darkgray\" text-right>{{pfService?.loginProfileName}}</ion-label>\n          <ion-icon name=\"arrow-forward-thin\" item-right></ion-icon>\n        </ion-item>\n        <ion-item #extensible>\n          <ion-icon name=\"eye\" color=\"primary\" item-left></ion-icon>\n          <ion-label text-wrap>{{'setting.showScreens' | translate}}</ion-label>\n          <ion-toggle [(ngModel)]=\"showWelcome\" (ngModelChange)=\"setShowWelcome()\"></ion-toggle>\n        </ion-item>\n        <ion-item tappable [navPush]=\"about\">\n          <ion-icon name=\"information\" color=\"primary\" item-left></ion-icon>\n          <ion-label>{{'setting.about' | translate}}</ion-label>\n          <ion-label color=\"darkgray\" text-right>{{stService?.aboutInfo?.version}}</ion-label>\n          <ion-icon name=\"arrow-forward-thin\" item-right></ion-icon>\n        </ion-item>\n      </ion-list>\n      <div padding-horizontal>\n        <button ion-button color=\"danger\" (click)=\"logout()\">\n          {{'auth.logout' | translate}}\n        </button>\n      </div>\n    </ion-content>\n  "
            },] },
];
/** @nocollapse */
Setting.ctorParameters = function () { return [
    { type: App, },
    { type: AuthService, },
    { type: CoreStore, },
    { type: ComponentFactoryResolver, },
    { type: SettingsService, },
    { type: ProfileService, },
    { type: TranslateService, },
]; };
Setting.propDecorators = {
    'ioncontent': [{ type: ViewChild, args: ['extensible', { read: ViewContainerRef },] },],
};
//# sourceMappingURL=setting.js.map