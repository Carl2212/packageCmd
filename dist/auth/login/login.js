import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from '../auth.service';
import { ToastService } from '../../core/providers/toast.service';
import { LoadingService } from '../../core/providers/loading.service';
import { Company } from '../company/company';
import { CoreStore } from "../../core/core.store";
import { Profile } from "../profile/profile";
import { ProfileService } from "../../core/providers/profile/profile.service";
var Login = (function () {
    function Login(tlService, formBuilder, navCtrl, authService, tsService, loading, coreStore, profileService) {
        this.tlService = tlService;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.tsService = tsService;
        this.loading = loading;
        this.coreStore = coreStore;
        this.profileService = profileService;
        this.user = {
            name: '',
            password: ''
        };
        this.initForm();
        this.initLoginInfo();
    }
    Login.prototype.initForm = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];
    };
    Login.prototype.initLoginInfo = function () {
        var info = this.authService.getLoginInfo();
        if (info) {
            this.user.name = info.name;
        }
    };
    Login.prototype.langChange = function (e) {
        var _this = this;
        this.language = e;
        this.tlService.use(this.language);
        var culture;
        this.langList.forEach(function (l, i) {
            if (l.lang == _this.language)
                culture = l.culture;
        });
        this.authService.changeLang(this.language, culture);
    };
    Login.prototype.login = function () {
        var _this = this;
        this.loading.create().present();
        this.authService.login(this.user.name, this.user.password)
            .then(function (success) {
            _this.navCtrl.push(Company, null, { animate: false });
            _this.authService.setUser();
            _this.authService.setLoginInfo(_this.user);
            _this.loading.dismiss();
        }, function (fail) {
            if (fail.error && fail.error == 400) {
                _this.tlService.get('error')
                    .subscribe(function (res) {
                    _this.tsService.error(res.loginInfoError);
                });
            }
            else {
                _this.tlService.get('http')
                    .subscribe(function (res) {
                    _this.tsService.error(res[fail.error]);
                });
            }
            _this.loading.dismiss();
        });
    };
    Login.prototype.loginWithProfile = function () {
        this.navCtrl.push(Profile, null, { animate: false });
    };
    Login.prototype.popToServer = function () {
        this.navCtrl.pop({ animate: false });
    };
    Login.prototype.setLangList = function (data) {
        var _this = this;
        var list = [
            { lang: 'en', culture: 'en-gb' },
            { lang: 'zh', culture: 'zh-hans' },
            { lang: 'de', culture: 'de-de' }
        ];
        var langList = [];
        list.forEach(function (l, i) {
            langList.push({
                name: data.language[l.lang],
                lang: l.lang,
                culture: l.culture
            });
            if (l.lang == _this.language)
                _this.language = l.lang;
        });
        this.langList = langList;
    };
    Login.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.tlService.currentLang;
        this.tlService.getTranslation(this.language)
            .subscribe(function (data) {
            _this.setLangList(data);
        });
    };
    return Login;
}());
export { Login };
Login.decorators = [
    { type: Component, args: [{
                template: "\n    <div class=\"nav\" padding>\n      <h2 text-center>{{'auth.login' | translate}}</h2>\n      <ion-item class=\"disable-env-all\">\n        <ion-label>{{'setting.language' | translate}}</ion-label>\n        <ion-select interface=\"popover\" [ngModel]=\"language\" (ngModelChange)=\"langChange($event)\">\n          <ion-option [value]=\"l.lang\" *ngFor=\"let l of langList\">{{l.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <form [formGroup]=\"loginForm\">\n        <ion-item [class.error]=\"!username.valid&&username.touched\" class=\"disable-env-all\">\n          <ion-label [attr.stacked]=\"username.hasError('required')&&username.touched?'':null\">\n            {{'auth.userName' | translate}}\n            <span class=\"err-msg\" *ngIf=\"username.hasError('required')&&username.touched\">{{ 'reminder.blank' | translate: { key: ''} }}</span>\n          </ion-label>\n          <ion-input type=\"text\" [(ngModel)]=\"user.name\" [formControl]=\"username\" text-right></ion-input>\n        </ion-item>\n        <ion-item [class.error]=\"!password.valid&&password.touched\" class=\"disable-env-all\">\n          <ion-label [attr.stacked]=\"password.hasError('required')&&password.touched?'':null\">\n            {{'auth.password' | translate}}\n            <span class=\"err-msg\" *ngIf=\"password.hasError('required')&&password.touched\">{{'reminder.blank' | translate: { key: ''} }}</span>\n          </ion-label>\n          <ion-input type=\"password\" [(ngModel)]=\"user.password\" [formControl]=\"password\" text-right></ion-input>\n        </ion-item>\n      </form>\n      <button ion-button color=\"primary\" small float-right margin-top (click)=\"popToServer()\">{{'auth.serverSetting' | translate}}</button>\n    </div>\n\n    <ion-footer>\n      <button ion-button full no-margin color=\"gray\" (click)=\"loginWithProfile()\" *ngIf=\"coreStore.enableProfile && profileService.profilegroup\">\n        <ion-label color=\"primary\">{{'auth.loginWithProfile' | translate}}</ion-label>\n      </button>\n      <button ion-button full no-margin color=\"primary\" (click)=\"login()\" [disabled]=\"!loginForm.valid\">{{'auth.login' | translate}}</button>\n    </ion-footer>\n  "
            },] },
];
/** @nocollapse */
Login.ctorParameters = function () { return [
    { type: TranslateService, },
    { type: FormBuilder, },
    { type: NavController, },
    { type: AuthService, },
    { type: ToastService, },
    { type: LoadingService, },
    { type: CoreStore, },
    { type: ProfileService, },
]; };
//# sourceMappingURL=login.js.map