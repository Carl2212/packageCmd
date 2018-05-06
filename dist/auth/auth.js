import { Component, ViewChild, Inject, InjectionToken } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { AuthService } from './auth.service';
import { Server } from './server/server';
import { Login } from './login/login';
import { Company } from './company/company';
import { Help } from './help/help';
export var AUTH_CONFIG = new InjectionToken('AUTH_CONFIG');
var Auth = (function () {
    function Auth(navCtrl, authService, keyboard, config, authConfig) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.keyboard = keyboard;
        this.config = config;
        this.authConfig = authConfig;
        this.loginPage = null;
    }
    Auth.prototype.help = function () {
        this.navCtrl.push(Help, { company: this.authConfig['company'] });
    };
    Auth.prototype.setPage = function () {
        this.auth.push(Server, null, { animate: false });
        if (this.authService.state > 1) {
            this.auth.push(Login, null, { animate: false });
            if (!this.authConfig['loginState'] || this.authConfig['loginState'] && this.authConfig['loginState'] > 2) {
                if (this.authService.state >= 2 && this.authService.getUser()) {
                    this.auth.push(Company, null, { animate: false });
                }
            }
        }
        this.keyboard.disableScroll(false);
        this.config.set('ios', 'scrollAssist', 'true');
        this.config.set('ios', 'autoFocusAssist', 'true');
    };
    Auth.prototype.ngOnInit = function () {
        this.setPage();
    };
    return Auth;
}());
export { Auth };
Auth.decorators = [
    { type: Component, args: [{
                selector: 'auth',
                template: "\n    <ion-content class=\"bg\">\n      <ion-row justify-content-center>\n        <ion-col margin-horizontal no-padding text-right tappable (click)=\"help()\">\n          <ion-icon padding-top color=\"light\" name=\"help-circle\" class=\"help-icon\"></ion-icon>\n        </ion-col>\n      </ion-row>\n      <ion-row justify-content-center id=\"title\">\n        <ion-col col-lg-4 col-md-6 col-sm-7 align-self-center>\n          <ion-row>\n            <ion-col col-3 col-md-3 align-self-center text-right no-padding>\n              <img [src]=\"authConfig?.logoUrl\" id=\"logo\">\n            </ion-col>\n            <ion-col text-center>\n              <img [src]=\"authConfig?.twoUrl\" id=\"itwo\">\n              <div id=\"app-name\">{{authConfig?.appName | translate}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n      <ion-row justify-content-center class=\"bx\">\n        <ion-col col-md-6 margin-horizontal>\n          <ion-nav #login [root]=\"loginPage\"></ion-nav>\n        </ion-col>\n      </ion-row>\n    </ion-content>\n  "
            },] },
];
/** @nocollapse */
Auth.ctorParameters = function () { return [
    { type: NavController, },
    { type: AuthService, },
    { type: Keyboard, },
    { type: Config, },
    { type: Array, decorators: [{ type: Inject, args: [AUTH_CONFIG,] },] },
]; };
Auth.propDecorators = {
    'auth': [{ type: ViewChild, args: ['login',] },],
};
//# sourceMappingURL=auth.js.map