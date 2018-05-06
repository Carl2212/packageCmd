import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfileService } from "../../../core/providers/profile/profile.service";
import { CoreStore } from "../../../core/core.store";
import { TranslateService } from "@ngx-translate/core";
import { ToastService } from "../../../core/providers/toast.service";
import { ProfileStore, PROFILETICKET } from "../../../core/providers/profile/profile.store";
import { LoadingService } from "../../../core/providers/loading.service";
import { Company } from "../../../auth/auth.module";
var ProfileEdit = (function () {
    function ProfileEdit(navCtrl, navParams, store, pfStore, pfService, tlService, tsService, alertCtrl, viewCtrl, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.pfStore = pfStore;
        this.pfService = pfService;
        this.tlService = tlService;
        this.tsService = tsService;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.loading = loading;
        //排他
        this.profileNameGroup = [];
        this.init();
    }
    ProfileEdit.prototype.init = function () {
        this.editStatus = this.navParams.get('editStatus');
        this.oldProfile = this.navParams.get('profile');
        this.pfService.createProfile(this.oldProfile);
        this.existCompanyRole = !!this.store.clientContext.companyCode;
        this.getProfileNameGroup();
    };
    ProfileEdit.prototype.getProfileNameGroup = function () {
        if (this.pfService.profilegroup) {
            this.profileNameGroup = this.pfService.getUniqueCompareProfilegroup()
                .map(function (l) { return l.name; });
        }
    };
    ProfileEdit.prototype.ionViewWillLeave = function () {
        var _this = this;
        this.pfService.checkCompanySuccess
            .takeUntil(this.viewCtrl.didEnter)
            .takeUntil(this.viewCtrl.willUnload)
            .subscribe(function (data) {
            _this.navCtrl.pop();
        });
    };
    ProfileEdit.prototype.selectCompany = function () {
        var _this = this;
        this.loading.create().present();
        return this.pfService.checklogin(this.pfStore.server, this.pfStore.loginName, this.pfStore.password)
            .then(function (res) {
            if (_this.existCompanyRole) {
                _this.navCtrl.push(Company, { 'profile': PROFILETICKET });
            }
            _this.loading.dismiss();
        }, function (fail) {
            _this.tlService.get(['error', 'http'])
                .subscribe(function (res) {
                var msg = '';
                if (fail.error && fail.error == 400) {
                    msg = res.error.loginInfoError;
                }
                else {
                    msg = res.http[fail.error];
                }
                ;
                _this.tsService.error(msg);
            });
            _this.loading.dismiss();
        });
    };
    ProfileEdit.prototype.save = function () {
        var _this = this;
        this.loading.create().present();
        this.pfService.saveProfile().then(function () {
            _this.loading.dismiss();
            _this.navCtrl.pop();
        }, function (fail) {
            _this.tlService.get(['profile', 'error', 'http'])
                .subscribe(function (res) {
                var msg = '';
                if (fail == 1) {
                    msg = res.profile.nonUniqueness;
                }
                else if (fail.error && fail.error == 400) {
                    msg = res.error.loginInfoError;
                }
                else if (fail.error) {
                    msg = res.http[fail.error];
                }
                else {
                    console.log(fail);
                }
                ;
                _this.tsService.error(msg);
                _this.loading.dismiss();
            });
        });
    };
    ProfileEdit.prototype.pop = function () {
        if (this.editStatus == 1) {
            this.navCtrl.pop();
        }
        else {
            for (var k in this.oldProfile) {
                this.pfStore[k] = this.oldProfile[k];
            }
            this.editStatus = 2;
        }
    };
    ProfileEdit.prototype.del = function () {
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
                            _this.pfService.delProfile(_this.oldProfile)
                                .then(function (success) { return _this.navCtrl.pop(); });
                        }
                    }
                ]
            });
            p.present();
        });
    };
    return ProfileEdit;
}());
export { ProfileEdit };
ProfileEdit.decorators = [
    { type: Component, args: [{
                selector: 'profile-edit',
                template: "\n    <ion-header>\n      <ion-toolbar color=\"white\">\n        <ion-title>{{'setting.profile' | translate}}</ion-title>\n        <ion-buttons end>\n          <button ion-button clear color=\"primary\" (click)=\"editStatus == 2 ? del() : pop()\" margin-right [disabled]=\"editStatus == 2 && (pfService.loginProfileName == pfStore.name)\">\n            <ion-icon name=\"{{editStatus == 2 ? 'trash' :  'close'}}\"></ion-icon>\n          </button>\n          <button ion-button clear color=\"primary\" (click)=\"editStatus == 2 ? (editStatus = 3) :  save()\"\n                  [disabled]=\"pfService.loginProfileName == pfStore.name || (editStatus != 2 && !profileForm.valid)\">\n            <ion-icon name=\"{{editStatus == 2 ? 'edit' : 'lock'}}\"></ion-icon>\n          </button>\n        </ion-buttons>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <form #profileForm=\"ngForm\">\n        <ion-item text-right [class.error]=\"name.invalid && (name.dirty || name.touched)\">\n          <ion-label stacked><span class=\"err-msg\" >*</span>\n            <strong>{{'profileEdit.name' | translate}} : </strong>\n            <span class=\"err-msg\" *ngIf=\"name.invalid && (name.dirty || name.touched)\">\n\n              <span *ngIf=\"name.errors.required\">\n                {{'reminder.blank' | translate: {key : ''} }}\n              </span>\n              <span *ngIf=\"name.errors.uniqueValidator\">\n                {{'reminder.uniqueValid' | translate: {key : ''} }}\n              </span>\n            </span>\n          </ion-label>\n          <ion-input text-right [disabled]=\"editStatus == 2\" id=\"name\" type=\"text\"  [uniqueValidator]=\"profileNameGroup\" [(ngModel)]=\"pfStore.name\" name=\"name\"\n                     class=\"form-control\"\n                     required\n                     #name=\"ngModel\"></ion-input>\n        </ion-item>\n        <ion-item text-right [class.error]=\"loginName.invalid && (loginName.dirty || loginName.touched)\">\n          <ion-label stacked><span class=\"err-msg\">*</span>\n            <strong>{{'auth.userName' | translate}} : </strong>\n            <span class=\"err-msg\" *ngIf=\"loginName.invalid && (loginName.dirty || loginName.touched)\">{{'reminder.blank' | translate: {key : ''} }}</span>\n          </ion-label>\n          <ion-input text-right [disabled]=\"editStatus == 2\" id=\"loginName\" type=\"text\" [(ngModel)]=\"pfStore.loginName\" name=\"loginName\" class=\"form-control\" required #loginName=\"ngModel\"></ion-input>\n        </ion-item>\n        <ion-item text-right [class.error]=\"password.invalid && (password.dirty || password.touched)\">\n          <ion-label stacked><span class=\"err-msg\">*</span>\n            <strong>{{'auth.password' | translate}} : </strong>\n            <span class=\"err-msg\" *ngIf=\"password.invalid && (password.dirty || password.touched)\">{{'reminder.blank' | translate: {key : ''} }}</span>\n          </ion-label>\n          <ion-input text-right [disabled]=\"editStatus == 2\" id=\"password\" type=\"password\" [(ngModel)]=\"pfStore.password\" name=\"password\" class=\"form-control\" required\n                      #password=\"ngModel\"></ion-input>\n        </ion-item>\n        <ion-item text-right [class.error]=\"server.invalid && (server.dirty || server.touched)\">\n          <ion-label stacked><span class=\"err-msg\">*</span>\n            <strong>{{'auth.server' | translate}} : </strong>\n            <span class=\"err-msg\" *ngIf=\"server.invalid && (server.dirty || server.touched)\">{{'reminder.blank' | translate: {key : ''} }}</span>\n          </ion-label>\n          <ion-input text-right [disabled]=\"editStatus == 2\" id=\"server\" type=\"text\" [(ngModel)]=\"pfStore.server\" name=\"server\" class=\"form-control\" required #server=\"ngModel\"></ion-input>\n        </ion-item>\n        <button ion-item full detail-none text-right [disabled]=\"editStatus == 2 || loginName.invalid || password.invalid || server.invalid\" *ngIf=\"existCompanyRole\"\n                (click)=\"editStatus != 2 ? selectCompany() : null\">\n          <ion-label stacked><span class=\"err-msg\">*</span>\n            <strong>{{'setting.company' | translate}} & {{'auth.role' | translate}}: </strong>\n          </ion-label>\n          <ion-label text-right type=\"text\" >{{pfStore.company}}</ion-label>\n          <ion-label text-right type=\"text\" >{{pfStore.role}}</ion-label>\n          <ion-input text-right disabled hidden id=\"companyRole\" [(ngModel)]=\"pfStore.company\" type=\"text\" name=\"companyRole\" class=\"form-control\" required\n                     #companyRole=\"ngModel\"></ion-input>\n        </button>\n      </form>\n    </ion-content>\n  ",
            },] },
];
/** @nocollapse */
ProfileEdit.ctorParameters = function () { return [
    { type: NavController, },
    { type: NavParams, },
    { type: CoreStore, },
    { type: ProfileStore, },
    { type: ProfileService, },
    { type: TranslateService, },
    { type: ToastService, },
    { type: AlertController, },
    { type: ViewController, },
    { type: LoadingService, },
]; };
ProfileEdit.propDecorators = {
    'name': [{ type: ViewChild, args: ['name',] },],
};
//# sourceMappingURL=profileEdit.js.map