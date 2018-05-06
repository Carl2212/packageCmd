import { Component } from "@angular/core";
import { SettingsService } from "../config";
var About = (function () {
    function About(stService) {
        this.stService = stService;
        this.aboutInfo = this.stService.aboutInfo;
    }
    return About;
}());
export { About };
About.decorators = [
    { type: Component, args: [{
                template: "\n    <ion-header>\n      <setting-navbar></setting-navbar>\n      <ion-toolbar color=\"white\">\n        <ion-title>{{'setting.about' | translate}}</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content class=\"about-card\">\n      <div text-center padding-vertical margin-vertical>\n        <img [src]=\"aboutInfo?.logoUrl\" class=\"rib-logo\"/>\n        <ion-label class=\"logo-text\" no-margin>{{aboutInfo?.appLogo | translate}}</ion-label>\n        <ion-label color=\"darkblue\" no-margin>{{aboutInfo?.appName | translate}}</ion-label>\n      </div>\n      <ion-list padding-horizontal no-lines>\n        <ion-item class=\"border-full disable-env-right\">\n          <ion-label>{{'setting.company' | translate}}</ion-label>\n          <ion-label>{{aboutInfo?.company}}</ion-label>\n        </ion-item>\n        <ion-item class=\"disable-env-right\">\n          <ion-label>{{'setting.version' | translate}}</ion-label>\n          <ion-label>{{aboutInfo?.version}}</ion-label>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n\n    <ion-footer class=\"about-footer\">\n      <ion-label text-center>{{aboutInfo?.copyright}}</ion-label>\n      <ion-label text-center margin-bottom>{{aboutInfo?.website}}</ion-label>\n    </ion-footer>\n  "
            },] },
];
/** @nocollapse */
About.ctorParameters = function () { return [
    { type: SettingsService, },
]; };
//# sourceMappingURL=about.js.map