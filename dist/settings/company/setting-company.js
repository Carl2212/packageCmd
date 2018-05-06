import { Component, ViewChild } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
import { AuthService, Company } from "../../auth/auth.module";
var SettingCompany = (function () {
    function SettingCompany(navCtrl, authService, viewCtrl) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.viewCtrl = viewCtrl;
    }
    SettingCompany.prototype.ngOnInit = function () {
        var _this = this;
        this.company.push(Company);
        this.authService.stateChange.takeUntil(this.viewCtrl.willUnload)
            .subscribe(function (state) {
            if (state === 32) {
                _this.navCtrl.pop();
            }
        });
    };
    return SettingCompany;
}());
export { SettingCompany };
SettingCompany.decorators = [
    { type: Component, args: [{
                template: "\n    <ion-header>\n      <setting-navbar></setting-navbar>\n      <ion-toolbar color=\"white\">\n        <ion-title>{{'setting.company' | translate}}</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-nav #company></ion-nav>\n    </ion-content>\n  "
            },] },
];
/** @nocollapse */
SettingCompany.ctorParameters = function () { return [
    { type: NavController, },
    { type: AuthService, },
    { type: ViewController, },
]; };
SettingCompany.propDecorators = {
    'company': [{ type: ViewChild, args: ['company',] },],
};
//# sourceMappingURL=setting-company.js.map