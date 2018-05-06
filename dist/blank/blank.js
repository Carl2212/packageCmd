import { Component, Inject, InjectionToken } from '@angular/core';
import { CoreStore } from '../core/core.store';
export var BLANK_CONFIG = new InjectionToken('BLANK_CONFIG');
var Blank = (function () {
    function Blank(blankConfig, store) {
        this.blankConfig = blankConfig;
        this.store = store;
    }
    return Blank;
}());
export { Blank };
Blank.decorators = [
    { type: Component, args: [{
                selector: 'blank',
                template: "\n    <ion-header no-border>\n      <mid-navbar directiveType=\"{{blankConfig.desktop}}\" [title]=\"blankConfig.appName\"></mid-navbar>\n    </ion-header>\n    <div class=\"main-flex bg-gray\">\n      <div class=\"slide-down-to-up\">\n        <div class=\"slide-move size-dif\">\n          <avatar [name]=\"store?.user?.UserName\"></avatar>\n          <div text-center>\n            <p class=\"font-small\">{{store?.user?.UserName}}</p>\n            <p class=\"font-small gray\">{{store?.user?.Email}}</p>\n          </div>\n        </div>\n      </div>\n      <div class=\"line\"></div>\n      <div class=\"slide-up-to-down\">\n        <div class=\"slide-move\">\n          <span class=\"label-block logo-txt\">{{blankConfig.company | translate}}</span>\n        </div>\n      </div>\n    </div>\n  ",
            },] },
];
/** @nocollapse */
Blank.ctorParameters = function () { return [
    { type: Array, decorators: [{ type: Inject, args: [BLANK_CONFIG,] },] },
    { type: CoreStore, },
]; };
//# sourceMappingURL=blank.js.map