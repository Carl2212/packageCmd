import { Component, Inject, ViewChild, Injectable, EventEmitter } from '@angular/core';
import { Slides } from "ionic-angular";
import { WELCOMECONFIG } from "./config";
import { CoreStore } from "../core/core.store";
var WelcomeController = (function () {
    function WelcomeController(store) {
        this.store = store;
        this.leavePage = new EventEmitter();
    }
    WelcomeController.prototype.isShowWelcome = function () {
        if (this.store.isShowWelcome) {
            return true;
        }
        else {
            return false;
        }
    };
    return WelcomeController;
}());
export { WelcomeController };
WelcomeController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WelcomeController.ctorParameters = function () { return [
    { type: CoreStore, },
]; };
var Welcome = (function () {
    function Welcome(slideDatas, welcomeCtrl) {
        this.slideDatas = slideDatas;
        this.welcomeCtrl = welcomeCtrl;
    }
    Welcome.prototype.pushToMain = function () {
        this.welcomeCtrl.leavePage.emit(true);
    };
    return Welcome;
}());
export { Welcome };
Welcome.decorators = [
    { type: Component, args: [{
                selector: 'page-welcome',
                template: "\n    <ion-slides pager>\n      <ion-slide class=\"pager-slide\" *ngFor=\"let l of slideDatas\">\n        <div class=\"title\">\n          <img [class.small-image]=\"l?.appName\" *ngIf=\"l?.topImg\" [src]=\"l?.topImg\">\n          <h2 class=\"appName\" *ngIf=\"l?.appName\">{{l?.appName | translate}}</h2>\n        </div>\n        <div class=\"description\">\n          <h2>{{l?.title | translate}}</h2>\n          <p>{{l?.description | translate}}</p>\n          <button ion-button class=\"slide-button\" *ngIf=\"l?.isGetStartBtn\" (click)=\"pushToMain()\">\n            {{l?.startBtnText | translate}}\n          </button>\n          <img class=\"bottom-image\" *ngIf=\"l?.bottomImg\" [src]=\"l?.bottomImg\">\n        </div>\n      </ion-slide>\n    </ion-slides>\n  ",
            },] },
];
/** @nocollapse */
Welcome.ctorParameters = function () { return [
    { type: Array, decorators: [{ type: Inject, args: [WELCOMECONFIG,] },] },
    { type: WelcomeController, },
]; };
Welcome.propDecorators = {
    'slides': [{ type: ViewChild, args: [Slides,] },],
};
//# sourceMappingURL=welcome.js.map