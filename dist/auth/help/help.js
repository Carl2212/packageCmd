import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
var Help = (function () {
    function Help(tlService, navParams) {
        this.tlService = tlService;
        this.navParams = navParams;
        this.company = this.navParams.get('company');
    }
    return Help;
}());
export { Help };
Help.decorators = [
    { type: Component, args: [{
                selector: 'help',
                template: "\n    <ion-header no-border>\n      <ion-navbar hideBackButton=\"true\" color=\"primary\">\n        <ion-buttons end>\n          <button ion-button clear icon-only color=\"light\" navPop>\n            <ion-icon name=\"close-circle-filled\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-title text-left>{{'auth.serverSetting' | translate}}</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content class=\"bg-lightblue\">\n      <ion-row justify-content-center padding-horizontal class=\"bg-primary\">\n        <ion-col col-md-10 col-md-10 align-self-center>\n          <ion-label color=\"white\"><ion-icon name=\"hand\"></ion-icon><b class=\"has-icon\">{{'help.manualInput' | translate}}</b></ion-label>\n          <div>{{tlService.instant('help.forCorrect', {key: tlService.instant(company)})}}</div>\n          <div class=\"border-div\">\n            {{tlService.instant('help.forExample', {key: tlService.instant(company)})}}\n            <div margin-bottom>http://ribsoftware.com.itwo4.0/xyz/<span class=\"yell\">client</span></div>\n            {{'help.exampleThen' | translate}}\n            <div>http://ribsoftware.com.itwo4.0/xyz/</div>\n          </div>\n\n          <ion-label color=\"white\"><ion-icon name=\"scan\"></ion-icon><b class=\"has-icon\">{{'auth.scan' | translate}}</b></ion-label>\n          <ion-row justify-content-center no-padding padding-bottom>\n            <ion-col col-8 no-padding>\n              <div class=\"border-div\">\n                {{tlService.instant('help.scanCode', {key: tlService.instant(company)})}}\n              </div>\n            </ion-col>\n            <ion-col col-4 align-self-center no-padding>\n              <div class=\"img-label\">\n                <div class=\"label-top\"></div>\n                <div class=\"label-bottom\"></div>\n                <img src=\"assets/help.png\">\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n      <ion-row justify-content-center class=\"bg-lightblue\" padding-horizontal>\n        <ion-col col-md-10 col-md-10 align-self-center>\n          <ion-label color=\"primary\"><b>{{'help.loginCredentials' | translate}}</b></ion-label>\n          <p>{{tlService.instant('help.logInUse', {key: tlService.instant(company)})}}</p>\n          <p>{{tlService.instant('help.ifYou', {key: tlService.instant(company)})}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-content>\n  ",
            },] },
];
/** @nocollapse */
Help.ctorParameters = function () { return [
    { type: TranslateService, },
    { type: NavParams, },
]; };
//# sourceMappingURL=help.js.map