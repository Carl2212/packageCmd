import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../config";
import { AuthService } from "../../auth/auth.service";
var Language = (function () {
    function Language(tlService, stService, authService) {
        this.tlService = tlService;
        this.stService = stService;
        this.authService = authService;
    }
    Language.prototype.ngOnInit = function () {
        var _this = this;
        this.langList = this.stService.langList;
        var currentLang = this.tlService.currentLang;
        this.langList.forEach(function (l, i) {
            if (l.lang == currentLang)
                _this.language = l.lang;
        });
    };
    Language.prototype.langChange = function (e) {
        var _this = this;
        this.language = e.lang;
        this.tlService.use(this.language);
        var culture;
        this.langList.forEach(function (l, i) {
            if (l.lang == _this.language)
                culture = l.culture;
        });
        this.authService.changeLang(this.language, culture);
    };
    return Language;
}());
export { Language };
Language.decorators = [
    { type: Component, args: [{
                selector: 'language',
                template: "\n    <ion-header>\n      <setting-navbar></setting-navbar>\n      <ion-toolbar color=\"white\">\n        <ion-title>{{'setting.language' | translate}}</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-list>\n        <ion-item *ngFor=\"let l of langList\" (click)=\"langChange(l)\" tappable>\n          <ion-icon name=\"globe\" item-left>\n            <ion-icon name=\"checkmark-circle-filled\" color=\"balanced\" *ngIf=\"l.lang==language\"></ion-icon>\n          </ion-icon>\n          <ion-label>{{'language.'+l.lang | translate}}</ion-label>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  "
            },] },
];
/** @nocollapse */
Language.ctorParameters = function () { return [
    { type: TranslateService, },
    { type: SettingsService, },
    { type: AuthService, },
]; };
//# sourceMappingURL=language.js.map