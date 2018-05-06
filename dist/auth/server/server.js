import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { NavStack } from '../../core/providers/nav.service';
import { AuthService } from '../auth.service';
import { Login } from '../login/login';
import { Scanner } from '../scanner/scanner';
var Server = (function () {
    function Server(navCtrl, authService, navStack) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.navStack = navStack;
        this.initForm();
    }
    Server.prototype.scan = function () {
        var _this = this;
        var rootNav = this.navStack.rootNav;
        var viewLeave = rootNav.viewDidLeave.subscribe(function (data) {
            var views = rootNav.getViews();
            views[views.length - 1].onDidDismiss(function (data) {
                if (data)
                    _this.serverCtrl.setValue(data);
            });
            viewLeave.unsubscribe();
        });
        rootNav.push(Scanner);
    };
    Server.prototype.apply = function () {
        this.authService.setServer(this.serverCtrl.value);
        this.navCtrl.push(Login, null, { animate: false });
    };
    Server.prototype.initForm = function () {
        this.serverCtrl = new FormControl('', [Validators.required]);
    };
    Server.prototype.ngOnInit = function () {
        var server = this.authService.getServer();
        if (server) {
            this.serverCtrl.setValue(server);
        }
    };
    return Server;
}());
export { Server };
Server.decorators = [
    { type: Component, args: [{
                template: "\n    <div class=\"nav\">\n      <h2 text-center>{{'auth.server' | translate}}</h2>\n      <ion-item [class.error]=\"!serverCtrl.valid&&serverCtrl.touched\" class=\"disable-env-all\">\n        <ion-label stacked>\n          {{'auth.server' | translate}} {{'auth.url' | translate}}\n          <span class=\"err-msg\" [hidden]=\"!(serverCtrl.hasError('required')&&serverCtrl.touched)\">{{ 'reminder.blank' | translate: { key: ''} }}</span>\n        </ion-label>\n        <ion-input type=\"text\" [formControl]=\"serverCtrl\"></ion-input>\n      </ion-item>\n      <div margin-top padding-top text-center>\n        <div padding-top>{{'auth.scan' | translate}}</div>\n        <ion-icon name=\"scan\" margin-top tappable (click)=\"scan()\" class=\"scan-icon\" color=\"primary\"></ion-icon>\n      </div>\n    </div>\n\n    <ion-footer>\n      <button ion-button full no-margin color=\"primary\" (click)=\"apply()\" [disabled]=\"!serverCtrl.valid\">{{'auth.apply' | translate}}</button>\n    </ion-footer>\n  "
            },] },
];
/** @nocollapse */
Server.ctorParameters = function () { return [
    { type: NavController, },
    { type: AuthService, },
    { type: NavStack, },
]; };
//# sourceMappingURL=server.js.map